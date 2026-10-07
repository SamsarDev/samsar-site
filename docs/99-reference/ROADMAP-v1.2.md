# Roadmap de Desarrollo y Despliegue — Sitio Web Personal Samsar

**Documento técnico de arquitectura y estrategia**  
**Versión:** 1.2 | **Fecha:** Octubre 2026  
**Autor:** Samuel Sarmientos / Samsar  
**Cambios v1.2:** Alineación con el sistema de diseño v1.1 (`DESIGN.md`). Se actualiza la paleta oscura a "Obsidiana & Jade" (3 niveles de basalto + jade imperial + cinabrio ceremonial), se consolida la tríada tipográfica a Space Grotesk + Manrope + JetBrains Mono, y se añaden referencias cruzadas al `DESIGN.md` como fuente de verdad visual.  
**Cambios v1.1:** Reemplazo de Next.js por Nuxt en la comparativa (alineado al stack real: Vue/Angular, sin experiencia en React). Se documenta explícitamente el uso de componentes Vue en Astro.

---

## 📋 Resumen Ejecutivo

Este documento define la arquitectura tecnológica, el roadmap de desarrollo por fases y la estrategia de despliegue para el sitio web personal de **Samuel Sarmientos / Samsar**, priorizando la **eficiencia en costos de mantenimiento y despliegue** sin sacrificar rendimiento, escalabilidad ni la identidad visual única del proyecto (cultura maya, temas oscuro/claro).

La decisión central es construir un **sitio estático generado (SSG)** con **Astro 6**, usando **componentes Vue** cuando se requiera interactividad, desplegado en **Cloudflare Pages**, con contenido en **Markdown/MDX** versionado en Git y un **CMS basado en Git (Sveltia CMS)** como capa opcional de edición visual. Esta combinación ofrece **costo $0/mes** en el escenario base, escalabilidad prácticamente ilimitada en bandwidth, y la mejor experiencia de desarrollo para un sitio centrado en contenido.

> **Documento complementario:** el sistema de diseño (paleta, tipografía, componentes, accesibilidad) está definido en **`DESIGN.md` v1.1** y es la **fuente de verdad visual**. Este roadmap es la **fuente de verdad técnica**. Cualquier discrepancia se resuelve consultando ambos documentos.

> **Nota de contexto técnico:** El autor tiene ~8 años de experiencia con **Vue** y **Angular**, y **cero experiencia con React**. Por lo tanto, cualquier componente interactivo dentro de Astro se implementará con **Vue 3** (Composition API + `<script setup>`) vía `@astrojs/vue`, y la comparativa de meta-frameworks se centra en **Astro vs Nuxt vs Eleventy**.

---

## 1. Decisiones Arquitectónicas Clave

| Componente | Tecnología Seleccionada | Alternativas Viables | Justificación Principal |
|---|---|---|---|
| **Generador de Sitio** | Astro 6 + **islas Vue** | Nuxt 4, Eleventy 3 | Islands Architecture: 0 JS por defecto; Content Collections con Zod; integración oficial con Vue |
| **Framework de islas** | **Vue 3** (Composition API) | Svelte, Solid | Stack principal del autor; cero curva de aprendizaje; `@astrojs/vue` oficial |
| **Hosting** | Cloudflare Pages | Vercel Hobby, Netlify Free, GitHub Pages | **Bandwidth ilimitado gratis**; 500 builds/mes; red edge global |
| **Contenido** | Markdown + MDX + Content Collections | Strapi, Directus, Payload | Cero dependencias de base de datos; portabilidad total; sin costo de infraestructura |
| **CMS (opcional)** | Sveltia CMS (Git-based) | Decap CMS, Keystatic, Front Matter CMS | Edición visual sin servidor; reemplazo moderno de Decap (sin mantenimiento) |
| **Estilos** | Tailwind CSS v4 + **design tokens CSS** | CSS Modules, Styled Components | Utilidades + tokens temáticos; dark/light con custom properties |
| **Tipografía** | **3 familias** (Space Grotesk, Manrope, JetBrains Mono) | 4+ familias | Presupuesto de rendimiento; coherencia visual; ver `DESIGN.md` §4 |
| **Repositorio** | GitHub (público) | GitLab, Codeberg | Ecosistema, Actions CI/CD, integración directa con Cloudflare Pages |

