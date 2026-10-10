# AGENTS.md

Reglas para agentes de IA (OpenCode, Codex, Claude Code, Antigravity y otros) que trabajan en este repositorio. Este es el **único archivo de reglas**: `CLAUDE.md` solo lo importa. Si necesitas cambiar una regla, cámbiala aquí.

---

## 1. Contexto del proyecto

Sitio web personal de **Samuel Sarmientos / Samsar** ("Código, cultura y curiosidad"). Blog técnico con tres categorías (`Samsar|Dev`, `Samsar|IA`, `Samsar|Games`), portafolio y proyectos, con identidad visual maya en temas oscuro y claro.

Este proyecto se construye **con fines didácticos**: lo desarrollan estudiantes junto con agentes de IA. Eso cambia cómo debes trabajar (ver sección 3).

**Estado:** MVP completo (fases 1 a 6 de `docs/05-tasks/`). El código ya está implementado y el CI valida `check` y `build`; los cambios pendientes son mejoras post-MVP, no andamiaje inicial.

**Stack:** Astro 7 (SSG) + islas Vue 3 + Tailwind CSS v4 + Markdown/MDX con Content Collections + Cloudflare Pages.

---

## 2. Idioma

| Qué | Idioma |
|---|---|
| Código: variables, funciones, componentes, props, clases, tipos | **Inglés** |
| Comentarios en el código | **Inglés** |
| Nombres de archivos y carpetas | **Inglés** |
| Mensajes de commit y nombres de ramas | **Inglés** |
| Tus respuestas a estudiantes y desarrolladores | **Español** |
| Documentación en `docs/`, `README.md` | **Español** |
| Contenido del sitio (posts, textos de interfaz, `aria-label`, metadatos SEO) | **Español** |

Ejemplo: el componente se llama `ThemeToggle.vue` y su prop `initialTheme`, pero su `aria-label` dice "Cambiar tema".

Si el usuario te escribe en otro idioma, responde en ese idioma, pero el código sigue en inglés.

---

## 3. Cómo trabajar con estudiantes

Muchas personas que te usarán están aprendiendo. Tu objetivo no es solo que el código funcione, sino que **entiendan lo que se hizo**.

- **Explica el porqué** de cada decisión importante en 1-3 frases, sin dar cátedra.
- **Trabaja en pasos pequeños.** Una tarea, un cambio revisable. No hagas refactors no pedidos.
- **No asumas conocimiento previo** de Astro, Tailwind o TypeScript, pero tampoco sobreexpliques lo básico de Vue (el autor lo domina).
- **Antes de escribir código en una tarea nueva**, resume en 2-4 líneas qué vas a hacer y qué archivos vas a tocar.
- **Al terminar**, indica qué archivos cambiaste y cómo verificarlo (comando o paso manual).
- **Si el estudiante pide algo que contradice la documentación**, señálalo y pregunta antes de proceder.
- **No resuelvas por ellos los ejercicios marcados como didácticos** en `docs/05-tasks/`; guía con pistas si así lo indica la tarea.

---

## 4. Fuentes de verdad

Antes de implementar, lee el documento que corresponde. Si dos documentos se contradicen, **no elijas por tu cuenta: pregunta**.

| Tema | Fuente | Ruta |
|---|---|---|
| Alcance, pantallas, funcionalidades | Producto | `docs/01-product/` |
| Stack, estructura, rendimiento, despliegue | Arquitectura | `docs/02-architecture/` |
| Aspecto visual, componentes, accesibilidad | Diseño | `DESIGN.md` y `docs/03-design/` |
| Convenciones de código y flujo de trabajo | Proceso | `docs/04-process/` |
| Qué hacer ahora | Tareas | `docs/05-tasks/` |
| Cómo hacer una acción repetitiva | Playbooks | `docs/06-playbooks/` |
| Por qué se decidió algo | ADRs | `docs/07-decisions/` |

**Valores de color, tipografía y espaciado:** la fuente de verdad de implementación es `src/styles/theme.css`. Nunca copies un valor hexadecimal en un componente; usa el token.

**`docs/99-reference/` es archivo histórico.** No lo uses para implementar: puede contener valores obsoletos. Si algo solo aparece ahí, pregunta.

Empieza por `docs/00-INDEX.md` si no sabes dónde buscar.

---

## 5. Comandos

El gestor de paquetes principal es **Bun**. Usa `bun` como primera opcion para todos los comandos. Si `bun` falla por algun problema de entorno o compatibilidad, usa `npm` como alternativa (fallback).

Si `package.json` dice otra cosa, **gana `package.json`** y avisa para corregir este archivo.

