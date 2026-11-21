# Instrucciones — YouTube · Mi Pequeño Atlas

Proyecto para convertir cada capítulo del pódcast **Mi Pequeño Atlas** (de Vinelis García) en un vídeo de dibujos animados para YouTube. Son cuentos de viaje para niños y familias.

---

## 1. Qué hay que hacer en cada capítulo

1. Coger el **audio original del capítulo**, tal como está publicado. Se descarga de Spreaker (ver §8).
2. Transcribirlo y **corregir a mano** los nombres y las palabras extranjeras.
3. Montar un vídeo con escenas animadas que **cuenten en imágenes lo mismo que dice la narración**, con Vinelis como presentadora.
4. Entregar para revisión: el vídeo, la miniatura y el texto SEO. **Nunca publicar nada directamente.**

Orden de trabajo: **Tokio** (ya hecho, pendiente de aprobación), después **París** y **Atenas** (los 3 del lanzamiento), y luego un capítulo por semana en el orden del pódcast.

---

## 2. El audio manda

- Usar la voz de Vinelis **tal cual**: no regrabar, no cambiar el texto, no acortar la historia ni cambiar su orden.
- El vídeo **sigue al audio**. Cada escena muestra lo que se está diciendo en ese momento.
- El vídeo dura lo mismo que el audio (unos 10–15 minutos).

---

## 3. Regla de oro: cada palabra clave tiene su imagen

- Cada vez que la narración menciona algo concreto (un lugar, una comida, un objeto, una costumbre, una tienda de dulces, un tren…), **en ese momento tiene que aparecer en pantalla algo relacionado**.
- Revisar la transcripción **frase a frase** y hacer una tabla `minuto → lo que se dice → lo que se ve`. Ninguna mención importante puede quedarse sin imagen.
- Si la explicación tiene partes (por ejemplo, los ingredientes del ramen o las partes del kimono), se muestran con **etiquetas y flechas** sobre el objeto.
- En Tokio hay unos 45 cambios de escena. Es la referencia de ritmo.

---

## 4. Estilo visual: ilustración realista y reconocible

**Objetivo:** si un niño viaja a ese destino, tiene que **reconocer los lugares** por haberlos visto en el vídeo.

- **Ilustración con aspecto realista**: proporciones reales, perspectiva, luz, sombras y detalles arquitectónicos de verdad. Nada de fotos, nada de imágenes de archivo y nada de estilo "infantil inventado".
- **Lugares emblemáticos dibujados como son**. Ejemplos de Tokio: la puerta Kaminarimon con el farol 雷門, la Torre de Tokio, la Skytree, el cruce de Shibuya con la torre 109 y sus pantallas, Akihabara, el Shinkansen con el Fuji, el río Meguro con cerezos y los carteles de estación bilingües.
- **Nada flotando.** Todo apoyado en un suelo, una acera, una mesa o un mostrador, con su sombra. Nada de árboles dentro del agua, comida en el aire ni carteles sin soporte.
- **Las personas, con proporciones reales**, caminando por las aceras (no por la calzada) y vestidas acorde al lugar.
- **Los letreros, las pantallas y los neones**, como en la realidad: con texto en el idioma local y su traducción cuando ayude.
- **Movimiento real**: gente caminando, trenes y coches pasando, humo, pétalos, pantallas que cambian. No vale una imagen fija con zoom.
- Colores vivos, como la foto de perfil del canal.
- **Prohibido**: soles o nubes con cara, objetos caricaturescos sin base y logos o marcas de herramientas.

---

## 5. Vinelis, la presentadora

- **La que habla es Vinelis.** Se usa **su ilustración oficial** (niña de piel morena, pelo rizado y voluminoso, aros rosas y vestido blanco con lazo rosa), **animada por partes**. No se redibuja: se anima la ilustración original.
- **Animación:** boca sincronizada con la voz (3 posiciones), parpadeo, brazos que giran desde los hombros y un ligero balanceo.
- **Brazos:** por defecto, **abajo** (en reposo). Mientras habla va cambiando de gesto cada 2–3 segundos (señalar la escena, una mano arriba, abrir un poco los brazos). **Saluda con la mano** cuando dice "Hola", "Gracias", "Sayonara"… Los **brazos totalmente abiertos solo en la intro y la despedida**.
- **Vestuario según el destino**: en Tokio, **kimono** rojo con flores de cerezo y obi dorado. Cada ciudad lleva su ropa típica; si hay libro de esa ciudad, se usa la misma ropa que en el libro.
- **Posición y tamaño dinámicos**: no está fija en un lado. En cada escena se coloca donde sea más atractiva y donde no tape lo importante, con un pequeño salto al cambiar de sitio. Siempre **de pie en el suelo**.
- **Plano cercano** (grande, centrada, de rodillas para arriba) en los momentos de introducción directa al espectador. Ejemplo: "Hoy viajamos a Tokio… ajusten sus cinturones".
- **Se oculta** y solo se ve la imagen:
  - en **silencios, efectos de sonido y pausas musicales de más de 3 segundos**;
  - en las **tomas de lugar emblemático** (por ejemplo, el templo Senso-ji o el silencio del cruce de Shibuya);
  - en las **tomas de transición** (por ejemplo, durante "¡Despeguemos!" solo se ve el avión volando, con su sonido).
