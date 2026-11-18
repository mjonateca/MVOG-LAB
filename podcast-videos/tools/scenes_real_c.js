/* Escenas realistas — bloque C (Kenji → final) */

/* 9:50 Kenji se despide de sus padres en la entrada de casa (genkan) */
scenes.r_genkan = function (t) {
  let s = D() + `<rect width="${W}" height="${H}" fill="#efe6d2"/>`;
  s += `<rect x="0" y="0" width="${W}" height="120" fill="#8a6a46"/><rect x="0" y="620" width="${W}" height="80" fill="url(#rWood)"/><rect x="0" y="700" width="${W}" height="380" fill="#b9b3a8"/>
  <rect x="1280" y="140" width="520" height="560" fill="#7a5232"/><rect x="1310" y="170" width="460" height="530" fill="#9fc0dc" opacity=".6"/><rect x="1300" y="160" width="10" height="540" fill="#5a3a22"/>
  ${[0, 1, 2].map(i => `<rect x="${200 + i * 130}" y="${200}" width="110" height="380" fill="#f8f3e6" stroke="#8a6a46" stroke-width="8"/>`).join('')}
  <g transform="translate(900,700)"><rect x="-120" y="-10" width="240" height="20" fill="#7a5232"/>${[0, 1, 2].map(i => `<ellipse cx="${-80 + i * 80}" cy="-6" rx="30" ry="10" fill="${['#3a3a3a', '#6a4a3a', '#e8352a'][i]}"/>`).join('')}</g>`;
  s += rP(420, 700, 2.0, t, { ph: 1, top: '#4f7fe0', bot: '#2b2f3a', walk: false, bow: 18, longhair: true, skirt: '#c9b48a' })
    + rP(640, 700, 2.15, t, { ph: 2, top: '#e8e8e8', bot: '#30364a', walk: false, bow: 15 })
    + rP(1050, 960, 2.2, t, { ph: 3, child: true, top: '#2b3a67', bot: '#2b3a67', walk: false, bow: 22 + S(t, 2) * 6, bag: '#c8321f', cap: '#f2c94c' });
  return s + rLabel('Kenji se despide con una reverencia', W / 2, 60, 38);
};

/* 10:02 Kenji camina solo a la escuela; saluda al tendero; semáforo; otros niños */
scenes.r_kenji_calle = function (t) {
  let s = D() + rSky('day') + rSun(1700, 140) + rClouds(t, [[500, 120, .7]]);
  s += rBuilding(0, 660, 520, 380, { col: '#efe9de', seed: 81, shop: '#3a7a5a', shopTxt: 'やおや' }) + rBuilding(540, 660, 460, 460, { col: '#e2d7c3', seed: 82 })
    + rBuilding(1020, 660, 420, 400, { col: '#dcd6cc', seed: 83, shop: '#c8321f', shopTxt: 'パン' }) + rBuilding(1460, 660, 460, 500, { col: '#d8d2c6', seed: 84 });
  s += rRoadScene(t, 660, { lines: false });
  // paso de cebra + semáforo
  s += `${[...Array(9)].map((_, i) => `<rect x="${1240 + i * 60}" y="740" width="34" height="250" fill="#f2f2f2" opacity=".85" transform="skewX(-12)"/>`).join('')}
  <g transform="translate(1180,720)">${rShadow(0, 0, 18)}<rect x="-5" y="-300" width="10" height="300" fill="#555"/><rect x="-30" y="-380" width="60" height="90" rx="8" fill="#222"/><circle cx="0" cy="-360" r="14" fill="${(t % 8) < 5 ? '#ff4444' : '#441111'}"/><circle cx="0" cy="-315" r="14" fill="${(t % 8) >= 5 ? '#33dd77' : '#114422'}"/></g>`;
  // tendero saludando
  s += rP(220, 700, 1.4, t, { ph: 1, top: '#e8e8e8', bot: '#3a3a3a', walk: false, wave: true, cap: '#3a7a5a' });
  // Kenji (gorra amarilla + randoseru) y otros niños
  const kx = 300 + ((t / L) * 900);
  s += rP(kx, 1010, 2.2, t, { ph: 3, child: true, top: '#2b3a67', bot: '#2b3a67', bag: '#c8321f', cap: '#f2c94c', dir: 1 })
    + rP(1480, 1020, 2.1, t, { ph: 5, child: true, top: '#2b3a67', bot: '#2b3a67', bag: '#1d1d1d', cap: '#f2c94c', walk: false })
    + rP(1620, 1035, 2.05, t, { ph: 6, child: true, top: '#2b3a67', bot: '#2b3a67', bag: '#c8321f', cap: '#f2c94c', walk: false, longhair: true })
    + rP(1760, 1020, 2.1, t, { ph: 7, child: true, top: '#2b3a67', bot: '#2b3a67', bag: '#1d1d1d', cap: '#f2c94c', walk: false });
  return s + rLabel('Kenji va solo a la escuela', W / 2, 90, 40);
};

