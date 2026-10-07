# Especificación Detallada del Proyecto — Sitio Web Personal Samuel Sarmientos | Samsar

**Documento de Definición de Producto y Diseño**  
**Versión:** 1.1 | **Fecha:** Octubre 2026  
**Autor:** Samuel Sarmientos / Samsar  
**Estado:** Aprobado para desarrollo  
**Cambios v1.1:** Refinamiento de identidad visual (paleta oscura "Obsidiana & Jade"), consolidación tipográfica a tríada Space Grotesk + Manrope + JetBrains Mono, y criterios de selección tipográfica documentados. Ver [Changelog](#12-changelog) al final del documento.

---

## 📑 Tabla de Contenidos

1. [Finalidad y Objetivos](#1-finalidad-y-objetivos)
2. [Estructura de Diseño](#2-estructura-de-diseño)
3. [Arquitectura Técnica](#3-arquitectura-técnica)
4. [Funcionalidades Mínimas Requeridas](#4-funcionalidades-mínimas-requeridas)
5. [Inventario de Pantallas](#5-inventario-de-pantallas)
6. [Elementos Detallados por Pantalla](#6-elementos-detallados-por-pantalla)
7. [Componentes Reutilizables](#7-componentes-reutilizables)
8. [Estados y Variantes](#8-estados-y-variantes)
9. [Resumen Cuantitativo](#9-resumen-cuantitativo)
10. [Criterios de Aceptación del Proyecto](#10-criterios-de-aceptación-del-proyecto)
11. [Glosario](#11-glosario)
12. [Changelog](#12-changelog)

---

## 1. Finalidad y Objetivos

### 1.1 Finalidad del Proyecto

Crear un **espacio digital personal** bajo la marca **"Samuel Sarmientos / Samsar"** que funcione simultáneamente como:

- **Proyecto personal de publicación**: un cuaderno de campo digital donde documentar guías técnicas, notas de aprendizaje, experimentos de IA, proyectos open source y juegos educativos desarrollados para mi hijo.
- **Portafolio profesional secundario**: un punto de referencia al que redirigir a reclutadores, empresas o colaboradores que quieran entender mi forma de trabajo, mi experiencia y mis proyectos.

### 1.2 Objetivos Específicos

| # | Objetivo | Métrica de Éxito |
|---|---|---|
| 1 | Publicar contenido técnico de forma sostenible | Al menos 2 posts/mes durante el primer año |
| 2 | Servir como material educativo para estudiantes | Al menos 1 guía por categoría publicada |
| 3 | Documentar proyectos open source | Cada repo con post explicativo vinculado |
| 4 | Preservar el aprendizaje lúdico con mi hijo | Serie de gameplays educativos activa |
| 5 | Actuar como portafolio profesional | CV descargable + proyectos filtrables |
| 6 | Reflejar identidad cultural maya | Tema oscuro y claro con paleta validada |
| 7 | Minimizar costos de operación | Costo mensual ≤ $1 (solo dominio) |
| 8 | Garantizar rendimiento óptimo | Lighthouse > 95 en todas las categorías |

### 1.3 Público Objetivo

| Segmento | Interés Principal | Ruta Recomendada |
|---|---|---|
| **Estudiantes** (escuelas voluntariado) | Guías de desarrollo, fundamentos | `Samsar\|Dev` |
| **Desarrolladores** | Arquitectura, patrones, IA aplicada | `Samsar\|Dev`, `Samsar\|IA` |
| **Entusiastas de IA** | RAG, Agentes, LLM, MCP | `Samsar\|IA` |
| **Padres/educadores** | Juegos educativos, pedagogía | `Samsar\|Games` |
| **Reclutadores/Empresas** | Experiencia, CV, forma de trabajo | `/experiencia`, `/sobre-mi` |
| **Colaboradores open source** | Repos, experimentos | `/proyectos` |
| **Mi hijo** | Gameplays, juegos que desarrollamos | `Samsar\|Games` |

### 1.4 No-Objetivos (fuera de alcance)

- ❌ No es un sitio de servicios profesionales ni freelance (no hay formulario de cotización).
- ❌ No es un blog corporativo ni de una empresa.
- ❌ No incluye e-commerce, membresías ni contenido de pago.
- ❌ No tiene sistema de usuarios ni autenticación pública.
- ❌ No mostrará experiencia profesional en la landing page.

---

## 2. Estructura de Diseño

### 2.1 Identidad Visual — Tema Oscuro (Principal)

**Concepto:** *"El quetzal y el colibrí en la noche maya"* (Obsidiana & Jade)  
Representa el vuelo, la libertad creativa y la conexión con la cultura ancestral a través de tonos minerales y litografía oscura. Es el tema por defecto del sitio.

> **Anotación v1.1:** Se reemplazó la paleta anterior basada en verdes planos por una paleta mineral de tres niveles de basalto, inspirada en la **litografía oscura mesoamericana** (obsidiana, basalto, ceniza volcánica). Esto permite mayor profundidad visual, jerarquía clara entre canvas/card/hover, y mejor contraste con los acentos jade y cinabrio. El jade pasó de `#1F7A5C` (sombrío) a `#00A86B` (imperial) como color primario para ganar vivacidad y contraste WCAG AA sobre fondos oscuros.

| Token CSS | Valor Hex | Nombre | Uso |
|---|---|---|---|
| `--color-bg` | `#0A0E0C` | Obsidiana profunda | Fondo principal (canvas base no reflectante) |
| `--color-bg-elevated` | `#131916` | Basalto superficial | Cards, header, footer, paneles |
| `--color-bg-highlight` | `#1C2420` | Basalto elevado | Bordes sutiles de tarjetas, hover tenue |
| `--color-jade` | `#00A86B` | Jade imperial | Acciones primarias, botones, focus principal |
| `--color-jade-muted` | `#1F7A5C` | Jade sombrío | Bordes estructurales, acentos secundarios |
| `--color-hummingbird` | `#19C3B0` | Colibrí turquesa | Acentos de IA, procesos activos, detalles brillantes |
| `--color-blood` | `#B22222` | Cinabrio ceremonial | Alertas, énfasis crítico, estados destructivos |
| `--color-text` | `#E8E6E1` | Blanco hueso | Texto principal (alto contraste sin brillo agresivo) |
| `--color-text-muted` | `#9AA39E` | Ceniza caliza | Texto secundario, metadata, comentarios |

**Elementos visuales:**
- Siluetas sutiles de quetzal y colibrí (SVG decorativos, opacidad < 0.1).
- Patrones geométricos mayas (greca, grecas escalonadas) como texturas de fondo.
- Glifos mayas como iconos decorativos en secciones.
- Plumas estilizadas en transiciones entre secciones.
- Animación sutil de partículas/plumas en el hero.

### 2.2 Identidad Visual — Tema Claro (Secundario)

**Concepto:** *"El cielo, el sol y el maíz"*  
Representa la fertilidad, el conocimiento y la vida cotidiana maya. Tema alternativo activable por el usuario.

| Token CSS | Valor Hex | Nombre | Uso |
|---|---|---|---|
| `--color-bg` | `#FFFDF7` | Blanco maíz | Fondo principal |
| `--color-bg-elevated` | `#F5F0E8` | Beige mazorca | Cards, header, footer |
| `--color-sky` | `#A7D8F0` | Celeste cielo | Acentos secundarios |
| `--color-sky-deep` | `#87CEEB` | Azul cielo | Links, hover |
| `--color-sun` | `#F4A300` | Amarillo sol | CTAs, énfasis |
| `--color-corn` | `#F7C948` | Amarillo maíz | Detalles brillantes |
| `--color-corn-green` | `#7CB342` | Verde milpa | Bordes, iconos |
| `--color-text` | `#2B2B2B` | Carbón suave | Texto principal |
| `--color-text-muted` | `#6B7280` | Gris piedra | Texto secundario |

**Elementos visuales:**
- Siluetas de mazorcas de maíz, soles y nubes (SVG decorativos).
- Patrones de tejidos mayas en tonos suaves.
- Ilustraciones de pirámides y montañas estilizadas.
- Iconografía solar y agrícola.

### 2.3 Tipografía

Tríada tipográfica optimizada para lectura técnica prolongada, mitigación de fatiga visual, rendimiento óptimo (máximo 3 familias web) y armonía con la geometría mesoamericana:

> **Anotación v1.1:** Se consolidó el sistema tipográfico a **tres familias** (antes cuatro, con Inter + Source Serif 4 + Space Grotesk + JetBrains Mono). Se eliminó `Inter` y `Source Serif 4`, reemplazándolas por **Manrope** como única fuente de cuerpo y lectura larga. Razones:
> - **Rendimiento**: menos familias = menos requests de fuentes, menor CLS, mejor Lighthouse.
> - **Coherencia visual**: Manrope tiene proporciones humanistas que funcionan bien tanto en UI (botones, labels) como en lectura larga (posts), evitando el "salto" visual entre cuerpo y UI.
> - **Identidad**: Manrope tiene un trazo abierto y geométrico que dialoga con la precisión de Space Grotesk y JetBrains Mono sin competir con ellas.
> - **Economía**: 3 familias = 1 fuente display + 1 fuente de texto + 1 fuente monoespaciada. El mínimo viable para un sitio editorial moderno.

| Uso | Fuente | Peso | Tamaño / Interlineado | Criterio de Selección |
|---|---|---|---|---|
| **Headings principales** | Space Grotesk | 700 | `clamp(2rem, 5vw, 3.5rem)` | Geometría angular inspirada en arquitectura, grecas y estelas |
| **Subheadings (H2, H3)** | Space Grotesk | 600 | `clamp(1.25rem, 3vw, 1.75rem)` | Jerarquía nítida y moderna |
| **Cuerpo general y UI** | Manrope | 400 / 500 | `1rem` (16px) / `line-height: 1.6` | Proporciones humanistas abiertas; máxima legibilidad en interfaces |
| **Lectura larga (Blog / Guías)** | Manrope | 400 | `1.125rem` (18px) / `line-height: 1.7` | Previene estrés ocular en lectura técnica prolongada |
| **Código y Snippets** | JetBrains Mono | 400 | `0.9rem` (14.5px) / `line-height: 1.5` | Alta diferenciación de glifos y legibilidad sintáctica |
| **Labels / Telemetría / Fechas** | JetBrains Mono | 500 / 600 | `0.75rem` (12px) / tracking amplio | Precisión técnica y catalogación astronómica/modular |

### 2.4 Espaciado y Grid

- **Contenedor máximo:** `1200px` (lectura de blog: `720px`).
- **Escala de espaciado:** `4px, 8px, 16px, 24px, 32px, 48px, 64px, 96px`.
- **Grid:** 12 columnas en desktop, 8 en tablet, 4 en mobile.
- **Breakpoints:**
  - `sm`: 640px
  - `md`: 768px
  - `lg`: 1024px
  - `xl`: 1280px

### 2.5 Principios de Diseño

1. **Contraste cultural**: lo ancestral (maya) dialoga con lo moderno (tech).
2. **Legibilidad primero**: el blog y las guías son para leer, no para admirar.
3. **Movimiento con propósito**: animaciones que comunican, no que distraen.
4. **Respiración visual**: uso generoso de whitespace.
5. **Coherencia temática**: cada sección refuerza la identidad maya sin caricaturizarla.
6. **Accesibilidad AA**: contraste mínimo 4.5:1 en texto, 3:1 en elementos UI.
7. **Rendimiento como restricción de diseño**: cada decisión visual se valida contra el presupuesto de performance (≤ 3 familias tipográficas, ≤ 30 KB de JS inicial).

---

## 3. Arquitectura Técnica

### 3.1 Stack Definitivo

```
┌─────────────────────────────────────────────────────────────┐
│                    ARQUITECTURA GENERAL                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  CONTENIDO (Git)                                            │
│  ┌──────────────────────────────────────────┐               │
│  │ Markdown / MDX + Content Collections     │               │
│  │ (src/content/blog, src/content/projects) │               │
│  └────────────────┬─────────────────────────┘               │
│                   │                                          │
│                   ▼                                          │
│  BUILD (Astro 6 SSG + islas Vue)                            │
│  ┌──────────────────────────────────────────┐               │
│  │ • Renderizado estático HTML              │               │
│  │ • Islands Vue para interactividad        │               │
│  │ • Tailwind CSS v4 (purga automática)     │               │
│  │ • Zod (validación de esquemas)           │               │
│  └────────────────┬─────────────────────────┘               │
│                   │                                          │
│                   ▼                                          │
│  DEPLOY (Cloudflare Pages)                                  │
│  ┌──────────────────────────────────────────┐               │
│  │ • Edge network (300+ ubicaciones)        │               │
│  │ • SSL automático                         │               │
│  │ • Preview URLs por PR                    │               │
│  │ • Bandwidth ilimitado                    │               │
│  └──────────────────────────────────────────┘               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

> **Nota de contexto técnico:** El autor tiene ~8 años de experiencia con **Vue** y **Angular**, y **cero experiencia con React**. Por lo tanto, cualquier componente interactivo dentro de Astro se implementará con **Vue 3** (Composition API + `<script setup>`) mediante la integración oficial `@astrojs/vue`. Ver roadmap técnico v1.1 para comparativa detallada Astro vs Nuxt vs Eleventy.

### 3.2 Estructura de Directorios

```
samsar.dev/
├── public/
│   ├── favicon.svg
│   ├── og-image.png
│   ├── fonts/
│   └── images/
│       ├── blog/
│       ├── projects/
│       └── avatars/
├── src/
│   ├── components/
│   │   ├── ui/              # Botones, cards, chips, badges
│   │   ├── layout/          # Header, Footer, Nav, ThemeToggle
│   │   ├── blog/            # PostCard, TOC, CodeBlock, Embed
│   │   ├── landing/         # Hero, Pillars, Highlights, CTA
│   │   ├── islands/         # Islas Vue (ThemeToggle, SearchBar, ContactForm)
│   │   └── maya/            # SVG decorativos, animaciones
│   ├── content/
│   │   ├── config.ts        # Esquemas Zod
│   │   ├── blog/
│   │   │   ├── samsar-dev/
│   │   │   ├── samsar-ia/
│   │   │   └── samsar-games/
│   │   └── projects/
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   ├── BlogLayout.astro
│   │   └── ProjectLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── sobre-mi.astro
│   │   ├── experiencia.astro
│   │   ├── proyectos/
│   │   ├── blog/
│   │   ├── contacto.astro
│   │   └── 404.astro
│   ├── styles/
│   │   ├── theme.css        # Tokens CSS
│   │   └── global.css
│   └── utils/
│       ├── reading-time.ts
│       ├── format-date.ts
│       └── seo.ts
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
└── tsconfig.json
```

### 3.3 Modelo de Contenido (Content Collections)

**Esquema de Blog:**

| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| `title` | string | ✅ | Título del post |
| `description` | string | ✅ | Resumen para SEO y cards |
| `pubDate` | Date | ✅ | Fecha de publicación |
| `updatedDate` | Date | ❌ | Fecha de última edición |
| `category` | enum | ✅ | `samsar-dev` \| `samsar-ia` \| `samsar-games` |
| `tags` | string[] | ❌ | Etiquetas libres |
| `cover` | string | ❌ | Imagen de portada |
| `draft` | boolean | ❌ | Si es borrador (default: false) |
| `featured` | boolean | ❌ | Si se destaca en landing |
| `series` | string | ❌ | Nombre de serie (opcional) |

**Esquema de Proyectos:**

| Campo | Tipo | Requerido | Descripción |
|---|---|---|---|
| `title` | string | ✅ | Nombre del proyecto |
| `description` | string | ✅ | Descripción breve |
| `type` | enum | ✅ | `professional` \| `open-source` \| `game` \| `ai-experiment` |
| `stack` | string[] | ✅ | Tecnologías usadas |
| `status` | enum | ✅ | `active` \| `completed` \| `archived` \| `wip` |
| `repo` | string | ❌ | URL del repositorio |
| `demo` | string | ❌ | URL de demo |
| `postSlug` | string | ❌ | Slug del post relacionado |
| `cover` | string | ❌ | Imagen del proyecto |
| `featured` | boolean | ❌ | Si se destaca |

### 3.4 Estrategia de Rendimiento

| Métrica | Objetivo | Estrategia |
|---|---|---|
| **LCP** | < 1.5s | HTML estático + fuentes preload |
| **FID** | < 100ms | Islas mínimas, JS diferido |
| **CLS** | < 0.05 | Dimensiones explícitas en imágenes + `font-display: swap` con métricas ajustadas |
| **JS inicial** | < 30KB | Solo ThemeToggle, buscador y formulario (islas Vue) |
| **CSS** | < 15KB | Tailwind purgado |
| **Familias tipográficas** | ≤ 3 | Space Grotesk + Manrope + JetBrains Mono (v1.1) |
| **Lighthouse** | > 95 | Todas las categorías |

---

## 4. Funcionalidades Mínimas Requeridas

### 4.1 Funcionalidades Esenciales (MVP)

| # | Funcionalidad | Descripción | Prioridad |
|---|---|---|---|
| F1 | **Navegación principal** | Header con links a todas las secciones | 🔴 Crítica |
| F2 | **Toggle de tema** | Cambio oscuro/claro persistente | 🔴 Crítica |
| F3 | **Landing page** | Página de inicio sin contenido laboral | 🔴 Crítica |
| F4 | **Blog index** | Lista de posts con filtros por categoría | 🔴 Crítica |
| F5 | **Post individual** | Renderizado MDX con TOC y bloques de código | 🔴 Crítica |
| F6 | **Categorías del blog** | 3 rutas: samsar-dev, samsar-ia, samsar-games | 🔴 Crítica |
| F7 | **Página Sobre mí** | Bio, intereses, valores | 🔴 Crítica |
| F8 | **Página Experiencia** | Timeline con CV descargable | 🔴 Crítica |
| F9 | **Grid de Proyectos** | Cards filtrables por tipo | 🔴 Crítica |
| F10 | **Página de contacto** | Formulario + enlaces a redes | 🔴 Crítica |
| F11 | **RSS Feed** | Suscripción a posts | 🟠 Alta |
| F12 | **SEO básico** | Metadatos, Open Graph, sitemap | 🟠 Alta |
| F13 | **Responsive** | Mobile, tablet, desktop | 🔴 Crítica |
| F14 | **404 personalizada** | Página de error con temática maya | 🟡 Media |

### 4.2 Funcionalidades Deseables (Post-MVP)

| # | Funcionalidad | Descripción | Prioridad |
|---|---|---|---|
| F15 | **Buscador** | Búsqueda client-side con Fuse.js o Pagefind | 🟠 Alta |
| F16 | **CMS visual** | Sveltia CMS para editar desde navegador | 🟡 Media |
| F17 | **Comentarios** | Giscus (GitHub Discussions) | 🟡 Media |
| F18 | **Analytics** | Cloudflare Web Analytics (sin cookies) | 🟡 Media |
| F19 | **Embeds de video** | Integración con YouTube | 🟠 Alta |
| F20 | **Series de posts** | Agrupación de posts relacionados | 🟡 Media |
| F21 | **Modo lectura** | Ancho de columna optimizado | 🟢 Baja |
| F22 | **Compartir en redes** | Botones de share por post | 🟢 Baja |

### 4.3 Funcionalidades Excluidas

- ❌ Autenticación de usuarios.
- ❌ Comentarios con registro.
- ❌ Newsletter con backend propio.
- ❌ E-commerce.
- ❌ Multi-idioma (solo español en MVP).

---

## 5. Inventario de Pantallas

### 5.1 Listado Completo de Pantallas

| # | Ruta | Nombre | Tipo | Prioridad |
|---|---|---|---|---|
| 1 | `/` | Landing Page | Estática | 🔴 Crítica |
| 2 | `/sobre-mi` | Sobre mí | Estática | 🔴 Crítica |
| 3 | `/experiencia` | Experiencia / CV | Estática | 🔴 Crítica |
| 4 | `/proyectos` | Grid de Proyectos | Listado dinámico | 🔴 Crítica |
| 5 | `/proyectos/[slug]` | Detalle de Proyecto | Dinámica | 🟠 Alta |
| 6 | `/blog` | Blog Index | Listado dinámico | 🔴 Crítica |
| 7 | `/blog/samsar-dev` | Categoría Dev | Listado filtrado | 🔴 Crítica |
| 8 | `/blog/samsar-ia` | Categoría IA | Listado filtrado | 🔴 Crítica |
| 9 | `/blog/samsar-games` | Categoría Games | Listado filtrado | 🔴 Crítica |
| 10 | `/blog/[slug]` | Post Individual | Dinámica | 🔴 Crítica |
| 11 | `/blog/tags/[tag]` | Posts por etiqueta | Dinámica | 🟡 Media |
| 12 | `/contacto` | Contacto | Estática | 🔴 Crítica |
| 13 | `/404` | Página no encontrada | Estática | 🟡 Media |
| 14 | `/rss.xml` | Feed RSS | XML | 🟠 Alta |
| 15 | `/sitemap.xml` | Sitemap | XML | 🟠 Alta |
| 16 | `/admin` | Sveltia CMS | SPA externa | 🟢 Baja (opcional) |

**Total: 16 pantallas** (13 páginas visibles + 3 técnicas).

### 5.2 Mapa de Navegación

```
                              ┌──────────────┐
                              │   Landing    │
                              │      /       │
                              └──────┬───────┘
                                     │
        ┌────────────┬───────────────┼───────────────┬────────────┐
        │            │               │               │            │
        ▼            ▼               ▼               ▼            ▼
   ┌─────────┐  ┌──────────┐   ┌──────────┐   ┌──────────┐  ┌─────────┐
   │Sobre mí │  │Proyectos │   │   Blog   │   │Experiencia│ │Contacto │
   └─────────┘  └────┬─────┘   └────┬─────┘   └──────────┘  └─────────┘
                     │              │
                     ▼              ├──────────────┬─────────────┐
              ┌────────────┐        ▼              ▼             ▼
              │  Detalle   │   ┌────────┐    ┌────────┐    ┌────────┐
              │  Proyecto  │   │  Dev   │    │   IA   │    │ Games  │
              └────────────┘   └───┬────┘    └───┬────┘    └───┬────┘
                                   │             │             │
                                   ▼             ▼             ▼
                              ┌─────────┐   ┌─────────┐   ┌─────────┐
                              │  Post   │   │  Post   │   │  Post   │
                              │Detalle  │   │Detalle  │   │Detalle  │
                              └─────────┘   └─────────┘   └─────────┘
```

---

## 6. Elementos Detallados por Pantalla

### 🏠 Pantalla 1: Landing Page (`/`)

**Propósito:** Explicar el motivo del sitio sin presentar experiencia laboral. Moderna, visual, con animaciones.

**Estructura de secciones (de arriba a abajo):**

| # | Sección | Descripción | Elementos |
|---|---|---|---|
| 1.1 | **Header** | Navegación sticky | Logo, links (Inicio, Sobre mí, Proyectos, Blog, Experiencia, Contacto), ThemeToggle, menú hamburguesa (mobile) |
| 1.2 | **Hero** | Sección de impacto | Título principal ("Samsar: código, cultura y curiosidad"), subtítulo, 2 CTAs ("Explorar blog", "Ver proyectos"), animación de quetzal/colibrí, partículas sutiles |
| 1.3 | **Pilares** | "Qué encontrarás" | 3 cards: Samsar\|Dev, Samsar\|IA, Samsar\|Games con icono, título, descripción, link a categoría |
| 1.4 | **Sobre el proyecto** | Propósito del sitio | Texto breve, imagen/ilustración, 3 bullets: aprendizaje, open source, educación con mi hijo |
| 1.5 | **Destacados** | Últimos posts | Grid de 3 PostCards (featured=true) |
| 1.6 | **Proyectos recientes** | 3 proyectos destacados | Grid de 3 ProjectCards |
| 1.7 | **CTA final** | Invitación | "Explora el blog" o "Conoce mi trabajo" + botón |
| 1.8 | **Footer** | Cierre | Links, redes, copyright, "Hecho con ❤ en Guatemala" |

**Elementos individuales totales:** ~35-40 (contando cada link, botón, card, icono).

**Animaciones:**
- Fade-in escalonado en hero.
- Parallax suave en siluetas mayas.
- Hover scale en cards.
- Transiciones de sección con glifos mayas.

---

### 👤 Pantalla 2: Sobre mí (`/sobre-mi`)

**Propósito:** Presentación personal y profesional breve. Legibilidad prioritaria.

| # | Sección | Elementos |
|---|---|---|
| 2.1 | **Header** | (Compartido) |
| 2.2 | **Hero personal** | Avatar, nombre, tagline ("Ingeniero de Software, Arquitecto IA, papá y aprendiz eterno"), ubicación |
| 2.3 | **Bio** | 3-4 párrafos sobre quién soy, mi enfoque, mi filosofía de trabajo |
| 2.4 | **Intereses** | Grid de 6 items: desarrollo, arquitectura, IA, videojuegos, educación, cultura maya |
| 2.5 | **Valores** | Lista de 5 valores: aprendizaje continuo, open source, mentoría, calidad técnica, equilibrio |
| 2.6 | **Stack técnico** | Chips agrupados: Backend, Frontend, Cloud, IA, Datos |
| 2.7 | **Fuera del código** | Sección corta: familia, cultura, hobbies |
| 2.8 | **CTA contacto** | "Hablemos" → /contacto |
| 2.9 | **Footer** | (Compartido) |

**Elementos individuales:** ~25-30.

---

### 💼 Pantalla 3: Experiencia / CV (`/experiencia`)

**Propósito:** Portafolio profesional con timeline y CV descargable.

| # | Sección | Elementos |
|---|---|---|
| 3.1 | **Header** | (Compartido) |
| 3.2 | **Título + CTA descarga** | "Experiencia Profesional" + botón "Descargar CV (PDF)" |
| 3.3 | **Resumen ejecutivo** | 2-3 párrafos destacando años de experiencia, áreas, impacto |
| 3.4 | **Filtros** | Chips: Todos, Backend, Frontend, Cloud/DevOps, IA, Liderazgo |
| 3.5 | **Timeline de roles** | Cada rol con: empresa, cargo, fechas, ubicación, 3-5 bullets de logros, stack chips |
| 3.6 | **Skills agrupadas** | Backend & APIs, Frontend & Web, Cloud/DevOps/Data, IA & Integraciones, Liderazgo |
| 3.7 | **Educación** | Lista de estudios y certificaciones |
| 3.8 | **Idiomas** | Español nativo, Inglés profesional |
| 3.9 | **CTA contacto** | "¿Trabajamos juntos?" |
| 3.10 | **Footer** | (Compartido) |

**Elementos individuales:** ~40-45 (por la cantidad de roles y bullets).

---

### 🚀 Pantalla 4: Grid de Proyectos (`/proyectos`)

**Propósito:** Catálogo visual de proyectos filtrable.

| # | Sección | Elementos |
|---|---|---|
| 4.1 | **Header** | (Compartido) |
| 4.2 | **Título + intro** | "Proyectos" + descripción breve |
| 4.3 | **Filtros por tipo** | Chips: Todos, Profesionales, Open Source, Juegos, Experimentos IA |
| 4.4 | **Grid de ProjectCards** | 9-12 cards con: cover, título, descripción, stack chips, status badge, links |
| 4.5 | **Paginación o "Ver más"** | Carga incremental |
| 4.6 | **CTA** | "¿Tienes una idea? Conversemos" |
| 4.7 | **Footer** | (Compartido) |

**Elementos individuales:** ~30 + (12 × 6) = ~100 elementos si hay 12 proyectos.

---

### 📄 Pantalla 5: Detalle de Proyecto (`/proyectos/[slug]`)

**Propósito:** Página individual con información completa del proyecto.

| # | Sección | Elementos |
|---|---|---|
| 5.1 | **Header** | (Compartido) |
| 5.2 | **Breadcrumbs** | Inicio > Proyectos > [Nombre] |
| 5.3 | **Hero del proyecto** | Cover, título, status badge, stack chips, links (repo, demo) |
| 5.4 | **Descripción** | Contenido MDX completo |
| 5.5 | **Galería/Screenshots** | Grid de imágenes |
| 5.6 | **Video embebido** | YouTube (si aplica) |
| 5.7 | **Post relacionado** | Card del post explicativo |
| 5.8 | **Navegación** | Proyecto anterior / siguiente |
| 5.9 | **Footer** | (Compartido) |

**Elementos individuales:** ~20-25.

---

### 📰 Pantalla 6: Blog Index (`/blog`)

**Propósito:** Listado general de posts con filtros.

| # | Sección | Elementos |
|---|---|---|
| 6.1 | **Header** | (Compartido) |
| 6.2 | **Título + intro** | "Blog" + descripción |
| 6.3 | **Buscador** | Input con icono (isla Vue con Fuse.js) |
| 6.4 | **Filtros por categoría** | Chips: Todos, Samsar\|Dev, Samsar\|IA, Samsar\|Games |
| 6.5 | **Filtros por etiqueta** | Chips secundarios (opcional) |
| 6.6 | **Lista de PostCards** | 10-15 cards con: cover, categoría, título, descripción, fecha, tiempo lectura, tags |
| 6.7 | **Paginación** | Anterior / Siguiente / números |
| 6.8 | **RSS link** | Icono + link a /rss.xml |
| 6.9 | **Footer** | (Compartido) |

**Elementos individuales:** ~20 + (15 × 8) = ~140 elementos.

---

### 🏷️ Pantalla 7-9: Categorías del Blog

**Rutas:** `/blog/samsar-dev`, `/blog/samsar-ia`, `/blog/samsar-games`

**Propósito:** Listado filtrado por categoría específica.

| # | Sección | Elementos |
|---|---|---|
| 7.1 | **Header** | (Compartido) |
| 7.2 | **Hero de categoría** | Icono temático, título, descripción, contador de posts |
| 7.3 | **Descripción de la categoría** | Párrafo explicando el propósito |
| 7.4 | **Lista de PostCards** | Cards filtradas por categoría |
| 7.5 | **Navegación entre categorías** | Tabs o links a otras categorías |
| 7.6 | **Paginación** | Si hay muchos posts |
| 7.7 | **Footer** | (Compartido) |

**Elementos individuales:** ~15-18 por categoría.

**Descripciones temáticas:**

- **Samsar|Dev**: "Guías de desarrollo, manuales de arquitectura, patrones de diseño y notas de ingeniería."
- **Samsar|IA**: "Exploraciones sobre IA generativa, LLMs, agentes, RAG, LangGraph y MCP."
- **Samsar|Games**: "Desarrollo de videojuegos, juegos educativos y los gameplays de mi hijo."

---

### 📖 Pantalla 10: Post Individual (`/blog/[slug]`)

**Propósito:** Página de lectura optimizada para contenido largo.

| # | Sección | Elementos |
|---|---|---|
| 10.1 | **Header** | (Compartido) |
| 10.2 | **Breadcrumbs** | Inicio > Blog > Categoría > [Título] |
| 10.3 | **Hero del post** | Categoría badge, título, descripción, fecha, tiempo lectura, autor |
| 10.4 | **Cover image** | Imagen destacada (opcional) |
| 10.5 | **Tabla de contenidos (TOC)** | Sidebar sticky en desktop, colapsable en mobile |
| 10.6 | **Contenido MDX** | Headings, párrafos, listas, código, blockquotes, callouts |
| 10.7 | **Bloques de código** | Syntax highlighting + botón copiar |
| 10.8 | **Embeds** | YouTube responsive, CodePen, tweets |
| 10.9 | **Callouts** | Notas, advertencias, tips (estilos diferenciados) |
| 10.10 | **Tags** | Chips al final del post |
| 10.11 | **Compartir** | Botones de share (opcional) |
| 10.12 | **Navegación** | Post anterior / siguiente |
| 10.13 | **Posts relacionados** | 3 cards por categoría o tags |
| 10.14 | **Comentarios** | Giscus (opcional) |
| 10.15 | **Footer** | (Compartido) |

**Elementos individuales:** ~30-40 (según contenido).

---

### 📬 Pantalla 11: Contacto (`/contacto`)

**Propósito:** Canal de comunicación simple.

| # | Sección | Elementos |
|---|---|---|
| 11.1 | **Header** | (Compartido) |
| 11.2 | **Título + intro** | "Hablemos" + mensaje claro sobre tipos de consulta |
| 11.3 | **Formulario** | Nombre, email, asunto, mensaje, botón enviar, validación |
| 11.4 | **Enlaces directos** | Email, LinkedIn, GitHub con iconos |
| 11.5 | **Mensaje de tipos de consulta** | "Consultas profesionales, colaboraciones open source, contenido educativo" |
| 11.6 | **Footer** | (Compartido) |

**Elementos individuales:** ~15.

---

### 🚫 Pantalla 12: 404 (`/404`)

**Propósito:** Página de error con personalidad.

| # | Sección | Elementos |
|---|---|---|
| 12.1 | **Header** | (Compartido) |
| 12.2 | **Ilustración** | Glifo maya o colibrí perdido |
| 12.3 | **Mensaje** | "404 — Esta página se perdió en la selva" |
| 12.4 | **CTAs** | "Volver al inicio" + "Explorar blog" |
| 12.5 | **Footer** | (Compartido) |

**Elementos individuales:** ~8.

---

### 📡 Pantallas Técnicas

| # | Ruta | Elementos |
|---|---|---|
| 13 | `/rss.xml` | Feed generado por `@astrojs/rss` |
| 14 | `/sitemap.xml` | Sitemap generado por `@astrojs/sitemap` |
| 15 | `/robots.txt` | Archivo estático |
| 16 | `/admin` | Sveltia CMS (opcional, post-MVP) |

---

## 7. Componentes Reutilizables

### 7.1 Componentes de Layout

| Componente | Descripción | Usado en |
|---|---|---|
| `<Header />` | Navegación sticky con logo, links, ThemeToggle, menú mobile | Todas las pantallas |
| `<Footer />` | Links, redes, copyright, temática maya | Todas las pantallas |
| `<Nav />` | Links de navegación internos | Header |
| `<ThemeToggle />` (isla Vue) | Isla de cambio de tema | Header |
| `<MobileMenu />` (isla Vue) | Menú hamburguesa | Header (mobile) |
| `<Breadcrumbs />` | Navegación jerárquica | Post, Proyecto |

### 7.2 Componentes UI

| Componente | Descripción | Variantes |
|---|---|---|
| `<Button />` | Botón reutilizable | `primary`, `secondary`, `ghost`, `danger` |
| `<Chip />` | Etiqueta pequeña | `category`, `tag`, `stack`, `filter` |
| `<Badge />` | Indicador de estado | `active`, `completed`, `wip`, `archived` |
| `<Card />` | Contenedor elevado | `default`, `interactive`, `featured` |
| `<Callout />` | Bloque destacado | `note`, `warning`, `tip`, `danger` |
| `<CodeBlock />` | Bloque de código | Con copiar y lenguaje |
| `<Embed />` | Video/iframe responsive | `youtube`, `codepen` |
| `<TOC />` | Tabla de contenidos | Sticky sidebar |
| `<Avatar />` | Imagen de perfil | `sm`, `md`, `lg` |
| `<Icon />` | Sistema de iconos SVG | Múltiples |

### 7.3 Componentes de Contenido

| Componente | Descripción | Usado en |
|---|---|---|
| `<PostCard />` | Card de post | Blog index, categorías, landing |
| `<ProjectCard />` | Card de proyecto | Grid, landing |
| `<FeaturedPosts />` | Grid de posts destacados | Landing |
| `<FeaturedProjects />` | Grid de proyectos destacados | Landing |
| `<TimelineItem />` | Item de experiencia | /experiencia |
| `<SkillGroup />` | Grupo de chips de skills | /experiencia, /sobre-mi |
| `<CategoryHero />` | Hero de categoría | Páginas de categoría |
| `<PostNavigation />` | Anterior / siguiente | Post |
| `<RelatedPosts />` | Grid de posts relacionados | Post |
| `<Pagination />` | Paginación | Blog index, categorías |

### 7.4 Componentes Temáticos Mayas

| Componente | Descripción | Uso |
|---|---|---|
| `<QuetzalSVG />` | Silueta de quetzal | Landing hero |
| `<HummingbirdSVG />` | Silueta de colibrí | Decoraciones |
| `<MayaPattern />` | Patrón geométrico | Fondos de sección |
| `<GlyphIcon />` | Glifos mayas | Iconos decorativos |
| `<FeatherDivider />` | Separador de plumas | Transiciones |
| `<CornSVG />` | Mazorca (tema claro) | Tema claro |
| `<SunSVG />` | Sol (tema claro) | Tema claro |

### 7.5 Islas Vue (Interactividad)

| Isla | Directiva | Propósito |
|---|---|---|
| `<ThemeToggle />` | `client:load` | Cambio de tema persistente |
| `<SearchBar />` | `client:idle` | Búsqueda de posts con Fuse.js |
| `<ContactForm />` | `client:visible` | Formulario con validación |
| `<ProjectFilters />` | `client:visible` | Filtros de proyectos |
| `<MobileMenu />` | `client:load` | Menú responsive |

---

## 8. Estados y Variantes

### 8.1 Estados Globales del Sitio

| Estado | Descripción | Implementación |
|---|---|---|
| **Tema oscuro** | Por defecto | `data-theme="dark"` en `<html>` |
| **Tema claro** | Persistente | `data-theme="light"` + localStorage |
| **Preferencia del sistema** | Detecta `prefers-color-scheme` | Fallback inicial |
| **Modo reducido de movimiento** | Respeta `prefers-reduced-motion` | Desactiva animaciones |
| **Menú mobile abierto** | Overlay | Estado local en isla Vue |
| **Buscador activo** | Filtrado en vivo | Estado local en isla Vue |

### 8.2 Estados de Componentes

| Componente | Estados |
|---|---|
| **Button** | default, hover, focus, active, disabled, loading |
| **Card** | default, hover, focus, selected |
| **Chip** | default, hover, selected, disabled |
| **Input** | default, focus, error, disabled, filled |
| **Form** | idle, validating, submitting, success, error |
| **Link** | default, hover, visited, focus, active |
| **PostCard** | default, hover, featured, draft |
| **ProjectCard** | default, hover, featured, archived |

### 8.3 Estados de Carga

| Estado | Descripción |
|---|---|
| **Skeleton** | Placeholder de PostCard mientras carga (aunque es estático, útil para búsqueda) |
| **Empty state** | "No hay posts en esta categoría aún" |
| **Error state** | "Algo salió mal, intenta de nuevo" |
| **Loading** | Spinner en formulario de contacto |
| **Success** | Mensaje de confirmación tras enviar formulario |

---

## 9. Resumen Cuantitativo

### 9.1 Conteo de Pantallas

| Tipo | Cantidad |
|---|---|
| Pantallas visibles principales | 11 |
| Pantallas de listado dinámico | 5 (blog index, 3 categorías, tags) |
| Pantallas de detalle dinámico | 2 (post, proyecto) |
| Pantallas técnicas | 4 (RSS, sitemap, robots, 404) |
| Pantalla admin (opcional) | 1 |
| **Total** | **16-17 pantallas** |

### 9.2 Conteo de Componentes

| Categoría | Cantidad estimada |
|---|---|
| Layout | 6 |
| UI base | 10 |
| Contenido | 10 |
| Temáticos mayas | 7 |
| Islas Vue | 5 |
| **Total** | **~38 componentes** |

### 9.3 Conteo de Elementos por Pantalla

| Pantalla | Elementos estimados |
|---|---|
| Landing | 35-40 |
| Sobre mí | 25-30 |
| Experiencia | 40-45 |
| Proyectos (grid) | 100+ (con 12 proyectos) |
| Detalle Proyecto | 20-25 |
| Blog Index | 140+ (con 15 posts) |
| Categoría | 15-18 cada una |
| Post Individual | 30-40 |
| Contacto | 15 |
| 404 | 8 |
| **Total estimado** | **~450-500 elementos** |

### 9.4 Cobertura Funcional

| Área | MVP | Post-MVP |
|---|---|---|
| Navegación | ✅ | — |
| Temas | ✅ | — |
| Blog | ✅ | + Comentarios, + Buscador |
| Proyectos | ✅ | + Filtros avanzados |
| Portafolio | ✅ | — |
| CMS | ❌ | ✅ Sveltia |
| Analytics | ❌ | ✅ Cloudflare |
| SEO | ✅ | + Schema.org |

---

## 10. Criterios de Aceptación del Proyecto

El proyecto se considerará completo cuando:

1. ✅ Todas las 11 pantallas visibles estén implementadas y navegables.
2. ✅ El toggle de tema funcione y persista la preferencia.
3. ✅ El blog renderice correctamente en las 3 categorías.
4. ✅ Los bloques de código tengan syntax highlighting y botón copiar.
5. ✅ Los embeds de YouTube sean responsive.
6. ✅ El sitio sea completamente responsive (mobile, tablet, desktop).
7. ✅ Lighthouse > 95 en Performance, Accessibility, Best Practices, SEO.
8. ✅ El formulario de contacto funcione (Formspree o similar).
9. ✅ El CV sea descargable en PDF.
10. ✅ El sitio esté desplegado en Cloudflare Pages con dominio personalizado.
11. ✅ Cada push a `main` despliegue automáticamente.
12. ✅ El contenido esté versionado en Git y sea portable.
13. ✅ **v1.1** — El tema oscuro use la paleta "Obsidiana & Jade" con los tokens `--color-bg`, `--color-bg-elevated` y `--color-bg-highlight` diferenciados.
14. ✅ **v1.1** — Solo se carguen 3 familias tipográficas (Space Grotesk, Manrope, JetBrains Mono) con `font-display: swap` y preload de las fuentes críticas.

---

## 11. Glosario

| Término | Definición |
|---|---|
| **SSG** | Static Site Generator — genera HTML estático en build time |
| **Islands Architecture** | Patrón donde solo componentes interactivos cargan JS |
| **Content Collections** | Sistema de Astro para tipar y validar contenido Markdown |
| **MDX** | Markdown con componentes JSX embebidos |
| **TOC** | Table of Contents — tabla de contenidos |
| **RAG** | Retrieval-Augmented Generation |
| **MCP** | Model Context Protocol |
| **DevSecOps** | Desarrollo + Seguridad + Operaciones |
| **IaC** | Infrastructure as Code |
| **CTA** | Call To Action |
| **Isla Vue** | Componente Vue hidratado dentro de Astro vía `@astrojs/vue` |
| **Token CSS** | Variable CSS (`--color-jade`) que define un valor de diseño reutilizable |

---

## 12. Changelog

### v1.1 — Octubre 2026

**Tipo:** Refinamiento de identidad visual y sistema tipográfico.

#### 🎨 Identidad Visual — Tema Oscuro

| Cambio | Antes | Después | Razón |
|---|---|---|---|
| Concepto | "El quetzal y el colibrí en la noche maya" | "El quetzal y el colibrí en la noche maya" (Obsidiana & Jade) | Nombrar la paleta facilita referencia interna |
| `--color-bg` | `#0A0A0A` | `#0A0E0C` | Tinte sutil hacia el verde obsidiana para evitar negro puro |
| `--color-bg-elevated` | `#0F1411` | `#131916` | Aumentar diferenciación con el fondo base |
| `--color-bg-highlight` | ❌ No existía | `#1C2420` | Nuevo token para bordes y hover tenue |
| `--color-jade` | `#1F7A5C` | `#00A86B` | Jade imperial como primario, mejor contraste sobre fondos oscuros |
| `--color-jade-muted` | ❌ No existía | `#1F7A5C` | Antiguo jade reubicado como acento secundario |
| `--color-blood` | `#8B1E1E` | `#B22222` | Cinabrio ceremonial, más vivo y cercano al pigmento maya |
| `--color-text-muted` | `#9CA3AF` | `#9AA39E` | Tinte cálido-verdoso para armonizar con la paleta mineral |

**Impacto:** Mayor profundidad visual mediante 3 niveles de basalto (`bg`, `elevated`, `highlight`), mejor jerarquía entre canvas y componentes, y contraste WCAG AA verificado en texto principal y muted.

#### 🔤 Sistema Tipográfico

| Cambio | Antes | Después | Razón |
|---|---|---|---|
| Familias totales | 4 (Space Grotesk, Inter, Source Serif 4, JetBrains Mono) | **3** (Space Grotesk, Manrope, JetBrains Mono) | Reducir requests, mejorar rendimiento y coherencia |
| Cuerpo general | Inter | **Manrope** | Proporciones humanistas abiertas, mejor legibilidad en UI y lectura larga |
| Lectura larga (blog) | Source Serif 4 | **Manrope** | Evitar el "salto" visual entre cuerpo y blog; unificar ritmo tipográfico |
| Labels / telemetría | (no especificado) | **JetBrains Mono 500/600** | Diferenciar datos técnicos con tracking amplio |
| Criterio de selección | ❌ No documentado | ✅ Columna añadida a la tabla | Justificar cada elección contra identidad y rendimiento |

**Impacto:** Menos peso de fuentes, CLS más bajo, mejor armonía visual entre secciones editoriales y UI. La tríada Space Grotesk + Manrope + JetBrains Mono se alinea con la estética mesoamericana (geometría + precisión + humanismo).

#### 📄 Documentación

- Añadida columna **Criterio de Selección** a la tabla tipográfica (§2.3).
- Añadidas **anotaciones v1.1** inline en §2.1, §2.3 y §3.4 explicando los cambios.
- Actualizado conteo de componentes (§9.2) para reflejar las **islas Vue** documentadas en §7.5.
- Añadido objetivo de rendimiento **"Familias tipográficas ≤ 3"** en §3.4.
- Añadidos criterios de aceptación **13 y 14** en §10.
- Añadidos términos **"Isla Vue"** y **"Token CSS"** al glosario (§11).
- Actualizado §3.1 con nota explícita sobre Vue como framework de islas.
- Actualizado §3.2 con carpeta `islands/` en la estructura de directorios.

---

### v1.0 — Octubre 2026

**Tipo:** Versión inicial aprobada para desarrollo.

- Definición de finalidad y objetivos del proyecto.
- Estructura de diseño inicial (paleta oscura y clara, tipografía, espaciado).
- Arquitectura técnica (Astro 6 + Content Collections + Cloudflare Pages).
- Funcionalidades MVP y post-MVP.
- Inventario de 16 pantallas y sus elementos.
- Componentes reutilizables (~33).
- Estados y variantes.
- Resumen cuantitativo y criterios de aceptación.

---

> **Documento vivo**: esta especificación se actualizará conforme el proyecto evolucione. Cualquier cambio en el alcance, diseño o arquitectura debe reflejarse aquí antes de implementarse, con su correspondiente entrada en el **Changelog** (§12) y bump de versión.