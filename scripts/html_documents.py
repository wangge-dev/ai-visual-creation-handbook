"""Small HTML document reader for this guide's Markdown exports (stdlib only)."""
from html.parser import HTMLParser
from html import escape
import re

class Element:
    def __init__(self, tag='', attrs=(), parent=None):
        self.tag, self.attrs, self.parent = tag, dict(attrs), parent
        self.children = []
    def text(self):
        return ''.join(x.text() if isinstance(x,Element) else x for x in self.children)
    def find_all(self, tag):
        out=[]
        for child in self.children:
            if isinstance(child,Element):
                if child.tag==tag:out.append(child)
                out.extend(child.find_all(tag))
        return out

class Document(HTMLParser):
    voids={'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}
    def __init__(self, source):
        super().__init__(convert_charrefs=True)
        self.root=Element('document');self.current=self.root;self.feed(source)
    def handle_starttag(self,tag,attrs):
        node=Element(tag,attrs,self.current);self.current.children.append(node)
        if tag not in self.voids:self.current=node
    def handle_startendtag(self,tag,attrs):
        self.handle_starttag(tag,attrs)
        if tag not in self.voids:self.handle_endtag(tag)
    def handle_endtag(self,tag):
        p=self.current
        while p is not self.root:
            if p.tag==tag:self.current=p.parent;return
            p=p.parent
    def handle_data(self,data):self.current.children.append(data)

def normalized(value):return re.sub(r'\s+',' ',value).strip()

def markdown(source, link_map=None, preserve_heading_ids=False):
    links=link_map or {}
    def render(node):
        if isinstance(node,str):return re.sub(r'\s+',' ',node)
        tag=node.tag;classes=node.attrs.get('class','').split()
        if tag in {'button','script','style','nav'} or 'codebar' in classes or 'anchor' in classes or 'chapter-kicker' in classes:return ''
        if tag=='pre':
            code=node.find_all('code');code=code[0] if code else node
            language=next((x[9:] for x in code.attrs.get('class','').split() if x.startswith('language-')),'text')
            text=code.text().strip('\n');fence='`'*max(3,max((len(m[0])+1 for m in re.finditer(r'`{3,}',text)),default=3))
            return '\n\n'+fence+language+'\n'+text+'\n'+fence+'\n\n'
        if tag=='table':
            rows=[]
            for row in node.find_all('tr'):
                cells=[normalized(''.join(render(x) for x in cell.children)).replace('|','\\|') for cell in row.children if isinstance(cell,Element) and cell.tag in {'td','th'}]
                if cells:rows.append(cells)
            if not rows:return ''
            width=max(map(len,rows));rows=[r+['']*(width-len(r)) for r in rows]
            lines=['| '+' | '.join(rows[0])+' |','| '+' | '.join(['---']*width)+' |']
            lines+=['| '+' | '.join(r)+' |' for r in rows[1:]]
            return '\n\n'+'\n'.join(lines)+'\n\n'
        if tag in {'ul','ol'}:
            items=[x for x in node.children if isinstance(x,Element) and x.tag=='li'];parts=[]
            for i,item in enumerate(items):
                text=''.join(render(x) for x in item.children).strip()
                marker=str(i+1)+'. ' if tag=='ol' else '- '
                lines=text.splitlines() or [''];parts.append(marker+lines[0]+''.join('\n  '+line for line in lines[1:]))
            return '\n\n'+'\n'.join(parts)+'\n\n'
        text=''.join(render(x) for x in node.children)
        if re.fullmatch(r'h[1-6]',tag):
            marker='<!--heading:'+escape(node.attrs['id'])+'-->\n\n' if preserve_heading_ids and node.attrs.get('id') else ''
            return '\n\n'+marker+'#'*int(tag[1])+' '+normalized(text)+'\n\n'
        if tag in {'p','section','div','article','details','summary'}:return '\n\n'+text.strip()+'\n\n'
        if tag=='br':return '<br>'
        if tag=='hr':return '\n\n---\n\n'
        if tag=='blockquote':return '\n\n'+'\n'.join('> '+line for line in text.strip().splitlines())+'\n\n'
        if tag in {'b','strong'}:return '**'+text.strip()+'**'
        if tag in {'em','i'}:return '*'+text.strip()+'*'
        if tag=='a':
            href=node.attrs.get('href','');return '['+text.strip()+']('+links.get(href,href)+')' if href else text
        if tag=='img':return '!['+node.attrs.get('alt','')+']('+node.attrs.get('src','')+')'
        if tag=='code':
            value=node.text();fence='``' if '`' in value else '`';return fence+value+fence
        return text
    text=render(Document(source).root).strip()
    # Preserve blank lines inside fences; normalize only the surrounding HTML layout.
    out=[];in_code=False;blank=False
    for line in text.splitlines():
        if re.match(r'^`{3,}',line):in_code=not in_code
        if not in_code and not line.strip():
            if blank:continue
            blank=True
        else:blank=False
        out.append(line.rstrip() if not in_code else line)
    return '\n'.join(out).strip()+'\n'
