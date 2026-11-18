#!/bin/bash
# usage: split_for_drive.sh <episodio_dir> "<Capítulo N - Ciudad>"
# Parte el MP4 en volúmenes 7z de 2,9 MB, verifica la extracción y escribe LEEME.txt en <dir>/drive/
set -e
cd "$1"; MP4=$(ls *-para-ninos-mi-pequeno-atlas.mp4); BASE=${MP4%.mp4}
rm -rf drive && mkdir drive
7z a -t7z -mx=0 -v2900k "drive/$BASE.7z" "$MP4" > /dev/null
T=$(mktemp -d); 7z x -o"$T" "drive/$BASE.7z.001" > /dev/null; cmp "$T/$MP4" "$MP4"; rm -rf "$T"
N=$(ls drive/*.7z.* | wc -l); DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$MP4" | awk '{printf "%d:%02d", $1/60, $1%60}')
cat > drive/LEEME.txt <<TXT
$2 — vídeo para YouTube (Mi Pequeño Atlas)

Archivo: $MP4 (1920x1080, 30 fps, $DUR, sin subtítulos incrustados)
El vídeo está partido en $N trozos (7-Zip) porque Drive no permite subidas grandes desde aquí.

Cómo unirlo:
1. Descarga TODOS los archivos $BASE.7z.001 ... $BASE.7z.$(printf %03d $N) en la misma carpeta.
2. Abre el primero ($BASE.7z.001) con 7-Zip (Windows), Keka o The Unarchiver (Mac).
3. Se extrae el vídeo completo $MP4.

Los subtítulos van aparte en el archivo .srt de esta carpeta (para subirlos a YouTube).
TXT
echo "OK $N trozos, verificado"
