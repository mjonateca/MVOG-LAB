"""Cut-out puppet animation of the Vinelis illustration.
usage: python3 vinelis_puppet.py cut2.png src.jpg outdir [outfit]
Produces {pose}_m{0,1,2}_b{0,1}.png for poses rest, open, point, wave1, wave2.
"""
import sys, os, math
import numpy as np, cv2

cut = cv2.imread(sys.argv[1], cv2.IMREAD_UNCHANGED).astype(np.float32)
out = sys.argv[3]; os.makedirs(out, exist_ok=True)
H0, W0 = cut.shape[:2]

# --- arm geometry (source pixel coords) ---
ARMS = {
    'L': dict(pivot=(425, 630), line=[(132, 492), (180, 492), (232, 512), (320, 578), (425, 630)], rad=[44, 62, 26, 17, 18]),
    'R': dict(pivot=(528, 630), line=[(832, 497), (782, 490), (737, 512), (640, 578), (528, 630)], rad=[44, 62, 26, 17, 18]),
}
yy, xx = np.mgrid[0:H0, 0:W0].astype(np.float32)

def band_mask(line, rad):
    m = np.zeros((H0, W0), np.float32)
    for (x1, y1), (x2, y2), r1, r2 in zip(line[:-1], line[1:], rad[:-1], rad[1:]):
        dx, dy = x2 - x1, y2 - y1; L2 = dx*dx + dy*dy
        tt = np.clip(((xx - x1)*dx + (yy - y1)*dy) / L2, 0, 1)
        d = np.hypot(xx - (x1 + tt*dx), yy - (y1 + tt*dy))
        r = r1 + (r2 - r1) * tt
        m = np.maximum(m, (d < r).astype(np.float32))
    return m

base = cut.copy()
arm_layers = {}
ZONES = {'L': [(100, 415), (262, 415), (436, 588), (436, 668), (100, 668)],
         'R': [(860, 415), (700, 415), (517, 588), (517, 668), (860, 668)]}
B, G, Rr = cut[..., 0], cut[..., 1], cut[..., 2]
skin = ((Rr - B) > 38) & (Rr > 80) & (cut[..., 3] > 10)
for k, a in ARMS.items():
    zone = np.zeros((H0, W0), np.uint8); cv2.fillPoly(zone, [np.array(ZONES[k], np.int32)], 1)
    sk = (skin & (zone > 0)).astype(np.uint8)
    n, lab, stats, _ = cv2.connectedComponentsWithStats(sk, 8)
    keep = np.zeros_like(sk)
    for i in range(1, n):
        if stats[i, cv2.CC_STAT_AREA] > 400: keep[lab == i] = 1
    dil = cv2.dilate(keep, np.ones((7, 7), np.uint8))          # add the dark outline around the skin
    m = (dil > 0) & (zone > 0) & (cut[..., 3] > 10)
    m = cv2.GaussianBlur(m.astype(np.float32), (3, 3), 0)
    px, py = a['pivot']
    near = np.hypot(xx - px, yy - py) < 30
    layer = cut.copy(); layer[..., 3] *= m
    arm_layers[k] = layer
    base[..., 3] *= np.where(near, 1, 1 - m)
    halo = (zone > 0) & ~near & (cut[..., :3].min(2) > 125) & (np.hypot(xx - px, yy - py) > 30)
    base[..., 3] *= np.where(halo, 0, 1)

def rot_layer(layer, pivot, deg):
    M = cv2.getRotationMatrix2D(pivot, -deg, 1.0)     # deg>0 = clockwise on screen
    return cv2.warpAffine(layer, M, (W0, H0), flags=cv2.INTER_LINEAR, borderValue=(0, 0, 0, 0))

def over(dst, src):
    sa = src[..., 3:4] / 255.0; da = dst[..., 3:4] / 255.0
    oa = sa + da * (1 - sa)
    o = dst.copy()
    o[..., :3] = (src[..., :3] * sa + dst[..., :3] * da * (1 - sa)) / np.maximum(oa, 1e-6)
    o[..., 3] = oa[..., 0] * 255
    return o

# pose angles: (left arm deg, right arm deg); clockwise positive
POSES = {'open': (0, 0), 'rest': (-102, 102), 'mid': (-72, 72), 'talkA': (-100, 42), 'talkB': (-42, 100),
         'point': (-102, 14), 'wave1': (-102, -22), 'wave2': (-102, -36)}
OUTFIT = sys.argv[4] if len(sys.argv) > 4 else None
WRIST = {'L': (235, 515), 'R': (737, 512)}

