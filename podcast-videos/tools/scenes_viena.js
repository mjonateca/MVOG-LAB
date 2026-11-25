/* =====================================================================
   Mi Pequeño Atlas — Capítulo 10: Viena. Escenas realistas.
   Mismas reglas de Vivi: dos ojos, perspectiva coherente, contraste con el fondo,
   rótulos bajo el encabezado, bocadillos sin tapar caras, gente sentada de verdad.
   ===================================================================== */
const VI = `<defs>
<linearGradient id="viGold" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b8892a"/><stop offset=".5" stop-color="#f2d27a"/><stop offset="1" stop-color="#a87a22"/></linearGradient>
<linearGradient id="viCopper" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#4a9a84"/><stop offset=".5" stop-color="#7ac8b0"/><stop offset="1" stop-color="#3a8a74"/></linearGradient>
<linearGradient id="viDanube" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5aa0d0"/><stop offset="1" stop-color="#2f6aa0"/></linearGradient>
<linearGradient id="viGrass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8cbf6a"/><stop offset="1" stop-color="#5f9a48"/></linearGradient>
<linearGradient id="viMarble" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4f0e8"/><stop offset="1" stop-color="#d9d2c4"/></linearGradient>
</defs>`;
const VIALL = () => D() + VI;
const VIESC = (o = {}) => Object.assign({ walk: false }, o);
const AT_RED = '#c8102e';

