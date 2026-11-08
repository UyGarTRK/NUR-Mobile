const {chromium}=require('playwright');
const {build}=require('esbuild');
const assert=require('node:assert/strict');
const authStub=`
export const initializeApp=c=>c,getAuth=()=>({}),getFirestore=()=>({}),browserLocalPersistence={};
export async function setPersistence(){}
let callback;
const getUser=()=>JSON.parse(sessionStorage.getItem('testUser')||'null');
export function onAuthStateChanged(auth,fn){callback=fn;queueMicrotask(()=>fn(getUser()));return ()=>{};}
export async function signInWithEmailAndPassword(auth,email,password){if(password!=='test-only-password')throw {code:'auth/invalid-credential'};const user={uid:email.split('@')[0],email,emailVerified:true,displayName:email.split('@')[0]};sessionStorage.setItem('testUser',JSON.stringify(user));callback(user);return {user};}
export const createUserWithEmailAndPassword=signInWithEmailAndPassword;
export async function signOut(){sessionStorage.removeItem('testUser');callback(null);}
export async function updateProfile(user,change){Object.assign(user,change);sessionStorage.setItem('testUser',JSON.stringify(user));}
export async function sendEmailVerification(){} export async function sendPasswordResetEmail(){} export async function reload(){}
export const doc=(db,...p)=>p.join('/'),serverTimestamp=()=>123;
export function onSnapshot(){return ()=>{};}
export async function runTransaction(db,fn){let revision=0,write=null;const result=await fn({get:async ref=>{const row=await window.testRead(ref);revision=row?.revision||0;return {exists:()=>!!row,data:()=>row};},set:(ref,row)=>write={ref,row}});if(write)await window.testWrite({...write,expected:revision});return result;}
`;
(async()=>{
 const out=await build({entryPoints:['src/account/account.mjs'],bundle:true,write:false,format:'iife',plugins:[{name:'fake-firebase',setup(b){b.onResolve({filter:/^firebase\//},a=>({path:a.path,namespace:'test'}));b.onLoad({filter:/.*/,namespace:'test'},()=>({contents:authStub,loader:'js'}));}}]});
 const html=`<!doctype html><html><head><style>[hidden]{display:none!important}</style></head><body><header class="site-header-inner"></header><main id="settings-profile-panel"></main><script>window.NUR_FIREBASE_CONFIG={enabled:true,projectId:'nur-mobile-ec382',apiKey:'test-only'};</script><script src="/account.js"></script><script>window.dispatchEvent(new Event('nur-app-ready'));</script></body></html>`;
 const server=require('http').createServer((q,r)=>{r.setHeader('Content-Type',q.url==='/account.js'?'text/javascript':'text/html; charset=utf-8');r.end(q.url==='/account.js'?out.outputFiles[0].text:html);});await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const base='http://127.0.0.1:'+server.address().port,rows=new Map(),browser=await chromium.launch({channel:'msedge',headless:true});
 const ref=uid=>'nur_users/'+uid+'/state/progress',pack=n=>({nurQuranBookmark:JSON.stringify({surah:2,ayah:n})});
 rows.set(ref('alice'),{schema:2,payload:JSON.stringify(pack(10)),revision:1});
 const errors=[];
 async function device(){const context=await browser.newContext();await context.exposeBinding('testRead',(_,r)=>rows.get(r)||null);await context.exposeBinding('testWrite',(_,{ref,row,expected})=>{assert.equal(rows.get(ref)?.revision||0,expected);rows.set(ref,row);});const p=await context.newPage();p.on('pageerror',e=>errors.push(e.message));await p.goto(base);return {context,p};}
 async function login(p,id){if(!await p.locator('#nur-account-dialog').isVisible())await p.locator('#site-account').click();await p.locator('#account-email').fill(id+'@example.invalid');await p.locator('#account-password').fill('test-only-password');await p.locator('#account-submit').click();await p.waitForFunction(id=>localStorage.getItem('nurAccountOwnerV2')===id,id);await p.locator('#account-logout').waitFor({state:'visible'});}
 async function bookmark(p,n){await p.evaluate(n=>localStorage.setItem('nurQuranBookmark',JSON.stringify({surah:2,ayah:n})),n);}
 async function current(p){return p.evaluate(()=>JSON.parse(localStorage.getItem('nurQuranBookmark')||'null')?.ayah);}
 async function waitCloud(n){for(let i=0;i<100;i++){if(JSON.parse(JSON.parse(rows.get(ref('alice')).payload).nurQuranBookmark).ayah===n)return;await new Promise(r=>setTimeout(r,100));}throw Error('cloud did not reach '+n);}
 try{
  const a=await device();await bookmark(a.p,5);await login(a.p,'alice');assert.equal(await current(a.p),10,'login loads cloud');assert.equal(await a.p.evaluate(()=>JSON.parse(localStorage.getItem('nurAccountGuestV2')).nurQuranBookmark),JSON.stringify({surah:2,ayah:5}));
  await bookmark(a.p,11);await waitCloud(11);
  await a.p.locator('#account-logout').click();await a.p.locator('#account-auth-form').waitFor({state:'visible'});assert.equal(await current(a.p),5,'logout restores guest');
  await login(a.p,'bob');assert.equal(await current(a.p),undefined,'second user cannot inherit first or guest data');
  await a.p.locator('#account-logout').click();await a.p.locator('#account-auth-form').waitFor({state:'visible'});await login(a.p,'alice');assert.equal(await current(a.p),11);
  const b=await device();await login(b.p,'alice');assert.equal(await current(b.p),11,'second device loads cloud');
  await a.context.setOffline(true);await bookmark(a.p,12);await bookmark(b.p,13);await waitCloud(13);await a.context.setOffline(false);
  await a.p.locator('#account-conflict').waitFor({state:'visible'});assert.equal(await current(a.p),12,'local conflict remains intact');await a.p.locator('#account-use-cloud').click();await a.p.waitForFunction(()=>JSON.parse(localStorage.getItem('nurQuranBookmark')).ayah===13);
  assert.deepEqual(errors,[]);console.log('PASS: shared account, guest isolation, account switch, two-device progress, offline conflict and explicit resolution (simulated Firebase).');
 }finally{await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