---

## 2. Generador de Sitio: Astro 6 con Islas Vue

### 2.1 ¿Por qué Astro y no Nuxt o Eleventy?

Astro es el **estándar de facto para sitios centrados en contenido en 2026**. Su arquitectura de *islands* envía **cero JavaScript por defecto** y solo hidrata los componentes que realmente necesitan interactividad (como el toggle de tema o un buscador). Esto se traduce en puntuaciones Lighthouse en los 90s sin esfuerzo adicional, algo crítico cuando el SEO es un canal de tráfico secundario para el portafolio profesional.

**Punto clave para este proyecto:** Astro tiene **integración oficial con Vue** (`@astrojs/vue`), lo que permite escribir islas interactivas en **Vue 3 con Composition API y `<script setup>`**, el mismo stack que el autor domina. No hay necesidad de aprender React ni JSX.

**Comparativa concreta (alineada al perfil del autor):**

| Criterio | Astro 6 + Vue | Nuxt 4 | Eleventy 3 |
|---|---|---|---|
| JavaScript en cliente | 0 por defecto; islas Vue bajo demanda | Runtime de Vue en cada página (~50-100KB) | 0 siempre |
| Curva de aprendizaje | Baja (Vue ya conocido) | Baja (Vue ya conocido) | Baja, pero sin componentes |
| Content Collections | ✅ Type-safe con Zod | ⚠️ Requiere `@nuxt/content` (capa adicional) | ❌ Sin validación nativa |
| Ecosistema de componentes | Vue, Svelte, Solid, Preact | Solo Vue | Limitado |
| Ideal para | Blogs, portafolios, docs | Apps híbridas con SSR | Sitios ultra-simples |
| Build de 100 posts | ~200 ms | ~1-2 s (depende de SSR/Nitro) | Muy rápido |
| Complejidad de despliegue | Estático puro | Nitro/SSR o SSG | Estático puro |
| Peso típico del bundle | ~15-30 KB (solo islas) | ~80-150 KB | ~5 KB |

**Nuxt 4** brilla cuando el sitio "es realmente una app Vue con un blog como sombrero". Su fortaleza es SSR, rutas dinámicas complejas, autenticación y estado global con Pinia — nada de lo cual este proyecto requiere en su MVP. Usar Nuxt aquí implicaría **cargar el runtime de Vue en cada página** incluso en artículos puramente estáticos, sacrificando el rendimiento sin ganar nada a cambio.

**Eleventy 3** es excelente si se quiere control absoluto sin framework, pero carece de Content Collections y validación de esquemas, además de no ofrecer un ecosistema de componentes modernos. Obligaría a construir todo desde cero con Nunjucks/Liquid.

**Astro ofrece el punto medio óptimo:** la simplicidad de un SSG con la potencia de Content Collections tipadas y la posibilidad de escribir islas en **Vue**, el framework que el autor domina.

### 2.2 ¿Cuándo usar islas Vue en Astro?

La regla de oro: **usar Astro puro (`.astro`) para todo lo estático y Vue solo cuando haya estado reactivo real**.

| Caso de uso | Tecnología | Directiva |
|---|---|---|
| Layout, Header, Footer | Astro | — |
| PostCard, ProjectCard | Astro | — |
| TOC, Breadcrumbs | Astro | — |
| Páginas estáticas (Sobre mí, Experiencia) | Astro | — |
| **Toggle de tema (dark/light)** | **Vue** | `client:load` |
| **Buscador del blog** | **Vue** | `client:idle` |
| **Formulario de contacto (validación)** | **Vue** | `client:visible` |
| **Filtros de proyectos con estado** | **Vue** | `client:visible` |
| **Menú mobile con transiciones** | **Vue** | `client:load` |
| Animaciones complejas con estado | Vue | `client:visible` |

**Ejemplo de isla Vue dentro de Astro:**

