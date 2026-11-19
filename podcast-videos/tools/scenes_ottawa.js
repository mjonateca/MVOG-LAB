/* =====================================================================
   Mi Pequeño Atlas — Capítulo 7: Ottawa. Escenas realistas.
   (usa helpers de scenes_madrid.js / scenes_sd.js / scenes_berlin.js)
   ===================================================================== */
const OTD = `<defs>
<linearGradient id="otStone" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9c9a0"/><stop offset="1" stop-color="#bfae84"/></linearGradient>
<linearGradient id="otCopper" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3f7a64"/><stop offset=".5" stop-color="#6aa88e"/><stop offset="1" stop-color="#356a56"/></linearGradient>
<linearGradient id="otIce" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8f4fa"/><stop offset="1" stop-color="#b8d8e8"/></linearGradient>
<linearGradient id="otSnowSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9ab8d4"/><stop offset="1" stop-color="#dfe8f0"/></linearGradient>
</defs>`;
const OTALL = () => D() + MA + SDD + BED + OTD;

/* ---------- piezas ---------- */
function mapleLeaf(x, y, s = 1, col = '#d52b1e') { const p = [[0, -30], [6, -16], [16, -20], [12, -4], [24, -8], [20, 2], [28, 8], [8, 10], [10, 22], [2, 16], [2, 34], [-2, 34], [-2, 16], [-10, 22], [-8, 10], [-28, 8], [-20, 2], [-24, -8], [-12, -4], [-16, -20], [-6, -16]]; return `<path d="M${p.map(([a, b]) => `${x + a * s},${y + b * s}`).join(' L')}Z" fill="${col}"/>`; }
function caFlag(x, y, s = 1) { return `<g transform="translate(${x},${y}) scale(${s})"><line x1="0" y1="0" x2="0" y2="130" stroke="#555" stroke-width="4"/><rect x="0" y="0" width="24" height="60" fill="#d52b1e"/><rect x="24" y="0" width="48" height="60" fill="#fff"/><rect x="72" y="0" width="24" height="60" fill="#d52b1e"/>${mapleLeaf(48, 27, .75)}</g>`; }
function nlFlag(x, y, s = 1) { return `<g transform="translate(${x},${y}) scale(${s})"><line x1="0" y1="0" x2="0" y2="130" stroke="#555" stroke-width="4"/><rect x="0" y="0" width="96" height="20" fill="#ae1c28"/><rect x="0" y="20" width="96" height="20" fill="#fff"/><rect x="0" y="40" width="96" height="20" fill="#21468b"/></g>`; }
function parliament(cx, base, s = 1, t = 0) {
  let o = `<g transform="translate(${cx},${base}) scale(${s})"><rect x="-620" y="-260" width="1240" height="260" fill="url(#otStone)"/>`;
  for (let i = 0; i < 14; i++) { const x = -590 + i * 88; if (Math.abs(x + 22) < 120) continue; o += `<path d="M${x},-40 L${x},-110 Q${x + 22},-136 ${x + 44},-110 L${x + 44},-40Z" fill="#4a5060"/><path d="M${x},-160 L${x},-220 Q${x + 22},-244 ${x + 44},-220 L${x + 44},-160Z" fill="#4a5060"/>`; }
  o += `<path d="M-640,-260 L-600,-330 L600,-330 L640,-260Z" fill="url(#otCopper)"/>${[...Array(9)].map((_, i) => `<path d="M${-560 + i * 140},-330 l20,-60 l20,60Z" fill="url(#otCopper)"/>`).join('')}
  ${[-620, 620].map(x => `<g transform="translate(${x},-260)"><rect x="-50" y="-150" width="100" height="150" fill="url(#otStone)"/><path d="M-60,-150 L0,-250 L60,-150Z" fill="url(#otCopper)"/></g>`).join('')}
  <g transform="translate(0,0)"><rect x="-90" y="-640" width="180" height="640" fill="url(#otStone)"/><rect x="-90" y="-640" width="20" height="640" fill="#000" opacity=".06"/>${[...Array(5)].map((_, k) => `<rect x="-26" y="${-560 + k * 90}" width="52" height="56" rx="26" fill="#4a5060"/>`).join('')}<path d="M-50,0 L-50,-100 Q0,-150 50,-100 L50,0Z" fill="#3a3a44"/>
  <circle cx="0" cy="-690" r="58" fill="#f4efe0" stroke="#3a3a44" stroke-width="6"/><line x1="0" y1="-690" x2="${Math.sin(t / L * TAU) * 40}" y2="${-690 - Math.cos(t / L * TAU) * 40}" stroke="#2a2a2a" stroke-width="5"/><line x1="0" y1="-690" x2="26" y2="-690" stroke="#2a2a2a" stroke-width="7"/>
  <rect x="-100" y="-760" width="200" height="130" fill="none"/><rect x="-100" y="-636" width="200" height="12" fill="#bfae84"/><rect x="-90" y="-760" width="180" height="20" fill="#bfae84"/>
  <path d="M-100,-760 L0,-1000 L100,-760Z" fill="url(#otCopper)"/>${[-100, 100].map(x => `<path d="M${x - 20},-760 l20,-80 l20,80Z" fill="url(#otCopper)"/>`).join('')}<line x1="0" y1="-1000" x2="0" y2="-1060" stroke="#555" stroke-width="5"/>${caFlag(0, -1100, .6).replace('<line x1="0" y1="0" x2="0" y2="130" stroke="#555" stroke-width="4"/>', '')}</g></g>`;
  return o;
}
function snowGround(y0) { return `<rect x="0" y="${y0}" width="${W}" height="${H - y0}" fill="#f4f8fb"/>${[...Array(30)].map((_, i) => `<ellipse cx="${(i * 131) % W}" cy="${y0 + 20 + (i * 53) % (H - y0 - 20)}" rx="${40 + (i % 3) * 20}" ry="6" fill="#dfe8f0"/>`).join('')}`; }
function snowfall(t, n = 50) { return [...Array(n)].map((_, i) => `<circle cx="${(i * 131 + S(t, 1, i) * 20) % W}" cy="${((i * 97) + t / L * 400) % H}" r="${3 + (i % 3) * 2}" fill="#fff" opacity=".9"/>`).join(''); }
function pine(x, base, s = 1, snow = false) { return `${rShadow(x, base, 60 * s, .2)}<g transform="translate(${x},${base}) scale(${s})"><rect x="-10" y="-40" width="20" height="40" fill="#5a3a22"/>${[0, 1, 2].map(k => `<path d="M${-90 + k * 20},${-40 - k * 70} L0,${-160 - k * 70} L${90 - k * 20},${-40 - k * 70}Z" fill="#2f5a3a"/>${snow ? `<path d="M${-60 + k * 14},${-60 - k * 70} L0,${-150 - k * 70} L${60 - k * 14},${-60 - k * 70} Q0,${-90 - k * 70} ${-60 + k * 14},${-60 - k * 70}Z" fill="#fff" opacity=".85"/>` : ''}`).join('')}</g>`; }
function skater(x, y, s, t, ph, top = '#d52b1e', o = {}) { const g = S(t, 4, ph); return `<g transform="translate(${x},${y}) scale(${s * (o.dir || 1)},${s})">${rShadow(0, 0, 26)}<path d="M-4,-70 L${-14 + g * 14},-6 M4,-70 L${16 - g * 12},-10" stroke="${o.bot || '#2b2f3a'}" stroke-width="10" stroke-linecap="round"/><path d="M${-26 + g * 14},-2 h26 M${4 - g * 12},-6 h26" stroke="#c9ced6" stroke-width="5"/>
  <g transform="rotate(14 0 -70)"><path d="M-16,-128 Q0,-134 16,-128 L18,-66 L-18,-66Z" fill="${top}"/><path d="M-14,-120 L${-34 - g * 10},-84 M14,-120 L${34 + g * 10},-90" stroke="${top}" stroke-width="9" stroke-linecap="round"/>${o.bag ? `<rect x="-30" y="-122" width="18" height="38" rx="5" fill="${o.bag}"/>` : ''}<circle cx="0" cy="-146" r="13" fill="${o.skin || '#e3b48e'}"/><path d="M-14,-150 Q0,-172 14,-150Z" fill="${o.hat || '#2f7ad0'}"/><circle cx="0" cy="-168" r="5" fill="#fff"/><path d="M-14,-126 h28" stroke="${o.scarf || '#ffce00'}" stroke-width="7"/></g></g>`; }
