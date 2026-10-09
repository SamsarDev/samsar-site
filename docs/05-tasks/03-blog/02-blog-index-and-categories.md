# Tarea 02: Catálogo General del Blog y Páginas de Categoría

- **Fase:** 03 — Ecosistema del Blog
- **Estimación:** 40 minutos
- **Documentos de referencia:** [`docs/01-product/screens/04-blog.md`](../../01-product/screens/04-blog.md) · [`docs/03-design/components/03-content.md`](../../03-design/components/03-content.md) · [`docs/03-design/01-tokens.md`](../../03-design/01-tokens.md)

---

## 1. Objetivo Pedagógico

Aprender a consultar, filtrar y ordenar colecciones de contenido en Astro usando `getCollection('blog')`. Construirás la tarjeta de artículo reutilizable `<PostCard.astro>` con acentos cromáticos dinámicos según el pilar cultural del post (Jade para Dev, Colibrí para IA y Cinabrio para Games), el encabezado contextual `<CategoryHero.astro>`, el catálogo general `/blog` con selector de categorías y las rutas dedicadas por categoría usando `getStaticPaths()`.

---

## 2. Criterios de Aceptación (DoD)

- [ ] Existe `src/components/blog/PostCard.astro` que recibe una entrada tipada `post` de la colección `blog`, renderiza su categoría con el token de acento correspondiente, título H3 en Space Grotesk, descripción, fecha formateada en español, tiempo de lectura calculado y tags en chips.
- [ ] Existe `src/components/blog/CategoryHero.astro` con título H1, manifiesto editorial, acento visual temático y conteo de publicaciones activas.
- [ ] Existe `src/components/blog/Pagination.astro` con soporte para botones *"Anterior"* y *"Siguiente"* accesibles por teclado.
- [ ] Existe la página del catálogo general `src/pages/blog/index.astro` con selector de categorías activo y listado ordenado cronológicamente por `pubDate` descendente (filtrando borradores `draft: true`).
- [ ] Existen las rutas de categoría `/blog/samsar-dev`, `/blog/samsar-ia` y `/blog/samsar-games` implementadas mediante `src/pages/blog/[category]/index.astro` (o rutas equivalentes) con `getStaticPaths()`.
- [ ] El contraste cromático de los badges de categoría cumple WCAG AA en temas claro y oscuro.
- [ ] `bun run check` y `bun run build` compilan sin errores.

---

## 3. Paso a Paso Guiado

### Paso 1: Crear `src/components/blog/PostCard.astro`

Crea la tarjeta de presentación asegurando que el slug se resuelva adecuadamente hacia `/blog/${post.id}`:

```astro
---
import type { CollectionEntry } from 'astro:content';
import Card from '../ui/Card.astro';
import Chip from '../ui/Chip.astro';
import { formatDate } from '../../utils/formatDate';
import { calculateReadingTime } from '../../utils/readingTime';

interface Props {
  post: CollectionEntry<'blog'>;
}

const { post } = Astro.props;
const { title, description, pubDate, category, tags } = post.data;

const categoryMeta = {
  'samsar-dev': { label: 'Samsar|Dev', colorClass: 'text-[var(--color-jade)] border-[var(--color-jade)]/30 bg-[var(--color-jade)]/10' },
  'samsar-ia': { label: 'Samsar|IA', colorClass: 'text-[var(--color-hummingbird)] border-[var(--color-hummingbird)]/30 bg-[var(--color-hummingbird)]/10' },
  'samsar-games': { label: 'Samsar|Games', colorClass: 'text-[var(--color-blood)] border-[var(--color-blood)]/30 bg-[var(--color-blood)]/10' },
}[category];

const readingTime = calculateReadingTime(post.body || '');
---

<Card variant="interactive" class="flex flex-col justify-between h-full group">
  <div>
    <div class="flex items-center justify-between gap-2 mb-3">
      <span class:list={["text-xs font-mono font-medium px-2 py-0.5 rounded-full border", categoryMeta.colorClass]}>
        {categoryMeta.label}
      </span>
      <time datetime={pubDate.toISOString()} class="text-xs text-[var(--text-muted)] font-mono">
        {formatDate(pubDate)}
      </time>
    </div>

    <h3 class="font-display text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors mb-2">
      <a href={`/blog/${post.id}`} class="focus-visible:outline-none focus-visible:underline">
        {title}
      </a>
    </h3>

    <p class="text-sm text-[var(--text-secondary)] line-clamp-2 mb-4 leading-relaxed">
      {description}
    </p>
  </div>

  <div class="pt-4 border-t border-[var(--border-base)]/50 flex items-center justify-between text-xs text-[var(--text-muted)] font-mono">
    <span>{readingTime}</span>
    <div class="flex flex-wrap gap-1">
      {tags.slice(0, 2).map((tag) => (
        <Chip variant="stack">{tag}</Chip>
      ))}
    </div>
  </div>
</Card>
```

