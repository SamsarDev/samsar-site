# Tarea 06: Crear el Asset Open Graph Ausente (`public/og-image.png`)

- **Fase:** 07 — Mantenimiento
- **Estimación:** 45 minutos (incluye la decisión de diseño)
- **Documentos de referencia:** [`src/layouts/BaseLayout.astro`](../../../src/layouts/BaseLayout.astro) · [`DESIGN.md`](../../../DESIGN.md) · [`docs/02-architecture/04-performance.md`](../../02-architecture/04-performance.md) · [`docs/03-design/01-tokens.md`](../../03-design/01-tokens.md)

---

## 1. Objetivo Pedagógico

Descubrir que **un build verde no garantiza que los enlaces funcionen**. Astro copia `public/` tal cual, sin validar su contenido: si una etiqueta `meta` apunta a un archivo que no existe, el sitio compila sin una sola advertencia y el fallo solo se manifiesta cuando alguien comparte el enlace y aparece una tarjeta sin imagen. Auditar los activos que el HTML *promete* —no solo los que existen— es el aprendizaje central.

---

## 2. Hallazgos ya verificados (punto de partida)

- `src/layouts/BaseLayout.astro` línea 15: `ogImage = '/og-image.png'` es el valor por defecto de la prop.
- Líneas 41 y 47: `og:image` y `twitter:image` se construyen con `new URL(ogImage, canonicalURL)`.
- `public/` contiene `favicon.svg`, `robots.txt`, `_headers`, `fonts/` y `cv-samuel-sarmientos.pdf`. **No contiene `og-image.png`.**
- **Ninguna página pasa `ogImage`**, así que todas las rutas del sitio apuntan al archivo ausente.
- Los esquemas de blog y proyectos declaran un campo `cover` (`src/content.config.ts`, líneas 14 y 32) que hoy **no** se conecta con `ogImage`: no hay imagen por artículo.
- **La especificación de la imagen no está definida** en la documentación de trabajo. El único rastro es histórico (`docs/99-reference/DESIGN-v1.1.md`, "Open Graph | Símbolo + tagline"), y esa carpeta no se usa para implementar. Este dato hay que decidirlo aquí y dejarlo escrito.
- `docs/02-architecture/02-project-structure.md` §1 **sí** lista `og-image.png` en el árbol: documenta un archivo que no existe. Coordina con la [tarea 01](01-sync-project-structure.md) (ver §4, paso 5).

---

## 3. Criterios de Aceptación (DoD)

- [ ] `public/og-image.png` existe y cumple la especificación que tú definas y **escribas** en el propio resumen de la tarea (contenido, dimensiones, peso).
- [ ] Dimensiones **1200×630 px**, el estándar de facto para Open Graph, salvo que elijas otra proporción y expliques por qué.
- [ ] **Peso acotado.** `docs/02-architecture/04-performance.md` no fija presupuesto para imágenes, así que fija tú un límite explícito (por ejemplo, ≤ 300 KB), anótalo y cúmplelo. Recuerda que un archivo en `public/` **no pasa por la optimización de Astro**: su peso es responsabilidad tuya.
- [ ] Respeta la identidad visual: paleta y tipografías del proyecto, sin Google Fonts, sin emojis y sin iconografía estereotipada (`AGENTS.md` §8). Debe leerse como miniatura: **un solo mensaje, texto grande**, contraste AA.
- [ ] El HTML generado apunta a una URL que responde: verificado sobre `dist/` tras el build (ver §5).
- [ ] `docs/02-architecture/02-project-structure.md` vuelve a incluir `public/og-image.png` en su árbol si la [tarea 01](01-sync-project-structure.md) ya lo había eliminado (ver §4, paso 5).
- [ ] **No se añaden dependencias** al proyecto para generar la imagen.
- [ ] Si decides conectar el campo `cover` de los posts con `ogImage` (imagen distinta por artículo), eso es **código**: ábrelo como tarea aparte y no lo mezcles aquí.

---

## 4. Paso a Paso Guiado

### Paso 1: Confirmar el hueco

```bash
ls public/og-image.png        # debe fallar
grep -rn "ogImage\|og:image" src/
```

Comprueba por tu cuenta que el valor por defecto es `/og-image.png` y que ninguna página lo sobreescribe.

