# ADR-0004: Adopción de Vue 3 (Composition API) para Islas Interactivas

- **Estado:** Aceptado
- **Fecha:** 2026-10-06
- **Decisores:** Samuel Sarmientos / Samsar
- **Documento relacionado:** [`docs/02-architecture/03-islands.md`](../02-architecture/03-islands.md)

---

## 1. Contexto y Problema

Astro permite utilizar prácticamente cualquier framework frontend moderno (React, Vue, Svelte, Solid, Preact) para hidratar islas interactivas. Sin embargo, permitir múltiples frameworks en un mismo repositorio genera fragmentación de dependencias, infla el bundle cliente y confunde tanto a estudiantes como a agentes de IA.

Se requiere estandarizar **un único framework de UI reactiva** para las islas del cliente.

---

## 2. Factores de Decisión

- **Experiencia del autor:** ~8 años de trayectoria profesional con **Vue** y Angular; cero experiencia con React.
- **Enfoque pedagógico:** Claridad conceptual para estudiantes que aprenden desarrollo de componentes con TypeScript.
- **Soporte oficial de Astro:** Integración robusta y mantenida (`@astrojs/vue`).
- **Coherencia y uniformidad:** Prohibir mezclar frameworks distintos en el proyecto.

---

## 3. Opciones Consideradas

### Opción 1: Vue 3 con Composition API (Seleccionada)
- **Ventajas:** Aprovecha la maestría técnica del autor; sintaxis moderna y concisa con `<script setup lang="ts">`; soporte oficial completo en Astro vía `@astrojs/vue`; excelente rendimiento reactivo.
- **Desventajas:** El ecosistema de librerías para Astro en React es ligeramente más grande, aunque irrelevante para este caso de uso donde solo se necesitan islas pequeñas y específicas.

### Opción 2: React
- **Ventajas:** Muy extendido en la industria general.
- **Desventajas:** Curva de aprendizaje innecesaria para el autor; JSX forzado; sobrecarga de bundle innecesaria frente a Vue en islas pequeñas.

### Opción 3: Svelte
- **Ventajas:** Extremadamente ligero y compilado.
- **Desventajas:** Nueva sintaxis a aprender; dispersa el esfuerzo pedagógico del autor fuera de su stack principal.

---

## 4. Decisión Adoptada

Se define **Vue 3** como el **único framework permitido para islas interactivas** en todo el proyecto. Todas las islas deben implementarse estrictamente con **Composition API** y `<script setup lang="ts">`.

---

## 5. Consecuencias y Compromisos

- **Impacto positivo:** Cero curva de aprendizaje para el autor; coherencia arquitectónica total; excelente experiencia didáctica con TypeScript.
- **Compromisos asumidos:** Se descarta el uso de Options API y de cualquier otro framework (React, Svelte, Solid).
- **Regla de implementación:**
  - Ubicación obligatoria en `src/components/islands/*.vue`.
  - Prohibido el uso de React o JSX.
  - Se debe utilizar la directiva de hidratación más perezosa posible (`client:visible` o `client:idle` antes que `client:load`).
