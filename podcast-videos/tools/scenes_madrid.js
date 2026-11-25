/* =====================================================================
   Mi Pequeño Atlas — Capítulo 4: Madrid. Escenas realistas.
   ===================================================================== */
const MA = `<defs>
<linearGradient id="maGran" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4f1ea"/><stop offset="1" stop-color="#d9d3c6"/></linearGradient>
<linearGradient id="maBrick" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b8563a"/><stop offset="1" stop-color="#94402a"/></linearGradient>
<linearGradient id="maSlate" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3a4250"/><stop offset=".5" stop-color="#6a7484"/><stop offset="1" stop-color="#343a46"/></linearGradient>
<linearGradient id="maLake" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7fb2c8"/><stop offset="1" stop-color="#3f7a96"/></linearGradient>
<linearGradient id="maGrass" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8cbf6a"/><stop offset="1" stop-color="#5f9a48"/></linearGradient>
<linearGradient id="maChoc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a2e1a"/><stop offset="1" stop-color="#3a1a0e"/></linearGradient>
<linearGradient id="maGold" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#b8892a"/><stop offset=".5" stop-color="#f2d27a"/><stop offset="1" stop-color="#a87a22"/></linearGradient>
</defs>`;
const MAALL = () => D() + MA;
const ESC = (o = {}) => Object.assign({ walk: false }, o);

/* ---------- piezas ---------- */
function esFlag(x, y, s = 1) { return `<g transform="translate(${x},${y}) scale(${s})"><line x1="0" y1="0" x2="0" y2="130" stroke="#555" stroke-width="4"/><rect x="0" y="0" width="96" height="16" fill="#c60b1e"/><rect x="0" y="16" width="96" height="32" fill="#ffc400"/><rect x="0" y="48" width="96" height="16" fill="#c60b1e"/><rect x="20" y="22" width="12" height="18" rx="2" fill="#ad1519" opacity=".8"/></g>`; }
function doFlag(x, y, s = 1) { return `<g transform="translate(${x},${y}) scale(${s})"><line x1="0" y1="0" x2="0" y2="130" stroke="#555" stroke-width="4"/><rect x="0" y="0" width="44" height="30" fill="#002d62"/><rect x="52" y="0" width="44" height="30" fill="#ce1126"/><rect x="0" y="38" width="44" height="30" fill="#ce1126"/><rect x="52" y="38" width="44" height="30" fill="#002d62"/><rect x="44" y="0" width="8" height="68" fill="#fff"/><rect x="0" y="30" width="96" height="8" fill="#fff"/></g>`; }
function sky(t, kind = 'day', sun = [1600, 160]) { return rSky(kind) + (kind == 'day' ? rSun(sun[0], sun[1]) + rClouds(t, [[300, 120, .8], [1200, 90, .6]]) : ''); }
function maCrowd(t, seed, n, y0, y1) { return rCrowd(t, seed, n, y0, y1, { tops: ['#2b3a67', '#e8e2d4', '#c8323a', '#5a7a5a', '#f2c14e', '#7a5a8a', '#333', '#a67c52'] }); }
function street(y0) { return `<rect x="0" y="${y0}" width="${W}" height="${H - y0}" fill="#b9b2a4"/>${[...Array(14)].map((_, i) => `<line x1="${i * 150}" y1="${y0}" x2="${i * 150 - 80}" y2="${H}" stroke="#a49c8e" stroke-width="3"/>`).join('')}<rect x="0" y="${y0}" width="${W}" height="8" fill="#8d877c"/>`; }
function madridBlock(x, base, w, h, col = '#e9dcc4', roof = '#6a7484') {
  let s = `<rect x="${x}" y="${base - h}" width="${w}" height="${h}" fill="${col}"/><rect x="${x + w - 14}" y="${base - h}" width="14" height="${h}" fill="#000" opacity=".07"/><rect x="${x - 6}" y="${base - h - 12}" width="${w + 12}" height="14" fill="#cfc4ae"/><path d="M${x},${base - h - 12} L${x + 20},${base - h - 50} L${x + w - 20},${base - h - 50} L${x + w},${base - h - 12}Z" fill="${roof}"/>`;
  const cols = Math.max(2, Math.floor(w / 70)), rows = Math.floor((h - 100) / 80);
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const wx = x + 16 + c * (w - 32) / cols, wy = base - h + 26 + r * 80, ww = (w - 32) / cols - 22;
    s += `<rect x="${wx}" y="${wy}" width="${ww}" height="50" fill="#3a3f4a"/><rect x="${wx - 4}" y="${wy + 46}" width="${ww + 8}" height="6" fill="#2a2a2a"/>${[...Array(4)].map((_, k) => `<line x1="${wx - 2 + k * (ww + 4) / 3}" y1="${wy + 34}" x2="${wx - 2 + k * (ww + 4) / 3}" y2="${wy + 50}" stroke="#2a2a2a" stroke-width="2"/>`).join('')}<line x1="${wx - 4}" y1="${wy + 34}" x2="${wx + ww + 4}" y2="${wy + 34}" stroke="#2a2a2a" stroke-width="2"/>`; }
  s += `<rect x="${x}" y="${base - 80}" width="${w}" height="80" fill="#8a7a64"/><rect x="${x + w * .1}" y="${base - 70}" width="${w * .8}" height="62" fill="#4a5a6a"/><rect x="${x + w * .1}" y="${base - 70}" width="${w * .8}" height="62" fill="#fff" opacity=".12"/>`;
  return s;
}
function metropolis(cx, base, s = 1) {
  return `<g transform="translate(${cx},${base}) scale(${s})">
  <rect x="-260" y="-560" width="520" height="560" fill="url(#maGran)"/><rect x="-150" y="-640" width="300" height="80" fill="#efe9dc"/>
  ${[...Array(6)].map((_, i) => `<rect x="${-230 + i * 88}" y="-540" width="20" height="300" fill="#e2dccd"/><rect x="${-205 + i * 88}" y="-520" width="44" height="90" fill="#3a3f4a"/><rect x="${-205 + i * 88}" y="-400" width="44" height="90" fill="#3a3f4a"/><rect x="${-205 + i * 88}" y="-200" width="44" height="80" fill="#3a3f4a"/>`).join('')}
  <rect x="-270" y="-250" width="540" height="20" fill="#d9d1bf"/><rect x="-200" y="-110" width="400" height="110" fill="#4a5a6a"/>
  ${[...Array(8)].map((_, i) => `<rect x="${-140 + i * 38}" y="-640" width="10" height="80" fill="#d9d1bf"/>`).join('')}
  <path d="M-150,-640 Q-150,-780 0,-800 Q150,-780 150,-640Z" fill="#2a2e38"/>${[...Array(7)].map((_, i) => `<path d="M${-150 + i * 50},-640 Q${-130 + i * 44},-740 0,-800" stroke="url(#maGold)" stroke-width="5" fill="none"/>`).join('')}
  <rect x="-160" y="-650" width="320" height="16" fill="url(#maGold)"/><rect x="-20" y="-840" width="40" height="44" fill="#2a2e38"/>
  <g transform="translate(0,-850)" fill="url(#maGold)"><path d="M-8,0 L8,0 L6,-60 L-6,-60Z"/><circle cx="0" cy="-70" r="10"/><path d="M-4,-56 Q-60,-90 -70,-30 Q-40,-60 -4,-46Z"/><path d="M4,-56 Q60,-90 70,-30 Q40,-60 4,-46Z"/><path d="M6,-64 L30,-100" stroke="#d9b04a" stroke-width="5"/></g></g>`;
}
function equestrian(x, base, s = 1, col = '#4a5a52') {
  return `<g transform="translate(${x},${base}) scale(${s})">${rShadow(0, 0, 120)}<rect x="-90" y="-160" width="180" height="160" fill="#cfc6b4"/><rect x="-104" y="-176" width="208" height="20" fill="#bdb3a0"/><rect x="-104" y="-10" width="208" height="14" fill="#bdb3a0"/>
  <g transform="translate(0,-176)" fill="${col}"><path d="M-70,-10 L-60,-70 Q-20,-100 40,-90 Q70,-120 90,-110 L96,-90 L70,-80 L60,-60 L64,-10 L52,-10 L46,-50 L-30,-50 L-40,-10 L-54,-10 L-50,-46Z"/><path d="M-70,-70 Q-100,-60 -96,-20" stroke="${col}" stroke-width="10" fill="none"/>
  <path d="M-10,-90 L-6,-150 L14,-150 L18,-90Z"/><circle cx="4" cy="-166" r="16"/><path d="M-12,-176 L20,-176 L4,-198Z"/></g></g>`;
}
function plazaMayor(t, crowd = true) {
  let s = sky(t, 'day', [1650, 130]);
  const fac = (x0, w, base, h) => { let o = `<rect x="${x0}" y="${base - h}" width="${w}" height="${h}" fill="url(#maBrick)"/>`;
    for (let i = 0; i < w / 110; i++) { const x = x0 + 20 + i * 110; for (let r = 0; r < 3; r++) o += `<rect x="${x + 18}" y="${base - h + 30 + r * 110}" width="54" height="80" fill="#2f2f36"/><rect x="${x + 10}" y="${base - h + 106 + r * 110}" width="70" height="8" fill="#2a2a2a"/>${[...Array(5)].map((_, k) => `<line x1="${x + 12 + k * 16}" y1="${base - h + 88 + r * 110}" x2="${x + 12 + k * 16}" y2="${base - h + 106 + r * 110}" stroke="#2a2a2a" stroke-width="3"/>`).join('')}<rect x="${x + 14}" y="${base - h + 86 + r * 110}" width="62" height="4" fill="#2a2a2a"/>`;
      o += `<rect x="${x}" y="${base - 130}" width="12" height="130" fill="#d9cfb8"/><path d="M${x + 12},${base} L${x + 12},${base - 100} Q${x + 55},${base - 140} ${x + 98},${base - 100} L${x + 98},${base}Z" fill="#3a2a22"/>`; }
    return o + `<rect x="${x0}" y="${base - 140}" width="${w}" height="14" fill="#d9cfb8"/><rect x="${x0 - 4}" y="${base - h - 16}" width="${w + 8}" height="18" fill="#d9cfb8"/><path d="M${x0},${base - h - 16} L${x0 + 30},${base - h - 60} L${x0 + w - 30},${base - h - 60} L${x0 + w},${base - h - 16}Z" fill="url(#maSlate)"/>${[...Array(Math.floor(w / 110))].map((_, i) => `<rect x="${x0 + 50 + i * 110}" y="${base - h - 52}" width="20" height="26" fill="#efe6d2"/>`).join('')}`; };
  s += fac(-20, 1980, 780, 520);
  // Casa de la Panadería: torres con chapiteles de pizarra
  s += `<g>${[520, 1400].map(x => `<rect x="${x - 50}" y="-0" width="0" height="0"/><path d="M${x - 60},${260} L${x + 60},${260} L${x + 60},${200} L${x - 60},${200}Z" fill="url(#maBrick)"/><path d="M${x - 60},200 L${x},20 L${x + 60},200Z" fill="url(#maSlate)"/><rect x="${x - 4}" y="-10" width="8" height="34" fill="#555"/><circle cx="${x}" cy="-14" r="8" fill="url(#maGold)"/>`).join('')}
  </g>`;
  s += `<rect x="0" y="780" width="${W}" height="300" fill="#c9bca2"/>${[...Array(12)].map((_, i) => `<line x1="${i * 180 - 100}" y1="780" x2="${i * 180 - 400}" y2="${H}" stroke="#b8ab90" stroke-width="3"/>`).join('')}`;
  s += equestrian(960, 900, .9);
  if (crowd) s += maCrowd(t, 41, 16, 820, 1070);
  return s;
}
function palacioReal(cx, base, s = 1) {
  let o = `<g transform="translate(${cx},${base}) scale(${s})"><rect x="-760" y="-440" width="1520" height="440" fill="url(#maGran)"/><rect x="-780" y="-130" width="1560" height="130" fill="#d9d1bf"/>`;
  for (let i = 0; i < 18; i++) { const x = -720 + i * 84; o += `<rect x="${x}" y="-120" width="40" height="90" rx="20" fill="#3a3f4a"/><rect x="${x}" y="-380" width="40" height="90" fill="#3a3f4a"/><rect x="${x - 6}" y="-392" width="52" height="10" fill="#cfc6b4"/><rect x="${x}" y="-260" width="40" height="70" fill="#3a3f4a"/>`; if (i % 2 == 0) o += `<rect x="${x - 26}" y="-410" width="14" height="280" fill="#e8e2d4"/>`; }
  o += `<rect x="-200" y="-470" width="400" height="470" fill="#efe9dc"/>${[...Array(6)].map((_, i) => `<rect x="${-180 + i * 68}" y="-440" width="22" height="310" fill="#fff"/>`).join('')}<rect x="-90" y="-120" width="180" height="120" rx="20" fill="#3a3f4a"/>`;
  o += `<rect x="-790" y="-470" width="1580" height="30" fill="#d9d1bf"/>${[...Array(40)].map((_, i) => `<rect x="${-780 + i * 40}" y="-500" width="16" height="30" fill="#e8e2d4"/>`).join('')}<rect x="-790" y="-508" width="1580" height="10" fill="#d9d1bf"/>${[...Array(12)].map((_, i) => `<g transform="translate(${-720 + i * 130},-508)"><rect x="-8" y="-40" width="16" height="40" fill="#cfc6b4"/><circle cx="0" cy="-48" r="10" fill="#cfc6b4"/></g>`).join('')}
  <path d="M-120,-470 L120,-470 L100,-540 L-100,-540Z" fill="#e8e2d4"/><circle cx="0" cy="-505" r="22" fill="url(#maGold)"/>${esFlag(-48, -660, .9)}</g>`;
  return o;
}
function casaCorreos(cx, base, s = 1, t = 0) {
  return `<g transform="translate(${cx},${base}) scale(${s})"><rect x="-560" y="-330" width="1120" height="330" fill="url(#maBrick)"/>${[...Array(12)].map((_, i) => `<rect x="${-520 + i * 90}" y="-300" width="44" height="70" fill="#f4efe4"/><rect x="${-514 + i * 90}" y="-294" width="32" height="58" fill="#3a3f4a"/><rect x="${-520 + i * 90}" y="-190" width="44" height="80" fill="#f4efe4"/><rect x="${-514 + i * 90}" y="-184" width="32" height="68" fill="#3a3f4a"/>`).join('')}
  <rect x="-140" y="-120" width="280" height="120" fill="#efe6d2"/>${[0, 1, 2].map(i => `<path d="M${-110 + i * 80},0 L${-110 + i * 80},-80 Q${-80 + i * 80},-110 ${-50 + i * 80},-80 L${-50 + i * 80},0Z" fill="#3a2a22"/>`).join('')}
  <rect x="-580" y="-344" width="1160" height="18" fill="#efe6d2"/><rect x="-160" y="-400" width="320" height="60" fill="#efe6d2"/><path d="M-170,-400 L0,-450 L170,-400Z" fill="#e2d8c2"/>
  <g transform="translate(0,-450)"><rect x="-50" y="-170" width="100" height="170" fill="#efe6d2"/><circle cx="0" cy="-110" r="38" fill="#fbf8f0" stroke="#2a2a2a" stroke-width="4"/><line x1="0" y1="-110" x2="${Math.sin(t / L * TAU) * 26}" y2="${-110 - Math.cos(t / L * TAU) * 26}" stroke="#2a2a2a" stroke-width="4"/><line x1="0" y1="-110" x2="16" y2="-110" stroke="#2a2a2a" stroke-width="5"/>
  <path d="M-46,-170 L0,-250 L46,-170Z" fill="url(#maSlate)"/><path d="M-26,-250 Q0,-300 26,-250" stroke="#2a2a2a" stroke-width="5" fill="none"/><circle cx="0" cy="-276" r="18" fill="none" stroke="url(#maGold)" stroke-width="5"/><line x1="0" y1="-300" x2="0" y2="-330" stroke="#2a2a2a" stroke-width="4"/></g></g>`;
}
function osoMadrono(x, base, s = 1) {
  return `<g transform="translate(${x},${base}) scale(${s})">${rShadow(0, 0, 90)}<rect x="-70" y="-120" width="140" height="120" fill="#e2d8c2"/><rect x="-80" y="-130" width="160" height="16" fill="#cfc4ae"/>
  <g transform="translate(0,-130)"><path d="M10,0 L4,-200" stroke="#4a3a2a" stroke-width="16"/>${[...Array(9)].map((_, i) => `<circle cx="${-40 + (i % 3) * 40}" cy="${-230 - Math.floor(i / 3) * 34}" r="34" fill="#3f5a3a"/>`).join('')}${[...Array(8)].map((_, i) => `<circle cx="${-50 + (i * 23) % 100}" cy="${-220 - (i * 17) % 80}" r="6" fill="#c8323a"/>`).join('')}
  <path d="M-60,0 L-56,-60 Q-60,-120 -20,-150 Q10,-170 20,-150 L30,-120 Q40,-90 30,-60 L34,0 L18,0 L14,-40 L-30,-40 L-40,0Z" fill="#3a3632"/><circle cx="14" cy="-160" r="24" fill="#3a3632"/><circle cx="2" cy="-180" r="8" fill="#3a3632"/><circle cx="30" cy="-182" r="8" fill="#3a3632"/><path d="M28,-140 L10,-190" stroke="#3a3632" stroke-width="14" stroke-linecap="round"/></g></g>`;
}
function prado(cx, base, s = 1) {
  let o = `<g transform="translate(${cx},${base}) scale(${s})"><rect x="-820" y="-300" width="1640" height="300" fill="url(#maBrick)"/>`;
  for (let i = 0; i < 16; i++) { const x = -790 + i * 104; if (Math.abs(x + 20) < 260) continue; o += `<rect x="${x}" y="-260" width="44" height="80" fill="#e2d8c2"/><rect x="${x + 8}" y="-250" width="28" height="64" fill="#5a5048" opacity=".5"/><rect x="${x - 10}" y="-140" width="64" height="140" fill="#e8e0cc"/><rect x="${x}" y="-120" width="44" height="100" rx="22" fill="#d8cdb4"/>`; }
  o += `<rect x="-830" y="-316" width="1660" height="20" fill="#e8e0cc"/><rect x="-260" y="-380" width="520" height="380" fill="#efe8d6"/>${[...Array(6)].map((_, i) => `<rect x="${-230 + i * 88}" y="-340" width="34" height="340" fill="#f8f4ea"/><line x1="${-222 + i * 88}" y1="-340" x2="${-222 + i * 88}" y2="0" stroke="#e2dac6" stroke-width="3"/><line x1="${-205 + i * 88}" y1="-340" x2="${-205 + i * 88}" y2="0" stroke="#e2dac6" stroke-width="3"/>`).join('')}
  <rect x="-270" y="-394" width="540" height="20" fill="#e2dac6"/><rect x="-200" y="-450" width="400" height="56" fill="#efe8d6"/><path d="M-210,-450 L210,-450 L190,-470 L-190,-470Z" fill="#e2dac6"/><rect x="-170" y="-438" width="340" height="30" fill="#cfc4ae"/>
  <rect x="-260" y="0" width="520" height="20" fill="#d8cdb4"/></g>`;
  return o;
}
function statueMan(x, base, s = 1) {
  return `<g transform="translate(${x},${base}) scale(${s})">${rShadow(0, 0, 70)}<rect x="-50" y="-150" width="100" height="150" fill="#cfc6b4"/><rect x="-60" y="-162" width="120" height="16" fill="#bdb3a0"/>
  <g transform="translate(0,-162)" fill="#5a6a62"><path d="M-30,0 L-26,-90 Q-40,-120 -24,-150 L24,-150 Q40,-120 26,-90 L30,0Z"/><circle cx="0" cy="-170" r="20"/><path d="M-20,-182 Q0,-200 20,-182 L20,-170 L-20,-170Z" fill="#4a5a52"/><path d="M24,-140 Q60,-120 62,-90" stroke="#5a6a62" stroke-width="14" fill="none"/><path d="M-24,-140 Q-50,-110 -44,-80" stroke="#5a6a62" stroke-width="14" fill="none"/></g></g>`;
}
function cibeles(cx, base, s = 1, t = 0) {
  return `<g transform="translate(${cx},${base}) scale(${s})"><ellipse cx="0" cy="0" rx="420" ry="70" fill="#cfc6b4"/><ellipse cx="0" cy="-6" rx="390" ry="58" fill="url(#maLake)"/>
  ${[...Array(10)].map((_, i) => `<path d="M${-300 + i * 66},-10 q${10 + S(t, 4, i) * 4},-90 ${20},-140" stroke="#cfeaf4" stroke-width="5" fill="none" opacity=".75"/>`).join('')}
  <rect x="-120" y="-150" width="240" height="140" fill="#e2d8c2"/><g fill="#d6ccb6"><path d="M-250,-40 L-250,-110 Q-240,-150 -190,-150 L-110,-150 L-110,-40Z"/><path d="M250,-40 L250,-110 Q240,-150 190,-150 L110,-150 L110,-40Z"/></g>
  <g fill="#c9bfa8"><circle cx="-180" cy="-180" r="40"/><circle cx="180" cy="-180" r="40"/><path d="M-160,-150 L-120,-150 L-130,-210 Q-150,-230 -160,-200Z"/><path d="M160,-150 L120,-150 L130,-210 Q150,-230 160,-200Z"/></g>
  <path d="M-150,-150 Q0,-170 150,-150 L130,-260 L-130,-260Z" fill="#e8e0cc"/><circle cx="0" cy="-200" r="56" fill="none" stroke="#d6ccb6" stroke-width="16"/>
  <g transform="translate(20,-260)" fill="#efe8d6"><path d="M-50,0 L50,0 L40,-120 L-40,-120Z"/><circle cx="0" cy="-140" r="24"/><path d="M-20,-164 L-14,-184 L0,-170 L14,-184 L20,-164Z" fill="url(#maGold)"/><path d="M40,-100 L80,-140" stroke="#efe8d6" stroke-width="12"/></g></g>`;
}
function churro(x, y, r = 0, s = 1) { return `<g transform="translate(${x},${y}) rotate(${r}) scale(${s})"><path d="M-170,-14 Q0,-30 170,-14 L170,14 Q0,30 -170,14Z" fill="#d9a04a"/>${[-8, 0, 8].map(k => `<path d="M-166,${k} Q0,${k * 1.8} 166,${k}" stroke="#a8702a" stroke-width="3" fill="none"/>`).join('')}${[...Array(14)].map((_, i) => `<circle cx="${-150 + i * 22}" cy="${(i % 3 - 1) * 8}" r="2.5" fill="#fff" opacity=".8"/>`).join('')}</g>`; }
function chocoCup(x, y, s = 1) { return `<g transform="translate(${x},${y}) scale(${s})">${rShadow(0, 60, 160, .25)}<ellipse cx="0" cy="60" rx="170" ry="34" fill="#fbfbf7"/><path d="M-110,-80 L110,-80 L90,50 Q0,70 -90,50Z" fill="#fbfbf7"/><path d="M110,-50 Q170,-40 150,10 Q130,30 100,20" stroke="#fbfbf7" stroke-width="18" fill="none"/><ellipse cx="0" cy="-80" rx="110" ry="24" fill="url(#maChoc)"/><ellipse cx="-30" cy="-84" rx="30" ry="6" fill="#7a4a2a" opacity=".7"/></g>`; }
function steam(x, y, t, n = 3) { return [...Array(n)].map((_, i) => `<path d="M${x + (i - 1) * 40},${y} q${20 + S(t, 2, i) * 10},-50 0,-100 q-20,-50 0,-100" stroke="#fff" stroke-width="10" fill="none" opacity="${.35 + .2 * S(t, 2, i)}" stroke-linecap="round"/>`).join(''); }
function plate(x, y, rx = 260, inner = '') { return `<g transform="translate(${x},${y})">${rShadow(0, 40, rx, .25)}<ellipse rx="${rx}" ry="${rx * .32}" fill="#fbfbf7"/><ellipse rx="${rx * .76}" ry="${rx * .23}" fill="#f2eee4"/>${inner}</g>`; }
function bubble(x, y, txt, fs = 44, col = '#2b3a67', tail = -1) { const w = txt.length * fs * .56 + 60; return `<g transform="translate(${x},${y})"><rect x="${-w / 2}" y="-50" width="${w}" height="100" rx="44" fill="#fff" stroke="${col}" stroke-width="5"/><path d="M${tail * 30},48 L${tail * 70},100 L${tail * 70 - tail * 60},48Z" fill="#fff" stroke="${col}" stroke-width="5"/><rect x="${tail * 30 - 40}" y="40" width="80" height="10" fill="#fff"/><text x="0" y="${fs * .35}" font-family="Fredoka" font-weight="700" font-size="${fs}" text-anchor="middle" fill="${col}">${txt}</text></g>`; }
function grass(y0) { return `<rect x="0" y="${y0}" width="${W}" height="${H - y0}" fill="url(#maGrass)"/>${[...Array(60)].map((_, i) => `<path d="M${(i * 97) % W},${y0 + 20 + (i * 53) % (H - y0 - 20)} l6,-16 l6,16" stroke="#4f8a3a" stroke-width="3" fill="none"/>`).join('')}`; }
function ball(x, y, r = 22) { return `${rShadow(x, y + r, r, .25)}<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" stroke="#333" stroke-width="2"/><path d="M${x},${y - 8} l8,6 l-3,9 h-10 l-3,-9Z" fill="#333"/>`; }
function retiro(t, people = true) {
  let s = sky(t, 'day', [1700, 140]) + `<rect x="0" y="470" width="${W}" height="140" fill="#6f9e58"/>`;
  // Monumento a Alfonso XII: columnata semicircular y estatua ecuestre
  s += `<g transform="translate(960,560)"><rect x="-520" y="-60" width="1040" height="60" fill="#d9d1bf"/>${[...Array(22)].map((_, i) => `<rect x="${-500 + i * 47}" y="-240" width="20" height="180" fill="#efe9dc"/>`).join('')}<rect x="-520" y="-262" width="1040" height="26" fill="#e2dccd"/><rect x="-540" y="-280" width="1080" height="20" fill="#d9d1bf"/>
  <rect x="-60" y="-380" width="120" height="320" fill="#e8e2d4"/><rect x="-80" y="-400" width="160" height="24" fill="#d9d1bf"/>
  <g transform="translate(0,-400)" fill="#4a5a52"><path d="M-60,-10 L-50,-60 Q-10,-80 40,-74 Q60,-100 76,-90 L80,-72 L58,-64 L52,-48 L54,-10 L44,-10 L40,-40 L-26,-40 L-34,-10 L-46,-10 L-42,-38Z"/><path d="M-8,-74 L-4,-120 L12,-120 L14,-74Z"/><circle cx="4" cy="-132" r="12"/></g>
  ${[-460, 460].map(x => `<g transform="translate(${x},-280)"><rect x="-30" y="-50" width="60" height="50" fill="#e8e2d4"/><path d="M-24,-50 Q0,-90 24,-50Z" fill="#7a8a82"/></g>`).join('')}
  <path d="M-600,0 L600,0 L560,40 L-560,40Z" fill="#cfc6b4"/>${[...Array(12)].map((_, i) => `<rect x="${-540 + i * 96}" y="0" width="14" height="36" fill="#e8e2d4"/>`).join('')}</g>`;
  for (let i = 0; i < 4; i++) s += rTree(80 + i * 120, 600, .55, 'green', t, 600 + i) + rTree(1840 - i * 120, 600, .55, 'green', t, 610 + i);
  s += `<rect x="0" y="600" width="${W}" height="340" fill="url(#maLake)"/>${[...Array(12)].map((_, i) => `<path d="M${(i * 173 + t / L * 60) % W},${640 + (i * 37) % 280} q30,-6 60,0" stroke="#cfe6f0" stroke-width="3" fill="none" opacity=".6"/>`).join('')}`;
  const boat = (x, y, sc, ph, col) => `<g transform="translate(${x + S(t, 1, ph) * 14},${y + S(t, 2, ph) * 3}) scale(${sc})"><ellipse cx="0" cy="18" rx="120" ry="14" fill="#000" opacity=".15"/><path d="M-110,-10 L110,-10 L90,18 L-90,18Z" fill="${col}"/><path d="M-110,-10 L110,-10" stroke="#fff" stroke-width="5"/>${rP(-30, -6, 1.1, t, ESC({ ph, top: '#f2c14e' }))}${rP(40, -6, .9, t, ESC({ ph: ph + 2, child: true, top: '#c8323a' }))}<path d="M-30,-60 L-90,20 M-30,-60 L30,20" stroke="#6b4a36" stroke-width="4"/></g>`;
  s += boat(420, 720, 1, 1, '#2f6a9a') + boat(1360, 790, 1.2, 3, '#c8323a') + boat(860, 680, .7, 5, '#3a8a5a');
  s += `<rect x="0" y="930" width="${W}" height="150" fill="#d9ccb0"/><rect x="0" y="924" width="${W}" height="12" fill="#bdb3a0"/>`;
  if (people) s += maCrowd(t, 61, 9, 960, 1070);
  return s;
}

