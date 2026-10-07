# ADR-0010: Adopción de Iconos SVG Inline sobre Paquetes de Iconografía

- **Estado:** Aceptado
- **Fecha:** 2026-10-07
- **Decisores:** Samuel Sarmientos / Samsar
- **Documento relacionado:** [`docs/03-design/03-components.md`](../03-design/03-components.md) · [`docs/03-design/components/01-ui.md`](../03-design/components/01-ui.md)

---

## 1. Contexto y Problema

Para la iconografía técnica de la interfaz (flechas de paginación, lupas de búsqueda, icono de tema sol/luna, enlaces externos y menú móvil), se evaluó si convenía instalar un paquete de dependencias de producción (como `lucide-astro` o `unplugin-icons`) o crear un componente `.astro` interno que renderice directamente los vectores SVG de Lucide.

---

## 2. Factores de Decisión

- **Regla de dependencias mínimas:** `AGENTS.md` (sección 7.5) exige explícitamente no instalar paquetes sin justificación estricta.
- **Presupuesto de bundle:** Mantener el peso de dependencias y el tiempo de compilación al mínimo posible.
- **Control y personalización:** Capacidad de modificar atributos vectoriales (`stroke-width`, `viewBox`, clases Tailwind) sin intermediarios.

---

## 3. Opciones Consideradas

### Opción 1: Componente `<Icon />` interno con SVGs inline (Seleccionada)
- **Ventajas:** Cero dependencias npm externas añadidas a `package.json`; control absoluto sobre el código SVG; solo se incluyen en el repositorio los ~15 iconos que el proyecto realmente utiliza; cero impacto en compilación.
- **Desventajas:** Requiere copiar manualmente el código SVG de Lucide al componente cuando se incorpora un nuevo icono.

### Opción 2: Instalar `lucide-astro`
- **Ventajas:** Importación directa de cualquier icono por nombre.
- **Desventajas:** Introduce un paquete externo en `node_modules`; riesgo de dependencias transitivas o incompatibilidades en actualizaciones mayores de Astro.

---

## 4. Decisión Adoptada

Se adopta el patrón de **Componente Interno con SVGs Inline (`Icon.astro`)**. El componente expone una prop `name` y renderiza internamente el trazado SVG optimizado de Lucide correspondiente, manteniendo la política de dependencias limpias.

---

## 5. Consecuencias y Compromisos

- **Impacto positivo:** Cero dependencias añadidas a `package.json`; compilación más rápida; total autonomía técnica.
- **Compromisos asumidos:** Si se necesita un icono nuevo, se añade a la biblioteca interna de `Icon.astro` copiándolo desde la librería oficial de Lucide.
- **Regla de implementación:** Queda prohibido instalar `lucide-astro` u otras librerías de iconos. Prohibido también el uso de emojis como iconos de interfaz.