```bash
bun install          # instalar dependencias (fallback: npm install)
bun run dev          # servidor de desarrollo (fallback: npm run dev)
bun run build        # build de produccion (debe terminar sin warnings) (fallback: npm run build)
bun run preview      # previsualizar el build (fallback: npm run preview)
bun run check        # astro check: tipos y errores de .astro (fallback: npm run check)
bun run lint         # eslint: errores reales y accesibilidad, bloquea el CI (fallback: npm run lint)
bun run format       # prettier --write: formatea el codigo (fallback: npm run format)
bun run format:check # prettier --check: verifica el formato sin tocarlo (fallback: npm run format:check)
```

Antes de dar una tarea por terminada, ejecuta como minimo `bun run lint`, `bun run check` y `bun run build` (o sus equivalentes con `npm` si `bun` fallo).

`lint` y `check` son capas distintas y complementarias: `astro check` valida tipos y plantillas; `eslint` busca errores reales (imports o variables sin usar, `any` explicito). Ninguno sustituye al otro.

---

## 6. Estructura del código

```
src/
├── assets/          # Imágenes importadas por componentes
├── components/
│   ├── ui/          # Button, Card, Chip, Badge, Callout
│   ├── layout/      # Header, Footer, Nav
│   ├── blog/        # PostCard, TOC, Breadcrumbs, Pagination, CategoryHero...
│   ├── landing/     # Hero, Pillars, AboutProject, CtaSection, FeaturedPosts...
│   ├── portfolio/   # ProjectCard
│   ├── islands/     # Islas Vue: ThemeToggle, MobileMenu, ExperienceTimeline
│   └── maya/        # SVG decorativos + placeholders/ (licencia MIT)
├── content.config.ts # Colecciones y esquemas Zod
├── content/         # Markdown/MDX: blog/ (3 pilares) y projects/
├── data/            # Datos tipados: experience.ts, profile.ts
├── layouts/         # BaseLayout, BlogLayout
├── pages/           # Rutas
├── styles/          # theme.css (tokens), global.css
└── utils/           # formatDate.ts, readingTime.ts
```

Detalle completo en `docs/02-architecture/02-project-structure.md`.

---

## 7. Reglas de código

### 7.1 Astro o Vue

**Por defecto, todo es `.astro`.** Solo usa un componente Vue cuando haya **estado reactivo real** en el cliente.

| Caso | Tecnología |
|---|---|
| Layout, Header, Footer, cards, TOC, páginas estáticas | `.astro` |
| Toggle de tema, menú mobile, buscador, filtros con estado, formulario con validación | `.vue` en `components/islands/` |

- Las islas Vue usan **Composition API con `<script setup lang="ts">`**. No uses Options API.
- Elige la directiva de hidratación más perezosa que funcione: `client:visible` o `client:idle` antes que `client:load`. Justifica cada `client:load`.
- **No uses React, Svelte, Solid ni JSX.** El proyecto es Vue.
- Si dudas entre `.astro` y `.vue`, usa `.astro`.

### 7.2 TypeScript

- TypeScript en todo el código. Prohibido `any` (usa `unknown` y estrecha el tipo).
- Props tipadas siempre (`interface Props` en Astro, `defineProps<...>()` en Vue).
- Los esquemas de contenido se validan con Zod en Content Collections.

### 7.3 Nombres

| Elemento | Convención | Ejemplo |
|---|---|---|
| Componentes (`.astro`, `.vue`) | PascalCase | `PostCard.astro` |
| Utilidades, funciones | camelCase | `formatDate.ts` |
| Archivos de contenido y rutas | kebab-case | `guia-clean-architecture.md` |
| Tokens CSS | `--kebab-case` | `--color-jade` |

> Los archivos de contenido (posts) llevan slug en español porque son URLs públicas; el resto del código es inglés.

### 7.4 Estilos

- Tailwind v4 con configuración **CSS-first** (tokens en `src/styles/theme.css`).
- **Antes de instalar o configurar Tailwind, verifica en la documentación oficial** la integración vigente con Astro. No uses `@astrojs/tailwind` ni crees `tailwind.config.js` por costumbre: esa era la integración de Tailwind v3.
- Usa siempre los **tokens semánticos** (`--bg-surface`, `--text-primary`, `--accent-primary`), que se resuelven según el tema. Evita los tokens crudos (`--color-jade`) salvo que el diseño lo pida.
- Ningún color, fuente ni espaciado "a ojo". Si falta un token, **pregunta**; no lo inventes.

### 7.5 Dependencias

- **No instales paquetes sin aprobación.** Ni "por si acaso", ni para una utilidad de 5 líneas.
- Si crees que hace falta uno: explica qué problema resuelve, su tamaño y qué alternativa nativa existe, y espera confirmación.
- Versiones fijas en `package.json`.

