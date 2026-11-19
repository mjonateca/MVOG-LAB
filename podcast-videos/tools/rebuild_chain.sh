#!/bin/bash
# 1) renderiza las escenas que falten de todos los capítulos; 2) monta (por tramos, reanudable) y parte en 7z, DE UNO EN UNO
cd "$(dirname "$0")/../episodios"
declare -A NAME=( [03-roma]="Capítulo 3 - Roma" [04-madrid]="Capítulo 4 - Madrid" [05-santo-domingo]="Capítulo 5 - Santo Domingo" [06-berlin]="Capítulo 6 - Berlín" [07-ottawa]="Capítulo 7 - Ottawa" [08-sao-paulo]="Capítulo 8 - São Paulo" )
for e in "$@"; do echo "== render $e"; (cd $e && ./render_all.sh >> render_all.out 2>&1); done
for e in "$@"; do
  echo "== montaje $e"
  ../tools/compose_resumable.sh $e > $e/compose.log 2>&1 && nice ../tools/split_for_drive.sh $e "${NAME[$e]}" && echo "== LISTO $e"
done
echo "== FIN"
