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
| Generador de sitio | [Astro](https://astro.build) 7 (SSG) |
| Interactividad | Islas [Vue](https://vuejs.org) 3 |
| Estilos | Tailwind CSS v4 + tokens CSS |
| Contenido | Markdown / MDX con Content Collections |
| Hosting | Cloudflare Pages |
| Runtime y paquetes | Node.js 22.14.0 (fijado en `.node-version`) + [Bun](https://bun.sh) (alternativa: npm) |

Por qué se eligió cada pieza: [`docs/07-decisions/`](docs/07-decisions/).

---

## 🚦 Estado del proyecto

**MVP completo.** Las 6 fases de [`docs/05-tasks/`](docs/05-tasks/00-INDEX.md) están cerradas: fundación, landing, blog, portafolio, perfil/experiencia y producción (SEO, RSS, sitemap, cabeceras de caché y guía de despliegue en Cloudflare Pages).

- **Astro 7** (declarado `^7.3.6`), con Tailwind v4, Vue 3 y MDX según el stack de arriba.
- **12 archivos** en `src/pages/`, incluidas las rutas dinámicas `/blog/[...slug]`, `/blog/tags/[tag]`, `/proyectos/[type]`, además de `/404` y `rss.xml`.
- **3 islas Vue** con hidratación perezosa: `ThemeToggle`, `MobileMenu` y `ExperienceTimeline`.
- **CI en GitHub Actions** ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)): `bun run check` y `bun run build` en cada push y PR a `main`.

Lo pendiente es post-MVP y está catalogado en [`docs/01-product/02-features.md`](docs/01-product/02-features.md): buscador en cliente (F14), formulario de contacto (F15), embeds interactivos (F20), entre otros.

También hay una fase de mantenimiento abierta, [`docs/05-tasks/07-maintenance/`](docs/05-tasks/07-maintenance/00-INDEX.md), con tareas para alinear la documentación con el código real: estructura de carpetas, inventario de islas, patrón anti-FOUC, catálogo de componentes y un linter de verdad. Incluye además crear la imagen Open Graph que `BaseLayout` usa por defecto y hoy no existe, y cerrar los huecos que dejó la auditoría del catálogo (componentes reales sin ficha, un `Icon.astro` decidido en un ADR y nunca creado, y fichas que prometen comportamiento inexistente).

---

## ⚡ Inicio rápido

**Requisitos:** Node.js 22.14.0 (versión fijada en `.node-version`; Astro 7 exige `>= 22.12.0`) y Git. El gestor de paquetes del proyecto es **[Bun](https://bun.sh)**, con **npm** como alternativa.

```bash
# 1. Clonar el repositorio
git clone https://github.com/samsar-dev/samsar-site.git
cd samsar-site

# 2. Instalar dependencias (Bun recomendado; alternativa: npm)
bun install         # o: npm install

# 3. Iniciar el servidor local
bun run dev         # o: npm run dev
```

El sitio quedará disponible en `http://localhost:4321`.

### 🛠️ Scripts disponibles

| Script | Bun (Recomendado) | npm | Descripción |
|---|---|---|---|
| **Desarrollo** | `bun run dev` | `npm run dev` | Inicia el servidor local de desarrollo con recarga rápida |
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
