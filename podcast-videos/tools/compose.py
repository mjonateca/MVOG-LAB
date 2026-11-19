"""Compose the cartoon podcast video.
usage: python3 compose.py config.json [--preview START DUR | --segment OUT.mp4 START DUR]
config: {audio, transcript, workdir, out, chip, schedule:[[t, scene],...]}
"""
import sys, json, os, subprocess, math, re
import numpy as np, cv2
from PIL import Image, ImageDraw, ImageFont

FPS = 30; LOOPN = 240; W, H = 1920, 1080
TOOLS = os.path.dirname(os.path.abspath(__file__))
cfg = json.load(open(sys.argv[1]))
wd = cfg['workdir']
start, dur = 0.0, None
for _flag in ('--preview', '--segment'):
  if _flag in sys.argv:
    i = sys.argv.index(_flag); i = i + 1 if _flag == '--segment' else i; start = float(sys.argv[i+1]); dur = float(sys.argv[i+2])

# ---------- audio envelope ----------
pcm = subprocess.run(['ffmpeg', '-v', 'error', '-i', cfg['audio'], '-ac', '1', '-ar', '24000', '-f', 's16le', '-'], capture_output=True).stdout
a = np.frombuffer(pcm, np.int16).astype(np.float32) / 32768
total = len(a) / 24000
spf = 24000 // FPS
nfr = len(a) // spf
rms = np.sqrt((a[:nfr*spf].reshape(nfr, spf) ** 2).mean(1))
ref = np.percentile(rms[rms > 1e-4], 90)
lvl = rms / (ref + 1e-9)

# speech mask from transcript words (mouth only moves while words are spoken)
tr = json.load(open(cfg['transcript']))
words = [w for s in tr for w in s['words']]
speak = np.zeros(nfr, bool)
for w in words:
    speak[int(w['s']*FPS):int(w['e']*FPS)+1] = True
mouth = np.where(~speak[:nfr], 0, np.where(lvl > 0.55, 2, np.where(lvl > 0.2, 1, 0)))
# otros hablantes (invitados): Vinelis escucha con la boca cerrada y se muestra el nombre de quien habla
OTHERS = cfg.get('others', [])   # [[t0, t1, 'Nombre'], ...]
gmouth = np.zeros_like(mouth)
for o0, o1, _n in OTHERS:
    sl = slice(int(o0*FPS), int(o1*FPS)+1)
    gmouth[sl] = mouth[sl]
    mouth[sl] = 0
def other_at(t):
    for o0, o1, n in OTHERS:
        if o0 - 0.2 <= t <= o1 + 0.3: return n, min(1, (t - o0 + 0.2) / 0.4, (o1 + 0.3 - t) / 0.4)
    return None, 0

# ---------- subtitles ----------
def build_cues(words, maxc=58):
    cues, cur = [], []
    def flush():
        if cur:
            cues.append((cur[0]['s'], cur[-1]['e'], ''.join(x['w'] for x in cur).strip()))
            cur.clear()
    for w in words:
        txt = ''.join(x['w'] for x in cur) + w['w']
        if cur and (len(txt.strip()) > maxc or w['s'] - cur[-1]['e'] > 0.7):
            flush()
        cur.append(w)
        if re.search(r'[.!?…]$', w['w'].strip()) and len(''.join(x['w'] for x in cur)) > 18:
            flush()
    flush()
    # keep on screen until next cue (max +0.8s)
    out = []
    for i, (s, e, t) in enumerate(cues):
        nxt = cues[i+1][0] if i+1 < len(cues) else e + 1
        out.append((s, min(max(e + 0.3, s + 1.0), nxt, e + 0.8), t))
    return out
cues = build_cues(words)
SUBS = cfg.get('subtitles', False)  # por defecto SIN subtítulos incrustados (se suben aparte en .srt)
font = ImageFont.truetype(os.path.join(TOOLS, 'fredoka-600.ttf'), 50)
font_chip = ImageFont.truetype(os.path.join(TOOLS, 'fredoka-600.ttf'), 34)
NAVY = (43, 58, 103)

def wrap(text, maxw):
    ws = text.split()
    if font.getlength(text) <= maxw: return [text]
    best = None
    for i in range(1, len(ws)):
        a, b = ' '.join(ws[:i]), ' '.join(ws[i:])
        m = max(font.getlength(a), font.getlength(b))
        if best is None or m < best[0]: best = (m, [a, b])
    return best[1]

