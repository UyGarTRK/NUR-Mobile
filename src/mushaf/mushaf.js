/* Page-exact Diyanet edition. Reading position is not a completed-hatim record. */
const base=new URL('.',import.meta.url),key='nurMushafPositionV1';
let metadata,documentPromise,pdf,renderTask,token=0,page=0,zoom=1,opened=false,previousOverflow='',returnFocus,renderedPage=null,resizeTimer,pendingSurah=null,lastWidth=0;
const byId=id=>document.getElementById(id);
const view=document.createElement('section');view.id='nur-mushaf';view.hidden=true;view.setAttribute('role','dialog');view.setAttribute('aria-modal','true');view.setAttribute('aria-labelledby','mushaf-title');
view.innerHTML=`<header class="mushaf-header"><button id="mushaf-back" type="button" aria-label="Sûre bilgisine dön">← Geri</button><div><h3 id="mushaf-title">Kur’an Oku</h3><small>Diyanet mushafı</small></div><button id="mushaf-resume" type="button" hidden>Kaldığım sayfa</button></header>
<div class="mushaf-toolbar"><label>Sayfa <select id="mushaf-page" aria-label="Mushaf sayfası"></select></label><label>Cüz <select id="mushaf-juz" aria-label="Cüz seçin"></select></label><button id="mushaf-minus" type="button" aria-label="Sayfayı küçült">−</button><button id="mushaf-plus" type="button" aria-label="Sayfayı büyüt">+</button><button id="mushaf-fit" type="button">Sığdır</button></div>
<p id="mushaf-state" class="mushaf-state" role="status" aria-live="polite"></p><button id="mushaf-retry" type="button" hidden>Yeniden dene</button>
<div id="mushaf-viewport" class="mushaf-viewport"><div id="mushaf-sheet" class="mushaf-sheet"></div></div>
<p class="mushaf-source">Diyanet İşleri Başkanlığı · Yayın No: 949 · 2018</p>
<nav class="mushaf-nav" aria-label="Mushaf sayfaları"><button id="mushaf-previous" type="button">← Önceki</button><output id="mushaf-position"></output><button id="mushaf-next" type="button">Sonraki →</button></nav>`;
document.body.append(view);
function saved(){try{const v=JSON.parse(localStorage.getItem(key));return v?.edition===metadata?.edition&&Number.isInteger(v.page)&&v.page>=0&&v.page<=604?v:null;}catch{return null;}}
async function load(){
 if(!metadata){const r=await fetch(new URL('manifest.json',base));if(!r.ok)throw Error('Mushaf dizini açılamadı.');metadata=await r.json();}
 if(!documentPromise){documentPromise=(async()=>{const lib=await import('./vendor/pdf.mjs');lib.GlobalWorkerOptions.workerSrc=new URL('vendor/pdf.worker.mjs',base).href;const result=await lib.getDocument({url:new URL('diyanet-949-2018.pdf',base).href,standardFontDataUrl:new URL('vendor/standard_fonts/',base).href,wasmUrl:new URL('vendor/wasm/',base).href,isEvalSupported:false,enableXfa:false}).promise;if(result.numPages!==metadata.pdfPageCount)throw Error('Mushaf sürümü doğrulanamadı.');return result;})().catch(e=>{documentPromise=null;throw e;});}
 pdf=await documentPromise;return pdf;
}
function controls(){byId('mushaf-page').value=String(page);byId('mushaf-juz').value=String(page===0?1:Math.min(30,Math.floor((page-1)/20)+1));byId('mushaf-previous').disabled=page===0;byId('mushaf-next').disabled=page===604;byId('mushaf-minus').disabled=zoom<=1;byId('mushaf-plus').disabled=zoom>=2;}
function label(n){return n===0?'Fâtiha':`Sayfa ${n} / 604`;}
async function show(n,{resetScroll=true}={}){
 if(!opened||!Number.isInteger(n)||n<0||n>604)return;page=n;const current=++token;renderTask?.cancel();renderTask=null;controls();byId('mushaf-retry').hidden=true;const keepPage=!resetScroll&&renderedPage===n&&byId('mushaf-sheet').firstChild;byId('mushaf-state').textContent=keepPage?'':'Mushaf sayfası hazırlanıyor…';byId('mushaf-position').textContent=label(page);byId('mushaf-sheet').hidden=!keepPage;if(resetScroll)clearGesture();
 try{
  await load();if(current!==token||!opened)return;
  const pdfPage=await pdf.getPage(n+2);if(current!==token||!opened)return;
  const targetWidth=Math.max(260,byId('mushaf-viewport').clientWidth)*zoom,viewport=pdfPage.getViewport({scale:1}),scale=targetWidth/viewport.width;
  // Keep one rendered page and cap pixel allocation on older Android devices.
  const ratio=Math.min(devicePixelRatio||1,2,Math.sqrt(4500000/(targetWidth*targetWidth*viewport.height/viewport.width)));
  const rendered=pdfPage.getViewport({scale:scale*ratio}),canvas=document.createElement('canvas');canvas.width=Math.floor(rendered.width);canvas.height=Math.floor(rendered.height);canvas.setAttribute('role','img');canvas.setAttribute('aria-label','Diyanet mushafı — '+label(n));
  const task=pdfPage.render({canvasContext:canvas.getContext('2d'),viewport:rendered});renderTask=task;await task.promise;
  if(current!==token||!opened){pdfPage.cleanup();return;}
  byId('mushaf-sheet').style.width=targetWidth+'px';byId('mushaf-sheet').replaceChildren(canvas);byId('mushaf-sheet').hidden=false;byId('mushaf-state').textContent='';renderedPage=n;
  if(resetScroll){byId('mushaf-viewport').scrollTop=0;byId('mushaf-viewport').scrollLeft=0;}
  try{localStorage.setItem(key,JSON.stringify({edition:metadata.edition,page:n,updatedAt:Date.now()}));}catch{byId('mushaf-state').textContent='Sayfa açıldı; okuma konumu bu cihazda kaydedilemedi.';}
  window.dispatchEvent(new CustomEvent('nur-mushaf-page-visible',{detail:{edition:metadata.edition,page:n,pdfPage:n+2}}));
  pdfPage.cleanup();renderTask=null;
 }catch(e){if(current!==token||!opened||e.name==='RenderingCancelledException')return;byId('mushaf-state').textContent='Sayfa açılamadı. Yeniden deneyin.';byId('mushaf-retry').hidden=false;}
}
async function open(surah){if(opened)return;opened=true;const opening=++token;pendingSurah=surah;renderedPage=null;lastWidth=0;returnFocus=document.activeElement;previousOverflow=document.body.style.overflow;document.body.style.overflow='hidden';view.hidden=false;byId('mushaf-back').focus();zoom=1;byId('mushaf-state').textContent='Mushaf açılıyor…';
 try{await load();if(!opened||opening!==token)return;const position=saved();byId('mushaf-resume').hidden=!position;byId('mushaf-resume').onclick=()=>show(position.page);pendingSurah=null;await show(Number(metadata.surahStarts[String(surah)])||0);}catch{if(!opened||opening!==token)return;byId('mushaf-state').textContent='Mushaf açılamadı. Yeniden deneyin.';byId('mushaf-retry').hidden=false;}
}
function close(restore=true){if(!opened)return;opened=false;clearGesture();renderedPage=null;pendingSurah=null;++token;clearTimeout(resizeTimer);renderTask?.cancel();renderTask=null;view.hidden=true;byId('mushaf-sheet').replaceChildren();document.body.style.overflow=previousOverflow;if(restore)returnFocus?.focus({preventScroll:true});}
window.NurMushaf={open,close,isOpen:()=>opened};
for(let n=0;n<=604;n++)byId('mushaf-page').add(new Option(n===0?'Fâtiha':String(n),String(n)));
for(let n=1;n<=30;n++)byId('mushaf-juz').add(new Option(String(n),String(n)));
byId('mushaf-back').onclick=()=>close();byId('mushaf-page').onchange=e=>show(Number(e.target.value));byId('mushaf-juz').onchange=e=>show((Number(e.target.value)-1)*20+1);
byId('mushaf-previous').onclick=()=>show(page-1);byId('mushaf-next').onclick=()=>show(page+1);byId('mushaf-retry').onclick=()=>{if(pendingSurah!==null){const surah=pendingSurah;close(false);open(surah);}else show(page);};
const viewport=byId('mushaf-viewport'),sheet=byId('mushaf-sheet');
let gesture=null,hadMulti=false,zoomChanged=false;
function clearGesture(){gesture=null;hadMulti=false;zoomChanged=false;}
function localPoint(t){const r=viewport.getBoundingClientRect();return {x:t.clientX-r.left,y:t.clientY-r.top};}
function anchorAt(p){return {x:(viewport.scrollLeft+p.x)/zoom,y:(viewport.scrollTop+p.y)/zoom};}
function applyZoom(value,anchor,point){
 zoom=Math.max(1,Math.min(2,value));sheet.style.width=Math.max(260,viewport.clientWidth)*zoom+'px';
 viewport.scrollLeft=anchor.x*zoom-point.x;viewport.scrollTop=anchor.y*zoom-point.y;controls();
}
function invalidateRender(){++token;renderTask?.cancel();renderTask=null;}
function setZoom(n){if(renderedPage===null||sheet.hidden)return;clearGesture();invalidateRender();const point={x:viewport.clientWidth/2,y:viewport.clientHeight/2};applyZoom(n,anchorAt(point),point);show(page,{resetScroll:false});}
byId('mushaf-plus').onclick=()=>setZoom(zoom+.25);byId('mushaf-minus').onclick=()=>setZoom(zoom-.25);byId('mushaf-fit').onclick=()=>{zoom=1;show(page);};
function beginGesture(touches){
 if(touches.length>=2){
  const a=localPoint(touches[0]),b=localPoint(touches[1]),point={x:(a.x+b.x)/2,y:(a.y+b.y)/2};
  gesture={kind:'pinch',distance:Math.max(1,Math.hypot(a.x-b.x,a.y-b.y)),startZoom:zoom,anchor:anchorAt(point)};hadMulti=true;invalidateRender();
 }else if(touches.length===1){const p=localPoint(touches[0]);gesture={kind:'pan',start:p,last:p,startZoom:zoom};}
}
viewport.addEventListener('touchstart',e=>{
 if(!opened||renderedPage===null||sheet.hidden)return;
 e.preventDefault();if(!gesture){hadMulti=false;zoomChanged=false;}beginGesture(e.touches);
},{passive:false});
viewport.addEventListener('touchmove',e=>{
 if(!gesture)return;e.preventDefault();
 if(e.touches.length>=2){
  if(gesture.kind!=='pinch'){beginGesture(e.touches);return;}
  const a=localPoint(e.touches[0]),b=localPoint(e.touches[1]),point={x:(a.x+b.x)/2,y:(a.y+b.y)/2};
  applyZoom(gesture.startZoom*Math.hypot(a.x-b.x,a.y-b.y)/gesture.distance,gesture.anchor,point);zoomChanged=true;
 }else if(e.touches.length===1){
  if(gesture.kind!=='pan'){beginGesture(e.touches);return;}
  const p=localPoint(e.touches[0]);viewport.scrollLeft+=gesture.last.x-p.x;viewport.scrollTop+=gesture.last.y-p.y;gesture.last=p;
 }
},{passive:false});
function endGesture(e,cancelled=false){
 if(!gesture)return;e.preventDefault();
 if(!cancelled&&e.touches.length){beginGesture(e.touches);return;}
 const old=gesture,multi=hadMulti,redraw=zoomChanged;clearGesture();
 if(!cancelled&&!multi&&old.kind==='pan'&&old.startZoom===1&&zoom===1&&e.changedTouches.length){
  const p=localPoint(e.changedTouches[0]),dx=p.x-old.start.x,dy=p.y-old.start.y;
  if(Math.abs(dx)>65&&Math.abs(dx)>Math.abs(dy)*1.4){show(page+(dx<0?1:-1));return;}
 }
 if(redraw)show(page,{resetScroll:false});
}
viewport.addEventListener('touchend',e=>endGesture(e),{passive:false});
viewport.addEventListener('touchcancel',e=>endGesture(e,true),{passive:false});
view.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();close();}if(e.target.closest('select,input'))return;if(e.key==='ArrowRight'){e.preventDefault();show(page+1);}if(e.key==='ArrowLeft'){e.preventDefault();show(page-1);}if(e.key==='Tab'){const focusable=[...view.querySelectorAll('button,select')].filter(x=>!x.disabled&&!x.hidden);const first=focusable[0],last=focusable.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}});
new ResizeObserver(()=>{const width=viewport.clientWidth;if(width===lastWidth)return;lastWidth=width;if(!opened||renderedPage===null)return;clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>show(page,{resetScroll:false}),180);}).observe(viewport);
document.getElementById('quran-start-mushaf')?.addEventListener('click',()=>open(Number(document.getElementById('quran-intro-number').textContent)));
