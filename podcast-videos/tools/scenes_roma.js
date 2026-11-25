/* =====================================================================
   Mi Pequeño Atlas — Capítulo 3: Roma. Escenas realistas.
   ===================================================================== */
const RO = `<defs>
<linearGradient id="roTrav" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#efe2c4"/><stop offset="1" stop-color="#d6c39c"/></linearGradient>
<linearGradient id="roOchre" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8b070"/><stop offset="1" stop-color="#c98a4a"/></linearGradient>
<linearGradient id="roTerra" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c8603a"/><stop offset="1" stop-color="#a4482a"/></linearGradient>
<linearGradient id="roWater" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fd0e0"/><stop offset="1" stop-color="#3fa0c0"/></linearGradient>
<linearGradient id="roDome" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8aa4b4"/><stop offset=".5" stop-color="#c4d4dc"/><stop offset="1" stop-color="#7a94a4"/></linearGradient>
</defs>`;
const ROALL = () => D() + RO;

/* ---------- piezas ---------- */
function cobbles(y0, h = H) { let s = `<rect x="0" y="${y0}" width="${W}" height="${h - y0}" fill="#6a6058"/>`; const R = rng(9); for (let r = 0; r < 16; r++) { const y = y0 + r * r * 2.6 + r * 10, sz = 10 + r * 3.6; if (y > H) break; for (let x = -(r % 2) * sz / 2; x < W; x += sz + 3) s += `<rect x="${x}" y="${y}" width="${sz}" height="${sz * .7}" rx="${sz * .2}" fill="${['#7a7068', '#857a70', '#6f665e'][Math.floor(R() * 3)]}"/>`; } return s; }
function romanHouse(x, base, w, h, o = {}) {
  const col = o.col || ['#e8b070', '#d98a5a', '#efc88a', '#c96a4a'][Math.abs(Math.round(x / 10)) % 4];
  let s = `<rect x="${x}" y="${base - h}" width="${w}" height="${h}" fill="${col}"/><rect x="${x + w * .85}" y="${base - h}" width="${w * .15}" height="${h}" fill="#000" opacity=".08"/>
  <rect x="${x - 6}" y="${base - h - 14}" width="${w + 12}" height="16" fill="#a4482a"/>`;
  const cols = Math.max(2, Math.floor(w / 80)), rows = Math.floor((h - 110) / 90);
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const wx = x + 20 + c * (w - 40) / cols, wy = base - h + 30 + r * 90, ww = (w - 40) / cols - 30;
    s += `<rect x="${wx}" y="${wy}" width="${ww}" height="56" fill="#3a3a3a"/><rect x="${wx - 8}" y="${wy}" width="8" height="56" fill="#3f6a4a"/><rect x="${wx + ww}" y="${wy}" width="8" height="56" fill="#3f6a4a"/><rect x="${wx - 6}" y="${wy + 56}" width="${ww + 12}" height="6" fill="#efe2c4"/>`;
    if ((r + c) % 3 == 0) s += `<rect x="${wx - 4}" y="${wy + 50}" width="${ww + 8}" height="10" fill="#5a8a3a"/>${[0, 1, 2].map(k => `<circle cx="${wx + 6 + k * ww / 2.5}" cy="${wy + 48}" r="6" fill="${['#e8352a', '#f2a9c0', '#fff'][k]}"/>`).join('')}`; }
  s += `<rect x="${x + w * .3}" y="${base - 90}" width="${w * .4}" height="90" fill="#5a3a22"/><rect x="${x + w * .3}" y="${base - 90}" width="${w * .4}" height="10" fill="#efe2c4"/>`;
  if (o.ivy) s += [...Array(12)].map((_, k) => `<circle cx="${x + 10 + (k * 37) % w}" cy="${base - h + 20 + (k * 53) % (h * .6)}" r="${14 + (k % 3) * 5}" fill="#4a7a3a" opacity=".9"/>`).join('');
  return s;
}
function colosseum(cx, base, s = 1) {
  let o = `<g transform="translate(${cx},${base}) scale(${s})">`;
  o += `<path d="M-620,0 L-620,-420 Q0,-470 380,-430 L620,-300 L620,0Z" fill="url(#roTrav)"/>`;
  o += `<path d="M380,-430 L620,-300 L620,0 L380,0Z" fill="#c9b48a"/><path d="M380,-430 l40,30 l-20,40 l30,30 l-10,50 l40,20 l-20,60 l40,40 l-30,60 l40,40 L380,0Z" fill="#b8a27a"/>`;
  for (let tier = 0; tier < 3; tier++) { const y0 = -tier * 120; for (let i = 0; i < 14; i++) { const x = -600 + i * 70; o += `<path d="M${x + 10},${y0} L${x + 10},${y0 - 80} Q${x + 35},${y0 - 112} ${x + 60},${y0 - 80} L${x + 60},${y0}Z" fill="#5a4a3a" opacity=".85"/><rect x="${x}" y="${y0 - 110}" width="10" height="110" fill="#e6d6b0"/>`; } o += `<rect x="-620" y="${y0 - 120}" width="1000" height="12" fill="#d9c69c"/>`; }
  o += `<rect x="-620" y="-420" width="1000" height="60" fill="#e2d0a8"/>${[...Array(14)].map((_, i) => `<rect x="${-590 + i * 70}" y="-405" width="22" height="30" fill="#9a8a6a"/>`).join('')}`;
  return o + `</g>`;
}
function trevi(cx, base, s = 1, t = 0) {
  let o = `<g transform="translate(${cx},${base}) scale(${s})"><rect x="-700" y="-620" width="1400" height="620" fill="url(#roTrav)"/>
  ${[-560, -400, 400, 560].map(x => `<rect x="${x - 26}" y="-560" width="52" height="420" fill="#efe6cc"/><rect x="${x - 34}" y="-580" width="68" height="24" fill="#e2d4b0"/>`).join('')}
  ${[-480, 480].map(x => `<rect x="${x - 50}" y="-500" width="100" height="120" fill="#4a5664"/><rect x="${x - 50}" y="-330" width="100" height="120" fill="#4a5664"/>`).join('')}
  <path d="M-200,-560 L-200,-140 L200,-140 L200,-560 Q0,-680 -200,-560Z" fill="#e6d8b8"/><path d="M-140,-520 Q0,-610 140,-520 L140,-200 L-140,-200Z" fill="#c9b894"/>
  <rect x="-720" y="-640" width="1440" height="40" fill="#efe2c4"/><rect x="-300" y="-700" width="600" height="70" fill="#e2d4b0"/><text x="0" y="-652" font-family="Fredoka" font-weight="600" font-size="34" text-anchor="middle" fill="#8a7a5a" letter-spacing="8">AQVA VIRGO</text>
  <g transform="translate(0,-260)"><circle cy="-60" r="36" fill="#f2efe6"/><path d="M-50,-30 L50,-30 L60,120 L-60,120Z" fill="#f2efe6"/><path d="M-60,0 L-120,60 M60,0 L120,40" stroke="#f2efe6" stroke-width="18" stroke-linecap="round"/></g>
  ${[-160, 160].map(x => `<g transform="translate(${x},-110)"><ellipse cx="0" cy="0" rx="70" ry="34" fill="#f2efe6"/><circle cx="${x > 0 ? 40 : -40}" cy="-30" r="22" fill="#f2efe6"/></g>`).join('')}
  <path d="M-700,-140 Q-400,-60 -300,-90 Q-150,-40 0,-80 Q150,-40 300,-90 Q400,-60 700,-140 L700,-60 L-700,-60Z" fill="#d9ccb0"/>
  ${[...Array(8)].map((_, i) => `<path d="M${-180 + i * 50},${-120} q4,${30 + (i % 3) * 10} 0,${60}" stroke="#cfeaf4" stroke-width="6" fill="none" opacity="${.6 + .4 * Math.abs(S(t, 4, i))}"/>`).join('')}
  <rect x="-760" y="-60" width="1520" height="60" fill="url(#roWater)"/><rect x="-780" y="-8" width="1560" height="24" fill="#d9ccb0"/></g>`;
  return o;
}
function itFlag(x, y, s = 1) { return `<g transform="translate(${x},${y}) scale(${s})"><line x1="0" y1="0" x2="0" y2="120" stroke="#555" stroke-width="4"/><rect x="0" y="0" width="30" height="60" fill="#2f9a4a"/><rect x="30" y="0" width="30" height="60" fill="#fff"/><rect x="60" y="0" width="30" height="60" fill="#d9343a"/></g>`; }
function legionary(x, y, s, t, ph, dir = 1) { const st = S(t, 8, ph) * 7; return `<g transform="translate(${x},${y}) scale(${s * dir},${s})">${rShadow(0, 0, 22)}
  <path d="M-6,-60 L${-6 + st},0 M6,-60 L${6 - st},0" stroke="#c49a6c" stroke-width="10" stroke-linecap="round"/><path d="M-20,-62 L20,-62 L22,-50 L-22,-50Z" fill="#a8242a"/>
  <rect x="-18" y="-122" width="36" height="64" rx="6" fill="#b8b4a8"/>${[0, 1, 2, 3].map(k => `<line x1="-18" y1="${-112 + k * 14}" x2="18" y2="${-112 + k * 14}" stroke="#7a7668" stroke-width="3"/>`).join('')}
  <rect x="18" y="-120" width="34" height="62" rx="6" fill="#a8242a" stroke="#d9b14a" stroke-width="3"/><circle cx="35" cy="-89" r="6" fill="#d9b14a"/>
  <circle cx="0" cy="-138" r="12" fill="#e2b48e"/><path d="M-14,-140 Q0,-166 14,-140Z" fill="#b8b4a8"/><path d="M-10,-162 Q0,-182 10,-162" stroke="#a8242a" stroke-width="10" fill="none"/></g>`; }

