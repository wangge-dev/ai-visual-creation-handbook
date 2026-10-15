import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { root, contentSources, originalSourceLinks, readJSON, writeJSON } from './lib.mjs';
import { api, inspectRepo, summarize } from './github.mjs';

export function recordSuccess(previous, next, now) {
  return { ...previous, last_success: now, next_page: next, error: null };
}
export function recordFailure(previous, error, now) {
  return { ...previous, last_attempt: now, error };
}
export function queryPosition(previous, query) {
  const changed = previous.query_text !== undefined && (previous.query_text !== query.query || previous.query_kind !== query.kind);
  return changed ? {next_page:1,query_text:query.query,query_kind:query.kind,previous_query:previous.query_text,previous_success:previous.last_success}
    : {...previous,query_text:query.query,query_kind:query.kind};
}
export function upsertCandidate(list, item) {
  const index = list.findIndex(x => x.id === item.id);
  if (index < 0) list.push(item); else list[index] = { ...list[index], ...item };
}
export function changedFields(old, next) {
  if (!old) return [];
  return ['name', 'branch', 'license', 'archived', 'pushed_at'].filter(k => old[k] !== next[k]);
}
export async function maintain(args = process.argv.slice(2)) {
  const directory = path.join(root, '.maintenance');
  await fs.mkdir(directory, { recursive: true });
  let state;
  try { state = await readJSON(path.join(directory, 'state.json')); }
  catch (e) { if (e.code !== 'ENOENT') throw e; state = { queries: {}, repositories: {}, candidates: [], rotation: 0 }; }
  const started = new Date().toISOString();
  const report = { started_at: started, new_candidates: [], changes: [], first_observations: [], failures: [], pending: [], impacts: [] };
  const queries = await readJSON(path.join(root, 'discovery/queries.json'));
  const resources = await readJSON(path.join(root, 'data/repositories.json'));
  const requested = args.includes('--repo') ? args[args.indexOf('--repo') + 1] : null;
  const limit = Math.min(10, Math.max(1, Number(args[args.indexOf('--limit') + 1]) || 3));
  if (args.includes('--discover')) {
    for (let n = 0; n < Math.min(limit, queries.length); n++) {
      const q = queries[(state.rotation + n) % queries.length];
      const previous = queryPosition(state.queries[q.id] || { next_page: 1 },q);
      try {
        const page = previous.next_page || 1;
        const isCode = q.kind === 'code';
        const result = await api(`/search/${isCode ? 'code' : 'repositories'}?q=${encodeURIComponent(q.query)}${isCode ? '' : '&sort=updated&order=desc'}&per_page=30&page=${page}`);
        for (const item of result.items) {
          const repo = isCode ? item.repository : item;
          const curated = resources.some(r => r.github_id === repo.id);
          const reviewed = state.candidates.find(x=>x.id===repo.id)?.review_status;
          const candidate = { ...summarize(repo), query_id: q.id, discovered_at: started, status: curated ? '已收录' : reviewed || '待读来源', ...(isCode ? {matched_path:item.path,matched_url:item.html_url}: {}) };
          if (!curated && !state.candidates.some(x => x.id === repo.id)) report.new_candidates.push(candidate);
          upsertCandidate(state.candidates, candidate);
        }
        const more = page * 30 < Math.min(1000, result.total_count);
        state.queries[q.id] = recordSuccess(previous, more ? page + 1 : 1, started);
        if (more || result.incomplete_results) report.pending.push({ query: q.id, next_page: more ? page + 1 : 1, total: result.total_count, incomplete: result.incomplete_results });
      } catch (e) {
        state.queries[q.id] = recordFailure(previous, e.message, started);
        report.failures.push({ source: q.id, message: e.message });
      }
    }
    // Failed queries retain their page and are retried on their next turn.
    state.rotation = (state.rotation + Math.min(limit, queries.length)) % queries.length;
  }
  const watch = requested ? [{ name: requested }] : resources.filter(r => r.watch !== false);
  for (const resource of watch) {
    try {
      const snapshot = requested ? await inspectRepo(resource.name) : summarize(await api('/repos/' + resource.name));
      const previous = state.repositories[snapshot.id];
      const fields = changedFields(previous?.metadata, snapshot);
      if (!previous) report.first_observations.push({ name: snapshot.name, id: snapshot.id });
      else if (fields.length) report.changes.push({ resource_id: resource.id, name: snapshot.name, fields, before: previous.metadata, after: summarizeLike(snapshot) });
      state.repositories[snapshot.id] = { metadata: summarizeLike(snapshot), last_success: started, error: null };
      if (requested) await writeJSON(path.join(directory, 'sources', requested.replace('/', '__') + '.json'), snapshot);
    } catch (e) {
      report.failures.push({ source: resource.name, message: e.message });
      const previous = Object.values(state.repositories).find(x => x.metadata.name === resource.name);
      if (previous) { previous.error = e.message; previous.last_attempt = started; }
    }
  }
  const list = await contentSources();
  const poolPath = args.includes('--source-pool') ? args[args.indexOf('--source-pool') + 1] : process.env.SOURCE_POOL_PATH;
  if (poolPath) {
    try {
      const { readPool } = await import('./source-pool.mjs');
      const pool = readPool(poolPath);
      await writeJSON(path.join(directory, 'source-pool.json'), pool);
      report.source_pool = { total: pool.total, selected: pool.selected.length, mode: 'read_only' };
    } catch(e) { report.failures.push({ source:'existing_source_pool', message:e.message }); }
  }
  if (args.includes('--monthly')) {
    const known = (await Promise.all(['tools','platform-rules','source-directory'].map(name => readJSON(path.join(root,'data',name+'.json'))))).flat();
    const unique=new Map(known.map(s=>[s.url,s]));
    for(const source of await originalSourceLinks()){
      const previous=unique.get(source.url);
      unique.set(source.url,{...source,...previous,source_files:[...new Set([...(previous?.source_files || []),...source.source_files])]});
    }
    const sources = [...unique.values()];
    report.source_health = await Promise.all(sources.map(async source => {
      try {
        const response = await fetch(source.url, { method:'GET', signal:AbortSignal.timeout(12000) });
        await response.body?.cancel();
        return {id:source.id,url:source.url,source_files:source.source_files,status:response.status,final_url:response.url,needs_review:!response.ok};
      } catch(e) {return {id:source.id,url:source.url,source_files:source.source_files,error:e.name,needs_review:true};}
    }));
    report.pending.push(...report.source_health.filter(s=>s.needs_review).map(s=>({source:s.id,reason:'入口需要复核；请求失败不直接判定失效'})));
    state.last_monthly_attempt = started.slice(0,7);
    for(const source of report.source_health.filter(s=>s.needs_review)) report.impacts.push({source:source.id,pages:[...new Set([...(source.source_files || []),...list.filter(p=>p.data.tool_ids?.includes(source.id)||p.data.platform_rule_ids?.includes(source.id)).map(p=>p.relative)])]});
  }
  for (const c of report.changes) {
    report.impacts.push({ resource_id: c.resource_id, name: c.name, pages: list.filter(p => p.data.resource_ids?.includes(c.resource_id)).map(p => p.relative) });
  }
  report.finished_at = new Date().toISOString();
  report.result = report.failures.length ? 'partial_failure' : report.new_candidates.length || report.changes.length ? 'review_required' : report.pending.length ? 'pending_review' : 'no_content_change';
  const name = started.replace(/[:.]/g, '-') + '.json';
  await writeJSON(path.join(directory, 'runs', name), report);
  await writeJSON(path.join(directory, 'latest.json'), report);
  await writeJSON(path.join(directory, 'state.json'), state);
  console.log(JSON.stringify({ result: report.result, new_candidates: report.new_candidates.length, changes: report.changes.length,
    first_observations: report.first_observations.length, failures: report.failures.length, pending: report.pending.length, report: path.join(directory, 'latest.json') }));
  if (report.failures.length) process.exitCode = 1;
  return report;
}
function summarizeLike(x) { return Object.fromEntries(['id', 'name', 'url', 'branch', 'license', 'archived', 'pushed_at'].map(k => [k, x[k]])); }
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) await maintain();
