# Tarea 04: Publicaciones Destacadas y Proyectos Recientes

- **Fase:** 02 — Landing Page y Átomos de UI
- **Estimación:** 35 minutos
- **Documentos de referencia:** [`docs/01-product/screens/01-landing.md`](../../01-product/screens/01-landing.md) · [`docs/03-design/components/01-ui.md`](../../03-design/components/01-ui.md) · [`docs/03-design/components/03-content.md`](../../03-design/components/03-content.md)

---

## 1. Objetivo Pedagógico

Aprender a diseñar **componentes de presentación desacoplados de la capa de datos**, utilizando datos simulados (mocks) fuertemente tipados en TypeScript. Esto permite desarrollar y afinar la interfaz visual de las tarjetas de blog (`PostCard`) y proyectos (`ProjectCard`) antes de introducir la complejidad de las Content Collections en las fases subsiguientes.

---

## 2. Criterios de Aceptación (DoD)

- [ ] Existen `src/data/featuredPosts.ts` y `src/data/recentProjects.ts` con tipos de TypeScript claros y 3 elementos de ejemplo cada uno.
- [ ] Existe `src/components/blog/PostCard.astro` que renderiza título, sinopsis, tag de categoría, tiempo estimado de lectura y enlace accesible.
- [ ] Existe `src/components/landing/FeaturedPosts.astro` mostrando el grid de los 3 posts destacados y un botón para ver el archivo completo (`/blog`).
- [ ] Existe `src/components/landing/RecentProjects.astro` mostrando los 3 proyectos recientes con sus chips de stack tecnológico (`Chip.astro`) y badges de estado (`Badge.astro`).
- [ ] `bun run check` y `bun run build` pasan sin errores ni advertencias de tipos.

---

## 3. Paso a Paso Guiado

### Paso 1: Crear los mocks tipados en `src/data/`

Crea `src/data/featuredPosts.ts`:
```typescript
export interface MockPost {
  title: string;
  slug: string;
  description: string;
  category: 'dev' | 'ia' | 'games';
  readingTime: string;
  publishDate: string;
}

export const featuredPosts: MockPost[] = [
  {
    title: 'Clean Architecture en Frontend: Separando Dominio de UI',
    slug: 'clean-architecture-frontend',
    description: 'Cómo desacoplar reglas de negocio de los frameworks web sin sobreingeniería.',
    category: 'dev',
    readingTime: '6 min',
    publishDate: 'Oct 2026',
  },
  {
    title: 'Construyendo Agentes Autónomos con Memoria Persistente',
    slug: 'agentes-autonomos-memoria',
    description: 'Técnicas de orquestación, compresión de contexto y persistencia con Engram.',
    category: 'ia',
    readingTime: '8 min',
    publishDate: 'Oct 2026',
  },
  {
    title: 'Matemática Maya y Mecánicas de Videojuegos en 2D',
    slug: 'matematica-maya-juegos',
    description: 'Diseño lúdico inspirado en el sistema vigesimal y calendarios astronómicos.',
    category: 'games',
    readingTime: '5 min',
    publishDate: 'Sep 2026',
  },
];
```

Crea `src/data/recentProjects.ts`:
```typescript
export interface MockProject {
  title: string;
  description: string;
  stack: string[];
  status: 'active' | 'completed' | 'wip';
  href?: string;
  repoUrl?: string;
}

export const recentProjects: MockProject[] = [
  {
    title: 'SamsarSite',
    description: 'Sitio personal y pedagógico construido con Astro 6, Vue 3 y Tailwind v4.',
    stack: ['Astro', 'Vue 3', 'Tailwind v4', 'TypeScript'],
    status: 'active',
    repoUrl: 'https://github.com/SamsarDev/samsar-site',
  },
  {
    title: 'Agentic Workflow Engine',
    description: 'Orquestador de agentes de pair programming para estudiantes de ingeniería.',
    stack: ['TypeScript', 'Node.js', 'LLMs'],
    status: 'wip',
  },
  {
    title: 'Mayan Glyphs Generator',
    description: 'Herramienta de renderizado vectorial paramétrico de motivos culturales.',
    stack: ['SVG', 'Canvas', 'Vue 3'],
    status: 'completed',
  },
];
```

