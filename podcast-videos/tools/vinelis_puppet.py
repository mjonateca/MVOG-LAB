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

# crop window (union of poses) and output scale
CX0, CY0, CX1, CY1 = 60, 230, 900, 1030
SCALE = 0.72
for pose, (la, ra) in POSES.items():
    body = base.copy()
    if OUTFIT == 'kimono':
        gap = (yy > 966) & (yy < 1000) & (xx > 440) & (xx < 530) & (body[..., :3].min(2) > 170)
        body[..., 3] *= np.where(gap, 0, 1)
        body = kimono_body(body)
    body = over(body, rot_layer(arm_layers['L'], ARMS['L']['pivot'], la))
    body = over(body, rot_layer(arm_layers['R'], ARMS['R']['pivot'], ra))
    if OUTFIT == 'kimono':
        body = kimono_sleeve(body, 'L', la); body = kimono_sleeve(body, 'R', ra)
    for m in (0, 1, 2):
        for b in (0, 1):
            img = draw_face(body.copy(), m, b)
            crop = img[CY0:CY1, CX0:CX1]
            crop = cv2.resize(crop, None, fx=SCALE, fy=SCALE, interpolation=cv2.INTER_AREA)
            rgba = np.clip(crop, 0, 255).astype(np.uint8)
            rgba = cv2.cvtColor(rgba, cv2.COLOR_BGRA2RGBA)
            cv2.imwrite(os.path.join(out, f'{pose}_m{m}_b{b}.png'), cv2.cvtColor(rgba, cv2.COLOR_RGBA2BGRA))
print('ok', (CX1 - CX0) * SCALE, (CY1 - CY0) * SCALE)
