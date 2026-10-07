# Componentes: Contenido (`src/components/blog/`, `src/components/landing/`, etc.)

Especificación de los 10 componentes dedicados a la presentación de artículos, proyectos y trayectoria profesional.

---

## 1. `<PostCard />` (`PostCard.astro`)

- **Propósito:** Tarjeta de presentación para listados de blog y destacados.
- **Props:** `post: CollectionEntry<'blog'>`.
- **Elementos:** Tag de categoría con color temático (Jade, Colibrí o Cinabrio), título H3 en Space Grotesk, descripción en Manrope, fecha formateada en español, tiempo estimado de lectura y tags secundarios en chips.
- **Estilos:** Borde lítico de 1px, hover con elevación suave de 4px y resplandor tenue en el color de la categoría.

---

## 2. `<ProjectCard />` (`ProjectCard.astro`)

- **Propósito:** Tarjeta para el catálogo de proyectos y sección de la portada.
- **Props:** `project: CollectionEntry<'projects'>`.
- **Elementos:** Imagen de portada (opcional), badge de estado (`active`, `completed`, `wip`), título, descripción breve, chips del stack tecnológico, enlaces externos a demo y repositorio GitHub.

---

## 3. `<FeaturedPosts />` (`FeaturedPosts.astro`)

- **Propósito:** Cuadrícula de los últimos 3 artículos destacados para la portada.
- **Estructura:** Grid responsivo de 3 columnas (1 col en mobile, 2 en tablet, 3 en desktop) consumiendo posts filtrados por `featured: true`.

---

## 4. `<FeaturedProjects />` (`FeaturedProjects.astro`)

- **Propósito:** Cuadrícula de 3 proyectos representativos en la portada.
- **Estructura:** Grid de 3 columnas similar a `<FeaturedPosts />` con botón final *"Ver todos los proyectos"*.

---

## 5. `<TimelineItem />` (`TimelineItem.astro`)

- **Propósito:** Hito cronológico para la pantalla de experiencia laboral (`/experiencia`).
- **Props:** `item: ExperienceItem`.
- **Elementos:** Nodo temporal con marcador circular de jade o basalto, nombre del cargo, empresa, fechas de inicio y fin, viñetas de logros e impacto técnico y chips del stack empleado.

---

## 6. `<SkillGroup />` (`SkillGroup.astro`)

- **Propósito:** Agrupación visual de competencias técnicas por categoría.
- **Props:** `title: string`, `skills: string[]`.
- **Estilos:** Título en Space Grotesk 16px seguido de un conjunto flexible de chips (`<Chip variant="stack" />`).

---

## 7. `<CategoryHero />` (`CategoryHero.astro`)

- **Propósito:** Encabezado visual para las páginas de categoría de blog (`/blog/samsar-dev`, etc.).
- **Elementos:** Glifo o icono temático, título H1, manifiesto editorial de la categoría y contador dinámico de artículos.

---

## 8. `<PostNavigation />` (`PostNavigation.astro`)

- **Propósito:** Enlaces al final del post para navegar secuencialmente al artículo anterior y siguiente.
- **Estilos:** 2 cards simétricas alineadas a izquierda y derecha con títulos y etiquetas *"Artículo anterior"* y *"Siguiente artículo"*.

---

## 9. `<RelatedPosts />` (`RelatedPosts.astro`)

- **Propósito:** Recomendaciones al pie de un post basadas en la misma categoría o tags coincidentes.
- **Estructura:** Grid de hasta 3 tarjetas `<PostCard />`.

---

## 10. `<Pagination />` (`Pagination.astro`)

- **Propósito:** Controles de navegación de página para listados extensos.
- **Props:** `page: Page<CollectionEntry<'blog'>>`.
- **Elementos:** Botones accesibles *"Anterior"* y *"Siguiente"* con estado deshabilitado si no hay página disponible, e indicador textual *"Página X de Y"*.
