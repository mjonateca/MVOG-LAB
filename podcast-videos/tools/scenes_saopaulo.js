/* =====================================================================
   Mi Pequeño Atlas — Capítulo 8: São Paulo. Escenas realistas.
   (usa helpers de scenes_madrid.js / scenes_sd.js / scenes_berlin.js / scenes_ottawa.js)
   ===================================================================== */
const SPD = `<defs>
<linearGradient id="spGlass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#9ac0d8"/><stop offset=".5" stop-color="#5a88a8"/><stop offset="1" stop-color="#3a6080"/></linearGradient>
<linearGradient id="spConc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cfcac0"/><stop offset="1" stop-color="#a8a298"/></linearGradient>
<linearGradient id="spHaze" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9ab8d0"/><stop offset="1" stop-color="#d8e4ec"/></linearGradient>
</defs>`;
const SPALL = () => D() + MA + SDD + BED + OTD + SPD;

/* ---------- piezas ---------- */
function brFlag(x, y, s = 1) { return `<g transform="translate(${x},${y}) scale(${s})"><line x1="0" y1="0" x2="0" y2="130" stroke="#555" stroke-width="4"/><rect x="0" y="0" width="96" height="66" fill="#009c3b"/><path d="M48,6 L90,33 L48,60 L6,33Z" fill="#ffdf00"/><circle cx="48" cy="33" r="15" fill="#002776"/><path d="M34,30 Q48,26 62,34" stroke="#fff" stroke-width="3" fill="none"/></g>`; }
function tower(x, base, w, h, col, seed = 1, o = {}) {
  const R = rng(seed); let s = `<rect x="${x}" y="${base - h}" width="${w}" height="${h}" fill="${col}"/><rect x="${x + w - w * .18}" y="${base - h}" width="${w * .18}" height="${h}" fill="#000" opacity=".1"/>`;
  const rows = Math.floor(h / 26), cols = Math.max(2, Math.floor(w / 22));
  for (let r = 1; r < rows; r++) for (let c = 0; c < cols; c++) if (R() > .15) s += `<rect x="${x + 5 + c * (w - 10) / cols}" y="${base - h + r * 26}" width="${(w - 10) / cols - 5}" height="14" fill="${o.night ? (R() > .5 ? '#ffd86a' : '#3a4050') : (R() > .3 ? '#a8c4d8' : '#7894a8')}"/>`;
  if (o.antenna) s += `<line x1="${x + w / 2}" y1="${base - h}" x2="${x + w / 2}" y2="${base - h - 60}" stroke="#666" stroke-width="4"/><circle cx="${x + w / 2}" cy="${base - h - 62}" r="5" fill="#e8352a"/>`;
  return s;
}
function skyline(base, t, seed = 7, n = 28, o = {}) { const R = rng(seed); let s = ''; for (let i = 0; i < n; i++) { const w = 60 + R() * 90, h = 160 + R() * 420, x = i * (W / n) - 30 + R() * 30; s += tower(x, base, w, h, ['#c8c4bc', '#b8b4ac', '#d8d2c8', '#a8a49c', '#bcc4cc'][i % 5], seed + i, { antenna: R() > .7, night: o.night }); } return s; }
function masp(cx, base, s = 1) {
  return `<g transform="translate(${cx},${base}) scale(${s})"><rect x="-520" y="-6" width="1040" height="6" fill="#9a958c"/>
  ${[-470, 470].map(x => `<rect x="${x - 26}" y="-420" width="52" height="420" fill="#d62a1e"/><rect x="${x - 26}" y="-420" width="12" height="420" fill="#000" opacity=".12"/>`).join('')}
  <rect x="-500" y="-440" width="1000" height="40" fill="#d62a1e"/><rect x="-500" y="-260" width="1000" height="34" fill="#d62a1e"/>
  <rect x="-440" y="-400" width="880" height="140" fill="url(#spGlass)"/>${[...Array(16)].map((_, i) => `<line x1="${-440 + i * 55}" y1="-400" x2="${-440 + i * 55}" y2="-260" stroke="#2a3a48" stroke-width="3"/>`).join('')}<line x1="-440" y1="-330" x2="440" y2="-330" stroke="#2a3a48" stroke-width="3"/>
  <rect x="-440" y="-400" width="880" height="140" fill="#fff" opacity=".08"/><text x="0" y="-180" font-family="Fredoka" font-weight="700" font-size="40" text-anchor="middle" fill="#d62a1e" opacity=".0">MASP</text></g>`;
}
function catedralSe(cx, base, s = 1) {
  const spire = x => `<g transform="translate(${x},0)"><rect x="-50" y="-560" width="100" height="560" fill="#9a958c"/><rect x="-50" y="-560" width="16" height="560" fill="#000" opacity=".08"/>${[0, 1, 2].map(k => `<path d="M-22,${-500 + k * 140} L-22,${-440 + k * 140} Q0,${-470 + k * 140} 22,${-440 + k * 140} L22,${-500 + k * 140} Q0,${-530 + k * 140} -22,${-500 + k * 140}Z" fill="#3a3a44"/>`).join('')}<path d="M-56,-560 L0,-820 L56,-560Z" fill="#7a8a78"/><line x1="0" y1="-820" x2="0" y2="-870" stroke="#555" stroke-width="5"/><path d="M-14,-856 h28 M0,-870 v30" stroke="#555" stroke-width="5"/></g>`;
  return `<g transform="translate(${cx},${base}) scale(${s})"><rect x="-300" y="-380" width="600" height="380" fill="#a8a298"/>${spire(-250)}${spire(250)}
  <path d="M-200,0 L-200,-260 Q0,-420 200,-260 L200,0Z" fill="#8a857c"/><circle cx="0" cy="-300" r="70" fill="#5a6a7a" stroke="#c9c4ba" stroke-width="12"/>${[...Array(8)].map((_, k) => `<line x1="0" y1="-300" x2="${Math.cos(k * .785) * 70}" y2="${-300 + Math.sin(k * .785) * 70}" stroke="#c9c4ba" stroke-width="4"/>`).join('')}
  <path d="M-90,0 L-90,-150 Q0,-230 90,-150 L90,0Z" fill="#3a2a22"/><path d="M-120,-380 Q0,-640 120,-380Z" fill="#6a9a7a"/><rect x="-8" y="-660" width="16" height="70" fill="#5a6a5a"/></g>`;
}
function ibirapueraLake(t, y0 = 560) { return `<rect x="0" y="${y0}" width="${W}" height="260" fill="url(#beRiver)"/>${[...Array(14)].map((_, i) => `<path d="M${(i * 157 + t / L * 80) % W},${y0 + 20 + (i * 37) % 220} q30,-6 60,0" stroke="#cfe2f0" stroke-width="3" fill="none" opacity=".6"/>`).join('')}`; }
function fountain(x, y, t, s = 1) { return `<g transform="translate(${x},${y}) scale(${s})">${[...Array(9)].map((_, k) => { const a = (k - 4) * .18, h = 200 + 60 * Math.abs(S(t, 2, k)); return `<path d="M0,0 Q${Math.sin(a) * h * .6},${-h} ${Math.sin(a) * h * 1.2},${-h * .2}" stroke="#e0f4ff" stroke-width="6" fill="none" opacity=".8"/>`; }).join('')}<ellipse cx="0" cy="0" rx="90" ry="16" fill="#e0f4ff" opacity=".7"/></g>`; }
function duck(x, y, s = 1, t = 0, ph = 0) { return `<g transform="translate(${x + S(t, 1, ph) * 20},${y + S(t, 4, ph) * 2}) scale(${s})"><ellipse cx="0" cy="0" rx="26" ry="14" fill="#f4f0e4"/><circle cx="20" cy="-14" r="10" fill="#3a7a4a"/><path d="M28,-14 l12,3 l-12,3Z" fill="#f2a92a"/><circle cx="23" cy="-16" r="2" fill="#111"/></g>`; }
function graffitiWall(x0, x1, base, h, seed = 3, t = 0) {
  const R = rng(seed), cols = ['#ff3a6a', '#ffd23a', '#3ad0ff', '#6aff6a', '#b86aff', '#ff8a2a', '#2a6aff', '#ff5acd'];
  let s = `<rect x="${x0}" y="${base - h}" width="${x1 - x0}" height="${h}" fill="#5a5a6a"/>`;
  for (let x = x0; x < x1; x += 120) { const c = cols[Math.floor(R() * 8)], c2 = cols[Math.floor(R() * 8)], c3 = cols[Math.floor(R() * 8)];
    s += `<rect x="${x}" y="${base - h}" width="122" height="${h}" fill="${c}" opacity=".9"/><circle cx="${x + 60}" cy="${base - h * (.3 + R() * .4)}" r="${30 + R() * 30}" fill="${c2}"/><path d="M${x + 10},${base - 40} q30,-${40 + R() * 60} 60,0 t60,0" stroke="${c3}" stroke-width="10" fill="none"/>`;
    if (R() > .5) s += `<g transform="translate(${x + 60},${base - h * .55})"><circle r="26" fill="#fff"/><circle cx="-9" cy="-5" r="5" fill="#111"/><circle cx="9" cy="-5" r="5" fill="#111"/><path d="M-12,8 q12,10 24,0" stroke="#111" stroke-width="4" fill="none"/></g>`;
    if (R() > .6) s += `<path d="M${x + 20},${base - h + 30} l20,30 l20,-30 l20,30 l20,-30" stroke="#fff" stroke-width="6" fill="none"/>`; }
  return s;
}
function liberdadeLamp(x, y, s = 1) { return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-5" y="0" width="10" height="320" fill="#c8102e"/>${[-1, 0, 1].map(k => `<g transform="translate(${k * 36},${k ? 26 : 0})"><path d="M0,0 v-8" stroke="#c8102e" stroke-width="4"/><circle cx="0" cy="-26" r="22" fill="#fff4dc" stroke="#c8102e" stroke-width="5"/></g>`).join('')}<path d="M-50,-4 h100" stroke="#c8102e" stroke-width="6"/></g>`; }
function lantern(x, y, s = 1, t = 0, ph = 0) { return `<g transform="translate(${x},${y}) rotate(${S(t, 1, ph) * 4}) scale(${s})"><line x1="0" y1="-30" x2="0" y2="0" stroke="#333" stroke-width="2"/><ellipse cx="0" cy="30" rx="26" ry="34" fill="#e8302a"/><rect x="-14" y="-6" width="28" height="8" fill="#222"/><rect x="-14" y="58" width="28" height="8" fill="#222"/>${[0, 1, 2].map(k => `<path d="M-24,${16 + k * 14} q24,6 48,0" stroke="#b81a14" stroke-width="2" fill="none"/>`).join('')}</g>`; }
function ferrisWheel(cx, base, s = 1, t = 0) {
  const a0 = t / L * TAU * .2; let o = `<g transform="translate(${cx},${base}) scale(${s})"><path d="M-160,0 L0,-440 L160,0" stroke="#6a7a8a" stroke-width="22" fill="none"/><circle cx="0" cy="-440" r="380" fill="none" stroke="#e8ecef" stroke-width="16"/><circle cx="0" cy="-440" r="360" fill="none" stroke="#b8c0c8" stroke-width="4"/>`;
  for (let k = 0; k < 24; k++) { const a = a0 + k * TAU / 24; o += `<line x1="0" y1="-440" x2="${Math.cos(a) * 380}" y2="${-440 + Math.sin(a) * 380}" stroke="#b8c0c8" stroke-width="3"/><g transform="translate(${Math.cos(a) * 380},${-440 + Math.sin(a) * 380})"><rect x="-22" y="-4" width="44" height="40" rx="12" fill="${['#e8352a', '#2f7ad0', '#ffce00', '#3aa65a'][k % 4]}"/><rect x="-16" y="4" width="32" height="16" rx="5" fill="#cfe8f8"/></g>`; }
  return o + `<circle cx="0" cy="-440" r="30" fill="#6a7a8a"/></g>`;
}

/* ---------- escenas ---------- */
scenes.sp_intro = function (t) {
  let s = SPALL() + rSky('day') + rSun(1650, 150) + rClouds(t, [[300, 120, .8], [1200, 90, .6]]) + skyline(860, t, 11, 26) + street(860) + maCrowd(t, 3, 14, 900, 1060);
  return s + `<g transform="translate(${W / 2},${H / 2 - 260})"><rect x="-560" y="-150" width="1120" height="300" rx="40" fill="#fff" opacity=".95" stroke="#2b3a67" stroke-width="6"/>
  <text x="0" y="-30" font-family="Fredoka" font-weight="700" font-size="104" text-anchor="middle" fill="#ffcc2e" stroke="#2b3a67" stroke-width="6" paint-order="stroke">Mi Pequeño Atlas</text>
  <rect x="-360" y="20" width="720" height="96" rx="22" fill="#009c3b"/><text x="0" y="88" font-family="Fredoka" font-weight="700" font-size="60" text-anchor="middle" fill="#ffdf00">Capítulo 8: São Paulo</text></g>`;
};
scenes.sp_mar = function (t) {
  let s = SPALL() + `<rect width="${W}" height="${H}" fill="url(#spHaze)"/>`;
  for (let r = 0; r < 4; r++) s += skyline(520 + r * 180, t, 20 + r, 30 + r * 4);
  return s + rLabel('Una ciudad enorme: ¡un mar de edificios!', W / 2, 80, 44);
};
scenes.sp_mapa = function (t) {
  let s = SPALL() + `<rect width="${W}" height="${H}" fill="#7fb6dc"/>`;
  s += `<path d="M700,120 L900,90 L1080,160 L1260,200 L1400,300 L1440,420 L1380,520 L1320,600 L1240,680 L1160,760 L1060,860 L980,960 L920,1040 L860,1000 L820,900 L780,780 L700,700 L620,600 L560,480 L560,360 L620,240Z" fill="#cfe2b8" stroke="#8aa87a" stroke-width="4"/>
  <path d="M760,180 L960,150 L1120,200 L1260,240 L1380,320 L1400,420 L1340,520 L1260,600 L1180,640 L1080,640 L980,600 L900,520 L820,440 L760,360 L720,260Z" fill="#f2d98a" stroke="#2b3a67" stroke-width="6" stroke-linejoin="round"/>
  <text x="1060" y="420" font-family="Fredoka" font-weight="700" font-size="64" text-anchor="middle" fill="#009c3b">BRASIL</text><text x="720" y="820" font-family="Fredoka" font-weight="700" font-size="40" fill="#5a7a4a" opacity=".8">AMÉRICA DEL SUR</text>`;
  const p = 1 + .18 * Math.max(0, S(t, 4));
  s += `<g transform="translate(1180,600)">${[0, 1].map(k => `<circle r="${20 + ((t / L * 4 + k * .5) % 1) * 120}" fill="none" stroke="#e8352a" stroke-width="4" opacity="${1 - ((t / L * 4 + k * .5) % 1)}"/>`).join('')}<circle r="${15 * p}" fill="#e8352a" stroke="#fff" stroke-width="5"/></g>` + rLabel('São Paulo', 1180, 690, 42, '#e8352a') + brFlag(1600, 640, 1.4) + `<rect x="1540" y="822" width="130" height="14" fill="#555"/>`;
  return s + rLabel('São Paulo está en Brasil, en América del Sur', W / 2, 1010, 40);
};
scenes.sp_invitado = function (t) {
  let s = SPALL() + `<rect width="${W}" height="${H}" fill="#009c3b"/><path d="M960,80 L1820,540 L960,1000 L100,540Z" fill="#ffdf00" opacity=".5"/>`;
  s += `<g transform="translate(960,440) scale(${1 + S(t, 2) * .02})"><rect x="-540" y="-200" width="1080" height="400" rx="40" fill="#fff"/><text x="0" y="-90" font-family="Fredoka" font-weight="700" font-size="50" text-anchor="middle" fill="#009c3b">Hoy viajamos con un invitado</text><text x="0" y="40" font-family="Fredoka" font-weight="700" font-size="120" text-anchor="middle" fill="#002776">Antonio</text><text x="0" y="130" font-family="Fredoka" font-weight="600" font-size="40" text-anchor="middle" fill="#002776">¡São Paulo es su ciudad!</text></g>`;
  s += `<g transform="translate(960,860)"><rect x="-30" y="-120" width="60" height="120" rx="30" fill="#002776"/><path d="M-60,-60 Q-60,20 0,20 Q60,20 60,-60" stroke="#fff" stroke-width="10" fill="none"/><rect x="-5" y="20" width="10" height="60" fill="#fff"/><rect x="-50" y="80" width="100" height="12" rx="6" fill="#fff"/></g>`;
  return s;
};
scenes.sp_ola = function (t) {
  let s = SPALL() + rSky('day') + skyline(720, t, 31, 24) + street(720);
  s += rP(600, 1010, 2.3, t, ESC({ ph: 1, top: '#ffdf00', bot: '#002776', wave: true, skin: '#9c6a48' })) + rP(1320, 1010, 2.2, t, ESC({ ph: 3, child: true, top: '#009c3b', dir: -1 }));
  s += bubble(640, 560, 'Olá!', 72, '#009c3b', 1) + bubble(1300, 600, 'Obrigado!', 56, '#002776', -1);
  return s + rLabel('En Brasil se habla portugués: Olá = Hola · Obrigado = Gracias', W / 2, 90, 38);
};
scenes.sp_paulista = function (t) {
  let s = SPALL() + rSky('day') + rSun(1700, 140) + rClouds(t, [[300, 110, .8]]);
  s += tower(-20, 760, 260, 620, '#c8c4bc', 2, { antenna: true }) + tower(240, 760, 200, 520, '#d8d2c8', 3) + tower(440, 760, 180, 660, '#bcc4cc', 4, { antenna: true }) + tower(1300, 760, 220, 640, '#b8b4ac', 5, { antenna: true }) + tower(1520, 760, 200, 540, '#c8c4bc', 6) + tower(1720, 760, 220, 680, '#d8d2c8', 7, { antenna: true });
  s += `<path d="M620,760 L1300,760 L1900,1080 L20,1080Z" fill="url(#rRoad)"/>${[...Array(8)].map((_, i) => `<rect x="${955 - 6 - i * 3}" y="${780 + i * 38}" width="${12 + i * 6}" height="${16 + i * 3}" fill="#f0f0f0" opacity=".8"/>`).join('')}<path d="M0,760 L620,760 L20,1080 L0,1080Z" fill="url(#rWalk)"/><path d="M1300,760 L1920,760 L1920,1080 L1900,1080Z" fill="url(#rWalk)"/>`;
  s += rCar(700 + ((t / L) * 300) % 300, 880, 1, '#e8352a') + rCar(1160 - ((t / L) * 300) % 300, 820, .7, '#ffce00', -1) + rCrowd(t, 41, 10, 820, 1070);
  return s + rLabel('Avenida Paulista: casi 3 km de rascacielos', W / 2, 80, 42);
};
scenes.sp_sampa = function (t) {
  let s = SPALL() + rSky('dusk') + skyline(780, t, 51, 26, { night: true }) + street(780) + `<rect width="${W}" height="${H}" fill="#000" opacity=".1"/>`;
  s += `<g transform="translate(960,420) scale(${1 + S(t, 2) * .02})"><text x="0" y="0" font-family="Fredoka" font-weight="700" font-size="220" text-anchor="middle" fill="#ffdf00" stroke="#002776" stroke-width="14" paint-order="stroke">Sampa</text><text x="0" y="90" font-family="Fredoka" font-weight="600" font-size="50" text-anchor="middle" fill="#fff">así la llaman con cariño los paulistas</text></g>`;
  return s + maCrowd(t, 53, 12, 820, 1060);
};
scenes.sp_masp = function (t) {
  let s = SPALL() + rSky('day') + rSun(1700, 140) + tower(-20, 740, 300, 560, '#c8c4bc', 8) + tower(1640, 740, 300, 600, '#d8d2c8', 9, { antenna: true }) + `<rect x="0" y="740" width="${W}" height="340" fill="#c9c4b8"/>`;
  s += masp(960, 780, 1.15);
  s += rP(700, 960, 1.6, t, { ph: 1, child: true, top: '#ffdf00' }) + rP(860, 980, 1.6, t, { ph: 2, child: true, top: '#009c3b', dir: -1 }) + ball(780 + S(t, 1) * 80, 960 - Math.abs(S(t, 4)) * 40) + rP(1200, 960, 2, t, ESC({ ph: 3, top: '#2b3a67', hold: `<g transform="translate(0,-60) rotate(-25)"><ellipse cx="-10" cy="0" rx="30" ry="22" fill="#c98a3a"/><circle cx="-10" cy="0" r="6" fill="#3a2a1a"/><rect x="18" y="-4" width="70" height="8" fill="#6b4a36"/></g>` })) + maCrowd(t, 61, 8, 900, 1070);
  return s + rLabel('El MASP: ¡un museo que parece flotar!', W / 2, 80, 44);
};
scenes.sp_catedral = function (t) {
  let s = SPALL() + rSky('day') + rSun(300, 140) + catedralSe(960, 820, 1.0) + `<rect x="0" y="820" width="${W}" height="260" fill="#cfc4ae"/>${[...Array(14)].map((_, i) => `<line x1="${i * 150}" y1="820" x2="${i * 150 - 100}" y2="${H}" stroke="#bdb3a0" stroke-width="3"/>`).join('')}`;
  s += palm(160, 860, .8, t, 1) + palm(1760, 860, .8, t, 2) + maCrowd(t, 71, 12, 860, 1070);
  return s + rLabel('Catedral da Sé, el corazón antiguo de la ciudad', W / 2, 1010, 38);
};
scenes.sp_km0 = function (t) {
  let s = SPALL() + `<rect width="${W}" height="${H}" fill="#b9b2a4"/>${[...Array(12)].map((_, i) => `<line x1="${i * 180}" y1="0" x2="${i * 180 - 200}" y2="${H}" stroke="#a49c8e" stroke-width="4"/>`).join('')}`;
  s += `<g transform="translate(960,500)"><path d="M-260,0 L-130,-225 L130,-225 L260,0 L130,225 L-130,225Z" fill="#e8e2d4" stroke="#8a8478" stroke-width="10"/><text x="0" y="-60" font-family="Fredoka" font-weight="700" font-size="40" text-anchor="middle" fill="#5a5448">MARCO ZERO</text><text x="0" y="70" font-family="Fredoka" font-weight="700" font-size="160" text-anchor="middle" fill="#3a3a3a">0</text>
  ${[...Array(6)].map((_, i) => { const a = i * Math.PI / 3, r = 340 + ((t / L * 2) % 1) * 140; return `<g transform="translate(${Math.cos(a) * r},${Math.sin(a) * r}) rotate(${a * 180 / Math.PI})"><path d="M-30,-14 L20,-14 L20,-30 L50,0 L20,30 L20,14 L-30,14Z" fill="#009c3b" opacity="${1 - ((t / L * 2) % 1) * .6}"/></g>`; }).join('')}</g>`;
  return s + rLabel('El kilómetro cero: ¡desde aquí empiezan todos los caminos!', W / 2, 980, 38);
};
scenes.sp_ibirapuera = function (t) {
  let s = SPALL() + rSky('day') + rSun(1650, 140) + skyline(470, t, 81, 22) + `<rect x="0" y="460" width="${W}" height="120" fill="#5f9a48"/>` + [...Array(8)].map((_, i) => rTree(60 + i * 260, 560, .7, 'green', t, 900 + i)).join('') + ibirapueraLake(t, 560);
  s += fountain(1200, 700, t, 1.1) + duck(500, 760, 1, t, 1) + duck(620, 780, .9, t, 2) + duck(760, 740, .8, t, 3) + grass(820);
  s += bike(((t / L) * 2200) % 2500 - 200, 960, 1.4, '#009c3b', rider('#ffdf00', '#9c6a48', 1, t), t) + `<g transform="translate(1500,980)"><rect x="-140" y="-10" width="280" height="40" fill="#e8352a" opacity=".85"/>${[...Array(5)].map((_, i) => `<rect x="${-140 + i * 56}" y="-10" width="28" height="40" fill="#fff" opacity=".7"/>`).join('')}</g>` + rP(1420, 970, 1.6, t, ESC({ ph: 3, child: true, top: '#2f7ad0' })) + rP(1580, 980, 2, t, ESC({ ph: 4, top: '#ff8a5a', dir: -1, longhair: true })) + rP(400, 940, 1.6, t, ESC({ ph: 5, child: true, top: '#ffce00', wave: true }));
  return s + rLabel('Parque Ibirapuera: lagos, bosques y una fuente que baila', W / 2, 80, 40);
};
scenes.sp_niemeyer = function (t) {
  let s = SPALL() + rSky('day') + rSun(1650, 140) + `<rect x="0" y="700" width="${W}" height="380" fill="#7aa85a"/>`;
  s += `<g transform="translate(560,760)"><path d="M-360,0 Q-360,-360 0,-370 Q360,-360 360,0Z" fill="#f4f4f0"/><path d="M-360,0 Q-360,-360 0,-370 Q100,-366 180,-330 Q-140,-300 -200,0Z" fill="#000" opacity=".05"/>${[-220, -80, 80, 220].map(x => `<ellipse cx="${x}" cy="${-140 - (220 - Math.abs(x)) * .4}" rx="34" ry="22" fill="#5a6a7a"/>`).join('')}</g>`;
  s += `<g transform="translate(1340,640)"><path d="M-480,0 Q-240,-60 0,0 T480,0 L480,30 Q240,-30 0,30 T-480,30Z" fill="#f4f4f0"/>${[-400, -200, 0, 200, 400].map(x => `<rect x="${x - 10}" y="20" width="20" height="120" fill="#e0e0dc"/>`).join('')}</g>` + maCrowd(t, 91, 10, 800, 1070);
  return s + rLabel('Edificios con forma de ola y de concha · Oscar Niemeyer', W / 2, 80, 40);
};
scenes.sp_bandeiras = function (t) {
  let s = SPALL() + rSky('day') + rSun(300, 140) + `<rect x="0" y="760" width="${W}" height="320" fill="#7aa85a"/>`;
  s += `<g transform="translate(960,800)">${rShadow(0, 0, 640)}<rect x="-620" y="-60" width="1240" height="60" fill="#b8ac94"/><path d="M380,-60 L620,-60 L600,-240 Q520,-300 460,-220Z" fill="#a89a80"/>`;
  for (let i = 0; i < 12; i++) { const x = -560 + i * 82, h = 200 + (i % 3) * 30, lean = 18; s += `<g transform="translate(${x},-60) skewX(${-lean})"><rect x="-26" y="${-h}" width="52" height="${h}" rx="18" fill="${['#c9bca0', '#b8ac94', '#d6cab0'][i % 3]}"/><circle cx="0" cy="${-h - 26}" r="26" fill="#c9bca0"/>${i % 4 == 0 ? `<rect x="-36" y="${-h - 60}" width="72" height="14" fill="#a89a80"/>` : ''}</g>`; }
  s += `<path d="M-600,-60 L-520,-120 L-420,-60Z" fill="#a89a80"/></g>` + maCrowd(t, 101, 8, 880, 1070);
  return s + rLabel('Monumento a las Bandeiras: ¡empujan un barco de piedra!', W / 2, 80, 40);
};
scenes.sp_atardecer = function (t) {
  let s = SPALL() + rSky('dusk') + rSun(1500, 420, 80) + skyline(560, t, 111, 24) + `<rect x="0" y="560" width="${W}" height="520" fill="#4a6a3a"/>` + [...Array(7)].map((_, i) => rTree(80 + i * 300, 760, 1.1, 'green', t, 950 + i)).join('');
  s += [...Array(24)].map((_, i) => { const p = ((t / L) + i / 24) % 1; const x = 1800 - p * 1500 + (i % 5) * 40, y = 200 + Math.sin(p * 3 + i) * 60 + (i % 4) * 30; return `<path d="M${x - 14},${y} q14,-${8 + S(t, 8, i) * 6} 14,0 q0,-${8 + S(t, 8, i + 1) * 6} 14,0" stroke="#2a2a3a" stroke-width="4" fill="none"/>`; }).join('');
  return s + rLabel('Al atardecer, los pájaros vuelven a los árboles', W / 2, 1010, 40);
};
scenes.sp_beco = function (t) {
  let s = SPALL() + rSky('day') + graffitiWall(-20, 820, 900, 760, 3) + graffitiWall(1100, 1940, 900, 760, 7);
  s += `<path d="M820,140 L1100,140 L1100,900 L820,900Z" fill="#8aa8c0"/><path d="M820,900 L1100,900 L1500,1080 L420,1080Z" fill="#7a7468"/><path d="M0,900 L820,900 L420,1080 L0,1080Z" fill="#6a6458"/><path d="M1100,900 L1920,900 L1920,1080 L1500,1080Z" fill="#6a6458"/>`;
  s += rP(900, 1000, 2.2, t, { ph: 1, child: true, top: '#ffdf00' }) + rP(1060, 960, 1.8, t, { ph: 3, top: '#2b3a67', dir: -1 }) + rP(980, 920, 1.4, t, { ph: 5, top: '#e8352a' });
  return s + rLabel('Beco do Batman (Vila Madalena): ¡un callejón pintado de colores!', W / 2, 80, 38);
};
scenes.sp_pintor = function (t) {
  let s = SPALL() + rSky('day') + graffitiWall(-20, 1940, 860, 700, 13) + `<rect x="0" y="860" width="${W}" height="220" fill="#6a6458"/>`;
  const p = Math.min(1, t / L * 1.3);
  s += `<g transform="translate(1160,520)"><clipPath id="spcl"><rect x="-300" y="-300" width="${600 * p}" height="600"/></clipPath><g clip-path="url(#spcl)"><circle r="240" fill="#ffdf00"/><circle cx="-80" cy="-50" r="34" fill="#111"/><circle cx="80" cy="-50" r="34" fill="#111"/><path d="M-110,70 q110,90 220,0" stroke="#111" stroke-width="22" fill="none"/></g></g>`;
  s += rP(780 + p * 120, 1010, 2.6, t, ESC({ ph: 2, top: '#3aa65a', bot: '#2b3a67', hold: `<g transform="translate(18,-90) rotate(-30)"><rect x="-8" y="-30" width="16" height="44" rx="5" fill="#ff3a6a"/><rect x="-6" y="-38" width="12" height="10" fill="#222"/></g>` }));
  return s + rLabel('Un artista pinta… ¡y otro pinta encima algo nuevo!', W / 2, 80, 42);
};
scenes.sp_liberdade = function (t) {
  let s = SPALL() + rSky('day') + madridBlock(-20, 760, 700, 460, '#e8d8c8', '#5a6470') + madridBlock(1240, 760, 700, 480, '#e2d0c0', '#5a6470') + street(760);
  s += `<g transform="translate(960,760)"><rect x="-260" y="-520" width="44" height="520" fill="#c8102e"/><rect x="216" y="-520" width="44" height="520" fill="#c8102e"/><path d="M-360,-540 Q0,-500 360,-540 L340,-500 Q0,-470 -340,-500Z" fill="#c8102e"/><rect x="-320" y="-460" width="640" height="34" fill="#c8102e"/><rect x="-60" y="-500" width="120" height="70" fill="#1a1a1a"/><text x="0" y="-452" font-family="Fredoka" font-weight="700" font-size="34" text-anchor="middle" fill="#ffd34d">自由</text></g>`;
  s += [...Array(10)].map((_, i) => lantern(100 + i * 190, 200 + (i % 2) * 20, 1, t, i)).join('') + `<path d="M0,170 Q480,210 960,170 T1920,170" stroke="#333" stroke-width="3" fill="none"/>`;
  s += liberdadeLamp(300, 600, 1) + liberdadeLamp(1620, 600, 1) + maCrowd(t, 121, 14, 800, 1070);
  return s + rLabel('Liberdade: ¡un barrio que parece estar en Japón!', W / 2, 1010, 40);
};
scenes.sp_barcos = function (t) {
  let s = SPALL() + `<rect width="${W}" height="${H}" fill="#e8dcc0"/><rect width="${W}" height="600" fill="#a8c8d8" opacity=".6"/><rect x="0" y="600" width="${W}" height="480" fill="#5a8aa8"/><rect width="${W}" height="${H}" fill="#c9a77a" opacity=".3"/>`;
  s += `<g transform="translate(${((t / L) * 300) % 300 + 700},640)"><path d="M-460,0 L460,0 L400,120 L-420,120Z" fill="#3a3a44"/><rect x="-300" y="-120" width="520" height="120" fill="#f4efe4"/>${[...Array(12)].map((_, i) => `<circle cx="${-280 + i * 44}" cy="-60" r="10" fill="#3a3a44"/>`).join('')}<rect x="-60" y="-280" width="70" height="160" fill="#c8102e"/><rect x="80" y="-260" width="70" height="140" fill="#c8102e"/><rect x="-60" y="-280" width="70" height="20" fill="#222"/><rect x="80" y="-260" width="70" height="20" fill="#222"/></g>`;
  s += `<g transform="translate(400,180)"><rect x="-260" y="-70" width="520" height="140" rx="30" fill="#fff" stroke="#8a6a3a" stroke-width="6"/><text x="0" y="22" font-family="Fredoka" font-weight="700" font-size="60" text-anchor="middle" fill="#8a6a3a">Hace +100 años</text></g>`;
  return s + rLabel('Familias de Italia, Japón, Portugal, países árabes, Bolivia…', W / 2, 1010, 38);
};
scenes.sp_feria = function (t) {
  let s = SPALL() + rSky('day') + madridBlock(-20, 700, 1960, 440, '#e8d8c8', '#5a6470') + street(700);
  s += [0, 1, 2, 3].map(k => `<g transform="translate(${300 + k * 440},860)"><rect x="-170" y="-140" width="340" height="140" fill="#f4efe4"/><path d="M-190,-140 L190,-140 L170,-210 L-170,-210Z" fill="${['#c8102e', '#2f7ad0', '#009c3b', '#ffce00'][k]}"/>${[...Array(5)].map((_, j) => `<circle cx="${-120 + j * 60}" cy="-150" r="18" fill="${['#f2c860', '#fff', '#e8352a', '#8a5a32', '#3aa65a'][(j + k) % 5]}"/>`).join('')}${steam(0, -220, t, 2)}</g>`).join('') + [...Array(10)].map((_, i) => lantern(100 + i * 190, 180, .8, t, i)).join('') + maCrowd(t, 131, 14, 880, 1070);
  return s + rLabel('Feria de fin de semana: comidas nuevas y artesanías', W / 2, 1010, 40);
};
scenes.sp_konnichiwa = function (t) {
  let s = SPALL() + scenes.sp_liberdade(t).replace(/<g transform="translate\(960,1010\)">[\s\S]*$/, '') + `<rect width="${W}" height="${H}" fill="#fff" opacity=".3"/>`;
  s += rP(700, 1010, 2.4, t, ESC({ ph: 2, top: '#c8102e', wave: true })) + rP(1220, 1010, 2.2, t, ESC({ ph: 3, child: true, top: '#ffdf00', dir: -1, wave: true }));
  s += bubble(720, 520, 'Konnichiwa!', 64, '#c8102e', 1) + bubble(1240, 600, 'Olá!', 64, '#009c3b', -1);
  return s + rLabel('Konnichiwa también quiere decir ¡hola!', W / 2, 100, 44);
};
scenes.sp_mundos = function (t) {
  let s = SPALL() + rSky('day') + skyline(760, t, 141, 24) + street(760);
  const flags = [brFlag, (x, y, s) => itFlagS(x, y, s), (x, y, s) => jpFlag(x, y, s), (x, y, s) => ptFlag(x, y, s), (x, y, s) => boFlag(x, y, s), (x, y, s) => esFlag(x, y, s)];
  s += flags.map((f, i) => `<g transform="translate(0,${-Math.abs(S(t, 2, i)) * 10})">${f(260 + i * 260, 520, 1.2)}</g>`).join('') + maCrowd(t, 151, 16, 800, 1070);
  return s + rLabel('Una sola ciudad… ¡con gente de 100 países!', W / 2, 90, 44);
};
function itFlagS(x, y, s = 1) { return `<g transform="translate(${x},${y}) scale(${s})"><line x1="0" y1="0" x2="0" y2="130" stroke="#555" stroke-width="4"/><rect x="0" y="0" width="32" height="64" fill="#009246"/><rect x="32" y="0" width="32" height="64" fill="#fff"/><rect x="64" y="0" width="32" height="64" fill="#ce2b37"/></g>`; }
function jpFlag(x, y, s = 1) { return `<g transform="translate(${x},${y}) scale(${s})"><line x1="0" y1="0" x2="0" y2="130" stroke="#555" stroke-width="4"/><rect x="0" y="0" width="96" height="64" fill="#fff" stroke="#ddd"/><circle cx="48" cy="32" r="19" fill="#bc002d"/></g>`; }
function ptFlag(x, y, s = 1) { return `<g transform="translate(${x},${y}) scale(${s})"><line x1="0" y1="0" x2="0" y2="130" stroke="#555" stroke-width="4"/><rect x="0" y="0" width="38" height="64" fill="#006600"/><rect x="38" y="0" width="58" height="64" fill="#ff0000"/><circle cx="38" cy="32" r="14" fill="#ffcc00"/></g>`; }
function boFlag(x, y, s = 1) { return `<g transform="translate(${x},${y}) scale(${s})"><line x1="0" y1="0" x2="0" y2="130" stroke="#555" stroke-width="4"/><rect x="0" y="0" width="96" height="21" fill="#d52b1e"/><rect x="0" y="21" width="96" height="22" fill="#f9e300"/><rect x="0" y="43" width="96" height="21" fill="#007934"/></g>`; }
scenes.sp_tesoros = function (t) {
  let s = SPALL() + `<rect width="${W}" height="${H}" fill="#009c3b"/><path d="M960,60 L1860,540 L960,1020 L60,540Z" fill="#ffdf00" opacity=".35"/>`;
  s += [0, 1, 2].map(k => `<g transform="translate(${420 + k * 540},580) scale(${1 + .04 * Math.max(0, S(t, 1, k * 2))})"><rect x="-220" y="-260" width="440" height="520" rx="30" fill="#fff"/><text x="0" y="-50" font-family="Fredoka" font-weight="700" font-size="170" text-anchor="middle" fill="#009c3b">${k + 1}</text><text x="0" y="60" font-family="Fredoka" font-weight="700" font-size="44" text-anchor="middle" fill="#002776">Tesoro</text><text x="0" y="160" font-family="Fredoka" font-weight="700" font-size="80" text-anchor="middle" fill="#002776">?</text></g>`).join('');
  return s + rLabel('Tres tesoros de São Paulo', W / 2, 140, 46);
};
scenes.sp_futbol = function (t) {
  let s = SPALL() + rSky('day') + rSun(300, 140) + `<g transform="translate(960,760)"><rect x="-760" y="-300" width="1520" height="300" fill="#e8e0cc"/>${[...Array(18)].map((_, i) => `<rect x="${-720 + i * 82}" y="-260" width="40" height="230" fill="#d6ccb4"/>`).join('')}<rect x="-780" y="-330" width="1560" height="40" fill="#d6ccb4"/><rect x="-200" y="-400" width="400" height="80" fill="#e8e0cc"/><text x="0" y="-346" font-family="Fredoka" font-weight="700" font-size="40" text-anchor="middle" fill="#2b3a67" letter-spacing="3">PACAEMBU</text><rect x="-260" y="-200" width="520" height="70" fill="#009c3b"/><text x="0" y="-152" font-family="Fredoka" font-weight="700" font-size="36" text-anchor="middle" fill="#ffdf00">MUSEO DEL FÚTBOL</text></g>` + street(760);
  const p = (t / L * 2) % 1;
  s += `<g transform="translate(1500,1000)"><rect x="-200" y="-200" width="400" height="200" fill="none" stroke="#fff" stroke-width="10"/>${[...Array(8)].map((_, i) => `<line x1="${-200 + i * 57}" y1="-200" x2="${-200 + i * 57}" y2="0" stroke="#fff" stroke-width="2" opacity=".6"/>`).join('')}</g>` + rP(700, 1010, 2.4, t, { ph: 2, child: true, top: '#ffdf00', bot: '#002776' }) + ball(780 + p * 720, 980 - Math.sin(p * Math.PI) * 140, 26);
  return s + rLabel('Bajo las gradas del Pacaembu: ¡el Museo del Fútbol!', W / 2, 80, 40);
};
scenes.sp_catavento = function (t) {
  let s = SPALL() + `<rect width="${W}" height="${H}" fill="#2a2a4a"/><rect x="0" y="760" width="${W}" height="320" fill="#4a4a6a"/>` + rStars(t, 40);
  s += `<g transform="translate(700,640)"><rect x="-80" y="60" width="160" height="120" fill="#2a2a2a"/><circle r="130" fill="#3a2a6a" opacity=".6" stroke="#cfd4ff" stroke-width="5"/><circle r="22" fill="#fff"/>${[...Array(10)].map((_, k) => { const a = k * .628 + S(t, 4, k) * .3; return `<path d="M0,0 Q${Math.cos(a + .4) * 60},${Math.sin(a + .4) * 60} ${Math.cos(a) * 125},${Math.sin(a) * 125}" stroke="#ff7aff" stroke-width="4" fill="none" filter="url(#rGlow)"/>`; }).join('')}</g>`;
  s += rP(940, 1010, 2.6, t, ESC({ ph: 2, child: true, top: '#ffdf00', hold: `<g transform="translate(-30,-90)"><circle r="8" fill="#e3b48e"/></g>` })) + `<g transform="translate(940,1010) scale(2.6)">${[...Array(9)].map((_, k) => `<path d="M0,-96 l${-16 + k * 4},-${14 + (k % 3) * 4}" stroke="#2b1d16" stroke-width="3"/>`).join('')}</g>`;
  s += `<g transform="translate(1460,560)"><circle r="160" fill="#2f5a9a"/><path d="M-100,-60 Q-20,-140 60,-80 Q100,-20 40,20 Q-40,60 -100,-60Z" fill="#3aa65a"/><ellipse rx="220" ry="40" fill="none" stroke="#ffce00" stroke-width="8" transform="rotate(-20)"/></g>`;
  return s + rLabel('Catavento: un museo de ciencias ¡donde hay que tocarlo todo!', W / 2, 80, 38);
};
scenes.sp_noria = function (t) {
  let s = SPALL() + rSky('day') + rSun(1700, 140) + skyline(860, t, 161, 22) + `<rect x="0" y="860" width="${W}" height="220" fill="#7aa85a"/>` + ferrisWheel(960, 900, 1.0, t) + maCrowd(t, 171, 10, 920, 1070);
  return s + rLabel('Roda Rico: ¡más de 90 metros, la más grande de América Latina!', W / 2, 1010, 36);
};
scenes.sp_vista = function (t) {
  let s = SPALL() + `<rect width="${W}" height="${H}" fill="url(#spHaze)"/>`;
  for (let r = 0; r < 5; r++) s += skyline(380 + r * 170, t, 180 + r, 34 + r * 4);
  s += `<circle cx="-520" cy="560" r="760" fill="none" stroke="#e8ecef" stroke-width="22"/><circle cx="-520" cy="560" r="736" fill="none" stroke="#b8c0c8" stroke-width="6"/><g transform="translate(236,520)"><line x1="0" y1="-40" x2="0" y2="0" stroke="#6a7a8a" stroke-width="10"/><rect x="-150" y="0" width="300" height="240" rx="40" fill="#e8352a"/><rect x="-120" y="40" width="240" height="120" rx="20" fill="#cfe8f8" opacity=".6"/></g>`;
  return s + rLabel('Desde arriba… ¡no se le ve el final!', W / 2, 80, 44);
};
scenes.sp_pregunta = function (t) {
  let s = SPALL() + `<rect width="${W}" height="${H}" fill="#002776"/>`;
  const opts = [['Pintar una pared', '#ff3a6a'], ['Tirar un penalti', '#009c3b'], ['Subir a la noria', '#ffce00']];
  s += `<g transform="translate(960,190)"><rect x="-720" y="-80" width="1440" height="160" rx="40" fill="#fff"/><text x="0" y="22" font-family="Fredoka" font-weight="700" font-size="60" text-anchor="middle" fill="#002776">Si vinieras a São Paulo, ¿qué harías primero?</text></g>`;
  s += opts.map(([o, c], i) => `<g transform="translate(${400 + i * 560},620) scale(${1 + .04 * Math.max(0, S(t, 1, i * 2))})"><rect x="-240" y="-200" width="480" height="400" rx="36" fill="${c}"/><text x="0" y="20" font-family="Fredoka" font-weight="700" font-size="46" text-anchor="middle" fill="#fff">${o}</text></g>`).join('');
  return s + rLabel('¡No hay respuesta mala!', W / 2, 960, 44);
};
scenes.sp_obrigado = function (t) {
  let s = SPALL() + rSky('dusk') + skyline(780, t, 191, 26) + street(780) + maCrowd(t, 201, 10, 820, 1060);
  return s + `<g transform="translate(960,400) scale(${1 + S(t, 2) * .02})"><text x="0" y="0" font-family="Fredoka" font-weight="700" font-size="200" text-anchor="middle" fill="#ffdf00" stroke="#002776" stroke-width="14" paint-order="stroke">Obrigado!</text><text x="0" y="90" font-family="Fredoka" font-weight="600" font-size="56" text-anchor="middle" fill="#fff" stroke="#002776" stroke-width="4" paint-order="stroke">quiere decir ¡gracias!</text></g>`;
};
scenes.sp_cuaderno = function (t) {
  let s = SPALL() + `<rect width="${W}" height="${H}" fill="#f4e6cc"/><rect x="0" y="760" width="${W}" height="320" fill="url(#rWood)"/>`;
  s += `<g transform="translate(960,660) rotate(-3)">${rShadow(0, 120, 560, .3)}<rect x="-560" y="-400" width="1120" height="520" rx="20" fill="#fffaf0" stroke="#c9a468" stroke-width="6"/><line x1="0" y1="-400" x2="0" y2="120" stroke="#c9a468" stroke-width="6"/>
  <g transform="translate(-280,40)" stroke="#2b3a67" stroke-width="7" fill="none"><rect x="-60" y="-300" width="120" height="300"/>${[...Array(6)].map((_, k) => `<line x1="-40" y1="${-270 + k * 44}" x2="40" y2="${-270 + k * 44}"/>`).join('')}<line x1="0" y1="-300" x2="0" y2="-360"/></g>
  <g transform="translate(280,-120)">${['#ff3a6a', '#ffd23a', '#3ad0ff', '#6aff6a'].map((c, k) => `<rect x="${-180 + k * 90}" y="-80" width="90" height="240" fill="${c}"/>`).join('')}<circle cx="0" cy="40" r="50" fill="#fff"/></g></g>`;
  s += `<g transform="translate(1420,840) rotate(-30)"><rect x="-10" y="-120" width="20" height="200" fill="#ffce00"/><path d="M-10,80 L0,110 L10,80Z" fill="#2b3a67"/></g>`;
  return s + rLabel('Dibujen su viaje en su cuaderno de viajes', W / 2, 100, 44);
};
scenes.sp_outro = function (t) {
  let s = SPALL() + rSky('dusk') + rSun(1500, 420, 80) + skyline(860, t, 211, 26) + street(860) + maCrowd(t, 221, 12, 900, 1060);
  return s + `<g transform="translate(${W / 2},${H / 2 - 260}) scale(${1 + S(t, 2) * .01})"><rect x="-660" y="-150" width="1320" height="300" rx="40" fill="#fff" opacity=".95" stroke="#2b3a67" stroke-width="6"/>
  <text x="0" y="-20" font-family="Fredoka" font-weight="700" font-size="96" text-anchor="middle" fill="#009c3b" stroke="#2b3a67" stroke-width="2" paint-order="stroke">Tchau, São Paulo!</text>
  <text x="0" y="90" font-family="Fredoka" font-weight="600" font-size="52" text-anchor="middle" fill="#2b3a67">Hasta pronto, pequeños exploradores ✈</text></g>`;
};