- En las escenas de detalle (comida con etiquetas) va **pequeña en una esquina**.

---

## 6. Estructura de cada vídeo

1. **Intro (primeros 10 segundos):** la ciudad de fondo, el título del capítulo y Vinelis presentando. Gancho inmediato con una curiosidad o una pregunta.
2. **La historia:** escenas que cambian con cada momento de la narración (§3).
3. **Actividad en familia:** al final, si el capítulo la tiene, con su escena.
4. **Cierre:** Vinelis se despide, invita a suscribirse y a ver el siguiente capítulo, y menciona el libro de esa ciudad si existe.

**En todo el vídeo:**
- **Sin subtítulos incrustados.** El vídeo sale limpio; los subtítulos se entregan aparte en un archivo `.srt` (español, sincronizado con la voz) que se sube a YouTube en "Subtítulos → Subir archivo". Se genera con `tools/make_srt.py episodios/NN-ciudad/config.json`.
- Rótulo pequeño arriba: "Mi Pequeño Atlas · Capítulo N: Ciudad".
- Barra de progreso fina abajo.

---

## 7. Formato y entrega

- **Vídeo largo:** 1920×1080 (16:9), MP4 (H.264 + AAC), **30 fps**.
- **Nombre del archivo:** `ciudad-para-ninos-mi-pequeno-atlas.mp4` (ej. `tokio-para-ninos-mi-pequeno-atlas.mp4`).
- **Miniatura:** 1280×720 en JPG. La ciudad a pantalla completa, Vinelis pequeña abajo a la izquierda (con el vestuario del destino) y un texto gigante de 1–4 palabras (ej. "¡TOKIO!").
- **Shorts (2–3 por capítulo):** vertical 9:16, de 30 a 50 segundos, una curiosidad por Short, gancho en el primer segundo, subtítulos incrustados, terminar invitando a ver el vídeo largo. Nombre: `short-ciudad-curiosidad.mp4` (ej. `short-tokio-shibuya.mp4`).
- **Sin anuncios** dentro del vídeo.
- **Entrega (solo por Google Drive):** dentro de "Audios para Claude (YouTube)" → "Videos YouTube Completos", una carpeta por capítulo llamada **"Capítulo N - Ciudad (video en partes)"** con:
  - el vídeo partido en trozos de 2,9 MB con 7-Zip (`7z a -t7z -mx=0 -v2900k ciudad-para-ninos-mi-pequeno-atlas.7z video.mp4`), porque la conexión con Drive solo admite unos 3 MB por archivo. Antes de subirlos, comprobar que se vuelven a unir en el vídeo idéntico al original;
  - un `LEEME.txt` con los pasos para unirlos (7-Zip en Windows, Keka o The Unarchiver en Mac, ZArchiver en Android);
  - el `.srt` de subtítulos;
  - la miniatura y la descripción se dejan en "Videos YouTube Completos".
  - La subida de los trozos se puede repartir entre subagentes, uno por capítulo, y al final verificar que cada trozo esté una sola vez.
- **Revisión:** Bibi o Vinelis revisan antes de publicar. Quien genera el vídeo **no lo sube a YouTube ni a ninguna red social**.

---

## 8. Datos del pódcast

- **Spreaker:** programa "Mi Pequeño Atlas", show_id `6847696`.
  - Lista de episodios: `https://api.spreaker.com/v2/shows/6847696/episodes`
  - Audio: `https://api.spreaker.com/v2/episodes/<episode_id>/download.mp3`
- **Spotify:** https://open.spotify.com/show/1njfWf0eHdidZgHQZvEYH1
- **Libros:** Gumroad https://mipequenoatlas.gumroad.com/ y Payhip https://payhip.com/MiPequenoAtlas

