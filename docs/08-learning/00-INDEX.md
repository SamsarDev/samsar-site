# 08-learning: Recursos Pedagógicos y Rutas de Aprendizaje

Bienvenido a la sección pedagógica de **Samsar | Sitio web personal**. Este proyecto está diseñado desde sus cimientos como un entorno de formación práctica donde estudiantes y desarrolladores aprenden arquitectura de software, tecnologías web modernas y colaboración con agentes de inteligencia artificial.

---

## 1. Módulos Didácticos Disponibles

| Módulo | Documento | Qué aprenderás |
|---|---|---|
| **Ruta Formativa** | [`01-learning-path.md`](01-learning-path.md) | La secuencia didáctica completa fase por fase: fundamentos, diseño atómico, arquitectura hexagonal y SSG. |
| **Despliegue Cloudflare** | [`02-cloudflare-pages-deployment-guide.md`](02-cloudflare-pages-deployment-guide.md) | Manual paso a paso de creación de cuenta, conexión con GitHub, variables de compilación y despliegue global en el Edge. |
| **Versionado y Releases** | [`03-versioning-tags-and-releases.md`](03-versioning-tags-and-releases.md) | Guía de SemVer 2.0.0, tags anotados de Git, publicación de Releases en GitHub y rollbacks en Edge/Cloudflare. |
| **Clean Architecture Frontend** | [`04-frontend-clean-architecture.md`](04-frontend-clean-architecture.md) | Screaming Architecture, separación de capas (dominio, aplicación, presentación) y patrón Contenedor-Presentacional. |
| **Accesibilidad en la Práctica** | [`05-accessibility-in-practice.md`](05-accessibility-in-practice.md) | Cumplimiento WCAG 2.1 AA real: ratios de contraste, foco de teclado, lectores de pantalla, `aria-hidden` y reduced motion. |
| **Patrones Astro & Vue** | [`06-design-patterns-astro-vue.md`](06-design-patterns-astro-vue.md) | Arquitectura de islas, prevención de FOUC con scripts en el Head, hidratación perezosa (`client:visible`) y SSG determinista. |

---

## 2. Metodología de Aprendizaje: Pair Programming con Agentes

1. **Entender antes de codificar:** Antes de generar o modificar código, el estudiante o agente debe explicar el *por qué* técnico de cada decisión en 1 a 3 frases claras.
2. **Ciclo de retroalimentación corto:** Se trabaja en pasos pequeños y atómicos, cerrando cada cambio con verificación estricta (`bun run check` y `bun run build`) y commits convencionales.
3. **Calidad de producción desde el día uno:** No se crean atajos temporales ni soluciones provisionales sin estándares de accesibilidad WCAG AA, tipado estricto y pruebas de build.
