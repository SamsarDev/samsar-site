# 07-maintenance: Fase 7 — Mantenimiento y Coherencia

Punto de entrada a las tareas de **mantenimiento posteriores al cierre del MVP** (Fase 6).

Estas tareas no construyen funcionalidad nueva: cierran los huecos que dejó la auditoría —documentación desalineada, un activo ausente y un script que promete lo que no hace—. Su objetivo es que un estudiante o un agente no aprenda rutas, componentes o patrones que no existen en `src/`, y que lo que el sitio promete (incluidos sus metadatos) exista de verdad.

---

## 1. Secuencia de Tareas

Las siete tareas son **independientes** y pueden ejecutarse en cualquier orden. Se recomienda el orden propuesto porque avanza de lo mecánico (inventarios) hacia lo que exige decisiones de diseño o aprobación de dependencias. La única interacción entre tareas es **01 ↔ 06**: si la 06 crea el asset, la 01 debe mantener `public/og-image.png` en el árbol en lugar de eliminarlo.

| # | Tarea | Qué corrige | Alcance |
|---|---|---|---|
| **01** | [`01-sync-project-structure.md`](01-sync-project-structure.md) | El árbol de carpetas de `AGENTS.md` §6 y de `docs/02-architecture/02-project-structure.md` lista archivos que no existen y omite otros que sí existen. | Solo documentación |
| **02** | [`02-islands-inventory.md`](02-islands-inventory.md) | `docs/02-architecture/03-islands.md` afirma que el sitio tiene "exactamente dos islas reactivas"; hay tres desde la Fase 5. | Solo documentación |
| **03** | [`03-anti-fouc-pattern.md`](03-anti-fouc-pattern.md) | El módulo didáctico enseña a cambiar el tema con una clase `.dark`; el código usa el atributo `data-theme`. | Solo documentación |
| **04** | [`04-component-catalog-audit.md`](04-component-catalog-audit.md) | El catálogo de `docs/03-design/components/` documenta componentes que no existen (5 de los 10 átomos de `01-ui.md`). | Documentación + decisión de diseño |
| **05** | [`05-real-linter.md`](05-real-linter.md) | El script `lint` es un alias de `check` y no hay linter configurado, pero la documentación promete uno. | Tooling (requiere aprobación de dependencias) |
| **06** | [`06-og-image-asset.md`](06-og-image-asset.md) | `BaseLayout` usa `/og-image.png` por defecto y ese archivo no existe: `og:image` y `twitter:image` apuntan a un 404. | Activo nuevo (sin dependencias) |
| **07** | [`07-component-gaps.md`](07-component-gaps.md) | Cuatro huecos que la auditoría del catálogo no cerró: cinco componentes reales sin ficha, `Input` y `CodeBlock` sin implementar, `Icon.astro` decidido en un ADR y nunca creado, y fichas que afirman comportamiento inexistente. | Documentación y código |

---

## 2. Origen de estas tareas

Provienen de una **auditoría de coherencia documentación ↔ código** hecha al cerrar el MVP. En esa auditoría ya se corrigió la versión de Astro (de 6 a 7) en todos los documentos de trabajo. Los cinco puntos iniciales quedaron pendientes porque implican decisiones de diseño o cambios de alcance mayores que una corrección de versión; a ellos se sumó después el asset Open Graph ausente como **tarea 06** (ver §5).

Los detalles de cada hallazgo están en el archivo de su tarea, con las rutas y líneas exactas que lo evidencian.

---

## 3. Intermitencia conocida de `check` y `build`

En algunos entornos, `bun run check` y `bun run build` fallan con:

```text
[GenerateContentTypesError] `astro sync` command failed to generate content collection types: require is not defined
```

