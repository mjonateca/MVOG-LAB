"""Quita tramos de solo música (sin narración) de un vídeo ya montado y ajusta los tiempos.

Uso: python3 apply_cuts.py config.json
- config['cuts'] = [[t0, t1], ...] tramos a quitar (en segundos del audio original).
  El script comprueba que dentro de cada tramo NO haya palabras del transcript (la narración no se toca).
- Lee config['out'] (vídeo completo), escribe el vídeo recortado encima (guarda el original como *_sin_recortes.mp4),
  y reescribe el .srt y las marcas de tiempo («M:SS») de la descripción con los tiempos nuevos.
- En cada empalme el audio se funde 0,25 s para que no se note el corte.
"""
import sys, json, os, re, subprocess

cfg = json.load(open(sys.argv[1]))
cuts = sorted(cfg.get('cuts', []))
if not cuts:
    sys.exit('no hay cuts en el config')
tr = json.load(open(cfg['transcript']))
words = [w for s in tr for w in s['words']]
for a, b in cuts:
    inside = [w['w'] for w in words if w['e'] > a and w['s'] < b]
    if inside:
        sys.exit(f'el tramo {a}-{b} tiene narración: {inside[:5]}')

out = cfg['out']
base = out.replace('.mp4', '_sin_recortes.mp4')
def _dur(f):
    try: return float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', f]))
    except Exception: return 0.0
_ad = _dur(cfg['audio'])
if os.path.exists(out) and abs(_dur(out) - _ad) < 2:   # solo el montaje completo (dura lo que el audio) pasa a ser la base
    os.replace(out, base)
if abs(_dur(base) - _ad) > 2:
    sys.exit(f'falta el montaje completo: {base} no dura lo que el audio ({_ad:.1f}s); vuelve a montar')
dur = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', base]))
keep, cur = [], 0.0
for a, b in cuts:
    keep.append((cur, a)); cur = b
keep.append((cur, dur))

def newt(t):
    """tiempo original -> tiempo en el vídeo recortado"""
    d = 0.0
    for a, b in cuts:
        if t >= b: d += b - a
        elif t > a: return a - d
    return t - d

F = 0.25
cmd, fc, ins = ['ffmpeg', '-v', 'error', '-y'], [], []
for i, (a, b) in enumerate(keep):
    cmd += ['-ss', f'{a:.3f}', '-to', f'{b:.3f}', '-i', base]   # una entrada por trozo (sin decodificar dos veces: poca memoria)
    af = f'[{i}:a]asetpts=PTS-STARTPTS'
    if i > 0: af += f',afade=t=in:d={F}'
    if i < len(keep) - 1: af += f',afade=t=out:st={b - a - F:.3f}:d={F}'
    fc.append(f'[{i}:v]setpts=PTS-STARTPTS[v{i}]'); fc.append(af + f'[a{i}]')
    ins.append(f'[v{i}][a{i}]')
fc.append(''.join(ins) + f'concat=n={len(keep)}:v=1:a=1[v][a]')
subprocess.run(cmd + ['-filter_complex', ';'.join(fc), '-map', '[v]', '-map', '[a]', '-threads', '2',
                      '-c:v', 'libx264', '-preset', 'veryfast', '-crf', '21', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '160k',
                      '-movflags', '+faststart', '-f', 'mp4', out + '.tmp'], check=True)
os.replace(out + '.tmp', out)

stem = out[:-4]
# .srt
srt = stem + '.srt'
if os.path.exists(srt):
    orig = srt.replace('.srt', '_sin_recortes.srt')
    if not os.path.exists(orig):
        os.replace(srt, orig)
    def fmt(t):
        ms = int(round(t * 1000)); h, ms = divmod(ms, 3600000); m, ms = divmod(ms, 60000); s_, ms = divmod(ms, 1000)
        return f'{h:02d}:{m:02d}:{s_:02d},{ms:03d}'
    def parse(x):
        h, m, r = x.split(':'); s_, ms = r.split(',')
        return int(h) * 3600 + int(m) * 60 + int(s_) + int(ms) / 1000
    txt = open(orig, encoding='utf-8').read()
    txt = re.sub(r'(\d\d:\d\d:\d\d,\d\d\d) --> (\d\d:\d\d:\d\d,\d\d\d)', lambda m: f'{fmt(newt(parse(m.group(1))))} --> {fmt(newt(parse(m.group(2))))}', txt)
    open(srt, 'w', encoding='utf-8').write(txt)
# descripción: marcas «M:SS» al principio de línea (capítulos)
desc = stem + '-descripcion.txt'
if os.path.exists(desc):
    orig = desc.replace('.txt', '_sin_recortes.txt')
    if not os.path.exists(orig):
        os.replace(desc, orig)
    def rep(m):
        t = int(m.group(1)) * 60 + int(m.group(2)); n = int(round(newt(t)))
        return f'{n // 60}:{n % 60:02d}'
    lines = [re.sub(r'^(\d+):(\d\d)(?=\s)', rep, ln) for ln in open(orig, encoding='utf-8').read().split('\n')]
    open(desc, 'w', encoding='utf-8').write('\n'.join(lines))
total = sum(b - a for a, b in cuts)
print(f'OK {out}: {dur:.1f}s -> {dur - total:.1f}s (quitados {total:.1f}s en {len(cuts)} tramos)')