def render_sub(text):
    lines = wrap(text, 1240)
    lh = 64; tw = int(max(font.getlength(l) for l in lines)); bw, bh = tw + 80, lh*len(lines) + 40
    im = Image.new('RGBA', (bw + 12, bh + 12), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    d.rounded_rectangle((6, 10, bw + 6, bh + 10), 30, fill=(0, 0, 0, 50))
    d.rounded_rectangle((0, 0, bw, bh), 30, fill=(255, 255, 255, 240), outline=NAVY, width=5)
    for i, l in enumerate(lines):
        d.text((bw/2, 20 + i*lh + lh/2), l, font=font, fill=NAVY, anchor='mm')
    return np.array(im)

def render_chip(text):
    tw = int(font_chip.getlength(text)); im = Image.new('RGBA', (tw + 60, 70), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    d.rounded_rectangle((0, 0, tw + 56, 64), 32, fill=(255, 255, 255, 235), outline=NAVY, width=4)
    d.text((28 + tw/2, 32), text, font=font_chip, fill=NAVY, anchor='mm')
    return np.array(im)
chip = render_chip(cfg['chip'])
def render_speaker(name):
    f2 = ImageFont.truetype(os.path.join(TOOLS, 'fredoka-700.ttf'), 46)
    tw = int(f2.getlength(name)); im = Image.new('RGBA', (tw + 130, 84), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    d.rounded_rectangle((2, 2, tw + 126, 80), radius=40, fill=(255, 255, 255, 240), outline=NAVY, width=4)
    d.rounded_rectangle((30, 16, 52, 50), radius=11, fill=(220, 50, 50, 255))
    d.arc((22, 28, 60, 62), 0, 180, fill=NAVY, width=4); d.line((41, 62, 41, 70), fill=NAVY, width=4); d.line((31, 70, 51, 70), fill=NAVY, width=4)
    d.text((80 + tw/2, 42), name, font=f2, fill=NAVY, anchor='mm')
    return np.array(im)
spk_cache = {}
GUEST = cfg.get('guest')   # {"dir": "guest", "scale": 1.35, "wave_at": [t0,...]}
gsprites = {}
GUEST_WAVE = {}
if GUEST:
    for k in ('m0', 'm1', 'm2', 'listen', 'blink', 'wave'):
        im = Image.open(os.path.join(wd, GUEST['dir'], k + '.png')).convert('RGBA')
        gsc = GUEST.get('scale', 1.35)
        gsprites[k] = np.array(im.resize((int(im.width * gsc), int(im.height * gsc)), Image.LANCZOS))
    for w0 in GUEST.get('wave_at', []): GUEST_WAVE[round(w0, 1)] = True

def blend(dst, src, x, y):
    h, w = src.shape[:2]
    x0, y0 = max(x, 0), max(y, 0); x1, y1 = min(x + w, W), min(y + h, H)
    if x1 <= x0 or y1 <= y0: return
    s = src[y0-y:y1-y, x0-x:x1-x]
    al = s[..., 3:4].astype(np.uint16)
    reg = dst[y0:y1, x0:x1].astype(np.uint16)
    dst[y0:y1, x0:x1] = ((s[..., :3].astype(np.uint16) * al + reg * (255 - al)) // 255).astype(np.uint8)

# ---------- scenes ----------
sched = sorted(cfg['schedule'], key=lambda e: e[0])
def scene_at(t):
    cur = sched[0]
    for s in sched:
        if s[0] <= t: cur = s
    return cur
_cache = {}
def loop_frame(scene, i):
    key = (scene, i % LOOPN)
    if key not in _cache:
        if len(_cache) > 150: _cache.clear()   # ~0,9 GB máx. (600 provocaba falta de memoria con varios montajes)
        _cache[key] = cv2.cvtColor(cv2.imread(os.path.join(wd, 'loops', scene, f'{i % LOOPN}.jpg')), cv2.COLOR_BGR2RGB)
    return _cache[key]
POSES = ['rest', 'open', 'mid', 'talkA', 'talkB', 'point', 'wave1', 'wave2']
CS = 1.0
chars = {}
for po in POSES:
    for m in (0, 1, 2):
        for b in (0, 1):
            im = Image.open(os.path.join(wd, 'char', f'{po}_m{m}_b{b}.png')).convert('RGBA')
            chars[(po, m, b)] = np.array(im.resize((int(im.width*CS), int(im.height*CS)), Image.LANCZOS))
# pose per transcript segment
seg_pose = []
CYCLE = ['talkA', 'rest', 'point', 'mid', 'talkB', 'rest']
for i, sg in enumerate(tr):
    txt = sg['text']
    edge = sg['start'] < 25 or sg['start'] > total - 30
    if re.search(r'\b(Hola|hola|Gracias|Sayonara|Nos escuchamos|bienvenid)', txt): p_ = 'wave'
    elif edge and ('¡' in txt or '!' in txt): p_ = 'open'
    elif '¿' in txt or '!' in txt or 'wow' in txt.lower(): p_ = 'mid'
    else: p_ = None
    seg_pose.append((sg['start'], sg['end'] + 0.4, p_, i))
def pose_at(t, f):
    if other_at(t)[0]: return 'rest'
    for s0, s1, p_, i in seg_pose:
        if s0 - 0.2 <= t <= s1:
            if p_ == 'wave': return 'wave1' if (f // 8) % 2 == 0 else 'wave2'
            if p_: return p_
            return CYCLE[(i * 2 + int((t - s0) / 2.6)) % len(CYCLE)]
    return 'rest'

# ---------- stage: where Vinelis stands (keyframes) ----------
stage = cfg.get('stage', {})
DEFAULT = [[200, 0.86]]
kf = []  # (t, cx, scale, yoff)
total_end = total
for i, ent in enumerate(sched):
    st_, sc_ = ent[0], ent[1]
    en_ = sched[i+1][0] if i+1 < len(sched) else total_end
    places = ent[2] if len(ent) > 2 else stage.get(sc_, DEFAULT)
    n = max(1, min(len(places), int((en_ - st_) // 18) + 1))
    for k in range(n):
        pl = places[k % len(places)]
        kf.append((st_ + k * (en_ - st_) / n, pl[0], pl[1], pl[2] if len(pl) > 2 else 0))
HIDE = list(cfg.get('hide', []))   # [[t0, t1], ...] Vinelis sale de escena
GAP = cfg.get('hide_silence', 2.0)  # ocultar a Vinelis en silencios/música de más de GAP s
if GAP:
    for a_, b_ in zip(words, words[1:]):
        if b_['s'] - a_['e'] >= GAP:
            HIDE.append([a_['e'] + 0.35, b_['s'] - 0.35])
def visible(t, ramp=0.45):
    v = 1.0
    for a, b in HIDE:
        if a - ramp < t < b + ramp:
            v = min(v, max(0.0, min(1.0, (a - t) / ramp, (t - b) / ramp)) if not (a <= t <= b) else 0.0)
    return v
MOVE = 1.0
def ease(x): return 0.5 - 0.5 * math.cos(math.pi * max(0, min(1, x)))
def place_at(t):
    prev = kf[0]; cur = kf[0]
    for i, k in enumerate(kf):
        if k[0] <= t: cur = k; prev = kf[i-1] if i > 0 else k
    k_ = (t - cur[0]) / MOVE
    if k_ >= 1 or prev is cur: return cur[1], cur[2], 0.0, cur[3]
    e = ease(k_)
    return (prev[1] + (cur[1] - prev[1]) * e, prev[2] + (cur[2] - prev[2]) * e, math.sin(math.pi * k_),
            prev[3] + (cur[3] - prev[3]) * e)

XF = 0.6  # crossfade seconds
f0 = int(start * FPS); f1 = nfr if dur is None else min(nfr, int((start + dur) * FPS))
out = cfg['out'] if dur is None else cfg['out'].replace('.mp4', '_preview.mp4')
SEGOUT = sys.argv[sys.argv.index('--segment') + 1] if '--segment' in sys.argv else None
if SEGOUT:   # tramo solo de vídeo (para montaje reanudable), se escribe en .tmp y se renombra al terminar
    ff = subprocess.Popen(['ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-',
                           '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '21', '-pix_fmt', 'yuv420p', '-f', 'mp4', SEGOUT + '.tmp'], stdin=subprocess.PIPE)
else:
  ff = subprocess.Popen(['ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-',
                         '-ss', str(start), '-i', cfg['audio'], '-map', '0:v', '-map', '1:a', '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '21',
                         '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '160k', '-shortest', '-movflags', '+faststart', out], stdin=subprocess.PIPE)
sub_cache = {}
ci = 0
for f in range(f0, f1):
    t = f / FPS
    st, scene = scene_at(t)[:2]
    # zoom: gentle Ken Burns within each segment
    fr = loop_frame(scene, f).copy()
    seg_t = t - st
    z = 1.0 + 0.04 * (0.5 - 0.5 * math.cos(min(seg_t / 30, 1) * math.pi))
    if z > 1.001:
        cw, chh = int(W / z), int(H / z); ox, oy = (W - cw)//2, (H - chh)//3
        fr = cv2.resize(fr[oy:oy+chh, ox:ox+cw], (W, H), interpolation=cv2.INTER_LINEAR)
    if seg_t < XF and st > 0:
        prev = [s for s in sched if s[0] < st]
        if prev:
            pf = loop_frame(prev[-1][1], f)
            k = seg_t / XF
            fr = cv2.addWeighted(fr, k, pf, 1 - k, 0)
    is_card = scene in ('intro', 'outro')
    if not is_card:
        blend(fr, chip, 30, 26)
    # narrator (moves & scales per scene)
    blink = 1 if (f % 120) in (0, 1, 2, 3) else 0
    m = int(mouth[f]) if f < len(mouth) else 0
    cx, sc, hop, yoff = place_at(t)
    vis = visible(t)
    sc *= cfg.get('char_scale', 1.0)
    cx += 18 * math.sin(t * 0.5)
    sc *= 1 + 0.07 * hop
    spr = chars[(pose_at(t, f), m, blink)]
    if cx > W * 0.55: spr = spr[:, ::-1]
    sw_, sh_ = int(spr.shape[1] * sc), int(spr.shape[0] * sc)
    if vis > 0.01:
        spr = cv2.resize(spr, (sw_, sh_), interpolation=cv2.INTER_AREA if sc < 1 else cv2.INTER_LINEAR)
        if vis < 0.999:
            spr = spr.copy(); spr[..., 3] = (spr[..., 3] * vis).astype(np.uint8)
        bob = 5 * math.sin(t * 2.2) - 60 * hop + (1 - vis) * 80
        blend(fr, spr, int(cx - sw_ / 2), int(H - sh_ - 12 + bob + yoff))
    else:
        sw_ = 0; cx = W / 2
    # subtitle (opposite side of Vinelis)
    while ci < len(cues) and cues[ci][1] < t: ci += 1
    if ci > 0 and cues[ci-1][1] >= t: ci -= 1
    if SUBS and ci < len(cues) and cues[ci][0] <= t <= cues[ci][1]:
        txt = cues[ci][2]
        if txt not in sub_cache:
            if len(sub_cache) > 50: sub_cache.clear()
            sub_cache[txt] = render_sub(txt)
        sb = sub_cache[txt]
        half = sw_ / 2
        if cx < W * 0.4: sx = max((W - sb.shape[1]) // 2, int(cx + half * 0.55))
        elif cx > W * 0.6: sx = min((W - sb.shape[1]) // 2, int(cx - half * 0.55) - sb.shape[1])
        else: sx = (W - sb.shape[1]) // 2
        sx = max(20, min(W - sb.shape[1] - 20, sx))
        blend(fr, sb, sx, H - sb.shape[0] - 40)
    on, ov = other_at(t)
    # invitado ilustrado (validado): aparece en el lado contrario a Vinelis solo mientras habla
    if on and GUEST and ov > 0.01:
        gv = ov * visible(t)
        if gv > 0.01:
            t0 = next(o0 for o0, o1, n in OTHERS if o0 - 0.2 <= t <= o1 + 0.3)
            gm = int(gmouth[f]) if f < len(gmouth) else 0
            if t - t0 < 1.6 and GUEST_WAVE.get(round(t0, 1)): key = 'wave'
            elif gm == 0 and GUEST.get('blink', True) and (f % 110) in (0, 1, 2, 3): key = 'blink'
            else: key = 'm%d' % gm
            gs = gsprites[key]
            gx = W - 330 if cx < W * 0.5 else 330
            gy = int(H - gs.shape[0] - 18 + 4 * math.sin(t * 2.0) + (1 - gv) * 60)
            if gv < 0.999: gs = gs.copy(); gs[..., 3] = (gs[..., 3] * gv).astype(np.uint8)
            blend(fr, gs, int(gx - gs.shape[1] / 2), gy)
    if on and ov > 0.01 and not GUEST:
        if on not in spk_cache: spk_cache[on] = render_speaker(on)
        sp = spk_cache[on]
        if ov < 0.999: sp = sp.copy(); sp[..., 3] = (sp[..., 3] * ov).astype(np.uint8)
        blend(fr, sp, W - sp.shape[1] - 30, 24)
    # progress bar
    p = t / total
    fr[H-10:H, :int(W*p)] = (255, 204, 46)
    ff.stdin.write(fr.tobytes())
    if f % (FPS*30) == 0: print(f'{t/60:.1f} min', flush=True)
ff.stdin.close(); ff.wait()
if SEGOUT:
    os.replace(SEGOUT + '.tmp', SEGOUT); out = SEGOUT
print('OK', out)
