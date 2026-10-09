# Tarea 04: Página de Lectura de Artículo Individual (`/blog/[...slug].astro`)

- **Fase:** 03 — Ecosistema del Blog
- **Estimación:** 40 minutos
- **Documentos de referencia:** [`docs/01-product/screens/04-blog.md`](../../01-product/screens/04-blog.md) · [`docs/03-design/components/03-content.md`](../../03-design/components/03-content.md) · [`docs/07-decisions/0009-astro-content-layer-api.md`](../../07-decisions/0009-astro-content-layer-api.md)

---

## 1. Objetivo Pedagógico

Aprender el ciclo de renderizado de contenido en **Astro 7 con el Content Layer API**. Comprenderás cómo generar todas las páginas estáticas del blog en tiempo de compilación con `getStaticPaths()`, cómo compilar el cuerpo de Markdown/MDX a componentes Astro utilizando `render(post)` y extraer sus `headings`, y cómo enriquecer la experiencia de usuario con navegación secuencial cronológica (`<PostNavigation.astro>`) y un algoritmo simple de recomendación contextual (`<RelatedPosts.astro>`).

---

## 2. Criterios de Aceptación (DoD)

- [ ] Ruta dinámica creada en `src/pages/blog/[...slug].astro` consumiendo `getCollection('blog')` en `getStaticPaths()`.
- [ ] Renderizado del cuerpo del post mediante `const { Content, headings } = await render(post)`.
- [ ] Cabecera de artículo con título H1 único, descripción, chip de categoría, fecha legible en español, tiempo de lectura y tags al pie.
- [ ] Existe `src/components/blog/PostNavigation.astro` enlazando secuencialmente al artículo anterior y siguiente en orden cronológico.
- [ ] Existe `src/components/blog/RelatedPosts.astro` recomendando hasta 3 artículos afines de la misma categoría o con tags compartidos (omitiendo el post actual).
- [ ] Artículos `.mdx` pueden invocar componentes importados (ej. `<Callout />`) sin errores.
- [ ] `bun run check` y `bun run build` compilan sin errores.

---

## 3. Paso a Paso Guiado

### Paso 1: Crear `src/components/blog/PostNavigation.astro`

```astro
---
import type { CollectionEntry } from 'astro:content';
import Card from '../ui/Card.astro';

interface Props {
  prevPost?: CollectionEntry<'blog'>;
  nextPost?: CollectionEntry<'blog'>;
}

const { prevPost, nextPost } = Astro.props;
---

{(prevPost || nextPost) && (
  <nav aria-label="Navegación entre artículos" class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-12 pt-8 border-t border-[var(--border-base)]">
    <div>
      {prevPost ? (
        <a href={`/blog/${prevPost.id}`} class="block group h-full">
          <Card variant="interactive" class="h-full">
            <span class="text-xs font-mono text-[var(--text-muted)] block mb-1">← Artículo anterior</span>
            <span class="font-display font-bold text-sm text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors line-clamp-2">
              {prevPost.data.title}
            </span>
          </Card>
        </a>
      ) : <div />}
    </div>
    <div>
      {nextPost ? (
        <a href={`/blog/${nextPost.id}`} class="block group h-full text-right sm:text-left">
          <Card variant="interactive" class="h-full">
            <span class="text-xs font-mono text-[var(--text-muted)] block mb-1">Siguiente artículo →</span>
            <span class="font-display font-bold text-sm text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors line-clamp-2">
              {nextPost.data.title}
            </span>
          </Card>
        </a>
      ) : <div />}
    </div>
  </nav>
)}
```

### Paso 2: Crear `src/components/blog/RelatedPosts.astro`

```astro
---
import type { CollectionEntry } from 'astro:content';
import PostCard from './PostCard.astro';

interface Props {
  posts: CollectionEntry<'blog'>[];
}

const { posts } = Astro.props;
---

{posts.length > 0 && (
  <section class="mt-16 pt-12 border-t border-[var(--border-base)]">
    <h2 class="font-display text-2xl font-bold text-[var(--text-primary)] mb-6">
      Lecturas recomendadas
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostCard post={post} />
      ))}
    </div>
  </section>
)}
```

