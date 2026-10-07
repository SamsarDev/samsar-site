# 07-decisions: Registros de Decisiones de Arquitectura (ADR)

Registro histórico y justificación técnica de las decisiones arquitectónicas clave adoptadas en **Samsar | Sitio web personal**.

---

## 1. ¿Qué es un ADR?

Un **Architecture Decision Record (ADR)** es un documento breve que captura una decisión técnica relevante, el contexto que la motivó, las opciones evaluadas con sus tradeoffs y las consecuencias aceptadas. Los ADRs responden a la pregunta: *"¿Por qué está construido así y no de otra forma?"*.

Para crear una nueva decisión, copia la estructura base definida en [`0000-adr-template.md`](0000-adr-template.md).

---

## 2. Índice Cronológico de Decisiones

| ADR | Título | Estado | Fecha | Ámbito |
|---|---|---|---|---|
| [`0000`](0000-adr-template.md) | **Plantilla Estándar de ADR** | Plantilla | 2026-10-07 | Gobernanza |
| [`0001`](0001-astro-over-nuxt.md) | **Selección de Astro 6 sobre Nuxt y Eleventy** | Aceptado | 2026-10-06 | Stack / SSG |
| [`0002`](0002-cloudflare-pages.md) | **Despliegue en Cloudflare Pages sobre Vercel y Netlify** | Aceptado | 2026-10-06 | Infraestructura / Hosting |
| [`0003`](0003-three-font-families.md) | **Consolidación de la Tríada Tipográfica** | Aceptado | 2026-10-06 | Diseño / Rendimiento |
| [`0004`](0004-vue-islands.md) | **Adopción de Vue 3 para Islas Interactivas** | Aceptado | 2026-10-06 | Frontend / Reactividad |
| [`0005`](0005-screens-subdocuments.md) | **División Modular de Pantallas en Subdocumentos** | Aceptado | 2026-10-07 | Documentación / Alcance |
| [`0006`](0006-experience-as-typed-data.md) | **Gestión de Datos de Experiencia en TypeScript Centralizado** | Aceptado | 2026-10-07 | Modelo de Datos |
| [`0007`](0007-client-side-search-mvp.md) | **Diferimiento del Buscador Client-Side a Post-MVP** | Aceptado | 2026-10-07 | Alcance / Blog |
| [`0008`](0008-zero-backend-contact-form.md) | **Enlaces Directos en MVP y Formulario en Post-MVP** | Aceptado | 2026-10-07 | Arquitectura / Contacto |
| [`0009`](0009-astro-content-layer-api.md) | **Adopción del Content Layer API de Astro 6** | Aceptado | 2026-10-07 | Arquitectura / Contenido |
| [`0010`](0010-inline-svg-icons-over-package.md) | **Adopción de Iconos SVG Inline sobre Paquetes** | Aceptado | 2026-10-07 | Frontend / Componentes |

---

## 3. Reglas de Gobernanza para ADRs

1. **Inmutabilidad de contexto:** Una vez aceptado un ADR, no se reescribe retroactivamente para cambiar su veredicto. Si una decisión cambia en el futuro, se redacta un nuevo ADR que marca al anterior como *Superado por ADR-XXXX*.
2. **Formato uniforme:** Todo ADR nuevo debe seguir estrictamente las 5 secciones de `0000-adr-template.md`.
3. **Límite de líneas:** Ningún ADR debe superar las 150 líneas; se prioriza la claridad concisa sobre la extensión académica.