### Paso 2: Crear `src/components/blog/CategoryHero.astro`

```astro
---
interface Props {
  category: 'samsar-dev' | 'samsar-ia' | 'samsar-games';
  count: number;
}

const { category, count } = Astro.props;

const info = {
  'samsar-dev': {
    title: 'Samsar|Dev',
    accentVar: 'var(--color-jade)',
    description: 'Guías de desarrollo, manuales de arquitectura, patrones de diseño y notas de ingeniería de software.',
  },
  'samsar-ia': {
    title: 'Samsar|IA',
    accentVar: 'var(--color-hummingbird)',
    description: 'Exploraciones sobre IA generativa, LLMs, sistemas multi-agente, RAG y Model Context Protocol (MCP).',
  },
  'samsar-games': {
    title: 'Samsar|Games',
    accentVar: 'var(--color-blood)',
    description: 'Desarrollo de videojuegos, pedagogía lúdica y gameplays formativos compartidos en familia.',
  },
}[category];
---

<header class="py-12 border-b border-[var(--border-base)]">
  <div class="max-w-4xl mx-auto px-4 sm:px-6">
    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium border mb-4"
         style={`color: ${info.accentVar}; border-color: ${info.accentVar}33; background-color: ${info.accentVar}15;`}>
      <span>Pilar Temático</span>
      <span>•</span>
      <span>{count} {count === 1 ? 'artículo' : 'artículos'}</span>
    </div>
    <h1 class="font-display text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mb-4">
      {info.title}
    </h1>
    <p class="text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl">
      {info.description}
    </p>
  </div>
</header>
```

### Paso 3: Crear `src/components/blog/Pagination.astro`

Crea el componente para navegación secuencial si se usa paginación estática o enlaces de lote:
```astro
---
import Button from '../ui/Button.astro';

interface Props {
  prevUrl?: string;
  nextUrl?: string;
  currentPage?: number;
  totalPages?: number;
}

const { prevUrl, nextUrl, currentPage, totalPages } = Astro.props;
---

{(prevUrl || nextUrl) && (
  <nav aria-label="Paginación de artículos" class="flex items-center justify-between pt-10">
    <div>
      {prevUrl ? (
        <Button href={prevUrl} variant="secondary" size="sm">← Anteriores</Button>
      ) : <span />}
    </div>
    {currentPage && totalPages && (
      <span class="text-xs font-mono text-[var(--text-muted)]">
        Página {currentPage} de {totalPages}
      </span>
    )}
    <div>
      {nextUrl ? (
        <Button href={nextUrl} variant="secondary" size="sm">Siguientes →</Button>
      ) : <span />}
    </div>
  </nav>
)}
```

### Paso 4: Implementar `src/pages/blog/index.astro` y rutas de categoría

En `src/pages/blog/index.astro`, obtén los posts con `getCollection('blog', ({ data }) => !data.draft)`, ordénalos por `pubDate` y renderiza la botonera de categorías y la lista de `<PostCard />`.

En `src/pages/blog/[category]/index.astro`, usa `getStaticPaths()` retornando los 3 pilares (`samsar-dev`, `samsar-ia`, `samsar-games`), filtrando los posts correspondientes y renderizando `<CategoryHero />` seguido de la cuadrícula.

---

## 4. Comprobación y Verificación

1. Inicia el servidor de desarrollo: `bun run dev`.
2. Visita `/blog` y comprueba que se listen los 3 posts ordenados cronológicamente con sus tags y tiempos de lectura.
3. Haz clic en el filtro o navega a `/blog/samsar-dev` y verifica que solo aparezca el post de esa categoría con el héroe temático y acento Jade.
4. Repite para `/blog/samsar-ia` (acento Turquesa Colibrí) y `/blog/samsar-games` (acento Cinabrio).
5. Ejecuta:
   ```bash
   bun run check && bun run build
   ```

---

## 5. Pistas Didácticas y Errores Comunes

- **Identificador de posts en Content Layer (`post.id` vs `post.slug`):** En Astro 7 Content Layer API, el identificador principal generado por el cargador `glob` es `post.id` (que contiene la ruta relativa sin extensión). Asegúrate de enlazar con `post.id`.
- **Filtro de borradores:** Recuerda siempre filtrar `draft: false` en producción para que los artículos en borrador no sean indexados prematuramente.
