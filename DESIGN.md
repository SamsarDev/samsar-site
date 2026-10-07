# DESIGN.md

Sistema visual de **Samsar | Sitio web personal**. Versión condensada: lo mínimo que todo agente y estudiante debe respetar. El detalle completo está en [`docs/03-design/`](docs/03-design/00-INDEX.md).

**Versión:** 1.2 · **Octubre 2026** · Licencia: [CC BY-NC 4.0](LICENSE-DOCS)

---

## 1. Cómo usar este documento

| Pregunta | Fuente |
|---|---|
| ¿Cuál es el valor exacto de un token? | `src/styles/theme.css` (verdad de implementación) |
| ¿Por qué existe ese token y cuándo se usa? | Este documento y `docs/03-design/01-tokens.md` |
| ¿Cómo se construye un componente? | `docs/03-design/03-components.md` |

Reglas:
- Nunca copies un valor hexadecimal en un componente. Usa el token.
- Prefiere los **tokens semánticos** (`--bg-surface`, `--text-primary`, `--accent-primary`): se resuelven solos según el tema.
- Si falta un token, **no lo inventes**: pregunta. Todo token nuevo se valida contra la sección 5 antes de entrar.

---

## 2. Principios

1. **Contraste cultural:** lo maya dialoga con lo moderno; se expresa en color, textura y motivo, no en la estructura.
2. **Legibilidad primero:** el blog es para leer. Ancho de 70ch, tipografía humanista.
3. **Movimiento con propósito:** animaciones breves que comunican; respetan `prefers-reduced-motion`.
4. **Respiración visual:** el espacio en blanco es un elemento activo.
5. **Coherencia temática:** paleta e iconografía consistentes entre temas.
6. **Accesibilidad AA:** 4.5:1 en texto, 3:1 en elementos de interfaz.
7. **Rendimiento como restricción:** máximo 3 familias tipográficas; el diseño se valida contra el presupuesto de rendimiento.

---

## 3. Identidad

| | |
|---|---|
| Tagline | "Código, cultura y curiosidad" |
| Voz | Técnica, reflexiva, cercana, sin solemnidad |
| Logo | Texto "Samsar" (Space Grotesk 700) + símbolo de quetzal/colibrí |
| Símbolo | **Pendiente de branding.** Hasta entonces se usa `src/components/maya/placeholders/LogoMark.astro` (forma geométrica genérica, MIT) |

| Categoría | Acento |
|---|---|
| Samsar\|Dev | Jade `--color-jade` |
| Samsar\|IA | Colibrí `--color-hummingbird` |
| Samsar\|Games | Cinabrio `--color-blood` |

> El nombre, el logo y el símbolo son identidad reservada (ver [`LICENSE`](LICENSE)). Un fork debe usar la suya.

---

## 4. Color

### 4.1 Tema oscuro "Obsidiana & Jade" (por defecto)

| Token | Valor | Uso |
|---|---|---|
| `--color-bg` | `#0A0E0C` | Canvas |
| `--color-bg-elevated` | `#131916` | Cards, header, footer |
| `--color-bg-highlight` | `#1C2420` | Bordes de cards, hover tenue |
| `--color-jade` | `#00A86B` | Acción primaria |
| `--color-jade-light` | `#1FBF84` | **Nuevo.** Hover del botón primario |
| `--color-jade-muted` | `#1F7A5C` | Bordes estructurales |
| `--color-hummingbird` | `#19C3B0` | Foco, acentos IA |
| `--color-blood` | `#B22222` | Fondos y bordes de peligro. **No para texto** |
| `--color-blood-text` | `#EF6B63` | **Nuevo.** Texto de error sobre fondo oscuro |
| `--color-text` | `#E8E6E1` | Texto principal |
| `--color-text-muted` | `#9AA39E` | Metadata, placeholders |
| `--color-text-subtle` | `#5C6660` | Solo elementos deshabilitados y decorativos |

### 4.2 Tema claro "Cielo, Sol y Maíz"

