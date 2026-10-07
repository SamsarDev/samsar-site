# Pantalla 1: Landing Page (`/`)

Especificación de secciones, jerarquía y elementos visuales para la página principal del sitio.

---

## 1. Propósito y Enfoque

- **Objetivo:** Explicar el motivo y la filosofía del sitio sin presentar experiencia laboral comercial.
- **Tono:** Moderno, visual, cercano, con animaciones sutiles y motivos mayas de respeto.
- **Regla de oro:** Cero contenido corporativo o CV en esta pantalla.

---

## 2. Estructura de Secciones

| # | Sección | Descripción y Contenido | Elementos Clave |
|---|---|---|---|
| **1.1** | **Header** | Barra de navegación superior fija (`sticky`). | Logo/isotipo Samsar, enlaces de navegación (Inicio, Sobre mí, Proyectos, Blog, Experiencia, Contacto), isla `ThemeToggle.vue`, menú hamburguesa accesible para mobile. |
| **1.2** | **Hero** | Zona de impacto inicial y bienvenida. | Título principal H1 (*"Samsar: código, cultura y curiosidad"*), subtítulo explicativo, 2 CTAs primarios (*"Explorar blog"* a `/blog`, *"Ver proyectos"* a `/proyectos`), siluetas decorativas mayas (quetzal/colibrí en SVG). |
| **1.3** | **Pilares** | *"Qué encontrarás aquí"* (3 pilares temáticos). | Grid de 3 tarjetas: `Samsar|Dev`, `Samsar|IA`, `Samsar|Games`. Cada una con icono temático, título H2, breve sinopsis y enlace directo a la categoría. |
| **1.4** | **Sobre el proyecto** | Propósito didáctico y personal del espacio. | Texto de síntesis, ilustración o textura de grecas, 3 puntos clave: investigación técnica, contribución open source y desarrollo lúdico pedagógico familiar. |
| **1.5** | **Posts Destacados** | Últimas publicaciones marcadas con `featured: true`. | Grid de 3 `PostCard.astro` con cover, tag de categoría, título, tiempo de lectura y enlace de lectura. Enlace general *"Ver todos los artículos"*. |
| **1.6** | **Proyectos Recientes** | Selección de 3 proyectos destacados. | Grid de 3 `ProjectCard.astro` con imagen, tipo de proyecto, stack tecnológico y enlaces directos a demo o repositorio. |
| **1.7** | **CTA Final** | Invitación a profundizar o contactar. | Mensaje de cierre (*"¿Curioso por ver más?"*), botón a `/blog` o `/contacto`. |
| **1.8** | **Footer** | Cierre institucional y derechos. | Navegación secundaria, enlaces a redes sociales (GitHub, LinkedIn), leyenda de copyright y licencias, mención *"Hecho con cariño en Guatemala"*. |

---

## 3. Comportamiento y Animaciones

- **Transiciones y Motion:** Fade-in escalonado en el hero y parallax sutil en siluetas SVG. Todas las transiciones están supeditadas a `@media (prefers-reduced-motion: reduce)`.
- **Interactividad:** La página es 100% estática (`.astro`), excepto la isla `ThemeToggle.vue` (`client:idle` o `client:load`) en el header y el menú mobile (`client:idle`).
- **Total estimado de elementos:** ~35-40 nodos interactivos y de contenido.
