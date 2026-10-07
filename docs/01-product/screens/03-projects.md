# Pantallas 4 y 5: Catálogo y Detalle de Proyectos

Especificación del catálogo de proyectos (`/proyectos`) y la vista individual de proyecto (`/proyectos/[slug]`).

---

## 🚀 Pantalla 4: Catálogo de Proyectos (`/proyectos`)

### 1. Propósito
Expositor visual y técnico de iniciativas desarrolladas: software profesional, proyectos open source, videojuegos familiares y experimentos de IA.

### 2. Estructura de Secciones

| # | Sección | Elementos y Contenido |
|---|---|---|
| **4.1** | **Encabezado** | Título H1 (*"Proyectos"*), texto descriptivo sobre la filosofía de construcción de software del autor. |
| **4.2** | **Filtros por Tipo** | Barra de chips de filtrado: *Todos*, *Profesionales*, *Open Source*, *Juegos*, *Experimentos IA*. |
| **4.3** | **Cuadrícula de Proyectos** | Grid responsivo de tarjetas `ProjectCard.astro`. Cada tarjeta incluye: imagen de portada, badge de estado (`active`, `completed`, `wip`, `archived`), título, descripción corta, chips del stack tecnológico, enlaces externos (repo / demo) y enlace a la ficha interna. |
| **4.4** | **Paginación / Ver más** | Paginación accesible si el catálogo supera los 12 ítems. |
| **4.5** | **CTA Colaboración** | Bloque de cierre invitando a colaborar en proyectos de código abierto. |

---

## 📄 Pantalla 5: Detalle de Proyecto (`/proyectos/[slug]`)

### 1. Propósito
Ficha técnica profunda que documenta la arquitectura, decisiones de diseño, capturas de pantalla y lecciones aprendidas de un proyecto específico.

### 2. Estructura de Secciones

| # | Sección | Elementos y Contenido |
|---|---|---|
| **5.1** | **Navegación / Breadcrumbs** | Migas de pan accesibles: `Inicio > Proyectos > [Nombre del Proyecto]`. |
| **5.2** | **Hero del Proyecto** | Título H1, badge de estado, stack tecnológico en chips, botones de acción directa (*"Ver repositorio"* en GitHub, *"Probar demo en vivo"*). |
| **5.3** | **Contenido Extendido** | Renderizado de Markdown/MDX con secciones de: Contexto del problema, Arquitectura técnica empleada, Retos superados y Resultados obtenidos. |
| **5.4** | **Galería Visual** | Grid de capturas de pantalla o diagramas arquitectónicos con atributos `alt` descriptivos. |
| **5.5** | **Demostración en Video** | Embed responsive de YouTube o demo grabado (si aplica). |
| **5.6** | **Post Técnico Relacionado** | Tarjeta vinculada al artículo del blog donde se profundiza en la ingeniería del proyecto (`postSlug`). |
| **5.7** | **Navegación Secuencial** | Enlaces accesibles al proyecto anterior y siguiente. |

---

## 3. Consideraciones Técnicas

- Gestionado a través de la Content Collection `projects` validada con Zod (ver [`../04-content-model.md`](../04-content-model.md)).
- Rutas dinámicas generadas en build time vía `getStaticPaths()`.