| Token | Valor | Uso |
|---|---|---|
| `--color-bg` | `#FFFDF7` | Canvas |
| `--color-bg-elevated` | `#F5F0E8` | Cards, header, footer |
| `--color-bg-highlight` | `#EAE3D5` | Hover tenue |
| `--color-sun` | `#F4A300` | **Fondo** de CTA (con texto oscuro) |
| `--color-sun-light` | `#FFB41F` | **Nuevo.** Hover del CTA |
| `--color-sun-text` | `#8A5A00` | **Nuevo.** Ámbar usado como texto |
| `--color-link` | `#0369A1` | **Nuevo.** Enlaces y foco |
| `--color-sky` / `--color-sky-deep` | `#A7D8F0` / `#87CEEB` | Solo decorativos (no texto, no foco) |
| `--color-corn` / `--color-corn-green` | `#F7C948` / `#7CB342` | Solo decorativos |
| `--color-text` | `#2B2B2B` | Texto principal |
| `--color-text-muted` | `#5B6370` | **Cambió** (antes `#6B7280`, no alcanzaba AA sobre cards) |
| `--color-text-subtle` | `#9CA3AF` | Solo deshabilitados y decorativos |

### 4.3 Tokens semánticos (los que usan los componentes)

| Semántico | Oscuro | Claro |
|---|---|---|
| `--bg-primary` | `--color-bg` | `--color-bg` |
| `--bg-surface` | `--color-bg-elevated` | `--color-bg-elevated` |
| `--bg-subtle` | `--color-bg-highlight` | `--color-bg-highlight` |
| `--text-primary` | `--color-text` | `--color-text` |
| `--text-secondary` | `--color-text-muted` | `--color-text-muted` |
| `--text-danger` | `--color-blood-text` | `--color-blood` |
| `--text-link` | `--color-hummingbird` | `--color-link` |
| `--accent-primary` | `--color-jade` | `--color-sun` |
| `--accent-primary-hover` | `--color-jade-light` | `--color-sun-light` |
| `--text-on-accent` | `--color-bg` | `--color-text` |
| `--accent-secondary` | `--color-hummingbird` | `--color-sky-deep` (decorativo) |
| `--accent-danger` | `--color-blood` | `--color-blood` |
| `--border-input` | `--color-text-subtle` | `#6B7280` |
| `--border-focus` | `--color-hummingbird` | `--color-link` |

---

## 5. Contraste validado (WCAG 2.x)

Calculado en octubre 2026 con la fórmula de luminancia relativa de WCAG. Mínimos: **4.5:1** texto normal, **3:1** texto grande y elementos de interfaz.

### Oscuro

| Combinación | Ratio | Resultado |
|---|---|---|
| `text` sobre `bg` / `bg-elevated` | 15.6 / 14.3 | AAA |
| `text-muted` sobre `bg` / `bg-elevated` | 7.5 / 6.9 | AAA |
| `jade` sobre `bg` (enlaces, iconos) | 6.3 | AA |
| `hummingbird` sobre `bg` / `bg-elevated` | 8.8 / 8.0 | AAA |
| `bg` sobre `jade` (texto del botón primario) | 6.3 | AA |
| `bg` sobre `jade-light` (hover) | 8.2 | AAA |
| `text` sobre `blood` (botón de peligro) | 5.4 | AA |
| `blood-text` sobre `bg` / `bg-elevated` | 6.4 / 5.9 | AA |
| `jade-muted` sobre `bg` (borde) | 3.7 | UI OK |
| `blood` sobre `bg` como texto | **2.9** | **No usar para texto** |
| `text-subtle` sobre `bg` | **3.3** | Solo deshabilitado/decorativo |

### Claro

| Combinación | Ratio | Resultado |
|---|---|---|
| `text` sobre `bg` / `bg-elevated` | 13.9 / 12.5 | AAA |
| `text-muted` (`#5B6370`) sobre `bg` / `bg-elevated` | 6.0 / 5.3 | AA |
| `link` sobre `bg` / `bg-elevated` | 5.8 / 5.2 | AA |
| `text` sobre `sun` (texto del CTA) | 6.8 | AA |
| `sun-text` sobre `bg` | 5.8 | AA |
| `blood` sobre `bg` | 6.6 | AA |
| `sun` sobre `bg` como texto o borde | **2.1** | **No usar** |
| `sky-deep` sobre `bg` | **1.7** | **Solo decorativo** |
| `corn-green` sobre `bg` | **2.5** | **Solo decorativo** |

