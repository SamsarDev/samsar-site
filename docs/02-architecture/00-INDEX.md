# 02-architecture: Arquitectura Técnica

Punto de entrada a las especificaciones técnicas, estructura de código, rendimiento y despliegue de **Samsar | Sitio web personal**.

---

## 1. Contenido de esta sección

| Archivo | Qué define | Cuándo consultarlo |
|---|---|---|
| [`01-overview.md`](01-overview.md) | Visión global del sistema, diagrama arquitectónico y justificación de tecnologías. | Al iniciar el proyecto o entender el flujo de datos completo. |
| [`02-project-structure.md`](02-project-structure.md) | Árbol detallado de carpetas y archivos, responsabilidades y convenciones de ubicación. | Al crear nuevos archivos, componentes, layouts o utilidades. |
| [`03-islands.md`](03-islands.md) | Catálogo de islas interactivas Vue, directivas de hidratación y prevención de FOUC. | Al decidir si algo es `.astro` o `.vue` y definir su hidratación. |
| [`04-performance.md`](04-performance.md) | Presupuestos de rendimiento (Web Vitals, límites de bundle) y optimización de activos. | Antes de añadir dependencias, fuentes, imágenes o scripts. |
| [`05-deployment.md`](05-deployment.md) | Estrategia de compilación, hosting en Cloudflare Pages y configuración de dominio. | Al configurar el repositorio en Cloudflare o resolver problemas de build. |

---

## 2. Orden de lectura recomendado

1. **`01-overview.md`** (10 min): Comprender el flujo general SSG y el stack tecnológico.
2. **`02-project-structure.md`** (10 min): Conocer dónde vive cada pieza del código.
3. **`03-islands.md`** (10 min): Asimilar la regla de oro de islas cliente con Vue 3.
4. **`04-performance.md`** (5 min): Interiorizar los límites de peso y presupuestos Lighthouse.
5. **`05-deployment.md`** (5 min): Conocer cómo se distribuye el sitio en producción.

---

## 3. Decisiones arquitectónicas fundamentales

- **Astro 7 SSG:** Generación puramente estática en build time; cero JavaScript en páginas de lectura ([`ADR-0001`](../07-decisions/0001-astro-over-nuxt.md)).
- **Cloudflare Pages:** Red Anycast edge con ancho de banda ilimitado y costo de infraestructura $0 USD ([`ADR-0002`](../07-decisions/0002-cloudflare-pages.md)).
- **Vue 3 Composition API:** Único framework permitido para islas interactivas del cliente ([`ADR-0004`](../07-decisions/0004-vue-islands.md)).
- **Tailwind CSS v4:** Arquitectura de estilos CSS-first mediante custom properties semánticas y `@import "tailwindcss"`.
- **Astro Content Layer API:** Uso del estándar moderno `src/content.config.ts` con cargador `glob` para tipado y validación Zod.