/* ---------- escenas ---------- */
scenes.ro_intro = function (t) {
  let s = ROALL() + rSky('day') + rSun(1550, 170) + rClouds(t, [[300, 130, .8], [1200, 100, .6]]);
  for (let i = 0; i < 4; i++) s += romanHouse(i * 250 - 20, 860, 240, 360 + (i % 2) * 60);
  s += colosseum(1400, 860, .62) + cobbles(850);
  s += pCrowd(t, 3, 10, 900, 1060);
  return s + `<g transform="translate(${W / 2},${H / 2 - 160})"><rect x="-560" y="-150" width="1120" height="300" rx="40" fill="#fff" opacity=".95" stroke="#2b3a67" stroke-width="6"/>
  <text x="0" y="-30" font-family="Fredoka" font-weight="700" font-size="104" text-anchor="middle" fill="#ffcc2e" stroke="#2b3a67" stroke-width="6" paint-order="stroke">Mi Pequeño Atlas</text>
  <rect x="-330" y="20" width="660" height="96" rx="22" fill="#2f9a4a"/><text x="0" y="88" font-family="Fredoka" font-weight="700" font-size="64" text-anchor="middle" fill="#fff">Capítulo 3: Roma</text></g>`;
};
scenes.ro_calle = function (t) {
  let s = ROALL() + rSky('day') + rSun(300, 140);
  s += romanHouse(-20, 760, 560, 640, { ivy: true }) + romanHouse(1380, 760, 560, 620, { ivy: true });
  s += `<path d="M540,760 L1380,760 L1380,200 L540,200Z" fill="url(#rSkyDay)"/>` + romanHouse(560, 680, 400, 460, { col: '#efc88a' }) + romanHouse(960, 680, 420, 500, { col: '#d98a5a' });
  s += cobbles(680);
  for (let i = 0; i < 4; i++) { const o = i * 2; s += `<g transform="translate(${400 + i * 320},${880 + (i % 2) * 40})">${bistroTable(0, 0, .9)}</g>`; }
  return s + pCrowd(t, 13, 10, 720, 1060) + rLabel('Calles de piedra que cuentan historias', W / 2, 90, 40);
};
scenes.ro_coliseo = function (t) {
  let s = ROALL() + rSky('day') + rSun(1650, 150) + rClouds(t, [[300, 130, .8], [1200, 90, .6]]);
  s += `<rect x="0" y="780" width="${W}" height="300" fill="#d9ccb0"/>` + colosseum(900, 820, 1.15) + `<rect x="0" y="820" width="${W}" height="260" fill="#cdbf9e"/>` + rTree(1720, 860, .9, 'green', t, 3) + rTree(140, 860, .8, 'green', t, 4);
  return s + pCrowd(t, 17, 14, 860, 1065) + rLabel('El Coliseo', 330, 90, 44);
};
scenes.ro_mapa = function (t) {
  let s = ROALL() + `<rect width="${W}" height="${H}" fill="#7fb6dc"/>`;
  s += `<path d="M120,160 Q500,90 900,150 Q1300,120 1800,200 L1800,330 Q1400,300 1080,330 Q860,300 700,320 Q400,290 120,330Z" fill="#cfe2b8" stroke="#8aa87a" stroke-width="4"/>`;
  s += `<path d="M720,320 L1000,300 L1060,360 L1010,400 L1080,470 L1170,560 L1260,640 L1320,690 L1400,700 L1420,740 L1380,780 L1330,760 L1300,840 L1270,880 L1240,840 L1250,780 L1200,740 L1150,700 L1080,640 L1000,560 L930,480 L860,420 L780,380Z" fill="#9ed08a" stroke="#2b3a67" stroke-width="6" stroke-linejoin="round"/>
  <path d="M1180,880 l90,-10 l-20,60 l-60,10Z" fill="#9ed08a" stroke="#2b3a67" stroke-width="5"/><path d="M820,640 l40,-10 l10,100 l-40,10Z" fill="#9ed08a" stroke="#2b3a67" stroke-width="5"/>
  <text x="300" y="250" font-family="Fredoka" font-weight="700" font-size="54" fill="#5a7a4a" opacity=".7">EUROPA</text>`;
  const p = 1 + .15 * Math.max(0, S(t, 4));
  s += `<g transform="translate(1060,600) scale(${p})"><circle r="24" fill="#e8352a" stroke="#fff" stroke-width="6"/><circle r="8" fill="#fff"/></g>` + rLabel('Roma', 900, 620, 46, '#e8352a') + rLabel('Italia 🇮🇹 (¡con forma de bota!)', 1460, 470, 40);
  return s + rLabel('Roma está en Europa, en Italia', W / 2, 1010, 38);
};
scenes.ro_foro = function (t) {
  let s = ROALL() + rSky('day') + rSun(1600, 160) + rClouds(t, [[400, 120, .7]]) + `<rect x="0" y="640" width="${W}" height="440" fill="#c9b48a"/>`;
  s += `<g transform="translate(560,820)">${[0, 1, 2].map(i => `<rect x="${-120 + i * 110}" y="-520" width="60" height="520" fill="#efe6cc"/>${[...Array(5)].map((_, k) => `<line x1="${-110 + i * 110 + k * 10}" y1="-520" x2="${-110 + i * 110 + k * 10}" y2="0" stroke="#d9cca8" stroke-width="3"/>`).join('')}`).join('')}<rect x="-140" y="-560" width="300" height="50" fill="#e2d4b0"/></g>`;
  s += `<g transform="translate(1260,820)"><rect x="-260" y="-360" width="520" height="360" fill="#e2d0a8"/><path d="M-120,-0 L-120,-200 Q0,-300 120,-200 L120,0Z" fill="#7a6a54"/><rect x="-280" y="-400" width="560" height="50" fill="#efe2c4"/><text x="0" y="-365" font-family="Fredoka" font-weight="700" font-size="32" text-anchor="middle" fill="#8a7a5a" letter-spacing="6">SPQR</text></g>`;
  for (let i = 0; i < 9; i++) s += `<rect x="${120 + i * 200}" y="${840 + (i % 3) * 40}" width="${60 + (i % 4) * 20}" height="${30 + (i % 2) * 18}" rx="6" fill="#d9cca8" stroke="#b8a888" stroke-width="3"/>`;
  return s + pCrowd(t, 23, 10, 880, 1060) + rLabel('La ciudad eterna: más de 2.700 años', W / 2, 90, 40);
};
scenes.ro_imperio = function (t) {
  let s = ROALL() + rSky('day') + rSun(1600, 150) + `<rect x="0" y="700" width="${W}" height="380" fill="#c9b48a"/>`;
  s += `<g transform="translate(960,700)"><rect x="-400" y="-300" width="800" height="300" fill="url(#roTrav)"/>${[...Array(8)].map((_, i) => `<rect x="${-370 + i * 100}" y="-280" width="40" height="280" fill="#efe6cc"/>`).join('')}<path d="M-440,-300 L0,-420 L440,-300Z" fill="#e2d4b0"/><text x="0" y="-320" font-family="Fredoka" font-weight="700" font-size="44" text-anchor="middle" fill="#8a7a5a" letter-spacing="10">SPQR</text></g>`;
  for (let r = 0; r < 2; r++) for (let i = 0; i < 9; i++) { const x = ((i * 200 + t / L * 400) % (W + 200)) - 100; s += legionary(x, 900 + r * 120, 1.3 + r * .3, t, i + r * 3, 1); }
  s += `<g transform="translate(${((t / L * 400) % (W + 200)) + 100},780)"><line x1="0" y1="0" x2="0" y2="-180" stroke="#7a5a3a" stroke-width="8"/><rect x="-40" y="-180" width="80" height="80" fill="#a8242a" stroke="#d9b14a" stroke-width="5"/><text x="0" y="-128" font-family="Fredoka" font-weight="700" font-size="24" text-anchor="middle" fill="#d9b14a">SPQR</text><path d="M-20,-200 Q0,-240 20,-200Z" fill="#d9b14a"/></g>`;
  return s + rLabel('El Imperio romano', W / 2, 90, 44);
};
scenes.ro_trevi = function (t) {
  let s = ROALL() + rSky('day') + trevi(960, 1000, .95, t) + `<rect x="0" y="1000" width="${W}" height="80" fill="#d9ccb0"/>`;
  for (let i = 0; i < 3; i++) { const o = ((t / L * 1.5 + i / 3) % 1); s += `<circle cx="${700 + i * 260}" cy="${880 - Math.sin(o * Math.PI) * 220}" r="12" fill="#e8c24a" stroke="#a8862a" stroke-width="3" opacity="${o < .9 ? 1 : 0}"/>`; }
  return s + pCrowd(t, 29, 8, 1010, 1075) + rLabel('Fontana di Trevi', 330, 90, 44);
};

/* ---------- trivia ---------- */
function quizScene(q, opts, correct, reveal, t) {
  let s = ROALL() + `<rect width="${W}" height="${H}" fill="#1f4f8a"/><rect width="${W}" height="${H}" fill="url(#dots)" opacity=".5"/>
  <g transform="translate(${W / 2},170)"><rect x="-120" y="-60" width="240" height="70" rx="35" fill="#ffcc2e"/><text x="0" y="-12" font-family="Fredoka" font-weight="700" font-size="40" text-anchor="middle" fill="#1f2a4a" letter-spacing="4" style="font-variant-ligatures:none">TRIVIA</text></g>
  <g transform="translate(${W / 2},300)"><rect x="-820" y="-70" width="1640" height="140" rx="30" fill="#fff"/><text x="0" y="18" font-family="Fredoka" font-weight="700" font-size="${q.length > 48 ? 44 : 54}" text-anchor="middle" fill="#1f2a4a">${q}</text></g>`;
  opts.forEach((o, i) => { const y = 480 + i * 150, ok = reveal && i === correct, all = reveal && correct === -1;
    const fill = ok || all ? '#3aa65a' : '#ffffff', fg = ok || all ? '#fff' : '#1f2a4a';
    s += `<g transform="translate(${W / 2},${y})${ok ? ` scale(${1 + .03 * Math.abs(S(t, 4))})` : ''}"><rect x="-640" y="-56" width="1280" height="112" rx="28" fill="${fill}" stroke="#ffcc2e" stroke-width="${ok || all ? 8 : 0}"/>
    <circle cx="-570" cy="0" r="38" fill="#ffcc2e"/><text x="-570" y="14" font-family="Fredoka" font-weight="700" font-size="40" text-anchor="middle" fill="#1f2a4a">${'ABC'[i]}</text>
    <text x="-500" y="16" font-family="Fredoka" font-weight="600" font-size="44" fill="${fg}">${o}</text>${ok || all ? `<text x="580" y="18" font-family="Fredoka" font-weight="700" font-size="56" text-anchor="middle" fill="#fff">✓</text>` : ''}</g>`; });
  return s;
}
const QUIZ = {
  q1: ['¿En qué continente está Roma?', ['África', 'Europa', 'América'], 1],
  q2: ['¿Por qué a Roma la llaman la ciudad eterna?', ['Porque nunca duerme', 'Porque tiene miles de años y sigue en pie', 'Porque siempre hace sol'], 1],
  q3: ['¿Qué significa la palabra ciao?', ['Hola', 'Gracias', 'Amigo'], 0],
  q4: ['¿Cómo es la pizza romana?', ['Muy gruesa', 'Delgada y crujiente', 'Dulce'], 1],
  q5: ['¿Cómo se llama el helado italiano?', ['Ice cream', 'Helado', 'Gelato'], 2],
  q6: ['¿Qué aprenden los niños romanos desde pequeños?', ['A cuidar la ciudad', 'A correr carreras', 'A construir castillos'], 0],
  q7: ['¿Qué edificio era un estadio gigante hace casi 2.000 años?', ['El Panteón', 'El Coliseo', 'El Vaticano'], 1],
  q8: ['Si visitaran Roma, ¿qué les gustaría más?', ['Comer pizza y gelato', 'Caminar por edificios antiguos', 'Aprender palabras en italiano'], -1],
};
Object.entries(QUIZ).forEach(([k, [q, o, c]]) => { scenes['ro_' + k] = t => quizScene(q, o, c, false, t); scenes['ro_' + k + 'r'] = t => quizScene(q, o, c, true, t); });

