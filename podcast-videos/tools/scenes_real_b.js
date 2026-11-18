/* Escenas realistas — bloque B (Akihabara → comida) */

/* 4:35 Akihabara — calle Chuo-dori con carteles de anime y videojuegos */
function animeFace(x, y, s, hair, t) {
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-70,-40 Q-80,-120 0,-125 Q80,-120 70,-40 L80,60 L-80,60Z" fill="${hair}"/><ellipse cx="0" cy="-30" rx="58" ry="66" fill="#ffe3cf"/>
  <ellipse cx="-22" cy="-30" rx="13" ry="18" fill="#3a4fb8"/><ellipse cx="22" cy="-30" rx="13" ry="18" fill="#3a4fb8"/><circle cx="-18" cy="-36" r="5" fill="#fff"/><circle cx="26" cy="-36" r="5" fill="#fff"/>
  <path d="M-12,10 Q0,18 12,10" stroke="#a0404a" stroke-width="4" fill="none"/><path d="M-60,-60 Q-20,-110 40,-90 Q10,-70 -60,-60Z" fill="${hair}"/><rect x="-60" y="40" width="120" height="40" fill="#fff"/><path d="M-20,40 L0,70 L20,40" fill="#e8352a"/></g>`;
}
scenes.r_akiba = function (t) {
  let s = D() + rSky('day') + rClouds(t, [[500, 90, .6]]);
  const bb = (x, y, w, h, col, svg) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${col}" stroke="#1a1a1a" stroke-width="4"/>${svg}`;
  s += rBuilding(0, 700, 470, 640, { col: '#d6d0c4', seed: 61, shop: '#e8352a', shopTxt: 'ゲームセンター', roof: true })
    + bb(20, 90, 430, 320, '#ffd34d', animeFace(150, 300, 1.2, '#e86aa0', t) + `<text x="330" y="200" font-family="IPAGothic" font-size="60" text-anchor="middle" fill="#e8352a">アニメ</text><text x="330" y="280" font-family="Fredoka" font-weight="700" font-size="48" text-anchor="middle" fill="#2b3a67">ANIME</text>`);
  s += rBuilding(490, 700, 450, 560, { col: '#c4ccd6', seed: 62, shop: '#2b3a67', shopTxt: 'フィギュア' })
    + bb(510, 170, 410, 260, '#4fb3f6', animeFace(640, 380, 1.0, '#3a3a8a', t) + `<text x="820" y="300" font-family="IPAGothic" font-size="54" text-anchor="middle" fill="#fff">ゲーム</text>`);
  s += rBuilding(960, 700, 480, 680, { col: '#e3ddd2', seed: 63, shop: '#3a7a5a', shopTxt: '電気街', vsign: 'ゲーム', vcol: '#2b6fd6' })
    + bb(980, 60, 380, 300, '#ff7aa8', animeFace(1100, 280, 1.15, '#f2c14e', t) + `<text x="1270" y="220" font-family="Fredoka" font-weight="700" font-size="46" text-anchor="middle" fill="#fff">GAME</text>`);
  s += rBuilding(1460, 700, 460, 600, { col: '#cfc8bb', seed: 64, shop: '#c8321f', shopTxt: 'マンガ', vsign: 'アキバ', vcol: '#e8352a' })
    + bb(1480, 140, 330, 220, '#7ed957', animeFace(1580, 330, .95, '#8a3a3a', t) + `<text x="1720" y="250" font-family="IPAGothic" font-size="44" text-anchor="middle" fill="#2b3a67">漫画</text>`);
  // puente del tren JR con tren amarillo
  const tx = ((t / L) * (W + 1300)) - 1100;
  s += `<rect x="0" y="450" width="${W}" height="60" fill="#8d8b85"/><rect x="0" y="440" width="${W}" height="14" fill="#a9a7a1"/>
  <g transform="translate(${tx},440)"><rect x="0" y="-70" width="1100" height="70" rx="10" fill="#e8e8e2"/><rect x="0" y="-38" width="1100" height="14" fill="#f2c94c"/>${[...Array(18)].map((_, i) => `<rect x="${20 + i * 60}" y="-60" width="40" height="20" rx="3" fill="#6f8fb0"/>`).join('')}</g>`;
  s += rRoadScene(t, 700, { move: 0 });
  return s + rCrowd(t, 72, 18, 730, 1050) + rLabel('Akihabara 秋葉原', W / 2, 1000, 44, '#e8352a');
};

