const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync(path.resolve(__dirname,'../../src/index.html'),'utf8');
const source=html.match(/<script>\s*\/\* NUR: HTML preview and native Android permission\/notification bridge\. \*\/([\s\S]*?)<\/script>/)[1];
const display={textContent:''};let response={notifications:false,exact:false,batteryUnrestricted:false,backgroundRestricted:true,doNotDisturb:true,channels:[]};
const opened=[];
const access={state:async()=>response,openSettings:async x=>opened.push(x.kind)};
const window={Capacitor:{isNativePlatform:()=>true,registerPlugin:name=>name==='NurNotificationAccess'?access:{}}};
vm.runInNewContext(source,{window,document:{getElementById:id=>id==='adhan-device-permissions'?display:null,addEventListener(){}},Date,Set,Number,Promise});
(async()=>{
 await window.NurNativeNotifications.deviceState();
 for(const text of ['Bildirim: kapalı','Dakik alarm: kapalı','Pil optimizasyonu: etkin','Arka plan kısıtı: var','Rahatsız Etmeyin: etkin'])assert.ok(display.textContent.includes(text));
 response={...response,notifications:true,exact:true,batteryUnrestricted:true,backgroundRestricted:false,doNotDisturb:false};
 await window.NurNativeNotifications.deviceState();assert.ok(display.textContent.includes('Dakik alarm: açık'));assert.ok(display.textContent.includes('Bildirim: açık'));
 await window.NurNativeNotifications.systemSettings('notifications');await window.NurNativeNotifications.systemSettings('battery');assert.deepEqual(opened,['notifications','battery']);
 access.state=async()=>{throw Error('old APK');};await window.NurNativeNotifications.deviceState();assert.ok(display.textContent.includes('APK gereklidir'));
 console.log('PASS: permission denial, alarm/battery/background/DND states, settings actions and old-APK fallback.');
})().catch(error=>{console.error(error);process.exitCode=1;});
