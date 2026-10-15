import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const readJSON = async p => JSON.parse(await fs.readFile(p, 'utf8'));
export const writeJSON = async (p, value) => { await fs.mkdir(path.dirname(p), { recursive: true }); await fs.writeFile(p, JSON.stringify(value, null, 2) + '\n'); };
export async function contentSources() {
  const manifest = await readJSON(path.join(root,'src/guide.json'));
  return [...manifest.guide,...manifest.prompts,...manifest.additions,...manifest.extra_prompts].map(p=>({
    file:path.join(root,'src',p.file), relative:'src/'+p.file,
    data:{...(p.metadata || {}),title:p.title},anchor:p.anchor
  }));
}
export async function originalSourceLinks() {
  const catalogs=await readJSON(path.join(root,'data/guide-catalogs.json'));
  for (const table of Object.values(catalogs)) {
    if (table.records_file) {
      const records = await readJSON(path.join(root,'data',table.records_file));
      table.rows = records.map(row=>table.fields.slice(0,row._cell_count ?? table.fields.length).map(field=>row[field] ?? ''));
    }
  }
  const manifest=await readJSON(path.join(root,'src/guide.json'));
  const files=await Promise.all([...manifest.guide,...manifest.additions].map(async p=>({file:'src/'+p.file,text:await fs.readFile(path.join(root,'src',p.file),'utf8')})));
  const links=new Map();
  for(const [key,table] of Object.entries(catalogs)) {
    const owners=files.filter(p=>p.text.includes('<!--catalog:'+key+'-->')).map(p=>p.file);
    if (table.records_file) {
      const records=await readJSON(path.join(root,'data',table.records_file));
      for (const record of records) if (/^https?:/.test(record.source || '')) {
        const previous=links.get(record.source);
        links.set(record.source,{id:'guide-link:'+record.source,url:record.source,source_files:[...new Set([...(previous?.source_files || []),...owners])]});
      }
    }
    for(const match of table.rows.flat().join('\n').matchAll(/href="(https?:[^"\s]+)"/g)) {
      const url=match[1].replaceAll('&amp;','&');
      const previous=links.get(url);
      links.set(url,{id:'guide-link:'+url,url,source_files:[...new Set([...(previous?.source_files || []),...owners])]});
    }
  }
  return [...links.values()];
}
export async function pages(dir = path.join(root, 'docs')) {
  const out = [];
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') || (path.basename(dir) === 'resources' && ['cards','platforms'].includes(e.name))) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...await pages(p));
    else if (e.name.endsWith('.md')) {
      const parsed = matter(await fs.readFile(p, 'utf8'));
      out.push({ ...parsed, file: p, relative: path.relative(path.join(root, 'docs'), p).replaceAll('\\', '/') });
    }
  }
  return out.sort((a, b) => (a.data.order ?? 999) - (b.data.order ?? 999) || a.relative.localeCompare(b.relative));
}
export const escapeHTML = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
