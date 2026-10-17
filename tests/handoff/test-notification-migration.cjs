const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync(path.resolve(__dirname,'../../src/index.html'),'utf8');
const bridge=html.match(/<script>\s*\/\* NUR: HTML preview and native Android permission\/notification bridge\. \*\/([\s\S]*?)<\/script>/)[1];
const events=Array.from({length:360},(_,i)=>({date:new Date(Date.UTC(2030,0,1+Math.floor(i/12))).toISOString().slice(0,10),key:['Fajr','Sunrise','Dhuhr','Asr','Maghrib','Isha'][Math.floor(i%12/2)],category:i%2?'before':'prayer',leadMinutes:i%2?5:0,at:Date.UTC(2030,0,1)+i*3600000,label:'Vakit',time:'12:00'}));
(async()=>{for(const mode of ['legacy','current','interrupted']){
 const legacy=mode!=='current';
 let alarms=new Map(events.map((x,i)=>[legacy?100000000+i:100000000+Math.floor(Date.parse(x.date)/86400000)*12+Math.floor(i%12/2)*2+i%2,{id:legacy?100000000+i:100000000+Math.floor(Date.parse(x.date)/86400000)*12+Math.floor(i%12/2)*2+i%2,extra:{date:x.date,key:x.key,soundCategory:x.category}}]));
 const saved=new Map(alarms);
 if(mode==='interrupted')for(const [i,x] of events.slice(0,140).entries()){const id=100000000+Math.floor(Date.parse(x.date)/86400000)*12+Math.floor(i%12/2)*2+i%2;alarms.set(id,{id});}
 const ceiling=alarms.size;let peak=alarms.size,failures=0,success=0;
 const plugin={getPending:async()=>({notifications:[...saved.values()]}),checkPermissions:async()=>({display:'granted'}),checkExactNotificationSetting:async()=>({exact_alarm:'granted'}),createChannel:async()=>{},cancel:async({notifications})=>notifications.forEach(n=>{alarms.delete(n.id);saved.delete(n.id);}),schedule:async({notifications})=>{for(const n of notifications){if(!alarms.has(n.id)&&alarms.size>=500){failures++;throw Error('Maximum limit of concurrent alarms reached');}alarms.set(n.id,n);saved.set(n.id,n);peak=Math.max(peak,alarms.size);}success++;}};
 const window={Capacitor:{isNativePlatform:()=>true,registerPlugin:()=>plugin},NurNotificationSounds:{get:()=>({nativeFile:'test.mp3',label:'Test'})}};
 vm.runInNewContext(bridge,{window,document:{getElementById:()=>null,addEventListener:()=>{}},Date,Set,Map,Number,Promise,console});
 const payload={enabled:true,prayers:{Fajr:true},sound:true,vibration:true,plan:events};
 await window.NurNativeNotifications.sync(payload);
 assert.equal(failures,0,'Updating 360 old alarms must not exceed the Android alarm limit');assert.equal(success,1);assert.equal(alarms.size,360);assert.ok(peak<=ceiling);
 const before=[...alarms.values()];await window.NurNativeNotifications.sync({...payload,plan:[...events].reverse()});
 for(const n of alarms.values())assert.equal(n.id,before.find(x=>x.extra.date===n.extra.date&&x.extra.key===n.extra.key&&x.extra.soundCategory===n.extra.soundCategory).id);
 // Replacing the entire planning window must reuse the available slots too.
 await window.NurNativeNotifications.sync({...payload,plan:events.map(x=>({...x,date:x.date.replace('2030','2031'),at:x.at+365*86400000}))});
 assert.equal(failures,0);assert.equal(alarms.size,360);assert.ok(peak<=ceiling);
 }console.log('PASS: legacy, current and interrupted alarm migration, reordered plans and full date replacement stay within 360 alarms');})().catch(e=>{console.error(e);process.exitCode=1});
