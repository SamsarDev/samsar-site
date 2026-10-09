# 03-islands: Arquitectura de Islas Interactivas

Directrices para componentes cliente, directivas de hidratación y prevención de FOUC en **Samsar | Sitio web personal**.

---

## 1. Filosofía de Islas en Astro 7

Astro aplica por defecto la regla de **cero JavaScript en el cliente**. Cada archivo `.astro` se compila a HTML estático en el servidor. Solo cuando un elemento de la interfaz requiere interactividad reactiva en el navegador del usuario (gestión de estado, eventos de teclado o almacenamiento local), se encapsula en una **isla interactiva** (`src/components/islands/*.vue`).

> **Regla de oro:** Si un componente puede resolverse con CSS puro o HTML semántico (como un details/summary para un acordeón estático), se mantiene en `.astro`. Solo se crea una isla Vue cuando el estado reactivo del cliente es indispensable.

---

## 2. Inventario de Islas del MVP

El sitio opera con **tres islas reactivas**. El presupuesto de JavaScript que deben respetar no se repite aquí: vive en [`04-performance.md`](04-performance.md) §1, que es su única fuente de verdad. Esta sección documenta **qué islas hay y por qué se hidratan así**.

| Componente | Archivo | Responsabilidad | Directiva de Hidratación | Justificación |
|---|---|---|---|---|
| **Toggle de Tema** | `ThemeToggle.vue` | Alternar entre tema oscuro y claro, emitir eventos y persistir en `localStorage`. | `client:idle` | No bloquea el renderizado inicial ni el LCP. Se hidrata cuando el hilo principal está libre. |
| **Menú Móvil** | `MobileMenu.vue` | Controlar apertura/cierre del menú hamburguesa en pantallas < 768px con accesibilidad ARIA. | `client:idle` | Solo relevante si el usuario interactúa en mobile tras la carga de la página. |
| **Línea Temporal de Experiencia** | `ExperienceTimeline.vue` | Línea temporal filtrable de la trayectoria profesional en `/experiencia`. | `client:visible` | Es la única isla bajo el pliegue. `client:visible` espera a que entre en el viewport (`IntersectionObserver`), así su bundle no compite con el LCP de la página. |

> **Por qué ninguna usa `client:load`:** las tres son prescindibles en el primer pintado —el tema ya lo aplica el script anti-FOUC del §3, el menú solo existe en mobile y la línea temporal está bajo el pliegue—. `client:load` se justifica solo si la isla es imprescindible para el contenido visible inicial, y hoy no lo es ninguna. La regla completa está en [`AGENTS.md`](../../AGENTS.md) §7.1.

**Cómo auditar este inventario** (debe devolver exactamente tres líneas, una por fila de la tabla):

```bash
grep -rn "client:" src --include="*.astro"
```

---

## 3. Prevención de FOUC (Flash of Unstyled Content)

Uno de los errores más comunes al implementar toggles de tema con islas es el parpadeo de pantalla (FOUC), que ocurre si la isla espera a descargarse e hidratarse antes de aplicar la clase o atributo de tema en `<html>`.

### Estrategia Adoptada: Script Inline Bloqueante en `<head>`

Para garantizar una transición limpia sin parpadeos, se inyecta un micro-script inline directamente en el `<head>` de `BaseLayout.astro`:

```html
<script is:inline>
  (function () {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  })();
</script>
```

- **Ventaja:** Se ejecuta sincrónicamente antes de pintar el DOM y antes de cargar el CSS, eliminando cualquier destello visual.
- **Rol de la isla:** `ThemeToggle.vue` simplemente lee el atributo actual de `document.documentElement` al hidratarse y escucha el click del usuario para alternarlo y actualizar `localStorage`.

---

## 4. Estándar de Código para Islas Vue

Toda isla en `src/components/islands/` debe cumplir los siguientes requisitos:

1. **Composition API obligatoria:** Solo se permite `<script setup lang="ts">`. Prohibida la Options API.
2. **Tipado estricto:** Props definidas mediante `defineProps<Props>()` e interfaces de TypeScript.
3. **Estilos con tokens:** Utilizar utilidades Tailwind y tokens semánticos definidos en `src/styles/theme.css`.
4. **Accesibilidad completa:** Atributos `aria-expanded`, `aria-label`, gestión de foco con teclado (`Escape` para cerrar menús) y estados `:focus-visible`.

---

## 5. Islas Planificadas para Post-MVP

- **`BlogSearch.vue` (F14):** Buscador interactivo en cliente con Fuse.js / Pagefind (`client:idle`).
- **`ContactForm.vue` (F15):** Formulario con validación reactiva y feedback de envío (`client:visible`).
