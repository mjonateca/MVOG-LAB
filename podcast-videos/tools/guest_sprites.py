"""Recorta la hoja validada de un invitado (rejilla 3x2 con rótulos debajo) en sprites RGBA.
usage: python3 guest_sprites.py hoja.png outdir
Orden de la hoja: [boca abierta, boca cerrada, boca entreabierta] / [escucha, parpadeo, saludo]
Salida: m0.png (cerrada), m1.png (entreabierta), m2.png (abierta), listen.png, blink.png, wave.png"""
import sys, os, cv2, numpy as np
src, out = sys.argv[1], sys.argv[2]; os.makedirs(out, exist_ok=True)
im = cv2.imread(src)
H, W = im.shape[:2]; cw, ch = W // 3, H // 2
names = [['m2', 'm0', 'm1'], ['listen', 'blink', 'wave']]
crops = {}
for r in range(2):
    for c in range(3):
        cell = im[r*ch:(r+1)*ch, c*cw:(c+1)*cw].copy()
        # quitar el rótulo: buscar la última fila con personaje (antes del texto)
        g = cv2.cvtColor(cell, cv2.COLOR_BGR2GRAY)
        nonwhite = (g < 235).sum(1)
        rows = np.where(nonwhite > 3)[0]
        # el texto está en el último bloque; cortamos en el mayor hueco blanco de la mitad inferior
        cut = ch
        for y in range(ch - 1, ch // 2, -1):
            if nonwhite[y] <= 3 and nonwhite[y-1] <= 3 and nonwhite[y-2] <= 3 and (nonwhite[y-25:y-3] > 3).any() and (nonwhite[y+1:] > 3).any():
                cut = y; break
        cell = cell[:cut]
        # fondo blanco -> transparente (relleno desde los bordes para no borrar blancos interiores)
        mask = np.zeros((cell.shape[0] + 2, cell.shape[1] + 2), np.uint8)
        white = (cell.min(2) > 232).astype(np.uint8)
        ff = white.copy() * 255
        for (x, y) in [(0, 0), (cell.shape[1]-1, 0), (0, cell.shape[0]-1), (cell.shape[1]-1, cell.shape[0]-1)]:
            if ff[y, x] == 255: cv2.floodFill(ff, mask, (x, y), 128)
        bg = (ff == 128)
        # huecos interiores de fondo (entre piernas, palo...): zonas blancas puras y grandes
        pure = ((cell.min(2) > 240) & ~bg).astype(np.uint8)
        n, lab, st, _ = cv2.connectedComponentsWithStats(pure, 4)
        for k in range(1, n):
            if st[k, cv2.CC_STAT_AREA] > 250: bg |= (lab == k)
        alpha = np.where(bg, 0, 255).astype(np.uint8)
        alpha = cv2.GaussianBlur(alpha, (3, 3), 0)
        rgba = np.dstack([cell, alpha])
        ys, xs = np.where(alpha > 10)
        crops[names[r][c]] = (rgba, xs.min(), xs.max(), ys.min(), ys.max())
# alinear todos por los pies (bbox común en altura) para que no salten
hmax = max(v[4] - v[3] for v in crops.values()) + 20
wmax = 420
for n, (rgba, x0, x1, y0, y1) in crops.items():
    canvas = np.zeros((hmax, wmax, 4), np.uint8)
    # centrar horizontalmente por los pies (columna media de la parte baja)
    feet = rgba[y1-40:y1, :, 3] > 10
    fx = int(np.where(feet.any(0))[0].mean())
    ox = wmax // 2 - fx; oy = hmax - 10 - y1
    ys, xs = np.mgrid[0:rgba.shape[0], 0:rgba.shape[1]]
    tx, ty = xs + ox, ys + oy
    ok = (tx >= 0) & (tx < wmax) & (ty >= 0) & (ty < hmax)
    canvas[ty[ok], tx[ok]] = rgba[ys[ok], xs[ok]]
    cv2.imwrite(os.path.join(out, n + '.png'), canvas)
print('ok', hmax, wmax, list(crops))