# ---------- outfits ----------
def _flowers(canvas, poly, seed, cols, n=26, rmin=7, rmax=13):
    rng = np.random.default_rng(seed)
    pts = np.array(poly); x0, y0 = pts.min(0); x1, y1 = pts.max(0)
    for _ in range(n):
        cx, cy = rng.uniform(x0, x1), rng.uniform(y0, y1); r = rng.uniform(rmin, rmax); c = cols[rng.integers(len(cols))]
        for k in range(5):
            a = k * 2 * math.pi / 5 + rng.uniform(0, 1)
            cv2.circle(canvas, (int(cx + math.cos(a) * r * .6), int(cy + math.sin(a) * r * .6)), int(r * .5), c, -1, cv2.LINE_AA)
        cv2.circle(canvas, (int(cx), int(cy)), max(2, int(r * .22)), (60, 200, 250, 255), -1, cv2.LINE_AA)

def paint(dst, layer):
    return over(dst, layer)

OL_K = (30, 25, 50, 255)
KIMONO = dict(base=(58, 50, 200, 255), dark=(45, 35, 150, 255), flowers=[(205, 185, 255, 255), (250, 240, 255, 255), (170, 140, 245, 255)],
              collar=(245, 245, 250, 255), obi=(70, 185, 240, 255), obi_d=(40, 130, 200, 255), cord=(90, 80, 230, 255))

def kimono_body(img):
    K = KIMONO
    lay = np.zeros_like(img)
    body = [(415, 628), (444, 611), (478, 688), (512, 611), (541, 628), (556, 700), (563, 820), (571, 968), (385, 968), (392, 820), (400, 700)]
    P = np.array(body, np.int32)
    cv2.fillPoly(lay, [P], K['base'], cv2.LINE_AA)
    cv2.fillPoly(lay, [np.array([(520, 640), (541, 628), (556, 700), (563, 820), (571, 968), (540, 968), (535, 820)], np.int32)], K['dark'], cv2.LINE_AA)
    fl = np.zeros_like(img); _flowers(fl, body, 3, K['flowers'], n=34)
    mask = np.zeros(img.shape[:2], np.uint8); cv2.fillPoly(mask, [P], 255)
    fl[..., 3] *= (mask > 0)
    lay = over(lay, fl)
    # overlap line of the front panels
    cv2.line(lay, (478, 688), (505, 968), K['dark'], 5, cv2.LINE_AA)
    # collar (white under-collar + red edge)
    for a, b in (((446, 611), (481, 693)), ((510, 611), (475, 686))):
        cv2.line(lay, a, b, OL_K, 22, cv2.LINE_AA)
    for a, b in (((446, 611), (481, 693)), ((510, 611), (475, 686))):
        cv2.line(lay, a, b, K['collar'], 18, cv2.LINE_AA)
    cv2.line(lay, (452, 609), (484, 684), (200, 190, 230, 255), 3, cv2.LINE_AA)
    # obi
    obi = np.array([(399, 712), (557, 712), (560, 764), (396, 764)], np.int32)
    cv2.fillPoly(lay, [obi], K['obi'], cv2.LINE_AA)
    cv2.line(lay, (398, 728), (558, 728), K['obi_d'], 3, cv2.LINE_AA); cv2.line(lay, (397, 750), (559, 750), K['obi_d'], 3, cv2.LINE_AA)
    cv2.line(lay, (397, 739), (559, 739), K['cord'], 6, cv2.LINE_AA)
    cv2.circle(lay, (478, 739), 9, K['cord'], -1, cv2.LINE_AA)
    cv2.polylines(lay, [obi], True, OL_K, 3, cv2.LINE_AA)
    cv2.polylines(lay, [P], True, OL_K, 4, cv2.LINE_AA)
    return over(img, lay)

def rot_pt(p, pivot, deg):
    a = math.radians(deg); x, y = p[0] - pivot[0], p[1] - pivot[1]
    return (pivot[0] + x * math.cos(a) - y * math.sin(a), pivot[1] + x * math.sin(a) + y * math.cos(a))

def kimono_sleeve(img, side, deg):
    K = KIMONO
    S = ARMS[side]['pivot']; Wr = rot_pt(WRIST[side], S, deg)
    E = (S[0] + (Wr[0] - S[0]) * 0.62, S[1] + (Wr[1] - S[1]) * 0.62)
    dx, dy = E[0] - S[0], E[1] - S[1]; L = math.hypot(dx, dy); nx, ny = -dy / L, dx / L
    w = 26
    a1 = (S[0] + nx * w, S[1] + ny * w); a2 = (S[0] - nx * w, S[1] - ny * w)
    b1 = (E[0] + nx * w * 1.25, E[1] + ny * w * 1.25); b2 = (E[0] - nx * w * 1.25, E[1] - ny * w * 1.25)
    low_b = max((b1, b2), key=lambda p: p[1]); low_a = max((a1, a2), key=lambda p: p[1])
    hang = 70
    pts = [a1, b1, b2, a2] if True else []
    bag = [low_a, low_b, (low_b[0], low_b[1] + hang), ((low_a[0] + low_b[0]) / 2, max(low_a[1], low_b[1]) + hang + 6), (low_a[0], low_a[1] + hang * 0.5)]
    lay = np.zeros_like(img)
    for poly_ in (bag, pts):
        P = np.array(poly_, np.int32)
        cv2.fillPoly(lay, [P], K['base'], cv2.LINE_AA)
    fl = np.zeros_like(img); _flowers(fl, bag + pts, 7 if side == 'L' else 11, K['flowers'], n=10, rmin=6, rmax=10)
    mask = np.zeros(img.shape[:2], np.uint8)
    for poly_ in (bag, pts): cv2.fillPoly(mask, [np.array(poly_, np.int32)], 255)
    fl[..., 3] *= (mask > 0); lay = over(lay, fl)
    cnts, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
    cv2.drawContours(lay, cnts, -1, OL_K, 4, cv2.LINE_AA)
    # cuff
    cv2.line(lay, (int(b1[0]), int(b1[1])), (int(b2[0]), int(b2[1])), K['collar'], 7, cv2.LINE_AA)
    return over(img, lay)

