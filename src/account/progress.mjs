// Shared by the Android shell, website and synchronization tests.
export const keys=['nurEducationProgressV1','nurAlphabetTrainingV1','nurLetterFormsTrainingV1','nurHarakatTrainingV1','nurJoiningTrainingV1','nurQuranNotes','nurQuranBookmark','nurMushafPositionV1','nurDhikrCount','nurDhikrSelection','nurDhikrHistoryV1'];
export const tracked=key=>keys.includes(key)||/^nurGuidedTrainingV1:[a-z0-9-]+$/.test(key);
const plain=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
function safe(v){if(v&&typeof v==='object')for(const k of Object.keys(v)){if(['__proto__','prototype','constructor'].includes(k))throw Error('Geçersiz kayıt alanı');safe(v[k]);}}
export function validate(values){
 if(!plain(values)||Object.keys(values).length>100||new TextEncoder().encode(JSON.stringify(values)).length>700000)throw Error('İlerleme kaydı çok büyük veya geçersiz.');
 for(const [key,value]of Object.entries(values)){if(!tracked(key)||typeof value!=='string')throw Error('Beklenmeyen ilerleme kaydı.');safe(JSON.parse(value));}
 return values;
}
const canonical=v=>JSON.stringify(v&&typeof v==='object'?(Array.isArray(v)?v.map(x=>JSON.parse(canonical(x))):Object.fromEntries(Object.keys(v).sort().map(k=>[k,JSON.parse(canonical(v[k]))]))):v);
export const equal=(a,b)=>a===b||(a!==undefined&&b!==undefined&&canonical(a)===canonical(b));
export function snapshot(storage){const values={};for(let i=0;i<storage.length;i++){const key=storage.key(i);if(tracked(key))values[key]=storage.getItem(key);}return validate(values);}
export function merge(base,local,remote,choice=null){
 [base,local,remote].forEach(validate);const values={},conflicts=[];
 const choose=(b,l,r,path)=>{if(equal(l,b))return r;if(equal(r,b)||equal(l,r))return l;conflicts.push(path);return choice==='remote'?r:l;};
 const group=['nurDhikrCount','nurDhikrSelection'];
 const groupValues=v=>Object.fromEntries(group.filter(k=>Object.hasOwn(v,k)).map(k=>[k,v[k]]));
 Object.assign(values,choose(groupValues(base),groupValues(local),groupValues(remote),'Aktif zikir oturumu'));
 for(const key of new Set([...Object.keys(base),...Object.keys(local),...Object.keys(remote)])){
  if(group.includes(key))continue;
  const decode=v=>v[key]===undefined?undefined:JSON.parse(v[key]);const b=decode(base),l=decode(local),r=decode(remote);let value;
  if(['nurEducationProgressV1','nurQuranNotes'].includes(key)&&plain(l)&&plain(r)&&(b===undefined||plain(b))){value={};for(const field of new Set([...Object.keys(b||{}),...Object.keys(l),...Object.keys(r)])){const v=choose(b?.[field],l[field],r[field],key+':'+field);if(v!==undefined)value[field]=v;}}
  else if(key==='nurDhikrHistoryV1'&&Array.isArray(l)&&Array.isArray(r)&&(b===undefined||Array.isArray(b))&&[...(b||[]),...l,...r].every(v=>typeof v.sessionId==='string')){
   const map=a=>Object.fromEntries((a||[]).map(v=>[v.sessionId,v])),bm=map(b),lm=map(l),rm=map(r);value=[];for(const id of new Set([...Object.keys(bm),...Object.keys(lm),...Object.keys(rm)])){const v=choose(bm[id],lm[id],rm[id],'Zikir oturumu:'+id);if(v!==undefined)value.push(v);}
  }else value=choose(b,l,r,key);
  if(value!==undefined)values[key]=JSON.stringify(value);
 }
 return {values:validate(values),conflicts};
}
