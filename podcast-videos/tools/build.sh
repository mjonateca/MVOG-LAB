#!/usr/bin/env bash
# Monta un episodio completo de Mi Pequeño Atlas.
# Uso:  tools/build.sh episodios/01-tokio [--preview INICIO DURACION]
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"; ROOT="$(dirname "$HERE")"
EP="$(cd "$1" && pwd)"; shift
cd "$EP"
cfg() { python3 -c "import json,sys;c=json.load(open('config.json'));print(c.get('$1',''))"; }
AUDIO="$(cfg audio)"; ID="$(cfg spreaker_episode_id)"; OUTFIT="$(cfg outfit)"

# 1) audio desde Spreaker (si no está)
if [ ! -f "$AUDIO" ]; then
  echo ">> Descargando audio del episodio $ID"
  curl -sSL -o "$AUDIO" "https://api.spreaker.com/v2/episodes/$ID/download.mp3"
fi
# 2) transcripción (si no está)
if [ ! -f transcript_fixed.json ]; then
  echo ">> Transcribiendo (revisa luego transcript_fixed.json)"
  python3 "$HERE/transcribe.py" "$AUDIO" transcript.json
  cp transcript.json transcript_fixed.json
fi
# 3) personaje con el vestuario del destino
echo ">> Vinelis (vestuario: ${OUTFIT:-ninguno})"
rm -rf char && python3 "$HERE/vinelis_puppet.py" "$ROOT/personaje/vinelis-recorte.png" "$ROOT/personaje/vinelis-original.jpg" char $OUTFIT
# 4) animaciones de las escenas usadas
SCENES="$(python3 -c "import json;print(','.join(sorted({s for _,s in json.load(open('config.json'))['schedule']})))")"
echo ">> Escenas: $SCENES"
node "$HERE/render_loops.js" "$EP" "$SCENES"
# 5) montaje final
python3 "$HERE/compose.py" config.json "$@"
