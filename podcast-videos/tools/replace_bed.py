"""Sustituye la música de fondo de un capítulo conservando la voz intacta.

Uso: python3 replace_bed.py vocals.wav no_vocals.wav bed.wav salida.wav [inicio fin ...]
- vocals/no_vocals: separación de Demucs del audio original.
- bed: música original nuestra (music_bed.py), igual o más larga.
- La nueva música sigue la envolvente de volumen de la música original (entra, baja y
  calla en los mismos sitios), así la mezcla suena igual de equilibrada.
- Si se dan pares inicio/fin (segundos), solo se sustituye en esos tramos (con
  fundidos de 1,5 s); fuera de ellos se deja el audio original tal cual.
"""
import sys, numpy as np, soundfile as sf

voc, sr = sf.read(sys.argv[1])
acc, _ = sf.read(sys.argv[2])
bed, _ = sf.read(sys.argv[3])
out = sys.argv[4]
ranges = list(zip(map(float, sys.argv[5::2]), map(float, sys.argv[6::2])))
n = min(len(voc), len(acc))
voc, acc = voc[:n], acc[:n]
if len(bed) < n:
    bed = np.concatenate([bed] * (n // len(bed) + 1))
bed = bed[:n]

W = int(sr * 0.25)
nw = n // W + 1

def env(x):
    m = x.mean(1) if x.ndim > 1 else x
    m = np.pad(m, (0, nw * W - len(m)))
    return np.sqrt((m.reshape(nw, W) ** 2).mean(1)) + 1e-7

eo, eb = env(acc), env(bed)
k = np.ones(5) / 5
eo = np.convolve(eo, k, 'same')
eb = np.convolve(eb, k, 'same')
g = eo / eb
g[eo < 10 ** (-60 / 20)] = 0          # donde el original calla, la nueva también
g = np.convolve(g, np.ones(4) / 4, 'same')
gs = np.interp(np.arange(n), np.arange(nw) * W + W / 2, g)
new_bed = bed * gs[:, None]

orig = voc + acc
if ranges:
    mask = np.zeros(n)
    F = sr * 1.5
    t = np.arange(n)
    for a, b in ranges:
        a, b = a * sr, b * sr
        mask = np.maximum(mask, np.clip(np.minimum((t - (a - F)) / F, ((b + F) - t) / F), 0, 1))
    mix = voc + acc * (1 - mask[:, None]) + new_bed * mask[:, None]
else:
    mix = voc + new_bed
peak = np.abs(mix).max()
if peak > 0.99:
    mix *= 0.99 / peak
sf.write(out, mix, sr)
print('ok', out, 'pico', round(float(peak), 3))
