# ADR-0001: Selección de Astro 6 sobre Nuxt y Eleventy

- **Estado:** Aceptado
- **Fecha:** 2026-10-06
- **Decisores:** Samuel Sarmientos / Samsar
- **Documento relacionado:** [`docs/02-architecture/01-overview.md`](../02-architecture/01-overview.md)

---

## 1. Contexto y Problema

El proyecto es un sitio web personal centrado en contenido (artículos técnicos largos, guías pedagógicas y portafolio). Se requiere un generador de sitios estáticos (SSG) que entregue rendimiento óptimo (Lighthouse > 95), minimice el JavaScript enviado al cliente y soporte componentes interactivos sin obligar a adoptar un runtime completo en cada página.

El autor cuenta con amplia experiencia en Vue y Angular, sin experiencia en React. Por tanto, la comparativa técnica se centró en **Astro 6** vs **Nuxt 4** vs **Eleventy 3**.

---

## 2. Factores de Decisión

- **JavaScript en cliente:** Prioridad a 0 KB de JS por defecto en páginas de lectura.
- **Validación de contenido:** Soporte de primer nivel para Markdown/MDX con esquemas tipados.
- **Integración con Vue:** Posibilidad de escribir componentes interactivos en Vue 3.
- **Rendimiento SEO:** Tiempos de carga instantáneos (LCP < 1.5s) sin esfuerzo de hidratación innecesaria.
- **Curva de aprendizaje:** Aprovechamiento del conocimiento previo sin sobrecarga conceptual.

---

## 3. Opciones Consideradas

### Opción 1: Astro 6 con Islas Vue (Seleccionada)
- **Ventajas:** Arquitectura de islas (Islands Architecture) que envía 0 JS por defecto; Content Collections con validación Zod en tiempo de compilación; integración oficial y transparente con Vue (`@astrojs/vue`).
- **Desventajas:** La sintaxis de plantillas `.astro` es propia, aunque intuitiva (mezcla de JSX/HTML y frontmatter).

### Opción 2: Nuxt 4 (SSG / Prerender)
- **Ventajas:** Framework natural para desarrolladores Vue; ecosistema completo y maduro.
- **Desventajas:** Incluye el runtime cliente de Vue en todas las páginas (~50-100 KB de JS base), lo que añade sobrecarga innecesaria para un sitio de lectura estática.

### Opción 3: Eleventy 3
- **Ventajas:** Extremadamente ligero, genera HTML puro sin runtime cliente.
- **Desventajas:** Integración con componentes Vue compleja y no oficial; carece de un sistema de tipado y validación de contenido integrado como Content Collections.

---

## 4. Decisión Adoptada

Se adopta **Astro 6** como generador de sitio estático. Su modelo de islas permite que el 90% del sitio sea HTML estático puro, hidratando únicamente los componentes interactivos aislados mediante `@astrojs/vue`. Además, Content Collections con Zod proporciona una robustez inigualable para gestionar los artículos del blog y proyectos.

---

## 5. Consecuencias y Compromisos

- **Impacto positivo:** Puntuaciones Lighthouse > 95 casi garantizadas; JS inicial < 30 KB; desarrollo ágil aprovechando Vue donde realmente se necesita.
- **Compromisos asumidos:** Los componentes estructurales y layouts deben escribirse en `.astro` en lugar de `.vue`.
- **Regla de implementación:** Por defecto todo componente es `.astro`. Solo se permite crear componentes `.vue` en `src/components/islands/` cuando exista estado reactivo real en cliente.