/* 10:30 cambio de zapatos (getabako) */
scenes.r_getabako = function (t) {
  let s = D() + `<rect width="${W}" height="${H}" fill="#e9e4d8"/><rect x="0" y="760" width="${W}" height="320" fill="#c9c0ae"/>`;
  s += `<rect x="160" y="140" width="1600" height="620" fill="#c9a77a"/>`;
  for (let r = 0; r < 5; r++) for (let c = 0; c < 12; c++) {
    const x = 180 + c * 132, y = 160 + r * 118;
    s += `<rect x="${x}" y="${y}" width="120" height="106" fill="#8a6a46"/><rect x="${x + 8}" y="${y + 8}" width="104" height="90" fill="#3a2a1e"/>
    <ellipse cx="${x + 40}" cy="${y + 80}" rx="26" ry="12" fill="${(r + c) % 3 ? '#f4f4f0' : '#2b2b2b'}"/><ellipse cx="${x + 80}" cy="${y + 80}" rx="26" ry="12" fill="${(r + c) % 3 ? '#f4f4f0' : '#2b2b2b'}"/>
    <rect x="${x + 30}" y="${y + 10}" width="60" height="16" fill="#fff"/>`;
  }
  s += `<rect x="0" y="760" width="${W}" height="30" fill="#7a5232"/>`;
  s += rP(620, 1000, 1.8, t, { ph: 1, child: true, top: '#2b3a67', bot: '#2b3a67', bag: '#c8321f', walk: false, bow: 30 + S(t, 2) * 10 })
    + `<g transform="translate(640,1010)"><ellipse cx="-30" cy="0" rx="34" ry="14" fill="#2b2b2b"/><ellipse cx="40" cy="0" rx="34" ry="14" fill="#f4f4f0" stroke="#4fb3f6" stroke-width="4"/></g>`
    + rP(1100, 1000, 1.75, t, { ph: 2, child: true, top: '#2b3a67', bot: '#2b3a67', bag: '#1d1d1d', walk: false })
    + rP(1360, 1000, 1.7, t, { ph: 3, child: true, top: '#2b3a67', bot: '#2b3a67', bag: '#c8321f', walk: false, longhair: true });
  return s + rArrowLabel('Zapatos de casa (uwabaki)', 560, 880, 680, 1005, 30) + rLabel('Zapatos fuera, zapatillas dentro', W / 2, 80, 40);
};

