/* Escenas realistas — bloque A (intro → Asakusa) */
const D = () => defs2 + defs3 + RD;

function rTokyoTower(x, base, s = 1) {
  let lat = '';
  for (let i = 0; i < 14; i++) {
    const y = -i * 40, w1 = 150 - i * 9.5, w2 = 150 - (i + 1) * 9.5, band = Math.floor(i / 2) % 2 ? '#f4f4f0' : '#e8502a';
    lat += `<path d="M${-w1},${y} L${w1},${y} L${w2},${y - 40} L${-w2},${y - 40}Z" fill="${band}" opacity=".95"/>
      <path d="M${-w1},${y} L${w2},${y - 40} M${w1},${y} L${-w2},${y - 40}" stroke="#7a2a16" stroke-width="2" opacity=".55"/>`;
  }
  return `<g transform="translate(${x},${base}) scale(${s})">
   <path d="M-210,0 Q-150,-120 -120,-200 L120,-200 Q150,-120 210,0 L160,0 Q110,-110 0,-120 Q-110,-110 -160,0Z" fill="#e8502a"/>
   <path d="M-190,0 L-120,-200 M190,0 L120,-200 M-150,-60 L150,-60 M-130,-130 L130,-130" stroke="#7a2a16" stroke-width="3" opacity=".5"/>
   <g transform="translate(0,-200)">${lat}</g>
   <rect x="-70" y="-300" width="140" height="44" fill="#f4f4f0" stroke="#999" stroke-width="2"/><rect x="-70" y="-292" width="140" height="10" fill="#7fb0d8"/>
   <rect x="-34" y="-560" width="68" height="30" fill="#f4f4f0" stroke="#999" stroke-width="2"/><rect x="-34" y="-552" width="68" height="8" fill="#7fb0d8"/>
   <path d="M-12,-760 L-6,-860 L6,-860 L12,-760Z" fill="#e8502a"/><path d="M-6,-760 L-3,-860 L3,-860 L6,-760" stroke="#f4f4f0" stroke-width="4"/><line x1="0" y1="-860" x2="0" y2="-900" stroke="#ccc" stroke-width="3"/></g>`;
}
function rSkytree(x, base, s = 1, o = .8) {
  return `<g opacity="${o}" filter="url(#rHaze)" transform="translate(${x},${base}) scale(${s})"><path d="M-52,0 L-9,-600 L9,-600 L52,0Z" fill="#dfe7ef" stroke="#9fb0c2" stroke-width="2"/>
  ${[...Array(20)].map((_, i) => `<line x1="${-50 + i * 2.1}" y1="${-i * 30}" x2="${50 - i * 2.1}" y2="${-i * 30 - 24}" stroke="#a9b8c8" stroke-width="2"/>`).join('')}
  <rect x="-38" y="-370" width="76" height="40" rx="12" fill="#cfd9e4" stroke="#8fa2b6" stroke-width="2"/><rect x="-24" y="-480" width="48" height="24" rx="9" fill="#cfd9e4" stroke="#8fa2b6" stroke-width="2"/><line x1="0" y1="-600" x2="0" y2="-690" stroke="#b9c6d4" stroke-width="6"/></g>`;
}
function rFuji(x, base, w, h, o = 1) {
  return `<g opacity="${o}"><path d="M${x - w / 2},${base} Q${x - w * .2},${base - h * .55} ${x - w * .07},${base - h} L${x + w * .07},${base - h} Q${x + w * .2},${base - h * .55} ${x + w / 2},${base}Z" fill="#6f86b0"/>
  <path d="M${x - w * .07},${base - h} L${x + w * .07},${base - h} L${x + w * .16},${base - h * .7} L${x + w * .1},${base - h * .74} L${x + w * .05},${base - h * .64} L${x},${base - h * .72} L${x - w * .06},${base - h * .62} L${x - w * .1},${base - h * .72} L${x - w * .17},${base - h * .68}Z" fill="#f4f7fb"/>
  <path d="M${x},${base - h} L${x + w / 2},${base} L${x + w * .1},${base}Z" fill="#000" opacity=".1"/></g>`;
}
function rSkyline(t, base, seed, night = false, n = 26) {
  const R = rng(seed); let s = '';
  for (let i = 0; i < n; i++) { const w = 60 + R() * 90, h = 120 + R() * 260, x = i * (W / n) - 20 + R() * 20; s += rBuilding(x, base, w, h, { col: ['#c9c3b8', '#b7c0c9', '#d6d0c4', '#a9b3bd', '#e0dad0'][i % 5], seed: seed + i, night, roof: true, floor: 26 }); }
  return s;
}

