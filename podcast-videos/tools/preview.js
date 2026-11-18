const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});
await p.goto('file://'+__dirname+'/scenes.html');await p.evaluate(()=>document.fonts.ready);
const names=await p.evaluate(()=>window.sceneNames);
for(const n of names){await p.evaluate(([n])=>window.renderScene(n,2.3),[n]);await p.screenshot({path:`preview/${n}.png`});}
await p.evaluate(()=>window.renderMascot(2,false));await p.setViewportSize({width:340,height:340});await p.screenshot({path:'preview/mascot.png',omitBackground:true});
await b.close();})();
