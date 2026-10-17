const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const latest='https://github.com/UyGarTRK/NUR-Mobile/releases/latest/download/';
function validateHistory(rows){
  if(!Array.isArray(rows)||!rows.length)throw Error('Sürüm geçmişi eksik');
  const seen=new Set();
  for(const row of rows){
    if(!Number.isSafeInteger(row.versionCode)||row.versionCode<1||seen.has(row.versionCode)||typeof row.versionName!=='string'||!Array.isArray(row.changes)||!row.changes.length||row.changes.some(x=>typeof x!=='string'||!x.trim()))throw Error('Geçersiz sürüm notları');
    seen.add(row.versionCode);
  }
  return rows.slice().sort((a,b)=>b.versionCode-a.versionCode);
}
function mergeHistory(previous,current){return validateHistory([current,...previous.filter(row=>row.versionCode!==current.versionCode)]);}
async function createHistory(){
  const notes=JSON.parse(fs.readFileSync(path.join(root,'release-notes.json'),'utf8'));
  let history=validateHistory(notes.history);
  if(!process.env.GITHUB_RUN_NUMBER)return {releases:history,pending:notes.changes};
  const versionCode=100+Number(process.env.GITHUB_RUN_NUMBER);
  const versionName=fs.readFileSync(path.join(root,'android/app/build.gradle'),'utf8').match(/versionName\s+"([^"]+)"/)?.[1];
  async function json(url){const res=await fetch(url,{signal:AbortSignal.timeout(20000),cache:'no-store'});if(!res.ok)throw Error('Sürüm geçmişi alınamadı: '+res.status);return res.json();}
  const manifest=await json(latest+'nur-update.json');
  if(manifest.packageName!=='tr.com.nur.namaz'||!Number.isSafeInteger(manifest.versionCode))throw Error('Geçersiz yayımlanmış sürüm');
  // 112 predates the history asset; its verified notes are the initial seed.
  if(manifest.versionCode>112){
    const archive=await json(`https://github.com/UyGarTRK/NUR-Mobile/releases/download/nur-test-${manifest.versionCode}/nur-release-history.json`);
    history=validateHistory(archive.releases);
    if(history[0].versionCode!==manifest.versionCode)throw Error('Sürüm geçmişi güncel değil');
  }
  if(manifest.versionCode>versionCode)throw Error('Eski paket yeniden yayımlanamaz');
  if(manifest.versionCode!==versionCode&&notes.baseVersionCode!==manifest.versionCode)throw Error('Yeni paket için release-notes.json güncellenmeli');
  const current={versionCode,versionName,changes:notes.changes};
  const existing=history.find(row=>row.versionCode===versionCode);
  if(existing&&JSON.stringify(existing.changes)!==JSON.stringify(current.changes))throw Error('Yayımlanmış sürüm notları değiştirilemez');
  return {releases:mergeHistory(history,current)};
}
module.exports={createHistory,validateHistory,mergeHistory};
