/* Carlos — invitado del capítulo de Ottawa. Personaje sencillo con el estilo de los libros
   (ilustración suave, ojos grandes con brillo, sombras cálidas). Ropa de invierno canadiense.
   carlosSVG(mouth 0|1|2, blink 0|1, arm 'rest'|'wave'|'talk') -> SVG 600x600, pies abajo al centro */
function carlosSVG(mouth = 0, blink = 0, arm = 'rest') {
  const skin = '#d9a27a', skinD = '#c08860', hair = '#3a2618', coat = '#2c4f7c', coatD = '#213c60', scarf = '#d52b1e', jeans = '#3c4c66';
  const eye = (x) => blink ? `<path d="M${x - 15},252 q15,8 30,0" stroke="#2a1a12" stroke-width="5" fill="none" stroke-linecap="round"/>` :
    `<ellipse cx="${x}" cy="250" rx="15" ry="18" fill="#fff"/><circle cx="${x + 1}" cy="252" r="11" fill="#5a3a22"/><circle cx="${x + 1}" cy="253" r="6" fill="#1a0e08"/><circle cx="${x + 5}" cy="247" r="4" fill="#fff"/><circle cx="${x - 3}" cy="257" r="2" fill="#fff" opacity=".8"/>`;
  const mouths = [
    `<path d="M282,300 Q300,318 318,300" stroke="#7a3a2a" stroke-width="5" fill="none" stroke-linecap="round"/>`,
    `<path d="M282,298 Q300,322 318,298 Q300,306 282,298Z" fill="#7a2a22"/><path d="M286,300 Q300,305 314,300" stroke="#fff" stroke-width="4"/>`,
    `<path d="M280,296 Q300,336 320,296 Q300,304 280,296Z" fill="#6a2018"/><path d="M285,298 Q300,304 315,298" stroke="#fff" stroke-width="5"/><ellipse cx="300" cy="318" rx="9" ry="5" fill="#d8605a"/>`][mouth];
  const armL = `<path d="M222,402 Q200,470 206,540" stroke="${coat}" stroke-width="44" fill="none" stroke-linecap="round"/><circle cx="206" cy="548" r="18" fill="${skin}"/>`;
  const armR = arm === 'wave' ? `<path d="M378,402 Q430,370 446,300" stroke="${coat}" stroke-width="44" fill="none" stroke-linecap="round"/><g transform="translate(450,276) rotate(-10)"><ellipse rx="20" ry="24" fill="${skin}"/><path d="M-14,-16 v-20 M-4,-20 v-24 M6,-20 v-22 M15,-14 v-16" stroke="${skin}" stroke-width="9" stroke-linecap="round"/></g>`
    : arm === 'talk' ? `<path d="M378,402 Q440,450 420,500" stroke="${coat}" stroke-width="44" fill="none" stroke-linecap="round"/><g transform="translate(416,512)"><ellipse rx="20" ry="17" fill="${skin}"/><path d="M14,-6 h16 M14,4 h14" stroke="${skin}" stroke-width="9" stroke-linecap="round"/></g>`
    : `<path d="M378,402 Q400,470 394,540" stroke="${coat}" stroke-width="44" fill="none" stroke-linecap="round"/><circle cx="394" cy="548" r="18" fill="${skin}"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
  <defs><linearGradient id="cCoat" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${coatD}"/><stop offset=".45" stop-color="${coat}"/><stop offset="1" stop-color="${coatD}"/></linearGradient>
  <radialGradient id="cFace" cx=".45" cy=".4" r=".7"><stop offset="0" stop-color="#e8b892"/><stop offset="1" stop-color="${skin}"/></radialGradient></defs>
  <ellipse cx="300" cy="592" rx="110" ry="10" fill="#000" opacity=".18"/>
  <path d="M252,500 L246,578 L290,578 L296,500Z M304,500 L310,578 L354,578 L348,500Z" fill="${jeans}"/>
  <path d="M236,572 Q240,560 292,562 L294,590 L232,590Z M308,562 Q360,560 366,572 L370,590 L306,590Z" fill="#5a3a22"/>
  ${armL}
  <path d="M226,390 Q230,360 300,354 Q370,360 374,390 L384,520 Q300,536 216,520Z" fill="url(#cCoat)"/>
  ${[0, 1, 2, 3].map(k => `<path d="M${222 - k},${420 + k * 26} Q300,${430 + k * 26} ${378 + k},${420 + k * 26}" stroke="${coatD}" stroke-width="3" fill="none" opacity=".7"/>`).join('')}
  <line x1="300" y1="380" x2="300" y2="526" stroke="#18304e" stroke-width="4"/>
  ${armR}
  <path d="M250,352 Q300,384 350,352 L356,374 Q300,404 244,374Z" fill="${scarf}"/><path d="M318,372 L334,372 L344,452 L322,456Z" fill="${scarf}"/>${[0, 1, 2].map(k => `<line x1="${324 + k * 7}" y1="456" x2="${325 + k * 7}" y2="470" stroke="${scarf}" stroke-width="4"/>`).join('')}<path d="M320,400 h22 M321,425 h22" stroke="#fff" stroke-width="4" opacity=".8"/>
  <rect x="284" y="322" width="32" height="34" fill="${skinD}"/>
  <path d="M232,230 Q236,180 300,176 Q364,180 368,230Z" fill="${hair}"/><ellipse cx="300" cy="258" rx="72" ry="82" fill="url(#cFace)"/><path d="M232,232 Q240,190 300,186 Q360,190 368,232 Q340,206 300,208 Q260,206 232,232Z" fill="${hair}"/><ellipse cx="229" cy="262" rx="12" ry="18" fill="${skinD}"/><ellipse cx="371" cy="262" rx="12" ry="18" fill="${skinD}"/>
  <path d="M238,288 Q244,336 300,342 Q356,336 362,288 Q350,310 300,312 Q250,310 238,288Z" fill="${hair}" opacity=".85"/>
  <path d="M276,292 Q300,282 324,292 Q300,298 276,292Z" fill="${hair}"/>
  ${eye(272)}${eye(328)}
  <path d="M254,226 Q272,216 288,226" stroke="${hair}" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M312,226 Q328,216 346,226" stroke="${hair}" stroke-width="7" fill="none" stroke-linecap="round"/>
  <path d="M296,258 Q292,280 300,284 Q306,284 308,280" stroke="${skinD}" stroke-width="5" fill="none" stroke-linecap="round"/>
  <ellipse cx="256" cy="282" rx="12" ry="7" fill="#e88a7a" opacity=".45"/><ellipse cx="344" cy="282" rx="12" ry="7" fill="#e88a7a" opacity=".45"/>
  ${mouths}
  <g transform="translate(0,-30)"><path d="M226,214 Q226,150 300,146 Q374,150 374,214 Q374,232 368,236 L232,236 Q226,232 226,214Z" fill="#7a8696"/>
  <rect x="222" y="214" width="156" height="30" rx="12" fill="#5f6b7a"/>${[...Array(9)].map((_, k) => `<line x1="${232 + k * 17}" y1="216" x2="${232 + k * 17}" y2="242" stroke="#4f5a68" stroke-width="3"/>`).join('')}
  <circle cx="300" cy="140" r="20" fill="#d52b1e"/></g>
  </svg>`;
}
if (typeof module !== 'undefined') module.exports = { carlosSVG };