/* 4:58 tiendas con videojuegos, figuras, cómics y luces */
scenes.r_akiba_tienda = function (t) {
  let s = D() + `<rect width="${W}" height="${H}" fill="#2a2440"/>`;
  for (let i = 0; i < 12; i++) s += `<rect x="${i * 170}" y="0" width="150" height="40" fill="hsl(${(i * 30 + t / L * 360) % 360},80%,60%)" opacity=".8" filter="url(#rGlow)"/>`;
  // estantería izquierda: videojuegos
  const shelf = (x, w, label, items) => { let o = `<rect x="${x}" y="120" width="${w}" height="760" fill="#3a3352"/>`; for (let r = 0; r < 5; r++) { o += `<rect x="${x}" y="${270 + r * 150}" width="${w}" height="12" fill="#8a7aa8"/>`; o += items(r); } return o + rLabel(label, x + w / 2, 110, 36); };
  s += shelf(40, 560, 'Videojuegos', r => [...Array(9)].map((_, k) => `<rect x="${60 + k * 60}" y="${170 + r * 150}" width="48" height="98" fill="${['#e8352a', '#2b6fd6', '#f2c14e', '#7ed957', '#ff7aa8', '#fff'][(k + r) % 6]}"/><rect x="${64 + k * 60}" y="${180 + r * 150}" width="40" height="40" fill="#fff" opacity=".7"/>`).join(''));
  // vitrina central: figuras
  s += `<rect x="660" y="120" width="600" height="760" fill="#dfe8f2" opacity=".25"/><rect x="660" y="120" width="600" height="760" fill="none" stroke="#c9d6e4" stroke-width="8"/>`;
  for (let r = 0; r < 4; r++) for (let k = 0; k < 4; k++) { const x = 730 + k * 140, y = 300 + r * 180; s += `<rect x="${x - 50}" y="${y}" width="100" height="10" fill="#c9d6e4"/><g transform="translate(${x},${y})"><rect x="-14" y="-70" width="28" height="50" rx="8" fill="${['#e8352a', '#2b6fd6', '#7ed957', '#ff7aa8'][(r + k) % 4]}"/><circle cx="0" cy="-90" r="22" fill="#ffe3cf"/><path d="M-24,-94 Q0,-130 24,-94 L26,-70 L-26,-70Z" fill="${['#f2c14e', '#3a3a8a', '#e86aa0', '#8a3a3a'][k]}"/><path d="M-10,-20 L-12,0 M10,-20 L12,0" stroke="#333" stroke-width="7"/></g>`; }
  s += rLabel('Figuras', 960, 110, 36);
  // estantería derecha: cómics (manga)
  s += shelf(1320, 560, 'Cómics (manga)', r => [...Array(18)].map((_, k) => `<rect x="${1336 + k * 30}" y="${168 + r * 150}" width="26" height="100" fill="${['#e8352a', '#2b3a67', '#f2c14e', '#7ed957', '#fff', '#ff7aa8'][(k * 7 + r) % 6]}"/>`).join(''));
  s += `<rect x="0" y="880" width="${W}" height="200" fill="#4a4260"/>`;
  return s + rP(820, 1050, 1.3, t, { ph: 1, child: true, top: '#f2c14e', walk: false }) + rP(1130, 1050, 1.5, t, { ph: 4, top: '#2b3a67', walk: false });
};

/* 5:14 tres mundos — postales de Shibuya, Asakusa y Akihabara */
scenes.r_tres = function (t) {
  const card = (i, name, label, sub) => `<g transform="translate(${90 + i * 600},260) rotate(${(i - 1) * 2})"><rect x="-6" y="-4" width="568" height="460" fill="#000" opacity=".25"/><rect x="-14" y="-14" width="568" height="460" fill="#fff"/><circle cx="270" cy="-2" r="14" fill="#e8352a"/><circle cx="266" cy="-6" r="5" fill="#fff" opacity=".6"/>
  <svg x="0" y="0" width="540" height="304" viewBox="0 0 1920 1080">${scenes[name](t)}</svg>
  <text x="270" y="370" font-family="Fredoka" font-weight="700" font-size="52" text-anchor="middle" fill="#2b3a67">${label}</text>
  <text x="270" y="425" font-family="Fredoka" font-weight="600" font-size="38" text-anchor="middle" fill="#e8352a">${sub}</text></g>`;
  return D() + `<rect width="${W}" height="${H}" fill="#b9895a"/><rect width="${W}" height="${H}" fill="url(#dots)" opacity=".35"/><rect x="30" y="30" width="${W - 60}" height="${H - 60}" fill="none" stroke="#7a5232" stroke-width="30"/>`
    + rLabel('Tres mundos en una ciudad', W / 2, 140, 44)
    + card(0, 'shibuya', 'Shibuya', 'Presente') + card(1, 'sensoji', 'Asakusa', 'Pasado') + card(2, 'r_akiba', 'Akihabara', 'Futuro');
};

