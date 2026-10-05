/* Native-only integration; browser previews keep their existing behavior. */
(() => {
  const native=window.Capacitor?.isNativePlatform?.();
  if(!native)return;
  const geo=window.capacitorGeolocationPluginCapacitor?.Geolocation,app=window.capacitorApp?.App;
  if(geo&&navigator.geolocation){
    Object.defineProperty(navigator.geolocation,'getCurrentPosition',{configurable:true,value:(success,failure,options={})=>{
      (async()=>{const state=await geo.checkPermissions();if(state.location!=='granted'&&state.coarseLocation!=='granted'){const granted=await geo.requestPermissions({permissions:['location']});if(granted.location!=='granted'&&granted.coarseLocation!=='granted')throw new Error('Konum izni verilmedi. Manuel seçimi kullanabilirsiniz.');}return geo.getCurrentPosition({enableHighAccuracy:!!options.enableHighAccuracy,timeout:options.timeout||15000,maximumAge:options.maximumAge||0});})().then(success,error=>failure?.({code:1,message:error.message}));
    }});
  }
  const visible=element=>!!element&&!element.hidden&&element.getClientRects().length>0;
  function back(){
    if(visible(document.getElementById('nur-assistant'))){window.NurAssistant?.close();return;}
    for(const selector of ['.quran-tool-modal:not([hidden])','.education-tool-modal:not([hidden])']){const modal=document.querySelector(selector);if(visible(modal)){modal.click();return;}}
    // Reuse each screen's own return action to preserve its scroll context.
    const order=['education-jump-close','hadith-topic-jump-close','story-close','monthly-prayer-close','quran-tafsir-back','education-reader-back','quran-topic-reader-back','quran-reader-back','sermon-reader-close','dua-reader-back','hadith-scholar-back','hadith-reading-back','history-reader-back','siyer-reader-back','mufassir-reader-back','tasbihat-reader-back','esma-reader-back','quran-intro-back','education-course-back','hadith-source-back','settings-back'];
    for(const id of order){const button=document.getElementById(id);if(visible(button)){button.click();return;}}
    if(window.NurAppBridge&&!window.NurAppBridge.isHome()){window.NurAppBridge.navigate({page:'home'});return;}
    if(confirm('NUR uygulamasından çıkılsın mı?'))app?.exitApp();
  }
  app?.addListener('backButton',back);
  function keyboardLayout(){const viewport=window.visualViewport;if(!viewport)return;document.documentElement.style.setProperty('--vh',viewport.height/100+'px');}
  window.visualViewport?.addEventListener('resize',keyboardLayout);keyboardLayout();
  let idle=null,docked=false,wasDocked=false;
  const bubble=()=>document.getElementById('nur-bubble');
  function expand(){const button=bubble();if(!button)return;button.classList.remove('nur-native-docked');button.style.removeProperty('--nur-dock-x');docked=false;}
  function resetIdle(){clearTimeout(idle);if(!docked)idle=setTimeout(()=>{const button=bubble();if(!button||visible(document.getElementById('nur-assistant'))||visible(document.getElementById('nur-greeting')))return;const rect=button.getBoundingClientRect();button.style.setProperty('--nur-dock-x',(innerWidth-rect.right+32)+'px');button.classList.add('nur-native-docked');docked=true;},30000);}
  window.addEventListener('nur-app-ready',()=>{const css=document.createElement('style');css.textContent='#nur-bubble.nur-native-docked{transform:translateX(var(--nur-dock-x));opacity:.8} @media(prefers-reduced-motion:no-preference){#nur-bubble{transition:transform .22s ease,opacity .22s ease}}';document.head.append(css);const button=bubble();button?.addEventListener('pointerdown',()=>{wasDocked=docked;if(docked)expand();},true);button?.addEventListener('click',event=>{if(wasDocked){event.stopImmediatePropagation();wasDocked=false;expand();window.NurAssistant?.open();}},true);document.addEventListener('pointerdown',resetIdle,{passive:true});document.addEventListener('keydown',resetIdle);window.addEventListener('resize',()=>{expand();resetIdle();});resetIdle();});
})();
