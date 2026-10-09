# Tarea 05: Linter Real y Script `lint` Coherente

- **Fase:** 07 — Mantenimiento
- **Estimación:** 60 minutos (incluye la propuesta y su aprobación)
- **Documentos de referencia:** [`package.json`](../../../package.json) · [`README.md`](../../../README.md) · [`AGENTS.md`](../../../AGENTS.md) §5 · [`docs/05-tasks/01-foundation/01-init-astro.md`](../01-foundation/01-init-astro.md)

---

## 1. Objetivo Pedagógico

Aprender a cerrar la brecha entre lo que la documentación promete y lo que el proyecto hace, en el caso más delicado: **herramientas de calidad**. Un script llamado `lint` que en realidad ejecuta el chequeo de tipos es una mentira útil a medias: da falsa confianza y hace creer que existe una red de seguridad de estilo que no está.

Esta tarea agrupa **dos hallazgos con la misma causa raíz** (el script y la documentación que lo describe), por eso se resuelven juntos y no por separado.

---

## 2. Situación actual (verificada)

| Elemento | Estado real |
|---|---|
| `package.json` → `"lint"` | Ejecuta `astro check`, **idéntico** al script `"check"` |
| ESLint / Prettier / Biome | No instalados y sin archivo de configuración en la raíz |
| [`README.md`](../../../README.md) tabla de scripts | Promete "Analiza el código con las reglas de estilo y formato" |
| [`AGENTS.md`](../../../AGENTS.md) §5 | Lista `bun run lint  # linter` |
| [`01-init-astro.md`](../01-foundation/01-init-astro.md) §2 | Exige el script `lint` en los criterios de aceptación, pero el JSON de ejemplo de §3 **no lo incluye** |

---

## 3. Criterios de Aceptación (DoD)

- [ ] Existe una **propuesta escrita** (en el resumen de la tarea o en un issue) que compara al menos dos opciones, indicando: qué problema resuelve cada una, cuántas dependencias añade y de qué tamaño, y qué alternativa nativa existe. **Sin aprobación explícita del responsable del repositorio no se instala nada** (`AGENTS.md` §7.5).
- [ ] Antes de escribir configuración, se verifica en la **documentación oficial** la integración vigente con Astro 7 (la regla de `AGENTS.md` §7.4 para Tailwind aplica igual aquí: las integraciones de linting cambian de versión en versión).
- [ ] Si la propuesta se aprueba:
  - [ ] Las dependencias se añaden con **versiones fijas** en `package.json`.
  - [ ] `bun run lint` deja de ser un alias de `check` y ejecuta el linter real.
  - [ ] Se documenta la configuración creada (archivo y ubicación) en `README.md` y, si cambia el flujo, en `AGENTS.md`.
  - [ ] Se decide **explícitamente** si el linter bloquea o solo advierte en CI ([`.github/workflows/ci.yml`](../../../.github/workflows/ci.yml)), y se documenta la decisión.
  - [ ] [`README.md`](../../../README.md) describe `lint` con lo que realmente hace.
  - [ ] [`AGENTS.md`](../../../AGENTS.md) §5 mantiene la coherencia entre `check` y `lint`.
  - [ ] [`01-init-astro.md`](../01-foundation/01-init-astro.md): los criterios de aceptación y el JSON de ejemplo dejan de contradecirse (o ambos incluyen `lint`, o el criterio deja de exigirlo).
- [ ] Si la propuesta **no** se aprueba: el script `lint` se elimina de `package.json` y `README.md` y `AGENTS.md` dejan de prometer un linter. La documentación nunca debe prometer herramientas que no existen.
- [ ] No se desactiva ninguna regla de TypeScript ni del linter para "hacer pasar" el código existente. Si el linter encuentra errores reales, se corrigen o se documentan como deuda técnica con una tarea propia.

---

## 4. Paso a Paso Guiado

### Paso 1: Confirmar el estado actual

