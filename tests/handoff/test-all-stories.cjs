const assert=require('assert'),{chromium}=require('/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{const b=await chromium.launch({executablePath:'/tmp/chromium',args:['--no-sandbox','--disable-dev-shm-usage']});const p=await b.newPage({viewport:{width:320,height:700},hasTouch:true,isMobile:true,acceptDownloads:true});let errors=[];p.on('pageerror',e=>errors.push(e.message));await p.addInitScript(()=>window.lucide={createIcons(){}});await p.route('https://**/*',r=>r.abort());await p.goto('file:///workspace/scratch/ba7a65560e0a/repair/NUR-Mobile/src/index.html');await p.evaluate(()=>document.getElementById('location-onboarding').hidden=true);const labels=[];
for(let group=0;group<4;group++){
 await p.locator('.story-trigger').nth(group).click();await p.waitForTimeout(1050);const groupLabels=[];
 for(let slide=0;slide<3;slide++){
  await p.waitForSelector('.ayet-story-artwork');const label=await p.locator('.ayet-story-artwork').getAttribute('aria-label');groupLabels.push(label);assert(label&&!label.includes('undefined'));if(slide===0){await p.screenshot({path:`work/story-group-${group}.png`});await p.locator('#story-like').click();}
  const [dl]=await Promise.all([p.waitForEvent('download'),p.locator('#story-share').click()]);assert(dl.suggestedFilename().endsWith(`-${slide+1}.png`));if(slide===0)await dl.saveAs(`work/story-export-${group}.png`);
  if(slide<2)await p.keyboard.press('ArrowRight');
 }
 assert.equal(new Set(groupLabels).size,3);labels.push(groupLabels);console.log('Group',group,groupLabels.map(t=>t.slice(0,55)));await p.locator('#story-close').click();await p.waitForTimeout(300);
}
await p.reload();await p.evaluate(()=>document.getElementById('location-onboarding').hidden=true);await p.locator('.story-trigger').nth(3).click();await p.waitForSelector('.ayet-story-artwork');assert.equal(await p.locator('.ayet-story-artwork').getAttribute('aria-label'),labels[3][0]);assert.equal(await p.locator('#story-like').getAttribute('aria-pressed'),'true');assert.deepEqual(errors,[]);assert.equal(await p.locator('#story-stage').evaluate(e=>e.scrollWidth),320);console.log('12 artworks, 12 downloads, stable daily choices, persistent likes, 320px fit passed');await b.close();})().catch(e=>{console.error(e);process.exit(1)});
