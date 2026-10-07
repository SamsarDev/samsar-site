# Tarea 03: Ficha Técnica de Detalle de Proyecto (`/proyectos/[...slug].astro`)

- **Fase:** 04 — Catálogo y Detalle de Proyectos
- **Estimación:** 40 minutos
- **Documentos de referencia:** [`docs/01-product/screens/03-projects.md`](../../01-product/screens/03-projects.md) · [`docs/01-product/04-content-model.md`](../../01-product/04-content-model.md) · [`docs/07-decisions/0009-astro-content-layer-api.md`](../../07-decisions/0009-astro-content-layer-api.md)

---

## 1. Objetivo Pedagógico

Aprender a construir una ficha técnica detallada que combine documentación arquitectónica profunda con relaciones cruzadas entre colecciones independientes. Implementarás la ruta dinámica `/proyectos/[...slug].astro` utilizando `render(project)` de Astro 6, compondrás un hero con metadatos clave (estado, stack tecnológico y botones de acción directa), vincularás el artículo técnico del blog asociado mediante `postSlug` consultando `getEntry('blog', project.data.postSlug)`, y habilitarás navegación secuencial entre iniciativas.

---

## 2. Criterios de Aceptación (DoD)

- [ ] Ruta dinámica `src/pages/proyectos/[...slug].astro` creada con `getStaticPaths()` para todos los proyectos de la colección.
- [ ] Renderizado del cuerpo del proyecto mediante `const { Content } = await render(project)`.
- [ ] Hero de proyecto con título H1, badge de estado, categoría, chips del stack tecnológico completo y botones primarios para repositorio y demo.
- [ ] Relación cruzada tipada: si `project.data.postSlug` está definido, se consulta la entrada correspondiente en la colección `blog` y se renderiza un bloque de *"Artículo técnico relacionado"*.
- [ ] Navegación inferior con enlaces al proyecto anterior y siguiente.
- [ ] Prosa restringida ergonómicamente a `max-w-[70ch]` sin texto justificado.
- [ ] `bun run check` y `bun run build` compilan sin errores.

---

## 3. Paso a Paso Guiado

### Paso 1: Crear `src/pages/proyectos/[...slug].astro`