/* 10:41 limpian su salón juntos */
scenes.r_aula = function (t) {
  let s = D() + `<rect width="${W}" height="${H}" fill="#f2ecdf"/>`;
  s += `<rect x="420" y="100" width="1080" height="380" fill="#2e5e4e" stroke="#8a6a46" stroke-width="18"/><text x="960" y="260" font-family="IPAGothic" font-size="90" text-anchor="middle" fill="#fff">そうじ</text><text x="960" y="380" font-family="Fredoka" font-weight="600" font-size="60" text-anchor="middle" fill="#ffe14f">¡Limpiamos juntos!</text>
  <rect x="1560" y="120" width="300" height="420" fill="#9fc0dc" stroke="#8a6a46" stroke-width="12"/><line x1="1710" y1="120" x2="1710" y2="540" stroke="#8a6a46" stroke-width="8"/>
  <rect x="0" y="600" width="${W}" height="480" fill="#c9a06a"/>${[...Array(14)].map((_, i) => `<line x1="${i * 150}" y1="600" x2="${i * 150 - 300}" y2="${H}" stroke="#a87a46" stroke-width="3"/>`).join('')}`;
  // pupitres apilados al fondo
  for (let i = 0; i < 6; i++) s += `<g transform="translate(${150 + i * 130},640)"><rect x="-50" y="-60" width="100" height="10" fill="#c9a77a"/><rect x="-46" y="-50" width="8" height="60" fill="#888"/><rect x="38" y="-50" width="8" height="60" fill="#888"/><rect x="-40" y="-120" width="80" height="10" fill="#c9a77a"/></g>`;
  const sw = S(t, 4) * 20;
  s += `<g transform="translate(700,1000)">${rP(0, 0, 1.9, t, { ph: 1, child: true, top: '#f4f4f4', bot: '#2b3a67', walk: false })}<g transform="rotate(${sw} 20 -110)"><line x1="20" y1="-110" x2="70" y2="40" stroke="#8a5a3a" stroke-width="7"/><path d="M50,30 l60,0 l-6,40 l-50,0Z" fill="#e2c08a"/></g></g>
  <g transform="translate(1120,1010)">${rP(0, 0, 1.85, t, { ph: 2, child: true, top: '#f4f4f4', bot: '#2b3a67', walk: false, bow: 40, longhair: true })}<rect x="${30 + sw}" y="-10" width="70" height="20" rx="4" fill="#f4f4f4" stroke="#bbb" stroke-width="3"/></g>
  <g transform="translate(1480,1000)">${rP(0, 0, 1.9, t, { ph: 3, child: true, top: '#f4f4f4', bot: '#2b3a67', walk: false })}<g transform="rotate(${-sw} -20 -110)"><line x1="-20" y1="-110" x2="-70" y2="40" stroke="#8a5a3a" stroke-width="7"/><path d="M-50,30 l-60,0 l6,40 l50,0Z" fill="#e2c08a"/></g></g>`;
  return s;
};

/* 11:02 se saluda con una pequeña reverencia */
scenes.r_reverencia = function (t) {
  let s = D() + rSky('day') + rBuilding(0, 680, W, 560, { col: '#e7e1d6', seed: 91, roof: false });
  s += `<rect x="560" y="300" width="800" height="380" fill="#9fc0dc" opacity=".7"/><rect x="560" y="300" width="800" height="380" fill="none" stroke="#7a7a7a" stroke-width="10"/><line x1="960" y1="300" x2="960" y2="680" stroke="#7a7a7a" stroke-width="8"/>`;
  s += rRoadScene(t, 680, { lines: false });
  const b1 = Math.max(0, S(t, 2)) * 32, b2 = Math.max(0, S(t, 2, .3)) * 32;
  s += rP(780, 1010, 2.1, t, { ph: 1, top: '#2b3a67', bot: '#2b3a67', walk: false, bow: b1 }) + rP(1140, 1010, 2.1, t, { ph: 2, top: '#4a4a52', bot: '#4a4a52', walk: false, bow: b2, dir: -1, longhair: true, skirt: '#4a4a52' });
  return s + rLabel('こんにちは · Konnichiwa', 960, 360, 40) + rLabel('Saludo con reverencia', W / 2, 90, 40);
};

/* 11:14 se habla en voz baja en público — vagón de tren silencioso */
scenes.r_vagon = function (t) {
  let s = D() + `<rect width="${W}" height="${H}" fill="#e8ecef"/>`;
  s += `${[0, 1, 2].map(i => `<rect x="${140 + i * 600}" y="140" width="500" height="300" rx="20" fill="#9fc0dc"/><rect x="${140 + i * 600}" y="140" width="500" height="300" rx="20" fill="url(#rSkyDay)" opacity=".6"/>`).join('')}
  ${[...Array(5)].map((_, i) => `<path d="M${-200 + ((i * 500 + t / L * 2000) % 2400)},300 l300,0" stroke="#fff" stroke-width="6" opacity=".6"/>`).join('')}
  <rect x="0" y="60" width="${W}" height="20" fill="#c9ced5"/>${[...Array(12)].map((_, i) => `<g transform="translate(${80 + i * 160},80)"><line x1="0" y1="0" x2="0" y2="80" stroke="#aaa" stroke-width="3"/><circle cx="0" cy="96" r="18" fill="none" stroke="#f2c14e" stroke-width="6"/></g>`).join('')}
  <rect x="0" y="560" width="${W}" height="110" rx="20" fill="#3f7a5a"/><rect x="0" y="660" width="${W}" height="420" fill="#c9c4bb"/>`;
  s += `<g transform="translate(1620,200)"><rect x="0" y="0" width="230" height="150" rx="12" fill="#fff" stroke="#2b3a67" stroke-width="5"/><rect x="40" y="25" width="50" height="90" rx="8" fill="#2b3a67"/><path d="M120,30 L200,110 M200,30 L120,110" stroke="#e8352a" stroke-width="10"/></g>`;
  const seated = (x, o) => `<g transform="translate(${x},640)">${rP(0, 0, 1.6, t, Object.assign({ walk: false }, o))}</g>`;
  s += seated(260, { ph: 1, top: '#2b3a67', hold: `<rect x="-2" y="-112" width="12" height="20" rx="3" fill="#111"/>` }) + seated(520, { ph: 2, top: '#c94f6d', longhair: true, hold: `<rect x="-14" y="-118" width="34" height="26" fill="#e8e0c8"/>` })
    + seated(780, { ph: 3, child: true, top: '#2b3a67', bag: '#c8321f', cap: '#f2c94c' }) + seated(1040, { ph: 4, top: '#7a8f6a' }) + seated(1300, { ph: 5, top: '#333', hold: `<rect x="-2" y="-112" width="12" height="20" rx="3" fill="#111"/>` });
  return s + rLabel('En público se habla en voz baja 🤫', W / 2, 1000, 40);
};