/* ---------- escenas ---------- */
scenes.ma_intro = function (t) {
  let s = MAALL() + sky(t) + madridBlock(-20, 860, 420, 520, '#f0e4cc') + madridBlock(1500, 860, 440, 560, '#e9d4b8') + metropolis(960, 860, .95) + street(860) + maCrowd(t, 3, 12, 900, 1060);
  return s + `<g transform="translate(${W / 2},${H / 2 - 220})"><rect x="-560" y="-150" width="1120" height="300" rx="40" fill="#fff" opacity=".95" stroke="#2b3a67" stroke-width="6"/>
  <text x="0" y="-30" font-family="Fredoka" font-weight="700" font-size="104" text-anchor="middle" fill="#ffcc2e" stroke="#2b3a67" stroke-width="6" paint-order="stroke">Mi Pequeño Atlas</text>
  <rect x="-330" y="20" width="660" height="96" rx="22" fill="#c60b1e"/><text x="0" y="88" font-family="Fredoka" font-weight="700" font-size="64" text-anchor="middle" fill="#ffc400">Capítulo 4: Madrid</text></g>`;
};
scenes.ma_granvia = function (t) {
  let s = MAALL() + sky(t) + madridBlock(-20, 800, 380, 560, '#efe2c6') + madridBlock(360, 800, 300, 480, '#e2cfb2') + madridBlock(1300, 800, 320, 500, '#e9dcc4') + madridBlock(1620, 800, 320, 600, '#f0e4cc');
  s += metropolis(960, 800, .9) + rRoadScene(t, 800, { move: 1, front: false }) + rCar(((t / L * 900) % 2300) - 200, 960, 1, '#c8323a') + rCar(1900 - ((t / L * 700) % 2300), 900, .9, '#f2f2f2', -1);
  s += esFlag(560, 220, .8) + `<rect x="0" y="1030" width="${W}" height="50" fill="url(#rWalk)"/>`;
  return s + rLabel('Madrid · Gran Vía', W / 2, 1000, 38);
};
scenes.ma_mapa = function (t) {
  let s = MAALL() + `<rect width="${W}" height="${H}" fill="#7fb6dc"/>`;
  s += `<path d="M1000,0 L1920,0 L1920,340 L1500,360 L1400,340 L1300,300 L1180,280 L1100,250 L1000,230Z" fill="#cfe2b8" stroke="#8aa87a" stroke-width="4"/><text x="1500" y="180" font-family="Fredoka" font-weight="700" font-size="50" fill="#5a7a4a" opacity=".7">FRANCIA</text>`;
  s += `<path d="M540,330 L620,330 L650,380 L700,420 L720,500 L690,600 L700,700 L680,760 L600,780 L570,700 L560,560 L520,440Z" fill="#cfe2b8" stroke="#8aa87a" stroke-width="4"/><text x="610" y="580" font-family="Fredoka" font-weight="700" font-size="30" fill="#5a7a4a" transform="rotate(-80 610 580)" text-anchor="middle">PORTUGAL</text>`;
  s += `<path d="M560,250 L700,230 L900,250 L1080,262 L1180,300 L1300,322 L1400,350 L1380,420 L1300,500 L1240,560 L1220,640 L1250,700 L1180,760 L1100,820 L980,850 L880,880 L800,890 L740,860 L700,800 L680,760 L700,700 L690,600 L720,500 L700,420 L650,380 L620,330 L540,330 L520,290Z" fill="#f2d98a" stroke="#2b3a67" stroke-width="6" stroke-linejoin="round"/>
  <path d="M1400,600 l50,-14 l20,20 l-40,20Z M1490,580 l30,-6 l10,14 l-30,6Z" fill="#f2d98a" stroke="#2b3a67" stroke-width="4"/><text x="300" y="200" font-family="Fredoka" font-weight="700" font-size="54" fill="#5a7a4a" opacity=".7">EUROPA</text><text x="1000" y="760" font-family="Fredoka" font-weight="700" font-size="52" fill="#c60b1e" opacity=".8">ESPAÑA</text>`;
  const p = 1 + .18 * Math.max(0, S(t, 4));
  s += `<g transform="translate(930,520)">${[0, 1].map(k => `<circle r="${30 + ((t / L * 4 + k * .5) % 1) * 160}" fill="none" stroke="#e8352a" stroke-width="4" opacity="${1 - ((t / L * 4 + k * .5) % 1)}"/>`).join('')}<g transform="scale(${p})"><path d="M0,22 C-40,-6 -36,-40 -16,-44 C-4,-46 0,-36 0,-30 C0,-36 4,-46 16,-44 C36,-40 40,-6 0,22Z" fill="#e8352a" stroke="#fff" stroke-width="5"/></g></g>`;
  return s + rLabel('Madrid', 930, 610, 46, '#e8352a') + rLabel('En el centro de España: ¡el corazón del país!', W / 2, 1010, 38);
};
scenes.ma_plazamayor = function (t) {
  let s = MAALL() + plazaMayor(t);
  s += rP(420, 960, 1.9, t, ESC({ ph: 2, top: '#2b3a67', hold: `<g transform="translate(-4,-70)"><path d="M-30,0 Q-10,-30 30,-10 Q40,10 10,16 Q-20,20 -30,0Z" fill="#a8622a"/><line x1="20" y1="-8" x2="60" y2="-60" stroke="#6b4a36" stroke-width="4"/></g>` }));
  s += rP(1460, 1000, 1.5, t, ESC({ ph: 3, child: true, top: '#f2c14e', wave: true })) + ball(1560 + S(t, 2) * 40, 1030 - Math.abs(S(t, 4)) * 60);
  s += [...Array(4)].map((_, i) => `<text x="${480 + i * 40}" y="${800 - ((t / L * 2 + i * .25) % 1) * 120}" font-size="44" fill="#2b3a67" opacity="${1 - ((t / L * 2 + i * .25) % 1)}">♪</text>`).join('');
  return s + rLabel('Plaza Mayor', W / 2, 80, 44);
};
scenes.ma_hablar = function (t) {
  let s = MAALL() + plazaMayor(t, false) + `<rect width="${W}" height="${H}" fill="#fff" opacity=".1"/>`;
  s += rP(620, 1010, 2.2, t, ESC({ ph: 1, top: '#5a7a5a', longhair: true })) + rP(980, 1010, 2.2, t, ESC({ ph: 2, top: '#2b3a67', dir: -1 })) + rP(1380, 1030, 1.7, t, ESC({ ph: 4, child: true, top: '#c8323a', dir: -1 }));
  s += bubble(540, 500, '¡Vale!', 52, '#c60b1e', 1) + bubble(1060, 420, '¡Qué guay!', 52, '#2b3a67', -1);
  s += S(t, 1) > -0.3 ? bubble(1480, 600, '¿Y eso qué significa?', 40, '#7a5a8a', -1) : '';
  return s + rLabel('En Madrid se habla español… ¡con su propio acento!', W / 2, 80, 40);
};
scenes.ma_palabras = function (t) {
  let s = MAALL() + plazaMayor(t, false) + `<rect width="${W}" height="${H}" fill="#fff" opacity=".25"/>`;
  s += rP(320, 1040, 2.0, t, ESC({ ph: 1, top: '#c8323a', wave: true })) + rP(1620, 1040, 1.7, t, ESC({ ph: 3, child: true, top: '#f2c14e', dir: -1 }));
  const words = [['Vale', '= OK, de acuerdo'], ['Guay', '= divertido, genial'], ['Mola', '= me gusta mucho'], ['Chaval', '= niño o joven']];
  s += words.map(([w, m], i) => { const x = 620 + (i % 2) * 680, y = 260 + Math.floor(i / 2) * 230, k = 1 + .03 * Math.max(0, S(t, 1, i * 1.5)); return `<g transform="translate(${x},${y}) scale(${k})"><rect x="-300" y="-85" width="600" height="170" rx="34" fill="#fff" stroke="#c60b1e" stroke-width="7"/><rect x="-300" y="-85" width="600" height="20" rx="10" fill="#ffc400"/><text x="0" y="-2" font-family="Fredoka" font-weight="700" font-size="66" text-anchor="middle" fill="#c60b1e">${w}</text><text x="0" y="56" font-family="Fredoka" font-weight="600" font-size="38" text-anchor="middle" fill="#2b3a67">${m}</text></g>`; }).join('');
  return s;
};
scenes.ma_mola = function (t) {
  let s = MAALL() + sky(t) + madridBlock(-20, 760, 700, 520, '#efe2c6') + madridBlock(1200, 760, 740, 560, '#e9d4b8') + metropolis(950, 760, .7) + street(760);
  s += rP(820, 1030, 2.6, t, ESC({ ph: 2, child: true, top: '#2f6a9a', wave: true })) + rP(1140, 1030, 2.2, t, ESC({ ph: 4, child: true, top: '#c8323a', longhair: true, dir: -1 }));
  return s + bubble(820, 470, '¡Esto mola!', 70, '#c60b1e', -1);
};
scenes.ma_mercado = function (t) {
  let s = MAALL() + sky(t) + `<rect x="0" y="820" width="${W}" height="260" fill="#c9bca2"/>`;
  s += `<g transform="translate(960,820)"><rect x="-760" y="-440" width="1520" height="440" fill="#3a3f3a"/>${[...Array(16)].map((_, i) => `<rect x="${-740 + i * 94}" y="-420" width="80" height="400" fill="#a8c8c8" opacity=".55"/><line x1="${-700 + i * 94}" y1="-420" x2="${-700 + i * 94}" y2="-20" stroke="#2a2f2a" stroke-width="4"/>`).join('')}${[...Array(4)].map((_, r) => `<line x1="-760" y1="${-340 + r * 90}" x2="760" y2="${-340 + r * 90}" stroke="#2a2f2a" stroke-width="5"/>`).join('')}
  <rect x="-780" y="-470" width="1560" height="40" fill="#2f342f"/><path d="M-780,-470 L-700,-540 L700,-540 L780,-470Z" fill="#4a524a"/><rect x="-300" y="-520" width="600" height="60" fill="#f4efe4"/><text x="0" y="-478" font-family="Fredoka" font-weight="700" font-size="40" text-anchor="middle" fill="#2f342f" letter-spacing="4">MERCADO DE SAN MIGUEL</text>
  ${[...Array(6)].map((_, i) => `<g transform="translate(${-600 + i * 240},-130)"><rect x="-90" y="0" width="180" height="70" fill="#7a5232"/>${[...Array(6)].map((_, k) => `<circle cx="${-70 + k * 28}" cy="-4" r="13" fill="${['#e8352a', '#f2c14e', '#7ab04a', '#f29a3a'][(i + k) % 4]}"/>`).join('')}<path d="M-100,-80 L100,-80 L90,-50 L-90,-50Z" fill="${['#c8323a', '#2f6a9a', '#3a8a5a'][i % 3]}"/></g>`).join('')}</g>`;
  return s + maCrowd(t, 71, 14, 850, 1070) + rLabel('La comida nos cuenta historias', W / 2, 80, 40);
};
scenes.ma_cocina = function (t) {
  let s = MAALL() + `<rect width="${W}" height="${H}" fill="#f2e6cc"/>${[...Array(12)].map((_, i) => [...Array(6)].map((_, r) => `<rect x="${i * 160 + (r % 2) * 80}" y="${r * 60}" width="156" height="56" fill="#fbf4e4" stroke="#e2d4b4" stroke-width="2"/>`).join('')).join('')}`;
  s += `<rect x="0" y="360" width="${W}" height="20" fill="#7a5232"/>${[...Array(6)].map((_, i) => `<g transform="translate(${200 + i * 300},380)"><line x1="0" y1="0" x2="0" y2="60" stroke="#555" stroke-width="3"/><path d="M-50,60 Q0,${100 + i * 4} 50,60Z" fill="${['#b87333', '#c9c9c9'][i % 2]}"/></g>`).join('')}`;
  s += `<rect x="0" y="700" width="${W}" height="380" fill="url(#rCounter)"/><rect x="560" y="640" width="800" height="70" fill="#3a3a3a"/>${[760, 1160].map(x => `<ellipse cx="${x}" cy="660" rx="110" ry="20" fill="#222"/><ellipse cx="${x}" cy="660" rx="80" ry="14" fill="none" stroke="#ff6a2a" stroke-width="5" opacity="${.6 + .3 * S(t, 6)}"/>`).join('')}`;
  s += `<g transform="translate(760,650)"><path d="M-130,-200 L130,-200 L120,0 L-120,0Z" fill="#a8a8a8"/><rect x="-140" y="-214" width="280" height="22" rx="8" fill="#888"/><path d="M-170,-170 h40 M130,-170 h40" stroke="#666" stroke-width="12" stroke-linecap="round"/></g>${steam(760, 430, t)}`;
  s += `<g transform="translate(1160,650)"><path d="M-110,-40 L110,-40 L100,0 L-100,0Z" fill="#2a2a2a"/><path d="M110,-30 L260,-50" stroke="#2a2a2a" stroke-width="14"/><ellipse cx="0" cy="-40" rx="100" ry="14" fill="#e8b84a"/></g>`;
  return s + rLabel('La cocina madrileña', W / 2, 950, 44);
};
scenes.ma_cocido = function (t) {
  let s = MAALL() + `<rect width="${W}" height="${H}" fill="#efe2c6"/><rect x="0" y="640" width="${W}" height="440" fill="url(#rWood)"/>`;
  s += `<g transform="translate(960,700)">${rShadow(0, 20, 300, .3)}<path d="M-260,-300 Q-280,0 -220,20 L220,20 Q280,0 260,-300Z" fill="#b8642a"/><path d="M-260,-300 Q-280,0 -220,20 L220,20 Q280,0 260,-300Z" fill="#000" opacity=".1"/><ellipse cx="0" cy="-300" rx="262" ry="50" fill="#9a4a1a"/><ellipse cx="0" cy="-296" rx="236" ry="40" fill="#e8b860"/>
  ${[...Array(18)].map((_, i) => `<circle cx="${-180 + (i * 47) % 360}" cy="${-300 + (i * 13) % 26 - 6}" r="12" fill="#e8cf8a" stroke="#c9a85a" stroke-width="2"/>`).join('')}<path d="M-80,-306 l60,-10 l10,20 l-60,10Z" fill="#c8323a"/><circle cx="60" cy="-300" r="16" fill="#f29a3a"/><path d="M-300,-260 q-40,0 -40,40 M300,-260 q40,0 40,40" stroke="#9a4a1a" stroke-width="16" fill="none"/></g>${steam(960, 360, t)}`;
  const ing = [['Garbanzos', 230, 360, `${[...Array(12)].map((_, i) => `<circle cx="${-50 + (i % 4) * 32}" cy="${-14 + Math.floor(i / 4) * 16}" r="13" fill="#e8cf8a" stroke="#c9a85a" stroke-width="2"/>`).join('')}`],
    ['Pollo', 230, 620, `<path d="M-60,10 Q-80,-40 -20,-40 Q40,-40 40,0 L80,-10 L90,10 L80,20 L40,14 Q0,40 -60,10Z" fill="#e0a860"/>`],
    ['Carne de res', 230, 880, `<path d="M-70,-20 Q0,-50 70,-20 Q80,30 0,34 Q-80,30 -70,-20Z" fill="#a8423a"/><path d="M-30,-10 q30,10 50,-6" stroke="#f2d4c4" stroke-width="6" fill="none"/>`],
    ['Chorizo', 1690, 360, `${[0, 1, 2].map(i => `<ellipse cx="${-60 + i * 60}" cy="0" rx="34" ry="20" fill="#b8302a"/>`).join('')}`],
    ['Papas', 1690, 560, `${[0, 1, 2].map(i => `<ellipse cx="${-50 + i * 50}" cy="${(i % 2) * 8}" rx="30" ry="22" fill="#d9b06a"/>`).join('')}`],
    ['Zanahorias', 1690, 760, `${[0, 1].map(i => `<path d="M${-70 + i * 30},${-6 + i * 16} L70,${i * 12} L${-70 + i * 30},${10 + i * 16}Z" fill="#f2862a"/><path d="M${-70 + i * 30},${2 + i * 16} l-20,-12 m20,12 l-22,6" stroke="#3a8a2a" stroke-width="5"/>`).join('')}`],
    ['Fideos', 1690, 940, `${[...Array(8)].map((_, i) => `<path d="M-70,${-16 + i * 4} q35,-14 70,0 t70,0" stroke="#f2d27a" stroke-width="4" fill="none"/>`).join('')}`]];
  s += ing.map(([n, x, y, g], i) => { const a = Math.min(1, Math.max(0, (t / L * 8 - i * .9))); return `<g opacity="${.25 + .75 * a}"><g transform="translate(${x},${y})"><ellipse cx="0" cy="30" rx="120" ry="30" fill="#fbfbf7"/>${g}</g>${rLabel(n, x, y + 80, 32)}</g>`; }).join('');
  return s + rLabel('Cocido madrileño', W / 2, 90, 46) + rLabel('Se cocina lentamente, durante horas', W / 2, 1010, 34);
};
scenes.ma_cocido3 = function (t) {
  let s = MAALL() + `<rect width="${W}" height="${H}" fill="#efe2c6"/><rect x="0" y="560" width="${W}" height="520" fill="#fbfbf7"/>${[...Array(10)].map((_, i) => `<rect x="${i * 200}" y="560" width="100" height="520" fill="#c8323a" opacity=".12"/>`).join('')}`;
  s += plate(380, 760, 230, `<ellipse rx="170" ry="54" fill="#e8b860"/>${[...Array(14)].map((_, i) => `<path d="M${-130 + i * 18},${-10 + (i % 3) * 8} q20,-8 40,0" stroke="#f2e2a0" stroke-width="4" fill="none"/>`).join('')}`) + steam(380, 680, t, 2);
  s += plate(960, 760, 230, `${[...Array(20)].map((_, i) => `<circle cx="${-120 + (i * 41) % 240}" cy="${-30 + (i * 17) % 60}" r="15" fill="#e8cf8a" stroke="#c9a85a" stroke-width="2"/>`).join('')}<ellipse cx="80" cy="0" rx="40" ry="20" fill="#d9b06a"/><path d="M-110,10 l70,0 l-70,14Z" fill="#f2862a"/><ellipse cx="-20" cy="-30" rx="40" ry="16" fill="#5a8a3a"/>`);
  s += plate(1540, 760, 230, `<path d="M-120,0 Q-100,-40 -40,-36 Q0,-30 -10,10 Q-60,30 -120,0Z" fill="#e0a860"/><path d="M0,-20 Q60,-50 120,-10 Q100,30 20,24Z" fill="#a8423a"/>${[0, 1, 2].map(i => `<ellipse cx="${-40 + i * 50}" cy="30" rx="26" ry="14" fill="#b8302a"/>`).join('')}`);
  s += [['1. La sopa', 380], ['2. Garbanzos y verduras', 960], ['3. Las carnes', 1540]].map(([n, x]) => rLabel(n, x, 960, 38)).join('');
  return s + rLabel('Primero… luego… y finalmente', W / 2, 140, 44) + rLabel('Un plato para comer en familia', W / 2, 420, 34);
};
scenes.ma_tortilla = function (t) {
  let s = MAALL() + `<rect width="${W}" height="${H}" fill="#f2e9d8"/><rect x="0" y="600" width="${W}" height="480" fill="url(#rCounter)"/>`;
  s += `<g transform="translate(900,760)">${rShadow(0, 50, 330, .3)}<ellipse rx="340" ry="110" fill="#fbfbf7"/><ellipse rx="270" ry="84" fill="#c98a3a"/><path d="M-270,0 Q-270,-70 0,-76 Q270,-70 270,0 Q270,40 0,44 Q-270,40 -270,0Z" fill="#e8b84a"/><ellipse cx="0" cy="-30" rx="250" ry="62" fill="#f2c860"/>${[...Array(10)].map((_, i) => `<ellipse cx="${-180 + (i * 61) % 360}" cy="${-40 + (i * 23) % 40}" rx="20" ry="8" fill="#d99a3a" opacity=".6"/>`).join('')}
  <path d="M0,-30 L250,-50 Q270,0 250,30 L0,10Z" fill="#fbfbf7"/><g transform="translate(${130 + Math.max(0, S(t, 1)) * 40},40)"><path d="M0,-40 L240,-60 L240,10 L0,20Z" fill="#f6e28a"/><path d="M0,-40 L240,-60 L240,-46 L0,-26Z" fill="#c98a3a"/>${[...Array(6)].map((_, i) => `<path d="M${20 + i * 36},-20 q16,-6 28,0" stroke="#e8c860" stroke-width="5" fill="none"/>`).join('')}<path d="M0,20 L240,10" stroke="#c98a3a" stroke-width="10"/></g></g>`;
  s += `<g transform="translate(1560,700)">${[0, 1, 2].map(i => `<ellipse cx="${-60 + i * 60}" cy="${i % 2 * 10}" rx="38" ry="28" fill="#d9b06a"/>`).join('')}</g><g transform="translate(1560,880)">${[0, 1].map(i => `<ellipse cx="${-40 + i * 80}" cy="0" rx="32" ry="42" fill="#fbf4e4" stroke="#e2d4b4" stroke-width="3"/>`).join('')}</g>
  <g transform="translate(260,800)"><path d="M-40,0 L40,0 L36,-200 Q30,-230 14,-240 L14,-290 L-14,-290 L-14,-240 Q-30,-230 -36,-200Z" fill="#8aa83a" opacity=".85"/><rect x="-16" y="-310" width="32" height="24" fill="#3a3a3a"/><rect x="-36" y="-150" width="72" height="70" fill="#f4efe4"/><text x="0" y="-108" font-family="Fredoka" font-size="18" text-anchor="middle" fill="#3a5a2a">ACEITE</text></g>`;
  return s + rLabel('Tortilla española', W / 2, 100, 46) + rLabel('Papas', 1560, 640, 30) + rLabel('Huevos', 1560, 960, 30) + rLabel('Aceite de oliva y sal', 260, 960, 30);
};
scenes.ma_bocadillo = function (t) {
  let s = MAALL() + plazaMayor(t, false) + `<rect x="0" y="700" width="${W}" height="380" fill="url(#rWood)"/>`;
  s += `<g transform="translate(960,800) rotate(-3)">${rShadow(0, 60, 460, .3)}<path d="M-460,-20 Q-470,-90 -380,-100 L380,-100 Q470,-90 460,-20Z" fill="#d9a04a"/>${[...Array(6)].map((_, i) => `<path d="M${-330 + i * 130},-90 q40,-14 70,6" stroke="#b8782a" stroke-width="6" fill="none"/>`).join('')}
  ${[...Array(9)].map((_, i) => `<g transform="translate(${-370 + i * 92},-10)"><ellipse rx="56" ry="32" fill="#e8c06a"/><ellipse rx="26" ry="14" fill="#f4ead4"/>${[...Array(8)].map((_, k) => `<circle cx="${Math.cos(k) * 46}" cy="${Math.sin(k) * 26}" r="4" fill="#c9902a"/>`).join('')}</g>`).join('')}
  <path d="M-460,20 Q-470,80 -380,84 L380,84 Q470,80 460,20Z" fill="#c98a3a"/></g>`;
  return s + rLabel('Bocadillo de calamares', W / 2, 1000, 44) + rArrowLabel('Pan crujiente', 520, 560, 640, 700, 32) + rArrowLabel('Calamares fritos', 1440, 560, 1260, 790, 32);
};
scenes.ma_churros = function (t) {
  let s = MAALL() + `<rect width="${W}" height="${H}" fill="#f4e4c4"/><rect x="0" y="0" width="${W}" height="140" fill="#2f6a4a"/><text x="960" y="96" font-family="Fredoka" font-weight="700" font-size="64" text-anchor="middle" fill="#f4e4c4" letter-spacing="8">CHURRERÍA</text><rect x="0" y="620" width="${W}" height="460" fill="#fbfbf7"/>${[...Array(24)].map((_, i) => `<rect x="${i * 80}" y="620" width="40" height="460" fill="#2f6a4a" opacity=".1"/>`).join('')}`;
  s += plate(700, 780, 380, '') + churro(640, 720, -6) + churro(660, 770, 3) + churro(700, 820, -2);
  const dip = Math.max(0, S(t, 1)) * 120;
  s += steam(1300, 620, t, 2);
  s += `<g transform="translate(1330,${600 + dip * .25}) rotate(70)">${churro(0, 0, 0, .8)}</g>` + chocoCup(1300, 760, 1.1);
  return s + rLabel('Churros con chocolate caliente', W / 2, 990, 44) + rArrowLabel('Crujientes por fuera, suaves por dentro', 520, 420, 640, 700, 30);
};
scenes.ma_ninos = function (t) {
  let s = MAALL() + sky(t) + `<g transform="translate(420,700)"><rect x="-340" y="-360" width="680" height="360" fill="#e9c89a"/>${[...Array(8)].map((_, i) => `<rect x="${-310 + (i % 4) * 160}" y="${-330 + Math.floor(i / 4) * 140}" width="110" height="90" fill="#7aa4c8"/>`).join('')}<rect x="-60" y="-110" width="120" height="110" fill="#6b4a36"/><rect x="-200" y="-410" width="400" height="56" fill="#fff" stroke="#c8323a" stroke-width="5"/><text x="0" y="-368" font-family="Fredoka" font-weight="700" font-size="40" text-anchor="middle" fill="#c8323a">COLEGIO</text>${esFlag(240, -438, .6)}</g>`;
  s += grass(700) + rTree(1700, 740, .9, 'green', t, 77) + `<path d="M900,880 L1700,880" stroke="#fff" stroke-width="5"/><rect x="1500" y="760" width="16" height="120" fill="#fff"/><rect x="1500" y="760" width="200" height="12" fill="#fff"/>`;
  const bx = 1000 + S(t, 1) * 260;
  s += rP(bx - 120, 1000, 1.6, t, { ph: 1, child: true, top: '#fff', bot: '#2b3a67' }) + rP(bx + 160, 960, 1.5, t, { ph: 3, child: true, top: '#c8323a', dir: -1 }) + ball(bx + 10, 990 - Math.abs(S(t, 4)) * 40);
  s += rP(260, 1040, 1.7, t, ESC({ ph: 5, child: true, top: '#f2c14e', longhair: true, hold: `<g transform="translate(10,-60)"><path d="M-10,0 L10,0 L0,30Z" fill="#d9a04a"/><circle cx="0" cy="-6" r="13" fill="#f2a9c0"/></g>` })) + rP(140, 1050, 2.1, t, ESC({ ph: 2, top: '#2b3a67' }));
  return s + rLabel('Colegio, parques, fútbol… ¡y helado!', W / 2, 80, 40);
};
scenes.ma_ropa = function (t) {
  let s = MAALL() + `<svg x="0" y="0" width="960" height="1080" viewBox="0 0 960 1080">${rSky('day')}${rSun(760, 160, 70)}${madridBlock(-20, 760, 980, 520, '#f0e4cc')}${street(760)}</svg>`;
  s += `<svg x="960" y="0" width="960" height="1080" viewBox="0 0 960 1080"><rect width="960" height="1080" fill="#b8c4d0"/>${madridBlock(-20, 760, 980, 520, '#d9d1c4')}${street(760)}${[...Array(30)].map((_, i) => `<circle cx="${(i * 131) % 960}" cy="${((i * 97) + t / L * 600) % 1080}" r="5" fill="#fff" opacity=".8"/>`).join('')}</svg><rect x="954" y="0" width="12" height="${H}" fill="#fff"/>`;
  s += rP(260, 1000, 2.3, t, ESC({ ph: 1, top: '#f2c14e', skirt: '#f2a9c0', longhair: true })) + rP(560, 1010, 1.9, t, ESC({ ph: 3, child: true, top: '#4fb3f6', bot: '#e9e2d4' }));
  const coat = (x, sc, ph, col, sc2) => rP(x, 1010, sc, t, ESC({ ph, top: col, bot: '#2b2f3a', shoe: '#5a3a22' })) + `<g transform="translate(${x},1010) scale(${sc})"><path d="M-16,-124 Q0,-114 16,-124 L14,-110 L-14,-110Z" fill="${sc2}"/><path d="M8,-120 L12,-90" stroke="${sc2}" stroke-width="6"/><rect x="-10" y="-14" width="9" height="14" fill="#5a3a22"/><rect x="2" y="-14" width="9" height="14" fill="#5a3a22"/></g>`;
  s += coat(1260, 2.3, 2, '#7a3a3a', '#f2c14e') + coat(1600, 1.9, 4, '#2b3a67', '#c8323a');
  return s + rLabel('Verano: ropa ligera', 480, 90, 40) + rLabel('Invierno: abrigo, bufanda y botas', 1440, 90, 36);
};
scenes.ma_zapatos = function (t) {
  let s = MAALL() + sky(t) + madridBlock(-20, 700, 660, 480, '#efe2c6') + madridBlock(640, 700, 640, 520, '#e9d4b8') + madridBlock(1280, 700, 660, 460, '#f0e4cc') + street(700) + maCrowd(t, 81, 12, 740, 860);
  const sh = (x, y, col, ph) => { const lift = Math.max(0, S(t, 4, ph)) * 30; return `<g transform="translate(${x},${y - lift})">${rShadow(0, 30 + lift, 170, .2)}<path d="M-170,20 Q-180,-30 -120,-50 L-20,-60 Q20,-110 80,-100 Q120,-90 130,-40 Q180,-20 180,20Z" fill="${col}"/><path d="M-176,20 L182,20 L178,40 L-172,40Z" fill="#fff"/>${[...Array(4)].map((_, i) => `<line x1="${-10 + i * 24}" y1="-70" x2="${10 + i * 24}" y2="-50" stroke="#fff" stroke-width="5"/>`).join('')}</g>`; };
  s += sh(720, 980, '#4f7fe0', 0) + sh(1180, 980, '#4f7fe0', Math.PI);
  return s + rLabel('¡No olvides tus zapatos cómodos!', W / 2, 80, 44);
};
scenes.ma_paseo = function (t) {
  let s = MAALL() + sky(t) + madridBlock(-20, 760, 520, 520, '#efe2c6') + madridBlock(1420, 760, 520, 560, '#e9d4b8') + metropolis(960, 760, .8) + street(760) + maCrowd(t, 91, 16, 800, 1070);
  return s + rLabel('¡Vamos a caminar por Madrid!', W / 2, 80, 44);
};
scenes.ma_retiro = function (t) { return MAALL() + retiro(t) + rLabel('Parque del Retiro', W / 2, 80, 44); };
scenes.ma_retiro_ninos = function (t) {
  let s = MAALL() + sky(t) + `<rect x="0" y="560" width="${W}" height="80" fill="url(#maLake)"/>`;
  for (let i = 0; i < 7; i++) s += rTree(120 + i * 290, 560, .7, 'green', t, 700 + i);
  s += grass(640);
  const bx = 960 + S(t, 1) * 380;
  s += rP(bx - 260, 960, 2.0, t, { ph: 1, child: true, top: '#4fb3f6', skin: '#9c6a48' }) + rP(bx + 300, 1000, 2.0, t, { ph: 3, child: true, top: '#f2c14e', skin: '#c99470', dir: -1 }) + rP(bx + 40, 900, 1.8, t, { ph: 5, child: true, top: '#fff', bot: '#2b3a67', dir: -1 });
  s += rP(1640, 1030, 2.0, t, ESC({ ph: 2, child: true, top: '#c8323a', longhair: true, dir: -1 })) + ball(bx, 1010 - Math.abs(S(t, 4)) * 70, 26);
  return s;
};
scenes.ma_palacio = function (t) {
  let s = MAALL() + sky(t, 'day', [300, 150]) + palacioReal(960, 820, 1.08) + `<rect x="0" y="820" width="${W}" height="260" fill="#d9ccb0"/>${[...Array(14)].map((_, i) => `<line x1="0" y1="${840 + i * 18}" x2="${W}" y2="${840 + i * 18}" stroke="#c9bc9e" stroke-width="2"/>`).join('')}`;
  return s + maCrowd(t, 101, 12, 860, 1070) + rLabel('Palacio Real · más de 3.000 habitaciones', W / 2, 1010, 36);
};
scenes.ma_sol = function (t) {
  let s = MAALL() + sky(t, 'day', [1700, 140]) + madridBlock(-20, 760, 420, 500, '#efe2c6') + madridBlock(1500, 760, 440, 520, '#e9d4b8') + casaCorreos(960, 760, 1, t) + street(760);
  s += osoMadrono(300, 1000, 1.1) + maCrowd(t, 111, 16, 800, 1070);
  return s + rLabel('Puerta del Sol', W / 2, 80, 44) + rArrowLabel('El Oso y el Madroño', 560, 640, 360, 760, 30);
};
scenes.ma_km0 = function (t) {
  let s = MAALL() + `<rect width="${W}" height="${H}" fill="#b9b2a4"/>${[...Array(12)].map((_, i) => `<line x1="${i * 180}" y1="0" x2="${i * 180 - 200}" y2="${H}" stroke="#a49c8e" stroke-width="4"/>`).join('')}`;
  s += `<g transform="translate(960,520)"><path d="M-380,120 L380,120 L380,-60 Q380,-260 0,-260 Q-380,-260 -380,-60Z" fill="#e8e2d4" stroke="#8a8478" stroke-width="10"/><path d="M-330,90 L330,90 L330,-50 Q330,-210 0,-210 Q-330,-210 -330,-50Z" fill="none" stroke="#c9a85a" stroke-width="6"/>
  <text x="0" y="-110" font-family="Fredoka" font-weight="700" font-size="40" text-anchor="middle" fill="#5a5448">KILÓMETRO</text><text x="0" y="40" font-family="Fredoka" font-weight="700" font-size="180" text-anchor="middle" fill="#3a3a3a">0</text>
  ${[...Array(6)].map((_, i) => { const a = -Math.PI + (i + .5) * Math.PI / 6, r = 470 + ((t / L * 2) % 1) * 140; return `<g transform="translate(${Math.cos(a) * r},${Math.sin(a) * r * .9 + 60}) rotate(${a * 180 / Math.PI})"><path d="M-30,-14 L20,-14 L20,-30 L50,0 L20,30 L20,14 L-30,14Z" fill="#c60b1e" opacity="${1 - ((t / L * 2) % 1) * .6}"/></g>`; }).join('')}</g>`;
  return s + rLabel('Desde aquí empiezan los caminos de España', W / 2, 960, 40);
};
scenes.ma_prado = function (t) {
  let s = MAALL() + sky(t) + `<rect x="0" y="520" width="${W}" height="120" fill="#5f8a48"/>` + [...Array(6)].map((_, i) => rTree(80 + i * 360, 560, .5, 'green', t, 800 + i)).join('') + prado(960, 820, 1) + `<rect x="0" y="820" width="${W}" height="260" fill="#cfc4ae"/>`;
  s += statueMan(960, 980, 1.1) + maCrowd(t, 121, 12, 860, 1070);
  return s + rLabel('Museo del Prado', W / 2, 80, 44);
};
scenes.ma_prado_sala = function (t) {
  let s = MAALL() + `<rect width="${W}" height="${H}" fill="#7a2a2a"/><rect x="0" y="0" width="${W}" height="120" fill="#efe8d6"/><path d="M0,120 L${W},120 L${W},160 L0,160Z" fill="#d9cfb8"/><rect x="0" y="820" width="${W}" height="260" fill="#8a6a4a"/>${[...Array(10)].map((_, i) => `<line x1="${i * 220}" y1="820" x2="${i * 220 - 120}" y2="${H}" stroke="#7a5a3a" stroke-width="3"/>`).join('')}`;
  const frame = (x, y, w, h, inner) => `<g transform="translate(${x},${y})"><rect x="${-w / 2 - 22}" y="${-h / 2 - 22}" width="${w + 44}" height="${h + 44}" fill="url(#maGold)"/><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#3a3024"/>${inner}</g>`;
  s += frame(400, 470, 340, 420, `<circle cx="0" cy="-60" r="60" fill="#e2b48e"/><path d="M-60,-80 Q0,-150 60,-80 L60,-50 Q0,-100 -60,-50Z" fill="#2a1a10"/><path d="M-120,210 L-110,40 Q0,-10 110,40 L120,210Z" fill="#2a2a3a"/><path d="M-30,30 L0,60 L30,30" stroke="#f4efe4" stroke-width="12" fill="none"/>`);
  s += frame(960, 440, 520, 340, `<rect x="-260" y="-170" width="520" height="200" fill="#8ab0c8"/><rect x="-260" y="30" width="520" height="140" fill="#6a7a3a"/><path d="M-260,30 Q-100,-40 60,20 Q160,-10 260,10 L260,30Z" fill="#4a6a4a"/><circle cx="160" cy="-100" r="30" fill="#f4e4a0"/>`);
  s += frame(1520, 470, 340, 420, `<circle cx="0" cy="-40" r="56" fill="#e8c4a0"/><path d="M-56,-50 Q0,-120 56,-50 L66,40 Q0,-10 -66,40Z" fill="#6a4a2a"/><path d="M-130,210 L-100,60 Q0,20 100,60 L130,210Z" fill="#c8b48a"/>`);
  s += rP(700, 1000, 2.2, t, ESC({ ph: 2, child: true, top: '#f2c14e', dir: -1 })) + rP(1180, 1010, 2.4, t, ESC({ ph: 4, top: '#2b3a67', dir: -1 }));
  return s + rLabel('Cada cuadro cuenta una historia', W / 2, 960, 40);
};
scenes.ma_historia = function (t) {
  let s = MAALL() + retiro(t, false) + `<rect width="${W}" height="${H}" fill="#2b3a67" opacity=".35"/>`;
  return s + `<g transform="translate(960,480) scale(${1 + S(t, 1) * .01})"><rect x="-620" y="-220" width="1240" height="440" rx="36" fill="#fffaf0" stroke="#c60b1e" stroke-width="8"/><path d="M0,-220 L0,220" stroke="#e8dcc0" stroke-width="6"/>
  <text x="0" y="-110" font-family="Fredoka" font-weight="600" font-size="44" text-anchor="middle" fill="#c60b1e">Una historia</text><text x="0" y="0" font-family="Fredoka" font-weight="700" font-size="76" text-anchor="middle" fill="#2b3a67">Gabriel y Saúl</text><text x="0" y="100" font-family="Fredoka" font-weight="600" font-size="46" text-anchor="middle" fill="#2b3a67">conocen nuevos amigos en Madrid</text></g>`;
};
scenes.ma_santiago = function (t) {
  let s = MAALL() + sky(t) + `<path d="M0,700 Q960,520 1920,700 L1920,1080 L0,1080Z" fill="#7aa85a"/>`;
  s += `<g transform="translate(1120,660)"><rect x="-200" y="-40" width="400" height="40" fill="#efe9dc"/><path d="M-150,-40 L-120,-380 L120,-380 L150,-40Z" fill="#f4f0e6"/>${[...Array(6)].map((_, i) => `<rect x="${-100 + i * 36}" y="-360" width="14" height="300" fill="#e2dccd"/>`).join('')}<rect x="-130" y="-400" width="260" height="24" fill="#e2dccd"/><path d="M-90,-400 L-70,-540 L70,-540 L90,-400Z" fill="#f4f0e6"/><circle cx="0" cy="-560" r="24" fill="#e2dccd"/></g>${doFlag(1420, 458, 1.4)}`;
  for (let i = 0; i < 5; i++) s += `<g transform="translate(${120 + i * 160},${720 - i * 10})"><path d="M0,0 Q-6,-180 6,-260" stroke="#7a5a3a" stroke-width="12" fill="none"/>${[...Array(6)].map((_, k) => `<path d="M6,-260 q${Math.cos(k) * 80},${-30 + Math.sin(k) * 20} ${Math.cos(k) * 130},${30 + Math.sin(k) * 40}" stroke="#3a8a3a" stroke-width="16" fill="none" stroke-linecap="round"/>`).join('')}</g>`;
  s += rP(760, 1000, 2.4, t, ESC({ ph: 1, child: true, top: '#4fb3f6', skin: '#9c6a48', wave: true })) + rP(1000, 1020, 2.1, t, ESC({ ph: 3, child: true, top: '#f2c14e', skin: '#c99470', dir: -1 }));
  return s + rLabel('Gabriel', 760, 600, 34) + rLabel('Saúl', 1000, 680, 34) + rLabel('Santiago, República Dominicana', W / 2, 80, 40);
};
scenes.ma_viaje = function (t) {
  let s = MAALL() + `<rect width="${W}" height="${H}" fill="url(#rSkyDay)"/>` + rClouds(t, [[200, 300, 1, 3], [900, 700, .8, 3], [1500, 400, 1, 3]]);
  const y = 520 + S(t, 1) * 30;
  s += `<g transform="translate(960,${y}) rotate(-4)"><path d="M-380,0 Q-380,-60 -300,-60 L320,-60 Q400,-50 420,0 Q400,40 320,46 L-300,46 Q-380,46 -380,0Z" fill="#f4f6fa"/><path d="M-300,-60 L-360,-190 L-280,-190 L-200,-60Z" fill="#c60b1e"/><path d="M-60,0 L80,170 L170,170 L120,0Z" fill="#dfe4ec"/><path d="M-60,-30 L60,-200 L130,-200 L110,-30Z" fill="#dfe4ec"/>${[...Array(12)].map((_, i) => `<circle cx="${-240 + i * 44}" cy="-16" r="11" fill="#4a6a8a"/>`).join('')}<path d="M330,-50 Q390,-40 410,-6 L340,-6Z" fill="#2b3a67"/></g>`;
  return s + rLabel('Santo Domingo ✈ Madrid', W / 2, 960, 44);
};
scenes.ma_bernabeu = function (t) {
  let s = MAALL() + sky(t) + `<g transform="translate(960,780)"><rect x="-820" y="-420" width="1640" height="420" fill="#cfd4d8"/>${[...Array(30)].map((_, i) => `<rect x="${-800 + i * 55}" y="-420" width="30" height="420" fill="#e8ecef"/>`).join('')}<path d="M-860,-420 Q0,-520 860,-420 L860,-380 Q0,-480 -860,-380Z" fill="#b8bec4"/>
  ${[-700, 700].map(x => `<g transform="translate(${x},0)"><rect x="-90" y="-500" width="180" height="500" fill="#bfc6cc"/><path d="M-90,-500 L90,-500" stroke="#9aa2aa" stroke-width="10"/>${[...Array(10)].map((_, k) => `<path d="M-90,${-40 - k * 46} L90,${-80 - k * 46}" stroke="#9aa2aa" stroke-width="6"/>`).join('')}</g>`).join('')}
  <rect x="-420" y="-360" width="840" height="80" fill="#fff"/><text x="0" y="-306" font-family="Fredoka" font-weight="700" font-size="50" text-anchor="middle" fill="#2b3a67" letter-spacing="4">ESTADIO SANTIAGO BERNABÉU</text></g>` + street(780);
  s += [...Array(10)].map((_, i) => rP(120 + i * 180, 900 + (i % 3) * 50, 1.3 + (i % 3) * .2, t, { ph: i, top: i % 3 ? '#fff' : '#2b3a67', bot: '#fff', dir: i % 2 ? 1 : -1 })).join('');
  return s + rLabel('¡A muchos niños les encanta el fútbol!', W / 2, 1020, 38);
};
scenes.ma_flamenco = function (t) {
  let s = MAALL() + `<rect width="${W}" height="${H}" fill="#3a1a1a"/><circle cx="960" cy="420" r="600" fill="#ffcf7a" opacity=".18"/><rect x="0" y="780" width="${W}" height="300" fill="url(#rWood)"/>`;
  const sw = S(t, 2) * 14;
  s += `<g transform="translate(960,960)">${rShadow(0, 0, 150, .35)}<g transform="rotate(${sw * .3})"><path d="M-30,-300 L30,-300 L60,-160 Q160,-60 ${180 + sw * 3},0 Q0,30 ${-180 + sw * 3},0 Q-160,-60 -60,-160Z" fill="#c8102e"/>${[...Array(5)].map((_, k) => `<path d="M${-170 + k * 10},${-10 - k * 30} Q0,${-40 - k * 30} ${170 - k * 10},${-10 - k * 30}" stroke="#fff" stroke-width="6" fill="none" opacity=".75"/>`).join('')}${[...Array(14)].map((_, k) => `<circle cx="${-120 + (k * 53) % 240}" cy="${-40 - (k * 37) % 220}" r="8" fill="#fff"/>`).join('')}
  <path d="M-26,-290 L-90,${-420 + sw * 2} M26,-290 L90,${-430 - sw * 2}" stroke="#c8102e" stroke-width="20" stroke-linecap="round"/><circle cx="-94" cy="${-430 + sw * 2}" r="12" fill="#e2b48e"/><circle cx="94" cy="${-440 - sw * 2}" r="12" fill="#e2b48e"/>
  <rect x="-10" y="-330" width="20" height="30" fill="#e2b48e"/><circle cx="0" cy="-360" r="34" fill="#e2b48e"/><path d="M-36,-366 Q0,-410 36,-366 Q30,-390 0,-396 Q-30,-390 -36,-366Z" fill="#1a1010"/><circle cx="28" cy="-380" r="20" fill="#1a1010"/><circle cx="-28" cy="-392" r="14" fill="#e8102e"/></g></g>`;
  s += rP(420, 960, 2.6, t, ESC({ ph: 2, top: '#1a1a1a', bot: '#1a1a1a', hold: `<g transform="translate(0,-60) rotate(-20)"><ellipse cx="0" cy="0" rx="30" ry="22" fill="#c98a3a"/><circle cx="0" cy="0" r="7" fill="#3a2a1a"/><rect x="20" y="-4" width="70" height="8" fill="#6b4a36"/></g>` }));
  s += rP(1500, 960, 2.4, t, ESC({ ph: 4, top: '#f2c14e', child: true, dir: -1, wave: true })) + `<text x="${1500 + S(t, 8) * 10}" y="640" font-family="Fredoka" font-weight="700" font-size="60" text-anchor="middle" fill="#ffcf7a" opacity="${.5 + .5 * Math.abs(S(t, 4))}">👏</text>`;
  return s + rLabel('Flamenco: palmas, guitarra y baile', W / 2, 80, 40) + bubble(1360, 300, '¡Olé!', 56, '#c8102e', 1);
};
scenes.ma_arbol = function (t) {
  let s = MAALL() + sky(t) + grass(620) + rTree(960, 760, 2.0, 'green', t, 911) + rTree(200, 640, .6, 'green', t, 912) + rTree(1720, 640, .6, 'green', t, 913);
  const sit = (x, col, ph, skin, o = {}) => `<g transform="translate(${x},900) scale(1.8)">${rShadow(0, 0, 30)}<path d="M-14,-6 L20,-6 L24,0 M-14,-6 L-20,0" stroke="#2b2f3a" stroke-width="10" stroke-linecap="round"/><path d="M-14,-60 L14,-60 L16,-6 L-16,-6Z" fill="${col}"/><circle cx="0" cy="-74" r="14" fill="${skin}"/><path d="M-14,-76 Q0,-96 14,-76 Q8,-84 0,-86 Q-8,-84 -14,-76Z" fill="#2b1d16"/>${o.long ? `<path d="M-14,-76 L-16,-56 L-10,-56Z M14,-76 L16,-56 L10,-56Z" fill="#2b1d16"/>` : ''}</g>`;
  s += sit(700, '#4fb3f6', 1, '#9c6a48') + sit(860, '#f2c14e', 2, '#c99470') + sit(1060, '#fff', 3, '#f1cfae') + sit(1220, '#c8323a', 4, '#e3b48e', { long: 1 }) + ball(1380, 960);
  return s;
};
scenes.ma_sanisidro = function (t) {
  let s = MAALL() + sky(t) + grass(560) + [...Array(5)].map((_, i) => rTree(100 + i * 430, 600, .7, 'green', t, 950 + i)).join('');
  s += `${[...Array(18)].map((_, i) => `<path d="M${i * 110},300 l55,40 l55,-40" fill="${['#c60b1e', '#ffc400', '#fff'][i % 3]}" stroke="#555" stroke-width="2"/>`).join('')}<path d="M0,300 Q960,360 1920,300" stroke="#555" stroke-width="3" fill="none"/>`;
  const chulapo = (x, y, sc, ph, dir) => rP(x, y, sc, t, { ph, dir, top: '#2a2a2a', bot: '#4a4a4a', walk: false }) + `<g transform="translate(${x},${y}) scale(${sc * dir},${sc})"><path d="M-16,-152 Q0,-164 16,-152 L18,-146 L-18,-146Z" fill="#555"/><rect x="-8" y="-118" width="16" height="20" fill="#fff"/><circle cx="-8" cy="-112" r="5" fill="#c60b1e"/></g>`;
  const chulapa = (x, y, sc, ph, dir) => rP(x, y, sc, t, { ph, dir, top: '#fff', skirt: '#fff', bot: '#fff', walk: false, longhair: true }) + `<g transform="translate(${x},${y}) scale(${sc * dir},${sc})"><path d="M-17,-74 L17,-74 L30,-4 L-30,-4Z" fill="#fff" stroke="#ddd"/>${[...Array(10)].map((_, k) => `<circle cx="${-20 + (k * 13) % 40}" cy="${-70 + (k * 17) % 64}" r="3" fill="#c60b1e"/>`).join('')}<path d="M-14,-154 Q0,-170 14,-154 L18,-140 L-18,-140Z" fill="#fff"/><circle cx="12" cy="-150" r="6" fill="#c60b1e"/><path d="M-16,-120 L0,-100 L16,-120" stroke="#f4efe4" stroke-width="5" fill="none"/></g>`;
  const k = S(t, 2) * 20;
  s += chulapo(640 + k, 960, 2.1, 1, 1) + chulapa(800 + k, 960, 2.0, 2, -1) + chulapo(1160 - k, 980, 2.1, 3, 1) + chulapa(1320 - k, 980, 2.0, 4, -1);
  s += `<g transform="translate(300,960)"><rect x="-160" y="-10" width="320" height="30" fill="#c60b1e" opacity=".85"/>${[...Array(6)].map((_, i) => `<rect x="${-160 + i * 60}" y="-10" width="30" height="30" fill="#fff" opacity=".7"/>`).join('')}</g>` + rP(220, 960, 1.5, t, ESC({ ph: 6, child: true, top: '#f2c14e' }));
  return s + rLabel('Fiestas de San Isidro: chulapos y chulapas', W / 2, 90, 40);
};
scenes.ma_rd_fiesta = function (t) {
  let s = MAALL() + `<rect width="${W}" height="${H}" fill="#1e2a4a"/>` + rStars(t, 40) + `<rect x="0" y="760" width="${W}" height="320" fill="#c9a07a"/>`;
  s += `<path d="${[...Array(24)].map((_, i) => `${i ? 'L' : 'M'}${40 + i * 80},${188 + Math.sin(i / 2) * 30}`).join(' ')}" stroke="#555" stroke-width="3" fill="none"/>${[...Array(24)].map((_, i) => `<circle cx="${40 + i * 80}" cy="${200 + Math.sin(i / 2) * 30}" r="12" fill="${['#ffd34d', '#ff8a5a', '#8affc0'][i % 3]}" opacity="${.6 + .4 * S(t, 4, i)}"/>`).join('')}` + doFlag(1700, 591, 1.3);
  s += `<g transform="translate(520,820)"><rect x="-260" y="-20" width="520" height="30" fill="#7a5232"/><rect x="-240" y="10" width="20" height="120" fill="#6b4a36"/><rect x="220" y="10" width="20" height="120" fill="#6b4a36"/>${plate(-140, -40, 90, `<ellipse rx="56" ry="16" fill="#fbfbf7"/><ellipse cx="-10" rx="30" ry="10" fill="#8a3a2a"/>`)}${plate(110, -40, 90, `${[0, 1, 2].map(k => `<ellipse cx="${-30 + k * 30}" cy="0" rx="22" ry="10" fill="#f2c860"/>`).join('')}`)}</g>`;
  const bounce = Math.abs(S(t, 8)) * 12;
  s += rP(1000, 1000 - bounce, 2.3, t, ESC({ ph: 1, top: '#ce1126', skin: '#9c6a48', hold: `<g transform="translate(0,-60)"><rect x="-30" y="-8" width="60" height="16" rx="6" fill="#c9c9c9"/>${[...Array(6)].map((_, k) => `<line x1="${-24 + k * 10}" y1="-8" x2="${-24 + k * 10}" y2="8" stroke="#888"/>`).join('')}</g>` }));
  s += rP(1260, 1000, 2.3, t, ESC({ ph: 3, top: '#002d62', skin: '#c99470', hold: `<g transform="translate(0,-56)"><rect x="-30" y="-20" width="60" height="40" rx="10" fill="#a86a3a"/><ellipse cx="-30" cy="0" rx="6" ry="20" fill="#efe2c6"/><ellipse cx="30" cy="0" rx="6" ry="20" fill="#efe2c6"/></g>` }));
  s += rP(1480, 1010 - Math.abs(S(t, 8, 1)) * 12, 1.9, t, ESC({ ph: 4, child: true, top: '#fff', skin: '#9c6a48', wave: true }));
  return s + rLabel('En República Dominicana: ¡música y comida!', W / 2, 80, 38);
};
scenes.ma_cibeles = function (t) {
  let s = MAALL() + sky(t, 'dusk') + `<g transform="translate(960,700)"><rect x="-700" y="-380" width="1400" height="380" fill="#f2ede2"/>${[...Array(14)].map((_, i) => `<rect x="${-660 + i * 96}" y="-330" width="40" height="90" fill="#5a6070"/><rect x="${-660 + i * 96}" y="-200" width="40" height="90" fill="#5a6070"/>`).join('')}<path d="M-120,-380 L-100,-560 L100,-560 L120,-380Z" fill="#f2ede2"/><path d="M-100,-560 L0,-640 L100,-560Z" fill="#e2dccd"/>${[-560, 560].map(x => `<path d="M${x - 70},-380 L${x - 50},-470 L${x + 50},-470 L${x + 70},-380Z" fill="#f2ede2"/><path d="M${x - 50},-470 L${x},-520 L${x + 50},-470Z" fill="url(#maSlate)"/>`).join('')}</g>` + street(700);
  s += cibeles(960, 880, .95, t);
  s += rCrowd(t, 131, 26, 860, 1075, { tops: ['#fff', '#fff', '#2b3a67', '#fff', '#c8323a'] });
  s += [...Array(30)].map((_, i) => `<rect x="${(i * 67) % W}" y="${((i * 41) + t / L * 500) % 700}" width="12" height="18" fill="${['#ffc400', '#c60b1e', '#fff', '#4fb3f6'][i % 4]}" transform="rotate(${i * 30} ${(i * 67) % W} ${((i * 41) + t / L * 500) % 700})"/>`).join('');
  return s + rLabel('¡Toda la ciudad celebra en la fuente de Cibeles!', W / 2, 80, 38);
};
scenes.ma_juntos = function (t) {
  let s = MAALL() + sky(t) + grass(640) + [...Array(6)].map((_, i) => rTree(100 + i * 340, 660, .6, 'green', t, 990 + i)).join('');
  const bx = 960 + S(t, 1) * 300;
  s += rP(bx - 320, 980, 2.2, t, { ph: 1, child: true, top: '#4fb3f6', skin: '#9c6a48' }) + rP(bx + 320, 1000, 2.2, t, { ph: 3, child: true, top: '#f2c14e', skin: '#c99470', dir: -1 }) + rP(bx - 80, 920, 1.9, t, { ph: 5, child: true, top: '#fff', dir: -1 }) + rP(bx + 140, 930, 1.9, t, { ph: 2, child: true, top: '#c8323a', longhair: true });
  s += ball(bx, 1000 - Math.abs(S(t, 4)) * 80, 26);
  return s + rLabel('Siempre hay algo que nos conecta: ¡jugar juntos!', W / 2, 80, 38);
};
scenes.ma_moraleja = function (t) {
  let s = MAALL() + `<rect width="${W}" height="${H}" fill="#fdf3dc"/>`;
  s += `<rect x="948" y="680" width="24" height="200" fill="#8a6a46"/><ellipse cx="960" cy="885" rx="120" ry="24" fill="#6b4a36"/>${rShadow(960, 890, 140)}<path d="M690,440 A270,270 0 0 0 1230,440" stroke="url(#maGold)" stroke-width="14" fill="none"/><g transform="translate(960,440) rotate(${t / L * 20})"><circle r="250" fill="#5aa6dc"/><path d="M-160,-120 Q-60,-200 40,-140 Q80,-60 0,-20 Q-80,40 -160,-20Z M40,40 Q140,0 190,60 Q170,160 80,180 Q20,120 40,40Z M-200,80 Q-140,60 -120,120 Q-160,180 -210,140Z" fill="#7ac05a"/></g>`;
  const kids = [['#4fb3f6', '#9c6a48'], ['#c8323a', '#f1cfae'], ['#f2c14e', '#c99470'], ['#7a5a8a', '#e3b48e'], ['#2f9a4a', '#5a3a2a'], ['#ff8a5a', '#f5d8bd']];
  s += kids.map(([c, sk], i) => { const a = Math.PI * (.05 + i * .18); return rP(960 + Math.cos(a) * 520 * (i % 2 ? 1 : -1) * (i < 3 ? 1 : .55), 940 - (i % 3) * 10, 2.0, t, ESC({ ph: i, child: true, top: c, skin: sk, wave: i % 2 == 0, longhair: i % 3 == 1 })); }).join('');
  return s + rLabel('Moraleja: la amistad se habla igual en todo el mundo', W / 2, 1020, 36);
};
scenes.ma_atardecer = function (t) {
  let s = MAALL() + rSky('dusk') + rSun(1500, 470, 90) + palacioReal(860, 800, .95) + `<rect x="0" y="800" width="${W}" height="280" fill="#6a5a6a"/><rect x="0" y="800" width="${W}" height="280" fill="#e8908a" opacity=".2"/>`;
  return s + rCrowd(t, 141, 10, 860, 1060, { tops: ['#3a3a4a', '#5a4a5a', '#2b3a67'] });
};
scenes.ma_postales = function (t) {
  const card = (i, name, label) => `<g transform="translate(${170 + i * 560},300) rotate(${(i - 1) * 3})"><rect x="-4" y="-2" width="520" height="430" fill="#000" opacity=".25"/><rect x="-12" y="-12" width="520" height="430" fill="#fff"/><circle cx="248" cy="-4" r="12" fill="#e8352a"/>
  <svg x="0" y="0" width="496" height="279" viewBox="0 0 1920 1080">${scenes[name](t)}</svg><text x="248" y="360" font-family="Fredoka" font-weight="700" font-size="48" text-anchor="middle" fill="#2b3a67">${label}</text></g>`;
  return MAALL() + `<rect width="${W}" height="${H}" fill="#b9895a"/><rect x="30" y="30" width="${W - 60}" height="${H - 60}" fill="none" stroke="#7a5232" stroke-width="30"/>` + rLabel('¡Ya hemos viajado a…!', W / 2, 160, 48)
    + card(0, 'ro_coliseo', 'Roma 🇮🇹') + card(1, 'p_eiffel', 'París 🇫🇷') + card(2, 'r_torre', 'Tokio 🇯🇵');
};
scenes.ma_compartir = function (t) {
  let s = MAALL() + `<rect width="${W}" height="${H}" fill="#fdf3dc"/><rect x="0" y="760" width="${W}" height="320" fill="#d9b88a"/><rect x="200" y="160" width="520" height="380" fill="#9ed0f0" stroke="#fff" stroke-width="18"/><path d="M200,460 Q460,380 720,460 L720,540 L200,540Z" fill="#7ac05a"/>`;
  s += rP(800, 1000, 2.6, t, ESC({ ph: 1, child: true, top: '#4fb3f6', skin: '#c99470', hold: `<g transform="translate(6,-58)"><rect x="-26" y="-18" width="52" height="36" rx="6" fill="#2b3a67"/><rect x="-22" y="-14" width="44" height="28" fill="#ffcc2e"/></g>` }));
  s += rP(1100, 1000, 2.6, t, ESC({ ph: 3, child: true, top: '#c8323a', longhair: true, dir: -1 })) + rP(1380, 1010, 2.2, t, ESC({ ph: 4, child: true, top: '#2f9a4a', dir: -1, wave: true }));
  s += `<g transform="translate(950,420)"><path d="M-120,40 Q-120,-80 0,-80 Q120,-80 120,40" stroke="#2b3a67" stroke-width="18" fill="none"/><rect x="-140" y="20" width="44" height="70" rx="16" fill="#c60b1e"/><rect x="96" y="20" width="44" height="70" rx="16" fill="#c60b1e"/></g>`;
  s += [...Array(5)].map((_, i) => `<text x="${1000 + i * 90}" y="${520 - ((t / L * 2 + i * .2) % 1) * 200}" font-size="54" fill="#2b3a67" opacity="${1 - ((t / L * 2 + i * .2) % 1)}">♪</text>`).join('');
  return s + rLabel('¡Compártelo con tus primos y amigos!', W / 2, 90, 42);
};
scenes.ma_outro = function (t) {
  let s = MAALL() + sky(t, 'dusk') + rSun(1500, 420, 80) + madridBlock(-20, 860, 420, 520, '#e8cdb0') + madridBlock(1500, 860, 440, 560, '#e2c4a8') + metropolis(960, 860, .95) + street(860) + maCrowd(t, 151, 12, 900, 1060);
  return s + `<g transform="translate(${W / 2},${H / 2 - 220}) scale(${1 + S(t, 2) * .01})"><rect x="-620" y="-150" width="1240" height="300" rx="40" fill="#fff" opacity=".95" stroke="#2b3a67" stroke-width="6"/>
  <text x="0" y="-20" font-family="Fredoka" font-weight="700" font-size="100" text-anchor="middle" fill="#c60b1e" stroke="#2b3a67" stroke-width="3" paint-order="stroke">¡Adiós, Madrid!</text>
  <text x="0" y="90" font-family="Fredoka" font-weight="600" font-size="52" text-anchor="middle" fill="#2b3a67">Nos vemos en el próximo viaje ✈</text></g>`;
};