```astro
---
import { getCollection, getEntry, render } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import Breadcrumbs from '../../components/blog/Breadcrumbs.astro';
import PostCard from '../../components/blog/PostCard.astro';
import Badge from '../../components/ui/Badge.astro';
import Chip from '../../components/ui/Chip.astro';
import Button from '../../components/ui/Button.astro';
import Card from '../../components/ui/Card.astro';

export async function getStaticPaths() {
  const projects = await getCollection('projects');

  return projects.map((project, index) => {
    const nextProject = index > 0 ? projects[index - 1] : undefined;
    const prevProject = index < projects.length - 1 ? projects[index + 1] : undefined;

    return {
      params: { slug: project.id },
      props: { project, prevProject, nextProject },
    };
  });
}

interface Props {
  project: CollectionEntry<'projects'>;
  prevProject?: CollectionEntry<'projects'> | undefined;
  nextProject?: CollectionEntry<'projects'> | undefined;
}

const { project, prevProject, nextProject } = Astro.props;
const { Content } = await render(project);
const { title, description, stack, status, repo, demo, postSlug, type } = project.data;

// Consulta de relación cruzada hacia la colección 'blog'
const relatedPost = postSlug ? await getEntry('blog', postSlug) : undefined;
---

<BaseLayout title={`${title} | Proyectos Samsar`} description={description}>
  <article class="py-12">
    <div class="max-w-4xl mx-auto px-4 sm:px-6">
      <Breadcrumbs items={[
        { label: 'Proyectos', href: '/proyectos' },
        { label: title },
      ]} />

      <!-- Hero del Proyecto -->
      <header class="mb-12 pb-8 border-b border-[var(--border-base)]">
        <div class="flex items-center gap-3 mb-4">
          <Badge status={status} />
          <span class="text-xs font-mono text-[var(--text-muted)] capitalize">{type}</span>
        </div>

        <h1 class="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-4">
          {title}
        </h1>

        <p class="text-lg text-[var(--text-secondary)] leading-relaxed mb-6 font-sans">
          {description}
        </p>

        <!-- Stack Tecnológico -->
        <div class="flex flex-wrap gap-1.5 mb-8">
          {stack.map((tech) => (
            <Chip variant="stack">{tech}</Chip>
          ))}
        </div>

        <!-- Acciones Directas -->
        <div class="flex flex-wrap gap-4">
          {repo && (
            <Button href={repo} variant="secondary" size="md" target="_blank" rel="noopener noreferrer">
              Ver Repositorio en GitHub &rarr;
            </Button>
          )}
          {demo && (
            <Button href={demo} variant="primary" size="md" target="_blank" rel="noopener noreferrer">
              Probar Demo en Vivo &rarr;
            </Button>
          )}
        </div>
      </header>

      <!-- Contenido Arquitectónico -->
      <div class="max-w-[70ch] mx-auto prose-samsar">
        <Content />
      </div>

      <!-- Artículo Técnico Vinculado -->
      {relatedPost && (
        <section class="mt-16 pt-10 border-t border-[var(--border-base)]">
          <p class="font-mono text-xs text-[var(--accent-primary)] uppercase tracking-wider mb-2">
            Ingeniería & Cuaderno de Campo
          </p>
          <h2 class="font-display text-2xl font-bold text-[var(--text-primary)] mb-6">
            Artículo técnico relacionado
          </h2>
          <div class="max-w-md">
            <PostCard post={relatedPost} />
          </div>
        </section>
      )}

      <!-- Navegación Secuencial -->
      {(prevProject || nextProject) && (
        <nav aria-label="Navegación entre proyectos" class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-16 pt-8 border-t border-[var(--border-base)]">
          <div>
            {prevProject && (
              <a href={`/proyectos/${prevProject.id}`} class="block group h-full">
                <Card variant="interactive" class="h-full">
                  <span class="text-xs font-mono text-[var(--text-muted)] block mb-1">← Proyecto anterior</span>
                  <span class="font-display font-bold text-sm text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                    {prevProject.data.title}
                  </span>
                </Card>
              </a>
            )}
          </div>
          <div>
            {nextProject && (
              <a href={`/proyectos/${nextProject.id}`} class="block group h-full text-right sm:text-left">
                <Card variant="interactive" class="h-full">
                  <span class="text-xs font-mono text-[var(--text-muted)] block mb-1">Siguiente proyecto →</span>
                  <span class="font-display font-bold text-sm text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                    {nextProject.data.title}
                  </span>
                </Card>
              </a>
            )}
          </div>
        </nav>
      )}
    </div>
  </article>
</BaseLayout>
```

---

## 4. Comprobación y Verificación

1. Inicia `bun run dev` y visita `/proyectos/orquestacion-agentica-mcp`.
2. Verifica que el botón de GitHub y Demo estén activos y abran en pestaña nueva con `noopener noreferrer`.
3. Comprueba que al pie aparezca la tarjeta del artículo del blog vinculado (*"Primeros pasos con sistemas multi-agente y MCP"*).
4. Ejecuta:
   ```bash
   bun run check && bun run build
   ```

---

## 5. Pistas Didácticas y Errores Comunes

- **`getEntry('blog', postSlug)`:** En Astro 6, `getEntry` recibe el nombre de la colección y el identificador (`postSlug`). Si no encuentra el artículo o el slug está desalineado, retornará `undefined` sin romper la compilación.
- **`exactOptionalPropertyTypes` en props:** Recuerda tipear `prevProject?: CollectionEntry<'projects'> | undefined` para que TypeScript acepte el paso explícito de `undefined`.
