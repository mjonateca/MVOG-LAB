/* =====================================================================
   Mi Pequeño Atlas — Capítulo 6: Berlín. Escenas realistas.
   (usa helpers de scenes_madrid.js / scenes_sd.js)
   ===================================================================== */
const BED = `<defs>
<linearGradient id="beSand" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8dcc0"/><stop offset="1" stop-color="#cfc0a0"/></linearGradient>
<linearGradient id="beCopper" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#4f8a78"/><stop offset=".5" stop-color="#7ab8a4"/><stop offset="1" stop-color="#3f7464"/></linearGradient>
<linearGradient id="beRiver" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a9ab8"/><stop offset="1" stop-color="#3a6a8a"/></linearGradient>
<linearGradient id="beSilver" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f4f6f8"/><stop offset=".5" stop-color="#b8c0c8"/><stop offset="1" stop-color="#7a8490"/></linearGradient>
</defs>`;
const BEALL = () => D() + MA + SDD + BED;

/* ---------- piezas ---------- */
function deFlag(x, y, s = 1) { return `<g transform="translate(${x},${y}) scale(${s})"><line x1="0" y1="0" x2="0" y2="130" stroke="#555" stroke-width="4"/><rect x="0" y="0" width="96" height="20" fill="#1a1a1a"/><rect x="0" y="20" width="96" height="20" fill="#dd0000"/><rect x="0" y="40" width="96" height="20" fill="#ffce00"/></g>`; }
function quadriga(s = 1) {
  return `<g transform="scale(${s})" fill="#4f7a6a">${[-60, -20, 20, 60].map((x, i) => `<g transform="translate(${x},0)"><path d="M-30,0 L-26,-40 Q-10,-56 14,-52 Q26,-70 36,-66 L40,-56 L28,-50 L26,-30 L28,0 L20,0 L18,-26 L-14,-26 L-18,0Z"/><path d="M-26,-40 Q-40,-36 -38,-16" stroke="#4f7a6a" stroke-width="6" fill="none"/></g>`).join('')}
  <path d="M-50,-30 L50,-30 L40,0 L-40,0Z"/><path d="M-8,-30 L-6,-110 L10,-110 L12,-30Z"/><circle cx="2" cy="-122" r="12"/><path d="M-8,-130 Q2,-150 14,-130" stroke="#4f7a6a" stroke-width="5" fill="none"/><path d="M14,-100 L40,-170" stroke="#4f7a6a" stroke-width="5"/><path d="M28,-178 L52,-178 L52,-160 L28,-160Z"/><path d="M40,-190 l-12,10 h24Z"/>
  <path d="M-10,-100 Q-50,-80 -40,-50" stroke="#4f7a6a" stroke-width="8" fill="none"/></g>`;
}
function brandenburg(cx, base, s = 1) {
  let o = `<g transform="translate(${cx},${base}) scale(${s})"><rect x="-460" y="-40" width="920" height="40" fill="#d9ccb0"/>`;
  for (let i = 0; i < 6; i++) { const x = -400 + i * 160; for (const d of [-26, 26]) o += `<rect x="${x + d - 18}" y="-380" width="36" height="340" fill="url(#beSand)"/><rect x="${x + d - 24}" y="-388" width="48" height="12" fill="#d9ccb0"/>${[...Array(4)].map((_, k) => `<line x1="${x + d - 12 + k * 8}" y1="-376" x2="${x + d - 12 + k * 8}" y2="-40" stroke="#c9b894" stroke-width="2"/>`).join('')}`; }
  o += `<rect x="-470" y="-450" width="940" height="64" fill="#e2d6ba"/>${[...Array(30)].map((_, i) => `<rect x="${-455 + i * 31}" y="-440" width="12" height="40" fill="#cfc0a0"/>`).join('')}<rect x="-480" y="-462" width="960" height="14" fill="#d9ccb0"/>
  <rect x="-300" y="-540" width="600" height="80" fill="#e8dcc0"/><rect x="-260" y="-528" width="520" height="56" fill="#d6c8a8"/>${[...Array(8)].map((_, i) => `<path d="M${-240 + i * 64},-480 q20,-30 40,0" stroke="#bfae8a" stroke-width="5" fill="none"/>`).join('')}
  <path d="M-320,-540 L0,-580 L320,-540Z" fill="#e2d6ba"/><g transform="translate(0,-560)">${quadriga(1.1)}</g></g>`;
  return o;
}
function tvTower(x, base, s = 1) {
  return `<g transform="translate(${x},${base}) scale(${s})"><path d="M-30,0 L-14,-620 L14,-620 L30,0Z" fill="#d9dde2"/><path d="M0,0 L14,-620 L30,0Z" fill="#b8bec6"/><rect x="-60" y="-40" width="120" height="40" fill="#c9ced6"/>
  <circle cx="0" cy="-700" r="90" fill="url(#beSilver)"/>${[...Array(5)].map((_, k) => `<line x1="${-86 + k * 4}" y1="${-740 + k * 20}" x2="${86 - k * 4}" y2="${-740 + k * 20}" stroke="#8a949e" stroke-width="2" opacity=".6"/>`).join('')}<rect x="-90" y="-712" width="180" height="16" fill="#5a6a7a" opacity=".55"/>
  <rect x="-10" y="-900" width="20" height="120" fill="#e8ecef"/>${[0, 1, 2, 3].map(k => `<rect x="-8" y="${-1000 + k * 26}" width="16" height="13" fill="#dd2a2a"/><rect x="-8" y="${-987 + k * 26}" width="16" height="13" fill="#fff"/>`).join('')}</g>`;
}
function berlinerDom(cx, base, s = 1) {
  return `<g transform="translate(${cx},${base}) scale(${s})"><rect x="-300" y="-260" width="600" height="260" fill="#d6ccb4"/>${[...Array(8)].map((_, i) => `<rect x="${-270 + i * 76}" y="-230" width="26" height="230" fill="#e8e0cc"/>`).join('')}<path d="M-90,0 L-90,-150 Q0,-210 90,-150 L90,0Z" fill="#8a7a64"/>
  <rect x="-140" y="-330" width="280" height="80" fill="#d6ccb4"/><path d="M-160,-330 Q-160,-560 0,-580 Q160,-560 160,-330Z" fill="url(#beCopper)"/><rect x="-12" y="-640" width="24" height="70" fill="#4f8a78"/><circle cx="0" cy="-650" r="14" fill="url(#maGold)"/>
  ${[-250, 250].map(x => `<g transform="translate(${x},-260)"><rect x="-44" y="-80" width="88" height="80" fill="#d6ccb4"/><path d="M-50,-80 Q-50,-170 0,-180 Q50,-170 50,-80Z" fill="url(#beCopper)"/><rect x="-5" y="-210" width="10" height="34" fill="#4f8a78"/></g>`).join('')}</g>`;
}
function spree(y0, t, h = 260) { return `<rect x="0" y="${y0}" width="${W}" height="${h}" fill="url(#beRiver)"/>${[...Array(14)].map((_, i) => `<path d="M${(i * 157 + t / L * 100) % (W + 100) - 50},${y0 + 20 + (i * 37) % (h - 30)} q30,-6 60,0" stroke="#cfe2f0" stroke-width="3" fill="none" opacity=".6"/>`).join('')}`; }
function buddyBear(x, base, s = 1, cols = ['#dd2a2a', '#ffce00', '#2f7ad0', '#3aa65a']) {
  return `<g transform="translate(${x},${base}) scale(${s})">${rShadow(0, 0, 90)}<rect x="-70" y="-40" width="140" height="40" fill="#bdb3a0"/><g transform="translate(0,-40)">
  <path d="M-50,0 L-46,-90 Q-60,-150 -40,-200 L40,-200 Q60,-150 46,-90 L50,0 L18,0 L14,-60 L-14,-60 L-18,0Z" fill="${cols[0]}"/><circle cx="0" cy="-240" r="50" fill="${cols[0]}"/><circle cx="-38" cy="-284" r="16" fill="${cols[0]}"/><circle cx="38" cy="-284" r="16" fill="${cols[0]}"/>
  <path d="M-40,-190 L-110,-280 M40,-190 L110,-280" stroke="${cols[0]}" stroke-width="34" stroke-linecap="round"/>
  <circle cx="-20" cy="-130" r="20" fill="${cols[1]}"/><path d="M10,-160 l30,10 l-10,30Z" fill="${cols[2]}"/><circle cx="20" cy="-90" r="14" fill="${cols[3]}"/><path d="M-30,-60 q30,-20 60,0" stroke="${cols[1]}" stroke-width="10" fill="none"/>
  <circle cx="-18" cy="-250" r="6" fill="#1a1a1a"/><circle cx="18" cy="-250" r="6" fill="#1a1a1a"/><ellipse cx="0" cy="-226" rx="18" ry="12" fill="#f4e6d0"/><circle cx="0" cy="-232" r="6" fill="#1a1a1a"/><path d="M-10,-218 q10,8 20,0" stroke="#1a1a1a" stroke-width="3" fill="none"/></g></g>`;
}
function bike(x, y, s = 1, col = '#2f7ad0', rider = null, t = 0) {
  const a = t / L * TAU * 4;
  return `<g transform="translate(${x},${y}) scale(${s})">${rShadow(0, 0, 70, .2)}${[-46, 46].map(cx => `<circle cx="${cx}" cy="-28" r="28" fill="none" stroke="#222" stroke-width="5"/><line x1="${cx}" y1="-28" x2="${cx + Math.cos(a) * 26}" y2="${-28 + Math.sin(a) * 26}" stroke="#888" stroke-width="2"/>`).join('')}
  <path d="M-46,-28 L-6,-28 L20,-70 L-20,-70Z M-6,-28 L-20,-80 M20,-70 L46,-28 M20,-70 L16,-90" stroke="${col}" stroke-width="6" fill="none"/><rect x="-30" y="-86" width="24" height="7" rx="3" fill="#222"/><path d="M8,-92 h18" stroke="#222" stroke-width="5"/>${rider || ''}</g>`;
}
function rider(top, skin, ph, t, child = false) { const k = S(t, 8, ph) * 8; return `<g transform="translate(-14,-84)"><path d="M0,0 L${8 + k},34 M0,0 L${8 - k},34" stroke="#2b2f3a" stroke-width="9" stroke-linecap="round"/><path d="M-8,0 L6,-${child ? 46 : 58} L18,-${child ? 46 : 58} L10,0Z" fill="${top}"/><path d="M12,-${child ? 40 : 52} L38,-${child ? 20 : 24}" stroke="${top}" stroke-width="8" stroke-linecap="round"/><circle cx="14" cy="-${child ? 60 : 72}" r="${child ? 14 : 12}" fill="${skin}"/><path d="M0,-${child ? 66 : 78} Q14,-${child ? 84 : 94} 28,-${child ? 66 : 78}Z" fill="#dd2a2a"/></g>`; }
function ampelmann(x, base, s = 1, green = true) {
  const man = green ? `<g fill="#3cdc5a"><circle cx="0" cy="-26" r="7"/><path d="M-12,-34 h24 v-6 h-24Z"/><path d="M-8,-18 L8,-18 L18,8 L10,10 L4,-4 L2,22 L-6,22 L-6,0 L-16,10 L-22,4Z"/></g>` : `<g fill="#ff3a2a"><circle cx="0" cy="-26" r="7"/><path d="M-12,-34 h24 v-6 h-24Z"/><path d="M-6,-18 L6,-18 L28,-6 L26,2 L6,-6 L6,24 L-6,24 L-6,-6 L-26,2 L-28,-6Z"/></g>`;
  return `<g transform="translate(${x},${base}) scale(${s})"><rect x="-5" y="-300" width="10" height="300" fill="#555"/><rect x="-36" y="-420" width="72" height="140" rx="10" fill="#222"/><circle cx="0" cy="-385" r="28" fill="#3a1010"/><circle cx="0" cy="-318" r="28" fill="#103a10"/><g transform="translate(0,${green ? -318 : -385}) scale(.9)">${man}</g></g>`;
}
function berlinWall(x0, x1, base, h = 300, painted = false, t = 0) {
  let s = `<rect x="${x0}" y="${base - h}" width="${x1 - x0}" height="${h}" fill="#c9c6bc"/><rect x="${x0}" y="${base - h - 30}" width="${x1 - x0}" height="40" rx="20" fill="#d9d6cc"/>`;
  for (let x = x0; x < x1; x += 120) s += `<line x1="${x}" y1="${base - h}" x2="${x}" y2="${base}" stroke="#a8a49a" stroke-width="3"/>`;
  if (painted) { const cols = ['#ff5a5f', '#ffd34d', '#4fb3f6', '#7ad06a', '#b86ad0', '#ff9a3a']; for (let i = 0; i < (x1 - x0) / 240; i++) { const x = x0 + i * 240 + 20, c = cols[i % 6], c2 = cols[(i + 2) % 6];
    s += `<rect x="${x}" y="${base - h + 20}" width="200" height="${h - 40}" fill="${c}" opacity=".85"/><circle cx="${x + 100}" cy="${base - h / 2}" r="${50 + (i % 3) * 10}" fill="${c2}"/>${i % 2 ? `<path d="M${x + 70},${base - h / 2} q30,-40 60,0 q-30,50 -30,60 q0,-10 -30,-60Z" fill="#fff"/>` : `<text x="${x + 100}" y="${base - 40}" font-family="Fredoka" font-weight="700" font-size="34" text-anchor="middle" fill="#fff">${['PAZ', 'LIBERTAD', 'AMISTAD'][i % 3]}</text>`}`; } }
  return s;
}
function bePeople(t, seed, n, y0, y1) { return rCrowd(t, seed, n, y0, y1, { tops: ['#2b3a67', '#ffce00', '#dd2a2a', '#5a7a5a', '#e8e2d4', '#333', '#4fb3f6', '#b86ad0'] }); }