/* =====================================================================
   v3 (21-nov) — correcciones de Vinelis: más detalle en los lugares,
   coches en el sentido correcto, zapatos en tarjeta y Bernabéu detallado.
   (Estas definiciones sustituyen a las anteriores del mismo nombre.)
   ===================================================================== */
function farola(x, base, s = 1) { // farola fernandina madrileña
  return `<g transform="translate(${x},${base}) scale(${s})">${rShadow(0, 0, 30, .2)}<path d="M-14,0 L14,0 L10,-30 L-10,-30Z" fill="#23272e"/><rect x="-5" y="-250" width="10" height="222" fill="#2b3038"/><path d="M-12,-60 h24 M-10,-140 h20" stroke="#2b3038" stroke-width="6"/>
  <path d="M0,-250 Q-50,-260 -60,-290 M0,-250 Q50,-260 60,-290" stroke="#2b3038" stroke-width="6" fill="none"/>${[-60, 60].map(dx => `<g transform="translate(${dx},-300)"><path d="M-16,-30 L16,-30 L12,10 L-12,10Z" fill="#fff4c2" stroke="#2b3038" stroke-width="4"/><path d="M-20,-30 L20,-30 L0,-46Z" fill="#2b3038"/></g>`).join('')}</g>`;
}
function geranio(x, y, s = 1) { return `<g transform="translate(${x},${y}) scale(${s})"><rect x="-16" y="-10" width="32" height="14" fill="#b85a3a"/>${[[-10, -16], [0, -22], [10, -16], [-4, -12], [6, -12]].map(([a, b], k) => `<circle cx="${a}" cy="${b}" r="6" fill="${k % 2 ? '#e8343a' : '#3f7a3a'}"/>`).join('')}</g>`; }
function madridBlock(x, base, w, h, col = '#e9dcc4', roof = '#6a7484') {
  let s = `<rect x="${x}" y="${base - h}" width="${w}" height="${h}" fill="${col}"/><rect x="${x + w - 14}" y="${base - h}" width="14" height="${h}" fill="#000" opacity=".07"/>
  <rect x="${x - 6}" y="${base - h - 12}" width="${w + 12}" height="14" fill="#cfc4ae"/>${[...Array(Math.floor(w / 18))].map((_, i) => `<rect x="${x + 4 + i * 18}" y="${base - h + 2}" width="9" height="9" fill="#cfc4ae"/>`).join('')}
  <path d="M${x},${base - h - 12} L${x + 20},${base - h - 50} L${x + w - 20},${base - h - 50} L${x + w},${base - h - 12}Z" fill="${roof}"/>${[...Array(Math.max(1, Math.floor(w / 160)))].map((_, i) => `<g transform="translate(${x + 60 + i * 160},${base - h - 50})"><rect x="-16" y="-34" width="32" height="34" fill="#efe6d2"/><path d="M-20,-34 L0,-52 L20,-34Z" fill="${roof}"/><rect x="-9" y="-26" width="18" height="22" fill="#3a3f4a"/></g>`).join('')}
  <rect x="${x + 10}" y="${base - h + 18}" width="${w - 20}" height="4" fill="#d6c9ae"/>`;
  const cols = Math.max(2, Math.floor(w / 70)), rows = Math.floor((h - 100) / 80);
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const wx = x + 16 + c * (w - 32) / cols, wy = base - h + 26 + r * 80, ww = (w - 32) / cols - 22;
    s += `<rect x="${wx - 5}" y="${wy - 8}" width="${ww + 10}" height="8" fill="#d8ccb2"/><rect x="${wx}" y="${wy}" width="${ww}" height="50" fill="#3a3f4a"/><rect x="${wx + ww / 2 - 1}" y="${wy}" width="2" height="34" fill="#6a7484"/><rect x="${wx + 2}" y="${wy + 2}" width="${ww / 2 - 4}" height="14" fill="#fff" opacity=".18"/>
    <rect x="${wx - 4}" y="${wy + 46}" width="${ww + 8}" height="6" fill="#2a2a2a"/>${[...Array(5)].map((_, k) => `<line x1="${wx - 2 + k * (ww + 4) / 4}" y1="${wy + 34}" x2="${wx - 2 + k * (ww + 4) / 4}" y2="${wy + 50}" stroke="#2a2a2a" stroke-width="2"/>`).join('')}<line x1="${wx - 4}" y1="${wy + 34}" x2="${wx + ww + 4}" y2="${wy + 34}" stroke="#2a2a2a" stroke-width="2"/>${(r + c) % 3 == 0 ? geranio(wx + ww / 2, wy + 34, .9) : ''}`; }
  // planta baja: comercios con toldos de rayas
  const shops = Math.max(1, Math.floor(w / 160)), sw = w / shops, aw = ['#c8323a', '#2f6a4a', '#2b5a9a', '#d98a2a'];
  s += `<rect x="${x}" y="${base - 90}" width="${w}" height="90" fill="#8a7a64"/>`;
  for (let i = 0; i < shops; i++) { const sx = x + i * sw;
    s += `<rect x="${sx + 12}" y="${base - 70}" width="${sw - 24}" height="66" fill="#4a5a6a"/><rect x="${sx + 12}" y="${base - 70}" width="${sw - 24}" height="66" fill="#fff" opacity=".14"/><rect x="${sx + sw / 2 - 14}" y="${base - 66}" width="28" height="62" fill="#2a3440"/>
    <path d="M${sx + 6},${base - 88} L${sx + sw - 6},${base - 88} L${sx + sw - 16},${base - 62} L${sx + 16},${base - 62}Z" fill="${aw[(i + Math.round(x)) % 4]}"/>${[...Array(Math.floor((sw - 20) / 24))].map((_, k) => `<path d="M${sx + 16 + k * 24},${base - 88} l12,0 l-2,26 l-12,0Z" fill="#fff" opacity=".85"/>`).join('')}`; }
  return s;
}
function maCarMove(t, lane) { // coches que circulan por la derecha: carril cercano → derecha, carril lejano → izquierda
  const cars = lane == 'near' ? [['#c8323a', 0], ['#2b5a9a', .5]] : [['#f2f2f2', .78]];
  return cars.map(([col, ph]) => { const p = ((t / L) + ph) % 1, x = lane == 'near' ? -220 + p * 2360 : 2140 - p * 2360, y = lane == 'near' ? 975 : 905, sc = lane == 'near' ? 1.05 : .88;
    const spin = t / L * 360 * 8 * (lane == 'near' ? 1 : -1);
    return rCar(x, y, sc, col, lane == 'near' ? 1 : -1) + [-55, 58].map(wx => `<g transform="translate(${x + wx * sc * (lane == 'near' ? 1 : -1)},${y - 10 * sc}) rotate(${spin})"><path d="M-7,0 H7 M0,-7 V7" stroke="#666" stroke-width="3"/></g>`).join(''); }).join('');
}
function maBus(t) { const p = ((t / L) + .28) % 1, x = 2140 - p * 2360;
  return `<g transform="translate(${x},905) scale(.9)">${rShadow(160, 4, 200)}<rect x="0" y="-150" width="340" height="140" rx="16" fill="#d8262e"/><rect x="0" y="-58" width="340" height="14" fill="#fff" opacity=".9"/>${[...Array(5)].map((_, i) => `<rect x="${40 + i * 58}" y="-132" width="48" height="58" rx="6" fill="#9fc0dc"/>`).join('')}<path d="M0,-150 L-14,-130 L-14,-30 L0,-10Z" fill="#b81e26"/><rect x="-10" y="-128" width="30" height="80" rx="4" fill="#9fc0dc"/><rect x="8" y="-146" width="70" height="18" rx="3" fill="#222"/><text x="43" y="-132" font-family="Fredoka" font-weight="700" font-size="14" text-anchor="middle" fill="#ffb42a">SOL</text>
  ${[60, 270].map(wx => `<circle cx="${wx}" cy="-10" r="22" fill="#222"/><circle cx="${wx}" cy="-10" r="9" fill="#999"/>`).join('')}</g>`; }
