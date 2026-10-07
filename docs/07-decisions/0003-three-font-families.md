# ADR-0003: Consolidación de la Tríada Tipográfica (Space Grotesk, Manrope, JetBrains Mono)

- **Estado:** Aceptado
- **Fecha:** 2026-10-06
- **Decisores:** Samuel Sarmientos / Samsar
- **Documento relacionado:** [`DESIGN.md`](../../DESIGN.md) · [`docs/03-design/02-typography.md`](../03-design/02-typography.md)

---

## 1. Contexto y Problema

Durante la fase de diseño inicial existían discrepancias entre las especificaciones:
- `SPECIFICATION.md` proponía **Space Grotesk** para títulos, **Inter** para UI, **Source Serif 4** para lectura larga y **JetBrains Mono** para código (4 familias distintas).
- `DESIGN.md` (v1.0) proponía **Newsreader** (serif literaria) para títulos, **Manrope** para cuerpo y **Space Grotesk** para etiquetas (sin fuente monospace definida).

Cargar cuatro familias tipográficas compromete el presupuesto de rendimiento web (Lighthouse > 95 y < 30 KB iniciales). Por otro lado, utilizar serif literaria en títulos desentona con la identidad técnica de un arquitecto de software e IA, mientras que fuentes rígidas como Inter en artículos técnicos extensos producen fatiga visual.

---

## 2. Factores de Decisión

- **Mitigación de fatiga visual:** Lectura técnica prolongada de más de 1.500 palabras sin estrés ocular ni encandilamiento.
- **Identidad cultural y técnica:** Geometría angular moderna que dialogue con estelas y grecas mayas sin caer en ornamentos folclóricos ni terminales distópicas.
- **Presupuesto de rendimiento:** Máximo 3 familias web, autoalojadas en formato `.woff2` y cargadas con `font-display: swap`.
- **Diferenciación sintáctica:** Fuente monospace de alta legibilidad para código, parámetros y telemetría.

---

## 3. Opciones Consideradas

### Opción 1: Tríada Balanceada (Seleccionada)
- **Títulos:** **Space Grotesk** (600, 700). Geometría arquitectónica y angular que evoca precisión mesoamericana.
- **Cuerpo y lectura:** **Manrope** (400, 500). Proporciones humanistas abiertas; interlineado generoso (`1.7` en prosa) que previene el salto de línea involuntario y el estrés ocular.
- **Código y datos:** **JetBrains Mono** (400, 500). Máxima claridad en caracteres técnicos y etiquetas de fecha/taxonomía.

### Opción 2: Cuatro familias de la especificación original
- Space Grotesk + Inter + Source Serif 4 + JetBrains Mono.
- **Desventaja:** Duplica el peso de descarga de fuentes, complica el sistema de diseño CSS y satura la coherencia visual.

### Opción 3: Esquema Editorial Académico (DESIGN v1.0)
- Newsreader (serif) + Manrope + Space Grotesk (sin monospace).
- **Desventaja:** Incompatible con la lectura de código fuente y demasiado distante de los pilares de IA y videojuegos.

---

## 4. Decisión Adoptada

Se adopta formalmente la **Tríada Tipográfica de 3 familias:**
1. `Space Grotesk` para display, H1-H4 y logotipo.
2. `Manrope` para texto corrido, interfaces, botones y artículos del blog (ancho máximo 70ch).
3. `JetBrains Mono` para bloques de código, chips de stack, fechas y telemetría.

---

## 5. Consecuencias y Compromisos

- **Impacto positivo:** Reducción drástica del payload de fuentes; excelente confort de lectura nocturna sobre fondo *Obsidiana*; jerarquía visual moderna y sobria.
- **Compromisos asumidos:** Se descartan fuentes serif literarias; todo el cuerpo se unifica en Manrope para no penalizar la velocidad de carga.
- **Regla de implementación:** Todas las fuentes deben estar autoalojadas localmente en `public/fonts/` en formato `.woff2`. **Prohibido el uso de CDN de Google Fonts**.
