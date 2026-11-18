/* =====================================================================
   Mi Pequeño Atlas — Capítulo 5: Santo Domingo. Escenas realistas.
   (usa helpers de scenes_madrid.js: plate, steam, bubble, grass, doFlag, street…)
   ===================================================================== */
const SDD = `<defs>
<linearGradient id="sdCoral" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e2c48e"/><stop offset="1" stop-color="#c9a468"/></linearGradient>
<linearGradient id="sdSea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2fb5d0"/><stop offset="1" stop-color="#0f7aa8"/></linearGradient>
<linearGradient id="sdSand" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4e2b4"/><stop offset="1" stop-color="#e2c88a"/></linearGradient>
</defs>`;
const SDALL = () => D() + MA + SDD;

/* ---------- piezas ---------- */
function palm(x, base, s = 1, t = 0, ph = 0) {
  const sw = S(t, 1, ph) * 4;
  return `${rShadow(x, base, 60 * s, .2)}<g transform="translate(${x},${base}) scale(${s})"><path d="M-8,0 Q${-20 + sw},-200 ${10 + sw * 2},-380" stroke="#8a6a46" stroke-width="18" fill="none" stroke-linecap="round"/>${[...Array(7)].map((_, k) => `<path d="M${10 + sw * 2},-380 q${Math.cos(k * .9) * 110},${-50 + Math.sin(k * .9) * 30} ${Math.cos(k * .9) * 190 + sw * 3},${40 + Math.abs(Math.sin(k * .9)) * 60}" stroke="${k % 2 ? '#3a8a3a' : '#2f7a34'}" stroke-width="22" fill="none" stroke-linecap="round"/>`).join('')}<circle cx="${6 + sw * 2}" cy="-372" r="14" fill="#6a4a2a"/></g>`;
}
function colonialHouse(x, base, w, h, col, o = {}) {
  let s = `<rect x="${x}" y="${base - h}" width="${w}" height="${h}" fill="${col}"/><rect x="${x + w - 12}" y="${base - h}" width="12" height="${h}" fill="#000" opacity=".07"/><rect x="${x - 4}" y="${base - h - 14}" width="${w + 8}" height="16" fill="#efe6d2"/>`;
  const n = Math.max(1, Math.floor(w / 140));
  for (let i = 0; i < n; i++) { const wx = x + (i + .5) * w / n;
    s += `<path d="M${wx - 34},${base} L${wx - 34},${base - 130} Q${wx},${base - 166} ${wx + 34},${base - 130} L${wx + 34},${base}Z" fill="#6b3f22"/><line x1="${wx}" y1="${base - 150}" x2="${wx}" y2="${base}" stroke="#4a2a16" stroke-width="3"/>`;
    if (h > 260) s += `<rect x="${wx - 30}" y="${base - h + 40}" width="60" height="110" fill="#5a3a22"/><rect x="${wx - 54}" y="${base - h + 150}" width="108" height="12" fill="#4a2a16"/>${[...Array(7)].map((_, k) => `<line x1="${wx - 48 + k * 16}" y1="${base - h + 112}" x2="${wx - 48 + k * 16}" y2="${base - h + 150}" stroke="#4a2a16" stroke-width="3"/>`).join('')}<rect x="${wx - 54}" y="${base - h + 108}" width="108" height="6" fill="#4a2a16"/>`; }
  if (o.bougain) s += [...Array(14)].map((_, k) => `<circle cx="${x + 10 + (k * 41) % (w - 20)}" cy="${base - h + 10 + (k * 29) % 90}" r="${16 + (k % 3) * 5}" fill="${['#d6337f', '#e85a9a', '#c22a6e'][k % 3]}"/>`).join('') + `<path d="M${x + 14},${base} Q${x + 30},${base - h * .5} ${x + 20},${base - h + 40}" stroke="#5a7a3a" stroke-width="6" fill="none"/>`;
  return s;
}
function stoneStreet(y0) { let s = `<rect x="0" y="${y0}" width="${W}" height="${H - y0}" fill="#9a8a72"/>`; const R = rng(55); for (let r = 0; r < 14; r++) { const y = y0 + r * r * 2.4 + r * 9, sz = 12 + r * 4; if (y > H) break; for (let x = -(r % 2) * sz / 2; x < W; x += sz + 4) s += `<rect x="${x}" y="${y}" width="${sz}" height="${sz * .6}" rx="${sz * .25}" fill="${['#a89478', '#b39e80', '#9a876c'][Math.floor(R() * 3)]}"/>`; } return s; }
function catedral(cx, base, s = 1) {
  return `<g transform="translate(${cx},${base}) scale(${s})"><rect x="-460" y="-470" width="920" height="470" fill="url(#sdCoral)"/><rect x="420" y="-560" width="160" height="560" fill="url(#sdCoral)"/><rect x="430" y="-600" width="140" height="44" fill="#d6b67a"/>${[0, 1, 2].map(k => `<path d="M${450 + k * 44},-600 v-20 h24 v20" fill="#d6b67a"/>`).join('')}<path d="M480,-520 a20,26 0 0 1 40,0 v60 h-40Z" fill="#5a4a3a"/>
  <rect x="-470" y="-490" width="940" height="26" fill="#d6b67a"/>${[...Array(12)].map((_, k) => `<rect x="${-460 + k * 80}" y="-512" width="34" height="24" fill="#d6b67a"/>`).join('')}
  ${[-170, 170].map(x => `<g transform="translate(${x},0)"><path d="M-130,0 L-130,-250 Q0,-390 130,-250 L130,0Z" fill="#c9a468"/><path d="M-100,0 L-100,-240 Q0,-350 100,-240 L100,0Z" fill="#b8925a"/><path d="M-70,0 L-70,-220 Q0,-300 70,-220 L70,0Z" fill="#4a3426"/>${[...Array(5)].map((_, k) => `<path d="M${-130 + k * 4},${-250 - k * 6} Q0,${-390 + k * 10} ${130 - k * 4},${-250 - k * 6}" stroke="#a8844e" stroke-width="3" fill="none"/>`).join('')}</g>`).join('')}
  ${[-330, 0, 330].map(x => `<rect x="${x - 18}" y="-400" width="36" height="400" fill="#d6b67a"/><rect x="${x - 26}" y="-410" width="52" height="16" fill="#c9a468"/>`).join('')}
  <rect x="-300" y="-450" width="600" height="40" fill="#d6b67a"/>${[...Array(10)].map((_, k) => `<circle cx="${-270 + k * 60}" cy="-430" r="12" fill="#c9a468"/>`).join('')}</g>`;
}
function columbusStatue(x, base, s = 1) {
  return `<g transform="translate(${x},${base}) scale(${s})">${rShadow(0, 0, 110)}<rect x="-70" y="-260" width="140" height="260" fill="#d9d1bf"/><rect x="-90" y="-40" width="180" height="40" fill="#cfc6b4"/><rect x="-84" y="-276" width="168" height="20" fill="#cfc6b4"/>
  <g transform="translate(0,-276)" fill="#3e5a52"><path d="M-30,0 L-26,-110 Q-34,-150 -18,-170 L18,-170 Q34,-150 26,-110 L30,0Z"/><circle cx="0" cy="-190" r="20"/><path d="M14,-160 L80,-200" stroke="#3e5a52" stroke-width="14" stroke-linecap="round"/><circle cx="84" cy="-203" r="8"/></g>
  <path d="M-60,-120 Q-90,-150 -60,-180" fill="#3e5a52"/><g transform="translate(-56,-80)" fill="#3e5a52"><path d="M0,0 L-8,-60 Q-10,-80 4,-84 L14,-60 L16,0Z"/><circle cx="2" cy="-94" r="12"/></g></g>`;
}
function alcazar(cx, base, s = 1) {
  let o = `<g transform="translate(${cx},${base}) scale(${s})"><rect x="-640" y="-420" width="1280" height="420" fill="url(#sdCoral)"/><rect x="-660" y="-440" width="1320" height="24" fill="#d6b67a"/>`;
  for (const x of [-560, -440, 440, 560]) o += `<rect x="${x - 26}" y="-360" width="52" height="80" fill="#5a4030"/><rect x="${x - 26}" y="-170" width="52" height="80" fill="#5a4030"/><rect x="${x - 34}" y="-284" width="68" height="10" fill="#c9a468"/>`;
  for (let r = 0; r < 2; r++) for (let i = 0; i < 5; i++) { const x = -300 + i * 150, y = r ? 0 : -220; o += `<path d="M${x - 58},${y} L${x - 58},${y - 120} Q${x},${y - 190} ${x + 58},${y - 120} L${x + 58},${y}Z" fill="#3a2a20"/><path d="M${x - 58},${y} L${x - 58},${y - 120} Q${x},${y - 190} ${x + 58},${y - 120} L${x + 58},${y}" stroke="#c9a468" stroke-width="8" fill="none"/>`; if (!r) o += `<rect x="${x - 58}" y="-250" width="116" height="30" fill="#2a1e16" opacity=".5"/>`; }
  o += `<rect x="-380" y="-226" width="760" height="14" fill="#d6b67a"/>${[...Array(5)].map((_, i) => `<rect x="${-330 + i * 150}" y="-270" width="60" height="40" fill="#c9a468"/>`).join('')}<rect x="-380" y="-30" width="760" height="30" fill="#c9a468" opacity=".5"/></g>`;
  return o;
}
function seaWall(t, y0 = 640) {
  return `<rect x="0" y="${y0 - 200}" width="${W}" height="200" fill="url(#sdSea)"/>${[...Array(14)].map((_, i) => `<path d="M${(i * 157 + t / L * 120) % (W + 100) - 50},${y0 - 180 + (i * 31) % 160} q30,-8 60,0" stroke="#bfefff" stroke-width="4" fill="none" opacity=".7"/>`).join('')}
  <rect x="0" y="${y0 - 10}" width="${W}" height="40" fill="#e8e2d4"/><rect x="0" y="${y0 + 30}" width="${W}" height="${H - y0 - 30}" fill="#d9cfb8"/>${[...Array(16)].map((_, i) => `<line x1="${i * 130}" y1="${y0 + 30}" x2="${i * 130 - 90}" y2="${H}" stroke="#c9bea4" stroke-width="3"/>`).join('')}`;
}
function sdCrowd(t, seed, n, y0, y1) { return rCrowd(t, seed, n, y0, y1, { tops: ['#fff', '#f2c14e', '#4fb3f6', '#ce1126', '#5aa65a', '#f29a3a', '#e8e2d4', '#002d62'] }); }
function hispaniola(x, y, s = 1, o = {}) {
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-420,-40 L-300,-60 L-280,-110 L-200,-130 L-120,-110 L-40,-130 L60,-120 L160,-100 L260,-90 L340,-60 L400,-40 L420,0 L380,30 L320,40 L260,60 L180,70 L120,90 L40,80 L-40,100 L-120,80 L-200,60 L-260,40 L-330,40 L-400,30 L-440,10Z" fill="#f2d98a" stroke="#2b3a67" stroke-width="5" stroke-linejoin="round"/>
  <path d="M-200,-130 L-160,-20 L-200,60" stroke="#2b3a67" stroke-width="4" stroke-dasharray="12 8" fill="none"/><path d="M-440,10 L-200,-130 L-160,-20 L-200,60 L-260,40 L-330,40 L-400,30Z" fill="#cfe2b8"/><path d="M-420,-40 L-300,-60 L-280,-110 L-200,-130 L-160,-20 L-200,60 L-260,40 L-330,40 L-400,30 L-440,10Z" fill="none" stroke="#2b3a67" stroke-width="5" stroke-linejoin="round"/>
  <text x="-300" y="0" font-family="Fredoka" font-weight="700" font-size="40" text-anchor="middle" fill="#5a7a4a">HAITÍ</text><text x="120" y="-20" font-family="Fredoka" font-weight="700" font-size="40" text-anchor="middle" fill="#002d62">REPÚBLICA DOMINICANA</text></g>`;
}
function caravel(x, y, s = 1, t = 0, ph = 0) { return `<g transform="translate(${x},${y + S(t, 2, ph) * 6}) scale(${s}) rotate(${S(t, 2, ph) * 2})"><path d="M-200,0 L200,0 L160,70 L-170,70Z" fill="#6b4a2a"/><path d="M-200,0 L-220,-40 L-150,-10Z" fill="#6b4a2a"/><line x1="-60" y1="0" x2="-60" y2="-260" stroke="#4a3220" stroke-width="10"/><line x1="70" y1="0" x2="70" y2="-300" stroke="#4a3220" stroke-width="10"/><path d="M-130,-230 Q-60,-200 10,-230 L10,-80 Q-60,-50 -130,-80Z" fill="#f4efe0"/><path d="M0,-270 Q70,-240 140,-270 L140,-100 Q70,-70 0,-100Z" fill="#f4efe0"/><path d="M-40,-170 h40 M-60,-190 v40" stroke="#c8323a" stroke-width="10"/><path d="M70,-300 L110,-290 L70,-280Z" fill="#c8323a"/></g>`; }

/* ---------- trivias ---------- */
const SDQUIZ = {
  q1: ['¿En qué continente está Santo Domingo?', ['Europa', 'América', 'Asia'], 1],
  q2: ['¿Santo Domingo es más antigua que Nueva York?', ['No, es más joven', 'Tiene la misma edad', 'Sí, es mucho más antigua'], 2],
  q3: ['¿Dónde nació Oscar de la Renta?', ['París', 'Santo Domingo', 'Nueva York'], 1],
  q4: ['«Espérame un chin», ¿qué quiere decir?', ['Mucho tiempo', 'Nunca', 'Un poquito'], 2],
  q5: ['¿Qué NO forma parte de la bandera dominicana?', ['Arroz', 'Habichuelas', 'Pasta'], 2],
  q6: ['¿De qué se hace principalmente el mangú?', ['Papas', 'Plátanos verdes', 'Arroz'], 1],
  q7: ['¿Cuándo se prepara normalmente el sancocho?', ['Solo en restaurantes', 'En reuniones familiares', 'Solo en Navidad'], 1],
  q8: ['¿Qué nos enseña la comida dominicana?', ['Que solo se trata de comer', 'Que es parte de la cultura y la familia', 'Que todos comen lo mismo'], 1],
};
Object.entries(SDQUIZ).forEach(([k, [q, o, c]]) => { scenes['sd_' + k] = t => SDD + quizScene(q, o, c, false, t); scenes['sd_' + k + 'r'] = t => SDD + quizScene(q, o, c, true, t); });

/* ---------- escenas ---------- */
scenes.sd_intro = function (t) {
  let s = SDALL() + rSky('day') + rSun(1650, 150) + rClouds(t, [[300, 120, .8], [1200, 90, .6]]) + seaWall(t, 700);
  for (let i = 0; i < 6; i++) s += palm(140 + i * 330, 760, .9, t, i);
  s += sdCrowd(t, 5, 12, 800, 1060);
  return s + `<g transform="translate(${W / 2},${H / 2 - 230})"><rect x="-600" y="-150" width="1200" height="300" rx="40" fill="#fff" opacity=".95" stroke="#2b3a67" stroke-width="6"/>
  <text x="0" y="-30" font-family="Fredoka" font-weight="700" font-size="104" text-anchor="middle" fill="#ffcc2e" stroke="#2b3a67" stroke-width="6" paint-order="stroke">Mi Pequeño Atlas</text>
  <rect x="-420" y="20" width="840" height="96" rx="22" fill="#002d62"/><text x="0" y="88" font-family="Fredoka" font-weight="700" font-size="60" text-anchor="middle" fill="#fff">Capítulo 5: Santo Domingo</text></g>`;
};
scenes.sd_postales = function (t) {
  const card = (i, name, label) => `<g transform="translate(${80 + i * 455},330) rotate(${(i - 1.5) * 2.5})"><rect x="-4" y="-2" width="430" height="360" fill="#000" opacity=".25"/><rect x="-12" y="-12" width="430" height="360" fill="#fff"/><circle cx="203" cy="-4" r="12" fill="#e8352a"/>
  <svg x="0" y="0" width="406" height="228" viewBox="0 0 1920 1080">${scenes[name](t)}</svg><text x="203" y="300" font-family="Fredoka" font-weight="700" font-size="44" text-anchor="middle" fill="#2b3a67">${label}</text></g>`;
  return SDALL() + `<rect width="${W}" height="${H}" fill="#b9895a"/><rect x="30" y="30" width="${W - 60}" height="${H - 60}" fill="none" stroke="#7a5232" stroke-width="30"/>` + rLabel('¡Ya hemos viajado juntos a…!', W / 2, 170, 48)
    + card(0, 'r_torre', 'Tokio') + card(1, 'ro_coliseo', 'Roma') + card(2, 'ma_palacio', 'Madrid') + card(3, 'p_eiffel', 'París');
};
scenes.sd_colonial = function (t) {
  let s = SDALL() + rSky('day') + rSun(300, 140);
  s += colonialHouse(-20, 760, 460, 520, '#f2c86a', { bougain: true }) + colonialHouse(440, 760, 360, 460, '#7ac0c8') + colonialHouse(800, 760, 380, 500, '#e88a7a') + colonialHouse(1180, 760, 360, 440, '#b8d48a', { bougain: true }) + colonialHouse(1540, 760, 400, 520, '#f4efe0');
  s += stoneStreet(760) + sdCrowd(t, 15, 12, 800, 1060);
  return s + rLabel('Zona Colonial: calles de piedra y balcones antiguos', W / 2, 80, 38);
};
scenes.sd_mapa_america = function (t) {
  let s = SDALL() + `<rect width="${W}" height="${H}" fill="#7fb6dc"/>`;
  s += `<path d="M300,60 L700,40 L900,90 L980,180 L900,250 L860,330 L780,360 L720,420 L640,440 L600,500 L640,560 L700,590 L760,610 L730,560 L680,530 L620,520 L560,470 L480,400 L400,330 L340,250 L280,160Z" fill="#cfe2b8" stroke="#2b3a67" stroke-width="4" stroke-linejoin="round"/>
  <path d="M760,640 L860,620 L980,660 L1080,720 L1120,800 L1060,880 L980,960 L920,1060 L880,1080 L860,1000 L820,900 L780,800 L750,720Z" fill="#cfe2b8" stroke="#2b3a67" stroke-width="4" stroke-linejoin="round"/>
  <text x="560" y="230" font-family="Fredoka" font-weight="700" font-size="46" fill="#5a7a4a">AMÉRICA DEL NORTE</text><text x="930" y="820" font-family="Fredoka" font-weight="700" font-size="40" fill="#5a7a4a" text-anchor="middle">AMÉRICA DEL SUR</text>
  <ellipse cx="960" cy="560" rx="230" ry="80" fill="#4fd0e8" opacity=".35"/><text x="1080" y="650" font-family="Fredoka" font-weight="700" font-size="40" fill="#0f6a98">MAR CARIBE</text>
  <path d="M780,520 L860,510 L900,530 L840,540Z M930,540 l60,-6 l20,12 l-30,10 l-50,-4Z M1010,548 l24,0 l0,10 l-24,0Z" fill="#f2d98a" stroke="#2b3a67" stroke-width="3"/>`;
  const p = 1 + .18 * Math.max(0, S(t, 4));
  s += `<g transform="translate(985,538)">${[0, 1].map(k => `<circle r="${20 + ((t / L * 4 + k * .5) % 1) * 120}" fill="none" stroke="#e8352a" stroke-width="4" opacity="${1 - ((t / L * 4 + k * .5) % 1)}"/>`).join('')}<circle r="${14 * p}" fill="#e8352a" stroke="#fff" stroke-width="4"/></g>`;
  return s + rLabel('Santo Domingo', 1180, 480, 42, '#e8352a') + rLabel('Santo Domingo está en América, en el Caribe', W / 2, 1010, 38);
};
scenes.sd_caribe = function (t) {
  let s = SDALL() + rSky('day') + rSun(1600, 160) + rClouds(t, [[400, 140, .8]]) + `<rect x="0" y="480" width="${W}" height="300" fill="url(#sdSea)"/>${[...Array(16)].map((_, i) => `<path d="M${(i * 137 + t / L * 100) % W},${500 + (i * 41) % 260} q30,-8 60,0" stroke="#bfefff" stroke-width="4" fill="none" opacity=".7"/>`).join('')}`;
  s += `<path d="M0,760 Q${480 + S(t, 1) * 20},${730} 960,760 T1920,760 L1920,1080 L0,1080Z" fill="url(#sdSand)"/><path d="M0,770 Q480,${740 + S(t, 1) * 8} 960,770 T1920,770" stroke="#fff" stroke-width="10" fill="none" opacity=".7"/>`;
  s += palm(220, 860, 1.2, t, 1) + palm(1700, 880, 1.3, t, 2) + rP(800, 960, 1.9, t, ESC({ ph: 2, child: true, top: '#f2c14e', wave: true })) + rP(1040, 990, 2.1, t, ESC({ ph: 3, top: '#ce1126' }));
  return s + rLabel('El Caribe: mar azul, clima cálido y gente alegre', W / 2, 80, 38);
};
scenes.sd_isla = function (t) {
  let s = SDALL() + `<rect width="${W}" height="${H}" fill="#7fc6e0"/>${[...Array(18)].map((_, i) => `<path d="M${(i * 137 + t / L * 60) % W},${80 + (i * 61) % 900} q30,-8 60,0" stroke="#bfefff" stroke-width="4" fill="none" opacity=".6"/>`).join('')}`;
  s += hispaniola(960, 520, 1.7);
  const p = 1 + .18 * Math.max(0, S(t, 4));
  s += `<g transform="translate(1150,640)"><circle r="${16 * p}" fill="#e8352a" stroke="#fff" stroke-width="5"/></g>` + rLabel('Santo Domingo (capital)', 1150, 720, 36, '#e8352a');
  return s + rLabel('La isla La Española: dos países', W / 2, 90, 44);
};
scenes.sd_trivias = function (t) {
  let s = SDALL() + `<rect width="${W}" height="${H}" fill="#1f4f8a"/>`;
  s += [...Array(14)].map((_, i) => `<text x="${(i * 157) % W}" y="${((i * 97) + t / L * 300) % H}" font-family="Fredoka" font-weight="700" font-size="${60 + (i % 3) * 20}" fill="#ffcc2e" opacity=".35">?</text>`).join('');
  return s + `<g transform="translate(960,480) scale(${1 + S(t, 2) * .03})"><rect x="-460" y="-140" width="920" height="280" rx="50" fill="#ffcc2e" stroke="#fff" stroke-width="10"/><text x="0" y="40" font-family="Fredoka" font-weight="700" font-size="130" text-anchor="middle" fill="#1f2a4a" letter-spacing="16" style="font-variant-ligatures:none">¡TRIVIAS!</text></g>` + rLabel('¡Estén súper atentos!', W / 2, 820, 46);
};
scenes.sd_1496 = function (t) {
  let s = SDALL() + rSky('day') + rSun(1600, 160) + `<rect x="0" y="560" width="${W}" height="520" fill="url(#sdSea)"/>${[...Array(16)].map((_, i) => `<path d="M${(i * 137 + t / L * 100) % W},${580 + (i * 41) % 480} q30,-8 60,0" stroke="#bfefff" stroke-width="4" fill="none" opacity=".6"/>`).join('')}`;
  s += `<path d="M1300,560 Q1500,500 1920,520 L1920,640 Q1600,620 1300,600Z" fill="url(#sdSand)"/>` + palm(1560, 590, .5, t, 1) + palm(1720, 580, .55, t, 3) + palm(1840, 586, .45, t, 4);
  s += caravel(560, 760, 1.1, t, 0) + caravel(1060, 690, .7, t, 1);
  return s + `<g transform="translate(400,180)"><rect x="-220" y="-90" width="440" height="180" rx="30" fill="#fff" stroke="#c8323a" stroke-width="8"/><text x="0" y="46" font-family="Fredoka" font-weight="700" font-size="130" text-anchor="middle" fill="#c8323a">1496</text></g>` + rLabel('Fundada por Bartolomé Colón: ¡más de 500 años!', W / 2, 1010, 38);
};
scenes.sd_primera = function (t) {
  let s = SDALL() + `<rect width="${W}" height="${H}" fill="#f4ead4"/>`;
  s += `<g transform="translate(960,560)"><rect x="-420" y="-300" width="840" height="560" rx="20" fill="#e8d8b0" stroke="#8a6a3a" stroke-width="8"/><path d="M-420,-300 Q-460,0 -420,260" stroke="#c9b48a" stroke-width="20" fill="none"/>${[...Array(9)].map((_, i) => `<line x1="-360" y1="${-200 + i * 50}" x2="360" y2="${-200 + i * 50}" stroke="#c9b48a" stroke-width="3"/>`).join('')}<svg x="-380" y="-260" width="760" height="420" viewBox="0 0 1920 1080">${scenes.sd_colonial(t).replace(/<g transform="translate\(960,80\)">[\s\S]*$/, '')}</svg></g>`;
  const cities = [['Nueva York', 300, 260], ['Ciudad de México', 1620, 300], ['Buenos Aires', 1620, 820]];
  s += cities.map(([n, x, y]) => `<g opacity=".75">${rLabel(n + ': aún no existía', x, y, 32, '#7a7a7a')}</g>`).join('');
  return s + rLabel('Primera ciudad europea permanente de América', W / 2, 110, 42) + rLabel('Santo Domingo ya tenía calles, iglesias y plazas', W / 2, 960, 36);
};
scenes.sd_primeras = function (t) {
  let s = SDALL() + `<rect width="${W}" height="${H}" fill="#fdf3dc"/>`;
  const card = (x, inner, title, i) => `<g transform="translate(${x},540) scale(${1 + .03 * Math.max(0, S(t, 1, i * 2))})"><rect x="-270" y="-300" width="540" height="560" rx="30" fill="#fff" stroke="#002d62" stroke-width="7"/><svg x="-250" y="-280" width="500" height="380" viewBox="-600 -700 1200 900">${inner}</svg><text x="0" y="200" font-family="Fredoka" font-weight="700" font-size="44" text-anchor="middle" fill="#ce1126">${title}</text></g>`;
  s += card(380, `<rect x="-600" y="-700" width="1200" height="900" fill="#a8cff0"/><rect x="-600" y="0" width="1200" height="200" fill="#c9bca2"/>` + catedral(0, 0, .95), 'Primera catedral', 0);
  s += card(960, `<rect x="-600" y="-700" width="1200" height="900" fill="#a8cff0"/><rect x="-600" y="0" width="1200" height="200" fill="#c9bca2"/><rect x="-420" y="-360" width="840" height="360" fill="url(#sdCoral)"/>${[...Array(6)].map((_, i) => `<path d="M${-360 + i * 140},0 v-160 q50,-70 100,0 v160Z" fill="#8a6a4a" opacity=".5"/>`).join('')}<path d="M-180,-540 L-160,-360 L-120,-360 L-100,-540 L-120,-560 L-160,-560Z" fill="#b8925a" opacity=".5"/><rect x="-80" y="-300" width="160" height="60" fill="#fff"/><path d="M-20,-290 h40 v14 h14 v14 h-14 v14 h-40 v-14 h-14 v-14 h14Z" fill="#ce1126"/>`, 'Primer hospital', 1);
  s += card(1540, `<rect x="-600" y="-700" width="1200" height="900" fill="#a8cff0"/><rect x="-600" y="0" width="1200" height="200" fill="#c9bca2"/><rect x="-440" y="-380" width="880" height="380" fill="#e8dcc0"/><path d="M-480,-380 L0,-560 L480,-380Z" fill="#c9a468"/>${[...Array(7)].map((_, i) => `<rect x="${-400 + i * 130}" y="-340" width="50" height="340" fill="#f4efe0"/>`).join('')}<g transform="translate(0,-460)"><path d="M-90,0 L0,-40 L90,0 L0,40Z" fill="#2b3a67"/><path d="M60,10 v50" stroke="#ffcc2e" stroke-width="8"/></g>`, 'Primera universidad', 2);
  return s + rLabel('¡Las primeras de América!', W / 2, 110, 46);
};
scenes.sd_cordones = function (t) {
  let s = SDALL() + rSky('day') + colonialHouse(-20, 640, 980, 460, '#f2c86a', { bougain: true }) + colonialHouse(960, 640, 980, 440, '#7ac0c8') + stoneStreet(640);
  s += `<g transform="translate(960,960)">${rShadow(0, 20, 300, .25)}<path d="M-300,20 Q-320,-60 -220,-90 L-40,-110 Q20,-200 120,-190 Q200,-180 220,-90 Q320,-60 320,20Z" fill="#ce1126"/><path d="M-310,20 L330,20 L326,52 L-304,52Z" fill="#fff"/>
  ${[...Array(5)].map((_, i) => `<line x1="${-10 + i * 40}" y1="-140" x2="${20 + i * 40}" y2="-110" stroke="#fff" stroke-width="8"/>`).join('')}<path d="M90,-170 q${-60 + S(t, 2) * 20},-80 -120,-40 M90,-170 q${60 - S(t, 2) * 20},-90 110,-30" stroke="#fff" stroke-width="10" fill="none" stroke-linecap="round"/></g>`;
  return s + rLabel('¡Amárrense los cordones!', W / 2, 90, 50);
};
scenes.sd_alcazar = function (t) {
  let s = SDALL() + rSky('day') + rSun(1650, 140) + rClouds(t, [[300, 120, .8]]) + alcazar(960, 800, 1.05) + `<rect x="0" y="800" width="${W}" height="280" fill="#d9ccb0"/>${[...Array(14)].map((_, i) => `<line x1="0" y1="${820 + i * 18}" x2="${W}" y2="${820 + i * 18}" stroke="#c9bc9e" stroke-width="2"/>`).join('')}`;
  s += palm(140, 860, .8, t, 1) + palm(1790, 860, .8, t, 2) + sdCrowd(t, 25, 10, 860, 1060);
  return s + rLabel('Alcázar de Colón: la casa de Diego Colón', W / 2, 1010, 38);
};
scenes.sd_alcazar_vida = function (t) {
  let s = SDALL() + `<rect width="${W}" height="${H}" fill="#e8d8b0"/>${[...Array(5)].map((_, i) => `<path d="M${120 + i * 380},640 L${120 + i * 380},260 Q${290 + i * 380},120 ${460 + i * 380},260 L${460 + i * 380},640" fill="#a8cff0" stroke="#c9a468" stroke-width="20"/>`).join('')}` + grass(640);
  s += `<g transform="translate(1500,620)"><ellipse cx="0" cy="0" rx="160" ry="40" fill="#cfc6b4"/><ellipse cx="0" cy="-6" rx="140" ry="30" fill="url(#maLake)"/><rect x="-14" y="-100" width="28" height="94" fill="#cfc6b4"/>${[0, 1, 2].map(k => `<path d="M0,-100 q${-40 + k * 40},-30 ${-60 + k * 60},60" stroke="#cfeaf4" stroke-width="5" fill="none" opacity=".8"/>`).join('')}</g>`;
  s += rP(500, 960, 2.1, t, { ph: 1, child: true, top: '#f4efe0', bot: '#5a3a22' }) + rP(860, 980, 2.0, t, { ph: 3, child: true, top: '#7a3a3a', bot: '#2b2f3a', dir: -1 }) + `<g transform="translate(${680 + S(t, 2) * 60},940)"><circle r="40" fill="none" stroke="#8a6a46" stroke-width="10"/></g>` + rP(1200, 990, 2.4, t, ESC({ ph: 2, top: '#2b3a67', skirt: '#2b3a67' }));
  return s + rLabel('Sin televisión ni electricidad… ¡pero con patios y juegos!', W / 2, 90, 36);
};
scenes.sd_catedral = function (t) {
  let s = SDALL() + rSky('day') + rSun(300, 140) + rClouds(t, [[1300, 110, .7]]) + catedral(940, 800, 1.1) + `<rect x="0" y="800" width="${W}" height="280" fill="#cfc6b4"/>${[...Array(14)].map((_, i) => `<line x1="${i * 150}" y1="800" x2="${i * 150 - 100}" y2="${H}" stroke="#bdb3a0" stroke-width="3"/>`).join('')}`;
  s += rTree(120, 840, .7, 'green', t, 61) + columbusStatue(1640, 960, 1) + sdCrowd(t, 35, 10, 850, 1060);
  return s + rLabel('Catedral Primada de América', W / 2, 80, 44);
};
scenes.sd_malecon = function (t) {
  let s = SDALL() + rSky('dusk') + rSun(1500, 380, 80) + seaWall(t, 640);
  for (let i = 0; i < 7; i++) s += palm(80 + i * 300, 700, .8, t, i);
  s += sdCrowd(t, 45, 16, 760, 1070) + [...Array(3)].map((_, i) => `<text x="${300 + i * 60}" y="${700 - ((t / L * 2 + i * .3) % 1) * 140}" font-size="44" fill="#2b3a67" opacity="${1 - ((t / L * 2 + i * .3) % 1)}">♪</text>`).join('');
  return s + rLabel('El Malecón: el mar, la brisa y la música', W / 2, 80, 40);
};
scenes.sd_ropa = function (t) {
  let s = SDALL() + rSky('day') + rSun(1600, 170, 90) + colonialHouse(-20, 700, 980, 460, '#f2c86a', { bougain: true }) + colonialHouse(960, 700, 980, 480, '#e88a7a') + stoneStreet(700);
  s += rP(500, 1000, 2.3, t, ESC({ ph: 1, top: '#fff', bot: '#e9e2d4', cap: '#f2c14e' })) + rP(820, 1010, 2.0, t, ESC({ ph: 3, child: true, top: '#4fb3f6', bot: '#f2c14e' })) + rP(1140, 1000, 2.3, t, ESC({ ph: 4, top: '#f29a3a', skirt: '#fff', longhair: true, dir: -1 }));
  s += `<g transform="translate(1600,320)"><rect x="-26" y="-140" width="52" height="220" rx="26" fill="#fff" stroke="#2b3a67" stroke-width="6"/><circle cx="0" cy="110" r="50" fill="#fff" stroke="#2b3a67" stroke-width="6"/><circle cx="0" cy="110" r="36" fill="#e8352a"/><rect x="-12" y="-60" width="24" height="170" fill="#e8352a"/><text x="70" y="0" font-family="Fredoka" font-weight="700" font-size="54" fill="#e8352a">¡Calor!</text></g>`;
  return s + rLabel('Ropa fresca, ligera y cómoda', W / 2, 80, 44);
};
scenes.sd_moda = function (t) {
  let s = SDALL() + `<rect width="${W}" height="${H}" fill="#2a2030"/>${[...Array(8)].map((_, i) => `<path d="M${240 * i + 120},0 L${240 * i + 40},700 L${240 * i + 200},700Z" fill="#fff" opacity=".05"/>`).join('')}<path d="M760,1080 L860,500 L1060,500 L1160,1080Z" fill="#e8e2d4"/><path d="M860,500 L1060,500 L1060,480 L860,480Z" fill="#cfc6b4"/>`;
  const model = (x, y, sc, col) => `<g transform="translate(${x},${y}) scale(${sc})">${rShadow(0, 0, 40)}<path d="M-12,-60 L-30,0 L30,0 L12,-60Z" fill="${col}"/><path d="M-50,0 Q-20,-40 -14,-70 L14,-70 Q20,-40 50,0Z" fill="${col}"/><path d="M-16,-130 L16,-130 L14,-70 L-14,-70Z" fill="${col}"/><circle cx="0" cy="-148" r="14" fill="#c99470"/><path d="M-14,-150 Q0,-172 14,-150 L14,-156 Q0,-166 -14,-156Z" fill="#1a1010"/><circle cx="0" cy="-166" r="9" fill="#1a1010"/><path d="M-16,-124 L-24,-70 M16,-124 L24,-70" stroke="#c99470" stroke-width="6"/></g>`;
  s += model(960, 900 - S(t, 1) * 30, 2.6, '#ce1126') + model(1440, 980, 2.2, '#002d62') + model(480, 980, 2.2, '#f2c14e');
  s += [...Array(8)].map((_, i) => `<circle cx="${150 + i * 230}" cy="${1040}" r="${S(t, 8, i) > .8 ? 40 : 0}" fill="#fff" opacity=".7"/>`).join('');
  return s + rLabel('Oscar de la Renta, diseñador famoso, nació en Santo Domingo', W / 2, 90, 34);
};
scenes.sd_palabras = function (t) {
  let s = SDALL() + rSky('day') + colonialHouse(-20, 700, 980, 520, '#7ac0c8') + colonialHouse(960, 700, 980, 520, '#f2c86a', { bougain: true }) + stoneStreet(700) + `<rect width="${W}" height="${H}" fill="#fff" opacity=".22"/>`;
  s += rP(300, 1040, 2.0, t, ESC({ ph: 1, top: '#ce1126', wave: true })) + rP(1640, 1040, 1.8, t, ESC({ ph: 3, child: true, top: '#002d62', dir: -1 }));
  const words = [['¡Dale!', '= OK, vamos'], ['Un chin', '= un poquito'], ['¡Nítido!', '= todo está bien']];
  s += words.map(([w, m], i) => { const x = 960, y = 230 + i * 220, k = 1 + .03 * Math.max(0, S(t, 1, i * 2)); return `<g transform="translate(${x},${y}) scale(${k})"><rect x="-380" y="-85" width="760" height="170" rx="34" fill="#fff" stroke="#002d62" stroke-width="7"/><rect x="-380" y="-85" width="760" height="20" rx="10" fill="#ce1126"/><text x="-150" y="22" font-family="Fredoka" font-weight="700" font-size="70" text-anchor="middle" fill="#002d62">${w}</text><text x="170" y="18" font-family="Fredoka" font-weight="600" font-size="42" text-anchor="middle" fill="#ce1126">${m}</text></g>`; }).join('');
  return s;
};
scenes.sd_mesa = function (t) {
  let s = SDALL() + `<rect width="${W}" height="${H}" fill="#f6e2b8"/><rect x="200" y="140" width="420" height="320" fill="#a8e0f0" stroke="#fff" stroke-width="16"/>` + palm(420, 460, .6, t, 1).replace(/<ellipse[^>]*>/, '');
  s += `<rect x="0" y="700" width="${W}" height="380" fill="#c98a4a"/>`;
  const people = [[360, '#4fb3f6', '#9c6a48', 1], [620, '#f2c14e', '#c99470', 1], [1300, '#ce1126', '#5a3a2a', 0], [1560, '#fff', '#e3b48e', 0]];
  s += people.map(([x, c, sk, ch], i) => rP(x, ch ? 690 : 760, ch ? 1.9 : 2.3, t, ESC({ ph: i, child: !!ch, top: c, skin: sk, longhair: i % 2 == 0, dir: x > 960 ? -1 : 1 }))).join('');
  s += `<path d="M180,640 L1740,640 L1820,760 L100,760Z" fill="#fbfbf7"/>${[...Array(14)].map((_, i) => `<rect x="${180 + i * 112}" y="640" width="56" height="120" fill="#ce1126" opacity=".25"/>`).join('')}<path d="M100,760 L1820,760 L1800,800 L120,800Z" fill="#e8e2d4"/>${[160, 1740].map(x => `<rect x="${x - 14}" y="800" width="28" height="170" fill="#7a5232"/>`).join('')}${rShadow(960, 975, 820, .15)}`;
  s += plate(960, 690, 150, `<ellipse rx="100" ry="30" fill="#f4f0e6"/><ellipse cx="-30" cy="-8" rx="50" ry="20" fill="#fff"/><ellipse cx="40" cy="-4" rx="40" ry="16" fill="#8a3a2a"/>`) + steam(960, 640, t, 2);
  return s + rLabel('Aquí no se cocina con prisa: ¡se cocina con amor!', W / 2, 960, 40);
};
scenes.sd_bandera = function (t) {
  let s = SDALL() + `<rect width="${W}" height="${H}" fill="#fdf3dc"/><rect x="0" y="620" width="${W}" height="460" fill="url(#rWood)"/>` + doFlag(1640, 450, 1.5) + `<rect x="1560" y="642" width="180" height="16" fill="#555"/>`;
  s += `<g transform="translate(860,760)">${rShadow(0, 50, 420, .3)}<ellipse rx="430" ry="140" fill="#fbfbf7"/><ellipse rx="340" ry="104" fill="#f2eee4"/>
  <path d="M-300,10 Q-300,-110 -140,-120 Q0,-110 10,10Z" fill="#fff"/>${[...Array(40)].map((_, i) => `<ellipse cx="${-260 + (i * 37) % 260}" cy="${-90 + (i * 23) % 100}" rx="7" ry="3" fill="#efe9dc"/>`).join('')}
  <path d="M40,-40 Q140,-110 250,-50 Q290,10 200,40 Q100,60 40,-40Z" fill="#b8642a"/><path d="M80,-50 Q150,-90 220,-50" stroke="#8a4418" stroke-width="8" fill="none"/>
  <g transform="translate(-60,60)"><ellipse rx="130" ry="44" fill="#7a2a1a"/>${[...Array(18)].map((_, i) => `<ellipse cx="${-100 + (i * 29) % 200}" cy="${-20 + (i * 13) % 40}" rx="12" ry="8" fill="#a8423a"/>`).join('')}</g>
  <g transform="translate(220,70)">${[0, 1, 2].map(k => `<circle cx="${k * 40 - 40}" cy="${k % 2 * 10}" r="22" fill="#5aa65a"/>`).join('')}<ellipse cx="-80" cy="10" rx="26" ry="16" fill="#e8352a"/></g></g>`;
  return s + rLabel('La bandera dominicana', W / 2, 100, 48) + rArrowLabel('Arroz blanco', 300, 300, 700, 680, 34) + rArrowLabel('Habichuelas', 300, 960, 760, 830, 34) + rArrowLabel('Carne (casi siempre pollo)', 1240, 300, 1010, 700, 34);
};
scenes.sd_mangu = function (t) {
  let s = SDALL() + `<rect width="${W}" height="${H}" fill="#fff4dc"/><rect x="0" y="620" width="${W}" height="460" fill="url(#rCounter)"/>`;
  s += `<g transform="translate(960,760)">${rShadow(0, 50, 420, .3)}<ellipse rx="430" ry="140" fill="#fbfbf7"/><ellipse rx="340" ry="104" fill="#f2eee4"/>
  <path d="M-220,20 Q-240,-130 -60,-140 Q100,-130 80,20Z" fill="#d8d29a"/><path d="M-200,-40 Q-80,-120 40,-60" stroke="#c8c080" stroke-width="6" fill="none"/>
  ${[...Array(6)].map((_, i) => `<ellipse cx="${-170 + i * 46}" cy="${-130 + (i % 2) * 14}" rx="28" ry="10" fill="none" stroke="#a8326a" stroke-width="6"/>`).join('')}
  <g transform="translate(200,-40)"><ellipse rx="90" ry="54" fill="#fff"/><circle cx="10" cy="-6" r="30" fill="#f2b630"/></g>
  <g transform="translate(150,60)">${[0, 1, 2].map(k => `<ellipse cx="${k * 60 - 60}" cy="0" rx="40" ry="24" fill="#c8483a"/><circle cx="${k * 60 - 70}" cy="-6" r="5" fill="#f2d4c4"/>`).join('')}</g>
  <g transform="translate(-240,70)">${[0, 1].map(k => `<rect x="${k * 80 - 60}" y="-20" width="70" height="40" rx="8" fill="#e8b84a"/><rect x="${k * 80 - 54}" y="-14" width="58" height="28" rx="6" fill="#f4e2a0"/>`).join('')}</g></g>`;
  s += `<g transform="translate(260,660)">${[0, 1, 2].map(k => `<path d="M${-60 + k * 50},0 Q${-30 + k * 50},-140 ${k * 50 + 30},-180" stroke="#5a9a3a" stroke-width="34" fill="none" stroke-linecap="round"/>`).join('')}</g>`;
  return s + rLabel('El mangú', W / 2, 100, 48) + rLabel('Plátanos verdes', 260, 720, 32) + rArrowLabel('Cebolla', 520, 300, 820, 630, 32) + rArrowLabel('Huevo', 1500, 300, 1170, 700, 32) + rArrowLabel('Salami', 1600, 900, 1210, 830, 32) + rArrowLabel('Queso frito', 380, 960, 680, 840, 32);
};
scenes.sd_sancocho = function (t) {
  let s = SDALL() + `<rect width="${W}" height="${H}" fill="#f6e2b8"/><rect x="0" y="660" width="${W}" height="420" fill="url(#rWood)"/>`;
  s += `<g transform="translate(760,720)">${rShadow(0, 20, 300, .3)}<path d="M-260,-260 Q-280,0 -220,20 L220,20 Q280,0 260,-260Z" fill="#3a3a3a"/><ellipse cx="0" cy="-260" rx="262" ry="50" fill="#2a2a2a"/><ellipse cx="0" cy="-256" rx="236" ry="40" fill="#d9a43a"/>
  ${[...Array(10)].map((_, i) => `<ellipse cx="${-180 + (i * 47) % 360}" cy="${-262 + (i * 13) % 20}" rx="22" ry="12" fill="${['#a8423a', '#f4ead4', '#f2c860', '#e0a860'][i % 4]}"/>`).join('')}<path d="M-300,-220 q-40,0 -40,40 M300,-220 q40,0 40,40" stroke="#2a2a2a" stroke-width="16" fill="none"/></g>${steam(760, 360, t)}`;
  s += plate(1380, 780, 200, `<path d="M-120,0 Q-110,-60 -30,-62 Q30,-60 30,0Z" fill="#fff"/><path d="M40,-30 Q100,-60 140,-10 Q110,20 50,10Z" fill="#7ab04a"/><path d="M60,-20 Q100,-40 126,-10" fill="#c8d870"/>`);
  s += rLabel('Sancocho: carnes, verduras… ¡y mucho sabor!', W / 2, 100, 42) + rArrowLabel('Arroz blanco y aguacate', 1500, 980, 1360, 800, 32);
  return s;
};
scenes.sd_musica = function (t) {
  let s = SDALL() + `<rect width="${W}" height="${H}" fill="#1e2a4a"/>` + rStars(t, 40) + `<path d="${[...Array(24)].map((_, i) => `${i ? 'L' : 'M'}${40 + i * 80},${188 + Math.sin(i / 2) * 30}`).join(' ')}" stroke="#555" stroke-width="3" fill="none"/>${[...Array(24)].map((_, i) => `<circle cx="${40 + i * 80}" cy="${200 + Math.sin(i / 2) * 30}" r="12" fill="${['#ffd34d', '#ff8a5a', '#8affc0'][i % 3]}" opacity="${.6 + .4 * S(t, 4, i)}"/>`).join('')}<rect x="0" y="780" width="${W}" height="300" fill="#c9a07a"/>`;
  const b = k => Math.abs(S(t, 8, k)) * 10;
  s += rP(420, 960 - b(0), 2.4, t, ESC({ ph: 1, top: '#fff', skin: '#9c6a48', hold: `<g transform="translate(0,-62)"><rect x="-34" y="-30" width="68" height="60" rx="8" fill="#c8323a"/>${[...Array(6)].map((_, k) => `<line x1="${-30 + k * 12}" y1="-30" x2="${-30 + k * 12}" y2="30" stroke="#fff" stroke-width="2"/>`).join('')}</g>` }));
  s += rP(720, 960 - b(1), 2.4, t, ESC({ ph: 2, top: '#002d62', skin: '#c99470', hold: `<g transform="translate(0,-56)"><rect x="-34" y="-22" width="68" height="44" rx="12" fill="#a86a3a"/><ellipse cx="-34" cy="0" rx="7" ry="22" fill="#efe2c6"/><ellipse cx="34" cy="0" rx="7" ry="22" fill="#efe2c6"/></g>` }));
  s += rP(1020, 960 - b(2), 2.4, t, ESC({ ph: 3, top: '#ce1126', skin: '#5a3a2a', hold: `<g transform="translate(0,-60)"><rect x="-10" y="-30" width="20" height="60" rx="8" fill="#c9c9c9"/>${[...Array(6)].map((_, k) => `<line x1="-10" y1="${-24 + k * 10}" x2="10" y2="${-24 + k * 10}" stroke="#888"/>`).join('')}</g>` }));
  s += rP(1320, 960 - b(3), 2.4, t, ESC({ ph: 4, top: '#f2c14e', skin: '#9c6a48', hold: `<g transform="translate(0,-60) rotate(-25)"><ellipse cx="-10" cy="0" rx="34" ry="24" fill="#c98a3a"/><circle cx="-10" cy="0" r="7" fill="#3a2a1a"/><rect x="20" y="-4" width="80" height="8" fill="#6b4a36"/></g>` }));
  s += rP(1620, 990 - b(4), 2.1, t, ESC({ ph: 5, child: true, top: '#fff', skirt: '#ce1126', longhair: true, wave: true }));
  return s + rLabel('Merengue y bachata: ¡ritmos dominicanos!', W / 2, 80, 40) + rLabel('Acordeón', 420, 1030, 28) + rLabel('Tambora', 720, 1030, 28) + rLabel('Güira', 1020, 1030, 28) + rLabel('Guitarra', 1320, 1030, 28);
};
scenes.sd_metro = function (t) {
  let s = SDALL() + `<rect width="${W}" height="${H}" fill="#e8ecef"/><rect x="0" y="0" width="${W}" height="160" fill="#cfd4d8"/>${[...Array(8)].map((_, i) => `<rect x="${i * 260 + 60}" y="40" width="160" height="16" rx="8" fill="#fff"/>`).join('')}<rect x="0" y="760" width="${W}" height="320" fill="#b8bec4"/><rect x="0" y="760" width="${W}" height="24" fill="#f2c14e"/>`;
  const x0 = -200 + ((t / L) * 2400) % 2600 - 600;
  s += `<g transform="translate(${Math.min(160, x0)},0)"><rect x="0" y="300" width="1700" height="440" rx="40" fill="#f4f6fa"/><rect x="0" y="600" width="1700" height="40" fill="#002d62"/><rect x="0" y="640" width="1700" height="20" fill="#ce1126"/>${[...Array(7)].map((_, i) => `<rect x="${60 + i * 230}" y="380" width="160" height="160" rx="16" fill="#3a4a6a"/>`).join('')}<rect x="1600" y="360" width="80" height="200" rx="30" fill="#3a4a6a"/></g>`;
  s += sdCrowd(t, 55, 8, 820, 1070);
  return s + rLabel('El metro de Santo Domingo: una ciudad moderna', W / 2, 220, 40);
};
scenes.sd_ciudades = function (t) {
  let s = SDALL() + `<rect width="${W}" height="${H}" fill="#7fc6e0"/>` + hispaniola(960, 560, 1.7);
  const pin = (x, y, n, ph) => `<g transform="translate(${x},${y}) scale(${1 + .15 * Math.max(0, S(t, 4, ph))})"><circle r="14" fill="#e8352a" stroke="#fff" stroke-width="4"/></g>` + rLabel(n, x, y - 50, 32, '#e8352a');
  return s + pin(1150, 680, 'Santo Domingo', 0) + pin(980, 420, 'Santiago', 1) + pin(1600, 620, 'Punta Cana', 2) + pin(1400, 690, 'La Romana', 3).replace('translate(1400,640)','translate(1420,760)') + rLabel('Otras ciudades importantes', W / 2, 100, 44);
};
function nySkyline(base) { return [...Array(14)].map((_, i) => { const w = 90 + (i * 37) % 70, h = 260 + (i * 89) % 380, x = i * 140 - 20; return `<rect x="${x}" y="${base - h}" width="${w}" height="${h}" fill="${['#8a94a8', '#a4acbc', '#7a8498'][i % 3]}"/>${[...Array(Math.floor(h / 50))].map((_, r) => `<rect x="${x + 10}" y="${base - h + 16 + r * 50}" width="${w - 20}" height="12" fill="#cfe0f0" opacity=".7"/>`).join('')}${i == 6 ? `<path d="M${x + w / 2 - 20},${base - h} L${x + w / 2},${base - h - 120} L${x + w / 2 + 20},${base - h}Z" fill="#8a94a8"/>` : ''}`; }).join(''); }
scenes.sd_carla_titulo = function (t) {
  let s = SDALL() + rSky('day') + nySkyline(760) + street(760) + `<rect width="${W}" height="${H}" fill="#2b3a67" opacity=".35"/>`;
  return s + `<g transform="translate(960,480)"><rect x="-620" y="-200" width="1240" height="400" rx="36" fill="#fffaf0" stroke="#002d62" stroke-width="8"/><text x="0" y="-80" font-family="Fredoka" font-weight="600" font-size="44" text-anchor="middle" fill="#ce1126">Una anécdota</text><text x="0" y="20" font-family="Fredoka" font-weight="700" font-size="80" text-anchor="middle" fill="#2b3a67">Carla y su viaje</text><text x="0" y="110" font-family="Fredoka" font-weight="600" font-size="50" text-anchor="middle" fill="#2b3a67">desde Nueva York</text></g>`;
};
scenes.sd_carla_ny = function (t) {
  let s = SDALL() + rSky('day') + rSun(1600, 150) + nySkyline(760) + street(760);
  s += `<g transform="translate(1400,760)"><rect x="-260" y="-300" width="520" height="300" fill="#b8563a"/>${[...Array(6)].map((_, i) => `<rect x="${-230 + (i % 3) * 170}" y="${-270 + Math.floor(i / 3) * 130}" width="120" height="90" fill="#cfe0f0"/>`).join('')}<rect x="-50" y="-100" width="100" height="100" fill="#4a2a16"/><rect x="-170" y="-340" width="340" height="50" fill="#fff"/><text x="0" y="-302" font-family="Fredoka" font-weight="700" font-size="36" text-anchor="middle" fill="#2b3a67">SCHOOL</text></g>`;
  s += rP(700, 1000, 2.6, t, ESC({ ph: 2, child: true, top: '#f29a3a', skin: '#c99470', longhair: true, bag: '#4fb3f6', wave: true })) + rP(960, 1010, 2.2, t, ESC({ ph: 4, child: true, top: '#5aa65a', dir: -1 })) + rP(1120, 1010, 2.2, t, ESC({ ph: 5, child: true, top: '#7a5a8a', dir: -1, longhair: true }));
  s += bubble(960, 560, 'Hi!', 50, '#2b3a67', -1);
  return s + rLabel('Carla', 700, 640, 36) + rLabel('Nueva York', 300, 90, 40);
};
scenes.sd_carla_viaje = function (t) {
  let s = SDALL() + `<rect width="${W}" height="${H}" fill="url(#rSkyDay)"/>` + rClouds(t, [[200, 300, 1, 3], [900, 760, .8, 3], [1500, 420, 1, 3]]);
  s += `<path d="M260,860 Q960,300 1660,760" stroke="#2b3a67" stroke-width="6" stroke-dasharray="20 16" fill="none"/>` + rLabel('Nueva York', 260, 920, 36) + rLabel('Santo Domingo', 1660, 820, 36);
  const p = (t / L) % 1, x = 260 + p * 1400, y = 860 - Math.sin(p * Math.PI) * 330 - p * 100;
  return s + `<g transform="translate(${x},${y}) rotate(${-20 + p * 40}) scale(.6)"><path d="M-200,0 Q-200,-40 -150,-40 L170,-40 Q220,-30 230,0 Q220,30 170,34 L-150,34 Q-200,34 -200,0Z" fill="#fff" stroke="#2b3a67" stroke-width="4"/><path d="M-150,-40 L-190,-120 L-140,-120 L-90,-40Z" fill="#ce1126"/><path d="M-30,0 L50,110 L100,110 L70,0Z" fill="#dfe4ec"/><path d="M-30,-20 L40,-130 L80,-130 L70,-20Z" fill="#dfe4ec"/></g>`;
};
scenes.sd_carla_sd = function (t) {
  let s = SDALL() + rSky('day') + rSun(300, 150) + colonialHouse(-20, 720, 640, 480, '#f2c86a', { bougain: true }) + colonialHouse(620, 720, 660, 500, '#7ac0c8') + colonialHouse(1280, 720, 660, 470, '#e88a7a', { bougain: true }) + stoneStreet(720);
  s += rP(760, 1000, 2.6, t, ESC({ ph: 2, child: true, top: '#f29a3a', skin: '#c99470', longhair: true, bag: '#4fb3f6' })) + rP(1000, 1010, 2.6, t, ESC({ ph: 3, top: '#fff', skin: '#9c6a48', dir: -1 })) + rP(1180, 1010, 2.4, t, ESC({ ph: 4, top: '#ce1126', skin: '#c99470', skirt: '#002d62', dir: -1, longhair: true }));
  s += [...Array(4)].map((_, i) => `<text x="${1400 + i * 60}" y="${700 - ((t / L * 2 + i * .25) % 1) * 160}" font-size="50" fill="#2b3a67" opacity="${1 - ((t / L * 2 + i * .25) % 1)}">♪</text>`).join('') + palm(1700, 1000, .9, t, 1);
  return s + rLabel('Todo era diferente: el clima, la música, el acento…', W / 2, 80, 38);
};
scenes.sd_carla_orgullo = function (t) {
  let s = SDALL() + rSky('day') + rSun(1600, 150) + nySkyline(760) + street(760);
  s += rP(900, 1010, 3.0, t, ESC({ ph: 2, child: true, top: '#f29a3a', skin: '#c99470', longhair: true, hold: `<g transform="translate(10,-100)">${doFlag(0, 0, .55)}</g>` }));
  s += [...Array(10)].map((_, i) => `<path d="M${700 + Math.cos(i) * 260},${560 + Math.sin(i) * 200} l10,-20 l10,20 l-20,-12 h20Z" fill="#ffcc2e" opacity="${.5 + .5 * S(t, 4, i)}"/>`).join('');
  return s + rLabel('¡Orgullosa de sus raíces!', W / 2, 100, 48);
};
scenes.sd_moraleja = function (t) {
  let s = SDALL() + `<rect width="${W}" height="${H}" fill="#fdf3dc"/>` + grass(820);
  s += `<g transform="translate(960,820)"><path d="M-40,0 Q-30,-200 -50,-360 L50,-360 Q30,-200 40,0Z" fill="#7a5a3a"/>${[...Array(8)].map((_, k) => `<path d="M0,0 q${(k - 3.5) * 40},40 ${(k - 3.5) * 110},${60 + (k % 2) * 30}" stroke="#7a5a3a" stroke-width="${12 - Math.abs(k - 3.5) * 2}" fill="none" stroke-linecap="round"/>`).join('')}
  ${[...Array(22)].map((_, k) => `<circle cx="${Math.cos(k * 1.7) * (120 + (k % 4) * 60)}" cy="${-460 + Math.sin(k * 1.7) * (80 + (k % 3) * 40)}" r="${70 + (k % 3) * 16}" fill="${['#5d8f4a', '#4a7a3a', '#6fa456'][k % 3]}"/>`).join('')}</g>`;
  s += rP(600, 980, 2.4, t, ESC({ ph: 2, child: true, top: '#f29a3a', skin: '#c99470', longhair: true })) + rP(1320, 990, 2.6, t, ESC({ ph: 3, top: '#002d62', skin: '#9c6a48', dir: -1 })) + rP(1480, 990, 2.5, t, ESC({ ph: 4, top: '#ce1126', skin: '#c99470', dir: -1, longhair: true }));
  return s + rLabel('Moraleja: conocer de dónde venimos nos ayuda a entender quiénes somos', W / 2, 1040, 30);
};
scenes.sd_outro = function (t) {
  let s = SDALL() + rSky('dusk') + rSun(1500, 420, 80) + seaWall(t, 700);
  for (let i = 0; i < 6; i++) s += palm(140 + i * 330, 760, .9, t, i);
  s += sdCrowd(t, 65, 12, 800, 1060);
  return s + `<g transform="translate(${W / 2},${H / 2 - 230}) scale(${1 + S(t, 2) * .01})"><rect x="-660" y="-150" width="1320" height="300" rx="40" fill="#fff" opacity=".95" stroke="#2b3a67" stroke-width="6"/>
  <text x="0" y="-20" font-family="Fredoka" font-weight="700" font-size="92" text-anchor="middle" fill="#002d62" stroke="#2b3a67" stroke-width="2" paint-order="stroke">¡Adiós, Santo Domingo!</text>
  <text x="0" y="90" font-family="Fredoka" font-weight="600" font-size="52" text-anchor="middle" fill="#ce1126">Gracias por soñar con nosotros ✈</text></g>`;
};
