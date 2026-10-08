const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict'),path=require('path');
const html=fs.readFileSync(path.resolve(__dirname,'../../src/index.html'),'utf8');
for(const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)){if(!/application\/json|src=/.test(match[1]))new vm.Script(match[2]);}
const source=html.slice(html.indexOf('    function buildAdhanPlan('),html.indexOf('    function syncAdhanNotificationBridge('));
const settings={enabled:true,leadMinutes:5,sound:false,vibration:true,prayers:{Fajr:true}};
const context=vm.createContext({adhanNotificationSettings:settings,prayerCalendarDays:new Map([['2030-01-02',[{key:'Fajr',label:'İmsak',time:'00:03'}]]])});
vm.runInContext(source,context);
function plan(at='2030-01-01T23:50:00+03:00'){return context.buildAdhanPlan(new Date(at));}
for(const lead of [0,5,10,15,30]){settings.leadMinutes=lead;const p=plan('2030-01-01T23:00:00+03:00');assert.equal(p.length,lead?2:1);assert.equal(p.filter(x=>x.category==='prayer').length,1);assert.equal(p.at(-1).at,Date.parse('2030-01-02T00:03:00+03:00'));}
settings.leadMinutes=5;assert.equal(plan('2030-01-02T00:00:00+03:00').length,1,'Elapsed reminder must not remove prayer notification');
settings.prayers.Fajr=false;assert.equal(plan().length,0);settings.prayers.Fajr=true;
settings.leadMinutes=5;const events=plan();
const nativeSource=html.match(/<script>\s*\/\* NUR: HTML preview and native Android permission\/notification bridge\. \*\/([\s\S]*?)<\/script>/)[1];
const calls={channels:[],scheduled:[],cancelled:[]};let pending=[];
const plugin={getPending:async()=>({notifications:pending}),checkPermissions:async()=>({display:'granted'}),checkExactNotificationSetting:async()=>({exact_alarm:'granted'}),createChannel:async c=>calls.channels.push(c),schedule:async({notifications})=>{calls.scheduled.push(notifications);pending=notifications;},cancel:async({notifications})=>calls.cancelled.push(notifications)};
const window={Capacitor:{isNativePlatform:()=>true,registerPlugin:()=>plugin},NurNotificationSounds:{get:c=>({nativeFile:c==='prayer'?'nur_ezan_vakti_2.mp3':'nur_ezan_oncesi_1.mp3',label:c})}};
vm.runInNewContext(nativeSource,{window,document:{getElementById:()=>null,addEventListener:()=>{}},Date,Set,Number,Promise,console});
(async()=>{
 await window.NurNativeNotifications.sync({...settings,plan:events});
 const notifications=calls.scheduled[0];assert.equal(notifications.length,2);
 assert.equal(notifications.find(x=>x.extra.soundCategory==='prayer').sound,'nur_ezan_vakti_2.mp3');
 assert.equal(notifications.find(x=>x.extra.soundCategory==='before').sound,'nur_silent.wav');
 assert.equal(new Set(notifications.map(x=>x.id)).size,2);
 await window.NurNativeNotifications.sync({...settings,enabled:false,plan:[]});assert.equal(calls.cancelled[0].length,2);
 await window.NurNativeNotifications.sync({...settings,prayers:{Fajr:false},plan:[]});assert.equal(calls.cancelled[1].length,2,'Deselecting every prayer must cancel stale alarms');
 plugin.schedule=async()=>{throw Error('simulated schedule failure');};const cancelled=calls.cancelled.length;
 await window.NurNativeNotifications.sync({...settings,plan:events});assert.equal(calls.cancelled.length,cancelled,'Scheduling failure must preserve existing alarms');
 assert.ok(html.includes('Ön hatırlatma sesi'));assert.ok(html.includes('timeZone:"Europe/Istanbul"'));
 assert.equal(fs.readFileSync(path.resolve(__dirname,'../../../NUR-Namaz-Uygulamasi-v6-Kuran.html'),'utf8'),html);
 console.log('PASS: inline JS syntax; 5 timing options; midnight reminder; elapsed reminder; prayer selection; independent sounds; distinct IDs; master off; failed scheduling preserves alarms; control-copy equality');
})().catch(e=>{console.error(e);process.exitCode=1});
