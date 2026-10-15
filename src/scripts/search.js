(function () {
  const input=document.getElementById('searchBox'),status=document.getElementById('searchStatus');
  let matches=[],position=-1;
  function clear() {
    document.querySelectorAll('mark.search-hit').forEach(mark=>{const parent=mark.parentNode;mark.replaceWith(document.createTextNode(mark.textContent));parent.normalize();});
    matches=[];position=-1;
  }
  function move(delta) {
    if(!matches.length)return;
    matches.forEach(x=>x.classList.remove('current-hit'));
    position=(position+delta+matches.length)%matches.length;
    const node=matches[position];node.classList.add('current-hit');window.GuideReader.reveal(node);
    node.scrollIntoView({block:'center',behavior:'smooth'});status.textContent=`${position+1} / ${matches.length}`;
  }
  input.addEventListener('input',()=>{
    clear();const query=input.value.trim();if(!query){status.textContent='';return;}
    const wanted=query.toLocaleLowerCase();
    document.querySelectorAll('article.doc .markdown-body').forEach(article=>{
      const walker=document.createTreeWalker(article,NodeFilter.SHOW_TEXT,{acceptNode(node){
        return node.parentElement.closest('button,script,style,.codebar')?NodeFilter.FILTER_REJECT:node.nodeValue.toLocaleLowerCase().includes(wanted)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;
      }});
      const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
      for(const node of nodes){
        const value=node.nodeValue,lower=value.toLocaleLowerCase(),fragment=document.createDocumentFragment();let offset=0,index;
        while((index=lower.indexOf(wanted,offset))!==-1){fragment.appendChild(document.createTextNode(value.slice(offset,index)));const mark=document.createElement('mark');mark.className='mark search-hit';mark.textContent=value.slice(index,index+query.length);fragment.appendChild(mark);matches.push(mark);offset=index+query.length;}
        fragment.appendChild(document.createTextNode(value.slice(offset)));node.replaceWith(fragment);
      }
    });
    status.textContent=matches.length?`${matches.length} 处结果，Enter跳转`:'没有找到';
  });
  input.addEventListener('keydown',event=>{if(event.key==='Enter'){event.preventDefault();move(event.shiftKey?-1:1);}if(event.key==='Escape'){input.value='';clear();status.textContent='';}});
  document.getElementById('searchPrev').addEventListener('click',()=>move(-1));
  document.getElementById('searchNext').addEventListener('click',()=>move(1));
}());
