"""One task catalog, with original wording referenced rather than hand-copied."""
import html, json, re
from html_documents import Document

def original_sections(source):
    starts=list(re.finditer(r'<h3\b',source))
    return {i+1:source[m.start():starts[i+1].start() if i+1<len(starts) else len(source)] for i,m in enumerate(starts)}

def render_library(root, manifest):
    config=json.loads((root/'data/prompt-library.json').read_text(encoding='utf8'))
    original=original_sections((root/'src/content/guide-19.html').read_text(encoding='utf8'))
    entries={x['metadata']['id']:x for x in manifest['extra_prompts']}
    parts=[];nav=[];current=None;mapping={}; rendered=[]
    for card in config:
        ident=card['id'];anchor='template-'+ident
        if card['category']!=current:
            current=card['category'];parts.append('<h2>'+html.escape(current)+'</h2>')
            nav.append('<strong>'+html.escape(current)+'</strong>')
        text=[]
        for number in card.get('original_sections',[]):
            if not card.get('task'):
                text += [node.text().strip() for node in Document(original[number]).root.find_all('pre')]
            mapping[number]=anchor
        if card.get('task'):
            entry=entries[card['task']]
            task=(root/'src'/entry['file']).read_text(encoding='utf8')
            text += [node.text().strip() for node in Document(task).root.find_all('pre')]
        text.append(card.get('instruction',''))
        prompt='\n\n'.join(x for x in text if x)
        aliases=card.get('aliases',[])+(['补充-'+card['task']] if card.get('task') else [])
        alias_html=''.join('<span id="'+html.escape(x)+'"></span>' for x in aliases)
        content=f'<section class="template-card" id="{anchor}">{alias_html}<h3>{html.escape(card["title"])}</h3>'
        for label,key in [('适用','use'),('准备','inputs'),('交付','outputs'),('填写示例','example')]:
            if card.get(key):content+='<p><strong>'+label+'：</strong>'+html.escape(card[key])+'</p>'
        content+='<p>状态：完整模板，尚未执行图像任务；请替换为真实素材后使用。</p>'
        content+='<div class="codebox"><div class="codebar"><span>完整任务词</span><button class="copy-btn" type="button">复制</button></div><pre><code>'+html.escape(prompt)+'</code></pre></div></section>'
        parts.append(content);nav.append('<a href="#'+anchor+'">'+html.escape(card['title'])+'</a>')
        rendered.append({'id':ident,'anchor':anchor,'text':prompt,'html':content})
    # Original short prompts stay in the source/archive; the reading chapter links
    # to one maintained task card instead of repeating the same template twice.
    source=(root/'src/content/guide-19.html').read_text(encoding='utf8')
    mapping.update({5:'template-G06',9:'template-G06',10:'template-G07',15:'template-G07'})
    for number,anchor in mapping.items():
        section=original[number]
        replacement=re.sub(r'<div class="codebox">[\s\S]*?</pre></div>',
            '<p>完整提示词已整合到<a href="#'+anchor+'">对应任务模板</a>，包含输入、具体指令与交付检查。</p>',section)
        source=source.replace(section,replacement)
    return ''.join(parts),''.join(nav),source,rendered
