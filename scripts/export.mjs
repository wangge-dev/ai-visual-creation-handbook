import fs from 'node:fs/promises';
import path from 'node:path';
import MarkdownIt from 'markdown-it';
import { root, pages, readJSON, escapeHTML } from './lib.mjs';
import { publicLinks } from './links.mjs';
const md = new MarkdownIt({ html: false, linkify: true });
const publicURL = 'https://wangge-dev.github.io/ai-visual-creation-handbook';
const list = (await pages()).filter(p => p.data.id && p.data.id !== 'outline' && p.data.id !== 'prompts');
const outline = (await pages()).find(p => p.data.id === 'outline');
const resources = await readJSON(path.join(root, 'data/repositories.json'));
const tools = await readJSON(path.join(root,'data/tools.json'));
const rules = await readJSON(path.join(root,'data/platform-rules.json'));
const absoluteLinks = (text, file) => publicLinks(text, file, publicURL);
const chapters = list.map(p => `${absoluteLinks(p.content.trim(),p.relative)}\n\n证据状态：${p.data.evidence_status || '见正文'}。\n`);
const registry = '# 资源资料卡\n\n' + resources.map(r => `## ${r.name}\n\n${r.use}\n\n类型：${r.type}；证据：${r.evidence}。\n\n输入：${r.inputs}；输出：${r.outputs}。\n\n上手：${r.entry}。\n\n限制：${r.limitation}\n\n许可：${r.license || '待核／未见'}；核对日：${r.last_reviewed_at || '待核'}。\n\n[原始仓库](${r.url})\n`).join('\n') + '\n## 工具入口\n\n' + tools.map(t=>`- [${t.name}](${t.url})：${t.note}（${t.evidence}）`).join('\n') + '\n\n## 平台核对入口\n\n' + rules.map(r=>`### ${r.name}\n\n${r.scope}。${r.note}\n\n${(r.details || []).map(d=>`- ${d.position}：${d.text}`).join('\n')}\n\n${(r.sources || [{title:r.name,url:r.url}]).map(s=>`[${s.title}](${s.url})`).join(' · ')}`).join('\n\n');
const text = '# AI视觉创作实战知识库\n\n电商是最大专题，同时覆盖其他视觉创作、完整提示词与三类画布。操作教程、方法说明与任务入门分别记录，模板尚未执行图像任务。\n\n' + absoluteLinks(outline.content,outline.relative) + '\n\n' + chapters.join('\n\n---\n\n') + '\n\n' + registry;
const target = path.join(root, 'docs/.vitepress/dist/downloads');
await fs.mkdir(target, { recursive: true });
await fs.writeFile(path.join(target, 'handbook.md'), text);
const specialized = list.filter(p=>p.data.topic==='cross-border');
const crossBorder = '# 跨境电商操作教程与完整模板\n\n包含逐步操作、提示词、排版与返工；练习数据虚构，图像任务、源文件与后台上传尚未执行。\n\n' + specialized.map(p=>absoluteLinks(p.content.trim(),p.relative)+'\n\n证据状态：'+p.data.evidence_status+'。').join('\n\n---\n\n') + '\n\n' + registry;
await fs.writeFile(path.join(target,'cross-border.md'),crossBorder);
await fs.writeFile(path.join(target,'cross-border.html'),`<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>跨境电商详细教程与完整模板</title><style>body{max-width:820px;margin:auto;padding:24px;color:#222;background:#fff;font-family:'Microsoft YaHei',sans-serif}p,li{font-size:16px;line-height:1.9}h1{font-size:26px;line-height:1.5;border-bottom:2px solid #ff5b1a;padding-bottom:12px}h2{font-size:22px;line-height:1.6}a{color:#ad420f}pre{white-space:pre-wrap;overflow-wrap:anywhere;line-height:1.9;padding:16px;background:#fff8f1}table{display:block;overflow:auto;border-collapse:collapse}td,th{border:1px solid #ddd;padding:10px;line-height:1.8}</style>${md.render(crossBorder)}</html>`);
await fs.writeFile(path.join(target, 'handbook.html'), `<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>AI视觉创作实战知识库</title><style>body{margin:0;background:#fafafa;color:#222;font-family:'Microsoft YaHei',sans-serif}main{max-width:820px;margin:auto;padding:30px 22px;background:white}h1{font-size:26px;line-height:1.5}h2{font-size:22px;border-bottom:1px solid #e6e6e6;padding-bottom:8px}p,li{font-size:16px;line-height:1.9}a{color:#ad420f}pre{padding:16px;background:#fff8f1;white-space:pre-wrap;overflow-wrap:anywhere;font-size:15px;line-height:1.9}table{border-collapse:collapse;display:block;overflow:auto}td,th{border:1px solid #ddd;padding:10px;line-height:1.8}</style><main>${md.render(text)}</main></html>`);
const inline = new MarkdownIt({ html: false, linkify: true });
const normal = 'font-size:16px;line-height:30px;color:#222;letter-spacing:0px;';
const styles = { p: normal+'margin:0px 0px 14px;padding:0px;', h1:'font-size:24px;line-height:40px;margin:0px 0px 20px;padding:0px 0px 12px;border-bottom:2px solid #ff5b1a;color:#222;',
  h2:'font-size:20px;line-height:36px;margin:24px 0px 12px;color:#222;', h3:'font-size:18px;line-height:34px;margin:20px 0px 10px;color:#222;',
  ul:normal+'padding-left:24px;margin:0px 0px 14px;',ol:normal+'padding-left:24px;margin:0px 0px 14px;',li:normal+'margin:0px 0px 6px;',
  a:normal+'color:#ad420f;text-decoration:underline;',strong:normal+'font-weight:bold;', em:normal+'font-style:italic;', blockquote:normal+'margin:14px 0px;padding:8px 12px;border-left:2px solid #ff5b1a;background:#fffdfb;' };
