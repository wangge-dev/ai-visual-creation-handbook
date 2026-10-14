import { DatabaseSync } from 'node:sqlite';
export function readPool(file) {
  const db = new DatabaseSync(file, { readOnly: true });
  try {
    const total = db.prepare('SELECT count(*) AS n FROM materials').get().n;
    const selected = db.prepare(`SELECT m.id,m.url,m.title,m.published_at,m.primary_source,
      EXISTS(SELECT 1 FROM bodies b WHERE b.material_id=m.id) AS has_body
      FROM materials m WHERE lower(m.title) LIKE '%image%' OR lower(m.title) LIKE '%comfy%'
      OR m.title LIKE '%图%' OR m.title LIKE '%电商%' OR m.title LIKE '%画布%'
      ORDER BY m.id DESC LIMIT 20`).all();
    return { read_at:new Date().toISOString(), total, selected, note:'只读索引与原始URL，不复制正文；has_body只表示表中有记录，完整性需查看原件。' };
  } finally { db.close(); }
}
