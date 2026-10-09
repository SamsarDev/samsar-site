# ADR-0009: Adopción del Content Layer API de Astro 7

- **Estado:** Aceptado
- **Fecha:** 2026-10-07
- **Decisores:** Samuel Sarmientos / Samsar
- **Documento relacionado:** [`docs/02-architecture/01-overview.md`](../02-architecture/01-overview.md) · [`docs/01-product/04-content-model.md`](../01-product/04-content-model.md)

---

## 1. Contexto y Problema

Astro 5 y 6 introdujeron el nuevo **Content Layer API**, que reemplaza el enfoque clásico de Content Collections (`src/content/config.ts` con `type: 'content'`) por un archivo de configuración centralizado en `src/content.config.ts` que utiliza cargadores (*loaders* modulares como `glob`).

Se debía decidir si mantener la convención clásica heredada de Astro v4 o adoptar el estándar moderno de Astro 7.

---

## 2. Factores de Decisión

- **Estándar vigente:** Alinear el proyecto con las mejores prácticas y documentación oficial actual de Astro 7.
- **Rendimiento de compilación:** El Content Layer API procesa las colecciones de forma asíncrona y optimizada en build time.
- **Flexibilidad de datos:** Permite utilizar cargadores modulares (`glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' })`) facilitando futuras extensiones.

---

## 3. Opciones Consideradas

### Opción 1: Content Layer API moderno (`src/content.config.ts`) (Seleccionada)
- **Ventajas:** Estándar nativo de Astro 7; builds significativamente más rápidos; desacoplamiento limpio entre la fuente física de archivos y la colección.
- **Desventajas:** Difiere ligeramente de tutoriales antiguos basados en Astro v3/v4.

### Opción 2: Content Collections clásico (`src/content/config.ts`)
- **Ventajas:** Sintaxis conocida de versiones previas.
- **Desventajas:** API en vías de obsolescencia en el ciclo de vida de Astro 7.

---

## 4. Decisión Adoptada

Se adopta el **Content Layer API de Astro 7** como estándar oficial del repositorio, definiendo las colecciones y esquemas Zod en `src/content.config.ts` con el cargador `glob`.

---

## 5. Consecuencias y Compromisos

- **Impacto positivo:** Código a prueba de futuro; compilaciones de contenido más veloces; alineación con la documentación oficial vigente.
- **Compromisos asumidos:** La configuración de colecciones reside en `src/content.config.ts` (en la raíz de `src/`) y no en la subcarpeta `src/content/config.ts`.
- **Regla de implementación:** Todo esquema de contenido nuevo debe registrarse en `src/content.config.ts` importando `defineCollection` y `z` de `astro:content`.
