import {initializeApp} from 'firebase/app';
import {getAuth,setPersistence,browserLocalPersistence,onAuthStateChanged,createUserWithEmailAndPassword,signInWithEmailAndPassword,sendEmailVerification,sendPasswordResetEmail,updateProfile,signOut,reload} from 'firebase/auth';
import {getFirestore,doc,onSnapshot,runTransaction,serverTimestamp} from 'firebase/firestore';
import {tracked,snapshot,validate,merge,equal} from './progress.mjs';

const config=window.NUR_FIREBASE_CONFIG,OWNER='nurAccountOwnerV2',GUEST='nurAccountGuestV2',PREFIX='nurAccountCacheV2:';
const rawSet=Storage.prototype.setItem,rawRemove=Storage.prototype.removeItem,rawClear=Storage.prototype.clear;
let auth,db,user=null,ready=false,authBusy=false,working=false,timer,unsubscribe,base={},pending=null,generation=0,needsSync=false;
let panel,dialog,status,accountSummary,refreshing=false;
const $=id=>document.getElementById(id);
const put=(k,v)=>rawSet.call(localStorage,k,JSON.stringify(v));
function read(k,fallback){try{return JSON.parse(localStorage.getItem(k))??fallback;}catch{return fallback;}}
function capture(){return snapshot(localStorage);}
function apply(values){validate(values);const old=capture();try{for(const key of Object.keys(old))rawRemove.call(localStorage,key);for(const [key,value]of Object.entries(values))rawSet.call(localStorage,key,value);}catch(e){for(const key of Object.keys(capture()))rawRemove.call(localStorage,key);for(const [key,value]of Object.entries(old))rawSet.call(localStorage,key,value);throw e;}}
function cache(){const owner=localStorage.getItem(OWNER);if(owner)put(PREFIX+owner,{base,values:capture()});}
function message(text){status.textContent=text;}
function errorMessage(e){const code=e?.code||'';if(/invalid-credential|wrong-password|user-not-found|invalid-login/.test(code))return 'E-posta veya şifre doğru değil.';if(/email-already-in-use/.test(code))return 'Bu e-postayla hesap oluşturulamadı. Giriş yapmayı veya şifre sıfırlamayı deneyin.';if(/weak-password/.test(code))return 'Daha güçlü bir şifre seçin; en az 8 karakter kullanın.';if(/too-many-requests/.test(code))return 'Çok fazla deneme yapıldı. Bir süre sonra tekrar deneyin.';if(/network|unavailable|deadline/.test(code)||!navigator.onLine)return 'Çevrimdışısınız. Bu cihazdaki ilerlemeniz korunuyor; bağlantı gelince yeniden eşitlenecek.';if(/permission-denied/.test(code))return 'Bulut erişimi reddedildi. E-postanızı doğrulayın; sorun sürerse hesap hizmetini kontrol edin.';return e?.message?.startsWith('İlerleme')?e.message:'İşlem tamamlanamadı. Yeniden deneyin; bu cihazdaki kayıtlarınız korunuyor.';}
function render(){
 $('account-submit').disabled=!ready||authBusy;
 const signed=!!user;panel.querySelector('[data-auth]').hidden=signed;panel.querySelector('[data-account]').hidden=!signed;
 $('account-name').textContent=user?.displayName||'Profilim';
 $('account-avatar').textContent=(user?.displayName||'N').trim().slice(0,1).toLocaleUpperCase('tr-TR');
 $('account-badge').textContent=signed?(user.emailVerified?'E-posta doğrulandı':'Doğrulama bekleniyor'):'Misafir · Bu cihazda';$('account-email-label').textContent=user?.email||'Misafir';
 $('account-verify').hidden=!signed||user.emailVerified;$('account-sync').disabled=!signed||!user.emailVerified;
 if(document.activeElement!==$('account-edit-name'))$('account-edit-name').value=user?.displayName||'';
 $('account-conflict').hidden=!pending?.conflicts?.length;$('account-apply-remote').hidden=!pending||!!pending.conflicts.length;
 $('account-import-guest').disabled=!signed||!user.emailVerified||!Object.keys(read(GUEST,{})).length;
 if(accountSummary)accountSummary.textContent=signed?(user.displayName||user.email)+' · Hesabım':'Giriş yap / Hesabım';
 const summary=$('profile-menu-summary');if(summary)summary.textContent=signed?'Hesabım · '+(user.displayName||user.email):'Giriş, hesap oluşturma ve ortak ilerleme';
}
function schedule(){if(!ready||!user?.emailVerified)return;clearTimeout(timer);timer=setTimeout(()=>sync().catch(e=>message(errorMessage(e))),1500);}
function changed(){if(!ready)return;try{cache();}catch{message('İlerleme cihazda saklandı ancak hesap önbelleği kaydedilemedi. Boş alanı kontrol edin.');}schedule();}
Storage.prototype.setItem=function(k,v){rawSet.call(this,k,v);if(this===localStorage&&tracked(String(k)))changed();};
Storage.prototype.removeItem=function(k){rawRemove.call(this,k);if(this===localStorage&&tracked(String(k)))changed();};
Storage.prototype.clear=function(){rawClear.call(this);if(this===localStorage&&ready){generation++;ready=false;unsubscribe?.();message('Cihaz verileri temizlendi. Hesap verilerini tekrar yüklemek için yeniden giriş yapın.');signOut(auth).catch(()=>{});}};

