#!/bin/bash
# Montaje reanudable: renderiza tramos de 60 s (solo vídeo) que se guardan en seg/; si se corta, sigue donde iba.
# usage: compose_resumable.sh <episodio_dir>
set -e
cd "$1"
OUT=$(python3 -c "import json;print(json.load(open('config.json'))['out'])")
AUD=$(python3 -c "import json;print(json.load(open('config.json'))['audio'])")
DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$AUD")
N=$(python3 -c "import math;print(math.ceil($DUR/60))")
mkdir -p seg
for i in $(seq 0 $((N-1))); do
  f=seg/s$(printf %03d $i).mp4
  [ -f "$f" ] && continue
  nice python3 ../../tools/compose.py config.json --segment "$f" $((i*60)) 60 > /dev/null
  echo "tramo $((i+1))/$N"
done
ls seg/s*.mp4 | sort | sed "s/^/file '/; s/$/'/" > seg/list.txt
ffmpeg -v error -y -f concat -safe 0 -i seg/list.txt -i "$AUD" -map 0:v -map 1:a -c:v copy -c:a aac -b:a 160k -shortest -movflags +faststart "$OUT"
echo "OK $OUT"
