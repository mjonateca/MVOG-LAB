/* =====================================================================
   Mi Pequeño Atlas — Capítulo 9: Ámsterdam. Escenas realistas.
   Reglas de Vivi aplicadas desde el principio: personas con los dos ojos y
   tamaño según la perspectiva, nada del mismo color que el fondo, rótulos
   por debajo del encabezado, bocadillos sin tapar caras, gente sentada de verdad.
   ===================================================================== */
const AM = `<defs>
<linearGradient id="amWater" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a7f8a"/><stop offset="1" stop-color="#2f4f5a"/></linearGradient>
<linearGradient id="amBrick" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a3a2a"/><stop offset="1" stop-color="#6a2a1e"/></linearGradient>
<linearGradient id="amNemo" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#2f8a5a"/><stop offset="1" stop-color="#1f6a42"/></linearGradient>
<linearGradient id="amField" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7ab05a"/><stop offset="1" stop-color="#4a8a3a"/></linearGradient>
</defs>`;
const AMALL = () => D() + AM;
const AMESC = (o = {}) => Object.assign({ walk: false }, o);
// colores típicos de las casas del canal (ladrillo oscuro, negro, verde, blanco, gris)
const AM_COLS = ['#7a2e22', '#3a3a3e', '#2f4a3a', '#e8e2d4', '#8a5a3a', '#5a2a22', '#4a5a6a', '#d9cfb8', '#6a3a2a'];

