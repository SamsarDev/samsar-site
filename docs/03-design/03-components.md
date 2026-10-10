# 03-components: Catálogo y Arquitectura de Componentes

Índice maestro del sistema de componentes, principios de diseño modular y convención de interfaz para **Samsar | Sitio web personal**.

---

## 1. Principios de Componentes UI

1. **Astro por defecto:** Todo componente visual y estructural es un componente `.astro` estático.
2. **Islas reservadas para reactividad:** Solo los componentes con estado de cliente se crean como islas Vue en `src/components/islands/`. Hoy son tres: `ThemeToggle.vue`, `MobileMenu.vue` y `ExperienceTimeline.vue` (ver [`02-architecture/03-islands.md`](../02-architecture/03-islands.md)).
3. **Props fuertemente tipadas:** Cada componente Astro exporta su interfaz `Props` en TypeScript; cada componente Vue utiliza `defineProps<Props>()`.
4. **Cero valores hexadecimales:** Todo color, borde, espaciado y sombra debe aplicar tokens semánticos definidos en `src/styles/theme.css`.
5. **Iconos de interfaz sin librerías pesadas:** Los iconos de UI (flechas, menú, sol/luna, cerrar, enlaces) se resuelven mediante SVGs inline inspirados en Lucide ([`ADR-0010`](../07-decisions/0010-inline-svg-icons-over-package.md)), sin instalar paquetes externos. **Pendiente:** ese ADR decidió además un componente `Icon.astro` interno que centralice los vectores; hoy no existe y cada componente escribe el suyo (ver la ficha de `Icon` en [`components/01-ui.md`](components/01-ui.md)).

---

## 2. Catálogo Maestro por Categoría

Las especificaciones detalladas de props, variantes, estados y estilos de cada componente se encuentran organizadas en la subcarpeta [`components/`](components/). El catálogo documenta **40 entradas**: **27 implementadas**, **10 planificadas** y **3 retiradas**. En el código hay **27 componentes reales** en `src/components/`, y desde la [tarea 07 de la Fase 7](../05-tasks/07-maintenance/07-component-gaps.md) **los 27 tienen ficha**: la cuenta cierra sin excepciones.

> **Convención de estado.** Cada ficha del catálogo lleva una línea `- **Estado:**` con uno de estos tres valores:
> - **Implementado** — con su ruta real: existe y se usa.
> - **Planificado** — con lo que lo exige (una funcionalidad `F##` o una pantalla): no existe todavía y hay una razón concreta para crearlo.
> - **Retirado** — con el motivo: se especificó y ya no hace falta. La entrada se conserva para que nadie lo reimplemente por error.

| Módulo | Entradas | Implementados | Planificados | Retirados | Documento |
|---|---|---|---|---|---|
| **UI Base** | 10 | 6 | 3 | 1 | [`components/01-ui.md`](components/01-ui.md) |
| **Layout y navegación** | 6 | 6 | 0 | 0 | [`components/02-layout.md`](components/02-layout.md) |
| **Contenido** | 15 | 13 | 0 | 2 | [`components/03-content.md`](components/03-content.md) |
| **Motivos Mayas** | 9 | 2 | 7 | 0 | [`components/04-maya.md`](components/04-maya.md) |

> **Cuenta cerrada.** Las cinco fichas que faltaban —los cuatro componentes de portada (`Hero`, `Pillars`, `AboutProject`, `CtaSection`) y la isla `ExperienceTimeline`— se escribieron en la [tarea 07 de la Fase 7](../05-tasks/07-maintenance/07-component-gaps.md) leyendo el código, no el plan. Ya no hay componentes reales sin especificación: **27 reales = 27 con ficha**.

---

## 3. Matriz de Estados Estándar

| Componente | Estados Requeridos |
|---|---|
| **Button** | `default`, `hover`, `:focus-visible`, `active`, `disabled`, `loading` |
| **Card** | `default`, `hover` (elevación sutil de 4px), `:focus-visible` |
| **Chip / Badge** | `default`, `hover`, `active`, `selected` |
| **Input / Field** | `default`, `:focus-visible` (anillo colibrí), `error` (mensaje accesible), `disabled` |

> **La matriz es una especificación, no un inventario:** son los estados mínimos exigibles. `Button` ya implementa todos, incluido `loading`, y los de `Input` aplican cuando se implemente la F15. La fila de `Link` se retiró porque **no es un componente** del catálogo: los enlaces se resuelven con un `<a>` y tokens semánticos, o con `Button` cuando necesitan aspecto de botón.