function decode(row){if(!row)return {};if(row.schema!==2||typeof row.payload!=='string')throw Error('İlerleme bulut biçimi geçersiz.');return validate(JSON.parse(row.payload));}
function refreshView(){if(refreshing)return;refreshing=true;sessionStorage.setItem('nurAccountShowAfterReload','1');location.reload();}
async function sync({applyRemote=false,choice=null,initial=false}={}){
 if(!ready||!user?.emailVerified||!navigator.onLine)return;
 if(working){needsSync=true;return;}working=true;
 const owner=user.uid,epoch=generation,local=capture(),baseline=base,expectedPending=pending;
 try{
  const ref=doc(db,'nur_users',owner,'state','progress');
  const result=await runTransaction(db,async tx=>{
   const snap=await tx.get(ref),row=snap.exists()?snap.data():null,remote=decode(row),revision=row?.revision||0;
   if(generation!==epoch||user?.uid!==owner)throw Error('Hesap değişti');
   const acceptedChoice=choice&&expectedPending?.revision===revision?choice:null;
   const combined=merge(baseline,local,remote,acceptedChoice);
   if(combined.conflicts.length&&!acceptedChoice)return {...combined,revision,remote,blocked:true};
   if(!equal(combined.values,local)&&!applyRemote&&!initial)return {...combined,revision,remote,blocked:true};
   const written=!equal(combined.values,remote);if(written)tx.set(ref,{schema:2,payload:JSON.stringify(combined.values),revision:revision+1,updatedAt:serverTimestamp()});
   return {...combined,revision:revision+(written?1:0),remote,blocked:false};
  });
  if(generation!==epoch||user?.uid!==owner)return;
  if(result.blocked){pending=result;message(result.conflicts.length?'Aynı kayıt iki cihazda değişmiş. Kullanılacak sürümü seçin; diğer kayıtlar birleştirilecek.':'Diğer cihazınızdaki yeni ilerleme hazır. Okumanızı bitirince güncel kayıtları açabilirsiniz.');render();return;}
  // Preserve edits made while the network transaction was in flight.
  const latest=capture(),after=merge(local,latest,result.values);
  if(after.conflicts.length){base=result.values;pending={...after,remote:result.values,revision:result.revision};cache();render();message('Eşitleme sırasında kayıt değişti. İki sürüm de korundu; yeniden eşitleyin.');needsSync=true;return;}
  const changedView=!equal(latest,after.values);base=result.values;pending=null;
  if(changedView)apply(after.values);cache();message('Hesabınızla eşitlendi · '+new Date().toLocaleTimeString('tr-TR'));render();
  if(changedView)refreshView();else if(!equal(after.values,result.values))needsSync=true;
 }catch(e){if(generation===epoch)message(errorMessage(e));}
 finally{working=false;if(needsSync){needsSync=false;schedule();}}
}
async function activate(next){
 const oldOwner=localStorage.getItem(OWNER),newOwner=next?.uid||null;generation++;unsubscribe?.();unsubscribe=null;clearTimeout(timer);
 const activation=generation;let switched=oldOwner!==newOwner;
 if(switched){
  if(oldOwner)cache();else put(GUEST,capture());
  const stored=newOwner?read(PREFIX+newOwner,{base:{},values:{}}):{base:{},values:read(GUEST,{})};
  validate(stored.base);validate(stored.values);apply(stored.values);base=stored.base;
  if(newOwner)rawSet.call(localStorage,OWNER,newOwner);else rawRemove.call(localStorage,OWNER);
 }else base=newOwner?validate(read(PREFIX+newOwner,{base:{}}).base):{};
 user=next;ready=true;pending=null;render();
 if(user?.emailVerified){
  await sync({initial:switched,applyRemote:switched});if(generation!==activation)return;
  const epoch=generation;unsubscribe=onSnapshot(doc(db,'nur_users',user.uid,'state','progress'),snapshot=>{if(epoch!==generation||snapshot.metadata.hasPendingWrites||snapshot.metadata.fromCache)return;try{const remote=decode(snapshot.exists()?snapshot.data():null);if(!equal(remote,base))schedule();}catch(e){message(errorMessage(e));}},e=>message(errorMessage(e)));
 }else message(user?'E-postanıza gelen doğrulama bağlantısını açın; ardından “Doğrulamayı kontrol et” seçeneğine dokunun.':'Misafir olarak bu cihazda devam edebilirsiniz.');
 if(switched)refreshView();
}
async function perform(task){try{await task();}catch(e){message(errorMessage(e));}finally{render();}}
async function authenticate(event){event.preventDefault();if(authBusy)return;authBusy=true;const submit=$('account-submit');submit.disabled=true;try{
 const email=$('account-email').value.trim(),password=$('account-password').value,register=$('account-mode').value==='register';
 if(register&&password!==$('account-password-confirm').value){message('Şifreler aynı değil. Lütfen tekrar kontrol edin.');return;}
 if(register&&!$('account-register-name').value.trim()){message('Profilinizde görünecek kullanıcı adını yazın.');return;}
 if(register&&password.length<8)throw {code:'auth/weak-password'};
 const result=register?await createUserWithEmailAndPassword(auth,email,password):await signInWithEmailAndPassword(auth,email,password);
 $('account-password').value='';$('account-password-confirm').value='';
 if(register){try{await updateProfile(result.user,{displayName:$('account-register-name').value.trim().slice(0,40)});await sendEmailVerification(result.user);}catch{/* The account exists; profile and verification can be retried after login. */}}
 await activate(result.user);
 }catch(e){message(errorMessage(e));}finally{authBusy=false;submit.disabled=false;render();}}
