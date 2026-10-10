# ADR-0011: ESLint y Prettier con Reglas Mínimas sobre `astro check`

- **Estado:** Aceptado
- **Fecha:** 2026-10-09
- **Decisores:** Samuel Sarmientos / Samsar
- **Documento relacionado:** [`AGENTS.md`](../../AGENTS.md) §5 y §7.5 · [`docs/05-tasks/07-maintenance/05-real-linter.md`](../05-tasks/07-maintenance/05-real-linter.md) · [`package.json`](../../package.json) · [`eslint.config.mjs`](../../eslint.config.mjs)

---

## 1. Contexto y Problema

El script `lint` de `package.json` ejecutaba `astro check`, **idéntico** al script `check`, y no había ningún linter configurado. La documentación, en cambio, prometía "reglas de estilo y formato": una promesa que nadie cumplía.

`astro check` valida tipos y plantillas, pero no detecta imports o variables sin usar, ni `any` explícito, ni problemas de formato. `lint` y `check` no son lo mismo, y la Fase 7 existe precisamente para eliminar promesas que el código no respalda.

---

## 2. Factores de Decisión

- **Política de dependencias mínimas** (`AGENTS.md` §7.5): cada paquete nuevo debe justificar su coste.
- **Honestidad documental:** la opción elegida debía dejar la documentación verdadera, no solo el script.
- **Compatibilidad real:** Astro 7, TypeScript 5.7, ESLint 10 y el runtime de Node disponible.
- **Evitar el "linter que llora":** un ruleset grande sobre código ya escrito produce cientos de avisos, termina lleno de `eslint-disable` y destruye su propia credibilidad.

---

## 3. Opciones Consideradas

### Opción 1: ESLint 10 + `eslint-plugin-astro` + `typescript-eslint`, con Prettier y `prettier-plugin-astro` (Seleccionada)
- **Ventajas:** cubre linting **y** formato, que es lo que la documentación prometía; `eslint-plugin-astro` es el plugin de facto y su versión actual se prueba contra Astro 7; Prettier ya estaba en el árbol como dependencia transitiva, así que declararlo no añade peso nuevo; y permite activar 34 reglas de accesibilidad sobre las plantillas, que es una regla no negociable del proyecto.
- **Desventajas:** seis dependencias directas y decenas transitivas (solo ESLint declara 29) sobre un `node_modules` que ya pesa cientos de megabytes.

### Opción 2: Biome 2.x en solitario
- **Ventajas:** una sola dependencia; linting y formato en la misma herramienta, muy rápida.
- **Desventajas:** su soporte de `.astro` es **experimental** desde la v2.3 y exige opt-in explícito para linting y formato; no admite plugins en `.astro`, así que no hay reglas de accesibilidad. En un repositorio que acaba de eliminar promesas falsas, adoptar algo experimental reintroduce riesgo de ruido.

### Opción 3: No instalar nada y corregir la documentación
- **Ventajas:** coste cero; perfectamente defendible en un proyecto didáctico.
- **Desventajas:** renuncia a detectar imports sin usar, `any` explícito y formato; el script `lint` desaparece.

---

## 4. Decisión Adoptada

Se adopta la **Opción 1** con un ruleset **mínimo** (`typescript-eslint` recommended + `eslint-plugin-astro` recommended) y **bloqueante en CI**, dentro del job existente, de modo que un error de lint impide el merge. El formato se aplica en un commit mecánico aparte, para que el ruido del primer `prettier --write` no se mezcle con la lógica.

Se decidió con evidencia y no con preferencias: antes de comprometerse se instaló y se ejecutó. Con ese ruleset, ESLint sale **limpio sobre el código actual** y **falla** ante un `any` explícito o una variable sin usar, tanto en archivos `.ts` como `.astro`.

La accesibilidad se cubre con `eslint-plugin-jsx-a11y-x`, **no** con el clásico `eslint-plugin-jsx-a11y`: el clásico declara el peer `eslint ^3 … ^9` y por tanto **no admite ESLint 10**. El fork mantenido sí (`^9 || ^10`), pesa menos (267 KB frente a 753 KB) y deja menos dependencias nuevas. Se activa el config `jsx-a11y-recommended` del plugin de Astro, con 34 reglas.

Aquí también se midió antes de decidir: con las 34 reglas activas el sitio actual **no produce ni un solo hallazgo**, y un archivo de prueba con una imagen sin `alt` **falla** con `astro/jsx-a11y/alt-text`. La red existe, el código la cumple y hay prueba de que no está de adorno.

---

## 5. Consecuencias y Compromisos

- **Impacto positivo:** la documentación deja de prometer algo falso; `lint` y `check` pasan a ser capas distintas y complementarias; el CI gana una red que atrapa errores reales; y la accesibilidad deja de depender solo de la revisión manual, con 34 reglas estáticas vigilando cada PR.
- **Compromisos asumidos:** más dependencias y tres archivos de configuración que mantener (`eslint.config.mjs`, `.prettierrc`, `.prettierignore`); el primer formateo toca 42 archivos de una sola vez, y se aísla en su propio commit para no enterrar los cambios reales.
  - **Las reglas de accesibilidad son estáticas:** detectan patrones (imagen sin `alt`, roles ARIA mal usados, encabezados vacíos), pero **no** miden contraste real ni el DOM renderizado. Eso sigue exigiendo revisión manual y las pautas de [`docs/03-design/07-accessibility.md`](../03-design/07-accessibility.md).
  - **Nota de versión:** `eslint-plugin-astro` 3.2.1 declara Node `^22.22.3 || ^24.16.0 || >=26.3.0`, por encima del pin original (`22.14.0`). Al adoptar el linter se actualizó `.node-version` a **24.21.0**, que cumple ese rango y que Cloudflare Pages soporta.
- **Regla de implementación:** el ruleset se mantiene **mínimo**. Para añadir una regla, primero hay que comprobar que el código actual la cumple o corregirlo; queda prohibido silenciarla con `eslint-disable` para "hacer pasar" un cambio (`AGENTS.md` §9). La documentación se formatea a mano: Prettier ignora `docs/`, `README.md` y el contenido, porque reformatear prosa reflowaría tablas y párrafos enteros.