/* 11:21 Matsuri — yagura, tambor taiko, baile bon-odori y puestos */
scenes.r_matsuri = function (t) {
  let s = D() + rSky('night') + rStars(t, 30) + `<rect x="0" y="600" width="${W}" height="480" fill="#4a3e3a"/>`;
  for (let r = 0; r < 2; r++) s += `<path d="M0,${150 + r * 60} Q960,${260 + r * 60} 1920,${150 + r * 60}" stroke="#222" stroke-width="3" fill="none"/>` + [...Array(12)].map((_, i) => lantern(80 + i * 160, 180 + r * 60 + Math.sin(i / 11 * Math.PI) * 100, .3, t + i, '')).join('');
  // yagura
  s += `<g transform="translate(960,760)"><rect x="-200" y="-260" width="20" height="260" fill="#7a5232"/><rect x="180" y="-260" width="20" height="260" fill="#7a5232"/><rect x="-230" y="-280" width="460" height="30" fill="#7a5232"/>
  <rect x="-210" y="-250" width="420" height="80" fill="#fff"/>${[...Array(6)].map((_, i) => `<rect x="${-210 + i * 70}" y="-250" width="35" height="80" fill="#c8321f"/>`).join('')}<path d="M-250,-280 L0,-380 L250,-280Z" fill="#5a4a3a"/>
  <g transform="translate(0,-300)"><ellipse cx="0" cy="-40" rx="60" ry="22" fill="#f4e6c8"/><rect x="-60" y="-40" width="120" height="70" fill="#b5442c"/><ellipse cx="0" cy="30" rx="60" ry="20" fill="#8a3020"/></g>
  ${rP(-90, -280, 1.0, t, { ph: 1, kimono: '#fff', obi: '#c8321f', walk: false })}<g transform="rotate(${S(t, 8) * 30} -70 -390)"><line x1="-70" y1="-390" x2="-20" y2="-360" stroke="#d9b07a" stroke-width="8"/></g></g>`;
  for (let i = 0; i < 4; i++) { const x = i < 2 ? 80 + i * 300 : 1340 + (i - 2) * 300; s += `<g><rect x="${x}" y="560" width="270" height="200" fill="#c9a77a"/><rect x="${x}" y="530" width="270" height="40" fill="${i % 2 ? '#2b3a67' : '#c8321f'}"/><text x="${x + 135}" y="560" font-family="IPAGothic" font-size="30" text-anchor="middle" fill="#fff">${['たこ焼き', 'かき氷', 'わたあめ', 'やきそば'][i]}</text><rect x="${x + 20}" y="600" width="230" height="80" fill="#fff3d0" opacity=".9"/></g>`; }
  // círculo de baile
  const dancers = []; for (let i = 0; i < 14; i++) { const a = t / L * TAU * .5 + i / 14 * TAU, x = 960 + Math.cos(a) * 560, y = 900 + Math.sin(a) * 110; dancers.push([y, x, i, Math.cos(a + Math.PI / 2) > 0 ? 1 : -1]); }
  dancers.sort((a, b) => a[0] - b[0]);
  for (const [y, x, i, d] of dancers) s += rP(x, y, .95 + (y - 790) / 220 * .45, t, { ph: i, kimono: ['#2b6fd6', '#e88fb0', '#f4f4f0', '#6a4fa0', '#e8352a'][i % 5], obi: ['#f2c14e', '#c8321f', '#2b3a67'][i % 3], dir: d, bun: i % 2 == 0 });
  return s + rLabel('Matsuri 祭り: música, baile y comida', W / 2, 1020, 38);
};

