(function(){
const ADMIN_HASH='d9f8c790c4a6728b820fa2f364603552744dd763121ae35980860d6ff51306c9';
let selected='content/site.json';
const $=s=>document.querySelector(s);
const $$=s=>Array.from(document.querySelectorAll(s));
const status=t=>{ const el=$('#status'); if(el) el.textContent=t; };
function saveLocal(){ ['owner','repo','branch'].forEach(id=>{const el=$('#'+id); if(el) localStorage.setItem('gisa_'+id,el.value||'');}); }
function loadLocal(){ ['owner','repo','branch'].forEach(id=>{const el=$('#'+id); if(el) el.value=localStorage.getItem('gisa_'+id)|| (id==='branch'?'main':'');}); }
async function sha256(text){ const buf=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(text)); return Array.from(new Uint8Array(buf)).map(b=>b.toString(16).padStart(2,'0')).join(''); }
async function unlock(){ const pass=$('#adminPass')?.value||''; const h=await sha256(pass); if(h===ADMIN_HASH){ sessionStorage.setItem('gisa_admin_ok','1'); $('#loginGate').style.display='none'; $('#cmsApp').style.display='grid'; status('Admin açıldı. İçerik değişiklikleri GitHub’a kaydedilince Vercel otomatik deploy eder.'); loadLocal(); } else { $('#loginMsg').textContent='Şifre hatalı.'; } }
function cfg(){ saveLocal(); return{owner:$('#owner').value.trim(),repo:$('#repo').value.trim(),branch:$('#branch').value.trim()||'main',token:$('#token').value.trim()} }
async function gh(method,path,body){ const c=cfg(); if(!c.owner||!c.repo||!c.token) throw new Error('Owner, repo ve GitHub token zorunlu'); const url=`https://api.github.com/repos/${c.owner}/${c.repo}/contents/${path}${method==='GET'?`?ref=${c.branch}`:''}`; const r=await fetch(url,{method:method==='GET'?'GET':'PUT',headers:{Authorization:`Bearer ${c.token}`,Accept:'application/vnd.github+json'},body:method==='GET'?undefined:JSON.stringify(body)}); const j=await r.json(); if(!r.ok) throw new Error(j.message||'GitHub hata'); return j; }
function decodeB64(str){ return decodeURIComponent(escape(atob(str.replace(/
/g,'')))); }
function encodeB64(str){ return btoa(unescape(encodeURIComponent(str))); }
async function loadSelected(){ status('Yükleniyor...'); const j=await gh('GET',selected); const txt=decodeB64(j.content); $('#editor').value=JSON.stringify(JSON.parse(txt),null,2); $('#editor').dataset.sha=j.sha; status('Yüklendi: '+selected); }
async function saveSelected(){ JSON.parse($('#editor').value); status('GitHub’a kaydediliyor...'); const content=encodeB64($('#editor').value); await gh('PUT',selected,{message:'GISA CMS update '+selected,content,sha:$('#editor').dataset.sha,branch:cfg().branch}); status('Kaydedildi. GitHub değişti; Vercel otomatik yeni versiyonu yayına alır.'); }
async function uploadImage(e){ const f=e.target.files[0]; if(!f)return; status('Görsel GitHub’a yükleniyor...'); const reader=new FileReader(); reader.onload=async()=>{ const base64=reader.result.split(',')[1]; const safe=f.name.toLowerCase().replace(/[^a-z0-9.]+/g,'-'); const filePath='public/uploads/'+Date.now()+'-'+safe; await gh('PUT',filePath,{message:'GISA CMS upload '+safe,content:base64,branch:cfg().branch}); const publicPath='/uploads/'+filePath.split('/').pop(); $('#imagePath').value=publicPath; status('Görsel yüklendi. JSON içinde bu yolu kullan: '+publicPath); }; reader.readAsDataURL(f); }
window.addEventListener('DOMContentLoaded',()=>{
  $('#unlockBtn')?.addEventListener('click',unlock); $('#adminPass')?.addEventListener('keydown',e=>{if(e.key==='Enter')unlock();});
  if(sessionStorage.getItem('gisa_admin_ok')==='1'){ $('#loginGate').style.display='none'; $('#cmsApp').style.display='grid'; loadLocal(); }
  $$('[data-file]').forEach(b=>b.onclick=()=>{ selected=b.dataset.file; $$('[data-file]').forEach(x=>x.classList.remove('active')); b.classList.add('active'); status(selected+' seçildi'); });
  $('#load')?.addEventListener('click',()=>loadSelected().catch(e=>status('Hata: '+e.message)));
  $('#save')?.addEventListener('click',()=>saveSelected().catch(e=>status('Hata: '+e.message)));
  $('#image')?.addEventListener('change',e=>uploadImage(e).catch(err=>status('Hata: '+err.message)));
  $('#copyImagePath')?.addEventListener('click',()=>navigator.clipboard.writeText($('#imagePath').value||''));

  $('#newFragrance')?.addEventListener('click',()=>{ selected='content/fragrances.json'; $('#editor').value=JSON.stringify({fragrances:[{slug:'yeni-koku',name:'Yeni Koku Profili',family:'Premium',tr:'Kısa Türkçe açıklama',description:'Detaylı açıklama',mood:'Lüks, temiz ve kalıcı atmosfer',intensity:'Orta',longevity:'Yüksek',top:['bergamot'],heart:['musk'],base:['amber'],sectors:['kozmetik']} ]},null,2); status('Yeni koku şablonu hazır. Mevcut dosyayı yükleyip içine eklemek daha güvenlidir.'); });
  $('#newPost')?.addEventListener('click',()=>{ selected='content/blog.json'; $('#editor').value=JSON.stringify({posts:[{slug:'yeni-yazi',title:'Yeni İçerik Başlığı',category:'Guide',excerpt:'Kısa özet',body:['Paragraf 1','Paragraf 2']}]},null,2); status('Yeni blog şablonu hazır.'); });
});
})();