```bash
grep -n '"lint"\|"check"' package.json
git ls-files | grep -iE "eslint|prettier|biome|stylelint"
```

El segundo comando debe salir **vacío**: no hay configuración de linting versionada.

### Paso 2: Redactar la propuesta

Opciones razonables a comparar (elige al menos dos y verifica cada una en su documentación oficial antes de recomendarla):

- **ESLint 9 (flat config) + `eslint-plugin-astro` + `typescript-eslint`:** el estándar del ecosistema, con integración oficial para archivos `.astro`. Coste: varias dependencias y un archivo de configuración.
- **Prettier + `prettier-plugin-astro`:** no busca errores, unifica formato. Es el complemento natural del anterior, no un sustituto.
- **Biome:** una sola dependencia, muy rápido, con formato y linting juntos. Verifica el soporte de `.astro` antes de proponerlo: si no lo soporta, no sirve para este proyecto.
- **No instalar nada:** dejar `astro check` como única red de seguridad, renombrar o eliminar `lint` y corregir la documentación. Es una opción legítima y de coste cero; si el proyecto no necesita reglas de estilo, es la más honesta.

En la propuesta incluye una frase sobre qué **no** cubre la opción elegida. Un linter no valida accesibilidad ni contraste: eso lo cubren `docs/03-design/07-accessibility.md` y la revisión manual.

### Paso 3: Esperar la aprobación

No instales hasta tener el visto bueno. Mientras tanto, esta tarea queda en estado **bloqueada por aprobación**, no en progreso.

### Paso 4: Implementar y documentar

Tras la aprobación: instala con versiones fijas, crea la configuración mínima, apunta `lint` a la herramienta real y actualiza los tres documentos de la sección 2.

---

## 5. Comprobación y Verificación

1. **El script hace lo que dice:** introduce un error deliberado (por ejemplo, una variable sin usar o un `any` explícito) y comprueba que `bun run lint` **falla**. Revierte el error y comprueba que pasa.

2. **`check` sigue funcionando** y no se ha convertido en un alias del linter:

   ```bash
   bun run check
   bun run lint
   ```

3. **CI coherente:** si el linter entra en CI, el workflow debe ejecutarlo; si no, debe quedar escrito por qué.

4. **Documentación sin promesas falsas:** busca menciones a "estilo y formato" en la documentación y confirma que cada una se corresponde con una herramienta real:

   ```bash
   grep -rn "linter\|lint" README.md AGENTS.md docs/05-tasks/01-foundation/
   ```

5. **Aviso:** `check` y `build` pueden fallar de forma intermitente por lo descrito en [`00-INDEX.md`](00-INDEX.md) §3. Esta tarea **sí** necesita una ejecución verde, porque valida una herramienta: si no consigues una, no la cierres y deja dicho qué falta.

---

## 6. Pistas Didácticas y Errores Comunes

- **No confundas linting con type checking.** `astro check` valida tipos y plantillas; un linter busca patrones problemáticos (imports sin usar, `any`, código muerto) y, con Prettier, unifica el formato. Son capas distintas y complementarias.
- **El coste no es solo el `package.json`.** Cada herramienta añade dependencias, tiempo de CI y una configuración que hay que mantener. Si el proyecto es pequeño y didáctico, la opción "no instalar nada y dejar la documentación honesta" es perfectamente defendible. Argumenta, no acumules.
- **Empieza con el conjunto de reglas mínimo.** Activar 300 reglas de golpe sobre un código ya escrito genera cientos de avisos y termina en `// eslint-disable` por todas partes, que es la forma más rápida de destruir la credibilidad de un linter.
- **Una sola tarea, dos hallazgos:** el script engañoso y el criterio contradictorio de la tarea de inicialización comparten causa. Si los separaras, arreglarías uno y dejarías el otro, que es exactamente cómo nacen las incoherencias que esta fase intenta eliminar.
