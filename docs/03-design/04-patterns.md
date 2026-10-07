# 04-patterns: Patrones de Composición y Layout

Estructura de grillas, diseño de contenedores y patrones visuales recurrentes en **Samsar | Sitio web personal**.

---

## 1. Sistema de Grilla y Breakpoints

El diseño sigue una arquitectura **mobile-first** basada en Tailwind CSS v4 con puntos de interrupción estándar:

| Breakpoint | Ancho Mínimo | Columnas | Márgenes Laterales | Canaletas (Gutters) |
|---|---|---|---|---|
| **Mobile (`sm`)** | `< 768px` | 4 columnas | `16px` / `20px` | `16px` |
| **Tablet (`md`)** | `768px` | 8 columnas | `32px` | `24px` |
| **Desktop (`lg` / `xl`)** | `1024px` / `1280px` | 12 columnas | `48px` | `24px` / `32px` |

---

## 2. Contenedores y Medidas de Lectura

Para preservar la legibilidad y evitar que el contenido se estire excesivamente en pantallas ultrapanorámicas:

- **Contenedor General (`max-w-6xl` / 1200px):** Utilizado en portadas, catálogos de proyectos e índices generales.
- **Contenedor Amplio (`max-w-7xl` / 1440px):** Límite máximo para el contenedor del Hero y barras de navegación en escritorio.
- **Columna de Lectura (Prose Measure: `70ch`):** Utilizada en artículos de blog y páginas biográficas. Equivale aproximadamente a `680px - 740px`, garantizando un promedio óptimo de 60 a 75 caracteres por línea.

---

## 3. Patrón de Lectura con Riel Lateral (Blog Layout)

Para artículos técnicos extensos, la interfaz en escritorio (`>= 1024px`) se organiza en una composición asimétrica:

```text
┌────────────────────────────────────────────────────────┐
│                   Cabecera del Post                    │
├───────────────────────────────┬────────────────────────┤
│                               │                        │
│   Columna Central de Lectura  │   Riel Lateral Sticky  │
│          (Máximo 70ch)        │                        │
│                               │   • Tabla de           │
│   • Párrafos en Manrope       │     Contenidos (<TOC>) │
│   • Bloques de código         │   • Tiempo de lectura  │
│   • Diagramas y notas         │   • Enlaces rápidos    │
│                               │                        │
└───────────────────────────────┴────────────────────────┘
```

- En dispositivos móviles (< 1024px), el riel lateral se colapsa en un acordeón desplegable accesible al inicio del artículo.

---

## 4. Patrón Contenedor-Presentacional (Astro)

1. **Páginas (`src/pages/*.astro`):** Actúan como orquestadores. Consultan colecciones de contenido (`getCollection()`) o archivos de datos (`src/data/`), preparan metadatos SEO y pasan props a layouts y componentes.
2. **Layouts (`src/layouts/*.astro`):** Encapsulan el `<head>`, inyectan scripts anti-FOUC, estructuran `<Header />`, `<main>` y `<Footer />`.
3. **Componentes UI (`src/components/ui/`):** Son componentes de presentación pura. No realizan consultas de datos; reciben props tipadas y renderizan HTML accesible con tokens semánticos.
