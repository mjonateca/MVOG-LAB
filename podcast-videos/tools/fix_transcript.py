"""Corrige palabras mal transcritas (nombres propios, palabras extranjeras) conservando los tiempos.

Uso: python3 fix_transcript.py transcript.json transcript_fixed.json fixes.json
fixes.json = {"palabra_mal": "palabra_bien", ...}  (se compara sin mayúsculas ni signos;
             se conservan los signos de puntuación de la palabra original)
El texto de cada segmento se reconstruye a partir de las palabras corregidas.
"""
import sys, json, re

tr = json.load(open(sys.argv[1]))
fixes = {k.lower(): v for k, v in json.load(open(sys.argv[3])).items()}
n = 0
for seg in tr:
    for w in seg['words']:
        m = re.match(r'^(\s*)([¿¡"«]*)(.*?)([.,;:!?…"»]*)$', w['w'])
        lead, pre, core, post = m.groups()
        key = core.lower()
        if key in fixes:
            new = fixes[key]
            if core[:1].isupper() and new[:1].islower():
                new = new[0].upper() + new[1:]
            w['w'] = f'{lead}{pre}{new}{post}'; n += 1
    seg['text'] = ''.join(w['w'] for w in seg['words']).strip()
json.dump(tr, open(sys.argv[2], 'w'), ensure_ascii=False)
print('corregidas', n)
