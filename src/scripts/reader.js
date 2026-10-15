(function(){
 const small=matchMedia('(max-width:1080px)'),menus=[...document.querySelectorAll('.index-panel')];
 function resize(){menus.forEach(d=>d.open=!small.matches);}resize();small.addEventListener('change',resize);
 menus.forEach(d=>d.addEventListener('click',e=>{if(e.target.closest('a')&&small.matches)d.open=false;}));
 document.querySelectorAll('table.mobile-cards').forEach(table=>{table.classList.add('cards-ready');const labels=[...table.querySelectorAll('thead th')].map(x=>x.textContent);table.querySelectorAll('tbody tr').forEach(row=>[...row.cells].forEach((cell,i)=>cell.dataset.label=labels[i]||''));});
 const filters=document.getElementById('readingFilters');
 if(filters){const cards=[...document.querySelectorAll('.reading-card')];
  function filter(tag){filters.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.task===tag)));cards.forEach(c=>c.hidden=tag!=='全部'&&!c.dataset.tasks.split(' ').includes(tag));document.querySelectorAll('.reading-group').forEach(g=>g.hidden=![...g.querySelectorAll('.reading-card')].some(c=>!c.hidden));document.getElementById('readingCount').textContent=`显示 ${cards.filter(c=>!c.hidden).length} / ${cards.length} 篇`;}
  filters.addEventListener('click',e=>{const b=e.target.closest('button');if(b)filter(b.dataset.task);});
  window.revealReadingCard=node=>{if(node.closest('.reading-card')?.hidden)filter('全部');};
  function follow(){let id;try{id=decodeURIComponent(location.hash.slice(1));}catch{return;}const node=document.getElementById(id);if(node)window.revealReadingCard(node);}
  window.addEventListener('hashchange',follow);filter('全部');follow();
 }
})();
