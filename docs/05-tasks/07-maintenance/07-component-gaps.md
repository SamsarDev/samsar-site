# Tarea 07: Cerrar los Huecos que Dejó la Auditoría de Componentes

- **Fase:** 07 — Mantenimiento
- **Estimación:** variable; son bloques independientes (40 + 60 + 40 + 20 + 10 minutos)
- **Documentos de referencia:** [`docs/03-design/03-components.md`](../../03-design/03-components.md) · [`docs/03-design/components/`](../../03-design/components/) · [`ADR-0010`](../../07-decisions/0010-inline-svg-icons-over-package.md) · [`docs/01-product/02-features.md`](../../01-product/02-features.md)

---

## 1. Objetivo Pedagógico

La auditoría de la [tarea 04](04-component-catalog-audit.md) dejó el catálogo **honesto**: cada ficha dice si está implementada, planificada o retirada. Pero al hacerlo aparecieron huecos que no se cerraron, porque cerrarlos exige escribir especificaciones o código, no etiquetas.

La lección es que **documentar un pendiente no es lo mismo que resolverlo**. El catálogo ya no miente; sigue habiendo, sin embargo, componentes reales sin especificar, componentes especificados sin implementar y una decisión de arquitectura aceptada que nadie ejecutó.

Los bloques **A a D** son **independientes**: se pueden abordar por separado y en cualquier orden, y cada uno tiene su propio DoD. El bloque **E** se añadió al alcance a petición del mantenedor y no viene de la auditoría.

---

## 2. Bloque A — Cinco componentes reales sin ficha

`landing/AboutProject.astro`, `landing/CtaSection.astro`, `landing/Hero.astro`, `landing/Pillars.astro` y la isla `islands/ExperienceTimeline.vue` existen y se usan, pero **no tienen especificación de diseño**: la tarea 04 se negó a inventarlas y las declaró pendientes en el índice.

- [ ] Los cinco tienen ficha con el formato del resto del catálogo: propósito, props, elementos o estructura, estados y **Estado**.
- [ ] Cada ficha se escribe **leyendo el componente**, no imaginándolo: props reales, tokens reales, comportamiento real.
- [ ] Los cuatro de `landing/` van en [`docs/03-design/components/03-content.md`](../../03-design/components/03-content.md) (sección de portada).
- [ ] `ExperienceTimeline.vue` va en [`docs/03-design/components/02-layout.md`](../../03-design/components/02-layout.md), junto a las otras dos islas. Si su ficha crece demasiado, decide otro sitio y explica por qué.
- [ ] El índice vuelve a cuadrar: los cinco dejan de estar "sin ficha" y los implementados pasan de 22 a **27**. La nota de componentes pendientes se elimina o se reduce a cero.
- [ ] Ninguna ficha describe una variante ni un estado que el componente no tenga.

---

## 3. Bloque B — `Input` y `CodeBlock`, planificados sin implementar

Ambos están en el catálogo como *Planificado* y con su razón escrita, pero **nadie los ha construido**.

- [ ] **`Input`** (`src/components/ui/Input.astro`): impleméntalo **cuando se aborde la F15** (formulario de contacto), no antes; un campo sin consumidor es código muerto.
  - [ ] Cumple los estados de la matriz de [`03-components.md`](../../03-design/03-components.md) §3: `default`, `:focus-visible`, `error` con mensaje accesible (nunca solo color) y `disabled`.
  - [ ] Su ficha pasa a *Implementado* con la ruta real.
- [ ] **`CodeBlock`** (`src/components/blog/CodeBlock.astro`): **extráelo** de donde vive hoy.
  - [ ] El copiado ya funciona, inyectado inline desde `src/layouts/BlogLayout.astro`; el trabajo es moverlo a un componente y añadirle la cabecera con el lenguaje o el nombre de archivo.
  - [ ] Sin regresión: el botón sigue accesible por teclado, el resaltado lo sigue haciendo Shiki en el build y no se añade JavaScript de más.
  - [ ] Su ficha pasa a *Implementado* con la ruta real.
- [ ] Si decides no hacer alguno de los dos, **retíralo del catálogo con su motivo** en lugar de dejarlo planificado para siempre.

---

## 4. Bloque C — `Icon.astro`, la decisión de ADR-0010 sin ejecutar

[`ADR-0010`](../../07-decisions/0010-inline-svg-icons-over-package.md) decidió un **componente `Icon.astro` interno** que renderiza SVG inline por nombre (no un paquete de iconos). Ese componente **nunca se creó**: hoy cada componente escribe su propio SVG, así que hay diez trazados repartidos por el código.

