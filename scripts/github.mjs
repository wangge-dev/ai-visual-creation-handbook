import { spawnSync } from 'node:child_process';
let savedToken;
export function token() {
  if (savedToken !== undefined) return savedToken;
  savedToken = process.env.GITHUB_TOKEN || '';
  if (!savedToken && process.env.GITHUB_ACTIONS !== 'true') {
    const r = spawnSync(process.env.GIT_BIN || 'git', ['credential', 'fill'], {
      input: 'protocol=https\nhost=github.com\n\n', encoding: 'utf8', timeout: 15000,
      env: { ...process.env, GIT_TERMINAL_PROMPT: '0', GCM_INTERACTIVE: 'never' }, windowsHide: true
    });
    if (r.status === 0) savedToken = r.stdout.match(/^password=(.+)$/m)?.[1]?.trim() || '';
  }
  return savedToken;
}
export async function api(endpoint, options = {}) {
  // Credentials only go to api.github.com; never persist request headers.
  if (!endpoint.startsWith('/') || endpoint.startsWith('//')) throw new Error('Invalid API path');
  const key = token();
  const r = await fetch('https://api.github.com' + endpoint, {
    ...options, signal: AbortSignal.timeout(30000), headers: {
      Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'ai-visual-creation-handbook', ...(key ? { Authorization: 'Bearer ' + key } : {}),
      ...(options.body ? { 'Content-Type': 'application/json' } : {})
    }
  });
  if (!r.ok) throw new Error(`GitHub HTTP ${r.status}: ${endpoint.split('?')[0]}`);
  return r.status === 204 ? null : r.json();
}
export function summarize(meta) {
  return { id: meta.id, name: meta.full_name, url: meta.html_url, branch: meta.default_branch,
    license: meta.license?.spdx_id || null, archived: meta.archived, pushed_at: meta.pushed_at };
}
export function inventory(tree) {
  const files = tree.filter(x => x.type === 'blob');
  return { files: files.length, skills: files.filter(x => /(^|\/)skill\.md$/i.test(x.path)).map(x => x.path),
    scripts: files.filter(x => /\.(py|mjs|cjs|js|sh|ps1)$/i.test(x.path)).map(x => x.path) };
}
export async function inspectRepo(name) {
  if (!/^[\w.-]+\/[\w.-]+$/.test(name)) throw new Error('Invalid repository name');
  const meta = await api('/repos/' + name);
  const tree = await api(`/repos/${name}/git/trees/${encodeURIComponent(meta.default_branch)}?recursive=1`);
  let readme = null;
  let readme_error = null;
  try { const r = await api('/repos/' + name + '/readme'); readme = { path: r.path, text: Buffer.from(r.content || '', 'base64').toString('utf8') }; }
  catch (e) { readme_error = e.message; }
  return { ...summarize(meta), description: meta.description, observed_at: new Date().toISOString(),
    ...inventory(tree.tree || []), tree_complete: !tree.truncated, readme, readme_error };
}
