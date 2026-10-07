# Tarea 02: Componente ProjectCard, Catálogo General y Filtros por Tipo

- **Fase:** 04 — Catálogo y Detalle de Proyectos
- **Estimación:** 40 minutos
- **Documentos de referencia:** [`docs/01-product/screens/03-projects.md`](../../01-product/screens/03-projects.md) · [`docs/03-design/components/01-ui.md`](../../03-design/components/01-ui.md) · [`docs/03-design/components/03-content.md`](../../03-design/components/03-content.md)

---

## 1. Objetivo Pedagógico

Aprender a diseñar componentes de presentación tipados y catálogos estáticos de alto rendimiento. Construirás la tarjeta `ProjectCard.astro` para exhibir proyectos de ingeniería, consumiendo `CollectionEntry<'projects'>` e integrando insignias de ciclo de vida (`Badge.astro`), etiquetas tecnológicas en JetBrains Mono (`Chip.astro`), enlaces de código y demo con iconos accesibles, y enlace hacia la ficha técnica interna. Implementarás el catálogo principal `/proyectos` y la taxonomía estática por tipos (`/proyectos/[type]`) mediante `getStaticPaths()`.

---

## 2. Criterios de Aceptación (DoD)

- [ ] Componente `src/components/portfolio/ProjectCard.astro` creado con tipado estricto para `CollectionEntry<'projects'>`.
- [ ] La tarjeta renderiza:
  - Badge de estado (`active`, `completed`, `wip`, `archived`).
  - Título H3 en Space Grotesk enlazando a `/proyectos/${project.id}`.
  - Descripción breve en Manrope.
  - Chips del stack tecnológico (`<Chip variant="stack" />`).
  - Botones/enlaces directos a Demo y Repositorio si existen en el frontmatter, con `aria-label` descriptivos.
- [ ] Catálogo general `src/pages/proyectos/index.astro` creado con título H1 (*"Proyectos"*), manifiesto de ingeniería y barra de filtros por tipo (*Todos*, *Profesionales*, *Open Source*, *Juegos*, *Experimentos IA*).
- [ ] Rutas estáticas de filtrado creadas en `src/pages/proyectos/[type]/index.astro` mediante `getStaticPaths()` para los tipos canónicos: `professional`, `open-source`, `game` y `ai-experiment`.
- [ ] Todos los elementos interactivos cuentan con foco por teclado visible y contraste WCAG AA.
- [ ] `bun run check` y `bun run build` compilan sin errores.

---

## 3. Paso a Paso Guiado

### Paso 1: Crear `src/components/portfolio/ProjectCard.astro`

```astro
---
import type { CollectionEntry } from 'astro:content';
import Card from '../ui/Card.astro';
import Chip from '../ui/Chip.astro';
import Badge from '../ui/Badge.astro';

interface Props {
  project: CollectionEntry<'projects'>;
}

const { project } = Astro.props;
const { title, description, stack, status, repo, demo, type } = project.data;

const typeLabels = {
  professional: 'Profesional',
  'open-source': 'Open Source',
  game: 'Videojuego',
  'ai-experiment': 'Experimento IA',
}[type];
---

<Card variant="interactive" class="flex flex-col justify-between h-full group">
  <div>
    <div class="flex items-center justify-between gap-2 mb-3">
      <Badge status={status} />
      <span class="text-xs font-mono text-[var(--text-muted)]">{typeLabels}</span>
    </div>

    <h3 class="font-display text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors mb-2">
      <a href={`/proyectos/${project.id}`} class="focus-visible:outline-none focus-visible:underline">
        {title}
      </a>
    </h3>

    <p class="text-sm text-[var(--text-secondary)] line-clamp-3 mb-6 leading-relaxed font-sans">
      {description}
    </p>
  </div>

  <div>
    <div class="flex flex-wrap gap-1.5 mb-6">
      {stack.slice(0, 4).map((tech) => (
        <Chip variant="stack">{tech}</Chip>
      ))}
      {stack.length > 4 && (
        <span class="text-xs font-mono text-[var(--text-muted)] self-center">
          +{stack.length - 4}
        </span>
      )}
    </div>

    <div class="pt-4 border-t border-[var(--border-base)]/50 flex items-center justify-between text-xs font-mono">
      <a href={`/proyectos/${project.id}`} class="text-[var(--accent-primary)] font-medium hover:underline">
        Ver detalles &rarr;
      </a>
      <div class="flex items-center gap-3">
        {repo && (
          <a href={repo} target="_blank" rel="noopener noreferrer" class="text-[var(--text-secondary)] hover:text-[var(--text-primary)]" aria-label={`Repositorio de ${title}`}>
            GitHub
          </a>
        )}
        {demo && (
          <a href={demo} target="_blank" rel="noopener noreferrer" class="text-[var(--text-secondary)] hover:text-[var(--text-primary)]" aria-label={`Demo de ${title}`}>
            Demo
          </a>
        )}
      </div>
    </div>
  </div>
</Card>
```

