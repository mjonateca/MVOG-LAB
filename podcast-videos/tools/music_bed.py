"""Música de fondo original (generada aquí, sin derechos de terceros) para sustituir
la música del podcast cuando YouTube la reclama por Content ID.

Uso: python3 music_bed.py SALIDA.wav SEGUNDOS [semilla]
Estilo: infantil y suave (pulsos de ukelele/marimba sintetizados, pad cálido, bajo y
shaker muy suave), 96 bpm, progresiones mayores que van cambiando para no cansar.
"""
import sys, numpy as np, soundfile as sf

SR = 44100
BPM = 96
BEAT = 60 / BPM


def midi(n):
    return 440.0 * 2 ** ((n - 69) / 12)


def pluck(freq, dur, rng, bright=0.5):
    """Karplus-Strong: cuerda pulsada tipo ukelele."""
    n = int(SR * dur)
    p = max(2, int(SR / freq))
    buf = rng.uniform(-1, 1, p)
    out = np.empty(n)
    k = 0.5 + 0.49 * bright
    for i in range(n):
        out[i] = buf[i % p]
        j = (i + 1) % p
        buf[i % p] = k * buf[i % p] + (1 - k) * buf[j]
        buf[i % p] *= 0.996
    env = np.minimum(1, np.arange(n) / (SR * 0.004))
    return out * env


def marimba(freq, dur):
    t = np.arange(int(SR * dur)) / SR
    s = np.sin(2 * np.pi * freq * t) + 0.25 * np.sin(2 * np.pi * freq * 4 * t) * np.exp(-t * 18)
    return s * np.exp(-t * 5.5) * np.minimum(1, t / 0.003)


def pad(freqs, dur):
    t = np.arange(int(SR * dur)) / SR
    s = sum(np.sin(2 * np.pi * f * t + 0.3 * np.sin(2 * np.pi * 0.2 * t)) + 0.3 * np.sin(2 * np.pi * 2 * f * t) for f in freqs)
    env = np.minimum(1, t / 0.6) * np.minimum(1, (dur - t) / 0.6)
    return s * env / len(freqs)


PROGS = [  # grados en Do mayor (raíz midi, tipo)
    [(60, 'M'), (67, 'M'), (69, 'm'), (65, 'M')],
    [(65, 'M'), (60, 'M'), (67, 'M'), (60, 'M')],
    [(60, 'M'), (69, 'm'), (65, 'M'), (67, 'M')],
    [(62, 'm'), (67, 'M'), (60, 'M'), (69, 'm')],
]


def chord(root, kind):
    return [root, root + (4 if kind == 'M' else 3), root + 7]


def make(seconds, seed=7):
    rng = np.random.default_rng(seed)
    bar = BEAT * 4
    nbars = int(seconds / bar) + 2
    total = int(SR * (nbars + 2) * bar)
    L = np.zeros(total)
    R = np.zeros(total)
    cache = {}
    for b in range(nbars):
        prog = PROGS[(b // 8) % len(PROGS)]
        root, kind = prog[b % 4]
        notes = chord(root, kind)
        t0 = int(b * bar * SR)
        # pad cálido
        pd = pad([midi(n - 12) for n in notes], bar + 0.6)
        L[t0:t0 + len(pd)] += 0.10 * pd
        R[t0:t0 + len(pd)] += 0.10 * pd
        # bajo suave en 1 y 3
        for beat in (0, 2):
            bs = marimba(midi(root - 24), BEAT * 1.8) * 0.9
            s = t0 + int(beat * BEAT * SR)
            L[s:s + len(bs)] += 0.22 * bs
            R[s:s + len(bs)] += 0.22 * bs
        # arpegio de ukelele en corcheas
        pattern = [0, 1, 2, 1, 0, 2, 1, 2] if (b // 4) % 2 == 0 else [0, 2, 1, 2, 0, 1, 2, 1]
        for i, idx in enumerate(pattern):
            n = notes[idx] + (12 if (i == 5 and b % 2) else 0)
            key = (n, 'p')
            if key not in cache:
                cache[key] = pluck(midi(n), BEAT * 1.6, rng, 0.35)
            s = t0 + int(i * BEAT / 2 * SR)
            v = cache[key] * (0.16 if i % 2 == 0 else 0.11)
            pan = 0.35 + 0.3 * (idx / 2)
            L[s:s + len(v)] += v * (1 - pan)
            R[s:s + len(v)] += v * pan
        # melodía de marimba cada 2 compases (motivo sencillo)
        if b % 2 == 1:
            mel = [notes[2] + 12, notes[1] + 12, notes[0] + 12]
            for i, n in enumerate(mel):
                m = marimba(midi(n), BEAT * 1.2)
                s = t0 + int((1 + i) * BEAT * SR)
                L[s:s + len(m)] += 0.09 * m * 0.6
                R[s:s + len(m)] += 0.09 * m
        # shaker muy suave
        for i in range(8):
            nz = rng.normal(0, 1, int(SR * 0.05)) * np.exp(-np.arange(int(SR * 0.05)) / (SR * 0.012))
            s = t0 + int(i * BEAT / 2 * SR)
            g = 0.012 if i % 2 else 0.02
            L[s:s + len(nz)] += g * nz
            R[s:s + len(nz)] += g * nz
    out = np.stack([L, R], 1)[:int(SR * seconds)]
    out /= np.max(np.abs(out)) + 1e-9
    return out * 0.8


if __name__ == '__main__':
    o, secs = sys.argv[1], float(sys.argv[2])
    seed = int(sys.argv[3]) if len(sys.argv) > 3 else 7
    sf.write(o, make(secs, seed), SR)
    print('ok', o)