/* 11:43 sakura junto al río Meguro */
scenes.r_sakura = function (t) {
  let s = D() + rSky('day') + rSun(1600, 120) + rClouds(t, [[300, 100, .7]]);
  s += `<path d="M0,520 L760,520 L560,1080 L0,1080Z" fill="url(#rWalk)"/><path d="M1160,520 L1920,520 L1920,1080 L1360,1080Z" fill="url(#rWalk)"/>
  <path d="M760,520 L1160,520 L1360,1080 L560,1080Z" fill="url(#rWater)"/>${[...Array(8)].map((_, i) => `<path d="M${780 + i * 50},${560 + i * 60} q20,-6 40,0" stroke="#cfe6f2" stroke-width="3" fill="none"/>`).join('')}
  <path d="M760,520 L560,1080" stroke="#8d877c" stroke-width="16"/><path d="M1160,520 L1360,1080" stroke="#8d877c" stroke-width="16"/>`;
  for (let i = 5; i >= 0; i--) { const k = i / 6, sc = 1.2 - k * .85; s += rTree(700 - (1 - k) * 420, 540 + (1 - k) * 480, sc, 'sakura', t, 60 + i) + rTree(1220 + (1 - k) * 420, 540 + (1 - k) * 480, sc, 'sakura', t, 70 + i); }
  for (let i = 0; i < 10; i++) s += `<circle cx="${780 + i * 40}" cy="${540 + (i % 3) * 3}" r="7" fill="#ffd1dc" opacity=".8"/>`;
  return s + rCrowd(t, 33, 6, 900, 1060, { scale: y => .9 + (y - 900) / 160 * .4 }) + rPetals(t, 40, 8) + rLabel('Sakura 桜 · río Meguro', W / 2, 1010, 40);
};

/* 12:25 hanami — picnic bajo los cerezos (parque Ueno) */
scenes.r_hanami = function (t) {
  let s = D() + rSky('day') + rClouds(t, [[400, 110, .7], [1400, 140, .6]]) + `<rect x="0" y="560" width="${W}" height="520" fill="#8fb36a"/><path d="M700,560 L1220,560 L1500,1080 L420,1080Z" fill="#cbbf9e"/>`;
  for (let i = 0; i < 5; i++) s += rTree(120 + i * 140, 600 + i * 30, .7 + i * .12, 'sakura', t, 80 + i) + rTree(1800 - i * 140, 600 + i * 30, .7 + i * .12, 'sakura', t, 90 + i);
  const tarp = (x, y, w, h) => `<path d="M${x},${y} L${x + w},${y} L${x + w + 40},${y + h} L${x - 40},${y + h}Z" fill="#4f9be0"/><path d="M${x},${y} L${x + w},${y}" stroke="#2b6fd6" stroke-width="4"/>`;
  s += tarp(140, 860, 380, 120) + tarp(1420, 870, 380, 120);
  const sit = (x, y, o) => rP(x, y, 1.3, t, Object.assign({ walk: false }, o));
  s += sit(240, 950, { ph: 1, top: '#c94f6d', longhair: true }) + sit(360, 945, { ph: 2, top: '#2b3a67' }) + sit(460, 960, { ph: 3, child: true, top: '#f2c14e' })
    + sit(1520, 960, { ph: 4, top: '#7a8f6a' }) + sit(1640, 955, { ph: 5, top: '#e8e8e8', longhair: true }) + sit(1740, 965, { ph: 6, child: true, top: '#ff7aa8' })
    + `<g transform="translate(330,970)">${rShadow(0, 0, 60)}<rect x="-60" y="-30" width="120" height="40" rx="6" fill="#1d1d1d"/><rect x="-52" y="-24" width="50" height="28" fill="#fbfbf7"/><rect x="4" y="-24" width="48" height="28" fill="#e8352a"/></g>`;
  return s + rCrowd(t, 55, 7, 640, 760, { scale: y => .55 + (y - 640) / 120 * .2 }) + rPetals(t, 45, 9) + rLabel('Hanami 花見: mirar las flores', W / 2, 90, 40);
};

