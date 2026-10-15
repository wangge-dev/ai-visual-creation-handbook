(function () {
  const names = {guide:['guideDoc','guideIndex'],prompt:['promptDoc','promptIndex'],supplement:['supplementDoc','supplementIndex']};
  function show(name, scroll) {
    if (!names[name]) return;
    for (const [key, ids] of Object.entries(names)) {
      ids.forEach(id => document.getElementById(id)?.classList.toggle('hidden',key!==name));
    }
    document.querySelectorAll('.tab').forEach(btn=>{
      const selected=btn.dataset.target===name;
      btn.classList.toggle('active',selected);btn.setAttribute('aria-selected',String(selected));
    });
    if(scroll)document.querySelector('.controls').scrollIntoView({block:'start'});
  }
  function reveal(node) {
    const article=node?.closest('article.doc');
    const entry=Object.entries(names).find(([,ids])=>ids[0]===article?.id);
    if(entry)show(entry[0],false);
    for(let parent=node?.parentElement;parent;parent=parent.parentElement){if(parent.tagName==='DETAILS')parent.open=true;}
  }
  function followHash() {
    let id;try{id=decodeURIComponent(location.hash.slice(1));}catch{return;}
    if(!id)return;
    const node=document.getElementById(id);if(!node)return;
    reveal(node);requestAnimationFrame(()=>node.scrollIntoView({block:'start'}));
  }
  document.querySelectorAll('.tab').forEach(btn=>btn.addEventListener('click',()=>show(btn.dataset.target,true)));
  window.addEventListener('hashchange',followHash);
  window.GuideReader={show,reveal};
  followHash();
}());
