# Índice de la documentación

Este es el punto de entrada a toda la documentación del proyecto. Si no sabes por dónde empezar, estás en el lugar correcto.

---

## 1. Ruta de lectura para estudiantes

Lee estos documentos **en orden**. Los pasos 1 a 6 son lectura (aproximadamente una hora). El paso 7 es el trabajo real.

| # | Documento | Qué aprenderás | Tiempo |
|---|---|---|---|
| 1 | [`README.md`](../README.md) | Qué es el proyecto y cómo se levanta | 5 min |
| 2 | [`01-product/01-vision.md`](01-product/01-vision.md) | Para qué existe el sitio y para quién | 10 min |
| 3 | [`02-architecture/01-overview.md`](02-architecture/01-overview.md) | Con qué se construye y por qué | 10 min |
| 4 | [`03-design/01-tokens.md`](03-design/01-tokens.md) | Cómo se ve: color, tipografía, espaciado | 10 min |
| 5 | [`04-process/01-conventions.md`](04-process/01-conventions.md) | Cómo escribimos código y commits | 10 min |
| 6 | [`04-process/02-working-with-agents.md`](04-process/02-working-with-agents.md) | Cómo trabajar con agentes de IA | 15 min |
| 7 | [`05-tasks/01-foundation/`](05-tasks/01-foundation/00-INDEX.md) | Empezar a construir | Variable |

> Antes del paso 6, revisa [`SKILL.md`](../SKILL.md) para instalar las skills recomendadas en tu agente.

---

## 2. "Si necesito X, leo Y"

| Necesito... | Documento |
|---|---|
| Saber qué debe tener cada pantalla | [`01-product/03-screens.md`](01-product/03-screens.md) |
| Saber qué funcionalidades entran en el MVP | [`01-product/02-features.md`](01-product/02-features.md) |
| Escribir un post o definir el esquema de contenido | [`01-product/04-content-model.md`](01-product/04-content-model.md) |
| Decidir si algo es `.astro` o isla Vue | [`02-architecture/03-islands.md`](02-architecture/03-islands.md) |
| Saber dónde va cada archivo del código | [`02-architecture/02-project-structure.md`](02-architecture/02-project-structure.md) |
| Conocer los presupuestos de rendimiento | [`02-architecture/04-performance.md`](02-architecture/04-performance.md) |
| Desplegar el sitio | [`02-architecture/05-deployment.md`](02-architecture/05-deployment.md) |
| Usar un color, fuente o espaciado | [`03-design/01-tokens.md`](03-design/01-tokens.md) |
| Construir o modificar un componente | [`03-design/03-components.md`](03-design/03-components.md) |
| Animar algo | [`03-design/05-motion.md`](03-design/05-motion.md) |
| Usar un motivo maya | [`03-design/06-maya-motifs.md`](03-design/06-maya-motifs.md) |
| Verificar accesibilidad | [`03-design/07-accessibility.md`](03-design/07-accessibility.md) |
| Saber si mi tarea está terminada | [`04-process/03-definition-of-done.md`](04-process/03-definition-of-done.md) |
| Entender un término | [`04-process/04-glossary.md`](04-process/04-glossary.md) |
| Resolver un error | [`04-process/05-troubleshooting.md`](04-process/05-troubleshooting.md) |
| Crear un componente, isla, página o post | [`06-playbooks/`](06-playbooks/) |
| Entender por qué se tomó una decisión | [`07-decisions/`](07-decisions/) |
| Ver un ejemplo bien hecho | [`examples/`](../examples/README.md) |

---

## 3. Mapa de carpetas

| Carpeta | Pregunta que responde | Se lee en orden |
|---|---|---|
| [`01-product/`](01-product/) | ¿Qué estamos construyendo y para quién? | Sí |
| [`02-architecture/`](02-architecture/) | ¿Cómo está construido técnicamente? | Sí |
| [`03-design/`](03-design/) | ¿Cómo se ve y se comporta? | Sí |
| [`04-process/`](04-process/) | ¿Cómo trabajamos? | Sí |
| [`05-tasks/`](05-tasks/) | ¿Qué hago ahora? | Sí, por fases |
| [`06-playbooks/`](06-playbooks/) | ¿Cómo hago esta acción repetitiva? | No, se consultan |
| [`07-decisions/`](07-decisions/) | ¿Por qué se decidió así? | No, cronológicos |
| [`08-learning/`](08-learning/) | ¿Qué concepto se aprende en cada fase? | Sí |
| [`99-reference/`](99-reference/) | Material original de investigación | No usar para trabajar |

---

## 4. Estado de la documentación

| Sección | Estado |
|---|---|
| `README.md`, `AGENTS.md`, `CLAUDE.md` | Listo |
| `DESIGN.md` (raíz, condensado v1.2) | Listo |
| `SKILL.md` | Listo |
| `01-product/` | Listo |
| `02-architecture/` | Listo |
| `03-design/` | Listo |
| `04-process/` | Listo |
| `05-tasks/` | Listo (Fases 1 a 6 — MVP Completo) |
| `06-playbooks/` | Pendiente |
| `07-decisions/` | Listo |
| `08-learning/` | Listo |
| `99-reference/` | Listo (originales v1.1) |

> Si sigues un enlace y el archivo no existe todavía, es porque aún no se ha redactado. **No lo inventes**: avisa para que se complete.

---

## 5. Reglas de la documentación

Estas reglas mantienen la documentación utilizable, tanto para personas como para agentes con contexto limitado.

1. **Cada dato vive en un solo lugar.** Los demás documentos lo enlazan, no lo copian.
2. **Ningún documento de trabajo supera unas 300 líneas.** Si lo supera, se divide.
3. **Los nombres de archivo van en inglés; el contenido, en español.**
4. **Los tokens de diseño se implementan en `src/styles/theme.css`.** Ese archivo es la verdad de implementación; los documentos explican el porqué.
5. **Cada carpeta con flujo de lectura tiene un `00-INDEX.md`** con: qué cubre, orden recomendado y para qué tarea consultarla.
6. **`99-reference/` no se edita.** Es el archivo histórico de la investigación.
7. **Si dos documentos se contradicen, se reporta.** No se elige por cuenta propia.

### Qué hacer si encuentras un error en la documentación

1. Verifica que no sea un malentendido (relee el documento y su índice).
2. Si es una contradicción o un dato desactualizado, abre un issue o avisa al instructor.
3. No lo corrijas en `99-reference/`.

---

## 6. Para agentes de IA

Si eres un agente, tus reglas están en [`AGENTS.md`](../AGENTS.md). Los documentos de trabajo son los de las carpetas `01` a `08`. Nunca uses `99-reference/` como fuente para implementar.