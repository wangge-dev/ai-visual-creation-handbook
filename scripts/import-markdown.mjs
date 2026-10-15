// A deliberate Markdown contribution -> canonical HTML import, followed by the
// normal Python build. No second independently maintained content tree.
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import MarkdownIt from 'markdown-it';
import matter from 'gray-matter';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const manifest=JSON.parse(await fs.readFile(path.join(root,'src/guide.json'),'utf8'));
const coreEntries=manifest.guide.slice(2,22).map(x=>({...x,former_doc:'chapters/'+path.basename(x.file,'.html')+'.md',core:true}));
const entries=[...coreEntries,...manifest.additions,...manifest.extra_prompts];
const args=process.argv.slice(2);
if (!args.length) throw new Error('Usage: node scripts/import-markdown.mjs docs/ecommerce/amazon-a-plus.md');
const md=new MarkdownIt({html:true});
for (const arg of args) {
  const file=path.resolve(root,arg);
  const entry=entries.find(x=>path.resolve(root,'docs',x.former_doc)===file);
  if (!entry) throw new Error('Choose docs/chapters/guide-02.md through guide-21.md, an individual tutorial or P02-P20 page; aggregate exports have separate data sources.');
  if (entry.metadata?.id==='P01') throw new Error('P01 is merged into G01. Edit the G01 record in data/prompt-library.json.');
  const {content}=matter(await fs.readFile(file,'utf8'));
  let result=md.render(content);
  const sourcePath=path.join(root,'src',entry.file);
  const oldSource=await fs.readFile(sourcePath,'utf8').catch(()=> '');
  const catalogs=JSON.parse(await fs.readFile(path.join(root,'data/guide-catalogs.json'),'utf8'));
  const normalize=s=>s.replace(/<[^>]*>/g,'').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/\s+/g,' ').trim();
  for (const marker of oldSource.matchAll(/<!--catalog:([\w-]+)-->/g)) {
    const table=catalogs[marker[1]];
    const records=JSON.parse(await fs.readFile(path.join(root,'data',table.records_file),'utf8'));
    const expected=[table.columns,...records.map(row=>table.fields.map(field=>row[field]??''))].map(row=>row.map(normalize));
    const match=[...result.matchAll(/<table>[\s\S]*?<\/table>/g)].find(m=>{
      const actual=[...m[0].matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map(row=>[...row[1].matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g)].map(cell=>normalize(cell[1])));
      return JSON.stringify(actual)===JSON.stringify(expected);
    });
    if (!match) throw new Error('Catalog '+marker[1]+' was changed or removed. Edit data/'+table.records_file+' for table changes, then build before importing prose.');
    result=result.replace(match[0],marker[0]);
  }
  result=result.replace(/href="([^"#]+\.md)(#[^"]*)?"/g,(all,link)=>{
    const destination=path.resolve(path.dirname(file),decodeURIComponent(link));
    const other=entries.find(x=>path.resolve(root,'docs',x.former_doc)===destination);
    return other?'href="#'+other.anchor+'"':all;
  });
  // The containing tutorial is a chapter-level heading in the single reader.
  // Markdown subheads should not become new giant chapter headings.
  if (entry.core) {
    result=result.replace(/href="https:\/\/wangge-dev\.github\.io\/ai-visual-creation-handbook\/(?:index\.html)?#/g,'href="#');
    result=result.replace(/href="#([^"]*)"/g,(_,id)=>'href="#'+decodeURIComponent(id).replace(/"/g,'&quot;')+'"');
    const headings=new Map([...oldSource.matchAll(/<h([1-6]) id="([^"]+)">([\s\S]*?)<\/h\1>/g)].map(m=>[m[2],m]));
    result=result.replace(/<!--heading:([^>]+)-->\s*<h([1-6])>([\s\S]*?)<\/h\2>/g,(_,id,level,title)=>{
      const previous=headings.get(id);
      const kicker=previous?.[3].match(/<span class="chapter-kicker">[\s\S]*?<\/span>/)?.[0]??'';
      return '<h'+level+' id="'+id+'">'+kicker+'<a class="anchor" href="#'+id+'" aria-label="定位到本节">#</a>'+title+'</h'+level+'>';
    });
  } else {
    result=result.replace(/<h2>([\s\S]*?)<\/h2>/g,'<h3>$1</h3>');
    result=result.replace(/<h1>([\s\S]*?)<\/h1>/,'<h2>$1</h2>');
  }
  result=result.replace(/<pre><code([^>]*)>([\s\S]*?)<\/code><\/pre>/g,
    '<div class="codebox"><div class="codebar"><span>text</span><button class="copy-btn" type="button">复制</button></div><pre><code$1>$2</code></pre></div>');
  await fs.writeFile(sourcePath,entry.core?result:'<section class="supplement-section" id="'+entry.anchor+'">'+result+'</section>\n');
  console.log('Imported '+path.relative(root,file)+' -> src/'+entry.file);
}
