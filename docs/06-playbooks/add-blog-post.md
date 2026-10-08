# Playbook: Cómo Agregar un Artículo al Blog (MDX)

Este playbook describe el procedimiento exacto para redactar, validar y publicar un nuevo artículo técnico en el blog de **Samsar | Sitio web personal**.

---

## 1. Contexto & Cuándo Usarlo

Usa este manual cada vez que desees publicar una nueva entrada en cualquiera de las tres categorías editoriales del sitio:
- **`samsar-dev`**: Arquitectura de software, patrones de diseño, frontend moderno y buenas prácticas de ingeniería.
- **`samsar-ia`**: Inteligencia artificial agéntica, Model Context Protocol (MCP), RAG híbrido y orquestación con LLMs.
- **`samsar-games`**: Game design, dinámicas lúdicas formativas, Three.js y pedagogía en familia.

---

## 2. Checklist Previo

Antes de redactar el archivo:
- [ ] Elegir la categoría editorial correcta (`samsar-dev`, `samsar-ia` o `samsar-games`).
- [ ] Definir el slug del artículo en español y kebab-case (ejemplo: `mi-primer-articulo-tecnico.mdx`).
- [ ] Seleccionar entre 1 y 4 tags existentes o definir nuevos en minúsculas (ej: `["arquitectura", "clean-code"]`).
- [ ] Redactar una descripción concisa de entre 50 y 160 caracteres para SEO y cards.

---

## 3. Procedimiento Paso a Paso

### Paso 1: Crear el archivo en la colección de contenido
Crea el archivo en `src/content/blog/<categoria>/<slug>.mdx`:

```text
src/content/blog/samsar-dev/mi-nuevo-articulo.mdx
```

### Paso 2: Completar el Frontmatter obligatorio
El frontmatter está validado estrictamente con Zod en `src/content.config.ts`. Usa esta plantilla:

```markdown
---
title: "Título Descriptivo y Atractivo del Artículo"
description: "Resumen técnico de 1 a 2 oraciones que explica qué problema resuelve o qué concepto enseña este artículo."
pubDate: 2026-10-15
category: "samsar-dev" # 'samsar-dev' | 'samsar-ia' | 'samsar-games'
tags: ["arquitectura", "frontend"]
draft: false
featured: false
---

Párrafo introductorio contextualizando el problema y la necesidad técnica...

## 1. El Problema a Resolver

Explicación clara del contexto antes de saltar a la solución de código.

## 2. Implementación con Ejemplos

Usa bloques de código cercados con sintaxis resaltada por Shiki:

```typescript
export interface DataProcessor {
  process(data: unknown): Promise<void>;
}
```

> [!NOTE]
> Recuerda que los conceptos arquitectónicos perduran más que las herramientas puntuales.

## 3. Conclusiones y Próximos Pasos

Resumen de los aprendizajes clave y enlaces recomendados.
```

### Paso 3: Reglas de Redacción y Componentes MDX
1. **Un solo `<h1>` por página:** El título principal lo genera la plantilla `src/layouts/BlogLayout.astro`. En el cuerpo de tu MDX comienza con encabezados `##` (H2).
2. **Tablas de contenido (TOC):** Los encabezados `##` y `###` se extraen automáticamente para poblar el índice interactivo lateral.
3. **Resaltado de código (Shiki):** Especifica siempre el lenguaje en los code blocks (` ```typescript `, ` ```bash `, ` ```json `). Shiki aplica automáticamente tema claro (`github-light`) y oscuro (`github-dark`).

---

## 4. Verificación Obligatoria

Ejecuta en tu terminal:

```bash
bun run check
bun run build
```

Ambos comandos deben completar con **0 errores y 0 warnings**. 

Verifica visualmente en el navegador iniciando el servidor de desarrollo:
```bash
bun run dev
```
Navega a `http://localhost:4321/blog/<categoria>/<slug>` y revisa:
- Título, fecha, tiempo de lectura y tags en la cabecera.
- Renderizado correcto del TOC lateral.
- Contraste legible del código tanto en tema claro como oscuro.

---

## 5. Errores Comunes y Soluciones

- **Error de validación de Zod en `publishDate`:** Asegúrate de escribir la fecha en formato ISO `AAAA-MM-DD` sin comillas (ej: `2026-10-15`).
- **Error `Invalid enum value` en `category`:** La categoría solo admite exactamente `"samsar-dev"`, `"samsar-ia"` o `"samsar-games"`.
- **El artículo no aparece en producción:** Verifica que `draft: false`. Los artículos con `draft: true` solo se visualizan en entorno de desarrollo.