/* ---------- escenas ---------- */
scenes.be_intro = function (t) {
  let s = BEALL() + rSky('day') + rSun(1650, 150) + rClouds(t, [[300, 120, .8], [1200, 90, .6]]) + tvTower(1700, 760, .7) + brandenburg(900, 800, .95) + `<rect x="0" y="800" width="${W}" height="280" fill="#cfc4ae"/>` + bePeople(t, 3, 14, 840, 1060);
  return s + `<g transform="translate(${W / 2},${H / 2 - 260})"><rect x="-560" y="-150" width="1120" height="300" rx="40" fill="#fff" opacity=".95" stroke="#2b3a67" stroke-width="6"/>
  <text x="0" y="-30" font-family="Fredoka" font-weight="700" font-size="104" text-anchor="middle" fill="#ffcc2e" stroke="#2b3a67" stroke-width="6" paint-order="stroke">Mi Pequeño Atlas</text>
  <rect x="-330" y="20" width="660" height="96" rx="22" fill="#1a1a1a"/><rect x="-330" y="104" width="660" height="6" fill="#dd0000"/><rect x="-330" y="110" width="660" height="6" fill="#ffce00"/><text x="0" y="88" font-family="Fredoka" font-weight="700" font-size="64" text-anchor="middle" fill="#fff">Capítulo 6: Berlín</text></g>`;
};
scenes.be_oso = function (t) {
  let s = BEALL() + rSky('day') + rSun(300, 150) + madridBlock(-20, 760, 700, 480, '#e8e2d4', '#5a6470') + madridBlock(1240, 760, 700, 520, '#d9d1c4', '#5a6470') + street(760);
  s += buddyBear(960, 960, 1.4) + buddyBear(560, 900, .8, ['#2f7ad0', '#fff', '#ffce00', '#dd2a2a']) + buddyBear(1360, 900, .8, ['#3aa65a', '#ffce00', '#fff', '#dd2a2a']) + bePeople(t, 13, 8, 800, 1060);
  return s + rLabel('El oso: ¡el símbolo de Berlín!', W / 2, 80, 44);
};
scenes.be_bicis = function (t) {
  let s = BEALL() + rSky('day') + rSun(1600, 150) + grass(620) + [...Array(7)].map((_, i) => rTree(80 + i * 300, 640, .7, 'green', t, 300 + i)).join('') + `<path d="M0,820 L${W},780 L${W},900 L0,940Z" fill="#c9bea4"/><path d="M0,880 L${W},840" stroke="#fff" stroke-width="4" stroke-dasharray="30 20"/>`;
  const p = (t / L);
  s += bike(((p * 2400) % 2600) - 300, 900, 1.6, '#2f7ad0', rider('#ffce00', '#c99470', 1, t), t) + bike(((p * 2400 + 900) % 2600) - 300, 870, 1.3, '#dd2a2a', rider('#2b3a67', '#f1cfae', 2, t, true), t) + bike(((p * 2400 + 1700) % 2600) - 300, 920, 1.5, '#3aa65a', rider('#b86ad0', '#9c6a48', 3, t), t);
  return s + rLabel('Parques y bicicletas por todos lados', W / 2, 80, 44);
};
scenes.be_spree = function (t) {
  let s = BEALL() + rSky('day') + rSun(1650, 140) + rClouds(t, [[400, 120, .7]]) + tvTower(1380, 640, .85) + berlinerDom(700, 640, .9) + madridBlock(1600, 640, 340, 300, '#e8e2d4', '#5a6470') + madridBlock(-20, 640, 380, 280, '#d9d1c4', '#5a6470');
  s += `<rect x="0" y="640" width="${W}" height="30" fill="#bdb3a0"/>` + spree(670, t, 260) + `<rect x="0" y="930" width="${W}" height="150" fill="#cfc4ae"/>` + bePeople(t, 23, 10, 960, 1070);
  s += `<g transform="translate(${((t / L) * 700) % 2200 - 200},760)"><path d="M-160,0 L160,0 L140,40 L-150,40Z" fill="#f4f4f0"/><rect x="-120" y="-40" width="220" height="40" fill="#fff"/>${[...Array(6)].map((_, i) => `<rect x="${-110 + i * 36}" y="-32" width="24" height="18" fill="#6a8aa8"/>`).join('')}</g>`;
  return s + rLabel('Berlín, la capital de Alemania', W / 2, 80, 44);
};
scenes.be_mapa = function (t) {
  let s = BEALL() + `<rect width="${W}" height="${H}" fill="#7fb6dc"/><path d="M200,140 Q700,80 1200,140 Q1600,120 1820,260 L1820,1000 L1200,1000 Q900,960 600,1000 L200,1000Z" fill="#cfe2b8" stroke="#8aa87a" stroke-width="4"/>`;
  s += `<path d="M820,240 L940,220 L1000,260 L1080,250 L1150,290 L1170,380 L1200,460 L1160,520 L1180,620 L1120,700 L1040,720 L960,700 L880,720 L820,660 L780,580 L800,500 L760,430 L790,340Z" fill="#f2d98a" stroke="#2b3a67" stroke-width="6" stroke-linejoin="round"/>
  <text x="300" y="220" font-family="Fredoka" font-weight="700" font-size="54" fill="#5a7a4a" opacity=".7">EUROPA</text><text x="960" y="560" font-family="Fredoka" font-weight="700" font-size="50" text-anchor="middle" fill="#2b3a67" opacity=".85">ALEMANIA</text>`;
  const p = 1 + .18 * Math.max(0, S(t, 4));
  s += `<g transform="translate(1100,380)">${[0, 1].map(k => `<circle r="${20 + ((t / L * 4 + k * .5) % 1) * 130}" fill="none" stroke="#e8352a" stroke-width="4" opacity="${1 - ((t / L * 4 + k * .5) % 1)}"/>`).join('')}<circle r="${16 * p}" fill="#e8352a" stroke="#fff" stroke-width="5"/></g>` + deFlag(1400, 600, 1.4) + `<rect x="1340" y="782" width="130" height="14" fill="#555"/>`;
  return s + rLabel('Berlín', 1100, 320, 44, '#e8352a') + rLabel('Berlín está en Europa, en Alemania', W / 2, 1010, 40);
};
scenes.be_lagos = function (t) {
  let s = BEALL() + rSky('day') + rSun(1600, 150) + `<rect x="0" y="480" width="${W}" height="140" fill="#5f9a48"/>` + [...Array(10)].map((_, i) => rTree(60 + i * 210, 560, .55, 'green', t, 400 + i)).join('');
  s += `<rect x="0" y="560" width="${W}" height="300" fill="url(#beRiver)"/>${[...Array(12)].map((_, i) => `<path d="M${(i * 173 + t / L * 80) % W},${590 + (i * 37) % 240} q30,-6 60,0" stroke="#cfe2f0" stroke-width="3" fill="none" opacity=".6"/>`).join('')}`;
  s += `<g transform="translate(${700 + S(t, 1) * 60},700)"><path d="M-60,0 L60,0 L50,18 L-50,18Z" fill="#fff"/><line x1="0" y1="0" x2="0" y2="-150" stroke="#555" stroke-width="5"/><path d="M4,-146 L80,-10 L4,-10Z" fill="#fff"/><path d="M-4,-130 L-60,-10 L-4,-10Z" fill="#f2d98a"/></g>`;
  s += `<rect x="0" y="860" width="${W}" height="220" fill="url(#maGrass)"/>` + rP(500, 990, 2, t, ESC({ ph: 1, child: true, top: '#ffce00' })) + rP(700, 1000, 2.3, t, ESC({ ph: 2, top: '#2b3a67', dir: -1 }));
  return s + rLabel('No hay mar, pero hay muchos ríos y lagos', W / 2, 80, 40);
};
scenes.be_puente = function (t) {
  let s = BEALL() + rSky('day') + rSun(300, 150) + madridBlock(-20, 560, 600, 300, '#e8e2d4', '#5a6470') + madridBlock(1340, 560, 600, 320, '#d9d1c4', '#5a6470') + spree(560, t, 520);
  s += `<g transform="translate(960,700)"><rect x="-900" y="-130" width="1800" height="60" fill="#a8432a"/>${[...Array(7)].map((_, i) => `<path d="M${-840 + i * 260},60 L${-840 + i * 260},-70 L${-640 + i * 260},-70 L${-640 + i * 260},60 Q${-740 + i * 260},-40 ${-840 + i * 260},60Z" fill="#b8563a"/>`).join('')}<rect x="-900" y="-70" width="1800" height="30" fill="#94402a"/>
  ${[...Array(18)].map((_, i) => `<path d="M${-880 + i * 100},-130 v-90 q50,-40 100,0 v90" stroke="#a8432a" stroke-width="16" fill="none"/>`).join('')}<rect x="-900" y="-230" width="1800" height="16" fill="#94402a"/>
  ${[-160, 160].map(x => `<g transform="translate(${x},-230)"><rect x="-50" y="-260" width="100" height="260" fill="#b8563a"/>${[...Array(4)].map((_, k) => `<rect x="${-50 + k * 28}" y="-286" width="16" height="30" fill="#b8563a"/>`).join('')}<rect x="-14" y="-220" width="28" height="60" fill="#3a2a22"/><rect x="-14" y="-130" width="28" height="60" fill="#3a2a22"/></g>`).join('')}</g>`;
  const tx = ((t / L) * 2600) % 3000 - 700;
  s += `<g transform="translate(${tx},460)"><rect x="0" y="0" width="520" height="70" rx="14" fill="#ffce00"/>${[...Array(8)].map((_, i) => `<rect x="${20 + i * 62}" y="12" width="44" height="30" fill="#3a4a5a"/>`).join('')}<rect x="0" y="56" width="520" height="8" fill="#2a2a2a"/></g>`;
  return s + rLabel('¡Más de 1.700 puentes!', W / 2, 80, 46);
};
scenes.be_parque = function (t) {
  let s = BEALL() + rSky('day') + rSun(1600, 150) + grass(560) + [...Array(5)].map((_, i) => rTree(140 + i * 420, 700, 1.1, 'green', t, 500 + i)).join('') + [...Array(6)].map((_, i) => rTree(330 + i * 300, 620, .55, 'green', t, 520 + i)).join('');
  s += `<path d="M700,1080 Q900,800 960,560 Q1020,800 1220,1080Z" fill="#d9ccb0"/>` + rP(900, 960, 2, t, { ph: 1, top: '#dd2a2a' }) + rP(1060, 1000, 1.8, t, { ph: 3, child: true, top: '#ffce00', dir: -1 });
  return s + rLabel('Una ciudad muy verde: árboles, parques y jardines', W / 2, 80, 40);
};
scenes.be_calles = function (t) {
  let s = BEALL() + rSky('day') + rSun(300, 140) + madridBlock(-20, 760, 480, 500, '#f2c86a', '#5a6470') + madridBlock(460, 760, 480, 540, '#7ac0c8', '#5a6470') + madridBlock(940, 760, 480, 480, '#e88a7a', '#5a6470') + madridBlock(1420, 760, 520, 520, '#b8d48a', '#5a6470');
  s += `<rect x="460" y="420" width="480" height="140" fill="#fff" opacity=".0"/>` + berlinWall(200, 900, 760, 120, true) + street(760) + ampelmann(1600, 980, .9, S(t, 1) > 0) + bike(1300, 960, 1.4, '#ffce00', rider('#2b3a67', '#c99470', 2, t), t) + bePeople(t, 33, 12, 800, 1060);
  return s + rLabel('Creativa, diversa y llena de historias', W / 2, 80, 42);
};
scenes.be_idioma = function (t) {
  let s = BEALL() + rSky('day') + madridBlock(-20, 720, 980, 520, '#e8e2d4', '#5a6470') + madridBlock(960, 720, 980, 500, '#d9d1c4', '#5a6470') + street(720);
  s += rP(600, 1010, 2.3, t, ESC({ ph: 1, top: '#2b3a67', wave: true })) + rP(1300, 1010, 2.2, t, ESC({ ph: 3, child: true, top: '#ffce00', dir: -1 }));
  s += bubble(620, 560, 'Hallo!', 60, '#dd2a2a', 1) + bubble(1280, 600, 'Guten Tag!', 54, '#2b3a67', -1);
  return s + rLabel('En Berlín se habla alemán', W / 2, 90, 46) + `<g transform="translate(960,260)"><rect x="-260" y="-60" width="520" height="120" rx="24" fill="#fff" stroke="#2b3a67" stroke-width="5"/>${deFlag(-220, -40, .6).replace('<line x1="0" y1="0" x2="0" y2="130" stroke="#555" stroke-width="4"/>', '')}<text x="40" y="22" font-family="Fredoka" font-weight="700" font-size="58" text-anchor="middle" fill="#2b3a67">Deutsch</text></g>`;
};
scenes.be_murales = function (t) {
  let s = BEALL() + rSky('day') + rSun(1650, 140) + berlinWall(-20, 1940, 760, 520, true) + street(760);
  s += rP(500, 1000, 2.2, t, ESC({ ph: 1, top: '#2b3a67', hold: `<g transform="translate(16,-80)"><rect x="-6" y="-30" width="14" height="40" rx="4" fill="#ff5a5f"/></g>` })) + rP(1400, 1010, 2.0, t, ESC({ ph: 4, child: true, top: '#7ad06a', dir: -1 })) + bePeople(t, 43, 8, 820, 1070);
  return s + rLabel('El arte vive en las calles: murales gigantes', W / 2, 80, 42);
};
scenes.be_musicos = function (t) {
  let s = BEALL() + `<rect width="${W}" height="${H}" fill="#e8d47a"/><rect x="0" y="0" width="${W}" height="140" fill="#2a2a2a"/>${[...Array(30)].map((_, i) => [...Array(8)].map((_, r) => `<rect x="${i * 66}" y="${160 + r * 66}" width="62" height="62" fill="${(i + r) % 2 ? '#e0cc6a' : '#ecd884'}"/>`).join('')).join('')}`;
  s += `<rect x="200" y="200" width="440" height="80" fill="#1a4aa0"/><circle cx="250" cy="240" r="26" fill="#fff"/><text x="250" y="254" font-family="Fredoka" font-weight="700" font-size="38" text-anchor="middle" fill="#1a4aa0">U</text><text x="450" y="256" font-family="Fredoka" font-weight="700" font-size="40" text-anchor="middle" fill="#fff">Alexanderplatz</text>`;
  s += `<rect x="0" y="720" width="${W}" height="360" fill="#9a9a96"/><rect x="0" y="720" width="${W}" height="20" fill="#f4f4f0"/>`;
  s += rP(700, 980, 2.6, t, ESC({ ph: 1, top: '#5a7a5a', hold: `<g transform="translate(0,-60) rotate(-25)"><ellipse cx="-10" cy="0" rx="34" ry="24" fill="#c98a3a"/><circle cx="-10" cy="0" r="7" fill="#3a2a1a"/><rect x="20" y="-4" width="80" height="8" fill="#6b4a36"/></g>` })) + `<g transform="translate(800,1000)"><path d="M-50,0 Q-60,-40 0,-44 Q60,-40 50,0Z" fill="#3a2a1a"/>${[0, 1, 2].map(k => `<circle cx="${-14 + k * 14}" cy="-20" r="7" fill="url(#maGold)"/>`).join('')}</g>`;
  s += bePeople(t, 53, 10, 860, 1070) + [...Array(4)].map((_, i) => `<text x="${760 + i * 50}" y="${640 - ((t / L * 2 + i * .25) % 1) * 160}" font-size="50" fill="#2b3a67" opacity="${1 - ((t / L * 2 + i * .25) % 1)}">♪</text>`).join('');
  return s + rLabel('Música en plazas, parques y estaciones de metro', W / 2, 80, 40);
};
scenes.be_reciclaje = function (t) {
  let s = BEALL() + rSky('day') + madridBlock(-20, 700, 1960, 480, '#e8e2d4', '#5a6470') + street(700);
  const bins = [['#ffce00', 'Plástico'], ['#2f7ad0', 'Papel'], ['#7a5a3a', 'Orgánico'], ['#3aa65a', 'Vidrio'], ['#555', 'Resto']];
  s += bins.map(([c, n], i) => `<g transform="translate(${480 + i * 240},960)">${rShadow(0, 0, 90)}<path d="M-80,-220 L80,-220 L70,0 L-70,0Z" fill="${c}"/><rect x="-90" y="-240" width="180" height="30" rx="8" fill="${c}"/><rect x="-90" y="-240" width="180" height="30" rx="8" fill="#000" opacity=".15"/><path d="M-30,-140 l30,-30 l30,30 M-20,-110 h40" stroke="#fff" stroke-width="8" fill="none"/></g>${rLabel(n, 480 + i * 240, 1030, 30)}`).join('');
  s += rP(250, 1010, 2.2, t, ESC({ ph: 2, child: true, top: '#dd2a2a', hold: `<g transform="translate(10,-60)"><rect x="-14" y="-20" width="28" height="40" rx="6" fill="#4fb3f6"/></g>` }));
  return s + rLabel('Separan la basura y cuidan el planeta', W / 2, 80, 44);
};
scenes.be_ninos_frio = function (t) {
  let s = BEALL() + `<rect width="${W}" height="${H}" fill="#c8d4e0"/>` + [...Array(6)].map((_, i) => `<g transform="translate(${140 + i * 340},640)"><path d="M-10,0 L-6,-200 L6,-200 L10,0Z" fill="#6b4a36"/>${[...Array(5)].map((_, k) => `<path d="M0,${-200 + k * 30} l${(k % 2 ? 1 : -1) * 80},-50" stroke="#6b4a36" stroke-width="6"/>`).join('')}</g>`).join('') + `<rect x="0" y="640" width="${W}" height="440" fill="#f4f6f8"/>`;
  s += [...Array(40)].map((_, i) => `<circle cx="${(i * 131) % W}" cy="${((i * 97) + t / L * 500) % H}" r="5" fill="#fff"/>`).join('');
  const bx = 960 + S(t, 1) * 300;
  s += rP(bx - 300, 980, 2.2, t, { ph: 1, child: true, top: '#dd2a2a', cap: '#2f7ad0' }) + rP(bx + 300, 1000, 2.2, t, { ph: 3, child: true, top: '#2f7ad0', cap: '#ffce00', dir: -1 }) + `<g transform="translate(400,960)"><circle cx="0" cy="-40" r="50" fill="#fff" stroke="#ddd" stroke-width="3"/><circle cx="0" cy="-120" r="36" fill="#fff" stroke="#ddd" stroke-width="3"/><path d="M0,-118 l26,6 l-26,6Z" fill="#f29a3a"/><circle cx="-10" cy="-130" r="4" fill="#222"/><circle cx="10" cy="-130" r="4" fill="#222"/></g>` + ball(bx, 1000 - Math.abs(S(t, 4)) * 60, 24);
  return s + rLabel('Juegan al aire libre… ¡incluso con frío!', W / 2, 80, 44);
};
scenes.be_escuela_bici = function (t) {
  let s = BEALL() + rSky('day') + madridBlock(-20, 700, 1000, 460, '#e8e2d4', '#5a6470') + `<g transform="translate(1420,700)"><rect x="-460" y="-360" width="920" height="360" fill="#e9c89a"/>${[...Array(10)].map((_, i) => `<rect x="${-420 + (i % 5) * 170}" y="${-330 + Math.floor(i / 5) * 140}" width="110" height="90" fill="#7aa4c8"/>`).join('')}<rect x="-60" y="-110" width="120" height="110" fill="#6b4a36"/><rect x="-170" y="-410" width="340" height="56" fill="#fff" stroke="#dd2a2a" stroke-width="5"/><text x="0" y="-368" font-family="Fredoka" font-weight="700" font-size="40" text-anchor="middle" fill="#dd2a2a">SCHULE</text></g>` + street(700);
  s += `${[...Array(8)].map((_, i) => `<rect x="${720 + i * 50}" y="800" width="30" height="200" fill="#f4f4f0"/>`).join('')}` + ampelmann(660, 1000, .9, true);
  const p = (t / L);
  s += bike(((p * 2200) % 2500) - 200, 1000, 1.4, '#dd2a2a', rider('#ffce00', '#c99470', 1, t, true), t) + rP(820 + p * 200, 960, 1.8, t, { ph: 2, child: true, top: '#2f7ad0', bag: '#dd2a2a' }) + rP(940 + p * 200, 970, 1.8, t, { ph: 4, child: true, top: '#3aa65a', bag: '#ffce00', longhair: true });
  return s + rLabel('Caminando o en bici a la escuela', W / 2, 80, 44);
};
function pretzel(x, y, s = 1) { return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-70,30 Q-110,-60 -30,-70 Q30,-70 0,-10 Q-30,-70 30,-70 Q110,-60 70,30 Q40,50 0,-10 Q-40,50 -70,30Z" fill="none" stroke="#a8622a" stroke-width="26" stroke-linejoin="round"/>${[...Array(10)].map((_, i) => `<circle cx="${-70 + (i * 37) % 140}" cy="${-50 + (i * 23) % 70}" r="3" fill="#fff"/>`).join('')}</g>`; }
scenes.be_comida = function (t) {
  let s = BEALL() + `<rect width="${W}" height="${H}" fill="#f2e6cc"/><rect x="0" y="600" width="${W}" height="480" fill="url(#rWood)"/>`;
  s += `<g transform="translate(300,720)">${[0, 1, 2].map(k => `<ellipse cx="${-60 + k * 60}" cy="${(k % 2) * 16}" rx="70" ry="44" fill="${['#a8622a', '#c98a4a', '#8a4a1a'][k]}"/>`).join('')}</g>` + pretzel(720, 720, 1.2);
  s += plate(1150, 760, 200, `<rect x="-130" y="-30" width="260" height="40" rx="20" fill="#c8603a"/><rect x="-120" y="10" width="240" height="36" rx="18" fill="#b8503a"/><path d="M-100,-20 q100,-20 200,0" stroke="#ffce00" stroke-width="6" fill="none"/>`);
  s += plate(1560, 760, 170, `<path d="M-100,10 L100,10 L90,-30 Q0,-60 -90,-30Z" fill="#d9a04a"/>${[...Array(5)].map((_, i) => `<path d="M${-80 + i * 40},-30 l20,-10" stroke="#a8702a" stroke-width="5"/>`).join('')}`) + `<g transform="translate(1600,560)">${chocoCup(0, 0, .8)}${steam(0, -80, t, 2)}</g>`;
  return s + rLabel('Panes', 300, 860, 32) + rLabel('Pretzel', 720, 860, 32) + rLabel('Salchichas', 1150, 900, 32) + rLabel('Pastel de manzana', 1560, 900, 32) + rLabel('Chocolate caliente en invierno', 1600, 460, 30) + rLabel('Lo que comen los niños en Berlín', W / 2, 90, 44);
};
scenes.be_aula = function (t) {
  let s = BEALL() + `<rect width="${W}" height="${H}" fill="#f4ead4"/><rect x="480" y="120" width="960" height="380" fill="#2f5a3a" stroke="#8a6a46" stroke-width="18"/><text x="960" y="300" font-family="Fredoka" font-weight="600" font-size="80" text-anchor="middle" fill="#fff">Hallo! Hello! ¡Hola!</text><rect x="0" y="720" width="${W}" height="360" fill="#c9a07a"/>`;
  s += [0, 1, 2].map(i => `<g transform="translate(${460 + i * 500},860)"><rect x="-160" y="-20" width="320" height="24" fill="#a8774a"/><rect x="-150" y="0" width="14" height="120" fill="#7a5232"/><rect x="136" y="0" width="14" height="120" fill="#7a5232"/>${[...Array(5)].map((_, k) => `<rect x="${-120 + k * 50}" y="-40" width="30" height="20" fill="${['#dd2a2a', '#ffce00', '#2f7ad0', '#3aa65a', '#b86ad0'][k]}"/>`).join('')}</g>`).join('');
  s += rP(460, 840, 1.8, t, ESC({ ph: 1, child: true, top: '#2f7ad0' })) + rP(960, 840, 1.8, t, ESC({ ph: 2, child: true, top: '#ffce00', longhair: true })) + rP(1460, 840, 1.8, t, ESC({ ph: 3, child: true, top: '#dd2a2a' }));
  return s + rLabel('Idiomas, manualidades, deportes y trabajo en equipo', W / 2, 1010, 38);
};
scenes.be_pregunta = function (t) {
  let s = BEALL() + `<rect width="${W}" height="${H}" fill="#2b3a67"/>` + [...Array(14)].map((_, i) => `<text x="${(i * 157) % W}" y="${((i * 97) + t / L * 300) % H}" font-family="Fredoka" font-weight="700" font-size="${60 + (i % 3) * 20}" fill="#ffce00" opacity=".3">?</text>`).join('');
  return s + `<g transform="translate(960,460)"><rect x="-700" y="-160" width="1400" height="320" rx="40" fill="#fff"/><text x="0" y="-30" font-family="Fredoka" font-weight="700" font-size="60" text-anchor="middle" fill="#2b3a67">¿Qué te gustaría aprender</text><text x="0" y="60" font-family="Fredoka" font-weight="700" font-size="60" text-anchor="middle" fill="#2b3a67">si vivieras en Berlín?</text></g>` + rLabel('¡Cuéntanoslo en los comentarios!', W / 2, 820, 44);
};
scenes.be_ropa = function (t) {
  let s = BEALL() + `<svg x="0" y="0" width="960" height="1080" viewBox="0 0 960 1080"><rect width="960" height="1080" fill="#b8c4d0"/>${madridBlock(-20, 760, 980, 520, '#d9d1c4', '#5a6470')}${street(760)}${[...Array(30)].map((_, i) => `<circle cx="${(i * 131) % 960}" cy="${((i * 97) + t / L * 600) % 1080}" r="5" fill="#fff" opacity=".8"/>`).join('')}</svg>`;
  s += `<svg x="960" y="0" width="960" height="1080" viewBox="0 0 960 1080">${rSky('day')}${rSun(760, 160, 70)}${madridBlock(-20, 760, 980, 520, '#e8e2d4', '#5a6470')}${street(760)}</svg><rect x="954" y="0" width="12" height="${H}" fill="#fff"/>`;
  const coat = (x, sc, ph, col, sc2) => rP(x, 1010, sc, t, ESC({ ph, top: col, bot: '#2b2f3a', shoe: '#5a3a22', cap: sc2 })) + `<g transform="translate(${x},1010) scale(${sc})"><path d="M-16,-124 Q0,-114 16,-124 L14,-110 L-14,-110Z" fill="${sc2}"/><path d="M8,-120 L12,-90" stroke="${sc2}" stroke-width="6"/></g>`;
  s += coat(300, 2.3, 2, '#5a3a3a', '#ffce00') + coat(640, 1.9, 4, '#2b3a67', '#dd2a2a');
  s += rP(1260, 1000, 2.3, t, ESC({ ph: 1, top: '#ffce00', skirt: '#4fb3f6', longhair: true })) + rP(1600, 1010, 1.9, t, ESC({ ph: 3, child: true, top: '#7ad06a', bot: '#e9e2d4' }));
  return s + rLabel('Invierno: abrigos, gorros y bufandas', 480, 90, 34) + rLabel('Verano: ropa ligera y cómoda', 1440, 90, 36);
};
scenes.be_estilo = function (t) {
  let s = BEALL() + rSky('day') + berlinWall(-20, 1940, 720, 420, true) + street(720);
  const p = (x, top, bag, ph, o = {}) => rP(x, 1010, 2.4, t, ESC(Object.assign({ ph, top, bot: '#2b3a67', shoe: '#fff', bag }, o)));
  s += p(400, '#ffce00', '#dd2a2a', 1) + p(760, '#b86ad0', '#3aa65a', 2, { longhair: true, dir: -1 }) + p(1120, '#3aa65a', '#2f7ad0', 3, { cap: '#dd2a2a' }) + p(1480, '#ff9a3a', '#2b3a67', 4, { longhair: true, dir: -1 });
  return s + rLabel('Cómodos y auténticos: ¡ser uno mismo es lo más importante!', W / 2, 80, 36);
};
scenes.be_brandeburgo = function (t) {
  let s = BEALL() + rSky('day') + rSun(1650, 140) + rClouds(t, [[300, 110, .8]]) + brandenburg(960, 820, 1.25) + `<rect x="0" y="820" width="${W}" height="260" fill="#cfc4ae"/>${[...Array(14)].map((_, i) => `<line x1="${i * 150}" y1="820" x2="${i * 150 - 100}" y2="${H}" stroke="#bdb3a0" stroke-width="3"/>`).join('')}`;
  return s + bePeople(t, 63, 14, 860, 1070) + rLabel('Puerta de Brandeburgo · Brandenburger Tor', W / 2, 1010, 38);
};
scenes.be_carruaje = function (t) {
  let s = BEALL() + `<rect width="${W}" height="${H}" fill="#e8dcc0"/>` + `<g opacity=".95">` + rSky('day') + `</g><rect width="${W}" height="${H}" fill="#c9a77a" opacity=".3"/>` + brandenburg(960, 800, 1.1) + `<rect x="0" y="800" width="${W}" height="280" fill="#cbb894"/>`;
  const x = ((t / L) * 2400) % 2800 - 400;
  s += `<g transform="translate(${x},960)">${rShadow(0, 0, 200)}<path d="M-180,-60 L-40,-60 L-40,-180 L-180,-180Z" fill="#3a2a22"/><path d="M-190,-60 L-30,-60 L-40,-30 L-180,-30Z" fill="#5a3a22"/>${[-150, -60].map(cx => `<circle cx="${cx}" cy="-30" r="30" fill="none" stroke="#3a2a22" stroke-width="6"/>`).join('')}
  <g transform="translate(80,0)"><path d="M-50,-60 L-46,-110 Q-10,-130 30,-120 Q50,-150 70,-140 L74,-120 L50,-110 L46,-60 L36,-60 L32,-90 L-20,-90 L-30,-60 L-40,-60 L-38,-90Z" fill="#6b4a2a"/><path d="M${-40 + S(t, 8) * 6},-60 L${-40 + S(t, 8) * 6},0 M${30 - S(t, 8) * 6},-60 L${30 - S(t, 8) * 6},0" stroke="#6b4a2a" stroke-width="10"/></g></g>`;
  return s + rLabel('Hace más de 200 años: carruajes, sin carros ni aviones', W / 2, 1010, 36);
};
scenes.be_muro_puerta = function (t) {
  let s = BEALL() + `<rect width="${W}" height="${H}" fill="#9aa4ae"/>` + brandenburg(960, 720, 1.0) + `<rect x="0" y="720" width="${W}" height="360" fill="#8a8a84"/>` + berlinWall(-20, 1940, 900, 330, false);
  return s + rLabel('La puerta quedó junto al muro: nadie podía pasar', W / 2, 80, 40);
};
scenes.be_celebracion = function (t) {
  let s = BEALL() + rSky('night') + rStars(t, 60) + brandenburg(960, 700, .9) + `<rect x="0" y="700" width="${W}" height="380" fill="#4a4a50"/>` + berlinWall(-20, 1940, 900, 260, false);
  s += [...Array(12)].map((_, i) => rP(80 + i * 160, 640 - Math.abs(S(t, 4, i)) * 14, 1.3, t, ESC({ ph: i, top: ['#dd2a2a', '#ffce00', '#4fb3f6', '#fff'][i % 4], wave: i % 2 == 0 }))).join('');
  s += [0, 1, 2].map(k => { const p = (t / L * 2 + k / 3) % 1; return `<g transform="translate(${400 + k * 560},${300 - p * 80})" opacity="${1 - p}">${[...Array(12)].map((_, j) => `<line x1="0" y1="0" x2="${Math.cos(j / 12 * TAU) * p * 160}" y2="${Math.sin(j / 12 * TAU) * p * 160}" stroke="${['#ffce00', '#ff5a5f', '#4fb3f6'][k]}" stroke-width="5"/>`).join('')}</g>`; }).join('');
  s += bePeople(t, 73, 14, 960, 1075);
  return s + rLabel('Cuando el muro cayó, la gente celebró unida', W / 2, 80, 40);
};
scenes.be_muro = function (t) {
  let s = BEALL() + rSky('day') + madridBlock(-20, 720, 860, 420, '#d9d1c4', '#5a6470') + madridBlock(1080, 720, 860, 440, '#e8e2d4', '#5a6470') + `<rect x="0" y="720" width="${W}" height="360" fill="#b9b2a4"/>`;
  s += `<g transform="translate(960,0)"><rect x="-40" y="380" width="80" height="700" fill="#c9c6bc"/><rect x="-50" y="360" width="100" height="40" rx="20" fill="#d9d6cc"/>${[...Array(6)].map((_, k) => `<line x1="-40" y1="${440 + k * 110}" x2="40" y2="${440 + k * 110}" stroke="#a8a49a" stroke-width="3"/>`).join('')}</g>`;
  s += rP(700, 1000, 2.3, t, ESC({ ph: 1, top: '#2b3a67', wave: true })) + rP(560, 1010, 1.8, t, ESC({ ph: 2, child: true, top: '#ffce00' })) + rP(1240, 1000, 2.3, t, ESC({ ph: 3, top: '#dd2a2a', dir: -1, longhair: true, wave: true })) + rP(1380, 1010, 1.8, t, ESC({ ph: 4, child: true, top: '#3aa65a', dir: -1 }));
  return s + rLabel('El muro separaba familias, amigos y vecinos', W / 2, 80, 42);
};
scenes.be_eastside = function (t) {
  let s = BEALL() + rSky('day') + rSun(1650, 140) + spree(560, t, 120) + berlinWall(-20, 1940, 860, 300, true) + `<rect x="0" y="860" width="${W}" height="220" fill="#b9b2a4"/>` + bePeople(t, 83, 12, 900, 1070);
  return s + rLabel('East Side Gallery: arte con mensajes de paz', W / 2, 80, 44);
};
scenes.be_zoo = function (t) {
  let s = BEALL() + rSky('day') + rSun(300, 150) + grass(700) + [...Array(6)].map((_, i) => rTree(100 + i * 360, 720, .7, 'green', t, 700 + i)).join('');
  s += `<g transform="translate(960,860)"><rect x="-300" y="-460" width="80" height="460" fill="#c9b48a"/><rect x="220" y="-460" width="80" height="460" fill="#c9b48a"/><rect x="-220" y="-460" width="440" height="80" fill="#c9302a"/><path d="M-360,-460 Q0,-560 360,-460 L330,-500 Q0,-600 -330,-500Z" fill="#3a6a4a"/><path d="M-280,-560 Q0,-640 280,-560 L250,-590 Q0,-680 -250,-590Z" fill="#3a6a4a"/><rect x="-160" y="-450" width="320" height="56" fill="#f2d27a"/><text x="0" y="-410" font-family="Fredoka" font-weight="700" font-size="34" text-anchor="middle" fill="#3a2a1a">ZOO BERLIN</text>
  ${[-260, 260].map(x => `<g transform="translate(${x},0)"><rect x="-70" y="-60" width="140" height="60" fill="#bdb3a0"/><g transform="translate(0,-60) scale(${x < 0 ? -1 : 1},1)"><ellipse cx="0" cy="-60" rx="66" ry="50" fill="#9a958c"/><circle cx="50" cy="-80" r="34" fill="#9a958c"/><path d="M76,-70 Q100,-30 80,0" stroke="#9a958c" stroke-width="16" fill="none"/><ellipse cx="34" cy="-80" rx="20" ry="26" fill="#8a857c"/><rect x="-40" y="-30" width="20" height="30" fill="#9a958c"/><rect x="20" y="-30" width="20" height="30" fill="#9a958c"/></g></g>`).join('')}</g>`;
  return s + bePeople(t, 93, 10, 880, 1070) + rLabel('Zoológico de Berlín: ¡más de 175 años!', W / 2, 80, 42);
};
scenes.be_animales = function (t) {
  let s = BEALL() + rSky('day') + grass(620) + `<path d="M0,760 L${W},760" stroke="#8a6a46" stroke-width="8"/>${[...Array(40)].map((_, i) => `<line x1="${i * 50}" y1="700" x2="${i * 50}" y2="770" stroke="#8a6a46" stroke-width="5"/>`).join('')}<path d="M0,710 L${W},710" stroke="#8a6a46" stroke-width="6"/>`;
  s += `<g transform="translate(400,700)">${rShadow(0, 0, 140)}<path d="M-60,0 L-60,-260 L-40,-260 L-40,0 M40,0 L40,-200 L60,-200 L60,0" stroke="#e8b04a" stroke-width="22"/><ellipse cx="0" cy="-260" rx="110" ry="70" fill="#e8b04a"/><path d="M80,-290 L150,-520 L180,-510 L120,-280Z" fill="#e8b04a"/><ellipse cx="180" cy="-530" rx="40" ry="24" fill="#e8b04a"/>${[...Array(14)].map((_, i) => `<circle cx="${-80 + (i * 37) % 170}" cy="${-300 + (i * 23) % 80}" r="12" fill="#a8622a"/>`).join('')}</g>`;
  s += `<g transform="translate(1000,690)">${rShadow(0, 0, 150)}<ellipse cx="0" cy="-130" rx="150" ry="100" fill="#9a958c"/><circle cx="130" cy="-170" r="70" fill="#9a958c"/><path d="M180,-150 Q${220 + S(t, 2) * 10},-60 200,0" stroke="#9a958c" stroke-width="30" fill="none" stroke-linecap="round"/><ellipse cx="110" cy="-170" rx="40" ry="56" fill="#8a857c"/>${[-100, -40, 40, 100].map(x => `<rect x="${x - 20}" y="-60" width="40" height="60" fill="#9a958c"/>`).join('')}<circle cx="150" cy="-190" r="7" fill="#222"/></g>`;
  s += `<g transform="translate(1560,700)">${rShadow(0, 0, 110)}<ellipse cx="0" cy="-80" rx="110" ry="70" fill="#f4f4f0"/><circle cx="100" cy="-120" r="50" fill="#f4f4f0"/><circle cx="90" cy="-160" r="14" fill="#f4f4f0"/><circle cx="118" cy="-126" r="5" fill="#222"/><circle cx="146" cy="-112" r="7" fill="#222"/>${[-70, -20, 30, 70].map(x => `<rect x="${x - 16}" y="-30" width="32" height="30" fill="#f4f4f0"/>`).join('')}</g>`;
  s += bePeople(t, 103, 8, 820, 1070);
  return s + rLabel('Animales de todos los continentes', W / 2, 80, 44);
};
scenes.be_zoo_casa = function (t) {
  let s = BEALL() + `<rect width="${W}" height="${H}" fill="#c8d4e0"/>` + [...Array(40)].map((_, i) => `<circle cx="${(i * 131) % W}" cy="${((i * 97) + t / L * 500) % 600}" r="5" fill="#fff"/>`).join('') + `<rect x="0" y="600" width="${W}" height="480" fill="#f4f6f8"/>`;
  s += `<g transform="translate(960,860)"><rect x="-420" y="-360" width="840" height="360" fill="#c98a5a"/><path d="M-470,-360 L0,-560 L470,-360Z" fill="#6a3a2a"/><rect x="-300" y="-300" width="600" height="300" fill="#ffe9b0"/><rect x="-300" y="-300" width="600" height="300" fill="url(#rSunGlow)" opacity=".6"/>
  <ellipse cx="-60" cy="-100" rx="120" ry="80" fill="#9a958c"/><circle cx="50" cy="-130" r="56" fill="#9a958c"/><path d="M90,-110 Q120,-40 100,0" stroke="#9a958c" stroke-width="22" fill="none"/>${[-140, -80, -20].map(x => `<rect x="${x}" y="-40" width="30" height="40" fill="#9a958c"/>`).join('')}<circle cx="70" cy="-140" r="6" fill="#222"/></g>`;
  return s + rLabel('Casas especiales para que los animales no pasen frío', W / 2, 80, 38);
};
scenes.be_museos = function (t) {
  let s = BEALL() + rSky('day') + rSun(1650, 140) + berlinerDom(1500, 600, .7) + tvTower(1820, 600, .45);
  s += `<path d="M0,600 L${W},600 L${W},1080 L0,1080Z" fill="url(#beRiver)"/>${[...Array(16)].map((_, i) => `<path d="M${(i * 157 + t / L * 80) % W},${620 + (i * 41) % 440} q30,-6 60,0" stroke="#cfe2f0" stroke-width="3" fill="none" opacity=".6"/>`).join('')}`;
  s += `<path d="M120,900 L520,700 L1400,640 L1700,700 L1700,820 L520,960Z" fill="#cfc4ae"/>`;
  s += `<g transform="translate(560,780)"><path d="M-200,0 L-200,-260 L200,-260 L200,0Z" fill="#d6ccb4"/>${[...Array(6)].map((_, i) => `<rect x="${-180 + i * 64}" y="-240" width="22" height="240" fill="#e8e0cc"/>`).join('')}<rect x="-90" y="-340" width="180" height="80" fill="#d6ccb4"/><path d="M-110,-340 Q-110,-470 0,-480 Q110,-470 110,-340Z" fill="#7a8a96"/><rect x="-8" y="-510" width="16" height="34" fill="#5a6a76"/></g>`;
  s += `<g transform="translate(1080,720)"><rect x="-260" y="-260" width="520" height="260" fill="#e2d8c2"/>${[...Array(10)].map((_, i) => `<rect x="${-240 + i * 52}" y="-230" width="20" height="230" fill="#f4efe4"/>`).join('')}<path d="M-280,-260 L0,-340 L280,-260Z" fill="#d6ccb4"/></g>`;
  return s + rLabel('La Isla de los Museos', W / 2, 80, 46);
};
scenes.be_museo_sala = function (t) {
  let s = BEALL() + `<rect width="${W}" height="${H}" fill="#e8e0cc"/><rect x="0" y="0" width="${W}" height="120" fill="#d6ccb4"/><rect x="0" y="800" width="${W}" height="280" fill="#a8946a"/>`;
  s += `<g transform="translate(700,800)" stroke="#f4efe4" stroke-width="16" fill="none" stroke-linecap="round"><path d="M-300,-260 Q-100,-300 100,-260 Q200,-240 260,-340 Q300,-420 360,-400"/>${[...Array(8)].map((_, i) => `<path d="M${-260 + i * 50},-268 q0,40 6,70"/>`).join('')}<path d="M-200,-260 L-220,0 M-120,-270 L-100,0 M60,-262 L40,0 M130,-250 L150,0"/><path d="M340,-410 l50,-10 l20,30 l-60,10Z" fill="#f4efe4"/><path d="M-300,-260 Q-420,-200 -500,-120"/></g><rect x="300" y="790" width="800" height="20" fill="#7a6a4a"/>`;
  s += `<g transform="translate(1500,820)"><rect x="-110" y="-30" width="220" height="30" fill="#7a6a4a"/><path d="M-60,-30 L-70,-360 Q0,-420 70,-360 L60,-30Z" fill="#d9a43a"/><ellipse cx="0" cy="-330" rx="50" ry="56" fill="#e8c86a"/><path d="M-50,-370 L-60,-300 M50,-370 L60,-300" stroke="#2a4a8a" stroke-width="16"/><circle cx="-16" cy="-336" r="6" fill="#222"/><circle cx="16" cy="-336" r="6" fill="#222"/>${[...Array(6)].map((_, i) => `<line x1="-62" y1="${-260 + i * 36}" x2="62" y2="${-260 + i * 36}" stroke="#2a4a8a" stroke-width="6"/>`).join('')}</g>`;
  s += rP(1100, 1010, 2.2, t, ESC({ ph: 2, child: true, top: '#dd2a2a', dir: -1, wave: true })) + rP(260, 1020, 2.4, t, ESC({ ph: 3, top: '#2b3a67' }));
  return s + rLabel('Dinosaurios, momias y tesoros de miles de años', W / 2, 80, 40);
};
scenes.be_historia = function (t) {
  let s = BEALL() + rSky('day') + berlinWall(-20, 1940, 800, 400, true) + street(800) + `<rect width="${W}" height="${H}" fill="#2b3a67" opacity=".35"/>`;
  return s + `<g transform="translate(960,460)"><rect x="-560" y="-180" width="1120" height="360" rx="36" fill="#fffaf0" stroke="#dd2a2a" stroke-width="8"/><text x="0" y="-60" font-family="Fredoka" font-weight="600" font-size="44" text-anchor="middle" fill="#dd2a2a">Una historia</text><text x="0" y="60" font-family="Fredoka" font-weight="700" font-size="96" text-anchor="middle" fill="#2b3a67">El dibujo</text></g>`;
};
scenes.be_abuela = function (t) {
  let s = BEALL() + rSky('day') + rSun(300, 150) + grass(700) + `<g>${[0, 1, 2].map(k => `<rect x="${1100 + k * 140}" y="420" width="120" height="300" fill="#c9c6bc"/><rect x="${1096 + k * 140}" y="404" width="128" height="30" rx="14" fill="#d9d6cc"/>`).join('')}</g>` + `<path d="M0,820 L${W},800 L${W},900 L0,920Z" fill="#c9bea4"/>`;
  s += rP(500, 960, 2.6, t, ESC({ ph: 1, top: '#7a5a8a', skirt: '#5a4a6a', longhair: true, hair: '#d9d6d0' })) + rP(700, 970, 1.9, t, ESC({ ph: 2, child: true, top: '#ffce00', wave: true })) + rP(880, 960, 2.6, t, ESC({ ph: 3, top: '#2f7ad0', longhair: true }));
  s += bubble(780, 560, '¿Por qué hay un muro?', 44, '#2b3a67', -1);
  return s;
};
scenes.be_dibujos = function (t) {
  let s = BEALL() + rSky('day') + `<rect x="0" y="300" width="${W}" height="500" fill="#c9c6bc"/><rect x="0" y="280" width="${W}" height="40" rx="20" fill="#d9d6cc"/>` + street(800);
  const n = Math.min(6, Math.floor(t / L * 8) + 2);
  const draws = [
    `<g transform="translate(300,560)" stroke="#2b3a67" stroke-width="8" fill="none" stroke-linecap="round">${[-80, 0, 80].map(x => `<circle cx="${x}" cy="-80" r="24"/><path d="M${x},-56 v70 M${x - 30},-20 h60 M${x},14 l-20,50 M${x},14 l20,50"/>`).join('')}</g>`,
    `<g transform="translate(700,480)"><circle r="60" fill="#ffce00"/>${[...Array(10)].map((_, k) => `<line x1="${Math.cos(k * .628) * 76}" y1="${Math.sin(k * .628) * 76}" x2="${Math.cos(k * .628) * 110}" y2="${Math.sin(k * .628) * 110}" stroke="#ffce00" stroke-width="10" stroke-linecap="round"/>`).join('')}</g>`,
    `<path d="M1040,520 q-60,-70 0,-100 q60,30 0,100Z M1040,520 q60,-70 0,-100" fill="#ff5a5f" transform="translate(0,0) scale(1)"/><path d="M1000,560 C900,460 1000,380 1060,460 C1120,380 1220,460 1120,560 L1060,620Z" fill="#ff5a5f"/>`,
    `<text x="1440" y="520" font-family="Fredoka" font-weight="700" font-size="70" text-anchor="middle" fill="#3aa65a">AMIGOS</text>`,
    `<g transform="translate(1720,560)"><circle r="50" fill="#4fb3f6"/><path d="M-30,-10 q30,-30 60,0 q-30,40 -60,0Z" fill="#7ad06a"/></g>`,
    `<text x="900" y="720" font-family="Fredoka" font-weight="700" font-size="60" text-anchor="middle" fill="#b86ad0">♥ PAZ ♥</text>`];
  s += draws.slice(0, n).join('');
  s += rP(420, 1000, 2.0, t, ESC({ ph: 2, child: true, top: '#ffce00', hold: `<g transform="translate(16,-80)"><rect x="-5" y="-26" width="10" height="34" rx="3" fill="#ff5a5f"/></g>` })) + rP(900, 1010, 2.0, t, ESC({ ph: 3, child: true, top: '#dd2a2a', longhair: true })) + rP(1380, 1000, 2.0, t, ESC({ ph: 4, child: true, top: '#3aa65a', dir: -1 })) + rP(1680, 1010, 2.4, t, ESC({ ph: 5, top: '#7a5a8a', skirt: '#5a4a6a', longhair: true, hair: '#d9d6d0', dir: -1 }));
  return s + rLabel('Cuando los niños pintan juntos, el mundo aprende', W / 2, 80, 40);
};
scenes.be_moraleja = function (t) {
  let s = BEALL() + rSky('day') + rSun(1650, 140) + brandenburg(960, 760, .8) + `<rect x="0" y="760" width="${W}" height="320" fill="#cfc4ae"/>`;
  const kids = [['#4fb3f6', '#9c6a48'], ['#dd2a2a', '#f1cfae'], ['#ffce00', '#c99470'], ['#7a5a8a', '#e3b48e'], ['#3aa65a', '#5a3a2a'], ['#ff8a5a', '#f5d8bd']];
  s += kids.map(([c, sk], i) => rP(560 + i * 160, 990, 2.1, t, ESC({ ph: i, child: true, top: c, skin: sk, longhair: i % 2 == 1 }))).join('') + `<path d="M${560 + 18},${990 - 150} ${[...Array(5)].map((_, i) => `L${560 + i * 160 + 142},${990 - 150}`).join(' ')}" stroke="#c99470" stroke-width="8" fill="none"/>`;
  return s + rLabel('Moraleja: nuestras acciones pueden unir, no separar', W / 2, 1040, 34);
};
scenes.be_atardecer = function (t) {
  let s = BEALL() + rSky('dusk') + rSun(1500, 420, 80) + tvTower(1700, 760, .7) + brandenburg(860, 800, .95) + `<rect x="0" y="800" width="${W}" height="280" fill="#8a7a7a"/><rect x="0" y="800" width="${W}" height="280" fill="#e8908a" opacity=".2"/>`;
  return s + rCrowd(t, 113, 10, 860, 1060, { tops: ['#3a3a4a', '#5a4a5a', '#2b3a67'] });
};
scenes.be_postales = function (t) {
  const card = (i, name, label) => { const x = 60 + (i % 3) * 620 + (i >= 3 ? 310 : 0), y = i < 3 ? 210 : 620; return `<g transform="translate(${x},${y}) rotate(${(i - 2) * 2})"><rect x="-4" y="-2" width="390" height="330" fill="#000" opacity=".25"/><rect x="-12" y="-12" width="390" height="330" fill="#fff"/><circle cx="183" cy="-4" r="12" fill="#e8352a"/>
  <svg x="0" y="0" width="366" height="206" viewBox="0 0 1920 1080">${scenes[name](t)}</svg><text x="183" y="276" font-family="Fredoka" font-weight="700" font-size="42" text-anchor="middle" fill="#2b3a67">${label}</text></g>`; };
  return BEALL() + `<rect width="${W}" height="${H}" fill="#b9895a"/><rect x="30" y="30" width="${W - 60}" height="${H - 60}" fill="none" stroke="#7a5232" stroke-width="30"/>` + rLabel('¡Acompáñanos a otros destinos!', W / 2, 110, 44)
    + card(0, 'r_torre', 'Tokio') + card(1, 'ro_coliseo', 'Roma') + card(2, 'p_eiffel', 'París') + card(3, 'ma_palacio', 'Madrid') + card(4, 'sd_catedral', 'Santo Domingo');
};
scenes.be_outro = function (t) {
  let s = BEALL() + rSky('dusk') + rSun(1500, 420, 80) + tvTower(1700, 800, .7) + brandenburg(860, 840, .9) + `<rect x="0" y="840" width="${W}" height="240" fill="#a89a8a"/>` + bePeople(t, 123, 12, 880, 1060);
  return s + `<g transform="translate(${W / 2},${H / 2 - 260}) scale(${1 + S(t, 2) * .01})"><rect x="-620" y="-150" width="1240" height="300" rx="40" fill="#fff" opacity=".95" stroke="#2b3a67" stroke-width="6"/>
  <text x="0" y="-20" font-family="Fredoka" font-weight="700" font-size="100" text-anchor="middle" fill="#1a1a1a" stroke="#2b3a67" stroke-width="2" paint-order="stroke">Tschüss, Berlín!</text>
  <text x="0" y="90" font-family="Fredoka" font-weight="600" font-size="52" text-anchor="middle" fill="#dd2a2a">Nos vemos en el próximo viaje ✈</text></g>`;
};

/* =====================================================================
   v3 (21-nov) — correcciones de Vinelis: personas con tamaños coherentes
   con la perspectiva, murales variados al estilo East Side Gallery,
   objetos que se distinguen del fondo y bocadillos que no tapan caras.
   (Estas definiciones sustituyen a las anteriores del mismo nombre.)
   ===================================================================== */
// perspectiva: quien está junto a los edificios (y0) se ve pequeño; quien está delante (y=1010) mide como los personajes principales (≈2,2)
function bePeople(t, seed, n, y0, y1) {
  const base = y0 - 40, yb = Math.min(y1, base + (1010 - base) * .5);
  return rCrowd(t, seed, n, y0, yb, { tops: ['#2b3a67', '#ffce00', '#dd2a2a', '#5a7a5a', '#e8e2d4', '#333', '#4fb3f6', '#b86ad0'], scale: y => 0.35 + (y - base) / (1010 - base) * 1.9 });
}
// murales originales inspirados en el espíritu del East Side Gallery (paz, libertad, unión), cada panel distinto
function beMural(k, x, y, w, h, t) {
  const cx = x + w / 2, cy = y + h / 2, u = Math.min(w, h) / 200;
  const bgs = ['#4fb3f6', '#ffd34d', '#ff8a5a', '#7ad06a', '#2b3a67', '#f4f0e6', '#b86ad0', '#ff5a5f', '#5ad0c0', '#1a1a2a'];
  let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${bgs[k % 10]}"/>`;
  switch (k % 10) {
    case 0: // palomas sobre arcoíris
      s += [...Array(5)].map((_, i) => `<path d="M${x},${y + h} A${w * .6 - i * 18 * u},${h * .7 - i * 18 * u} 0 0 1 ${x + w},${y + h}" stroke="${['#ff5a5f', '#ff9a3a', '#ffd34d', '#7ad06a', '#2f7ad0'][i]}" stroke-width="${16 * u}" fill="none"/>`).join('')
        + [[-.25, -.25, 1], [.18, -.32, .8], [0, -.05, .9]].map(([dx, dy, sc]) => `<g transform="translate(${cx + dx * w},${cy + dy * h + S(t, 2, dx * 9) * 6}) scale(${u * sc})"><path d="M-40,0 Q-10,-10 10,0 Q30,-30 60,-40 Q40,-10 30,6 Q10,20 -20,14 L-46,22 Z" fill="#fff" stroke="#1a1a2a" stroke-width="3"/><circle cx="16" cy="-2" r="3" fill="#1a1a2a"/></g>`).join('');
      break;
    case 1: // caras grandes de colores
      s += [[-.25, '#ff5a5f'], [.25, '#2f7ad0']].map(([dx, c]) => `<g transform="translate(${cx + dx * w},${cy + 8 * u})"><ellipse rx="${w * .22}" ry="${h * .32}" fill="${c}" stroke="#1a1a2a" stroke-width="5"/><circle cx="${-w * .07}" cy="${-h * .08}" r="${10 * u}" fill="#fff" stroke="#1a1a2a" stroke-width="4"/><circle cx="${w * .07}" cy="${-h * .08}" r="${10 * u}" fill="#fff" stroke="#1a1a2a" stroke-width="4"/><path d="M${-w * .1},${h * .1} Q0,${h * .2} ${w * .1},${h * .1}" stroke="#1a1a2a" stroke-width="5" fill="none"/></g>`).join('');
      break;
    case 2: // manos que se dan a través de una grieta
      s += `<path d="M${cx},${y} l-14,${h * .2} l20,${h * .2} l-18,${h * .2} l16,${h * .2} l-8,${h * .2}" stroke="#1a1a2a" stroke-width="6" fill="none"/>`
        + `<g transform="translate(${cx},${cy}) scale(${u})"><path d="M-90,10 L-20,10 Q0,10 0,-6 Q0,-20 -20,-20 L-90,-20Z" fill="#e3b48e" stroke="#1a1a2a" stroke-width="4"/><path d="M90,-10 L20,-10 Q0,-10 0,6 Q0,20 20,20 L90,20Z" fill="#8a5a3a" stroke="#1a1a2a" stroke-width="4"/></g>`;
      break;
    case 3: // la Tierra con corazones
      s += `<circle cx="${cx}" cy="${cy}" r="${h * .32}" fill="#2f7ad0" stroke="#1a1a2a" stroke-width="5"/><path d="M${cx - h * .2},${cy - h * .1} q${h * .1},-${h * .12} ${h * .2},-${h * .04} q-${h * .02},${h * .14} -${h * .14},${h * .2}Z M${cx + h * .05},${cy + h * .05} q${h * .12},-${h * .06} ${h * .18},${h * .06} q-${h * .1},${h * .12} -${h * .18},-${h * .06}Z" fill="#7ad06a"/>`
        + [[-.35, -.3], [.35, -.25], [-.32, .3], [.3, .32]].map(([dx, dy]) => `<path d="M0,10 C-30,-14 -12,-34 0,-18 C12,-34 30,-14 0,10Z" fill="#ff5a5f" transform="translate(${cx + dx * w},${cy + dy * h}) scale(${u * 1.1 * (1 + .08 * S(t, 4, dx * 7))})"/>`).join('');
      break;
    case 4: // puerta abierta hacia un cielo luminoso
      s += `<rect x="${cx - w * .2}" y="${y + h * .18}" width="${w * .4}" height="${h * .72}" fill="#bfe6ff" stroke="#ffd34d" stroke-width="8"/><circle cx="${cx}" cy="${y + h * .5}" r="${h * .12}" fill="#ffd34d"/><path d="M${cx - w * .2},${y + h * .18} L${cx - w * .36},${y + h * .26} L${cx - w * .36},${y + h * .98} L${cx - w * .2},${y + h * .9}Z" fill="#c8323a" stroke="#1a1a2a" stroke-width="4"/>`
        + [...Array(8)].map((_, i) => `<line x1="${cx}" y1="${y + h * .5}" x2="${cx + Math.cos(i * .785) * w * .45}" y2="${y + h * .5 + Math.sin(i * .785) * h * .45}" stroke="#ffd34d" stroke-width="4" opacity=".6"/>`).join('');
      break;
    case 5: // flores que crecen por las grietas
      s += `<path d="M${x},${y + h * .6} l${w * .3},-10 l${w * .2},16 l${w * .5},-12" stroke="#8a8478" stroke-width="5" fill="none"/>`
        + [...Array(6)].map((_, i) => { const fx = x + w * (.12 + i * .15), fh = h * (.3 + (i % 3) * .12); return `<path d="M${fx},${y + h} Q${fx + 10},${y + h - fh / 2} ${fx},${y + h - fh}" stroke="#3a8a3a" stroke-width="6" fill="none"/>${[...Array(6)].map((_, p) => `<circle cx="${fx + Math.cos(p * 1.05) * 14 * u}" cy="${y + h - fh + Math.sin(p * 1.05) * 14 * u}" r="${9 * u}" fill="${['#ff5a5f', '#ffd34d', '#b86ad0', '#ff9a3a'][i % 4]}"/>`).join('')}<circle cx="${fx}" cy="${y + h - fh}" r="${7 * u}" fill="#fff"/>`; }).join('');
      break;
    case 6: // palabra FRIEDEN (paz) con letras de grafiti
      s += `<text x="${cx}" y="${cy + 20 * u}" font-family="Fredoka" font-weight="700" font-size="${Math.min(70 * u, w / 4.2)}" text-anchor="middle" fill="#ffd34d" stroke="#1a1a2a" stroke-width="${6 * u}" paint-order="stroke" transform="rotate(-6 ${cx} ${cy})">FRIEDEN</text>`
        + [...Array(10)].map((_, i) => `<circle cx="${x + (i * 53) % w}" cy="${y + 20 + (i * 37) % (h - 40)}" r="${4 + i % 4}" fill="#fff" opacity=".7"/>`).join('');
      break;
    case 7: // figuras geométricas de colores
      s += [...Array(7)].map((_, i) => `<path d="M${x + (i * 61) % w},${y + h} L${x + ((i * 61) % w) + w * .2},${y + h * (.2 + (i % 3) * .15)} L${x + ((i * 61) % w) + w * .4},${y + h}Z" fill="${['#ffd34d', '#2f7ad0', '#fff', '#1a1a2a', '#7ad06a', '#ff9a3a', '#b86ad0'][i]}" opacity=".9"/>`).join('');
      break;
    case 8: // cadena de niños de papel cogidos de la mano
      s += [...Array(5)].map((_, i) => `<g transform="translate(${x + w * (.12 + i * .19)},${cy + 30 * u}) scale(${u * .9})" fill="${['#ff5a5f', '#ffd34d', '#fff', '#2f7ad0', '#b86ad0'][i]}" stroke="#1a1a2a" stroke-width="3"><circle cx="0" cy="-70" r="18"/><path d="M-16,-50 L16,-50 L20,10 L8,10 L4,50 L-4,50 L-8,10 L-20,10Z"/><path d="M-16,-44 L-44,-30 M16,-44 L44,-30" stroke-width="10" stroke="${['#ff5a5f', '#ffd34d', '#fff', '#2f7ad0', '#b86ad0'][i]}"/></g>`).join('');
      break;
    case 9: // FREIHEIT (libertad) con estrellas
      s += [...Array(20)].map((_, i) => `<circle cx="${x + (i * 47) % w}" cy="${y + (i * 31) % h}" r="${2 + i % 3}" fill="#fff" opacity="${.4 + .6 * Math.abs(S(t, 2, i))}"/>`).join('')
        + `<text x="${cx}" y="${cy + 16 * u}" font-family="Fredoka" font-weight="700" font-size="${Math.min(60 * u, w / 4.6)}" text-anchor="middle" fill="#5ad0c0" stroke="#fff" stroke-width="${3 * u}" paint-order="stroke">FREIHEIT</text>`;
      break;
  }
  return s;
}
function berlinWall(x0, x1, base, h = 300, painted = false, t = 0) {
  let s = `<rect x="${x0}" y="${base - h}" width="${x1 - x0}" height="${h}" fill="#c9c6bc"/>`;
  if (painted) { let x = x0, k = 0; const ws = [300, 240, 280, 220, 320, 260, 300, 240, 280, 260];
    while (x < x1) { const w = ws[k % ws.length]; s += beMural(k + Math.round(x0 / 97), x, base - h, w, h, t); x += w; k++; } }
  s += `<rect x="${x0}" y="${base - h - 30}" width="${x1 - x0}" height="40" rx="20" fill="#d9d6cc"/><rect x="${x0}" y="${base - h - 30}" width="${x1 - x0}" height="12" rx="6" fill="#fff" opacity=".35"/>`;
  for (let x = x0; x < x1; x += 120) s += `<line x1="${x}" y1="${base - h}" x2="${x}" y2="${base}" stroke="#8a867c" stroke-width="2" opacity=".6"/>`;
  return s;
}
scenes.be_idioma = function (t) {
  let s = BEALL() + rSky('day') + madridBlock(-20, 720, 980, 520, '#e8e2d4', '#5a6470') + madridBlock(960, 720, 980, 500, '#d9d1c4', '#5a6470') + street(720);
  s += rP(600, 1010, 2.3, t, ESC({ ph: 1, top: '#2b3a67', wave: true })) + rP(1300, 1010, 2.2, t, ESC({ ph: 3, child: true, top: '#ffce00', dir: -1 }));
  s += bubble(560, 470, 'Hallo!', 60, '#dd2a2a', 1) + bubble(1330, 560, 'Guten Tag!', 54, '#2b3a67', -1);
  return s + rLabel('En Berlín se habla alemán', W / 2, 90, 46) + `<g transform="translate(960,260)"><rect x="-260" y="-60" width="520" height="120" rx="24" fill="#fff" stroke="#2b3a67" stroke-width="5"/>${deFlag(-220, -40, .6).replace('<line x1="0" y1="0" x2="0" y2="130" stroke="#555" stroke-width="4"/>', '')}<text x="40" y="22" font-family="Fredoka" font-weight="700" font-size="58" text-anchor="middle" fill="#2b3a67">Deutsch</text></g>`;
};
scenes.be_abuela = function (t) {
  let s = BEALL() + rSky('day') + rSun(300, 150) + grass(700) + `<g>${[0, 1, 2].map(k => `<rect x="${1100 + k * 140}" y="420" width="120" height="300" fill="#c9c6bc"/><rect x="${1096 + k * 140}" y="404" width="128" height="30" rx="14" fill="#d9d6cc"/>`).join('')}</g>` + `<path d="M0,820 L${W},800 L${W},900 L0,920Z" fill="#c9bea4"/>`;
  s += rP(500, 960, 2.6, t, ESC({ ph: 1, top: '#7a5a8a', skirt: '#5a4a6a', longhair: true, hair: '#d9d6d0' })) + rP(700, 970, 1.9, t, ESC({ ph: 2, child: true, top: '#ffce00', wave: true })) + rP(880, 960, 2.6, t, ESC({ ph: 3, top: '#2f7ad0', longhair: true }));
  s += bubble(760, 380, '¿Por qué hay un muro?', 44, '#2b3a67', -1);
  return s;
};
scenes.be_ninos_frio = function (t) {
  let s = BEALL() + `<rect width="${W}" height="${H}" fill="#9fb4ca"/>` + [...Array(6)].map((_, i) => `<g transform="translate(${140 + i * 340},640)"><path d="M-10,0 L-6,-200 L6,-200 L10,0Z" fill="#5a3a26"/>${[...Array(5)].map((_, k) => `<path d="M0,${-200 + k * 30} l${(k % 2 ? 1 : -1) * 80},-50" stroke="#5a3a26" stroke-width="6"/>`).join('')}</g>`).join('') + `<rect x="0" y="640" width="${W}" height="440" fill="#dde6ef"/>`;
  s += [...Array(40)].map((_, i) => `<circle cx="${(i * 131) % W}" cy="${((i * 97) + t / L * 500) % H}" r="5" fill="#fff"/>`).join('');
  const bx = 960 + S(t, 1) * 300;
  s += `<g transform="translate(400,960)"><ellipse cx="0" cy="8" rx="60" ry="10" fill="#7a8ea4" opacity=".4"/><circle cx="0" cy="-40" r="50" fill="#fff" stroke="#7a8ea4" stroke-width="4"/><circle cx="0" cy="-120" r="36" fill="#fff" stroke="#7a8ea4" stroke-width="4"/><path d="M0,-118 l26,6 l-26,6Z" fill="#f29a3a"/><circle cx="-10" cy="-130" r="4" fill="#222"/><circle cx="10" cy="-130" r="4" fill="#222"/><path d="M-30,-88 Q0,-76 30,-88 L28,-78 Q0,-66 -28,-78Z" fill="#dd2a2a"/><path d="M-26,-150 L26,-150 L20,-186 L-20,-186Z M-34,-150 h68" stroke="#1a1a2a" stroke-width="6" fill="#1a1a2a"/></g>`;
  s += rP(bx - 300, 980, 2.2, t, { ph: 1, child: true, top: '#dd2a2a', cap: '#2f7ad0' }) + rP(bx + 300, 1000, 2.2, t, { ph: 3, child: true, top: '#2f7ad0', cap: '#ffce00', dir: -1 }) + ball(bx, 1000 - Math.abs(S(t, 4)) * 60, 24);
  return s + rLabel('Juegan al aire libre… ¡incluso con frío!', W / 2, 80, 44);
};
scenes.be_comida = function (t) {
  let s = BEALL() + `<rect width="${W}" height="${H}" fill="#f2e6cc"/><rect x="0" y="600" width="${W}" height="480" fill="url(#rWood)"/>`;
  s += `<path d="M60,610 L1860,610 L1920,1080 L0,1080Z" fill="#fff"/>${[...Array(16)].map((_, i) => `<path d="M${60 + i * 112},610 L${60 + i * 112 + 56},610 L${i * 120 + 60},1080 L${i * 120},1080Z" fill="#dd2a2a" opacity=".22"/>`).join('')}${[...Array(6)].map((_, j) => `<rect x="0" y="${640 + j * 80}" width="${W}" height="36" fill="#dd2a2a" opacity=".12"/>`).join('')}`;
  s += `<g transform="translate(300,720)">${rShadow(0, 50, 150, .25)}<ellipse cx="0" cy="40" rx="160" ry="40" fill="#c98a4a"/>${[0, 1, 2].map(k => `<ellipse cx="${-60 + k * 60}" cy="${(k % 2) * 16}" rx="70" ry="44" fill="${['#a8622a', '#c98a4a', '#8a4a1a'][k]}" stroke="#5a2a10" stroke-width="3"/>`).join('')}</g>` + pretzel(720, 720, 1.2);
  s += plate(1150, 760, 200, `<rect x="-130" y="-30" width="260" height="40" rx="20" fill="#c8603a"/><rect x="-120" y="10" width="240" height="36" rx="18" fill="#b8503a"/><path d="M-100,-20 q100,-20 200,0" stroke="#ffce00" stroke-width="6" fill="none"/>`);
  s += plate(1560, 760, 170, `<path d="M-100,10 L100,10 L90,-30 Q0,-60 -90,-30Z" fill="#d9a04a"/>${[...Array(5)].map((_, i) => `<path d="M${-80 + i * 40},-30 l20,-10" stroke="#a8702a" stroke-width="5"/>`).join('')}`) + `<g transform="translate(1600,560)">${chocoCup(0, 0, .8)}${steam(0, -80, t, 2)}</g>`;
  return s + rLabel('Panes', 300, 860, 32) + rLabel('Pretzel', 720, 860, 32) + rLabel('Salchichas', 1150, 900, 32) + rLabel('Pastel de manzana', 1560, 900, 32) + rLabel('Chocolate caliente en invierno', 1600, 460, 30) + rLabel('Lo que comen los niños en Berlín', W / 2, 90, 44);
};
scenes.be_aula = function (t) {
  let s = BEALL() + `<rect width="${W}" height="${H}" fill="#f4ead4"/><rect x="480" y="120" width="960" height="380" fill="#2f5a3a" stroke="#8a6a46" stroke-width="18"/><text x="960" y="300" font-family="Fredoka" font-weight="600" font-size="80" text-anchor="middle" fill="#fff">Hallo! Hello! ¡Hola!</text><rect x="0" y="720" width="${W}" height="360" fill="#c9a07a"/>`;
  // los niños, sentados detrás de sus mesas (la mesa tapa las piernas)
  s += rP(460, 900, 2.3, t, ESC({ ph: 1, child: true, top: '#2f7ad0' })) + rP(960, 900, 2.3, t, ESC({ ph: 2, child: true, top: '#ffce00', longhair: true })) + rP(1460, 900, 2.3, t, ESC({ ph: 3, child: true, top: '#dd2a2a' }));
  s += [0, 1, 2].map(i => `<g transform="translate(${460 + i * 500},860)"><rect x="-160" y="-20" width="320" height="24" fill="#a8774a"/><rect x="-160" y="4" width="320" height="70" fill="#8a5a32"/><rect x="-150" y="0" width="14" height="140" fill="#7a5232"/><rect x="136" y="0" width="14" height="140" fill="#7a5232"/>${[...Array(5)].map((_, k) => `<rect x="${-120 + k * 50}" y="-40" width="30" height="20" fill="${['#dd2a2a', '#ffce00', '#2f7ad0', '#3aa65a', '#b86ad0'][k]}"/>`).join('')}</g>`).join('');
  return s + rLabel('Idiomas, manualidades, deportes y trabajo en equipo', W / 2, 1010, 38);
};
scenes.be_brandeburgo = function (t) {
  let s = BEALL() + rSky('day') + rSun(1650, 140) + rClouds(t, [[300, 110, .8]]) + brandenburg(960, 820, 1.25) + `<rect x="0" y="820" width="${W}" height="260" fill="#9e9a92"/>${[...Array(14)].map((_, i) => `<line x1="${i * 150}" y1="820" x2="${i * 150 - 100}" y2="${H}" stroke="#8a867e" stroke-width="3"/>`).join('')}`;
  return s + bePeople(t, 63, 14, 860, 1070) + rLabel('Puerta de Brandeburgo · Brandenburger Tor', W / 2, 1010, 38);
};
scenes.be_carruaje = function (t) {
  let s = BEALL() + `<rect width="${W}" height="${H}" fill="#e8dcc0"/>` + `<g opacity=".95">` + rSky('day') + `</g><rect width="${W}" height="${H}" fill="#c9a77a" opacity=".3"/>` + brandenburg(960, 800, 1.1) + `<rect x="0" y="800" width="${W}" height="280" fill="#8e8a80"/>${[...Array(14)].map((_, i) => `<line x1="${i * 150}" y1="800" x2="${i * 150 - 100}" y2="${H}" stroke="#7a766c" stroke-width="3"/>`).join('')}`;
  const x = ((t / L) * 2600) % 2800 - 400;
  s += `<g transform="translate(${x},1010) scale(1.7)">${rShadow(0, 0, 200)}<path d="M-180,-60 L-40,-60 L-40,-180 L-180,-180Z" fill="#3a2a22"/><rect x="-170" y="-160" width="50" height="50" fill="#e8d8a8"/><path d="M-190,-60 L-30,-60 L-40,-30 L-180,-30Z" fill="#5a3a22"/>${[-150, -60].map(cx => `<circle cx="${cx}" cy="-30" r="30" fill="#e8c860" stroke="#3a2a22" stroke-width="6"/><circle cx="${cx}" cy="-30" r="6" fill="#3a2a22"/>`).join('')}
  <g transform="translate(80,0)"><path d="M-50,-60 L-46,-110 Q-10,-130 30,-120 Q50,-150 70,-140 L74,-120 L50,-110 L46,-60 L36,-60 L32,-90 L-20,-90 L-30,-60 L-40,-60 L-38,-90Z" fill="#6b4a2a"/><path d="M${-40 + S(t, 8) * 6},-60 L${-40 + S(t, 8) * 6},0 M${30 - S(t, 8) * 6},-60 L${30 - S(t, 8) * 6},0" stroke="#6b4a2a" stroke-width="10"/></g></g>`;
  return s + rLabel('Hace más de 200 años: carruajes, sin carros ni aviones', W / 2, 80, 36);
};
scenes.be_moraleja = function (t) {
  let s = BEALL() + rSky('day') + rSun(1650, 140) + brandenburg(960, 760, .8) + `<rect x="0" y="760" width="${W}" height="320" fill="#9e9a92"/>`;
  const kids = [['#4fb3f6', '#9c6a48'], ['#dd2a2a', '#f1cfae'], ['#ffce00', '#c99470'], ['#7a5a8a', '#e3b48e'], ['#3aa65a', '#5a3a2a'], ['#ff8a5a', '#f5d8bd']];
  s += kids.map(([c, sk], i) => rP(560 + i * 160, 990, 2.1, t, ESC({ ph: i, child: true, top: c, skin: sk, longhair: i % 2 == 1 }))).join('') + `<path d="M${560 + 18},${990 - 150} ${[...Array(5)].map((_, i) => `L${560 + i * 160 + 142},${990 - 150}`).join(' ')}" stroke="#c99470" stroke-width="8" fill="none"/>`;
  return s + rLabel('Moraleja: nuestras acciones pueden unir, no separar', W / 2, 1040, 34);
};
scenes.be_atardecer = function (t) {
  let s = BEALL() + rSky('dusk') + rSun(1500, 420, 80) + tvTower(1700, 760, .7) + brandenburg(860, 800, .95) + `<rect x="0" y="800" width="${W}" height="280" fill="#6a5a62"/><rect x="0" y="800" width="${W}" height="280" fill="#e8908a" opacity=".15"/>`;
  return s + bePeople(t, 113, 10, 840, 1060);
};
