const fs=require('fs'),vm=require('vm'),assert=require('assert/strict');
const html=fs.readFileSync('src/index.html','utf8');
const code=html.slice(html.indexOf('    let automaticLocationRefresh='),html.indexOf('    function refreshPrayerDataIfNeeded('));
let saved={type:'auto',latitude:37.45,longitude:30.58},now=10000,calls=0,updates=[],fallbacks=0,message='',fail=false,resolvePosition;
const w={NurNativeNotifications:{isNative:()=>true},NurDeviceLocation:{getCurrentPosition:async options=>{calls++;assert.equal(options.requestPermission,false);assert.equal(options.maximumAge,0);if(fail)throw Error('permission/GPS denied');if(resolvePosition)return new Promise(resolve=>resolvePosition.resolve=resolve);return {coords:{latitude:36.89,longitude:30.7}};}}};
vm.runInNewContext(code,{window:w,Date:{now:()=>now},JSON,Number,Math,Promise,parseSavedLocation:()=>saved,fetchPrayerTimes:async(a,b)=>updates.push([a,b]),refreshPrayerDataIfNeeded:async()=>{fallbacks++;},setHeaderLocationStatus:t=>message=t});
(async()=>{
 await Promise.all([w.NurRefreshLocationOnOpen(),w.NurRefreshLocationOnOpen()]);assert.equal(calls,1);assert.deepEqual(updates,[[36.89,30.7]]);
 now+=4000;await w.NurRefreshLocationOnOpen();assert.equal(calls,2);
 saved={type:'manual',province:'Burdur',district:'Bucak'};now+=4000;await w.NurRefreshLocationOnOpen();assert.equal(calls,2);
 saved={type:'auto',latitude:37.45,longitude:30.58};fail=true;now+=4000;await w.NurRefreshLocationOnOpen();assert.equal(saved.latitude,37.45);assert.equal(updates.length,2);assert(message.includes('son kayıtlı konum'));assert.equal(fallbacks,2);
 fail=false;now+=4000;resolvePosition={};const pending=w.NurRefreshLocationOnOpen();saved={type:'manual',district:'Bucak'};resolvePosition.resolve({coords:{latitude:36.89,longitude:30.7}});await pending;assert.equal(updates.length,2);
 assert(html.includes('else if(initialLocation.type==="auto"){if(window.NurNativeNotifications?.isNative())refreshAutomaticLocationOnOpen()'));
 assert(html.includes('updatePrayerRows();window.NurRefreshLocationOnOpen?.();'));
 assert(html.includes("options.requestPermission!==false"));
 console.log('PASS: travel coordinates, duplicate resume, next resume, manual preservation, failed GPS, manual switch during GPS, startup/native wiring. Not a device test.');
})().catch(e=>{console.error(e);process.exitCode=1;});
