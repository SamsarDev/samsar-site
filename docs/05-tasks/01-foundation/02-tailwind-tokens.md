# Tarea 02: Configuración de Tailwind CSS v4, Tokens Semánticos y Tipografía Local

- **Fase:** 01 — Fundación y Core UI
- **Estimación:** 25 minutos
- **Documentos de referencia:** [`DESIGN.md`](../../../DESIGN.md) · [`docs/03-design/01-tokens.md`](../../03-design/01-tokens.md) · [`docs/03-design/02-typography.md`](../../03-design/02-typography.md) · [`ADR-0003`](../../07-decisions/0003-three-font-families.md)

---

## 1. Objetivo Pedagógico

Aprender la nueva arquitectura **CSS-first de Tailwind CSS v4** (eliminando dependencias obsoletas como `@astrojs/tailwind` y archivos `tailwind.config.js`), implementando los tokens de diseño semánticos en `src/styles/theme.css` y configurando el autoalojamiento de las tres familias tipográficas en formato `.woff2` sin depender de Google Fonts CDN.

---

## 2. Criterios de Aceptación (DoD)

- [ ] Tailwind CSS v4 instalado e integrado en Vite (`@tailwindcss/vite`).
- [ ] No existe ningún archivo `tailwind.config.js` ni `tailwind.config.mjs` en la raíz.
- [ ] `src/styles/theme.css` define los tokens primitivos y semánticos para `data-theme="dark"` y `data-theme="light"`.
- [ ] `src/styles/global.css` importa Tailwind, importa `theme.css` y define las reglas de `@font-face` locales y `prefers-reduced-motion`.
- [ ] Las fuentes Space Grotesk, Manrope y JetBrains Mono están alojadas en `public/fonts/` en formato `.woff2`.
- [ ] Las clases de utilidad de Tailwind (ej. `bg-surface`, `text-primary`) se compilan correctamente en `bun run build`.

---

## 3. Paso a Paso Guiado

### Paso 1: Instalar dependencias de Tailwind v4
```bash
bun add tailwindcss @tailwindcss/vite
```

### Paso 2: Configurar Vite en `astro.config.mjs`
En Tailwind v4, la integración con Astro se realiza directamente a través del plugin oficial de Vite:

```javascript
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  output: 'static',
  integrations: [vue()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

### Paso 3: Crear el archivo de tokens (`src/styles/theme.css`)
Crea `src/styles/theme.css` con las variables semánticas validadas:

```css
:root,
[data-theme='dark'] {
  --color-bg: #0A0E0C;
  --color-bg-elevated: #131916;
  --color-bg-highlight: #1C2420;
  --color-jade: #00A86B;
  --color-jade-light: #1FBF84;
  --color-jade-muted: #1F7A5C;
  --color-hummingbird: #19C3B0;
  --color-blood: #B22222;
  --color-blood-text: #EF6B63;
  --color-text: #E8E6E1;
  --color-text-muted: #9AA39E;

  /* Semánticos */
  --bg-primary: var(--color-bg);
  --bg-surface: var(--color-bg-elevated);
  --bg-subtle: var(--color-bg-highlight);
  --text-primary: var(--color-text);
  --text-secondary: var(--color-text-muted);
  --accent-primary: var(--color-jade);
  --accent-primary-hover: var(--color-jade-light);
  --text-on-accent: var(--color-bg);
  --border-base: rgba(154, 163, 158, 0.12);
  --border-focus: var(--color-hummingbird);
}

[data-theme='light'] {
  --color-bg: #FFFDF7;
  --color-bg-elevated: #F5F0E8;
  --color-bg-highlight: #EAE3D5;
  --color-sun: #F4A300;
  --color-sun-light: #FFB41F;
  --color-link: #0369A1;
  --color-text: #2B2B2B;
  --color-text-muted: #5B6370;

  /* Semánticos */
  --bg-primary: var(--color-bg);
  --bg-surface: var(--color-bg-elevated);
  --bg-subtle: var(--color-bg-highlight);
  --text-primary: var(--color-text);
  --text-secondary: var(--color-text-muted);
  --accent-primary: var(--color-sun);
  --accent-primary-hover: var(--color-sun-light);
  --text-on-accent: var(--color-text);
  --border-base: rgba(91, 99, 112, 0.15);
  --border-focus: var(--color-link);
}
```

### Paso 4: Crear `src/styles/global.css`
```css
@import "tailwindcss";
@import "./theme.css";

/* Declaraciones @font-face locales con font-display: swap */
@font-face {
  font-family: 'Space Grotesk';
  src: url('/fonts/space-grotesk/space-grotesk-700.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Manrope';
  src: url('/fonts/manrope/manrope-400.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

/* Regla obligatoria de movimiento reducido */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

### Paso 5: Descargar fuentes locales en `public/fonts/`
Descarga los archivos `.woff2` correspondientes y ubícalos organizados en:
- `public/fonts/space-grotesk/`
- `public/fonts/manrope/`
- `public/fonts/jetbrains-mono/`

---

## 4. Comprobación y Verificación

1. Actualiza `src/pages/index.astro` para importar `../styles/global.css` y aplicar una clase de prueba (ej. `class="bg-[var(--bg-primary)] text-[var(--text-primary)]"`).
2. Ejecuta `bun run build`. La compilación debe resolver los estilos CSS sin errores.

---

## 5. Pistas Didácticas y Errores Comunes

> ⚠️ **Error frecuente con Tailwind v3:** Si ves un tutorial que te pide instalar `@astrojs/tailwind` o crear `tailwind.config.js`, ¡detente! Esa era la forma de Tailwind v3. En Tailwind v4 todo se gestiona en CSS con `@import "tailwindcss";` y el plugin de Vite.
