# 02-features: Alcance Funcional

Matriz de funcionalidades mínimas requeridas (MVP), mejoras planificadas para fases posteriores (Post-MVP) y límites de exclusión para **Samsar | Sitio web personal**.

---

## 1. Funcionalidades Esenciales (MVP)

Funciones críticas requeridas para el primer lanzamiento productivo del sitio, enfocadas en la solidez del contenido y una arquitectura estática ligera:

| ID | Funcionalidad | Descripción Técnica | Prioridad |
|---|---|---|---|
| **F01** | **Navegación principal** | Header sticky con enlaces a secciones principales y menú colapsable accesible en mobile. | Crítica |
| **F02** | **Toggle de tema persistente** | Isla interactiva Vue para alternar entre tema oscuro (*Obsidiana & Jade*) y claro (*Cielo, Sol y Maíz*), persistido en `localStorage` con fallback a `prefers-color-scheme`. | Crítica |
| **F03** | **Landing page de impacto** | Portada centrada en el propósito del sitio, pilares temáticos, posts destacados y proyectos recientes (sin experiencia laboral). | Crítica |
| **F04** | **Índice general del blog** | Catálogo paginado de artículos en `/blog` con navegación y filtrado por categoría. | Crítica |
| **F05** | **Rutas de categoría de blog** | Vistas dedicadas para los 3 pilares (`/blog/samsar-dev`, `/blog/samsar-ia`, `/blog/samsar-games`). | Crítica |
| **F06** | **Lectura de post individual** | Renderizado estático de MDX en `/blog/[slug]`, con tabla de contenidos (TOC), bloques de código con syntax highlighting y botón de copiado. | Crítica |
| **F07** | **Página Sobre mí** | Biografía personal, valores de ingeniería, intereses y stack tecnológico en `/sobre-mi`. | Crítica |
| **F08** | **Página Experiencia / CV** | Timeline cronológico de roles laborales, logros cuantificados, skills agrupadas y botón de descarga de CV en PDF en `/experiencia`. | Crítica |
| **F09** | **Catálogo de proyectos** | Grid filtrable por tipo (`professional`, `open-source`, `game`, `ai-experiment`) en `/proyectos`. | Crítica |
| **F10** | **Detalle de proyecto** | Ficha profunda en `/proyectos/[slug]` con enlaces a repositorio, demo y post técnico asociado. | Alta |
| **F11** | **Canal de contacto directo** | Página `/contacto` con enlaces directos verificados a correo electrónico (`mailto:`), LinkedIn y GitHub. | Crítica |
| **F12** | **Feed RSS y Sitemap** | Generación estática automatizada de `/rss.xml` y `/sitemap.xml` para sindicación y SEO técnico. | Alta |
| **F13** | **Página 404 personalizada** | Vista de error amigable con temática visual maya y enlaces de recuperación al inicio y blog. | Media |

---

## 2. Funcionalidades Post-MVP

Mejoras interactivas y complementarias planificadas para fases posteriores:

| ID | Funcionalidad | Descripción | Prioridad |
|---|---|---|---|
| **F14** | **Buscador client-side** | Isla interactiva Vue con búsqueda rápida en tiempo real (Fuse.js o Pagefind) sobre títulos, descripciones y tags en `/blog`. | Alta |
| **F15** | **Formulario de contacto interactivo** | Formulario en `/contacto` con validación en cliente y procesamiento externo zero-backend (Formspree). | Media |
| **F16** | **Comentarios en blog** | Integración de comentarios basados en GitHub Discussions vía Giscus (cero base de datos propia). | Media |
| **F17** | **CMS visual Git-based** | Configuración de Sveltia CMS en `/admin` para redacción visual sin salir del navegador. | Media |
| **F18** | **Series de artículos** | Agrupación navegable de posts que forman guías pedagógicas secuenciales. | Media |
| **F19** | **Analítica sin cookies** | Medición de visitas respetuosa de la privacidad mediante Cloudflare Web Analytics. | Media |
| **F20** | **Embeds interactivos** | Componentes MDX enriquecidos para reproductores de video ligeros (YouTube façade) y demos interactivas. | Alta |
| **F21** | **Botones de compartir** | Enlaces para compartir artículos en redes profesionales (LinkedIn, X/Twitter, Bluesky). | Baja |

---

## 3. Funcionalidades Excluidas

Límites explícitos de diseño arquitectónico:

- ❌ **Sin backend propio ni bases de datos:** Todo el sitio se compila como HTML/CSS/JS estático desplegado en el Edge.
- ❌ **Sin cuentas de usuario ni login:** No se gestionan sesiones, tokens ni datos personales en el servidor.
- ❌ **Sin newsletter con base de datos interna:** Quien desee suscribirse dispone del estándar abierto RSS (`/rss.xml`).
- ❌ **Sin comercio electrónico:** No hay venta de productos ni servicios.
- ❌ **Monolingüe en español:** El sitio se escribe íntegramente en español durante el MVP (soporte i18n diferido a versiones futuras si la audiencia lo amerita).
