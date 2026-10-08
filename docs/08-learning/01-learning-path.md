# 01-learning-path: Ruta de Aprendizaje del Proyecto

Esta guía describe el itinerario pedagógico recorrido a lo largo de las 6 fases de construcción de **Samsar | Sitio web personal**, destacando los conceptos de ingeniería de software aprendidos en cada etapa.

---

## 1. Mapa de Habilidades por Fase

```text
Fase 1: Fundación ──────────────► Astro 6, Tailwind v4, CSS Tokens, BaseLayout, Theme Anti-FOUC
Fase 2: Landing Page ───────────► Diseño Atómico (UI Atoms), Composition & Accessibility WCAG AA
Fase 3: Ecosistema Blog ────────► Content Layer API, Zod Validation, MDX, Shiki Dual-Theme, Tags
Fase 4: Catálogo Proyectos ─────► Static Collections, SSG Routing, Filtered Hubs, Cross-Links
Fase 5: Perfil & Experiencia ───► Astro Islands (Vue 3 Composition API), Client:Visible, Assets
Fase 6: Producción & Despliegue ─► SEO, OpenGraph, RSS 2.0, Sitemap XML, Cloudflare Pages Edge
```

---

## 2. Detalle de Aprendizajes Clave

### Fase 1: Fundación y Arquitectura
- **Astro SSG:** Compilación estática sin JavaScript por defecto (cero JS inicial).
- **Tailwind CSS v4 (CSS-First):** Abandono de archivos `tailwind.config.js` heredados en favor de tokens semánticos definidos en CSS nativo (`src/styles/theme.css`).
- **Prevención de FOUC:** Inyección de script síncrono en el `<head>` para resolver temas claro/oscuro antes del primer pintado.

### Fase 2: Portada y Diseño Atómico
- **Componentes reutilizables:** Creación de átomos (`Button.astro`, `Card.astro`, `Chip.astro`, `Badge.astro`) desacoplados de la lógica de negocio.
- **Accesibilidad innegociable:** Contrastes de texto ≥ 4.5:1, etiquetas `aria-label` en botones sin texto visible y soporte completo para teclado.

### Fase 3: Ecosistema de Contenidos (Blog)
- **Astro Content Layer API:** Validación de esquemas con Zod (`src/content.config.ts`) que garantiza que ningún archivo markdown mal formateado llegue a producción.
- **Dual-Theme Syntax Highlighting:** Configuración de Shiki con soporte simultáneo para tema claro (`github-light`) y oscuro (`github-dark`).
- **MDX enriquecido:** Componentes interactivos y callouts insertados directamente dentro de artículos técnicos.

### Fase 4: Catálogo y Detalle de Proyectos
- **Enrutamiento SSG dinámico:** Uso de `getStaticPaths()` para compilar tanto el catálogo general como las vistas filtradas por tipo de proyecto y las fichas técnicas individuales.
- **Relaciones entre colecciones:** Vinculación cruzada entre proyectos y artículos del blog (`postSlug`) consultados en tiempo de compilación.

### Fase 5: Perfil, Trayectoria e Islas de Astro
- **Astro Islands:** Comprensión profunda de cuándo delegar interactividad al cliente. Uso de Vue 3 (`<script setup lang="ts">`) exclusivamente donde existe estado reactivo en cliente (`ExperienceTimeline.vue`).
- **Directivas de hidratación perezosa:** Uso de `client:visible` para no cargar JavaScript en el navegador hasta que el usuario se desplaza hasta el componente.

### Fase 6: Producción, SEO y Despliegue
- **Sindicación y Motores de Búsqueda:** Generación de feeds RSS 2.0 (`/rss.xml`), sitemaps dinámicos (`/sitemap-index.xml`) y metadatos OpenGraph.
- **Arquitectura Edge en Cloudflare Pages:** Configuración de reglas de caché inmutables (`public/_headers`) y pipeline de compilación continua con Bun. Consulta el manual completo en [`02-cloudflare-pages-deployment-guide.md`](02-cloudflare-pages-deployment-guide.md).
- **Versionado Semántico y Releases:** Congelamiento de hitos con SemVer 2.0.0, tags anotados de Git y GitHub Releases. Consulta la guía en [`03-versioning-tags-and-releases.md`](03-versioning-tags-and-releases.md).

---

## 3. Módulos de Especialización Técnica

Para profundizar en los fundamentos teóricos aplicados en el código:
- **Clean Architecture Frontend:** Principios de separación de responsabilidades y diseño de carpetas en [`04-frontend-clean-architecture.md`](04-frontend-clean-architecture.md).
- **Accesibilidad Innegociable (WCAG AA):** Ratios de contraste, navegación por teclado y diseño inclusivo en [`05-accessibility-in-practice.md`](05-accessibility-in-practice.md).
- **Patrones de Diseño en Astro y Vue:** Anti-FOUC, arquitectura de islas e hidratación perezosa en [`06-design-patterns-astro-vue.md`](06-design-patterns-astro-vue.md).