/* 0:00 intro — Tokio al fondo, con el título */
scenes.r_intro = function (t) {
  return D() + rSky('day') + rSun(1500, 180) + rClouds(t, [[200, 150, .8], [900, 110, .6], [1500, 250, .7]])
    + rFuji(1350, 760, 1100, 380, .8) + rSkytree(1700, 820, .9) + rSkyline(t, 820, 11) + rTokyoTower(520, 840, .78)
    + `<rect x="0" y="830" width="${W}" height="250" fill="url(#rWalk)"/>` + rCrowd(t, 5, 10, 900, 1060)
    + `<g transform="translate(${W / 2},${H / 2 - 120}) scale(${1 + S(t, 1) * .01})"><rect x="-560" y="-170" width="1120" height="340" rx="40" fill="#fff" opacity=".95" stroke="#2b3a67" stroke-width="6"/>
  <text x="0" y="-40" font-family="Fredoka" font-weight="700" font-size="110" text-anchor="middle" fill="#ffcc2e" stroke="#2b3a67" stroke-width="6" paint-order="stroke">Mi Pequeño Atlas</text>
  <rect x="-320" y="20" width="640" height="100" rx="22" fill="#e8352a"/><text x="0" y="92" font-family="Fredoka" font-weight="700" font-size="66" text-anchor="middle" fill="#fff">Capítulo 1: Tokio</text></g>`;
};

/* 0:27 robots y templos en la misma calle */
scenes.r_robotemplo = function (t) {
  let s = D() + rSky('day') + rSun(300, 140) + rClouds(t, [[400, 130, .7], [1400, 170, .6]]);
  // templo pequeño (izquierda)
  s += `<g transform="translate(470,640)"><rect x="-260" y="-10" width="520" height="20" fill="#9a958c"/><rect x="-200" y="-200" width="400" height="190" fill="#e9dcc0"/>
  ${[-180, -90, 0, 90, 180].map(x => `<rect x="${x - 12}" y="-200" width="24" height="190" fill="url(#pillarR)"/>`).join('')}
  <rect x="-60" y="-150" width="120" height="140" fill="#3a1d14"/>${jroof(0, -200, 420, 150, 60)}
  <rect x="-260" y="-40" width="34" height="34" fill="#8c8a84"/><rect x="-270" y="-70" width="54" height="30" fill="#7a7872"/><path d="M-280,-70 L-198,-70 L-215,-95 L-262,-95Z" fill="#6a6862"/>
  <rect x="226" y="-40" width="34" height="34" fill="#8c8a84"/><rect x="216" y="-70" width="54" height="30" fill="#7a7872"/><path d="M206,-70 L288,-70 L271,-95 L224,-95Z" fill="#6a6862"/></g>`;
  // edificio moderno con pantalla (derecha)
  s += `<rect x="1050" y="120" width="760" height="520" fill="url(#rGlass)"/>${[...Array(12)].map((_, i) => `<line x1="1050" y1="${150 + i * 40}" x2="1810" y2="${150 + i * 40}" stroke="#c9dbee" stroke-width="2" opacity=".5"/>`).join('')}
  <rect x="1110" y="170" width="640" height="300" fill="#05060f"/><rect x="1122" y="182" width="616" height="276" fill="hsl(${(t / L * 360) | 0},70%,55%)"/>
  <circle cx="1300" cy="320" r="90" fill="#fff" opacity=".9"/><text x="1560" y="310" font-family="Fredoka" font-weight="700" font-size="70" text-anchor="middle" fill="#fff">TOKYO</text><text x="1560" y="380" font-family="IPAGothic" font-size="50" text-anchor="middle" fill="#fff">ロボット</text>
  <rect x="1050" y="560" width="760" height="80" fill="#2d3340"/><rect x="1080" y="572" width="700" height="60" fill="#cfe6ff" opacity=".8"/>`;
  s += rRoadScene(t, 640, { move: 0 });
  // robot recepcionista (tipo Pepper) en la acera
  const wv = S(t, 4) * 18;
  s += `<g transform="translate(1250,700)">${rShadow(0, 0, 50)}<path d="M-36,0 Q-40,-80 -26,-120 L26,-120 Q40,-80 36,0Z" fill="#f2f4f6" stroke="#b9c0c8" stroke-width="3"/>
  <rect x="-26" y="-170" width="52" height="56" rx="10" fill="#f2f4f6" stroke="#b9c0c8" stroke-width="3"/><rect x="-18" y="-160" width="36" height="28" rx="4" fill="#3a6ea8"/>
  <ellipse cx="0" cy="-205" rx="32" ry="34" fill="#f2f4f6" stroke="#b9c0c8" stroke-width="3"/><circle cx="-11" cy="-208" r="7" fill="#2b2b2b"/><circle cx="11" cy="-208" r="7" fill="#2b2b2b"/><circle cx="-11" cy="-208" r="3" fill="#6fd0ff"/><circle cx="11" cy="-208" r="3" fill="#6fd0ff"/>
  <path d="M-26,-160 L-46,-110" stroke="#e1e5ea" stroke-width="12" stroke-linecap="round"/><g transform="rotate(${-60 + wv} 26 -160)"><path d="M26,-160 L50,-110" stroke="#e1e5ea" stroke-width="12" stroke-linecap="round"/></g></g>`;
  s += rCrowd(t, 77, 9, 655, 700) + rP(820, 1030, 1.9, t, { ph: 3, top: '#c8323a', kimono: '#c8323a', dir: 1 }) + rP(1500, 1040, 1.95, t, { ph: 6, top: '#2b3a67', dir: -1 });
  return s + rLabel('Templos y robots en la misma calle', W / 2, 90, 40);
};

