# Componentes: Contenido (`src/components/blog/`, `src/components/landing/`, etc.)

Especificación de los 10 componentes dedicados a la presentación de artículos, proyectos y trayectoria profesional: **8 implementados** y **2 retirados** (`TimelineItem` y `SkillGroup`, que la página de experiencia resolvió de otra forma). Cada ficha indica su estado y su ruta real; la convención está en [`03-components.md`](../03-components.md).

---

## 1. `<PostCard />` (`PostCard.astro`)

- **Propósito:** Tarjeta de presentación para listados de blog y destacados.
- **Props:** `post: CollectionEntry<'blog'>`.
- **Elementos:** Tag de categoría con color temático (Jade, Colibrí o Cinabrio), título H3 en Space Grotesk, descripción en Manrope, fecha formateada en español, tiempo estimado de lectura y tags secundarios en chips.
- **Estilos:** Borde lítico de 1px, hover con elevación suave de 4px y resplandor tenue en el color de la categoría.
- **Estado:** Implementado — `src/components/blog/PostCard.astro`

---

## 2. `<ProjectCard />` (`ProjectCard.astro`)

- **Propósito:** Tarjeta para el catálogo de proyectos y sección de la portada.
- **Props:** `project: CollectionEntry<'projects'>`.
- **Elementos:** Imagen de portada (opcional), badge de estado (`active`, `completed`, `wip`), título, descripción breve, chips del stack tecnológico, enlaces externos a demo y repositorio GitHub.
- **Estado:** Implementado — `src/components/portfolio/ProjectCard.astro` (vive en `portfolio/`, no en `blog/`)

---

## 3. `<FeaturedPosts />` (`FeaturedPosts.astro`)

- **Propósito:** Cuadrícula de los últimos 3 artículos destacados para la portada.
- **Estructura:** Grid responsivo de 3 columnas (1 col en mobile, 2 en tablet, 3 en desktop) consumiendo posts filtrados por `featured: true`.
- **Estado:** Implementado — `src/components/landing/FeaturedPosts.astro`

---

## 4. `<RecentProjects />` (`RecentProjects.astro`)

- **Propósito:** Cuadrícula de 3 proyectos representativos en la portada.
- **Estructura:** Grid de 3 columnas similar a `<FeaturedPosts />` con botón final *"Ver todos los proyectos"*.
- **Estado:** Implementado — `src/components/landing/RecentProjects.astro`. El catálogo lo llamaba `FeaturedProjects`; el nombre real es `RecentProjects`.

---

## 5. `<TimelineItem />` (`TimelineItem.astro`)

- **Propósito:** Hito cronológico para la pantalla de experiencia laboral (`/experiencia`).
- **Props:** `item: ExperienceItem`.
- **Elementos:** Nodo temporal con marcador circular de jade o basalto, nombre del cargo, empresa, fechas de inicio y fin, viñetas de logros e impacto técnico y chips del stack empleado.
- **Estado:** Retirado — `/experiencia` resuelve la trayectoria con la isla `src/components/islands/ExperienceTimeline.vue` y los datos tipados de `src/data/experience.ts`; no hay un componente por hito.

---

## 6. `<SkillGroup />` (`SkillGroup.astro`)

- **Propósito:** Agrupación visual de competencias técnicas por categoría.
- **Props:** `title: string`, `skills: string[]`.
- **Estilos:** Título en Space Grotesk 16px seguido de un conjunto flexible de chips (`<Chip variant="stack" />`).
- **Estado:** Retirado — las competencias se renderizan desde `src/data/experience.ts` dentro de la página de experiencia; no hay componente propio.

---

## 7. `<CategoryHero />` (`CategoryHero.astro`)

- **Propósito:** Encabezado visual para las páginas de categoría de blog (`/blog/samsar-dev`, etc.).
- **Elementos:** Glifo o icono temático, título H1, manifiesto editorial de la categoría y contador dinámico de artículos.
- **Estado:** Implementado — `src/components/blog/CategoryHero.astro`

---

## 8. `<PostNavigation />` (`PostNavigation.astro`)

- **Propósito:** Enlaces al final del post para navegar secuencialmente al artículo anterior y siguiente.
- **Estilos:** 2 cards simétricas alineadas a izquierda y derecha con títulos y etiquetas *"Artículo anterior"* y *"Siguiente artículo"*.
- **Estado:** Implementado — `src/components/blog/PostNavigation.astro`

---

## 9. `<RelatedPosts />` (`RelatedPosts.astro`)

- **Propósito:** Recomendaciones al pie de un post basadas en la misma categoría o tags coincidentes.
- **Estructura:** Grid de hasta 3 tarjetas `<PostCard />`.
- **Estado:** Implementado — `src/components/blog/RelatedPosts.astro`

---

## 10. `<Pagination />` (`Pagination.astro`)

- **Propósito:** Controles de navegación de página para listados extensos.
- **Props:** `prevUrl?: string`, `nextUrl?: string`, `currentPage?: number`, `totalPages?: number`.
- **Elementos:** botones *"← Anteriores"* y *"Siguientes →"* (componente `Button`, variante `secondary`, tamaño `sm`), indicador textual *"Página X de Y"* y un hueco (`<span />`) en la dirección que no existe, para que el indicador quede centrado.
- **Comportamiento:** si no hay `prevUrl` ni `nextUrl`, no renderiza nada. **No existe estado deshabilitado:** la dirección ausente se resuelve con el hueco, una decisión de maquetación deliberada, porque un control deshabilitado que no lleva a ninguna parte solo añade ruido a quien navega con teclado.
- **Estado:** Implementado — `src/components/blog/Pagination.astro`

> **Corregido en la [tarea 07 de la Fase 7](../../05-tasks/07-maintenance/07-component-gaps.md):** la ficha declaraba una prop `page` que el componente nunca tuvo y prometía un estado deshabilitado que se resuelve con un hueco.
