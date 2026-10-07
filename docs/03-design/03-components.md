# 03-components: Catálogo y Arquitectura de Componentes

Índice maestro del sistema de componentes, principios de diseño modular y convención de interfaz para **Samsar | Sitio web personal**.

---

## 1. Principios de Componentes UI

1. **Astro por defecto:** Todo componente visual y estructural es un componente `.astro` estático.
2. **Islas reservadas para reactividad:** Únicamente componentes con estado de cliente (`ThemeToggle.vue`, `MobileMenu.vue`) se crean como islas Vue en `src/components/islands/`.
3. **Props fuertemente tipadas:** Cada componente Astro exporta su interfaz `Props` en TypeScript; cada componente Vue utiliza `defineProps<Props>()`.
4. **Cero valores hexadecimales:** Todo color, borde, espaciado y sombra debe aplicar tokens semánticos definidos en `src/styles/theme.css`.
5. **Iconos de interfaz sin librerías pesadas:** Los iconos de UI (flechas, menú, sol/luna, cerrar, enlaces) se resuelven mediante SVGs inline inspirados en Lucide ([`ADR-0010`](../07-decisions/0010-inline-svg-icons-over-package.md)), sin instalar paquetes externos.

---

## 2. Catálogo Maestro por Categoría (~33 Componentes)

Las especificaciones detalladas de props, variantes, estados y estilos de cada componente se encuentran organizadas en la subcarpeta [`components/`](components/):

| Módulo | Cantidad | Descripción | Documento Detallado |
|---|---|---|---|
| **UI Base** | 10 | Elementos atómicos de interacción y contenido (botones, cards, chips, badges, callouts, inputs, código, TOC, avatares e iconos). | [`components/01-ui.md`](components/01-ui.md) |
| **Layout** | 6 | Andamiaje estructural de página (Header, Footer, Nav, ThemeToggle, MobileMenu, Breadcrumbs). | [`components/02-layout.md`](components/02-layout.md) |
| **Contenido** | 10 | Bloques especializados de presentación de información (PostCard, ProjectCard, grids destacados, timeline de roles, paginación). | [`components/03-content.md`](components/03-content.md) |
| **Motivos Mayas** | 7 | Ilustraciones vectoriales y separadores culturales con opacidad controlada y `aria-hidden="true"`. | [`components/04-maya.md`](components/04-maya.md) |

---

## 3. Matriz de Estados Estándar

| Componente | Estados Requeridos |
|---|---|
| **Button** | `default`, `hover`, `:focus-visible`, `active`, `disabled`, `loading` |
| **Card** | `default`, `hover` (elevación sutil de 4px), `:focus-visible` |
| **Chip / Badge** | `default`, `hover`, `active`, `selected` |
| **Input / Field** | `default`, `:focus-visible` (anillo colibrí), `error` (mensaje accesible), `disabled` |
| **Link** | `default`, `hover`, `:focus-visible`, `active` |
