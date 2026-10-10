# 02-project-structure: Estructura del Proyecto

Organización de directorios, responsabilidades por carpeta y convenciones de nomenclatura para **Samsar | Sitio web personal**.

---

## 1. Árbol de Directorios

```text
samsar-site/
├── public/                   # Archivos estáticos servidos sin procesar
│   ├── favicon.svg           # Favicon del sitio
│   ├── og-image.png          # Tarjeta Open Graph 1200x630 (26 KB, PNG sin procesar)
│   ├── robots.txt            # Directivas para rastreadores (incluye el sitemap)
│   ├── _headers              # Cabeceras de caché de Cloudflare Pages
│   ├── cv-samuel-sarmientos.pdf  # CV descargable (/experiencia)
│   └── fonts/                # Fuentes WOFF2 autoalojadas
│       ├── space-grotesk/    # 600, 700
│       ├── manrope/          # 400, 500
│       └── jetbrains-mono/   # 400, 500
├── src/
│   ├── assets/               # Imágenes importadas por componentes
│   │   └── avatar.png        # Avatar de /sobre-mi
│   ├── components/           # Componentes reutilizables
│   │   ├── ui/               # Button, Card, Chip, Badge, Callout
│   │   ├── layout/           # Header, Footer, Nav
│   │   ├── blog/             # PostCard, TOC, Breadcrumbs, CategoryHero,
│   │   │                     #   Pagination, PostNavigation, RelatedPosts
│   │   ├── landing/          # Hero, Pillars, AboutProject, CtaSection,
│   │   │                     #   FeaturedPosts, RecentProjects
│   │   ├── portfolio/        # ProjectCard
│   │   ├── islands/          # Islas Vue: ThemeToggle, MobileMenu,
│   │   │                     #   ExperienceTimeline
│   │   └── maya/             # SVGs decorativos (ver NOTICE.md)
│   │       ├── NOTICE.md     # Licencia: estos SVG no son MIT
│   │       └── placeholders/ # Reemplazos MIT: GrecaBorder, QuetzalSilhouette
│   ├── content.config.ts     # Colecciones y esquemas Zod
│   ├── content/              # Contenido en Markdown / MDX
│   │   ├── blog/             # Artículos divididos en 3 pilares
│   │   │   ├── samsar-dev/   # guia-clean-architecture-frontend.md
│   │   │   ├── samsar-ia/    # primeros-pasos-sistemas-multi-agente.mdx
│   │   │   └── samsar-games/ # diseno-ludico-pedagogia-con-mi-hijo.md
│   │   └── projects/         # clean-architecture-minimal-apis.md,
│   │                         #   experiencias-gamificadas-edtech.md,
│   │                         #   modernizacion-core-bancario.md,
│   │                         #   orquestacion-agentica-mcp.mdx
│   ├── data/                 # Datos estructurados en TypeScript
│   │   ├── experience.ts     # Trayectoria laboral, skills y educación
│   │   └── profile.ts        # Datos personales y de contacto
│   ├── layouts/              # Plantillas base de página (.astro)
│   │   ├── BaseLayout.astro  # Layout raíz con script anti-FOUC y SEO
│   │   └── BlogLayout.astro  # Layout de lectura con TOC y 70ch
│   ├── pages/                # Enrutamiento basado en archivos
│   │   ├── index.astro       # Portada (/)
│   │   ├── sobre-mi.astro    # Biografía (/sobre-mi)
│   │   ├── experiencia.astro # Timeline y CV (/experiencia)
│   │   ├── contacto.astro    # Enlaces de contacto (/contacto)
│   │   ├── 404.astro         # Error 404
│   │   ├── rss.xml.ts        # Feed RSS (/rss.xml)
│   │   ├── blog/             # Catálogo, pilares, etiquetas y lectura
│   │   │   ├── index.astro   # Catálogo (/blog)
│   │   │   ├── [...slug].astro  # Lectura del artículo
│   │   │   ├── [category]/   # Un pilar por carpeta (/blog/samsar-dev, ...)
│   │   │   └── tags/[tag].astro # Filtro por etiqueta
│   │   └── proyectos/        # Catálogo, filtros y fichas
│   │       ├── index.astro   # Catálogo (/proyectos)
│   │       ├── [...slug].astro  # Ficha de proyecto
│   │       └── [type]/       # Filtro por tipo (/proyectos/game, ...)
│   ├── styles/               # Arquitectura de estilos CSS
│   │   ├── theme.css         # Tokens de diseño y custom properties
│   │   └── global.css        # Directiva Tailwind v4 y resets
│   └── utils/                # Funciones de utilidad puras
│       ├── formatDate.ts     # Formateo de fechas en español
│       └── readingTime.ts    # Cálculo de minutos de lectura
├── astro.config.mjs          # Configuración de Astro, Vue y plugins Vite
├── package.json              # Dependencias del proyecto (Bun / npm)
├── tsconfig.json             # Configuración estricta de TypeScript
└── AGENTS.md                 # Reglas operativas para agentes de IA
```

