# Playbook: Cómo Agregar un Proyecto al Portafolio

Este playbook describe el procedimiento para documentar e incorporar un nuevo proyecto o caso de estudio en el catálogo de **Samsar | Sitio web personal** (`/proyectos`).

---

## 1. Contexto & Cuándo Usarlo

Usa este manual cada vez que quieras añadir una nueva iniciativa o experiencia práctica al portafolio. Cada proyecto vive como una entrada de contenido estructurado en la colección `projects`, lo que genera automáticamente:
- Su ficha en el grid general de `/proyectos`.
- Su presencia en la vista filtrada por categoría (`/proyectos/<type>`).
- Su página de detalle estática en `/proyectos/<slug>`.

---

## 2. Checklist Previo

Antes de redactar la ficha:
- [ ] Definir el tipo de proyecto dentro de la taxonomía del sitio:
  - `professional`: Proyectos de impacto empresarial (banca, retail, logística).
  - `open-source`: Librerías, herramientas comunitarias y paquetes públicos.
  - `game`: Videojuegos, entornos interactivos y proyectos con Three.js.
  - `ai-experiment`: Pruebas de concepto con LLMs, agentes y protocolos MCP.
- [ ] Elegir un slug en español y kebab-case (ejemplo: `sistema-alertas-tiempo-real.md`).
- [ ] Definir el estado actual: `active`, `completed`, `wip` o `archived`.
- [ ] Listar las tecnologías principales en `stack` (al menos una).
- [ ] (Opcional) Si existe un artículo del blog relacionado, tener a mano su slug exacto para cross-linking (`postSlug`).

---

## 3. Procedimiento Paso a Paso

### Paso 1: Crear el archivo Markdown/MDX
Crea el archivo en `src/content/projects/<slug>.md`:

```text
src/content/projects/mi-nuevo-proyecto.md
```

### Paso 2: Completar el Frontmatter obligatorio
El esquema está validado con Zod en `src/content.config.ts`. Usa la siguiente plantilla base:

```markdown
---
title: "Nombre del Proyecto o Sistema"
description: "Resumen conciso de 1 a 2 oraciones explicando el objetivo y el impacto técnico del proyecto."
type: "professional" # 'professional' | 'open-source' | 'game' | 'ai-experiment'
stack: ["C#", ".NET Core", "TypeScript", "Kafka", "PostgreSQL"]
status: "completed" # 'active' | 'completed' | 'wip' | 'archived'
repo: "https://github.com/SamsarDev/mi-repo" # Opcional: URL pública de GitHub
demo: "https://demo.mi-proyecto.com" # Opcional: URL pública desplegada
postSlug: "samsar-dev/guia-clean-architecture-frontend" # Opcional: Slug del blog para enlace cruzado
featured: true # true si debe aparecer en la sección destacada de la landing
---

## 1. Contexto y Desafío

Explicación del problema que dio origen al proyecto. ¿Por qué era necesario? ¿Qué restricciones de arquitectura, volumen o rendimiento existían?

## 2. Arquitectura de la Solución

Detalles del diseño técnico, patrones empleados (Clean Architecture, DDD, Event-Driven) y decisiones arquitectónicas clave.

```typescript
// Ejemplo de interfaz o contrato central del proyecto
export interface EventStreamDispatcher {
  dispatch(event: DomainEvent): Promise<DispatchResult>;
}
```

## 3. Resultados e Impacto

Métricas o lecciones aprendidas:
- Reducción de latencia en consultas críticas.
- Cobertura de pruebas unitarias y de integración.
- Aprendizajes clave para el equipo y estudiantes.
```

---

## 4. Verificación Obligatoria

Ejecuta las validaciones de tipo y compilación:

```bash
bun run check
bun run build
```

Ambos comandos deben reportar **0 errores y 0 warnings**.

Verifica visualmente en local (`bun run dev`):
- Visita `http://localhost:4321/proyectos`: el proyecto debe listarse con su card, stack y badge de tipo.
- Visita `http://localhost:4321/proyectos/<type>`: debe figurar en el filtro correspondiente.
- Visita `http://localhost:4321/proyectos/<slug>`: revisa la página de detalle, enlaces de repo/demo y el enlace al artículo de blog si configuraste `postSlug`.

---

## 5. Errores Comunes y Soluciones

- **Error de Zod en `type` o `status`:** Asegúrate de usar únicamente los valores del enum (`professional`, `open-source`, `game`, `ai-experiment` para type; `active`, `completed`, `wip`, `archived` para status).
- **Error `Invalid url` en `repo` o `demo`:** Si el proyecto no tiene repositorio o demo pública, **omite las claves** en lugar de poner cadenas vacías `""` o texto plano.
- **Enlace roto a artículo del blog:** Verifica que `postSlug` coincida exactamente con la ruta de la colección de blog (incluyendo la categoría, ej: `samsar-dev/guia-clean-architecture-frontend`).
