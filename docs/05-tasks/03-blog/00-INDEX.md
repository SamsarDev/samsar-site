# 03-blog: Fase 3 — Ecosistema del Blog

Secuencia de tareas para construir el motor editorial y catálogo de publicaciones técnicas de **Samsar | Sitio web personal**, abarcando las 3 categorías temáticas (`Samsar|Dev`, `Samsar|IA`, `Samsar|Games`), integración MDX, diseño de lectura y navegación por etiquetas.

---

## 1. Secuencia de Tareas

Las tareas deben ejecutarse en orden estricto para asegurar que la arquitectura de contenido alimente limpiamente las interfaces de lectura:

| # | Tarea | Qué se construye | Archivos Principales |
|---|---|---|---|
| **01** | [`01-content-layer-schema.md`](01-content-layer-schema.md) | Integración `@astrojs/mdx`, Content Layer API (`src/content.config.ts`), utilidades de fecha y tiempo de lectura, y posts semilla en las 3 categorías. | `astro.config.mjs`, `src/content.config.ts`, `src/utils/`, `src/content/blog/` |
| **02** | [`02-blog-index-and-categories.md`](02-blog-index-and-categories.md) | Catálogo general `/blog`, hubs temáticos dedicados (`/blog/samsar-dev`, `/blog/samsar-ia`, `/blog/samsar-games`), componente `CategoryHero.astro`, `PostCard.astro` y paginación. | `src/pages/blog/index.astro`, `src/pages/blog/[category]/`, `src/components/blog/` |
| **03** | [`03-article-layout-and-components.md`](03-article-layout-and-components.md) | Layout de lectura `BlogLayout.astro`, `Breadcrumbs.astro`, `TOC.astro` (tabla de contenidos sticky), `Callout.astro` y soporte Shiki dual-theme con botón de copiar código. | `src/layouts/BlogLayout.astro`, `src/components/blog/`, `src/components/ui/Callout.astro` |
| **04** | [`04-post-reading-page.md`](04-post-reading-page.md) | Ruta dinámica de lectura `src/pages/blog/[...slug].astro`, renderizado de MDX, navegación entre artículos (anterior/siguiente) y recomendaciones relacionadas. | `src/pages/blog/[...slug].astro`, `PostNavigation.astro`, `RelatedPosts.astro` |
| **05** | [`05-tag-filtering-and-landing-integration.md`](05-tag-filtering-and-landing-integration.md) | Hub de etiquetas dinámico (`/blog/tags/[tag].astro`), refactorización de `FeaturedPosts.astro` en la landing para consultar la colección real y validación integral. | `src/pages/blog/tags/[tag].astro`, `src/components/landing/FeaturedPosts.astro` |

---

## 2. Prerrequisitos de la Fase

Antes de iniciar la tarea 01 de esta fase, confirma que:
- Las **Fases 1 (Fundación)** y **2 (Landing Page y Átomos de UI)** estén fusionadas en la rama `main`.
- La suite de átomos (`Button.astro`, `Card.astro`, `Chip.astro`, `Badge.astro`) esté disponible en `src/components/ui/`.
- `bun run check` y `bun run build` compilen limpiamente.

---

## 3. Resultado Esperado al Finalizar la Fase 3

Al completar las 5 tareas de esta fase:
- El sitio contará con un blog técnico estático, de alto rendimiento y cero JS innecesario.
- Los artículos soportarán componentes enriquecidos vía MDX con bloques de código resaltados en Shiki y accesibles.
- Los tres pilares temáticos tendrán hubs independientes con sus acentos culturales (Jade, Colibrí y Cinabrio).
- La portada (`/`) estará conectada en tiempo de compilación a las publicaciones reales de la colección.
- Todo cumplirá WCAG AA (contraste ≥ 4.5:1, jerarquía semántica H1-H3 y navegación por teclado).
