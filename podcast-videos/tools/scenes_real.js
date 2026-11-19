/* =====================================================================
   Mi Pequeño Atlas — escenas "realistas" (ilustración, sin fotos).
   Todo apoyado en el suelo, con perspectiva, luz y sombras, y con
   lugares reconocibles para que los niños los identifiquen al viajar.
   ===================================================================== */
const RD = `<defs>
<linearGradient id="rSkyDay" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5d9ee0"/><stop offset=".65" stop-color="#a8cff0"/><stop offset="1" stop-color="#e6f1f8"/></linearGradient>
<linearGradient id="rSkyDusk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4c5d9a"/><stop offset=".45" stop-color="#e8908a"/><stop offset="1" stop-color="#fbd3a0"/></linearGradient>
<linearGradient id="rSkyNight" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#070b22"/><stop offset=".7" stop-color="#22204e"/><stop offset="1" stop-color="#3d2a5e"/></linearGradient>
<linearGradient id="rRoad" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a6d75"/><stop offset="1" stop-color="#43464e"/></linearGradient>
<linearGradient id="rWalk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cdc8bf"/><stop offset="1" stop-color="#a7a196"/></linearGradient>
<linearGradient id="rWood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a8774a"/><stop offset="1" stop-color="#7a5232"/></linearGradient>
<linearGradient id="rCounter" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9b88a"/><stop offset="1" stop-color="#b48c5c"/></linearGradient>
<linearGradient id="rWater" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6aa6c9"/><stop offset="1" stop-color="#2f6d93"/></linearGradient>
<linearGradient id="rGlass" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8fb3d9"/><stop offset=".5" stop-color="#4f75a6"/><stop offset="1" stop-color="#2d4a78"/></linearGradient>
<linearGradient id="rTatami" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c9c48a"/><stop offset="1" stop-color="#a39d62"/></linearGradient>
<linearGradient id="rBroth" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8b86a"/><stop offset="1" stop-color="#c98a3a"/></linearGradient>
<radialGradient id="rSunGlow"><stop offset="0" stop-color="#fffbe6"/><stop offset=".3" stop-color="#fff2c0" stop-opacity=".8"/><stop offset="1" stop-color="#fff2c0" stop-opacity="0"/></radialGradient>
<radialGradient id="rBowl" cx=".5" cy=".3" r=".8"><stop offset="0" stop-color="#2d2d2d"/><stop offset="1" stop-color="#0d0d0d"/></radialGradient>
<filter id="rBlur"><feGaussianBlur stdDeviation="5"/></filter>
<filter id="rBlurBig"><feGaussianBlur stdDeviation="14"/></filter>
<filter id="rGlow" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="7" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<filter id="rHaze"><feGaussianBlur stdDeviation="1.6"/></filter>
</defs>`;
const ALLDEFS = () => defs + defs2 + defs3 + RD;
const RSKIN = ['#f1cfae', '#e3b48e', '#c99470', '#9c6a48', '#f5d8bd'];
const RHAIRC = ['#1d1612', '#2b1d16', '#3a2a1f', '#121212'];

/* ---------- básicos ---------- */
function rSky(kind = 'day') { return `<rect width="${W}" height="${H}" fill="url(#rSky${kind[0].toUpperCase() + kind.slice(1)})"/>`; }
function rSun(x, y, r = 60) { return `<circle cx="${x}" cy="${y}" r="${r * 3}" fill="url(#rSunGlow)"/><circle cx="${x}" cy="${y}" r="${r * 0.55}" fill="#fffdf2"/>`; }
function rClouds(t, list) { return list.map(([x, y, s, k]) => { const xx = ((x + t / L * W * (k || 1) * 0.25) % (W + 500)) - 250; return `<g opacity=".9" transform="translate(${xx},${y}) scale(${s})"><ellipse cx="0" cy="0" rx="120" ry="34" fill="#fff"/><ellipse cx="-50" cy="-18" rx="60" ry="34" fill="#fff"/><ellipse cx="40" cy="-26" rx="70" ry="40" fill="#fff"/><ellipse cx="0" cy="10" rx="130" ry="18" fill="#e3edf6"/></g>`; }).join(''); }
function rShadow(x, y, w, o = .22) { return `<ellipse cx="${x}" cy="${y}" rx="${w}" ry="${w * 0.16}" fill="#000" opacity="${o}" filter="url(#rBlur)"/>`; }
function rStars(t, n = 50) { const R = rng(4242); let s = ''; for (let i = 0; i < n; i++) s += `<circle cx="${R() * W}" cy="${R() * 380}" r="${1 + R() * 2}" fill="#fff" opacity="${0.4 + 0.5 * Math.abs(S(t, 2, i))}"/>`; return s; }

