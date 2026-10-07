# 02-landing: Fase 2 — Landing Page y Átomos de UI

Secuencia de tareas para construir la página de inicio principal (`/`) de **Samsar | Sitio web personal** junto con el catálogo de componentes atómicos de interfaz.

---

## 1. Secuencia de Tareas

Las tareas deben implementarse en orden secuencial para garantizar una progresión atómica y reutilizable:

| # | Tarea | Qué se construye | Archivos Principales |
|---|---|---|---|
| **01** | [`01-ui-atoms.md`](01-ui-atoms.md) | Componentes UI atómicos: Botón con variantes, Tarjeta base, Chip de categoría/stack y Badge de estado. | `src/components/ui/Button.astro`, `Card.astro`, `Chip.astro`, `Badge.astro` |
| **02** | [`02-hero-and-pillars.md`](02-hero-and-pillars.md) | Zona de impacto inicial Hero con CTAs y Grid de los 3 pilares temáticos (`Samsar\|Dev`, `Samsar\|IA`, `Samsar\|Games`). | `src/components/landing/Hero.astro`, `Pillars.astro`, `src/components/maya/placeholders/` |
| **03** | [`03-about-project.md`](03-about-project.md) | Sección explicativa sobre el propósito didáctico y personal del sitio, con textura decorativa de grecas. | `src/components/landing/AboutProject.astro` |
| **04** | [`04-featured-content.md`](04-featured-content.md) | Mocks de datos tipados en TypeScript y secciones de publicaciones destacadas y proyectos recientes con sus cards. | `src/data/featuredPosts.ts`, `src/data/recentProjects.ts`, `PostCard.astro`, `ProjectCard.astro` |
| **05** | [`05-landing-composition.md`](05-landing-composition.md) | CTA final de cierre, composición de todas las secciones en `src/pages/index.astro`, responsive (≥ 360px) y validación accesible. | `src/components/landing/CtaSection.astro`, `src/pages/index.astro` |

---

## 2. Prerrequisitos de la Fase

Antes de comenzar la tarea 01 de esta fase, verifica que:
- La **Fase 1 (Fundación)** esté completamente completada y fusionada en `main`.
- `bun run check` y `bun run build` pasen sin errores ni advertencias.
- Los tokens semánticos en `src/styles/theme.css` y las fuentes locales en `public/fonts/` estén disponibles.

---

## 3. Resultado Esperado al Finalizar la Fase 2

Al concluir las 5 tareas de esta fase:
- La página de inicio (`/`) reflejará fielmente el diseño de [`docs/01-product/screens/01-landing.md`](../../01-product/screens/01-landing.md).
- Los átomos de UI (`Button`, `Card`, `Chip`, `Badge`) quedarán disponibles para ser reutilizados en las siguientes fases del sitio.
- La página será 100% estática (cero JavaScript innecesario salvo las islas de navegación ya creadas en la Fase 1).
- Cumplirá el estándar de accesibilidad WCAG AA (contraste ≥ 4.5:1, foco por teclado visible y jerarquía estricta de encabezados).
