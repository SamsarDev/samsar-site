# 04-glossary: Glosario Técnico

Definición de conceptos clave de arquitectura de software, estándares web y diseño empleados en **Samsar | Sitio web personal**.

---

## 1. Arquitectura y Frontend

| Término | Definición |
|---|---|
| **SSG (Static Site Generator)** | Compilación que genera archivos HTML, CSS y JS estáticos durante el build. El servidor o CDN solo entrega archivos planos ya renderizados, sin cómputo por petición. |
| **Islands Architecture** | Patrón donde la página es HTML estático puro por defecto, y solo pequeños componentes interactivos aislados (islas) cargan e hidratan JavaScript en el navegador. |
| **Hydration (Hidratación)** | Proceso en el que un componente renderizado previamente en HTML se vincula a su lógica reactiva de JavaScript en el navegador del cliente. |
| **Content Layer API** | Estándar de Astro 6 para cargar, tipar y validar colecciones de contenido (Markdown/MDX) desde fuentes locales o remotas mediante esquemas Zod en `src/content.config.ts`. |
| **MDX** | Extensión de Markdown que permite intercalar componentes dinámicos de UI dentro del texto formateado. |
| **FOUC (Flash of Unstyled Content)** | Parpadeo visual molesto que ocurre cuando una página se pinta con un tema visual o estilos por defecto antes de que el script determine la preferencia guardada del usuario. |

---

## 2. Calidad, Accesibilidad y Rendimiento

| Término | Definición |
|---|---|
| **WCAG (Web Content Accessibility Guidelines)** | Estándares internacionales del W3C para accesibilidad web. El nivel **AA** exige ratios mínimos de contraste de 4.5:1 en texto y navegación completa por teclado. |
| **LCP (Largest Contentful Paint)** | Métrica Core Web Vital que mide el tiempo necesario para renderizar el bloque de contenido visible más grande en la pantalla (meta: < 1.5s). |
| **INP (Interaction to Next Paint)** | Métrica que evalúa la capacidad de respuesta general de la página ante interacciones del usuario como clicks o pulsaciones de teclado (meta: < 100ms). |
| **CLS (Cumulative Layout Shift)** | Métrica que cuantifica los movimientos inesperados de elementos visuales durante la carga de la página (meta: < 0.05). |

---

## 3. Infraestructura y Procesos

| Término | Definición |
|---|---|
| **Edge Computing (Anycast)** | Red de servidores distribuidos geográficamente en cientos de ciudades que entregan el contenido al usuario desde el centro de datos físicamente más cercano. |
| **ADR (Architecture Decision Record)** | Documento que registra una decisión técnica estructural, las alternativas descartadas, los tradeoffs asumidos y las consecuencias operativas. |
| **Conventional Commits** | Convención formal de mensajes de Git (`feat:`, `fix:`, `docs:`, `chore:`) que facilita la lectura del historial y la automatización de changelogs. |
| **MCP (Model Context Protocol)** | Protocolo estándar abierto que permite a modelos y agentes de IA conectarse de forma segura con herramientas, repositorios y fuentes de datos locales. |
| **RAG (Retrieval-Augmented Generation)** | Técnica de IA que combina modelos de lenguaje con motores de búsqueda vectorial para responder preguntas fundamentadas en documentos específicos. |