> **`public/og-image.png`** (creado en la [tarea 06 de la Fase 7](../05-tasks/07-maintenance/06-og-image-asset.md)): **1200x630 px, PNG RGB, 26 KB** contra el límite explícito de **300 KB** que se acordó aquí, porque `04-performance.md` **no** define presupuesto para imágenes. Tema oscuro *Obsidiana & Jade*, con tokens leídos de `theme.css`: fondo `#0a0e0c`, marca `#e8e6e1`, tagline `#9aa39e`, punto en Jade `#00a86b` y pilares `#1fbf84`. Lleva un solo mensaje, legible como miniatura: la marca `Samsar.` tal como la pinta el Header, el tagline *"Código, cultura y curiosidad"* y los tres pilares. El marco de grecas reutiliza la geometría de `GrecaBorder.astro` a 8.6 % de opacidad, dentro del 6-10 % que permite [`docs/03-design/06-maya-motifs.md`](../03-design/06-maya-motifs.md).
>
> Vive en `public/` a propósito: se sirve sin pasar por la optimización de Astro, porque los rastreadores esperan una URL estable y predecible. Su peso es, por tanto, responsabilidad del autor.

---

## 2. Convenciones de Ubicación

| Si vas a crear... | Colócalo en... | Tecnología |
|---|---|---|
| Un botón, card o badge estático | `src/components/ui/` | `.astro` |
| Una barra de navegación o footer | `src/components/layout/` | `.astro` |
| Una tarjeta, TOC o navegación de artículo | `src/components/blog/` | `.astro` |
| Una sección de la portada (hero, pilares, destacados) | `src/components/landing/` | `.astro` |
| Una tarjeta o ficha de proyecto | `src/components/portfolio/` | `.astro` |
| Un componente con estado reactivo (toggle, menú móvil) | `src/components/islands/` | `.vue` |
| Un SVG maya decorativo (`aria-hidden="true"`) | `src/components/maya/` | `.astro` |
| Un nuevo artículo técnico | `src/content/blog/<categoria>/` | `.md` / `.mdx` |
| Una ficha de proyecto nueva | `src/content/projects/` | `.md` / `.mdx` |
| Datos tipados del sitio (perfil, experiencia) | `src/data/` | `.ts` |
| Una ruta o página nueva | `src/pages/` | `.astro` |
| Una imagen que un componente importa (Astro la procesa) | `src/assets/` | `.png` / `.webp` |
| Un archivo estático que se sirve tal cual (favicon, CV, imagen OG) | `public/` | Sin procesar |
| Un campo o colección de contenido nuevo | `src/content.config.ts` | Zod (consulta antes: `AGENTS.md` §9) |
| Una función utilitaria o formateador | `src/utils/` | `.ts` |
| Un token de diseño o color nuevo | `src/styles/theme.css` | CSS Custom Property |

---

## 3. Convenciones de Nomenclatura

- **Componentes (`.astro`, `.vue`):** `PascalCase` estricto (ej. `PostCard.astro`, `ThemeToggle.vue`).
- **Módulos TypeScript (`.ts`):** `camelCase` (ej. `formatDate.ts`, `readingTime.ts`).
- **Rutas y archivos de contenido (`.md`, `.mdx`, `.astro` de páginas):** `kebab-case` en español (ej. `sobre-mi.astro`, `guia-clean-architecture.md`).
- **Tokens CSS:** `--kebab-case` (ej. `--color-jade`, `--text-primary`).