/* ---------- piezas ---------- */
function atFlag(x, y, s = 1) { return `<g transform="translate(${x},${y}) scale(${s})"><line x1="0" y1="0" x2="0" y2="130" stroke="#555" stroke-width="4"/><rect x="0" y="0" width="96" height="22" fill="${AT_RED}"/><rect x="0" y="22" width="96" height="22" fill="#fff"/><rect x="0" y="44" width="96" height="22" fill="${AT_RED}"/></g>`; }
// edificio barroco vienés: fachada clara, ventanas con frontón, cornisas y a veces cúpula verde
function baroque(x, base, w, h, o = {}) {
  const col = o.col || ['#f2e6c8', '#efe0b8', '#f4ead4', '#e8d4a8', '#f0e2c0'][Math.abs(Math.round(x / 41)) % 5];
  let s = `<rect x="${x}" y="${base - h}" width="${w}" height="${h}" fill="${col}"/><rect x="${x + w - 14}" y="${base - h}" width="14" height="${h}" fill="#000" opacity=".07"/><rect x="${x - 6}" y="${base - h - 16}" width="${w + 12}" height="20" fill="#d9c69c"/><rect x="${x}" y="${base - 110}" width="${w}" height="110" fill="#d9c8a0"/>`;
  const cols = Math.max(2, Math.floor(w / 80)), rows = Math.floor((h - 150) / 100);
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const ww = (w - 40) / cols - 26, wx = x + 20 + c * (w - 40) / cols + 13, wy = base - h + 40 + r * 100;
    s += `<path d="M${wx - 8},${wy - 6} L${wx + ww / 2},${wy - 26} L${wx + ww + 8},${wy - 6}Z" fill="#e0d0a8"/><rect x="${wx}" y="${wy}" width="${ww}" height="62" fill="#3a4250"/><rect x="${wx - 4}" y="${wy + 62}" width="${ww + 8}" height="6" fill="#e0d0a8"/><line x1="${wx + ww / 2}" y1="${wy}" x2="${wx + ww / 2}" y2="${wy + 62}" stroke="#e8dcc0" stroke-width="2"/>`; }
  for (let c = 0; c < cols; c++) s += `<path d="M${x + 20 + c * (w - 40) / cols + 10},${base} L${x + 20 + c * (w - 40) / cols + 10},${base - 80} Q${x + 20 + (c + .5) * (w - 40) / cols},${base - 108} ${x + 20 + (c + 1) * (w - 40) / cols - 10},${base - 80} L${x + 20 + (c + 1) * (w - 40) / cols - 10},${base}Z" fill="#4a4238"/>`;
  if (o.dome) s += `<path d="M${x + w / 2 - 70},${base - h - 16} Q${x + w / 2 - 70},${base - h - 140} ${x + w / 2},${base - h - 150} Q${x + w / 2 + 70},${base - h - 140} ${x + w / 2 + 70},${base - h - 16}Z" fill="url(#viCopper)"/><rect x="${x + w / 2 - 6}" y="${base - h - 190}" width="12" height="44" fill="url(#viGold)"/><circle cx="${x + w / 2}" cy="${base - h - 196}" r="10" fill="url(#viGold)"/>`;
  return s;
}
function viStreet(t, base, opts = {}) { let s = '', x = -20, k = opts.seed || 0; const ws = [360, 300, 420, 340, 380]; while (x < W + 20) { const w = ws[k % ws.length]; s += baroque(x, base, w, (opts.h || 460) + (k * 53) % 120, { dome: k % 3 == 1 }); x += w; k++; } return s + `<rect x="0" y="${base}" width="${W}" height="${H - base}" fill="#b9b2a4"/>${[...Array(14)].map((_, i) => `<line x1="${i * 150}" y1="${base}" x2="${i * 150 - 100}" y2="${H}" stroke="#a49c8e" stroke-width="3"/>`).join('')}`; }
function viPeople(t, seed, n, y0, y1) { const base = y0 - 40, yb = Math.min(y1, base + (1010 - base) * .5); return rCrowd(t, seed, n, y0, yb, { tops: [AT_RED, '#2b3a67', '#f2c14e', '#3a6a3a', '#e8e2d4', '#333', '#7a5a8a', '#4fb3f6'], scale: y => 0.35 + (y - base) / (1010 - base) * 1.9 }); }
function stephansdom(cx, base, s = 1) {
  let o = `<g transform="translate(${cx},${base}) scale(${s})"><rect x="-300" y="-300" width="600" height="300" fill="#b8ac94"/>${[...Array(6)].map((_, i) => `<path d="M${-260 + i * 100},0 L${-260 + i * 100},-200 Q${-230 + i * 100},-250 ${-200 + i * 100},-200 L${-200 + i * 100},0Z" fill="#6a6052"/>`).join('')}`;
  // tejado de azulejos de colores en zigzag
  o += `<path d="M-320,-300 L0,-520 L320,-300Z" fill="#e8c84a"/>`;
  for (let r = 0; r < 6; r++) for (let i = -8; i <= 8; i++) { const y = -320 - r * 34, x = i * 36 + (r % 2) * 18; if (Math.abs(x) > 300 - r * 46) continue; o += `<path d="M${x},${y} l18,-17 l18,17 l-18,17Z" fill="${['#2f6a3a', '#1a1a1a', '#e8e2d4', '#c8102e'][(i + r + 8) % 4]}"/>`; }
  // torre gótica con aguja
  o += `<path d="M260,0 L260,-520 L310,-760 L330,-1000 L350,-760 L400,-520 L400,0Z" fill="#a89a80"/><path d="M330,-1000 L330,-1040" stroke="#6a5a40" stroke-width="6"/>${[...Array(10)].map((_, k) => `<path d="M${270 + k * 2},${-60 - k * 90} l${60 - k * 4},0" stroke="#8a7c62" stroke-width="4"/>`).join('')}${[...Array(4)].map((_, k) => `<path d="M290,${-200 - k * 120} l0,-60 q40,-30 80,0 l0,60" fill="#6a6052"/>`).join('')}`;
  return o + `</g>`;
}
function schonbrunn(cx, base, s = 1) {
  let o = `<g transform="translate(${cx},${base}) scale(${s})"><rect x="-900" y="-300" width="1800" height="300" fill="#f2c64a"/><rect x="-900" y="-320" width="1800" height="24" fill="#e8b830"/>`;
  for (let i = 0; i < 26; i++) { const x = -870 + i * 68; o += `<rect x="${x}" y="-260" width="34" height="70" fill="#f4f0e6"/><rect x="${x + 4}" y="-256" width="26" height="62" fill="#3a5a4a"/><rect x="${x}" y="-150" width="34" height="80" fill="#f4f0e6"/><rect x="${x + 4}" y="-146" width="26" height="72" fill="#3a5a4a"/>`; if (i % 3 == 0) o += `<rect x="${x - 10}" y="-300" width="8" height="300" fill="#f4e8c0"/>`; }
  o += `<rect x="-260" y="-380" width="520" height="380" fill="#f2c64a"/><path d="M-280,-380 L0,-460 L280,-380Z" fill="#e8b830" stroke="#f4f0e6" stroke-width="6"/>${[...Array(6)].map((_, i) => `<rect x="${-220 + i * 88}" y="-360" width="20" height="360" fill="#f4f0e6"/>`).join('')}<rect x="-80" y="-110" width="160" height="110" fill="#3a5a4a"/>`;
  o += `<path d="M-200,0 L-120,-60 L120,-60 L200,0Z" fill="#e8e2d4"/><path d="M-120,-60 L-200,-120 M120,-60 L200,-120" stroke="#e8e2d4" stroke-width="14"/>`;
  return o + `</g>`;
}
function gloriette(cx, base, s = 1) {
  return `<g transform="translate(${cx},${base}) scale(${s})"><rect x="-300" y="-140" width="600" height="140" fill="#f4f0e6"/>${[...Array(11)].map((_, i) => `<path d="M${-280 + i * 52},0 L${-280 + i * 52},-90 Q${-256 + i * 52},-120 ${-232 + i * 52},-90 L${-232 + i * 52},0Z" fill="#8ab0c8"/>`).join('')}<rect x="-320" y="-160" width="640" height="26" fill="#e8e2d4"/><rect x="-80" y="-240" width="160" height="80" fill="#f4f0e6"/><path d="M-30,-240 Q0,-300 30,-240Z" fill="#555"/><path d="M-50,-300 L-20,-270 L0,-300 L20,-270 L50,-300" stroke="#555" stroke-width="8" fill="none"/></g>`;
}
function riesenrad(cx, cy, r, t) {
  const a = t / L * 30;
  let s = `<g transform="translate(${cx},${cy})"><path d="M-80,${r + 120} L0,0 L80,${r + 120}" stroke="#7a2a2a" stroke-width="16" fill="none"/><path d="M-120,${r + 120} L0,30 L120,${r + 120}" stroke="#8a3a3a" stroke-width="10" fill="none"/><g transform="rotate(${a})"><circle r="${r}" fill="none" stroke="#8a3a3a" stroke-width="10"/><circle r="${r * .93}" fill="none" stroke="#8a3a3a" stroke-width="5"/>${[...Array(30)].map((_, k) => `<line x1="0" y1="0" x2="${Math.cos(k * TAU / 30) * r}" y2="${Math.sin(k * TAU / 30) * r}" stroke="#8a3a3a" stroke-width="3"/>`).join('')}</g><circle r="22" fill="#7a2a2a"/>`;
  for (let k = 0; k < 15; k++) { const an = (k * 24 + a) * Math.PI / 180, x = Math.cos(an) * r, y = Math.sin(an) * r; s += `<g transform="translate(${x},${y + 30})"><rect x="-34" y="-26" width="68" height="44" rx="6" fill="${AT_RED}" stroke="#7a1a1a" stroke-width="3"/>${[-18, 0, 18].map(dx => `<rect x="${dx - 7}" y="-18" width="14" height="16" fill="#fff4d0"/>`).join('')}<rect x="-38" y="-30" width="76" height="8" rx="3" fill="#8a1a1a"/></g>`; }
  return s + `</g>`;
}
function lipizzaner(x, y, s = 1, t = 0, o = {}) { // caballo lipizano (blanco, o casi negro de potro)
  const col = o.col || '#f4f2ec', sh = o.col ? '#2a2420' : '#d6d2c8', rear = o.rear || 0, jump = o.jump || 0;
  return `<g transform="translate(${x},${y - jump}) scale(${s * (o.dir || 1)},${s}) rotate(${-rear} 40 -60)">${rShadow(0, jump / s, 110)}
  <path d="M-90,-80 Q-90,-130 -30,-130 L60,-130 Q110,-130 110,-90 L100,-60 Q60,-50 -60,-56 Q-90,-60 -90,-80Z" fill="${col}"/>
  <path d="M70,-120 Q100,-200 140,-200 L160,-180 L150,-150 Q120,-140 110,-100Z" fill="${col}"/><path d="M140,-200 l10,-20 l8,18Z" fill="${col}"/><circle cx="146" cy="-180" r="4" fill="#111"/><path d="M100,-180 Q80,-150 84,-120" stroke="${sh}" stroke-width="10" fill="none"/>
  <path d="M-90,-90 Q-130,-70 -120,-20" stroke="${sh}" stroke-width="16" fill="none" stroke-linecap="round"/>
  ${[[-70, 0], [-40, 0], [60, 0], [90, 0]].map(([lx], k) => `<path d="M${lx},-60 L${lx + (k < 2 ? -rear * .6 : 0) + S(t, 4, k) * (o.trot ? 10 : 0)},${-4 - (k >= 2 && rear ? 30 : 0)}" stroke="${col}" stroke-width="16" stroke-linecap="round"/><path d="M${lx - 8 + (k < 2 ? -rear * .6 : 0)},0 h16" stroke="#3a3a3a" stroke-width="8"/>`).join('')}
  ${o.saddle ? `<path d="M-20,-132 L40,-132 L36,-110 L-16,-110Z" fill="#6b2a2a"/><rect x="-10" y="-112" width="34" height="40" fill="#d9b14a" opacity=".85"/>` : ''}</g>`;
}
function bicorne(x, y, s = 1) { return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-40,0 Q0,-36 40,0 Q0,-10 -40,0Z" fill="#1a1a1a"/><circle cx="0" cy="-14" r="4" fill="#d9b14a"/></g>`; }
function composer(x, y, s, name, o = {}) {
  const wig = o.wig || '#f4f0e8';
  return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-130" y="-170" width="260" height="320" rx="10" fill="url(#viGold)"/><rect x="-116" y="-156" width="232" height="292" fill="${o.bg || '#3a4a5a'}"/>
  <path d="M-80,130 Q-80,40 0,30 Q80,40 80,130Z" fill="${o.coat || '#6a2a2a'}"/><path d="M-14,40 L0,70 L14,40Z" fill="#fff"/><circle cx="0" cy="-20" r="46" fill="#e8c4a0"/>
  ${o.wild ? `<path d="M-56,-20 Q-70,-90 -20,-80 Q0,-110 30,-80 Q70,-90 60,-20 Q50,-60 0,-66 Q-50,-60 -56,-20Z" fill="#5a4030"/>` : `<path d="M-50,-20 Q-50,-76 0,-76 Q50,-76 50,-20 Q40,-50 0,-52 Q-40,-50 -50,-20Z" fill="${wig}"/><circle cx="-50" cy="-6" r="14" fill="${wig}"/><circle cx="50" cy="-6" r="14" fill="${wig}"/>`}
  ${o.glasses ? `<circle cx="-16" cy="-20" r="12" fill="none" stroke="#333" stroke-width="3"/><circle cx="16" cy="-20" r="12" fill="none" stroke="#333" stroke-width="3"/><line x1="-4" y1="-20" x2="4" y2="-20" stroke="#333" stroke-width="3"/>` : ''}
  <circle cx="-16" cy="-20" r="4" fill="#222"/><circle cx="16" cy="-20" r="4" fill="#222"/><path d="M-12,4 Q0,12 12,4" stroke="#7a3a2a" stroke-width="3" fill="none"/>
  <rect x="-110" y="166" width="220" height="44" rx="8" fill="#fff" stroke="#2b3a67" stroke-width="3"/><text y="198" font-family="Fredoka" font-weight="700" font-size="28" text-anchor="middle" fill="#2b3a67">${name}</text></g>`;
}
function cafeTable(x, y, s = 1) { return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="0" rx="90" ry="22" fill="url(#viMarble)" stroke="#bfb6a6" stroke-width="3"/><rect x="-6" y="0" width="12" height="110" fill="#2a2a2a"/><ellipse cx="0" cy="110" rx="40" ry="8" fill="#2a2a2a"/></g>`; }
function thonet(x, y, s = 1, dir = 1) { return `<g transform="translate(${x},${y}) scale(${s * dir},${s})" stroke="#4a2a1a" stroke-width="6" fill="none"><path d="M-24,0 L-28,90 M24,0 L28,90 M-20,40 Q0,50 20,40"/><ellipse cx="0" cy="0" rx="30" ry="9" fill="#6a3a2a"/><path d="M-22,0 Q-30,-80 0,-90 Q30,-80 22,0"/><path d="M-12,-10 Q0,-70 12,-10"/></g>`; }
function sacher(x, y, s = 1) { return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-120,0 L120,-40 L120,40 L-120,80Z" fill="#3a1a0e"/><path d="M-120,0 L120,-40 L120,-30 L-120,10Z" fill="#2a120a"/><path d="M-120,36 L120,-4 L120,6 L-120,46Z" fill="#e8962a"/><path d="M-120,0 L0,-90 L120,-40Z" fill="#2a120a"/><path d="M-120,0 L0,-90 L120,-40" stroke="#5a2a1a" stroke-width="3" fill="none"/><ellipse cx="-30" cy="-60" rx="30" ry="10" fill="#d9b14a" opacity=".85"/><text x="-30" y="-56" font-family="Fredoka" font-size="12" text-anchor="middle" fill="#3a1a0e">Sacher</text></g>`; }
function nata(x, y, s = 1) { return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-60,0 Q-70,-40 -30,-50 Q-20,-80 10,-70 Q50,-80 50,-40 Q80,-20 60,0Z" fill="#fffdf6" stroke="#e8e2d4" stroke-width="3"/></g>`; }

/* ---------- escenas ---------- */
scenes.vi_intro = function (t) {
  let s = VIALL() + rSky('day') + rClouds(t, [[300, 120, .8], [1300, 90, .6]]) + stephansdom(1500, 760, .7) + viStreet(t, 760, { h: 420 }).replace(/^/, '') + viPeople(t, 3, 12, 800, 1070);
  return s + `<g transform="translate(${W / 2 - 200},${H / 2 - 220})"><rect x="-560" y="-150" width="1120" height="300" rx="40" fill="#fff" opacity=".95" stroke="#2b3a67" stroke-width="6"/>
  <text x="0" y="-30" font-family="Fredoka" font-weight="700" font-size="104" text-anchor="middle" fill="#ffcc2e" stroke="#2b3a67" stroke-width="6" paint-order="stroke">Mi Pequeño Atlas</text>
  <rect x="-300" y="20" width="600" height="96" rx="22" fill="${AT_RED}"/><text x="0" y="88" font-family="Fredoka" font-weight="700" font-size="64" text-anchor="middle" fill="#fff">Capítulo 10: Viena</text></g>`;
};
scenes.vi_mapa = function (t) {
  let s = VIALL() + `<rect width="${W}" height="${H}" fill="#cfe2b8"/>`;
  s += `<path d="M300,560 L520,470 L760,480 L980,420 L1220,380 L1460,340 L1600,400 L1680,520 L1560,620 L1380,660 L1180,720 L900,720 L700,680 L480,660Z" fill="#f2d0d0" stroke="#2b3a67" stroke-width="6" stroke-linejoin="round"/><text x="1000" y="600" font-family="Fredoka" font-weight="700" font-size="54" text-anchor="middle" fill="${AT_RED}">AUSTRIA</text>`;
  s += `<path d="M1480,400 Q1300,380 1100,330 Q900,300 700,330" stroke="#3a7ab0" stroke-width="12" fill="none"/><text x="900" y="300" font-family="Fredoka" font-weight="600" font-size="30" fill="#3a7ab0">Danubio</text><text x="400" y="300" font-family="Fredoka" font-weight="700" font-size="40" fill="#5a7a4a" opacity=".7">ALEMANIA</text><text x="1500" y="840" font-family="Fredoka" font-weight="700" font-size="40" fill="#5a7a4a" opacity=".7">HUNGRÍA</text>`;
  const p = 1 + .15 * Math.max(0, S(t, 4));
  s += `<g transform="translate(1520,420) scale(${p})"><circle r="22" fill="#e8352a" stroke="#fff" stroke-width="6"/><circle r="7" fill="#fff"/></g>` + rLabel('Viena', 1520, 520, 44, '#e8352a') + atFlag(300, 700, 1.4);
  return s + rLabel('Viena, la capital de Austria', W / 2, 1010, 42);
};
scenes.vi_invitado = function (t) {
  let s = VIALL() + rSky('day') + viStreet(t, 760, { h: 420, seed: 2 }) + viPeople(t, 5, 8, 800, 1070);
  return s + `<g transform="translate(960,320) scale(${1 + S(t, 2) * .01})"><rect x="-460" y="-110" width="920" height="220" rx="36" fill="#fff" stroke="${AT_RED}" stroke-width="8"/><text x="0" y="-20" font-family="Fredoka" font-weight="600" font-size="44" text-anchor="middle" fill="${AT_RED}">Nuestro invitado de hoy</text><text x="0" y="66" font-family="Fredoka" font-weight="700" font-size="80" text-anchor="middle" fill="#2b3a67">Lucas, de Viena</text></g>`;
};
scenes.vi_cajamusica = function (t) {
  let s = VIALL() + `<rect width="${W}" height="${H}" fill="#2b3a67"/><rect x="0" y="820" width="${W}" height="260" fill="url(#rWood)"/>`;
  s += `<g transform="translate(960,820)"><rect x="-520" y="-260" width="1040" height="260" rx="20" fill="#8a4a2a" stroke="url(#viGold)" stroke-width="12"/><path d="M-520,-260 L-480,-560 L480,-560 L520,-260" fill="#a85a32" opacity=".9"/>`;
  s += `<g transform="translate(0,-270) scale(.7)">${baroque(-600, 0, 360, 300, { dome: true })}${baroque(-240, 0, 300, 340)}${baroque(60, 0, 360, 300, { dome: true })}</g>`;
  s += `<g transform="translate(0,-300)"><ellipse rx="60" ry="14" fill="url(#viGold)"/><g transform="scale(${Math.cos(t / L * TAU * 2) || .05},1)">${rP(0, 0, 1.4, t, VIESC({ ph: 2, top: '#f4c8d8', skirt: '#f4c8d8', longhair: true }))}</g></g><rect x="520" y="-160" width="60" height="20" fill="url(#viGold)"/><circle cx="590" cy="-150" r="22" fill="url(#viGold)"/></g>`;
  s += [...Array(6)].map((_, i) => { const p = (t / L * 2 + i / 6) % 1; return `<text x="${400 + i * 220}" y="${500 - p * 300}" font-size="56" fill="#f2d27a" opacity="${1 - p}">♪</text>`; }).join('');
  return s + rLabel('Viena es como una caja de música gigante', W / 2, 140, 44);
};
scenes.vi_salon = function (t) { // salón de baile de palacio con parejas que valsan
  let s = VIALL() + `<rect width="${W}" height="${H}" fill="#f4e8d0"/><rect x="0" y="0" width="${W}" height="160" fill="#e8d8b0"/>`;
  for (let i = 0; i < 7; i++) s += `<rect x="${60 + i * 300}" y="160" width="60" height="560" fill="url(#viGold)"/><path d="M${120 + i * 300},700 L${120 + i * 300},260 Q${210 + i * 300},180 ${300 + i * 300},260 L${300 + i * 300},700Z" fill="#cfe0f0" opacity=".8"/>`;
  for (const x of [480, 1440]) s += `<g transform="translate(${x},80)"><line x1="0" y1="0" x2="0" y2="80" stroke="#8a6a2a" stroke-width="4"/>${[...Array(9)].map((_, k) => `<circle cx="${Math.cos(k * .7) * 70}" cy="${110 + Math.sin(k * .7) * 20}" r="10" fill="#fff8d0"/>`).join('')}<ellipse cx="0" cy="110" rx="80" ry="24" fill="none" stroke="url(#viGold)" stroke-width="6"/></g>`;
  s += `<rect x="0" y="720" width="${W}" height="360" fill="#c8a070"/>${[...Array(10)].map((_, i) => `<path d="M${i * 220},720 L${i * 220 - 300},1080" stroke="#b08a5a" stroke-width="3"/>`).join('')}`;
  const couple = (cx, cy, r, ph, c1, c2) => { const a = t / L * TAU * 2 + ph, x = cx + Math.cos(a) * r, y = cy + Math.sin(a) * r * .25; return `<g transform="translate(${x},${y})">${rP(-14, 0, 1.6, t, VIESC({ ph: ph * 3, top: c1, skirt: c1, longhair: true }))}${rP(14, 0, 1.7, t, VIESC({ ph: ph * 3 + 1, top: '#1a1a2a', bot: '#1a1a2a', dir: -1 }))}<ellipse cx="-14" cy="-10" rx="44" ry="14" fill="${c1}" opacity=".9"/></g>`; };
  s += couple(500, 880, 140, 0, '#f4c8d8', '') + couple(960, 940, 160, 2, '#cfe0f8', '') + couple(1420, 880, 140, 4, '#f8e8a8', '');
  return s + rLabel('En sus palacios se bailaba el vals', W / 2, 1020, 40);
};
scenes.vi_olores = function (t) {
  let s = VIALL() + `<rect width="${W}" height="${H}" fill="#fdf3dc"/><rect x="0" y="700" width="${W}" height="380" fill="url(#rWood)"/>`;
  s += `<g transform="translate(400,780)">${chocoCup(0, 0, 1.0)}${steam(0, -110, t, 3)}</g><g transform="translate(960,780)"><path d="M-40,0 L40,0 L50,-100 L-50,-100Z" fill="#8ab0c8" opacity=".8"/>${[...Array(7)].map((_, k) => `<path d="M0,-100 Q${-60 + k * 20},-180 ${-70 + k * 24},-220" stroke="#3a8a3a" stroke-width="5" fill="none"/><circle cx="${-70 + k * 24}" cy="-226" r="16" fill="${['#ff9ad5', '#f2c14e', '#fff', '#c8a0f0'][k % 4]}"/>`).join('')}</g>`;
  s += `<g transform="translate(1500,760) rotate(-6)"><rect x="-200" y="-140" width="400" height="260" fill="#f4ead0" stroke="#c8b48a" stroke-width="4"/>${[...Array(5)].map((_, r) => `<g>${[...Array(5)].map((_, k) => `<line x1="-180" y1="${-110 + r * 50 + k * 7}" x2="180" y2="${-110 + r * 50 + k * 7}" stroke="#8a7a5a" stroke-width="1.5"/>`).join('')}${[...Array(6)].map((_, k) => `<ellipse cx="${-150 + k * 60}" cy="${-96 + r * 50 + (k % 3) * 7}" rx="7" ry="5" fill="#3a3020"/>`).join('')}</g>`).join('')}</g>`;
  return s + rLabel('Huele a chocolate, a flores y a partituras antiguas', W / 2, 140, 40);
};
scenes.vi_stephansdom = function (t) {
  let s = VIALL() + rSky('day') + rSun(300, 140) + baroque(-20, 860, 480, 420) + baroque(1560, 860, 400, 400) + stephansdom(860, 860, 1.0) + `<rect x="0" y="860" width="${W}" height="220" fill="#b9b2a4"/>` + viPeople(t, 9, 12, 900, 1070);
  return s + rArrowLabel('Tejado de azulejos de colores', 330, 240, 720, 420, 30) + rLabel('La catedral de San Esteban', W / 2, 1010, 40);
};
scenes.vi_musica_calle = function (t) {
  let s = VIALL() + rSky('day') + viStreet(t, 700, { h: 440, seed: 4 }) + viPeople(t, 11, 9, 740, 1070);
  s += rP(700, 1000, 2.3, t, VIESC({ ph: 2, top: '#2b3a67', hold: `<g transform="translate(-6,-100) rotate(-30)"><ellipse cx="0" cy="0" rx="16" ry="26" fill="#a8622a"/><rect x="-3" y="-60" width="6" height="40" fill="#3a2a1a"/><line x1="10" y1="-30" x2="60" y2="20" stroke="#d9c8a0" stroke-width="3"/></g>` }));
  s += rP(1200, 1010, 2.3, t, VIESC({ ph: 4, top: AT_RED, longhair: true, hold: `<g transform="translate(-6,-100) rotate(-30)"><ellipse cx="0" cy="0" rx="16" ry="26" fill="#c8823a"/><rect x="-3" y="-60" width="6" height="40" fill="#3a2a1a"/></g>` }));
  s += [...Array(5)].map((_, i) => { const p = (t / L * 2 + i / 5) % 1; return `<text x="${600 + i * 160}" y="${640 - p * 260}" font-size="54" fill="#2b3a67" opacity="${1 - p}">♪</text>`; }).join('');
  return s + rLabel('La música está por todas partes', W / 2, 140, 44);
};
scenes.vi_hofburg = function (t) {
  let s = VIALL() + rSky('day') + rSun(1650, 140) + `<g transform="translate(960,800)"><path d="M-900,0 L-900,-300 Q0,-360 900,-300 L900,0Z" fill="#f4ead4"/>${[...Array(18)].map((_, i) => `<rect x="${-860 + i * 100}" y="-260" width="40" height="180" fill="#3a4250"/>${roColumn(-840 + i * 100 + 70, 0, 280, 22, 'corintio', '#f8f2e4')}`).join('')}<path d="M-180,-340 Q-180,-560 0,-580 Q180,-560 180,-340Z" fill="url(#viCopper)"/><rect x="-200" y="-360" width="400" height="40" fill="#e8dcc0"/><circle cx="0" cy="-600" r="16" fill="url(#viGold)"/>${statueRO(-140, -360, 1.2)}${statueRO(140, -360, 1.2)}</g><rect x="0" y="800" width="${W}" height="280" fill="#cfc4ae"/>`;
  return s + viPeople(t, 13, 12, 840, 1070) + rLabel('Viena fue la capital de un imperio: palacios, teatros y orquestas', W / 2, 140, 36);
};
scenes.vi_compositores = function (t) {
  let s = VIALL() + `<rect width="${W}" height="${H}" fill="#6a2a2a"/><rect x="0" y="880" width="${W}" height="200" fill="#8a6a4a"/>`;
  s += composer(330, 460, 1.0, 'Haydn', { coat: '#3a4a7a' }) + composer(760, 460, 1.0, 'Mozart', { coat: AT_RED, bg: '#4a3a5a' }) + composer(1190, 460, 1.0, 'Beethoven', { wild: true, coat: '#2a2a3a', bg: '#3a3a3a' }) + composer(1620, 460, 1.0, 'Schubert', { wild: true, glasses: true, coat: '#3a5a3a', bg: '#4a5a4a' });
  return s + rLabel('Haydn, Mozart, Beethoven y Schubert vivieron aquí', W / 2, 1010, 40);
};
scenes.vi_mozart_nino = function (t) {
  let s = VIALL() + `<rect width="${W}" height="${H}" fill="#f4e8d0"/>${[...Array(6)].map((_, i) => `<rect x="${40 + i * 320}" y="80" width="40" height="680" fill="url(#viGold)"/>`).join('')}<rect x="0" y="760" width="${W}" height="320" fill="#c8a070"/>`;
  s += `<g transform="translate(700,820)"><rect x="-240" y="-120" width="480" height="70" rx="10" fill="#8a2a2a"/><rect x="-220" y="-110" width="440" height="30" fill="#fff"/>${[...Array(16)].map((_, k) => `<rect x="${-214 + k * 27}" y="-110" width="12" height="18" fill="#111"/>`).join('')}<rect x="-220" y="-50" width="20" height="120" fill="#6a1a1a"/><rect x="200" y="-50" width="20" height="120" fill="#6a1a1a"/><path d="M-240,-120 L240,-120 L180,-300 L-180,-300Z" fill="#8a2a2a" opacity=".8"/></g>`;
  s += `<g transform="translate(560,830)">${rSit(0, 0, 1.6, t, { mode: 'banco', ph: 2, top: AT_RED, hair: '#f4f0e8' })}</g>`;
  s += [...Array(4)].map((_, i) => { const p = (t / L * 3 + i / 4) % 1; return `<text x="${600 + i * 70}" y="${560 - p * 200}" font-size="48" fill="#2b3a67" opacity="${1 - p}">♪</text>`; }).join('');
  s += `<g transform="translate(1340,1000)">${rP(0, 0, 2.6, t, VIESC({ ph: 5, top: '#cfe0f8', skirt: '#cfe0f8', longhair: true, hair: '#d9c8a0', dir: -1 }))}<path d="M-50,-90 L50,-90 L70,0 L-70,0Z" fill="#cfe0f8"/><path d="M-20,-386 L-10,-410 L0,-394 L10,-410 L20,-386Z" fill="url(#viGold)"/></g>`;
  return s + rLabel('Mozart, con 6 años, tocó ante la emperatriz en Schönbrunn', W / 2, 140, 38);
};
scenes.vi_vals = function (t) {
  let s = scenes.vi_salon(t).replace('En sus palacios se bailaba el vals', 'El vals: un, dos, tres… un, dos, tres');
  const k = Math.floor((t / L * 6) % 3) + 1;
  return s + `<g transform="translate(960,300)"><circle r="80" fill="#fff" stroke="#2b3a67" stroke-width="6"/><text y="30" font-family="Fredoka" font-weight="700" font-size="90" text-anchor="middle" fill="${AT_RED}">${k}</text></g>`;
};
scenes.vi_danubio = function (t) {
  let s = VIALL() + rSky('day') + rSun(1650, 140) + `<rect x="0" y="560" width="${W}" height="120" fill="#7aa85a"/>` + [...Array(7)].map((_, i) => rTree(80 + i * 300, 600, .5, 'green', t, 300 + i)).join('');
  s += `<rect x="0" y="640" width="${W}" height="300" fill="url(#viDanube)"/>${[...Array(14)].map((_, i) => `<path d="M${(i * 157 + t / L * 100) % (W + 100) - 50},${680 + (i * 37) % 240} q30,-6 60,0" stroke="#cfe6f4" stroke-width="3" fill="none" opacity=".7"/>`).join('')}`;
  s += `<path d="M0,700 L${W},700" stroke="#8a8478" stroke-width="0"/><g>${[...Array(5)].map((_, i) => `<path d="M${200 + i * 380},640 Q${390 + i * 380},560 ${580 + i * 380},640" stroke="#9a9488" stroke-width="22" fill="none"/>`).join('')}<rect x="200" y="600" width="1520" height="20" fill="#9a9488"/></g>`;
  s += `<rect x="0" y="940" width="${W}" height="140" fill="#7aa85a"/>` + [...Array(4)].map((_, i) => { const p = (t / L * 2 + i / 4) % 1; return `<text x="${500 + i * 280}" y="${520 - p * 240}" font-size="56" fill="#2f6aa0" opacity="${1 - p}">♪</text>`; }).join('');
  return s + rLabel('El Danubio Azul, el vals de Johann Strauss', W / 2, 140, 42);
};
scenes.vi_strauss = function (t) {
  let s = VIALL() + rSky('day') + `<rect x="0" y="560" width="${W}" height="520" fill="url(#viGrass)"/>` + [...Array(6)].map((_, i) => rTree(80 + i * 360, 600, .8, 'green', t, 320 + i)).join('');
  s += `<g transform="translate(960,900)"><path d="M-260,0 Q-260,-420 0,-440 Q260,-420 260,0Z" fill="#f4f0e8"/><path d="M-220,0 Q-220,-380 0,-400 Q220,-380 220,0Z" fill="#e8e2d4"/><rect x="-60" y="-60" width="120" height="60" fill="#d9d1c4"/>
  <g transform="translate(0,-60)" fill="url(#viGold)"><path d="M-30,0 L-26,-150 Q-40,-190 -24,-230 L24,-230 Q40,-190 26,-150 L30,0Z"/><circle cx="0" cy="-252" r="26"/><path d="M-24,-200 Q-80,-210 -100,-250" stroke="url(#viGold)" stroke-width="14" fill="none"/><path d="M-110,-260 L-60,-230" stroke="url(#viGold)" stroke-width="6"/><ellipse cx="-100" cy="-250" rx="24" ry="10" fill="url(#viGold)" transform="rotate(-30 -100 -250)"/></g></g>`;
  return s + viPeople(t, 17, 8, 920, 1070) + rLabel('Estatuas de compositores en los parques', W / 2, 140, 40);
};
scenes.vi_sala_dorada = function (t) {
  let s = VIALL() + `<rect width="${W}" height="${H}" fill="#c8962a"/><rect x="0" y="0" width="${W}" height="200" fill="#e8c060"/>`;
  for (let i = 0; i < 12; i++) s += `<g transform="translate(${80 + i * 160},420)"><rect x="-22" y="-200" width="44" height="400" fill="url(#viGold)"/><circle cx="0" cy="-220" r="20" fill="url(#viGold)"/></g>`;
  for (const x of [400, 960, 1520]) s += `<g transform="translate(${x},120)"><line x1="0" y1="-120" x2="0" y2="20" stroke="#8a6a2a" stroke-width="4"/>${[...Array(12)].map((_, k) => `<circle cx="${Math.cos(k * .52) * 90}" cy="${40 + Math.sin(k * .52) * 24}" r="10" fill="#fff8d0"/>`).join('')}</g>`;
  s += `<g transform="translate(960,480)"><rect x="-260" y="-220" width="520" height="220" fill="#8a6a2a"/>${[...Array(14)].map((_, k) => `<rect x="${-250 + k * 36}" y="${-220 - (k % 3) * 20}" width="20" height="${160 + (k % 3) * 20}" fill="url(#viGold)"/>`).join('')}</g><rect x="0" y="560" width="${W}" height="520" fill="#7a3a1a"/>`;
  for (let r = 0; r < 4; r++) for (let i = 0; i < 18; i++) s += rSit(60 + i * 106 + (r % 2) * 50, 700 + r * 110, .9 + r * .2, t, { mode: 'banco', ph: i + r * 3, top: ['#1a1a2a', AT_RED, '#2b3a67', '#e8e2d4', '#7a5a8a'][(i + r) % 5], child: false });
  return s + rLabel('Una sala de conciertos dorada: el Concierto de Año Nuevo', W / 2, 1010, 38);
};
scenes.vi_schonbrunn = function (t) {
  let s = VIALL() + rSky('day') + rSun(1700, 130) + rClouds(t, [[300, 120, .8]]) + schonbrunn(960, 760, .95) + `<rect x="0" y="760" width="${W}" height="320" fill="#d9ccb0"/>`;
  s += `${[...Array(6)].map((_, i) => `<path d="M${120 + i * 300},860 L${300 + i * 300},860 L${320 + i * 300},1080 L${100 + i * 300},1080Z" fill="url(#viGrass)"/>`).join('')}`;
  return s + viPeople(t, 19, 10, 800, 1070) + rLabel('Schönbrunn: un palacio amarillo con 1441 habitaciones', W / 2, 140, 38);
};
scenes.vi_jardines = function (t) {
  let s = VIALL() + rSky('day') + `<path d="M0,520 Q960,380 1920,520 L1920,640 L0,640Z" fill="#7aa85a"/>` + gloriette(960, 470, .9) + `<rect x="0" y="620" width="${W}" height="460" fill="url(#viGrass)"/>`;
  // laberinto de setos
  s += `<g transform="translate(560,860) skewX(-20)">${[...Array(6)].map((_, k) => `<rect x="${-260 + k * 20}" y="${-150 + k * 30}" width="${520 - k * 40}" height="16" fill="#2f6a2a"/>`).join('')}${[[-200, -120, 16, 160], [120, -90, 16, 140], [-60, -60, 16, 120], [40, -30, 16, 80]].map(([x, y, w, h]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#2f6a2a"/>`).join('')}</g>`;
  s += `<g transform="translate(1360,860)"><ellipse rx="200" ry="40" fill="#cfe6f4" stroke="#d9d1c4" stroke-width="10"/>${[...Array(6)].map((_, k) => `<path d="M${-80 + k * 32},-10 q4,-${40 + (k % 3) * 20} 0,-${60 + (k % 3) * 20}" stroke="#cfe6f4" stroke-width="5" fill="none" opacity="${.6 + .4 * Math.abs(S(t, 4, k))}"/>`).join('')}</g>`;
  s += rP(500, 1000, 1.9, t, { ph: 1, child: true, top: '#f2c14e' }) + rP(620, 1030, 1.9, t, { ph: 3, child: true, top: AT_RED, longhair: true });
  return s + rArrowLabel('La Glorieta', 1400, 230, 1100, 330, 30) + rArrowLabel('El laberinto', 260, 760, 420, 820, 30) + rLabel('Jardines con fuentes, la Glorieta y un laberinto', W / 2, 140, 40);
};
scenes.vi_zoo = function (t) {
  let s = VIALL() + rSky('day') + `<rect x="0" y="560" width="${W}" height="520" fill="url(#viGrass)"/>` + [...Array(5)].map((_, i) => rTree(100 + i * 430, 600, .7, 'green', t, 340 + i)).join('');
  s += `<g transform="translate(400,760)">${rShadow(0, 0, 140)}<path d="M-60,0 L-60,-260 L-40,-260 L-40,0 M40,0 L40,-200 L60,-200 L60,0" stroke="#e8b04a" stroke-width="22"/><ellipse cx="0" cy="-260" rx="110" ry="70" fill="#e8b04a"/><path d="M80,-290 L150,-520 L180,-510 L120,-280Z" fill="#e8b04a"/><ellipse cx="180" cy="-530" rx="40" ry="24" fill="#e8b04a"/><circle cx="190" cy="-536" r="5" fill="#111"/>${[...Array(14)].map((_, i) => `<circle cx="${-80 + (i * 37) % 170}" cy="${-300 + (i * 23) % 80}" r="12" fill="#a8622a"/>`).join('')}</g>`;
  s += `<g transform="translate(1000,760)">${rShadow(0, 0, 150)}<ellipse cx="0" cy="-130" rx="150" ry="100" fill="#9a958c"/><circle cx="130" cy="-170" r="70" fill="#9a958c"/><path d="M180,-150 Q${220 + S(t, 2) * 10},-60 200,0" stroke="#9a958c" stroke-width="30" fill="none" stroke-linecap="round"/><ellipse cx="110" cy="-170" rx="40" ry="56" fill="#8a857c"/>${[-100, -40, 40, 100].map(x => `<rect x="${x - 20}" y="-60" width="40" height="60" fill="#9a958c"/>`).join('')}<circle cx="150" cy="-190" r="7" fill="#222"/></g>`;
  s += `<g transform="translate(1580,820)"><path d="M-120,0 L-120,-170 L120,-170 L120,0Z" fill="#8ab0c8" opacity=".6" stroke="#5a7a8a" stroke-width="6"/><path d="M-130,-170 Q0,-260 130,-170Z" fill="#8ab0c8" opacity=".6" stroke="#5a7a8a" stroke-width="6"/>${[...Array(5)].map((_, k) => `<path d="M${-90 + k * 45},-160 q-10,60 0,140" stroke="#cfe6f4" stroke-width="3" fill="none" stroke-dasharray="8 8"/>`).join('')}<path d="M-80,0 Q-60,-120 -40,0 M20,0 Q40,-100 60,0" stroke="#2f7a2f" stroke-width="12" fill="none"/></g>`;
  return s + viPeople(t, 23, 6, 900, 1070) + rLabel('El zoo de Schönbrunn: el más antiguo del mundo (1752)', W / 2, 140, 38);
};
scenes.vi_pandas = function (t) {
  let s = VIALL() + rSky('day') + `<rect x="0" y="560" width="${W}" height="520" fill="url(#viGrass)"/>`;
  for (let i = 0; i < 14; i++) s += `<path d="M${40 + i * 140},1080 L${60 + i * 140},${420 + (i % 3) * 60}" stroke="#7ab04a" stroke-width="14"/>${[...Array(4)].map((_, k) => `<ellipse cx="${80 + i * 140}" cy="${480 + k * 120 + (i % 3) * 30}" rx="30" ry="9" fill="#5a9a3a" transform="rotate(-30 ${80 + i * 140} ${480 + k * 120})"/>`).join('')}`;
  const panda = (x, y, s2, ph) => `<g transform="translate(${x},${y}) scale(${s2})">${rShadow(0, 0, 90)}<ellipse cx="0" cy="-70" rx="90" ry="70" fill="#f4f4f0"/><ellipse cx="-60" cy="-20" rx="30" ry="24" fill="#1a1a1a"/><ellipse cx="60" cy="-20" rx="30" ry="24" fill="#1a1a1a"/><ellipse cx="0" cy="-110" rx="80" ry="20" fill="#1a1a1a"/><circle cx="0" cy="-170" r="60" fill="#f4f4f0"/><circle cx="-46" cy="-216" r="20" fill="#1a1a1a"/><circle cx="46" cy="-216" r="20" fill="#1a1a1a"/><ellipse cx="-22" cy="-176" rx="14" ry="18" fill="#1a1a1a"/><ellipse cx="22" cy="-176" rx="14" ry="18" fill="#1a1a1a"/><circle cx="-20" cy="-178" r="5" fill="#fff"/><circle cx="20" cy="-178" r="5" fill="#fff"/><ellipse cx="0" cy="-150" rx="10" ry="6" fill="#1a1a1a"/><g transform="rotate(${S(t, 4, ph) * 10} 40 -130)"><path d="M40,-130 L120,-220" stroke="#7ab04a" stroke-width="12"/><ellipse cx="110" cy="-206" rx="24" ry="8" fill="#5a9a3a"/></g><ellipse cx="50" cy="-120" rx="22" ry="18" fill="#1a1a1a"/></g>`;
  s += panda(700, 960, 1.3, 0) + panda(1240, 980, 1.1, 2);
  return s + rLabel('Los osos panda desayunan bambú sin prisa', W / 2, 140, 40);
};
const riderVi = (x, y, s, t, ph) => `<g transform="translate(${x},${y}) scale(${s})"><path d="M-8,-40 L-14,-90 L14,-90 L8,-40Z" fill="#6a3a22"/><path d="M-8,-40 L-6,0 M8,-40 L10,0" stroke="#f4f0e8" stroke-width="10"/><path d="M-6,0 L-8,14 M10,0 L12,14" stroke="#1a1a1a" stroke-width="10"/><circle cx="0" cy="-104" r="13" fill="${RSKIN[ph % 5]}"/><circle cx="-4" cy="-104" r="1.8" fill="#222"/><circle cx="5" cy="-104" r="1.8" fill="#222"/>${bicorne(0, -114, .8)}<path d="M-14,-84 L-26,-50 M14,-84 L22,-56" stroke="#6a3a22" stroke-width="8"/></g>`;
function ridingHall(t) { let s = VIALL() + `<rect width="${W}" height="${H}" fill="#f8f4ea"/><rect x="0" y="0" width="${W}" height="120" fill="#ece4d0"/>`; for (let i = 0; i < 12; i++) s += `<g transform="translate(${80 + i * 160},0)"><rect x="-18" y="120" width="36" height="560" fill="#f4f0e6" stroke="#d9d1c4" stroke-width="3"/><rect x="-26" y="120" width="52" height="20" fill="#e8dcc0"/></g>`; s += `<rect x="0" y="330" width="${W}" height="20" fill="#e8dcc0"/><rect x="0" y="350" width="${W}" height="40" fill="#f4f0e6"/>${[...Array(40)].map((_, k) => `<rect x="${k * 48 + 10}" y="352" width="10" height="36" fill="#e0d6c0"/>`).join('')}`; for (const x of [480, 1440]) s += `<g transform="translate(${x},40)"><line x1="0" y1="0" x2="0" y2="60" stroke="#8a6a2a" stroke-width="4"/>${[...Array(10)].map((_, k) => `<circle cx="${Math.cos(k * .63) * 80}" cy="${80 + Math.sin(k * .63) * 20}" r="10" fill="#fff8d0"/>`).join('')}</g>`; s += `<rect x="0" y="680" width="${W}" height="400" fill="#d9c8a0"/>${[...Array(30)].map((_, k) => `<circle cx="${(k * 131) % W}" cy="${700 + (k * 53) % 360}" r="4" fill="#c8b48a"/>`).join('')}`; return s; }
scenes.vi_caballos = function (t) {
  let s = ridingHall(t);
  s += lipizzaner(560, 960, 1.5, t, { trot: true, saddle: true }) + riderVi(560, 760, 1.5, t, 1) + lipizzaner(1340, 990, 1.6, t, { trot: true, saddle: true, dir: -1 }) + riderVi(1340, 780, 1.6, t, 3);
  return s + rLabel('Los caballos lipizanos de la Escuela Española de Equitación', W / 2, 1010, 36);
};
scenes.vi_potro = function (t) {
  let s = VIALL() + rSky('day') + rSun(1650, 140) + `<rect x="0" y="560" width="${W}" height="520" fill="url(#viGrass)"/>` + `<path d="M0,700 L${W},700" stroke="#8a6a46" stroke-width="8"/>${[...Array(40)].map((_, i) => `<line x1="${i * 50}" y1="640" x2="${i * 50}" y2="710" stroke="#8a6a46" stroke-width="5"/>`).join('')}<path d="M0,650 L${W},650" stroke="#8a6a46" stroke-width="6"/>`;
  s += lipizzaner(820, 960, 1.9, t, {}) + lipizzaner(1300, 990, 1.1, t, { col: '#3a2a22', dir: -1 });
  return s + rArrowLabel('Potro: nace oscuro', 1580, 640, 1340, 790, 30) + rArrowLabel('De mayor: blanco', 340, 520, 640, 760, 30) + rLabel('Nacen oscuros y se vuelven blancos como la nieve', W / 2, 140, 40);
};
scenes.vi_cabriola = function (t) {
  const p = (t / L * 2) % 1, j = Math.sin(p * Math.PI) * 160;
  let s = ridingHall(t);
  s += lipizzaner(700, 980, 1.7, t, { saddle: true, jump: j, rear: p < .5 ? 0 : 0 }) + riderVi(700, 780 - j, 1.7, t, 2) + lipizzaner(1360, 990, 1.6, t, { saddle: true, rear: 28, dir: -1 }) + riderVi(1360, 790, 1.6, t, 4);
  return s + rArrowLabel('La cabriola', 300, 500, 600, 640 - j * .5, 30) + rLabel('Pasos de ballet: reverencias, saltos y la cabriola', W / 2, 1010, 38);
};
scenes.vi_cafe = function (t) {
  let s = VIALL() + `<rect width="${W}" height="${H}" fill="#e8d8b8"/><rect x="0" y="0" width="${W}" height="80" fill="#6a3a22"/>`;
  for (let i = 0; i < 5; i++) s += `<rect x="${80 + i * 380}" y="140" width="260" height="380" fill="#cfe0e8" stroke="#6a3a22" stroke-width="14"/><line x1="${210 + i * 380}" y1="140" x2="${210 + i * 380}" y2="520" stroke="#6a3a22" stroke-width="6"/>`;
  s += `<rect x="0" y="560" width="${W}" height="520" fill="#8a5a3a"/>${[...Array(12)].map((_, i) => `<path d="M${i * 180},560 L${i * 180 - 140},1080" stroke="#7a4a2a" stroke-width="3"/>`).join('')}`;
  s += thonet(330, 760, 1.2, 1) + rSit(330, 770, 1.6, t, { mode: 'banco', child: false, ph: 2, top: '#2b3a67', hair: '#bbb' }) + cafeTable(460, 760, 1) + `<g transform="translate(450,740)"><rect x="-26" y="-60" width="52" height="60" fill="#fff" stroke="#ddd"/><path d="M-30,-60 L30,-60" stroke="#8a5a3a" stroke-width="5"/><text y="-30" font-family="Fredoka" font-size="11" text-anchor="middle" fill="#333">ZEITUNG</text></g>`;
  s += cafeTable(1300, 790, 1.1) + thonet(1180, 790, 1.2, 1) + thonet(1420, 790, 1.2, -1) + rSit(1180, 800, 1.5, t, { mode: 'banco', ph: 3, top: AT_RED, longhair: true }) + rSit(1420, 800, 1.7, t, { mode: 'banco', child: false, ph: 4, top: '#7a5a8a', talk: true }) + `<g transform="translate(1290,776)"><ellipse rx="30" ry="8" fill="#fff"/><path d="M-14,-24 L14,-24 L10,0 L-10,0Z" fill="#fff"/><ellipse cy="-24" rx="14" ry="4" fill="#6a3a1a"/></g>`;
  s += rP(860, 1000, 2.4, t, VIESC({ ph: 5, top: '#f4f0e8', bot: '#1a1a1a', hold: `<g transform="translate(18,-90)"><ellipse rx="32" ry="7" fill="#d9d1c4"/><path d="M-12,-20 L12,-20 L9,0 L-9,0Z" fill="#fff"/></g>` })) + `<path d="M846,764 l14,8 l14,-8 l-14,-8Z" fill="#1a1a1a" transform="translate(0,0)"/>`;
  return s + rLabel('Cafeterías vienesas: camareros con pajarita y periódicos', W / 2, 140, 38);
};
scenes.vi_franz = function (t) {
  let s = VIALL() + `<rect width="${W}" height="${H}" fill="#f4e6c8"/><rect x="0" y="640" width="${W}" height="440" fill="#c8a070"/><rect x="0" y="600" width="${W}" height="50" fill="#e8e2d4"/>`;
  s += `<g transform="translate(400,600)"><rect x="-140" y="-200" width="280" height="200" fill="#3a3a3e"/><rect x="-110" y="-160" width="220" height="120" fill="#1a1a1a"/><path d="M-90,-80 q20,-30 40,0 q20,-30 40,0 q20,-30 40,0" stroke="#e8642a" stroke-width="8" fill="none"/></g>`;
  s += rP(860, 1000, 2.6, t, VIESC({ ph: 2, top: '#fff', bot: '#3a3a3e', hold: `<g transform="translate(16,-80)"><ellipse cx="20" cy="0" rx="40" ry="16" fill="#d9d1c4"/><path d="M0,0 L-30,-60" stroke="#8a6a46" stroke-width="6"/></g>` })) + `<g transform="translate(860,600)"><path d="M-34,-20 Q-40,-70 0,-76 Q40,-70 34,-20Z" fill="#fff"/></g>`;
  s += `<g transform="translate(1400,600)">${sacher(0, 0, 1.4)}</g>`;
  return s + rLabel('Franz Sacher, de solo 16 años, inventó una tarta (1832)', W / 2, 140, 38);
};
scenes.vi_sacher = function (t) {
  let s = VIALL() + `<rect width="${W}" height="${H}" fill="#fdf3dc"/><rect x="0" y="640" width="${W}" height="440" fill="url(#rWood)"/>`;
  s += plate(860, 820, 360, `<g transform="translate(-40,-10)">${sacher(0, 0, 1.2)}</g>`) + `<g transform="translate(1100,780)">${nata(0, 0, 1.4)}</g>`;
  return s + rArrowLabel('Mermelada de albaricoque', 400, 470, 760, 790, 30) + rArrowLabel('¡Con su nube de nata!', 1500, 500, 1140, 720, 30) + rLabel('La tarta Sacher', W / 2, 140, 46);
};
scenes.vi_strudel = function (t) {
  let s = VIALL() + `<rect width="${W}" height="${H}" fill="#fdf3dc"/><rect x="0" y="640" width="${W}" height="440" fill="url(#rWood)"/>`;
  s += `<g transform="translate(560,760)"><rect x="-300" y="-30" width="600" height="60" fill="#f8f0d8" opacity=".7" stroke="#e8d8a8" stroke-width="3"/><text x="0" y="8" font-family="Fredoka" font-size="20" text-anchor="middle" fill="#8a6a46" opacity=".6">querida… te quiero…</text></g>`;
  s += plate(1340, 840, 260, `<g><path d="M-160,-20 Q-170,-70 -120,-80 L140,-80 Q180,-70 170,-20 Q160,10 120,10 L-120,10 Q-160,10 -160,-20Z" fill="#e8c068"/>${[...Array(6)].map((_, k) => `<path d="M${-120 + k * 50},-80 q20,40 0,90" stroke="#c89a40" stroke-width="4" fill="none"/>`).join('')}<path d="M100,-80 L170,-40 L170,-20 Q160,10 120,10Z" fill="#f4e8c0"/>${[...Array(8)].map((_, k) => `<circle cx="${110 + (k % 3) * 18}" cy="${-50 + Math.floor(k / 3) * 18}" r="7" fill="#e8d870"/>`).join('')}${[...Array(30)].map((_, k) => `<circle cx="${-150 + (k * 23) % 300}" cy="${-80 + (k % 4) * 3}" r="2.5" fill="#fff"/>`).join('')}</g>`);
  return s + rLabel('Strudel de manzana: una masa tan fina que se puede leer a través', W / 2, 140, 36);
};
scenes.vi_prater = function (t) {
  let s = VIALL() + rSky('day') + rSun(300, 140) + rClouds(t, [[1300, 140, .7]]) + `<rect x="0" y="760" width="${W}" height="320" fill="url(#viGrass)"/>` + [...Array(6)].map((_, i) => rTree(60 + i * 360, 790, .7, 'green', t, 360 + i)).join('');
  s += riesenrad(1100, 380, 300, t) + `<rect x="0" y="880" width="${W}" height="200" fill="#c8b48a"/>`;
  return s + viPeople(t, 29, 10, 900, 1070) + rLabel('La noria gigante del Prater (1897): ¡más de 125 años!', W / 2, 140, 38);
};
scenes.vi_cabina = function (t) {
  let s = VIALL() + rSky('day') + `<rect x="0" y="720" width="${W}" height="360" fill="#7aa85a"/>` + viStreet(t, 900, { h: 200, seed: 6 }).replace(/<rect x="0" y="900"/, '<rect opacity=".9" x="0" y="900"');
  s += `<g transform="translate(960,${460 + S(t, 1) * 8})"><rect x="-360" y="-220" width="720" height="380" rx="30" fill="${AT_RED}" stroke="#7a1a1a" stroke-width="8"/><rect x="-380" y="-250" width="760" height="40" rx="12" fill="#8a1a1a"/>${[-240, 0, 240].map(x => `<rect x="${x - 100}" y="-180" width="200" height="190" fill="#cfe6f4" stroke="#7a1a1a" stroke-width="6"/>`).join('')}`;
  s += [-240, 0, 240].map((x, k) => `<g transform="translate(${x},10)"><circle cy="-70" r="${k == 1 ? 20 : 22}" fill="${RSKIN[k + 1]}"/><circle cx="-7" cy="-70" r="2.5" fill="#222"/><circle cx="7" cy="-70" r="2.5" fill="#222"/><path d="M-6,-60 Q0,-55 6,-60" stroke="#7a2a22" stroke-width="2" fill="none"/><path d="M-20,-96 Q0,-110 20,-96 L20,-80 L-20,-80Z" fill="${RHAIRC[k]}"/><path d="M-26,0 L-24,-46 L24,-46 L26,0Z" fill="${['#2b3a67', '#f2c14e', '#3a6a3a'][k]}"/></g>`).join('') + `</g>`;
  return s + rLabel('Cabinas rojas como casitas: cabe una familia entera', W / 2, 1010, 40);
};
scenes.vi_tiovivo = function (t) {
  let s = VIALL() + rSky('day') + `<rect x="0" y="720" width="${W}" height="360" fill="#c8b48a"/>`;
  s += `<g transform="translate(960,840)"><ellipse cx="0" cy="0" rx="420" ry="80" fill="#c8102e"/><rect x="-20" y="-440" width="40" height="440" fill="url(#viGold)"/><path d="M-460,-400 Q0,-560 460,-400 L420,-360 L-420,-360Z" fill="#f2c14e" stroke="#c8102e" stroke-width="8"/>${[...Array(12)].map((_, k) => `<path d="M${-420 + k * 70},-360 q35,30 70,0" fill="${k % 2 ? '#c8102e' : '#fff'}"/>`).join('')}`;
  for (let k = 0; k < 5; k++) { const a = t / L * TAU + k * TAU / 5, x = Math.sin(a) * 360, d = Math.cos(a), y = -120 + S(t, 4, k) * 30; if (d < -0.2) continue; s += `<line x1="${x}" y1="-360" x2="${x}" y2="${y}" stroke="url(#viGold)" stroke-width="6"/><g transform="translate(${x},${y + 90}) scale(${.6 + d * .2})">${lipizzaner(0, 0, .8, t, { col: ['#f4f2ec', '#e8c068', '#c8a0f0', '#8ab0e8', '#f4c8d8'][k], dir: Math.sin(a) > 0 ? -1 : 1 })}</g>`; }
  s += `</g>`;
  return s + rLabel('Tiovivos antiguos, como en una feria eterna', W / 2, 140, 40);
};
scenes.vi_isla = function (t) {
  let s = VIALL() + rSky('day') + rSun(1650, 140) + `<rect x="0" y="520" width="${W}" height="200" fill="url(#viDanube)"/><rect x="0" y="700" width="${W}" height="200" fill="url(#viGrass)"/><rect x="0" y="880" width="${W}" height="200" fill="url(#viDanube)"/>`;
  s += [...Array(6)].map((_, i) => rTree(100 + i * 330, 740, .55, 'green', t, 380 + i)).join('') + `<rect x="0" y="780" width="${W}" height="40" fill="#c8b48a"/>`;
  s += [...Array(3)].map((_, i) => { const p = ((t / L) + i / 3) % 1, x = -200 + p * (W + 400); return bike(x, 810, 1.0, ['#2f6aa8', AT_RED, '#2b2b2b'][i], rider([AT_RED, '#2b3a67', '#f2c14e'][i], RSKIN[i], i, t, i % 2 == 0), t); }).join('');
  s += `<rect x="300" y="960" width="300" height="80" fill="#f2c14e"/><rect x="300" y="960" width="300" height="80" fill="#fff" opacity=".3"/>` + rSit(420, 1000, 1.4, t, { ph: 3, top: AT_RED });
  return s + rLabel('La Isla del Danubio: bicis, prados y baños en verano', W / 2, 140, 40);
};
scenes.vi_secretos = function (t) {
  let s = VIALL() + rSky('dusk') + viStreet(t, 760, { h: 440, seed: 8 }) + `<rect width="${W}" height="${H}" fill="#2b3a67" opacity=".35"/>`;
  return s + `<g transform="translate(960,420)"><rect x="-520" y="-150" width="1040" height="300" rx="36" fill="#fffaf0" stroke="${AT_RED}" stroke-width="8"/><text y="-40" font-family="Fredoka" font-weight="600" font-size="44" text-anchor="middle" fill="${AT_RED}">Secretos de explorador</text><text y="70" font-family="Fredoka" font-weight="700" font-size="90" text-anchor="middle" fill="#2b3a67">1 · 2 · 3</text></g>`;
};
scenes.vi_coro = function (t) {
  let s = VIALL() + `<rect width="${W}" height="${H}" fill="#f4ead4"/><path d="M200,0 L200,700 Q960,560 1720,700 L1720,0Z" fill="#e8dcc0"/>${[...Array(5)].map((_, i) => `<path d="M${300 + i * 330},640 L${300 + i * 330},200 Q${420 + i * 330},120 ${540 + i * 330},200 L${540 + i * 330},640" fill="#cfe0f0" stroke="url(#viGold)" stroke-width="10"/>`).join('')}<rect x="0" y="760" width="${W}" height="320" fill="#b8a080"/>`;
  for (let r = 0; r < 2; r++) for (let i = 0; i < 9; i++) { const x = 300 + i * 165 + (r % 2) * 80, y = 860 + r * 130, sc = 1.7 + r * .2; s += rP(x, y, sc, t, VIESC({ ph: i + r * 9, child: true, top: '#1f2a5a', bot: '#1f2a5a' })) + `<g transform="translate(${x},${y}) scale(${sc})"><path d="M-15,-78 L0,-62 L15,-78 L15,-70 L0,-54 L-15,-70Z" fill="#fff"/><path d="M-6,-66 L6,-66" stroke="#fff" stroke-width="2"/><ellipse cx="0" cy="${-96 - 15 * 1.0}" rx="${15}" ry="5" fill="#fff" opacity="0"/></g>`; }
  s += [...Array(5)].map((_, i) => { const p = (t / L * 2 + i / 5) % 1; return `<text x="${500 + i * 220}" y="${680 - p * 220}" font-size="52" fill="#d9b14a" opacity="${1 - p}">♪</text>`; }).join('');
  return s + rLabel('Los Niños Cantores de Viena: ¡más de 500 años cantando!', W / 2, 140, 38);
};
scenes.vi_hundertwasser = function (t) {
  let s = VIALL() + rSky('day') + rSun(1700, 130);
  const cols = ['#e8352a', '#f2c14e', '#3a8ad0', '#7ac06a', '#f4f0e6', '#ff8a2a', '#c8a0f0'];
  s += `<g>${[...Array(5)].map((_, b) => { const x0 = 300 + b * 270, h = 440 + (b % 2) * 80; let o = ''; for (let r = 0; r < 6; r++) { const y = 860 - (r + 1) * (h / 6); o += `<path d="M${x0},${y + h / 6} Q${x0 + 135},${y + h / 6 + (r % 2 ? 14 : -14)} ${x0 + 270},${y + h / 6} L${x0 + 270},${y} Q${x0 + 135},${y + (r % 2 ? -14 : 14)} ${x0},${y}Z" fill="${cols[(b + r) % 7]}"/>`; } return o; }).join('')}</g>`;
  for (let k = 0; k < 18; k++) { const x = 330 + (k * 73) % 1300, y = 440 + (k * 47) % 360, w = 30 + (k % 4) * 14, h = 40 + (k % 3) * 16; s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#2a3440" stroke="#f4f0e6" stroke-width="5" rx="${k % 2 ? w / 2 : 3}"/>`; }
  s += `<g transform="translate(1150,330)"><circle r="56" fill="url(#viGold)"/><rect x="-6" y="-90" width="12" height="40" fill="url(#viGold)"/></g>${rTree(560, 420, .5, 'green', t, 401)}${rTree(1320, 360, .55, 'green', t, 402)}${rTree(880, 560, .4, 'green', t, 403)}`;
  s += `<path d="M0,860 Q240,830 480,870 T960,860 T1440,875 T1920,860 L1920,1080 L0,1080Z" fill="#b8a888"/>`;
  return s + viPeople(t, 31, 8, 900, 1070) + rLabel('La casa Hundertwasser: colores, suelos ondulados y árboles en las ventanas', W / 2, 140, 34);
};
scenes.vi_palmenhaus = function (t) {
  let s = VIALL() + `<rect width="${W}" height="${H}" fill="#cfd8e0"/>${[...Array(40)].map((_, i) => `<circle cx="${(i * 131) % W}" cy="${((i * 97) + t / L * 400) % H}" r="5" fill="#fff"/>`).join('')}<rect x="0" y="820" width="${W}" height="260" fill="#f4f6f8"/>`;
  s += `<g transform="translate(960,820)"><path d="M-760,0 L-760,-260 Q-760,-420 -480,-440 L-300,-440 Q-300,-640 0,-660 Q300,-640 300,-440 L480,-440 Q760,-420 760,-260 L760,0Z" fill="#cfe8e0" opacity=".75" stroke="#3a5a4a" stroke-width="8"/>${[...Array(30)].map((_, k) => `<line x1="${-740 + k * 51}" y1="0" x2="${-740 + k * 51}" y2="${-260 - Math.max(0, 300 - Math.abs(-740 + k * 51)) * .9}" stroke="#3a5a4a" stroke-width="3"/>`).join('')}`;
  for (const [x, h] of [[-500, 300], [-200, 480], [120, 520], [420, 340], [620, 220]]) s += `<path d="M${x},0 Q${x + 10},${-h / 2} ${x},${-h}" stroke="#7a5a3a" stroke-width="16" fill="none"/>${[...Array(7)].map((_, k) => `<path d="M${x},${-h} q${Math.cos(k * .9) * 120},${-20 + Math.sin(k * .9) * 40} ${Math.cos(k * .9) * 160},${40 + Math.sin(k * .9) * 50}" stroke="#2f8a3a" stroke-width="18" fill="none" stroke-linecap="round"/>`).join('')}`;
  s += `<rect x="-60" y="-140" width="120" height="140" fill="#3a5a4a"/></g>`;
  s += rP(500, 1000, 2.2, t, { ph: 2, child: true, top: AT_RED, cap: '#2b3a67' }) + rP(640, 1010, 2.0, t, { ph: 4, child: true, top: '#2f6aa8', longhair: true });
  return s + rLabel('Una casa de cristal con una selva dentro, aunque fuera nieve', W / 2, 1010, 36);
};
scenes.vi_pregunta = function (t) {
  let s = VIALL() + `<rect width="${W}" height="${H}" fill="#2b3a67"/>` + [...Array(14)].map((_, i) => `<text x="${(i * 157) % W}" y="${((i * 97) + t / L * 300) % H}" font-family="Fredoka" font-weight="700" font-size="${60 + (i % 3) * 20}" fill="${AT_RED}" opacity=".35">?</text>`).join('');
  s += `<g transform="translate(960,260)"><rect x="-600" y="-90" width="1200" height="180" rx="36" fill="#fff"/><text y="20" font-family="Fredoka" font-weight="700" font-size="56" text-anchor="middle" fill="#2b3a67">Si vinierais a Viena, ¿qué haríais primero?</text></g>`;
  const opt = (x, txt, inner) => `<g transform="translate(${x},680)"><rect x="-260" y="-200" width="520" height="400" rx="30" fill="#fff" stroke="${AT_RED}" stroke-width="6"/>${inner}<text y="160" font-family="Fredoka" font-weight="700" font-size="32" text-anchor="middle" fill="#2b3a67">${txt}</text></g>`;
  s += opt(360, 'Ver bailar un caballo blanco', `<g transform="translate(-20,90)">${lipizzaner(0, 0, .9, t, { rear: 20 })}</g>`) + opt(960, 'Perderse en el laberinto', `<g transform="translate(0,20)">${[...Array(4)].map((_, k) => `<rect x="${-140 + k * 20}" y="${-110 + k * 30}" width="${280 - k * 40}" height="14" fill="#2f6a2a"/>`).join('')}<rect x="-140" y="-110" width="14" height="140" fill="#2f6a2a"/><rect x="126" y="-110" width="14" height="140" fill="#2f6a2a"/></g>`) + opt(1560, 'Probar la tarta Sacher', `<g transform="translate(0,30)">${sacher(0, 0, .9)}</g>`);
  return s;
};
scenes.vi_despedida = function (t) {
  let s = VIALL() + rSky('dusk') + rSun(1500, 420, 70) + riesenrad(1500, 420, 220, t) + baroque(-20, 800, 480, 420) + baroque(440, 800, 420, 460, { dome: true }) + `<rect x="0" y="800" width="${W}" height="280" fill="#a89a8a"/>`;
  return s + `<g transform="translate(${W / 2 - 160},${H / 2 - 260}) scale(${1 + S(t, 2) * .01})"><rect x="-560" y="-150" width="1120" height="300" rx="40" fill="#fff" opacity=".95" stroke="#2b3a67" stroke-width="6"/><text x="0" y="-20" font-family="Fredoka" font-weight="700" font-size="96" text-anchor="middle" fill="${AT_RED}" stroke="#2b3a67" stroke-width="2" paint-order="stroke">¡Servus, Viena!</text><text x="0" y="90" font-family="Fredoka" font-weight="600" font-size="48" text-anchor="middle" fill="#2b3a67">¡Gracias, Lucas!</text></g>`;
};
scenes.vi_resumen = function (t) {
  const card = (i, inner, label) => { const x = 140 + i * 430, r = (i - 1.5) * 3; return `<g transform="translate(${x},${360 + (i % 2) * 70}) rotate(${r})"><rect x="-4" y="-2" width="380" height="440" fill="#000" opacity=".25"/><rect x="-12" y="-12" width="380" height="440" fill="#fff"/><circle cx="178" cy="-4" r="12" fill="#e8352a"/><svg x="0" y="0" width="356" height="330" viewBox="0 0 356 330">${inner}</svg><text x="178" y="390" font-family="Fredoka" font-weight="700" font-size="32" text-anchor="middle" fill="#2b3a67">${label}</text></g>`; };
  let s = VIALL() + `<rect width="${W}" height="${H}" fill="#b9895a"/><rect x="30" y="30" width="${W - 60}" height="${H - 60}" fill="none" stroke="#7a5232" stroke-width="30"/>`;
  s += card(0, `<rect width="356" height="330" fill="#3a4a5a"/><g transform="translate(178,150) scale(.8)"><circle cx="0" cy="-20" r="46" fill="#e8c4a0"/><path d="M-50,-20 Q-50,-76 0,-76 Q50,-76 50,-20 Q40,-50 0,-52 Q-40,-50 -50,-20Z" fill="#f4f0e8"/><circle cx="-16" cy="-20" r="4" fill="#222"/><circle cx="16" cy="-20" r="4" fill="#222"/><path d="M-80,130 Q-80,40 0,30 Q80,40 80,130Z" fill="${AT_RED}"/></g>`, 'Mozart de niño');
  s += card(1, `<rect width="356" height="330" fill="#8ac8e8"/><rect y="230" width="356" height="100" fill="#7aa85a"/><g transform="translate(140,270) scale(.6)"><ellipse cx="0" cy="-70" rx="90" ry="70" fill="#f4f4f0"/><circle cx="0" cy="-170" r="60" fill="#f4f4f0"/><circle cx="-46" cy="-216" r="20" fill="#1a1a1a"/><circle cx="46" cy="-216" r="20" fill="#1a1a1a"/><ellipse cx="-22" cy="-176" rx="14" ry="18" fill="#1a1a1a"/><ellipse cx="22" cy="-176" rx="14" ry="18" fill="#1a1a1a"/></g>`, 'El zoo más antiguo');
  s += card(2, `<rect width="356" height="330" fill="#f8f4ea"/><g transform="translate(150,300) scale(.9)">${lipizzaner(0, 0, 1, 0, { rear: 22 })}</g>`, 'Caballos que bailan');
  s += card(3, `<rect width="356" height="330" fill="#fdf3dc"/><g transform="translate(170,200)">${sacher(0, 0, .9)}</g>`, 'La tarta Sacher');
  return s + rLabel('Hoy hemos…', W / 2, 140, 44);
};
scenes.vi_cuaderno = function (t) {
  let s = VIALL() + `<rect width="${W}" height="${H}" fill="#f4e6cc"/><rect x="0" y="760" width="${W}" height="320" fill="url(#rWood)"/>`;
  s += `<g transform="translate(960,640) rotate(-3)">${rShadow(0, 120, 560, .3)}<rect x="-560" y="-400" width="1120" height="520" rx="20" fill="#fffaf0" stroke="#c9a468" stroke-width="6"/><line x1="0" y1="-400" x2="0" y2="120" stroke="#c9a468" stroke-width="6"/>${[...Array(8)].map((_, k) => `<line x1="-520" y1="${-320 + k * 56}" x2="-40" y2="${-320 + k * 56}" stroke="#e8dcc0" stroke-width="3"/><line x1="40" y1="${-320 + k * 56}" x2="520" y2="${-320 + k * 56}" stroke="#e8dcc0" stroke-width="3"/>`).join('')}
  <g transform="translate(-280,40) scale(1.1)">${lipizzaner(0, 0, 1, 0, { rear: 20 }).replace(/fill="#f4f2ec"/g, 'fill="#fffaf0" stroke="#2b3a67" stroke-width="5"')}</g><g transform="translate(260,-60)">${riesenrad(0, 0, 150, 0).replace(/#8a3a3a|#7a2a2a/g, '#2b3a67')}</g></g>`;
  s += `<g transform="translate(1420,840) rotate(-30)"><rect x="-10" y="-120" width="20" height="200" fill="${AT_RED}"/><path d="M-10,80 L0,110 L10,80Z" fill="#2b3a67"/></g>`;
  return s + rLabel('Dibujen un caballo blanco, un palacio amarillo o una cabina de noria', W / 2, 140, 34);
};
scenes.vi_atardecer = function (t) {
  let s = VIALL() + rSky('dusk') + rSun(1500, 420, 80) + stephansdom(1500, 820, .6) + riesenrad(400, 460, 200, t) + `<rect x="0" y="820" width="${W}" height="260" fill="#6a5a62"/>`;
  return s + viPeople(t, 37, 8, 860, 1060);
};
