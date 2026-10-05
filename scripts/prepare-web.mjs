import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root=resolve(import.meta.dirname,"..");
const source=resolve(root,"src/index.html");
const destination=resolve(root,"www/index.html");
let html=await readFile(source,"utf8");

// ChatGPT önizleme ortamına ait kodlar mobil pakete taşınmaz.
html=html
  .replace(/<script>window\["__codeletBootstrap__"\][\s\S]*?<\/script>/i,"")
  .replace(/<script[^>]+src="\/_sdk\/[^\"]+"[^>]*><\/script>/gi,"")
  .replace(/<script[^>]+src="https:\/\/cdn\.tailwindcss\.com\/[^\"]+"[^>]*><\/script>/i,'<link rel="stylesheet" href="assets/tailwind.css">')
  .replace(/<script[^>]+src="https:\/\/cdn\.jsdelivr\.net\/npm\/lucide@[^\"]+"[^>]*><\/script>/i,'<script src="assets/lucide.min.js"><\/script>')
  .replace(/<link[^>]+href="https:\/\/fonts\.googleapis\.com\/[^\"]+"[^>]*>/i,'<link rel="stylesheet" href="assets/fonts.css">')
  .replace(" 'unsafe-eval'","")
  .replace(" https://cdn.tailwindcss.com https://cdn.jsdelivr.net","")
  .replace(" https://fonts.googleapis.com","")
  .replace(" https://fonts.gstatic.com","")
  .replace(/<title>[\s\S]*?<\/title>/i,"<title>NUR</title>");

const audioCatalog=html.match(/<script type="application\/json" id="nur-sound-catalog">([\s\S]*?)<\/script>/);
if(audioCatalog){
  const raw=resolve(root,"android/app/src/main/res/raw");
  await mkdir(raw,{recursive:true});
  for(const sound of JSON.parse(audioCatalog[1]).sounds){
    if(!/^[a-z][a-z0-9_]*\.(mp3|wav|ogg)$/.test(sound.nativeFile)||!/^data:audio\/[a-z0-9-]+;base64,/.test(sound.preview))throw new Error("Geçersiz gömülü bildirim sesi");
    await writeFile(resolve(raw,sound.nativeFile),Buffer.from(sound.preview.split(',')[1],'base64'));
  }
}
const requirements=html.match(/<script type="application\/json" id="nur-native-requirements">([\s\S]*?)<\/script>/);
if(requirements){const silent=JSON.parse(requirements[1]).silentAudio;if(silent)await writeFile(resolve(root,"android/app/src/main/res/raw/nur_silent.wav"),Buffer.from(silent.base64,'base64'));}

const assets=resolve(root,"www/assets");
await mkdir(assets,{recursive:true});
for(const [name,source] of [["capacitor.js","@capacitor/core/dist/capacitor.js"],["capacitor-app.js","@capacitor/app/dist/plugin.js"],["capacitor-synapse.js","@capacitor/synapse/dist/synapse.js"],["capacitor-geolocation.js","@capacitor/geolocation/dist/plugin.js"]]){
  await cp(resolve(root,"node_modules",source),resolve(assets,name));
}
await writeFile(resolve(assets,"capacitor-synapse.js"),(await readFile(resolve(assets,"capacitor-synapse.js"),"utf8"))+"\nvar synapse=globalThis.outsystemsSynapse;\n");
await cp(resolve(root,"src/native-runtime.js"),resolve(assets,"native-runtime.js"));
html=html.replace('<meta name="viewport" content="width=device-width, initial-scale=1.0">','<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">');
html=html.replace('</head>','<script src="assets/capacitor.js"></script><script src="assets/capacitor-app.js"></script><script src="assets/capacitor-synapse.js"></script><script src="assets/capacitor-geolocation.js"></script><script src="assets/native-runtime.js"></script></head>');
const supabaseUrl=process.env.NUR_SUPABASE_URL||"",publishableKey=process.env.NUR_SUPABASE_PUBLIC_KEY||"";
if(supabaseUrl||publishableKey){
  const url=new URL(supabaseUrl);
  if(url.protocol!=="https:"||! /^[a-z0-9-]+\.supabase\.co$/.test(url.hostname)||url.port||url.pathname!=="/"||url.search||url.hash||url.username||url.password||!publishableKey||publishableKey.startsWith("sb_secret_"))throw new Error("Geçersiz Supabase yayın yapılandırması");
  if(publishableKey.split('.').length===3&&JSON.parse(Buffer.from(publishableKey.split('.')[1],'base64url').toString()).role!=="anon")throw new Error("Yalnız public/anon anahtarı kullanılabilir");
  const config=JSON.stringify({supabaseUrl:url.origin,publishableKey}).replace(/</g,"\\u003c");
  html=html.replace('<script src="assets/capacitor.js">',`<script>window.NUR_ACCOUNT_CONFIG=${config};</script><script src="assets/capacitor.js">`);
  html=html.replace('connect-src ',`connect-src ${url.origin} `);
}
await cp(resolve(root,"node_modules/lucide/dist/umd/lucide.min.js"),resolve(assets,"lucide.min.js"));
for(const family of ["dm-sans","noto-naskh-arabic","playfair-display"]){
  await cp(resolve(root,`node_modules/@fontsource/${family}/files`),resolve(assets,`font-${family}/files`),{recursive:true,force:true});
  for(const weight of ["400","500","600","700"]){
    const cssSource=resolve(root,`node_modules/@fontsource/${family}/${weight}.css`);
    try{await cp(cssSource,resolve(assets,`font-${family}/${weight}.css`),{force:true});}catch{}
  }
}
await writeFile(resolve(assets,"fonts.css"),[
  '@import "font-dm-sans/400.css";','@import "font-dm-sans/500.css";','@import "font-dm-sans/600.css";','@import "font-dm-sans/700.css";',
  '@import "font-noto-naskh-arabic/400.css";','@import "font-noto-naskh-arabic/500.css";','@import "font-noto-naskh-arabic/600.css";','@import "font-noto-naskh-arabic/700.css";',
  '@import "font-playfair-display/600.css";','@import "font-playfair-display/700.css";'
].join("\n"),"utf8");
await writeFile(destination,html,"utf8");
console.log(`Mobil web paketi hazırlandı: ${destination}`);
