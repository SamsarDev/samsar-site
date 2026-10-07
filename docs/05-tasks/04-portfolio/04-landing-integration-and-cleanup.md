# Tarea 04: Integración de Proyectos en Portada y Limpieza de Mocks

- **Fase:** 04 — Catálogo y Detalle de Proyectos
- **Estimación:** 30 minutos
- **Documentos de referencia:** [`docs/01-product/screens/01-landing.md`](../../01-product/screens/01-landing.md) · [`docs/05-tasks/02-landing/04-featured-content.md`](../02-landing/04-featured-content.md)

---

## 1. Objetivo Pedagógico

Aprender a unificar la fuente de verdad en aplicaciones SSG de Astro. Sustituirás el mock estático `src/data/recentProjects.ts` en la portada (`RecentProjects.astro`) por la consulta en tiempo de compilación a la colección real de proyectos (`getCollection('projects')`). Reutilizarás el componente de presentación `ProjectCard.astro`, eliminarás la deuda técnica de datos ficticios y auditarás la integridad de enlaces entre la landing, el catálogo `/proyectos`, los filtros por tipo y las fichas técnicas individuales.

---

## 2. Criterios de Aceptación (DoD)

- [ ] `src/components/landing/RecentProjects.astro` refactorizado para consultar `getCollection('projects')` filtrando por `featured: true` (o tomando los 3 más recientes) en lugar de importar `src/data/recentProjects.ts`.
- [ ] Utiliza el componente estándar `ProjectCard.astro` para mantener consistencia visual.
- [ ] Archivo mock `src/data/recentProjects.ts` eliminado definitivamente.
- [ ] Enlaces funcionales entre portada, `/proyectos`, `/proyectos/[type]` y `/proyectos/[slug]`.
- [ ] `docs/05-tasks/00-INDEX.md` y `docs/00-INDEX.md` actualizados reflejando la Fase 4 como Lista.
- [ ] `bun run check` y `bun run build` compilan con 0 errores y 0 advertencias.

---

## 3. Paso a Paso Guiado

### Paso 1: Refactorizar `src/components/landing/RecentProjects.astro`

Actualiza el componente para consultar la colección real:

```astro
---
import { getCollection } from 'astro:content';
import ProjectCard from '../portfolio/ProjectCard.astro';
import Button from '../ui/Button.astro';

const allProjects = await getCollection('projects');

const featuredProjects = allProjects
  .filter((project) => project.data.featured)
  .slice(0, 3);

const displayProjects = featuredProjects.length > 0 ? featuredProjects : allProjects.slice(0, 3);
---

<section class="py-20 bg-[var(--bg-surface)] border-t border-[var(--border-base)]">
  <div class="mx-auto max-w-6xl px-4 sm:px-6">
    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
      <div>
        <p class="font-mono text-xs text-[var(--accent-primary)] uppercase tracking-wider mb-2">
          Iniciativas & Software
        </p>
        <h2 class="font-display text-3xl sm:text-4xl font-bold text-[var(--text-primary)]">
          Proyectos destacados
        </h2>
        <p class="mt-2 text-base text-[var(--text-secondary)] font-sans">
          Arquitecturas distribuidas, soluciones de IA y proyectos de código abierto.
        </p>
      </div>
      <Button href="/proyectos" variant="ghost" size="sm">
        Ver todos los proyectos &rarr;
      </Button>
    </div>

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {displayProjects.map((project) => (
        <ProjectCard project={project} />
      ))}
    </div>
  </div>
</section>
```

### Paso 2: Eliminar mock obsoleto

Elimina `src/data/recentProjects.ts` mediante `git rm src/data/recentProjects.ts`.

### Paso 3: Actualizar los índices maestros

Actualiza `docs/05-tasks/00-INDEX.md` marcando la Fase 4 como Lista y `docs/00-INDEX.md` con las fases completadas.

---

## 4. Comprobación y Verificación

1. Inicia `bun run dev` y visita `/`. Verifica que la sección de proyectos recientes muestre las iniciativas reales con sus badges y enlaces a `/proyectos/[slug]`.
2. Haz clic en *"Ver todos los proyectos"* y comprueba la navegación hacia `/proyectos`.
3. Ejecuta la validación estática y el build de producción:
   ```bash
   bun run check
   bun run build
   bun run preview
   ```
4. Navega en preview y verifica que no existan enlaces rotos.

---

## 5. Pistas Didácticas y Errores Comunes

- **DRY en componentes de presentación:** Nunca dupliques el diseño de una tarjeta en la portada y en el catálogo. Reutilizar `ProjectCard.astro` asegura que cualquier cambio de diseño o accesibilidad se propague automáticamente a todas las pantallas.