### Paso 2: Decidir la especificación

Antes de dibujar nada, escribe qué va a contener la imagen. Un patrón habitual y suficiente: símbolo o motivo de marca, el nombre **Samsar**, el tagline *"Código, cultura y curiosidad"* y, si sobra espacio, el dominio. Evita capturas de pantalla y párrafos: a 200 px de ancho no se leen.

### Paso 3: Generarla

Usa la herramienta de diseño que prefieras (editor gráfico o el generador de imágenes de tu agente). **No instales nada en el proyecto por esto.** Exporta a PNG a 1200×630 y revisa el peso.

### Paso 4: Colocarla en su sitio

Guarda el archivo como `public/og-image.png`. La ruta del `meta` es absoluta (`/og-image.png`), así que se resolverá contra el dominio que declare `site` en `astro.config.mjs` — hoy el temporal `samsar-site.pages.dev`, mañana `samsar.dev`. **No hay nada que cambiar aquí** cuando llegue el dominio propio.

### Paso 5: Cuadrar el árbol de estructura

Si la [tarea 01](01-sync-project-structure.md) ya se ejecutó, eliminó `public/og-image.png` del árbol porque no existía. Vuelve a añadirlo: ahora sí existe. Si ejecutas esta tarea primero, deja que la 01 lo encuentre.

### Paso 6: Dejar constancia

Anota en el resumen de la tarea: dimensiones, peso final, qué texto lleva y que `04-performance.md` no define presupuesto de imágenes (dato útil para la próxima vez que alguien pregunte).

---

## 5. Comprobación y Verificación

1. Compila (si tu entorno lo permite; ver la intermitencia conocida en [`00-INDEX.md`](00-INDEX.md) §3):

   ```bash
   bun run build
   ```

2. Comprueba que el archivo llega al build y que el HTML lo referencia:

   ```bash
   ls -la dist/og-image.png
   grep -o 'og:image" content="[^"]*"' dist/index.html
   ```

3. Comprueba que la URL **responde de verdad**, que es lo que nunca hizo el build:

   ```bash
   bun run preview
   # en otra terminal:
   curl -I http://localhost:4321/og-image.png
   ```

   Debe devolver `200` y un `Content-Type` de imagen. Un `404` aquí es exactamente el fallo que esta tarea elimina.

4. Revisa dimensiones y peso del PNG exportado y confirma que cumplen lo que prometiste en el paso 6.

5. Prueba mental (o real) de miniatura: reduce la imagen al tamaño de una tarjeta de LinkedIn y comprueba que el mensaje principal se lee.

---

## 6. Pistas Didácticas y Errores Comunes

- **¿Por qué el build no falla?** `public/` se copia literalmente a `dist/`. Astro no inspecciona las rutas que escribes en `meta` ni en atributos `src`: no hay validación posible, porque para el compilador son cadenas de texto.
- **¿Por qué importa si el sitio "se ve bien"?** La imagen Open Graph solo se usa al compartir el enlace (LinkedIn, X, WhatsApp, Slack). El visitante normal no la ve, así que el fallo pasa desapercibido durante meses: es un defecto invisible desde dentro.
- **`public/` frente a `src/assets/`:** lo que vive en `public/` se sirve sin transformar; lo que vive en `src/assets/` pasa por el componente `<Image>` de `astro:assets`, que convierte a WebP/AVIF y calcula `srcset` (ver `04-performance.md` §2.2). Para una imagen social **no** quieres esa transformación: los rastreadores esperan un archivo estable y predecible, así que `public/` es la decisión correcta. Es la excepción que confirma la regla.
- **Formato:** PNG o JPEG son la apuesta segura. WebP y AVIF ya tienen soporte amplio, pero si dudas, PNG no falla nunca.
- **Cabeceras:** `public/_headers` define caché para `/_astro/*`, `/fonts/*`, `/*.html` y `/rss.xml`, pero **nada** para `/og-image.png`. Hereda el comportamiento por defecto de Cloudflare. Si quieres cachearla un año, esa es la línea que falta — y es una decisión aparte, no la incluyas sin pensarla.
- **No confundas esta tarea con SEO completo:** las etiquetas ya están escritas y son correctas. Lo único que falta es el archivo que prometen.
