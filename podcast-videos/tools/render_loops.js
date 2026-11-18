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
const md=path.join(out,'char');fs.mkdirSync(md,{recursive:true});
await p.setViewportSize({width:440,height:600});
for(const pose of ['rest','open','point','wave1','wave2'])for(const m of [0,1,2])for(const bl of [0,1]){await p.evaluate(([a,m,bl])=>window.renderChar(a,m,!!bl),[pose,m,bl]);
 await p.screenshot({path:path.join(md,`${pose}_m${m}_b${bl}.png`),omitBackground:true});}
await b.close();})();