for (const rule of ['paragraph_open','heading_open','bullet_list_open','ordered_list_open','list_item_open','link_open','strong_open','em_open','blockquote_open']) {
  const original = inline.renderer.rules[rule] || ((tokens, i, options, env, self) => self.renderToken(tokens, i, options));
  inline.renderer.rules[rule] = (tokens,i,options,env,self) => {tokens[i].attrJoin('style',styles[tokens[i].tag] || normal);return original(tokens,i,options,env,self);};
}
inline.renderer.rules.fence = (tokens, i) => '<section style="'+normal+'margin:14px 0px;padding:12px;border-left:2px solid #ff5b1a;background:#fffdfb;">' + tokens[i].content.trimEnd().split('\n').map(line => `<p style="${normal}margin:0px;padding:0px;">${line.trim() ? escapeHTML(line).replace(/^\s*- /,'• ') : '<br />'}</p>`).join('') + '</section>\n';
inline.renderer.rules.code_inline = (tokens,i) => `<span style="${normal}">${escapeHTML(tokens[i].content)}</span>`;
inline.renderer.rules.hr = () => '<section style="height:1px;margin:18px 0px;background:#e6e6e6;"></section>';
// Tables become stacked rows so mobile copy does not depend on editor table CSS.
for (const [open,close] of [['table_open','table_close'],['thead_open','thead_close'],['tbody_open','tbody_close']]) {inline.renderer.rules[open]=()=>'';inline.renderer.rules[close]=()=>'';}
inline.renderer.rules.tr_open=()=>`<section style="${normal}margin:8px 0px;padding:10px;border-left:2px solid #e6e6e6;">`;
inline.renderer.rules.tr_close=()=>'</section>';
for(const key of ['th_open','td_open'])inline.renderer.rules[key]=()=>`<p style="${normal}margin:0px;padding:0px;">`;
for(const key of ['th_close','td_close'])inline.renderer.rules[key]=()=>'</p>';
const article = `<section id="article" style="${normal}margin:0px;padding:0px;background:#fff;">${inline.render(text)}</section>`;
await fs.writeFile(path.join(target, 'wechat-body.html'), article);
await fs.writeFile(path.join(target, 'wechat-preview.html'), `<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>公众号正文复制</title><style>body{margin:0;padding:20px;background:#fafafa;font-family:'Microsoft YaHei',sans-serif}main{max-width:720px;margin:auto;padding:22px;background:#fff}header{max-width:720px;margin:0 auto 16px;font-size:14px;line-height:1.8}button{padding:10px 16px;border:0;background:#ff5b1a;color:white;cursor:pointer;border-radius:5px}a{color:#ad420f}</style><header><button id="copy">复制公众号正文</button> <span id="status" role="status">仅复制下方正文，按钮和说明不进入内容。</span><p>复制后粘贴到公众号正文编辑器。平台实际粘贴尚待核验；飞书可使用整本Markdown。</p></header><main>${article}</main><script>document.getElementById('copy').onclick=async()=>{const node=document.getElementById('article');try{await navigator.clipboard.write([new ClipboardItem({'text/html':new Blob([node.outerHTML],{type:'text/html'}),'text/plain':new Blob([node.innerText],{type:'text/plain'})})]);document.getElementById('status').textContent='正文已复制';}catch(e){const r=document.createRange();r.selectNodeContents(node);const s=getSelection();s.removeAllRanges();s.addRange(r);document.getElementById('status').textContent='自动复制不可用，正文已选中，请按Ctrl+C';}};</script></html>`);
const count = [...text.matchAll(/```text\r?\n/g)].length;
const promptPages = list.filter(p => /^P\d+$/.test(p.data.id || ''));
for (const p of promptPages) {
  const block = p.content.match(/```text\r?\n([\s\S]*?)```/);
  if (!block || !text.includes(block[0])) throw Error(`Export lost full prompt: ${p.data.id}`);
}
console.log(`Exported ${list.length} source pages, ${promptPages.length} prompt cards, ${count} text blocks and ${resources.length} resource cards to ${target}`);
