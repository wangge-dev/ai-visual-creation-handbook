(function () {
  const input=document.getElementById('searchBox'),status=document.getElementById('searchStatus');
  const list=document.getElementById('searchResults');
  let matches=[],position=-1,shown=0;
  function renderMore(){
    list.querySelector('.more-results')?.remove();const end=Math.min(shown+20,matches.length);
    for(let i=shown;i<end;i++){
      const node=matches[i],block=node.closest('p,li,td,th,pre,h1,h2,h3,h4')||node.parentElement;
      const section=node.closest('.supplement-section,.template-card');const title=section?.querySelector('h2,h3')?.textContent||'攻略正文与提示词';
      const text=block.textContent.replace(/\s+/g,' ').trim(),offset=text.toLocaleLowerCase().indexOf(input.value.trim().toLocaleLowerCase());
      const b=document.createElement('button');b.type='button';b.className='search-result';const strong=document.createElement('strong');strong.textContent=`${i+1}. ${title}`;
      const snippet=document.createElement('span');snippet.textContent=(offset>35?'…':'')+text.slice(Math.max(0,offset-35),Math.max(0,offset-35)+125);
      b.append(strong,snippet);b.addEventListener('click',()=>{position=i-1;move(1);});list.append(b);
    }
    shown=end;if(shown<matches.length){const b=document.createElement('button');b.type='button';b.className='more-results';b.textContent=`显示更多（还有${matches.length-shown}处）`;b.onclick=renderMore;list.append(b);}
  }
  function clear() {
    document.querySelectorAll('mark.search-hit').forEach(mark=>{const parent=mark.parentNode;mark.replaceWith(document.createTextNode(mark.textContent));parent.normalize();});
    matches=[];position=-1;shown=0;list.replaceChildren();list.hidden=true;
  }
  function move(delta) {
    if(!matches.length)return;
    matches.forEach(x=>x.classList.remove('current-hit'));
    position=(position+delta+matches.length)%matches.length;
    const node=matches[position];node.classList.add('current-hit');window.revealReadingCard?.(node);window.GuideReader.reveal(node);list.hidden=true;
    node.scrollIntoView({block:'center',behavior:'smooth'});status.textContent=`${position+1} / ${matches.length}`;
  }
  input.addEventListener('input',()=>{
    clear();const query=input.value.trim();if(!query){status.textContent='';return;}
    const wanted=query.toLocaleLowerCase();
    document.querySelectorAll('article.doc .markdown-body').forEach(article=>{
      const walker=document.createTreeWalker(article,NodeFilter.SHOW_TEXT,{acceptNode(node){
        return node.parentElement.closest('button,script,style,.codebar,.task-filter')?NodeFilter.FILTER_REJECT:node.nodeValue.toLocaleLowerCase().includes(wanted)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;
      }});
      const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
      for(const node of nodes){
        const value=node.nodeValue,lower=value.toLocaleLowerCase(),fragment=document.createDocumentFragment();let offset=0,index;
        while((index=lower.indexOf(wanted,offset))!==-1){fragment.appendChild(document.createTextNode(value.slice(offset,index)));const mark=document.createElement('mark');mark.className='mark search-hit';mark.textContent=value.slice(index,index+query.length);fragment.appendChild(mark);matches.push(mark);offset=index+query.length;}
        fragment.appendChild(document.createTextNode(value.slice(offset)));node.replaceWith(fragment);
      }
    });
    status.textContent=matches.length?`${matches.length} 处结果，Enter跳转`:'没有找到';
    renderMore();list.hidden=!matches.length;
  });
  input.addEventListener('focus',()=>{if(matches.length)list.hidden=false;});
  input.addEventListener('keydown',e=>{if(e.key==='ArrowDown'&&!list.hidden){e.preventDefault();list.querySelector('button')?.focus();}});
  list.addEventListener('keydown',e=>{if(e.key==='Escape'){input.focus();list.hidden=true;}});
  document.addEventListener('click',e=>{if(!e.target.closest('.search-group'))list.hidden=true;});
  input.addEventListener('keydown',event=>{if(event.key==='Enter'){event.preventDefault();move(event.shiftKey?-1:1);}if(event.key==='Escape'){input.value='';clear();status.textContent='';}});
  document.getElementById('searchPrev').addEventListener('click',()=>move(-1));
  document.getElementById('searchNext').addEventListener('click',()=>move(1));
}());