/* 5:31 Edo — el antiguo pueblo: puente Nihonbashi, río y castillo */
scenes.r_edo = function (t) {
  let s = D() + rSky('dusk') + rSun(1500, 300, 70) + rFuji(1450, 560, 700, 260, .8);
  s += `<g transform="translate(420,560)"><rect x="-150" y="-30" width="300" height="30" fill="#9a958c"/><rect x="-110" y="-120" width="220" height="90" fill="#f2efe6"/>${jroof(0, -120, 260, 80, 34)}<rect x="-70" y="-190" width="140" height="70" fill="#f2efe6"/>${jroof(0, -190, 180, 60, 26)}<rect x="-40" y="-240" width="80" height="50" fill="#f2efe6"/>${jroof(0, -240, 110, 46, 18)}</g>`;
  s += `<rect x="0" y="560" width="${W}" height="120" fill="#6d8a5a"/><rect x="0" y="680" width="${W}" height="400" fill="url(#rWater)"/>
  ${[...Array(10)].map((_, i) => `<path d="M${(i * 230 + t / L * 230) % (W + 200) - 100},${740 + (i % 4) * 70} q30,-8 60,0 t60,0" stroke="#bfe0f2" stroke-width="4" fill="none" opacity=".7"/>`).join('')}`;
  for (let i = 0; i < 6; i++) { const x = i * 330 - 20; s += `<g><rect x="${x}" y="510" width="300" height="170" fill="#c9a77a"/><path d="M${x - 14},520 L${x + 314},520 L${x + 290},470 L${x + 10},470Z" fill="#4a4040"/>${[0, 1, 2, 3].map(k => `<rect x="${x + 20 + k * 70}" y="560" width="50" height="80" fill="#f4ecd8" stroke="#6b4e3a" stroke-width="3"/>`).join('')}<rect x="${x}" y="510" width="300" height="20" fill="${['#2b3a67', '#7a2a1c'][i % 2]}"/></g>`; }
  s += `<path d="M300,760 Q960,560 1620,760" stroke="#7a5232" stroke-width="40" fill="none"/><path d="M300,742 Q960,540 1620,742" stroke="#a8774a" stroke-width="12" fill="none"/>
  ${[...Array(15)].map((_, i) => { const k = i / 14, x = 300 + k * 1320, y = 760 - Math.sin(k * Math.PI) * 196; return `<line x1="${x}" y1="${y - 10}" x2="${x}" y2="${y - 50}" stroke="#7a5232" stroke-width="7"/>`; }).join('')}
  ${[...Array(5)].map((_, i) => `<line x1="${420 + i * 270}" y1="${730 - Math.sin((.1 + i * .2) * Math.PI) * 190}" x2="${420 + i * 270}" y2="1080" stroke="#5a3a22" stroke-width="22"/>`).join('')}`;
  const bx = ((t / L) * (W + 400)) - 200;
  s += `<g transform="translate(${bx},900)"><path d="M-130,0 L130,0 L100,30 L-110,30Z" fill="#6b4a32"/><line x1="40" y1="0" x2="80" y2="-120" stroke="#3a2a1a" stroke-width="5"/>${rP(30, 0, 1.0, t, { ph: 1, kimono: '#3a4a6a', obi: '#d9c79a', walk: false })}</g>`;
  for (let i = 0; i < 6; i++) { const k = ((t / L * .5 + i / 6) % 1), x = 330 + k * 1260, y = 742 - Math.sin(k * Math.PI) * 196; s += rP(x, y, .8, t, { ph: i, kimono: ['#3a4a6a', '#7a2a1c', '#5a6a4a', '#8a6a3a'][i % 4], obi: '#d9c79a' }); }
  return s + rLabel('Edo: así era Tokio hace 400 años', W / 2, 90, 40);
};

