const fs = require('fs'), path = require('path'), vm = require('vm'), assert = require('node:assert/strict');
const html = fs.readFileSync(path.resolve(__dirname, '../../src/index.html'), 'utf8');
const source = html.match(/<script id="nur-updates-controller">([\s\S]*?)<\/script>/)[1];
async function setup({native=true, configured=true, check=async()=>({state:'current'})}={}) {
  const events={}, timers=[], calls=[];
  const elements=Object.fromEntries(['nur-check-updates','nur-update-status','nur-update-version'].map(id=>[id,{disabled:false,textContent:'',addEventListener(type,fn){this[type]=fn;}}]));
  const plugin={status:async()=>({configured,versionName:'0.3.2-test',versionCode:5}),check:async arg=>{calls.push(arg);return check(arg);}};
  const document={hidden:false,getElementById:id=>elements[id],addEventListener:(type,fn)=>events[type]=fn};
  vm.runInNewContext(source,{window:{Capacitor:{isNativePlatform:()=>native,registerPlugin:()=>plugin}},document,setTimeout:fn=>timers.push(fn)});
  await events.DOMContentLoaded();
  return {events,timers,calls,elements,document};
}
(async()=>{
  for(const options of [{native:false},{configured:false}]){
    const t=await setup(options);assert.equal(t.elements['nur-check-updates'].disabled,true);assert.equal(t.timers.length,0);assert.equal(t.calls.length,0);
  }
  const t=await setup();assert.match(t.elements['nur-update-version'].textContent,/0\.3\.2-test \(5\)/);
  await t.timers[0]();assert.equal(t.calls[0].interactive,false);
  await t.elements['nur-check-updates'].click();assert.equal(t.calls[1].interactive,true);
  assert.match(t.elements['nur-update-status'].textContent,/Güncel NUR/);
  const available=await setup({check:async()=>({state:'available'})});
  await available.timers[0]();assert.match(available.elements['nur-update-status'].textContent,/Yeni sürüm hazır/);
  assert.doesNotMatch(source,/sign_in_required|Google hesabı|test hesabı/);
  t.document.hidden=true;await t.events.visibilitychange();assert.equal(t.calls.length,2);
  t.document.hidden=false;await t.events.visibilitychange();assert.equal(t.calls.length,3);assert.equal(t.calls[2].interactive,false);
  const failed=await setup({check:async()=>{throw Error('Bağlantı yok');}});
  await failed.elements['nur-check-updates'].click();assert.equal(failed.elements['nur-check-updates'].disabled,false);assert.match(failed.elements['nur-update-status'].textContent,/Bağlantı yok/);
  let release;const concurrent=await setup({check:()=>new Promise(resolve=>release=resolve)});
  const first=concurrent.elements['nur-check-updates'].click();await concurrent.elements['nur-check-updates'].click();assert.equal(concurrent.calls.length,1);assert.equal(concurrent.elements['nur-check-updates'].disabled,true);release({state:'checked'});await first;
  console.log('PASS: browser/unconfigured disabled; native version; silent auto vs manual checks; hidden resume; failure recovery; concurrent checks blocked');
})().catch(error=>{console.error(error);process.exitCode=1;});