---

## 8. Reglas de diseño que no se negocian

El detalle está en `DESIGN.md`. Lo mínimo que debes respetar siempre:

- **Accesibilidad AA:** contraste ≥ 4.5:1 en texto, ≥ 3:1 en UI. Foco visible en todo elemento interactivo. Botones de solo icono con `aria-label`. Un `<h1>` por página, sin saltar niveles.
- **`prefers-reduced-motion`:** toda animación debe poder desactivarse.
- **Animaciones:** ≤ 400 ms en UI, solo `transform` y `opacity`; nunca animar `width`, `height`, `top` o `left`.
- **Tipografía:** solo 3 familias (Space Grotesk, Manrope, JetBrains Mono), autoalojadas. **Sin Google Fonts CDN.**
- **Motivos mayas:** decorativos, SVG inline, `aria-hidden="true"`, dentro de la opacidad máxima definida. Nunca como icono de acción. Nada de iconografía estereotipada.
- **Iconos de interfaz:** SVG de línea (Lucide o Phosphor). **No uses emojis como iconos en la UI.**
- **Rendimiento:** presupuesto de JS inicial y Lighthouse > 95 según `docs/02-architecture/04-performance.md`. Cada isla nueva cuesta; justifícala.

---

## 9. Límites

### Haz siempre

- Leer la tarea y los documentos que enumera antes de escribir código.
- Mantener el cambio dentro del alcance de la tarea.
- Reutilizar componentes y tokens existentes antes de crear nuevos.
- Imitar los ejemplos de `examples/` cuando exista uno para lo que haces.
- Dejar el proyecto compilando.

### Pregunta antes de

- Agregar una dependencia.
- Crear un token de diseño, una familia tipográfica o un color nuevo.
- Cambiar esquemas de Content Collections.
- Cambiar configuración de build, hosting o CI.
- Mover o renombrar carpetas.
- Resolver una contradicción entre documentos.
- Pasar de `.astro` a una isla Vue.

### Nunca

- Editar `docs/99-reference/`.
- Modificar `src/styles/theme.css` sin que la tarea lo indique y sin respetar `DESIGN.md`.
- Usar `localStorage` fuera de las islas que lo necesitan (por ejemplo, el toggle de tema).
- Subir secretos, claves o archivos `.env`.
- Desactivar reglas del linter o de TypeScript para "hacer pasar" el código.
- Usar `--force`, borrar ramas o reescribir historial sin que te lo pidan.
- Inventar rutas, APIs o archivos que no existen: verifica antes de referenciar.
- Declarar una tarea terminada sin haber ejecutado `check` y `build`.

---

## 10. Git

- **Ramas:** `feat/…`, `fix/…`, `docs/…`, `chore/…` (en inglés, kebab-case). Ejemplo: `feat/theme-toggle`.
- **Commits:** Conventional Commits, en inglés, en modo imperativo.
  - `feat: add theme toggle island`
  - `fix: correct focus ring contrast on cards`
  - `docs: add islands decision tree`
- Un commit por cambio lógico. No mezcles documentación, estilos y funcionalidad en el mismo commit.
- **No hagas commit ni push por tu cuenta** salvo que el usuario lo pida explícitamente.

---

## 11. Definición de terminado (resumen)

Una tarea está terminada cuando:

1. Cumple todos los criterios de aceptación de su archivo en `docs/05-tasks/`.
2. `bun run check` y `bun run build` pasan sin errores ni warnings (o sus equivalentes con `npm` si `bun` fallo).
3. Funciona en tema oscuro **y** claro.
4. Es usable con teclado, con foco visible.
5. Se ve bien en mobile (≥ 360 px), tablet y desktop.
6. No añade JS innecesario.
7. Entregaste el resumen: qué cambió, por qué y cómo verificarlo.

Lista completa en `docs/04-process/03-definition-of-done.md`.

---

## 12. Cuando no sepas algo

- **Pregunta.** Una pregunta corta a tiempo vale más que una hora de código en la dirección equivocada.
- **No inventes.** Si no encuentras algo en los documentos, dilo: "esto no está especificado".
- **Verifica versiones.** Astro, Tailwind y las integraciones cambian rápido. Ante la duda, consulta la documentación oficial de la versión instalada en lugar de confiar en tu memoria.
- **Reporta incoherencias** que encuentres en la documentación; son valiosas para mejorarla.

---

## 13. Skills

Las skills recomendadas y cómo instalarlas para cada agente están en `SKILL.md`. Las skills propias del proyecto están planificadas en `.agents/skills/` (aún no implementadas).

---

*Última revisión: Octubre 2026. Si modificas este archivo, avisa al equipo: afecta a todos los agentes.*