/* 0:34 trenes súper rápidos — Shinkansen con el Fuji */
scenes.r_tren = function (t) {
  const x = ((t / L) * (W + 2200)) - 2000;
  let s = D() + rSky('day') + rClouds(t, [[300, 140, .8], [1300, 110, .7]]) + rFuji(1250, 620, 1300, 470);
  s += `<path d="M0,600 Q400,560 900,590 Q1400,560 1920,590 L1920,700 L0,700Z" fill="#7aa35e"/><rect x="0" y="690" width="${W}" height="390" fill="#93b96f"/>
  ${[...Array(10)].map((_, i) => `<path d="M0,${720 + i * 36} L${W},${720 + i * 36}" stroke="#7fa45d" stroke-width="3" opacity=".6"/>`).join('')}`;
  // viaducto
  s += `<rect x="0" y="760" width="${W}" height="40" fill="#c4c2bc"/><rect x="0" y="740" width="${W}" height="22" fill="#d9d7d1"/>${[...Array(9)].map((_, i) => `<rect x="${i * 240 + 60}" y="800" width="50" height="200" fill="#b5b3ad"/>${rShadow(i * 240 + 85, 1000, 50)}`).join('')}`;
  // N700
  s += `<g transform="translate(${x},742)">${rShadow(900, 20, 900, .15)}
  <path d="M0,-6 Q60,-10 140,-66 Q200,-100 300,-104 L1900,-104 L1900,-6Z" fill="#f7f8fa" stroke="#9aa3ad" stroke-width="2"/>
  <path d="M30,-24 L1900,-24 L1900,-14 L22,-14Z" fill="#1d4fb8"/><path d="M60,-34 L1900,-34 L1900,-30 L54,-30Z" fill="#1d4fb8"/>
  <path d="M150,-72 Q190,-92 250,-92 L280,-92 L280,-70 L150,-70Z" fill="#1f2a3a"/>
  ${[...Array(26)].map((_, i) => `<rect x="${340 + i * 60}" y="-86" width="38" height="22" rx="6" fill="#2a3442"/>`).join('')}
  ${[...Array(4)].map((_, i) => `<line x1="${700 + i * 400}" y1="-104" x2="${700 + i * 400}" y2="-6" stroke="#c9ced5" stroke-width="2"/>`).join('')}</g>
  <g opacity=".5">${[0, 1, 2, 3].map(i => `<line x1="${x - 80 - i * 50}" y1="${660 + i * 18}" x2="${x - 420 - i * 80}" y2="${660 + i * 18}" stroke="#fff" stroke-width="6" stroke-linecap="round"/>`).join('')}</g>`;
  return s + rLabel('Shinkansen · tren bala', W / 2, 90, 40);
};

