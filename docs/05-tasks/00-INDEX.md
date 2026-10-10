# 05-tasks: Mapa de Tareas de Implementación

Punto de entrada para el desarrollo práctico de **Samsar | Sitio web personal**. Las tareas están secuenciadas pedagógicamente para construirse paso a paso mediante pair programming con agentes de IA.

---

## 1. Fases del Proyecto

| Fase | Directorio | Objetivo Principal | Estado |
|---|---|---|---|
| **Fase 1: Fundación** | [`01-foundation/`](01-foundation/) | Inicializar Astro 7, Tailwind v4, tokens semánticos, BaseLayout, ThemeToggle y navegación responsive. | **Listo** |
| **Fase 2: Landing Page** | [`02-landing/`](02-landing/) | Construir átomos de UI (Button, Card, Chip, Badge), Hero, Pilares, Sobre el proyecto, Destacados y CTA. | **Listo** |
| **Fase 3: Ecosistema Blog** | [`03-blog/`](03-blog/) | Configurar Content Layer API, índice `/blog`, vistas de categoría y lectura MDX con TOC y syntax highlighting. | **Listo** |
| **Fase 4: Catálogo Proyectos** | [`04-portfolio/`](04-portfolio/) | Implementar colección de proyectos, grid filtrable y plantilla de detalle (`/proyectos/[slug]`). | **Listo** |
| **Fase 5: Perfil & Experiencia** | [`05-profile-and-experience/`](05-profile-and-experience/) | Bio personal (`/sobre-mi`), valores, timeline de experiencia laboral (`/experiencia`) y CV descargable. | **Listo** |
| **Fase 6: Producción & SEO** | [`06-polish/`](06-polish/) | Generación de RSS, Sitemap, optimización Lighthouse > 95 y configuración de Cloudflare Pages. | **Listo** |
| **Fase 7: Mantenimiento** | [`07-maintenance/`](07-maintenance/) | Alinear la documentación con el código real: estructura, inventario de islas, patrón anti-FOUC, catálogo de componentes y linter. Incluye crear el asset Open Graph ausente y cerrar los huecos que dejó la auditoría del catálogo. | **En curso** |

---

## 2. Reglas para Ejecutar Tareas

1. **Lectura previa obligatoria:** Antes de escribir código, lee la tarea completa y los documentos enlazados en `docs/01-product/`, `docs/02-architecture/` y `DESIGN.md`.
2. **Ciclo con agentes:** Exige a tu asistente de IA el resumen previo de 2 a 4 líneas de qué archivos va a modificar antes de que toque el código (ver [`docs/04-process/02-working-with-agents.md`](../04-process/02-working-with-agents.md)).
3. **Verificación local estricta:** Ninguna tarea se da por concluida sin ejecutar:
   ```bash
   bun run check    # Verificación de tipos TypeScript y plantillas Astro
   bun run build    # Compilación limpia de producción sin advertencias
   ```
4. **Cumplimiento de DoD:** Verifica los 7 criterios inmutables de [`docs/04-process/03-definition-of-done.md`](../04-process/03-definition-of-done.md) antes de cada commit.

> ⚠️ **Nota (Fase 7):** `bun run check` y `bun run build` pueden fallar de forma intermitente según el entorno (`require is not defined` al resolver `node_modules/yaml`), sin relación con el contenido de `docs/` ni con `src/content.config.ts`. Antes de dar por terminada una tarea de la Fase 7, revisa la intermitencia conocida y su reparación en [`07-maintenance/00-INDEX.md`](07-maintenance/00-INDEX.md).