/* 5:46 máquinas expendedoras para todo */
scenes.r_maquinas = function (t) {
  let s = D() + rSky('day') + rBuilding(0, 700, W, 560, { col: '#e3ddd2', seed: 70, roof: false });
  s += rRoadScene(t, 700, { lines: false });
  const vm = (x, col, label, inner) => `<g transform="translate(${x},860)">${rShadow(130, 4, 150, .3)}<rect x="0" y="-560" width="260" height="560" rx="6" fill="${col}"/><rect x="8" y="-552" width="10" height="544" fill="#fff" opacity=".18"/>
    <rect x="18" y="-530" width="224" height="300" fill="#f7f7f5"/>${inner}<rect x="40" y="-200" width="180" height="16" fill="#ccc"/><rect x="40" y="-110" width="180" height="70" rx="6" fill="#1d1d1d"/><rect x="200" y="-190" width="30" height="50" rx="4" fill="#3a3a3a"/></g>${rLabel(label, x + 130, 950, 30)}`;
  const cans = (cols, tag) => [0, 1, 2].map(r => [0, 1, 2, 3, 4].map(c => `<rect x="${30 + c * 42}" y="${-518 + r * 96}" width="30" height="64" rx="8" fill="${cols[(r + c) % cols.length]}"/><rect x="${28 + c * 42}" y="${-450 + r * 96}" width="34" height="12" fill="${tag}"/>`).join('')).join('');
  s += vm(40, '#c8321f', 'Bebidas calientes', cans(['#8a4a24', '#c78a4a', '#3a2a1a', '#f2c14e'], '#e8352a'));
  s += vm(330, '#1f5fd6', 'Bebidas frías', cans(['#4fb3f6', '#7ed957', '#e8e8e8', '#f2c14e', '#ff7aa8'], '#2b6fd6'));
  s += vm(620, '#f2a33a', 'Snacks', [0, 1, 2].map(r => [0, 1, 2, 3].map(c => `<rect x="${30 + c * 52}" y="${-516 + r * 96}" width="44" height="70" rx="6" fill="${['#e8352a', '#f2c14e', '#7ed957', '#4fb3f6'][(r + c) % 4]}"/>`).join('')).join(''));
  s += vm(910, '#f4f4f4', 'Helados', [0, 1, 2].map(r => [0, 1, 2, 3].map(c => `<g transform="translate(${52 + c * 52},${-470 + r * 96})"><path d="M-12,0 L12,0 L0,34Z" fill="#d9a066"/><circle cx="0" cy="-6" r="15" fill="${['#ffd6e5', '#fff3c4', '#8a5a3a', '#c9f2a8'][(r + c) % 4]}"/></g>`).join('')).join(''));
  s += vm(1200, '#3a9a4a', 'Agua', cans(['#cfe9ff', '#e8f6ff', '#9fd3ff'], '#2b6fd6'));
  s += vm(1490, '#ff8fb3', 'Flores', [0, 1, 2].map(r => [0, 1, 2].map(c => `<g transform="translate(${60 + c * 70},${-450 + r * 96})"><line x1="0" y1="0" x2="0" y2="-40" stroke="#3a9a4a" stroke-width="4"/>${blossom(0, -46, 16)}</g>`).join('')).join(''));
  return s + rP(((t / L) * (W + 200)) - 100, 1040, 1.3, t, { ph: 2, top: '#2b3a67' }) + rLabel('¡Máquinas para todo!', W / 2, 90, 44);
};

/* 6:16 los trenes casi nunca llegan tarde — andén con horario y empleado que se disculpa */
scenes.r_estacion = function (t) {
  let s = D() + `<rect width="${W}" height="${H}" fill="#dfe3e8"/><rect x="0" y="0" width="${W}" height="90" fill="#9aa3ad"/>`;
  s += `<rect x="0" y="420" width="${W}" height="260" fill="#5a5e66"/><rect x="0" y="660" width="${W}" height="20" fill="#f2c14e"/>${[...Array(30)].map((_, i) => `<rect x="${i * 66}" y="664" width="30" height="12" fill="#3a3a3a"/>`).join('')}`;
  const tx = W - Math.min(1, (t % L) / 4) * (W + 200) + 200;
  s += `<g transform="translate(${Math.max(-60, tx)},640)"><rect x="0" y="-220" width="2200" height="220" rx="20" fill="#eef1f4" stroke="#9aa3ad" stroke-width="3"/><rect x="0" y="-80" width="2200" height="22" fill="#3a9a4a"/>${[...Array(14)].map((_, i) => `<rect x="${60 + i * 150}" y="-190" width="90" height="80" rx="6" fill="#6f8fb0"/>`).join('')}${[0, 1, 2, 3].map(i => `<rect x="${200 + i * 520}" y="-190" width="70" height="170" fill="#c9ced5"/>`).join('')}</g>`;
  s += `<rect x="0" y="680" width="${W}" height="400" fill="#c9c4bb"/>${[...Array(12)].map((_, i) => `<line x1="${i * 170}" y1="680" x2="${i * 170 - 200}" y2="${H}" stroke="#b0aaa0" stroke-width="2"/>`).join('')}`;
  // panel de horarios
  s += `<g transform="translate(1220,110)"><rect x="0" y="0" width="620" height="230" rx="10" fill="#111"/><text x="20" y="50" font-family="IPAGothic" font-size="34" fill="#ffb347">発車 Salida</text>
  ${[['08:15', '東京 Tokio'], ['08:21', '新宿 Shinjuku'], ['08:27', '渋谷 Shibuya']].map(([h, d], i) => `<text x="20" y="${100 + i * 50}" font-family="JetBrains Mono" font-size="36" fill="#7dff8a">${h}</text><text x="160" y="${100 + i * 50}" font-family="IPAGothic" font-size="34" fill="#fff">${d}</text>`).join('')}</g>
  <g transform="translate(240,170)"><circle cx="0" cy="0" r="80" fill="#fff" stroke="#333" stroke-width="8"/><line x1="0" y1="0" x2="0" y2="-55" stroke="#333" stroke-width="6"/><line x1="0" y1="0" x2="${Math.sin(t / L * TAU) * 65}" y2="${-Math.cos(t / L * TAU) * 65}" stroke="#e8352a" stroke-width="3"/><line x1="0" y1="0" x2="40" y2="20" stroke="#333" stroke-width="8"/></g>`;
  s += rP(900, 980, 1.5, t, { ph: 1, top: '#1f2a44', bot: '#1f2a44', walk: false, bow: 26, cap: '#1f2a44' }) + rCrowd(t, 81, 8, 720, 1050);
  return s + rLabel('Puntuales al minuto — y si no, piden disculpas', W / 2, 400, 34);
};

