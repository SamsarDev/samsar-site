# Tarea 04: Auditar el Catálogo de Componentes contra `src/components/`

- **Fase:** 07 — Mantenimiento
- **Estimación:** 40 minutos
- **Documentos de referencia:** [`docs/03-design/components/01-ui.md`](../../03-design/components/01-ui.md) · [`docs/03-design/03-components.md`](../../03-design/03-components.md) · [`docs/01-product/02-features.md`](../../01-product/02-features.md) · [`ADR-0010`](../../07-decisions/0010-inline-svg-icons-over-package.md)

---

## 1. Objetivo Pedagógico

Un sistema de diseño documenta **contratos**: qué componente existe, con qué props y en qué ruta. Cuando el catálogo describe componentes que nadie implementó, el estudiante busca un archivo que no está, y el agente "reutiliza" un componente fantasma. Aquí aprenderás a auditar un catálogo y, sobre todo, a **decidir y registrar** qué hacer con cada discrepancia, en lugar de borrarla sin criterio.

---

## 2. Criterios de Aceptación (DoD)

- [ ] Se recorren **los cuatro** archivos de `docs/03-design/components/` y cada componente documentado queda etiquetado con uno de estos tres estados: **Implementado** (con su ruta real), **Planificado** (con el ID de funcionalidad de [`02-features.md`](../../01-product/02-features.md) que lo justifica) o **Retirado** (con el motivo).
- [ ] Cada documento indica el estado junto al componente, con un formato uniforme que tú definas y expliques una sola vez (por ejemplo, una línea `- **Estado:** Implementado — \`src/components/ui/Button.astro\``).
- [ ] Las rutas de carpeta de cada encabezado coinciden con la realidad: `01-ui.md` no puede dar por sentado que `TOC` vive en `ui/`, y `02-layout.md` debe indicar dónde están realmente las islas y `Breadcrumbs`.
- [ ] Se corrige la cifra del catálogo ("los 10 componentes atómicos" en `01-ui.md`) para que refleje lo que el documento lista y su estado.
- [ ] `FeaturedProjects` queda resuelto como `RecentProjects` (o se documenta como planificado, si de verdad se prevé un componente distinto).
- [ ] El caso **`CodeBlock`** queda resuelto de forma explícita, eligiendo **una** de estas dos salidas y explicándola:
  - **(a) Documentar lo real:** describir que el resaltado lo hace Shiki en el build y que el botón de copiado se inyecta inline en `BlogLayout.astro`, y retirar `CodeBlock.astro` del catálogo.
  - **(b) Planificar la extracción:** mantener el componente como *Planificado* y anotar que extraerlo a `src/components/blog/CodeBlock.astro` es una tarea de código aparte (**no** la hagas aquí).
- [ ] El caso **`Icon`** queda resuelto de forma coherente con [`ADR-0010`](../../07-decisions/0010-inline-svg-icons-over-package.md): si el ADR decide SVG inline por componente, el catálogo no puede prometer un renderizador central salvo que se marque como planificado.
- [ ] Si la decisión cambia el sistema de diseño (por ejemplo, adoptar un `<Icon />` central), se redacta un ADR nuevo siguiendo [`0000-adr-template.md`](../../07-decisions/0000-adr-template.md). Un cambio de criterio de diseño **no** se documenta solo de pasada.
- [ ] `docs/03-design/03-components.md` (el índice de la sección) no contradice los documentos que resume.

---

## 3. Hallazgos ya verificados (punto de partida)

Estos datos salen de comparar el catálogo con `git ls-files src/components`. **Confírmalos tú mismo** en el paso 1 antes de editar nada.

**`01-ui.md`** afirma documentar "los 10 componentes atómicos". En `src/components/ui/` existen **cinco**:

| Documentado | ¿Existe? | Ruta real |
|---|---|---|
| `Button`, `Card`, `Chip`, `Badge`, `Callout` | Sí | `src/components/ui/` |
| `TOC` | Sí, pero en otra carpeta | `src/components/blog/TOC.astro` |
| `Input` | No existe en ninguna carpeta | — |
| `CodeBlock` | No existe como componente | La funcionalidad está inline en `src/layouts/BlogLayout.astro` (líneas 119 a 168) |
| `Avatar` | No existe como componente | Existe el asset `src/assets/avatar.png` |
| `Icon` | No existe | Los iconos se escriben SVG inline en cada componente (ver `ADR-0010`) |

