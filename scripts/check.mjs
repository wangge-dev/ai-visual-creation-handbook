import fs from 'node:fs/promises';
import path from 'node:path';
import { root, pages, readJSON } from './lib.mjs';
const all = await pages();
const resources = await readJSON(path.join(root, 'data/repositories.json'));
const tools = await readJSON(path.join(root, 'data/tools.json'));
const rules = await readJSON(path.join(root, 'data/platform-rules.json'));
const ids = new Set(), resourceIds = new Set();
const errors = [];
for (const r of resources) { if (resourceIds.has(r.id)) errors.push(`duplicate resource: ${r.id}`); resourceIds.add(r.id); }
for (const p of all) {
  if (p.data.id) { if (ids.has(p.data.id)) errors.push(`duplicate page: ${p.data.id}`); ids.add(p.data.id); }
  for (const id of p.data.resource_ids || []) if (!resourceIds.has(id)) errors.push(`${p.relative}: unknown resource ${id}`);
  for (const id of p.data.tool_ids || []) if (!tools.some(x=>x.id===id)) errors.push(`${p.relative}: unknown tool ${id}`);
  for (const id of p.data.platform_rule_ids || []) if (!rules.some(x=>x.id===id)) errors.push(`${p.relative}: unknown platform rule ${id}`);
  if (/^[A-Z]:[\\/]/m.test(p.content) || /(?:D|C):[\\/](?:Users|guge|Obsidian|codexo|codex)/i.test(p.content)) errors.push(`${p.relative}: local path in public text`);
  if (/^P\d{2}$/.test(p.data.id || '')) {
    const blocks = [...p.content.matchAll(/```text\r?\n([\s\S]*?)```/g)];
    if (blocks.length !== 1 || blocks[0][1].trim().length < 200) errors.push(`${p.relative}: missing complete prompt`);
    if (!p.data.evidence_status?.includes('尚未执行')) errors.push(`${p.relative}: missing execution state`);
  }
  for (const m of p.content.matchAll(/\]\(([^ )]+)(?:[^)]*)\)/g)) {
    const url = m[1];
    if (/^(https?:|#|mailto:)/.test(url) || url.startsWith('/downloads/')) continue;
    let target = decodeURIComponent(url.split('#')[0]);
    target = target.startsWith('/') ? path.join(root, 'docs', target) : path.resolve(path.dirname(p.file), target);
    const choices = [target, target + '.md', path.join(target, 'index.md')];
    if (!(await Promise.all(choices.map(x => fs.access(x).then(() => true, () => false)))).some(Boolean)) errors.push(`${p.relative}: missing link ${url}`);
  }
}
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log(`Checked ${all.length} pages, ${resourceIds.size} resources; IDs, references, links and full prompts valid.`);