/* 6:56 sushi — barra con cinta giratoria */
scenes.r_sushi = function (t) {
  let s = D() + `<rect width="${W}" height="${H}" fill="#f1e6d2"/><rect x="0" y="0" width="${W}" height="380" fill="#e6d6ba"/>`;
  for (let i = 0; i < 6; i++) s += `<rect x="${80 + i * 300}" y="60" width="230" height="160" fill="#fff" stroke="#8a6a46" stroke-width="6"/><text x="${195 + i * 300}" y="160" font-family="IPAGothic" font-size="50" text-anchor="middle" fill="#2b2b2b">${['まぐろ', 'サーモン', 'えび', 'たまご', 'いか', 'うに'][i]}</text>`;
  s += rP(960, 560, 1.5, t, { ph: 2, top: '#f4f4f4', bot: '#f4f4f4', walk: false, cap: '#f4f4f4' });
  s += `<rect x="0" y="560" width="${W}" height="80" fill="url(#rWood)"/><rect x="0" y="640" width="${W}" height="110" fill="#9aa0a8"/><rect x="0" y="650" width="${W}" height="90" fill="#c9ced5"/>`;
  const nig = (x, y, top) => `<g transform="translate(${x},${y})"><ellipse cx="0" cy="22" rx="70" ry="20" fill="${['#f2c14e', '#e8352a', '#4fb3f6', '#7ed957'][(x / 10 | 0) % 4]}"/><ellipse cx="0" cy="14" rx="62" ry="16" fill="#fafafa"/><ellipse cx="-14" cy="0" rx="28" ry="16" fill="#f7f4ec"/><ellipse cx="18" cy="0" rx="28" ry="16" fill="#f7f4ec"/>
    <path d="M-34,-4 Q0,-26 34,-4 Q0,6 -34,-4Z" fill="${top}"/>${top == '#f2d24a' ? '<rect x="-6" y="-16" width="12" height="30" fill="#1d2a1d"/>' : ''}</g>`;
  const tops = ['#d9343a', '#ff8a5c', '#f2d24a', '#f6b0a0', '#fafafa', '#d9343a'];
  for (let i = 0; i < 10; i++) { const x = ((i * 220 + t / L * 440) % (W + 220)) - 110; s += nig(x, 680, tops[i % 6]); }
  s += `<rect x="0" y="750" width="${W}" height="330" fill="url(#rCounter)"/>
  <g transform="translate(560,880)">${rShadow(0, 40, 120)}<rect x="-130" y="-10" width="260" height="40" rx="6" fill="#3a2a1a"/>${nig(-60, -20, '#d9343a')}${nig(60, -20, '#ff8a5c')}</g>
  <g transform="translate(1300,900)"><ellipse cx="0" cy="20" rx="70" ry="22" fill="#2a6a9a"/><path d="M-60,-40 L60,-40 L50,20 L-50,20Z" fill="#6aa0c8"/><rect x="120" y="-10" width="140" height="10" fill="#d9b07a"/><rect x="120" y="10" width="140" height="10" fill="#d9b07a"/></g>`;
  return s + rLabel('Sushi en cinta giratoria', W / 2, 1020, 40);
};

