# 04-portfolio: Fase 4 — Catálogo y Detalle de Proyectos

Secuencia de tareas para implementar el escaparate técnico y profesional de iniciativas en **Samsar | Sitio web personal**, abarcando la colección `projects`, el catálogo general `/proyectos`, los filtros estáticos por tipo (`/proyectos/[type]`), la ficha técnica detallada (`/proyectos/[slug]`) y la integración definitiva con la portada.

---

## 1. Secuencia de Tareas

Las tareas deben abordarse en orden estricto para asegurar que la arquitectura de contenido alimente las interfaces de presentación:

| # | Tarea | Qué se construye | Archivos Principales |
|---|---|---|---|
| **01** | [`01-projects-collection-and-seeds.md`](01-projects-collection-and-seeds.md) | Registro de la colección `projects` en `src/content.config.ts` con esquema estricto Zod y 4 proyectos semilla basados en experiencia real de ingeniería. | `src/content.config.ts`, `src/content/projects/` |
| **02** | [`02-project-card-and-catalog.md`](02-project-card-and-catalog.md) | Componente `ProjectCard.astro`, catálogo general `/proyectos` y rutas estáticas por tipo (`/proyectos/[type]`) con chips de filtrado accesibles. | `src/components/portfolio/ProjectCard.astro`, `src/pages/proyectos/` |
| **03** | [`03-project-detail-page.md`](03-project-detail-page.md) | Ficha técnica individual `src/pages/proyectos/[...slug].astro`, renderizado de MDX, CTAs (demo/repo), post técnico relacionado (`postSlug`) y navegación secuencial. | `src/pages/proyectos/[...slug].astro` |
| **04** | [`04-landing-integration-and-cleanup.md`](04-landing-integration-and-cleanup.md) | Refactorización de `RecentProjects.astro` en la portada para consumir la colección real `getCollection('projects')` y retiro definitivo de datos simulados. | `src/components/landing/RecentProjects.astro`, `src/data/recentProjects.ts` |

---

## 2. Prerrequisitos de la Fase

Antes de iniciar la tarea 01 de esta fase, confirma que:
- Las **Fases 1 (Fundación)**, **2 (Landing)** y **3 (Blog)** estén completadas y fusionadas en `main`.
- La configuración del Content Layer API en `src/content.config.ts` esté operativa con `@astrojs/mdx`.
- `bun run check` y `bun run build` pasen con código 0.

---

## 3. Resultado Esperado al Finalizar la Fase 4

Al completar las 4 tareas de esta fase:
- El sitio contará con un catálogo completo de proyectos técnicos clasificados por tipo (`professional`, `open-source`, `game`, `ai-experiment`).
- Cada proyecto contará con una ficha técnica profunda documentando contexto, arquitectura, decisiones y enlaces a código y demos.
- El filtrado por tipo será 100% estático (cero JavaScript innecesario en el cliente).
- La sección de proyectos recientes en la portada estará conectada en build time con la colección real.
- Cumplirá el estándar de accesibilidad WCAG AA en temas claro y oscuro.
