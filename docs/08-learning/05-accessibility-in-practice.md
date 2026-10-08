# 05-accessibility-in-practice: Accesibilidad Web (WCAG AA) en la Práctica

La accesibilidad (a11y) no es una optimización secundaria ni un "checklist" para rellenar al final de un proyecto: es un **requisito de ingeniería innegociable**. 

Este documento explica cómo se aplican los estándares **WCAG 2.1 nivel AA** en **Samsar | Sitio web personal**.

---

## 1. El Mito de la Accesibilidad como Sobrecarga

Existe la creencia errónea de que hacer un sitio web accesible requiere librerías complejas o arruina la estética visual. La realidad es la opuesta:
- La accesibilidad comienza con **HTML semántico nativo**.
- Los lectores de pantalla y motores de búsqueda navegan el documento usando el árbol de accesibilidad (Accessibility Tree).
- Si usas la etiqueta correcta (`<button>` en lugar de `<div onClick>`), el navegador te otorga soporte de teclado, foco y roles de forma gratuita.

---

## 2. Los Cuatro Pilares WCAG en este Proyecto

### Pilar 1: Perceptible (Contraste y Color)
- **Ratio de contraste en texto regular:** Mínimo **4.5:1** contra el fondo inmediato.
- **Ratio de contraste en texto grande o negrita:** Mínimo **3:1**.
- **Contraste de componentes UI interactivos (bordes, botones):** Mínimo **3:1**.
- **El color no es el único canal:** Si un estado es exitoso o erróneo, se acompaña de iconos o texto explícito, nunca solo de un cambio cromático.

En `src/styles/theme.css`:
```css
/* Tanto en tema oscuro como claro, los tokens garantizan > 4.5:1 */
--text-primary: #F8FAFC;       /* Sobre fondos oscuros: ratio > 11:1 */
--text-secondary: #94A3B8;     /* Ratio > 5.5:1 */
```

### Pilar 2: Operable (Navegación por Teclado y Foco Visible)
Toda interacción que pueda realizarse con un ratón debe ser 100% ejecutable con un teclado:
- **Tabulación lógica:** El orden de foco sigue estrictamente la lectura visual.
- **Anillos de foco visibles:** Prohibido usar `outline: none` sin proveer un reemplazo accesible:
```css
/* focus visible estandarizado en Tailwind v4 */
focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:outline-none
```
- **Skip Links:** Los usuarios de teclado deben poder saltar la barra de navegación directamente al contenido principal mediante enlaces accesibles.

### Pilar 3: Comprensible (Jerarquía y Textos de Interfaz)
- **Un único `<h1>` por página:** Estructura jerárquica clara (`H1 -> H2 -> H3`) sin saltar niveles arbitrariamente.
- **Botones con propósito inequívoco:** Los botones de solo icono (como el selector de tema o el menú móvil) deben incluir obligatoriamente un atributo `aria-label`:
```astro
<button aria-label="Cambiar a tema claro">
  <SunIcon aria-hidden="true" />
</button>
```

### Pilar 4: Robusto (Compatibilidad y Reducción de Movimiento)
- **`prefers-reduced-motion`:** Respetar a los usuarios con sensibilidad vestibular o mareo por movimiento:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 3. Elementos Decorativos: El Rol de `aria-hidden`

El sitio incorpora iconografía y motivos mayas geométricos ancestrales. ¿Cómo convivimos con el arte sin saturar a los lectores de pantalla?

> **Regla:** Si un elemento es puramente estético y no aporta información semántica o de navegación, se le asigna `aria-hidden="true"`.

```astro
<!-- Motivo maya decorativo inline -->
<svg aria-hidden="true" class="opacity-15 pointer-events-none">
  <!-- Geometría SVG -->
</svg>
```

De esta forma, el usuario vidente disfruta del detalle cultural y visual, mientras que la persona que usa un lector de pantalla no es interrumpida con descripciones geométricas vacías.

---

## 4. Cómo Auditar Accesibilidad en Local

1. **Navegación sin mouse (Tab test):** Desconecta o no uses el ratón. Recorre la página usando únicamente `Tab`, `Shift + Tab`, `Enter` y `Espacio`. ¿Sabes en todo momento dónde está el foco?
2. **Lighthouse:** Ejecuta la auditoría de accesibilidad en Chrome DevTools; la puntuación debe ser **100/100**.
3. **Inspección de contraste:** Usa el cuentagotas de las DevTools para validar ratios de texto en ambos temas.