function canalIce(t, y0 = 640) { return `<rect x="0" y="${y0}" width="${W}" height="${H - y0}" fill="url(#otIce)"/>${[...Array(14)].map((_, i) => `<path d="M${(i * 173) % W},${y0 + 30 + (i * 41) % (H - y0 - 40)} l${120 + (i % 3) * 40},${-6 + (i % 2) * 12}" stroke="#fff" stroke-width="3" opacity=".8"/>`).join('')}<rect x="0" y="${y0 - 40}" width="${W}" height="40" fill="#f4f8fb"/><path d="M0,${y0} L${W},${y0}" stroke="#8a9aa8" stroke-width="4"/>`; }
function iceCastle(cx, base, s = 1, night = false) { const f = night ? '#9ad8ff' : '#d8f0fa', st = night ? '#e8a8ff' : '#a8d0e4'; return `<g transform="translate(${cx},${base}) scale(${s})" ${night ? 'filter="url(#rGlow)"' : ''}><rect x="-200" y="-200" width="400" height="200" fill="${f}" opacity=".85" stroke="${st}" stroke-width="5"/>${[-200, 200].map(x => `<rect x="${x - 50}" y="-320" width="100" height="320" fill="${f}" opacity=".85" stroke="${st}" stroke-width="5"/><path d="M${x - 60},-320 L${x},-410 L${x + 60},-320Z" fill="${f}" stroke="${st}" stroke-width="5"/>`).join('')}<path d="M-60,0 L-60,-90 Q0,-150 60,-90 L60,0Z" fill="${night ? '#5a3a8a' : '#a8d0e4'}" opacity=".6"/>${[...Array(8)].map((_, k) => `<rect x="${-190 + k * 50}" y="-230" width="30" height="30" fill="${f}" stroke="${st}" stroke-width="4"/>`).join('')}</g>`; }
function tulip(x, base, s = 1, col = '#e8352a', t = 0, ph = 0) { const sw = S(t, 1, ph) * 3; return `<g transform="translate(${x},${base}) scale(${s}) rotate(${sw})"><path d="M0,0 Q-4,-40 0,-80" stroke="#3a8a3a" stroke-width="6" fill="none"/><path d="M0,-20 Q-30,-40 -24,-70 Q-10,-40 0,-30Z" fill="#4a9a4a"/><path d="M-16,-80 Q-18,-108 -8,-112 L0,-98 L8,-112 Q18,-108 16,-80 Q0,-70 -16,-80Z" fill="${col}"/></g>`; }
function tulipField(t, y0, y1, n = 120, seed = 3) { const R = rng(seed), cols = ['#e8352a', '#ffce00', '#f29ac0', '#ff8a2a', '#c8325a', '#fff']; const arr = []; for (let i = 0; i < n; i++) arr.push([y0 + R() * (y1 - y0), R() * W, cols[i % 6], i]); arr.sort((a, b) => a[0] - b[0]); return arr.map(([y, x, c, i]) => tulip(x, y, .5 + (y - y0) / (y1 - y0) * .9, c, t, i)).join(''); }
function guard(x, y, s, t, ph, dir = 1) { const st = S(t, 4, ph) * 10; return `<g transform="translate(${x},${y}) scale(${s * dir},${s})">${rShadow(0, 0, 22)}<path d="M-6,-70 L${-6 + st},0 M6,-70 L${6 - st},0" stroke="#1a1a2a" stroke-width="11"/><path d="M-7,-70 L${-7 + st},0" stroke="#d52b1e" stroke-width="3"/>
  <path d="M-17,-130 Q0,-136 17,-130 L18,-68 L-18,-68Z" fill="#c8102e"/><rect x="-18" y="-80" width="36" height="8" fill="#fff"/>${[0, 1, 2].map(k => `<circle cx="0" cy="${-122 + k * 16}" r="2.5" fill="#ffce00"/>`).join('')}<path d="M-14,-124 L-18,-70 M14,-124 L22,-70" stroke="#c8102e" stroke-width="9"/><line x1="24" y1="-70" x2="30" y2="-180" stroke="#555" stroke-width="4"/>
  <circle cx="0" cy="-146" r="12" fill="#e3b48e"/><path d="M-18,-150 Q-22,-210 0,-214 Q22,-210 18,-150Z" fill="#141414"/></g>`; }
function beaver(x, y, s = 1, t = 0) { return `<g transform="translate(${x},${y}) scale(${s})">${rShadow(0, 0, 80)}<ellipse cx="-90" cy="-14" rx="60" ry="22" fill="#5a3a22" transform="rotate(${-10 + S(t, 2) * 6} -40 -14)"/>${[...Array(5)].map((_, k) => `<line x1="${-130 + k * 18}" y1="-30" x2="${-120 + k * 18}" y2="2" stroke="#3a2412" stroke-width="2"/>`).join('')}<ellipse cx="0" cy="-50" rx="70" ry="50" fill="#8a5a32"/><circle cx="60" cy="-80" r="36" fill="#8a5a32"/><circle cx="48" cy="-112" r="9" fill="#6a4222"/><circle cx="72" cy="-88" r="5" fill="#111"/><ellipse cx="92" cy="-76" rx="10" ry="8" fill="#2a1a10"/><rect x="82" y="-66" width="12" height="14" rx="2" fill="#fff"/><path d="M-20,-4 v-10 M30,-4 v-10" stroke="#6a4222" stroke-width="12" stroke-linecap="round"/></g>`; }
function beaverTail(x, y, s = 1) { return `<g transform="translate(${x},${y}) scale(${s})">${rShadow(0, 50, 200, .25)}<path d="M-200,0 Q-200,-90 0,-96 Q200,-90 200,0 Q200,90 0,96 Q-200,90 -200,0Z" fill="#c98a3a"/><path d="M-170,0 Q-170,-70 0,-76 Q170,-70 170,0 Q170,70 0,76 Q-170,70 -170,0Z" fill="#d9a04a"/>${[...Array(40)].map((_, i) => `<circle cx="${-150 + (i * 37) % 300}" cy="${-60 + (i * 23) % 120}" r="${3 + i % 3}" fill="${i % 2 ? '#8a4a1a' : '#fff4dc'}"/>`).join('')}</g>`; }

