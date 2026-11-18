// usage: node thumbnail.js <bg_code_js> <sprite.png> <TITULO> <subtitulo> <out.jpg> [colorBanda]
// bg_code_js: cuerpo de función (t) que devuelve el SVG de fondo (sin rótulos).
const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const [code,sprite,title,sub,out,band]=process.argv.slice(2);
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1920,height:1080}});
await p.goto('file://'+__dirname+'/scenes.html');await p.evaluate(()=>document.fonts.ready);
const img='data:image/png;base64,'+fs.readFileSync(sprite).toString('base64');
await p.evaluate(([code,img,title,sub,band])=>{scenes.__thumb=new Function('t',code);
 let s=scenes.__thumb(2.3);
 const lines=title.split('|'); const L=Math.max(...lines.map(l=>l.length)); const fs=Math.min(300,Math.floor(1100/(L*0.66))); const sfs=Math.min(88,Math.floor(940/(sub.length*0.55)));
 s+=`<image href="${img}" x="10" y="${1080-735}" width="${605*1.25}" height="${576*1.25}"/>`;
 lines.forEach((l,i)=>{s+=`<text x="1270" y="${560-(lines.length-1-i)*fs*0.95}" font-family="Fredoka" font-weight="700" font-size="${fs}" text-anchor="middle" fill="#ffcc2e" stroke="#2b3a67" stroke-width="34" paint-order="stroke" stroke-linejoin="round">${l}</text>`;});
 s+=`<rect x="760" y="640" width="1020" height="140" rx="40" fill="${band||'#1e4fb8'}" stroke="#2b3a67" stroke-width="10"/><text x="1270" y="738" font-family="Fredoka" font-weight="700" font-size="${sfs}" text-anchor="middle" fill="#fff">${sub}</text>`;
 scenes.__t2=()=>s;window.renderScene('__t2',0);},[code,img,title,sub,band]);
await p.screenshot({path:'/tmp/_thumb.png'});await b.close();
require('child_process').execSync(`ffmpeg -y -loglevel error -i /tmp/_thumb.png -vf scale=1280:720 -q:v 2 "${out}"`);})();