/* 12:42 la sakura — rama de cerezo en primer plano */
scenes.r_rama = function (t) {
  let s = D() + rSky('day') + rSun(1500, 200, 80);
  s += `<g transform="rotate(${S(t, 1) * 1.5} 0 300)"><path d="M-40,300 Q500,260 900,380 Q1300,500 1960,420" stroke="#5a3a2a" stroke-width="40" fill="none" stroke-linecap="round"/>
  <path d="M600,330 Q700,200 820,160 M1200,470 Q1300,600 1460,640 M300,290 Q340,420 420,480" stroke="#5a3a2a" stroke-width="18" fill="none" stroke-linecap="round"/>`;
  const R = rng(5); for (let i = 0; i < 70; i++) { const k = R(), x = k * 1900, y = 300 + Math.sin(k * 3) * 80 + (R() - .5) * 220; const r = 22 + R() * 18; s += `<g transform="translate(${x},${y}) rotate(${R() * 72})">${[0, 1, 2, 3, 4].map(p => `<ellipse cx="0" cy="${-r * .55}" rx="${r * .45}" ry="${r * .55}" fill="${p % 2 ? '#fbd8e3' : '#f7c3d4'}" transform="rotate(${p * 72})"/>`).join('')}<circle r="${r * .2}" fill="#e05a8a"/></g>`; }
  s += '</g>';
  return s + rPetals(t, 60, 12) + rLabel('Belleza · alegría · el paso del tiempo', W / 2, 960, 40);
};

/* 13:00 tres formas de escribir — pizarra de clase */
scenes.r_pizarra = function (t) {
  let s = D() + `<rect width="${W}" height="${H}" fill="#f2ecdf"/><rect x="0" y="820" width="${W}" height="260" fill="#c9a06a"/>`;
  s += `<rect x="160" y="80" width="1600" height="640" fill="#2e5e4e" stroke="#8a6a46" stroke-width="22"/><rect x="160" y="700" width="1600" height="24" fill="#8a6a46"/>`;
  const col = [['あ', 'Hiragana', 'ひらがな'], ['ア', 'Katakana', 'カタカナ'], ['山', 'Kanji', '漢字']];
  col.forEach(([ch, ro, jp], i) => { const x = 430 + i * 530, p = Math.min(1, ((t + i * 1.4) % L) / 2.5); s += `<text x="${x}" y="420" font-family="IPAGothic" font-size="280" text-anchor="middle" fill="#fafaf0" opacity="${p}">${ch}</text><text x="${x}" y="540" font-family="Fredoka" font-weight="600" font-size="64" text-anchor="middle" fill="#ffe14f">${ro}</text><text x="${x}" y="620" font-family="IPAGothic" font-size="46" text-anchor="middle" fill="#cfe6ff">${jp}</text>`; });
  s += `<rect x="700" y="700" width="70" height="14" fill="#fff"/><rect x="800" y="700" width="70" height="14" fill="#ffe14f"/>`;
  return s + rP(1650, 1040, 1.9, t, { ph: 1, top: '#7a8f6a', bot: '#3a3a3a', walk: false, longhair: true });
};

/* 13:27 Konnichiwa, Arigato, Sayonara — saludos en una tienda */
scenes.r_saludos = function (t) {
  let s = D() + rSky('day') + rBuilding(0, 680, W, 560, { col: '#efe7d6', seed: 95, roof: false });
  s += `<rect x="560" y="340" width="800" height="340" fill="#fff3cf"/><rect x="540" y="300" width="840" height="60" fill="#3a7a5a"/><text x="960" y="345" font-family="IPAGothic" font-size="40" text-anchor="middle" fill="#fff">お店 · Tienda</text>
  <rect x="600" y="440" width="720" height="40" fill="#c9a77a"/>${[...Array(6)].map((_, i) => `<rect x="${620 + i * 115}" y="${400}" width="90" height="40" rx="6" fill="${['#e8352a', '#f2c14e', '#7ed957', '#4fb3f6'][i % 4]}"/>`).join('')}`;
  s += rRoadScene(t, 680, { lines: false });
  const bubble = (x, y, jp, es) => `<g transform="translate(${x},${y})"><rect x="-180" y="-80" width="360" height="130" rx="30" fill="#fff" stroke="#2b3a67" stroke-width="5"/><path d="M-20,50 L0,90 L20,50Z" fill="#fff" stroke="#2b3a67" stroke-width="5"/><rect x="-20" y="44" width="40" height="10" fill="#fff"/>
    <text x="0" y="-12" font-family="Fredoka" font-weight="700" font-size="50" text-anchor="middle" fill="#2b3a67">${jp}</text><text x="0" y="34" font-family="Fredoka" font-weight="600" font-size="34" text-anchor="middle" fill="#e8352a">${es}</text></g>`;
  s += rP(700, 1000, 2.0, t, { ph: 1, top: '#3a7a5a', bot: '#2b2f3a', walk: false, bow: Math.max(0, S(t, 2)) * 25 }) + rP(1200, 1010, 2.0, t, { ph: 2, top: '#c94f6d', bot: '#2b2f3a', walk: false, longhair: true, dir: -1 })
    + rP(1420, 1020, 1.6, t, { ph: 3, child: true, top: '#f2c14e', walk: false, wave: true, dir: -1 });
  return s + bubble(560, 560, 'Konnichiwa', 'Hola') + bubble(1260, 560, 'Arigato', 'Gracias') + bubble(1640, 720, 'Sayonara', 'Adiós');
};