```astro
---
// src/components/layout/Header.astro
import ThemeToggle from '@/components/islands/ThemeToggle.vue';
import MobileMenu from '@/components/islands/MobileMenu.vue';
---

<header class="sticky top-0 ...">
  <nav>
    <a href="/">Samsar</a>
    <a href="/sobre-mi">Sobre mí</a>
    <a href="/proyectos">Proyectos</a>
    <a href="/blog">Blog</a>
  </nav>
  <ThemeToggle client:load />
  <MobileMenu client:load />
</header>
```

```vue
<!-- src/components/islands/ThemeToggle.vue -->
<script setup lang="ts">
import { ref, onMounted } from 'vue';

const theme = ref<'dark' | 'light'>('dark');

onMounted(() => {
  const stored = localStorage.getItem('theme') as 'dark' | 'light' | null;
  theme.value = stored ?? (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  document.documentElement.dataset.theme = theme.value;
});

function toggle() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme.value;
  localStorage.setItem('theme', theme.value);
}
</script>

<template>
  <button @click="toggle" aria-label="Cambiar tema">
    {{ theme === 'dark' ? '🌙' : '☀️' }}
  </button>
</template>
```

### 2.3 Configuración de Astro con Vue

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://samsar.dev',
  integrations: [
    vue(),
    tailwind(),
    mdx(),
    sitemap(),
  ],
  output: 'static',
});
```

**Dependencias clave:**
- `astro` (core)
- `@astrojs/vue` (integración oficial)
- `vue` (runtime)
- `@astrojs/tailwind`
- `@astrojs/mdx`
- `@astrojs/sitemap`
- `@astrojs/rss`

### 2.4 Content Collections: La Pieza Clave para el Blog

Astro Content Collections permite definir esquemas **type-safe** para el frontmatter de los posts en Markdown/MDX. Si un campo requerido falta o tiene un tipo incorrecto, el build falla con un error claro en lugar de generar una página rota.

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    category: z.enum(['samsar-dev', 'samsar-ia', 'samsar-games']),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
```

Esta estructura mapea directamente las tres categorías del blog: **Samsar|Dev**, **Samsar|IA** y **Samsar|Games**.

### 2.5 Islands Architecture aplicada al sitio

- **Toggle dark/light**: Isla Vue con `client:load` (hidratación inmediata).
- **Buscador del blog**: Isla Vue con `client:idle` (hidrata cuando el navegador está libre).
- **Tabla de contenidos (TOC)**: Estática con CSS `scroll-behavior: smooth`.
- **Animaciones de landing**: CSS puro o islas Vue con `client:visible`.
- **Formulario de contacto**: Isla Vue con `client:visible` + Formspree.

Todo el contenido de posts, páginas de proyectos y CV se renderiza como **HTML estático puro**, sin JavaScript innecesario.

---

## 3. Hosting: Cloudflare Pages

### 3.1 Comparativa de opciones gratuitas

| Métrica | Cloudflare Pages | Vercel Hobby | Netlify Free | GitHub Pages |
|---|---|---|---|---|
| **Bandwidth gratis** | **Ilimitado** | 100 GB/mes | 100 GB/mes | 100 GB/mes |
| **Builds/mes** | 500 | 6,000 min | 300 min | 10 builds/hora |
| **Funciones serverless** | 100K req/día (Workers) | 1M invocaciones/mes | 125K invocaciones/mes | ❌ |
| **Dominio personalizado** | ✅ (hasta 100) | ✅ | ✅ | ✅ (CNAME) |
| **Plan pago desde** | **$5/mes** (Workers Paid) | $20/mes | $19/mes | N/A |
| **CDN edge** | 300+ ubicaciones | 30+ ubicaciones | 30+ ubicaciones | GitHub CDN |

**Cloudflare Pages es el ganador indiscutible en costo** para un sitio estático con tráfico variable. Su **bandwidth ilimitado** elimina por completo el riesgo de cargos por exceso de tráfico.

### 3.2 Escalabilidad de costos

| Escenario | Cloudflare Pages | Vercel Pro | Netlify Pro |
|---|---|---|---|
| Portafolio personal (< 10K visitas/mes) | **$0** | $0 (Hobby) | $0 |
| Blog con tráfico moderado (< 100K visitas/mes) | **$0** | $20/mes | $19/mes |
| Tráfico alto (> 1M visitas/mes) | **$5/mes** (Workers Paid) | $500+/mes | $500+/mes |

