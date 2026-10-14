import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const readJSON = async p => JSON.parse(await fs.readFile(p, 'utf8'));
export const writeJSON = async (p, value) => { await fs.mkdir(path.dirname(p), { recursive: true }); await fs.writeFile(p, JSON.stringify(value, null, 2) + '\n'); };
export async function pages(dir = path.join(root, 'docs')) {
  const out = [];
  for (const e of await fs.readdir(dir, { withFileTypes: true })) {
    if (e.name.startsWith('.') || (path.basename(dir) === 'resources' && e.name === 'cards')) continue;
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
