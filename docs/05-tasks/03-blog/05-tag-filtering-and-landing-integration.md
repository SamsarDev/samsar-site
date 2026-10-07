# Tarea 05: Filtrado Dinámico por Etiquetas e Integración con la Portada

- **Fase:** 03 — Ecosistema del Blog
- **Estimación:** 35 minutos
- **Documentos de referencia:** [`docs/01-product/screens/04-blog.md`](../../01-product/screens/04-blog.md) · [`docs/01-product/screens/01-landing.md`](../../01-product/screens/01-landing.md) · [`docs/05-tasks/02-landing/04-featured-content.md`](../02-landing/04-featured-content.md)

---

## 1. Objetivo Pedagógico

Aprender a agregar y agrupar colecciones multidimensionales en Astro mediante `Set` de JavaScript para generar taxonomías dinámicas de etiquetas (`/blog/tags/[tag].astro`). Cerrarás el ciclo de integración desacoplado refactorizando la sección de publicaciones destacadas de la portada (`src/components/landing/FeaturedPosts.astro`) para reemplazar los mocks temporales de TypeScript por la colección real de datos generada en `src/content.config.ts`, garantizando una única fuente de verdad en toda la plataforma.

---

## 2. Criterios de Aceptación (DoD)

- [ ] Ruta dinámica `src/pages/blog/tags/[tag].astro` creada con `getStaticPaths()`, generando una página para cada tag único existente en los posts activos (`draft: false`).
- [ ] La página de etiqueta incluye cabecera con el tag resaltado, contador de artículos y botón para volver al catálogo general `/blog`.
- [ ] `src/components/landing/FeaturedPosts.astro` refactorizado para consumir `getCollection('blog')` filtrando por `featured: true` (o los 3 más recientes) en lugar del archivo mock `src/data/featuredPosts.ts`.
- [ ] Las tarjetas en la portada y en los índices enlazan de forma exacta y funcional a las rutas de los artículos.
- [ ] No existen enlaces rotos internos entre páginas de categoría, artículos, tags y portada.
- [ ] `bun run check` y `bun run build` compilan con cero errores y cero advertencias.

---

## 3. Paso a Paso Guiado

### Paso 1: Crear la ruta de etiquetas `src/pages/blog/tags/[tag].astro`

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../../layouts/BaseLayout.astro';
import PostCard from '../../../components/blog/PostCard.astro';
import Button from '../../../components/ui/Button.astro';

export async function getStaticPaths() {
  const allPosts = await getCollection('blog', ({ data }) => !data.draft);
  const uniqueTags = [...new Set(allPosts.flatMap((post) => post.data.tags))];

  return uniqueTags.map((tag) => {
    const filteredPosts = allPosts
      .filter((post) => post.data.tags.includes(tag))
      .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

    return {
      params: { tag },
      props: { posts: filteredPosts },
    };
  });
}

const { tag } = Astro.params;
const { posts } = Astro.props;
---

<BaseLayout title={`Artículos con etiqueta #${tag} | Blog Samsar`} description={`Publicaciones y guías etiquetadas con #${tag}`}>
  <main class="py-16">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="mb-12">
        <Button href="/blog" variant="ghost" size="sm" class="mb-6">
          ← Volver al blog
        </Button>
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium border border-[var(--accent-primary)]/30 bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] mb-3">
          <span>Etiqueta</span>
          <span>•</span>
          <span>{posts.length} {posts.length === 1 ? 'publicación' : 'publicaciones'}</span>
        </div>
        <h1 class="font-display text-4xl sm:text-5xl font-bold text-[var(--text-primary)]">
          #{tag}
        </h1>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard post={post} />
        ))}
      </div>
    </div>
  </main>
</BaseLayout>
```

### Paso 2: Refactorizar `src/components/landing/FeaturedPosts.astro`

Actualiza el componente para consultar la colección de contenido real de Astro en tiempo de compilación:

```astro
---
import { getCollection } from 'astro:content';
import PostCard from '../blog/PostCard.astro';
import Button from '../ui/Button.astro';

const allPosts = await getCollection('blog', ({ data }) => !data.draft);

const featured = allPosts
  .filter((post) => post.data.featured)
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
  .slice(0, 3);

const displayPosts = featured.length > 0
  ? featured
  : allPosts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()).slice(0, 3);
---

<section class="py-20 bg-[var(--bg-subtle)]/40 border-y border-[var(--border-base)]">
  <div class="max-w-6xl mx-auto px-4 sm:px-6">
    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
      <div>
        <p class="font-mono text-xs text-[var(--accent-primary)] uppercase tracking-wider mb-2">Cuaderno de campo</p>
        <h2 class="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">Publicaciones destacadas</h2>
      </div>
      <Button href="/blog" variant="ghost" size="sm">
        Ver todos los artículos →
      </Button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayPosts.map((post) => (
        <PostCard post={post} />
      ))}
    </div>
  </div>
</section>
```

### Paso 3: Retirar mocks obsoletos

Elimina o marca como obsoleto el archivo `src/data/featuredPosts.ts` para evitar duplicidad de fuentes de datos.

---

## 4. Comprobación y Verificación

1. Inicia `bun run dev` y visita la página de inicio (`/`). Verifica que las 3 tarjetas destacadas provengan de los posts reales y sus enlaces dirijan a `/blog/[slug]`.
2. Haz clic en una etiqueta desde un artículo o listado y comprueba que cargue `/blog/tags/[tag]` con el conteo y la cuadrícula correspondiente.
3. Ejecuta la validación estática y el build de producción:
   ```bash
   bun run check
   bun run build
   bun run preview
   ```
4. Navega en preview para certificar que no existan enlaces 404 ni parpadeos de carga.

---

## 5. Pistas Didácticas y Errores Comunes

- **`flatMap()` para extraer tags anidados:** Cada post tiene un array `tags: string[]`. Al usar `posts.flatMap(p => p.data.tags)` aplanas todos los arrays en una única lista que luego pasas a `new Set(...)` para eliminar duplicados de forma elegante y funcional.
- **Rutas sin publicaciones:** Al generar los paths a partir de los tags existentes en posts activos, nunca se generarán páginas de etiquetas huérfanas o vacías.
