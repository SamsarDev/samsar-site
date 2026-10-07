# 03-design: Sistema de Diseño e Identidad Visual

Punto de entrada a las especificaciones visuales, tokens CSS, tipografía, componentes, patrones y accesibilidad de **Samsar | Sitio web personal**.

---

## 1. Contenido de esta sección

| Archivo | Qué define | Cuándo consultarlo |
|---|---|---|
| [`01-tokens.md`](01-tokens.md) | Catálogo completo de custom properties (primitivas y semánticas) para temas oscuro y claro. | Al maquetar estilos o actualizar `src/styles/theme.css`. |
| [`02-typography.md`](02-typography.md) | Tríada tipográfica (Space Grotesk, Manrope, JetBrains Mono), escalas `clamp()` e interlineados. | Al jerarquizar textos, títulos o configurar tamaños en CSS. |
| [`03-components.md`](03-components.md) | Índice maestro de componentes, directrices de arquitectura UI y convención de props. | Al construir o refactorizar cualquier componente de interfaz. |
| [`components/`](components/) | Fichas técnicas exhaustivas de los ~33 componentes divididos por categorías funcionales. | Al implementar las props, estados y estilos de un componente específico. |
| [`04-patterns.md`](04-patterns.md) | Patrones de layout: columna de lectura de 70ch, riel lateral, grillas asimétricas y contenedores. | Al estructurar layouts de página o composiciones visuales complejas. |
| [`05-motion.md`](05-motion.md) | Duraciones (≤ 400 ms), curvas de aceleración y soporte estricto a `prefers-reduced-motion`. | Al animar elementos, transiciones de vista o efectos hover. |
| [`06-maya-motifs.md`](06-maya-motifs.md) | Reglas de uso digno y respetuoso de la iconografía maya, SVGs inline y límites de opacidad. | Al incorporar elementos visuales decorativos inspirados en la cultura maya. |
| [`07-accessibility.md`](07-accessibility.md) | Matriz de contraste WCAG AA validada, foco visible, navegación por teclado y etiquetas ARIA. | Al verificar que una pantalla o componente cumple la Definición de Terminado. |

---

## 2. Orden de lectura recomendado

1. **[`DESIGN.md`](../../DESIGN.md)** (15 min): Leer el documento raíz condensado que resume los principios visuales.
2. **`01-tokens.md`** y **`02-typography.md`** (10 min): Conocer la paleta cromática y la tríada tipográfica.
3. **`03-components.md`** (10 min): Entender cómo se estructuran los componentes y revisar las fichas en `components/`.
4. **`06-maya-motifs.md`** y **`07-accessibility.md`** (10 min): Interiorizar las restricciones culturales y de accesibilidad no negociables.

---

## 3. Fuentes de verdad

- **Verdad de implementación:** `src/styles/theme.css` contiene los valores CSS exactos en código.
- **Verdad conceptual:** `DESIGN.md` (raíz) y esta carpeta explican el porqué de cada decisión visual.
- **Regla inquebrantable:** Nunca usar valores hexadecimales directos en componentes; siempre utilizar tokens semánticos (`--bg-surface`, `--text-primary`, `--accent-primary`).
