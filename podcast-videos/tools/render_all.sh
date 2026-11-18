#!/bin/bash
# Renderiza todos los loops del config en 3 procesos paralelos y espera a que terminen.
cd "$(dirname "$0")"
M=$(python3 -c "
import json,os;c=json.load(open('config.json'))
print(' '.join(sorted(n for n in set(x[1] for x in c['schedule']) if not os.path.exists('loops/%s/239.jpg'%n))))")
A=$(echo $M | tr ' ' '\n' | awk 'NR%3==1' | paste -sd,); B=$(echo $M | tr ' ' '\n' | awk 'NR%3==2' | paste -sd,); C=$(echo $M | tr ' ' '\n' | awk 'NR%3==0' | paste -sd,)
PIDS=""
for G in "$A" "$B" "$C"; do [ -n "$G" ] && { node ../../tools/render_loops.js $PWD $G >> render.log 2>&1 & PIDS="$PIDS $!"; }; done
wait $PIDS
python3 -c "
import json,os;c=json.load(open('config.json'))
print('missing',[n for n in set(x[1] for x in c['schedule']) if not os.path.exists('loops/%s/239.jpg'%n)])"