/* ---------- personas con proporciones reales ---------- */
function rP(x, y, s, t, o = {}) {
  const ph = o.ph || 0, walk = o.walk !== false, dir = o.dir || 1, child = !!o.child;
  const st = walk ? S(t, 8, ph) * (child ? 6 : 8) : 0;
  const bob = walk ? -Math.abs(S(t, 8, ph)) * 2 : 0;
  const skin = o.skin || RSKIN[ph % RSKIN.length], hair = o.hair || RHAIRC[ph % RHAIRC.length];
  const top = o.top || '#4f7fe0', bot = o.bot || '#2b2f3a', shoe = o.shoe || '#222';
  const hip = child ? -46 : -74, sh = child ? -80 : -124, hc = child ? -96 : -141, hr = child ? 15 : 12.5;
  const bow = o.bow || 0;
  let legs = '', torso = '';
  if (o.kimono) {
    legs = `<path d="M-5,-4 L${-5 + st * .3},0 M5,-4 L${5 - st * .3},0" stroke="#f4f0e6" stroke-width="7" stroke-linecap="round"/>`;
    torso = `<path d="M-15,${sh + 2} Q0,${sh - 4} 15,${sh + 2} L19,-4 L-19,-4Z" fill="${o.kimono}"/>
      <path d="M-15,${sh + 2} L0,${sh + 22} L15,${sh + 2}" stroke="#f4f0e6" stroke-width="4" fill="none"/>
      <rect x="-17" y="${hip - 12}" width="34" height="14" fill="${o.obi || '#e8c04a'}"/>
      <path d="M-15,${sh + 6} Q-30,${hip + 8} ${-18 - st * .3},${hip + 10} L-10,${hip + 8}Z M15,${sh + 6} Q30,${hip + 8} ${18 + st * .3},${hip + 10} L10,${hip + 8}Z" fill="${o.kimono}"/>
      <circle cx="${-14 - st * .3}" cy="${hip + 8}" r="4" fill="${skin}"/><circle cx="${14 + st * .3}" cy="${hip + 8}" r="4" fill="${skin}"/>`;
  } else {
    legs = `<path d="M-6,${hip} L${-6 + st},-3 M6,${hip} L${6 - st},-3" stroke="${bot}" stroke-width="${child ? 9 : 11}" stroke-linecap="round"/>
      <path d="M${-6 + st - 3},-2 h10 M${6 - st - 3},-2 h10" stroke="${shoe}" stroke-width="6" stroke-linecap="round"/>`;
    const arm = o.hold ? `<path d="M-14,${sh + 6} L-12,${(sh + hip) / 2 + 6} L4,${(sh + hip) / 2} M14,${sh + 6} L14,${(sh + hip) / 2 + 6} L6,${(sh + hip) / 2}" stroke="${top}" stroke-width="8" stroke-linecap="round" fill="none"/>${o.hold}`
      : o.wave ? `<path d="M-14,${sh + 6} L${-17 - st * .5},${hip + 4} M14,${sh + 6} L26,${sh - 14 + S(t, 8) * 6} L30,${sh - 36}" stroke="${top}" stroke-width="8" stroke-linecap="round" fill="none"/><circle cx="30" cy="${sh - 40}" r="5" fill="${skin}"/>`
        : `<path d="M-14,${sh + 6} L${-17 - st * .5},${hip + 4} M14,${sh + 6} L${17 + st * .5},${hip + 4}" stroke="${top}" stroke-width="8" stroke-linecap="round"/><circle cx="${-17 - st * .5}" cy="${hip + 7}" r="4.5" fill="${skin}"/><circle cx="${17 + st * .5}" cy="${hip + 7}" r="4.5" fill="${skin}"/>`;
    torso = `<path d="M-15,${sh + 2} Q0,${sh - 4} 15,${sh + 2} L${child ? 15 : 17},${hip + 4} L${child ? -15 : -17},${hip + 4}Z" fill="${top}"/>
      ${o.skirt ? `<path d="M-16,${hip} L16,${hip} L22,${hip + 26} L-22,${hip + 26}Z" fill="${o.skirt}"/>` : ''}${arm}`;
  }
  const bag = o.bag ? `<rect x="${-26}" y="${sh + 2}" width="16" height="${child ? 30 : 34}" rx="5" fill="${o.bag}" stroke="#00000033" stroke-width="2"/>` : '';
  const cap = o.cap ? `<path d="M${-hr - 2},${hc - 3} Q0,${hc - hr - 12} ${hr + 2},${hc - 3}Z" fill="${o.cap}"/><path d="M${hr - 2},${hc - 4} l12,3" stroke="${o.cap}" stroke-width="4"/>` : '';
  const head = `<rect x="-4" y="${sh - 10}" width="8" height="10" fill="${skin}"/><circle cx="0" cy="${hc}" r="${hr}" fill="${skin}"/>
    <path d="M${-hr},${hc - 1} Q${-hr},${hc - hr - 4} 0,${hc - hr - 2} Q${hr},${hc - hr - 4} ${hr},${hc - 1} Q${hr * .55},${hc - hr * .55} 0,${hc - hr * .6} Q${-hr * .55},${hc - hr * .55} ${-hr},${hc - 1}Z" fill="${hair}"/>
    ${o.longhair ? `<path d="M${-hr},${hc - 2} Q${-hr - 3},${hc + hr + 6} ${-hr + 4},${hc + hr + 10} L${-hr + 6},${hc} Z M${hr},${hc - 2} Q${hr + 3},${hc + hr + 6} ${hr - 4},${hc + hr + 10} L${hr - 6},${hc}Z" fill="${hair}"/>` : ''}
    ${o.bun ? `<circle cx="0" cy="${hc - hr - 4}" r="${hr * .45}" fill="${hair}"/>` : ''}
    <circle cx="${hr * .45}" cy="${hc + 1}" r="1.6" fill="#222"/>${cap}`;
  return `<g transform="translate(${x},${y + bob}) scale(${s * dir},${s})">${rShadow(0, 0, child ? 16 : 20)}${legs}
    <g transform="rotate(${bow} 0 ${hip})">${bag}${torso}${head}</g>${o.umbrella ? `<path d="M2,${sh - 10} L2,${hc - 40}" stroke="#333" stroke-width="2"/><path d="M-34,${hc - 34} Q2,${hc - 70} 38,${hc - 34}Z" fill="${o.umbrella}"/>` : ''}</g>`;
}
function rCrowd(t, seed, n, y0, y1, opts = {}) {
  const R = rng(seed), arr = [];
  for (let i = 0; i < n; i++) {
    const dir = R() < .5 ? 1 : -1, sp = .25 + R() * .35, y = y0 + R() * (y1 - y0);
    const x = (((R() * W) + dir * t / L * W * sp) % (W + 120) + W + 120) % (W + 120) - 60;
    const tops = opts.tops || ['#2b3a67', '#e8e8e8', '#c94f6d', '#7a8f6a', '#f2c14e', '#4f7fe0', '#333', '#a67c52', '#5aa6a0'];
    arr.push([y, x, dir, i, tops[i % tops.length], (opts.bots || ['#2b2f3a', '#3a3a3a', '#e9e2d4', '#30364a'])[i % 4]]);
  }
  arr.sort((a, b) => a[0] - b[0]);
  const sc = opts.scale || ((y) => 0.55 + (y - y0) / Math.max(1, y1 - y0) * 0.5);
  return arr.map(([y, x, dir, i, top, bot]) => rP(x, y, sc(y), t, { ph: i, dir, top, bot, umbrella: opts.umbrellas && i % 6 == 0 ? ['#4fb3f6', '#ff5a5f', '#ffd34d', '#fff'][i % 4] : 0, longhair: i % 3 == 0, kimono: opts.kimono && i % 4 == 0 ? ['#c8323a', '#4f7fe0', '#e88fb0', '#6a4fa0'][i % 4] : 0, bag: i % 5 == 0 ? '#5a3a2a' : 0 })).join('');
}

