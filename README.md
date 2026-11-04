# Nébula — Landing Page · Artista Digital

Página de presentación para la artista digital ficticia **Nébula**, especializada en paisajes espaciales y ciencia ficción. Proyecto desarrollado para el módulo de Diseño de Interfaces Web (DAW).

---

## Tabla de Recursos y Licencias

| Archivo | URL original / Procedencia | Tipo de Licencia |
|---------|---------------------------|------------------|
| `assets/img/hero.webp` | [Evgeni T — Pixabay](https://pixabay.com/photos/lake-reflection-evening-scotland-6099842/) | Pixabay Content License (libre para uso comercial y no comercial) |
| `assets/img/logo.webp` | Diseño propio de la artista "Nébula" | Creación propia / Dominio público |
| `assets/img/thumb1.webp` | [Geralt — Pixabay](https://pixabay.com/illustrations/space-satellite-orbit-681638/) | Pixabay Content License |
| `assets/img/thumb2.webp` | [MasterTux — Pixabay](https://pixabay.com/illustrations/ufo-extraterrestrial-alien-788746/) | Pixabay Content License |
| `assets/img/thumb3.webp` | [SteveBidmead — Pixabay](https://pixabay.com/illustrations/spacecraft-spaceship-rocket-441708/) | Pixabay Content License |
| `assets/img/poster.webp` | Fotograma extraído del vídeo de presentación | Pixabay Content License |
| `assets/img/cta-animation.webp` | Animación fotograma a fotograma creada para el botón CTA | Creación propia |
| `assets/video/presentacion.webm` | [Pixabay Video 230304](https://pixabay.com/videos/) | Pixabay Content License |
| `assets/video/presentacion2.mp4` | [Pixabay Video 230304](https://pixabay.com/videos/) | Pixabay Content License (fallback) |
| `assets/audio/ambient.ogg` | [the_mountain — Pixabay Music](https://pixabay.com/music/) | Pixabay Content License |
| `assets/audio/ambient.mp3` | [the_mountain — Pixabay Music](https://pixabay.com/music/) | Pixabay Content License (fallback) |

---

## Justificación Técnica de Formatos

* **Imágenes estáticas (`.webp` frente a `.jpg` o `.png`):**
  WebP proporciona algoritmos de compresión predictiva superiores tanto en modalidades con pérdida (*lossy*) como sin pérdida (*lossless*). Permite reducir el peso entre un 25% y un 35% respecto a JPEG manteniendo la misma calidad visual, y soporta canal alfa (transparencia), eliminando la necesidad de pesados archivos PNG. Además, cuenta con soporte nativo en todos los navegadores web actuales.

* **Logotipo (`.webp` / justificación técnica de `.svg`):**
  Para entornos web de producción, el formato óptimo para un logotipo vectorial es **SVG** (Scalable Vector Graphics), ya que al basarse en código XML y vectores matemáticos es infinitamente escalable a cualquier densidad de pantalla (Retina, 4K) sin pérdida de nitidez y con un peso mínimo en bytes. Al disponer en este caso de un recurso rasterizado con iluminación y degradados complejos, se procesó a WebP con transparencia y modo de fusión (*mix-blend-mode*) para integrarlo de forma fluida con el tema oscuro.

* **Animación Call to Action (`.webp animado` frente a `.gif`):**
  WebP animado admite color real de 24 bits con canal alfa de 8 bits (a diferencia de la paleta limitada a 256 colores y transparencia binaria de GIF). Ofrece una tasa de compresión drásticamente mayor (apenas 7 KB frente a los 50-100 KB de un GIF equivalente), optimizando el rendimiento de carga y el consumo de datos (WPO).

* **Vídeo (`.webm` con códec VP9 frente a `.mp4` / `.avi`):**
  WebM es un formato contenedor abierto concebido específicamente para la web, respaldado por el consorcio WebM y la W3C. Junto con el códec de vídeo VP9, ofrece una eficiencia de compresión notablemente superior al códec H.264 tradicional a resoluciones HD (720p), reduciendo el archivo a ~1.4 MB (muy por debajo del límite de 3 MB). Se conserva una copia en MP4 (H.264) como recurso alternativo (*fallback*) para garantizar compatibilidad con navegadores antiguos.

* **Audio (`.ogg` con códec Opus frente a `.mp3` / `.wav`):**
  El códec libre Opus dentro de un contenedor OGG supera ampliamente a MP3 en fidelidad espectral y respuesta a frecuencias complejas con una tasa de bits de 128 kbps. El audio se recortó a 15 segundos exactos con transiciones suaves (*fade-in* y *fade-out* de 2 segundos) para evitar cortes abruptos y sobrecarga de transferencia. Se mantiene MP3 como opción de reserva para clientes incompatibles.

---

## Herramientas Utilizadas

1. **FFmpeg 9.0.2:**
   - Redimensionado y compresión de la imagen principal `hero.webp` a 1920×1080 px manteniendo aspect ratio y con peso final de 150 KB (< 250 KB).
   - Generación de miniaturas de galería de 400×250 px (`thumb1.webp`, `thumb2.webp`, `thumb3.webp`) con pesos inferiores a 20 KB.
   - Transcodificación del vídeo a WebM (VP9, ~1.4 MB) y extracción del fotograma clave para `poster.webp` (46 KB).
   - Recorte de audio ambiental a 15.00 segundos exactos aplicando filtros de fundido de entrada y salida (`afade=t=in:ss=0:d=2,afade=t=out:st=13:d=2`) y codificación a Opus 128 kbps.

2. **Python 3.14 + Pillow:**
   - Creación fotograma a fotograma (4 frames) del sobre con efecto de iluminación neón en cian y violeta, y ensamblado en bucle continuo de `cta-animation.webp` (7.1 KB).

3. **Editor de código (VS Code):**
   - Maquetación y estructura semántica HTML5 (`<header>`, `<main>`, `<section>`, `<figure>`, `<figcaption>`, `<footer>`).
   - Hoja de estilos `dark.css` con variables CSS (`:root`), diseño adaptable y paleta cian (`#00f2fe`).

---

## Estructura de Producción

```
/
├── index.html
├── README.md
├── css/
│   └── dark.css
└── assets/
    ├── img/
    │   ├── hero.webp           (1920×1080, 150 KB)
    │   ├── logo.webp           (64×64, integrado)
    │   ├── poster.webp         (miniatura de precarga de vídeo)
    │   ├── cta-animation.webp  (animación WebP en bucle, 7 KB)
    │   ├── thumb1.webp         (400×250, 11 KB)
    │   ├── thumb2.webp         (400×250, 18 KB)
    │   └── thumb3.webp         (400×250, 6 KB)
    ├── video/
    │   ├── presentacion.webm   (VP9, 1.4 MB)
    │   └── presentacion2.mp4   (fallback H.264)
    └── audio/
        ├── ambient.ogg         (Opus, 15s fade in/out, 250 KB)
        └── ambient.mp3         (fallback MP3, 15s fade in/out, 353 KB)
```

---

## Despliegue en GitHub Pages

1. Subir los cambios a la rama principal del repositorio (`main`).
2. En GitHub, acceder a **Settings** > **Pages**.
3. En la sección **Build and deployment**, seleccionar **Branch: main** y la carpeta `/ (root)`.
4. Guardar los cambios. El sitio web se publicará automáticamente en la URL pública: `https://<usuario>.github.io/<repositorio>/`.
