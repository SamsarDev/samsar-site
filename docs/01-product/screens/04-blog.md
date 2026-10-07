# Pantallas 6 a 11: Ecosistema del Blog

Especificación para el índice general (`/blog`), vistas por categoría, lectura de artículo individual (`/blog/[slug]`) y filtrado por tags (`/blog/tags/[tag]`).

---

## 📰 Pantalla 6: Índice General del Blog (`/blog`)

### 1. Propósito
Catálogo completo y cronológico de publicaciones técnicas, reflexiones pedagógicas y guías de desarrollo.

### 2. Estructura de Secciones

| # | Sección | Elementos y Contenido |
|---|---|---|
| **6.1** | **Encabezado** | Título H1 (*"Cuaderno de campo & Blog"*), sinopsis sobre la curiosidad y los pilares del sitio. |
| **6.2** | **Buscador (Post-MVP)** | Preparado para isla interactiva client-side (`BlogSearch.vue`) con Pagefind / Fuse.js en fase posterior. En MVP la navegación se apoya en los filtros por categoría. |
| **6.3** | **Filtros por Categoría** | Tabs o chips de navegación rápida: *Todos*, `Samsar|Dev`, `Samsar|IA`, `Samsar|Games`. |
| **6.4** | **Listado de Artículos** | Lista paginada de `PostCard.astro` con fecha formateada en español, tiempo de lectura calculado, cover (opcional), título, extracto y tags. |
| **6.5** | **Suscripción y Paginación** | Controles de paginación (*Anterior / Siguiente*) y enlace directo al feed RSS (`/rss.xml`). |

---

## 🏷️ Pantallas 7, 8 y 9: Páginas de Categoría

**Rutas:** `/blog/samsar-dev`, `/blog/samsar-ia`, `/blog/samsar-games`

### 1. Propósito
Espacio curado con identidad visual y contextual para cada uno de los tres pilares del sitio:

- **`Samsar|Dev`:** Acento Jade (`--color-jade`). *"Guías de desarrollo, manuales de arquitectura, patrones de diseño y notas de ingeniería."*
- **`Samsar|IA`:** Acento Turquesa Colibrí (`--color-hummingbird`). *"Exploraciones sobre IA generativa, LLMs, sistemas multi-agente, RAG y Model Context Protocol (MCP)."*
- **`Samsar|Games`:** Acento Cinabrio (`--color-blood`). *"Desarrollo de videojuegos, pedagogía lúdica y gameplays formativos compartidos con mi hijo."*

### 2. Elementos
- Hero temático con icono/glifo representativo, título H1, manifiesto de la categoría y contador total de artículos publicados.
- Grid de artículos filtrados estrictamente por la categoría correspondiente.

---

## 📖 Pantalla 10: Lectura de Artículo Individual (`/blog/[slug]`)

### 1. Propósito
Experiencia de lectura óptima (máxima legibilidad, contraste validado, 70ch de ancho de lectura) diseñada para contenido técnico extenso.

### 2. Estructura de Secciones

| # | Sección | Elementos y Contenido |
|---|---|---|
| **10.1** | **Breadcrumbs** | Navegación jerárquica: `Inicio > Blog > [Categoría] > [Título]`. |
| **10.2** | **Cabecera del Artículo** | Chip de categoría, título H1 en Space Grotesk, descripción/subtítulo, metadatos (fecha de publicación, fecha de actualización, tiempo de lectura, autor). |
| **10.3** | **Tabla de Contenidos (TOC)** | Navegación interna generada a partir de los encabezados H2/H3 (`<TOC />`), fija en escritorio (`sticky sidebar`) y colapsable en móvil. |
| **10.4** | **Cuerpo MDX** | Prose optimizada en Manrope (leading 1.7), ancho máximo de 70ch, sin justificado de texto. |
| **10.5** | **Bloques de Código** | Componente `<CodeBlock />` con syntax highlighting, nombre de archivo o lenguaje, y botón accesible de copiar al portapapeles. |
| **10.6** | **Callouts y Notas** | Bloques destacados para notas, tips y advertencias con borde lateral izquierdo de 3px y contraste AA. |
| **10.7** | **Etiquetas y Navegación** | Chips de tags al pie del artículo y enlaces al artículo anterior y siguiente. |
| **10.8** | **Artículos Relacionados** | Grid de 3 artículos recomendados basados en la misma categoría o etiquetas compartidas. |

---

## 🏷️ Pantalla 11: Artículos por Etiqueta (`/blog/tags/[tag]`)

- Listado dinámico generado en build time para agrupar artículos que compartan un tag específico (ej: `architecture`, `vue`, `rag`).
