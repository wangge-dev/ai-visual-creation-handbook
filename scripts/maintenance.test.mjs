import { test } from 'node:test';
import assert from 'node:assert/strict';
import { recordFailure, recordSuccess, upsertCandidate, changedFields, queryPosition } from './maintenance.mjs';
import { inventory } from './github.mjs';
import { contentSources, originalSourceLinks } from './lib.mjs';

test('maintenance points to editable HTML rather than generated Markdown', async()=>{
  const sources=await contentSources();
  const related=sources.filter(p=>p.data.resource_ids?.includes('ecommerce-skills'));
  assert.ok(related.some(p=>p.relative==='src/supplements/image-set.html'));
  assert.ok(related.every(p=>p.relative.startsWith('src/')&&p.relative.endsWith('.html')));
});
test('monthly health includes original table URLs and their editable owner', async()=>{
  const links=await originalSourceLinks();
  const entry=links.find(x=>x.url.includes('chatgpt.com'));
  assert.ok(entry);assert.ok(entry.source_files.every(x=>x.startsWith('src/content/')));
  assert.equal(new Set(links.map(x=>x.url)).size,links.length);
});
test('failed source retains successful page for retry; next success advances it', () => {
  const previous = { next_page: 4, last_success: 'earlier' };
  const failed = recordFailure(previous, 'HTTP 503', 'now');
  assert.equal(failed.next_page, 4); assert.equal(failed.last_success, 'earlier');
  assert.equal(recordSuccess(failed, 5, 'later').next_page, 5);
});
test('repository rename joins the same stable ID', () => {
  const list = [{ id: 23, name: 'old/repo' }];
  upsertCandidate(list, { id: 23, name: 'new/repo' });
  assert.equal(list.length, 1); assert.equal(list[0].name, 'new/repo');
});
test('root and lower-case Skill files are found, not only nested capitals', () => {
  const result = inventory([{ type: 'blob', path: 'SKILL.md' }, { type: 'blob', path: 'a/skill.md' }, { type: 'blob', path: 'scripts/main.mjs' }]);
  assert.equal(result.skills.length, 2); assert.equal(result.scripts.length, 1);
});
test('observation timestamps do not manufacture changes', () => {
  const a = { name: 'a/b', pushed_at: '2026-10-12' };
  assert.deepEqual(changedFields(a, { ...a, observed_at: '2026-10-14' }), []);
  assert.deepEqual(changedFields(a, { ...a, archived: true }), ['archived']);
});
test('changing a query starts at its first page, unchanged queries retain progress', () => {
  const old={next_page:4,last_success:'earlier',query_text:'footwear visual',query_kind:'repository'};
  const changed=queryPosition(old,{query:'footwear visual production',kind:'repository'});
  assert.equal(changed.next_page,1);assert.equal(changed.previous_success,'earlier');
  assert.equal(queryPosition(old,{query:'footwear visual',kind:'repository'}).next_page,4);
});
