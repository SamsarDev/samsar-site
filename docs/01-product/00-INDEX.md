# 01-product: Definición de Producto

Punto de entrada para el alcance funcional, la visión, el modelo de datos y las pantallas de **Samsar | Sitio web personal**.

---

## 1. Contenido de esta sección

| Archivo | Qué define | Cuándo consultarlo |
|---|---|---|
| [`01-vision.md`](01-vision.md) | Propósito, objetivos cuantitativos, segmentos de audiencia y límites (no-objetivos). | Al tomar decisiones de alcance y alineación estratégica. |
| [`02-features.md`](02-features.md) | Matriz de funcionalidades del MVP, mejoras post-MVP y funciones excluidas. | Al planificar tareas o validar si una funcionalidad corresponde al MVP. |
| [`03-screens.md`](03-screens.md) | Inventario de las 16 pantallas, mapa de navegación y rutas de detalle. | Al maquetar rutas en `src/pages/` o vincular componentes. |
| [`screens/`](screens/) | Detalle exhaustivo sección por sección de cada pantalla (~450 elementos). | Al construir la interfaz y contenidos específicos de cada vista. |
| [`04-content-model.md`](04-content-model.md) | Esquemas Zod para Content Collections (`blog`, `projects`) y datos de experiencia. | Al crear colecciones en `src/content/` o redactar posts. |

---

## 2. Orden de lectura recomendado

1. **`01-vision.md`** (10 min): Comprender la filosofía de publicación personal y portafolio secundario.
2. **`02-features.md`** (10 min): Conocer qué entra en el primer lanzamiento (incluyendo el buscador).
3. **`03-screens.md`** (10 min): Visualizar el árbol de navegación del sitio.
4. **`04-content-model.md`** (10 min): Entender cómo se estructuran y tipan los artículos y proyectos.

---

## 3. Decisiones clave documentadas

- **Doble propósito:** Cuaderno de aprendizaje/publicación (protagonista en la landing) + portafolio profesional secundario (aislado en `/experiencia`).
- **3 Pilares de contenido:** `Samsar|Dev`, `Samsar|IA` y `Samsar|Games`.
- **Colecciones vs Datos:** Content Collections de Astro para Blog y Proyectos; archivo TypeScript tipado (`src/data/experience.ts`) para la trayectoria curricular.
- **Buscador en Post-MVP:** En el MVP, el blog se navega mediante filtros por categoría; la isla de búsqueda interactiva client-side (Pagefind / Fuse.js) se difiere a la fase posterior.
- **Contacto pragmático:** Para el MVP, `/contacto` ofrece enlaces directos (email, LinkedIn, GitHub); el formulario interactivo con Formspree se incorporará en Post-MVP.