El costo de Cloudflare se mantiene **plano** incluso con crecimiento significativo de tráfico.

---

## 4. Gestión de Contenido: Markdown + CMS Git-based

### 4.1 Flujo principal: Markdown en el repositorio

El contenido se versiona directamente en el repositorio Git bajo `src/content/blog/`, organizado por categoría:

```
src/content/
├── blog/
│   ├── samsar-dev/
│   │   ├── guia-clean-architecture.md
│   │   ├── patrones-diseno-ddd.md
│   │   └── manual-fastendpoints.md
│   ├── samsar-ia/
│   │   ├── introduccion-rag.md
│   │   ├── langgraph-agentes.md
│   │   └── mcp-servers.md
│   └── samsar-games/
│       ├── juego-educativo-matematicas.md
│       └── threejs-gamificacion.md
├── projects/
│   └── ...
└── config.ts
```

**Ventajas:**
- **Cero costo de infraestructura**: no hay base de datos ni servidor CMS.
- **Portabilidad total**: si en el futuro se migra a otro SSG (incluido Nuxt), el contenido es texto plano.
- **Control de versiones**: cada edición queda registrada en Git.
- **Edición desde cualquier editor**: VS Code, Obsidian, etc.

### 4.2 CMS opcional: Sveltia CMS

**Sveltia CMS** es el reemplazo moderno de Decap CMS (sin mantenimiento en 2026). Es drop-in, ligero y compatible con la estructura Markdown existente.

| CMS | Estado | Costo | Ideal para |
|---|---|---|---|
| **Sveltia CMS** | Activo, moderno | Gratis | Reemplazo directo de Decap |
| **Keystatic** | Activo | Gratis | Proyectos Astro/Nuxt/Next.js |
| **Front Matter CMS** | Activo | Gratis | Integración con VS Code |
| **Decap CMS** | ⚠️ Sin mantenimiento | Gratis | No recomendado para proyectos nuevos |

---

## 5. Estilos y Temas: Tailwind CSS v4 + Design Tokens

> **Fuente de verdad:** el sistema de diseño completo (paleta, tipografía, componentes, estados, accesibilidad) está documentado en **`DESIGN.md` v1.1**. Esta sección resume lo esencial para el roadmap técnico.

### 5.1 Arquitectura de temas

El sistema de temas oscuro/claro se implementa con **CSS custom properties** y la estrategia de dark mode de Tailwind. Los tokens se definen en `src/styles/theme.css`:

```css
/* src/styles/theme.css — Resumen (ver DESIGN.md §12 para tokens completos) */
:root {
  /* Tema oscuro — "Obsidiana & Jade" */
  --color-bg: #0A0E0C;              /* Obsidiana profunda */
  --color-bg-elevated: #131916;     /* Basalto superficial */
  --color-bg-highlight: #1C2420;    /* Basalto elevado */
  --color-jade: #00A86B;            /* Jade imperial */
  --color-jade-muted: #1F7A5C;      /* Jade sombrío */
  --color-hummingbird: #19C3B0;     /* Colibrí turquesa */
  --color-blood: #B22222;           /* Cinabrio ceremonial */
  --color-text: #E8E6E1;            /* Blanco hueso */
  --color-text-muted: #9AA39E;      /* Ceniza caliza */
}

[data-theme="light"] {
  /* Tema claro — "Cielo, Sol y Maíz" */
  --color-bg: #FFFDF7;
  --color-bg-elevated: #F5F0E8;
  --color-bg-highlight: #EAE3D5;
  --color-sky: #A7D8F0;
  --color-sky-deep: #87CEEB;
  --color-sun: #F4A300;
  --color-corn: #F7C948;
  --color-corn-green: #7CB342;
  --color-text: #2B2B2B;
  --color-text-muted: #6B7280;
}
```

### 5.2 Cambios clave respecto a v1.1 del roadmap

