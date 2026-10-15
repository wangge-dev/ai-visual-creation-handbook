(function () {
  if(location.protocol==='file:') {
    const html=document.querySelector('.reader-links a[download="电商AI作图完整攻略.html"]');
    if(html)html.href=location.href.split('#')[0];
    const markdown=document.querySelector('.reader-links a[href$="handbook.md"]');
    if(markdown)markdown.textContent='在线下载整本Markdown';
  }
  async function copy(text) {
    try {await navigator.clipboard.writeText(text);return true;} catch (_) {
      const field=document.createElement('textarea');field.value=text;field.setAttribute('readonly','');
      field.style.cssText='position:fixed;left:-9999px;top:0;';document.body.appendChild(field);field.select();
      let ok=false;try{ok=document.execCommand('copy');}finally{field.remove();}return ok;
    }
  }
  document.querySelectorAll('.copy-btn').forEach(btn=>btn.addEventListener('click',async()=>{
    const code=btn.closest('.codebox').querySelector('code');const old=btn.textContent;
    if(await copy(code.textContent)) {btn.textContent='已复制';setTimeout(()=>btn.textContent=old,1200);}
    else {const range=document.createRange();range.selectNodeContents(code);const selection=getSelection();selection.removeAllRanges();selection.addRange(range);btn.textContent='已选中，请按Ctrl+C';}
  }));
  document.getElementById('copyPromptPack')?.addEventListener('click',async function(){
    const cards=document.querySelectorAll('#promptDoc .template-card');
    const text=Array.from(cards).map(x=>x.querySelector('h3').textContent+'\n\n'+x.querySelector('code').textContent).join('\n\n---\n\n');
    const ok=await copy(text);this.textContent=ok?'全部'+cards.length+'项已复制':'复制失败，请逐条复制';
  });
}());
