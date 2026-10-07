# ADR-0006: Gestión de Datos de Experiencia en TypeScript Centralizado

- **Estado:** Aceptado
- **Fecha:** 2026-10-07
- **Decisores:** Samuel Sarmientos / Samsar
- **Documento relacionado:** [`docs/01-product/04-content-model.md`](../01-product/04-content-model.md)

---

## 1. Contexto y Problema

La pantalla de Experiencia y CV (`/experiencia`) requiere mostrar un timeline cronológico de puestos laborales, logros, habilidades agrupadas y formación académica. Se debía decidir si estructurar esta información como una Content Collection de Astro (`src/content/experience/*.md`) o gestionarla a través de un archivo de datos estructurado en TypeScript (`src/data/experience.ts`).

---

## 2. Factores de Decisión

- **Naturaleza del contenido:** La experiencia laboral cambia con muy baja frecuencia y no requiere generar páginas individuales ni renderizado de prosa MDX por cada puesto anterior.
- **Sobrecarga arquitectónica:** Crear una Content Collection añade esquemas Zod en `src/content/config.ts` y dispersa el historial en múltiples archivos pequeños (`rol-1.md`, `rol-2.md`).
- **Seguridad de tipos:** Se requiere tipado estricto con interfaces de TypeScript para validar campos requeridos (empresa, fechas, viñetas de impacto, categorías de skills).

---

## 3. Opciones Consideradas

### Opción 1: Archivo de datos tipado en TypeScript (`src/data/experience.ts`) (Seleccionada)
- **Ventajas:** Máxima simplicidad; todo el historial profesional se actualiza en un único lugar; interfaces reutilizables (`ExperienceItem`, `SkillCategory`); cero sobrecarga en Content Collections.
- **Desventajas:** No utiliza el motor de colecciones de Astro, aunque no lo necesita al no generar páginas dinámicas individuales.

### Opción 2: Content Collection con Zod (`src/content/experience/`)
- **Ventajas:** Validación con Zod homogénea con `blog` y `projects`.
- **Desventajas:** Complejidad innecesaria; tener un archivo markdown por cada empresa donde solo se llena el frontmatter es un anti-patrón de sobreingeniería para un portafolio personal.

---

## 4. Decisión Adoptada

Se decide gestionar la información curricular mediante un **archivo de datos tipado en TypeScript (`src/data/experience.ts`)**, reservando las Content Collections de Astro exclusivamente para colecciones editoriales de alta frecuencia y múltiples rutas (`blog` y `projects`).

---

## 5. Consecuencias y Compromisos

- **Impacto positivo:** Estructura limpia y directa; componentes en `/experiencia.astro` consumen arrays tipados directamente; mantenimiento sin fricción.
- **Compromisos asumidos:** Si en el futuro se deseara generar una página de detalle profunda por cada rol histórico, habría que migrarlo a Content Collections (actualmente fuera de alcance).
- **Regla de implementación:** Toda actualización de historial profesional, certificaciones o skills debe realizarse en `src/data/experience.ts`, respetando las interfaces exportadas.