/* 7:23 ramen — con todos sus ingredientes */
scenes.r_ramen = function (t) {
  let s = D() + `<rect width="${W}" height="${H}" fill="#3a2a22"/><rect x="0" y="0" width="${W}" height="260" fill="#5a3a2a"/>`;
  for (let i = 0; i < 7; i++) s += `<rect x="${i * 280 + 20}" y="60" width="240" height="130" fill="#f4ead2"/><text x="${i * 280 + 140}" y="145" font-family="IPAGothic" font-size="48" text-anchor="middle" fill="#2b2b2b">${['醤油', '味噌', '塩', '豚骨', '餃子', 'ビール', 'ライス'][i]}</text>`;
  s += `<rect x="0" y="560" width="${W}" height="520" fill="url(#rCounter)"/>`;
  const cx = 960, cy = 700;
  s += `${rShadow(cx, cy + 210, 400, .35)}<path d="M${cx - 420},${cy} Q${cx - 400},${cy + 230} ${cx},${cy + 240} Q${cx + 400},${cy + 230} ${cx + 420},${cy}Z" fill="#1a1a1a"/>
  <path d="M${cx - 380},${cy + 70} Q${cx},${cy + 130} ${cx + 380},${cy + 70}" stroke="#c8321f" stroke-width="14" fill="none"/>
  <ellipse cx="${cx}" cy="${cy}" rx="420" ry="120" fill="#141414"/><ellipse cx="${cx}" cy="${cy + 8}" rx="392" ry="104" fill="url(#rBroth)"/>`;
  for (let i = 0; i < 14; i++) s += `<path d="M${cx - 300 + i * 40},${cy + 40} q20,-30 40,0 t40,0" stroke="#f6dc8a" stroke-width="9" fill="none"/>`;
  s += `<g transform="translate(${cx - 190},${cy - 10})"><ellipse rx="95" ry="46" fill="#e6b08a"/><ellipse rx="75" ry="34" fill="#f2c9a5"/><ellipse cx="0" cy="0" rx="40" ry="16" fill="#e6a07a"/></g>
  <g transform="translate(${cx + 30},${cy - 30})"><ellipse rx="58" ry="40" fill="#fff"/><ellipse cx="-4" cy="2" rx="30" ry="22" fill="#f6a623"/></g><g transform="translate(${cx + 130},${cy - 20})"><ellipse rx="58" ry="40" fill="#fff"/><ellipse cx="-4" cy="2" rx="30" ry="22" fill="#f6a623"/></g>
  <rect x="${cx + 200}" y="${cy - 110}" width="120" height="150" rx="6" fill="#1d2a1d" transform="rotate(10 ${cx + 260} ${cy - 40})"/>
  ${[...Array(14)].map((_, i) => `<circle cx="${cx - 60 + (i % 7) * 18}" cy="${cy + 50 + Math.floor(i / 7) * 16}" r="7" fill="#f2d24a"/>`).join('')}
  ${[...Array(16)].map((_, i) => `<circle cx="${cx - 320 + (i * 37) % 160}" cy="${cy + 20 + (i * 13) % 50}" r="8" fill="#5aa63a"/>`).join('')}`;
  for (let i = 0; i < 4; i++) { const o = ((t / L * 2 + i / 4) % 1); s += `<path d="M${cx - 240 + i * 160},${cy - 120 - o * 220} q-30,-40 0,-80 q30,-40 0,-80" stroke="#fff" stroke-width="20" fill="none" stroke-linecap="round" opacity="${.4 * (1 - o)}"/>`; }
  s += `<g transform="translate(${cx + 360},${cy - 90}) rotate(-30)"><rect x="0" y="0" width="16" height="320" rx="6" fill="#d9b07a"/><rect x="26" y="0" width="16" height="320" rx="6" fill="#d9b07a"/></g>`;
  s += rArrowLabel('Carne en rodajas', 330, 420, cx - 200, cy - 10, 30) + rArrowLabel('Huevo cocido', 1560, 420, cx + 90, cy - 30, 30) + rArrowLabel('Fideos de trigo', 330, 960, cx - 140, cy + 45, 30)
    + rArrowLabel('Maíz', 1000, 1010, cx - 20, cy + 60, 30) + rArrowLabel('Cebolla verde', 360, 820, cx - 250, cy + 40, 30) + rArrowLabel('Caldo', 1600, 900, cx + 250, cy + 60, 30) + rArrowLabel('Alga nori', 1620, 640, cx + 270, cy - 40, 30);
  return s + rLabel('Ramen ラーメン', W / 2, 330, 46, '#c8321f');
};