| Aspecto | Antes (v1.1) | Después (v1.2) | Impacto técnico |
|---|---|---|---|
| **Niveles de fondo** | 2 (`bg`, `bg-elevated`) | **3** (`bg`, `bg-elevated`, `bg-highlight`) | Mayor jerarquía visual; nuevo token para bordes y hover |
| **Jade primario** | `#1F7A5C` | `#00A86B` (Jade imperial) | Mejor contraste WCAG AA sobre fondos oscuros |
| **Jade secundario** | N/A | `#1F7A5C` (Jade sombrío) | Antiguo primario reubicado |
| **Cinabrio** | `#8B1E1E` | `#B22222` | Más cercano al pigmento maya ceremonial |
| **Texto muted** | `#9CA3AF` | `#9AA39E` | Tinte cálido-verdoso, armoniza con la paleta mineral |
| **Familias tipográficas** | 4 | **3** | Menos requests, mejor CLS, mejor Lighthouse |

### 5.3 Tipografía: Tríada consolidada

| Uso | Fuente | Peso | Tamaño |
|---|---|---|---|
| Headings | Space Grotesk | 700 / 600 | `clamp(1.25rem, 5vw, 3.5rem)` |
| Cuerpo, UI, lectura larga | **Manrope** | 400 / 500 | `1rem` / `1.125rem` (blog) |
| Código, telemetría, fechas | JetBrains Mono | 400 / 500 / 600 | `0.75rem` – `0.9rem` |

**Estrategia de carga:**
- Self-hosted (sin Google Fonts CDN).
- `font-display: swap` + preload de fuentes críticas.
- Máximo 6 archivos `.woff2` (3 familias × 2 pesos).

### 5.4 Por qué Tailwind v4

- **Configuración CSS-first**: tokens definidos directamente en CSS.
- **Dark mode nativo**: variante `dark:` y soporte para `data-theme`.
- **Purga automática**: solo clases usadas → CSS mínimo.
- **Integración oficial** con Astro (`@astrojs/tailwind`).

---

## 6. Roadmap de Desarrollo

### Fase 1 — Fundación (Semana 1-2)

| Tarea | Entregable | Dependencias |
|---|---|---|
| Inicializar proyecto Astro 6 | `npm create astro@latest` | Node 22+ |
| Instalar `@astrojs/vue` | Integración oficial de Vue | Proyecto Astro |
| Configurar Tailwind v4 | `@astrojs/tailwind` + tokens CSS del `DESIGN.md` | Proyecto Astro |
| **Implementar `theme.css`** | Tokens dark/light completos (ver `DESIGN.md` §12) | Tailwind v4 |
| **Cargar tríada tipográfica** | Space Grotesk, Manrope, JetBrains Mono (self-hosted) | `theme.css` |
| Definir Content Collections | `src/content/config.ts` con esquemas Zod | Astro |
| Crear layout base | `src/layouts/BaseLayout.astro` con header/footer | Astro + Tailwind |
| Implementar toggle dark/light | Isla Vue `ThemeToggle.vue` con `client:load` | Layout base |
| Configurar navegación | Rutas: `/`, `/sobre-mi`, `/experiencia`, `/proyectos`, `/blog` | Layout base |

**Entregable de fase:** Esqueleto navegable con temas funcionales, tokens del `DESIGN.md` aplicados y tipografía cargada.

### Fase 2 — Landing Page (Semana 2-3)

| Tarea | Entregable | Dependencias |
|---|---|---|
| Hero section | Animaciones CSS (parallax, fade-in), siluetas mayas decorativas | Layout base + tokens |
| Sección "Qué encontrarás" | 3 pilares: Dev (jade), IA (colibrí), Games (cinabrio) | Hero |
| Sección "Sobre el proyecto" | Propósito del sitio | Pilares |
| Destacados | Últimos posts + proyectos recientes | Content Collections |
| Animaciones de scroll | Isla Vue con `client:visible` o `IntersectionObserver` | Landing |
| **Motivos mayas decorativos** | Siluetas SVG con opacidad ≤ 0.15 (ver `DESIGN.md` §6) | Landing |

**Entregable de fase:** Landing completa, moderna, sin referencias laborales, con identidad visual maya aplicada.

### Fase 3 — Blog y Contenido (Semana 3-5)

