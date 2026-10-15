"""Keep the existing inline-HTML download available from the same content."""
from html import escape
from html_documents import Document, Element

BASE='font-size:16px;line-height:30px;color:#222;'
def inline_body(source):
    def render(node):
        if isinstance(node,str):return escape(node)
        tag=node.tag;classes=node.attrs.get('class','').split()
        if tag in {'button','script','style','nav'} or any(x in classes for x in ['codebar','anchor','chapter-kicker']):return ''
        if tag=='pre':
            values=node.find_all('code');text=(values[0] if values else node).text().strip('\n')
            lines=''.join('<p style="'+BASE+'margin:0;padding:0;">'+(escape(line) if line else '<br>')+'</p>' for line in text.split('\n'))
            return '<section style="'+BASE+'padding:12px;margin:14px 0;border-left:2px solid #ff5b1a;background:#fffdfb;">'+lines+'</section>'
        inner=''.join(render(x) for x in node.children)
        if tag in {'h1','h2','h3','h4'}:
            size={'h1':24,'h2':20,'h3':18,'h4':17}[tag]
            return '<p style="font-size:'+str(size)+'px;line-height:'+str(size+16)+'px;font-weight:bold;color:#222;margin:22px 0 12px;">'+inner+'</p>'
        if tag in {'table','thead','tbody'}:return inner
        if tag=='tr':return '<section style="'+BASE+'padding:10px;margin:8px 0;border-left:2px solid #e6e6e6;">'+inner+'</section>'
        if tag in {'p','td','th','li'}:return '<p style="'+BASE+'margin:0 0 12px;">'+('• ' if tag=='li' else '')+inner+'</p>'
        if tag=='a':
            href=node.attrs.get('href','')
            if href.startswith('#'):href='https://wangge-dev.github.io/ai-visual-creation-handbook/'+href
            return '<a style="'+BASE+'color:#ad420f;" href="'+escape(href,quote=True)+'">'+inner+'</a>'
        if tag in {'strong','b'}:return '<strong>'+inner+'</strong>'
        if tag=='br':return '<br>'
        if tag=='hr':return '<section style="height:1px;margin:18px 0;background:#e6e6e6;"></section>'
        return inner
    return '<section id="article" style="'+BASE+'padding:0;margin:0;background:#fff;">'+render(Document(source).root)+'</section>'

def preview(body):
    return '''<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>公众号正文复制</title><style>body{margin:0;background:#fafafa;font-family:Microsoft YaHei,sans-serif}header,main{max-width:760px;margin:auto;padding:20px;background:#fff}header{font-size:14px;line-height:1.8}button{background:#ff5b1a;color:#fff;border:0;border-radius:6px;padding:10px 16px;cursor:pointer}</style><header><button id="copy">复制公众号正文</button><span id="status" role="status">只复制下方正文。</span><p>正文与单页同源。公众号实际粘贴尚未核验；可按章节选取需要的内容。</p></header><main>'''+body+'''</main><script>document.getElementById('copy').onclick=async()=>{const article=document.getElementById('article');try{await navigator.clipboard.write([new ClipboardItem({'text/html':new Blob([article.outerHTML],{type:'text/html'}),'text/plain':new Blob([article.innerText],{type:'text/plain'})})]);document.getElementById('status').textContent='正文已复制';}catch(e){const range=document.createRange();range.selectNodeContents(article);const selection=getSelection();selection.removeAllRanges();selection.addRange(range);document.getElementById('status').textContent='正文已选中，请按Ctrl+C';}};</script></html>'''
