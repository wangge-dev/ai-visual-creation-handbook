"""Assemble the original-first offline guide. Python 3 stdlib; no npm required."""
from pathlib import Path
import json, re, html
from urllib.parse import quote
from html_documents import Document, markdown
from wechat_export import inline_body, preview
from catalogs import load_catalogs
from prompt_library import render_library

ROOT=Path(__file__).resolve().parent.parent
SOURCE=ROOT/'src'
DIST=ROOT/'dist'

def read(path):return path.read_text(encoding='utf-8')
def load(path):return json.loads(read(path))
def write(path,text):
    path.parent.mkdir(parents=True,exist_ok=True)
    path.write_text(text,encoding='utf-8',newline='\n')

def build():
    manifest=load(SOURCE/'guide.json');catalogs=load_catalogs(ROOT)
    def table(name):
        t=catalogs[name]
        def row(cells,tag):return '<tr>\n'+''.join('<'+tag+'>'+c+'</'+tag+'>\n' for c in cells)+'</tr>\n'
        return '<table>\n<thead>\n'+row(t['columns'],'th')+'</thead>\n<tbody>\n'+''.join(row(r,'td') for r in t['rows'])+'</tbody>\n</table>'
    def fragment(file):
        return re.sub(r'<!--catalog:([\w-]+)-->',lambda m:table(m[1]),read(SOURCE/file))
    guide=''.join(fragment(x['file']) for x in manifest['guide'])
    prompts=''.join(fragment(x['file']) for x in manifest['prompts'])
    additions=''.join(fragment(x['file']) for x in manifest['additions'])
    extra_prompts=''.join(fragment(x['file']) for x in manifest['extra_prompts'])
    original_guide,original_prompts=guide,prompts
    library,library_nav,chapter18,task_cards=render_library(ROOT,manifest)
    guide=guide.replace(fragment('content/guide-19.html'),chapter18)
    prompts='<div class="markdown-body"><h1 id="作图任务提示词">按用途找完整提示词</h1><p>选择任务，替换商品事实与素材，再复制完整指令。共'+str(len(task_cards))+'项；原稿同类模板与新增任务词已合并。方法建议和文章写作词不计入作图模板数量。</p>'+library+'</div>'
    prompts+='<details id="原稿写作提示词"><summary>原稿15节文章写作与维护提示词（完整保留）</summary>'+original_prompts+'</details>'
    resources=load(ROOT/'data/repositories.json');rules=load(ROOT/'data/platform-rules.json')
    resource_html='<h2 id="资源资料库">仓库资料与核查</h2><p>原稿的仓库表格完整保留在正文；下面是已整理的补充资料，来源核对、作者展示和本项目运行分别记录。</p>'
    for r in resources:
        e=lambda value:html.escape(str(value))
        resource_html+=f'<details class="resource-entry" id="resource-{e(r["id"])}"><summary>{e(r["name"])} · {e(r["type"])}</summary><p>{e(r["use"])}</p><p>{e(r["evidence"])}</p><p>输入：{e(r.get("inputs",""))}</p><p>输出：{e(r.get("outputs",""))}</p><p>{e(r["limitation"])}</p><p><a href="{e(r["url"])}">原始仓库</a> · 许可 {e(r.get("license","待核"))} · 核对 {e(r.get("last_reviewed_at","待核"))}</p></details>'
    resource_html+='<h2 id="平台核查补充">平台规格核查补充</h2>'
    for r in rules:
        e=lambda value:html.escape(str(value))
        resource_html+=f'<details class="review-entry" id="platform-{e(r["id"])}"><summary>{e(r["name"])}</summary><p>{e(r["scope"])}</p><p>{e(r["note"])}</p>'
        resource_html+=''.join('<p><strong>'+e(d['position'])+'</strong> '+e(d['text'])+'</p>' for d in r.get('details',[]))
        resource_html+=''.join('<p><a href="'+e(s['url'])+'">'+e(s['title'])+'</a></p>' for s in r.get('sources',[]))+'</details>'
    reviews=load(ROOT/'data/guide-review.json')
    review_html='<h2 id="版本核对说明">版本与来源核对</h2><p>原稿内容按原样保留。模型版本、平台规格、许可和原稿成本记录具有时间范围；这里单独记录核对情况，不将第三方展示写成本项目实测。</p>'
    for r in reviews:
        review_html+='<details class="review-entry"><summary>'+html.escape(r['title'])+'</summary><p>'+html.escape(r['note'])+'</p>'
        review_html+=''.join('<p><a href="'+html.escape(s['url'],quote=True)+'">'+html.escape(s['title'])+'</a></p>' for s in r.get('sources',[]))+'</details>'
    nav=''.join('<a href="#'+html.escape(x['anchor'],quote=True)+'">'+html.escape(x['title'])+'</a>' for x in manifest['additions'])
    nav+='<a href="#资源资料库">仓库资料与核查</a><a href="#版本核对说明">版本与来源核对</a>'
    task_nav=library_nav
    template=read(SOURCE/'index.html')
    slots={'styles':'\n'.join(read(SOURCE/'styles'/x) for x in ['variables.css','layout.css','components.css','responsive.css','reader.css']),
      'scripts':'\n'.join(read(SOURCE/'scripts'/x) for x in ['tabs.js','copy.js','search.js']),
      'guide':guide,'prompts':prompts,'additions':additions+resource_html+review_html,'addition-nav':nav,'task-prompt-nav':task_nav}
    for key,value in slots.items():template=template.replace('{{'+key+'}}',value)
    page_url='https://wangge-dev.github.io/ai-visual-creation-handbook/'
    template=template.replace('href="downloads/index.html"','href="'+page_url+'downloads/index.html"').replace('href="downloads/handbook.md"','href="'+page_url+'downloads/handbook.md"')
    if re.search(r'\{\{[\w-]+\}\}',template):raise ValueError('An HTML assembly slot is unresolved')
    write(DIST/'index.html',template);write(ROOT/'index.html',template)
    write(DIST/'.nojekyll','')
    download=DIST/'downloads'
    write(download/'index.html',template);write(download/'handbook.html',template)
    anchor_map={}
    for node in Document(template).root.find_all('a'):
        href=node.attrs.get('href','')
        if href.startswith('#'):anchor_map[href]=page_url+href
    guide_md=markdown(original_guide,anchor_map);prompt_md=markdown(original_prompts,anchor_map)
    supplement_md=markdown(additions,anchor_map)
    extra_md=markdown(extra_prompts,anchor_map)
    full_markdown=markdown(guide,anchor_map)+'\n---\n\n'+markdown(prompts,anchor_map)+'\n---\n\n'+supplement_md
    write(download/'handbook.md',full_markdown);write(ROOT/'docs/handbook.md',full_markdown)
    # Chapter Markdown is an explicit contribution view, imported before rebuild.
    # Stable heading markers keep existing navigation and prompt references intact.
    chapter_index='# 逐章编辑原稿\n\n编辑单篇后先导入，再构建；不要先构建覆盖未导入的修改。详见[贡献说明](../../CONTRIBUTING.md)。标题前的 heading 注释保留已有链接，表格记录仍修改 JSON。\n\n'
    for entry in manifest['guide'][2:22]:
        filename=Path(entry['file']).stem+'.md'
        write(ROOT/'docs/chapters'/filename,markdown(fragment(entry['file']),anchor_map,preserve_heading_ids=True))
        chapter_index+='- ['+entry['title']+']('+filename+')\n'
    write(ROOT/'docs/chapters/README.md',chapter_index)
    # Companion Markdown is generated from the HTML source, so the two formats
    # cannot diverge when a maintainer updates a tutorial.
    for entry in manifest['additions']+manifest['extra_prompts']:
        destination=ROOT/'docs'/entry['former_doc']
        heading='---\n'+''.join(k+': '+json.dumps(v,ensure_ascii=False)+'\n' for k,v in entry['metadata'].items())+'---\n\n'
        anchor_links={}
        for other in manifest['additions']+manifest['extra_prompts']:
            import os
            href='#'+other['anchor'];target=Path(os.path.relpath(ROOT/'docs'/other['former_doc'],destination.parent)).as_posix()
            anchor_links[href]=target;anchor_links[quote(href,safe='#')]=target
        card=next((x for x in task_cards if x['id']=='G01'),None) if entry.get('metadata',{}).get('id')=='P01' else None
        # P01 is an old URL alias; other individual exports remain round-trippable
        # source contributions. The aggregate catalog includes original variants.
        content=markdown(card['html'] if card else fragment(entry['file']),anchor_links)
        content=re.sub(r'^###? ', '# ',content,count=1)
        write(destination,heading+content)
    for name,content in [('guide-original.md',guide_md),('prompt-original.md',prompt_md),('prompt-templates.md',markdown(library,anchor_map)),('supplements.md',supplement_md)]:
        write(download/name,content);write(ROOT/'docs'/name,content)
    write(ROOT/'docs/index.md','# 电商AI作图完整手册\n\n[在线单页阅读]('+page_url+') · [整本Markdown](./handbook.md) · [原稿全文](./guide-original.md) · [集中提示词](./prompt-templates.md)\n\n正文、表格、提示词与清单完整保留，默认阅读无需理解项目目录。克隆后双击根index.html即可离线阅读。对应Markdown由HTML源自动导出，修改请见[贡献说明](../CONTRIBUTING.md)。\n')
    for key,names in {'model-comparison.md':['models'],'platform-specs.md':['platform-domestic','platform-cross-border'],'tools.md':['web-tools','extra-tools','vertical-domestic','vertical-cross-border'],'github-repos.md':['prompt-repositories','open-source-tools'],'comfyui-workflows.md':['comfyui-workflows','components']}.items():
        content='\n\n'.join('# '+catalogs[name]['title']+'\n\n'+markdown(table(name)) for name in names)
        write(ROOT/'docs'/key,content);write(download/key,content)
    alias_map={x['former_doc'].removesuffix('.md'):x['anchor'] for x in manifest['additions']+manifest['extra_prompts']}
    alias_map.update({'index':'目录','outline':'目录','prompts/index':'作图任务提示词','resources/index':'资源资料库','maintenance':'维护与贡献','changelog':'版本核对说明'})
    for route,anchor in alias_map.items():
        target=DIST/(route+'.html');relative=Path(__import__('os').path.relpath(DIST/'index.html',target.parent)).as_posix()+'#'+anchor
        redirect='<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta http-equiv="refresh" content="0;url='+html.escape(relative,quote=True)+'"><title>阅读入口已合并</title><p><a href="'+html.escape(relative,quote=True)+'">打开单页手册对应内容</a></p><script>location.replace('+json.dumps(relative,ensure_ascii=False)+');</script></html>'
        if target!=DIST/'index.html':write(target,redirect)
    # Retain formerly published resource URLs as direct single-page entry points.
    for r in resources:
        target=DIST/'resources/cards'/(r['id']+'.html');url='../../index.html#resource-'+r['id']
        write(target,'<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="0;url='+url+'"><a href="'+url+'">打开资料卡</a>')
    for r in rules:
        url='../../index.html#platform-'+r['id']
        write(DIST/'resources/platforms'/(r['id']+'.html'),'<!doctype html><meta charset="utf-8"><meta http-equiv="refresh" content="0;url='+url+'"><a href="'+url+'">打开平台核对说明</a>')
    cross=''.join(fragment(x['file']) for x in manifest['additions'] if x.get('topic')=='cross-border')
    cross+=''.join(fragment(x['file']) for x in manifest['extra_prompts'] if x.get('topic')=='cross-border')
    write(download/'cross-border.md',markdown(cross,anchor_map))
    write(ROOT/'docs/cross-border-guide.md',markdown(cross,anchor_map))
    write(download/'cross-border-guide.md',markdown(cross,anchor_map))
    write(download/'cross-border.html',template.replace('</body>','<script>if(!location.hash)location.hash="补充-cross-border";</script></body>'))
    wechat=inline_body(guide+prompts+additions)
    write(download/'wechat-body.html',wechat)
    write(download/'wechat-preview.html',preview(wechat))
    # The original text and full prompt package are also available as standalone Markdown.
    report={'guide_heading_sections':len(Document(original_guide).root.find_all('h2')),'original_prompt_sections':len(Document(original_prompts).root.find_all('h2')),
      'original_tables':len(Document(original_guide).root.find_all('table')),
      'original_code_blocks':len(Document(original_guide+original_prompts).root.find_all('pre')),
      'supplement_pages':len(manifest['additions']),'extra_prompt_cards':len(manifest['extra_prompts']),
      'unified_task_templates':len(task_cards),'resource_cards':len(resources),'html_bytes':len(template.encode('utf8')),'requires_network_to_read':False}
    write(ROOT/'.maintenance/restoration/build.json',json.dumps(report,ensure_ascii=False,indent=2)+'\n')
    print(json.dumps(report,ensure_ascii=False))
    return report

if __name__=='__main__':build()
