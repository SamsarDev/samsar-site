# Componentes: Contenido (`src/components/blog/`, `src/components/landing/`, etc.)

Especificación de los 15 componentes dedicados a la presentación de artículos, proyectos, portada y trayectoria profesional: **13 implementados** y **2 retirados** (`TimelineItem` y `SkillGroup`, que la página de experiencia resolvió de otra forma). Cada ficha indica su estado y su ruta real; la convención está en [`03-components.md`](../03-components.md).

Las fichas **1 a 10** son los componentes de contenido; las **11 a 14**, la sección de portada; y la **15**, la isla que resuelve `/experiencia`. Las cinco últimas se escribieron en la [tarea 07 de la Fase 7](../../05-tasks/07-maintenance/07-component-gaps.md) leyendo el código, después de que la auditoría de la tarea 04 las declarara sin ficha.

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
- **Estado:** Retirado — `/experiencia` resuelve la trayectoria con la isla `src/components/islands/ExperienceTimeline.vue` (ficha 15) y los datos tipados de `src/data/experience.ts`; no hay un componente por hito.

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

---

## 11. `<Hero />` (`Hero.astro`)

- **Propósito:** Encabezado de la portada: quién es el autor y qué va a encontrar quien llega.
- **Props:** ninguna. El texto vive en el componente porque es la única pantalla que lo usa.
- **Elementos:** silueta de quetzal decorativa (`QuetzalSilhouette`, fuera del flujo del texto), etiqueta *"Cuaderno de campo & ingeniería"*, `<h1>` *"Samsar: código, cultura y curiosidad"* con el punto en Jade, párrafo introductorio y dos `Button` de tamaño `lg`: *"Explorar blog"* (primario, `/blog`) y *"Ver proyectos"* (secundario, `/proyectos`).
- **Estados:** entrada con `fadeIn` de 400 ms, el máximo que permite [`DESIGN.md`](../../../DESIGN.md). No tiene interacción propia; los botones traen la suya.
- **Estilos:** contenedor `max-w-4xl` y bloque de texto `max-w-2xl`; el `<h1>` va de `text-4xl` a `text-6xl` según el ancho.
- **Estado:** Implementado — `src/components/landing/Hero.astro`

> Es el único `<h1>` de la portada: los demás bloques de la página usan `<h2>` para no saltar niveles de encabezado.

---

## 12. `<Pillars />` (`Pillars.astro`)

- **Propósito:** Presentar los tres pilares editoriales del blog.
- **Props:** ninguna; los tres pilares viven en un array local (`category`, `title`, `description` y `href`).
- **Elementos:** encabezado `<h2>` *"Qué encontrarás aquí"* con subtítulo, y una rejilla de tres `Card` variante `interactive` (1 columna en mobile, 2 en tablet, 3 en desktop). Cada tarjeta lleva la categoría en JetBrains Mono, el título, la descripción y el pie *"Explorar sección →"*. La tarjeta entera es un enlace, con anillo de foco, y el título pasa a Jade al pasar el cursor.
- **Estados:** `default` y `hover` (elevación de `Card` + desplazamiento de la flecha con `translate-x`).
- **Estado:** Implementado — `src/components/landing/Pillars.astro`

> **Corregido en la misma tarea (bloque A):** el `href` de cada pilar apuntaba a `/blog?categoria=dev|ia|games`, un parámetro que **ningún archivo de `src/` lee** —el catálogo filtra por ruta—, así que el pie *"Explorar sección"* dejaba al visitante en el catálogo completo. Ahora enlaza a `/blog/samsar-dev`, `/blog/samsar-ia` y `/blog/samsar-games`, los tres pilares que genera `src/pages/blog/[category]/index.astro`. También se eliminó un campo `badge` que el array declaraba y ninguna plantilla pintaba.

---

## 13. `<AboutProject />` (`AboutProject.astro`)

- **Propósito:** Explicar qué es el sitio y bajo qué principios se construye.
- **Props:** ninguna; los tres principios viven en un array local (`title`, `description`).
- **Elementos:** greca decorativa (`GrecaBorder`) a lo ancho del borde superior, y un bloque centrado con la etiqueta *"Propósito & Visión"*, `<h2>` *"Un espacio de código y exploración"*, un párrafo limitado a `70ch` y tres `Card` (1 columna en mobile, 3 en desktop) con *Investigación & Rigor*, *Didáctica Abierta* e *Identidad & Memoria*.
- **Estilos:** sección sobre `--bg-surface` con las tarjetas sobre `--bg-primary`, invirtiendo el contraste respecto al fondo de la sección.
- **Estado:** Implementado — `src/components/landing/AboutProject.astro`

---

## 14. `<CtaSection />` (`CtaSection.astro`)

- **Propósito:** Cierre de la portada: invitar a leer el blog o a escribir.
- **Props:** ninguna.
- **Elementos:** etiqueta *"Seguir explorando"*, `<h2>` *"¿Curioso por ver más reflexiones y código?"*, un párrafo y dos `Button` de tamaño `lg` centrados: *"Leer el blog"* (primario, `/blog`) y *"Escribirme un mensaje"* (secundario, `/contacto`).
- **Estilos:** sección sobre `--bg-primary` con borde superior `--border-base`; contenido centrado, ancho máximo `max-w-4xl` y párrafo limitado a `max-w-xl`.
- **Estado:** Implementado — `src/components/landing/CtaSection.astro`

---

## 15. `<ExperienceTimeline />` (`ExperienceTimeline.vue`)

- **Propósito:** Trayectoria profesional filtrable en `/experiencia`. Es una **isla Vue** porque el filtrado es estado de cliente real, no maquetación; sustituye al retirado `TimelineItem` (ficha 5).
- **Props:** `experiences: ExperienceItem[]`, con los datos de `src/data/experience.ts`.
- **Elementos:**
  - Barra de filtros con seis botones —*Todos*, *IA & Agentes*, *Backend*, *Cloud & DevOps*, *Frontend* y *Liderazgo & Mentoría*—, cada uno con su recuento. El grupo lleva `role="group"` y `aria-label`, y cada botón su `aria-pressed`.
  - Contador *"Mostrando X de Y experiencias"* y, cuando hay filtro activo, su nombre.
  - Línea de tiempo vertical con un `<article>` por hito: periodo, ubicación, cargo (`<h3>`), empresa, insignias de área, lista de logros y chips del stack al pie.
- **Estados:** filtro activo (botón en Jade con `--text-on-accent`), filtro inactivo (transparente, con hover sobre `--bg-subtle`), y hover del hito (el nodo escala a 125 % y el borde se tiñe de Jade). Las transiciones duran 150-200 ms y solo animan `transform`, color y sombra.
- **Estilos:** nodos circulares de 0.875rem (14 px) con anillo `--bg-base`, tarjetas sobre `--bg-surface` con borde `--border-base`.
- **Estado:** Implementado — `src/components/islands/ExperienceTimeline.vue`

> Vive en esta ficha y no en [`02-layout.md`](02-layout.md) —donde están las otras dos islas— porque ese documento cubre el andamiaje y la navegación, mientras que esta isla es contenido: es la sucesora directa del retirado `TimelineItem`, documentado aquí.
