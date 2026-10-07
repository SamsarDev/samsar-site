# 04-performance: Presupuesto y Estrategia de Rendimiento

Presupuestos cuantitativos de velocidad, optimización de activos y cumplimiento de Core Web Vitals para **Samsar | Sitio web personal**.

---

## 1. Presupuesto Cuantitativo de Rendimiento

El sitio debe cumplir con los siguientes umbrales medidos en condiciones de red 4G estándar y dispositivos móviles de gama media:

| Métrica | Objetivo | Estrategia de Cumplimiento |
|---|---|---|
| **LCP** (Largest Contentful Paint) | `< 1.5 s` | HTML estático servido desde Edge (Cloudflare Anycast) + preload de fuentes críticas en `<head>`. |
| **INP / FID** (Interactividad) | `< 100 ms` | Cero JS bloqueante; islas Vue diferidas a `client:idle`. |
| **CLS** (Cumulative Layout Shift) | `< 0.05` | Dimensiones explícitas (`width` y `height`) en todas las imágenes e ilustraciones SVG. |
| **JavaScript Inicial (MVP)** | `< 15 KB` | Solo el runtime mínimo de Vue para `ThemeToggle` y `MobileMenu`. |
| **CSS Purgado Total** | `< 15 KB` | Motor de Tailwind CSS v4 con purga automática en tiempo de compilación. |
| **Carga Total de Fuentes** | `< 100 KB` | 3 familias en formato `.woff2` autoalojadas, subconjunto latino y `font-display: swap`. |
| **Puntuación Lighthouse** | `> 95` | Requisito obligatorio en las 4 categorías (Performance, Accessibility, Best Practices, SEO). |

---

## 2. Optimización de Activos

### 2.1 Tipografía Autoalojada
- **Prohibido Google Fonts CDN:** Evita conexiones DNS externas y peticiones adicionales que degradan el LCP.
- **Formato WOFF2:** Las fuentes residen en `public/fonts/` y se precargan en `<head>`:
  ```html
  <link rel="preload" href="/fonts/space-grotesk/space-grotesk-v16-latin-700.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="preload" href="/fonts/manrope/manrope-v15-latin-regular.woff2" as="font" type="font/woff2" crossorigin />
  ```
- **Declaración:** Usar `font-display: swap` en `@font-face` para asegurar que el texto sea legible de inmediato mientras descarga el archivo de fuente.

### 2.2 Tratamiento de Imágenes
- Utilizar exclusivamente el componente nativo de Astro:
  ```astro
  ---
  import { Image } from 'astro:assets';
  import coverImg from '../assets/post-cover.png';
  ---
  <Image src={coverImg} alt="Descripción detallada" width={720} height={400} format="webp" />
  ```
- Astro convierte automáticamente a formatos modernos (**WebP** o **AVIF**), calcula `srcset` responsive y previene variaciones de diseño (cero CLS).

### 2.3 SVGs y Motivos Mayas
- Todos los elementos decorativos mayas (`src/components/maya/*.astro`) deben ser SVG vectoriales inline con `aria-hidden="true"`.
- No utilizar librerías de animación complejas (como GSAP o Three.js). Toda animación de plumas o partículas se resuelve con transiciones CSS aceleradas por GPU (`transform`, `opacity`) que no superen los 400 ms.
- Todo efecto visual debe respetar la consulta de medios:
  ```css
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
  ```
