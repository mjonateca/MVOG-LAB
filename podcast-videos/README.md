# Mi Pequeño Atlas — vídeos para YouTube

Convierte cada capítulo del podcast en un vídeo de dibujos animados. El vídeo usa el audio original de Vinelis, sin cambios. Encima van escenas animadas que siguen la narración, Vinelis animada con la ropa típica de cada destino, y subtítulos en español.

## Montar un episodio

```bash
cd podcast-videos
tools/build.sh episodios/01-tokio                   # vídeo completo
tools/build.sh episodios/01-tokio --preview 0 60    # prueba de 60 s desde el segundo 0
```

El vídeo sale en `episodios/<capítulo>/<ciudad>-para-ninos-mi-pequeno-atlas.mp4`, en 1920×1080 a 30 fps.

## Cómo funciona

| Paso | Archivo | Qué hace |
|---|---|---|
| Audio | `tools/build.sh` | Lo descarga de Spreaker con `spreaker_episode_id`. |
| Transcripción | `tools/transcribe.py` | Usa Whisper (faster-whisper "small") y saca marcas de tiempo por palabra. Después se corrige a mano en `transcript_fixed.json` (nombres propios, palabras en japonés…). |
| Personaje | `tools/vinelis_puppet.py` | Anima por recortes la ilustración de `personaje/`: brazos que giran desde el hombro, 8 posturas, boca en 3 posiciones y parpadeo. El vestuario se elige con `outfit` (por ahora `kimono`). |
| Escenas | `tools/scenes.html` + `tools/render_loops.js` | Escenas dibujadas en SVG con animación en bucle de 8 s. Se renderizan con Playwright. |
| Montaje | `tools/compose.py` | Junta las escenas (con fundidos), mueve y escala a Vinelis según `stage`, sincroniza su boca con la voz y añade subtítulos, la barra de progreso y el audio. |

## config.json de cada episodio

- `schedule`: lista de pares `[segundo, escena]`. Indica qué escena se ve en cada momento según la transcripción.
- `stage`: para cada escena, la lista de posiciones de Vinelis `[[x_centro, escala], ...]`. En las escenas largas va rotando entre ellas aproximadamente cada 18 s.
- `outfit`: el vestuario del destino.
- `char_scale`: el tamaño general del personaje.
- `chip`: el texto del rótulo superior.

## Para una ciudad nueva

1. Crea `episodios/NN-ciudad/config.json` copiando el de Tokio, y cambia `spreaker_episode_id`, `audio`, `out` y `chip`.
2. Ejecuta `tools/build.sh` una primera vez para obtener la transcripción. Corrígela y escribe el `schedule` siguiendo la narración.
3. Añade las escenas de la ciudad en `tools/scenes.html` y su vestuario en `tools/vinelis_puppet.py`.
4. Haz una prueba con `--preview` y después monta el vídeo completo.

## Requisitos

- Python con `faster-whisper opencv-python-headless pillow numpy fonttools brotli`, más `ffmpeg`, Node y Playwright con Chromium.
- Acceso de red a Spreaker (`api.spreaker.com` y su CDN de audio) y a Hugging Face (para descargar el modelo de Whisper).

Las pautas del canal (estructura, formato, nombres de archivo, Shorts y revisión antes de publicar) están en el documento de pautas de Vinelis y Bibi.