/* 0:37 comida deliciosa — callejón de comida (Omoide Yokocho) */
scenes.r_yokocho = function (t) {
  let s = D() + rSky('night') + rStars(t, 30) + rBuilding(0, 700, W, 600, { col: '#3a2e2a', night: true, seed: 33, roof: false, floor: 40 });
  s += `<rect x="160" y="240" width="1600" height="60" fill="#c8321f"/>${[...Array(10)].map((_, k) => `<path d="M${160 + k * 160},300 h160 v130 q-80,22 -160,0Z" fill="${k % 2 ? '#1f2a44' : '#c8321f'}"/>`).join('')}
  <text x="960" y="282" font-family="IPAGothic" font-size="46" text-anchor="middle" fill="#fff">やきとり · 焼き鳥</text>
  ${[0, 1, 2, 3, 4, 5].map(i => lantern(250 + i * 285, 200, .4, t + i, '')).join('')}
  <rect x="160" y="300" width="1600" height="420" fill="#ffd38a" opacity=".9"/><rect x="160" y="300" width="1600" height="420" fill="#5a3a2a" opacity=".35"/>`;
  // cocinero asando brochetas
  s += rP(960, 640, 2.0, t, { ph: 2, top: '#f4f4f4', bot: '#2b2f3a', walk: false, cap: '#1f2a44' });
  s += `<rect x="520" y="560" width="880" height="70" fill="#2a2a2a"/>${[...Array(46)].map((_, i) => `<circle cx="${540 + (i * 37) % 840}" cy="${590 + (i * 13) % 26}" r="8" fill="${S(t, 4, i) > 0 ? '#ff7a2a' : '#c8321f'}"/>`).join('')}
  ${[...Array(12)].map((_, i) => `<g transform="translate(${570 + i * 70},560) rotate(-90)"><line x1="0" y1="0" x2="120" y2="0" stroke="#e2c08a" stroke-width="5"/>${[0, 1, 2].map(k => `<ellipse cx="${30 + k * 30}" cy="0" rx="14" ry="11" fill="${i % 3 == 2 ? '#5a8a3a' : '#9a5228'}"/>`).join('')}</g>`).join('')}`;
  for (let i = 0; i < 5; i++) { const o = ((t / L * 2 + i / 5) % 1); s += `<path d="M${600 + i * 170},${520 - o * 220} q-30,-40 0,-80 q30,-40 0,-80" stroke="#fff" stroke-width="20" fill="none" stroke-linecap="round" opacity="${.35 * (1 - o)}"/>`; }
  // barra con clientes y platos
  s += `<rect x="0" y="720" width="${W}" height="360" fill="#2a2420"/><rect x="100" y="700" width="1720" height="70" fill="url(#rCounter)"/><rect x="100" y="770" width="1720" height="20" fill="#7a5232"/>
  ${[0, 1, 2].map(i => `<g transform="translate(${420 + i * 540},${712})"><ellipse rx="110" ry="18" fill="#f4f4f0"/>${[0, 1, 2].map(k => `<g transform="translate(${-60 + k * 50},-6) rotate(-8)"><line x1="-50" y1="0" x2="50" y2="0" stroke="#e2c08a" stroke-width="4"/>${[0, 1, 2].map(j => `<ellipse cx="${-20 + j * 22}" cy="0" rx="11" ry="9" fill="#9a5228"/>`).join('')}</g>`).join('')}</g>`).join('')}`;
  for (let i = 0; i < 4; i++) s += `<g transform="translate(${300 + i * 440},1060)"><rect x="-40" y="-130" width="80" height="16" rx="8" fill="#7a5232"/><rect x="-6" y="-114" width="12" height="114" fill="#555"/></g>` + rP(300 + i * 440, 950, 1.9, t, { ph: 10 + i, top: ['#2b3a67', '#c94f6d', '#7a8f6a', '#e8e8e8'][i], walk: false, longhair: i % 2 == 1 });
  return s + rLabel('Comida deliciosa: yakitori', W / 2, 110, 40);
};

/* 0:38 luces que parecen de otro planeta — Shinjuku de noche */
scenes.r_neon = function (t) {
  let s = D() + rSky('night') + rStars(t, 30);
  const cols = ['#ff3d8b', '#3fe0ff', '#ffe14f', '#7dff8a', '#b388ff'];
  for (let i = 0; i < 8; i++) {
    const x = i * 245 - 20;
    s += rBuilding(x, 820, 230, 480 + (i % 3) * 120, { col: '#2a2b44', night: true, seed: 500 + i, floor: 30 });
    s += rVSign(x + 180, 820 - 430 - (i % 3) * 100, ['カラオケ', 'ゲーム', 'ラーメン', '居酒屋', 'ホテル', 'ショップ', 'カフェ', '映画'][i], cols[i % 5], true);
    s += `<rect x="${x + 20}" y="${820 - 170}" width="160" height="50" fill="#14142c" stroke="${cols[(i + 2) % 5]}" stroke-width="4" filter="url(#rGlow)" opacity="${.75 + .25 * Math.max(0, S(t, 4, i))}"/>`;
  }
  s += `<rect x="0" y="820" width="${W}" height="260" fill="#1d1d2c"/>${[...Array(8)].map((_, i) => `<rect x="${i * 245 + 60}" y="840" width="90" height="220" fill="${cols[i % 5]}" opacity=".12" filter="url(#rBlurBig)"/>`).join('')}`;
  return s + rCrowd(t, 64, 20, 860, 1050, { umbrellas: true }) + rLabel('Luces de Shinjuku', W / 2, 90, 40);
};

/* Torre de Tokio (plano general) */
scenes.r_torre = function (t) {
  return D() + rSky('day') + rSun(1600, 160) + rClouds(t, [[300, 140, .8], [1100, 100, .6]]) + rSkyline(t, 880, 21, false, 22)
    + rTree(240, 920, .8, 'green', t, 3) + rTree(1700, 920, .9, 'green', t, 4) + rTokyoTower(960, 900, 1.0)
    + `<rect x="0" y="890" width="${W}" height="190" fill="url(#rWalk)"/>` + rCrowd(t, 9, 10, 920, 1060);
};