/* ---------- piezas ---------- */
// casa del canal: alta y estrecha, con frontón (escalonado, de cuello o de campana), viga con gancho e inclinación
function grachtenpand(x, base, w, h, o = {}) {
  const col = o.col || AM_COLS[Math.abs(Math.round(x / 37)) % AM_COLS.length], tilt = o.tilt || 0, light = /#e8|#d9/.test(col);
  const trim = light ? '#4a3a2a' : '#f4f0e6', g = o.gable || ['escalon', 'cuello', 'campana', 'escalon'][Math.abs(Math.round(x / 53)) % 4];
  let s = `<g transform="rotate(${tilt} ${x + w / 2} ${base})"><rect x="${x}" y="${base - h}" width="${w}" height="${h}" fill="${col}"/><rect x="${x + w * .86}" y="${base - h}" width="${w * .14}" height="${h}" fill="#000" opacity=".12"/>`;
  const top = base - h;
  if (g == 'escalon') { const st = 4, sw = w / (2 * st + 1); let p = `M${x},${top}`; for (let k = 0; k < st; k++) p += ` L${x + k * sw},${top - (k + 1) * 26} L${x + (k + 1) * sw},${top - (k + 1) * 26}`; p += ` L${x + w - st * sw},${top - st * 26}`; for (let k = st - 1; k >= 0; k--) p += ` L${x + w - (k + 1) * sw},${top - (k + 1) * 26} L${x + w - k * sw},${top - (k + 1) * 26} L${x + w - k * sw},${top - k * 26}`; s += `<path d="${p} L${x + w},${top}Z" fill="${col}"/>`; }
  else if (g == 'cuello') s += `<path d="M${x},${top} Q${x + w * .15},${top - 20} ${x + w * .28},${top - 40} L${x + w * .28},${top - 110} L${x + w * .72},${top - 110} L${x + w * .72},${top - 40} Q${x + w * .85},${top - 20} ${x + w},${top}Z" fill="${col}"/><path d="M${x + w * .24},${top - 110} Q${x + w / 2},${top - 150} ${x + w * .76},${top - 110}Z" fill="${trim}"/>`;
  else s += `<path d="M${x},${top} Q${x},${top - 70} ${x + w * .2},${top - 80} Q${x + w * .3},${top - 130} ${x + w / 2},${top - 136} Q${x + w * .7},${top - 130} ${x + w * .8},${top - 80} Q${x + w},${top - 70} ${x + w},${top}Z" fill="${col}"/><path d="M${x + w * .2},${top - 80} Q${x + w / 2},${top - 120} ${x + w * .8},${top - 80}" stroke="${trim}" stroke-width="5" fill="none"/>`;
  // viga con gancho para subir muebles
  s += `<rect x="${x + w / 2 - 4}" y="${top - (g == 'escalon' ? 104 : 96)}" width="8" height="40" fill="#3a2a1e"/><path d="M${x + w / 2},${top - (g == 'escalon' ? 64 : 56)} q0,14 -8,14" stroke="#2a2a2a" stroke-width="4" fill="none"/>`;
  // ventanas altas con marco blanco (más grandes abajo)
  const cols = Math.max(2, Math.floor(w / 60)), rows = Math.floor((h - 120) / 96);
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const ww = (w - 30) / cols - 16, wx = x + 15 + c * (w - 30) / cols + 8, wy = top + 30 + r * 96, wh = 70 - r * 4;
    s += `<rect x="${wx - 4}" y="${wy - 4}" width="${ww + 8}" height="${wh + 8}" fill="${trim}"/><rect x="${wx}" y="${wy}" width="${ww}" height="${wh}" fill="#2a3440"/><line x1="${wx + ww / 2}" y1="${wy}" x2="${wx + ww / 2}" y2="${wy + wh}" stroke="${trim}" stroke-width="3"/><line x1="${wx}" y1="${wy + wh * .45}" x2="${wx + ww}" y2="${wy + wh * .45}" stroke="${trim}" stroke-width="3"/><rect x="${wx + 2}" y="${wy + 2}" width="${ww / 2 - 4}" height="${wh * .4}" fill="#fff" opacity=".15"/>`; }
  // puerta con escalinata
  s += `<rect x="${x + w / 2 - 20}" y="${base - 96}" width="40" height="72" fill="#2a3a2a"/><path d="M${x + w / 2 - 20},${base - 96} Q${x + w / 2},${base - 116} ${x + w / 2 + 20},${base - 96}Z" fill="${trim}"/><rect x="${x + w / 2 - 34}" y="${base - 24}" width="68" height="24" fill="#8a8478"/>`;
  return s + `</g>`;
}
function amRow(t, base, opts = {}) { // fila de casas del canal, algunas inclinadas
  const ws = opts.ws || [150, 120, 170, 130, 150, 115, 160, 140, 125, 155, 135, 150, 120];
  let s = '', x = opts.x0 || -30, k = opts.seed || 0;
  while (x < W + 40) { const w = ws[k % ws.length], h = (opts.h || 420) + ((k * 47) % 140); s += grachtenpand(x, base, w, h, { tilt: opts.tilt ? [0, -2.2, 1.6, 0, 2.6, -1.4][k % 6] : 0 }); x += w - (opts.tilt ? 2 : 0); k++; }
  return s;
}
function amCanal(t, y0, h = 200) { // agua del canal con reflejos y muelle de ladrillo con barandilla
  let s = `<rect x="0" y="${y0}" width="${W}" height="${h}" fill="url(#amWater)"/>`;
  for (let i = 0; i < 16; i++) s += `<path d="M${(i * 131 + t / L * 80) % (W + 120) - 60},${y0 + 20 + (i * 41) % (h - 30)} q30,-6 60,0" stroke="#a8c8d0" stroke-width="3" fill="none" opacity=".55"/>`;
  return s;
}
function amQuay(y, h = 40) { return `<rect x="0" y="${y}" width="${W}" height="${h}" fill="url(#amBrick)"/>${[...Array(24)].map((_, i) => `<line x1="${i * 80}" y1="${y}" x2="${i * 80}" y2="${y + h}" stroke="#5a2418" stroke-width="2"/>`).join('')}<rect x="0" y="${y - 6}" width="${W}" height="8" fill="#9a9488"/>`; }
function amTree(x, base, s = 1, t = 0, seed = 1) { return rTree(x, base, s, 'green', t, seed); }
function amLamp(x, base, s = 1) { return `<g transform="translate(${x},${base}) scale(${s})"><rect x="-4" y="-200" width="8" height="200" fill="#1f2a24"/><path d="M-4,-200 q-30,-6 -34,-30 M4,-200 q30,-6 34,-30" stroke="#1f2a24" stroke-width="5" fill="none"/>${[-36, 36].map(dx => `<rect x="${dx - 9}" y="-258" width="18" height="28" rx="3" fill="#fff4c2" stroke="#1f2a24" stroke-width="3"/>`).join('')}</g>`; }
function amBikeParked(x, y, s = 1, col = '#2b2b2b') { return `<g transform="translate(${x},${y}) scale(${s})" stroke="${col}" stroke-width="4" fill="none"><circle cx="-30" cy="-22" r="22"/><circle cx="30" cy="-22" r="22"/><path d="M-30,-22 L-6,-58 L22,-58 L30,-22 M-6,-58 L0,-22 L22,-58 M-10,-64 h14 M22,-58 l4,-12 h10"/></g>`; }
function amBikes(t, y, n = 8, seed = 3) { const R = rng(seed); return [...Array(n)].map((_, i) => amBikeParked(60 + i * (W / n) + R() * 40, y, .9 + R() * .2, ['#2b2b2b', '#c8323a', '#2f6aa8', '#3a6a3a', '#e8e2d4'][i % 5])).join(''); }
function houseboat(x, y, s = 1, col = '#2f6a4a', t = 0) {
  const b = S(t, 2) * 2;
  return `<g transform="translate(${x},${y + b}) scale(${s})">${'' }<ellipse cx="0" cy="8" rx="240" ry="14" fill="#000" opacity=".18"/>
  <path d="M-240,-30 L230,-30 L250,0 L-230,0Z" fill="#2a2a2e"/><rect x="-200" y="-110" width="360" height="80" fill="${col}"/><rect x="-200" y="-118" width="370" height="12" fill="#e8e2d4"/>
  ${[-160, -90, -20, 50, 120].map(xx => `<circle cx="${xx}" cy="-70" r="16" fill="#cfe8f8" stroke="#e8e2d4" stroke-width="4"/>`).join('')}
  <rect x="140" y="-100" width="30" height="70" fill="#5a3a22"/>${[-180, -120, -60, 0, 60].map((xx, k) => `<g transform="translate(${xx},-118)"><rect x="-14" y="-16" width="28" height="16" fill="#b85a3a"/>${[[-8, -22], [0, -28], [8, -22]].map(([a, c], j) => `<circle cx="${a}" cy="${c}" r="6" fill="${['#e8352a', '#f2c14e', '#ff9ad5', '#fff'][(k + j) % 4]}"/>`).join('')}</g>`).join('')}
  <path d="M-240,-30 L-260,-60" stroke="#8a6a46" stroke-width="5"/><rect x="200" y="-160" width="6" height="50" fill="#555"/><path d="M206,-158 l28,8 l-28,8Z" fill="#c8102e"/><path d="M206,-150 l28,0" stroke="#fff" stroke-width="3"/><path d="M206,-144 l28,-2" stroke="#21468b" stroke-width="4"/></g>`;
}
function nlFlag(x, y, s = 1) { return `<g transform="translate(${x},${y}) scale(${s})"><line x1="0" y1="0" x2="0" y2="130" stroke="#555" stroke-width="4"/><rect x="0" y="0" width="96" height="22" fill="#ae1c28"/><rect x="0" y="22" width="96" height="22" fill="#fff"/><rect x="0" y="44" width="96" height="22" fill="#21468b"/></g>`; }
function windmill(x, base, s = 1, t = 0) {
  const a = t / L * 360;
  return `<g transform="translate(${x},${base}) scale(${s})">${rShadow(0, 0, 110)}<path d="M-70,0 L-44,-260 L44,-260 L70,0Z" fill="#5a4a3a"/><path d="M-70,0 L-44,-260 L-30,-260 L-52,0Z" fill="#000" opacity=".15"/><rect x="-18" y="-70" width="36" height="70" rx="18" fill="#2f4a3a"/><rect x="-14" y="-170" width="28" height="34" fill="#e8e2d4"/>
  <path d="M-56,-260 Q0,-330 56,-260Z" fill="#3a3a3e"/><g transform="translate(0,-270) rotate(${a})">${[0, 90, 180, 270].map(r => `<g transform="rotate(${r})"><rect x="-6" y="-210" width="12" height="200" fill="#e8e2d4"/><rect x="6" y="-200" width="40" height="170" fill="#f4f0e6" stroke="#8a7a5a" stroke-width="3"/>${[...Array(6)].map((_, k) => `<line x1="6" y1="${-190 + k * 28}" x2="46" y2="${-190 + k * 28}" stroke="#8a7a5a" stroke-width="2"/>`).join('')}</g>`).join('')}<circle r="14" fill="#3a3a3e"/></g></g>`;
}
function tulipField(t, y0, y1, cols = ['#e8352a', '#f2c14e', '#ff7ab0', '#8a3ac8', '#ff8a2a']) { // franjas de colores hasta el horizonte
  let s = `<rect x="0" y="${y0}" width="${W}" height="${y1 - y0}" fill="#5a8a3a"/>`;
  const n = 9;
  for (let i = 0; i < n; i++) { const xa = -400 + i * 300, xb = -1200 + i * 520; s += `<path d="M${960 + (xa - 960) * .25},${y0} L${960 + (xa + 300 - 960) * .25},${y0} L${xb + 520},${y1} L${xb},${y1}Z" fill="${cols[i % cols.length]}"/>`; if (i % 2) s += `<path d="M${960 + (xa + 300 - 960) * .25},${y0} L${960 + (xa + 300 - 960) * .25 + 6},${y0} L${xb + 560},${y1} L${xb + 520},${y1}Z" fill="#4a7a2a"/>`; }
  for (let r = 0; r < 4; r++) for (let i = 0; i < 26; i++) { const yy = y1 - 30 - r * 34, x = (i * 80 + r * 37) % W; s += tulip(x, yy + 30, .55 - r * .1, cols[Math.floor(((x + 400) / 520)) % cols.length], t, i + r); }
  return s;
}
function cheeseWheel(x, y, s = 1, col = '#f2b84a') { return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="0" rx="90" ry="30" fill="#d98a2a"/><rect x="-90" y="-50" width="180" height="50" fill="${col}"/><ellipse cx="0" cy="-50" rx="90" ry="30" fill="#f8d070"/><ellipse cx="0" cy="-50" rx="60" ry="18" fill="none" stroke="#d9a040" stroke-width="2"/><rect x="-90" y="-30" width="180" height="6" fill="#c8102e" opacity=".0"/></g>`; }
function amPeople(t, seed, n, y0, y1) { // perspectiva coherente: quien está al fondo es pequeño
  const base = y0 - 40, yb = Math.min(y1, base + (1010 - base) * .5);
  return rCrowd(t, seed, n, y0, yb, { tops: ['#21468b', '#ff8a2a', '#ae1c28', '#3a6a3a', '#e8e2d4', '#333', '#4fb3f6', '#f2c14e'], scale: y => 0.35 + (y - base) / (1010 - base) * 1.9 });
}
function amCyclists(t, y, n = 3, dir = 1, seed = 5) { const R = rng(seed); let s = ''; for (let i = 0; i < n; i++) { const p = ((t / L) + i / n) % 1, x = dir > 0 ? -200 + p * (W + 400) : W + 200 - p * (W + 400); s += `<g transform="translate(${x},0) scale(${dir},1) translate(${-x},0)">${bike(x, y, 1.2, ['#2f6aa8', '#c8323a', '#2b2b2b', '#3a8a5a'][i % 4], rider(['#ff8a2a', '#21468b', '#e8e2d4', '#ae1c28'][i % 4], RSKIN[i % 5], i, t, i % 2 == 0), t)}</g>`; } return s; }

/* ---------- escenas ---------- */
scenes.am_intro = function (t) {
  let s = AMALL() + rSky('day') + rClouds(t, [[300, 120, .8], [1300, 90, .6]]) + amRow(t, 660, { tilt: true, h: 380 }) + amQuay(660) + amCanal(t, 700, 380) + houseboat(1350, 900, 1, '#2f4a6a', t);
  return s + `<g transform="translate(${W / 2},${H / 2 - 210})"><rect x="-560" y="-150" width="1120" height="300" rx="40" fill="#fff" opacity=".95" stroke="#2b3a67" stroke-width="6"/>
  <text x="0" y="-30" font-family="Fredoka" font-weight="700" font-size="104" text-anchor="middle" fill="#ffcc2e" stroke="#2b3a67" stroke-width="6" paint-order="stroke">Mi Pequeño Atlas</text>
  <rect x="-360" y="20" width="720" height="96" rx="22" fill="#ff8a2a"/><text x="0" y="88" font-family="Fredoka" font-weight="700" font-size="64" text-anchor="middle" fill="#fff">Capítulo 9: Ámsterdam</text></g>`;
};
scenes.am_mapa = function (t) {
  let s = AMALL() + `<rect width="${W}" height="${H}" fill="#7fb6dc"/>`;
  s += `<path d="M700,1080 L760,880 L820,760 L900,640 L960,520 L1040,420 L1120,360 L1240,330 L1380,340 L1500,420 L1560,560 L1600,760 L1640,1080Z" fill="#cfe2b8" stroke="#8aa87a" stroke-width="4"/><text x="1440" y="900" font-family="Fredoka" font-weight="700" font-size="44" fill="#5a7a4a" opacity=".7">ALEMANIA</text><text x="820" y="1040" font-family="Fredoka" font-weight="700" font-size="40" fill="#5a7a4a" opacity=".7">BÉLGICA</text>`;
  s += `<path d="M780,880 L800,760 L860,660 L900,580 L960,520 L1040,450 L1130,400 L1260,380 L1330,430 L1300,540 L1250,660 L1180,760 L1080,860 L960,900Z" fill="#ff9a4a" stroke="#2b3a67" stroke-width="6" stroke-linejoin="round"/><text x="1080" y="760" font-family="Fredoka" font-weight="700" font-size="40" text-anchor="middle" fill="#fff">PAÍSES BAJOS</text>`;
  s += `<text x="420" y="520" font-family="Fredoka" font-weight="700" font-size="46" fill="#2f6a8a" opacity=".7">MAR DEL NORTE</text>`;
  const p = 1 + .15 * Math.max(0, S(t, 4));
  s += `<g transform="translate(1010,620) scale(${p})"><circle r="22" fill="#e8352a" stroke="#fff" stroke-width="6"/><circle r="7" fill="#fff"/></g>` + rLabel('Ámsterdam', 860, 620, 44, '#e8352a') + nlFlag(1500, 260, 1.4);
  return s + rLabel('Ámsterdam, la capital de los Países Bajos', W / 2, 1010, 40);
};
scenes.am_canal = function (t) {
  let s = AMALL() + rSky('day') + rSun(1650, 130) + amRow(t, 640, { tilt: true, h: 420, seed: 2 });
  s += `<rect x="0" y="640" width="${W}" height="40" fill="#9a9488"/>` + amBikes(t, 670, 9, 7) + amTree(140, 690, .7, t, 31) + amTree(1780, 690, .7, t, 32) + amQuay(690, 34) + amCanal(t, 724, 356);
  s += `<g transform="translate(${((t / L) * 1600) % 2400 - 400},880)"><path d="M-180,-20 L180,-20 L200,10 L-200,10Z" fill="#e8e2d4"/><rect x="-140" y="-70" width="240" height="50" rx="20" fill="#cfe8f8" stroke="#e8e2d4" stroke-width="5"/>${[-100, -50, 0, 50].map(xx => rP(xx, -24, .9, t, AMESC({ ph: xx, top: '#ff8a2a' }))).join('')}</g>`;
  return s + rLabel('Canales y casas que «bailan»', W / 2, 1010, 40);
};
scenes.am_barcos_bicis = function (t) {
  let s = AMALL() + rSky('day') + amRow(t, 600, { h: 380, seed: 5 }) + `<rect x="0" y="600" width="${W}" height="120" fill="#9a9488"/>`;
  s += amCyclists(t, 700, 4, 1, 3) + amQuay(720, 34) + amCanal(t, 754, 326) + houseboat(520, 940, 1.05, '#2f6a4a', t) + houseboat(1420, 960, 1.1, '#6a2a2a', t);
  return s + rLabel('Familias que viven en barcos… ¡y más bicis que personas!', W / 2, 140, 38);
};
scenes.am_invitada = function (t) {
  let s = AMALL() + rSky('day') + amRow(t, 640, { h: 400, seed: 8 }) + amQuay(640, 40) + amCanal(t, 680, 400) + houseboat(1500, 920, .9, '#2f4a6a', t);
  return s + `<g transform="translate(960,320) scale(${1 + S(t, 2) * .01})"><rect x="-460" y="-110" width="920" height="220" rx="36" fill="#fff" stroke="#ff8a2a" stroke-width="8"/><text x="0" y="-20" font-family="Fredoka" font-weight="600" font-size="44" text-anchor="middle" fill="#ff8a2a">Nuestra invitada de hoy</text><text x="0" y="66" font-family="Fredoka" font-weight="700" font-size="80" text-anchor="middle" fill="#2b3a67">Sanne, de Ámsterdam</text></g>`;
};
scenes.am_agua = function (t) {
  let s = AMALL() + `<rect width="${W}" height="${H}" fill="#cfe2ec"/>`;
  // plano de los canales en forma de anillos (cintas azules)
  s += `<g transform="translate(960,1040)">${[0, 1, 2, 3].map(k => `<path d="M${-260 - k * 160},0 A${260 + k * 160},${230 + k * 150} 0 0 1 ${260 + k * 160},0" stroke="#3a7ab0" stroke-width="${30 - k * 3}" fill="none"/>`).join('')}${[...Array(9)].map((_, k) => `<path d="M0,0 L${Math.cos(Math.PI * (k + 1) / 10) * -900},${-Math.sin(Math.PI * (k + 1) / 10) * 760}" stroke="#a8a090" stroke-width="10"/>`).join('')}<path d="M-1000,0 L1000,0" stroke="#3a7ab0" stroke-width="60"/></g>`;
  s += `<g transform="translate(1600,380)"><circle r="110" fill="#fff" stroke="#2b5a9a" stroke-width="8"/><path d="M-60,40 L0,-60 L60,40Z" fill="none" stroke="#2b5a9a" stroke-width="8"/><circle cy="0" r="22" fill="#2b5a9a"/><text y="80" font-family="Fredoka" font-weight="700" font-size="22" text-anchor="middle" fill="#2b5a9a">PATRIMONIO</text></g>`;
  return s + rLabel('Más de 100 km de canales: tesoro de toda la humanidad', W / 2, 140, 38);
};
scenes.am_bicis = function (t) {
  let s = AMALL() + rSky('day') + amRow(t, 560, { h: 360, seed: 11 }) + `<rect x="0" y="560" width="${W}" height="520" fill="#9a9488"/><rect x="0" y="700" width="${W}" height="200" fill="#b8503a"/>${[...Array(10)].map((_, i) => `<g transform="translate(${100 + i * 190},800)"><circle r="14" fill="none" stroke="#fff" stroke-width="3"/><path d="M-6,4 L0,-8 L6,4" stroke="#fff" stroke-width="3" fill="none"/></g>`).join('')}`;
  s += amCyclists(t, 760, 4, 1, 1) + amCyclists(t, 880, 4, -1, 2) + amBikes(t, 640, 12, 9);
  return s + rLabel('Hay más bicicletas que personas', W / 2, 140, 44);
};
scenes.am_tiposbici = function (t) {
  let s = AMALL() + `<rect width="${W}" height="${H}" fill="#fdf3dc"/><rect x="0" y="820" width="${W}" height="260" fill="#9a9488"/>`;
  const card = (x, title, inner) => `<g transform="translate(${x},560)"><rect x="-200" y="-300" width="400" height="460" rx="28" fill="#fff" stroke="#2b3a67" stroke-width="5"/>${inner}<text x="0" y="130" font-family="Fredoka" font-weight="700" font-size="32" text-anchor="middle" fill="#2b3a67">${title}</text></g>`;
  s += card(270, 'Con caja para niños', `<g transform="translate(0,40)">${bike(30, 0, 1.4, '#2b2b2b', rider('#21468b', '#c99470', 1, t), t)}<rect x="-150" y="-80" width="100" height="56" rx="8" fill="#8a5a3a"/>${rP(-120, -40, .9, t, AMESC({ ph: 2, child: true, top: '#ff8a2a' }))}${rP(-80, -40, .9, t, AMESC({ ph: 3, child: true, top: '#f2c14e', longhair: true }))}</g>`);
  s += card(730, 'Con flores', `<g transform="translate(0,40)">${bike(0, 0, 1.4, '#ff9ad5', null, t)}${[...Array(10)].map((_, k) => `<circle cx="${-70 + (k * 17) % 140}" cy="${-90 + (k % 3) * 8}" r="9" fill="${['#e8352a', '#f2c14e', '#ff9ad5', '#fff'][k % 4]}"/>`).join('')}</g>`);
  s += card(1190, 'De los abuelos', `<g transform="translate(0,40)">${bike(0, 0, 1.4, '#3a3a3e', rider('#7a5a8a', '#f1cfae', 2, t), t)}<path d="M20,-150 q14,-14 28,0" stroke="#d9d6d0" stroke-width="10" fill="none"/></g>`);
  s += card(1650, 'De reparto', `<g transform="translate(0,40)">${bike(0, 0, 1.4, '#2f6aa8', rider('#ae1c28', '#9c6a48', 3, t), t)}<rect x="40" y="-90" width="70" height="50" fill="#c8a060" stroke="#8a6a3a" stroke-width="3"/></g>`);
  return s + rLabel('Bicis de todos los tipos', W / 2, 140, 42);
};
scenes.am_timbres = function (t) {
  let s = AMALL() + rSky('day') + amRow(t, 600, { h: 380, seed: 14 }) + `<rect x="0" y="600" width="${W}" height="480" fill="#9a9488"/>` + amCyclists(t, 820, 5, 1, 7);
  const p = (t / L * 4) % 1;
  s += [300, 960, 1620].map((x, i) => `<g transform="translate(${x},${330 - ((p + i / 3) % 1) * 60})" opacity="${1 - ((p + i / 3) % 1)}"><circle r="46" fill="#f2c14e" stroke="#2b3a67" stroke-width="5"/><text y="14" font-family="Fredoka" font-weight="700" font-size="34" text-anchor="middle" fill="#2b3a67">ding</text></g>`).join('');
  return s + rLabel('Suena a mil timbres de bicicleta', W / 2, 140, 42);
};
scenes.am_dique = function (t) {
  let s = AMALL() + rSky('day') + rClouds(t, [[400, 140, .8]]) + `<rect x="0" y="560" width="${W}" height="520" fill="#7ab05a"/>`;
  s += `<path d="M0,700 Q600,640 960,700 Q1300,760 1920,690 L1920,860 Q1300,920 960,860 Q600,800 0,860Z" fill="#4a8ab0"/>`;
  s += `<path d="M880,640 L1040,640 L1080,920 L840,920Z" fill="#8a7a5a"/><path d="M880,640 L1040,640 L1046,670 L874,670Z" fill="#6a8a4a"/>`;
  for (let i = 0; i < 6; i++) s += `<g transform="translate(${200 + i * 110},${600 - (i % 2) * 20})"><rect x="-40" y="-60" width="80" height="60" fill="#c8a878"/><path d="M-50,-60 L0,-100 L50,-60Z" fill="#8a5a3a"/></g>`;
  s += `<g transform="translate(${400 + S(t, 1) * 60},780)"><path d="M-80,0 L80,0 L60,20 L-60,20Z" fill="#6b4a36"/><line x1="0" y1="0" x2="0" y2="-90" stroke="#6b4a36" stroke-width="4"/><path d="M0,-90 L50,-20 L0,-20Z" fill="#e8e2d4"/></g>`;
  return s + rLabel('Hace 800 años: pescadores, un río (el Amstel) y un dique', W / 2, 1010, 36) + rArrowLabel('El dique', 1220, 520, 1000, 650, 30);
};
scenes.am_anillos = function (t) { return scenes.am_agua(t).replace('Más de 100 km de canales: tesoro de toda la humanidad', 'Anillos de canales en forma de media luna'); };
scenes.am_casas = function (t) {
  let s = AMALL() + rSky('day') + rSun(300, 150) + amRow(t, 820, { h: 520, seed: 17, ws: [190, 160, 200, 170, 180, 150, 190, 170, 160, 200, 180] }) + `<rect x="0" y="820" width="${W}" height="260" fill="#9a9488"/>` + amPeople(t, 21, 10, 860, 1070);
  return s + rArrowLabel('Gancho para subir muebles', 700, 160, 480, 260, 28) + rLabel('Casas altas y estrechas con fachadas preciosas', W / 2, 1010, 38);
};
scenes.am_inclinadas = function (t) {
  const sw = S(t, 1) * 1.2;
  let s = AMALL() + rSky('day') + `<g>${[[-20, 180, '#7a2e22', -3], [160, 150, '#e8e2d4', 2], [310, 190, '#3a3a3e', -1], [500, 160, '#2f4a3a', 3.5], [660, 180, '#8a5a3a', -2.5], [840, 150, '#d9cfb8', 1.5], [990, 190, '#5a2a22', -3], [1180, 160, '#4a5a6a', 2.5], [1340, 180, '#7a2e22', -1.5], [1520, 160, '#e8e2d4', 3], [1680, 180, '#3a3a3e', -2]].map(([x, w, c, ti], k) => grachtenpand(x, 760, w, 520 + (k % 3) * 60, { col: c, tilt: ti + sw * (k % 2 ? 1 : -1) })).join('')}</g>`;
  s += amQuay(760, 40) + amCanal(t, 800, 280);
  return s + rLabel('Casas inclinadas, como si bailaran un vals', W / 2, 1010, 40);
};
scenes.am_pilotes = function (t) {
  let s = AMALL() + rSky('day') + `<rect x="0" y="520" width="${W}" height="560" fill="#6a5a3a"/><rect x="0" y="520" width="${W}" height="60" fill="#9a9488"/>`;
  for (let k = 0; k < 18; k++) s += `<circle cx="${(k * 131) % W}" cy="${640 + (k * 53) % 400}" r="${6 + k % 5}" fill="#5a4a2e"/>`;
  s += grachtenpand(560, 520, 260, 380, { col: '#7a2e22', tilt: -2 }) + grachtenpand(1100, 520, 260, 420, { col: '#3a3a3e', tilt: 2 });
  for (const x0 of [580, 1120]) for (let i = 0; i < 6; i++) s += `<rect x="${x0 + i * 44}" y="540" width="16" height="${460 + (i % 2) * 20}" fill="#c8a060" stroke="#8a6a3a" stroke-width="3"/><path d="M${x0 + i * 44},${1000 + (i % 2) * 20} l8,30 l8,-30Z" fill="#c8a060"/>`;
  return s + rArrowLabel('Tierra blanda', 300, 760, 200, 860, 30) + rArrowLabel('Pilares de madera', 1600, 760, 1360, 820, 30) + rLabel('Construida sobre tierra blanda y pilares de madera', W / 2, 140, 38);
};
scenes.am_estrechas = function (t) {
  let s = AMALL() + rSky('day') + grachtenpand(560, 860, 180, 560, { col: '#7a2e22', gable: 'escalon' }) + grachtenpand(760, 860, 400, 460, { col: '#d9cfb8', gable: 'campana' }) + grachtenpand(1180, 860, 160, 600, { col: '#2f4a3a', gable: 'cuello' }) + `<rect x="0" y="860" width="${W}" height="220" fill="#9a9488"/>`;
  s += `<g transform="translate(960,300)"><rect x="-340" y="-50" width="680" height="100" rx="20" fill="#fff" stroke="#c8323a" stroke-width="6"/><text y="16" font-family="Fredoka" font-weight="700" font-size="40" text-anchor="middle" fill="#c8323a">Fachada ancha = más impuesto</text></g>`;
  s += `<path d="M560,900 L740,900 M560,890 v20 M740,890 v20" stroke="#2b3a67" stroke-width="5"/><text x="650" y="950" font-family="Fredoka" font-weight="700" font-size="30" text-anchor="middle" fill="#2b3a67">flaquita</text><path d="M760,900 L1160,900 M760,890 v20 M1160,890 v20" stroke="#c8323a" stroke-width="5"/><text x="960" y="950" font-family="Fredoka" font-weight="700" font-size="30" text-anchor="middle" fill="#c8323a">ancha</text>`;
  return s + rLabel('Por eso las casas son flaquitas y altísimas', W / 2, 1020, 38);
};
scenes.am_gancho = function (t) {
  const p = (t / L) % 1, up = Math.min(1, p * 1.4);
  let s = AMALL() + rSky('day') + grachtenpand(700, 960, 520, 820, { col: '#7a2e22', gable: 'cuello' }) + `<rect x="0" y="960" width="${W}" height="120" fill="#9a9488"/>`;
  s += `<line x1="960" y1="${130}" x2="960" y2="${900 - up * 600}" stroke="#3a2a1e" stroke-width="4"/><g transform="translate(960,${900 - up * 600})"><rect x="-90" y="0" width="180" height="110" rx="8" fill="#2a2a2e"/><rect x="-80" y="12" width="160" height="40" fill="#fff"/>${[...Array(8)].map((_, k) => `<rect x="${-76 + k * 20}" y="12" width="10" height="26" fill="#111"/>`).join('')}<rect x="-80" y="110" width="12" height="30" fill="#2a2a2e"/><rect x="68" y="110" width="12" height="30" fill="#2a2a2e"/></g>`;
  s += rP(1300, 1030, 2.2, t, AMESC({ ph: 2, top: '#21468b', hold: `<g transform="translate(14,-90)"><line x1="0" y1="0" x2="-60" y2="-500" stroke="#3a2a1e" stroke-width="3"/></g>` })) + rP(1460, 1040, 1.8, t, AMESC({ ph: 3, child: true, top: '#ff8a2a', wave: true, dir: -1 }));
  return s + rLabel('Los muebles entraban… ¡por la ventana!', W / 2, 1010, 40);
};
scenes.am_barcocasa = function (t) {
  let s = AMALL() + rSky('day') + rSun(1650, 130) + amRow(t, 560, { h: 360, seed: 23 }) + amQuay(560, 40) + amCanal(t, 600, 480);
  s += houseboat(520, 860, 1.25, '#2f6a4a', t) + houseboat(1420, 900, 1.3, '#21468b', t);
  for (let i = 0; i < 6; i++) s += `<g transform="translate(${300 + i * 260 + S(t, 1, i) * 20},${1010 + (i % 2) * 20})"><ellipse rx="22" ry="10" fill="#7a6a4a"/><circle cx="18" cy="-10" r="9" fill="#3a6a3a"/><path d="M26,-10 l10,2 l-10,3Z" fill="#f2a12a"/><circle cx="20" cy="-12" r="2" fill="#111"/></g>`;
  return s + rLabel('Unas 2.500 familias viven en barcos-casa', W / 2, 140, 40);
};
scenes.am_barcomuseo = function (t) {
  const rock = S(t, 2) * 1.2;
  let s = AMALL() + `<g transform="rotate(${rock} 960 540)"><rect x="-40" y="-40" width="${W + 80}" height="${H + 80}" fill="#e8d4b0"/><rect x="-40" y="760" width="${W + 80}" height="360" fill="#8a6a46"/>${[...Array(12)].map((_, i) => `<line x1="${i * 170}" y1="760" x2="${i * 170 - 60}" y2="1100" stroke="#6b4a36" stroke-width="3"/>`).join('')}`;
  s += `${[400, 960, 1520].map(x => `<circle cx="${x}" cy="300" r="90" fill="#8ac4e8" stroke="#b8a060" stroke-width="16"/><path d="M${x - 70},330 q40,-20 70,0 q30,20 70,0" stroke="#5a8aa0" stroke-width="5" fill="none"/>`).join('')}`;
  s += `<g transform="translate(300,760)"><rect x="-120" y="-150" width="240" height="150" fill="#c8a878"/><rect x="-110" y="-200" width="220" height="50" fill="#e8e2d4"/><rect x="-80" y="-230" width="60" height="30" fill="#b8b8b8"/><circle cx="40" cy="-215" r="20" fill="#3a3a3e"/></g>`;
  s += `<g transform="translate(1500,760)"><rect x="-150" y="-110" width="300" height="70" rx="12" fill="#3a6a8a"/><rect x="-150" y="-60" width="300" height="60" fill="#5a3a22"/><ellipse cx="-80" cy="-112" rx="44" ry="14" fill="#fff"/></g>`;
  s += `<g transform="translate(960,150)"><path d="M0,0 L0,40" stroke="#6b4a36" stroke-width="4"/><path d="M-30,40 Q-30,110 0,110 Q30,110 30,40Z" fill="#d9b14a" stroke="#8a6a2a" stroke-width="4"/><circle cy="${116 + S(t, 4) * 4}" r="8" fill="#8a6a2a"/></g></g>`;
  return s + rLabel('Un barco-casa museo: camarotes, cocina… ¡y su campana!', W / 2, 1010, 36);
};
scenes.am_desayuno_patos = function (t) {
  let s = AMALL() + `<rect width="${W}" height="${H}" fill="#e8d4b0"/><rect x="0" y="760" width="${W}" height="320" fill="#8a6a46"/>`;
  s += `<circle cx="1300" cy="430" r="240" fill="url(#amWater)" stroke="#b8a060" stroke-width="22"/>${[0, 1].map(k => `<g transform="translate(${1220 + k * 140 + S(t, 1, k) * 30},${480 + k * 30})"><ellipse rx="40" ry="18" fill="#7a6a4a"/><circle cx="30" cy="-18" r="14" fill="#3a6a3a"/><path d="M42,-18 l16,3 l-16,5Z" fill="#f2a12a"/><circle cx="32" cy="-20" r="3" fill="#111"/></g>`).join('')}`;
  s += `<rect x="200" y="700" width="760" height="30" fill="#6b4a36"/>` + rSit(420, 700, 2.0, t, { mode: 'banco', ph: 1, top: '#ff8a2a', skin: '#9c6a48' }) + rSit(720, 700, 2.0, t, { mode: 'banco', ph: 4, top: '#21468b', longhair: true, talk: true }) + `<rect x="200" y="716" width="760" height="40" fill="#8a5a3a"/>`;
  s += `<ellipse cx="420" cy="700" rx="60" ry="12" fill="#fff"/><ellipse cx="720" cy="700" rx="60" ry="12" fill="#fff"/><rect x="560" y="660" width="30" height="40" rx="6" fill="#fff"/>`;
  return s + rLabel('Desayunan viendo patos por la ventana', W / 2, 1010, 40);
};
scenes.am_nemo = function (t) {
  let s = AMALL() + rSky('day') + rSun(300, 140) + amCanal(t, 760, 320) + amQuay(740, 30);
  s += `<path d="M560,740 L1500,740 L1500,320 L700,520Z" fill="url(#amNemo)"/><path d="M700,520 L1500,320 L1500,300 L680,510Z" fill="#7ad09a"/>${[...Array(6)].map((_, k) => `<path d="M${700 + k * 140},${520 - k * 35} L${700 + k * 140},740" stroke="#1a5a3a" stroke-width="4"/>`).join('')}<rect x="1440" y="260" width="60" height="60" fill="#1f6a42"/><text x="1100" y="680" font-family="Fredoka" font-weight="700" font-size="64" text-anchor="middle" fill="#fff" letter-spacing="10">NEMO</text>`;
  for (let k = 0; k < 7; k++) s += `<rect x="${740 + k * 110}" y="${508 - k * 28}" width="110" height="10" fill="#a8e8c0"/>`;
  return s + rLabel('NEMO: un museo de ciencias con forma de barco gigante', W / 2, 140, 38);
};
scenes.am_nemo_dentro = function (t) {
  let s = AMALL() + `<rect width="${W}" height="${H}" fill="#eaf4ee"/><rect x="0" y="780" width="${W}" height="300" fill="#c8d8cc"/>`;
  const r = 60 + 30 * Math.abs(S(t, 1));
  s += `<g transform="translate(420,520)"><ellipse rx="${r * 2}" ry="${r * 1.6}" fill="#cfe8f8" opacity=".5" stroke="#8ac4e8" stroke-width="4"/><ellipse cx="-30" cy="-30" rx="${r * .5}" ry="${r * .3}" fill="#fff" opacity=".7"/></g>` + rP(420, 960, 2.2, t, AMESC({ ph: 1, child: true, top: '#ff8a2a', hold: `<g transform="translate(16,-80)"><circle r="22" fill="none" stroke="#3a3a3e" stroke-width="5"/><line x1="0" y1="22" x2="0" y2="60" stroke="#3a3a3e" stroke-width="5"/></g>` }));
  s += `<g transform="translate(980,720)"><rect x="-200" y="-40" width="400" height="80" fill="#4a8ab0"/><rect x="-20" y="-90" width="40" height="130" fill="#8a7a5a"/>${[...Array(5)].map((_, k) => `<path d="M${-180 + k * 30},-30 q10,-10 20,0" stroke="#cfe8f8" stroke-width="3" fill="none"/>`).join('')}</g>` + rP(860, 990, 2.0, t, AMESC({ ph: 3, child: true, top: '#21468b' }));
  const fl = Math.abs(S(t, 8)) > .8 ? 1 : 0;
  s += `<g transform="translate(1520,420)"><circle r="90" fill="#cfd8e8" stroke="#3a3a5a" stroke-width="6"/><path d="M-20,-60 L10,-10 L-10,0 L20,60" stroke="#f2e04a" stroke-width="${6 + fl * 6}" fill="none" opacity="${.5 + fl * .5}"/></g>` + rP(1520, 980, 2.1, t, AMESC({ ph: 5, child: true, top: '#3a8a5a', longhair: true, dir: -1 }));
  return s + rLabel('Burbujas gigantes, presas de agua y rayos', W / 2, 140, 40);
};
scenes.am_nemo_techo = function (t) {
  let s = AMALL() + rSky('day') + rClouds(t, [[400, 140, .8], [1400, 110, .6]]) + amRow(t, 640, { h: 240, seed: 31 }).replace(/<g transform="rotate/g, '<g opacity=".85" transform="rotate');
  for (let k = 0; k < 8; k++) s += `<rect x="${k * 40}" y="${660 + k * 55}" width="${W}" height="55" fill="${k % 2 ? '#d9d1c4' : '#e8e2d4'}"/>`;
  s += rSit(500, 870, 1.6, t, { mode: 'banco', ph: 1, top: '#ff8a2a' }) + rSit(800, 925, 1.8, t, { mode: 'banco', child: false, ph: 2, top: '#21468b', talk: true }) + rSit(1300, 870, 1.6, t, { mode: 'banco', ph: 3, top: '#f2c14e', longhair: true });
  return s + rLabel('Su tejado es una plaza en el cielo, con vistas a toda la ciudad', W / 2, 140, 36);
};
function frameAM(x, y, w, h, inner, gold = '#c9a04a') { return `<g transform="translate(${x},${y})"><rect x="${-w / 2 - 24}" y="${-h / 2 - 24}" width="${w + 48}" height="${h + 48}" fill="${gold}"/><rect x="${-w / 2 - 10}" y="${-h / 2 - 10}" width="${w + 20}" height="${h + 20}" fill="#8a6a2a"/><svg x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${inner}</svg></g>`; }
const nightWatch = (w, h) => `<rect width="${w}" height="${h}" fill="#2a1e14"/><ellipse cx="${w * .45}" cy="${h * .55}" rx="${w * .4}" ry="${h * .35}" fill="#5a3e22" opacity=".8"/>${[...Array(9)].map((_, k) => { const x = w * (.1 + k * .1), y = h * (.5 + (k % 3) * .06); return `<g transform="translate(${x},${y})"><rect x="-14" y="0" width="28" height="${h * .28}" fill="${k == 4 ? '#1a1a1a' : k == 5 ? '#e8d48a' : '#3a2a1e'}"/><circle cy="-6" r="11" fill="#d9a878"/><path d="M-16,-12 Q0,-30 16,-12Z" fill="#1a1a1a"/></g>`; }).join('')}<path d="M${w * .7},${h * .2} L${w * .72},${h * .7}" stroke="#8a6a2a" stroke-width="5"/><path d="M${w * .72},${h * .2} l40,10 l-40,16Z" fill="#e8c860"/><circle cx="${w * .22}" cy="${h * .82}" r="14" fill="#8a6a4a"/><ellipse cx="${w * .2}" cy="${h * .9}" rx="26" ry="12" fill="#c8a878"/>`;
const sunflowers = (w, h) => `<rect width="${w}" height="${h}" fill="#e8d870"/><rect y="${h * .7}" width="${w}" height="${h * .3}" fill="#c8a040"/><path d="M${w * .3},${h * .72} L${w * .7},${h * .72} L${w * .62},${h * .95} L${w * .38},${h * .95}Z" fill="#e8c060" stroke="#a87a20" stroke-width="4"/>${[[.35, .3], [.55, .25], [.45, .45], [.65, .45], [.28, .52], [.5, .12]].map(([a, b], k) => `<g transform="translate(${w * a},${h * b})">${[...Array(14)].map((_, j) => `<ellipse cx="${Math.cos(j * .45) * 30}" cy="${Math.sin(j * .45) * 30}" rx="16" ry="7" transform="rotate(${j * 25.7} ${Math.cos(j * .45) * 30} ${Math.sin(j * .45) * 30})" fill="#f2b020"/>`).join('')}<circle r="22" fill="#8a5a1a"/>${[...Array(8)].map((_, j) => `<circle cx="${(j % 3 - 1) * 8}" cy="${(Math.floor(j / 3) - 1) * 8}" r="3" fill="#5a3a0a"/>`).join('')}</g>`).join('')}`;
const starryNight = (w, h, t) => `<rect width="${w}" height="${h}" fill="#1f3a7a"/>${[...Array(5)].map((_, k) => `<path d="M${-40 + k * 30},${h * .3 + k * 18} Q${w * .3},${h * .1 + k * 22} ${w * .55},${h * .32 + k * 14} T${w + 40},${h * .28 + k * 10}" stroke="${['#8ab0e8', '#e8e08a', '#5a7ac8', '#cfe0f8', '#3a5aa8'][k]}" stroke-width="12" fill="none"/>`).join('')}${[[.2, .2], [.45, .15], [.75, .18], [.88, .4]].map(([a, b], k) => `<circle cx="${w * a}" cy="${h * b}" r="${18 + k * 4}" fill="#f2e04a" opacity=".9"/><circle cx="${w * a}" cy="${h * b}" r="${34 + k * 4}" fill="none" stroke="#f2e04a" stroke-width="5" opacity=".6" transform="rotate(${t / L * 360} ${w * a} ${h * b})" stroke-dasharray="20 14"/>`).join('')}<path d="M0,${h} L0,${h * .75} Q${w * .3},${h * .7} ${w * .5},${h * .8} T${w},${h * .72} L${w},${h}Z" fill="#1a2a3a"/><path d="M${w * .15},${h} Q${w * .12},${h * .5} ${w * .2},${h * .3} Q${w * .24},${h * .6} ${w * .22},${h}Z" fill="#1a2a1a"/>`;
scenes.am_cuadros = function (t) {
  let s = AMALL() + `<rect width="${W}" height="${H}" fill="#7a2a2a"/><rect x="0" y="800" width="${W}" height="280" fill="#8a6a4a"/>`;
  s += frameAM(560, 430, 640, 400, nightWatch(640, 400)) + frameAM(1380, 430, 340, 420, sunflowers(340, 420));
  return s + amPeople(t, 47, 7, 860, 1060) + rLabel('Cuadros famosísimos', W / 2, 1010, 40);
};
scenes.am_rijks = function (t) {
  let s = AMALL() + rSky('day') + rSun(1650, 130) + `<g transform="translate(960,820)"><rect x="-760" y="-420" width="1520" height="420" fill="url(#amBrick)"/>`;
  for (const x of [-600, 600]) s += `<rect x="${x - 70}" y="-620" width="140" height="620" fill="#8a3a2a"/><path d="M${x - 80},-620 L${x},-720 L${x + 80},-620Z" fill="#3a4a4a"/><rect x="${x - 6}" y="-780" width="12" height="60" fill="#c9a04a"/>`;
  for (let i = 0; i < 12; i++) s += `<rect x="${-700 + i * 120}" y="-380" width="60" height="120" fill="#2a3440" stroke="#e8e2d4" stroke-width="5"/>`;
  s += `<path d="M-180,0 L-180,-180 Q0,-280 180,-180 L180,0Z" fill="#3a2a22"/><path d="M-140,0 L-140,-160 Q0,-240 140,-160 L140,0Z" fill="#e8d8b0" opacity=".25"/><rect x="-760" y="-440" width="1520" height="30" fill="#c9a04a"/><text x="0" y="-300" font-family="Fredoka" font-weight="700" font-size="44" text-anchor="middle" fill="#f4e6c0" letter-spacing="6">RIJKSMUSEUM</text></g><rect x="0" y="820" width="${W}" height="260" fill="#9a9488"/>`;
  s += amCyclists(t, 960, 3, 1, 11);
  return s + rArrowLabel('Un pasadizo para bicis lo atraviesa', 1400, 640, 1060, 760, 30) + rLabel('El Rijksmuseum, el gran museo de Ámsterdam', W / 2, 140, 40);
};
scenes.am_ronda = function (t) {
  let s = AMALL() + `<rect width="${W}" height="${H}" fill="#6a2222"/><rect x="0" y="880" width="${W}" height="200" fill="#8a6a4a"/>`;
  s += frameAM(960, 450, 1300, 600, nightWatch(1300, 600));
  s += rP(500, 1040, 2.0, t, AMESC({ ph: 2, child: true, top: '#ff8a2a', dir: 1 })) + rP(1440, 1050, 2.4, t, AMESC({ ph: 4, top: '#21468b', dir: -1 }));
  return s + rArrowLabel('¡Un perrito!', 260, 860, 430, 720, 30) + rLabel('La Ronda de Noche, de Rembrandt: ¡ocupa una pared entera!', W / 2, 1010, 36);
};
scenes.am_vangogh = function (t) {
  let s = AMALL() + `<rect width="${W}" height="${H}" fill="#e8e2d4"/><rect x="0" y="860" width="${W}" height="220" fill="#b8a888"/>`;
  s += frameAM(560, 470, 560, 600, sunflowers(560, 600)) + frameAM(1360, 470, 720, 520, starryNight(720, 520, t));
  return s + rLabel('Vincent van Gogh: girasoles y cielos que dan vueltas', W / 2, 1010, 38);
};
scenes.am_consejo = function (t) {
  let s = AMALL() + `<rect width="${W}" height="${H}" fill="#7a2a2a"/><rect x="0" y="860" width="${W}" height="220" fill="#8a6a4a"/>` + frameAM(960, 420, 1100, 520, nightWatch(1100, 520));
  const mx = 560 + S(t, 1) * 260;
  s += `<g transform="translate(${mx},520)"><circle r="110" fill="#fff" opacity=".25" stroke="#3a3a3e" stroke-width="14"/><path d="M78,78 L170,170" stroke="#3a3a3e" stroke-width="22" stroke-linecap="round"/></g>`;
  s += rP(1500, 1040, 2.2, t, AMESC({ ph: 3, child: true, top: '#ff8a2a', dir: -1 }));
  return s + rLabel('Consejo: elige un rincón y descubre su historia', W / 2, 1010, 38);
};
scenes.am_comida = function (t) {
  let s = AMALL() + `<rect width="${W}" height="${H}" fill="#fdf3dc"/><rect x="0" y="620" width="${W}" height="460" fill="url(#rWood)"/><path d="M60,620 L1860,620 L1920,1080 L0,1080Z" fill="#fff"/>${[...Array(16)].map((_, i) => `<path d="M${60 + i * 112},620 L${60 + i * 112 + 56},620 L${i * 120 + 60},1080 L${i * 120},1080Z" fill="#ff8a2a" opacity=".22"/>`).join('')}`;
  s += cheeseWheel(400, 820, 1.1) + `<g transform="translate(960,760)"><circle r="90" fill="#d9a04a" stroke="#a8702a" stroke-width="6"/><circle r="60" fill="none" stroke="#a8702a" stroke-width="3" stroke-dasharray="12 8"/></g>` + plate(1480, 800, 180, `<rect x="-110" y="-30" width="220" height="40" rx="8" fill="#f2d4a0"/>${[...Array(30)].map((_, k) => `<rect x="${-100 + (k * 13) % 200}" y="${-30 + (k * 7) % 20}" width="10" height="4" rx="2" fill="#3a1e0e"/>`).join('')}`);
  return s + rLabel('Ámsterdam sabe a caramelo y a queso', W / 2, 140, 44);
};
scenes.am_hagelslag = function (t) {
  let s = AMALL() + `<rect width="${W}" height="${H}" fill="#fdf3dc"/><rect x="0" y="640" width="${W}" height="440" fill="url(#rWood)"/>`;
  s += plate(960, 820, 360, `<rect x="-220" y="-70" width="440" height="90" rx="20" fill="#e8c890"/><rect x="-206" y="-64" width="412" height="70" rx="16" fill="#f8e8b0"/>`);
  const p = (t / L * 2) % 1;
  for (let k = 0; k < 60; k++) { const x = 760 + (k * 37) % 400, y0 = 300 + (k * 53) % 200, y = Math.min(790, y0 + p * 500 + (k % 7) * 20); s += `<rect x="${x}" y="${y}" width="16" height="5" rx="2.5" fill="#3a1e0e" transform="rotate(${k * 37} ${x} ${y})"/>`; }
  s += `<g transform="translate(1520,600)"><rect x="-60" y="-160" width="120" height="160" rx="10" fill="#fff" stroke="#2b3a67" stroke-width="4"/><rect x="-60" y="-110" width="120" height="60" fill="#5a2e1a"/><text y="-72" font-family="Fredoka" font-weight="700" font-size="22" text-anchor="middle" fill="#fff">HAGELSLAG</text></g>`;
  return s + rLabel('Pan con mantequilla y «lluvia» de chocolate: el hagelslag', W / 2, 140, 38);
};
scenes.am_stroopwafel = function (t) {
  const stretch = Math.max(0, S(t, 1)) * 40;
  let s = AMALL() + `<rect width="${W}" height="${H}" fill="#fdf3dc"/><rect x="0" y="660" width="${W}" height="420" fill="url(#rWood)"/>`;
  s += `<g transform="translate(700,760)">${rShadow(0, 60, 160, .25)}<ellipse cx="0" cy="60" rx="170" ry="34" fill="#fbfbf7"/><path d="M-110,-80 L110,-80 L90,50 Q0,70 -90,50Z" fill="#fbfbf7"/><ellipse cx="0" cy="-80" rx="110" ry="24" fill="#6a3a1a"/>${steam(0, -110, t, 3)}<ellipse cx="0" cy="-96" rx="130" ry="26" fill="#d9a04a" stroke="#a8702a" stroke-width="4"/>${[...Array(8)].map((_, k) => `<line x1="${-110 + k * 30}" y1="-112" x2="${-90 + k * 30}" y2="-80" stroke="#a8702a" stroke-width="2"/>`).join('')}</g>`;
  s += `<g transform="translate(1320,720)"><path d="M-160,0 L160,0" stroke="#d9a04a" stroke-width="40" stroke-linecap="round"/><path d="M-150,${-30 - stretch} Q0,${-60 - stretch} 150,-30" stroke="#d9a04a" stroke-width="36" fill="none" stroke-linecap="round"/><path d="M-120,-10 Q0,${-20 - stretch / 2} 120,-10" stroke="#a8601a" stroke-width="12" fill="none"/></g>`;
  return s + rLabel('Stroopwafel: dos galletas con caramelo… ¡encima de la taza!', W / 2, 140, 36);
};
scenes.am_poffertjes = function (t) {
  let s = AMALL() + `<rect width="${W}" height="${H}" fill="#fdf3dc"/><rect x="0" y="660" width="${W}" height="420" fill="url(#rWood)"/>`;
  s += `<g transform="translate(560,800)"><ellipse rx="300" ry="90" fill="#3a3a3e"/><ellipse cy="-10" rx="280" ry="80" fill="#4a4a4e"/>${[...Array(12)].map((_, k) => `<ellipse cx="${-200 + (k % 6) * 80}" cy="${-30 + Math.floor(k / 6) * 50}" rx="30" ry="16" fill="#2a2a2e"/><circle cx="${-200 + (k % 6) * 80}" cy="${-36 + Math.floor(k / 6) * 50}" r="20" fill="#e8b45a"/>`).join('')}<rect x="270" y="-20" width="200" height="22" rx="10" fill="#2a2a2e"/></g>`;
  s += plate(1380, 820, 220, `${[...Array(12)].map((_, k) => `<circle cx="${-100 + (k * 37) % 200}" cy="${-30 + (k * 23) % 40}" r="24" fill="#e8b45a"/>`).join('')}<rect x="-30" y="-50" width="60" height="16" fill="#fff8d0"/>${[...Array(40)].map((_, k) => `<circle cx="${-110 + (k * 29) % 220}" cy="${-46 + (k * 17) % 46}" r="2.5" fill="#fff"/>`).join('')}`);
  return s + rLabel('Poffertjes: tortitas mini con mantequilla y azúcar glas', W / 2, 140, 38);
};
scenes.am_queso = function (t) {
  let s = AMALL() + rSky('day') + amRow(t, 560, { h: 340, seed: 37 }) + `<rect x="0" y="560" width="${W}" height="520" fill="#9a9488"/>`;
  s += `<rect x="200" y="700" width="1520" height="40" fill="#8a5a3a"/><rect x="200" y="740" width="1520" height="200" fill="#6b4a36"/><path d="M180,560 L1740,560 L1700,620 L220,620Z" fill="#c8102e"/>${[...Array(14)].map((_, i) => `<path d="M${220 + i * 108},620 q54,24 108,0" fill="${i % 2 ? '#fff' : '#c8102e'}"/>`).join('')}`;
  const wheels = [[360, '#f2b84a'], [560, '#ff8a2a'], [760, '#f2b84a'], [1160, '#f8d070'], [1360, '#ff8a2a'], [1560, '#f2b84a']];
  for (const [x, c] of wheels) s += cheeseWheel(x, 700, .9, c) + cheeseWheel(x, 650, .9, c);
  s += rP(960, 700, 2.0, t, AMESC({ ph: 2, top: '#fff', hold: `<g transform="translate(18,-76)"><rect x="-2" y="-30" width="3" height="30" fill="#8a6a46"/><rect x="0" y="-30" width="14" height="10" fill="#ae1c28"/><rect x="-6" y="0" width="14" height="12" fill="#f2b84a"/></g>` }));
  return s + rArrowLabel('Gouda', 260, 480, 360, 610, 30) + rArrowLabel('Edam', 1660, 480, 1560, 610, 30) + rLabel('Ruedas gigantes de queso en el mercado', W / 2, 1010, 40);
};
scenes.am_tulipanes = function (t) {
  let s = AMALL() + rSky('day') + rSun(1650, 140) + rClouds(t, [[400, 120, .8]]) + tulipField(t, 560, 1080) + windmill(1500, 600, .8, t) + windmill(300, 590, .5, t);
  return s + rLabel('Primavera: campos de tulipanes como un arcoíris tumbado', W / 2, 140, 38);
};
scenes.am_keukenhof = function (t) {
  let s = AMALL() + rSky('day') + `<rect x="0" y="520" width="${W}" height="560" fill="url(#amField)"/>` + [...Array(6)].map((_, i) => rTree(100 + i * 360, 560, .6, 'green', t, 210 + i)).join('') + windmill(1640, 600, .55, t);
  s += `<path d="M700,1080 Q900,800 960,560 Q1020,800 1220,1080Z" fill="#d9ccb0"/>`;
  const cols = ['#e8352a', '#f2c14e', '#ff7ab0', '#8a3ac8', '#ff8a2a', '#fff'];
  for (let r = 0; r < 6; r++) for (let i = 0; i < 18; i++) { const side = i < 9 ? -1 : 1, k = i % 9, x = 960 + side * (120 + k * 90 + r * 30), y = 620 + r * 80; if (x < 0 || x > W) continue; s += tulip(x, y, .5 + r * .12, cols[(Math.floor(k / 2) + r) % 6], t, i + r); }
  s += rP(960, 960, 2.0, t, { ph: 1, child: true, top: '#ff8a2a' }) + rP(1060, 1010, 2.2, t, { ph: 2, top: '#21468b', longhair: true });
  return s + rLabel('Keukenhof: millones de tulipanes cada primavera', W / 2, 140, 40);
};
scenes.am_bloemenmarkt = function (t) {
  let s = AMALL() + rSky('day') + amRow(t, 520, { h: 320, seed: 41 }) + amCanal(t, 520, 120) + `<rect x="0" y="640" width="${W}" height="440" fill="#9a9488"/>`;
  for (let i = 0; i < 4; i++) { const x = 200 + i * 440; s += `<g transform="translate(${x},680)"><rect x="0" y="-160" width="400" height="160" fill="#2f4a3a"/><path d="M-10,-160 L200,-220 L410,-160Z" fill="#e8e2d4"/>${[...Array(3)].map((_, r) => [...Array(8)].map((_, c) => `<circle cx="${28 + c * 48}" cy="${-130 + r * 40}" r="14" fill="${['#e8352a', '#f2c14e', '#ff7ab0', '#8a3ac8', '#ff8a2a'][(c + r + i) % 5]}"/>`).join('')).join('')}</g>`; }
  s += amPeople(t, 53, 10, 720, 1070);
  return s + rLabel('El mercado de flores flota sobre un canal', W / 2, 1010, 40);
};
scenes.am_vondelpark = function (t) {
  let s = AMALL() + rSky('day') + rSun(1650, 130) + `<rect x="0" y="540" width="${W}" height="540" fill="url(#amField)"/>` + [...Array(7)].map((_, i) => rTree(80 + i * 300, 600, .75, 'green', t, 230 + i)).join('');
  s += `<ellipse cx="1300" cy="760" rx="420" ry="90" fill="#4a8ab0"/>${[0, 1].map(k => `<g transform="translate(${1200 + k * 200 + S(t, 1, k) * 40},750)"><ellipse rx="40" ry="16" fill="#fff"/><path d="M30,-6 Q46,-50 30,-60" stroke="#fff" stroke-width="10" fill="none"/><path d="M30,-60 l12,4" stroke="#f2a12a" stroke-width="6"/></g>`).join('')}`;
  s += `<rect x="300" y="900" width="420" height="140" fill="#ae1c28"/>${[...Array(5)].map((_, k) => `<rect x="${300 + k * 84}" y="900" width="42" height="140" fill="#fff" opacity=".8"/>`).join('')}` + rSit(400, 930, 1.6, t, { ph: 1, top: '#ff8a2a' }) + rSit(620, 930, 1.9, t, { ph: 2, top: '#21468b', child: false, talk: true });
  s += amCyclists(t, 640, 2, 1, 19);
  return s + rLabel('Vondelpark: patos, cisnes, bicis y picnic', W / 2, 140, 40);
};
scenes.am_tulipan_amarillo = function (t) {
  let s = AMALL() + rSky('day') + rSun(960, 300, 90) + `<rect x="0" y="760" width="${W}" height="320" fill="url(#amField)"/>`;
  s += `<g transform="translate(960,1000) scale(3.2)">${tulip(0, 0, 1, '#f2c14e', t, 1)}</g>`;
  return s + rLabel('El tulipán amarillo: un trocito de sol con tallo', W / 2, 1010, 40);
};
scenes.am_secretos = function (t) {
  let s = AMALL() + rSky('dusk') + amRow(t, 620, { tilt: true, h: 380, seed: 44 }) + amQuay(620, 40) + amCanal(t, 660, 420) + `<rect width="${W}" height="${H}" fill="#2b3a67" opacity=".35"/>`;
  return s + `<g transform="translate(960,420)"><rect x="-520" y="-150" width="1040" height="300" rx="36" fill="#fffaf0" stroke="#ff8a2a" stroke-width="8"/><text y="-40" font-family="Fredoka" font-weight="600" font-size="44" text-anchor="middle" fill="#ff8a2a">Secretos de exploradora</text><text y="70" font-family="Fredoka" font-weight="700" font-size="90" text-anchor="middle" fill="#2b3a67">1 · 2 · 3</text></g>`;
};
scenes.am_anafrank = function (t) {
  let s = AMALL() + rSky('day') + amRow(t, 700, { h: 460, seed: 47 }) + grachtenpand(820, 700, 280, 560, { col: '#3a3a3e', gable: 'cuello' }) + amQuay(700, 40) + amCanal(t, 740, 340);
  s += amTree(140, 740, .8, t, 251) + amTree(1780, 740, .8, t, 252);
  s += `<g transform="translate(1440,300)"><rect x="-150" y="-110" width="300" height="220" rx="10" fill="#c8323a" stroke="#8a1a22" stroke-width="6"/><rect x="-150" y="-110" width="300" height="70" fill="#fff" opacity=".9"/>${[...Array(4)].map((_, k) => `<rect x="-130" y="${-30 + k * 30}" width="${200 - k * 30}" height="6" fill="#fff" opacity=".6"/>`).join('')}<rect x="-150" y="-110" width="300" height="220" rx="10" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="10 10"/></g>`;
  return s + rLabel('La casa de Ana Frank: hoy un museo', W / 2, 1010, 40) + rArrowLabel('Su diario', 1180, 470, 1320, 380, 30);
};
scenes.am_casa_estrecha = function (t) {
  let s = AMALL() + rSky('day') + grachtenpand(420, 900, 420, 640, { col: '#7a2e22', gable: 'escalon' }) + `<g>${grachtenpand(850, 900, 110, 560, { col: '#e8e2d4', gable: 'campana' })}</g>` + grachtenpand(970, 900, 440, 620, { col: '#3a3a3e', gable: 'cuello' }) + `<rect x="0" y="900" width="${W}" height="180" fill="#9a9488"/>`;
  s += `<path d="M850,940 L960,940 M850,930 v20 M960,930 v20" stroke="#c8323a" stroke-width="5"/>` + rP(700, 1050, 2.4, t, AMESC({ ph: 2, child: true, top: '#ff8a2a', wave: true })) + rP(1200, 1060, 2.6, t, AMESC({ ph: 4, top: '#21468b', dir: -1 }));
  return s + rArrowLabel('¡Poco más que un paso!', 1500, 300, 940, 500, 30) + rLabel('Una casa tan estrecha que parece una puerta', W / 2, 140, 40);
};
scenes.am_begijnhof = function (t) {
  let s = AMALL() + rSky('day') + `<rect x="0" y="600" width="${W}" height="480" fill="url(#amField)"/>`;
  for (let i = 0; i < 7; i++) s += grachtenpand(-20 + i * 280, 640, 260, 300 + (i % 3) * 40, { col: ['#e8e2d4', '#d9cfb8', '#3a3a3e', '#e8e2d4', '#7a2e22', '#d9cfb8', '#e8e2d4'][i], gable: ['campana', 'cuello', 'escalon'][i % 3] });
  s += `<g transform="translate(960,620)"><rect x="-120" y="-220" width="240" height="220" fill="#e8e2d4"/><path d="M-130,-220 L0,-320 L130,-220Z" fill="#5a4a3a"/><rect x="-20" y="-380" width="40" height="70" fill="#e8e2d4"/><path d="M-26,-380 L0,-430 L26,-380Z" fill="#3a3a3e"/><rect x="-40" y="-110" width="80" height="110" rx="40" fill="#5a3a22"/></g>`;
  for (let i = 0; i < 5; i++) s += `<g transform="translate(${300 + i * 330 + ((t / L * 300 + i * 90) % 200)},${300 + (i % 2) * 60 + S(t, 2, i) * 10})"><path d="M-14,0 q14,-10 28,0 q-14,6 -28,0Z" fill="#3a3a3e"/></g>`;
  s += amTree(300, 760, .9, t, 261) + amTree(1620, 760, .9, t, 262) + banco(960, 900, 1.2) + rSit(910, 892, 1.2, t, { mode: 'banco', child: false, ph: 3, top: '#7a5a8a', longhair: true, hair: '#d9d6d0' });
  return s + rLabel('El Begijnhof: un jardín secreto lleno de silencio', W / 2, 140, 40);
};
scenes.am_pregunta = function (t) {
  let s = AMALL() + `<rect width="${W}" height="${H}" fill="#2b3a67"/>` + [...Array(14)].map((_, i) => `<text x="${(i * 157) % W}" y="${((i * 97) + t / L * 300) % H}" font-family="Fredoka" font-weight="700" font-size="${60 + (i % 3) * 20}" fill="#ff8a2a" opacity=".3">?</text>`).join('');
  s += `<g transform="translate(960,260)"><rect x="-640" y="-90" width="1280" height="180" rx="36" fill="#fff"/><text y="20" font-family="Fredoka" font-weight="700" font-size="56" text-anchor="middle" fill="#2b3a67">Si vinierais a Ámsterdam, ¿qué haríais primero?</text></g>`;
  const opt = (x, txt, inner) => `<g transform="translate(${x},680)"><rect x="-260" y="-200" width="520" height="400" rx="30" fill="#fff" stroke="#ff8a2a" stroke-width="6"/>${inner}<text y="160" font-family="Fredoka" font-weight="700" font-size="34" text-anchor="middle" fill="#2b3a67">${txt}</text></g>`;
  s += opt(360, 'Dormir en un barco-casa', `<g transform="translate(0,40) scale(.7)">${houseboat(0, 0, 1, '#2f6a4a', t)}</g>`) + opt(960, 'Desayunar hagelslag', `<g transform="translate(0,30)"><rect x="-150" y="-40" width="300" height="70" rx="16" fill="#f8e8b0"/>${[...Array(30)].map((_, k) => `<rect x="${-140 + (k * 19) % 280}" y="${-36 + (k * 7) % 50}" width="10" height="4" rx="2" fill="#3a1e0e"/>`).join('')}</g>`) + opt(1560, 'Buscar la casa-puerta', `<g transform="translate(0,90) scale(.4)">${grachtenpand(-55, 0, 110, 400, { col: '#e8e2d4', gable: 'campana' })}</g>`);
  return s;
};
scenes.am_despedida = function (t) {
  let s = AMALL() + rSky('dusk') + rSun(1500, 420, 70) + amRow(t, 640, { tilt: true, h: 400, seed: 51 }) + amQuay(640, 40) + amCanal(t, 680, 400) + houseboat(1400, 920, 1, '#2f4a6a', t);
  return s + `<g transform="translate(${W / 2},${H / 2 - 260}) scale(${1 + S(t, 2) * .01})"><rect x="-620" y="-150" width="1240" height="300" rx="40" fill="#fff" opacity=".95" stroke="#2b3a67" stroke-width="6"/><text x="0" y="-20" font-family="Fredoka" font-weight="700" font-size="100" text-anchor="middle" fill="#ff8a2a" stroke="#2b3a67" stroke-width="2" paint-order="stroke">¡Doei, Ámsterdam!</text><text x="0" y="90" font-family="Fredoka" font-weight="600" font-size="48" text-anchor="middle" fill="#2b3a67">¡Gracias, Sanne!</text></g>`;
};
scenes.am_resumen = function (t) {
  const card = (i, inner, label) => { const x = 140 + i * 430, r = (i - 1.5) * 3; return `<g transform="translate(${x},${360 + (i % 2) * 70}) rotate(${r})"><rect x="-4" y="-2" width="380" height="440" fill="#000" opacity=".25"/><rect x="-12" y="-12" width="380" height="440" fill="#fff"/><circle cx="178" cy="-4" r="12" fill="#e8352a"/><svg x="0" y="0" width="356" height="330" viewBox="0 0 356 330">${inner}</svg><text x="178" y="390" font-family="Fredoka" font-weight="700" font-size="34" text-anchor="middle" fill="#2b3a67">${label}</text></g>`; };
  let s = AMALL() + `<rect width="${W}" height="${H}" fill="#b9895a"/><rect x="30" y="30" width="${W - 60}" height="${H - 60}" fill="none" stroke="#7a5232" stroke-width="30"/>`;
  s += card(0, `<rect width="356" height="330" fill="#9ad0f0"/>${grachtenpand(20, 330, 100, 260, { col: '#7a2e22', tilt: -3 })}${grachtenpand(130, 330, 100, 280, { col: '#e8e2d4', tilt: 2 })}${grachtenpand(240, 330, 100, 250, { col: '#3a3a3e', tilt: -2 })}`, 'Casas que bailan');
  s += card(1, `<rect width="356" height="330" fill="#9ad0f0"/><rect y="200" width="356" height="130" fill="url(#amWater)"/><g transform="translate(178,270) scale(.6)">${houseboat(0, 0, 1, '#2f6a4a', t)}</g>`, 'Barcos-casa');
  s += card(2, `<rect width="356" height="330" fill="#9ad0f0"/><rect y="200" width="356" height="130" fill="#5a8a3a"/>${[...Array(10)].map((_, k) => tulip(20 + k * 34, 320, .7, ['#e8352a', '#f2c14e', '#ff7ab0'][k % 3], t, k)).join('')}`, 'Tulipanes');
  s += card(3, `<rect width="356" height="330" fill="#fdf3dc"/><rect x="60" y="130" width="240" height="70" rx="16" fill="#f8e8b0"/>${[...Array(30)].map((_, k) => `<rect x="${70 + (k * 19) % 220}" y="${134 + (k * 7) % 56}" width="10" height="4" rx="2" fill="#3a1e0e"/>`).join('')}`, 'Lluvia de chocolate');
  return s + rLabel('Hoy hemos visto…', W / 2, 140, 44);
};
scenes.am_cuaderno = function (t) {
  let s = AMALL() + `<rect width="${W}" height="${H}" fill="#f4e6cc"/><rect x="0" y="760" width="${W}" height="320" fill="url(#rWood)"/>`;
  s += `<g transform="translate(960,640) rotate(-3)">${rShadow(0, 120, 560, .3)}<rect x="-560" y="-400" width="1120" height="520" rx="20" fill="#fffaf0" stroke="#c9a468" stroke-width="6"/><line x1="0" y1="-400" x2="0" y2="120" stroke="#c9a468" stroke-width="6"/>${[...Array(8)].map((_, k) => `<line x1="-520" y1="${-320 + k * 56}" x2="-40" y2="${-320 + k * 56}" stroke="#e8dcc0" stroke-width="3"/><line x1="40" y1="${-320 + k * 56}" x2="520" y2="${-320 + k * 56}" stroke="#e8dcc0" stroke-width="3"/>`).join('')}
  <g transform="translate(-280,-40)" stroke="#2b3a67" stroke-width="7" fill="none" stroke-linecap="round"><circle cx="-80" cy="20" r="50"/><circle cx="80" cy="20" r="50"/><path d="M-80,20 L-20,-60 L50,-60 L80,20 M-20,-60 L0,20 L50,-60 M-30,-80 h30"/><path d="M-200,110 q50,-14 100,0 t100,0 t100,0 t100,0" stroke="#3a7ab0"/></g>
  <g transform="translate(260,60) scale(.45)">${grachtenpand(-90, 0, 180, 500, { col: '#fffaf0', gable: 'escalon', tilt: -3 }).replace(/fill="#fffaf0"/g, 'fill="none" stroke="#2b3a67" stroke-width="6"')}</g></g>`;
  s += `<g transform="translate(1420,840) rotate(-30)"><rect x="-10" y="-120" width="20" height="200" fill="#ff8a2a"/><path d="M-10,80 L0,110 L10,80Z" fill="#2b3a67"/></g>`;
  return s + rLabel('Dibujen una bici junto a un canal, una casa inclinada o un barco-casa', W / 2, 140, 34);
};
scenes.am_atardecer = function (t) {
  let s = AMALL() + rSky('dusk') + rSun(1500, 420, 80) + amRow(t, 640, { tilt: true, h: 400, seed: 57 }).replace(/<g transform="rotate/g, '<g opacity=".92" transform="rotate') + amQuay(640, 40) + amCanal(t, 680, 400);
  for (let i = 0; i < 12; i++) s += `<rect x="${i * 170 + 40}" y="${380 + (i % 4) * 60}" width="30" height="40" fill="#fff4c2" opacity="${.5 + .5 * Math.abs(S(t, 1, i))}"/>`;
  return s + amCyclists(t, 660, 2, 1, 23);
};
