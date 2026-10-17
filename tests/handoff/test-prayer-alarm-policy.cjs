const fs=require('node:fs'),path=require('node:path'),os=require('node:os');
const {execFileSync}=require('node:child_process');
const root=path.resolve(__dirname,'../..'),temp=fs.mkdtempSync(path.join(os.tmpdir(),'nur-alarm-policy-'));
const exe=name=>process.env.JAVA_HOME?path.join(process.env.JAVA_HOME,'bin',name+(process.platform==='win32'?'.exe':'')):name;
try{
 execFileSync(exe('javac'),['-encoding','UTF-8','-d',temp,path.join(root,'patches/local-notifications-8.3.1/NurPrayerAlarmPolicy.java'),path.join(__dirname,'PrayerAlarmPolicyTest.java')],{stdio:'inherit'});
 execFileSync(exe('java'),['-cp',temp,'PrayerAlarmPolicyTest'],{stdio:'inherit'});
}finally{fs.rmSync(temp,{recursive:true,force:true});}