/* 1:20 ciudad enorme vista desde arriba — 37 millones */
scenes.r_aerea = function (t) {
  let s = D() + rSky('day') + rClouds(t, [[300, 100, .7], [1200, 80, .6]]) + rFuji(1500, 430, 700, 220, .7);
  s += `<rect x="0" y="420" width="${W}" height="${H - 420}" fill="#8f9aa5"/>`;
  const R = rng(99);
  for (let row = 0; row < 14; row++) {
    const y = 430 + row * row * 3.6 + row * 12, sc = .25 + row * .085;
    for (let i = -2; i < 26 / sc; i++) {
      const w = (40 + R() * 50) * sc * 2, h = (40 + R() * 160) * sc * 1.6, x = i * 90 * sc * 1.4 + (row % 2) * 30;
      if (x > W + 50) break;
      s += `<rect x="${x}" y="${y - h}" width="${w}" height="${h}" fill="${['#d8d4cc', '#bcc4cc', '#e4e0d8', '#a9b2bb', '#cfc8bb'][(i + row) % 5]}"/><rect x="${x + w * .75}" y="${y - h}" width="${w * .25}" height="${h}" fill="#000" opacity=".12"/>
      <rect x="${x}" y="${y - h}" width="${w}" height="${Math.max(2, 4 * sc)}" fill="#fff" opacity=".35"/>`;
    }
    if (row == 5) s += rTokyoTower(600, y, .35) + rSkytree(1450, y, .5, .9);
  }
  return s + `<g transform="translate(${W / 2},140)"><rect x="-420" y="-70" width="840" height="130" rx="30" fill="#fff" opacity=".95" stroke="#2b3a67" stroke-width="5"/><text x="0" y="22" font-family="Fredoka" font-weight="700" font-size="76" text-anchor="middle" fill="#2b3a67">37.000.000 personas</text></g>`;
};

/* 1:42 limpia, organizada y silenciosa — calle residencial */
scenes.r_calle = function (t) {
  let s = D() + rSky('day') + rSun(1650, 130) + rClouds(t, [[500, 120, .7]]);
  const houses = [['#efe9de', '#5b6470'], ['#e2d7c3', '#3f4d5c'], ['#f3efe6', '#6b4f3a'], ['#dcd6cc', '#2f3a48']];
  for (let i = 0; i < 4; i++) {
    const x = 40 + i * 470, [wall, roof] = houses[i];
    s += `<rect x="${x}" y="360" width="400" height="300" fill="${wall}"/><path d="M${x - 20},370 L${x + 200},250 L${x + 420},370Z" fill="${roof}"/>
    <rect x="${x + 40}" y="420" width="120" height="90" fill="#9fb8cf"/><line x1="${x + 100}" y1="420" x2="${x + 100}" y2="510" stroke="#fff" stroke-width="4"/>
    <rect x="${x + 240}" y="520" width="100" height="140" fill="#7a5232"/><rect x="${x}" y="600" width="400" height="60" fill="#b9b3a8"/>
    ${[0, 1, 2].map(k => `<g transform="translate(${x + 30 + k * 50},600)"><rect x="-14" y="-24" width="28" height="24" fill="#a0603a"/><circle cx="0" cy="-36" r="18" fill="#5d8f4a"/>${k == 1 ? `<circle cx="0" cy="-44" r="6" fill="#ff7a8a"/>` : ''}</g>`).join('')}`;
  }
  s += rRoadScene(t, 660, { lines: false });
  s += rPole(330, 700) + rPole(1290, 700) + rWires(330, 1290, 700);
  // máquina expendedora + papeleras de reciclaje ordenadas + bicis
  s += `<g transform="translate(980,720)">${rShadow(60, 0, 80)}<rect x="0" y="-220" width="120" height="220" fill="#d33a2c"/><rect x="10" y="-205" width="100" height="110" fill="#f4f4f4"/>${[0, 1, 2].map(r => [0, 1, 2, 3].map(c => `<rect x="${16 + c * 23}" y="${-198 + r * 36}" width="16" height="28" rx="4" fill="${['#2b6fd6', '#f2c14e', '#7ed957', '#e8352a'][(r + c) % 4]}"/>`).join('')).join('')}<rect x="20" y="-70" width="80" height="30" fill="#222"/></g>
  ${[['#2f7fd6', 'Latas'], ['#3a9a4a', 'Botellas'], ['#e9a23b', 'Papel']].map(([c, l], i) => `<g transform="translate(${1140 + i * 80},720)">${rShadow(30, 0, 34)}<rect x="0" y="-80" width="60" height="80" rx="6" fill="${c}"/><rect x="10" y="-70" width="40" height="10" rx="5" fill="#222"/></g>`).join('')}
  ${[0, 1, 2].map(i => `<g transform="translate(${430 + i * 120},728)" stroke="#2a2a2a" stroke-width="4" fill="none"><circle cx="-36" cy="-24" r="24"/><circle cx="36" cy="-24" r="24"/><path d="M-36,-24 L-8,-60 L28,-60 L36,-24 M-8,-60 L-14,-74 M28,-60 L30,-78 L42,-78"/></g>`).join('')}`;
  s += rP(260, 1030, 1.9, t, { ph: 2, top: '#6f7f8f', bot: '#2b2f3a', walk: false, hold: `<line x1="10" y1="-80" x2="40" y2="0" stroke="#8a6a3a" stroke-width="4"/>` })
    + rP(((t / L) * (W + 300)) - 150, 1045, 1.95, t, { ph: 5, top: '#e8e8e8', bot: '#30364a' });
  return s + rLabel('Limpia · ordenada · silenciosa', W / 2, 90, 40);
};

