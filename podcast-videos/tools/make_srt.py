"""Genera el archivo de subtítulos .srt de un episodio a partir de su transcripción corregida.
uso: python3 make_srt.py episodios/NN-ciudad/config.json
"""
import sys, json, os, re
cfgp = sys.argv[1]; base = os.path.dirname(os.path.abspath(cfgp))
cfg = json.load(open(cfgp))
tr = json.load(open(os.path.join(base, cfg['transcript'])))
words = [w for s in tr for w in s['words'] if w['w'].strip()]
cues, cur = [], []
def flush():
    if cur: cues.append([cur[0]['s'], cur[-1]['e'], ''.join(x['w'] for x in cur).strip()]); cur.clear()
for w in words:
    txt = ''.join(x['w'] for x in cur) + w['w']
    if cur and (len(txt.strip()) > 84 or w['s'] - cur[-1]['e'] > 0.7): flush()
    cur.append(w)
    if re.search(r'[.!?…]$', w['w'].strip()) and len(''.join(x['w'] for x in cur)) > 18: flush()
flush()
for i, c in enumerate(cues):
    nxt = cues[i + 1][0] if i + 1 < len(cues) else c[1] + 1
    c[1] = min(max(c[1] + 0.3, c[0] + 1.0), nxt - 0.05, c[1] + 0.8)
def ts(x):
    h, r = divmod(x, 3600); m, s = divmod(r, 60); return f"{int(h):02d}:{int(m):02d}:{int(s):02d},{int(round((s - int(s)) * 1000)) % 1000:03d}"
def wrap(t, n=42):
    if len(t) <= n: return t
    ws = t.split(); best = None
    for i in range(1, len(ws)):
        a, b = ' '.join(ws[:i]), ' '.join(ws[i:]); m = max(len(a), len(b))
        if best is None or m < best[0]: best = (m, a + '\n' + b)
    return best[1]
out = os.path.join(base, cfg['out'].replace('.mp4', '.srt'))
with open(out, 'w', encoding='utf-8') as f:
    for i, (a, b, t) in enumerate(cues, 1): f.write(f"{i}\n{ts(a)} --> {ts(b)}\n{wrap(t)}\n\n")
print(out, len(cues), 'subtítulos')
