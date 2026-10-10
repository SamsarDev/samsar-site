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
- **Ventajas:** cubre linting **y** formato, que es lo que la documentación prometía; `eslint-plugin-astro` es el plugin de facto y su versión actual se prueba contra Astro 7; Prettier ya estaba en el árbol como dependencia transitiva, así que declararlo no añade peso nuevo; deja la puerta abierta a reglas de accesibilidad.
- **Desventajas:** cinco dependencias directas y decenas transitivas (solo ESLint declara 29) sobre un `node_modules` que ya pesa cientos de megabytes.

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

---

## 5. Consecuencias y Compromisos

- **Impacto positivo:** la documentación deja de prometer algo falso; `lint` y `check` pasan a ser capas distintas y complementarias; el CI gana una red que atrapa errores reales.
- **Compromisos asumidos:** más dependencias y tres archivos de configuración que mantener (`eslint.config.mjs`, `.prettierrc`, `.prettierignore`); el primer formateo toca 49 archivos de una sola vez, y se aísla en su propio commit para no enterrar los cambios reales.
  - **Nota de versión:** `eslint-plugin-astro` 3.2.1 declara Node `^22.22.3 || ^24.16.0 || >=26.3.0`. Instala y funciona en el runtime local (24.15.0), pero conviene alinear `.node-version` con una versión que cumpla ese rango.
- **Regla de implementación:** el ruleset se mantiene **mínimo**. Para añadir una regla, primero hay que comprobar que el código actual la cumple o corregirlo; queda prohibido silenciarla con `eslint-disable` para "hacer pasar" un cambio (`AGENTS.md` §9). La documentación se formatea a mano: Prettier ignora `docs/`, `README.md` y el contenido, porque reformatear prosa reflowaría tablas y párrafos enteros.