/* 13:38 en lugares turísticos también hablan inglés — carteles bilingües de estación */
scenes.r_carteles = function (t) {
  let s = D() + `<rect width="${W}" height="${H}" fill="#d9dee4"/><rect x="0" y="0" width="${W}" height="100" fill="#9aa3ad"/><rect x="0" y="700" width="${W}" height="380" fill="#c9c4bb"/>`;
  s += `<g transform="translate(160,160)"><rect x="0" y="0" width="1600" height="230" rx="10" fill="#1d1d22"/><rect x="0" y="0" width="1600" height="16" fill="#3a9a4a"/>
  <text x="400" y="120" font-family="IPAGothic" font-size="96" text-anchor="middle" fill="#fff">新宿</text><text x="400" y="190" font-family="Fredoka" font-weight="600" font-size="52" text-anchor="middle" fill="#cfe6ff">Shinjuku</text>
  <text x="1120" y="110" font-family="IPAGothic" font-size="54" fill="#fff">出口 →</text><text x="1120" y="180" font-family="Fredoka" font-weight="600" font-size="46" fill="#ffe14f">Exit →</text></g>
  <g transform="translate(260,440)"><rect x="0" y="0" width="560" height="160" rx="10" fill="#f2c14e"/><text x="30" y="70" font-family="IPAGothic" font-size="50" fill="#1d1d22">きっぷうりば</text><text x="30" y="132" font-family="Fredoka" font-weight="600" font-size="42" fill="#1d1d22">Tickets</text></g>
  <g transform="translate(1100,440)"><rect x="0" y="0" width="560" height="160" rx="10" fill="#2b6fd6"/><text x="30" y="70" font-family="IPAGothic" font-size="50" fill="#fff">お手洗い</text><text x="30" y="132" font-family="Fredoka" font-weight="600" font-size="42" fill="#fff">Toilets</text></g>`;
  s += rCrowd(t, 41, 16, 740, 1060, { umbrellas: false });
  return s + rLabel('Japonés + inglés en los carteles', W / 2, 660, 40);
};

/* 14:28 despedida */
scenes.r_outro = function (t) {
  return D() + rSky('dusk') + rSun(1450, 420, 80) + rFuji(1350, 760, 1100, 380, .7) + rSkytree(1700, 820, .9) + rSkyline(t, 820, 11) + rTokyoTower(520, 840, .78)
    + `<rect x="0" y="830" width="${W}" height="250" fill="url(#rWalk)"/>` + rCrowd(t, 5, 10, 900, 1060)
    + `<g transform="translate(${W / 2},${H / 2 - 140}) scale(${1 + S(t, 2) * .01})"><rect x="-600" y="-150" width="1200" height="300" rx="40" fill="#fff" opacity=".95" stroke="#2b3a67" stroke-width="6"/>
  <text x="0" y="-20" font-family="Fredoka" font-weight="700" font-size="104" text-anchor="middle" fill="#e8352a" stroke="#2b3a67" stroke-width="4" paint-order="stroke">¡Sayonara, Tokio!</text>
  <text x="0" y="90" font-family="Fredoka" font-weight="600" font-size="52" text-anchor="middle" fill="#2b3a67">Nos vemos en el próximo viaje ✈</text></g>`;
};