**Reglas derivadas:**
- Ámbar, celeste y verde milpa **nunca** como texto, enlace, anillo de foco ni borde funcional en tema claro.
- El borde de `input` usa `--border-input`, no `--bg-subtle` (que no llega a 3:1).
- Los placeholders usan `--text-secondary`.
- Cada token nuevo se calcula antes de entrar a esta tabla.

---

## 6. Tipografía

Tres familias, autoalojadas en `woff2` con `font-display: swap`. Sin Google Fonts CDN.

| Rol | Familia | Pesos | Uso |
|---|---|---|---|
| Display y headings | Space Grotesk | 600, 700 | H1-H4, logo |
| Cuerpo, interfaz, lectura | Manrope | 400, 500 | Texto, botones, blog |
| Código, metadatos | JetBrains Mono | 400, 500 | Bloques de código, fechas, tags |

| Estilo | Tamaño | Interlineado |
|---|---|---|
| Display (hero H1) | `clamp(2.5rem, 5vw, 3.5rem)` | 1.1 |
| H1 / H2 | `clamp(2rem, 4vw, 2.5rem)` / `clamp(1.5rem, 3vw, 2rem)` | 1.15 / 1.2 |
| H3 / H4 | 1.5rem / 1.25rem | 1.3 / 1.4 |
| Lectura de blog | 1.125rem | 1.7 |
| Cuerpo | 1rem | 1.6 |
| Metadatos (mono) | 0.75rem | 1.4 |

Reglas: ancho de lectura `70ch`; nunca `text-align: justify`; cursiva solo para énfasis semántico; máximo dos niveles de heading por sección.

---

## 7. Espaciado y layout

- **Escala:** 4, 8, 12, 16, 24, 32, 48, 64, 96 px (`--space-1` a `--space-9`).
- **Radios:** 4 (chips) · 8 (botones, inputs) · 12 (cards) · 16 (modales) · full (pills).
- **Contenedores:** prosa `70ch` · contenido `1200px` · ancho `1440px`.
- **Breakpoints (mobile-first, `min-width`):** `sm` 640 · `md` 768 · `lg` 1024 · `xl` 1280.
- **Grid:** 4 columnas (mobile), 8 (tablet), 12 (desktop).
- **Objetivos táctiles:** mínimo 44×44 px, separación ≥ 8 px.
- **Sombras:** sutiles. En oscuro se confía en el borde; el resplandor jade o colibrí solo en hover.

---

## 8. Componentes

| Componente | Reglas clave |
|---|---|
| **Button** | Variantes `primary`, `secondary`, `ghost`, `danger`. Primario: fondo `--accent-primary`, texto `--text-on-accent`, hover `--accent-primary-hover` |
| **Card** | Fondo `--bg-surface`, borde `--bg-subtle`, radio 12. Interactiva: hover con elevación de 4 px |
| **Chip** | Fuente mono 12 px, radio full. Variantes `category`, `tag`, `stack`, `filter` |
| **Callout** | Borde izquierdo de 3 px. Variantes `note`, `tip`, `warning`, `danger` |
| **Input** | Borde `--border-input`; foco con `--border-focus`; error con `--text-danger` más un mensaje (nunca solo color) |
| **Código** | Fondo `--bg-surface`, mono 14.5 px, botón copiar visible al hover y al foco |

Catálogo completo con props y estados: `docs/03-design/03-components.md`.

---

## 9. Movimiento

| Tipo | Duración |
|---|---|
| Micro (foco, hover) | 150-200 ms |
| Estándar (cambio de tema) | 250 ms |
| Narrativa (aparición de secciones) | ≤ 400 ms |

- Easing estándar: `cubic-bezier(0.4, 0, 0.2, 1)`.
- Solo animar `transform` y `opacity`. Nunca `width`, `height`, `top` o `left`.
- Máximo 3 propiedades animadas por elemento.
- Todo se desactiva con `prefers-reduced-motion: reduce`.
- Preferir `IntersectionObserver` a los listeners de scroll.

---

## 10. Motivos mayas

Decoración sutil, **nunca** elemento funcional ni icono de acción.