### Paso 3: Crear `src/pages/blog/[...slug].astro`

```astro
---
import { getCollection, render } from 'astro:content';
import BlogLayout from '../../layouts/BlogLayout.astro';
import PostNavigation from '../../components/blog/PostNavigation.astro';
import RelatedPosts from '../../components/blog/RelatedPosts.astro';
import Chip from '../../components/ui/Chip.astro';
import { formatDate } from '../../utils/formatDate';
import { calculateReadingTime } from '../../utils/readingTime';

export async function getStaticPaths() {
  const posts = (await getCollection('blog', ({ data }) => !data.draft))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return posts.map((post, index) => {
    const nextPost = index > 0 ? posts[index - 1] : undefined;
    const prevPost = index < posts.length - 1 ? posts[index + 1] : undefined;

    const related = posts
      .filter((p) => p.id !== post.id && (p.data.category === post.data.category || p.data.tags.some((t) => post.data.tags.includes(t))))
      .slice(0, 3);

    return {
      params: { slug: post.id },
      props: { post, prevPost, nextPost, related },
    };
  });
}

const { post, prevPost, nextPost, related } = Astro.props;
const { Content, headings } = await render(post);
const { title, description, pubDate, category, tags } = post.data;
const readingTime = calculateReadingTime(post.body || '');
---

<BlogLayout
  title={title}
  description={description}
  headings={headings}
  category={category}
  pubDate={pubDate}
>
  <header class="mb-8 pb-6 border-b border-[var(--border-base)]">
    <div class="flex items-center gap-3 text-xs font-mono text-[var(--text-muted)] mb-3">
      <time datetime={pubDate.toISOString()}>{formatDate(pubDate)}</time>
      <span>•</span>
      <span>{readingTime}</span>
    </div>
    <h1 class="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] leading-tight mb-4">
      {title}
    </h1>
    <p class="text-lg text-[var(--text-secondary)] leading-relaxed">
      {description}
    </p>
  </header>

  <div class="prose max-w-none text-[var(--text-primary)]">
    <Content />
  </div>

  <footer class="mt-12 pt-6 border-t border-[var(--border-base)]">
    <div class="flex flex-wrap items-center gap-2">
      <span class="text-xs font-mono text-[var(--text-muted)]">Etiquetas:</span>
      {tags.map((tag) => (
        <a href={`/blog/tags/${tag}`} class="focus-visible:outline-none">
          <Chip variant="stack">#{tag}</Chip>
        </a>
      ))}
    </div>
  </footer>

  <PostNavigation prevPost={prevPost} nextPost={nextPost} />
  <RelatedPosts posts={related} />
</BlogLayout>
```

---

## 4. Comprobación y Verificación

1. Inicia `bun run dev` y visita cada una de las 3 publicaciones semilla:
   - `/blog/samsar-dev/guia-clean-architecture-frontend`
   - `/blog/samsar-ia/primeros-pasos-sistemas-multi-agente`
   - `/blog/samsar-games/diseno-ludico-pedagogia-con-mi-hijo`
2. Comprueba que el TOC lateral liste los títulos H2 y H3 y que al hacer click se desplace hacia la sección anclada.
3. Comprueba que la navegación inferior apunte a los artículos contiguos correctos.
4. Ejecuta:
   ```bash
   bun run check && bun run build
   ```

---

## 5. Pistas Didácticas y Errores Comunes

- **`render()` en Astro 7:** En versiones anteriores se usaba `await post.render()`. En Astro 7 con Content Layer API, se importa `render` de `astro:content` y se invoca como `await render(post)`.
- **Ruta comodín `[...slug]`:** Permite capturar rutas con subdirectorios anidados como `samsar-dev/guia-clean-architecture-frontend` preservando la estructura de carpetas de origen.