# --- face overlays ---
src = cv2.imread(sys.argv[2]).astype(np.float32)
def sample(x, y, r=3): return src[y-r:y+r, x-r:x+r].reshape(-1, 3).mean(0)
SKIN_MOUTH = sample(478, 563)
SKIN_LID_L = SKIN_LID_R = sample(477, 452)
SS = 4  # supersample for antialiasing

def draw_face(img, mouth, blink):
    """img: float32 BGRA full-res. draws mouth/eyelids with antialiasing."""
    x0, y0, x1, y1 = 390, 420, 570, 590
    reg = img[y0:y1, x0:x1].copy()
    big = cv2.resize(reg, None, fx=SS, fy=SS, interpolation=cv2.INTER_CUBIC)
    P = lambda x, y: (int((x - x0) * SS), int((y - y0) * SS))
    def poly(pts, col):
        cv2.fillPoly(big, [np.array([P(*p) for p in pts], np.int32)], tuple(float(c) for c in col) + (255.0,), lineType=cv2.LINE_AA)
    def curve(p0, p1, p2, n=24):
        return [((1-t)**2*p0[0] + 2*(1-t)*t*p1[0] + t*t*p2[0], (1-t)**2*p0[1] + 2*(1-t)*t*p1[1] + t*t*p2[1]) for t in np.linspace(0, 1, n)]
    if mouth > 0:
        drop = 30 if mouth == 1 else 44
        # cover original mouth with skin
        cv2.ellipse(big, P(478, 532), (int(50*SS), int(25*SS)), 0, 0, 360, tuple(float(c) for c in SKIN_MOUTH) + (255.0,), -1, cv2.LINE_AA)
        top = curve((434, 515), (478, 526), (522, 515))
        bot = curve((522, 515), (478, 515 + drop * 1.6), (434, 515))
        poly([(x, y + 2) for x, y in curve((432, 512), (478, 530), (524, 512))] + [(x, y + 4) for x, y in curve((524, 512), (478, 518 + drop * 1.7), (432, 512))], (40, 30, 70))  # outline
        poly(top + bot, (45, 25, 95))                                   # mouth cavity (BGR)
        poly(top + [(x, y + 11) for x, y in reversed(top)], (250, 250, 252))  # upper teeth
        poly(curve((452, 515 + drop * 1.05), (478, 515 + drop * 0.55), (504, 515 + drop * 1.05)) + curve((504, 515 + drop * 1.05), (478, 515 + drop * 1.35), (452, 515 + drop * 1.05)), (120, 110, 235))  # tongue
    if blink:
        for (cx, cy, col) in ((431, 470, SKIN_LID_L), (522, 468, SKIN_LID_R)):
            cv2.ellipse(big, P(cx, cy + 1), (int(23*SS), int(19*SS)), 0, 0, 360, tuple(float(c) for c in col) + (255.0,), -1, cv2.LINE_AA)
            pts = np.array([P(x, y) for x, y in curve((cx - 24, cy + 2), (cx, cy + 14), (cx + 24, cy + 2))], np.int32)
            cv2.polylines(big, [pts], False, (25, 20, 30, 255), int(4*SS), cv2.LINE_AA)
            cv2.line(big, P(cx - 24, cy + 2), P(cx - 31, cy - 3), (25, 20, 30, 255), int(3*SS), cv2.LINE_AA)
    img[y0:y1, x0:x1] = cv2.resize(big, (x1 - x0, y1 - y0), interpolation=cv2.INTER_AREA)
    return img


# ---------- París: boina, marinera de rayas, pañuelo y falda ----------
PARIS = dict(navy=(70, 40, 30, 255), white=(245, 245, 248, 255), red=(40, 40, 200, 255), red_d=(30, 30, 150, 255))