/* ---------- escenas ---------- */
scenes.ot_intro = function (t) {
  let s = OTALL() + rSky('day') + rSun(1650, 150) + rClouds(t, [[300, 120, .8], [1200, 90, .6]]) + `<path d="M0,760 Q960,640 1920,760 L1920,1080 L0,1080Z" fill="#6f9e58"/>` + parliament(960, 840, .72, t) + `<rect x="0" y="860" width="${W}" height="220" fill="#cfc4ae"/>` + maCrowd(t, 3, 12, 880, 1060);
  return s + `<g transform="translate(${W / 2},${H / 2 - 290})"><rect x="-560" y="-150" width="1120" height="300" rx="40" fill="#fff" opacity=".95" stroke="#2b3a67" stroke-width="6"/>
  <text x="0" y="-30" font-family="Fredoka" font-weight="700" font-size="104" text-anchor="middle" fill="#ffcc2e" stroke="#2b3a67" stroke-width="6" paint-order="stroke">Mi Pequeño Atlas</text>
  <rect x="-330" y="20" width="660" height="96" rx="22" fill="#d52b1e"/><text x="0" y="88" font-family="Fredoka" font-weight="700" font-size="64" text-anchor="middle" fill="#fff">Capítulo 7: Ottawa</text></g>`;
};
scenes.ot_maletas = function (t) {
  let s = OTALL() + `<rect width="${W}" height="${H}" fill="#f4e6cc"/><rect x="0" y="760" width="${W}" height="320" fill="url(#rWood)"/><rect x="1300" y="140" width="420" height="360" fill="#cfe2f0" stroke="#fff" stroke-width="18"/>` + `<svg x="1300" y="140" width="420" height="360" viewBox="0 0 1920 1080">${snowfall(t, 30)}</svg>`;
  s += `<g transform="translate(700,820)">${rShadow(0, 20, 300, .3)}<rect x="-280" y="-200" width="560" height="220" rx="24" fill="#c8323a"/><rect x="-280" y="-200" width="560" height="30" rx="12" fill="#a8222a"/><rect x="-60" y="-250" width="120" height="56" rx="20" fill="none" stroke="#3a3a3a" stroke-width="14"/>${[-200, 200].map(x => `<rect x="${x - 10}" y="-200" width="20" height="220" fill="#8a1a1a"/>`).join('')}
  <path d="M-200,-200 L-180,-320 L80,-330 L120,-200Z" fill="#2f5a8a"/><path d="M-60,-330 L-40,-380 L20,-380 L40,-330Z" fill="#2f5a8a"/><path d="M60,-240 l120,-100 l40,40 l-100,80Z" fill="#ffce00"/></g>`;
  s += `<g transform="translate(1300,800)"><rect x="-6" y="-300" width="12" height="300" fill="#6b4a36"/><path d="M-110,-300 L110,-300 L130,-80 L-130,-80Z" fill="#d52b1e"/><path d="M-110,-300 Q0,-340 110,-300" stroke="#fff" stroke-width="20" fill="none"/></g>`;
  return s + rLabel('Hacemos las maletas y el abrigo más calentito', W / 2, 90, 42);
};
scenes.ot_invitado = function (t) {
  let s = OTALL() + `<rect width="${W}" height="${H}" fill="#2b3a67"/>` + [...Array(20)].map((_, i) => mapleLeaf((i * 197) % W, ((i * 113) + t / L * 300) % H, 1.2 + (i % 3) * .4, '#d52b1e')).join('');
  s += `<g transform="translate(960,420) scale(${1 + S(t, 2) * .02})"><rect x="-540" y="-200" width="1080" height="400" rx="40" fill="#fff"/><text x="0" y="-90" font-family="Fredoka" font-weight="600" font-size="50" text-anchor="middle" fill="#d52b1e">Hoy viajamos con un invitado</text><text x="0" y="40" font-family="Fredoka" font-weight="700" font-size="120" text-anchor="middle" fill="#2b3a67">Carlos</text><text x="0" y="130" font-family="Fredoka" font-weight="600" font-size="40" text-anchor="middle" fill="#2b3a67">¡conoce Ottawa como la palma de su mano!</text></g>`;
  s += `<g transform="translate(960,820)"><rect x="-30" y="-120" width="60" height="120" rx="30" fill="#d52b1e"/><path d="M-60,-60 Q-60,20 0,20 Q60,20 60,-60" stroke="#fff" stroke-width="10" fill="none"/><rect x="-5" y="20" width="10" height="60" fill="#fff"/><rect x="-50" y="80" width="100" height="12" rx="6" fill="#fff"/></g>`;
  return s;
};
scenes.ot_dos_caras = function (t) {
  let s = OTALL() + `<svg x="0" y="0" width="960" height="1080" viewBox="0 0 960 1080"><rect width="960" height="1080" fill="url(#otSnowSky)"/>${pine(120, 600, .9, true)}${pine(820, 600, .9, true)}${canalIce(t, 640)}${skater(300 + S(t, 1) * 80, 900, 2, t, 1)}${skater(620 - S(t, 1) * 80, 960, 1.6, t, 3, '#2f7ad0', { dir: -1 })}${snowfall(t, 30)}</svg>`;
  s += `<svg x="960" y="0" width="960" height="1080" viewBox="0 0 960 1080">${rSky('day')}${rSun(760, 160, 70)}<rect x="0" y="560" width="960" height="520" fill="#6f9e58"/>${tulipField(t, 600, 1080, 70, 5)}</svg><rect x="954" y="0" width="12" height="${H}" fill="#fff"/>`;
  return s + rLabel('Invierno: nieve y hielo', 480, 90, 40) + rLabel('Primavera: flores de colores', 1440, 90, 40);
};
scenes.ot_atlas = function (t) {
  let s = OTALL() + `<rect width="${W}" height="${H}" fill="#f4e6cc"/><rect x="0" y="760" width="${W}" height="320" fill="url(#rWood)"/>`;
  const open = Math.min(1, t / L * 3);
  s += `<g transform="translate(960,700)">${rShadow(0, 60, 600, .3)}<path d="M0,40 L-600,0 L-600,-460 L0,-420Z" fill="#fffaf0" stroke="#c9a468" stroke-width="6"/><path d="M0,40 L${600 * open},0 L${600 * open},-460 L0,-420Z" fill="#fffaf0" stroke="#c9a468" stroke-width="6"/><line x1="0" y1="40" x2="0" y2="-420" stroke="#c9a468" stroke-width="8"/>
  <text x="-300" y="-300" font-family="Fredoka" font-weight="700" font-size="60" text-anchor="middle" fill="#2b3a67" opacity="${open}">Mi Pequeño</text><text x="-300" y="-220" font-family="Fredoka" font-weight="700" font-size="60" text-anchor="middle" fill="#2b3a67" opacity="${open}">Atlas</text>${open > .8 ? `<g transform="translate(300,-200)">${mapleLeaf(0, -20, 4)}<text x="0" y="140" font-family="Fredoka" font-weight="700" font-size="54" text-anchor="middle" fill="#d52b1e">Ottawa</text></g>` : ''}</g>`;
  return s + rLabel('¡Abrimos el Atlas y empezamos el viaje!', W / 2, 100, 44);
};
scenes.ot_mapa = function (t) {
  let s = OTALL() + `<rect width="${W}" height="${H}" fill="#7fb6dc"/>`;
  s += `<path d="M200,180 L420,120 L700,140 L900,90 L1150,120 L1400,100 L1600,160 L1720,260 L1650,360 L1560,420 L1480,520 L1380,560 L1280,540 L1180,580 L1080,560 L900,560 L620,560 L400,540 L300,460 L240,360Z" fill="#f2d98a" stroke="#2b3a67" stroke-width="6" stroke-linejoin="round"/>
  <path d="M400,540 L620,560 L900,560 L1080,560 L1180,580 L1240,640 L1200,760 L1100,860 L940,900 L800,960 L700,1000 L620,940 L520,800 L440,680Z" fill="#cfe2b8" stroke="#8aa87a" stroke-width="4"/><text x="800" y="760" font-family="Fredoka" font-weight="700" font-size="44" fill="#5a7a4a" opacity=".8">ESTADOS UNIDOS</text>
  <text x="900" y="360" font-family="Fredoka" font-weight="700" font-size="70" text-anchor="middle" fill="#d52b1e">CANADÁ</text>`;
  const p = 1 + .18 * Math.max(0, S(t, 4));
  s += `<g transform="translate(1240,540)">${[0, 1].map(k => `<circle r="${20 + ((t / L * 4 + k * .5) % 1) * 120}" fill="none" stroke="#e8352a" stroke-width="4" opacity="${1 - ((t / L * 4 + k * .5) % 1)}"/>`).join('')}<circle r="${15 * p}" fill="#e8352a" stroke="#fff" stroke-width="5"/></g>` + rLabel('Ottawa', 1240, 480, 42, '#e8352a') + caFlag(1660, 640, 1.4) + `<rect x="1600" y="822" width="130" height="14" fill="#555"/>`;
  return s + rLabel('Ottawa está en Canadá, en América del Norte', W / 2, 1010, 40);
};
scenes.ot_bosques = function (t) {
  let s = OTALL() + rSky('day') + rSun(1600, 150) + `<path d="M0,520 L300,360 L560,500 L860,320 L1200,480 L1500,340 L1920,500 L1920,620 L0,620Z" fill="#8aa4b8"/><path d="M300,360 L360,400 L240,400Z M860,320 L940,370 L790,370Z M1500,340 L1570,380 L1430,380Z" fill="#fff"/>`;
  s += `<rect x="0" y="600" width="${W}" height="200" fill="url(#beRiver)"/>` + [...Array(14)].map((_, i) => pine(40 + i * 140, 620, .6 + (i % 3) * .1)).join('') + `<rect x="0" y="800" width="${W}" height="280" fill="#5f8a48"/>` + [...Array(10)].map((_, i) => pine(80 + i * 200, 960 + (i % 2) * 40, 1.0 + (i % 3) * .2, i % 2 == 0)).join('');
  return s + rLabel('Un país gigante: bosques, lagos y nieve', W / 2, 80, 44);
};
scenes.ot_rios = function (t) {
  let s = OTALL() + rSky('day') + `<rect x="0" y="400" width="${W}" height="680" fill="#7aa85a"/>`;
  s += `<path d="M0,520 Q600,460 1100,500 T1920,470 L1920,620 Q1400,640 1000,620 T0,660Z" fill="url(#beRiver)"/><path d="M900,620 Q960,780 880,900 T940,1080 L1080,1080 Q1020,960 1060,880 T1000,620Z" fill="url(#beRiver)"/>`;
  s += madridBlock(1150, 760, 300, 200, '#e8e2d4', '#5a6470') + madridBlock(540, 760, 280, 180, '#d9d1c4', '#5a6470') + parliament(560, 470, .25, t) + rLabel('Río Ottawa', 1500, 430, 36) + rLabel('Río Rideau', 1180, 980, 36);
  return s + rLabel('Una ciudad entre dos ríos', W / 2, 80, 44);
};
scenes.ot_idiomas = function (t) {
  let s = OTALL() + rSky('day') + madridBlock(-20, 720, 980, 500, '#d9c9a0', '#3f7a64') + madridBlock(960, 720, 980, 520, '#e8e2d4', '#3f7a64') + street(720);
  s += rP(560, 1010, 2.3, t, ESC({ ph: 1, top: '#d52b1e', wave: true })) + rP(1360, 1010, 2.3, t, ESC({ ph: 3, top: '#2f7ad0', wave: true, dir: -1, longhair: true }));
  s += bubble(600, 560, 'Hello!', 64, '#d52b1e', 1) + bubble(1320, 560, 'Bonjour!', 64, '#2f7ad0', -1);
  return s + rLabel('Inglés y francés: los dos quieren decir ¡Hola!', W / 2, 90, 42);
};
scenes.ot_parlamento = function (t) {
  let s = OTALL() + rSky('day') + rSun(1700, 140) + rClouds(t, [[300, 120, .8]]) + `<path d="M0,800 Q960,700 1920,800 L1920,1080 L0,1080Z" fill="#6f9e58"/>` + parliament(960, 860, .75, t);
  s += `<rect x="0" y="900" width="${W}" height="180" fill="#cfc4ae"/>` + maCrowd(t, 13, 12, 920, 1070);
  return s + rLabel('La Colina del Parlamento y la Torre de la Paz', W / 2, 1020, 38);
};
scenes.ot_guardia = function (t) {
  let s = OTALL() + rSky('day') + rSun(300, 140) + `<rect x="0" y="560" width="${W}" height="200" fill="#6f9e58"/>` + parliament(960, 620, .55, t) + `<rect x="0" y="700" width="${W}" height="380" fill="#7aa85a"/>`;
  const off = ((t / L) * 400) % 400;
  for (let r = 0; r < 2; r++) for (let i = 0; i < 9; i++) s += guard(((i * 220 + off) % (W + 220)) - 110, 860 + r * 140, 1.5 + r * .3, t, i + r * 2);
  return s + rLabel('El cambio de guardia: ¡tac, tac, tac!', W / 2, 80, 44);
};
scenes.ot_canal = function (t) {
  let s = OTALL() + `<rect width="${W}" height="${H}" fill="url(#otSnowSky)"/>` + madridBlock(-20, 560, 600, 300, '#d9c9a0', '#3f7a64') + madridBlock(1340, 560, 600, 320, '#e8e2d4', '#3f7a64') + parliament(960, 560, .35, t) + canalIce(t, 640);
  const sk = [[300, 820, 1.6, 1, '#d52b1e'], [700, 900, 2, 2, '#2f7ad0'], [1100, 780, 1.4, 3, '#3aa65a'], [1500, 960, 2.2, 4, '#ffce00'], [900, 1000, 2.4, 5, '#b86ad0']];
  s += sk.map(([x, y, sc, ph, c]) => skater(((x + t / L * 600 * (ph % 2 ? 1 : -1)) % (W + 200) + W + 200) % (W + 200) - 100, y, sc, t, ph, c, { dir: ph % 2 ? 1 : -1 })).join('') + snowfall(t, 30);
  return s + rLabel('El Canal Rideau: ¡patinar sobre el agua congelada!', W / 2, 80, 40);
};
scenes.ot_canal_verano = function (t) {
  let s = OTALL() + rSky('day') + rSun(1600, 150) + madridBlock(-20, 560, 600, 300, '#d9c9a0', '#3f7a64') + madridBlock(1340, 560, 600, 320, '#e8e2d4', '#3f7a64') + parliament(960, 560, .35, t) + `<rect x="0" y="560" width="${W}" height="80" fill="#7aa85a"/>` + spree(640, t, 440);
  s += `<g transform="translate(${((t / L) * 900) % 2400 - 300},800)"><path d="M-180,0 L180,0 L150,50 L-160,50Z" fill="#fff"/><rect x="-120" y="-50" width="200" height="50" fill="#f4f4f0"/><rect x="-100" y="-40" width="160" height="26" fill="#6a8aa8"/><line x1="40" y1="-50" x2="40" y2="-140" stroke="#555" stroke-width="4"/>${caFlag(40, -140, .4).replace('<line x1="0" y1="0" x2="0" y2="130" stroke="#555" stroke-width="4"/>', '')}</g>`;
  return s + rLabel('Un canal de casi 200 años · Patrimonio de la Humanidad', W / 2, 80, 38);
};
scenes.ot_esclusas = function (t) {
  let s = OTALL() + rSky('day') + rSun(1650, 140) + `<rect x="0" y="500" width="${W}" height="580" fill="#7aa85a"/>`;
  const lv = (S(t, 1) + 1) / 2;
  for (let k = 0; k < 4; k++) { const x = 160 + k * 420, y = 520 + k * 110; s += `<rect x="${x}" y="${y}" width="400" height="${560 - k * 110}" fill="#9a958c"/><rect x="${x + 20}" y="${y + 20}" width="360" height="${520 - k * 110}" fill="url(#beRiver)"/><rect x="${x + 380}" y="${y - 10}" width="20" height="${580 - k * 110}" fill="#6b4a36"/>`; }
  s += `<g transform="translate(${200 + lv * 1300},${560 + lv * 330})"><path d="M0,0 L180,0 L160,40 L10,40Z" fill="#fff"/><rect x="40" y="-40" width="100" height="40" fill="#d52b1e"/></g>`;
  return s + rLabel('Las esclusas: ¡un ascensor para barcos!', W / 2, 80, 44);
};
scenes.ot_8km = function (t) {
  let s = OTALL() + `<rect width="${W}" height="${H}" fill="url(#otSnowSky)"/>` + `<path d="M0,1080 Q600,700 900,560 T1920,300 L1920,420 Q1400,560 1100,700 T200,1080Z" fill="url(#otIce)" stroke="#8a9aa8" stroke-width="5"/>` + [...Array(8)].map((_, i) => pine(60 + i * 260, 480 + i * 10, .6, true)).join('');
  s += [...Array(10)].map((_, i) => { const p = ((t / L) + i / 10) % 1; return skater(200 + p * 1600, 1000 - p * 640, 1.6 - p, t, i, ['#d52b1e', '#2f7ad0', '#ffce00', '#3aa65a'][i % 4]); }).join('');
  return s + `<g transform="translate(560,300)"><rect x="-300" y="-110" width="600" height="220" rx="40" fill="#fff" stroke="#d52b1e" stroke-width="8"/><text x="0" y="46" font-family="Fredoka" font-weight="700" font-size="140" text-anchor="middle" fill="#d52b1e">8 km</text></g>` + rLabel('¡La pista de patinaje natural más larga del mundo!', W / 2, 1020, 38);
};
scenes.ot_escuela = function (t) {
  let s = OTALL() + `<rect width="${W}" height="${H}" fill="url(#otSnowSky)"/>` + `<g transform="translate(1500,600)"><rect x="-300" y="-260" width="600" height="260" fill="#b8563a"/>${[...Array(8)].map((_, i) => `<rect x="${-270 + (i % 4) * 140}" y="${-230 + Math.floor(i / 4) * 110}" width="90" height="70" fill="#cfe0f0"/>`).join('')}<rect x="-140" y="-300" width="280" height="50" fill="#fff"/><text x="0" y="-262" font-family="Fredoka" font-weight="700" font-size="34" text-anchor="middle" fill="#2b3a67">SCHOOL · ÉCOLE</text></g>` + canalIce(t, 640);
  s += skater(500 + S(t, 1) * 100, 900, 2.2, t, 1, '#2f7ad0', { bag: '#d52b1e' }) + skater(900 + S(t, 1, 1) * 100, 980, 2.0, t, 2, '#ffce00', { bag: '#3aa65a', hat: '#d52b1e' }) + skater(1200, 860, 2.4, t, 3, '#5a5a6a', { bag: '#2b2f3a', hat: '#555', scarf: '#d52b1e' }) + snowfall(t, 30);
  return s + rLabel('¡Patinando hasta la escuela y el trabajo!', W / 2, 80, 44);
};
scenes.ot_cabanas = function (t) {
  let s = OTALL() + `<rect width="${W}" height="${H}" fill="url(#otSnowSky)"/>` + canalIce(t, 700);
  s += [0, 1, 2].map(k => `<g transform="translate(${360 + k * 600},700)"><rect x="-200" y="-260" width="400" height="260" fill="${['#7a4a2a', '#8a5a32', '#6a3a22'][k]}"/>${[...Array(7)].map((_, j) => `<line x1="-200" y1="${-230 + j * 36}" x2="200" y2="${-230 + j * 36}" stroke="#4a2a16" stroke-width="3"/>`).join('')}<path d="M-240,-260 L0,-380 L240,-260Z" fill="#f4f8fb"/><rect x="-140" y="-200" width="280" height="110" fill="#ffe9b0"/><rect x="-170" y="-90" width="340" height="20" fill="#4a2a16"/><rect x="-120" y="-320" width="240" height="44" fill="#d52b1e"/><text x="0" y="-288" font-family="Fredoka" font-weight="700" font-size="26" text-anchor="middle" fill="#fff">${['CHOCOLATE', 'COLA DE CASTOR', 'CHOCOLATE'][k]}</text></g>`).join('');
  s += skater(500, 900, 2, t, 1, '#2f7ad0') + skater(1300, 960, 2.2, t, 2, '#d52b1e', { dir: -1 }) + steam(360, 520, t, 2) + steam(1560, 520, t, 2) + snowfall(t, 30);
  return s + rLabel('Cabañitas calentitas junto a la pista', W / 2, 80, 44);
};
scenes.ot_colacastor = function (t) {
  let s = OTALL() + `<rect width="${W}" height="${H}" fill="#f4e6cc"/><rect x="0" y="640" width="${W}" height="440" fill="url(#rWood)"/>` + plate(800, 780, 340, '') + beaverTail(800, 740, 1.1) + `<g transform="translate(1440,620)">${chocoCup(0, 0, 1)}${steam(0, -110, t, 2)}</g>`;
  return s + rLabel('«Cola de castor»: masa frita con canela y azúcar', W / 2, 100, 42) + rLabel('Chocolate caliente', 1440, 830, 32);
};
scenes.ot_castor = function (t) {
  let s = OTALL() + rSky('day') + rSun(1600, 150) + `<rect x="0" y="420" width="${W}" height="220" fill="#5f8a48"/>` + [...Array(10)].map((_, i) => pine(60 + i * 200, 520, .6)).join('') + spree(560, t, 520);
  s += `<path d="M300,720 L1500,620 L1560,700 L360,820Z" fill="#6b4a2a"/>${[...Array(26)].map((_, i) => `<rect x="${320 + i * 46}" y="${700 - i * 4}" width="70" height="18" rx="9" fill="${['#8a5a32', '#6b4a2a', '#9a6a3a'][i % 3]}" transform="rotate(${(i * 23) % 40 - 20} ${350 + i * 46} ${710 - i * 4})"/>`).join('')}`;
  s += beaver(900, 700, 1.4, t) + `<g transform="translate(1300,640) rotate(${S(t, 2) * 4})"><rect x="-90" y="-12" width="180" height="24" rx="12" fill="#8a5a32"/></g>`;
  return s + rLabel('El castor: ¡un pequeño ingeniero!', W / 2, 80, 44);
};
scenes.ot_winterlude = function (t) {
  let s = OTALL() + `<rect width="${W}" height="${H}" fill="url(#otSnowSky)"/>` + snowGround(700) + iceCastle(960, 820, 1.1) + `<g transform="translate(400,860)"><path d="M-80,0 L-60,-120 Q0,-220 60,-120 L80,0Z" fill="#d8f0fa" stroke="#a8d0e4" stroke-width="5" opacity=".9"/><circle cx="0" cy="-200" r="50" fill="#d8f0fa" stroke="#a8d0e4" stroke-width="5"/></g><g transform="translate(1540,860)"><path d="M-160,0 L160,0 L130,-60 L-140,-60Z M-20,-60 L-20,-220 L80,-80Z" fill="#d8f0fa" stroke="#a8d0e4" stroke-width="5" opacity=".9"/></g>`;
  s += maCrowd(t, 23, 12, 900, 1070) + snowfall(t, 40);
  return s + rLabel('Winterlude: ¡la fiesta del invierno!', W / 2, 80, 46);
};
scenes.ot_hielo_noche = function (t) {
  let s = OTALL() + rSky('night') + rStars(t, 60) + snowGround(720) + iceCastle(960, 840, 1.2, true) + `<g filter="url(#rGlow)">${[...Array(20)].map((_, i) => `<circle cx="${100 + i * 90}" cy="${180 + Math.sin(i / 2) * 20}" r="10" fill="${['#ff5a5f', '#ffd34d', '#4fb3f6', '#b86ad0'][i % 4]}" opacity="${.6 + .4 * S(t, 4, i)}"/>`).join('')}</g>`;
  s += rCrowd(t, 33, 10, 900, 1070, { tops: ['#d52b1e', '#2f7ad0', '#ffce00', '#3aa65a'] });
  return s + rLabel('Esculturas de hielo con luces de colores', W / 2, 80, 44);
};
scenes.ot_copos = function (t) {
  let s = OTALL() + rSky('day') + rSun(1650, 140) + snowGround(560);
  s += `<path d="M700,370 L700,560 M740,380 L740,560 M560,430 L560,560 M1500,390 L1500,560 M1540,400 L1540,560 M1340,490 L1340,580" stroke="#a8d0e4" stroke-width="14"/><path d="M640,350 L800,350 L800,370 L640,370Z M1450,370 L1600,370 L1600,390 L1450,390Z" fill="#d8f0fa" stroke="#a8d0e4" stroke-width="4"/><path d="M200,560 L700,360 L760,380 L300,600Z" fill="#e8f4fa" stroke="#a8d0e4" stroke-width="6"/><path d="M1100,600 L1500,380 L1560,400 L1180,640Z" fill="#e8f4fa" stroke="#a8d0e4" stroke-width="6"/>`;
  const p1 = (t / L * 2) % 1, p2 = (t / L * 2 + .5) % 1;
  s += `<g transform="translate(${700 - p1 * 460},${370 + p1 * 200})"><ellipse cx="0" cy="0" rx="46" ry="16" fill="#d52b1e"/>${rP(0, -6, 1.3, t, ESC({ ph: 1, child: true, top: '#2f7ad0', wave: true }))}</g><g transform="translate(${1500 - p2 * 380},${390 + p2 * 220})"><ellipse cx="0" cy="0" rx="46" ry="16" fill="#2f7ad0"/>${rP(0, -6, 1.3, t, ESC({ ph: 3, child: true, top: '#ffce00', wave: true }))}</g>`;
  s += `<g transform="translate(960,900)">${[...Array(5)].map((_, k) => `<rect x="${-400 + k * 160}" y="-120" width="40" height="120" fill="#e8f4fa" stroke="#a8d0e4" stroke-width="4"/>`).join('')}<rect x="-400" y="-130" width="680" height="30" fill="#e8f4fa" stroke="#a8d0e4" stroke-width="4"/></g>` + rP(1600, 1000, 2, t, ESC({ ph: 5, child: true, top: '#d52b1e', hold: `<g transform="translate(6,-56)"><rect x="-16" y="-12" width="32" height="26" rx="6" fill="#fff"/><rect x="-12" y="-14" width="24" height="6" fill="#5a2e1a"/></g>` }));
  return s + rLabel('El Reino de los Copos de Nieve (Gatineau)', W / 2, 80, 42);
};
scenes.ot_nieve = function (t) {
  let s = OTALL() + `<rect width="${W}" height="${H}" fill="url(#otSnowSky)"/>` + [...Array(6)].map((_, i) => pine(120 + i * 340, 620, .9, true)).join('') + snowGround(620) + snowfall(t, 50);
  s += `<g transform="translate(1500,980)"><circle cx="0" cy="-70" r="80" fill="#fff" stroke="#dde" stroke-width="3"/><circle cx="0" cy="-190" r="60" fill="#fff" stroke="#dde" stroke-width="3"/><circle cx="0" cy="-280" r="44" fill="#fff" stroke="#dde" stroke-width="3"/><path d="M0,-280 l36,8 l-36,8Z" fill="#f29a3a"/><circle cx="-14" cy="-292" r="5" fill="#222"/><circle cx="14" cy="-292" r="5" fill="#222"/><path d="M-50,-212 h100" stroke="#d52b1e" stroke-width="14"/><path d="M-40,-330 h80 l-10,-50 h-60Z" fill="#2b2f3a"/></g>`;
  const bx = 800 + S(t, 1) * 260;
  s += rP(bx - 260, 980, 2.2, t, { ph: 1, child: true, top: '#d52b1e', cap: '#2f7ad0' }) + rP(bx + 200, 1000, 2.2, t, { ph: 3, child: true, top: '#2f7ad0', cap: '#ffce00', dir: -1 }) + `<circle cx="${bx + (t / L * 4 % 1) * 200 - 100}" cy="${800 - Math.sin((t / L * 4 % 1) * Math.PI) * 120}" r="20" fill="#fff" stroke="#ccd" stroke-width="2"/>`;
  return s + rLabel('Abrigarse bien… ¡y salir a jugar con la nieve!', W / 2, 80, 42);
};
scenes.ot_tulipanes = function (t) {
  let s = OTALL() + rSky('day') + rSun(1650, 140) + rClouds(t, [[300, 120, .8]]) + parliament(960, 560, .45, t) + `<rect x="0" y="540" width="${W}" height="540" fill="#6f9e58"/>` + tulipField(t, 580, 1080, 160, 9);
  return s + rLabel('¡Más de un millón de tulipanes!', W / 2, 80, 46);
};
scenes.ot_princesa = function (t) {
  let s = OTALL() + `<rect width="${W}" height="${H}" fill="#efe2c6"/><rect width="${W}" height="${H}" fill="#c9a77a" opacity=".25"/><rect x="0" y="760" width="${W}" height="320" fill="#b8a07a"/>`;
  s += nlFlag(360, 360, 1.6) + `<rect x="300" y="568" width="140" height="14" fill="#555"/>` + caFlag(1460, 360, 1.6) + `<rect x="1400" y="568" width="140" height="14" fill="#555"/>`;
  s += `<path d="M560,520 Q960,380 1360,520" stroke="#2b3a67" stroke-width="6" stroke-dasharray="20 14" fill="none"/>`;
  s += rP(960, 1000, 3.0, t, ESC({ ph: 2, top: '#7a8ac8', skirt: '#7a8ac8', longhair: true, hold: `<g transform="translate(0,-74)"><ellipse cx="0" cy="0" rx="22" ry="14" fill="#fff"/><circle cx="12" cy="-6" r="8" fill="#f5d8bd"/></g>` })) + `<g transform="translate(960,560)"><path d="M-24,0 L-18,-30 L-8,-12 L0,-36 L8,-12 L18,-30 L24,0Z" fill="url(#maGold)" transform="scale(1.2)"/></g>`;
  return s + rLabel('La princesa Juliana de los Países Bajos y su bebé Margarita', W / 2, 1010, 34);
};
scenes.ot_hospital = function (t) {
  let s = OTALL() + `<rect width="${W}" height="${H}" fill="#e8f0f4"/><rect x="0" y="760" width="${W}" height="320" fill="#c9d4dc"/><rect x="200" y="160" width="420" height="320" fill="#a8cff0" stroke="#fff" stroke-width="16"/>`;
  s += `<g transform="translate(1100,800)"><rect x="-260" y="-140" width="520" height="40" rx="10" fill="#fff" stroke="#bcc" stroke-width="4"/><rect x="-240" y="-100" width="20" height="100" fill="#999"/><rect x="220" y="-100" width="20" height="100" fill="#999"/><rect x="-260" y="-200" width="40" height="100" fill="#ccd"/></g>`;
  s += `<g transform="translate(1100,560) scale(${1 + S(t, 2) * .03})">${nlFlag(-60, -40, 1.6).replace('<line x1="0" y1="0" x2="0" y2="130" stroke="#555" stroke-width="4"/>', '')}</g>`;
  return s + rLabel('Por unos días, ¡un pedacito de los Países Bajos en Ottawa!', W / 2, 90, 38);
};
scenes.ot_bulbos = function (t) {
  let s = OTALL() + rSky('day') + parliament(1500, 640, .4, t) + `<rect x="0" y="640" width="${W}" height="440" fill="#7aa85a"/>`;
  s += [...Array(6)].map((_, i) => `<g transform="translate(${260 + (i % 3) * 300},${800 + Math.floor(i / 3) * 150})"><rect x="-120" y="-80" width="240" height="100" fill="#c9a468" stroke="#8a6a3a" stroke-width="5"/>${[...Array(8)].map((_, k) => `<ellipse cx="${-90 + k * 26}" cy="-84" rx="14" ry="18" fill="#c98a5a"/>`).join('')}<text x="0" y="-10" font-family="Fredoka" font-weight="700" font-size="26" text-anchor="middle" fill="#5a3a1a">TULIPANES</text></g>`).join('');
  s += `<g transform="translate(1250,620)"><rect x="-230" y="-60" width="460" height="120" rx="30" fill="#fff" stroke="#d52b1e" stroke-width="6"/><text x="0" y="22" font-family="Fredoka" font-weight="700" font-size="64" text-anchor="middle" fill="#d52b1e">100.000</text></g>`;
  return s + rLabel('Un regalo de agradecimiento: bulbos de tulipán', W / 2, 80, 42);
};
scenes.ot_festival = function (t) {
  let s = OTALL() + rSky('day') + rSun(1650, 140) + `<rect x="0" y="480" width="${W}" height="600" fill="#6f9e58"/>` + tulipField(t, 520, 820, 90, 13) + `<rect x="0" y="820" width="${W}" height="260" fill="#cfc4ae"/>`;
  s += `${[...Array(18)].map((_, i) => `<path d="M${i * 110},250 l55,40 l55,-40" fill="${['#d52b1e', '#fff', '#ffce00', '#f29ac0'][i % 4]}" stroke="#555" stroke-width="2"/>`).join('')}<path d="M0,250 Q960,300 1920,250" stroke="#555" stroke-width="3" fill="none"/>` + maCrowd(t, 43, 14, 860, 1070);
  return s + rLabel('Festival Canadiense de los Tulipanes (mayo)', W / 2, 80, 42);
};
scenes.ot_secretos = function (t) {
  let s = OTALL() + `<rect width="${W}" height="${H}" fill="#2b3a67"/>` + [...Array(12)].map((_, i) => mapleLeaf((i * 197) % W, ((i * 113) + t / L * 200) % H, 1, '#d52b1e')).join('');
  s += [0, 1, 2].map(k => `<g transform="translate(${420 + k * 540},560) scale(${1 + .04 * Math.max(0, S(t, 1, k * 2))})"><rect x="-220" y="-260" width="440" height="520" rx="30" fill="#fff"/><text x="0" y="-50" font-family="Fredoka" font-weight="700" font-size="170" text-anchor="middle" fill="#d52b1e">${k + 1}</text><text x="0" y="60" font-family="Fredoka" font-weight="700" font-size="44" text-anchor="middle" fill="#2b3a67">Secreto</text><text x="0" y="160" font-family="Fredoka" font-weight="700" font-size="80" text-anchor="middle" fill="#2b3a67">?</text></g>`).join('');
  return s + rLabel('Tres secretos de explorador', W / 2, 140, 46);
};
scenes.ot_arana = function (t) {
  let s = OTALL() + rSky('day') + rSun(1650, 140) + `<g transform="translate(1300,760)"><rect x="-460" y="-280" width="920" height="280" fill="#cfd4d8"/><path d="M-460,-280 L-300,-280 L-200,-460 L-100,-280Z" fill="#a8c8d8" opacity=".9"/><path d="M-200,-460 L-120,-560 L-40,-460 L-100,-280Z" fill="#c8e0ec" opacity=".9"/>${[...Array(12)].map((_, i) => `<line x1="${-440 + i * 80}" y1="-280" x2="${-440 + i * 80}" y2="0" stroke="#b8bec4" stroke-width="4"/>`).join('')}<rect x="-460" y="-120" width="920" height="120" fill="#a8c8d8" opacity=".7"/></g><rect x="0" y="760" width="${W}" height="320" fill="#cfc4ae"/>`;
  s += `<g transform="translate(640,800)">${rShadow(0, 0, 320, .3)}${[[-1, 1], [-1, .6], [-1, .25], [-1, -.1], [1, 1], [1, .6], [1, .25], [1, -.1]].map(([d, k], i) => `<path d="M0,-460 Q${d * (120 + k * 200)},${-640 + k * 120} ${d * (220 + k * 300)},0" stroke="#3a3430" stroke-width="${16 - i % 4 * 2}" fill="none"/>`).join('')}<ellipse cx="0" cy="-470" rx="70" ry="50" fill="#3a3430"/><ellipse cx="0" cy="-400" rx="44" ry="40" fill="#4a4440"/>${[...Array(8)].map((_, k) => `<ellipse cx="${-24 + (k % 4) * 16}" cy="${-404 + Math.floor(k / 4) * 18}" rx="8" ry="10" fill="#f4efe8"/>`).join('')}</g>`;
  s += rP(1000, 1010, 1.8, t, ESC({ ph: 2, child: true, top: '#ffce00', wave: true })) + maCrowd(t, 53, 8, 860, 1070);
  return s + rLabel('«Mamá»: una araña gigante de 9 metros', W / 2, 80, 44) + rArrowLabel('Huevos de mármol', 340, 330, 620, 400, 30);
};
scenes.ot_totems = function (t) {
  let s = OTALL() + rSky('day') + rSun(1650, 140) + `<g transform="translate(1300,660)"><path d="M-500,0 Q-400,-260 -100,-300 Q200,-320 400,-200 Q500,-120 500,0Z" fill="#c9a468"/><path d="M-460,0 Q-380,-200 -100,-240 Q160,-260 360,-160 Q440,-100 460,0Z" fill="#b8925a"/><rect x="-500" y="-40" width="1000" height="40" fill="#8a6a3a"/></g><rect x="0" y="660" width="${W}" height="420" fill="#cfc4ae"/>`;
  const totem = (x, h, sc) => `<g transform="translate(${x},940) scale(${sc})">${rShadow(0, 0, 60)}<rect x="-40" y="${-h}" width="80" height="${h}" fill="#8a5a32"/>${[...Array(Math.floor(h / 120))].map((_, k) => { const y = -h + k * 120; const c = ['#d52b1e', '#2b3a67', '#3aa65a', '#ffce00'][k % 4]; return `<rect x="-44" y="${y + 8}" width="88" height="104" rx="20" fill="#9a6a3a"/><circle cx="-18" cy="${y + 44}" r="12" fill="#fff"/><circle cx="18" cy="${y + 44}" r="12" fill="#fff"/><circle cx="-18" cy="${y + 44}" r="6" fill="#111"/><circle cx="18" cy="${y + 44}" r="6" fill="#111"/><path d="M-22,${y + 80} q22,14 44,0" stroke="${c}" stroke-width="8" fill="none"/><path d="M-6,${y + 52} L0,${y + 70} L6,${y + 52}" fill="${c}"/>`; }).join('')}${x % 2 ? `<path d="M-120,${-h + 30} L-40,${-h + 60} L-40,${-h + 90} L-120,${-h + 70}Z M120,${-h + 30} L40,${-h + 60} L40,${-h + 90} L120,${-h + 70}Z" fill="#9a6a3a"/>` : ''}</g>`;
  s += totem(400, 720, 1) + totem(700, 600, 1) + totem(1001, 840, 1) + rP(1300, 1010, 2.0, t, ESC({ ph: 1, child: true, top: '#d52b1e', dir: -1 })) + rP(1460, 1020, 2.4, t, ESC({ ph: 3, top: '#2b3a67', dir: -1 }));
  return s + rLabel('Tótems: historias de los primeros pueblos, contadas en madera', W / 2, 80, 36);
};
scenes.ot_canadaday = function (t) {
  let s = OTALL() + rSky('night') + rStars(t, 50) + `<path d="M0,760 Q960,660 1920,760 L1920,1080 L0,1080Z" fill="#2a3a2a"/>` + parliament(960, 820, .7, t);
  s += [0, 1, 2, 3].map(k => { const p = (t / L * 2 + k / 4) % 1; return `<g transform="translate(${300 + k * 440},${250 - p * 60})" opacity="${1 - p}">${[...Array(14)].map((_, j) => `<line x1="0" y1="0" x2="${Math.cos(j / 14 * TAU) * p * 180}" y2="${Math.sin(j / 14 * TAU) * p * 180}" stroke="${k % 2 ? '#ff3a2a' : '#fff'}" stroke-width="6"/>`).join('')}</g>`; }).join('');
  s += rCrowd(t, 63, 22, 880, 1075, { tops: ['#d52b1e', '#fff', '#d52b1e', '#fff'] }) + [...Array(6)].map((_, i) => `<g transform="translate(${200 + i * 300},${880 - Math.abs(S(t, 4, i)) * 20})">${caFlag(0, 0, .6)}</g>`).join('');
  return s + rLabel('1 de julio: ¡el Día de Canadá!', W / 2, 1020, 44);
};
scenes.ot_cuaderno = function (t) {
  let s = OTALL() + `<rect width="${W}" height="${H}" fill="#f4e6cc"/><rect x="0" y="760" width="${W}" height="320" fill="url(#rWood)"/>`;
  s += `<g transform="translate(960,660) rotate(-3)">${rShadow(0, 120, 560, .3)}<rect x="-560" y="-400" width="1120" height="520" rx="20" fill="#fffaf0" stroke="#c9a468" stroke-width="6"/><line x1="0" y1="-400" x2="0" y2="120" stroke="#c9a468" stroke-width="6"/>${[...Array(8)].map((_, k) => `<line x1="-520" y1="${-320 + k * 56}" x2="-40" y2="${-320 + k * 56}" stroke="#e8dcc0" stroke-width="3"/><line x1="40" y1="${-320 + k * 56}" x2="520" y2="${-320 + k * 56}" stroke="#e8dcc0" stroke-width="3"/>`).join('')}
  <g transform="translate(-280,-100)" stroke="#2b3a67" stroke-width="8" fill="none" stroke-linecap="round"><path d="M-120,40 L-120,-80 Q-120,-110 -80,-110 L-60,-110 L-60,20 Q20,20 40,40 Z"/><path d="M-140,70 h200"/><path d="M-120,40 v30 M20,40 v30"/></g>
  <g transform="translate(280,40)">${tulip(0, 0, 2.4, '#e8352a', t)}</g>${mapleLeaf(400, -280, 2)}</g>`;
  s += `<g transform="translate(1420,840) rotate(-30)"><rect x="-10" y="-120" width="20" height="200" fill="#ffce00"/><path d="M-10,80 L0,110 L10,80Z" fill="#2b3a67"/></g>`;
  return s + rLabel('Dibujen su viaje en su cuaderno de viajes', W / 2, 100, 44);
};
scenes.ot_libros = function (t) {
  let s = OTALL() + `<rect width="${W}" height="${H}" fill="#fdf3dc"/><rect x="0" y="780" width="${W}" height="300" fill="url(#rWood)"/>`;
  const book = (x, col, title, r) => `<g transform="translate(${x},780) rotate(${r})">${rShadow(0, 0, 150, .3)}<rect x="-140" y="-380" width="280" height="380" rx="10" fill="${col}"/><rect x="-140" y="-380" width="24" height="380" fill="#000" opacity=".2"/><rect x="-100" y="-330" width="200" height="140" rx="10" fill="#fff" opacity=".9"/><text x="0" y="-270" font-family="Fredoka" font-weight="700" font-size="30" text-anchor="middle" fill="${col}">Mi Pequeño</text><text x="0" y="-230" font-family="Fredoka" font-weight="700" font-size="30" text-anchor="middle" fill="${col}">Atlas</text><text x="0" y="-100" font-family="Fredoka" font-weight="700" font-size="38" text-anchor="middle" fill="#fff">${title}</text></g>`;
  s += book(360, '#2b3a67', 'Tokio', -4) + book(700, '#1f4fa0', 'París', 2) + book(1040, '#2f9a4a', 'Roma', -2) + book(1380, '#c60b1e', 'Madrid', 3);
  s += `<g transform="translate(1680,760) rotate(6)"><rect x="-120" y="-320" width="240" height="320" fill="#fff" stroke="#ccc" stroke-width="3"/><g stroke="#2b3a67" stroke-width="5" fill="none">${tulip(0, -60, 1.6, 'none')}<rect x="-80" y="-280" width="160" height="80"/></g></g>`;
  return s + rLabel('Los libros de Mi Pequeño Atlas · Libros para colorear', W / 2, 100, 38);
};
scenes.ot_outro = function (t) {
  let s = OTALL() + rSky('dusk') + rSun(1500, 420, 80) + `<path d="M0,760 Q960,660 1920,760 L1920,1080 L0,1080Z" fill="#5a7a4a"/>` + parliament(960, 840, .72, t) + `<rect x="0" y="860" width="${W}" height="220" fill="#b8ab90"/>` + maCrowd(t, 73, 12, 880, 1060);
  return s + `<g transform="translate(${W / 2},${H / 2 - 290}) scale(${1 + S(t, 2) * .01})"><rect x="-620" y="-150" width="1240" height="300" rx="40" fill="#fff" opacity=".95" stroke="#2b3a67" stroke-width="6"/>
  <text x="0" y="-20" font-family="Fredoka" font-weight="700" font-size="100" text-anchor="middle" fill="#d52b1e" stroke="#2b3a67" stroke-width="2" paint-order="stroke">¡Adiós, Ottawa!</text>
  <text x="0" y="90" font-family="Fredoka" font-weight="600" font-size="52" text-anchor="middle" fill="#2b3a67">Hasta pronto, pequeños exploradores ✈</text></g>`;
};