(function(){
  const $=(s,r=document)=>r.querySelector(s); const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
  function preview(){const ed=$('#editor'), box=$('#livePreview'); if(!ed||!box)return; try{const data=JSON.parse(ed.value||'{}'); const keys=Object.keys(data); let html='<h4>JSON geçerli ✅</h4><p>Üst alanlar: '+keys.join(', ')+'</p>'; if(data.site) html+=`<p><b>Site:</b> ${data.site.name||'Gisa'} / ${data.site.description||''}</p>`; if(data.fragrances) html+=`<p><b>Koku sayısı:</b> ${data.fragrances.length}</p>`; if(data.sectors) html+=`<p><b>Sektör sayısı:</b> ${data.sectors.length}</p>`; if(data.posts) html+=`<p><b>Blog sayısı:</b> ${data.posts.length}</p>`; html+='<pre>'+JSON.stringify(data,null,2).slice(0,1200)+'</pre>'; box.innerHTML=html; box.style.borderColor='rgba(200,164,106,.22)';}catch(e){box.innerHTML='<b>JSON hatalı ❌</b><p>'+e.message+'</p>'; box.style.borderColor='rgba(255,70,70,.55)';}}
  window.addEventListener('DOMContentLoaded',()=>{const ed=$('#editor'); ed?.addEventListener('input',preview); setInterval(preview,2000);
    let dragged=null; $$('.drag-item').forEach(el=>{el.addEventListener('dragstart',()=>{dragged=el;el.classList.add('dragging')});el.addEventListener('dragend',()=>{el.classList.remove('dragging');dragged=null});el.addEventListener('dragover',e=>{e.preventDefault(); const box=$('#moduleOrder'); if(!dragged||dragged===el)return; const items=$$('.drag-item',box); const di=items.indexOf(dragged), ti=items.indexOf(el); if(di<ti) el.after(dragged); else el.before(dragged);});});
    $('#writeModuleOrder')?.addEventListener('click',()=>{const ed=$('#editor'); if(!ed)return; let data={}; try{data=JSON.parse(ed.value||'{}')}catch(e){alert('Önce geçerli site.json yükle');return;} if(!data.site)data.site={}; data.site.homeModules=$$('.drag-item').map(x=>x.dataset.module); ed.value=JSON.stringify(data,null,2); preview();});
  });
})();
