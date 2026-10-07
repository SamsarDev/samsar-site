# Tarea 01: Content Layer API, Integración MDX y Semillas de Contenido

- **Fase:** 03 — Ecosistema del Blog
- **Estimación:** 35 minutos
- **Documentos de referencia:** [`docs/07-decisions/0009-astro-content-layer-api.md`](../../07-decisions/0009-astro-content-layer-api.md) · [`docs/01-product/04-content-model.md`](../../01-product/04-content-model.md) · [`AGENTS.md`](../../../AGENTS.md)

---

## 1. Objetivo Pedagógico

Aprender la arquitectura de datos desacoplada de **Astro 6 con el Content Layer API**. Comprenderás por qué se valida el frontmatter de Markdown/MDX mediante esquemas de **Zod** en tiempo de compilación (evitando fallos silenciosos en producción), cómo integrar `@astrojs/mdx` para habilitar componentes enriquecidos dentro de los artículos, y cómo encapsular utilidades puras y deterministas en TypeScript para formatear fechas y calcular tiempos de lectura.

---

## 2. Criterios de Aceptación (DoD)

- [ ] Paquete oficial `@astrojs/mdx` instalado e integrado en `astro.config.mjs`.
- [ ] Archivo `src/content.config.ts` creado con la colección `blog` configurada usando el loader `glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' })`.
- [ ] Esquema Zod validando los campos: `title`, `description`, `pubDate`, `updatedDate` (opcional), `category` (enum `'samsar-dev' | 'samsar-ia' | 'samsar-games'`), `tags` (array), `cover` (opcional), `draft` (booleano), `featured` (booleano) y `series` (opcional).
- [ ] Función pura `src/utils/formatDate.ts` que formatee fechas a español legible (ej. "7 de octubre de 2026").
- [ ] Función pura `src/utils/readingTime.ts` que calcule minutos de lectura a 200 palabras por minuto.
- [ ] Tres publicaciones semilla redactadas (una para cada categoría canónica):
  - `src/content/blog/samsar-dev/guia-clean-architecture-frontend.md`
  - `src/content/blog/samsar-ia/primeros-pasos-sistemas-multi-agente.mdx`
  - `src/content/blog/samsar-games/diseno-ludico-pedagogia-con-mi-hijo.md`
- [ ] `bun run check` y `bun run build` compilan sin errores de validación de esquemas ni advertencias.

---

## 3. Paso a Paso Guiado

### Paso 1: Instalar e integrar `@astrojs/mdx`

Ejecuta en la terminal para incorporar el parser de MDX oficial:
```bash
bun add @astrojs/mdx
```

Actualiza `astro.config.mjs`:
```javascript
// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import vue from '@astrojs/vue';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://samsar.dev',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [vue(), mdx()],
});
```

### Paso 2: Crear la definición de colecciones en `src/content.config.ts`

> **Nota arquitectónica:** Siguiendo el ADR-0009, en Astro 6 la configuración reside en la raíz de `src/content.config.ts` y no en `src/content/config.ts`.

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

export const collections = { blog };
```

### Paso 3: Crear utilidades puras en `src/utils/`

Crea `src/utils/formatDate.ts`:
```typescript
export function formatDate(date: Date, locale = 'es-ES'): string {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}
```

Crea `src/utils/readingTime.ts`:
```typescript
export function calculateReadingTime(content: string, wordsPerMinute = 200): string {
  const cleanContent = content.replace(/<[^>]*>/g, '').replace(/```[\s\S]*?```/g, '');
  const wordCount = cleanContent.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
  return `${minutes} min de lectura`;
}
```

### Paso 4: Crear publicaciones semilla en `src/content/blog/`

Crea las carpetas por categoría:
- `src/content/blog/samsar-dev/`
- `src/content/blog/samsar-ia/`
- `src/content/blog/samsar-games/`

Agrega un archivo con frontmatter válido en cada una:
1. `samsar-dev/guia-clean-architecture-frontend.md`: Con categoría `samsar-dev`, tags `["arquitectura", "clean-code", "frontend"]`, `featured: true`.
2. `samsar-ia/primeros-pasos-sistemas-multi-agente.mdx`: Con categoría `samsar-ia`, tags `["ia", "agentes", "mcp"]`, `featured: true`.
3. `samsar-games/diseno-ludico-pedagogia-con-mi-hijo.md`: Con categoría `samsar-games`, tags `["videojuegos", "pedagogia", "familia"]`, `featured: false`.

---

## 4. Comprobación y Verificación

Ejecuta el chequeo estático de tipos y colecciones:
```bash
bun run check
```
Astro validará cada archivo de contenido contra el esquema Zod de `src/content.config.ts`. Si algún post tiene un campo faltante, tipo erróneo o categoría inválida, el comando fallará con un mensaje explícito.

Luego genera el build para comprobar el bundle:
```bash
bun run build
```

---

## 5. Pistas Didácticas y Errores Comunes

- **Error: `Failed to load collection blog`:** Verifica que la ruta base en el loader sea exactamente `./src/content/blog` y que existan archivos que coincidan con la extensión `.md` o `.mdx`.
- **`z.coerce.date()` vs `z.date()`:** Si en el frontmatter escribes fechas como cadenas ISO (`"2026-10-07"`), `z.date()` fallará; `z.coerce.date()` convierte automáticamente el string en una instancia nativa `Date`.
- **Ruta del archivo de configuración:** Asegúrate de que el archivo sea `src/content.config.ts` (con punto) y no `src/content/config.ts` (con barra).