/* 2:03 tradición + tecnología — kimonos junto a videojuegos y pantallas */
scenes.r_tradtec = function (t) {
  let s = D() + rSky('day') + rClouds(t, [[400, 120, .7], [1500, 150, .6]]);
  s += rBuilding(0, 660, 420, 520, { col: '#e7e1d6', seed: 3, shop: '#c8321f', shopTxt: '着物レンタル' });
  s += rBuilding(440, 660, 480, 600, { col: '#bfc9d4', seed: 4, billboard: { h: 200, col: '#2b3a67', svg: `<rect x="470" y="90" width="420" height="180" fill="hsl(${(t / L * 360) | 0},70%,55%)"/><text x="680" y="200" font-family="Fredoka" font-weight="700" font-size="60" text-anchor="middle" fill="#fff">GAME</text>` } });
  s += rBuilding(940, 660, 460, 560, { col: '#d8d2c6', seed: 5, shop: '#2b3a67', shopTxt: 'ゲーム', vsign: 'アニメ', vcol: '#e8352a' });
  s += rBuilding(1420, 660, 500, 620, { col: '#c9c3b8', seed: 6, shop: '#3a7a5a', shopTxt: '和菓子' });
  s += rRoadScene(t, 660, { lines: false });
  const console_ = `<rect x="-2" y="-110" width="20" height="12" rx="3" fill="#222"/><rect x="0" y="-108" width="10" height="8" fill="#6fd0ff"/>`;
  s += rP(480, 1030, 2.0, t, { ph: 1, kimono: '#c8323a', obi: '#f2c14e', bun: true, dir: 1 }) + rP(660, 1040, 2.05, t, { ph: 4, kimono: '#6a4fa0', obi: '#e8e8e8', bun: true, dir: 1 })
    + rP(1200, 1040, 1.7, t, { ph: 2, child: true, top: '#4fb3f6', walk: false, hold: console_ }) + rP(1360, 1035, 2.0, t, { ph: 7, top: '#333', walk: false, hold: `<rect x="-2" y="-112" width="12" height="20" rx="3" fill="#111"/>` })
    + rCrowd(t, 15, 8, 690, 740, { kimono: true });
  return s + rLabel('Tradición y tecnología', W / 2, 90, 40);
};

