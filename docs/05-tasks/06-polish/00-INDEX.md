# 06-polish: Fase 6 — Producción, SEO y Despliegue

Secuencia de tareas para finalizar el MVP de **Samsar | Sitio web personal**, abarcando las pantallas de utilidad (`/contacto` y `/404`), metadatos SEO y sindicación (`rss.xml`, `sitemap.xml`, `_headers`), el manual pedagógico de despliegue en Cloudflare Pages en `docs/08-learning/` y la auditoría final de calidad.

---

## 1. Secuencia de Tareas

Las tareas están organizadas de forma atómica para resolver primero las vistas públicas de utilidad, luego las capas de indexación y sindicación, seguido por la documentación educativa de despliegue y finalmente la auditoría y cierre del proyecto:

| # | Tarea | Qué se construye | Archivos Principales |
|---|---|---|---|
| **01** | [`01-contact-and-404-pages.md`](01-contact-and-404-pages.md) | Pantallas públicas de utilidad: `/contacto` (tarjetas directas verificadas hacia correo, LinkedIn y GitHub) y `/404` (página de error personalizada con acento visual maya y enlaces de rescate). | `src/pages/contacto.astro`, `src/pages/404.astro` |
| **02** | [`02-seo-rss-sitemap-and-headers.md`](02-seo-rss-sitemap-and-headers.md) | Sindicación RSS (`@astrojs/rss`), sitemap dinámico (`@astrojs/sitemap`), directivas `public/robots.txt`, reglas de caché Edge en `public/_headers` y metadatos OpenGraph en `BaseLayout.astro`. | `src/pages/rss.xml.ts`, `astro.config.mjs`, `public/robots.txt`, `public/_headers`, `src/layouts/BaseLayout.astro` |
| **03** | [`03-cloudflare-deployment-guide.md`](03-cloudflare-deployment-guide.md) | Manual pedagógico en `docs/08-learning/02-cloudflare-pages-deployment-guide.md` y actualización del índice didáctico: paso a paso de registro en Cloudflare, vinculación GitHub, build con Bun, variables de entorno y DNS. | `docs/08-learning/02-cloudflare-pages-deployment-guide.md`, `docs/08-learning/00-INDEX.md`, `docs/08-learning/01-learning-path.md` |
| **04** | [`04-quality-audit-and-mvp-closure.md`](04-quality-audit-and-mvp-closure.md) | Auditoría integral de calidad (Lighthouse, contraste WCAG AA, verificación de cero enlaces rotos) y actualización final de los índices maestros del proyecto. | `docs/05-tasks/00-INDEX.md`, `docs/00-INDEX.md` |

---

## 2. Prerrequisitos de la Fase

Antes de iniciar la tarea 01 de esta fase, confirma que:
- Las **Fases 1 a 5** estén completadas y fusionadas en `main`.
- `bun run check` y `bun run build` pasen con 0 errores y 0 advertencias.
- Las colecciones `blog` y `projects` contengan sus contenidos semilla operativos.

---

## 3. Resultado Esperado al Finalizar la Fase 6

Al completar las 4 tareas de esta fase:
- Las 15 pantallas y rutas públicas del MVP estarán 100% implementadas y navegables.
- Los motores de búsqueda podrán indexar el sitio mediante `/sitemap.xml` y `/robots.txt`.
- Los lectores podrán sindicar el contenido a través de `/rss.xml`.
- Los activos estáticos contarán con políticas de caché óptimas en la red Anycast de Cloudflare Pages.
- Los estudiantes contarán con una guía paso a paso en `docs/08-learning/` para desplegar el proyecto en Cloudflare Pages.
