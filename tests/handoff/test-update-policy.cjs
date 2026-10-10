const fs=require('node:fs'), path=require('node:path'), os=require('node:os');
const {execFileSync}=require('node:child_process');
const root=path.resolve(__dirname,'../..');
const temp=fs.mkdtempSync(path.join(os.tmpdir(),'nur-update-policy-'));
const exe=name=>process.env.JAVA_HOME?path.join(process.env.JAVA_HOME,'bin',name+(process.platform==='win32'?'.exe':'')):name;
try {
  execFileSync(exe('javac'),['-encoding','UTF-8','-d',temp,path.join(root,'android/app/src/main/java/tr/com/nur/namaz/NurUpdatePolicy.java'),path.join(__dirname,'UpdatePolicyTest.java')],{stdio:'inherit'});
  execFileSync(exe('java'),['-cp',temp,'tr.com.nur.namaz.UpdatePolicyTest'],{stdio:'inherit'});
} finally { fs.rmSync(temp,{recursive:true,force:true}); }