| Tarea | Entregable | Dependencias |
|---|---|---|
| Index del blog | Lista de posts con filtros por categoría | Content Collections |
| Página de categoría | `/blog/samsar-dev`, `/blog/samsar-ia`, `/blog/samsar-games` | Index |
| Página de post individual | Renderizado MDX, TOC, bloques de código | Content Collections |
| Embeds responsive | YouTube, CodePen, enlaces externos | Post individual |
| Buscador | Isla Vue con Fuse.js (`client:idle`) | Index |
| RSS feed | `@astrojs/rss` | Index |
| Paginación | Navegación anterior/siguiente | Post individual |
| **Estilos de lectura** | Ancho 70ch, Manrope 18px, line-height 1.7 (`DESIGN.md` §4) | Post individual |

**Entregable de fase:** Blog completo con las tres categorías y legibilidad optimizada.

### Fase 4 — Portafolio Profesional (Semana 5-6)

| Tarea | Entregable | Dependencias |
|---|---|---|
| Página "Sobre mí" | Bio, intereses, valores | Layout base |
| Página de Experiencia/CV | Timeline, filtros por tecnología, descarga PDF | Layout base |
| Grid de Proyectos | Cards con filtros: Profesionales, Open Source, Juegos, IA | Content Collections |
| Detalle de proyecto | Stack, enlaces, video embebido | Grid |
| Formulario de contacto | Isla Vue con validación + Formspree | Layout base |
| **Componentes UI** | Button, Chip, Card, Badge, Callout (`DESIGN.md` §8) | Layout base |

**Entregable de fase:** Portafolio profesional completo y descargable.

### Fase 5 — Optimización y Pulido (Semana 6-7)

| Tarea | Entregable |
|---|---|
| SEO | Metadatos, Open Graph, sitemap, robots.txt |
| Accesibilidad | Auditoría WCAG AA, foco visible, ARIA, navegación teclado |
| Rendimiento | Lighthouse > 95 en todas las métricas |
| **Validación de contraste** | Verificar ratio ≥ 4.5:1 en todos los pares texto/fondo |
| Responsive | Pruebas en mobile, tablet, desktop |
| 404 page | Página personalizada con temática maya |
| Estados hover/focus | Feedback visual en todos los elementos interactivos |

### Fase 6 — CMS Opcional y Escalabilidad (Semana 8+)

| Tarea | Entregable |
|---|---|
| Integrar Sveltia CMS | Panel `/admin` para edición visual |
| Comentarios (opcional) | Giscus (GitHub Discussions) |
| Analytics (opcional) | Cloudflare Web Analytics (sin cookies) |
| Búsqueda full-text (opcional) | Pagefind (indexación estática) |

---

## 7. Roadmap de Despliegue

### 7.1 Configuración de Cloudflare Pages

