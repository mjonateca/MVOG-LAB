/* =====================================================================
   Mi Pequeño Atlas — Capítulo 2: París. Escenas realistas.
   ===================================================================== */
const PD = `<defs>
<linearGradient id="pIron" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5e4632"/><stop offset=".5" stop-color="#8a6a4a"/><stop offset="1" stop-color="#4e3a28"/></linearGradient>
<linearGradient id="pStone" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#efe6d2"/><stop offset="1" stop-color="#d9ccb0"/></linearGradient>
<linearGradient id="pZinc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8d98a6"/><stop offset="1" stop-color="#5f6a78"/></linearGradient>
<linearGradient id="pSeine" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6f9fb8"/><stop offset="1" stop-color="#3f6f8a"/></linearGradient>
<linearGradient id="pGlass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c9e2f2"/><stop offset="1" stop-color="#7fa8c8"/></linearGradient>
<radialGradient id="pLamp"><stop offset="0" stop-color="#fff3c0"/><stop offset=".4" stop-color="#ffe08a" stop-opacity=".7"/><stop offset="1" stop-color="#ffe08a" stop-opacity="0"/></radialGradient>
</defs>`;
const PDALL = () => D() + PD;

/* ---------- piezas ---------- */
function eiffel(x, base, s = 1, night = false, t = 0) {
  const c = night ? '#c9984a' : '#7a5a3e', c2 = night ? '#ffd27a' : '#5e4632';
  let lat = '';
  const lvl = (y1, y2, w1, w2, n) => { let o = `<path d="M${-w1},${y1} L${-w2},${y2} L${w2},${y2} L${w1},${y1}Z" fill="${c}" opacity=".18"/>`;
    for (let i = 0; i <= n; i++) { const k = i / n; const xa = -w1 + (w1 - w2) * k, ya = y1 + (y2 - y1) * k; o += `<line x1="${xa}" y1="${ya}" x2="${-xa}" y2="${ya}" stroke="${c}" stroke-width="2.5"/>`; if (i < n) { const k2 = (i + 1) / n, xb = -w1 + (w1 - w2) * k2, yb = y1 + (y2 - y1) * k2; o += `<line x1="${xa}" y1="${ya}" x2="${xb * .3}" y2="${yb}" stroke="${c}" stroke-width="1.6"/><line x1="${-xa}" y1="${ya}" x2="${-xb * .3}" y2="${yb}" stroke="${c}" stroke-width="1.6"/>`; } }
    return o + `<path d="M${-w1},${y1} L${-w2},${y2} M${w1},${y1} L${w2},${y2}" stroke="${c}" stroke-width="7"/>`; };
  lat += `<path d="M-260,0 Q-170,-120 -110,-190 L110,-190 Q170,-120 260,0 L200,0 Q120,-110 0,-118 Q-120,-110 -200,0Z" fill="${c}"/>`;
  lat += lvl(-190, -200, 120, 116, 2) + `<rect x="-128" y="-214" width="256" height="20" fill="${c}"/>`;
  lat += lvl(-214, -420, 104, 52, 8) + `<rect x="-62" y="-432" width="124" height="16" fill="${c}"/>`;
  lat += lvl(-432, -760, 44, 10, 12) + `<rect x="-18" y="-772" width="36" height="16" fill="${c}"/><line x1="0" y1="-772" x2="0" y2="-830" stroke="${c}" stroke-width="5"/>`;
  const glow = night ? `<g opacity="${0.6 + 0.4 * Math.abs(S(t, 8))}">${[...Array(40)].map((_, i) => { const R = rng(i + 3); const y = -R() * 760, w = y > -200 ? 230 : y > -430 ? 104 + (y + 214) / 206 * -52 + 0 : 44 - (y + 432) / -328 * 34; return `<circle cx="${(R() * 2 - 1) * Math.max(10, w)}" cy="${y}" r="3" fill="#fff"/>`; }).join('')}</g>` : '';
  return `<g transform="translate(${x},${base}) scale(${s})">${night ? `<ellipse cx="0" cy="-380" rx="200" ry="460" fill="#ffcf7a" opacity=".12" filter="url(#rBlurBig)"/>` : ''}${lat}${glow}</g>`;
}
function haussmann(x, base, w, h, o = {}) {
  const fl = 6, fh = (h - 90) / fl; let s = `<rect x="${x}" y="${base - h}" width="${w}" height="${h}" fill="url(#pStone)"/>
  <path d="M${x - 6},${base - h} L${x + w + 6},${base - h} L${x + w - 20},${base - h - 70} L${x + 20},${base - h - 70}Z" fill="url(#pZinc)"/>`;
  const cols = Math.max(2, Math.floor(w / 70));
  for (let c = 0; c < cols; c++) { const wx = x + 18 + c * (w - 36) / cols; s += `<rect x="${wx + 12}" y="${base - h - 56}" width="24" height="34" fill="#4a5664"/><path d="M${wx + 8},${base - h - 56} L${wx + 24},${base - h - 70} L${wx + 40},${base - h - 56}Z" fill="#6f7a88"/>`; }
  for (let r = 0; r < fl; r++) for (let c = 0; c < cols; c++) {
    const wx = x + 18 + c * (w - 36) / cols, wy = base - h + 14 + r * fh, ww = (w - 36) / cols - 20;
    s += `<rect x="${wx}" y="${wy}" width="${ww}" height="${fh * .62}" fill="${o.night ? (rng(r * 7 + c)() > .4 ? '#ffe2a0' : '#2a3048') : '#6f8aa2'}"/><rect x="${wx}" y="${wy}" width="${ww}" height="${fh * .2}" fill="#fff" opacity="${o.night ? 0 : .2}"/>`;
    if (r == 1 || r == 4) s += `<rect x="${x + 6}" y="${wy + fh * .62}" width="${w - 12}" height="4" fill="#2a2a2a"/>${[...Array(Math.floor(w / 12))].map((_, k) => `<line x1="${x + 8 + k * 12}" y1="${wy + fh * .62}" x2="${x + 8 + k * 12}" y2="${wy + fh * .78}" stroke="#2a2a2a" stroke-width="2"/>`).join('')}<rect x="${x + 6}" y="${wy + fh * .78}" width="${w - 12}" height="3" fill="#2a2a2a"/>`;
  }
  s += `<rect x="${x}" y="${base - 80}" width="${w}" height="80" fill="${o.shop || '#2f4a3a'}"/>${o.shopTxt ? `<text x="${x + w / 2}" y="${base - 54}" font-family="Fredoka" font-weight="600" font-size="22" text-anchor="middle" fill="#f4e6c0">${o.shopTxt}</text>` : ''}
  <rect x="${x + 14}" y="${base - 46}" width="${w - 28}" height="46" fill="${o.night ? '#ffe9b0' : '#c9dbe8'}" opacity=".85"/>
  <rect x="${x + w - 10}" y="${base - h}" width="10" height="${h}" fill="#000" opacity=".1"/>`;
  return s;
}
function lampPost(x, base, s = 1, lit = false) { return `<g transform="translate(${x},${base}) scale(${s})">${rShadow(0, 0, 22)}${lit ? `<circle cx="0" cy="-250" r="80" fill="url(#pLamp)"/>` : ''}<rect x="-5" y="-240" width="10" height="240" fill="#2c3a34"/><rect x="-14" y="-30" width="28" height="30" fill="#2c3a34"/><path d="M-20,-240 L20,-240 L14,-280 L-14,-280Z" fill="${lit ? '#fff0b0' : '#dfe6e2'}" stroke="#2c3a34" stroke-width="4"/><path d="M-24,-280 L24,-280 L0,-300Z" fill="#2c3a34"/></g>`; }
function bistroTable(x, base, s = 1) { return `<g transform="translate(${x},${base}) scale(${s})">${rShadow(0, 0, 40)}<ellipse cx="0" cy="-70" rx="40" ry="10" fill="#d9d9d4"/><rect x="-3" y="-70" width="6" height="70" fill="#333"/><path d="M-22,0 L22,0" stroke="#333" stroke-width="5"/>
  ${[-1, 1].map(d => `<g transform="translate(${d * 58},0)"><rect x="-18" y="-50" width="36" height="8" fill="#b8925a"/><path d="M-16,-50 L-16,-100 Q0,-110 16,-100 L16,-50" stroke="#a8824a" stroke-width="5" fill="none"/><path d="M-14,-42 L-16,0 M14,-42 L16,0" stroke="#333" stroke-width="4"/></g>`).join('')}</g>`; }
