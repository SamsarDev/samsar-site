# ADR-0007: Diferimiento del Buscador Client-Side a Post-MVP

- **Estado:** Aceptado
- **Fecha:** 2026-10-07
- **Decisores:** Samuel Sarmientos / Samsar
- **Documento relacionado:** [`docs/01-product/02-features.md`](../01-product/02-features.md) · [`docs/01-product/screens/04-blog.md`](../01-product/screens/04-blog.md)

---

## 1. Contexto y Problema

Existía una ambigüedad sobre si el buscador client-side debía incorporarse en el lanzamiento inicial (MVP) o diferirse. Aunque un motor de búsqueda enriquecería la exploración, el MVP del blog se lanza con un volumen controlado de artículos organizados de forma clara en sus 3 pilares (`Samsar|Dev`, `Samsar|IA`, `Samsar|Games`).

Se evaluó la conveniencia de reducir el alcance del primer lanzamiento para priorizar la solidez del contenido y una entrega ágil.

---

## 2. Factores de Decisión

- **Alcance ágil del MVP:** Reducir la superficie de pruebas e interactividad en el primer despliegue.
- **Volumen inicial de contenido:** Con un catálogo inicial acotado, los filtros por categoría y tags son más que suficientes para la navegación.
- **Presupuesto de JavaScript:** Maximizar la entrega de 0 KB de JavaScript en el blog inicial.

---

## 3. Opciones Consideradas

### Opción 1: Diferir el Buscador a Post-MVP (Seleccionada)
- **Ventajas:** Despliegue del blog 100% estático en build time sin necesidad de indexar ni cargar librerías de búsqueda en cliente; menor complejidad inicial.
- **Desventajas:** La búsqueda libre de texto no estará disponible en el día uno.

### Opción 2: Implementar Buscador desde el MVP
- **Ventajas:** Búsqueda en tiempo real desde el inicio.
- **Desventajas:** Añade complejidad de indexación y componentes interactivos antes de tener un volumen crítico de artículos.

---

## 4. Decisión Adoptada

Se decide **mover el Buscador Client-Side al catálogo de funcionalidades Post-MVP (F14)**. El MVP de `/blog` se apoyará exclusivamente en las páginas de categorías y filtros estáticos. Cuando el catálogo supere los 20 artículos, se incorporará la isla `BlogSearch.vue` con Pagefind / Fuse.js.

---

## 5. Consecuencias y Compromisos

- **Impacto positivo:** Reducción del tiempo de entrega del MVP; rendimiento del blog 100% libre de JavaScript en cliente; foco en la calidad editorial del contenido.
- **Compromisos asumidos:** La navegación inicial depende de la correcta categorización de los artículos.
- **Regla de implementación:** En el MVP, la página `/blog` no debe cargar scripts de búsqueda; el layout de la interfaz deja el espacio previsto para incorporar la isla en fase 2.