**Paso 1: Conectar repositorio**
1. Ir a [pages.cloudflare.com](https://pages.cloudflare.com)
2. "Create a project" → "Connect to Git"
3. Autorizar GitHub y seleccionar `samsar-dev/samsar.dev`

**Paso 2: Configurar build**
| Parámetro | Valor |
|---|---|
| Framework preset | Astro |
| Build command | `npm run build` |
| Output directory | `dist` |
| Node version | 22 |

**Paso 3: Dominio personalizado**
1. "Custom domains" → "Set up a custom domain"
2. Ingresar el dominio (ej. `samsar.dev`)
3. Cloudflare configura DNS automáticamente
4. SSL/TLS se provisiona automáticamente

**Paso 4: Variables de entorno**
| Variable | Valor | Propósito |
|---|---|---|
| `NODE_VERSION` | `22` | Forzar versión de Node |
| `PUBLIC_SITE_URL` | `https://samsar.dev` | URLs canónicas y sitemap |

### 7.2 Flujo de despliegue continuo

```
main branch push
      │
      ▼
GitHub Actions (opcional)  ──► Lint + Type check + Build
      │
      ▼
Cloudflare Pages Build  ──► npm run build (Astro SSG)
      │
      ▼
Deploy a Edge Network  ──► Propagación global en < 1 min
      │
      ▼
Preview URL (para PRs)  ──► https://<hash>.samsar.pages.dev
```

### 7.3 Estimación de costos

| Concepto | Costo Mensual | Notas |
|---|---|---|
| Hosting (Cloudflare Pages) | **$0** | Bandwidth ilimitado, 500 builds/mes |
| Dominio (ej. `samsar.dev`) | ~$12/año ($1/mes) | Cloudflare Registrar o Namecheap |
| SSL/TLS | **$0** | Let's Encrypt automático |
| CDN global | **$0** | Incluido en Cloudflare Pages |
| Base de datos | **$0** | No se requiere |
| CMS (Sveltia, opcional) | **$0** | Git-based |
| Formulario (Formspree) | **$0** | 50 envíos/mes gratis |
| **Total escenario base** | **~$1/mes** | Solo costo del dominio |

---

## 8. Alternativas Evaluadas y Descartadas

| Alternativa | Por qué se descartó |
|---|---|
| **Next.js + Vercel** | Requiere React/JSX; el autor no tiene experiencia en React (8 años en Vue/Angular) |
| **Nuxt 4** | Excelente framework Vue, pero carga el runtime de Vue en cada página. Astro + islas Vue ofrece el mismo beneficio de "usar Vue" con menos JS global |
| **WordPress + hosting compartido** | Costo de hosting ($5-15/mes), mantenimiento de plugins, seguridad, rendimiento inferior |
| **Ghost self-hosted** | Requiere servidor Node.js, base de datos, mantenimiento; ~$10-20/mes |
| **Strapi + hosting** | Base de datos y servidor adicionales; ~$32/mes; innecesario para un autor único |
| **Jekyll + GitHub Pages** | Sin Content Collections, sin islas, ecosistema limitado, build lento |
| **Hugo + Netlify** | Rápido pero sintaxis de templates menos ergonómica; sin ecosistema de componentes Vue |
| **Notion como CMS** | Dependencia de API de terceros; riesgo de cambios de precios; portabilidad limitada |

> **Aclaración sobre Nuxt:** no se descarta por ser un mal framework — es excelente. Se descarta porque **Astro + Vue ofrece exactamente la misma experiencia de desarrollo Vue con menos JavaScript enviado al cliente**, lo cual es el objetivo central del proyecto (rendimiento y bajo costo).

---

## 9. Consideraciones Finales

### 9.1 Presupuesto de rendimiento (v1.2)

| Métrica | Objetivo | Estrategia |
|---|---|---|
| **LCP** | < 1.5s | HTML estático + preload de fuentes críticas |
| **FID/INP** | < 100ms | Islas Vue mínimas, JS diferido |
| **CLS** | < 0.05 | Dimensiones explícitas en imágenes + `font-display: swap` |
| **JS inicial** | < 30KB | Solo ThemeToggle, buscador, formulario, menú mobile |
| **CSS** | < 15KB | Tailwind purgado + tokens CSS |
| **Familias tipográficas** | **≤ 3** | Space Grotesk + Manrope + JetBrains Mono |
| **Archivos de fuentes** | **≤ 6** | 3 familias × 2 pesos, self-hosted `.woff2` |
| **Lighthouse** | > 95 | Todas las categorías |

### 9.2 Riesgos y mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| Cloudflare cambia free tier | Baja | Medio | Astro genera HTML estático; migración en horas |
| Astro introduce breaking changes | Media | Bajo | Versión fija en `package.json` |
| Sveltia CMS deja de mantenerse | Baja | Bajo | Contenido en Markdown; CMS es capa opcional |
| Dominio expira | Baja | Alto | Auto-renew activado |
| Incompatibilidad Vue 3 ↔ Astro | Muy baja | Medio | Integración oficial mantenida por Astro |
| Falta de familiaridad con Astro | Media | Bajo | Curva de aprendizaje baja; sintaxis similar a HTML + frontmatter |

### 9.3 Principios de diseño

1. **Contenido primero**: el sitio existe para publicar guías, notas y proyectos.
2. **Vue solo cuando haga falta**: islas interactivas mínimas, todo lo demás HTML estático.
3. **Costo marginal cero**: cada nuevo post, proyecto o categoría no debe incrementar el costo de infraestructura.
4. **Portabilidad**: contenido en Markdown garantiza migración a cualquier SSG futuro.
5. **Rendimiento como feature**: Lighthouse > 95 es un requisito, no un objetivo aspiracional.
6. **Accesibilidad AA**: contraste validado, foco visible, navegación teclado.
7. **Coherencia visual**: cualquier decisión estética se valida contra `DESIGN.md`.

### 9.4 Próximos pasos inmediatos

1. ✅ Crear repositorio en GitHub (`samsar-dev/samsar.dev`)
2. ✅ Inicializar proyecto Astro 6 con `@astrojs/vue` y Tailwind v4
3. ✅ Implementar `theme.css` con los tokens de `DESIGN.md` §12
4. ✅ Cargar tríada tipográfica (Space Grotesk, Manrope, JetBrains Mono) self-hosted
5. ✅ Definir esquemas de Content Collections para blog y proyectos
6. ✅ Implementar layout base con toggle de tema en Vue
7. ✅ Configurar Cloudflare Pages y dominio personalizado
8. ✅ Publicar primer post de prueba en cada categoría

---

## 10. Changelog

### v1.2 — Octubre 2026

**Tipo:** Alineación con el sistema de diseño `DESIGN.md` v1.1.

#### 🎨 Paleta y Tokens

- Actualizada paleta oscura a **"Obsidiana & Jade"**:
  - `--color-bg`: `#0A0A0A` → `#0A0E0C`
  - `--color-bg-elevated`: `#0F1411` → `#131916`
  - **Nuevo token** `--color-bg-highlight`: `#1C2420`
  - `--color-jade`: `#1F7A5C` → `#00A86B` (jade imperial)
  - **Nuevo token** `--color-jade-muted`: `#1F7A5C`
  - `--color-blood`: `#8B1E1E` → `#B22222` (cinabrio ceremonial)
  - `--color-text-muted`: `#9CA3AF` → `#9AA39E` (ceniza caliza)
- Referencia cruzada añadida a `DESIGN.md` §12 como fuente de verdad de tokens.

#### 🔤 Tipografía

- Consolidación a **3 familias**: Space Grotesk + **Manrope** + JetBrains Mono.
- Eliminadas `Inter` y `Source Serif 4`.
- Manrope asume el rol de cuerpo general, UI y lectura larga.
- Estrategia de carga self-hosted documentada (≤ 6 archivos `.woff2`).
- Añadido objetivo de rendimiento "Familias tipográficas ≤ 3" en §9.1.

#### 📄 Documentación

- Añadida nota de contexto técnico sobre Vue en §1 y §2.1.
- Añadida sección 5.2 con tabla comparativa de cambios respecto a v1.1.
- Añadida sección 5.3 con la tríada tipográfica consolidada.
- Añadidos pasos de implementación de `theme.css` y carga de fuentes en Fase 1.
- Añadidos pasos de validación de contraste WCAG en Fase 5.
- Actualizada la tabla de presupuesto de rendimiento (§9.1) con nuevos objetivos.

### v1.1 — Octubre 2026

**Tipo:** Corrección de stack y aclaración de uso de Vue.

- Reemplazo de Next.js por Nuxt en la comparativa de frameworks (alineado al perfil Vue/Angular).
- Documentación explícita del uso de componentes Vue dentro de Astro vía `@astrojs/vue`.
- Añadida sección 2.2 con matriz de decisión "Astro estático vs isla Vue".
- Añadida comparativa Astro vs Nuxt vs Eleventy con criterios relevantes al autor.

### v1.0 — Octubre 2026

**Tipo:** Versión inicial.

- Definición de arquitectura, stack y estrategia de despliegue.
- Comparativa inicial Astro vs Next.js vs Eleventy.
- Roadmap de desarrollo por fases.
- Roadmap de despliegue en Cloudflare Pages.
- Estimación de costos y alternativas evaluadas.

---

> **Documento vivo**: este roadmap se actualizará conforme el proyecto evolucione. Las decisiones tecnológicas están justificadas para el contexto actual (2026) y deben revisarse anualmente. Cualquier cambio visual debe reflejarse primero en `DESIGN.md` y luego propagarse aquí.