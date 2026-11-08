const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const {createHash}=require('node:crypto');
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
  async function json(url){
    for(let attempt=0;attempt<3;attempt++){
      try{const res=await fetch(url,{signal:AbortSignal.timeout(20000),cache:'no-store'});
        if(!res.ok){const error=Error('Sürüm geçmişi alınamadı: '+res.status);error.retryable=res.status===429||res.status>=500;throw error;}
        return await res.json();
      }catch(error){if(attempt===2||error.retryable===false||error instanceof SyntaxError)throw error;await new Promise(resolve=>setTimeout(resolve,1500*(attempt+1)));}
    }
  }
  const release=await json('https://api.github.com/repos/UyGarTRK/NUR-Mobile/releases/latest');
  const tag=release.tag_name?.match(/^nur-test-(\d+)$/);
  if(!tag||release.draft)throw Error('Geçersiz yayımlanmış sürüm');
  const manifest={versionCode:Number(tag[1])};
  const asset=release.assets?.find(a=>a.name==='nur-release-history.json'&&a.state==='uploaded');
  // Verify the checked-in archive against GitHub's digest, without relying on download redirects.
  const digest=rows=>'sha256:'+createHash('sha256').update(JSON.stringify({releases:rows},null,2)+'\n').digest('hex');
  if(manifest.versionCode===versionCode)history=mergeHistory(history,{versionCode,versionName,changes:notes.changes});
  if(history[0].versionCode!==manifest.versionCode||!asset?.digest||digest(history)!==asset.digest)throw Error('Yerel sürüm geçmişi yayımlanmış arşivle eşleşmiyor');
  if(manifest.versionCode>versionCode)throw Error('Eski paket yeniden yayımlanamaz');
  if(manifest.versionCode!==versionCode&&notes.baseVersionCode!==manifest.versionCode)throw Error('Yeni paket için release-notes.json güncellenmeli');
  const current={versionCode,versionName,changes:notes.changes};
  const existing=history.find(row=>row.versionCode===versionCode);
  if(existing&&JSON.stringify(existing.changes)!==JSON.stringify(current.changes))throw Error('Yayımlanmış sürüm notları değiştirilemez');
  return {releases:mergeHistory(history,current)};
}
module.exports={createHistory,validateHistory,mergeHistory};
