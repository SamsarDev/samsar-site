# Tarea 01: Colección Projects en Content Layer y Proyectos Semilla

- **Fase:** 04 — Catálogo y Detalle de Proyectos
- **Estimación:** 35 minutos
- **Documentos de referencia:** [`docs/01-product/04-content-model.md`](../../01-product/04-content-model.md) · [`docs/07-decisions/0009-astro-content-layer-api.md`](../../07-decisions/0009-astro-content-layer-api.md) · [`AGENTS.md`](../../../AGENTS.md)

---

## 1. Objetivo Pedagógico

Aprender a escalar la arquitectura de datos desacoplada en **Astro 7** registrando múltiples colecciones en el Content Layer API (`src/content.config.ts`). Definirás un contrato de datos estricto mediante **Zod** para gobernar las iniciativas de software (`projects`), tipando tipos de proyecto (`professional`, `open-source`, `game`, `ai-experiment`), estados del ciclo de vida (`active`, `completed`, `wip`, `archived`), pilas tecnológicas (`stack`), y vinculación bidireccional con artículos técnicos mediante `postSlug`. Redactarás 4 proyectos semilla documentados con rigor ingenieril basados en la trayectoria técnica real del autor.

---

## 2. Criterios de Aceptación (DoD)

- [ ] Colección `projects` registrada en `src/content.config.ts` utilizando el loader `glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' })`.
- [ ] Esquema Zod validando:
  - `title`: string (min 3, max 80).
  - `description`: string (min 10, max 200).
  - `type`: enum `'professional' | 'open-source' | 'game' | 'ai-experiment'`.
  - `stack`: array de strings (mínimo 1 elemento).
  - `status`: enum `'active' | 'completed' | 'wip' | 'archived'`.
  - `repo`: string url opcional.
  - `demo`: string url opcional.
  - `postSlug`: string opcional (referencia cruzada a artículos de `blog`).
  - `cover`: string opcional.
  - `featured`: boolean con default `false`.
- [ ] Directorio `src/content/projects/` creado con 4 proyectos semilla reales:
  1. `orquestacion-agentica-mcp.mdx`: Tipo `ai-experiment`, estado `active`, con `postSlug: 'samsar-ia/primeros-pasos-sistemas-multi-agente'`.
  2. `modernizacion-core-bancario.md`: Tipo `professional`, estado `completed`, con `postSlug: 'samsar-dev/guia-clean-architecture-frontend'`.
  3. `experiencias-gamificadas-edtech.md`: Tipo `game`, estado `completed`.
  4. `clean-architecture-minimal-apis.md`: Tipo `open-source`, estado `active`.
- [ ] `bun run check` y `bun run build` compilan sin errores.

---

## 3. Paso a Paso Guiado

### Paso 1: Actualizar `src/content.config.ts`

Extiende la configuración para exportar tanto `blog` como `projects`:

```typescript
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().min(5).max(100),
    description: z.string().min(10).max(250),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum(['samsar-dev', 'samsar-ia', 'samsar-games']),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    series: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string().min(3).max(80),
    description: z.string().min(10).max(200),
    type: z.enum(['professional', 'open-source', 'game', 'ai-experiment']),
    stack: z.array(z.string()).min(1),
    status: z.enum(['active', 'completed', 'wip', 'archived']),
    repo: z.url().optional(),
    demo: z.url().optional(),
    postSlug: z.string().optional(),
    cover: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog, projects };
```

### Paso 2: Crear los archivos semilla en `src/content/projects/`

Crea `src/content/projects/orquestacion-agentica-mcp.mdx`:
```markdown
---
title: 'Plataforma Agéntica con LangGraph y Servidores MCP'
description: 'Capa de orquestación para agentes autónomos con transporte stdio y validación estricta de esquemas.'
type: 'ai-experiment'
stack: ['TypeScript', 'LangGraph', 'Node.js', 'Model Context Protocol', 'Azure OpenAI']
status: 'active'
repo: 'https://github.com/SamsarDev'
demo: 'https://samsar-site.pages.dev/'
postSlug: 'samsar-ia/primeros-pasos-sistemas-multi-agente'
featured: true
---

## Contexto y Visión
Diseño e implementación de una red de agentes autónomos colaborativos...

## Arquitectura del Sistema
Orquestación basada en nodos de Retrieval, Agent, Tool y Validator (Circuit Breaker)...
```

Crea `src/content/projects/modernizacion-core-bancario.md`:
```markdown
---
title: 'Modernización Core Bancario con .NET Core y Apache Kafka'
description: 'Migración de arquitectura SOAP legacy a microservicios orientados a eventos mediante patrón Strangler Fig.'
type: 'professional'
stack: ['.NET Core', 'C#', 'Apache Kafka', 'Clean Architecture', 'Azure SQL', 'Docker']
status: 'completed'
postSlug: 'samsar-dev/guia-clean-architecture-frontend'
featured: true
---

## Contexto del Proyecto
Migración de servicios bancarios críticos reduciendo la latencia de 20s a 5s...
```

Crea `src/content/projects/experiencias-gamificadas-edtech.md`:
```markdown
---
title: 'Experiencias Gamificadas 3D para Plataforma Educativa'
description: 'Módulos interactivos en 3D bajo enfoque Mobile-First para más de 50,000 estudiantes activos.'
type: 'game'
stack: ['Three.js', 'JavaScript', 'Vue.js', '.NET MVC', 'WebGL']
status: 'completed'
featured: false
---

## Desafío Pedagógico
Diseño de dinámicas lúdicas formativas para educación escolar...
```

Crea `src/content/projects/clean-architecture-minimal-apis.md`:
```markdown
---
title: 'Plantilla de Clean Architecture y Minimal APIs'
description: 'Blueprint de código abierto para construcción de APIs de alto rendimiento y arquitectura screaming.'
type: 'open-source'
stack: ['C#', '.NET Core', 'FastEndpoints', 'Docker', 'FluentValidation']
status: 'active'
repo: 'https://github.com/SamsarDev'
featured: true
---

## Propósito Open Source
Estructura de referencia para desarrolladores que buscan desacoplar dependencias de infraestructura...
```

---

## 4. Comprobación y Verificación

Ejecuta el verificador de tipos de Astro:
```bash
bun run check
```
Astro registrará la colección `projects`, sincronizará sus tipos en `.astro/types.d.ts` y validará que todos los campos cumplan las restricciones Zod.

Luego prueba el build:
```bash
bun run build
```

---

## 5. Pistas Didácticas y Errores Comunes

- **`z.string().url()` y URLs relativas:** La regla `z.string().url()` exige protocolos válidos (`http://` o `https://`). Si pasas una ruta relativa (`/demo`), Zod rechazará la entrada.
- **Relaciones cruzadas con `postSlug`:** Guardar el slug o ID relativo de otra colección (ej. `'samsar-ia/primeros-pasos-sistemas-multi-agente'`) permite vincular artículos sin acoplar los esquemas de datos.