- [ ] Existe `src/components/ui/Icon.astro` con la prop `name` que describe el ADR.
- [ ] Migra los **iconos de interfaz**, que hoy están aquí: `ThemeToggle.vue` (sol y luna), `MobileMenu.vue` (menú y cerrar), `404.astro`, `contacto.astro` y `experiencia.astro`.
- [ ] **No migres los motivos mayas** de `maya/placeholders/`: son ilustración decorativa, no iconografía de interfaz.
- [ ] Borra los SVG sueltos que queden sin uso tras la migración.
- [ ] Los decorativos llevan `aria-hidden="true"`; los que representan una acción única reciben `aria-label` en su contenedor, como exige la ficha.
- [ ] Su ficha pasa a *Implementado* y `docs/03-design/03-components.md` §1.5 deja de decir "Pendiente".
- [ ] Si al migrar concluyes que el componente central no aporta y los SVG por componente son mejores, **no lo ignores**: redacta un ADR nuevo que supersede al 0010, siguiendo la regla de gobernanza de [`docs/07-decisions/00-INDEX.md`](../../07-decisions/00-INDEX.md) §3.

---

## 5. Bloque D — Fichas que afirman cosas que el componente no hace

Encontradas al redactar esta tarea, no en la auditoría original. Son correcciones pequeñas, pero del mismo tipo que la tarea 04 persigue.

- [ ] **`Footer`** ([`02-layout.md`](../../03-design/components/02-layout.md)): la ficha dice que incluye "iconos accesibles a GitHub, LinkedIn y correo directo" y "leyendas de licencias (MIT, CC BY-NC)". El componente real tiene **tres enlaces de texto** (`GitHub`, `LinkedIn`, `Contacto`) y **ninguna leyenda de licencia**. Corrige la ficha o implementa lo que promete; decide y justifícalo.
- [ ] **`Pagination`** ([`03-content.md`](../../03-design/components/03-content.md)): la ficha promete "estado deshabilitado si no hay página disponible"; el componente **renderiza un hueco** (`<span />`) cuando falta el enlace. Ajusta la ficha a la realidad o implementa el estado.
- [ ] Revisa de paso el resto de fichas buscando el mismo patrón: **afirmaciones de comportamiento que nadie ha comprobado contra el código**. Es el riesgo residual de una auditoría que miró existencia y no comportamiento.

---

## 6. Bloque E — `og:image:alt`, el texto alternativo que faltaba

**Añadido al alcance a petición del mantenedor**; no sale de la auditoría de componentes. Se resolvió en la misma rama por cercanía temática (los metadatos de `BaseLayout`), no porque sea un hueco de componentes.

`BaseLayout.astro` emitía `og:image` y `twitter:image` **sin texto alternativo**. Es el mismo tipo de defecto que persigue esta fase: una etiqueta que promete algo (una imagen) y omite lo que la hace accesible.

- [ ] `BaseLayout.astro` acepta la prop `ogImageAlt` y emite `og:image:alt` y `twitter:image:alt`.
- [ ] El valor por defecto **describe la imagen real** (marca, lema y marco de grecas), no repite el título del sitio.
- [ ] Ninguna página necesita pasar la prop: el valor por defecto es correcto para todas las rutas de hoy.
- [ ] Queda constancia en la [tarea 06](06-og-image-asset.md), que definió el activo. `BaseLayout` **no tiene ficha** en `docs/03-design/`, así que no hay ficha que actualizar.

---

## 7. Comprobación y Verificación

1. `grep -c "^- \*\*Estado:\*\*" docs/03-design/components/*.md` y cuadra la cuenta con la del índice.
2. Ninguna ruta de un *Implementado* puede ser inventada: `git ls-files src/components` debe contenerlas todas.
3. `grep -n "Pendiente\|sin ficha" docs/03-design/03-components.md` no debe devolver nada cuando A y C estén cerrados.
4. Los bloques A y D son documentación; B y C tocan código, así que exigen `bun run check` y `bun run build` antes de darse por terminados.
5. **Aviso:** existe una intermitencia de `check` y `build` según el entorno, con su reparación, en [`00-INDEX.md`](00-INDEX.md) §3.

---

## 8. Pistas Didácticas y Errores Comunes

- **Escribe la ficha leyendo el componente.** El catálogo mentía porque se copió del plan y no del código; si al documentar `Hero.astro` no encuentras una prop que el documento anterior prometía, **gana el código**.
- **No implementes `Input` antes de su consumidor.** Espera a la F15.
- **`CodeBlock` es el caso más didáctico de la fase:** demuestra que una funcionalidad puede existir sin el componente que la documentación promete. Antes de "implementar", comprueba qué ya funciona.
- **Los ADR no son decorativos.** ADR-0010 lleva aceptado desde octubre con una consecuencia sin ejecutar. Una decisión que no se implementa es deuda técnica silenciosa; y si ya no la compartes, se supersede con otro ADR, no se ignora.
- **Distinguir icono de ilustración** te ahorra una migración absurda: los motivos mayas no son iconos de interfaz y no deben pasar por `Icon.astro`.
