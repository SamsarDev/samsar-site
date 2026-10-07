# 05-profile-and-experience: Fase 5 — Perfil y Experiencia Profesional

Secuencia pedagógica de tareas para implementar las pantallas de presentación personal (`/sobre-mi`) y trayectoria profesional (`/experiencia`) en **Samsar | Sitio web personal**, abarcando la biografía narrativa, valores de ingeniería, la isla interactiva Vue para el filtrado del timeline cronológico y la descarga de CV.

---

## 1. Secuencia de Tareas

Las tareas están organizadas de forma atómica para resolver primero la base de datos y recursos visuales, luego la página biográfica, seguido por el componente interactivo de cliente y finalmente la vista de trayectoria consolidada:

| # | Tarea | Qué se construye | Archivos Principales |
|---|---|---|---|
| **01** | [`01-data-and-assets.md`](01-data-and-assets.md) | Centralización de recursos estáticos (PDF descargable y foto avatar) y módulos de datos fuertemente tipados en TypeScript (`profile.ts` y `experience.ts`). | `src/data/profile.ts`, `src/data/experience.ts`, `public/cv-samuel-sarmientos.pdf`, `src/assets/avatar.png` |
| **02** | [`02-about-me-page.md`](02-about-me-page.md) | Pantalla `/sobre-mi`: Hero personal con avatar, biografía narrativa, matriz de 6 áreas de interés, principios éticos/filosóficos, stack de dominio y CTA de contacto. | `src/pages/sobre-mi.astro` |
| **03** | [`03-timeline-island.md`](03-timeline-island.md) | Isla interactiva Vue 3 `ExperienceTimeline.vue` (`client:visible`): filtrado reactivo por especialidad (Backend, Cloud, IA, etc.), hitos temporales y badges de tecnologías. | `src/components/islands/ExperienceTimeline.vue` |
| **04** | [`04-experience-page-and-navigation.md`](04-experience-page-and-navigation.md) | Pantalla `/experiencia` (encabezado, descarga directa de CV, resumen ejecutivo, integración del timeline, educación, certificaciones e idiomas), verificación de `Nav.astro` e índices. | `src/pages/experiencia.astro`, `src/components/layout/Nav.astro` |

---

## 2. Prerrequisitos de la Fase

Antes de iniciar la tarea 01 de esta fase, confirma que:
- Las **Fases 1 a 4** estén completadas y fusionadas en `main`.
- `bun run check` y `bun run build` pasen con 0 errores y 0 advertencias.
- Los tokens de color, espaciado y tipografía en `src/styles/theme.css` estén disponibles.

---

## 3. Resultado Esperado al Finalizar la Fase 5

Al completar las 4 tareas de esta fase:
- El sitio contará con una presentación humana y técnica completa en `/sobre-mi`.
- El currículum profesional en `/experiencia` ofrecerá una vista cronológica clara con filtrado instantáneo mediante una isla Vue reactiva hidratada solo cuando es visible.
- Reclutadores y visitantes podrán descargar el CV en PDF directamente.
- Toda la navegación principal del Header y Footer enlazará a las pantallas definitivas sin enlaces rotos.
- WCAG AA cumplido en temas claro y oscuro, con foco visible y tipografía legible.