**Qué es.** El error se origina en `node_modules/yaml/dist/index.js`: es un paquete CommonJS que el *module runner* de Vite 8 evalúa como ESM, así que `require` no existe. **No tiene nada que ver con `docs/` ni con `src/content.config.ts`**, aunque el mensaje de Astro invite a revisarlo: ese texto es un envoltorio genérico (`astro/dist/core/sync/index.js`) que convierte cualquier fallo en `GenerateContentTypesError`. Comprobado: `src/content.config.ts` está correcto y el error se reproduce en `HEAD` limpio.

**Cuándo aparece.** De forma intermitente y según el entorno, no según el repositorio. Verificado con el mismo `bun.lock`, el mismo `node_modules` (mismo `mtime` del paquete `yaml`) y el mismo commit: el mismo comando da verde en una terminal y rojo en otra, minutos después. Un fallo aquí **no invalida tu trabajo** ni el de una tarea anterior.

**Qué hacer si te aparece:**

1. Ejecuta `bun install --frozen-lockfile`. Reconcilia el árbol contra el lock sin modificar `bun.lock`.
2. Si persiste, borra las cachés generadas y reintenta: `.astro/` y `node_modules/.vite`. Ambas están en `.gitignore` y se regeneran solas.
3. Si sigue fallando, **no lo persigas dentro de una tarea de esta fase**: repórtalo como incidencia de entorno con la salida completa del comando.

**Cómo verificar una tarea entonces.** Ejecuta `bun run check` y `bun run build`; es la verificación normal y en la mayoría de entornos pasa. Si en el tuyo no están disponibles, las tareas 01 a 04 se verifican con sus comandos documentales (`git ls-files`, `grep`) y lo dejas escrito en el resumen. Las tareas 05 (linter) y 06 (asset Open Graph) **sí** necesitan una ejecución verde: la primera valida una herramienta y la segunda un archivo que debe servirse con `200`. No las cierres sin ella.

---

## 4. Reglas específicas de esta fase

1. **Una tarea = un tema.** No mezcles la corrección de estructura con la de islas en el mismo commit.
2. **No cambies la lógica ni los estilos del sitio.** Las tareas 01 a 04 corrigen documentación; la 05 añade tooling y la 06 un activo ausente. Si una corrección exige tocar componentes, plantillas o lógica (por ejemplo, extraer un componente o conectar el campo `cover` con `ogImage`), se abre una tarea nueva en la fase que corresponda.
3. **Registra el criterio, no solo el resultado.** Si el catálogo cambia de convención (por ejemplo, marcar componentes como "Planificado"), explica el criterio dentro del documento.
4. **La tarea 05 sí añade dependencias.** `AGENTS.md` §7.5 exige aprobación explícita antes de instalarlas.

---

## 5. Hallazgos que se promovieron a tareas

Dos hallazgos de la auditoría no eran correcciones de documentación, y se decidieron después de redactar los cinco puntos originales:

- **Asset `public/og-image.png` ausente** → es la **tarea 06**. `src/layouts/BaseLayout.astro` lo usa como valor por defecto de `ogImage`, así que las etiquetas `og:image` y `twitter:image` apuntan a un archivo inexistente: un fallo real de activos, no de documentación.
- **La intermitencia de `check` y `build`** descrita en la sección 3 se documentó aquí, sin convertirse en tarea: no es un defecto del repositorio, sino del entorno donde se ejecuta.

---

## 6. Resultado Esperado al Finalizar la Fase

- Ningún documento de trabajo describe archivos, componentes ni patrones que no existan en `src/`.
- El catálogo de componentes distingue con claridad **lo implementado** de **lo planificado**, con la ruta real de cada pieza.
- El script `lint` hace lo que su nombre promete, o la documentación deja de prometer un linter.
- La imagen Open Graph por defecto existe, y `og:image` y `twitter:image` dejan de apuntar a un 404.
- El catálogo de componentes no solo es honesto: no le quedan fichas pendientes, ni componentes prometidos sin implementar, ni decisiones de arquitectura aceptadas sin ejecutar.
