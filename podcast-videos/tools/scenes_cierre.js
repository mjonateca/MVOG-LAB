/* Cierre común de todos los capítulos (petición de Vinelis, 21-nov):
   logo de Mi Pequeño Atlas, los libros publicados con sus portadas reales,
   colores vivos e invitación clara a escuchar el podcast y conseguir los libros.
   Vinelis queda abajo a la derecha (stage [[1730, .62]]). */
const CIERRE_LIBROS = ['tokio', 'paris', 'roma', 'santodomingo'];
// precarga: imágenes en el documento para que el evento load espere por ellas
document.write('<div style="position:absolute;left:-9999px">' +
  ['logo-640.png', ...CIERRE_LIBROS.map(k => `libros/${k}.jpg`)].map(f => `<img src="../assets/${f}">`).join('') + '</div>');

function cierreHeadphones(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})"><path d="M-46,10 Q-46,-52 0,-52 Q46,-52 46,10" stroke="#2b3a67" stroke-width="12" fill="none" stroke-linecap="round"/>
  <rect x="-60" y="0" width="30" height="50" rx="12" fill="#ff5a4e" stroke="#2b3a67" stroke-width="5"/><rect x="30" y="0" width="30" height="50" rx="12" fill="#ff5a4e" stroke="#2b3a67" stroke-width="5"/></g>`;
}
function cierreBookIcon(x, y, s = 1) {
  return `<g transform="translate(${x},${y}) scale(${s})" stroke="#2b3a67" stroke-width="5" stroke-linejoin="round"><path d="M0,-30 Q-30,-44 -62,-36 L-62,34 Q-30,26 0,40Z" fill="#ffd23f"/><path d="M0,-30 Q30,-44 62,-36 L62,34 Q30,26 0,40Z" fill="#4fc3f7"/></g>`;
}

scenes.cierre = function (t) {
  const R = rng(777);
  let s = `<defs><radialGradient id="ciBg" cx=".3" cy=".35" r=".9"><stop offset="0" stop-color="#5ec8ff"/><stop offset=".55" stop-color="#2f7fe8"/><stop offset="1" stop-color="#1d3fae"/></radialGradient>
  <linearGradient id="ciShelf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c98a4b"/><stop offset="1" stop-color="#8a5a2b"/></linearGradient></defs>
  <rect width="${W}" height="${H}" fill="url(#ciBg)"/>`;
  // rayos que giran detrás del logo
  s += `<g transform="translate(360,400) rotate(${t / L * 30})" opacity=".22">${[...Array(16)].map((_, i) => `<path d="M0,0 L${Math.cos(i / 16 * TAU) * 900},${Math.sin(i / 16 * TAU) * 900} L${Math.cos((i + .45) / 16 * TAU) * 900},${Math.sin((i + .45) / 16 * TAU) * 900}Z" fill="#fff"/>`).join('')}</g>`;
  // nubes que pasan
  for (let i = 0; i < 5; i++) s += cloud(((i * 470 + t / L * 220) % (W + 300)) - 150, 160 + (i % 3) * 300, .9 + (i % 2) * .4, .55);
  // confeti y estrellitas
  const cols = ['#ffd23f', '#ff5a4e', '#7ee081', '#ffffff', '#ff9ad5'];
  for (let i = 0; i < 40; i++) {
    const x = R() * W, sp = .5 + R(), y = ((R() * H + t / L * H * sp) % (H + 40)) - 20, r = R() * 360 + t / L * 360 * sp;
    s += i % 3 ? `<rect x="-7" y="-4" width="14" height="8" rx="2" fill="${cols[i % 5]}" transform="translate(${x},${y}) rotate(${r})" opacity=".9"/>`
      : `<path d="M0,-10 L3,-3 L10,0 L3,3 L0,10 L-3,3 L-10,0 L-3,-3Z" fill="#fff8c2" transform="translate(${x},${y}) scale(${1 + .4 * S(t, 4, i)})"/>`;
  }
  // logo
  const bob = S(t, 2) * 10;
  s += `<ellipse cx="360" cy="690" rx="210" ry="26" fill="#000" opacity=".18"/>
  <image href="../assets/logo-640.png" x="${360 - 270}" y="${130 + bob}" width="540" height="540" transform="rotate(${S(t, 1) * 2} 360 400)"/>`;
  s += `<g transform="translate(360,800)"><text x="0" y="0" font-family="Fredoka" font-weight="700" font-size="60" text-anchor="middle" fill="#ffd23f" stroke="#1d2a5a" stroke-width="10" paint-order="stroke">¡Sigue viajando</text>
  <text x="0" y="70" font-family="Fredoka" font-weight="700" font-size="60" text-anchor="middle" fill="#ffd23f" stroke="#1d2a5a" stroke-width="10" paint-order="stroke">con nosotros!</text></g>`;
  // tarjeta del podcast
  const pc = 1 + S(t, 2, 1) * .012;
  s += `<g transform="translate(1180,290) scale(${pc})"><rect x="-500" y="-150" width="1000" height="300" rx="44" fill="#fff" stroke="#1d2a5a" stroke-width="7"/>
  <rect x="-500" y="-150" width="1000" height="92" rx="44" fill="#ff5a4e"/><rect x="-500" y="-100" width="1000" height="42" fill="#ff5a4e"/>
  <text x="40" y="-84" font-family="Fredoka" font-weight="700" font-size="56" text-anchor="middle" fill="#fff">¡Escucha el podcast!</text>
  ${cierreHeadphones(-340, -96, .62)}
  <text x="0" y="22" font-family="Fredoka" font-weight="700" font-size="64" text-anchor="middle" fill="#1d3fae">Mi Pequeño Atlas</text>
  <text x="0" y="96" font-family="Fredoka" font-weight="600" font-size="38" text-anchor="middle" fill="#2b3a67">Un viaje nuevo en tu app de podcasts</text></g>`;
  // estantería con los libros
  s += `<rect x="650" y="868" width="900" height="34" rx="8" fill="url(#ciShelf)" stroke="#5a3a1a" stroke-width="4"/><rect x="670" y="902" width="24" height="40" fill="#8a5a2b"/><rect x="1506" y="902" width="24" height="40" fill="#8a5a2b"/>`;
  // portadas reales de los libros (Gumroad): Tokio, París y Roma cuadradas, Santo Domingo vertical
  const CIERRE_TAM = { tokio: [210, 210], paris: [210, 210], roma: [210, 210], santodomingo: [186, 279] };
  CIERRE_LIBROS.forEach((k, i) => {
    const [bw, bh] = CIERRE_TAM[k] || [200, 300], x = 702 + i * 214, f = S(t, 2, i * 1.3) * 8, rot = [-4, 2, -2, 4][i];
    s += `<g transform="translate(${x + 105},${866 + f}) rotate(${rot})"><rect x="${-bw / 2}" y="${-bh}" width="${bw}" height="${bh}" rx="6" fill="#000" opacity=".25" transform="translate(8,6)"/>
    <image href="../assets/libros/${k}.jpg" x="${-bw / 2}" y="${-bh}" width="${bw}" height="${bh}" preserveAspectRatio="xMidYMid slice"/>
    <rect x="${-bw / 2}" y="${-bh}" width="${bw}" height="${bh}" rx="4" fill="none" stroke="#1d2a5a" stroke-width="4"/><rect x="${-bw / 2}" y="${-bh}" width="12" height="${bh}" fill="#000" opacity=".18"/></g>`;
  });
  // cinta de los libros
  s += `<g transform="translate(1100,980)"><rect x="-470" y="-50" width="940" height="96" rx="48" fill="#ffd23f" stroke="#1d2a5a" stroke-width="6"/>
  ${cierreBookIcon(-400, -2, .8)}
  <text x="30" y="-6" font-family="Fredoka" font-weight="700" font-size="40" text-anchor="middle" fill="#1d2a5a">Los libros de Mi Pequeño Atlas</text>
  <text x="30" y="34" font-family="Fredoka" font-weight="600" font-size="30" text-anchor="middle" fill="#1d2a5a">En Gumroad y Payhip: ¡el enlace está en la descripción!</text></g>`;
  return s;
};
