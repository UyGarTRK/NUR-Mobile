(() => {
'use strict';
const KEY='nurFastingProgressV1',types={ramadan:'Ramazan',makeup:'Kaza',voluntary:'Nafile',vow:'Adak'},states={completed:'Tutuldu',planned:'Planlandı',missed:'Tutulmadı'},marks={completed:'●',planned:'◇',missed:'−'};
const dateKey=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const parse=k=>{if(!/^\d{4}-\d{2}-\d{2}$/.test(k))throw Error();const [y,m,d]=k.split('-').map(Number),v=new Date(y,m-1,d,12);if(dateKey(v)!==k)throw Error();return v;};
function init(){
 const root=document.getElementById('fasting-page');if(!root)return;
 const $=id=>document.getElementById('fasting-'+id);let selected=dateKey(new Date()),month=parse(selected),records={},broken=false;
 const message=text=>$('message').textContent=text;
 function read(){try{const v=JSON.parse(localStorage.getItem(KEY)||'{}');if(!v||typeof v!=='object'||Array.isArray(v))throw Error();for(const [k,r]of Object.entries(v)){parse(k);if(!r||!Object.hasOwn(types,r.type)||!Object.hasOwn(states,r.status)||typeof r.note!=='string'||r.note.length>300)throw Error();}records=v;broken=false;}catch{broken=true;message('Kayıtlar okunamadı. Mevcut verilerinizin üzerine yazılmadı.');}}
 function editor(){const r=records[selected];$('date-title').textContent=parse(selected).toLocaleDateString('tr-TR',{day:'numeric',month:'long',year:'numeric'});$('type').value=r?.type||'ramadan';$('status').value=r?.status||(selected>dateKey(new Date())?'planned':'completed');$('note').value=r?.note||'';$('delete').hidden=!r;}
 function render(){
 $('month-title').textContent=month.toLocaleDateString('tr-TR',{month:'long',year:'numeric'});const y=month.getFullYear(),m=month.getMonth(),prefix=dateKey(new Date(y,m,1,12)).slice(0,7);$('days').replaceChildren();
 for(let i=0;i<(new Date(y,m,1).getDay()+6)%7;i++)$('days').append(document.createElement('span'));
 for(let d=1;d<=new Date(y,m+1,0).getDate();d++){const k=dateKey(new Date(y,m,d,12)),r=records[k],b=document.createElement('button');b.type='button';b.textContent=String(d)+(r?' '+marks[r.status]:'');b.dataset.date=k;b.setAttribute('aria-label',`${d} ${$('month-title').textContent}${r?', '+types[r.type]+', '+states[r.status]:''}`);b.setAttribute('aria-pressed',String(k===selected));if(k===dateKey(new Date()))b.setAttribute('aria-current','date');b.addEventListener('click',()=>{selected=k;message('');render();editor();});$('days').append(b);}
 const entries=Object.entries(records).filter(([k])=>k.startsWith(prefix)).sort(([a],[b])=>a.localeCompare(b));const count=s=>entries.filter(([,r])=>r.status===s).length;
 $('summary').textContent=`${count('completed')} gün tutuldu · ${count('planned')} gün planlandı · ${count('missed')} gün tutulmadı`;
 $('history').replaceChildren();if(!entries.length)$('history').textContent='Bu ay için henüz kayıt yok.';
 for(const [k,r]of entries){const b=document.createElement('button');b.type='button';b.className='fasting-record';b.textContent=`${parse(k).toLocaleDateString('tr-TR',{day:'numeric',month:'long'})} · ${types[r.type]} · ${states[r.status]}${r.note?' — '+r.note:''}`;b.onclick=()=>{selected=k;render();editor();$('date-title').scrollIntoView({block:'center',behavior:'smooth'});};$('history').append(b);}
 }
 function refresh(){read();render();editor();}window.NurFasting={refresh};
 for(const [id,n]of [['prev',-1],['next',1]])$(id).onclick=()=>{month=new Date(month.getFullYear(),month.getMonth()+n,1,12);render();};
 $('today').onclick=()=>{selected=dateKey(new Date());month=parse(selected);render();editor();};
 function save(remove=false){read();if(broken)return;const status=$('status').value;if(!remove&&selected>dateKey(new Date())&&status!=='planned'){message('Gelecek bir gün için yalnızca oruç planlayabilirsiniz.');return;}const next={...records};if(remove)delete next[selected];else next[selected]={type:$('type').value,status,note:$('note').value.trim().slice(0,300)};try{localStorage.setItem(KEY,JSON.stringify(next));records=next;render();editor();message(remove?'Kayıt silindi.':'Oruç kaydınız kaydedildi.');}catch{message('Kayıt saklanamadı. Lütfen cihaz depolama alanını kontrol edin.');}}
 $('form').onsubmit=e=>{e.preventDefault();save();};$('delete').onclick=()=>save(true);window.addEventListener('storage',e=>{if(e.key===KEY||e.key===null)refresh();});refresh();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
