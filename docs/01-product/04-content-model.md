# 04-content-model: Modelo de Contenido

Definición de esquemas de datos, validación con Zod para Content Collections y tipado estricto en TypeScript para **Samsar | Sitio web personal**.

---

## 1. Arquitectura de Datos

El contenido del sitio se divide en dos estrategias:
1. **Content Collections (Markdown/MDX con Zod):** Para contenidos editoriales extensos y versionados de alta frecuencia (`blog` y `projects`).
2. **Archivos de datos tipados (`src/data/*.ts`):** Para información estructurada curricular y de perfil que evoluciona con baja frecuencia (`experience.ts`).

---

## 2. Colección: Blog (`src/content/blog/`)

Estructura de carpetas para las 3 categorías:
```text
src/content/blog/
├── samsar-dev/      # Guías técnicas y arquitectura
├── samsar-ia/       # Inteligencia artificial, RAG y agentes
└── samsar-games/    # Videojuegos y educación familiar
```

### Esquema Zod (`src/content/config.ts`)

```typescript
import { defineCollection, z } from 'astro:content';

export const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(5).max(100),
    description: z.string().min(10).max(200),
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
```

---

## 3. Colección: Proyectos (`src/content/projects/`)

Estructura de archivos individuales Markdown/MDX para cada iniciativa:
```text
src/content/projects/
├── mi-proyecto-open-source.md
└── juego-educativo-maya.md
```

### Esquema Zod (`src/content/config.ts`)

```typescript
export const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(3).max(80),
    description: z.string().min(10).max(200),
    type: z.enum(['professional', 'open-source', 'game', 'ai-experiment']),
    stack: z.array(z.string()).min(1),
    status: z.enum(['active', 'completed', 'archived', 'wip']),
    repo: z.string().url().optional(),
    demo: z.string().url().optional(),
    postSlug: z.string().optional(),
    cover: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});
```

---

## 4. Datos de Experiencia (`src/data/experience.ts`)

Para la página `/experiencia`, los datos se gestionan mediante interfaces TypeScript centralizadas:

```typescript
export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  category: 'backend' | 'frontend' | 'cloud' | 'ai' | 'leadership';
  highlights: string[];
  stack: string[];
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface EducationItem {
  title: string;
  institution: string;
  year: string;
  details?: string;
}
```

> **Decisión arquitectónica:** Mantener la experiencia profesional en un archivo TypeScript permite un mantenimiento centralizado sin la sobrecarga de generar rutas MDX individuales para cada puesto de trabajo.
