# Tarea 02: Inventario Real de Islas Interactivas

- **Fase:** 07 — Mantenimiento
- **Estimación:** 25 minutos
- **Documentos de referencia:** [`docs/02-architecture/03-islands.md`](../../02-architecture/03-islands.md) · [`docs/02-architecture/04-performance.md`](../../02-architecture/04-performance.md) · [`src/components/layout/Header.astro`](../../../src/components/layout/Header.astro) · [`src/pages/experiencia.astro`](../../../src/pages/experiencia.astro)

---

## 1. Objetivo Pedagógico

Cada isla interactiva cuesta JavaScript, CPU y una decisión de hidratación. Por eso el inventario de islas es un documento de arquitectura, no una lista decorativa: si dice "dos" cuando hay "tres", el presupuesto de rendimiento y la conversación sobre coste de JS quedan sin base. Aquí aprenderás a **auditar el inventario contra el código** y a distinguir una cifra medida de una cifra inventada.

---

## 2. Criterios de Aceptación (DoD)

- [ ] `docs/02-architecture/03-islands.md` §2 ya no afirma que el sitio opera con "exactamente **dos** islas reactivas": el número y la prosa reflejan las **tres** reales.
- [ ] La tabla incluye `ExperienceTimeline.vue` con su directiva real `client:visible` (usada en `src/pages/experiencia.astro`, línea 56) y una justificación: es un componente *below-the-fold*, así que su bundle no debe competir con el LCP.
- [ ] Se confirman las directivas de las otras dos islas, ambas en `src/components/layout/Header.astro` (líneas 28 y 29): `ThemeToggle` con `client:idle` y `MobileMenu` con `client:idle`.
- [ ] La cifra de presupuesto de JavaScript (`< 15 KB`) se **mide** o se **retira**. No se deja como estaba si no puedes respaldarla: si no hay forma de medirla hoy, sustitúyela por una referencia al presupuesto objetivo de [`04-performance.md`](../../02-architecture/04-performance.md) y deja claro que es un objetivo, no una medición. **Y comprueba el objetivo antes de confiar en él:** si al medir descubres que el techo documentado es inalcanzable, el hallazgo es el presupuesto y no tu trabajo — corrígelo en `04-performance.md` dejando la medición escrita (ver la pista en §5).
- [ ] §5 (islas planificadas para post-MVP) sigue siendo correcto respecto a `docs/01-product/02-features.md`: buscador en cliente (F14) y formulario de contacto (F15).
- [ ] El documento explica en una frase **por qué** `ExperienceTimeline` no necesita `client:load`, para que la regla de hidratación perezosa quede enseñada y no solo listada.
- [ ] El inventario se puede reproducir con el comando de §4.

---

## 3. Paso a Paso Guiado

### Paso 1: Listar las islas reales

Busca los componentes Vue hidratados, que son los únicos que envían JavaScript propio:

```bash
# Islas definidas (componentes Vue)
git ls-files src/components/islands

# Puntos de hidratación (dónde y con qué directiva)
grep -rn "client:" src --include="*.astro"
```

Deberías obtener **tres** resultados: `ThemeToggle client:idle` y `MobileMenu client:idle` en el header, y `ExperienceTimeline client:visible` en la página de experiencia.

### Paso 2: Verificar cada directiva

Para cada isla, responde: ¿necesita estar disponible en el primer render? Si la respuesta es no, `client:idle` o `client:visible` es correcto y hay que justificarlo en la tabla. Si alguien propusiera `client:load`, la tarea sería justificar por qué (ver la regla en `AGENTS.md` §7.1).

### Paso 3: Corregir §2

Actualiza el número de islas, la frase de introducción y la tabla. Añade la fila de `ExperienceTimeline` con: archivo, responsabilidad, directiva y justificación.

### Paso 4: Resolver la cifra de bundle

Tienes dos caminos válidos, y debes elegir uno de forma explícita:

- **Medir:** inspecciona el JavaScript emitido en `dist/_astro/` tras un build y anota el peso real **en gzip**, que es como viaja por la red (el tamaño en disco exagera la cifra entre dos y tres veces). Desglosa por chunk y **separa el runtime del framework de las islas**: son costes de naturaleza distinta y mezclarlos produce un presupuesto que no puedes mejorar. Si el build no está disponible en tu entorno (ver [`00-INDEX.md`](00-INDEX.md) §3), este camino no está disponible.
- **Retirar la cifra:** elimina el número concreto y deja la referencia al presupuesto objetivo de `04-performance.md`.

Lo que **no** es válido es dejar `< 15 KB` porque "suena bien".

---

## 4. Comprobación y Verificación

1. Repite el comando de hidratación y confirma que el número de filas de la tabla coincide con el número de resultados:

   ```bash
   grep -rn "client:" src --include="*.astro"
   ```

2. Comprueba que no queda ninguna afirmación numérica sin respaldo:

   ```bash
   grep -n "islas\|KB" docs/02-architecture/03-islands.md
   ```

3. Verifica que `03-islands.md` y `04-performance.md` no se contradigan respecto al peso del JS inicial. Si se contradicen, no elijas por tu cuenta: repórtalo (regla de `AGENTS.md` §4).

---

## 5. Pistas Didácticas y Errores Comunes

- **¿Por qué el documento decía "dos"?** Cuando se escribió, el MVP tenía solo el toggle de tema y el menú móvil. En la Fase 5 se añadió la línea temporal de experiencia y nadie volvió a este documento. Es el patrón típico: **la documentación de arquitectura envejece cuando una fase posterior añade una pieza transversal**.
- **Contar islas no es contar componentes Vue:** un componente `.vue` sin directiva `client:*` se renderiza en el servidor y no envía JavaScript de isla. El inventario lista **islas hidratadas**.
- **`client:visible` vs `client:idle`:** `visible` espera a que el elemento entre en el viewport (`IntersectionObserver`); `idle` espera a que el hilo principal esté libre. Para contenido bajo el pliegue, `visible` es más perezoso y por eso es el correcto aquí.
- **No conviertas esta tarea en un rediseño:** si al auditar concluyes que una isla debería dejar de serlo (por ejemplo, resolver el menú móvil con `details`/`summary`), **no lo hagas aquí**: abre una tarea nueva. Aquí solo se corrige la documentación.
- **Mide el objetivo antes de confiar en él:** esta tarea daba por hecho que el presupuesto de `04-performance.md` era correcto y que solo faltaba documentarlo. Al medir el build real, el techo de `< 15 KB` resultó inalcanzable: **solo el runtime de Vue pesa 26.4 KB gzip**. Un presupuesto que nadie ha medido es una intención, no un dato. Si al comprobarlo no se cumple, el hallazgo es el presupuesto —no tu trabajo—, y corregirlo o partirlo en métricas accionables forma parte de la tarea. Este es el error más caro de la documentación técnica: cifras heredadas que se copian de documento en documento y que nadie puede cumplir porque nadie las midió.
