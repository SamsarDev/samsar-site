# Tarea 03: Alinear el Patrón Anti-FOUC con el Código Real

- **Fase:** 07 — Mantenimiento
- **Estimación:** 25 minutos
- **Documentos de referencia:** [`docs/08-learning/06-design-patterns-astro-vue.md`](../../08-learning/06-design-patterns-astro-vue.md) §2 · [`docs/02-architecture/03-islands.md`](../../02-architecture/03-islands.md) §3 · [`src/layouts/BaseLayout.astro`](../../../src/layouts/BaseLayout.astro) · [`src/styles/theme.css`](../../../src/styles/theme.css)

---

## 1. Objetivo Pedagógico

Un patrón didáctico mal explicado es peor que no tener documentación: el estudiante copia el snippet, no ve ningún cambio en pantalla y no entiende por qué. Aquí vas a comparar el **mecanismo real de temas** de este proyecto (atributo `data-theme` + custom properties) con el que enseña el módulo (clase `.dark`) y a corregir la explicación, incluyendo el *porqué*.

---

## 2. Criterios de Aceptación (DoD)

- [ ] El snippet de `docs/08-learning/06-design-patterns-astro-vue.md` §2 usa `document.documentElement.setAttribute('data-theme', theme)`, igual que `src/layouts/BaseLayout.astro` (línea 59).
- [ ] El snippet conserva el resto del comportamiento real: clave `'theme'` en `localStorage` y respaldo a `window.matchMedia('(prefers-color-scheme: dark)')` (líneas 56 a 58 de `BaseLayout.astro`).
- [ ] El documento explica **por qué** este proyecto no usa una clase `.dark`: los temas se resuelven con los selectores `[data-theme='dark']` y `[data-theme='light']` de `src/styles/theme.css` (líneas 4 y 52), de modo que añadir una clase `.dark` al `<html>` no tendría ningún efecto visual.
- [ ] No queda ninguna mención a `.dark` presentada como parte del patrón del sitio. Si se conserva como comparación, debe decir explícitamente que **no** es el mecanismo de este proyecto.
- [ ] `docs/02-architecture/03-islands.md` §3 y el módulo de aprendizaje describen el **mismo** mecanismo (mismo atributo, misma clave de `localStorage`, misma estrategia `<script is:inline>`).
- [ ] Se añade una nota de mantenimiento del tipo: "si cambias el mecanismo de tema, actualiza `BaseLayout.astro`, `03-islands.md` y este módulo".

---

## 3. Paso a Paso Guiado

### Paso 1: Verificar el mecanismo real

Lee el script anti-FOUC y los selectores de tema:

```bash
sed -n '53,61p' src/layouts/BaseLayout.astro
grep -n "data-theme" src/styles/theme.css
```

Verás que el script escribe un **atributo** en `<html>` y que el CSS resuelve los tokens con selectores de atributo. Anota también la clave de `localStorage` y el respaldo del sistema operativo.

### Paso 2: Reescribir el snippet del módulo

Sustituye el bloque actual (el que usa `classList.add('dark')` / `classList.remove('dark')`) por el mecanismo real. Mantén el estilo didáctico: comentario que explique que se ejecuta antes del primer pintado.

### Paso 3: Explicar el porqué (la parte importante)

Añade 2 o 3 frases que conecten este patrón con el sistema de tokens:

- El tema **no** es una clase de Tailwind ni un archivo CSS distinto: son custom properties que cambian de valor según `[data-theme]`.
- Por eso los componentes usan tokens semánticos (`var(--bg-primary)`, `var(--text-primary)`) y nunca colores fijos: así el cambio de tema no requiere tocar ni un componente.
- El script va `is:inline` (sin empaquetar, sin diferir) para que el atributo exista antes del primer pintado; de ahí que no haya FOUC.

### Paso 4: Cotejar los dos documentos

Compara tu snippet con el de `03-islands.md` §3. Si difieren en algo (atributo, clave, estrategia), unifica el criterio y deja el mismo código en ambos.

---

## 4. Comprobación y Verificación

1. **Comparación textual:** el atributo y la clave de `localStorage` del documento deben coincidir carácter por carácter con el código. Diferencias como `'theme'` vs `'color-theme'` romperían el toggle en silencio.

2. **Prueba manual** (requiere el servidor de desarrollo):

   ```bash
   bun run dev
   ```

   - Abre el sitio, cambia a tema oscuro, recarga y comprueba que **no hay parpadeo**.
   - Con las herramientas de desarrollo, inspecciona el elemento `<html>`: debe llevar `data-theme="dark"` (o `"light"`), **no** una clase `dark`.

3. Comprueba que no queda la clase `.dark` como parte del patrón:

   ```bash
   grep -rn "classList.*dark\|className.*dark" docs/ src/ --exclude-dir=07-maintenance
   ```

   La exclusión es necesaria: las instrucciones de esta misma tarea citan el patrón antiguo a propósito, así que sin ella el comando se encuentra a sí mismo.

---

## 5. Pistas Didácticas y Errores Comunes

- **De dónde salió el snippet con `.dark`:** es el ejemplo más común en tutoriales de Tailwind (`darkMode: 'class'`). Es correcto en proyectos que usan la variante `dark:` de Tailwind, pero **este proyecto no usa esa variante**: usa tokens semánticos en custom properties. Copiar el ejemplo de un framework distinto es un error clásico y muy didáctico de comentar.
- **Atributo vs clase:** ambos funcionan. La diferencia práctica es que `[data-theme]` permite más de dos temas (`data-theme="sepia"`) sin tocar el JavaScript, y expresa el estado en el DOM de forma legible. Lo importante no es cuál es "mejor", sino que **el documento describa el que el código usa**.
- **No cambies el mecanismo en esta tarea.** Sería tentador "unificar" hacia la clase `.dark` porque el ejemplo es más famoso. Eso implicaría tocar `theme.css` (prohibido sin que la tarea lo indique) y romper el sistema de tokens. Aquí solo se corrige la documentación.
- **Cuidado con el `<html>` sin JavaScript:** si el atributo no se establece, el sitio debe seguir siendo legible. Verifica que `theme.css` define un tema por defecto razonable para que un fallo del script no deje la página sin estilos.