**`02-layout.md`** documenta seis componentes bajo el título `src/components/layout/`. Todos existen, pero tres **no** viven ahí: `ThemeToggle.vue` y `MobileMenu.vue` están en `src/components/islands/`, y `Breadcrumbs.astro` en `src/components/blog/`.

**`03-content.md`** documenta diez componentes. Hay tres discrepancias:

- `FeaturedProjects.astro` → el componente real se llama `RecentProjects.astro`.
- `TimelineItem.astro` y `SkillGroup.astro` → no existen; la página de experiencia usa la isla `ExperienceTimeline.vue` y datos tipados en `src/data/experience.ts`.
- `ProjectCard.astro` vive en `src/components/portfolio/`, no en `blog/`.

**`04-maya.md`** tiene un catálogo en forma de tabla que **no se auditó**: verifícalo contra `src/components/maya/` (hoy contiene `NOTICE.md`, `placeholders/GrecaBorder.astro` y `placeholders/QuetzalSilhouette.astro`).

---

## 4. Paso a Paso Guiado

### Paso 1: Generar la lista de componentes reales

```bash
git ls-files src/components
```

Agrupa el resultado por carpeta. Ese es tu patrón de comparación.

### Paso 2: Auditar documento por documento

Para cada componente documentado, busca su archivo real (`git ls-files | grep NombreComponente`) y anota: existe / no existe / existe con otro nombre / existe en otra carpeta.

### Paso 3: Decidir el estado de cada discrepancia

Aplica este criterio, y escríbelo en el documento para que el próximo lector no tenga que adivinarlo:

- Si el componente existe → **Implementado**, con ruta.
- Si no existe pero una funcionalidad del producto lo exige (por ejemplo, `Input` para el formulario de contacto F15) → **Planificado**, citando el ID.
- Si no existe y nada lo exige (por ejemplo, `ProjectLayout.astro`, descartado al usar `BlogLayout` y `BaseLayout`) → **Retirado**, con el motivo.

### Paso 4: Resolver `CodeBlock` e `Icon`

Son los dos casos con más matiz, porque la **funcionalidad sí existe** aunque el componente no. Dedica un párrafo a cada uno con la decisión y su porqué.

### Paso 5: Coherencia final

Repasa `docs/03-design/03-components.md` y `DESIGN.md` para que no queden afirmaciones contrarias a lo que acabas de escribir.

---

## 5. Comprobación y Verificación

1. Todo componente marcado **Implementado** debe existir:

   ```bash
   git ls-files src/components
   ```

   Recorre las etiquetas "Implementado" del catálogo y comprueba una por una que la ruta aparece en esa salida.

2. Todo componente marcado **Planificado** debe citar un ID de `02-features.md` que exista (F14, F15, F20...).

3. Busca menciones residuales a los componentes retirados:

   ```bash
   grep -rn "CodeBlock\|FeaturedProjects\|TimelineItem\|SkillGroup\|ProjectLayout\|<Input\|<Avatar\|<Icon" docs/
   ```

   Lo que aparezca debe ser intencional (por ejemplo, un ADR que explique la retirada) o estar corregido.

4. **Aviso sobre `check` y `build`:** esta tarea no toca código, así que su verificación principal es documental. Ejecuta igualmente `bun run check` y `bun run build` para confirmar que no rompiste nada por accidente; si fallan de forma intermitente (ver [`00-INDEX.md`](00-INDEX.md) §3), déjalo anotado.

---

## 6. Pistas Didácticas y Errores Comunes

- **No borres las discrepancias en silencio.** Eliminar `Input` del catálogo cuando el formulario de contacto (F15) sigue planificado sería perder información útil. La etiqueta **Planificado** es la respuesta correcta.
- **Una funcionalidad puede existir sin el componente prometido.** El botón de copiado ya funciona (se inyecta en `BlogLayout.astro` con `navigator.clipboard`), pero el catálogo promete un componente con cabecera de lenguaje y estilos propios que nadie escribió. Distinguir "existe la función" de "existe el componente" es el aprendizaje central de esta tarea.
- **Cuidado con el resaltado de sintaxis:** lo hace Shiki durante el build (configurado en `astro.config.mjs`), no un componente de cliente. Si extraes un `CodeBlock` en el futuro, ten presente que el HTML ya viene resaltado.
- **El catálogo también envejeció por copia del plan:** varios nombres (`CodeBlock`, `Embed`, `Avatar`, `Icon`) provienen de la especificación original en `docs/99-reference/`, que es histórica y no se edita.