| Cap. | Ciudad | episode_id |
|---|---|---|
| 1 | Tokio | 69414595 |
| 2 | París | 69430832 |
| 3 | Roma | 69451744 |
| 4 | Madrid | 69478475 |
| 5 | Santo Domingo | 69488028 |
| 6 | Berlín | 69673261 |
| 7 | Ottawa | 76244750 |
| 8 | São Paulo | 76244759 |
| 9 | Ámsterdam | 76294267 |
| 10 | Viena | 76403064 |

Atenas todavía no está en Spreaker: hay que pedir el audio.

---

## 9. SEO (lo hace Bibi al publicar; se le entrega preparado)

- **Título:** `Ciudad para niños [bandera] | [gancho con curiosidad] | Mi Pequeño Atlas` (ej. "Tokio para niños 🇯🇵 | Robots, templos y sakura | Mi Pequeño Atlas").
- **Descripción:**
  - la palabra clave en las primeras líneas;
  - una lista de lo que se aprende;
  - **capítulos con minutos**, sacados de la transcripción;
  - enlaces a los libros (Gumroad y Payhip) y a Spotify;
  - hashtags y etiquetas.
- **Audiencia:** "Sí, es contenido creado para niños".

---

## 10. Herramientas (sistema de montaje ya hecho)

El código está en el zip **`mi-pequeno-atlas-videos-v5.zip`**, en la carpeta de Drive "Audios para Claude (YouTube)". Al descomprimirlo queda la carpeta `podcast-videos/`, con su propio README.

- `tools/build.sh episodios/NN-ciudad [--preview INICIO DURACION]`: lo hace todo de una vez. Descarga el audio, transcribe (Whisper "small"), genera a Vinelis con el vestuario, renderiza las escenas y monta el vídeo.
- `tools/scenes_real*.js`: las escenas realistas (SVG animado, bucles de 8 s renderizados con Playwright).
- `tools/vinelis_puppet.py`: la animación por partes de la ilustración de Vinelis. Las poses son rest, mid, talkA, talkB, point, wave1, wave2 y open; el vestuario se elige con el parámetro `outfit`.
- `tools/make_srt.py`: genera el `.srt` de subtítulos desde la transcripción corregida.
- `tools/compose.py`: el montaje final (sin subtítulos incrustados salvo `"subtitles": true` en el config). Lee `config.json`:
  - `schedule`: lista `[segundo, escena]`, opcionalmente con `[[x, escala, desplazamiento_y]]` para un encuadre concreto (por ejemplo, el plano cercano);
  - `stage`: dónde se coloca Vinelis en cada escena;
  - `hide`: los tramos en los que no aparece;
  - `hide_silence`: segundos de silencio a partir de los cuales se oculta sola (3);
  - `outfit`, `char_scale` y `chip` (el rótulo de arriba).
- **Requisitos del entorno:**
  - Python con `faster-whisper opencv-python-headless pillow numpy fonttools brotli`, más `ffmpeg`, Node y Playwright con Chromium.
  - Red con acceso a `api.spreaker.com` y su CDN de audio (`d1bxy2pveef3fq.cloudfront.net`), a las imágenes (`d3wo5wojvuv7l.cloudfront.net`) y a Hugging Face (`huggingface.co`, `us.aws.cdn.hf.co`) para el modelo de Whisper.

**Para una ciudad nueva:**
1. Copiar `episodios/01-tokio/config.json` y cambiar el id, el audio, el nombre de salida y el rótulo.
2. Transcribir y corregir la transcripción.
3. Hacer la tabla de palabras clave (§3).
4. Dibujar las escenas realistas de esa ciudad y su vestuario.
5. Escribir el `schedule`.
6. Hacer una prueba corta con `--preview`.
7. Montar el vídeo completo y revisar fotogramas repartidos por todo el vídeo.

---

## 11. Lo que NO hay que hacer

- Usar otra voz que no sea la de Vinelis, o cambiar el texto o el orden de la historia.
- Publicar en YouTube, Instagram o en cualquier otro sitio.
- Usar fotos, imágenes de archivo o un estilo distinto al acordado.
- Dejar objetos flotando o lugares inventados que no se parezcan a los reales.
- Dejar a Vinelis quieta en una esquina durante un silencio.
- Poner logos o marcas de otras herramientas en el vídeo.

---

**Resumen en una frase:** el audio del pódcast tal cual, con una ilustración animada y realista que muestra cada cosa que se menciona, con Vinelis (vestida según el destino) presentando, y el vídeo se entrega en Drive para revisión antes de publicarse.