async function logout(){if(!user)return;cache();authBusy=true;try{await signOut(auth);await activate(null);}finally{authBusy=false;}}
function initUI(){
 panel=$('settings-profile-panel');panel.innerHTML=`<header class="settings-detail-heading"><button type="button" data-settings-home aria-label="Ayarlar listesine dön"><i data-lucide="arrow-left"></i></button><span class="settings-return-label">Ayarlar listesine dön</span></header>
 <section class="section-card nur-profile-card account-identity"><div class="nur-profile-heading"><span id="account-avatar" class="nur-profile-avatar" aria-hidden="true">N</span><div><h3 id="account-name">Profilim</h3><p id="account-email-label">Misafir</p></div></div><span id="account-badge" class="account-badge">Bu cihazda kullanılıyor</span><p>Kur’an, zikir ve eğitim ilerlemenize uygulama ve sitede aynı hesapla devam edin.</p></section>
 <section data-auth class="section-card nur-profile-card"><h3>Hesabınıza Bağlanın</h3><div class="account-mode-switch" role="group" aria-label="Hesap işlemi"><button type="button" data-account-mode="login" aria-pressed="true">Giriş yap</button><button type="button" data-account-mode="register" aria-pressed="false">Hesap oluştur</button></div><form id="account-auth-form"><input id="account-mode" type="hidden" value="login"><label id="account-register-name-label" hidden>Kullanıcı adı<input id="account-register-name" autocomplete="nickname" maxlength="40" placeholder="Profilinizde görünecek ad"></label><label>E-posta<input id="account-email" type="email" autocomplete="username" required maxlength="254" placeholder="E-posta adresiniz"></label><label>Şifre<input id="account-password" type="password" autocomplete="current-password" required maxlength="128" aria-describedby="account-password-help"></label><p id="account-password-help">Hesabınıza e-posta adresiniz ve şifrenizle giriş yapın.</p><label id="account-password-confirm-label" hidden>Şifreyi tekrar yazın<input id="account-password-confirm" type="password" autocomplete="new-password" maxlength="128"></label><div class="nur-profile-actions"><button id="account-submit" type="submit">Giriş yap</button><button id="account-reset" class="account-secondary" type="button">Şifremi unuttum</button></div></form><p class="nur-profile-note">Hesap açmadan da kullanabilirsiniz. Misafir ilerlemeniz bu cihazda saklanır.</p></section>
 <div data-account hidden>
 <section class="section-card nur-profile-card"><h3>Profil Bilgilerim</h3><label>Kullanıcı adı<input id="account-edit-name" autocomplete="nickname" maxlength="40"></label><p>Bu ad profilinizde görünür. Giriş için e-posta adresinizi kullanırsınız.</p><button id="account-save-name" type="button">Profilimi kaydet</button></section>
 <section id="account-verify" class="section-card nur-profile-card"><h3>E-posta Doğrulaması</h3><p>İlerlemenizi hesabınızda saklamak için e-postanıza gelen doğrulama bağlantısını açın.</p><div class="nur-profile-actions"><button id="account-check-verification" type="button">Doğrulamayı kontrol et</button><button id="account-send-verification" class="account-secondary" type="button">Doğrulama e-postasını tekrar gönder</button></div></section>
 <section class="section-card nur-profile-card"><h3>İlerlemem ve Bulut Kaydım</h3><p>Bağlantınız varken değişiklikler otomatik eşitlenir. Çevrimdışı ilerlemeniz bu cihazda korunur.</p><ul class="account-records"><li>Kur’an ayracı ve notlarım</li><li>Mushaf’ta kaldığım sayfa</li><li>Zikirlerim ve geçmiş oturumlarım</li><li>Eğitim ilerlemem</li></ul><div class="nur-profile-actions"><button id="account-sync" type="button">Şimdi eşitle</button><button id="account-import-guest" class="account-secondary" type="button">Misafir ilerlememi aktar</button></div><p class="nur-profile-note">Misafir kayıtları onayınızla aktarılır. Konum, bildirim izinleri ve indirilen dosyalar cihaza özeldir.</p></section>
 <section class="section-card nur-profile-card"><h3>Hesap Güvenliği</h3><p>Şifrenizi yenilemek için hesabınızın e-posta adresine sıfırlama bağlantısı gönderebilirsiniz.</p><div class="nur-profile-actions"><button id="account-reset-signed" class="account-secondary" type="button">Şifre sıfırlama e-postası gönder</button><button id="account-logout" class="account-secondary" type="button">Hesaptan çıkış yap</button></div><p>Çıkış yaptığınızda bu cihazdaki misafir ilerlemenize dönersiniz.</p></section>
 </div>
 <section class="section-card nur-profile-card account-feedback" aria-label="Hesap durumu"><p id="account-status" role="status" aria-live="polite"></p><button id="account-apply-remote" type="button" hidden>Güncel kayıtları aç</button><div id="account-conflict" hidden><h3>Kayıt Seçimi</h3><p>Aynı kayıt iki cihazda değişmiş. Hangi sürümle devam etmek istediğinizi seçin.</p><div class="nur-profile-actions"><button id="account-use-local" type="button">Bu cihazdaki kaydı kullan</button><button id="account-use-cloud" class="account-secondary" type="button">Buluttaki kaydı kullan</button></div></div></section>`;
 status=$('account-status');
 function setMode(mode){const register=mode==='register';$('account-mode').value=mode;$('account-register-name-label').hidden=!register;$('account-register-name').required=register;$('account-password-confirm-label').hidden=!register;$('account-password-confirm').required=register;$('account-password-confirm').value='';$('account-password').autocomplete=register?'new-password':'current-password';$('account-password').minLength=register?8:1;$('account-password-help').textContent=register?'En az 8 karakterli bir şifre belirleyin. Kullanıcı adınız profilinizde görünür.':'Hesabınıza e-posta adresiniz ve şifrenizle giriş yapın.';$('account-submit').textContent=register?'Hesap oluştur':'Giriş yap';$('account-reset').hidden=register;panel.querySelectorAll('[data-account-mode]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.accountMode===mode)));}
 panel.querySelectorAll('[data-account-mode]').forEach(button=>button.onclick=()=>setMode(button.dataset.accountMode));
 $('account-mode').onchange=()=>setMode($('account-mode').value);
 $('account-auth-form').onsubmit=authenticate;
 $('account-reset').onclick=()=>perform(async()=>{const email=$('account-email').value.trim();if(!email||!$('account-email').checkValidity()){message('Önce geçerli e-postanızı yazın.');return;}await sendPasswordResetEmail(auth,email);message('Bu adres için işlem yapılabiliyorsa şifre sıfırlama e-postası gönderildi. Gelen kutunuzu kontrol edin.');});
 $('account-reset-signed').onclick=()=>perform(async()=>{await sendPasswordResetEmail(auth,user.email);message('Şifre sıfırlama bağlantısı hesabınızın e-posta adresine gönderildi.');});
 $('account-save-name').onclick=()=>perform(async()=>{const name=$('account-edit-name').value.trim();if(!name){message('Kullanıcı adınızı yazın.');return;}await updateProfile(user,{displayName:name});message('Profiliniz kaydedildi.');});
 $('account-send-verification').onclick=()=>perform(async()=>{await sendEmailVerification(user);message('Doğrulama e-postası gönderildi.');});
 $('account-check-verification').onclick=()=>perform(async()=>{await reload(user);await user.getIdToken(true);if(user.emailVerified)await activate(user);else message('E-posta henüz doğrulanmadı. Gelen kutunuzu kontrol edin.');});
 $('account-sync').onclick=()=>perform(()=>sync({applyRemote:true}));$('account-apply-remote').onclick=()=>perform(()=>sync({applyRemote:true}));
 $('account-use-local').onclick=()=>perform(()=>sync({applyRemote:true,choice:'local'}));$('account-use-cloud').onclick=()=>perform(()=>sync({applyRemote:true,choice:'remote'}));
 $('account-import-guest').onclick=()=>perform(async()=>{if(!confirm('Bu cihazdaki misafir ilerlemesi hesabınızdaki kayıtlara eklensin mi? Çakışmalar varsa seçim sorulacak.'))return;const guest=validate(read(GUEST,{})),combined=merge({},capture(),guest);if(combined.conflicts.length){message('Misafir ve hesap kayıtlarında aynı alanlar farklı. Misafir kayıtları korunuyor; otomatik aktarılmadı.');return;}apply(combined.values);cache();await sync({applyRemote:true});refreshView();});
 $('account-logout').onclick=()=>perform(logout);
 window.NurAccount={isAuthenticated:()=>!!user,snapshot:()=>({schemaVersion:1,values:capture()}),open:()=>{if(dialog){dialog.showModal();panel.hidden=false;}else{window.NurAppBridge?.navigate({page:'settings'});document.querySelector('[data-settings-panel="profile"]')?.click();}}};
 window.addEventListener('nur-app-ready',()=>{if(document.querySelector('.site-header-inner')){
  dialog=document.createElement('dialog');dialog.id='nur-account-dialog';dialog.setAttribute('aria-label','Hesabım');const close=document.createElement('button');close.type='button';close.className='quran-inline-back';close.textContent='Kapat ×';close.onclick=()=>dialog.close();dialog.append(close,panel);document.body.append(dialog);panel.querySelector('.settings-detail-heading').hidden=true;panel.hidden=false;
  accountSummary=document.createElement('button');accountSummary.type='button';accountSummary.id='site-account';accountSummary.className='quran-inline-back';accountSummary.onclick=()=>window.NurAccount.open();document.querySelector('.site-header-inner').append(accountSummary);
 }render();if(sessionStorage.getItem('nurAccountShowAfterReload')){sessionStorage.removeItem('nurAccountShowAfterReload');window.NurAccount.open();}});
}
initUI();render();
if(config?.enabled&&config?.projectId==='nur-mobile-ec382'&&config.apiKey){
 const app=initializeApp(config);auth=getAuth(app);auth.languageCode='tr';db=getFirestore(app);
 setPersistence(auth,browserLocalPersistence).then(()=>onAuthStateChanged(auth,u=>{if(!authBusy)perform(()=>activate(u));})).catch(e=>message(errorMessage(e)));
 window.addEventListener('storage',event=>{if(event.key===OWNER&&event.oldValue!==event.newValue){ready=false;generation++;clearTimeout(timer);unsubscribe?.();location.reload();}});
 window.addEventListener('online',schedule);document.addEventListener('visibilitychange',()=>{if(!document.hidden)schedule();else if(ready)cache();});
}else{message('Hesap hizmeti bağlantısı henüz tamamlanmadı. Mevcut cihaz kayıtlarınız korunuyor.');panel.querySelectorAll('button,input,select').forEach(e=>e.disabled=true);}
