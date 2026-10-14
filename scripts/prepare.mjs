import fs from 'node:fs/promises';
import path from 'node:path';
import { root, readJSON, pages, writeJSON } from './lib.mjs';
const all = await pages();
const resources = await readJSON(path.join(root, 'data/repositories.json'));
const cards = path.join(root, 'docs/resources/cards');
await fs.mkdir(cards, { recursive: true });
const desired = new Set(resources.map(r => r.id + '.md'));
for (const old of await fs.readdir(cards)) if (old.endsWith('.md') && !desired.has(old)) await fs.unlink(path.join(cards, old));
for (const r of resources) {
  const related = all.filter(p => p.data.resource_ids?.includes(r.id));
  const lines = [`# ${r.name}`, '', `用途：${r.use}`, '', `类型：${r.type}。状态：${r.status}。`, '', `证据：${r.evidence}。`, '', `限制与待核：${r.limitation}`, '', `[原始仓库](${r.url})`, '',
    `最后内容复核：${r.last_reviewed_at || '待核'}；许可：${r.license || '未见／待核'}；默认分支：${r.branch || '待核'}。`, '',
    r.archived === true ? '**当前已归档，请核对替代路径。**' : '', '',
    '## 输入、输出与上手', '', `输入：${r.inputs || '按原项目文档补充'}。`, '', `输出：${r.outputs || '按实际运行能力确认'}。`, '', `入口：${r.entry || '先读README，再核对当前依赖'}。`, '',
    '## 核查来源', '', ...(r.sources || [{title:'README',url:r.url+'/blob/'+r.branch+'/README.md'}]).map(s=>`- [${s.title}](${s.url})`), '',
    '## 关联内容', '', ...related.map(p => `- [${p.data.title}](/${p.relative.replace(/\.md$/, '')})`), ''];
  await fs.writeFile(path.join(cards, r.id + '.md'), lines.join('\n'));
}
const nav = all.filter(p => p.data.title).map(p => ({ title: p.data.title, chapter: p.data.chapter, link: '/' + p.relative.replace(/\.md$/, ''), evidence: p.data.evidence_status }));
const platforms = await readJSON(path.join(root,'data/platform-rules.json'));
const platformDir = path.join(root,'docs/resources/platforms');
await fs.mkdir(platformDir,{recursive:true});
for (const r of platforms) {
  const lines=[`# ${r.name}`,'',`适用范围：${r.scope}`,'',`核对状态：${r.verification_status || '待按具体位置核对'}；核对日：${r.last_reviewed_at || '待核'}。`,'',r.note,'',
    '## 已读取的具体说明','',...(r.details || []).map(d=>`- **${d.position}**：${d.text}`),'','## 原始来源','',
    ...(r.sources || [{title:r.name,url:r.url}]).map(s=>`- [${s.title}](${s.url})`),'','## 关联教程与模板','',
    ...all.filter(p=>p.data.platform_rule_ids?.includes(r.id)).map(p=>`- [${p.data.title}](/${p.relative.replace(/\.md$/,'')})`),''];
  await fs.writeFile(path.join(platformDir,r.id+'.md'),lines.join('\n'));
}
await writeJSON(path.join(root, 'docs/.vitepress/navigation.json'), nav);
for (const [source, dest] of [['CHANGELOG.md', 'docs/changelog.md'], ['maintenance/README.md', 'docs/maintenance.md']]) await fs.copyFile(path.join(root, source), path.join(root, dest));
console.log(`Prepared ${resources.length} resource cards and ${nav.length} navigation entries.`);
