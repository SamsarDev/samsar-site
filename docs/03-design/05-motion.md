# 05-motion: Principios de Movimiento y Animación

Estándares de animación, rendimiento de renderizado y directrices de accesibilidad para **Samsar | Sitio web personal**.

---

## 1. Filosofía de Movimiento

El movimiento en este sitio es **sereno, lítico y funcional**. No busca deslumbrar ni imitar interfaces de videojuegos o terminales cyberpunk; su objetivo es acompañar la lectura y brindar retroalimentación táctil inmediata.

---

## 2. Reglas Técnicas Estrictas

1. **Duraciones máximas:**
   - **Microinteracciones UI (hover, focus, botones):** `150 ms` a `200 ms`.
   - **Transiciones de vista o modales:** `300 ms` a `400 ms` como máximo absoluto.
2. **Propiedades animables permitidas:**
   - Únicamente propiedades aceleradas por GPU: **`transform`** y **`opacity`**.
   - **Prohibido animar:** `width`, `height`, `top`, `left`, `margin` o `padding`. Estas propiedades fuerzan recálculos de diseño (*layout reflows*) y degradan los 60 fps en dispositivos móviles.
3. **Curvas de aceleración (Easings):**
   - Transiciones interactivas: `ease-out` o `cubic-bezier(0.16, 1, 0.3, 1)` (desaceleración suave y natural).
   - Evitar rebotes agresivos (*bounces*) o aceleraciones lineales mecánicas.

---

## 3. Soporte Obligatorio a `prefers-reduced-motion`

Toda animación o transición debe poder anularse automáticamente si el usuario tiene activada la preferencia de reducción de movimiento en su sistema operativo.

### Implementación en CSS (`src/styles/global.css`):

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 4. Casos de Uso Aprobados

- **Hero:** Fade-in escalonado en el H1 y subtítulo al cargar la página (máximo 400 ms).
- **Tarjetas de Blog y Proyectos:** Elevación sutil de 4px en el eje Y (`transform: translateY(-4px)`) y tenue resplandor en hover con transición de 200 ms.
- **Toggles y Menús:** Desplazamiento lateral suave de 250 ms en el drawer móvil.