/* 2:20 qué es un kimono — partes */
function kimonoOnStand(x, base, s, col, pattern, obi, t) {
  let pat = '';
  const R = rng(col.length * 13 + x | 0);
  for (let i = 0; i < 22; i++) {
    const px = -200 + R() * 400, py = -520 + R() * 480;
    pat += pattern == 'sakura' ? blossom(px, py, 12) : pattern == 'olas' ? `<path d="M${px - 20},${py} q10,-14 20,0 t20,0" stroke="#fff" stroke-width="4" fill="none" opacity=".8"/>`
      : pattern == 'momiji' ? `<path transform="translate(${px},${py}) scale(.9)" d="M0,-16 L4,-5 L15,-8 L7,1 L13,11 L2,7 L0,17 L-2,7 L-13,11 L-7,1 L-15,-8 L-4,-5Z" fill="${['#ff8a3c', '#e8452c', '#f2c14e'][i % 3]}"/>`
        : pattern == 'nieve' ? `<circle cx="${px}" cy="${py}" r="${4 + R() * 5}" fill="#fff" opacity=".9"/>` : `<path transform="translate(${px},${py})" d="M-10,0 Q0,-12 10,0 Q0,12 -10,0Z" fill="#fff" opacity=".6"/>`;
  }
  return `<g transform="translate(${x},${base}) scale(${s})">${rShadow(0, 0, 160)}
  <rect x="-330" y="-560" width="660" height="18" rx="6" fill="url(#rWood)"/><rect x="-10" y="-560" width="20" height="560" fill="url(#rWood)"/><rect x="-140" y="-14" width="280" height="14" fill="url(#rWood)"/>
  <clipPath id="kc${x | 0}"><path d="M-320,-545 L320,-545 L320,-330 L200,-330 L200,-20 L-200,-20 L-200,-330 L-320,-330Z"/></clipPath>
  <g clip-path="url(#kc${x | 0})"><rect x="-330" y="-560" width="660" height="560" fill="${col}"/>${pat}<rect x="160" y="-560" width="170" height="560" fill="#000" opacity=".08"/></g>
  <path d="M-320,-545 L320,-545 L320,-330 L200,-330 L200,-20 L-200,-20 L-200,-330 L-320,-330Z" fill="none" stroke="#00000055" stroke-width="3"/>
  <path d="M-60,-545 L40,-250 M60,-545 L-20,-300" stroke="#f4f0e6" stroke-width="16"/><path d="M40,-250 L20,-20" stroke="#00000033" stroke-width="3"/>
  <rect x="-202" y="-300" width="404" height="70" fill="${obi}"/><rect x="-202" y="-272" width="404" height="10" fill="#00000022"/></g>`;
}
scenes.r_kimono = function (t) {
  let s = D() + `<rect width="${W}" height="${H}" fill="#efe6d2"/>`;
  for (let i = 0; i < 8; i++) s += `<rect x="${i * 250}" y="80" width="230" height="560" fill="#f8f3e6" stroke="#8a6a46" stroke-width="10"/>${[1, 2, 3].map(k => `<line x1="${i * 250}" y1="${80 + k * 140}" x2="${i * 250 + 230}" y2="${80 + k * 140}" stroke="#8a6a46" stroke-width="4"/>`).join('')}<line x1="${i * 250 + 115}" y1="80" x2="${i * 250 + 115}" y2="640" stroke="#8a6a46" stroke-width="4"/>`;
  s += `<rect x="0" y="0" width="${W}" height="80" fill="#7a5a3a"/><rect x="0" y="640" width="${W}" height="440" fill="url(#rTatami)"/>${[0, 1, 2].map(i => `<line x1="0" y1="${700 + i * i * 60}" x2="${W}" y2="${700 + i * i * 60}" stroke="#4a4a2a" stroke-width="6"/>`).join('')}`;
  s += kimonoOnStand(960, 960, 1.0, '#c8323a', 'sakura', '#e8c04a', t);
  s += rArrowLabel('Mangas grandes', 330, 330, 690, 520) + rArrowLabel('Se cruza al frente', 1560, 300, 985, 560) + rArrowLabel('Obi (faja)', 1560, 640, 1150, 700) + rArrowLabel('Flores y paisajes', 330, 760, 820, 820);
  return s + rLabel('El kimono 着物', W / 2, 60, 40, '#c8323a');
};

/* 2:51 ocasiones especiales — boda en un santuario */
scenes.r_boda = function (t) {
  let s = D() + rSky('day') + rClouds(t, [[400, 120, .7]]);
  s += `<rect x="0" y="380" width="${W}" height="300" fill="#4a6b3a"/>${[...Array(12)].map((_, i) => rTree(i * 170 + 40, 560, .6, 'green', t, 40 + i)).join('')}
  <g transform="translate(960,700)"><rect x="-480" y="-20" width="960" height="30" fill="#bdb6a6"/><rect x="-420" y="-260" width="840" height="240" fill="#efe6d0"/>
  ${[-400, -240, -80, 80, 240, 400].map(x => `<rect x="${x - 12}" y="-260" width="24" height="240" fill="#8a5a36"/>`).join('')}
  <path d="M-520,-250 Q-300,-300 0,-420 Q300,-300 520,-250 L470,-232 Q240,-290 0,-390 Q-240,-290 -470,-232Z" fill="#5f9a86"/><path d="M-500,-248 Q0,-280 500,-248" stroke="#3f7a66" stroke-width="10" fill="none"/></g>
  <rect x="0" y="700" width="${W}" height="380" fill="#d8cfbd"/>${[...Array(10)].map((_, i) => `<line x1="${960 + (i - 5) * 80}" y1="700" x2="${960 + (i - 5) * 400}" y2="${H}" stroke="#bdb3a0" stroke-width="2"/>`).join('')}`;
  // torii
  s += `<g transform="translate(260,1060)"><rect x="-150" y="-560" width="34" height="560" fill="#c8321f"/><rect x="116" y="-560" width="34" height="560" fill="#c8321f"/><rect x="-200" y="-600" width="400" height="34" fill="#c8321f"/><path d="M-230,-630 Q0,-660 230,-630 L220,-596 L-220,-596Z" fill="#1d1d1d"/><rect x="-180" y="-520" width="360" height="24" fill="#c8321f"/></g>`;
  // cortejo: sacerdote, novia de blanco con sombrilla roja, novio de negro
  const px = 900 + S(t, 1) * 6;
  s += rP(px - 300, 990, 2.1, t, { ph: 1, kimono: '#f4f2ea', obi: '#8a6a3a', walk: true }) + rP(px, 1000, 2.2, t, { ph: 2, kimono: '#fbfbf7', obi: '#fbfbf7', bun: true, walk: true })
    + `<g transform="translate(${px - 50},${1000 - 370})"><line x1="0" y1="0" x2="0" y2="200" stroke="#5a3a2a" stroke-width="4"/><path d="M-170,10 Q0,-100 170,10Z" fill="#c8321f"/></g>`
    + rP(px + 230, 1005, 2.25, t, { ph: 3, kimono: '#1d1d22', obi: '#5a5a62', walk: true }) + rP(px - 140, 1030, 1.9, t, { ph: 4, kimono: '#e8e4dc', obi: '#c8321f', walk: true });
  return s + rLabel('Bodas, fiestas y ceremonias', W / 2, 90, 40);
};