## Personajes invitados (desde el cap. 7, Ottawa)
- Se detecta quién habla en cada frase por el tono de voz y se anota en `others` del config (`[[t0, t1, "Nombre"], ...]`).
- Mientras habla el invitado, Vinelis escucha (boca cerrada, brazos abajo) y el invitado aparece en el lado contrario, con la boca sincronizada con su voz, parpadeo y saludo al entrar (`guest` en el config). Si no hay ilustración del invitado, se muestra un rótulo con micrófono y su nombre.
- La ilustración oficial del invitado viene en una hoja 3x2 (boca abierta, cerrada, entreabierta / escucha, parpadeo, saludo) que se recorta con `tools/guest_sprites.py`. Carlos (Ottawa): `personaje/carlos-validado.png`.
- **Todo personaje nuevo debe validarlo Vivi antes de usarse en un vídeo**: se deja la hoja de validación en Drive ("Videos YouTube Completos/Validación de personajes") y se le escribe por correo a mipequenoatlass@gmail.com (con dos "s", confirmada por el usuario).

## Correcciones pedidas por Vivi/Bibi (19-nov-2026)
- **Subtítulos:** Tokio y París se quedan con subtítulos quemados. Todos los demás capítulos van SIN subtítulos quemados y con el .srt aparte.
- **Rótulos:** ningún rótulo puede quedar detrás del encabezado fijo «Mi Pequeño Atlas · Capítulo N». `rLabel` fuerza ahora una posición mínima (y ≥ 118 + 0,95·tamaño).
- **Libros:** solo los capítulos 1-6 tienen libro. No mostrar libros de capítulos 7-12 (Ottawa, São Paulo…).
- Las versiones corregidas se suben a carpetas nuevas «Capítulo N - Ciudad (video en partes) v2», sin borrar las anteriores.
- Carpeta de entrega: «Videos YouTube Completos» (dentro de «Videos YouTube - Mi Pequeño Atlas»).

## Correcciones pedidas por Vivi/Bibi (21-nov-2026)
- **Música con derechos (Content ID):** Roma, Madrid, Santo Domingo y Berlín llevan de fondo la misma canción, que YouTube reclama. Se sustituye en todo el capítulo:
  1. Separar la voz con Demucs: `python3 -m demucs --repo models/htdemucs_ft -n htdemucs_ft --two-stems vocals -d cpu -o sep audio.wav` (los pesos están en `models/htdemucs_ft`, descargados del espejo de Hugging Face `dokodesuka/htdemucs_ft`).
  2. Crear música original: `tools/music_bed.py bed.wav SEGUNDOS`.
  3. Mezclar: `tools/replace_bed.py vocals.wav no_vocals.wav bed.wav salida.wav` (la música nueva sigue la envolvente de volumen de la original; la voz no se toca).
  4. El config apunta a `<ciudad>_v3.mp3`. Tokio, París, Ottawa y São Paulo usan otra música: pendiente de que Vivi confirme su origen.
- **Nuevo cierre común** (`scenes.cierre`, `tools/scenes_cierre.js`): logo de Mi Pequeño Atlas, «¡Escucha el podcast!» y las portadas reales de los libros publicados (Tokio, Roma, París y Santo Domingo, en `assets/libros/`). Sustituye a la escena de despedida y Vinelis queda abajo a la derecha (`stage: cierre [[1730, .62]]`). No nombrar Spotify ni otras marcas salvo que Vivi lo pida.
- **Cuentos en modo libro** (`book: {start, end}` en el config): libro abierto con la ilustración en la hoja izquierda y el texto del cuento en la derecha (la frase que se oye, resaltada), pasando página. Vinelis no sale mientras tanto.
- **Personas:** siempre con los dos ojos (de frente). Tamaños coherentes con la perspectiva: quien está junto a los edificios se ve pequeño y quien está delante mide como los personajes principales (`bePeople`).
- **Vinelis lleva zapatos** (`shoes()` en `vinelis_puppet.py`): rojos en Madrid y botas marrones en Berlín.
- Vinelis no se pone delante de los platos ni de sus rótulos: en las escenas de comida se oculta (`hide`).
- Los bocadillos de diálogo nunca tapan caras. Los objetos no pueden tener el mismo color que el fondo.
- Murales del Muro: cada panel es distinto (palomas, caras, manos, la Tierra, una puerta abierta, flores, FRIEDEN, FREIHEIT…), en el espíritu del East Side Gallery pero originales.
- Las entregas corregidas van a carpetas nuevas «… v3».