def paris_body(img):
    K = PARIS
    lay = np.zeros_like(img)
    skirt = np.array([(402, 752), (556, 752), (592, 958), (362, 958)], np.int32)
    cv2.fillPoly(lay, [skirt], K['navy'], cv2.LINE_AA)
    for i in range(1, 6):
        x = 402 + i * 26; cv2.line(lay, (x, 756), (x - 36 + i * 12, 955), (50, 28, 20, 255), 2, cv2.LINE_AA)
    shirt = np.array([(415, 628), (450, 612), (478, 640), (506, 612), (541, 628), (556, 700), (560, 760), (398, 760), (400, 700)], np.int32)
    mask = np.zeros(img.shape[:2], np.uint8); cv2.fillPoly(mask, [shirt], 255)
    st = np.zeros_like(img); st[..., :] = K['white']
    for y in range(600, 780, 22): cv2.rectangle(st, (380, y), (580, y + 10), K['navy'], -1)
    st[..., 3] = mask.astype(np.float32)
    lay = over(lay, st)
    cv2.polylines(lay, [shirt], True, (30, 25, 50, 255), 3, cv2.LINE_AA)
    cv2.polylines(lay, [skirt], True, (30, 25, 50, 255), 3, cv2.LINE_AA)
    # pañuelo rojo
    cv2.ellipse(lay, (478, 622), (34, 14), 0, 0, 360, K['red'], -1, cv2.LINE_AA)
    cv2.fillPoly(lay, [np.array([(470, 628), (500, 628), (512, 676), (486, 668)], np.int32)], K['red_d'], cv2.LINE_AA)
    return over(img, lay)

def paris_sleeve(img, side, deg):
    K = PARIS
    S_ = ARMS[side]['pivot']; Wr = rot_pt(WRIST[side], S_, deg)
    E = (S_[0] + (Wr[0] - S_[0]) * 0.33, S_[1] + (Wr[1] - S_[1]) * 0.33)
    dx, dy = E[0] - S_[0], E[1] - S_[1]; L_ = math.hypot(dx, dy); nx, ny = -dy / L_, dx / L_
    w = 22
    pts = np.array([(S_[0] + nx * w, S_[1] + ny * w), (E[0] + nx * w * .9, E[1] + ny * w * .9), (E[0] - nx * w * .9, E[1] - ny * w * .9), (S_[0] - nx * w, S_[1] - ny * w)], np.int32)
    mask = np.zeros(img.shape[:2], np.uint8); cv2.fillPoly(mask, [pts], 255)
    st = np.zeros_like(img); st[..., :] = K['white']
    ux, uy = dx / L_, dy / L_
    for k in range(0, int(L_) + 30, 22):
        c = (S_[0] + ux * (k - 10), S_[1] + uy * (k - 10))
        a = (c[0] + nx * 40, c[1] + ny * 40); b = (c[0] - nx * 40, c[1] - ny * 40)
        cv2.line(st, (int(a[0]), int(a[1])), (int(b[0]), int(b[1])), K['navy'], 10, cv2.LINE_AA)
    st[..., 3] = mask.astype(np.float32)
    lay = over(np.zeros_like(img), st)
    cv2.polylines(lay, [pts], True, (30, 25, 50, 255), 3, cv2.LINE_AA)
    return over(img, lay)

def paris_beret(img):
    lay = np.zeros_like(img)
    cv2.ellipse(lay, (505, 345), (138, 52), -8, 0, 360, PARIS['red'], -1, cv2.LINE_AA)
    cv2.ellipse(lay, (505, 358), (130, 34), -8, 0, 180, PARIS['red_d'], -1, cv2.LINE_AA)
    cv2.ellipse(lay, (505, 345), (138, 52), -8, 0, 360, (30, 25, 50, 255), 3, cv2.LINE_AA)
    cv2.line(lay, (503, 296), (509, 276), (30, 25, 50, 255), 6, cv2.LINE_AA)
    return over(img, lay)


# ---------- Roma: túnica con fajín rojo, cinturón dorado y corona de laurel ----------
def roma_body(img):
    b, g, r, a = img[..., 0], img[..., 1], img[..., 2], img[..., 3]
    zone = (yy > 600) & (yy < 980) & (xx > 360) & (xx < 600)
    pink = zone & (r > 170) & (r - g > 35) & (b > g - 10) & (a > 0)
    lum = (0.3 * r + 0.59 * g + 0.11 * b) / 255.0
    img[..., 2] = np.where(pink, 70 + 140 * lum, r)
    img[..., 1] = np.where(pink, 20 + 30 * lum, g)
    img[..., 0] = np.where(pink, 25 + 35 * lum, b)
    lay = np.zeros_like(img)
    cv2.line(lay, (404, 716), (552, 716), (40, 160, 225, 255), 9, cv2.LINE_AA)
    cv2.circle(lay, (478, 716), 11, (30, 140, 210, 255), -1, cv2.LINE_AA)
    for x in (430, 520): cv2.circle(lay, (x, 716), 5, (90, 200, 245, 255), -1, cv2.LINE_AA)
    return over(img, lay)