scenes.ma_granvia = function (t) {
  let s = MAALL() + sky(t) + madridBlock(-20, 800, 380, 560, '#efe2c6') + madridBlock(360, 800, 300, 480, '#e2cfb2') + madridBlock(1300, 800, 320, 500, '#e9dcc4') + madridBlock(1620, 800, 320, 600, '#f0e4cc');
  s += metropolis(960, 800, .9) + rRoadScene(t, 800, { move: 0, front: false });
  s += farola(140, 860, .9) + farola(700, 860, .9) + farola(1240, 860, .9) + farola(1780, 860, .9);
  s += maBus(t) + maCarMove(t, 'far') + maCarMove(t, 'near');
  s += esFlag(560, 220, .8) + `<rect x="0" y="1030" width="${W}" height="50" fill="url(#rWalk)"/>`;
  return s + rLabel('Madrid · Gran Vía', W / 2, 1000, 38);
};
scenes.ma_retiro_ninos = function (t) {
  let s = MAALL() + retiro(t, false);
  const bx = 960 + S(t, 1) * 380;
  s += rP(bx - 260, 1000, 1.7, t, { ph: 1, child: true, top: '#4fb3f6', skin: '#9c6a48' }) + rP(bx + 300, 1040, 1.7, t, { ph: 3, child: true, top: '#f2c14e', skin: '#c99470', dir: -1 }) + rP(bx + 40, 980, 1.6, t, { ph: 5, child: true, top: '#fff', bot: '#2b3a67', dir: -1 });
  s += rP(1680, 1060, 1.7, t, ESC({ ph: 2, child: true, top: '#c8323a', longhair: true, dir: -1 })) + ball(bx, 1040 - Math.abs(S(t, 4)) * 60, 22);
  s += farola(90, 1000, .7) + farola(1830, 1000, .7);
  return s + rLabel('Parque del Retiro', 330, 80, 40);
};
scenes.ma_palacio = function (t) {
  let s = MAALL() + sky(t, 'day', [300, 150]) + palacioReal(960, 820, 1.08) + `<rect x="0" y="820" width="${W}" height="260" fill="#d9ccb0"/>${[...Array(14)].map((_, i) => `<line x1="0" y1="${840 + i * 18}" x2="${W}" y2="${840 + i * 18}" stroke="#c9bc9e" stroke-width="2"/>`).join('')}`;
  // verja de la Plaza de la Armería con pilares y jarrones
  s += `<rect x="0" y="846" width="${W}" height="6" fill="#2b3038"/>${[...Array(97)].map((_, i) => `<line x1="${i * 20}" y1="852" x2="${i * 20}" y2="${806}" stroke="#2b3038" stroke-width="3"/><circle cx="${i * 20}" cy="804" r="3" fill="url(#maGold)"/>`).join('')}<rect x="0" y="812" width="${W}" height="4" fill="#2b3038"/>`;
  s += [100, 560, 1360, 1820].map(x => `<g transform="translate(${x},852)"><rect x="-24" y="-90" width="48" height="90" fill="#e2dccd"/><rect x="-30" y="-98" width="60" height="12" fill="#cfc6b4"/><path d="M-14,-98 Q-22,-130 0,-140 Q22,-130 14,-98Z" fill="#cfc6b4"/></g>`).join('');
  s += farola(330, 1000, .85) + farola(1590, 1000, .85) + `<g>${[...Array(8)].map((_, i) => `<ellipse cx="${200 + i * 220}" cy="1060" rx="70" ry="22" fill="#4f8a3a"/>`).join('')}</g>`;
  return s + maCrowd(t, 101, 12, 880, 1050) + rLabel('Palacio Real · más de 3.000 habitaciones', W / 2, 1010, 36);
};
scenes.ma_prado = function (t) {
  let s = MAALL() + sky(t) + `<rect x="0" y="520" width="${W}" height="120" fill="#5f8a48"/>` + [...Array(6)].map((_, i) => rTree(80 + i * 360, 560, .5, 'green', t, 800 + i)).join('') + prado(960, 820, 1) + `<rect x="0" y="820" width="${W}" height="260" fill="#cfc4ae"/>`;
  // lonas del museo entre las columnas y parterres con flores
  s += [-560, 560].map(dx => `<g transform="translate(${960 + dx},560)"><rect x="-60" y="0" width="120" height="200" fill="#7a1a24"/><rect x="-60" y="0" width="120" height="200" fill="#fff" opacity=".06"/><text x="0" y="90" font-family="Fredoka" font-weight="700" font-size="26" text-anchor="middle" fill="#f4e4c4">MUSEO</text><text x="0" y="124" font-family="Fredoka" font-weight="700" font-size="26" text-anchor="middle" fill="#f4e4c4">DEL PRADO</text><rect x="-64" y="-6" width="128" height="8" fill="#5a5048"/></g>`).join('');
  s += [180, 520, 1400, 1740].map(x => `<g transform="translate(${x},880)"><ellipse rx="130" ry="26" fill="#4f8a3a"/>${[...Array(12)].map((_, k) => `<circle cx="${-100 + k * 18}" cy="${-6 - (k % 3) * 6}" r="7" fill="${['#e8343a', '#f2c14e', '#ff9ad5'][k % 3]}"/>`).join('')}</g>`).join('');
  s += statueMan(960, 980, 1.1) + farola(700, 1000, .8) + farola(1220, 1000, .8) + maCrowd(t, 121, 12, 900, 1070);
  return s + rLabel('Museo del Prado', W / 2, 80, 44);
};
scenes.ma_churros = function (t) {
  let s = MAALL() + `<rect width="${W}" height="${H}" fill="#f4e4c4"/>`;
  // pared de azulejos y mostrador de la churrería
  s += `${[...Array(13)].map((_, i) => [...Array(5)].map((_, j) => `<g transform="translate(${i * 150 + 75},${190 + j * 90})"><rect x="-72" y="-42" width="144" height="84" fill="#fbf6ea" stroke="#d9c9a6" stroke-width="3"/><path d="M0,-30 L22,0 L0,30 L-22,0Z" fill="#2b6aa8" opacity=".75"/><circle r="8" fill="#f2c14e"/></g>`).join('')).join('')}`;
  s += `<rect x="0" y="0" width="${W}" height="140" fill="#2f6a4a"/><text x="960" y="96" font-family="Fredoka" font-weight="700" font-size="64" text-anchor="middle" fill="#f4e4c4" letter-spacing="8">CHURRERÍA</text>${[...Array(20)].map((_, i) => `<path d="M${i * 100},140 l50,0 l-6,30 l-38,0Z" fill="${i % 2 ? '#fff' : '#2f6a4a'}"/>`).join('')}`;
  s += `<rect x="0" y="600" width="${W}" height="480" fill="#fbfbf7"/>${[...Array(24)].map((_, i) => `<rect x="${i * 80}" y="600" width="40" height="480" fill="#c8323a" opacity=".12"/>`).join('')}`;
  s += plate(700, 780, 380, '') + churro(640, 720, -6) + churro(660, 770, 3) + churro(700, 820, -2);
  s += `<g transform="translate(260,700)"><path d="M-50,0 L50,0 L40,-110 L-40,-110Z" fill="#fff" stroke="#d6d6d6" stroke-width="3"/><path d="M-40,-110 Q0,-140 40,-110" fill="#f4f4f4"/><text x="0" y="-46" font-family="Fredoka" font-weight="700" font-size="22" text-anchor="middle" fill="#9a9a9a">AZÚCAR</text></g>`;
  s += `<g transform="translate(1660,700)"><rect x="-70" y="-120" width="140" height="120" rx="10" fill="#b8bec4"/><rect x="-50" y="-100" width="100" height="60" fill="#fff"/>${[...Array(4)].map((_, k) => `<path d="M${-40 + k * 26},-100 l10,-26 l10,26" fill="#fff" stroke="#ddd"/>`).join('')}</g>`;
  s += steam(1300, 620, t, 2);
  const dip = Math.max(0, S(t, 1)) * 120;
  s += `<g transform="translate(1330,${600 + dip * .25}) rotate(70)">${churro(0, 0, 0, .8)}</g>` + chocoCup(1300, 760, 1.1);
  return s + rLabel('Churros con chocolate caliente', W / 2, 990, 44) + rArrowLabel('Crujientes por fuera, suaves por dentro', 560, 440, 640, 700, 30);
};
function zapatilla(x, y, s = 1, col = '#4f7fe0', flip = 1) { // zapatilla deportiva de perfil, con cordones y suela
  return `<g transform="translate(${x},${y}) scale(${s * flip},${s})">${rShadow(0, 52, 200, .25)}
  <path d="M-190,40 L-190,-20 Q-188,-70 -140,-80 L-40,-90 Q-10,-150 60,-150 Q120,-150 130,-100 L140,-60 Q200,-50 210,0 L212,40Z" fill="${col}" stroke="#1d2a5a" stroke-width="6" stroke-linejoin="round"/>
  <path d="M-196,40 L218,40 Q222,62 200,66 L-180,66 Q-200,62 -196,40Z" fill="#fff" stroke="#1d2a5a" stroke-width="6"/><path d="M-190,52 H210" stroke="#d6d6d6" stroke-width="4"/>
  <path d="M-190,-20 Q-150,-30 -120,-10 L-100,40" fill="none" stroke="#fff" stroke-width="10" opacity=".9"/><path d="M130,-100 Q150,-110 160,-150 L100,-160" fill="#fff" stroke="#1d2a5a" stroke-width="5"/>
  <path d="M-20,-30 Q60,-60 160,-10" stroke="#fff" stroke-width="14" fill="none" stroke-linecap="round"/>${[0, 1, 2, 3].map(k => `<path d="M${-30 + k * 34},${-96 + k * 10} l34,22 M${-30 + k * 34},${-74 + k * 10} l34,-22" stroke="#fff" stroke-width="6" stroke-linecap="round"/><circle cx="${-32 + k * 34}" cy="${-96 + k * 10}" r="5" fill="#1d2a5a"/>`).join('')}
  <path d="M30,-130 q-40,-50 -10,-70 M40,-128 q30,-40 60,-20" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/></g>`;
}
scenes.ma_zapatos = function (t) {
  let s = MAALL() + sky(t) + madridBlock(-20, 700, 660, 480, '#efe2c6') + madridBlock(640, 700, 640, 520, '#e9d4b8') + madridBlock(1280, 700, 660, 460, '#f0e4cc') + street(700) + maCrowd(t, 81, 12, 740, 860);
  s += `<rect width="${W}" height="${H}" fill="#1d2a5a" opacity=".35"/>`;
  // tarjeta de viaje: «En tu mochila» con las zapatillas cómodas
  const b = S(t, 2) * 6;
  s += `<g transform="translate(960,${560 + b}) rotate(-1.5)"><rect x="-610" y="-370" width="1220" height="740" rx="40" fill="#000" opacity=".25" transform="translate(14,16)"/><rect x="-610" y="-370" width="1220" height="740" rx="40" fill="#fffaf0" stroke="#1d2a5a" stroke-width="8"/>
  <rect x="-610" y="-370" width="1220" height="120" rx="40" fill="#c60b1e"/><rect x="-610" y="-300" width="1220" height="50" fill="#c60b1e"/><text x="0" y="-290" font-family="Fredoka" font-weight="700" font-size="58" text-anchor="middle" fill="#ffc400">Consejo de viaje</text>
  ${[...Array(9)].map((_, k) => `<line x1="-560" y1="${-200 + k * 56}" x2="560" y2="${-200 + k * 56}" stroke="#ecdfc4" stroke-width="3"/>`).join('')}
  <g transform="translate(-300,40)">${zapatilla(0, -20, 1.05, '#4f7fe0')}</g>
  <g transform="translate(300,40)"><rect x="-190" y="-230" width="380" height="380" rx="70" fill="#c8323a" stroke="#1d2a5a" stroke-width="7"/><rect x="-150" y="-100" width="300" height="170" rx="30" fill="#a8242c" stroke="#1d2a5a" stroke-width="5"/><path d="M-100,-230 Q-100,-300 0,-300 Q100,-300 100,-230" stroke="#1d2a5a" stroke-width="18" fill="none"/>
  <g transform="translate(0,${-150 - Math.abs(S(t, 2)) * 30}) scale(.42)">${zapatilla(0, 0, 1, '#4f7fe0')}</g><rect x="-120" y="-40" width="240" height="20" rx="8" fill="#1d2a5a" opacity=".35"/></g>
  <text x="0" y="300" font-family="Fredoka" font-weight="700" font-size="52" text-anchor="middle" fill="#1d2a5a">¡Zapatos cómodos en la mochila!</text></g>`;
  return s;
};
scenes.ma_bernabeu = function (t) {
  let s = MAALL() + sky(t, 'day', [1650, 120]);
  // Paseo de la Castellana: árboles al fondo
  for (let i = 0; i < 9; i++) s += rTree(60 + i * 230, 560, .5, 'green', t, 1200 + i);
  s += `<g transform="translate(960,800)">`;
  // cuerpo del estadio: piel de lamas de acero curvas que brillan
  s += `<path d="M-900,0 L-900,-360 Q-900,-470 -760,-480 L760,-480 Q900,-470 900,-360 L900,0Z" fill="#a9b2ba"/>`;
  for (let k = 0; k < 15; k++) { const y = -460 + k * 30; s += `<path d="M-900,${y} Q0,${y - 26 + Math.sin(k) * 6} 900,${y}" stroke="${k % 2 ? '#dfe5ea' : '#c3cbd2'}" stroke-width="18" fill="none"/>`; }
  const gl = ((t / L) % 1) * 2200 - 1100;
  s += `<path d="M${gl - 60},-480 L${gl + 40},-480 L${gl - 40},0 L${gl - 140},0Z" fill="#fff" opacity=".25"/>`;
  // cubierta curva y pantalla de vídeo
  s += `<path d="M-920,-470 Q0,-600 920,-470 L900,-440 Q0,-560 -900,-440Z" fill="#7d8790"/><path d="M-880,-480 Q0,-590 880,-480" stroke="#eef2f5" stroke-width="6" fill="none"/>`;
  s += `<rect x="-470" y="-400" width="940" height="140" rx="10" fill="#14243e"/><rect x="-460" y="-390" width="920" height="120" rx="6" fill="#1d3f7a"/><text x="0" y="-310" font-family="Fredoka" font-weight="700" font-size="56" text-anchor="middle" fill="#fff" letter-spacing="3">ESTADIO SANTIAGO BERNABÉU</text>`;
  s += `${[...Array(24)].map((_, i) => `<circle cx="${-450 + i * 39}" cy="-382" r="3" fill="#fff" opacity="${.3 + .7 * Math.abs(S(t, 4, i))}"/>`).join('')}`;
  // torres de esquina con rampas en espiral
  s += [-790, 790].map(x => `<g transform="translate(${x},0)"><rect x="-80" y="-430" width="160" height="430" rx="70" fill="#c9d0d6"/>${[...Array(8)].map((_, k) => `<path d="M-80,${-30 - k * 52} Q0,${-60 - k * 52} 80,${-56 - k * 52}" stroke="#8d969e" stroke-width="10" fill="none"/>`).join('')}<rect x="-80" y="-430" width="160" height="30" rx="14" fill="#b2bac1"/></g>`).join('');
  // accesos con números de puerta y taquillas
  s += [-520, -260, 0, 260, 520].map((x, i) => `<g transform="translate(${x},0)"><rect x="-80" y="-150" width="160" height="150" fill="#2b3038"/><rect x="-70" y="-140" width="140" height="140" fill="#46505c"/>${[...Array(6)].map((_, k) => `<line x1="${-60 + k * 24}" y1="-140" x2="${-60 + k * 24}" y2="0" stroke="#2b3038" stroke-width="4"/>`).join('')}<rect x="-40" y="-196" width="80" height="40" rx="8" fill="#fff"/><text x="0" y="-166" font-family="Fredoka" font-weight="700" font-size="30" text-anchor="middle" fill="#1d3f7a">P ${i + 1}</text></g>`).join('');
  s += `</g>` + street(800);
  // banderines y aficionados con bufandas
  s += `${[...Array(14)].map((_, i) => `<path d="M${i * 140},250 l70,46 l70,-46" fill="${i % 2 ? '#fff' : '#1d3f7a'}" stroke="#555" stroke-width="2" opacity=".9"/>`).join('')}<path d="M0,250 Q960,300 1920,250" stroke="#555" stroke-width="3" fill="none"/>`;
  s += farola(80, 1000, .8) + farola(1840, 1000, .8);
  s += [...Array(10)].map((_, i) => { const x = 160 + i * 175, y = 940 + (i % 3) * 45, sc = 1.25 + (i % 3) * .15;
    return rP(x, y, sc, t, { ph: i, top: i % 3 ? '#fff' : '#1d3f7a', bot: '#2b3a67', dir: i % 2 ? 1 : -1 }) + `<g transform="translate(${x},${y}) scale(${sc})"><path d="M-14,-118 Q0,-108 14,-118 L16,-110 Q0,-100 -16,-110Z" fill="${i % 2 ? '#1d3f7a' : '#fff'}"/><path d="M8,-112 L12,-70 L4,-70Z" fill="${i % 2 ? '#1d3f7a' : '#fff'}"/></g>`; }).join('');
  return s + rLabel('¡A muchos niños les encanta el fútbol!', W / 2, 1030, 38);
};