/* 3:03 los colores cambian según la estación o la edad */
scenes.r_kimonos4 = function (t) {
  let s = D() + `<rect width="${W}" height="${H}" fill="#f2e9d8"/><rect x="0" y="0" width="${W}" height="70" fill="#7a5a3a"/><rect x="0" y="760" width="${W}" height="320" fill="url(#rWood)"/>`;
  const k = [['#f2a9c0', 'sakura', '#ffffff', 'Primavera'], ['#7fc4e8', 'olas', '#2b6fd6', 'Verano'], ['#d9692c', 'momiji', '#5a3a2a', 'Otoño'], ['#2b3a67', 'nieve', '#c8321f', 'Invierno']];
  k.forEach(([c, p, o, l], i) => { s += kimonoOnStand(250 + i * 473, 860, .62, c, p, o, t) + rLabel(l, 250 + i * 473, 960, 40); });
  return s + rLabel('Cambian según la estación, la edad y el evento', W / 2, 130, 38);
};

/* 4:22 tiendas pequeñas, dulces tradicionales y recuerdos — Nakamise */
scenes.r_nakamise = function (t) {
  let s = D() + rSky('day') + rClouds(t, [[400, 100, .6]]);
  // Hozomon al fondo
  s += `<g transform="translate(960,560) scale(.5)"><rect x="-300" y="-300" width="600" height="300" fill="url(#vermG)"/>${jroof(0, -300, 640, 180, 70)}${jroof(0, -480, 520, 140, 60)}<rect x="-80" y="-220" width="160" height="220" fill="#3a1a10"/></g>`;
  s += `<path d="M700,560 L1220,560 L1920,1080 L0,1080Z" fill="url(#rWalk)"/>`;
  const goods = [['人形焼', 'Dulces', '#c78a4a'], ['せんべい', 'Galletas de arroz', '#a8642c'], ['おみやげ', 'Recuerdos', '#e8352a'], ['扇子', 'Abanicos', '#4f7fe0'], ['団子', 'Dulces', '#f2a9c0']];
  for (let side of [-1, 1]) for (let i = 4; i >= 0; i--) {
    const d = i / 5, w = 330 * (1 - d * .75), h = 330 * (1 - d * .7), base = 1080 - d * 520;
    const x0 = side < 0 ? 0 + d * 700 : W - d * 700 - w; const g = goods[(i + (side > 0 ? 2 : 0)) % 5];
    s += `<rect x="${x0}" y="${base - h}" width="${w}" height="${h}" fill="#f1e2c4"/><path d="M${x0 - 6},${base - h} L${x0 + w + 6},${base - h} L${x0 + w},${base - h - h * .14} L${x0},${base - h - h * .14}Z" fill="#7a2a1c"/>
    <rect x="${x0 + w * .05}" y="${base - h * .92}" width="${w * .9}" height="${h * .16}" fill="#c8321f"/><text x="${x0 + w / 2}" y="${base - h * .8}" font-family="IPAGothic" font-size="${34 * (1 - d * .7)}" text-anchor="middle" fill="#fff">${g[0]}</text>
    <rect x="${x0 + w * .08}" y="${base - h * .55}" width="${w * .84}" height="${h * .5}" fill="#fff6dd"/>
    ${[0, 1, 2, 3].map(k => `<rect x="${x0 + w * (.12 + k * .2)}" y="${base - h * .3}" width="${w * .15}" height="${h * .22}" rx="${w * .02}" fill="${g[2]}"/><circle cx="${x0 + w * (.195 + k * .2)}" cy="${base - h * .4}" r="${w * .05}" fill="${['#f2c14e', '#e8352a', '#7ed957', '#f4f4f4'][k]}"/>`).join('')}
    ${i == 0 ? rLabel(g[1], x0 + w / 2, base - h - 70, 32) : ''}`;
    s += lantern(x0 + w / 2, base - h - h * .05, .32 * (1 - d * .7), t + i, '');
  }
  return s + rCrowd(t, 45, 16, 640, 1060, { kimono: true, scale: y => .35 + (y - 640) / 420 * .95 }) + rLabel('Calle Nakamise · Asakusa', W / 2, 80, 40);
};
