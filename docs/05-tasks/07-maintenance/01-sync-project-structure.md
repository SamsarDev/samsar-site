# Tarea 01: Sincronizar el Árbol de Estructura con el Código Real

- **Fase:** 07 — Mantenimiento
- **Estimación:** 30 minutos
- **Documentos de referencia:** [`docs/02-architecture/02-project-structure.md`](../../02-architecture/02-project-structure.md) · [`AGENTS.md`](../../../AGENTS.md) §6 · [`docs/02-architecture/00-INDEX.md`](../../02-architecture/00-INDEX.md)

---

## 1. Objetivo Pedagógico

Aprender a mantener un inventario de proyecto que no mienta. Un árbol de carpetas obsoleto es el fallo más caro de la documentación: un agente que confía en él crea archivos en carpetas equivocadas, importa componentes inexistentes o "reutiliza" utilidades que no existen. La lección de fondo es que **el inventario se copia de la realidad, nunca del plan**.

---

## 2. Criterios de Aceptación (DoD)

- [ ] `docs/02-architecture/02-project-structure.md` §1 refleja el inventario real de `src/` y `public/`, verificado con un listado real (ver §4), no de memoria.
- [ ] Se **eliminan** del árbol los elementos que no existen en el repositorio: `src/layouts/ProjectLayout.astro`, `src/utils/seo.ts`, y las menciones a `CodeBlock` y `Embed` en el comentario de `components/blog/` y a `Highlights` en el de `components/landing/`.
- [ ] `public/og-image.png` se mantiene en el árbol **solo si la [tarea 06](06-og-image-asset.md) ya creó ese asset**; si todavía no existe, elimínalo del árbol y anota que la tarea 06 lo repondrá.
- [ ] El árbol usa los nombres reales de las utilidades: `src/utils/formatDate.ts` y `src/utils/readingTime.ts` (no `format-date.ts` ni `reading-time.ts`), coherente con la convención camelCase que el propio documento define en §3.
- [ ] Se **añaden** los elementos que faltan: `src/data/profile.ts`, `src/assets/avatar.png`, `src/components/portfolio/`, `src/components/maya/placeholders/`, `src/components/maya/NOTICE.md`, `src/pages/blog/tags/[tag].astro`, `src/pages/proyectos/[type]/index.astro`, `public/robots.txt`, `public/_headers` y `public/cv-samuel-sarmientos.pdf`.
- [ ] Los comentarios de carpeta listan los componentes reales. Al menos: `blog/` (Breadcrumbs, CategoryHero, Pagination, PostCard, PostNavigation, RelatedPosts, TOC), `landing/` (AboutProject, CtaSection, FeaturedPosts, Hero, Pillars, RecentProjects), `ui/` (Badge, Button, Callout, Card, Chip), `layout/` (Footer, Header, Nav), `islands/` (ExperienceTimeline, MobileMenu, ThemeToggle) y `portfolio/` (ProjectCard).
- [ ] `src/layouts/` se documenta con los dos layouts reales: `BaseLayout.astro` y `BlogLayout.astro`.
- [ ] `AGENTS.md` §6 (versión resumida que apunta al documento canónico) es coherente con el árbol corregido: sin `CodeBlock`, `Embed`, `Highlights` ni `ProjectLayout`.
- [ ] La tabla de **§2 (Convenciones de Ubicación)** cubre todo lo que un estudiante puede necesitar crear: las siete familias de `src/components/` (`ui`, `layout`, `blog`, `landing`, `portfolio`, `islands`, `maya`), los dos tipos de contenido (`content/blog/`, `content/projects/`), los datos tipados (`data/`), las rutas (`pages/`), los activos (`src/assets/` y `public/`) y los esquemas (`content.config.ts`). El objetivo es didáctico: que nadie tenga que volver a este documento —ni a una tarea futura— para saber dónde va un archivo.
- [ ] El documento final no afirma nada que no puedas verificar con el listado del paso 1.

---

## 3. Paso a Paso Guiado

### Paso 1: Generar el inventario real

Nunca escribas el árbol desde la memoria. Usa Git, que solo lista lo que está versionado:

```bash
git ls-files src public
```

*(Alternativa en PowerShell: `git ls-files src public | Sort-Object`.)*

Copia la salida a un archivo temporal o a un bloc de notas: ese listado es la única fuente de verdad del paso 2.

### Paso 2: Comparar y anotar diferencias

Recorre el árbol actual de `docs/02-architecture/02-project-structure.md` línea por línea y marca cada entrada con una de estas etiquetas:

- **Existe y coincide** → se deja igual.
- **Existe pero con otro nombre o ruta** → se corrige (por ejemplo, `reading-time.ts` → `readingTime.ts`, u `ProjectCard` que vive en `portfolio/` y no en `blog/`).
- **No existe** → se elimina (por ejemplo, `ProjectLayout.astro`).
- **Existe pero no está documentado** → se añade (por ejemplo, `data/profile.ts`).

### Paso 3: Reescribir el árbol

Reescribe el bloque ```text de §1 manteniendo el estilo actual (barras `├──`, comentario con `#` a la derecha). Respeta el orden lógico por carpeta; no hace falta orden alfabético.

### Paso 4: Alinear `AGENTS.md` §6

`AGENTS.md` §6 es un resumen deliberadamente corto que delega el detalle al documento canónico. No lo conviertas en una copia: corrige solo los comentarios de carpeta para que no nombren componentes inexistentes y deja intacto el enlace de cierre.

### Paso 5: Revisar enlaces internos

Comprueba que cada ruta mencionada en el documento existe. El documento no tiene enlaces relativos en el árbol, pero sí referencias en prosa (`src/services/` apareció en versiones antiguas, por ejemplo). Ninguna referencia debe apuntar a una carpeta que no exista.

---

## 4. Comprobación y Verificación

1. Vuelve a ejecutar el listado y compáralo contra el árbol:

   ```bash
   git ls-files src public
   ```

   Criterio, en las **dos** direcciones:
   - **(a) El árbol no inventa:** toda ruta del árbol debe existir en el listado. Un árbol con archivos que no están es justo el defecto que esta tarea elimina.
   - **(b) El árbol no omite:** todo archivo de `src/` y `public/` debe aparecer por su nombre. Vale nombrarlo en el comentario de su carpeta (como hacen `blog/`, `landing/` o `ui/`), no hace falta una línea de árbol por archivo. No escribas "y 3 posts semilla": enumera los nombres.
   - **Única excepción:** los `.woff2` se documentan por familia y pesos (`space-grotesk/  # 600, 700`). Su nombre lleva sufijos de versión y enumerarlos no aporta al inventario.

2. Verifica que `AGENTS.md` y `02-project-structure.md` no se contradigan:

   ```bash
   git diff AGENTS.md docs/02-architecture/02-project-structure.md
   ```

3. Recorre las carpetas de primer nivel del árbol (`src/components/*`, `src/content/*`, `src/data/`, `src/pages/`, `src/assets/`, `public/`) y comprueba que cada una tiene su fila en §2. Si en el futuro aparece una familia nueva en el código, la tabla debe crecer con ella en el mismo cambio que la crea.

4. **Aviso sobre `check` y `build`:** pueden fallar de forma intermitente por lo descrito en [`00-INDEX.md`](00-INDEX.md) §3. Ejecútalos; si en tu entorno fallan, deja constancia en el resumen de la tarea de que la verificación se hizo con el listado de Git.

---

## 5. Pistas Didácticas y Errores Comunes

- **¿Por qué el árbol se quedó obsoleto?** Se copió del plan original ([`docs/99-reference/SPECIFICATION-v1.1.md`](../../99-reference/SPECIFICATION-v1.1.md)) y nunca se volvió a comparar con el código. Los archivos con nombre en kebab-case (`reading-time.ts`) y los componentes `CodeBlock`, `Embed` o `ProjectLayout` son huellas de ese plan.
- **No borres `NOTICE.md` de `maya/`:** no es un descuido, es el aviso de licencia de los SVG decorativos (ver el README §Licencia). Si reescribes esa carpeta, documéntalo.
- **Regla preventiva:** cuando crees, muevas o renombres un archivo estructural, actualiza el árbol en el **mismo commit**. Un inventario que se actualiza "después" no se actualiza nunca.
- **Ojo con `docs/99-reference/`:** contiene el árbol antiguo y no se edita. Si alguien compara ambos documentos y ve diferencias, la respuesta es "el de `99-reference/` es histórico".
- **Verifica por script, no a ojo:** comparar 61 entradas manualmente contra `git ls-files` no se hace bien. Escribe un par de líneas que recorran el árbol y el listado en las dos direcciones; es más rápido y no se le escapa nada.
- **Cuidado con la codificación si automatizas:** los caracteres del árbol (`├──`, `│`, `└──`) se leen como basura si tu herramienta asume ANSI en lugar de UTF-8, y entonces el script reporta que **no existe absolutamente nada**. Fuerza UTF-8 (en PowerShell, `Get-Content -Encoding UTF8`) antes de creerte el resultado. Es un falso positivo que cuesta media hora si no lo ves venir.
