# 04-performance: Presupuesto y Estrategia de Rendimiento

Presupuestos cuantitativos de velocidad, optimización de activos y cumplimiento de Core Web Vitals para **Samsar | Sitio web personal**.

---

## 1. Presupuesto Cuantitativo de Rendimiento

El sitio debe cumplir con los siguientes umbrales medidos en condiciones de red 4G estándar y dispositivos móviles de gama media:

| Métrica | Objetivo | Estrategia de Cumplimiento |
|---|---|---|
| **LCP** (Largest Contentful Paint) | `< 1.5 s` | HTML estático servido desde Edge (Cloudflare Anycast) + preload de fuentes críticas en `<head>`. |
| **INP / FID** (Interactividad) | `< 100 ms` | Cero JS bloqueante; islas Vue diferidas con `client:idle` o `client:visible` (nunca `client:load`). |
| **CLS** (Cumulative Layout Shift) | `< 0.05` | Dimensiones explícitas (`width` y `height`) en todas las imágenes e ilustraciones SVG. |
| **JS de aplicación (islas)** | `< 10 KB` (gzip) | Código propio de las islas más el runtime de hidratación de Astro. **No** incluye el runtime de Vue, que es un coste fijo del framework y se contabiliza en la nota inferior. Inventario en [`03-islands.md`](03-islands.md) §2. |
| **CSS Purgado Total** | `< 15 KB` | Motor de Tailwind CSS v4 con purga automática en tiempo de compilación. |
| **Carga Total de Fuentes** | `< 100 KB` | 3 familias en formato `.woff2` autoalojadas, subconjunto latino y `font-display: swap`. |
| **Puntuación Lighthouse** | `> 95` | Requisito obligatorio en las 4 categorías (Performance, Accessibility, Best Practices, SEO). |

> **Cómo se mide el JavaScript.** El presupuesto se mide sobre el build de producción (`dist/_astro/*.js`) y se expresa **en gzip**, que es como viaja por la red. Medición del build actual:
>
> | Chunk | gzip |
> |---|---|
> | `runtime-core` (Vue, coste fijo del framework) | 26.4 KB |
> | `client` (runtime de hidratación de Astro) | 3.3 KB |
> | `MobileMenu` | 1.4 KB |
> | `ThemeToggle` | 1.0 KB |
> | **Total inicial** (páginas sin la línea temporal) | **31.4 KB** |
> | `ExperienceTimeline` (solo en `/experiencia`) | 1.9 KB |
>
> El runtime de Vue queda **fuera** del presupuesto porque no depende de cuántas islas añadas: es el mismo con una que con cuatro. Incluirlo haría que cualquier isla nueva excediera la métrica, así que dejaría de ser accionable. La versión anterior de este presupuesto decía `< 15 KB` contando el framework, un techo inalcanzable con islas Vue —solo el runtime pesa 26.4 KB gzip—; se corrigió al medirlo.

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
