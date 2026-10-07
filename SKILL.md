# SKILL.md

Guía de habilidades (skills) para estudiantes y agentes de IA que trabajan en el desarrollo de **Samsar | Sitio web personal**.

---

## 1. ¿Qué es una skill?

En el desarrollo de software asistido por IA, una **skill** (habilidad) es un paquete modular de instrucciones especializadas, scripts de validación, flujos de trabajo y referencias técnicas que extiende las capacidades operativas de un agente. En lugar de sobrecargar el contexto global del agente con cientos de reglas genéricas, una skill inyecta conocimiento profundo sobre un dominio específico justo cuando la tarea lo requiere (por ejemplo, al manipular archivos Astro, maquetar con Tailwind v4 o auditar accesibilidad).

Para este proyecto, las skills funcionan como un puente didáctico y arquitectónico: garantizan que cualquier agente (Claude Code, OpenCode, Codex, Antigravity) trabaje alineado a los estándares de **Astro 6**, **islas Vue 3**, **Tailwind CSS v4** y las reglas de diseño de `DESIGN.md`, minimizando alucinaciones y acelerando el aprendizaje del estudiante.

---

## 2. Skills recomendadas

| Skill | Para qué | Cuándo usarla | Fuente |
|---|---|---|---|
| **`astro-expert`** | Buenas prácticas en Astro 6: Content Collections con Zod, directivas de hidratación (`client:visible`, `client:idle`) y cero JS por defecto. | Al crear o modificar páginas (`src/pages/`), layouts o componentes `.astro`. | Ecosistema Astro / Community Skills |
| **`vue-composition-api`** | Implementación estricta de Vue 3 con Composition API, `<script setup lang="ts">`, tipado de props con `defineProps` y estado reactivo limpio. | Al desarrollar islas interactivas en `src/components/islands/`. | Ecosistema Vue 3 |
| **`tailwind-v4`** | Arquitectura CSS-first de Tailwind v4, mapeo de custom properties temáticas y ausencia de `tailwind.config.js`. | Al maquetar estilos o actualizar `src/styles/theme.css`. | Tailwind CSS Community |
| **`web-accessibility-wcag`** | Auditoría y cumplimiento de accesibilidad WCAG 2.x nivel AA: contraste ≥ 4.5:1, navegación completa por teclado, focos visibles y atributos ARIA. | Al crear componentes de interfaz, botones, inputs y navegación. | W3C / A11y Guidelines |
| **`typescript-strict`** | TypeScript avanzado sin `any`, estrechamiento seguro de tipos (`unknown`), tipado exhaustivo y validación de esquemas. | Al crear utilidades (`src/utils/`), esquemas de contenido o tipar props. | TypeScript Community |

---

## 3. Instalación por agente

Cada herramienta de IA tiene su propio mecanismo para incorporar skills. A continuación se detalla cómo cargarlas en cada entorno soportado:

### Claude Code
Claude Code reconoce skills y comandos a través de su sistema de extensiones y archivos de configuración local o global:
1. Las herramientas y prompts específicos pueden ubicarse en `.claude/skills/` dentro del repositorio o en la configuración global de usuario (`~/.claude/skills/`).
2. También pueden invocarse o enlazarse en `CLAUDE.md` o invocarse mediante comandos de barra si están configurados en el CLI.

### OpenCode
En OpenCode, las habilidades se gestionan a través del registro de extensiones o instrucciones contextuales:
1. Agrega las directivas y scripts de la skill dentro del directorio `.opencode/skills/` en la raíz del proyecto.
2. Asegúrate de declarar el manifiesto correspondiente en `.opencode/settings.json` para que el agente indexe las herramientas asociadas.

### Codex
Para OpenAI Codex o agentes basados en la API de OpenAI:
1. Incluye las referencias a las skills activas dentro del prompt del sistema o archivo de instrucciones del agente (referenciando las guías de `docs/`).
2. Si utilizas herramientas externas o MCP servers para Codex, configura las herramientas en el archivo de entorno del asistente o runner local.

### Antigravity
En Google Antigravity, las skills se descubren y gestionan automáticamente mediante el directorio de configuración:
1. **Globales:** Viven en `~/.gemini/antigravity/builtin/skills/` o `~/.gemini/config/skills/`.
2. **Del Workspace:** Pueden colocarse en `.agent/skills/<nombre-skill>/SKILL.md`.
3. El agente evalúa la lista de skills disponibles y carga automáticamente las instrucciones del archivo `SKILL.md` correspondiente antes de ejecutar tareas que coincidan con su ámbito.

---

## 4. Skills propias del proyecto

Actualmente, el proyecto se encuentra en su fase inicial de arquitectura. En una etapa posterior, este repositorio contará con **skills propias y exclusivas** ubicadas en la carpeta `.agents/skills/`.

Estas skills internas estarán diseñadas para automatizar y guiar el flujo de trabajo didáctico:

1. **`samsar-astro-component`**:
   - Automatizará la creación de componentes estáticos `.astro` en `src/components/ui/` y `src/components/layout/`.
   - Garantizará el uso de tokens semánticos de `src/styles/theme.css` e interfaces `Props` tipadas estrictamente.
2. **`samsar-vue-island`**:
   - Asistirá en la creación de islas interactivas `.vue` en `src/components/islands/`.
   - Validará el uso obligatorio de `<script setup lang="ts">`, evaluará la justificación de la directiva de hidratación (`client:visible` vs `client:idle`) y verificará accesibilidad de teclado.
3. **`samsar-content-authoring`**:
   - Guiará la redacción de nuevos posts en Markdown/MDX dentro de `src/content/blog/`.
   - Validará el frontmatter contra el esquema Zod de Content Collections (`title`, `pubDate`, `category`, etc.) y verificará la coherencia temática con los pilares del blog (`Samsar|Dev`, `Samsar|IA`, `Samsar|Games`).

> **Nota:** Cuando estas skills estén implementadas en `.agents/skills/`, se documentará en este apartado su comando de invocación y parámetros específicos.