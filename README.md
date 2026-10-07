# Samsar | Sitio web personal

> Código, cultura y curiosidad.

Sitio web personal de **Samuel Sarmientos / Samsar**: un blog técnico, un portafolio y un cuaderno de proyectos, con identidad visual inspirada en la cultura maya y temas oscuro y claro.

Este repositorio tiene un segundo propósito: es un **proyecto de ejemplo para clases**. Se construye desde cero con agentes de IA, y toda su documentación está pensada para que estudiantes y agentes puedan seguir el proceso paso a paso.

---

## 📖 Qué contiene el sitio

| Sección | Descripción |
|---|---|
| **Samsar\|Dev** | Guías de desarrollo, arquitectura, patrones y notas de ingeniería |
| **Samsar\|IA** | IA generativa, LLMs, agentes, RAG y MCP |
| **Samsar\|Games** | Videojuegos y juegos educativos |
| **Proyectos** | Catálogo filtrable: profesionales, open source, juegos y experimentos de IA |
| **Experiencia** | Trayectoria profesional y CV descargable |
| **Sobre mí** | Presentación personal |

---

## 🧱 Stack tecnológico

| Capa | Tecnología |
|---|---|
| Generador de sitio | [Astro](https://astro.build) 6 (SSG) |
| Interactividad | Islas [Vue](https://vuejs.org) 3 |
| Estilos | Tailwind CSS v4 + tokens CSS |
| Contenido | Markdown / MDX con Content Collections |
| Hosting | Cloudflare Pages |

Por qué se eligió cada pieza: [`docs/07-decisions/`](docs/07-decisions/).

---

## ⚡ Inicio rápido

> ℹ️ **Nota de estado:** El proyecto está en fase de documentación y planificación. Estos pasos aplican cuando se complete la tarea de inicialización ([`docs/05-tasks/01-foundation/`](docs/05-tasks/01-foundation/)).

**Requisitos:** Node.js 22+ (o runtime compatible) y Git. Se recomienda **[Bun](https://bun.sh)** o **[pnpm](https://pnpm.io)** por velocidad y eficiencia de dependencias, manteniendo total compatibilidad con **npm**.

```bash
# 1. Clonar el repositorio
git clone https://github.com/samsar-dev/samsar-site.git
cd samsar-site

# 2. Instalar dependencias (Recomendado: Bun o pnpm)
bun install         # o: pnpm install | npm install

# 3. Iniciar servidor local
bun dev             # o: pnpm dev | npm run dev
```

El sitio quedará disponible en `http://localhost:4321`.

### 🛠️ Scripts disponibles

| Script | Bun (Recomendado) | npm | Descripción |
|---|---|---|---|
| **Desarrollo** | `bun dev` | `npm run dev` | Inicia el servidor local de desarrollo con recarga rápida |
| **Build** | `bun run build` | `npm run build` | Compila el sitio estático para producción |
| **Preview** | `bun run preview` | `npm run preview` | Previsualiza localmente el build generado |
| **Chequeo** | `bun run check` | `npm run check` | Ejecuta Astro Check (validación estricta de tipos y plantillas) |
| **Linter** | `bun run lint` | `npm run lint` | Analiza el código con las reglas de estilo y formato |

---

## 📚 Documentación

Toda la documentación vive en [`docs/`](docs/00-INDEX.md). Empieza por el índice, que incluye la **ruta de lectura para estudiantes**.

| Si quieres... | Lee |
|---|---|
| Entender qué es el proyecto y por qué existe | [`docs/01-product/`](docs/01-product/) |
| Conocer el stack y la estructura técnica | [`docs/02-architecture/`](docs/02-architecture/) |
| Saber cómo se ve y por qué | [`DESIGN.md`](DESIGN.md) y [`docs/03-design/`](docs/03-design/) |
| Aprender las convenciones de trabajo | [`docs/04-process/`](docs/04-process/) |
| Empezar a construir | [`docs/05-tasks/`](docs/05-tasks/) |
| Resolver una acción repetitiva | [`docs/06-playbooks/`](docs/06-playbooks/) |

Archivos en la raíz:

| Archivo | Para quién | Contenido |
|---|---|---|
| [`AGENTS.md`](AGENTS.md) | Agentes de IA | Reglas de trabajo (fuente única) |
| [`CLAUDE.md`](CLAUDE.md) | Claude Code | Importa `AGENTS.md` |
| [`SKILL.md`](SKILL.md) | Estudiantes y agentes | Skills recomendadas y cómo instalarlas |
| [`DESIGN.md`](DESIGN.md) | Todos | Resumen del sistema visual |

---

## 🤖 Trabajar con agentes de IA

El proyecto está pensado para usarse con distintos agentes: **OpenCode, Codex, Claude Code y Antigravity**. Todos leen las mismas reglas desde `AGENTS.md`, así que puedes cambiar de agente sin cambiar de método.

Los agentes responden en español y escriben el código en inglés. Antes de pedirle algo a un agente, lee [`docs/04-process/02-working-with-agents.md`](docs/04-process/02-working-with-agents.md).

---

## 🌐 Convenciones de idioma

| Qué | Idioma |
|---|---|
| Código, comentarios, commits, nombres de archivos | Inglés |
| Documentación, contenido del sitio, respuestas de los agentes | Español |

---

## ⚖️ Licencia

Este repositorio combina varias licencias, según el tipo de material:

| Material | Licencia |
|---|---|
| **Código fuente** y arquitectura de software | [MIT](LICENSE), con exclusión de marca e identidad |
| **Documentación** (`docs/`, `DESIGN.md`, `SKILL.md`) | [CC BY-NC 4.0](LICENSE-DOCS) |
| **Contenido** (posts, textos del sitio, imágenes propias) | [CC BY-NC-ND 4.0](LICENSE-CONTENT) |
| **SVG mayas decorativos** (`src/components/maya/`) | Todos los derechos reservados ([aviso](src/components/maya/NOTICE.md)) |
| **Nombre, identidad y marca** | Reservados (ver [`LICENSE`](LICENSE)) |

**Si haces fork o clonas este proyecto**, reemplaza el nombre, la identidad, el contenido y los SVG mayas por los tuyos. La documentación puede adaptarse libremente para fines **no comerciales**; no puede usarse en cursos de pago.

---

## 👤 Autor

**Samuel Sarmientos / Samsar** · Guatemala  
[GitHub](https://github.com/samsar-dev) · [LinkedIn](#) · samsar.dev@gmail.com

---

*Hecho con cariño en Guatemala.*