/* ---------- curiosidades ---------- */
scenes.ro_gatos = function (t) {
  let s = ROALL() + rSky('day') + romanHouse(0, 520, 960, 380, { col: '#e8b070' }) + romanHouse(960, 520, 960, 400, { col: '#d98a5a' });
  s += `<rect x="0" y="520" width="${W}" height="80" fill="#9a958c"/><rect x="0" y="600" width="${W}" height="480" fill="#b8a888"/>`;
  [[300, .9], [620, 1.1], [1000, .8], [1320, 1.05], [1600, .9]].forEach(([x, sc], i) => s += `<g transform="translate(${x},${880 + (i % 2) * 60})">${rShadow(0, 0, 60)}<rect x="${-40 * sc}" y="${-380 * sc}" width="${80 * sc}" height="${380 * sc}" fill="#e6d8b8"/>${i % 2 ? `<rect x="${-60 * sc}" y="${-400 * sc}" width="${120 * sc}" height="${24 * sc}" fill="#d9cca8"/>` : ''}</g>`);
  const cat = (x, y, s_, c, sit) => `<g transform="translate(${x},${y}) scale(${s_})">${rShadow(0, 0, 40)}<ellipse cx="0" cy="-30" rx="${sit ? 30 : 46}" ry="${sit ? 34 : 24}" fill="${c}"/><circle cx="${sit ? 0 : 40}" cy="${sit ? -76 : -50}" r="20" fill="${c}"/><path d="M${sit ? -14 : 26},${sit ? -90 : -64} l6,-16 l8,14 M${sit ? 4 : 44},${sit ? -92 : -66} l8,-14 l6,16" fill="${c}" stroke="${c}" stroke-width="4"/><path d="M${sit ? 26 : -44},${sit ? -10 : -30} q30,${-30 + S(t, 2) * 10} 20,-60" stroke="${c}" stroke-width="10" fill="none" stroke-linecap="round"/><circle cx="${sit ? -7 : 34}" cy="${sit ? -78 : -52}" r="3" fill="#2a2a2a"/><circle cx="${sit ? 7 : 47}" cy="${sit ? -78 : -52}" r="3" fill="#2a2a2a"/></g>`;
  s += cat(420, 980, 1.4, '#e89a4a', true) + cat(820, 920, 1.2, '#4a4a4a', false) + cat(1200, 1000, 1.5, '#f4f0e6', true) + cat(1500, 940, 1.2, '#a07a5a', false) + cat(700, 690, .8, '#e89a4a', true);
  s += rP(1700, 1050, 1.8, t, { ph: 2, top: '#5a6a5a', walk: false, hold: `<ellipse cx="10" cy="-60" rx="18" ry="8" fill="#c9a77a"/>` });
  return s + rLabel('Gatos que viven entre ruinas antiguas', W / 2, 90, 40);
};
scenes.ro_nasone = function (t) {
  let s = ROALL() + rSky('day') + romanHouse(0, 720, W, 620, { col: '#efc88a' }) + cobbles(720);
  s += `<g transform="translate(900,980)">${rShadow(0, 0, 80)}<rect x="-40" y="-300" width="80" height="300" rx="10" fill="#4a5a4a"/><rect x="-46" y="-310" width="92" height="20" rx="8" fill="#3a4a3a"/><path d="M40,-170 q40,0 40,30" stroke="#4a5a4a" stroke-width="16" fill="none"/>
  <path d="M80,-140 q6,${70 + S(t, 8) * 4} 0,140" stroke="#8ad4ec" stroke-width="7" fill="none" opacity=".9"/><rect x="40" y="-6" width="100" height="10" fill="#6a7a6a"/></g>`;
  s += rP(1120, 1020, 1.7, t, { ph: 1, child: true, top: '#f2c14e', walk: false, bow: 30 });
  return s + rLabel('Fuentes con agua potable: ¡puedes beber!', W / 2, 90, 40);
};
scenes.ro_via = function (t) {
  let s = ROALL() + rSky('day') + rSun(1600, 160) + `<rect x="0" y="520" width="${W}" height="560" fill="#9cc47e"/>`;
  for (let i = 0; i < 8; i++) { const k = i / 8; s += `<g transform="translate(${760 - 600 * (1 - k)},${540 + 480 * (1 - k)}) scale(${.4 + (1 - k) * .9})"><rect x="-8" y="-260" width="16" height="260" fill="#6a4a36"/><ellipse cx="0" cy="-300" rx="26" ry="90" fill="#3f6a3a"/></g><g transform="translate(${1160 + 600 * (1 - k)},${540 + 480 * (1 - k)}) scale(${.4 + (1 - k) * .9})"><rect x="-8" y="-260" width="16" height="260" fill="#6a4a36"/><ellipse cx="0" cy="-300" rx="26" ry="90" fill="#3f6a3a"/></g>`; }
  s += `<path d="M880,520 L1040,520 L1500,1080 L420,1080Z" fill="#8a8076"/>`;
  const R = rng(3); for (let r = 0; r < 20; r++) { const y = 530 + r * r * 1.4, w = 160 + (y - 520) * 1.9, sz = 6 + r * 3; for (let x = 960 - w / 2; x < 960 + w / 2 - sz; x += sz * 1.6) s += `<ellipse cx="${x + R() * 4}" cy="${y}" rx="${sz * .7}" ry="${sz * .35}" fill="${['#9a9088', '#7a7068', '#a8a098'][Math.floor(R() * 3)]}"/>`; }
  return s + rLabel('Calles tan antiguas como la Vía Apia: ¡antes de los coches!', W / 2, 90, 36);
};
scenes.ro_gelato = function (t) {
  let s = ROALL() + `<rect width="${W}" height="${H}" fill="#fbe9ee"/><rect x="0" y="0" width="${W}" height="120" fill="#2f9a4a"/><text x="960" y="85" font-family="Fredoka" font-weight="700" font-size="60" text-anchor="middle" fill="#fff" letter-spacing="8">GELATERIA</text>`;
  s += `<rect x="160" y="420" width="1600" height="300" rx="20" fill="#dfeef4" opacity=".7"/><rect x="160" y="700" width="1600" height="380" fill="#f4f0e6"/>`;
  const fl = [['Fresa', '#f28aa0'], ['Limón', '#f6e27a'], ['Chocolate', '#6a3a1e'], ['Pistacho', '#a8c86a'], ['Vainilla', '#fbf2d0'], ['Stracciatella', '#f4f0e6']];
  fl.forEach(([n, c], i) => { const x = 280 + i * 272; s += `<g transform="translate(${x},620)"><rect x="-120" y="-40" width="240" height="90" fill="#c9ced5"/><path d="M-110,-40 Q-80,-130 -20,-110 Q20,-160 70,-110 Q120,-120 110,-40Z" fill="${c}" stroke="#0002" stroke-width="3"/>${n == 'Stracciatella' ? [...Array(10)].map((_, k) => `<circle cx="${-80 + k * 18}" cy="${-70 - (k % 3) * 14}" r="4" fill="#3a2a1a"/>`).join('') : ''}</g>${rLabel(n, x, 760, 28)}`; });
  s += `<g transform="translate(960,960) rotate(${S(t, 2) * 3})"><path d="M-50,0 L50,0 L0,140Z" fill="#d9a066" stroke="#a87a3a" stroke-width="4"/><circle cx="-22" cy="-30" r="44" fill="#a8c86a"/><circle cx="26" cy="-34" r="44" fill="#f28aa0"/><circle cx="0" cy="-76" r="40" fill="#6a3a1e"/></g>`;
  return s + rLabel('Gelato: más cremoso y con sabores naturales', W / 2, 330, 40);
};
scenes.ro_idioma = function (t) {
  let s = ROALL() + `<rect width="${W}" height="${H}" fill="#f2ecdf"/><rect x="0" y="820" width="${W}" height="260" fill="#c9a06a"/>`;
  s += `<rect x="260" y="100" width="1400" height="600" fill="#2e5e4e" stroke="#8a6a46" stroke-width="22"/>
  <text x="960" y="330" font-family="Fredoka" font-weight="700" font-size="150" text-anchor="middle" fill="#fafaf0">L'italiano</text>
  <text x="960" y="470" font-family="Fredoka" font-weight="600" font-size="62" text-anchor="middle" fill="#ffe14f">Alegre y musical ♪</text>` + itFlag(1700, 360, 1.6);
  const hand = (x, y, r) => `<g transform="translate(${x},${y}) rotate(${r + S(t, 4) * 14})"><path d="M-20,40 L-20,-10 Q-20,-40 -6,-50 L-2,-10 L2,-56 Q14,-50 12,-20 L14,40Z" fill="#e2b48e" stroke="#a87a5a" stroke-width="4"/></g>`;
  return s + rP(1550, 1040, 2.0, t, { ph: 1, top: '#2b3a67', bot: '#3a3a3a', walk: false, wave: true }) + hand(1380, 900, -10) + rLabel('Hablan con las manos, la cara y el corazón', W / 2, 620, 36);
};
scenes.ro_palabras = function (t) {
  let s = ROALL() + rSky('day') + romanHouse(0, 700, W, 600, { col: '#e8b070' }) + cobbles(700);
  s += rP(620, 1030, 2.1, t, { ph: 1, top: '#f4f4f4', walk: false, wave: true }) + rP(1300, 1040, 1.7, t, { ph: 3, child: true, top: '#f2c14e', walk: false, dir: -1 });
  const words = [['Ciao', 'Hola / Adiós'], ['Grazie', 'Gracias'], ['Per favore', 'Por favor'], ['Buongiorno', 'Buenos días'], ['Buona notte', 'Buenas noches']];
  s += words.map(([it, es], i) => { const x = i < 3 ? 360 + i * 600 : 660 + (i - 3) * 600, y = i < 3 ? 220 : 410; return `<g transform="translate(${x},${y})"><rect x="-250" y="-70" width="500" height="140" rx="32" fill="#fff" stroke="#2f9a4a" stroke-width="6"/><text x="0" y="-6" font-family="Fredoka" font-weight="700" font-size="54" text-anchor="middle" fill="#2f9a4a">${it}</text><text x="0" y="46" font-family="Fredoka" font-weight="600" font-size="38" text-anchor="middle" fill="#d9343a">${es}</text></g>`; }).join('');
  return s;
};
scenes.ro_familia = function (t) {
  let s = ROALL() + rSky('day') + romanHouse(0, 640, W, 560, { col: '#d98a5a', ivy: true }) + cobbles(640);
  s += `<path d="M200,560 L1720,560 L1760,620 L160,620Z" fill="#2f6a3a"/>${[...Array(16)].map((_, i) => `<path d="M${160 + i * 100},620 q50,26 100,0" fill="#2f6a3a"/>`).join('')}<text x="960" y="600" font-family="Fredoka" font-weight="600" font-size="34" text-anchor="middle" fill="#f4e6c0">TRATTORIA</text>`;
  s += `<rect x="300" y="760" width="1320" height="40" fill="#fbfbf7"/>${[...Array(12)].map((_, i) => `<rect x="${300 + i * 110}" y="760" width="55" height="40" fill="#d9343a" opacity=".85"/>`).join('')}<rect x="300" y="800" width="1320" height="16" fill="#c9c4bb"/>`;
  const seat = (x, o) => rP(x, 790, 1.7, t, Object.assign({ walk: false }, o));
  s += seat(380, { ph: 1, top: '#2b3a67' }) + seat(620, { ph: 2, top: '#c94f6d', longhair: true }) + seat(860, { ph: 3, top: '#5a6a5a', longhair: true }) + seat(1100, { ph: 4, child: true, top: '#f2c14e' }) + seat(1340, { ph: 5, top: '#e8e2d4' }) + seat(1560, { ph: 6, child: true, top: '#4f7fe0' });
  s += `${[500, 980, 1460].map(x => `<ellipse cx="${x}" cy="756" rx="90" ry="18" fill="#fbfbf7" stroke="#ddd" stroke-width="2"/><ellipse cx="${x}" cy="750" rx="60" ry="10" fill="#e8b45a"/>`).join('')}<ellipse cx="740" cy="756" rx="70" ry="14" fill="#f4f4f0"/><circle cx="740" cy="748" r="34" fill="#e8b45a"/><circle cx="730" cy="744" r="6" fill="#d9343a"/>`;
  return s + rLabel('La familia: comer juntos, hablar y reír', W / 2, 90, 40);
};
scenes.ro_plaza = function (t) {
  let s = ROALL() + rSky('day') + rSun(1600, 150) + romanHouse(-10, 600, 640, 440, { col: '#efc88a' }) + romanHouse(1290, 600, 640, 460, { col: '#d98a5a' });
  s += `<g transform="translate(960,600)"><rect x="-320" y="-380" width="640" height="380" fill="url(#roTrav)"/><path d="M-160,-380 Q0,-560 160,-380Z" fill="url(#roDome)"/><rect x="-10" y="-600" width="20" height="60" fill="#d9c69c"/>${[-260, -130, 130, 260].map(x => `<rect x="${x - 16}" y="-360" width="32" height="360" fill="#efe6cc"/>`).join('')}</g>`;
  s += `<rect x="0" y="600" width="${W}" height="480" fill="#d9ccb0"/><g transform="translate(560,820)"><ellipse rx="230" ry="60" fill="#c9bfa6"/><ellipse rx="210" ry="48" fill="url(#roWater)"/><rect x="-14" y="-300" width="28" height="300" fill="#e6d8b8"/><path d="M-14,-300 L0,-360 L14,-300Z" fill="#e6d8b8"/></g>`;
  const bx = 1300 + Math.sin(t / L * TAU * 2) * 160, by = 960 - Math.abs(Math.sin(t / L * TAU * 4)) * 60;
  s += `<g transform="translate(${bx},${by})"><circle r="16" fill="#fff" stroke="#222" stroke-width="3"/><path d="M-6,-6 l12,0 l4,10 l-10,8 l-10,-8Z" fill="#222"/></g>`;
  s += rP(1120, 1030, 1.6, t, { ph: 1, child: true, top: '#d9343a' }) + rP(1480, 1040, 1.6, t, { ph: 2, child: true, top: '#4f7fe0', dir: -1 }) + pCrowd(t, 41, 8, 700, 820);
  return s + rLabel('Plazas donde la gente conversa y los niños juegan', W / 2, 90, 38);
};
scenes.ro_pizza = function (t) {
  let s = ROALL() + `<rect width="${W}" height="${H}" fill="#3a2a22"/>`;
  s += `<g transform="translate(560,620)"><path d="M-360,0 Q-360,-420 0,-440 Q360,-420 360,0Z" fill="#a4482a"/>${[...Array(8)].map((_, i) => `<path d="M${-360 + i * 90},${-60 - Math.sin(i / 7 * Math.PI) * 340} l90,0" stroke="#8a3a22" stroke-width="4"/>`).join('')}<path d="M-180,0 Q-180,-200 0,-210 Q180,-200 180,0Z" fill="#1a1010"/>
  ${[...Array(6)].map((_, i) => `<path d="M${-120 + i * 46},-10 q${10 + S(t, 8, i) * 8},-60 0,-100" stroke="${['#ff9a2a', '#ffcf4a'][i % 2]}" stroke-width="18" fill="none" stroke-linecap="round" opacity=".9"/>`).join('')}<rect x="-380" y="0" width="760" height="120" fill="#8a7a6a"/></g>`;
  s += `<rect x="0" y="760" width="${W}" height="320" fill="url(#rWood)"/>`;
  s += `<g transform="translate(1260,800)">${rShadow(0, 40, 380, .3)}<ellipse rx="380" ry="110" fill="#d99a4a"/><ellipse rx="350" ry="96" fill="#d9472a"/><ellipse rx="340" ry="92" fill="#f2d98a" opacity=".85"/>
  ${[[-200, -20], [-60, 30], [80, -30], [210, 20], [-120, -50], [150, 50]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="16" fill="#2a2a2a"/>`).join('')}${[[-140, 20], [40, -50], [220, -20], [-260, 30], [100, 40]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="28" ry="16" fill="#e89a9a"/>`).join('')}${[[-40, 0], [160, -10], [-220, -30]].map(([x, y]) => `<path d="M${x},${y} q10,-14 20,0 q-10,14 -20,0Z" fill="#3a8a2a"/>`).join('')}
  <path d="M-380,0 Q-380,22 -340,30" stroke="#a86a2a" stroke-width="6" fill="none"/></g>`;
  return s + rArrowLabel('Horno muy caliente', 330, 140, 560, 420, 30) + rArrowLabel('Delgada y crujiente', 1600, 620, 1560, 800, 30) + rArrowLabel('Tomate, queso, aceitunas, jamón', 1260, 1010, 1180, 820, 30) + rLabel('Pizza romana', W / 2, 90, 44);
};
scenes.ro_pasta = function (t) {
  let s = ROALL() + `<rect width="${W}" height="${H}" fill="#f2e9d8"/><rect x="0" y="600" width="${W}" height="480" fill="url(#rCounter)"/>`;
  const plate = (x, inner, label) => `<g transform="translate(${x},780)">${rShadow(0, 50, 240, .25)}<ellipse rx="250" ry="80" fill="#fbfbf7"/><ellipse rx="190" ry="56" fill="#f4f0e6"/>${inner}</g>${rLabel(label, x, 940, 34)}`;
  s += plate(380, [...Array(14)].map((_, i) => `<path d="M${-150 + i * 8},${-20 + (i % 3) * 8} q60,-30 120,0 t120,0" stroke="#f2cf6a" stroke-width="5" fill="none"/>`).join('') + `<ellipse cx="0" cy="-10" rx="80" ry="24" fill="#d9472a" opacity=".85"/>`, 'Espagueti: largos como cuerdas')
    + plate(960, [...Array(18)].map((_, i) => `<g transform="translate(${-130 + (i % 6) * 52},${-30 + Math.floor(i / 6) * 24}) rotate(${(i * 37) % 60 - 30})"><rect x="-22" y="-8" width="44" height="16" rx="4" fill="#f2cf6a" stroke="#d9aa4a" stroke-width="2"/><line x1="-14" y1="-8" x2="-14" y2="8" stroke="#d9aa4a" stroke-width="2"/><line x1="0" y1="-8" x2="0" y2="8" stroke="#d9aa4a" stroke-width="2"/></g>`).join(''), 'Penne: tubitos')
    + plate(1540, [...Array(8)].map((_, i) => `<path d="M${-150 + i * 10},${-30 + i * 8} q70,-24 140,0 t140,0" stroke="#f2cf6a" stroke-width="14" fill="none"/>`).join(''), 'Fettuccine: cintas planas');
  return s + rLabel('Pasta: muchas formas y sabores', W / 2, 140, 44);
};
scenes.ro_tenedor = function (t) {
  let s = ROALL() + `<rect width="${W}" height="${H}" fill="#f2e9d8"/><rect x="0" y="520" width="${W}" height="560" fill="url(#rCounter)"/>`;
  s += `<g transform="translate(960,760)">${rShadow(0, 60, 420, .25)}<ellipse rx="440" ry="140" fill="#fbfbf7"/><ellipse rx="340" ry="104" fill="#f4f0e6"/>${[...Array(26)].map((_, i) => `<path d="M${-260 + (i * 23) % 400},${-60 + (i * 17) % 110} q60,-40 120,0 t100,20" stroke="#f2cf6a" stroke-width="6" fill="none"/>`).join('')}<ellipse cx="0" cy="0" rx="120" ry="34" fill="#d9472a" opacity=".85"/></g>`;
  const rot = (t / L * 360 * 2) % 360;
  s += `<g transform="translate(1060,600)"><ellipse cx="0" cy="40" rx="90" ry="40" fill="#c9ced5" stroke="#8a929e" stroke-width="4"/><rect x="60" y="20" width="300" height="24" rx="12" fill="#c9ced5" transform="rotate(-20 60 20)"/></g>
  <g transform="translate(1000,560) rotate(-60)"><rect x="-8" y="-320" width="16" height="300" rx="8" fill="#c9ced5"/>${[0, 1, 2, 3].map(k => `<rect x="${-20 + k * 12}" y="-20" width="6" height="70" fill="#c9ced5"/>`).join('')}</g>
  <g transform="translate(1040,640)">${[0, 1, 2, 3].map(k => `<ellipse rx="${50 - k * 6}" ry="${16 - k * 2}" fill="none" stroke="#f2cf6a" stroke-width="7" transform="rotate(${rot + k * 40})"/>`).join('')}</g>`;
  return s + rLabel('Como los romanos: enrollar con tenedor y cuchara', W / 2, 140, 40);
};
scenes.ro_escuela = function (t) {
  let s = ROALL() + rSky('day') + rSun(1650, 140);
  s += `<g transform="translate(560,640)">${[...Array(6)].map((_, i) => `<rect x="${-300 + i * 120}" y="-360" width="56" height="360" fill="#efe6cc"/>`).join('')}<rect x="-330" y="-400" width="720" height="50" fill="#e2d4b0"/><path d="M-340,-400 L30,-500 L400,-400Z" fill="#e2d4b0"/></g>`;
  s += romanHouse(1100, 640, 820, 500, { col: '#efc88a' }) + `<rect x="1300" y="160" width="400" height="60" fill="#2f6a3a"/><text x="1500" y="202" font-family="Fredoka" font-weight="600" font-size="32" text-anchor="middle" fill="#fff">SCUOLA</text>` + cobbles(640);
  const kx = 200 + (t / L) * 900;
  s += rP(kx, 1020, 2.0, t, { ph: 1, child: true, top: '#4f7fe0', bag: '#d9343a' }) + rP(kx - 160, 1000, 1.9, t, { ph: 2, child: true, top: '#2f9a4a', bag: '#2b3a67', longhair: true });
  return s + rLabel('A la escuela, pasando frente a templos antiguos', W / 2, 90, 38);
};
scenes.ro_mario = function (t) {
  let s = ROALL() + rSky('day') + rSun(1650, 140) + colosseum(1100, 700, .8) + `<rect x="0" y="700" width="${W}" height="380" fill="#cdbf9e"/>`;
  const x = 300 + (t / L) * 500;
  s += rP(x, 1030, 2.3, t, { ph: 1, top: '#6a5a4a', bot: '#3a3a3a', hair: '#d9d9d9', cap: '#5a4a3a' }) + rP(x + 170, 1040, 1.8, t, { ph: 2, child: true, top: '#d9343a', bag: '#2b3a67', dir: -1 });
  return s + rLabel('Mario y su abuelo en el Coliseo', W / 2, 90, 40);
};
scenes.ro_gladiadores = function (t) {
  let s = ROALL() + rSky('day') + `<path d="M0,0 L${W},0 L${W},500 L0,500Z" fill="url(#rSkyDay)"/>`;
  s += `<path d="M-100,560 Q960,180 2020,560 L2020,700 L-100,700Z" fill="#d9c69c"/>${[...Array(5)].map((_, r) => `<path d="M-100,${580 - r * 70} Q960,${200 - r * 70 + r * 40} 2020,${580 - r * 70}" stroke="#b8a27a" stroke-width="6" fill="none"/>`).join('')}`;
  s += `<rect x="0" y="640" width="${W}" height="440" fill="#e8d4a0"/>`;
  const glad = (x, dir, c) => `<g transform="translate(${x},980) scale(${2.1 * dir},2.1)">${rShadow(0, 0, 30)}<path d="M-8,-60 L${-10 + S(t, 4) * 4},0 M8,-60 L${10 - S(t, 4) * 4},0" stroke="#c49a6c" stroke-width="11" stroke-linecap="round"/><path d="M-20,-64 L20,-64 L18,-50 L-18,-50Z" fill="${c}"/><rect x="-18" y="-120" width="36" height="60" rx="8" fill="#c49a6c"/><path d="M-18,-118 L18,-80" stroke="#7a5a3a" stroke-width="8"/><circle cx="0" cy="-138" r="16" fill="#b8b4a8"/><path d="M-18,-150 Q0,-178 18,-150" fill="#b8b4a8"/><rect x="-6" y="-146" width="12" height="16" fill="#3a3a3a"/><path d="M-10,-172 Q0,-190 10,-172" stroke="${c}" stroke-width="8" fill="none"/>
  <g transform="rotate(${-30 + S(t, 4) * 20} 20 -100)"><rect x="20" y="-104" width="50" height="8" fill="#c9ced5"/></g><ellipse cx="-30" cy="-90" rx="18" ry="34" fill="${c}" stroke="#d9b14a" stroke-width="3"/></g>`;
  return s + glad(760, 1, '#a8242a') + glad(1160, -1, '#2b4a8a') + rLabel('Gladiadores: coraje y disciplina', W / 2, 90, 40);
};
scenes.ro_moda = function (t) {
  let s = ROALL() + rSky('day') + romanHouse(0, 700, 960, 600, { col: '#e8b070' }) + romanHouse(960, 700, 960, 620, { col: '#d98a5a' }) + cobbles(700);
  s += `<rect x="1100" y="520" width="680" height="180" fill="#f4ecd8"/><text x="1440" y="508" font-family="Fredoka" font-weight="600" font-size="30" text-anchor="middle" fill="#2b3a67">BOUTIQUE</text>${[0, 1, 2].map(i => `<g transform="translate(${1220 + i * 220},690)"><rect x="-4" y="-150" width="8" height="150" fill="#888"/><path d="M-60,-140 L60,-140 L70,-20 L-70,-20Z" fill="${['#c9b48a', '#2b3a67', '#e8e2d4'][i]}"/></g>`).join('')}`;
  s += rP(((t / L) * (W + 300)) - 150, 1040, 2.1, t, { ph: 1, top: '#2b3a67', bot: '#c9b48a' }) + rP(W - ((t / L) * (W + 300)) + 150, 1010, 2.0, t, { ph: 2, top: '#e8e2d4', longhair: true, dir: -1, skirt: '#5a6a7a' }) + pCrowd(t, 43, 8, 730, 820);
  return s + rLabel('Limpio y bonito: vestirse es una forma de respeto', W / 2, 90, 38);
};
scenes.ro_dylan = function (t) {
  let s = ROALL() + rSky('day') + romanHouse(-20, 760, 700, 660, { ivy: true, col: '#d98a5a' }) + romanHouse(1240, 760, 700, 640, { ivy: true, col: '#efc88a' });
  s += `<path d="M680,760 L1240,760 L1240,140 L680,140Z" fill="url(#rSkyDay)"/>` + romanHouse(700, 700, 520, 520, { col: '#e8b070' }) + cobbles(700);
  const x = 500 + (t / L) * 400;
  s += rP(x, 1040, 2.2, t, { ph: 1, top: '#4f7fe0', bot: '#2b2f3a', longhair: true }) + rP(x + 150, 1050, 1.8, t, { ph: 2, child: true, top: '#f2f2f2', bot: '#2b3a67', cap: '#d9343a', skin: '#9c6a48' }) + rP(x - 140, 1040, 2.3, t, { ph: 3, top: '#2f6a3a', bot: '#2b2f3a' });
  s += rP(1500, 900, 1.6, t, { ph: 4, top: '#2b3a67', bot: '#c9b48a' }) + rP(1650, 920, 1.6, t, { ph: 5, top: '#e8e2d4', longhair: true, dir: -1 });
  return s + rLabel('Dylan y su gorra roja', W / 2, 90, 42);
};
scenes.ro_dylan_mama = function (t) {
  let s = ROALL() + rSky('day') + romanHouse(0, 700, W, 600, { col: '#efc88a', ivy: true }) + cobbles(700);
  s += rP(820, 1040, 2.5, t, { ph: 1, top: '#4f7fe0', bot: '#2b2f3a', longhair: true, walk: false, bow: 28 }) + rP(1060, 1050, 2.0, t, { ph: 2, child: true, top: '#f2f2f2', bot: '#2b3a67', cap: '#d9343a', skin: '#9c6a48', walk: false, dir: -1 });
  s += `<g transform="translate(940,620)">${[0, 1].map(i => `<path transform="translate(${-40 + i * 80},${S(t, 2, i) * 8}) scale(1.4)" d="M0,8 C-14,-6 -10,-20 0,-12 C10,-20 14,-6 0,8Z" fill="#e8352a"/>`).join('')}</g>`;
  return s + rLabel('"Vestirse bien es una forma de mostrar respeto"', W / 2, 90, 36);
};
scenes.ro_moneda = function (t) {
  let s = ROALL() + rSky('day') + trevi(960, 1060, 1.15, t);
  const o = (t % L) / L;
  s += rP(700, 1070, 2.0, t, { ph: 2, child: true, top: '#f2f2f2', bot: '#2b3a67', cap: '#d9343a', skin: '#9c6a48', walk: false, wave: true }) + rP(520, 1070, 2.5, t, { ph: 1, top: '#4f7fe0', bot: '#2b2f3a', longhair: true, walk: false });
  s += `<circle cx="${760 + o * 360}" cy="${720 - Math.sin(o * Math.PI) * 260 + o * 200}" r="14" fill="#e8c24a" stroke="#a8862a" stroke-width="3" opacity="${o < .85 ? 1 : 0}"/>`;
  return s + rLabel('Una moneda y un deseo: volver a Roma', W / 2, 90, 40);
};
scenes.ro_vaticano = function (t) {
  let s = ROALL() + rSky('day') + rSun(1650, 140) + rClouds(t, [[300, 120, .7]]);
  s += `<g transform="translate(960,660) scale(.78)"><rect x="-360" y="-240" width="720" height="240" fill="url(#roTrav)"/>${[...Array(8)].map((_, i) => `<rect x="${-330 + i * 92}" y="-230" width="40" height="230" fill="#efe6cc"/>`).join('')}<path d="M-380,-240 L0,-320 L380,-240Z" fill="#e2d4b0"/>
  <rect x="-160" y="-420" width="320" height="100" fill="#e2d4b0"/><path d="M-200,-420 Q-200,-700 0,-720 Q200,-700 200,-420Z" fill="url(#roDome)"/>${[-140, -70, 0, 70, 140].map(x => `<line x1="${x}" y1="-420" x2="${x * .2}" y2="-710" stroke="#7a94a4" stroke-width="5"/>`).join('')}<rect x="-26" y="-790" width="52" height="70" fill="#e2d4b0"/><path d="M-6,-830 h12 v40 h-12Z M-20,-818 h40 v10 h-40Z" fill="#d9b14a"/></g>`;
  for (const d of [-1, 1]) s += `<path d="M${960 + d * 360},640 Q${960 + d * 760},700 ${960 + d * 820},960" stroke="#e2d4b0" stroke-width="70" fill="none"/>${[...Array(12)].map((_, i) => { const k = i / 11; return `<rect x="${960 + d * (380 + k * 420) - 8}" y="${640 + k * k * 300 - 60}" width="16" height="70" fill="#efe6cc"/>`; }).join('')}`;
  s += `<path d="M560,640 L1360,640 L1700,1080 L220,1080Z" fill="#d9ccb0"/><g transform="translate(960,860)"><rect x="-14" y="-260" width="28" height="260" fill="#cdbf9e"/><path d="M-14,-260 L0,-320 L14,-260Z" fill="#cdbf9e"/></g>`;
  return s + pCrowd(t, 47, 16, 700, 1060) + rLabel('El Vaticano: el país más pequeño del mundo', W / 2, 1010, 38);
};
scenes.ro_sixtina = function (t) {
  let s = ROALL() + `<rect width="${W}" height="${H}" fill="#cdb894"/>`;
  for (let i = 0; i < 5; i++) s += `<rect x="${60 + i * 380}" y="60" width="340" height="400" fill="${['#c8a878', '#b8946a', '#d0b084'][i % 3]}" stroke="#8a6a46" stroke-width="10"/>`;
  s += `<g transform="translate(960,560)"><rect x="-760" y="-160" width="1520" height="320" fill="#8ab0c8" stroke="#8a6a46" stroke-width="14"/>
  <path d="M-700,80 Q-560,-40 -300,10 L-180,0" stroke="#e2b48e" stroke-width="40" fill="none" stroke-linecap="round"/><path d="M-180,0 l40,-10 M-180,0 l40,6" stroke="#e2b48e" stroke-width="14" stroke-linecap="round"/>
  <path d="M700,-20 Q560,-60 300,-10 L160,-6" stroke="#e8c8a0" stroke-width="40" fill="none" stroke-linecap="round"/><path d="M160,-6 l-40,-10 M160,-6 l-40,6" stroke="#e8c8a0" stroke-width="14" stroke-linecap="round"/>
  <ellipse cx="560" cy="-40" rx="200" ry="110" fill="#c8506a" opacity=".6"/></g>`;
  s += `<rect x="0" y="760" width="${W}" height="320" fill="#a8946a"/>`;
  return s + pCrowd(t, 53, 12, 800, 1060) + rLabel('Capilla Sixtina: pintada hace más de 500 años', W / 2, 1010, 38);
};
scenes.ro_panteon = function (t) {
  let s = ROALL() + rSky('day') + rSun(1650, 140) + romanHouse(-20, 760, 420, 520, { col: '#e8b070' }) + romanHouse(1520, 760, 420, 540, { col: '#d98a5a' });
  s += `<g transform="translate(960,780)"><path d="M-380,-420 Q-380,-760 0,-780 Q380,-760 380,-420Z" fill="#c9bfa6"/><rect x="-380" y="-420" width="760" height="420" fill="#d9ccb0"/>
  <rect x="-460" y="-460" width="920" height="460" fill="url(#roTrav)" opacity=".98"/>${[...Array(8)].map((_, i) => `<rect x="${-420 + i * 116}" y="-420" width="54" height="420" fill="#cdbf9e"/>`).join('')}<path d="M-500,-460 L0,-620 L500,-460Z" fill="#e2d4b0" stroke="#c9b894" stroke-width="6"/><rect x="-500" y="-470" width="1000" height="30" fill="#d9c69c"/>
  <text x="0" y="-480" font-family="Fredoka" font-weight="600" font-size="34" text-anchor="middle" fill="#8a7a5a" letter-spacing="6">M·AGRIPPA·L·F·COS·TERTIVM·FECIT</text></g>` + cobbles(780);
  return s + pCrowd(t, 59, 12, 820, 1060) + rLabel('El Panteón: casi 2.000 años', W / 2, 90, 40);
};
scenes.ro_oculo = function (t) {
  let s = ROALL() + `<rect width="${W}" height="${H}" fill="#3a3430"/>`;
  s += `<ellipse cx="960" cy="0" rx="1300" ry="760" fill="#8a7e6e"/>`;
  for (let r = 0; r < 5; r++) for (let i = 0; i < 18; i++) { const a = Math.PI * (i + .5) / 18, rr = 1200 - r * 200; s += `<rect x="${960 + Math.cos(a) * rr - 40 + 0}" y="${Math.sin(a) * rr * .58 - 40}" width="${80 - r * 10}" height="${60 - r * 8}" fill="#6a6052" transform="rotate(${a * 57.3 - 90} ${960 + Math.cos(a) * rr} ${Math.sin(a) * rr * .58})"/>`; }
  s += `<ellipse cx="960" cy="40" rx="150" ry="60" fill="#cfe8f8"/><path d="M820,60 L1100,60 L1300,1080 L620,1080Z" fill="#fff6d0" opacity="${.22 + .06 * S(t, 2)}"/><ellipse cx="960" cy="1000" rx="340" ry="60" fill="#fff6d0" opacity=".35"/>
  <rect x="0" y="900" width="${W}" height="180" fill="#9a8a72" opacity=".85"/>`;
  return s + pCrowd(t, 61, 8, 940, 1070) + rLabel('Un agujero en el techo: la única luz del Panteón', W / 2, 260, 36);
};
scenes.ro_atardecer = function (t) {
  let s = ROALL() + rSky('dusk') + rSun(1500, 420, 80);
  s += `<g opacity=".95">${[...Array(10)].map((_, i) => romanHouse(i * 200 - 20, 620, 190, 200 + (i % 3) * 40, { col: ['#c97a5a', '#d98a5a', '#b86a4a'][i % 3] })).join('')}</g>`;
  s += `<g transform="translate(1250,620) scale(.55)"><path d="M-200,-420 Q-200,-700 0,-720 Q200,-700 200,-420Z" fill="#6a7a8a"/><rect x="-26" y="-790" width="52" height="70" fill="#7a8a9a"/></g>`;
  s += `<g transform="translate(560,640)"><rect x="-200" y="-200" width="400" height="200" fill="#b8a27a"/><circle cx="0" cy="-200" r="150" fill="#b8a27a"/><rect x="-40" y="-400" width="80" height="80" fill="#a8926a"/></g>`;
  s += `<rect x="0" y="640" width="${W}" height="200" fill="#5f8fa8"/><path d="M400,640 Q560,580 720,640 Q880,580 1040,640" stroke="#c9b48a" stroke-width="40" fill="none"/>${[...Array(8)].map((_, i) => `<path d="M${((i * 230 + t / L * 230) % (W + 200)) - 100},${680 + (i % 3) * 50} q30,-8 60,0 t60,0" stroke="#f4d0a0" stroke-width="3" fill="none" opacity=".7"/>`).join('')}`;
  s += `<rect x="0" y="840" width="${W}" height="240" fill="#c9bfa6"/>` + pCrowd(t, 67, 6, 880, 1060);
  return s + rLabel('Los edificios guardan recuerdos', W / 2, 90, 40);
};
scenes.ro_outro = function (t) {
  let s = ROALL() + rSky('dusk') + rSun(1500, 420, 80);
  for (let i = 0; i < 4; i++) s += romanHouse(i * 250 - 20, 860, 240, 360 + (i % 2) * 60);
  s += colosseum(1400, 860, .62) + cobbles(850) + pCrowd(t, 3, 10, 900, 1060);
  return s + `<g transform="translate(${W / 2},${H / 2 - 160}) scale(${1 + S(t, 2) * .01})"><rect x="-600" y="-150" width="1200" height="300" rx="40" fill="#fff" opacity=".95" stroke="#2b3a67" stroke-width="6"/>
  <text x="0" y="-20" font-family="Fredoka" font-weight="700" font-size="104" text-anchor="middle" fill="#2f9a4a" stroke="#2b3a67" stroke-width="3" paint-order="stroke">Ciao, Roma!</text>
  <text x="0" y="90" font-family="Fredoka" font-weight="600" font-size="52" text-anchor="middle" fill="#2b3a67">Nos vemos en el próximo viaje ✈</text></g>`;
};

/* =====================================================================
   v4 (25-nov) — más detalle en los monumentos (petición de Vinelis):
   Coliseo, Fontana di Trevi, Panteón, Foro, San Pedro y Capilla Sixtina.
   ===================================================================== */
function roColumn(x, base, h, w = 40, order = 'corintio', col = '#efe6cc') { // columna con basa, fuste estriado y capitel
  let s = `<rect x="${x - w * .65}" y="${base - w * .35}" width="${w * 1.3}" height="${w * .35}" fill="#d9cca8"/><rect x="${x - w / 2}" y="${base - h + w * .5}" width="${w}" height="${h - w * .85}" fill="${col}"/>`;
  for (let k = 1; k < 5; k++) s += `<line x1="${x - w / 2 + k * w / 5}" y1="${base - h + w * .55}" x2="${x - w / 2 + k * w / 5}" y2="${base - w * .4}" stroke="#d2c4a0" stroke-width="2"/>`;
  s += `<rect x="${x + w * .25}" y="${base - h + w * .5}" width="${w * .25}" height="${h - w * .85}" fill="#000" opacity=".07"/>`;
  if (order == 'corintio') s += `<path d="M${x - w * .75},${base - h} L${x + w * .75},${base - h} L${x + w * .55},${base - h + w * .55} L${x - w * .55},${base - h + w * .55}Z" fill="#e2d4b0"/>${[-1, 0, 1].map(k => `<path d="M${x + k * w * .4},${base - h + w * .5} q${-w * .2},${-w * .3} 0,${-w * .45}" stroke="#bfae86" stroke-width="2.5" fill="none"/>`).join('')}`;
  else if (order == 'jonico') s += `<rect x="${x - w * .7}" y="${base - h + w * .2}" width="${w * 1.4}" height="${w * .3}" fill="#e2d4b0"/><circle cx="${x - w * .62}" cy="${base - h + w * .38}" r="${w * .18}" fill="none" stroke="#bfae86" stroke-width="2.5"/><circle cx="${x + w * .62}" cy="${base - h + w * .38}" r="${w * .18}" fill="none" stroke="#bfae86" stroke-width="2.5"/>`;
  else s += `<rect x="${x - w * .65}" y="${base - h + w * .2}" width="${w * 1.3}" height="${w * .3}" fill="#e2d4b0"/>`;
  return s;
}
function statueRO(x, y, s = 1, col = '#f2efe6') { // estatua clásica sencilla sobre el ático
  return `<g transform="translate(${x},${y}) scale(${s})" fill="${col}"><rect x="-16" y="-8" width="32" height="8" fill="#d9cca8"/><path d="M-12,-8 L-14,-60 Q0,-70 14,-60 L12,-8Z"/><circle cx="0" cy="-76" r="10"/><path d="M12,-58 L26,-82" stroke="${col}" stroke-width="6" stroke-linecap="round"/><path d="M-14,-56 Q-18,-34 -10,-20" stroke="#000" stroke-opacity=".12" stroke-width="3" fill="none"/></g>`;
}
function colosseum(cx, base, s = 1) {
  let o = `<g transform="translate(${cx},${base}) scale(${s})">`;
  // anillo interior visible por la parte en ruinas
  o += `<path d="M380,-430 Q560,-380 640,-250 L640,0 L380,0Z" fill="#b8a27a"/>`;
  for (let tier = 0; tier < 3; tier++) for (let i = 0; i < 4; i++) { const x = 420 + i * 52, y0 = -tier * 110; o += `<path d="M${x},${y0} L${x},${y0 - 70} Q${x + 18},${y0 - 95} ${x + 36},${y0 - 70} L${x + 36},${y0}Z" fill="#6a5640"/>`; }
  o += `<path d="M380,-430 l40,30 l-20,40 l30,30 l-10,50 l40,20 l-20,60 l40,40 l-30,60 l40,40 L380,0Z" fill="#a8946c"/>`;
  // fachada exterior: tres pisos de arcos con medias columnas y el ático con ventanas
  o += `<path d="M-620,0 L-620,-470 Q-100,-500 380,-470 L380,0Z" fill="url(#roTrav)"/>`;
  const orders = ['toscano', 'jonico', 'corintio'];
  for (let tier = 0; tier < 3; tier++) { const y0 = -tier * 118;
    for (let i = 0; i < 14; i++) { const x = -604 + i * 70;
      o += `<path d="M${x + 14},${y0 - 6} L${x + 14},${y0 - 74} Q${x + 35},${y0 - 104} ${x + 56},${y0 - 74} L${x + 56},${y0 - 6}Z" fill="#4a3a2c"/><path d="M${x + 14},${y0 - 74} Q${x + 35},${y0 - 104} ${x + 56},${y0 - 74}" stroke="#c9b48a" stroke-width="5" fill="none"/>`;
      if (tier > 0 && i % 2 == 0) o += statueRO(x + 35, y0 - 8, .55, '#e8e0cc');
      o += roColumn(x, y0 - 6, 104, 13, orders[tier], '#e6d6b0'); }
    o += `<rect x="-620" y="${y0 - 120}" width="1000" height="14" fill="#d9c69c"/><rect x="-620" y="${y0 - 108}" width="1000" height="3" fill="#bfae86"/><rect x="-620" y="${y0 - 8}" width="1000" height="8" fill="#cdb88e"/>`; }
  o += `<rect x="-620" y="-470" width="1000" height="118" fill="#e2d0a8"/>`;
  for (let i = 0; i < 14; i++) { const x = -604 + i * 70; o += `<rect x="${x - 4}" y="-470" width="8" height="118" fill="#d0bc94"/>${i % 2 ? `<rect x="${x + 24}" y="-440" width="22" height="34" fill="#6a5640"/>` : ''}`; }
  o += `<rect x="-630" y="-478" width="1010" height="12" fill="#cdb88e"/>`;
  // textura de bloques y manchas de piedra antigua
  for (let k = 0; k < 40; k++) o += `<rect x="${-600 + (k * 97) % 960}" y="${-460 + (k * 61) % 440}" width="${10 + (k % 4) * 6}" height="5" fill="#000" opacity=".05"/>`;
  return o + `</g>`;
}
function trevi(cx, base, s = 1, t = 0) {
  let o = `<g transform="translate(${cx},${base}) scale(${s})"><rect x="-700" y="-640" width="1400" height="640" fill="url(#roTrav)"/>`;
  // palacio Poli: ventanas con frontones entre pilastras corintias
  for (const x of [-620, -530, -440, 440, 530, 620]) o += roColumn(x, -150, 470, 30, 'corintio', '#efe6cc');
  for (const x of [-575, -485, 485, 575]) o += `<path d="M${x - 30},-520 L${x},-548 L${x + 30},-520Z" fill="#e2d4b0"/><rect x="${x - 26}" y="-516" width="52" height="86" fill="#4a5664"/><rect x="${x - 30}" y="-430" width="60" height="8" fill="#e2d4b0"/><rect x="${x - 26}" y="-360" width="52" height="80" fill="#4a5664"/><rect x="${x - 30}" y="-280" width="60" height="8" fill="#e2d4b0"/>`;
  // arco del triunfo central con columnas y el nicho de Océano
  o += `<rect x="-300" y="-640" width="600" height="490" fill="#ece0c2"/>`;
  for (const x of [-260, -180, 180, 260]) o += roColumn(x, -150, 480, 44, 'corintio', '#f4ecd6');
  o += `<path d="M-130,-150 L-130,-470 Q0,-570 130,-470 L130,-150Z" fill="#c9b894"/><path d="M-110,-470 Q0,-550 110,-470" stroke="#e8dcc0" stroke-width="10" fill="none"/>${[...Array(7)].map((_, k) => `<path d="M0,-470 L${-100 + k * 33},${-540 + Math.abs(k - 3) * 18}" stroke="#d8cab0" stroke-width="3"/>`).join('')}`;
  o += `<g transform="translate(0,-290)" fill="#f6f2e8"><circle cx="0" cy="-118" r="22"/><path d="M-12,-140 Q0,-160 14,-138 Q22,-120 10,-96Z" fill="#e8e2d0"/><path d="M-36,-96 Q0,-110 36,-96 L44,30 L-44,30Z"/><path d="M-36,-90 L-74,-40 M36,-90 L60,-130" stroke="#f6f2e8" stroke-width="16" stroke-linecap="round"/><path d="M-50,30 Q-80,70 -40,96 L60,96 Q90,60 50,30Z" fill="#eee6d4"/></g>`;
  // ático con inscripción y cuatro estatuas; escudo papal encima
  o += `<rect x="-720" y="-660" width="1440" height="28" fill="#e2d4b0"/><rect x="-300" y="-740" width="600" height="84" fill="#e8dcc0"/><text x="0" y="-686" font-family="Fredoka" font-weight="600" font-size="32" text-anchor="middle" fill="#8a7a5a" letter-spacing="8">AQVA VIRGO</text>`;
  for (const x of [-220, -73, 73, 220]) o += statueRO(x, -740, 1.1);
  o += `<g transform="translate(0,-760)"><ellipse rx="44" ry="34" fill="#e2d4b0"/><path d="M-20,-34 L0,-62 L20,-34Z" fill="#d9c69c"/></g>`;
  // tritones con caballos y rocas con plantas
  o += [-210, 210].map(x => { const d = x < 0 ? -1 : 1; return `<g transform="translate(${x},-120)" fill="#f2efe6"><path d="M${-70 * d},10 Q${-20 * d},-60 ${40 * d},-40 L${70 * d},-80 L${90 * d},-60 L${70 * d},-20 Q${50 * d},30 ${-60 * d},30Z"/><path d="M${70 * d},-80 l${18 * d},-20 M${78 * d},-72 l${22 * d},-12" stroke="#f2efe6" stroke-width="8" stroke-linecap="round"/><path d="M${-20 * d},-30 L${-30 * d},20 M${20 * d},-34 L${20 * d},20" stroke="#f2efe6" stroke-width="12" stroke-linecap="round"/><circle cx="${-60 * d}" cy="-70" r="14"/><path d="M${-60 * d},-56 L${-56 * d},0" stroke="#f2efe6" stroke-width="18"/></g>`; }).join('');
  o += `<path d="M-700,-150 Q-560,-110 -460,-140 Q-380,-90 -300,-120 Q-200,-60 -100,-110 Q0,-50 100,-110 Q200,-60 300,-120 Q380,-90 460,-140 Q560,-110 700,-150 L700,-60 L-700,-60Z" fill="#cfc2a4"/>`;
  for (let k = 0; k < 18; k++) o += `<path d="M${-640 + k * 75},${-110 - (k % 3) * 10} q-10,-24 6,-30 q4,16 -6,30Z" fill="#5a8a3a"/>`;
  // cascadas
  o += `${[...Array(12)].map((_, i) => `<path d="M${-200 + i * 36},${-140} q4,${30 + (i % 3) * 14} 0,${76}" stroke="#d8f0f8" stroke-width="7" fill="none" opacity="${.55 + .45 * Math.abs(S(t, 4, i))}"/>`).join('')}<path d="M-120,-180 Q0,-160 120,-180 L110,-150 Q0,-130 -110,-150Z" fill="#9ad4e4" opacity=".8"/>`;
  o += `<rect x="-760" y="-60" width="1520" height="60" fill="url(#roWater)"/>${[...Array(10)].map((_, i) => `<path d="M${-700 + ((i * 160 + t / L * 120) % 1400)},-34 q20,-6 40,0" stroke="#e8f8fc" stroke-width="3" fill="none"/>`).join('')}<rect x="-780" y="-8" width="1560" height="24" fill="#d9ccb0"/><rect x="-780" y="-8" width="1560" height="6" fill="#e8dcc0"/></g>`;
  return o;
}
scenes.ro_panteon = function (t) {
  let s = ROALL() + rSky('day') + rSun(1650, 140) + romanHouse(-20, 760, 420, 520, { col: '#e8b070' }) + romanHouse(1520, 760, 420, 540, { col: '#d98a5a' });
  s += `<g transform="translate(960,780)">`;
  s += `<path d="M-400,-470 Q-400,-790 0,-810 Q400,-790 400,-470Z" fill="#bfb49c"/>${[0, 1, 2, 3].map(k => `<path d="M${-400 + k * 14},${-470 - k * 30} Q0,${-560 - k * 30} ${400 - k * 14},${-470 - k * 30}" stroke="#a89c84" stroke-width="5" fill="none"/>`).join('')}<ellipse cx="0" cy="-806" rx="44" ry="10" fill="#8a8070"/>`;
  s += `<rect x="-420" y="-470" width="840" height="470" fill="#cfc2a4"/>`;
  s += `<rect x="-460" y="-470" width="920" height="470" fill="#d9ccb0"/><rect x="-150" y="-330" width="300" height="330" fill="#3a2e22"/><rect x="-130" y="-310" width="125" height="310" fill="#6a5434"/><rect x="5" y="-310" width="125" height="310" fill="#6a5434"/>${[0, 1, 2, 3].map(k => `<rect x="-120" y="${-300 + k * 76}" width="105" height="60" fill="none" stroke="#8a7044" stroke-width="4"/><rect x="15" y="${-300 + k * 76}" width="105" height="60" fill="none" stroke="#8a7044" stroke-width="4"/>`).join('')}`;
  for (let i = 0; i < 8; i++) s += roColumn(-420 + i * 120, 0, 430, 50, 'corintio', '#ece2c8');
  s += `<rect x="-480" y="-490" width="960" height="34" fill="#e2d4b0"/><rect x="-480" y="-470" width="960" height="6" fill="#bfae86"/><path d="M-500,-490 L0,-640 L500,-490Z" fill="#e8dcc0" stroke="#c9b894" stroke-width="8"/><path d="M-430,-500 L0,-620 L430,-500Z" fill="#ded0b0"/>
  <text x="0" y="-462" font-family="Fredoka" font-weight="600" font-size="30" text-anchor="middle" fill="#8a7a5a" letter-spacing="6">M·AGRIPPA·L·F·COS·TERTIVM·FECIT</text></g>`;
  s += cobbles(780);
  // fuente con obelisco de la Piazza della Rotonda
  s += `<g transform="translate(1500,1000)"><ellipse rx="200" ry="34" fill="#d9ccb0"/><ellipse cy="-6" rx="180" ry="26" fill="url(#roWater)"/><rect x="-40" y="-120" width="80" height="110" fill="#e2d4b0"/><path d="M-18,-120 L-12,-380 L12,-380 L18,-120Z" fill="#d6c6a2"/><path d="M-12,-380 L0,-410 L12,-380Z" fill="#c9b894"/>${[-1, 1].map(d => `<path d="M${d * 40},-60 q${d * 40},-20 ${d * 70},20" stroke="#d8f0f8" stroke-width="6" fill="none" opacity=".8"/>`).join('')}</g>`;
  return s + pCrowd(t, 59, 12, 830, 1060) + rLabel('El Panteón: casi 2.000 años', W / 2, 90, 40);
};
scenes.ro_foro = function (t) {
  let s = ROALL() + rSky('day') + rSun(1600, 160) + rClouds(t, [[400, 120, .7]]);
  s += `<path d="M0,620 Q400,560 900,600 Q1400,560 1920,620 L1920,700 L0,700Z" fill="#8aa86a"/>`;
  for (let i = 0; i < 6; i++) s += `<g transform="translate(${80 + i * 330},640)"><path d="M0,0 L0,-120" stroke="#6b4a36" stroke-width="10"/><ellipse cx="0" cy="-140" rx="${70 + (i % 2) * 20}" ry="34" fill="#4a7a3a"/></g>`;
  for (let i = 0; i < 4; i++) s += `<path d="M${260 + i * 460},660 q-18,-160 0,-220 q18,60 0,220Z" fill="#3a6a32"/>`;
  s += `<rect x="0" y="660" width="${W}" height="420" fill="#c9b48a"/>`;
  // Templo de Saturno: 8 columnas jónicas con su arquitrabe
  s += `<g transform="translate(560,860)"><rect x="-300" y="-30" width="600" height="30" fill="#d9cca8"/>`;
  for (let i = 0; i < 6; i++) s += roColumn(-250 + i * 100, -30, 470, 44, 'jonico', '#ece2c8');
  s += `<rect x="-290" y="-560" width="580" height="60" fill="#e2d4b0"/><rect x="-290" y="-520" width="580" height="8" fill="#c9b894"/><path d="M-290,-560 l40,-20 l60,10 l50,-14 l70,6 l40,-12 l90,12 l50,-8 L290,-560Z" fill="#e2d4b0"/></g>`;
  // Arco de Septimio Severo: tres arcos, columnas y relieves
  s += `<g transform="translate(1340,860)"><rect x="-300" y="-430" width="600" height="430" fill="#e2d0a8"/><path d="M-90,0 L-90,-250 Q0,-340 90,-250 L90,0Z" fill="#6a5a44"/>${[-1, 1].map(d => `<path d="M${d * 140},0 L${d * 140},-160 Q${d * 195},-220 ${d * 250},-160 L${d * 250},0Z" fill="#6a5a44"/>`).join('')}`;
  for (const x of [-270, -115, 115, 270]) s += roColumn(x, 0, 320, 34, 'corintio', '#ece2c8');
  s += `${[-1, 1].map(d => `<rect x="${d > 0 ? 100 : -250}" y="-300" width="150" height="70" fill="#d6c4a0"/>${[...Array(5)].map((_, k) => `<path d="M${(d > 0 ? 112 : -238) + k * 28},-240 v-40 m0,0 a6,6 0 1,1 0.1,0" stroke="#b8a27a" stroke-width="4" fill="none"/>`).join('')}`).join('')}<rect x="-310" y="-470" width="620" height="50" fill="#efe2c4"/><rect x="-300" y="-560" width="600" height="96" fill="#e8dcc0"/><text x="0" y="-500" font-family="Fredoka" font-weight="700" font-size="30" text-anchor="middle" fill="#8a7a5a" letter-spacing="6">SENATVS·POPVLVSQVE</text></g>`;
  for (let i = 0; i < 10; i++) s += `<g transform="translate(${100 + i * 190},${900 + (i % 3) * 50})"><rect x="0" y="0" width="${60 + (i % 4) * 20}" height="${26 + (i % 2) * 16}" rx="5" fill="#d9cca8" stroke="#b8a888" stroke-width="3"/>${i % 3 == 0 ? `<rect x="10" y="-60" width="26" height="60" fill="#e6dcc0" stroke="#c9b894" stroke-width="2"/>` : ''}</g>`;
  return s + pCrowd(t, 23, 10, 900, 1060) + rLabel('La ciudad eterna: más de 2.700 años', W / 2, 90, 40);
};
scenes.ro_vaticano = function (t) {
  let s = ROALL() + rSky('day') + rSun(1650, 140) + rClouds(t, [[300, 120, .7]]);
  s += `<g transform="translate(960,640) scale(.82)">`;
  s += `<rect x="-150" y="-460" width="300" height="80" fill="#e2d4b0"/>${[...Array(8)].map((_, i) => `<rect x="${-140 + i * 38}" y="-450" width="14" height="60" fill="#efe6cc"/>`).join('')}<path d="M-210,-460 Q-210,-760 0,-780 Q210,-760 210,-460Z" fill="url(#roDome)"/>${[-160, -90, -30, 30, 90, 160].map(x => `<path d="M${x},-462 Q${x * .55},-700 0,-776" stroke="#6a8494" stroke-width="5" fill="none"/>`).join('')}<rect x="-30" y="-850" width="60" height="76" fill="#e2d4b0"/><path d="M-36,-850 Q0,-890 36,-850Z" fill="url(#roDome)"/><path d="M-5,-920 h10 v40 h-10Z M-18,-906 h36 v10 h-36Z" fill="#d9b14a"/>`;
  s += `<rect x="-560" y="-360" width="1120" height="360" fill="url(#roTrav)"/>`;
  for (let i = 0; i < 12; i++) s += roColumn(-520 + i * 94.5, 0, 330, 34, 'corintio', '#efe6cc');
  s += `<path d="M-160,-360 L0,-440 L160,-360Z" fill="#e8dcc0" stroke="#c9b894" stroke-width="6"/><rect x="-580" y="-380" width="1160" height="30" fill="#e2d4b0"/>${[...Array(13)].map((_, i) => statueRO(-540 + i * 90, -380, .9)).join('')}`;
  s += [-1, 0, 1].map(k => `<path d="M${k * 200 - 50},0 L${k * 200 - 50},-140 Q${k * 200},-190 ${k * 200 + 50},-140 L${k * 200 + 50},0Z" fill="#4a3a2c"/>`).join('');
  s += `<rect x="-60" y="-300" width="120" height="70" fill="#3a3a3a"/><rect x="-54" y="-294" width="108" height="58" fill="#8ab0c8" opacity=".6"/></g>`;
  for (const d of [-1, 1]) { s += `<path d="M${960 + d * 460},640 Q${960 + d * 780},700 ${960 + d * 840},960" stroke="#e2d4b0" stroke-width="80" fill="none"/>`;
    for (let i = 0; i < 12; i++) { const k = i / 11, x = 960 + d * (470 + k * 380), y = 640 + k * k * 300; s += `<rect x="${x - 7}" y="${y - 70}" width="14" height="74" fill="#efe6cc"/>${statueRO(x, y - 80, .6 + k * .3)}`; } }
  s += `<path d="M520,640 L1400,640 L1720,1080 L200,1080Z" fill="#d9ccb0"/>${[...Array(6)].map((_, k) => `<path d="M960,${720 + k * 40} L${520 - k * 60},1080 M960,${720 + k * 40} L${1400 + k * 60},1080" stroke="#cdbf9e" stroke-width="3" opacity=".7"/>`).join('')}`;
  s += `<g transform="translate(960,880)"><rect x="-40" y="-40" width="80" height="40" fill="#cdbf9e"/><path d="M-18,-40 L-10,-330 L10,-330 L18,-40Z" fill="#d6c6a2"/><path d="M-10,-330 L0,-360 L10,-330Z" fill="#cdbf9e"/><path d="M-4,-380 h8 v20 h-8Z M-10,-374 h20 v6 h-20Z" fill="#d9b14a"/></g>`;
  for (const x of [700, 1220]) s += `<g transform="translate(${x},900)"><ellipse rx="80" ry="16" fill="#cdbf9e"/><ellipse cy="-4" rx="70" ry="12" fill="url(#roWater)"/><path d="M0,-10 L0,-90" stroke="#d9cca8" stroke-width="14"/><ellipse cy="-90" rx="40" ry="10" fill="#d9cca8"/>${[-1, 1].map(d => `<path d="M0,-96 q${d * 30},-20 ${d * 44},20" stroke="#d8f0f8" stroke-width="4" fill="none" opacity="${.6 + .4 * Math.abs(S(t, 4, d))}"/>`).join('')}</g>`;
  return s + pCrowd(t, 47, 16, 720, 1060) + rLabel('El Vaticano: el país más pequeño del mundo', W / 2, 1010, 38);
};
scenes.ro_sixtina = function (t) {
  let s = ROALL() + `<rect width="${W}" height="${H}" fill="#cdb894"/>`;
  // bóveda pintada: paneles con profetas, cielo y figuras (pintada por Miguel Ángel hace más de 500 años)
  const figs = (x, y, w, h, k) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${['#c8a878', '#9ab4c4', '#d0b084', '#b88a64'][k % 4]}" stroke="#8a6a46" stroke-width="10"/>${[0, 1].map(j => `<g transform="translate(${x + w * (.3 + j * .4)},${y + h * .75})"><circle cy="-${h * .45}" r="${h * .08}" fill="#e2b48e"/><path d="M-${w * .1},0 Q-${w * .12},-${h * .4} 0,-${h * .37} Q${w * .12},-${h * .4} ${w * .1},0Z" fill="${['#c8323a', '#2f5aa0', '#e8b84a', '#5a8a4a'][(k + j) % 4]}"/></g>`).join('')}`;
  for (let i = 0; i < 5; i++) s += figs(40 + i * 376, 40, 340, 240, i);
  s += `<g transform="translate(960,520)"><rect x="-800" y="-200" width="1600" height="360" fill="#a8c4d4" stroke="#8a6a46" stroke-width="16"/><rect x="-800" y="40" width="1600" height="120" fill="#a8b47a"/>
  <path d="M-700,110 Q-560,-10 -300,40 L-170,30" stroke="#e2b48e" stroke-width="42" fill="none" stroke-linecap="round"/><path d="M-560,60 L-520,130 M-420,40 L-400,120" stroke="#e2b48e" stroke-width="26" stroke-linecap="round"/><circle cx="-700" cy="70" r="34" fill="#e2b48e"/><path d="M-170,30 l40,-10 M-170,30 l40,6" stroke="#e2b48e" stroke-width="12" stroke-linecap="round"/>
  <ellipse cx="520" cy="-30" rx="240" ry="120" fill="#c8506a" opacity=".85"/>${[...Array(6)].map((_, k) => `<circle cx="${400 + k * 50}" cy="${-60 + (k % 2) * 40}" r="20" fill="#f0c8a8"/>`).join('')}
  <path d="M720,-40 Q560,-70 300,-20 L150,-16" stroke="#e8c8a0" stroke-width="42" fill="none" stroke-linecap="round"/><circle cx="720" cy="-60" r="36" fill="#e8c8a0"/><path d="M700,-90 Q740,-110 760,-70" stroke="#f4f4f4" stroke-width="16" fill="none"/><path d="M150,-16 l-40,-10 M150,-16 l-40,6" stroke="#e8c8a0" stroke-width="12" stroke-linecap="round"/></g>`;
  for (let i = 0; i < 6; i++) s += `<rect x="${60 + i * 320}" y="700" width="200" height="60" fill="#8a6a46"/><rect x="${70 + i * 320}" y="710" width="180" height="40" fill="#cdb894"/>`;
  s += `<rect x="0" y="760" width="${W}" height="320" fill="#a8946a"/>${[...Array(10)].map((_, i) => `<path d="M${i * 220},760 L${i * 220 - 160},1080" stroke="#98845a" stroke-width="3"/>`).join('')}`;
  return s + pCrowd(t, 53, 12, 820, 1060) + rLabel('Capilla Sixtina: pintada hace más de 500 años', W / 2, 1010, 38);
};
// la familia come sentada a la mesa de la trattoria (no de pie)
scenes.ro_familia = function (t) {
  let s = ROALL() + rSky('day') + romanHouse(0, 640, W, 560, { col: '#d98a5a', ivy: true }) + cobbles(640);
  s += `<path d="M200,560 L1720,560 L1760,620 L160,620Z" fill="#2f6a3a"/>${[...Array(16)].map((_, i) => `<path d="M${160 + i * 100},620 q50,26 100,0" fill="#2f6a3a"/>`).join('')}<text x="960" y="600" font-family="Fredoka" font-weight="600" font-size="34" text-anchor="middle" fill="#f4e6c0">TRATTORIA</text>`;
  s += [260, 1660].map(x => `<g transform="translate(${x},720)"><rect x="-40" y="-90" width="80" height="90" fill="#6b4a36"/><ellipse cx="0" cy="-90" rx="60" ry="14" fill="#8a6a46"/>${[0, 1, 2].map(k => `<circle cx="${-26 + k * 26}" cy="-112" r="16" fill="${['#d9343a', '#e8b45a', '#5a8a3a'][k]}"/>`).join('')}</g>`).join('');
  const people = [[420, { ph: 1, top: '#2b3a67', child: false }], [640, { ph: 2, top: '#c94f6d', longhair: true, child: false, talk: true }], [860, { ph: 3, top: '#5a6a5a', longhair: true, child: false, hair: '#d9d6d0' }], [1080, { ph: 4, top: '#f2c14e' }], [1300, { ph: 5, top: '#e8e2d4', child: false, talk: true }], [1520, { ph: 6, top: '#4f7fe0' }]];
  for (const [x] of people) s += `<g transform="translate(${x},780)"><rect x="-34" y="-110" width="68" height="14" rx="5" fill="#6b4a36"/><rect x="-30" y="-110" width="8" height="110" fill="#6b4a36"/><rect x="22" y="-110" width="8" height="110" fill="#6b4a36"/></g>`;
  for (const [x, o] of people) s += rSit(x, 808, o.child === false ? 1.55 : 1.45, t, Object.assign({ mode: 'banco' }, o));
  // mesa con mantel de cuadros (tapa las piernas: están sentados)
  s += `<rect x="300" y="790" width="1320" height="22" fill="#fbfbf7"/><path d="M300,812 L1620,812 L1640,930 L280,930Z" fill="#fbfbf7"/>${[...Array(12)].map((_, i) => `<path d="M${300 + i * 110},812 l55,0 l2,118 l-55,0Z" fill="#d9343a" opacity=".85"/>`).join('')}${[...Array(3)].map((_, j) => `<rect x="280" y="${840 + j * 32}" width="1360" height="14" fill="#d9343a" opacity=".35"/>`).join('')}`;
  s += `<rect x="330" y="930" width="16" height="100" fill="#6b4a36"/><rect x="1574" y="930" width="16" height="100" fill="#6b4a36"/>`;
  s += `${[420, 640, 860, 1080, 1300, 1520].map((x, i) => `<ellipse cx="${x}" cy="796" rx="62" ry="13" fill="#fbfbf7" stroke="#ddd" stroke-width="2"/>${i % 2 ? `<ellipse cx="${x}" cy="792" rx="40" ry="8" fill="#e8b45a"/><path d="M${x - 20},790 q20,-10 40,0" stroke="#d9343a" stroke-width="4" fill="none"/>` : `<circle cx="${x}" cy="788" r="20" fill="#e8b45a"/><circle cx="${x - 6}" cy="784" r="4" fill="#d9343a"/><circle cx="${x + 7}" cy="790" r="4" fill="#5a8a3a"/>`}<rect x="${x + 70}" y="764" width="16" height="28" rx="3" fill="#cfe8f8" opacity=".85"/>`).join('')}`;
  s += `<g transform="translate(960,792)"><ellipse rx="56" ry="12" fill="#b8844a"/>${[...Array(5)].map((_, k) => `<ellipse cx="${-30 + k * 15}" cy="-8" rx="14" ry="8" fill="#e8c27a"/>`).join('')}</g>`;
  return s + rLabel('La familia: comer juntos, hablar y reír', W / 2, 90, 40);
};
