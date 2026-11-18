// usage: node render_loops.js <outdir> scene1,scene2,...
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const FPS=30,L=8;
(async()=>{const out=process.argv[2];const names=process.argv[3].split(',');
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});
await p.goto('file://'+__dirname+'/scenes.html');await p.evaluate(()=>document.fonts.ready);
for(const n of names){const d=path.join(out,'loops',n);fs.mkdirSync(d,{recursive:true});
 if(fs.existsSync(path.join(d,`${FPS*L-1}.jpg`)))continue;
 for(let i=0;i<FPS*L;i++){await p.evaluate(([n,t])=>window.renderScene(n,t),[n,i/FPS]);
  await p.screenshot({path:path.join(d,`${i}.jpg`),type:'jpeg',quality:93});}
 console.log('scene',n);}
await b.close();})();