| Motivo | Opacidad máx. | Uso |
|---|---|---|
| Quetzal | 0.15 | Hero, footer |
| Colibrí | 0.10 | Secciones de IA |
| Greca escalonada | 0.08 | Separadores |
| Glifo numeral | 0.20 | Iconos de categoría |
| Pluma | 0.12 | Transiciones entre secciones |
| Espiral | 0.15 | Decoración de IA |
| Mazorca / sol | 0.15 / 0.12 | Tema claro |

Reglas: SVG inline; `aria-hidden="true"`; máximo 2 motivos por sección; solo colores de la paleta; opacidad no mayor a la indicada.

> **Los SVG originales de `src/components/maya/` tienen licencia de un solo uso** y no son parte de la licencia MIT. Los alumnos usan los de `src/components/maya/placeholders/` o crean los suyos. Ver [`NOTICE.md`](src/components/maya/NOTICE.md).

---

## 11. Accesibilidad (no negociable)

- Contraste según la sección 5.
- Foco visible en todo elemento interactivo: `outline: 2px solid var(--border-focus); outline-offset: 2px`.
- Todo se maneja con teclado. Enlace "Saltar al contenido" al inicio.
- Botones de solo icono con `aria-label` en español (por ejemplo, "Cambiar tema").
- `<html lang="es">`. Un solo `<h1>` por página, sin saltos de nivel.
- Enlaces distinguibles sin depender solo del color (subrayado).
- Los errores de formulario usan `aria-invalid` y `aria-describedby`.
- Imágenes con `alt` significativo, o `alt=""` si son decorativas.
- Iconos de interfaz: SVG de línea de 1.5-2 px (Lucide o Phosphor). **Sin emojis como iconos.**

---

## 12. Anti-patrones

- Iconografía maya estereotipada o fuentes "mayanizadas".
- Colores fuera de la paleta, neón o saturados.
- Sombras duras o efectos skeuomórficos.
- Animaciones > 500 ms o con `ease-in-out` genérico.
- Texto sobre fondos de bajo contraste.
- Emojis como iconos de interfaz.
- Colores, fuentes o espacios "a ojo" fuera de los tokens.

---

## 13. Rendimiento visual

| Métrica | Meta |
|---|---|
| Lighthouse (todas las categorías) | > 95 |
| Familias tipográficas | ≤ 3 (≈ 6 archivos `woff2`) |
| JS inicial | **Por medir.** Se fija con el primer build (ver tarea de base layout) |
| CLS | < 0.05 |

La meta de ≤ 30 KB de JS del documento anterior era una estimación. Vue más las islas necesarias puede superarla; se medirá y se documentará la cifra real en [`docs/02-architecture/04-performance.md`](docs/02-architecture/04-performance.md).

---

## 14. Cambios en v1.2

Esta versión corrige la v1.1 tras recalcular los contrastes.

| Cambio | Motivo |
|---|---|
| Nuevo `--color-jade-light` (`#1FBF84`) | Se usaba en el hover del botón sin estar definido |
| Nuevo `--color-blood-text` (`#EF6B63`) | `blood` sobre fondo oscuro da 2.9:1; no sirve como texto |
| Nuevos `--color-link`, `--color-sun-text`, `--color-sun-light` | `sky-deep` (1.7:1) y `sun` (2.1:1) no sirven como enlace, texto ni foco en tema claro |
| `--color-text-muted` claro: `#6B7280` → `#5B6370` | No llegaba a 4.5:1 sobre `bg-elevated` (4.3:1) |
| Nuevos semánticos `--text-on-accent`, `--text-link`, `--text-danger`, `--accent-primary-hover`, `--border-input` | Evitan decidir colores caso por caso |
| Tabla de contraste recalculada | La v1.1 tenía valores inexactos y afirmaba AA para combinaciones que no lo cumplen |
| Emoji del header reemplazado por `LogoMark` (placeholder SVG) | Contradecía la regla de no usar emojis como iconos |
| Presupuesto de JS pasa a "por medir" | La cifra de 30 KB no estaba medida |

El documento original v1.1 se conserva en [`docs/99-reference/`](docs/99-reference/) solo como referencia histórica.

---

> **Documento vivo.** Cualquier cambio visual se refleja aquí primero, con su entrada en la sección 14 y su verificación en la sección 5.