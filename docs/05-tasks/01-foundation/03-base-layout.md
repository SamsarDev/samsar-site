# Tarea 03: Creación de BaseLayout.astro y Prevención de FOUC

- **Fase:** 01 — Fundación y Core UI
- **Estimación:** 20 minutos
- **Documentos de referencia:** [`docs/02-architecture/03-islands.md`](../../02-architecture/03-islands.md) · [`docs/03-design/04-patterns.md`](../../03-design/04-patterns.md) · [`docs/04-process/05-troubleshooting.md`](../../04-process/05-troubleshooting.md)

---

## 1. Objetivo Pedagógico

Aprender a construir un **Layout Maestro (`BaseLayout.astro`)** reutilizable en Astro, integrando metadatos esenciales de SEO y accesibilidad, y aplicando la solución arquitectónica para **eliminar el parpadeo de tema (FOUC)** mediante un micro-script sincrónico en `<head>`.

---

## 2. Criterios de Aceptación (DoD)

- [ ] Existe `src/layouts/BaseLayout.astro` con interfaz `Props` tipada en TypeScript (`title`, `description`, `ogImage`).
- [ ] El `<head>` contiene el script `is:inline` anti-FOUC que evalúa `localStorage` y `prefers-color-scheme` antes del renderizado de CSS.
- [ ] Las fuentes locales críticas (Space Grotesk y Manrope) cuentan con directivas `<link rel="preload">`.
- [ ] El layout incluye la etiqueta `<!DOCTYPE html>`, `<html lang="es">` y estructura semántica con `<slot />`.
- [ ] `src/pages/index.astro` se refactoriza para utilizar `BaseLayout`.
- [ ] Al recargar la página en el navegador, no se produce ningún destello o cambio brusco de color (cero FOUC).

---

## 3. Paso a Paso Guiado

### Paso 1: Crear `src/layouts/BaseLayout.astro`
```astro
---
import '../styles/global.css';

interface Props {
  title?: string;
  description?: string;
  ogImage?: string;
}

const {
  title = "Samsar | Código, cultura y curiosidad",
  description = "Sitio web personal, cuaderno de campo y portafolio de Samuel Sarmientos.",
  ogImage = "/og-image.png",
} = Astro.props;

const canonicalURL = new URL(Astro.url.pathname, Astro.site || 'https://samsar-site.pages.dev/');
---

<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="canonical" href={canonicalURL} />

    <!-- SEO Básico -->
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={new URL(ogImage, canonicalURL)} />

    <!-- Preload de Fuentes Críticas -->
    <link rel="preload" href="/fonts/space-grotesk/space-grotesk-700.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="preload" href="/fonts/manrope/manrope-400.woff2" as="font" type="font/woff2" crossorigin />

    <!-- Script Sincrónico Anti-FOUC -->
    <script is:inline>
      (function () {
        const storedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = storedTheme || (systemPrefersDark ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', theme);
      })();
    </script>
  </head>
  <body class="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased transition-colors duration-200">
    <div class="flex min-h-screen flex-col">
      <!-- Slot de Header (se integrará en la tarea 05) -->
      <slot name="header" />

      <!-- Contenido Principal -->
      <main class="flex-1">
        <slot />
      </main>

      <!-- Slot de Footer (se integrará en la tarea 05) -->
      <slot name="footer" />
    </div>
  </body>
</html>
```

### Paso 2: Refactorizar `src/pages/index.astro` para usar `BaseLayout`
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Inicio | Samsar">
  <div class="mx-auto max-w-4xl px-4 py-16 text-center">
    <h1 class="text-4xl font-bold font-['Space_Grotesk'] text-[var(--text-primary)]">
      Samsar | Código, cultura y curiosidad
    </h1>
    <p class="mt-4 text-lg text-[var(--text-secondary)] font-['Manrope']">
      BaseLayout y prevención de FOUC configurados correctamente.
    </p>
  </div>
</BaseLayout>
```

---

## 4. Comprobación y Verificación

1. Ejecuta `bun run dev` y abre `http://localhost:4321`.
2. Abre las herramientas de desarrollo del navegador (DevTools) y en la consola ejecuta:
   ```javascript
   localStorage.setItem('theme', 'light');
   ```
3. Recarga la página repetidas veces (F5 / Ctrl+R).
4. **Verificación visual:** El fondo debe cargarse en color claro desde el milisegundo 0, sin mostrar ningún destello en fondo negro antes de aplicar el estilo.

---

## 5. Pistas Didácticas y Errores Comunes

> 💡 **¿Por qué `is:inline`?** En Astro, los scripts dentro de componentes se procesan y optimizan por defecto, lo que a menudo difiere su ejecución. La directiva `is:inline` le indica a Astro que **no toque el script** y lo deje tal cual en el HTML final, asegurando que se ejecute de forma bloqueante antes del renderizado visual de la página.
