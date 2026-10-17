const fs=require('node:fs'),path=require('node:path'),{createHash}=require('node:crypto');
const root=path.resolve(__dirname,'..');
const plugin=path.resolve(process.argv[2]||path.join(root,'node_modules/@capacitor/local-notifications'));
if(JSON.parse(fs.readFileSync(path.join(plugin,'package.json'),'utf8')).version!=='8.3.1')throw Error('Review NUR alarm patch before changing LocalNotifications version.');
const source=path.join(root,'patches/local-notifications-8.3.1');
const target=path.join(plugin,'android/src/main/kotlin/com/capacitorjs/plugins/localnotifications');
const manifest=JSON.parse(fs.readFileSync(path.join(source,'manifest.json'),'utf8'));
const sha=b=>createHash('sha256').update(b).digest('hex');
// Validate everything before writing, including on repeated syncs.
for(const entry of manifest){const old=sha(fs.readFileSync(path.join(target,entry.file)));if(![entry.original,entry.patched].includes(old)||sha(fs.readFileSync(path.join(source,entry.file)))!==entry.patched)throw Error('Unexpected plugin contents: '+entry.file);}
for(const entry of manifest)fs.copyFileSync(path.join(source,entry.file),path.join(target,entry.file));
const java=path.join(plugin,'android/src/main/java/com/capacitorjs/plugins/localnotifications');fs.mkdirSync(java,{recursive:true});fs.copyFileSync(path.join(source,'NurPrayerAlarmPolicy.java'),path.join(java,'NurPrayerAlarmPolicy.java'));
console.log('NUR prayer alarm patch verified and applied (LocalNotifications 8.3.1).');