function seine(y0, t, h = 200) { let s = `<rect x="0" y="${y0}" width="${W}" height="${h}" fill="url(#pSeine)"/>`; for (let i = 0; i < 10; i++) s += `<path d="M${((i * 230 + t / L * 230) % (W + 200)) - 100},${y0 + 20 + (i % 4) * (h / 5)} q30,-8 60,0 t60,0" stroke="#cfe3ee" stroke-width="3" fill="none" opacity=".7"/>`; return s; }
function bateauMouche(x, y, s = 1) { return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-200,0 L200,0 L180,30 L-190,30Z" fill="#f4f4f0"/><rect x="-170" y="-40" width="330" height="40" rx="8" fill="#cfe6f2" stroke="#8aa8bc" stroke-width="3"/>${[...Array(9)].map((_, i) => `<line x1="${-150 + i * 36}" y1="-40" x2="${-150 + i * 36}" y2="0" stroke="#8aa8bc" stroke-width="2"/>`).join('')}<rect x="-200" y="20" width="400" height="8" fill="#2b3a67"/></g>`; }
function frFlag(x, y, s = 1) { return `<g transform="translate(${x},${y}) scale(${s})"><line x1="0" y1="0" x2="0" y2="120" stroke="#555" stroke-width="4"/><rect x="0" y="0" width="30" height="60" fill="#1f4fb8"/><rect x="30" y="0" width="30" height="60" fill="#fff"/><rect x="60" y="0" width="30" height="60" fill="#e8352a"/></g>`; }
function pCrowd(t, seed, n, y0, y1, o = {}) { return rCrowd(t, seed, n, y0, y1, Object.assign({ tops: ['#2b3a67', '#e8e2d4', '#8a3a3a', '#5a6a5a', '#c9a77a', '#333', '#4f7fe0', '#a0522d', '#f2c14e'] }, o)); }
function croissant(x, y, s = 1, r = 0) { return `<g transform="translate(${x},${y}) rotate(${r}) scale(${s})">${rShadow(0, 26, 90, .25)}
  <path d="M-110,10 Q-120,-20 -80,-30 Q-60,-70 0,-74 Q60,-70 80,-30 Q120,-20 110,10 Q60,30 0,26 Q-60,30 -110,10Z" fill="#d48a3a"/>
  ${[-60, -30, 0, 30, 60].map(k => `<path d="M${k},-70 Q${k * 1.3},-20 ${k * 1.1},24" stroke="#a8622a" stroke-width="5" fill="none"/>`).join('')}
  <path d="M-90,-30 Q0,-80 90,-30" stroke="#f2b46a" stroke-width="6" fill="none" opacity=".7"/></g>`; }
function baguette(x, y, s = 1, r = 0) { return `<g transform="translate(${x},${y}) rotate(${r}) scale(${s})"><rect x="-200" y="-22" width="400" height="44" rx="22" fill="#d9993f"/><rect x="-200" y="-22" width="400" height="14" rx="8" fill="#f0b45a" opacity=".6"/>${[-140, -70, 0, 70, 140].map(k => `<path d="M${k - 24},-10 Q${k},-22 ${k + 24},-4" stroke="#f6dca0" stroke-width="7" fill="none"/>`).join('')}</g>`; }

/* ---------- escenas ---------- */
scenes.p_intro = function (t) {
  let s = PDALL() + rSky('day') + rSun(1550, 170) + rClouds(t, [[300, 130, .8], [1200, 100, .6]]);
  for (let i = 0; i < 7; i++) s += haussmann(i * 280 - 30, 860, 270, 380 + (i % 2) * 40, { seed: i });
  s += eiffel(1500, 760, .95);
  s += `<rect x="0" y="850" width="${W}" height="230" fill="url(#rWalk)"/>` + pCrowd(t, 3, 10, 900, 1060);
  return s + `<g transform="translate(${W / 2},${H / 2 - 160})"><rect x="-560" y="-150" width="1120" height="300" rx="40" fill="#fff" opacity=".95" stroke="#2b3a67" stroke-width="6"/>
  <text x="0" y="-30" font-family="Fredoka" font-weight="700" font-size="104" text-anchor="middle" fill="#ffcc2e" stroke="#2b3a67" stroke-width="6" paint-order="stroke">Mi Pequeño Atlas</text>
  <rect x="-330" y="20" width="660" height="96" rx="22" fill="#1f4fb8"/><text x="0" y="88" font-family="Fredoka" font-weight="700" font-size="64" text-anchor="middle" fill="#fff">Capítulo 2: París</text></g>`;
};
scenes.p_luces = function (t) {
  let s = PDALL() + rSky('night') + rStars(t, 40);
  for (let i = 0; i < 7; i++) s += haussmann(i * 280 - 30, 820, 270, 360 + (i % 2) * 40, { night: true });
  s += eiffel(960, 760, 1.0, true, t) + seine(820, t, 260) + `<path d="M0,820 L${W},820" stroke="#2a2a3a" stroke-width="8"/>`;
  for (let i = 0; i < 8; i++) s += `<rect x="${i * 260 + 80}" y="840" width="40" height="200" fill="#ffd27a" opacity=".18" filter="url(#rBlurBig)"/>`;
  return s + lampPost(200, 840, 1.1, true) + lampPost(1720, 840, 1.1, true) + rLabel('Luces, arte y una torre de hierro', W / 2, 90, 40);
};
scenes.p_mapa = function (t) {
  let s = PDALL() + `<rect width="${W}" height="${H}" fill="#7fb6dc"/>`;
  s += `<path d="M180,140 Q420,90 640,150 Q880,110 1120,170 Q1400,140 1700,220 L1800,460 Q1700,640 1500,700 Q1300,820 1100,760 Q900,900 700,820 Q520,900 360,800 Q220,700 160,520Z" fill="#cfe2b8" stroke="#8aa87a" stroke-width="4"/>
  <path d="M600,420 L690,400 L760,410 L800,370 L860,360 L900,300 L960,290 L1010,330 L1080,350 L1150,400 L1180,440 L1150,520 L1120,560 L1160,620 L1180,690 L1120,720 L1040,740 L980,760 L940,800 L860,810 L780,790 L720,760 L740,680 L730,600 L700,540 L660,500 L600,470Z" fill="#9ed08a" stroke="#2b3a67" stroke-width="6" stroke-linejoin="round"/><path d="M1200,760 l20,-40 l14,50Z" fill="#9ed08a" stroke="#2b3a67" stroke-width="4"/>
  <text x="430" y="300" font-family="Fredoka" font-weight="700" font-size="54" fill="#5a7a4a" opacity=".7">EUROPA</text>`;
  const p = 1 + .15 * Math.max(0, S(t, 4));
  s += `<g transform="translate(925,400) scale(${p})"><circle r="24" fill="#e8352a" stroke="#fff" stroke-width="6"/><circle r="8" fill="#fff"/></g>` + rLabel('París', 1080, 380, 46, '#e8352a') + rLabel('Francia 🇫🇷', 900, 900, 46);
  return s + rLabel('París está en Europa, en Francia', W / 2, 1010, 38);
};
scenes.p_faroles = function (t) {
  let s = PDALL() + rSky('dusk') + rSun(1500, 420, 70);
  for (let i = 0; i < 7; i++) s += haussmann(i * 280 - 30, 640, 270, 330, { night: true });
  s += seine(640, t, 200);
  s += `<path d="M0,780 Q960,620 1920,780 L1920,880 L0,880Z" fill="#d9ccb0"/><path d="M0,780 Q960,620 1920,780" stroke="#b8a888" stroke-width="10" fill="none"/>`;
  for (let i = 0; i < 9; i++) { const k = i / 8, x = 60 + k * 1800, y = 780 - Math.sin(k * Math.PI) * 160 + 10; s += lampPost(x, y + 100, .9, true); }
  s += `<rect x="0" y="880" width="${W}" height="200" fill="url(#rWalk)"/>` + pCrowd(t, 7, 8, 900, 1060);
  return s + rLabel('La ciudad de la luz: faroles junto al Sena', W / 2, 90, 38);
};
scenes.p_turistas = function (t) {
  let s = PDALL() + rSky('day') + rSun(300, 150) + rClouds(t, [[900, 120, .7]]);
  s += `<rect x="0" y="560" width="${W}" height="200" fill="#9cc47e"/>` + eiffel(960, 700, .82);
  s += `<rect x="0" y="740" width="${W}" height="340" fill="#d9ccb0"/>${[...Array(12)].map((_, i) => `<line x1="${960 + (i - 6) * 70}" y1="740" x2="${960 + (i - 6) * 300}" y2="${H}" stroke="#c4b490" stroke-width="2"/>`).join('')}`;
  const cam = `<rect x="-2" y="-128" width="22" height="16" rx="3" fill="#222"/><circle cx="9" cy="-120" r="5" fill="#6fa8d8"/>`;
  s += pCrowd(t, 11, 22, 780, 1060, { umbrellas: false });
  s += rP(420, 1040, 2.0, t, { ph: 3, top: '#c94f6d', walk: false, hold: cam }) + rP(1500, 1050, 2.05, t, { ph: 5, top: '#2b3a67', walk: false, hold: cam, longhair: true });
  return s + rLabel('Visitantes de todo el mundo', W / 2, 90, 40);
};
scenes.p_cafe = function (t) {
  let s = PDALL() + rSky('day') + haussmann(0, 760, 980, 640, { shop: '#7a1f2a', shopTxt: 'CAFÉ DE LA PLACE' }) + haussmann(980, 760, 940, 620, { shop: '#2f4a3a', shopTxt: 'BOULANGERIE' });
  s += `<path d="M40,620 L940,620 L980,690 L0,690Z" fill="#7a1f2a"/>${[...Array(10)].map((_, i) => `<path d="M${i * 98},690 q49,26 98,0" fill="#7a1f2a"/>`).join('')}<text x="490" y="670" font-family="Fredoka" font-weight="600" font-size="34" text-anchor="middle" fill="#f4e6c0">CAFÉ · BRASSERIE</text>`;
  s += `<rect x="0" y="760" width="${W}" height="320" fill="url(#rWalk)"/>`;
  [[230, 900], [520, 910], [800, 900], [330, 1040], [700, 1050]].forEach(([x, y]) => s += bistroTable(x, y, 1.0 + (y - 900) / 600));
  s += rP(172, 900, 1.25, t, { ph: 1, top: '#2b3a67', walk: false }) + rP(462, 910, 1.25, t, { ph: 2, top: '#c94f6d', walk: false, longhair: true }) + rP(858, 900, 1.25, t, { ph: 4, top: '#e8e2d4', walk: false });
  s += `<g transform="translate(520,838)"><rect x="-8" y="-12" width="16" height="12" fill="#fff"/><rect x="10" y="-14" width="14" height="14" fill="#fff"/></g>` + lampPost(1100, 1000, 1.1) + pCrowd(t, 19, 8, 790, 870);
  return s + rLabel('Calles de cuento y cafés pequeñitos', W / 2, 90, 40);
};
scenes.p_opera = function (t) {
  let s = PDALL() + rSky('day') + rClouds(t, [[300, 120, .7], [1500, 100, .6]]);
  s += `<g transform="translate(960,820)"><rect x="-600" y="-420" width="1200" height="420" fill="url(#pStone)"/>
  ${[...Array(7)].map((_, i) => `<rect x="${-540 + i * 160}" y="-380" width="110" height="200" rx="55" fill="#4a5664"/><rect x="${-500 + i * 160}" y="-380" width="30" height="380" fill="#e6d8b8"/>`).join('')}
  ${[...Array(16)].map((_, i) => `<rect x="${-560 + i * 74}" y="-170" width="22" height="170" fill="#e6d8b8"/>`).join('')}
  <rect x="-620" y="-440" width="1240" height="30" fill="#c9a24a"/><path d="M-260,-440 Q0,-600 260,-440Z" fill="#6f9a86"/><rect x="-20" y="-640" width="40" height="80" fill="#c9a24a"/>
  ${[-560, 560].map(x => `<g transform="translate(${x},-470)"><circle r="40" fill="#c9a24a"/><path d="M-30,0 Q0,-90 30,0" fill="#c9a24a"/></g>`).join('')}
  <text x="0" y="-410" font-family="Fredoka" font-weight="700" font-size="40" text-anchor="middle" fill="#7a5a1a" letter-spacing="10">ACADÉMIE NATIONALE DE MUSIQUE</text></g>
  <rect x="0" y="820" width="${W}" height="260" fill="url(#rWalk)"/>`;
  return s + pCrowd(t, 23, 14, 850, 1060) + rLabel('Ópera Garnier: música y baile', W / 2, 90, 40);
};
scenes.p_seine = function (t) {
  let s = PDALL() + rSky('day') + rSun(1600, 150) + rClouds(t, [[300, 120, .7]]);
  for (let i = 0; i < 7; i++) s += haussmann(i * 280 - 30, 620, 270, 300);
  s += `<g transform="translate(1400,620) scale(.55)"><rect x="-220" y="-560" width="160" height="560" fill="#d9ccb0"/><rect x="60" y="-560" width="160" height="560" fill="#d9ccb0"/><rect x="-220" y="-300" width="440" height="300" fill="#d9ccb0"/><circle cx="0" cy="-220" r="60" fill="#6f8aa2" stroke="#b8a888" stroke-width="10"/></g>`;
  s += seine(620, t, 260) + `<path d="M200,620 Q560,520 920,620" stroke="#d9ccb0" stroke-width="40" fill="none"/><path d="M200,620 Q560,520 920,620 L920,660 L200,660Z" fill="#d9ccb0" opacity=".9"/>${[0, 1, 2].map(i => `<path d="M${260 + i * 220},660 q90,-80 180,0" fill="#3f6f8a" stroke="#c4b490" stroke-width="6"/>`).join('')}`;
  s += bateauMouche(((t / L) * (W + 500)) - 250, 790, 1.0) + `<rect x="0" y="880" width="${W}" height="200" fill="#c9bfa6"/>`;
  s += rP(700, 1040, 1.9, t, { ph: 1, top: '#2b3a67', bot: '#3a3a3a', dir: 1 }) + rP(820, 1050, 1.95, t, { ph: 2, top: '#c94f6d', longhair: true, dir: 1 }) + rP(940, 1050, 1.4, t, { ph: 3, child: true, top: '#f2c14e', dir: 1 });
  return s + rLabel('Más de 2.000 años de historia junto al Sena', W / 2, 90, 38);
};
scenes.p_boulangerie = function (t) {
  let s = PDALL() + rSky('day') + haussmann(0, 760, W, 640, { shop: '#2f4a3a', shopTxt: '' });
  s += `<rect x="260" y="560" width="1400" height="200" fill="#2f4a3a"/><text x="960" y="620" font-family="Fredoka" font-weight="700" font-size="58" text-anchor="middle" fill="#e8c96a" letter-spacing="6">BOULANGERIE · PÂTISSERIE</text>
  <rect x="300" y="640" width="600" height="120" fill="#fff3d0"/><rect x="1020" y="640" width="600" height="120" fill="#fff3d0"/>
  ${[...Array(6)].map((_, i) => croissant(360 + i * 95, 730, .35)).join('')}${[...Array(4)].map((_, i) => baguette(1320, 670 + i * 22, .7, -4)).join('')}
  <rect x="0" y="760" width="${W}" height="320" fill="url(#rWalk)"/>`;
  return s + pCrowd(t, 29, 10, 790, 1060) + rLabel('Panadería francesa', W / 2, 90, 40);
};
scenes.p_croissant = function (t) {
  let s = PDALL() + `<rect width="${W}" height="${H}" fill="#f2e6d2"/><rect x="0" y="600" width="${W}" height="480" fill="url(#rCounter)"/>`;
  s += `<ellipse cx="760" cy="780" rx="420" ry="90" fill="#fbfbf7"/>` + croissant(700, 720, 2.6, -6);
  s += `<g transform="translate(1340,760)">${rShadow(0, 30, 160)}<path d="M-150,-20 Q-170,-90 -100,-110 Q0,-140 100,-110 Q170,-90 150,-20 Q0,20 -150,-20Z" fill="#d48a3a"/><path d="M-130,-30 Q0,-10 130,-30 Q100,-80 0,-90 Q-100,-80 -130,-30Z" fill="#fff4dc"/>${[...Array(8)].map((_, i) => `<path d="M${-100 + i * 28},-40 q8,-20 16,0" stroke="#efd8a8" stroke-width="4" fill="none"/>`).join('')}</g>`;
  s += rArrowLabel('Crujiente por fuera', 330, 360, 640, 650, 30) + rArrowLabel('Suave como una nube', 1560, 380, 1340, 700, 30) + rArrowLabel('Forma de media luna', 330, 960, 520, 760, 30);
  return s + rLabel('Croissant 🥐 harina · mantequilla · levadura', W / 2, 90, 38);
};

scenes.p_desayuno = function (t) {
  let s = PDALL() + `<rect width="${W}" height="${H}" fill="#f6efe2"/><rect x="1300" y="80" width="520" height="440" fill="url(#rSkyDay)" stroke="#8a6a46" stroke-width="16"/>${eiffel(1560, 520, .42)}<line x1="1560" y1="80" x2="1560" y2="520" stroke="#8a6a46" stroke-width="10"/>
  <rect x="0" y="560" width="${W}" height="520" fill="#e9dcc4"/>${[...Array(10)].map((_, i) => `<rect x="${i * 200}" y="560" width="100" height="520" fill="#f2e8d6" opacity=".7"/>`).join('')}`;
  s += `<ellipse cx="560" cy="800" rx="300" ry="70" fill="#fbfbf7"/>` + croissant(560, 760, 1.6, 4);
  s += `<g transform="translate(1100,780)">${rShadow(0, 60, 110)}<path d="M-80,-60 L80,-60 L66,60 L-66,60Z" fill="#fbfbf7"/><ellipse cx="0" cy="-60" rx="80" ry="22" fill="#6a3a1e"/><path d="M80,-30 q50,0 40,40 q-10,30 -46,22" stroke="#fbfbf7" stroke-width="16" fill="none"/>${[0, 1, 2].map(i => { const o = ((t / L * 2 + i / 3) % 1); return `<path d="M${-30 + i * 30},${-90 - o * 120} q-14,-24 0,-48 q14,-24 0,-48" stroke="#fff" stroke-width="10" fill="none" opacity="${.5 * (1 - o)}"/>`; }).join('')}</g>
  <g transform="translate(1450,820)">${rShadow(0, 40, 70)}<rect x="-55" y="-90" width="110" height="130" rx="14" fill="#c8323a" opacity=".85"/><rect x="-60" y="-110" width="120" height="30" rx="8" fill="#f4f0e6"/><rect x="-60" y="-110" width="120" height="30" rx="8" fill="url(#dots)"/></g>`;
  return s + rArrowLabel('Chocolate caliente', 1000, 520, 1100, 720, 30) + rArrowLabel('Mermelada', 1500, 1000, 1450, 800, 30) + rLabel('Desayuno francés', W / 2, 90, 40);
};
scenes.p_quesos = function (t) {
  let s = PDALL() + `<rect width="${W}" height="${H}" fill="#efe6d2"/><rect x="0" y="0" width="${W}" height="120" fill="#2f4a3a"/><text x="960" y="85" font-family="Fredoka" font-weight="700" font-size="60" text-anchor="middle" fill="#e8c96a" letter-spacing="8">FROMAGERIE</text>`;
  for (let r = 0; r < 2; r++) s += `<rect x="80" y="${200 + r * 180}" width="1760" height="14" fill="#8a6a46"/>` + [...Array(10)].map((_, i) => `<g transform="translate(${160 + i * 172},${200 + r * 180})"><ellipse cx="0" cy="-30" rx="60" ry="26" fill="${['#f2d98a', '#efe2b8', '#e8b84a', '#f4ecd0'][(i + r) % 4]}"/><rect x="-60" y="-30" width="120" height="30" fill="${['#e6c66a', '#e2d2a0', '#d49a2a', '#e6dcc0'][(i + r) % 4]}"/></g>`).join('');
  s += `<rect x="0" y="600" width="${W}" height="480" fill="url(#rCounter)"/>`;
  const wheel = (x, y, top, side, inner, label, extra = '') => `<g transform="translate(${x},${y})">${rShadow(0, 60, 200, .3)}<path d="M-200,0 L-200,60 Q0,110 200,60 L200,0Z" fill="${side}"/><ellipse cx="0" cy="0" rx="200" ry="56" fill="${top}"/><path d="M0,0 L200,0 L200,60 Q100,90 0,80Z" fill="${inner}"/>${extra}</g>${rLabel(label, x, y + 170, 36)}`;
  s += wheel(420, 760, '#f7f2e4', '#efe6d0', '#fbf3c8', 'Brie: suave y cremoso')
    + wheel(960, 760, '#f4efe0', '#e8dcc0', '#fbefc0', 'Camembert: huele fuerte')
    + wheel(1500, 760, '#e9e6dc', '#d8d2c0', '#f2efe4', 'Roquefort: queso azul', [...Array(14)].map((_, i) => `<circle cx="${30 + (i * 37) % 160}" cy="${10 + (i * 23) % 60}" r="7" fill="#4a6a8a"/>`).join(''));
  return s;
};
scenes.p_baguette = function (t) {
  let s = PDALL() + rSky('day') + haussmann(0, 700, 960, 600, { shop: '#2f4a3a', shopTxt: 'BOULANGERIE' }) + haussmann(960, 700, 960, 560, {});
  s += `<rect x="0" y="700" width="${W}" height="380" fill="url(#rWalk)"/>`;
  const bag = `<g transform="translate(4,-92) rotate(-14)"><rect x="-48" y="-6" width="96" height="12" rx="6" fill="#d9993f"/><rect x="-48" y="-6" width="96" height="4" rx="2" fill="#f0b45a"/></g>`;
  const x = ((t / L) * (W + 300)) - 150;
  s += rP(x, 1040, 2.2, t, { ph: 1, top: '#2b3a67', bot: '#3a3a3a', hold: bag }) + rP(W - x, 1000, 1.9, t, { ph: 2, top: '#c94f6d', longhair: true, dir: -1, hold: bag });
  s += `<rect x="120" y="560" width="720" height="120" fill="#fff3d0"/>${[0, 1, 2, 3].map(i => baguette(480, 590 + i * 24, .8, -2)).join('')}`;
  return s + pCrowd(t, 37, 6, 730, 820) + rLabel('Baguette: larga, crujiente y recién hecha', W / 2, 90, 38);
};
scenes.p_crepes = function (t) {
  let s = PDALL() + rSky('day') + haussmann(0, 640, W, 560, {});
  s += `<g transform="translate(960,680)"><rect x="-460" y="-260" width="920" height="40" fill="#1f4fb8"/>${[...Array(8)].map((_, k) => `<path d="M${-460 + k * 115},-220 h115 v60 q-57,20 -115,0Z" fill="${k % 2 ? '#fff' : '#1f4fb8'}"/>`).join('')}
  <text x="0" y="-232" font-family="Fredoka" font-weight="700" font-size="32" text-anchor="middle" fill="#fff">CRÊPES · GALETTES</text><rect x="-440" y="-160" width="880" height="400" fill="#f4ecd8"/><rect x="-460" y="40" width="920" height="40" fill="#8a5a36"/></g>
  <rect x="0" y="760" width="${W}" height="320" fill="url(#rWalk)"/>`;
  s += rP(960, 720, 1.6, t, { ph: 2, top: '#f4f4f4', walk: false });
  s += `<g transform="translate(960,700)"><ellipse rx="150" ry="30" fill="#2a2a2a"/><ellipse rx="130" ry="22" fill="#f2c86a"/><ellipse rx="110" ry="16" fill="#e8b45a" opacity="${.5 + .5 * Math.abs(S(t, 2))}"/></g>`;
  s += `<g transform="translate(420,950)">${rShadow(0, 20, 140)}<ellipse rx="150" ry="36" fill="#fbfbf7"/><path d="M-110,-6 Q0,-50 110,-6 Q0,20 -110,-6Z" fill="#e8b45a"/><path d="M-60,-16 q60,-20 120,0" stroke="#6a3a1e" stroke-width="10" fill="none"/></g>${rLabel('Dulce: chocolate', 420, 1050, 32)}
  <g transform="translate(1500,950)">${rShadow(0, 20, 140)}<ellipse rx="150" ry="36" fill="#fbfbf7"/><path d="M-100,-10 L100,-10 L60,-50 L-60,-50Z" fill="#c9883a"/><ellipse cx="0" cy="-30" rx="26" ry="18" fill="#fff"/><ellipse cx="0" cy="-30" rx="12" ry="9" fill="#f6a623"/></g>${rLabel('Salada: huevo y queso', 1500, 1050, 32)}`;
  return s + rLabel('Crepes: como panqueques muy finitos', W / 2, 90, 38);
};
scenes.p_ratatouille = function (t) {
  let s = PDALL() + `<rect width="${W}" height="${H}" fill="#f2e9d8"/><rect x="0" y="560" width="${W}" height="520" fill="url(#rCounter)"/>`;
  const R = rng(4); let disk = '';
  for (let ring = 0; ring < 4; ring++) for (let i = 0; i < 14 + ring * 6; i++) { const a = i / (14 + ring * 6) * TAU, r = 60 + ring * 70; disk += `<ellipse cx="${Math.cos(a) * r * 1.6}" cy="${Math.sin(a) * r * .55}" rx="40" ry="16" fill="${['#d9343a', '#5aa63a', '#6a3a7a', '#f2c14e'][(i + ring) % 4]}" stroke="#0002" stroke-width="2" transform="rotate(${a * 57.3} ${Math.cos(a) * r * 1.6} ${Math.sin(a) * r * .55})"/>`; }
  s += `<g transform="translate(960,760)">${rShadow(0, 110, 560, .3)}<ellipse rx="560" ry="200" fill="#e8e4dc"/><ellipse rx="520" ry="176" fill="#c8562a"/>${disk}</g>`;
  const veg = (x, label, svg) => `<g transform="translate(${x},420)">${rShadow(0, 60, 80)}${svg}</g>${rLabel(label, x, 520, 30)}`;
  s += veg(300, 'Tomate', `<circle cx="0" cy="0" r="56" fill="#d9343a"/><path d="M-14,-56 l14,10 l14,-10" stroke="#3a8a2a" stroke-width="7" fill="none"/>`)
    + veg(760, 'Calabacín', `<rect x="-110" y="-26" width="220" height="52" rx="26" fill="#3f8a3a"/>`)
    + veg(1180, 'Berenjena', `<ellipse cx="0" cy="0" rx="100" ry="44" fill="#5a2a6a"/><path d="M-100,0 l-24,-16 l0,32Z" fill="#3a8a2a"/>`)
    + veg(1620, 'Pimiento', `<path d="M-50,-50 Q0,-70 50,-50 Q70,20 30,60 Q0,70 -30,60 Q-70,20 -50,-50Z" fill="#f2a23a"/><rect x="-6" y="-80" width="12" height="30" fill="#3a8a2a"/>`);
  return s + rLabel('Ratatouille: verduras de colores, como un arcoíris', W / 2, 90, 36);
};
scenes.p_creme = function (t) {
  let s = PDALL() + `<rect width="${W}" height="${H}" fill="#f2e9d8"/><rect x="0" y="560" width="${W}" height="520" fill="url(#rCounter)"/>`;
  const crack = (t % L) / L > .4;
  s += `<g transform="translate(960,740)">${rShadow(0, 110, 360, .3)}<path d="M-340,0 L-310,110 Q0,140 310,110 L340,0Z" fill="#fbfbf7"/>${[...Array(14)].map((_, i) => `<line x1="${-320 + i * 50}" y1="10" x2="${-300 + i * 47}" y2="110" stroke="#e6e2d8" stroke-width="10"/>`).join('')}
  <ellipse rx="340" ry="80" fill="#fbfbf7"/><ellipse rx="310" ry="66" fill="#c97a2a"/><ellipse cx="-40" cy="-10" rx="200" ry="34" fill="#e09a4a" opacity=".7"/>
  ${crack ? `<path d="M-60,-10 l40,-20 l30,26 l40,-30 l40,24" stroke="#5a2a0a" stroke-width="6" fill="none"/><ellipse cx="0" cy="0" rx="70" ry="18" fill="#fff4c8"/>` : ''}
  <g transform="translate(${crack ? 40 : 120},${crack ? -60 : -180}) rotate(-35)"><rect x="-8" y="-260" width="16" height="240" rx="8" fill="#c9ced5"/><ellipse cx="0" cy="-10" rx="30" ry="40" fill="#c9ced5"/></g></g>`;
  return s + rArrowLabel('Capa de azúcar quemada', 330, 380, 820, 720, 30) + rArrowLabel('Crema dulce y suave', 1560, 980, 980, 740, 30) + rLabel('Crème brûlée: ¡crac! con la cuchara', W / 2, 90, 38);
};
scenes.p_sopa = function (t) {
  let s = PDALL() + `<rect width="${W}" height="${H}" fill="#3a2a22"/><rect x="0" y="560" width="${W}" height="520" fill="url(#rWood)"/>`;
  s += `<g transform="translate(960,720)">${rShadow(0, 150, 340, .4)}<path d="M-300,0 Q-290,170 0,180 Q290,170 300,0Z" fill="#7a4a2a"/><path d="M-300,0 Q0,40 300,0" stroke="#5a3a1e" stroke-width="8" fill="none"/><ellipse rx="300" ry="80" fill="#5a3a1e"/><ellipse rx="270" ry="64" fill="#b8742a"/>
  <path d="M-200,-10 Q-100,-60 0,-40 Q120,-70 210,-14 Q100,30 0,20 Q-120,34 -200,-10Z" fill="#f2c86a"/><path d="M-150,-20 Q0,-50 150,-20" stroke="#d99a3a" stroke-width="10" fill="none"/>
  <path d="M300,-10 q90,0 90,60 q0,40 -70,40" stroke="#7a4a2a" stroke-width="22" fill="none"/></g>`;
  for (let i = 0; i < 4; i++) { const o = ((t / L * 2 + i / 4) % 1); s += `<path d="M${800 + i * 100},${600 - o * 220} q-30,-40 0,-80 q30,-40 0,-80" stroke="#fff" stroke-width="18" fill="none" stroke-linecap="round" opacity="${.4 * (1 - o)}"/>`; }
  return s + rArrowLabel('Pan y queso gratinado', 330, 360, 860, 700, 30) + rLabel('Sopa de cebolla', W / 2, 90, 44);
};
scenes.p_mesa = function (t) {
  let s = PDALL() + `<rect width="${W}" height="${H}" fill="#f2e6d2"/><rect x="1320" y="80" width="480" height="420" fill="url(#rSkyDay)" stroke="#8a6a46" stroke-width="16"/>${eiffel(1560, 500, .4)}`;
  s += `<rect x="200" y="660" width="1520" height="60" fill="#fbfbf7"/><rect x="200" y="720" width="1520" height="40" fill="#e6e2d8"/><rect x="0" y="760" width="${W}" height="320" fill="#c9a06a"/>`;
  const seat = (x, o) => rP(x, 700, 1.8, t, Object.assign({ walk: false }, o));
  s += seat(360, { ph: 1, top: '#2b3a67' }) + seat(620, { ph: 2, top: '#c94f6d', longhair: true }) + seat(1300, { ph: 3, child: true, top: '#f2c14e' }) + seat(1560, { ph: 4, top: '#7a8f6a' });
  s += `${[480, 800, 1120, 1440].map(x => `<ellipse cx="${x}" cy="670" rx="80" ry="16" fill="#fbfbf7" stroke="#ddd" stroke-width="2"/><ellipse cx="${x}" cy="664" rx="50" ry="9" fill="#c8562a"/>`).join('')}${baguette(960, 650, .5)}`;
  return s + rLabel('Comer sin prisa, conversando', W / 2, 1010, 40);
};
scenes.p_palabras = function (t) {
  let s = PDALL() + rSky('day') + haussmann(0, 700, W, 600, { shop: '#2f4a3a', shopTxt: 'BOULANGERIE · PÂTISSERIE' });
  s += `<rect x="0" y="700" width="${W}" height="380" fill="url(#rWalk)"/>`;
  s += rP(620, 1030, 2.1, t, { ph: 1, top: '#f4f4f4', bot: '#2b2f3a', walk: false, wave: true }) + rP(1300, 1040, 1.7, t, { ph: 3, child: true, top: '#f2c14e', walk: false, dir: -1 });
  const words = [['Bonjour', 'Hola'], ['Merci', 'Gracias'], ["S'il vous plaît", 'Por favor'], ['Au revoir', 'Adiós'], ['Oui', 'Sí'], ['Non', 'No']];
  words.forEach(([fr, es], i) => { const x = 230 + (i % 3) * 730 * .0 + (i % 3) * 0; });
  s += `<g>${words.map(([fr, es], i) => { const x = 360 + (i % 3) * 600, y = 220 + Math.floor(i / 3) * 190; return `<g transform="translate(${x},${y})"><rect x="-250" y="-70" width="500" height="140" rx="32" fill="#fff" stroke="#1f4fb8" stroke-width="6"/><text x="0" y="-6" font-family="Fredoka" font-weight="700" font-size="54" text-anchor="middle" fill="#1f4fb8">${fr}</text><text x="0" y="46" font-family="Fredoka" font-weight="600" font-size="38" text-anchor="middle" fill="#e8352a">${es}</text></g>`; }).join('')}</g>`;
  return s;
};

scenes.p_idioma = function (t) {
  let s = PDALL() + `<rect width="${W}" height="${H}" fill="#f2ecdf"/><rect x="0" y="820" width="${W}" height="260" fill="#c9a06a"/>`;
  s += `<rect x="260" y="100" width="1400" height="600" fill="#2e5e4e" stroke="#8a6a46" stroke-width="22"/><rect x="260" y="690" width="1400" height="24" fill="#8a6a46"/>
  <text x="960" y="330" font-family="Fredoka" font-weight="700" font-size="150" text-anchor="middle" fill="#fafaf0">Le français</text>
  <text x="960" y="470" font-family="Fredoka" font-weight="600" font-size="64" text-anchor="middle" fill="#ffe14f">El idioma francés ♪</text>
  ${[...Array(5)].map((_, i) => `<text x="${420 + i * 260}" y="${600 + S(t, 2, i) * 16}" font-family="Fredoka" font-size="60" fill="#cfe6ff" opacity=".8">♪</text>`).join('')}` + frFlag(1700, 360, 1.6);
  return s + rP(1650, 1040, 1.9, t, { ph: 1, top: '#2b3a67', bot: '#3a3a3a', walk: false, longhair: true });
};
scenes.p_moda = function (t) {
  let s = PDALL() + rSky('day') + haussmann(0, 700, 960, 600, { shop: '#1d1d22', shopTxt: 'BOUTIQUE' }) + haussmann(960, 700, 960, 620, { shop: '#7a1f2a', shopTxt: 'MODE' });
  s += `<rect x="60" y="560" width="760" height="140" fill="#f4ecd8"/>${[0, 1, 2, 3].map(i => `<g transform="translate(${160 + i * 180},690)"><rect x="-4" y="-120" width="8" height="120" fill="#888"/><path d="M-50,-110 L50,-110 L60,-10 L-60,-10Z" fill="${['#c9b48a', '#2b3a67', '#8a3a3a', '#e8e2d4'][i]}"/></g>`).join('')}
  <rect x="0" y="700" width="${W}" height="380" fill="url(#rWalk)"/>`;
  const coat = (x, y, s_, o) => rP(x, y, s_, t, Object.assign({ bot: '#2a2a2a', skirt: 0 }, o));
  s += coat(((t / L) * (W + 300)) - 150, 1040, 2.1, { ph: 1, top: '#c9b48a', longhair: true }) + coat(W - ((t / L) * (W + 300)) + 150, 1010, 2.0, { ph: 2, top: '#2b3a67', dir: -1 })
    + coat(((t / L + .5) % 1) * (W + 300) - 150, 960, 1.7, { ph: 3, top: '#8a3a3a', cap: '#c8323a' }) + pCrowd(t, 41, 8, 730, 820);
  return s + rLabel('Elegancia sencilla: abrigos, bufandas y botas', W / 2, 90, 36);
};
scenes.p_metro = function (t) {
  let s = PDALL() + rSky('day') + haussmann(0, 640, W, 560, {});
  s += `<rect x="0" y="640" width="${W}" height="440" fill="url(#rWalk)"/>`;
  s += `<g transform="translate(960,900)"><path d="M-420,0 L-420,-30 L420,-30 L420,0Z" fill="#4a5a4a"/><path d="M-380,-30 L380,-30 L320,140 L-320,140Z" fill="#2a2a2a"/>
  ${[-1, 1].map(d => `<path d="M${d * 400},-30 Q${d * 410},-200 ${d * 330},-360 Q${d * 300},-410 ${d * 250},-420" stroke="#3a6a52" stroke-width="22" fill="none"/><ellipse cx="${d * 240}" cy="-430" rx="26" ry="40" fill="#f2a23a" stroke="#3a6a52" stroke-width="8"/>`).join('')}
  <path d="M-330,-330 Q0,-360 330,-330 L330,-260 Q0,-290 -330,-260Z" fill="#e8d8a8" stroke="#3a6a52" stroke-width="10"/>
  <text x="0" y="-290" font-family="Fredoka" font-weight="600" font-size="58" text-anchor="middle" fill="#3a6a52" letter-spacing="4">MÉTROPOLITAIN</text>
  ${[...Array(16)].map((_, i) => `<line x1="${-400 + i * 53}" y1="-30" x2="${-400 + i * 53}" y2="-200" stroke="#3a6a52" stroke-width="6"/>`).join('')}<path d="M-400,-200 L400,-200" stroke="#3a6a52" stroke-width="8"/></g>`;
  s += rP(560, 1030, 1.6, t, { ph: 1, child: true, top: '#2b3a67', bag: '#c8323a' }) + rP(680, 1040, 2.0, t, { ph: 2, top: '#c9b48a', longhair: true }) + rP(1360, 1030, 1.6, t, { ph: 3, child: true, top: '#f2c14e', bag: '#2b3a67', dir: -1 });
  return s + rLabel('En metro a la escuela', W / 2, 90, 40);
};
scenes.p_ninos = function (t) {
  let s = PDALL() + rSky('day') + rClouds(t, [[400, 110, .7]]) + `<rect x="0" y="560" width="${W}" height="520" fill="#9cc47e"/><path d="M0,700 Q960,640 1920,700 L1920,1080 L0,1080Z" fill="#d9ccb0"/>`;
  for (let i = 0; i < 6; i++) s += rTree(120 + i * 340, 640, .75, 'green', t, 200 + i);
  s += `<g transform="translate(1400,900)">${rShadow(0, 0, 160)}<path d="M-140,0 L-100,-200 M140,0 L100,-200 M-110,-200 L110,-200" stroke="#c8323a" stroke-width="10"/><line x1="-40" y1="-200" x2="-40" y2="-80" stroke="#555" stroke-width="3"/><line x1="10" y1="-200" x2="10" y2="-80" stroke="#555" stroke-width="3"/><rect x="-50" y="-84" width="70" height="10" fill="#2b3a67"/></g>`;
  s += rP(1385, 820, 1.4, t, { ph: 1, child: true, top: '#f2c14e', walk: false }) + rP(600, 1010, 1.7, t, { ph: 2, child: true, top: '#c8323a' }) + rP(760, 1000, 1.7, t, { ph: 3, child: true, top: '#4f7fe0', longhair: true }) + rP(300, 960, 1.6, t, { ph: 4, child: true, top: '#7ed957', walk: false, hold: `<rect x="-14" y="-104" width="34" height="26" fill="#fff" stroke="#888" stroke-width="2"/>` });
  return s + rLabel('Niños parisinos: dibujar, leer y jugar en el parque', W / 2, 90, 36);
};
scenes.p_merienda = function (t) {
  let s = PDALL() + `<rect width="${W}" height="${H}" fill="#e9eef2"/><rect x="0" y="600" width="${W}" height="480" fill="url(#rCounter)"/>`;
  s += `<g transform="translate(960,820)">${rShadow(0, 60, 560, .25)}<rect x="-560" y="-80" width="1120" height="140" rx="24" fill="#4f7fe0"/><rect x="-540" y="-70" width="1080" height="110" rx="18" fill="#dfe9f6"/></g>`;
  s += baguette(560, 780, .7, -6) + `<g transform="translate(860,770)"><circle r="46" fill="#d9343a"/><path d="M0,-46 l6,-20" stroke="#5a3a1e" stroke-width="6"/><ellipse cx="18" cy="-60" rx="18" ry="8" fill="#3a8a2a"/></g>
  <g transform="translate(1080,780)"><path d="M-70,30 L70,30 L70,-30 L-40,-50Z" fill="#f2d98a"/><circle cx="-10" cy="0" r="8" fill="#e8c86a"/><circle cx="30" cy="10" r="6" fill="#e8c86a"/></g>
  <g transform="translate(1320,760)"><path d="M-46,-50 L46,-50 L40,40 L-40,40Z" fill="#fbfbf7" stroke="#ccc" stroke-width="3"/><rect x="-50" y="-60" width="100" height="16" fill="#f2a9c0"/></g>`;
  return s + rArrowLabel('Pan', 420, 520, 520, 770, 30) + rArrowLabel('Fruta', 860, 520, 860, 740, 30) + rArrowLabel('Queso', 1120, 1000, 1080, 790, 30) + rArrowLabel('Yogur', 1500, 520, 1320, 730, 30) + rLabel('La merienda', W / 2, 90, 44);
};
scenes.p_tomas = function (t) {
  let s = PDALL() + rSky('day') + rSun(1650, 140) + rClouds(t, [[300, 120, .7]]) + `<rect x="0" y="600" width="${W}" height="480" fill="#8fb36a"/><path d="M760,600 L1160,600 L1500,1080 L420,1080Z" fill="#d9ccb0"/>` + eiffel(960, 640, .7);
  s += `<g transform="translate(560,980)">${rShadow(0, 0, 140)}<rect x="-130" y="-60" width="260" height="14" fill="#2f6a3a"/><rect x="-130" y="-120" width="260" height="12" fill="#2f6a3a"/><rect x="-120" y="-46" width="10" height="46" fill="#333"/><rect x="110" y="-46" width="10" height="46" fill="#333"/></g>`;
  const pad = `<g transform="translate(18,-110) rotate(-10)"><rect x="-6" y="-30" width="60" height="44" fill="#fff" stroke="#888" stroke-width="2"/><path d="M14,8 L24,-22 L34,8 M18,-4 L30,-4" stroke="#7a5a3e" stroke-width="2" fill="none"/></g>`;
  s += rP(520, 920, 1.7, t, { ph: 1, child: true, top: '#4f7fe0', walk: false, hold: pad });
  return s + rLabel('Tomás dibuja la torre Eiffel', W / 2, 90, 40);
};
scenes.p_amigos = function (t) {
  let s = PDALL() + rSky('day') + `<rect x="0" y="600" width="${W}" height="480" fill="#8fb36a"/>` + eiffel(1550, 640, .55) + rTree(250, 700, .9, 'green', t, 7);
  const pad = c => `<g transform="translate(18,-110)"><rect x="-6" y="-30" width="60" height="44" fill="#fff" stroke="#888" stroke-width="2"/><circle cx="24" cy="-8" r="10" fill="${c}"/></g>`;
  s += rP(780, 1000, 2.0, t, { ph: 1, child: true, top: '#4f7fe0', walk: false, hold: pad('#f2c14e') }) + rP(1100, 1000, 2.0, t, { ph: 2, child: true, top: '#c8323a', longhair: true, walk: false, dir: -1, hold: pad('#7ed957') });
  s += `<g transform="translate(940,560)">${[0, 1, 2].map(i => `<path transform="translate(${-80 + i * 80},${S(t, 2, i) * 10}) scale(1.4)" d="M0,8 C-14,-6 -10,-20 0,-12 C10,-20 14,-6 0,8Z" fill="#e8352a"/>`).join('')}</g>`;
  return s + rLabel('Sin hablar el mismo idioma: dibujos y sonrisas', W / 2, 90, 36);
};
scenes.p_postales = function (t) {
  const card = (i, name, label) => `<g transform="translate(${70 + i * 455},300) rotate(${(i - 1.5) * 2})"><rect x="-4" y="-2" width="430" height="360" fill="#000" opacity=".25"/><rect x="-12" y="-12" width="430" height="360" fill="#fff"/><circle cx="203" cy="-4" r="12" fill="#e8352a"/>
  <svg x="0" y="0" width="406" height="228" viewBox="0 0 1920 1080">${scenes[name](t)}</svg><text x="203" y="300" font-family="Fredoka" font-weight="700" font-size="40" text-anchor="middle" fill="#2b3a67">${label}</text></g>`;
  return PDALL() + `<rect width="${W}" height="${H}" fill="#b9895a"/><rect x="30" y="30" width="${W - 60}" height="${H - 60}" fill="none" stroke="#7a5232" stroke-width="30"/>` + rLabel('4 lugares que visitar en familia', W / 2, 160, 44)
    + card(0, 'p_eiffel', 'Torre Eiffel') + card(1, 'p_louvre', 'Museo del Louvre') + card(2, 'p_notredame', 'Notre-Dame') + card(3, 'p_luxemburgo', 'Jardines de Luxemburgo');
};
scenes.p_eiffel = function (t) {
  let s = PDALL() + rSky('day') + rSun(1600, 160) + rClouds(t, [[300, 120, .8], [1300, 90, .6]]) + `<rect x="0" y="880" width="${W}" height="200" fill="#9cc47e"/>`;
  for (let i = 0; i < 4; i++) s += rTree(100 + i * 160, 900, .6, 'green', t, 300 + i) + rTree(1820 - i * 160, 900, .6, 'green', t, 310 + i);
  s += eiffel(960, 900, 1.12) + `<rect x="0" y="960" width="${W}" height="120" fill="#d9ccb0"/>` + pCrowd(t, 51, 12, 980, 1070);
  return s + rLabel('Torre Eiffel · 330 metros de hierro', 400, 90, 38);
};
scenes.p_1889 = function (t) {
  let s = PDALL() + `<rect width="${W}" height="${H}" fill="#e8dcc0"/>` + `<g opacity=".9">` + rSky('day') + `</g><rect width="${W}" height="${H}" fill="#c9a77a" opacity=".35"/>`;
  s += eiffel(960, 860, .95) + `${[...Array(10)].map((_, i) => `<g transform="translate(${80 + i * 190},860)"><rect x="-70" y="-120" width="140" height="120" fill="#efe6d2"/><path d="M-80,-120 L0,-180 L80,-120Z" fill="#8a6a46"/>${frFlag(-10, -260, .6)}</g>`).join('')}
  <rect x="0" y="860" width="${W}" height="220" fill="#c9b48a"/>`;
  for (let i = 0; i < 14; i++) { const x = ((i * 150 + t / L * 300 * (i % 2 ? 1 : -1)) % W + W) % W; s += rP(x, 940 + (i % 3) * 40, 1.4, t, { ph: i, top: ['#2a2a2a', '#5a3a2a', '#3a4a6a'][i % 3], bot: '#2a2a2a', cap: '#1a1a1a', dir: i % 2 ? 1 : -1, skirt: i % 4 == 0 ? '#5a3a4a' : 0 }); }
  return s + `<rect width="${W}" height="${H}" fill="#7a5a2a" opacity=".12"/>` + rLabel('1889: la gran Exposición Universal', W / 2, 90, 40);
};
scenes.p_vista = function (t) {
  let s = PDALL() + rSky('day') + rClouds(t, [[400, 90, .6]]) + `<rect x="0" y="380" width="${W}" height="700" fill="#b8b0a0"/>`;
  const R = rng(66);
  for (let row = 0; row < 12; row++) { const y = 400 + row * row * 4.5 + row * 10, sc = .3 + row * .09; for (let i = -1; i < 22 / sc; i++) { const x = i * 100 * sc * 1.3 + (row % 2) * 40; if (x > W) break; const w = 90 * sc, h = 50 * sc; s += `<rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="#efe6d2"/><path d="M${x - 2},${y - h} L${x + w + 2},${y - h} L${x + w - 6},${y - h - 18 * sc} L${x + 6},${y - h - 18 * sc}Z" fill="#7a8696"/>`; } }
  s += `<path d="M0,620 Q500,560 960,640 Q1400,720 1920,660" stroke="#5f8fa8" stroke-width="40" fill="none"/>`;
  s += `<path d="M560,1080 L700,820 L1220,820 L1360,1080Z" fill="#6a4e36"/>${[...Array(12)].map((_, i) => `<line x1="${560 + i * 70}" y1="1080" x2="${700 + i * 46}" y2="820" stroke="#4e3a28" stroke-width="5"/>`).join('')}<rect x="680" y="800" width="560" height="24" fill="#4e3a28"/>`;
  return s + rLabel('Desde arriba se ve toda la ciudad', W / 2, 90, 40);
};
scenes.p_louvre = function (t) {
  let s = PDALL() + rSky('day') + rClouds(t, [[400, 110, .7]]);
  s += `<rect x="0" y="340" width="${W}" height="280" fill="url(#pStone)"/><path d="M-10,340 L${W + 10},340 L${W - 40},280 L40,280Z" fill="url(#pZinc)"/>${[...Array(24)].map((_, i) => `<rect x="${30 + i * 80}" y="380" width="40" height="80" fill="#6f8aa2"/><rect x="${30 + i * 80}" y="500" width="40" height="80" fill="#6f8aa2"/>`).join('')}
  <rect x="0" y="620" width="${W}" height="460" fill="#d9ccb0"/><rect x="0" y="760" width="${W}" height="120" fill="#7fb0cf" opacity=".7"/>`;
  s += `<g transform="translate(960,800)"><path d="M-330,0 L0,-330 L330,0Z" fill="url(#pGlass)" stroke="#5a6a78" stroke-width="5"/>${[...Array(10)].map((_, i) => `<line x1="${-330 + i * 66}" y1="0" x2="0" y2="-330" stroke="#5a6a78" stroke-width="2"/><line x1="${-330 + i * 33}" y1="${-i * 33}" x2="${330 - i * 33}" y2="${-i * 33}" stroke="#5a6a78" stroke-width="2"/>`).join('')}</g>
  ${[[-560, .4], [560, .4]].map(([dx, sc]) => `<g transform="translate(${960 + dx},800) scale(${sc})"><path d="M-330,0 L0,-330 L330,0Z" fill="url(#pGlass)" stroke="#5a6a78" stroke-width="8"/></g>`).join('')}`;
  return s + pCrowd(t, 61, 16, 880, 1070) + rLabel('Museo del Louvre: de castillo a museo', W / 2, 90, 38);
};
scenes.p_louvre_sala = function (t) {
  let s = PDALL() + `<rect width="${W}" height="${H}" fill="#e9dcc4"/><path d="M0,0 L${W},0 L${W},120 L0,120Z" fill="#cdbb98"/><rect x="0" y="820" width="${W}" height="260" fill="#a8825a"/>${[...Array(14)].map((_, i) => `<line x1="${i * 150}" y1="820" x2="${i * 150 - 260}" y2="${H}" stroke="#8a6a46" stroke-width="3"/>`).join('')}`;
  const frame = (x, y, w, h, svg) => `<g transform="translate(${x},${y})"><rect x="-14" y="-14" width="${w + 28}" height="${h + 28}" fill="#c9a24a"/><rect x="0" y="0" width="${w}" height="${h}" fill="#f2e9d2"/>${svg}</g>`;
  s += frame(120, 240, 360, 260, `<rect width="360" height="160" fill="#8ab8d8"/><rect y="160" width="360" height="100" fill="#6a8a4a"/><circle cx="280" cy="60" r="30" fill="#f2d98a"/>`)
    + frame(620, 200, 300, 400, `<rect width="300" height="400" fill="#3a2a22"/><ellipse cx="150" cy="180" rx="70" ry="90" fill="#c9a07a"/>`)
    + frame(1060, 240, 380, 280, `<rect width="380" height="280" fill="#2b4a6a"/><path d="M40,240 Q190,60 340,240Z" fill="#d9c08a"/>`)
    + frame(1560, 220, 260, 340, `<rect width="260" height="340" fill="#6a3a2a"/><circle cx="130" cy="140" r="60" fill="#e8c8a0"/>`);
  s += `<g transform="translate(1360,820)">${rShadow(0, 0, 80)}<rect x="-60" y="-120" width="120" height="120" fill="#e6e2d8"/><path d="M-30,-120 Q-40,-240 0,-300 Q40,-240 30,-120Z" fill="#f2efe8"/><circle cx="0" cy="-320" r="26" fill="#f2efe8"/></g>`;
  return s + pCrowd(t, 67, 10, 860, 1060) + rLabel('Miles de obras de arte', W / 2, 90, 40);
};
scenes.p_monalisa = function (t) {
  let s = PDALL() + `<rect width="${W}" height="${H}" fill="#3a3a44"/><rect x="0" y="820" width="${W}" height="260" fill="#8a7a6a"/>`;
  s += `<g transform="translate(960,470)"><rect x="-230" y="-290" width="460" height="580" fill="#c9a24a"/><rect x="-200" y="-260" width="400" height="520" fill="#4a5a3a"/>
  <path d="M-200,40 Q-100,-60 0,-20 Q100,-80 200,0 L200,260 L-200,260Z" fill="#6a7a4a" opacity=".7"/>
  <path d="M-130,260 Q-140,60 -60,10 L60,10 Q140,60 130,260Z" fill="#2a2018"/><ellipse cx="0" cy="-70" rx="70" ry="90" fill="#d9b080"/><path d="M-80,-80 Q-90,-170 0,-170 Q90,-170 80,-80 Q90,40 60,30 Q70,-120 0,-120 Q-70,-120 -60,30 Q-90,40 -80,-80Z" fill="#2a1a12"/>
  <path d="M-16,-30 Q0,-24 16,-30" stroke="#8a4a3a" stroke-width="4" fill="none"/><circle cx="-24" cy="-80" r="5" fill="#3a2a1a"/><circle cx="24" cy="-80" r="5" fill="#3a2a1a"/>
  <path d="M-60,150 Q0,130 60,150 Q20,170 -60,150Z" fill="#d9b080"/></g>
  <rect x="640" y="140" width="640" height="660" fill="#fff" opacity=".06"/><rect x="560" y="780" width="800" height="12" fill="#c9a24a"/>`;
  const cam = `<rect x="-2" y="-128" width="22" height="16" rx="3" fill="#222"/>`;
  for (let i = 0; i < 9; i++) s += rP(420 + i * 130, 1030 + (i % 2) * 20, 1.9, t, { ph: i, top: ['#2b3a67', '#c94f6d', '#e8e2d4', '#5a6a5a'][i % 4], walk: false, hold: i % 3 == 0 ? cam : 0, longhair: i % 2 == 0 });
  return s + rLabel('La Mona Lisa y su sonrisa misteriosa', W / 2, 70, 38);
};
scenes.p_notredame = function (t) {
  let s = PDALL() + rSky('day') + rClouds(t, [[300, 110, .7]]);
  s += `<g transform="translate(960,860)">
  ${[-1, 1].map(d => `<rect x="${d < 0 ? -420 : 160}" y="-640" width="260" height="640" fill="url(#pStone)" stroke="#b8a888" stroke-width="4"/>${[0, 1].map(k => `<path d="M${(d < 0 ? -390 : 190) + k * 110},-600 l0,200 q40,-40 80,0 l0,-200 q-40,-50 -80,0Z" fill="#6f7a88"/>`).join('')}`).join('')}
  <rect x="-160" y="-520" width="320" height="520" fill="url(#pStone)" stroke="#b8a888" stroke-width="4"/>
  <circle cx="0" cy="-360" r="110" fill="#3a4a8a" stroke="#b8a888" stroke-width="12"/>${[...Array(12)].map((_, i) => `<line x1="0" y1="-360" x2="${Math.cos(i / 12 * TAU) * 104}" y2="${-360 + Math.sin(i / 12 * TAU) * 104}" stroke="#b8a888" stroke-width="5"/>`).join('')}<circle cx="0" cy="-360" r="26" fill="#c8323a"/>
  <rect x="-440" y="-250" width="880" height="24" fill="#cdbf9e"/>${[...Array(28)].map((_, i) => `<rect x="${-430 + i * 31}" y="-236" width="16" height="40" fill="#9a8a6a"/>`).join('')}
  ${[-280, 0, 280].map(x => `<path d="M${x - 80},0 L${x - 80},-130 Q${x},-230 ${x + 80},-130 L${x + 80},0Z" fill="#5a4a3a" stroke="#b8a888" stroke-width="10"/>`).join('')}</g>
  <rect x="0" y="860" width="${W}" height="220" fill="#d9ccb0"/>`;
  return s + pCrowd(t, 71, 14, 880, 1070) + rLabel('Notre-Dame: el libro de piedra', 330, 90, 38);
};
scenes.p_roseton = function (t) {
  let s = PDALL() + `<rect width="${W}" height="${H}" fill="#2a2420"/>`;
  const cx = 960, cy = 540, R = 420;
  s += `<circle cx="${cx}" cy="${cy}" r="${R + 30}" fill="#5a4a3a"/>`;
  for (let ring = 0; ring < 4; ring++) { const n = 8 + ring * 8, r1 = 60 + ring * 95, r2 = r1 + 90; for (let i = 0; i < n; i++) { const a1 = i / n * TAU, a2 = (i + 1) / n * TAU; const c = ['#2b4ab8', '#c8323a', '#f2c14e', '#3a9a5a', '#7a3ab8'][(i + ring) % 5]; const glow = .75 + .25 * Math.abs(S(t, 2, i + ring)); s += `<path d="M${cx + Math.cos(a1) * r1},${cy + Math.sin(a1) * r1} L${cx + Math.cos(a1) * r2},${cy + Math.sin(a1) * r2} A${r2},${r2} 0 0 1 ${cx + Math.cos(a2) * r2},${cy + Math.sin(a2) * r2} L${cx + Math.cos(a2) * r1},${cy + Math.sin(a2) * r1} A${r1},${r1} 0 0 0 ${cx + Math.cos(a1) * r1},${cy + Math.sin(a1) * r1}Z" fill="${c}" opacity="${glow}" stroke="#2a2420" stroke-width="6"/>`; } }
  s += `<circle cx="${cx}" cy="${cy}" r="60" fill="#f2c14e" stroke="#2a2420" stroke-width="6"/>`;
  return s + rLabel('Vitrales de colores que cuentan historias', W / 2, 1010, 38);
};
scenes.p_luxemburgo = function (t) {
  let s = PDALL() + rSky('day') + rSun(1600, 140) + rClouds(t, [[400, 100, .7]]);
  s += `<g transform="translate(960,520) scale(.6)"><rect x="-600" y="-260" width="1200" height="260" fill="url(#pStone)"/><path d="M-120,-260 Q0,-420 120,-260Z" fill="url(#pZinc)"/>${[...Array(14)].map((_, i) => `<rect x="${-560 + i * 80}" y="-220" width="40" height="120" fill="#6f8aa2"/>`).join('')}</g>`;
  s += `<rect x="0" y="520" width="${W}" height="560" fill="#d9ccb0"/>`;
  for (let i = 0; i < 6; i++) s += rTree(80 + i * 120, 600 + i * 10, .6, 'green', t, 400 + i) + rTree(1840 - i * 120, 600 + i * 10, .6, 'green', t, 410 + i);
  s += `<ellipse cx="960" cy="760" rx="520" ry="120" fill="#c4b490"/><ellipse cx="960" cy="760" rx="490" ry="104" fill="url(#pSeine)"/><g transform="translate(960,720)"><rect x="-14" y="-60" width="28" height="60" fill="#b8a888"/><path d="M0,-60 q-30,-60 0,-90 q30,30 0,90" fill="#cfe3ee" opacity=".8"/></g>`;
  for (let i = 0; i < 3; i++) { const a = t / L * TAU + i * 2.1, x = 960 + Math.cos(a) * 380, y = 770 + Math.sin(a) * 70; s += `<g transform="translate(${x},${y})"><path d="M-30,0 L30,0 L20,12 L-20,12Z" fill="#8a5a36"/><line x1="0" y1="0" x2="0" y2="-50" stroke="#333" stroke-width="3"/><path d="M2,-48 L32,-8 L2,-8Z" fill="${['#e8352a', '#1f4fb8', '#f2c14e'][i]}"/></g>`; }
  const chair = (x, y) => `<g transform="translate(${x},${y})">${rShadow(0, 0, 30)}<rect x="-26" y="-40" width="52" height="8" fill="#2f7a4a"/><rect x="-26" y="-90" width="52" height="50" rx="6" fill="none" stroke="#2f7a4a" stroke-width="6"/><path d="M-22,-32 L-26,0 M22,-32 L26,0" stroke="#2f7a4a" stroke-width="5"/></g>`;
  s += chair(380, 960) + chair(470, 975) + chair(1450, 965) + chair(1540, 955);
  s += `<g transform="translate(1700,1000)">${rShadow(0, 0, 60)}<path d="M-50,0 L0,-200 L50,0 M0,-200 L0,0" stroke="#7a5a3a" stroke-width="6"/><rect x="-50" y="-190" width="100" height="80" fill="#fff" stroke="#999" stroke-width="3"/><path d="M-30,-130 Q0,-170 30,-130" stroke="#3a9a5a" stroke-width="5" fill="none"/></g>`;
  s += rP(470, 960, 1.6, t, { ph: 1, top: '#c94f6d', walk: false, longhair: true, hold: `<rect x="-14" y="-118" width="34" height="26" fill="#e8e0c8"/>` }) + rP(1620, 1010, 1.7, t, { ph: 2, top: '#5a6a5a', walk: false });
  return s + rLabel('Jardines de Luxemburgo', W / 2, 90, 42);
};
scenes.p_atardecer = function (t) {
  let s = PDALL() + rSky('dusk') + rSun(1500, 440, 80);
  for (let i = 0; i < 7; i++) s += haussmann(i * 280 - 30, 640, 270, 300, { night: true });
  s += eiffel(560, 640, .62, true, t) + seine(640, t, 220) + bateauMouche(((t / L) * (W + 500)) - 250, 760, .9);
  s += `<rect x="0" y="860" width="${W}" height="220" fill="#c9bfa6"/>` + lampPost(300, 900, 1.1, true) + lampPost(1620, 900, 1.1, true) + pCrowd(t, 81, 6, 900, 1060);
  return s + rLabel('Historia, ideas, arte y personas que soñaron en grande', W / 2, 90, 34);
};
scenes.p_outro = function (t) {
  let s = PDALL() + rSky('dusk') + rSun(1500, 420, 80);
  for (let i = 0; i < 7; i++) s += haussmann(i * 280 - 30, 860, 270, 380 + (i % 2) * 40, { night: true });
  s += eiffel(1500, 760, .95, true, t) + `<rect x="0" y="850" width="${W}" height="230" fill="url(#rWalk)"/>` + pCrowd(t, 3, 10, 900, 1060);
  return s + `<g transform="translate(${W / 2},${H / 2 - 160}) scale(${1 + S(t, 2) * .01})"><rect x="-600" y="-150" width="1200" height="300" rx="40" fill="#fff" opacity=".95" stroke="#2b3a67" stroke-width="6"/>
  <text x="0" y="-20" font-family="Fredoka" font-weight="700" font-size="104" text-anchor="middle" fill="#1f4fb8" stroke="#2b3a67" stroke-width="3" paint-order="stroke">Au revoir, París!</text>
  <text x="0" y="90" font-family="Fredoka" font-weight="600" font-size="52" text-anchor="middle" fill="#2b3a67">Nos vemos en el próximo viaje ✈</text></g>`;
};
scenes.p_eiffel_bg = function (t) { return scenes.p_eiffel(t).replace(/<g transform="translate\(400,90\)">[\s\S]*$/, ''); };
