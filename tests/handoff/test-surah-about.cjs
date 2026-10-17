const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
const path=require('node:path');const root=path.resolve(__dirname,'../..');const h=fs.readFileSync(path.join(root,'src/index.html'),'utf8');
for(const m of h.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi))if(!/application\/json|src=/.test(m[1]))new vm.Script(m[2]);
const raw=h.match(/<script type="application\/json" id="nur-surah-about">([\s\S]*?)<\/script>/)[1],data=JSON.parse(raw);
assert.deepEqual(Object.keys(data.surahs).map(Number),Array.from({length:114},(_,i)=>i+1));
function element(){return {children:[],style:{},textContent:'',append(...nodes){this.children.push(...nodes)},appendChild(node){this.children.push(node)},replaceChildren(){this.children=[]}}}
const nodes=Object.fromEntries(['nur-surah-about','quran-intro-details','quran-intro-source','quran-intro-text'].map(id=>[id,element()]));nodes['nur-surah-about'].textContent=raw;
const ctx={document:{getElementById:id=>nodes[id],createElement:element,createTextNode:t=>({textContent:t})}};
vm.createContext(ctx);vm.runInContext(h.slice(h.indexOf('    let quranAboutCatalog;'),h.indexOf('    function orderedQuranSurahs()')),ctx);
for(let n=1;n<=114;n++){const about=data.surahs[n];for(const field of ['name','meaning','nameOrigin','revelation'])assert.ok(about[field]?.trim());assert.ok(about.sources.length);for(const source of about.sources)assert.ok(/^https:\/\/(islamansiklopedisi\.org\.tr|kuran\.diyanet\.gov\.tr)\//.test(source.url));ctx.renderQuranSurahAbout({number:n,numberOfAyahs:7,revelationOrder:n});assert.equal(nodes['quran-intro-details'].children.length,3);assert.equal(nodes['quran-intro-details'].children[2].children[1].textContent,about.revelation);}
assert.match(data.surahs[96].nameOrigin,/2\. âyet/);assert.match(data.surahs[96].revelation,/610.*Hira/);assert.match(data.surahs[96].revelation,/Kalan on dört âyet daha sonra/);
for(const n of [13,22,55,76,83,99,112,113,114])assert.match(data.surahs[n].revelation,/görüş|rivayet/);
for(const n of [20,36,38,50])assert.match(data.surahs[n].meaning,/kesin/);
ctx.renderQuranSurahAbout({number:999,turkishName:'Test',numberOfAyahs:1,revelationOrder:1});assert.equal(nodes['quran-intro-details'].children.length,0);assert.match(nodes['quran-intro-source'].children[0].textContent,/bulunamadı/);
const mirror=path.resolve(root,'../NUR-Namaz-Uygulamasi-v6-Kuran.html');if(fs.existsSync(mirror))assert.equal(h,fs.readFileSync(mirror,'utf8'));
console.log('PASS: all 114 sourced records, render switching, fallback without stale text, Alak distinctions, disputed dates, script syntax, mirror.');