def roma_wreath(img):
    lay = np.zeros_like(img)
    cx, cy, rx, ry = 478, 420, 112, 70
    for side in (-1, 1):
        for k in range(9):
            ang = math.radians(200 + k * 15) if side < 0 else math.radians(340 - k * 15)
            x = cx + rx * math.cos(ang); y = cy + ry * math.sin(ang)
            tilt = math.degrees(ang) + (60 if side < 0 else -60)
            cv2.ellipse(lay, (int(x), int(y)), (24, 10), tilt, 0, 360, (50, 180, 235, 255), -1, cv2.LINE_AA)
            cv2.ellipse(lay, (int(x - 3), int(y - 2)), (12, 4), tilt, 0, 360, (140, 230, 255, 255), -1, cv2.LINE_AA)
            cv2.ellipse(lay, (int(x), int(y)), (24, 10), tilt, 0, 360, (20, 100, 160, 255), 2, cv2.LINE_AA)
    pts = [(int(cx + rx * math.cos(math.radians(a_))), int(cy + ry * math.sin(math.radians(a_)))) for a_ in range(195, 346, 5)]
    cv2.polylines(lay, [np.array(pts, np.int32)], False, (30, 130, 200, 255), 6, cv2.LINE_AA)
    return over(img, lay)


# ---------- Madrid: chulapa (pañuelo blanco, clavel rojo, vestido de lunares) ----------
def madrid_body(img):
    lay = np.zeros_like(img)
    dress = np.array([(415, 628), (450, 612), (478, 640), (506, 612), (541, 628), (556, 700), (552, 760), (598, 958), (358, 958), (404, 760), (400, 700)], np.int32)
    mask = np.zeros(img.shape[:2], np.uint8); cv2.fillPoly(mask, [dress], 255)
    st = np.zeros_like(img); st[..., :] = (40, 30, 30, 255)
    for yy_ in range(600, 980, 26):
        for xx_ in range(350, 610, 26):
            cv2.circle(st, (xx_ + (13 if (yy_ // 26) % 2 else 0), yy_), 5, (245, 245, 248, 255), -1, cv2.LINE_AA)
    st[..., 3] = mask.astype(np.float32)
    lay = over(lay, st)
    cv2.polylines(lay, [dress], True, (20, 15, 15, 255), 3, cv2.LINE_AA)
    cv2.line(lay, (404, 760), (552, 760), (40, 40, 200, 255), 8, cv2.LINE_AA)
    return over(img, lay)

# ---------- zapatos (pedido de Vinelis 21-nov: que no salga descalza) ----------
def shoes(img, col=(46, 16, 200, 255), dark=(30, 10, 120, 255)):
    lay = np.zeros_like(img)
    L = np.array([(410, 1013), (409, 998), (418, 986), (438, 976), (462, 973), (477, 981), (481, 998), (480, 1013)], np.int32)
    R = np.array([(509, 1013), (510, 994), (517, 978), (540, 970), (556, 978), (566, 994), (569, 1013)], np.int32)
    for poly in (L, R):
        cv2.fillPoly(lay, [poly], col, cv2.LINE_AA)
        cv2.polylines(lay, [poly], True, (20, 10, 40, 255), 3, cv2.LINE_AA)
        x0, x1 = poly[:, 0].min(), poly[:, 0].max()
        cv2.rectangle(lay, (int(x0) - 1, 1009), (int(x1) + 1, 1016), dark, -1, cv2.LINE_AA)
    cv2.line(lay, (440, 980), (470, 984), (20, 10, 40, 255), 6, cv2.LINE_AA)
    cv2.line(lay, (522, 978), (552, 976), (20, 10, 40, 255), 6, cv2.LINE_AA)
    for c in ((456, 982), (538, 977)):
        cv2.circle(lay, c, 5, (210, 210, 220, 255), -1, cv2.LINE_AA)
    cv2.ellipse(lay, (428, 992), (8, 4), -20, 0, 360, (255, 255, 255, 110), -1, cv2.LINE_AA)
    cv2.ellipse(lay, (552, 988), (8, 4), 20, 0, 360, (255, 255, 255, 110), -1, cv2.LINE_AA)
    return over(img, lay)

def flower(lay, cx, cy, r, col=(40, 40, 210, 255), core=(30, 30, 170, 255), n=10):
    for k in range(n):
        a = k * (360 / n) * math.pi / 180
        cv2.circle(lay, (int(cx + math.cos(a) * r * .6), int(cy + math.sin(a) * r * .6)), int(r * .55), col, -1, cv2.LINE_AA)
    cv2.circle(lay, (cx, cy), int(r * .5), core, -1, cv2.LINE_AA)

def madrid_head(img):
    lay = np.zeros_like(img)
    for (x, y, r) in ((372, 392, 30), (398, 360, 24)):
        flower(lay, x, y, r)
    cv2.ellipse(lay, (360, 420), (22, 8), -30, 0, 360, (60, 140, 60, 255), -1, cv2.LINE_AA)
    return over(img, lay)

def madrid_shawl(img):
    lay = np.zeros_like(img)
    shawl = np.array([(400, 620), (556, 620), (548, 690), (478, 740), (408, 690)], np.int32)
    cv2.fillPoly(lay, [shawl], (225, 240, 248, 255), cv2.LINE_AA)
    for (x, y) in ((440, 650), (515, 650), (478, 700)):
        flower(lay, x, y, 13)
        cv2.ellipse(lay, (x + 14, y + 10), (10, 4), 30, 0, 360, (60, 140, 60, 255), -1, cv2.LINE_AA)
    cv2.polylines(lay, [shawl], True, (90, 120, 150, 255), 3, cv2.LINE_AA)
    for k in range(18):
        t_ = k / 17
        if t_ < .5: x0, y0 = 408 + (478 - 408) * t_ * 2, 690 + (740 - 690) * t_ * 2
        else: x0, y0 = 478 + (548 - 478) * (t_ - .5) * 2, 740 - (740 - 690) * (t_ - .5) * 2
        cv2.line(lay, (int(x0), int(y0)), (int(x0), int(y0) + 22), (160, 200, 230, 255), 3, cv2.LINE_AA)
    return over(img, lay)

# ---------- Santo Domingo: traje típico dominicano (blusa blanca, falda de volantes azul-blanco-rojo, flor de bayahíbe) ----------
SD = dict(blue=(98, 45, 0, 255), red=(38, 17, 206, 255), white=(246, 246, 248, 255))
def sd_body(img):
    lay = np.zeros_like(img)
    blouse = np.array([(415, 628), (450, 612), (478, 640), (506, 612), (541, 628), (556, 700), (552, 764), (404, 764), (400, 700)], np.int32)
    cv2.fillPoly(lay, [blouse], SD['white'], cv2.LINE_AA)
    cv2.polylines(lay, [np.array([(415, 628), (450, 612), (478, 640), (506, 612), (541, 628)], np.int32)], False, SD['blue'], 7, cv2.LINE_AA)
    cv2.polylines(lay, [blouse], True, (180, 180, 190, 255), 2, cv2.LINE_AA)
    bands = [(760, 828, SD['blue']), (822, 890, SD['white']), (884, 960, SD['red'])]
    for (y0, y1, col) in bands:
        f0 = (y0 - 760) / 200.0; f1 = (y1 - 760) / 200.0
        xl0, xr0 = 404 - 46 * f0, 552 + 46 * f0; xl1, xr1 = 404 - 46 * f1, 552 + 46 * f1
        poly = np.array([(xl0, y0), (xr0, y0), (xr1, y1), (xl1, y1)], np.int32)
        cv2.fillPoly(lay, [poly], col, cv2.LINE_AA)
        n = 8
        for k in range(n):
            cx_ = int(xl1 + (xr1 - xl1) * (k + .5) / n)
            cv2.ellipse(lay, (cx_, int(y1)), (int((xr1 - xl1) / n / 2) + 1, 8), 0, 0, 180, col, -1, cv2.LINE_AA)
            cv2.ellipse(lay, (cx_, int(y1)), (int((xr1 - xl1) / n / 2) + 1, 8), 0, 0, 180, (60, 60, 60, 200), 1, cv2.LINE_AA)
    cv2.line(lay, (404, 764), (552, 764), SD['red'], 7, cv2.LINE_AA)
    return over(img, lay)

def sd_head(img):
    lay = np.zeros_like(img)
    cv2.ellipse(lay, (352, 418), (24, 9), -35, 0, 360, (60, 140, 60, 255), -1, cv2.LINE_AA)
    flower(lay, 378, 388, 32, (180, 105, 240, 255), (120, 60, 200, 255), 6)
    cv2.circle(lay, (378, 388), 7, (60, 210, 250, 255), -1, cv2.LINE_AA)
    flower(lay, 404, 356, 20, (200, 140, 250, 255), (150, 90, 230, 255), 6)
    cv2.circle(lay, (404, 356), 5, (60, 210, 250, 255), -1, cv2.LINE_AA)
    return over(img, lay)

# ---------- Berlín: abrigo azul con botones, bufanda roja y gorro de lana amarillo con pompón ----------
def berlin_body(img, col=(120, 70, 30, 255), dark=(80, 45, 20, 255), btn=(40, 190, 235, 255)):
    lay = np.zeros_like(img)
    coat = np.array([(415, 626), (450, 610), (478, 640), (506, 610), (541, 626), (558, 700), (556, 760), (594, 962), (362, 962), (400, 760), (398, 700)], np.int32)
    cv2.fillPoly(lay, [coat], col, cv2.LINE_AA)
    cv2.polylines(lay, [coat], True, dark, 3, cv2.LINE_AA)
    cv2.line(lay, (478, 650), (478, 958), dark, 3, cv2.LINE_AA)
    for y in (690, 750, 810, 870):
        cv2.circle(lay, (494, y), 7, btn, -1, cv2.LINE_AA)
    cv2.line(lay, (402, 770), (554, 770), dark, 10, cv2.LINE_AA)
    for x0 in (420, 520):
        cv2.rectangle(lay, (x0, 800), (x0 + 36, 812), dark, -1, cv2.LINE_AA)
    return over(img, lay)

def berlin_scarf(img):
    lay = np.zeros_like(img)
    cv2.ellipse(lay, (478, 628), (70, 26), 0, 0, 360, (40, 40, 200, 255), -1, cv2.LINE_AA)
    cv2.ellipse(lay, (478, 628), (70, 26), 0, 0, 360, (25, 25, 150, 255), 3, cv2.LINE_AA)
    end = np.array([(500, 640), (530, 640), (536, 730), (506, 732)], np.int32)
    cv2.fillPoly(lay, [end], (40, 40, 200, 255), cv2.LINE_AA)
    for k in range(5): cv2.line(lay, (508 + k * 6, 732), (508 + k * 6, 748), (40, 40, 200, 255), 3, cv2.LINE_AA)
    for y in (660, 690, 715): cv2.line(lay, (502, y), (533, y), (230, 230, 240, 255), 4, cv2.LINE_AA)
    return over(img, lay)

def berlin_hat(img, main=(40, 190, 235, 255), band=(30, 150, 205, 255), rib=(20, 120, 180, 255), leaf=False):
    lay = np.zeros_like(img)
    cx, cy = 482, 352
    cv2.ellipse(lay, (cx, cy + 28), (160, 84), 0, 180, 360, main, -1, cv2.LINE_AA)
    cv2.rectangle(lay, (cx - 152, cy + 22), (cx + 152, cy + 62), band, -1, cv2.LINE_AA)
    for k in range(-6, 7): cv2.line(lay, (cx + k * 22, cy + 24), (cx + k * 22, cy + 60), rib, 3, cv2.LINE_AA)
    for k in range(-3, 4): cv2.line(lay, (cx + k * 36, cy - 30), (cx + k * 30, cy + 20), band, 3, cv2.LINE_AA)
    if leaf:
        pts = [(0,-30),(6,-16),(16,-20),(12,-4),(24,-8),(20,2),(28,8),(8,10),(10,22),(2,16),(0,30),(-2,16),(-10,22),(-8,10),(-28,8),(-20,2),(-24,-8),(-12,-4),(-16,-20),(-6,-16)]
        cv2.fillPoly(lay, [np.array([(cx + x * 1.3, cy - 8 + y * 1.3) for x, y in pts], np.int32)], (245, 245, 250, 255), cv2.LINE_AA)
    cv2.circle(lay, (cx, cy - 46), 30, (230, 235, 245, 255), -1, cv2.LINE_AA)
    cv2.circle(lay, (cx, cy - 46), 30, (180, 185, 200, 255), 2, cv2.LINE_AA)
    return over(img, lay)

# ---------- São Paulo: vestido amarillo con ribetes verdes, cinturón azul y flor de ipê en el pelo ----------
def sp_body(img):
    lay = np.zeros_like(img)
    dress = np.array([(415, 628), (450, 612), (478, 640), (506, 612), (541, 628), (556, 700), (552, 760), (596, 960), (360, 960), (404, 760), (400, 700)], np.int32)
    cv2.fillPoly(lay, [dress], (40, 205, 250, 255), cv2.LINE_AA)
    cv2.polylines(lay, [np.array([(415, 628), (450, 612), (478, 640), (506, 612), (541, 628)], np.int32)], False, (60, 150, 30, 255), 9, cv2.LINE_AA)
    cv2.line(lay, (366, 938), (590, 938), (60, 150, 30, 255), 14, cv2.LINE_AA)
    cv2.line(lay, (402, 764), (554, 764), (140, 60, 20, 255), 14, cv2.LINE_AA)
    for x in range(414, 550, 22): cv2.circle(lay, (x, 764), 3, (250, 250, 250, 255), -1, cv2.LINE_AA)
    cv2.polylines(lay, [dress], True, (20, 150, 200, 255), 3, cv2.LINE_AA)
    return over(img, lay)

def sp_head(img):
    lay = np.zeros_like(img)
    cv2.ellipse(lay, (352, 418), (24, 9), -35, 0, 360, (60, 140, 60, 255), -1, cv2.LINE_AA)
    flower(lay, 378, 388, 30, (40, 215, 255, 255), (20, 170, 230, 255), 5)
    cv2.circle(lay, (378, 388), 8, (30, 110, 180, 255), -1, cv2.LINE_AA)
    flower(lay, 404, 358, 18, (60, 225, 255, 255), (20, 170, 230, 255), 5)
    return over(img, lay)

# crop window (union of poses) and output scale
CX0, CY0, CX1, CY1 = 60, 230, 900, 1030
SCALE = 0.72
for pose, (la, ra) in POSES.items():
    body = base.copy()
    if OUTFIT == 'kimono':
        gap = (yy > 966) & (yy < 1000) & (xx > 440) & (xx < 530) & (body[..., :3].min(2) > 170)
        body[..., 3] *= np.where(gap, 0, 1)
        body = kimono_body(body)
    if OUTFIT == 'roma':
        body = roma_body(body)
    if OUTFIT == 'ottawa':
        gap = (yy > 930) & (yy < 990) & (xx > 360) & (xx < 600) & (((body[..., 2] > body[..., 0] + 25) & (body[..., 1] > 120)) | (body[..., :3].min(2) > 170))
        body[..., 3] *= np.where(gap, 0, 1)
        body = berlin_body(body, (40, 40, 190, 255), (25, 25, 130, 255), (240, 240, 245, 255))
    if OUTFIT == 'saopaulo':
        gap = (yy > 930) & (yy < 990) & (xx > 360) & (xx < 600) & (((body[..., 2] > body[..., 0] + 25) & (body[..., 1] > 120)) | (body[..., :3].min(2) > 170))
        body[..., 3] *= np.where(gap, 0, 1)
        body = sp_body(body)
    if OUTFIT == 'berlin':
        gap = (yy > 930) & (yy < 990) & (xx > 360) & (xx < 600) & (((body[..., 2] > body[..., 0] + 25) & (body[..., 1] > 120)) | (body[..., :3].min(2) > 170))
        body[..., 3] *= np.where(gap, 0, 1)
        body = berlin_body(body)
        body = shoes(body, (40, 70, 120, 255), (25, 40, 70, 255))
    if OUTFIT == 'santodomingo':
        gap = (yy > 930) & (yy < 990) & (xx > 360) & (xx < 600) & (((body[..., 2] > body[..., 0] + 25) & (body[..., 1] > 120)) | (body[..., :3].min(2) > 170))
        body[..., 3] *= np.where(gap, 0, 1)
        body = sd_body(body)
    if OUTFIT == 'madrid':
        gap = (yy > 930) & (yy < 990) & (xx > 360) & (xx < 600) & (((body[..., 2] > body[..., 0] + 25) & (body[..., 1] > 120)) | (body[..., :3].min(2) > 170))
        body[..., 3] *= np.where(gap, 0, 1)
        body = madrid_body(body)
        body = shoes(body)
    if OUTFIT == 'paris':
        gap = (yy > 930) & (yy < 990) & (xx > 360) & (xx < 600) & (((body[..., 2] > body[..., 0] + 25) & (body[..., 1] > 120)) | (body[..., :3].min(2) > 170))
        body[..., 3] *= np.where(gap, 0, 1)
        body = paris_body(body)
    body = over(body, rot_layer(arm_layers['L'], ARMS['L']['pivot'], la))
    body = over(body, rot_layer(arm_layers['R'], ARMS['R']['pivot'], ra))
    if OUTFIT == 'kimono':
        body = kimono_sleeve(body, 'L', la); body = kimono_sleeve(body, 'R', ra)
    if OUTFIT == 'roma':
        body = roma_wreath(body)
    if OUTFIT == 'madrid':
        body = madrid_head(body); body = madrid_shawl(body)
    if OUTFIT == 'santodomingo':
        body = sd_head(body)
    if OUTFIT == 'berlin':
        body = berlin_scarf(body); body = berlin_hat(body)
    if OUTFIT == 'saopaulo':
        body = sp_head(body)
    if OUTFIT == 'ottawa':
        body = berlin_hat(body, (40, 40, 200, 255), (240, 240, 245, 255), (200, 200, 210, 255), leaf=True)
    if OUTFIT == 'paris':
        body = paris_sleeve(body, 'L', la); body = paris_sleeve(body, 'R', ra); body = paris_beret(body)
    for m in (0, 1, 2):
        for b in (0, 1):
            img = draw_face(body.copy(), m, b)
            crop = img[CY0:CY1, CX0:CX1]
            crop = cv2.resize(crop, None, fx=SCALE, fy=SCALE, interpolation=cv2.INTER_AREA)
            rgba = np.clip(crop, 0, 255).astype(np.uint8)
            rgba = cv2.cvtColor(rgba, cv2.COLOR_BGRA2RGBA)
            cv2.imwrite(os.path.join(out, f'{pose}_m{m}_b{b}.png'), cv2.cvtColor(rgba, cv2.COLOR_RGBA2BGRA))
print('ok', (CX1 - CX0) * SCALE, (CY1 - CY0) * SCALE)
