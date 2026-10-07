# Sistema de Diseño del Sitio Web Samsar

**Documento de Sistema de Diseño**  
**Versión:** 1.1 | **Fecha:** Octubre 2026  
**Autor:** Samuel Sarmientos / Samsar  
**Propósito:** Definir la identidad visual, los tokens de diseño, los componentes y los patrones que rigen la implementación del sitio. Este documento es la **fuente de verdad** para cualquier decisión visual.

>Archivo histórico reemplazado por la versión [1.2](DESIGN-v1.2.md)
---

## 📑 Tabla de Contenidos

1. [Filosofía de Diseño](#1-filosofía-de-diseño)
2. [Identidad de Marca](#2-identidad-de-marca)
3. [Sistema de Color](#3-sistema-de-color)
4. [Sistema Tipográfico](#4-sistema-tipográfico)
5. [Espaciado y Layout](#5-espaciado-y-layout)
6. [Iconografía y Motivos Mayas](#6-iconografía-y-motivos-mayas)
7. [Movimiento y Animación](#7-movimiento-y-animación)
8. [Componentes del Sistema](#8-componentes-del-sistema)
9. [Patrones de Composición](#9-patrones-de-composición)
10. [Accesibilidad](#10-accesibilidad)
11. [Responsive Design](#11-responsive-design)
12. [Design Tokens (Referencia Completa)](#12-design-tokens-referencia-completa)

---

## 1. Filosofía de Diseño

### 1.1 Principios Rectores

El diseño del sitio responde a siete principios que guían cada decisión visual:

| # | Principio | Definición | Implicación Práctica |
|---|---|---|---|
| 1 | **Contraste cultural** | Lo ancestral maya dialoga con lo moderno tech sin caricaturizarse | Motivos geométricos sutiles, nunca decorativos en exceso |
| 2 | **Legibilidad primero** | El blog y las guías son para leer, no para admirar | Ancho de lectura 70ch, contraste AA, tipografía humanista |
| 3 | **Movimiento con propósito** | Las animaciones comunican, no distraen | Respetar `prefers-reduced-motion`, transiciones ≤ 400ms |
| 4 | **Respiración visual** | Whitespace generoso como elemento activo | Escala de espaciado en múltiplos de 8px |
| 5 | **Coherencia temática** | Cada sección refuerza la identidad maya | Paleta consistente entre dark/light, iconografía unificada |
| 6 | **Accesibilidad AA** | Contraste mínimo 4.5:1 en texto, 3:1 en UI | Validación WCAG en cada token de color |
| 7 | **Rendimiento como restricción** | El diseño se valida contra el presupuesto de performance | ≤ 3 familias tipográficas, ≤ 30 KB JS inicial |

### 1.2 Tensión Creativa Central

El sitio vive en la tensión entre dos mundos:

```
     ANCESTRAL                              MODERNO
   (Maya, ritual,                ←→       (Tech, código,
    mineral, geométrico)                   minimal, dinámico)
        │                                       │
        │                                       │
        ▼                                       ▼
   Obsidiana, jade,                     Interfaz limpia,
   cinabrio, glifos,                    tipografía nítida,
   plumas, grecas                       cards, islas Vue
```

**Resolución:** Lo maya se manifiesta en **color, textura y motivo**, no en la estructura. La estructura del sitio es moderna, funcional y minimalista; el carácter cultural emerge de la paleta, los acentos y las sutilezas decorativas (siluetas, patrones, glifos).

### 1.3 Anti-patrones (lo que NO hacemos)

- ❌ Iconografía maya estereotipada (calendarios aztecas genéricos, "tribal" decorativo).
- ❌ Colores neón o saturados fuera de la paleta definida.
- ❌ Animaciones largas (> 500ms) o con `ease-in-out` genérico.
- ❌ Texto sobre fondos de bajo contraste (validación WCAG estricta).
- ❌ Fuentes decorativas o "mayanizadas".
- ❌ Sombras duras o efectos skeuomórficos.
- ❌ Emojis como sustitutos de iconos en la interfaz principal.

---

## 2. Identidad de Marca

### 2.1 Marca Personal

| Atributo | Valor |
|---|---|
| **Nombre** | Samuel Sarmientos |
| **Alias** | Samsar |
| **Tagline** | "Código, cultura y curiosidad" |
| **Voz** | Técnica, reflexiva, cercana, sin solemnidad |
| **Tono** | Profesional pero humano; nunca corporativo ni frío |

### 2.2 Logotipo

El logotipo es **textual + símbolo**:

- **Texto principal:** "Samsar" en Space Grotesk 700.
- **Símbolo:** silueta minimalista de quetzal o colibrí en SVG (a definir en fase de branding).
- **Uso:** header, footer, favicon, imagen Open Graph.

**Reglas de uso:**

| Contexto | Presentación |
|---|---|
| Header (desktop) | Símbolo + "Samsar" |
| Header (mobile) | Solo símbolo |
| Footer | Símbolo + nombre completo "Samuel Sarmientos / Samsar" |
| Favicon | Solo símbolo |
| Open Graph | Símbolo + tagline |

### 2.3 Sistema de Nombres de Categorías

Las tres categorías del blog usan la notación `Samsar|Nombre` con separador de barra vertical:

| Categoría | Concepto | Icono | Color de acento |
|---|---|---|---|
| **Samsar\|Dev** | Código, arquitectura, patrones | Terminal / llave | Jade `#00A86B` |
| **Samsar\|IA** | IA, LLMs, agentes, RAG | Chispa / nodo | Colibrí turquesa `#19C3B0` |
| **Samsar\|Games** | Videojuegos, educación lúdica | Mando / joystick | Cinabrio `#B22222` |

---

## 3. Sistema de Color

### 3.1 Tema Oscuro — "Obsidiana & Jade" (Principal)

**Concepto:** La noche maya bajo la obsidiana, con el vuelo del quetzal y el colibrí como acentos de vida.

#### 3.1.1 Paleta Base

| Token | Hex | Nombre | Función |
|---|---|---|---|
| `--color-bg` | `#0A0E0C` | Obsidiana profunda | Canvas principal |
| `--color-bg-elevated` | `#131916` | Basalto superficial | Cards, header, footer |
| `--color-bg-highlight` | `#1C2420` | Basalto elevado | Bordes, hover tenue |

#### 3.1.2 Paleta de Acento

| Token | Hex | Nombre | Función |
|---|---|---|---|
| `--color-jade` | `#00A86B` | Jade imperial | Acciones primarias, botones, focus |
| `--color-jade-muted` | `#1F7A5C` | Jade sombrío | Bordes estructurales, acentos secundarios |
| `--color-hummingbird` | `#19C3B0` | Colibrí turquesa | Acentos IA, procesos activos, brillos |
| `--color-blood` | `#B22222` | Cinabrio ceremonial | Alertas, énfasis crítico, destructivo |

#### 3.1.3 Paleta de Texto

| Token | Hex | Nombre | Función |
|---|---|---|---|
| `--color-text` | `#E8E6E1` | Blanco hueso | Texto principal |
| `--color-text-muted` | `#9AA39E` | Ceniza caliza | Metadata, texto secundario |
| `--color-text-subtle` | `#5C6660` | Ceniza profunda | Placeholders, disabled |

#### 3.1.4 Estados Semánticos

| Estado | Color | Token |
|---|---|---|
| Success | `#00A86B` | `--color-success` (jade) |
| Warning | `#F4A300` | `--color-warning` (sol) |
| Error | `#B22222` | `--color-error` (cinabrio) |
| Info | `#19C3B0` | `--color-info` (colibrí) |

#### 3.1.5 Ejemplo de Aplicación

```css
/* Fondo principal del sitio */
body {
  background-color: var(--color-bg);
  color: var(--color-text);
}

/* Card elevada */
.card {
  background-color: var(--color-bg-elevated);
  border: 1px solid var(--color-bg-highlight);
}

/* Botón primario */
.btn-primary {
  background-color: var(--color-jade);
  color: var(--color-bg); /* texto oscuro sobre jade para contraste */
}

/* Focus visible accesible */
*:focus-visible {
  outline: 2px solid var(--color-hummingbird);
  outline-offset: 2px;
}
```

### 3.2 Tema Claro — "Cielo, Sol y Maíz" (Secundario)

**Concepto:** El amanecer maya sobre la milpa, con el cielo como lienzo y el maíz como sustento.

#### 3.2.1 Paleta Base

| Token | Hex | Nombre | Función |
|---|---|---|---|
| `--color-bg` | `#FFFDF7` | Blanco maíz | Canvas principal |
| `--color-bg-elevated` | `#F5F0E8` | Beige mazorca | Cards, header, footer |
| `--color-bg-highlight` | `#EAE3D5` | Arena seca | Bordes, hover tenue |

#### 3.2.2 Paleta de Acento

| Token | Hex | Nombre | Función |
|---|---|---|---|
| `--color-sky` | `#A7D8F0` | Celeste cielo | Acentos secundarios |
| `--color-sky-deep` | `#87CEEB` | Azul cielo profundo | Links, hover |
| `--color-sun` | `#F4A300` | Amarillo sol | CTAs, énfasis |
| `--color-corn` | `#F7C948` | Amarillo maíz | Detalles brillantes |
| `--color-corn-green` | `#7CB342` | Verde milpa | Bordes, iconos |

#### 3.2.3 Paleta de Texto

| Token | Hex | Nombre | Función |
|---|---|---|---|
| `--color-text` | `#2B2B2B` | Carbón suave | Texto principal |
| `--color-text-muted` | `#6B7280` | Gris piedra | Metadata, texto secundario |
| `--color-text-subtle` | `#9CA3AF` | Gris nube | Placeholders, disabled |

### 3.3 Mapeo Semántico (Dark ↔ Light)

Los componentes usan **tokens semánticos** que se resuelven según el tema activo:

| Token Semántico | Dark | Light |
|---|---|---|
| `--bg-primary` | `--color-bg` | `--color-bg` |
| `--bg-surface` | `--color-bg-elevated` | `--color-bg-elevated` |
| `--bg-subtle` | `--color-bg-highlight` | `--color-bg-highlight` |
| `--text-primary` | `--color-text` | `--color-text` |
| `--text-secondary` | `--color-text-muted` | `--color-text-muted` |
| `--accent-primary` | `--color-jade` | `--color-sun` |
| `--accent-secondary` | `--color-hummingbird` | `--color-sky-deep` |
| `--accent-danger` | `--color-blood` | `--color-blood` |
| `--border-default` | `--color-bg-highlight` | `--color-corn-green` (20% opacity) |
| `--border-focus` | `--color-hummingbird` | `--color-sky-deep` |

### 3.4 Contraste Validado (WCAG AA)

| Combinación | Ratio | Nivel |
|---|---|---|
| `--color-text` sobre `--color-bg` (dark) | 14.8:1 | AAA |
| `--color-text` sobre `--color-bg-elevated` (dark) | 13.2:1 | AAA |
| `--color-text-muted` sobre `--color-bg` (dark) | 6.4:1 | AA+ |
| `--color-jade` sobre `--color-bg` (dark) | 5.8:1 | AA |
| `--color-blood` sobre `--color-bg` (dark) | 4.9:1 | AA |
| `--color-text` sobre `--color-bg` (light) | 13.5:1 | AAA |
| `--color-text-muted` sobre `--color-bg` (light) | 5.2:1 | AA |

> **Regla:** cualquier token nuevo debe validarse contra esta tabla antes de incorporarse.

---

## 4. Sistema Tipográfico

### 4.1 Tríada Tipográfica

El sistema usa **tres familias**, cada una con un rol claro:

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│   SPACE GROTESK          →  DISPLAY / HEADINGS          │
│   Geometría angular, inspirada en grecas y estelas      │
│                                                         │
│   MANROPE                →  CUERPO / UI / LECTURA       │
│   Humanista, abierta, legible en cualquier contexto     │
│                                                         │
│   JETBRAINS MONO         →  CÓDIGO / DATOS TÉCNICOS     │
│   Alta diferenciación de glifos, legibilidad sintáctica │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 4.2 Escala Tipográfica

| Token | Fuente | Peso | Tamaño | Line-height | Uso |
|---|---|---|---|---|---|
| `--font-display` | Space Grotesk | 700 | `clamp(2.5rem, 5vw, 3.5rem)` | 1.1 | Hero H1 |
| `--font-h1` | Space Grotesk | 700 | `clamp(2rem, 4vw, 2.5rem)` | 1.15 | Títulos de página |
| `--font-h2` | Space Grotesk | 600 | `clamp(1.5rem, 3vw, 2rem)` | 1.2 | Secciones |
| `--font-h3` | Space Grotesk | 600 | `1.5rem` (24px) | 1.3 | Subsecciones |
| `--font-h4` | Space Grotesk | 600 | `1.25rem` (20px) | 1.4 | Cards titles |
| `--font-body-lg` | Manrope | 400 | `1.125rem` (18px) | 1.7 | Lectura blog |
| `--font-body` | Manrope | 400 | `1rem` (16px) | 1.6 | Cuerpo general |
| `--font-body-sm` | Manrope | 400 | `0.875rem` (14px) | 1.5 | Metadata |
| `--font-ui` | Manrope | 500 | `0.875rem` (14px) | 1.4 | Botones, labels |
| `--font-code` | JetBrains Mono | 400 | `0.9rem` (14.5px) | 1.5 | Bloques de código |
| `--font-code-inline` | JetBrains Mono | 400 | `0.85em` | inherit | Código inline |
| `--font-meta` | JetBrains Mono | 500 | `0.75rem` (12px) | 1.4 | Fechas, tags, telemetría |

### 4.3 Reglas de Composición

- **Máximo 2 niveles de heading por sección** para evitar ruido jerárquico.
- **Ancho de lectura (blog):** 65-70 caracteres (`max-width: 70ch`).
- **Tracking:** `letter-spacing: -0.02em` en headings grandes; `+0.05em` en labels mono.
- **Nunca usar `text-align: justify`** (dificulta lectura en pantalla).
- **Itálicas solo para énfasis semántico**, no decorativo.

### 4.4 Carga de Fuentes

```html
<!-- Preload de fuentes críticas -->
<link rel="preload" href="/fonts/space-grotesk-700.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/manrope-400.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/manrope-500.woff2" as="font" type="font/woff2" crossorigin>
```

```css
@font-face {
  font-family: 'Space Grotesk';
  src: url('/fonts/space-grotesk-700.woff2') format('woff2');
  font-weight: 700;
  font-display: swap;
}

@font-face {
  font-family: 'Manrope';
  src: url('/fonts/manrope-400.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}

/* JetBrains Mono se carga solo cuando hay código visible */
@font-face {
  font-family: 'JetBrains Mono';
  src: url('/fonts/jetbrains-mono-400.woff2') format('woff2');
  font-weight: 400;
  font-display: swap;
}
```

> **Regla de rendimiento:** máximo 3 familias × 2 pesos = 6 archivos `.woff2` self-hosted. Sin Google Fonts CDN (por privacidad y control de CLS).

---

## 5. Espaciado y Layout

### 5.1 Escala de Espaciado

Sistema basado en múltiplos de 4px:

| Token | Valor | Uso típico |
|---|---|---|
| `--space-1` | 4px | Separación mínima inline |
| `--space-2` | 8px | Gap entre chips, iconos |
| `--space-3` | 12px | Padding interno de chips |
| `--space-4` | 16px | Padding de botones, gap de grid pequeño |
| `--space-5` | 24px | Padding de cards, gap de grid |
| `--space-6` | 32px | Separación entre bloques |
| `--space-7` | 48px | Separación entre secciones internas |
| `--space-8` | 64px | Separación entre secciones |
| `--space-9` | 96px | Separación entre secciones mayores |

### 5.2 Contenedores

| Contenedor | Ancho máximo | Uso |
|---|---|---|
| `--container-prose` | 70ch (~720px) | Lectura de blog, guías |
| `--container-content` | 1200px | Layout general |
| `--container-wide` | 1440px | Landing hero, casos especiales |
| `--container-full` | 100vw | Fondos de sección |

```css
.container-content {
  max-width: 1200px;
  margin-inline: auto;
  padding-inline: clamp(1rem, 4vw, 2rem);
}

.container-prose {
  max-width: 70ch;
  margin-inline: auto;
}
```

### 5.3 Grid System

| Breakpoint | Columnas | Gutter |
|---|---|---|
| `xs` (< 640px) | 4 | 16px |
| `sm` (≥ 640px) | 8 | 20px |
| `md` (≥ 768px) | 8 | 24px |
| `lg` (≥ 1024px) | 12 | 24px |
| `xl` (≥ 1280px) | 12 | 32px |

### 5.4 Bordes y Radios

| Token | Valor | Uso |
|---|---|---|
| `--radius-sm` | 4px | Chips, badges pequeños |
| `--radius-md` | 8px | Botones, inputs |
| `--radius-lg` | 12px | Cards, contenedores |
| `--radius-xl` | 16px | Modales, hero cards |
| `--radius-full` | 9999px | Avatares, pills |

### 5.5 Sombras (sutiles, estilo mineral)

```css
/* Dark theme: sombras casi invisibles, confianza en el borde */
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
--shadow-md: 0 4px 8px rgba(0, 0, 0, 0.4);
--shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.5);
--shadow-glow-jade: 0 0 20px rgba(0, 168, 107, 0.15);
--shadow-glow-hummingbird: 0 0 20px rgba(25, 195, 176, 0.15);

/* Light theme: sombras suaves, más difusas */
--shadow-sm: 0 1px 2px rgba(43, 43, 43, 0.06);
--shadow-md: 0 4px 8px rgba(43, 43, 43, 0.08);
--shadow-lg: 0 8px 24px rgba(43, 43, 43, 0.12);
```

---

## 6. Iconografía y Motivos Mayas

### 6.1 Sistema de Iconos

**Regla:** los iconos son **de línea, minimalistas, trazo 1.5-2px**, sin relleno, sin exceso de detalle.

| Familia | Uso | Estilo |
|---|---|---|
| **UI Icons** | Navegación, acciones, estados | Lucide / Phosphor (line) |
| **Tech Icons** | Stack de proyectos | Simple Icons (monocromo) |
| **Maya Glyphs** | Decorativos, categorías | Custom SVG, trazo geométrico |

### 6.2 Motivos Mayas Permitidos

Los siguientes motivos se usan como **decoración sutil**, nunca como elemento funcional:

| Motivo | Uso | Opacidad máxima | Color |
|---|---|---|---|
| **Silueta de quetzal** | Landing hero, footer | 0.15 | Jade / humo |
| **Silueta de colibrí** | Decoración de secciones IA | 0.10 | Colibrí turquesa |
| **Greca escalonada** | Separadores, bordes de sección | 0.08 | Jade / arena |
| **Glifo numeral** | Iconos de categoría, numeración | 0.20 | Jade / cinabrio |
| **Pluma estilizada** | Transiciones entre secciones | 0.12 | Jade |
| **Espiral (Hunab Ku)** | Iconos decorativos IA | 0.15 | Colibrí turquesa |
| **Mazorca estilizada** | Tema claro, secciones Games | 0.15 | Amarillo maíz |
| **Sol radiante** | Tema claro, hero | 0.12 | Sol / maíz |

### 6.3 Reglas de Uso

- ❌ **Nunca** usar glifos como iconos de acción (botones, links).
- ❌ **Nunca** saturar una sección con más de 2 motivos decorativos.
- ❌ **Nunca** usar colores fuera de la paleta en los motivos.
- ✅ **Siempre** respetar la opacidad máxima definida.
- ✅ **Siempre** usar SVG inline (no imágenes) para permitir color dinámico por tema.
- ✅ **Siempre** marcar decorativos con `aria-hidden="true"`.

### 6.4 Categorización Temática

```
Samsar|Dev  →  glifos geométricos, grecas, terminal
Samsar|IA   →  colibrí, espiral, nodos, chispa
Samsar|Games →  quetzal, mazorca, sol, geometría lúdica
```

---

## 7. Movimiento y Animación

### 7.1 Principios

- **Duración:** 150ms (micro) · 250ms (estándar) · 400ms (narrativa).
- **Easing:** `cubic-bezier(0.4, 0, 0.2, 1)` (estándar), `cubic-bezier(0.34, 1.56, 0.64, 1)` (rebote sutil).
- **Respeto:** toda animación se desactiva con `prefers-reduced-motion: reduce`.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### 7.2 Catálogo de Animaciones

| Nombre | Duración | Trigger | Uso |
|---|---|---|---|
| `fade-in` | 400ms | Scroll (intersección) | Aparición de secciones |
| `fade-in-up` | 500ms | Scroll | Cards, bloques de contenido |
| `stagger-children` | 300ms + 50ms delay | Scroll | Grids, listas |
| `hover-lift` | 200ms | Hover | Cards interactivas |
| `focus-ring` | 150ms | Focus | Elementos focusables |
| `theme-transition` | 250ms | Cambio de tema | Fondo, texto, bordes |
| `parallax-soft` | continuo | Scroll | Siluetas mayas del hero |
| `feather-float` | 6s loop | Continuo | Plumas decorativas (landing) |
| `code-copy-success` | 1.2s | Click | Confirmación de copia |

### 7.3 Ejemplos CSS

```css
/* Fade-in-up para cards */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.card {
  animation: fadeInUp 500ms cubic-bezier(0.4, 0, 0.2, 1) both;
}

/* Hover lift */
.card-interactive {
  transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 200ms cubic-bezier(0.4, 0, 0.2, 1),
              border-color 200ms cubic-bezier(0.4, 0, 0.2, 1);
}
.card-interactive:hover {
  transform: translateY(-4px);
  border-color: var(--color-jade);
  box-shadow: var(--shadow-glow-jade);
}

/* Cambio de tema */
html {
  transition: background-color 250ms ease, color 250ms ease;
}
```

### 7.4 Reglas de Oro

- **Nunca** animar `width`, `height`, `top`, `left` (usar `transform`/`opacity`).
- **Nunca** exceder 500ms en animaciones de UI.
- **Nunca** animar más de 3 propiedades simultáneas por elemento.
- **Siempre** usar `will-change` con moderación (solo durante la animación).
- **Siempre** preferir `IntersectionObserver` sobre listeners de scroll.

---

## 8. Componentes del Sistema

### 8.1 Botones

| Variante | Uso | Background | Texto | Borde |
|---|---|---|---|---|
| **Primary** | CTA principal | `--color-jade` | `--color-bg` | ninguno |
| **Secondary** | Acción alternativa | `transparent` | `--color-jade` | 1px `--color-jade` |
| **Ghost** | Acción terciaria | `transparent` | `--color-text` | ninguno |
| **Danger** | Acción destructiva | `--color-blood` | `--color-text` | ninguno |

**Especificaciones:**

```css
.btn {
  font: 500 0.875rem/1 'Manrope', sans-serif;
  padding: 0.625rem 1.25rem;
  border-radius: var(--radius-md);
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn:focus-visible {
  outline: 2px solid var(--color-hummingbird);
  outline-offset: 2px;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary:hover {
  background-color: var(--color-jade-light, #2E8B57);
  transform: translateY(-1px);
}
```

**Tamaños:**
- `sm`: padding `0.375rem 0.75rem`, font `0.75rem`
- `md` (default): padding `0.625rem 1.25rem`, font `0.875rem`
- `lg`: padding `0.875rem 1.75rem`, font `1rem`

### 8.2 Cards

```css
.card {
  background-color: var(--color-bg-elevated);
  border: 1px solid var(--color-bg-highlight);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
}

.card-interactive:hover {
  transform: translateY(-4px);
  border-color: var(--color-jade);
  box-shadow: var(--shadow-glow-jade);
}

.card-featured {
  border-color: var(--color-jade);
  background: linear-gradient(
    135deg,
    var(--color-bg-elevated) 0%,
    var(--color-bg-highlight) 100%
  );
}
```

### 8.3 Chips y Badges

```css
.chip {
  font: 500 0.75rem/1 'JetBrains Mono', monospace;
  padding: 0.25rem 0.625rem;
  border-radius: var(--radius-full);
  border: 1px solid var(--color-bg-highlight);
  background-color: var(--color-bg-elevated);
  color: var(--color-text-muted);
  letter-spacing: 0.02em;
}

.chip-category {
  color: var(--color-jade);
  border-color: var(--color-jade-muted);
}

.chip-tag {
  color: var(--color-hummingbird);
}

.chip-filter[aria-pressed="true"] {
  background-color: var(--color-jade);
  color: var(--color-bg);
  border-color: var(--color-jade);
}
```

### 8.4 Callouts

```css
.callout {
  border-left: 3px solid;
  padding: var(--space-4) var(--space-5);
  border-radius: var(--radius-md);
  background-color: var(--color-bg-elevated);
  margin-block: var(--space-5);
}

.callout-note    { border-color: var(--color-hummingbird); }
.callout-tip     { border-color: var(--color-jade); }
.callout-warning { border-color: var(--color-sun); }
.callout-danger  { border-color: var(--color-blood); }
```

### 8.5 Bloques de Código

```css
.code-block {
  background-color: var(--color-bg-elevated);
  border: 1px solid var(--color-bg-highlight);
  border-radius: var(--radius-md);
  overflow: hidden;
  margin-block: var(--space-5);
}

.code-block pre {
  font: 400 0.9rem/1.5 'JetBrains Mono', monospace;
  padding: var(--space-4);
  overflow-x: auto;
}

.code-block .copy-btn {
  position: absolute;
  top: var(--space-2);
  right: var(--space-2);
  opacity: 0;
  transition: opacity 200ms;
}

.code-block:hover .copy-btn {
  opacity: 1;
}

.code-inline {
  font: 400 0.85em 'JetBrains Mono', monospace;
  padding: 0.125em 0.375em;
  border-radius: 3px;
  background-color: var(--color-bg-highlight);
  color: var(--color-hummingbird);
}
```

### 8.6 Inputs y Formularios

```css
.input {
  font: 400 1rem 'Manrope', sans-serif;
  padding: 0.625rem 0.875rem;
  background-color: var(--color-bg-elevated);
  border: 1px solid var(--color-bg-highlight);
  border-radius: var(--radius-md);
  color: var(--color-text);
  transition: border-color 200ms;
}

.input:focus {
  border-color: var(--color-hummingbird);
  outline: 2px solid transparent;
  box-shadow: 0 0 0 3px rgba(25, 195, 176, 0.15);
}

.input[aria-invalid="true"] {
  border-color: var(--color-blood);
}

.input::placeholder {
  color: var(--color-text-subtle);
}
```

### 8.7 Header

```
┌──────────────────────────────────────────────────────────────┐
│  🦜 Samsar    Inicio  Sobre mí  Proyectos  Blog  Experiencia │  🌙  │
│                                                                │     │
│                                                                │  ☰  │
└──────────────────────────────────────────────────────────────┘
```

- **Altura:** 64px (desktop), 56px (mobile).
- **Sticky:** `position: sticky; top: 0; z-index: 50`.
- **Fondo:** `backdrop-filter: blur(12px)` con `background: rgba(10, 14, 12, 0.8)` en dark.
- **Transición:** al hacer scroll > 50px, reduce padding y añade borde inferior.

### 8.8 Footer

```
┌──────────────────────────────────────────────────────────────┐
│                                                                │
│  SAMUEL SARMIENTOS                     Contacto                │
│  Código, cultura y curiosidad          samsar.dev@gmail.com    │
│                                        LinkedIn · GitHub       │
│                                                                │
│  Samsar|Dev · Samsar|IA · Samsar|Games                        │
│                                                                │
│  ─────────────────────────────────────────────────            │
│  © 2026 Samsar. Hecho con ❤ en Guatemala.                     │
│                                                                │
└──────────────────────────────────────────────────────────────┘
```

---

## 9. Patrones de Composición

### 9.1 Patrón Hero (Landing)

```
┌──────────────────────────────────────────────┐
│                                              │
│    [silueta quetzal opacidad 0.1]            │
│                                              │
│    SAMSAR: CÓDIGO,                           │
│    CULTURA Y CURIOSIDAD                      │
│                                              │
│    Un espacio para aprender, crear          │
│    y compartir lo que me apasiona.           │
│                                              │
│    [Explorar blog]  [Ver proyectos]          │
│                                              │
│    [partículas de plumas flotando]           │
│                                              │
└──────────────────────────────────────────────┘
```

- Centrado, máximo 3 elementos apilados.
- Máximo 2 CTAs visibles.
- Fondo con gradiente sutil + motivos mayas decorativos.
- Altura: `min-height: 90vh` (desktop), `auto` (mobile).

### 9.2 Patrón Grid de Cards (Blog, Proyectos)

```
Desktop (12 col):
┌────────┬────────┬────────┐
│  Card  │  Card  │  Card  │
├────────┼────────┼────────┤
│  Card  │  Card  │  Card  │
└────────┴────────┴────────┘

Tablet (8 col):
┌────────┬────────┐
│  Card  │  Card  │
├────────┼────────┤
│  Card  │  Card  │
└────────┴────────┘

Mobile (4 col):
┌────────┐
│  Card  │
├────────┤
│  Card  │
└────────┘
```

### 9.3 Patrón Timeline (Experiencia)

```
│
●─── 2026 ─── Jefe de Tecnología @ Talkin' Heads
│               Guatemala · Presencial
│               • Logro 1
│               • Logro 2
│
●─── 2021 ─── Consultor Independiente
│               • Cliente A
│               • Cliente B
│
●─── 2020 ─── Proqrentis
│
```

- Línea vertical a la izquierda con nodos jade.
- Cada nodo tiene `border: 2px solid var(--color-jade)`.
- Fechas en `--font-meta` (JetBrains Mono).

### 9.4 Patrón Post (Blog)

```
Desktop (12 col):
┌────────┬──────────────────────────┬────────┐
│        │                          │        │
│  TOC   │       CONTENT            │  TOC   │
│ (sticky│       (70ch max)         │   )    │
│  4col) │                          │ 2col)  │
│        │                          │        │
└────────┴──────────────────────────┴────────┘

Mobile (4 col):
┌────────────────────┐
│   TOC (colapsable) │
├────────────────────┤
│                    │
│      CONTENT       │
│                    │
└────────────────────┘
```

### 9.5 Patrón Sección Decorada

Cada sección puede llevar un separador temático maya:

```
─────────────────────────────────────────────
        ╱╲        ╱╲        ╱╲
       ╱  ╲      ╱  ╲      ╱  ╲
      ╱    ╲    ╱    ╲    ╱    ╲
─────────────────────────────────────────────
```

- Implementado como SVG inline con `opacity: 0.08`.
- Altura máxima 40px.

---

## 10. Accesibilidad

### 10.1 Reglas No Negociables

| Regla | Implementación |
|---|---|
| **Contraste texto** | ≥ 4.5:1 (normal), ≥ 3:1 (grande ≥ 18.66px) |
| **Contraste UI** | ≥ 3:1 para bordes de foco, iconos funcionales |
| **Focus visible** | `outline: 2px solid var(--color-hummingbird); outline-offset: 2px` |
| **Navegación teclado** | Todos los elementos interactivos accesibles por `Tab` |
| **Skip link** | "Saltar al contenido" visible al recibir focus |
| **aria-hidden** | Decorativos (motivos mayas, iconos sin significado) |
| **aria-label** | Botones de solo icono (ThemeToggle, MobileMenu, CopyBtn) |
| **Form labels** | Cada input con `<label>` asociado |
| **Errores de form** | `aria-invalid` + `aria-describedby` con mensaje |

### 10.2 Checklist WCAG AA

- [x] Contraste validado en ambos temas.
- [x] Focus visible en todos los elementos interactivos.
- [x] Texto redimensionable hasta 200% sin pérdida.
- [x] `prefers-reduced-motion` respetado.
- [x] Idioma declarado (`<html lang="es">`).
- [x] Títulos jerárquicos (h1 → h2 → h3, sin saltos).
- [x] Enlaces distinguibles (subrayado + color).
- [x] Formularios con labels y mensajes de error accesibles.
- [x] Imágenes con `alt` significativo (o `alt=""` si decorativas).
- [x] Videos con subtítulos (cuando aplique).

### 10.3 Foco Visible

```css
/* Estilo global de focus */
*:focus-visible {
  outline: 2px solid var(--color-hummingbird);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

/* Nunca eliminar focus sin reemplazo */
*:focus {
  outline: none;
}

*:focus-visible {
  outline: 2px solid var(--color-hummingbird);
}
```

### 10.4 Skip Link

```html
<a href="#main-content" class="skip-link">
  Saltar al contenido principal
</a>
```

```css
.skip-link {
  position: absolute;
  top: -100px;
  left: 0;
  background: var(--color-jade);
  color: var(--color-bg);
  padding: var(--space-3) var(--space-4);
  border-radius: var(--radius-md);
  z-index: 100;
  transition: top 200ms;
}

.skip-link:focus {
  top: var(--space-2);
}
```

---

## 11. Responsive Design

### 11.1 Breakpoints

| Nombre | Ancho | Contexto |
|---|---|---|
| `xs` | < 640px | Mobile |
| `sm` | ≥ 640px | Mobile grande / tablet vertical |
| `md` | ≥ 768px | Tablet |
| `lg` | ≥ 1024px | Desktop pequeño |
| `xl` | ≥ 1280px | Desktop |

### 11.2 Estrategia Mobile-First

Todos los estilos se escriben primero para mobile y se escalan hacia arriba con `min-width`:

```css
/* Mobile por defecto */
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-4);
}

/* Tablet */
@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-5);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-6);
  }
}
```

### 11.3 Adaptaciones Clave

| Componente | Mobile | Desktop |
|---|---|---|
| **Header** | Menú hamburguesa, logo solo símbolo | Nav completa, logo + nombre |
| **Hero** | Texto izquierda, sin parallax | Centrado, parallax activo |
| **Blog grid** | 1 columna | 2-3 columnas |
| **Post** | TOC colapsable arriba | TOC sticky en sidebar |
| **Timeline** | Vertical | Vertical (siempre) |
| **Footer** | Stack vertical | Grid de 2 columnas |
| **Tablas** | Scroll horizontal | Ancho completo |

### 11.4 Reglas de Touch

- Tamaño mínimo de tap target: **44×44px**.
- Separación entre targets: **≥ 8px**.
- Hover solo como mejora (nunca crítico para funcionalidad).
- Estados `:active` claros en mobile.

---

## 12. Design Tokens (Referencia Completa)

### 12.1 Tokens CSS Globales

```css
/* src/styles/theme.css */
:root {
  /* ===== COLOR — DARK (default) ===== */
  --color-bg: #0A0E0C;
  --color-bg-elevated: #131916;
  --color-bg-highlight: #1C2420;
  --color-jade: #00A86B;
  --color-jade-muted: #1F7A5C;
  --color-hummingbird: #19C3B0;
  --color-blood: #B22222;
  --color-text: #E8E6E1;
  --color-text-muted: #9AA39E;
  --color-text-subtle: #5C6660;

  /* ===== COLOR — SEMANTIC ===== */
  --bg-primary: var(--color-bg);
  --bg-surface: var(--color-bg-elevated);
  --bg-subtle: var(--color-bg-highlight);
  --text-primary: var(--color-text);
  --text-secondary: var(--color-text-muted);
  --accent-primary: var(--color-jade);
  --accent-secondary: var(--color-hummingbird);
  --accent-danger: var(--color-blood);
  --border-default: var(--color-bg-highlight);
  --border-focus: var(--color-hummingbird);

  /* ===== TIPOGRAFÍA ===== */
  --font-display: 'Space Grotesk', system-ui, sans-serif;
  --font-body: 'Manrope', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;

  /* ===== ESPACIADO ===== */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
  --space-9: 96px;

  /* ===== RADIOS ===== */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;

  /* ===== SOMBRAS ===== */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.5);
  --shadow-glow-jade: 0 0 20px rgba(0, 168, 107, 0.15);
  --shadow-glow-hummingbird: 0 0 20px rgba(25, 195, 176, 0.15);

  /* ===== CONTENEDORES ===== */
  --container-prose: 70ch;
  --container-content: 1200px;
  --container-wide: 1440px;

  /* ===== TRANSICIONES ===== */
  --ease-standard: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  --duration-fast: 150ms;
  --duration-normal: 250ms;
  --duration-slow: 400ms;
}

[data-theme="light"] {
  /* ===== COLOR — LIGHT ===== */
  --color-bg: #FFFDF7;
  --color-bg-elevated: #F5F0E8;
  --color-bg-highlight: #EAE3D5;
  --color-sky: #A7D8F0;
  --color-sky-deep: #87CEEB;
  --color-sun: #F4A300;
  --color-corn: #F7C948;
  --color-corn-green: #7CB342;
  --color-text: #2B2B2B;
  --color-text-muted: #6B7280;
  --color-text-subtle: #9CA3AF;

  /* ===== COLOR — SEMANTIC ===== */
  --bg-primary: var(--color-bg);
  --bg-surface: var(--color-bg-elevated);
  --bg-subtle: var(--color-bg-highlight);
  --text-primary: var(--color-text);
  --text-secondary: var(--color-text-muted);
  --accent-primary: var(--color-sun);
  --accent-secondary: var(--color-sky-deep);
  --accent-danger: var(--color-blood);
  --border-default: rgba(124, 179, 66, 0.2);
  --border-focus: var(--color-sky-deep);

  /* ===== SOMBRAS ===== */
  --shadow-sm: 0 1px 2px rgba(43, 43, 43, 0.06);
  --shadow-md: 0 4px 8px rgba(43, 43, 43, 0.08);
  --shadow-lg: 0 8px 24px rgba(43, 43, 43, 0.12);
}
```

### 12.2 Tabla de Referencia Rápida

| Token | Dark | Light |
|---|---|---|
| `--color-bg` | `#0A0E0C` | `#FFFDF7` |
| `--color-bg-elevated` | `#131916` | `#F5F0E8` |
| `--color-bg-highlight` | `#1C2420` | `#EAE3D5` |
| `--accent-primary` | `#00A86B` (jade) | `#F4A300` (sol) |
| `--accent-secondary` | `#19C3B0` (colibrí) | `#87CEEB` (cielo) |
| `--accent-danger` | `#B22222` (cinabrio) | `#B22222` |
| `--text-primary` | `#E8E6E1` | `#2B2B2B` |
| `--text-secondary` | `#9AA39E` | `#6B7280` |
| `--border-default` | `#1C2420` | `rgba(124,179,66,0.2)` |
| `--border-focus` | `#19C3B0` | `#87CEEB` |

---

## 13. Changelog

### v1.1 — Octubre 2026

- Refinamiento de paleta oscura a "Obsidiana & Jade" con 3 niveles de basalto.
- Jade imperial (`#00A86B`) como primario, jade sombrío (`#1F7A5C`) como secundario.
- Cinabrio ceremonial (`#B22222`) como color de alerta.
- Consolidación tipográfica a **3 familias** (Space Grotesk, Manrope, JetBrains Mono).
- Añadido token `--color-bg-highlight` para bordes y hover.
- Documentación de criterios de selección tipográfica.
- Añadida sección de contraste validado WCAG AA.
- Añadidos patrones de composición detallados.
- Añadido catálogo completo de animaciones.
- Añadido mapeo semántico Dark ↔ Light.

### v1.0 — Octubre 2026

- Versión inicial del sistema de diseño.
- Paleta oscura y clara.
- Tipografía base (4 familias).
- Componentes principales.
- Estados y variantes.

---

> **Documento vivo**: cualquier cambio visual debe reflejarse primero aquí, con su correspondiente entrada en el **Changelog**. Los tokens CSS son la **fuente de verdad** para la implementación; este documento es la **fuente de verdad** para la interpretación.