/* 7:58 onigiri */
scenes.r_onigiri = function (t) {
  let s = D() + `<rect width="${W}" height="${H}" fill="#e9eef2"/><rect x="0" y="560" width="${W}" height="520" fill="url(#rCounter)"/>`;
  const oni = (x, y, sc, fill) => `<g transform="translate(${x},${y}) scale(${sc})">${rShadow(0, 10, 150, .3)}<path d="M0,-250 Q30,-250 160,-30 Q172,10 130,10 L-130,10 Q-172,10 -160,-30 Q-30,-250 0,-250Z" fill="#fbfbf7"/>
    ${[...Array(30)].map((_, i) => `<ellipse cx="${-120 + (i * 53) % 240}" cy="${-30 - (i * 37) % 180}" rx="7" ry="4" fill="#ecebe4"/>`).join('')}<path d="M-95,10 L95,10 L95,-110 L-95,-110Z" fill="#1d2a1d"/>${fill || ''}</g>`;
  s += `<rect x="260" y="760" width="1400" height="30" rx="10" fill="#f4f4f4"/>${rShadow(960, 790, 700, .2)}`;
  s += oni(560, 760, 1.0) + oni(1360, 760, 1.0, `<path d="M-130,10 L130,10 L130,-60 Q0,-90 -130,-60Z" fill="#fbfbf7"/><ellipse cx="0" cy="-40" rx="60" ry="34" fill="#f28a5c"/>`) + oni(960, 780, 1.15);
  s += rArrowLabel('Arroz blanco', 300, 300, 520, 620, 32) + rArrowLabel('Alga nori', 300, 960, 900, 720, 32) + rArrowLabel('Relleno de pescado', 1620, 320, 1360, 720, 32);
  s += `<g transform="translate(1700,840)">${rShadow(0, 40, 150)}<rect x="-150" y="-60" width="300" height="100" rx="20" fill="#4fb3f6"/><rect x="-150" y="-80" width="300" height="30" rx="14" fill="#2b6fd6"/></g>${rLabel('Lonchera', 1700, 940, 28)}`;
  return s + rLabel('Onigiri おにぎり', W / 2, 90, 46, '#c8321f');
};

/* 8:27 dango — puesto de festival con brochetas a la brasa */
scenes.r_dango = function (t) {
  let s = D() + rSky('dusk') + `<rect x="0" y="520" width="${W}" height="560" fill="#5a4a4a"/>`;
  for (let i = 0; i < 9; i++) s += lantern(120 + i * 210, 150 + Math.sin(i / 8 * Math.PI) * 40, .45, t + i, '');
  s += `<path d="M0,120 Q960,220 1920,120" stroke="#222" stroke-width="4" fill="none"/>`;
  s += `<g transform="translate(960,560)"><rect x="-620" y="-340" width="1240" height="40" fill="#c8321f"/>${[...Array(8)].map((_, k) => `<path d="M${-620 + k * 155},-300 h155 v70 q-77,24 -155,0Z" fill="${k % 2 ? '#fff' : '#c8321f'}"/>`).join('')}
  <text x="0" y="-220" font-family="IPAGothic" font-size="70" text-anchor="middle" fill="#2b2b2b">だんご</text><rect x="-600" y="-300" width="20" height="560" fill="#7a5232"/><rect x="580" y="-300" width="20" height="560" fill="#7a5232"/>
  <rect x="-560" y="40" width="1120" height="220" fill="url(#rWood)"/><rect x="-480" y="-20" width="960" height="60" fill="#2a2a2a"/>
  ${[...Array(40)].map((_, i) => `<circle cx="${-460 + (i * 47) % 920}" cy="${10 + (i * 13) % 20}" r="9" fill="${S(t, 4, i) > 0 ? '#ff7a2a' : '#c8321f'}" opacity=".9"/>`).join('')}
  ${[...Array(9)].map((_, i) => `<g transform="translate(${-400 + i * 100},-30) rotate(-90)"><line x1="0" y1="0" x2="230" y2="0" stroke="#e2c08a" stroke-width="6"/>${[0, 1, 2, 3].map(k => `<circle cx="${40 + k * 44}" cy="0" r="22" fill="#e8c28a"/><ellipse cx="${40 + k * 44}" cy="-6" rx="20" ry="12" fill="#8a4a1a" opacity=".85"/>`).join('')}</g>`).join('')}</g>`;
  // plato con dango en primer plano
  s += `<rect x="0" y="880" width="${W}" height="200" fill="url(#rCounter)"/><g transform="translate(480,960)">${rShadow(0, 20, 230)}<ellipse cx="0" cy="0" rx="230" ry="50" fill="#f4f4f0"/>
  ${[0, 1].map(j => `<g transform="translate(${-150},${-10 + j * 26}) rotate(-6)"><line x1="0" y1="0" x2="300" y2="0" stroke="#e2c08a" stroke-width="6"/>${[0, 1, 2].map(k => `<circle cx="${60 + k * 66}" cy="0" r="30" fill="#efd3a0"/><path d="M${34 + k * 66},-6 Q${60 + k * 66},-34 ${86 + k * 66},-6 Q${60 + k * 66},14 ${34 + k * 66},-6Z" fill="#8a4a1a" opacity=".9"/>`).join('')}</g>`).join('')}</g>`;
  s += rCrowd(t, 91, 8, 900, 1050, { kimono: true });
  return s + rLabel('Dango: bolitas de arroz con salsa dulce', 1300, 980, 32);
};