### Paso 2: Crear `src/components/blog/PostCard.astro`
```astro
---
import Card from '../ui/Card.astro';
import Chip from '../ui/Chip.astro';
import type { MockPost } from '../../data/featuredPosts';

interface Props {
  post: MockPost;
}

const { post } = Astro.props;
---

<article class="h-full">
  <Card variant="interactive" class="flex h-full flex-col justify-between">
    <div>
      <div class="flex items-center justify-between gap-2">
        <Chip variant="category">
          {post.category.toUpperCase()}
        </Chip>
        <span class="font-['JetBrains_Mono'] text-xs text-[var(--text-secondary)]">
          {post.readingTime}
        </span>
      </div>

      <h3 class="mt-4 font-['Space_Grotesk'] text-xl font-bold text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors">
        <a href={`/blog/${post.slug}`} class="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] rounded">
          {post.title}
        </a>
      </h3>

      <p class="mt-2 text-sm leading-relaxed text-[var(--text-secondary)] font-['Manrope']">
        {post.description}
      </p>
    </div>

    <div class="mt-6 pt-4 border-t border-[var(--border-base)] flex items-center justify-between text-xs text-[var(--text-secondary)]">
      <span>{post.publishDate}</span>
      <span class="font-medium text-[var(--accent-primary)]">Leer artículo &rarr;</span>
    </div>
  </Card>
</article>
```

### Paso 3: Crear `src/components/landing/FeaturedPosts.astro`
```astro
---
import PostCard from '../blog/PostCard.astro';
import Button from '../ui/Button.astro';
import { featuredPosts } from '../../data/featuredPosts';
---

<section class="py-16 bg-[var(--bg-primary)] border-t border-[var(--border-base)]">
  <div class="mx-auto max-w-6xl px-4 sm:px-6">
    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div>
        <h2 class="font-['Space_Grotesk'] text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
          Publicaciones destacadas
        </h2>
        <p class="mt-2 text-base text-[var(--text-secondary)]">
          Artículos y reflexiones del cuaderno de campo.
        </p>
      </div>
      <Button href="/blog" variant="ghost" size="sm">
        Ver todos los artículos &rarr;
      </Button>
    </div>

    <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {featuredPosts.map((post) => <PostCard post={post} />)}
    </div>
  </div>
</section>
```

### Paso 4: Crear `src/components/landing/RecentProjects.astro`
```astro
---
import Card from '../ui/Card.astro';
import Chip from '../ui/Chip.astro';
import Badge from '../ui/Badge.astro';
import Button from '../ui/Button.astro';
import { recentProjects } from '../../data/recentProjects';
---

<section class="py-16 bg-[var(--bg-surface)] border-t border-[var(--border-base)]">
  <div class="mx-auto max-w-6xl px-4 sm:px-6">
    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div>
        <h2 class="font-['Space_Grotesk'] text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
          Proyectos recientes
        </h2>
        <p class="mt-2 text-base text-[var(--text-secondary)]">
          Iniciativas de código abierto y desarrollos experimentales.
        </p>
      </div>
      <Button href="/proyectos" variant="ghost" size="sm">
        Ver todos los proyectos &rarr;
      </Button>
    </div>

    <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {
        recentProjects.map((project) => (
          <Card variant="interactive" class="flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between">
                <Badge status={project.status} />
              </div>
              <h3 class="mt-3 font-['Space_Grotesk'] text-xl font-bold text-[var(--text-primary)]">
                {project.title}
              </h3>
              <p class="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                {project.description}
              </p>
            </div>

            <div class="mt-6">
              <div class="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <Chip variant="stack">{tech}</Chip>
                ))}
              </div>
            </div>
          </Card>
        ))
      }
    </div>
  </div>
</section>
```

---

## 4. Comprobación y Verificación

1. Verifica que los tipos exportados compilen limpiamente con `bun run check`.
2. Revisa que el enlace de cada tarjeta sea usable por teclado con `Tab`.
3. Ejecuta `bun run build` para asegurar compilación estática.

---

## 5. Pistas Didácticas y Errores Comunes

> 💡 **Separación de Responsabilidades:** Diseñar primero con interfaces y mocks permite validar el layout y la accesibilidad de la UI sin bloquearse por la estructura final de los esquemas Zod o los archivos Markdown. En la Fase 3, sustituiremos `featuredPosts.ts` por consultas reales a `getCollection('blog')`.
