# ADR-0012: Biblioteca de Iconos Compartida entre Astro y Vue

- **Estado:** Aceptado
- **Fecha:** 2026-10-09
- **Decisores:** Samuel Sarmientos / Samsar
- **Documento relacionado:** [`ADR-0010`](0010-inline-svg-icons-over-package.md) · [`src/components/ui/icons.ts`](../../src/components/ui/icons.ts) · [`docs/05-tasks/07-maintenance/07-component-gaps.md`](../05-tasks/07-maintenance/07-component-gaps.md)

---

## 1. Contexto y Problema

[`ADR-0010`](0010-inline-svg-icons-over-package.md) decidió un componente `Icon.astro` interno con los vectores SVG inline, y prohibió instalar paquetes de iconografía. Al ejecutar esa decisión en la tarea 07 apareció un obstáculo que el ADR no previó: **un componente Astro no puede renderizarse dentro de un componente Vue**, y dos de los cinco consumidores de iconos son islas Vue (`ThemeToggle.vue` y `MobileMenu.vue`). Ejecutar aquel ADR al pie de la letra habría dejado fuera precisamente los iconos de las islas.

---

## 2. Factores de Decisión

- **La decisión de fondo no está en duda:** siguen siendo SVG inline y siguen sin añadirse dependencias.
- **Una sola fuente de verdad:** duplicar los vectores entre Astro y Vue reintroduce el problema que el ADR-0010 quería resolver.
- **Simplicidad proporcionada:** el proyecto tiene nueve iconos, así que la solución no debe ser más compleja que el problema.

---

## 3. Opciones Consideradas

### Opción 1: Biblioteca de vectores compartida y dos renderizadores finos (Seleccionada)
- **Ventajas:** una sola definición por icono; cada renderizador son unas 40 líneas; el tipo `IconName` da autocompletado y convierte un nombre inexistente en un error de compilación; no añade dependencias.
- **Desventajas:** dos archivos que mantener en paralelo cuando cambie la **forma de pintar** (no cuando cambie un icono, que es el caso frecuente).

### Opción 2: Mantener los SVG inline dentro de las islas
- **Ventajas:** cero archivos nuevos; menos indirección.
- **Desventajas:** los mismos iconos existirían dos veces, y `close` ya se usa en dos sitios distintos: es exactamente la duplicación que el ADR-0010 quiso eliminar.

### Opción 3: Renunciar al componente y dejar cada SVG donde estaba
- **Ventajas:** nada nuevo que mantener.
- **Desventajas:** contradice un ADR aceptado sin aportar nada a cambio; el `stroke-width`, el `viewBox` y el `aria-hidden` seguirían dependiendo de la memoria de quien escribe cada SVG.

---

## 4. Decisión Adoptada

Los vectores viven en `src/components/ui/icons.ts`, tipados, y los consumen dos renderizadores finos: `Icon.astro` para archivos `.astro` e `Icon.vue` para las islas.

**El ADR-0010 sigue vigente:** no se instala ningún paquete de iconografía y los SVG siguen siendo inline. Este documento solo precisa *cómo* se materializa aquella decisión; no la supersede ni cambia su veredicto.

---

## 5. Consecuencias y Compromisos

- **Impacto positivo:** nueve iconos en un solo sitio; un nombre inexistente es un error de compilación y no un SVG vacío; el `aria-hidden` deja de depender de la disciplina de cada autor.
- **Compromisos asumidos:** añadir un icono exige copiar su trazado de Lucide a `icons.ts` (algo que el ADR-0010 ya asumía) y, si cambia la forma de pintar, tocar los dos renderizadores.
- **Regla de implementación:** los iconos de interfaz se consumen por `name` desde `icons.ts`. Un SVG decorativo de un solo uso —el glifo del 404, los motivos mayas— **no** entra aquí: es ilustración, no iconografía.