/* 8:45 bento — caja con arroz, proteína, verduras y huevo (decorado) */
scenes.r_bento = function (t) {
  let s = D() + `<rect width="${W}" height="${H}" fill="url(#rCounter)"/>${[...Array(10)].map((_, i) => `<line x1="0" y1="${i * 120}" x2="${W}" y2="${i * 120 + 40}" stroke="#a07a4a" stroke-width="3" opacity=".4"/>`).join('')}`;
  const x = 360, y = 160, w = 1200, h = 760;
  s += `${rShadow(960, 950, 650, .35)}<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="40" fill="#1d1d1d"/><rect x="${x + 30}" y="${y + 30}" width="${w - 60}" height="${h - 60}" rx="24" fill="#8a1a14"/>
  <rect x="${x + 50}" y="${y + 50}" width="560" height="${h - 100}" rx="16" fill="#fbfbf7"/>
  ${[...Array(60)].map((_, i) => `<ellipse cx="${x + 80 + (i * 61) % 500}" cy="${y + 80 + (i * 43) % 580}" rx="9" ry="5" fill="#ecebe4"/>`).join('')}
  <g transform="translate(${x + 330},${y + 380})"><circle r="150" fill="#fff"/><circle cx="-110" cy="-110" r="48" fill="#1d1d1d"/><circle cx="110" cy="-110" r="48" fill="#1d1d1d"/><ellipse cx="-55" cy="-10" rx="38" ry="48" fill="#1d1d1d" transform="rotate(-20 -55 -10)"/><ellipse cx="55" cy="-10" rx="38" ry="48" fill="#1d1d1d" transform="rotate(20 55 -10)"/><circle cx="-50" cy="-14" r="10" fill="#fff"/><circle cx="50" cy="-14" r="10" fill="#fff"/><ellipse cx="0" cy="40" rx="20" ry="14" fill="#1d1d1d"/><circle cx="-90" cy="50" r="22" fill="#ff9fb0" opacity=".7"/><circle cx="90" cy="50" r="22" fill="#ff9fb0" opacity=".7"/></g>
  <rect x="${x + 640}" y="${y + 50}" width="${w - 690}" height="330" rx="14" fill="#7a5a3a"/>${[0, 1, 2, 3, 4].map(i => `<path d="M${x + 690 + i * 90},${y + 180} q30,-60 70,-10 q20,50 -30,70 q-50,10 -40,-60Z" fill="${['#c97a3a', '#b5662a', '#d98a4a'][i % 3]}"/>`).join('')}
  <rect x="${x + 640}" y="${y + 400}" width="240" height="310" rx="14" fill="#fff3c4"/>${[0, 1, 2].map(i => `<rect x="${x + 660}" y="${y + 420 + i * 95}" width="200" height="80" rx="10" fill="#f6d26a"/><path d="M${x + 680},${y + 460 + i * 95} q40,-20 80,0 t80,0" stroke="#e8b84a" stroke-width="5" fill="none"/>`).join('')}
  <rect x="${x + 900}" y="${y + 400}" width="${w - 950}" height="310" rx="14" fill="#c9f2a8"/>${[0, 1, 2].map(i => `<g transform="translate(${x + 960 + i * 60},${y + 500})"><rect x="-6" y="0" width="12" height="40" fill="#7ab84a"/><circle cx="0" cy="-10" r="28" fill="#3f8a2a"/></g>`).join('')}${[0, 1].map(i => `<circle cx="${x + 970 + i * 90}" cy="${y + 630}" r="38" fill="#e8352a"/><path d="M${x + 958 + i * 90},${y + 596} l12,8 l12,-8" stroke="#3a8a2a" stroke-width="5" fill="none"/>`).join('')}`;
  s += rArrowLabel('Arroz', 220, 300, x + 200, y + 150, 30) + rArrowLabel('Proteína', 1740, 230, x + 900, y + 200, 30) + rArrowLabel('Huevo', 1740, 760, x + 760, y + 560, 30) + rArrowLabel('Verduras', 1740, 980, x + 1030, y + 640, 30) + rArrowLabel('¡Decorado como un personaje!', 520, 1010, x + 330, y + 520, 30);
  return s + `<g transform="translate(1680,500) rotate(10)"><rect x="0" y="0" width="18" height="380" rx="6" fill="#d9b07a"/><rect x="30" y="0" width="18" height="380" rx="6" fill="#d9b07a"/></g>` + rLabel('Bento 弁当', W / 2, 80, 46, '#c8321f');
};
