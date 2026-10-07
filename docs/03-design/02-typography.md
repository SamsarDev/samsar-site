# 02-typography: Sistema y Jerarquía Tipográfica

Especificación de la tríada tipográfica, escalas fluidas, interlineados y reglas de legibilidad para **Samsar | Sitio web personal**.

---

## 1. La Tríada Tipográfica

Seleccionada para maximizar la legibilidad en pantallas oscuras, mitigar la fatiga visual y mantener un presupuesto de rendimiento inferior a 100 KB:

| Familia | Rol en el Sistema | Pesos | Formato | Justificación Técnica |
|---|---|---|---|---|
| **Space Grotesk** | Display, Logotipo, Headings (H1-H4) | 600, 700 | `.woff2` autoalojada | Geometría angular inspirada en la arquitectura y estelas mayas, sin caer en lo retro-computacional. |
| **Manrope** | Texto corrido, interfaz, botones, artículos de blog | 400, 500 | `.woff2` autoalojada | Proporciones humanistas y formas abiertas. Suprime el estrés ocular en lecturas de más de 1.500 palabras. |
| **JetBrains Mono** | Bloques de código, parámetros, tags, fechas | 400, 500 | `.woff2` autoalojada | Distinción sintáctica perfecta entre caracteres similares (`0`/`O`, `l`/`1`) y tracking calibrado. |

> **Restricción no negociable:** Todas las fuentes se sirven localmente desde `public/fonts/` con `font-display: swap`. Queda estrictamente prohibido enlazar Google Fonts u otros CDNs externos.

---

## 2. Escala Tipográfica Fluida

Los tamaños se ajustan de manera continua entre móvil y escritorio utilizando funciones CSS `clamp()`:

| Nivel | Tamaño | Interlineado | Peso | Familia |
|---|---|---|---|---|
| **Display (Hero H1)** | `clamp(2.5rem, 5vw, 3.5rem)` | `1.1` | 700 | Space Grotesk |
| **H1 (Páginas)** | `clamp(2rem, 4vw, 2.5rem)` | `1.15` | 700 | Space Grotesk |
| **H2 (Secciones principales)** | `clamp(1.5rem, 3vw, 2rem)` | `1.2` | 600 | Space Grotesk |
| **H3 (Subsecciones)** | `1.5rem` (24px) | `1.3` | 600 | Space Grotesk |
| **H4 (Títulos de cards)** | `1.25rem` (20px) | `1.4` | 600 | Space Grotesk |
| **Lectura de Blog (Prose)** | `1.125rem` (18px) | `1.7` | 400 | Manrope |
| **Cuerpo General / UI** | `1rem` (16px) | `1.6` | 400 / 500 | Manrope |
| **Cuerpo Pequeño / Labels** | `0.875rem` (14px) | `1.5` | 500 | Manrope |
| **Código y Snippets** | `0.9rem` (14.5px) | `1.5` | 400 | JetBrains Mono |
| **Metadata / Telemetría** | `0.75rem` (12px) | `1.4` | 500 / 600 | JetBrains Mono |

---

## 3. Reglas de Legibilidad Editorial

1. **Medida de línea (Prose Measure):** El ancho de los bloques de lectura larga nunca debe superar los **70ch** (~680px - 740px), evitando la fatiga por salto de línea.
2. **Alineación:** Siempre alineado a la izquierda (`text-align: left`). **Prohibido el texto justificado** en la web, ya que genera ríos de espacios irregulares que dañan la lectura en pantallas móviles.
3. **Jerarquía estricta de H1:** Exactamente **un solo `<h1>` por página**, sin saltar niveles de encabezado (un H3 nunca debe ir inmediatamente después de un H1 sin un H2 intermediario).
4. **Espaciado vertical:** Interlineado amplio (`1.7`) para lectura larga sobre sustrato de obsidiana, compensando la absorción de luz del fondo oscuro.
