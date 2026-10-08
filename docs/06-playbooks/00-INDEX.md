# 06-playbooks: Manuales Operativos y Procedimientos Paso a Paso

Esta sección contiene guías prácticas y estandarizadas ("recetas de desarrollo") para realizar tareas comunes y repetitivas dentro del repositorio.

A diferencia de los documentos de arquitectura o diseño que explican la teoría o los fundamentos, los **playbooks** están diseñados como procedimientos operativos directos para que estudiantes, desarrolladores y agentes trabajen con consistencia y sin fricción.

---

## 1. Cuándo Consultar un Playbook

Consulta un playbook cuando vayas a ejecutar una de las siguientes acciones:

| Tarea a realizar | Playbook recomendado | Qué cubre |
|---|---|---|
| **Escribir un artículo en el blog** | [`add-blog-post.md`](add-blog-post.md) | Formato MDX, validación con Zod, categorías (`samsar-dev`, `samsar-ia`, `samsar-games`), tags y Shiki. |
| **Agregar un proyecto al portafolio** | [`add-project.md`](add-project.md) | Taxonomía de proyectos, campos de Content Collections, links a artículos y métricas de impacto. |
| **Crear un componente estático** | [`add-component.md`](add-component.md) | Componentes `.astro` en `src/components/`, tokens de CSS semánticos y accesibilidad WCAG AA. |
| **Crear una isla interactiva** | [`add-island.md`](add-island.md) | Cuándo justificar Vue 3, directivas de hidratación (`client:visible`), props tipadas y rendimiento. |
| **Agregar una nueva página o ruta** | [`add-page.md`](add-page.md) | Creación de rutas en `src/pages/`, layouts base, metadatos SEO y navegación. |

---

## 2. Anatomía de Todo Playbook

Cada manual en esta carpeta sigue estrictamente la misma estructura:

1. **Contexto & Cuándo usarlo:** Propósito técnico y justificación.
2. **Checklist previo:** Requisitos y decisiones que debes tener claras antes de tocar código.
3. **Paso a paso con código modelo:** Plantilla de referencia probada y lista para replicar.
4. **Verificación obligatoria:** Comandos de terminal (`bun run check` y `bun run build`) y pasos manuales de prueba.
5. **Errores comunes y cómo resolverlos:** Los problemas más frecuentes (errores de Zod, FOUC, hydration mismatch) y su solución inmediata.

---

## 3. Reglas de Oro

- **No dupliques información:** Si necesitas usar un token de color o tipografía, consulta [`docs/03-design/01-tokens.md`](../03-design/01-tokens.md).
- **Todo código nuevo debe compilar:** Antes de dar por terminado cualquier cambio derivado de un playbook, ejecuta `bun run check` y `bun run build`.
- **Cero JavaScript innecesario:** Si una interfaz puede resolverse con HTML semántico, CSS nativo o un componente `.astro`, no crees una isla Vue.
