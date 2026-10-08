# Tarea 02: SEO, RSS, Sitemap y Cabeceras Edge

- **Fase:** 06 — Producción, SEO y Despliegue
- **Estimación:** 35 minutos
- **Documentos de referencia:** [`docs/02-architecture/05-deployment.md`](../../02-architecture/05-deployment.md) · [`docs/01-product/screens/05-contact-and-utilities.md`](../../01-product/screens/05-contact-and-utilities.md)

---

## 1. Objetivo Pedagógico

Aprender a preparar una aplicación web para producción e indexación profesional en motores de búsqueda y agregadores de contenido. Configurarás la sindicación mediante RSS 2.0 con `@astrojs/rss`, la generación automática de sitemap con `@astrojs/sitemap`, directivas para rastreadores en `robots.txt`, metadatos OpenGraph para previsualizaciones en redes sociales y cabeceras de caché HTTP para la red Anycast de Cloudflare Pages.

---

## 2. Criterios de Aceptación (DoD)

- [ ] Dependencias oficiales `@astrojs/rss` y `@astrojs/sitemap` instaladas.
- [ ] Integración `sitemap()` registrada en `astro.config.mjs`.
- [ ] Endpoint `src/pages/rss.xml.ts` implementado, sindicando todos los artículos publicados del blog en `/rss.xml`.
- [ ] Archivo `public/robots.txt` creado con directivas que permiten indexación e indican la URL del sitemap.
- [ ] Archivo `public/_headers` creado con directivas de caché optimizadas para Cloudflare Pages (inmutables para `/_astro/*` y `/fonts/*`, revalidación para HTML y 1 hora para RSS).
- [ ] `src/layouts/BaseLayout.astro` actualizado con etiquetas OpenGraph, Twitter Cards, URL canónica y link alternativo al feed RSS.
- [ ] `bun run check` y `bun run build` pasan con 0 errores y 0 advertencias, generando `/rss.xml` y `/sitemap-index.xml`.

---

## 3. Paso a Paso Guiado

### Paso 1: Instalar dependencias oficiales

Instala las integraciones aprobadas utilizando Bun:

```bash
bun add @astrojs/rss @astrojs/sitemap
```

### Paso 2: Registrar `sitemap()` en `astro.config.mjs`

Importa y añade `sitemap()` en la lista de integraciones:

```javascript
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://samsar.dev',
  output: 'static',
  integrations: [vue(), mdx(), sitemap()],
  // ...
});
```

### Paso 3: Crear el endpoint `src/pages/rss.xml.ts`

Genera el feed RSS consultando la colección del blog:

```typescript
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = await getCollection('blog');
  const sortedPosts = posts.sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );

  return rss({
    title: 'Samsar | Código, cultura y curiosidad',
    description: 'Cuaderno técnico sobre arquitectura limpia, inteligencia artificial agéntica y pedagogía.',
    site: context.site?.toString() || 'https://samsar.dev',
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.id}/`,
    })),
    customData: '<language>es-GT</language>',
  });
}
```

### Paso 4: Crear `public/robots.txt` y `public/_headers`

Crea `public/robots.txt`:

```text
User-agent: *
Allow: /

Sitemap: https://samsar.dev/sitemap-index.xml
```

Crea `public/_headers` con las reglas de caché de borde de Cloudflare Pages:

```text
/_astro/*
  Cache-Control: public, max-age=31536000, immutable

/fonts/*
  Cache-Control: public, max-age=31536000, immutable
  Access-Control-Allow-Origin: *

/*.html
  Cache-Control: public, max-age=0, must-revalidate

/rss.xml
  Cache-Control: public, max-age=3600, must-revalidate
```

### Paso 5: Metadatos OpenGraph en `BaseLayout.astro`

Añade en el `<head>` de `src/layouts/BaseLayout.astro` las etiquetas canónicas, OpenGraph, Twitter Card y el enlace de autodescubrimiento para el RSS.

---

## 4. Comprobación y Verificación

1. Ejecuta la compilación de producción:
   ```bash
   bun run check
   bun run build
   ```
2. Inspecciona la carpeta `dist/`: comprueba que existan `dist/rss.xml`, `dist/sitemap-index.xml`, `dist/robots.txt` y `dist/_headers`.
3. Inicia `bun run preview` y abre en el navegador `http://localhost:4321/rss.xml` para validar el XML del feed.
