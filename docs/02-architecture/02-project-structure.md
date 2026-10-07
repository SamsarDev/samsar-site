# 02-project-structure: Estructura del Proyecto

Organización de directorios, responsabilidades por carpeta y convenciones de nomenclatura para **Samsar | Sitio web personal**.

---

## 1. Árbol de Directorios

```text
samsar-site/
├── public/                  # Archivos estáticos servidos directamente
│   ├── favicon.svg          # Favicon del sitio
│   ├── og-image.png         # Imagen Open Graph por defecto
│   ├── cv-samuel.pdf        # CV descargable
│   └── fonts/               # Fuentes WOFF2 autoalojadas
│       ├── space-grotesk/   # 600, 700
│       ├── manrope/         # 400, 500
│       └── jetbrains-mono/  # 400, 500
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── ui/              # Botones, Cards, Chips, Badges, Callouts
│   │   ├── layout/          # Header, Footer, Nav, Breadcrumbs
│   │   ├── blog/            # PostCard, TOC, CodeBlock, Embed
│   │   ├── landing/         # Hero, Pillars, Highlights, CTA
│   │   ├── islands/         # Componentes Vue interactivos (.vue)
│   │   └── maya/            # SVGs decorativos y motivos culturales
│   ├── content.config.ts    # Content Layer API de Astro 6 (esquemas Zod)
│   ├── content/             # Archivos Markdown / MDX de contenido
│   │   ├── blog/            # Artículos divididos en 3 pilares
│   │   │   ├── samsar-dev/
│   │   │   ├── samsar-ia/
│   │   │   └── samsar-games/
│   │   └── projects/        # Iniciativas y proyectos individuales
│   ├── data/                # Archivos de datos estructurados en TypeScript
│   │   └── experience.ts    # Trayectoria laboral, skills y educación
│   ├── layouts/             # Plantillas base de página (.astro)
│   │   ├── BaseLayout.astro # Layout raíz con script anti-FOUC y SEO
│   │   ├── BlogLayout.astro # Layout con sidebar TOC y lectura 70ch
│   │   └── ProjectLayout.astro
│   ├── pages/               # Enrutamiento basado en archivos
│   │   ├── index.astro      # Portada (/)
│   │   ├── sobre-mi.astro   # Biografía (/sobre-mi)
│   │   ├── experiencia.astro# Timeline y CV (/experiencia)
│   │   ├── proyectos/       # Catálogo y detalle dinámico
│   │   ├── blog/            # Índice, categorías y [slug]
│   │   ├── contacto.astro   # Enlaces de contacto (/contacto)
│   │   ├── 404.astro        # Error 404
│   │   └── rss.xml.ts       # Generador del feed RSS
│   ├── styles/              # Arquitectura de estilos CSS
│   │   ├── theme.css        # Tokens de diseño y custom properties
│   │   └── global.css       # Directiva Tailwind v4 y resets
│   └── utils/               # Funciones de utilidad pura en TypeScript
│       ├── reading-time.ts  # Cálculo de minutos de lectura
│       ├── format-date.ts   # Formateo de fechas en español
│       └── seo.ts           # Constructores de metadatos Open Graph
├── astro.config.mjs         # Configuración de Astro, Vue y plugins Vite
├── package.json             # Dependencias del proyecto (Bun / npm)
├── tsconfig.json            # Configuración estricta de TypeScript
└── AGENTS.md                # Reglas operativas para agentes de IA
```

---

## 2. Convenciones de Ubicación

| Si vas a crear... | Colócalo en... | Tecnología |
|---|---|---|
| Un botón, card o badge estático | `src/components/ui/` | `.astro` |
| Una barra de navegación o footer | `src/components/layout/` | `.astro` |
| Un componente con estado reactivo (toggle, menú móvil) | `src/components/islands/` | `.vue` |
| Un SVG maya decorativo (`aria-hidden="true"`) | `src/components/maya/` | `.astro` |
| Un nuevo artículo técnico | `src/content/blog/<categoria>/` | `.md` / `.mdx` |
| Una función utilitaria o formateador | `src/utils/` | `.ts` |
| Un token de diseño o color nuevo | `src/styles/theme.css` | CSS Custom Property |

---

## 3. Convenciones de Nomenclatura

- **Componentes (`.astro`, `.vue`):** `PascalCase` estricto (ej. `PostCard.astro`, `ThemeToggle.vue`).
- **Módulos TypeScript (`.ts`):** `camelCase` (ej. `formatDate.ts`, `readingTime.ts`).
- **Rutas y archivos de contenido (`.md`, `.mdx`, `.astro` de páginas):** `kebab-case` en español (ej. `sobre-mi.astro`, `guia-clean-architecture.md`).
- **Tokens CSS:** `--kebab-case` (ej. `--color-jade`, `--text-primary`).