### Paso 2: Crear `src/pages/proyectos/index.astro`

Crea el catálogo general obteniendo todos los proyectos:

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import ProjectCard from '../../components/portfolio/ProjectCard.astro';
import Chip from '../../components/ui/Chip.astro';

const allProjects = await getCollection('projects');

const filterTabs = [
  { label: 'Todos', href: '/proyectos', active: true },
  { label: 'Profesionales', href: '/proyectos/professional', active: false },
  { label: 'Open Source', href: '/proyectos/open-source', active: false },
  { label: 'Juegos', href: '/proyectos/game', active: false },
  { label: 'Experimentos IA', href: '/proyectos/ai-experiment', active: false },
];
---

<BaseLayout
  title="Catálogo de Proyectos | Samsar"
  description="Expositor de iniciativas de ingeniería, plataformas cloud, sistemas multi-agente y videojuegos."
>
  <main class="py-16">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <header class="mb-12">
        <p class="font-mono text-xs text-[var(--accent-primary)] uppercase tracking-wider mb-2">
          Iniciativas & Software
        </p>
        <h1 class="font-display text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mb-4">
          Proyectos
        </h1>
        <p class="text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl font-sans">
          Arquitecturas de producción, proyectos de código abierto, experiencias lúdicas formativas y experimentos de inteligencia artificial.
        </p>

        <!-- Barra de filtros -->
        <nav aria-label="Filtrar proyectos por tipo" class="flex flex-wrap gap-2 mt-8 pt-6 border-t border-[var(--border-base)]">
          {filterTabs.map((tab) => (
            <a href={tab.href} class="focus-visible:outline-none">
              <Chip variant="category" class={tab.active ? 'bg-[var(--accent-primary)] text-[var(--text-on-accent)] border-[var(--accent-primary)]' : ''}>
                {tab.label}
              </Chip>
            </a>
          ))}
        </nav>
      </header>

      <section aria-label="Listado de proyectos" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allProjects.map((project) => (
          <ProjectCard project={project} />
        ))}
      </section>
    </div>
  </main>
</BaseLayout>
```

### Paso 3: Crear `src/pages/proyectos/[type]/index.astro`

Implementa la ruta dinámica con `getStaticPaths()` retornando los 4 tipos y filtrando los proyectos correspondientes de forma similar a como se hizo en las categorías de blog.

---

## 4. Comprobación y Verificación

1. Inicia `bun run dev` y visita `/proyectos`.
2. Verifica que las 4 tarjetas se muestren con sus badges de estado, stack y enlaces.
3. Haz clic en *"Experimentos IA"* o visita `/proyectos/ai-experiment` y confirma que liste solo la iniciativa agéntica.
4. Ejecuta:
   ```bash
   bun run check && bun run build
   ```

---

## 5. Pistas Didácticas y Errores Comunes

- **`rel="noopener noreferrer"` en enlaces externos:** Siempre añade estos atributos al abrir demos o repositorios con `target="_blank"` para proteger la ventana del navegador contra vulnerabilidades de *tabnabbing*.
- **Iconos vs texto descriptivo:** Si usas iconos de enlace sin texto, el atributo `aria-label` es estrictamente mandatorio para lectores de pantalla.