/* =====================================================================
   v4 (25-nov) — correcciones de Vinelis: personas sentadas de verdad
   (de frente, con cara) y niños que juegan pasándose la pelota.
   ===================================================================== */
// persona sentada de frente. mode 'suelo' = piernas cruzadas en el suelo; 'banco' = sentada en un banco (piernas colgando)
function rSit(x, y, s, t, o = {}) {
  const skin = o.skin || RSKIN[(o.ph || 0) % RSKIN.length], hair = o.hair || RHAIRC[(o.ph || 0) % RHAIRC.length];
  const top = o.top || '#4f7fe0', bot = o.bot || '#2b3a67', shoe = o.shoe || '#222', child = o.child !== false;
  const k = child ? 1 : 1.2, nod = S(t, 2, o.ph || 0) * 1.5, mouth = o.talk ? 2 + Math.abs(S(t, 8, o.ph || 0)) * 3 : 0;
  let legs;
  if (o.mode == 'banco') legs = `<path d="M-10,8 L-11,${40 * k} M10,8 L11,${40 * k}" stroke="${bot}" stroke-width="10" stroke-linecap="round"/><ellipse cx="-12" cy="${42 * k}" rx="8" ry="5" fill="${shoe}"/><ellipse cx="12" cy="${42 * k}" rx="8" ry="5" fill="${shoe}"/><path d="M-21,-10 Q-22,10 -10,12 Q0,8 0,-4 Q0,8 10,12 Q22,10 21,-10Z" fill="${bot}"/><ellipse cx="-11" cy="6" rx="9" ry="7" fill="${bot}" stroke="#000" stroke-opacity=".18" stroke-width="2"/><ellipse cx="11" cy="6" rx="9" ry="7" fill="${bot}" stroke="#000" stroke-opacity=".18" stroke-width="2"/>`;
  else legs = `<path d="M-34,-4 Q-6,-14 18,0 M34,-4 Q6,-14 -18,0" stroke="${bot}" stroke-width="12" fill="none" stroke-linecap="round"/><ellipse cx="-36" cy="-2" rx="7" ry="5" fill="${shoe}"/><ellipse cx="36" cy="-2" rx="7" ry="5" fill="${shoe}"/>`;
  const by = o.mode == 'banco' ? -6 : -8;
  return `<g transform="translate(${x},${y}) scale(${s * k})">${o.mode == 'banco' ? '' : `<ellipse cx="0" cy="2" rx="44" ry="7" fill="#000" opacity=".15"/>`}${legs}
  <g transform="translate(0,${by}) rotate(${nod} 0 0)">
    <path d="M-15,-56 Q0,-62 15,-56 L17,0 L-17,0Z" fill="${top}"/>
    <path d="M-14,-52 Q-26,-30 ${o.mode == 'banco' ? -20 : -26},-4" stroke="${top}" stroke-width="8" fill="none" stroke-linecap="round"/><circle cx="${o.mode == 'banco' ? -20 : -26}" cy="-2" r="4.5" fill="${skin}"/>
    <path d="M14,-52 Q26,-30 ${o.mode == 'banco' ? 20 : 26},-4" stroke="${top}" stroke-width="8" fill="none" stroke-linecap="round"/><circle cx="${o.mode == 'banco' ? 20 : 26}" cy="-2" r="4.5" fill="${skin}"/>
    <rect x="-4" y="-66" width="8" height="10" fill="${skin}"/>
    <circle cx="0" cy="-80" r="15" fill="${skin}"/>
    <path d="M-15,-81 Q-15,-100 0,-98 Q15,-100 15,-81 Q8,-89 0,-90 Q-8,-89 -15,-81Z" fill="${hair}"/>${o.longhair ? `<path d="M-15,-82 Q-19,-62 -12,-58 L-10,-80Z M15,-82 Q19,-62 12,-58 L10,-80Z" fill="${hair}"/>` : ''}
    <circle cx="-5.5" cy="-80" r="1.8" fill="#222"/><circle cx="5.5" cy="-80" r="1.8" fill="#222"/>
    ${mouth ? `<ellipse cx="0" cy="-72" rx="3.5" ry="${mouth / 2 + 1}" fill="#7a2a22"/>` : `<path d="M-4,-73 Q0,-69 4,-73" stroke="#7a2a22" stroke-width="1.6" fill="none"/>`}
    <circle cx="-9" cy="-75" r="2.5" fill="#e88a7a" opacity=".5"/><circle cx="9" cy="-75" r="2.5" fill="#e88a7a" opacity=".5"/>
  </g></g>`;
}
function banco(x, y, s = 1) { // banco de parque madrileño (madera verde y patas de hierro)
  return `<g transform="translate(${x},${y}) scale(${s})"><ellipse cx="0" cy="44" rx="120" ry="8" fill="#000" opacity=".15"/>
  <path d="M-100,0 L-104,44 M100,0 L104,44 M-90,-50 L-96,0 M90,-50 L96,0" stroke="#2b3038" stroke-width="7"/>
  ${[0, 1, 2].map(k => `<rect x="-112" y="${-56 + k * 16}" width="224" height="11" rx="4" fill="#3f7a4a"/>`).join('')}<rect x="-116" y="-8" width="232" height="12" rx="4" fill="#356a40"/><rect x="-116" y="2" width="232" height="8" rx="3" fill="#2b5a35"/></g>`;
}
// niños jugando a la pelota: la pelota viaja de un niño a otro (pase con arco) y cada uno corre hacia ella
function juegoPelota(t, kids, ballR = 22) {
  const n = kids.length, u = (t / L * n) % n, i = Math.floor(u), f = u - i, a = kids[i], b = kids[(i + 1) % n];
  const bx = a.x + (b.x - a.x) * f, gy = a.y + (b.y - a.y) * f, by = gy - 12 - Math.sin(f * Math.PI) * 110;
  let s = '';
  const order = kids.map((k, j) => [k, j]).sort((p, q) => p[0].y - q[0].y);
  for (const [k, j] of order) {
    const near = j == i ? Math.max(0, 1 - f * 4) : j == (i + 1) % n ? Math.max(0, f * 2 - 1) : 0;
    const dx = near * (j == i ? 18 : -18) * Math.sign(b.x - a.x || 1), dir = (bx >= k.x ? 1 : -1);
    s += rP(k.x + dx, k.y, k.s, t, { ph: k.ph, child: true, top: k.top, skin: k.skin, bot: k.bot, longhair: k.longhair, dir, walk: near > .05 || !!k.run, wave: j != i && j != (i + 1) % n && k.wave });
  }
  return s + ball(bx, by, ballR);
}
scenes.ma_arbol = function (t) {
  let s = MAALL() + sky(t) + grass(620) + rTree(200, 640, .6, 'green', t, 912) + rTree(1720, 640, .6, 'green', t, 913) + rTree(960, 830, 2.0, 'green', t, 911);
  s += `<ellipse cx="960" cy="900" rx="520" ry="60" fill="#3f7a2a" opacity=".35"/>`;
  // Lucas cuenta una tradición; Gabriel, Saúl y Martina le escuchan sentados bajo el árbol
  s += rSit(640, 960, 2.2, t, { ph: 3, top: '#4fb3f6', skin: '#9c6a48' }) + rSit(860, 940, 2.1, t, { ph: 2, top: '#f2c14e', skin: '#c99470' }) + rSit(1080, 940, 2.1, t, { ph: 1, top: '#fff', skin: '#f1cfae', talk: true }) + rSit(1300, 960, 2.2, t, { ph: 4, top: '#c8323a', skin: '#e3b48e', longhair: true });
  s += ball(1480, 990, 24);
  return s;
};
scenes.ma_retiro_ninos = function (t) {
  let s = MAALL() + retiro(t, false);
  s += juegoPelota(t, [{ x: 520, y: 1000, s: 1.6, ph: 1, top: '#4fb3f6', skin: '#9c6a48' }, { x: 1180, y: 1040, s: 1.7, ph: 3, top: '#f2c14e', skin: '#c99470' }, { x: 860, y: 975, s: 1.5, ph: 5, top: '#fff', bot: '#2b3a67' }]);
  s += rP(1640, 1060, 1.7, t, ESC({ ph: 2, child: true, top: '#c8323a', longhair: true, dir: -1, wave: true }));
  s += farola(90, 1000, .7) + farola(1830, 1000, .7);
  return s + rLabel('Parque del Retiro', 330, 80, 40);
};
scenes.ma_juntos = function (t) {
  let s = MAALL() + sky(t) + grass(640) + [...Array(6)].map((_, i) => rTree(100 + i * 340, 660, .6, 'green', t, 990 + i)).join('');
  s += juegoPelota(t, [{ x: 560, y: 990, s: 2.0, ph: 1, top: '#4fb3f6', skin: '#9c6a48' }, { x: 900, y: 930, s: 1.8, ph: 5, top: '#fff' }, { x: 1360, y: 1000, s: 2.0, ph: 3, top: '#f2c14e', skin: '#c99470' }, { x: 1080, y: 1040, s: 2.1, ph: 2, top: '#c8323a', longhair: true }], 26);
  return s + rLabel('Siempre hay algo que nos conecta: ¡jugar juntos!', W / 2, 80, 38);
};
scenes.ma_ninos = function (t) {
  let s = MAALL() + sky(t) + `<g transform="translate(420,700)"><rect x="-340" y="-360" width="680" height="360" fill="#e9c89a"/>${[...Array(8)].map((_, i) => `<rect x="${-310 + (i % 4) * 160}" y="${-330 + Math.floor(i / 4) * 140}" width="110" height="90" fill="#7aa4c8"/>`).join('')}<rect x="-60" y="-110" width="120" height="110" fill="#6b4a36"/><rect x="-200" y="-410" width="400" height="56" fill="#fff" stroke="#c60b1e" stroke-width="5"/><text x="0" y="-370" font-family="Fredoka" font-weight="700" font-size="40" text-anchor="middle" fill="#c60b1e">COLEGIO</text></g>${esFlag(800, 300, .6)}`;
  s += grass(700) + rTree(1760, 740, .9, 'green', t, 77) + `<path d="M900,880 L1700,880" stroke="#fff" stroke-width="5"/><rect x="1600" y="760" width="16" height="120" fill="#fff"/><rect x="1600" y="760" width="160" height="12" fill="#fff"/><rect x="1744" y="760" width="16" height="120" fill="#fff"/><path d="M1616,772 L1744,772 L1744,880 L1616,880Z" fill="none" stroke="#ddd" stroke-width="2" stroke-dasharray="8 8"/>`;
  s += juegoPelota(t, [{ x: 1000, y: 990, s: 1.6, ph: 1, top: '#fff', bot: '#2b3a67' }, { x: 1380, y: 960, s: 1.5, ph: 3, top: '#c8323a' }]);
  s += banco(330, 990, 1.3) + rSit(270, 982, 1.3, t, { mode: 'banco', ph: 5, top: '#f2c14e', longhair: true }) + `<g transform="translate(300,930) scale(.8)"><path d="M-6,0 L6,0 L0,22Z" fill="#d9a04a"/><circle cx="0" cy="-5" r="9" fill="#f2a9c0"/></g>` + rSit(400, 982, 1.25, t, { mode: 'banco', child: false, ph: 2, top: '#2b3a67', talk: true });
  return s + rLabel('Colegio, parques, fútbol… ¡y helado!', W / 2, 80, 40);
};
scenes.ma_retiro = function (t) {
  let s = MAALL() + retiro(t, false);
  s += banco(300, 990, 1.3) + rSit(250, 982, 1.25, t, { mode: 'banco', child: false, ph: 1, top: '#7a5a8a', longhair: true, hair: '#d9d6d0' }) + rSit(350, 982, 1.25, t, { mode: 'banco', child: false, ph: 3, top: '#2b3a67', hair: '#bbb', talk: true });
  s += banco(1620, 990, 1.3) + rSit(1570, 982, 1.25, t, { mode: 'banco', child: false, ph: 4, top: '#c8323a', longhair: true }) + rSit(1680, 982, 1.3, t, { mode: 'banco', ph: 2, top: '#f2c14e' });
  s += maCrowd(t, 61, 5, 935, 965);
  return s + rLabel('Parque del Retiro', W / 2, 80, 44);
};