/* ---------- ciudad ---------- */
function rBuilding(x, base, w, h, o = {}) {
  const col = o.col || '#d8d2c6', R = rng(o.seed || (x * 7 + h) | 0);
  const fl = o.floor || 34, rows = Math.floor((h - 70) / fl), cols = Math.max(1, Math.floor((w - 20) / 34));
  let s = `<rect x="${x}" y="${base - h}" width="${w}" height="${h}" fill="${col}"/>
    <rect x="${x + w * 0.82}" y="${base - h}" width="${w * 0.18}" height="${h}" fill="#000" opacity=".12"/>
    <rect x="${x - 3}" y="${base - h - 8}" width="${w + 6}" height="10" fill="#000" opacity=".25"/>`;
  if (o.roof !== false) s += `<rect x="${x + w * .15}" y="${base - h - 26}" width="${w * .22}" height="18" fill="#9aa0a8"/><rect x="${x + w * .55}" y="${base - h - 20}" width="${w * .18}" height="12" fill="#b4b9c0"/>`;
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const wx = x + 12 + c * ((w - 24) / cols), wy = base - h + 16 + r * fl;
    const lit = o.night ? R() > .35 : false;
    s += `<rect x="${wx}" y="${wy}" width="${(w - 24) / cols - 8}" height="${fl - 14}" fill="${lit ? (R() > .5 ? '#ffe7a8' : '#cfe6ff') : (o.night ? '#1d2140' : '#7f9bb8')}" opacity="${o.night ? .95 : .85}"/>`;
    if (!o.night) s += `<rect x="${wx}" y="${wy}" width="${(w - 24) / cols - 8}" height="${(fl - 14) * .35}" fill="#fff" opacity=".18"/>`;
  }
  if (o.shop) {
    s += `<rect x="${x}" y="${base - 54}" width="${w}" height="54" fill="${o.night ? '#ffe9b0' : '#efe7d6'}" opacity="${o.night ? .9 : 1}"/>
      <rect x="${x + 6}" y="${base - 46}" width="${w - 12}" height="40" fill="${o.night ? '#fff3cf' : '#9fb8cf'}" opacity=".85"/>
      <rect x="${x}" y="${base - 72}" width="${w}" height="20" fill="${o.shop}"/>${o.shopTxt ? `<text x="${x + w / 2}" y="${base - 56}" font-family="IPAGothic" font-size="15" text-anchor="middle" fill="#fff">${o.shopTxt}</text>` : ''}`;
  }
  if (o.vsign) s += rVSign(x + (o.vx ?? w - 10), base - h + 30, o.vsign, o.vcol || '#e8352a', o.night);
  if (o.billboard) s += `<rect x="${x + 10}" y="${base - h + 10}" width="${w - 20}" height="${o.billboard.h || 90}" fill="${o.billboard.col}" stroke="#222" stroke-width="3"/>${o.billboard.svg || ''}`;
  return s;
}
function rVSign(x, y, txt, col, night) {
  const h = [...txt].length * 40 + 20;
  return `<g ${night ? 'filter="url(#rGlow)"' : ''}><rect x="${x}" y="${y}" width="44" height="${h}" fill="${night ? '#14142c' : '#fff'}" stroke="${col}" stroke-width="4"/>
  ${[...txt].map((c, i) => `<text x="${x + 22}" y="${y + 42 + i * 40}" font-family="IPAGothic" font-size="32" text-anchor="middle" fill="${night ? col : col}">${c}</text>`).join('')}</g>`;
}
function rPole(x, base, h = 520) {
  return `<rect x="${x - 7}" y="${base - h}" width="14" height="${h}" fill="#9a9a96"/><rect x="${x - 7}" y="${base - h}" width="5" height="${h}" fill="#fff" opacity=".25"/>
  <rect x="${x - 50}" y="${base - h + 30}" width="100" height="8" fill="#6f6f6b"/><rect x="${x + 10}" y="${base - h + 60}" width="34" height="46" rx="6" fill="#7d8287"/>${rShadow(x, base, 18)}`;
}
function rWires(x1, x2, base, h = 520) { return [0, 1, 2].map(i => `<path d="M${x1 - 40 + i * 40},${base - h + 34} Q${(x1 + x2) / 2},${base - h + 80 + i * 6} ${x2 - 40 + i * 40},${base - h + 34}" stroke="#2a2a2a" stroke-width="2" fill="none" opacity=".75"/>`).join(''); }
function rTree(x, base, s = 1, kind = 'green', t = 0, seed = 1) {
  const R = rng(seed); const pal = kind == 'sakura' ? ['#f7c3d4', '#f2a9c0', '#fbd8e3', '#e98fae'] : ['#5d8f4a', '#4a7a3a', '#6fa456', '#3c6630'];
  let c = ''; for (let i = 0; i < 18; i++) { const a = R() * TAU, d = R() * 70; c += `<circle cx="${Math.cos(a) * d * 1.4}" cy="${-230 + Math.sin(a) * d * .8}" r="${45 + R() * 30}" fill="${pal[i % 4]}"/>`; }
  c += `<ellipse cx="-20" cy="-200" rx="110" ry="40" fill="#000" opacity=".08"/>`;
  return `${rShadow(x, base, 110 * s, .25)}<g transform="translate(${x},${base}) scale(${s}) rotate(${S(t, 1, seed) * .8} 0 0)">
  <path d="M-14,0 Q-8,-90 -20,-170 L-4,-170 Q2,-120 16,-180 L26,-176 Q10,-100 14,0Z" fill="#6b4a36"/><path d="M-6,-120 Q-60,-160 -90,-200 M8,-140 Q60,-180 100,-210" stroke="#6b4a36" stroke-width="12" fill="none" stroke-linecap="round"/>${c}</g>`;
}
function rPetals(t, n = 30, seed = 7) { const R = rng(seed); let s = ''; for (let i = 0; i < n; i++) { const x0 = R() * W, y0 = R() * H, k = 1 + Math.floor(R() * 2), r = 5 + R() * 5; const y = (y0 + t / L * H * k) % (H + 40) - 20; const x = (x0 + S(t, k, i) * 50) % W; s += `<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r * .6}" fill="#f7c3d4" transform="rotate(${(t / L * 360 * k + i * 40) % 360} ${x} ${y})"/>`; } return s; }
function rRoadScene(t, horizon = 600, opts = {}) {
  // sidewalk + road with perspective
  let s = `<rect x="0" y="${horizon}" width="${W}" height="${H - horizon}" fill="url(#rRoad)"/>
  <path d="M0,${horizon} L${W},${horizon} L${W},${horizon + 60} L0,${horizon + 60}Z" fill="url(#rWalk)"/>
  <rect x="0" y="${horizon + 58}" width="${W}" height="6" fill="#8d877c"/>`;
  if (opts.lines !== false) for (let i = 0; i < 9; i++) { const x = ((i * 260 - t / L * 520 * (opts.move || 0)) % (W + 260) + W + 260) % (W + 260) - 130; s += `<rect x="${x}" y="${horizon + 150}" width="130" height="10" fill="#f0f0f0" opacity=".8"/>`; }
  if (opts.front !== false) s += `<path d="M0,${H - 150} L${W},${H - 150} L${W},${H} L0,${H}Z" fill="url(#rWalk)"/><rect x="0" y="${H - 154}" width="${W}" height="8" fill="#8d877c"/>${[...Array(12)].map((_, i) => `<line x1="${i * 170}" y1="${H - 146}" x2="${i * 170 - 60}" y2="${H}" stroke="#9a9488" stroke-width="2"/>`).join('')}`;
  return s;
}
function rCar(x, y, s, col, dir = 1) {
  return `<g transform="translate(${x},${y}) scale(${s * dir},${s})">${rShadow(0, 4, 90)}
  <path d="M-95,-12 L-90,-40 Q-80,-50 -60,-52 L-35,-78 Q-28,-84 -15,-84 L40,-84 Q55,-84 62,-74 L80,-52 Q95,-50 98,-40 L100,-12Z" fill="${col}"/>
  <path d="M-30,-74 L-12,-74 L-12,-54 L-52,-54Z M-4,-74 L38,-74 Q46,-74 50,-68 L62,-54 L-4,-54Z" fill="#9fc0dc"/>
  <rect x="-95" y="-22" width="195" height="6" fill="#000" opacity=".15"/><circle cx="-55" cy="-10" r="17" fill="#222"/><circle cx="58" cy="-10" r="17" fill="#222"/><circle cx="-55" cy="-10" r="7" fill="#999"/><circle cx="58" cy="-10" r="7" fill="#999"/>
  <rect x="88" y="-40" width="10" height="8" fill="#fff6c0"/></g>`;
}
function rLabel(txt, x, y, fs = 40, col = '#2b3a67') { const w = txt.length * fs * .55 + 50; y = Math.max(y, 118 + fs * .95); /* nunca detrás del encabezado fijo (y<100) */ return `<g transform="translate(${x},${y})"><rect x="${-w / 2}" y="${-fs * .95}" width="${w}" height="${fs * 1.45}" rx="${fs * .35}" fill="#fff" opacity=".93" stroke="#2b3a67" stroke-width="3"/><text x="0" y="${fs * .2}" font-family="Fredoka" font-weight="600" font-size="${fs}" text-anchor="middle" fill="${col}">${txt}</text></g>`; }
function rArrowLabel(txt, x, y, tx, ty, fs = 34) { return `<line x1="${x}" y1="${y}" x2="${tx}" y2="${ty}" stroke="#2b3a67" stroke-width="4"/><circle cx="${tx}" cy="${ty}" r="7" fill="#e8352a" stroke="#fff" stroke-width="2"/>${rLabel(txt, x, y, fs)}`; }
