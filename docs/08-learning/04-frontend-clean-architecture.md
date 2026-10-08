# 04-frontend-clean-architecture: Clean y Screaming Architecture en el Frontend

Este módulo pedagógico aborda cómo aplicar los principios de **Clean Architecture**, **Screaming Architecture** y separación rigurosa de responsabilidades en aplicaciones frontend modernas construidas con Astro y Vue 3.

---

## 1. El Problema: Frontend sin Arquitectura

En muchos proyectos web tradicionales, el código suele degradarse rápidamente en lo que llamamos "arquitectura por framework":
- La lógica de negocio está acoplada directamente al ciclo de vida de los componentes (`mounted`, `useEffect`).
- Las transformaciones de datos y llamadas de red están dispersas en plantillas HTML.
- Si cambia una librería o el framework, hay que reescribir toda la aplicación.

> **Principio Fundamental:** Los frameworks son detalles de implementación. La arquitectura debe proteger las reglas del dominio y hacer que el sistema sea testeable, comprensible y mantenible en el tiempo.

---

## 2. Screaming Architecture: Que la Carpeta Hable de tu Negocio

El término *Screaming Architecture* (acuñado por Robert C. Martin) establece que la estructura de carpetas de un proyecto debe "gritar" de qué trata el sistema, no qué framework de renderizado utiliza.

Observa cómo se organiza `src/` en este proyecto:

```text
src/
├── components/
│   ├── ui/          ◄ Átomos puros y desacoplados (Button, Card, Badge)
│   ├── blog/        ◄ Dominio de publicación de contenidos
│   ├── landing/     ◄ Dominio de presentación y marca
│   └── islands/     ◄ Puntos de interactividad aislados (Vue 3)
├── content/         ◄ Entidades y modelos de datos validados (Content Layer)
├── data/            ◄ Modelos y fuentes de verdad (profile, experience)
└── utils/           ◄ Funciones puras de dominio sin efectos colaterales
```

Al abrir el repositorio, un estudiante no ve simplemente "un proyecto de Astro"; ve un **sistema editorial, un portafolio profesional y un espacio pedagógico**.

---

## 3. Las Tres Capas en Astro + Vue

Aplicamos Clean Architecture adaptada al modelo estático e islas mediante tres capas bien diferenciadas:

```text
┌────────────────────────────────────────────────────────┐
│ 1. Capa de Presentación (UI & Plantillas)              │
│    - Componentes `.astro` (renderizado estático puro)  │
│    - Islas `.vue` (islas reactivas con script setup)   │
└───────────────────────────┬────────────────────────────┘
                            │ Consume props tipadas
┌───────────────────────────▼────────────────────────────┐
│ 2. Capa de Aplicación / Controladores                  │
│    - Enrutamiento SSG (`src/pages/[slug].astro`)       │
│    - Inyección de dependencias en tiempo de build      │
└───────────────────────────┬────────────────────────────┘
                            │ Consulta colecciones
┌───────────────────────────▼────────────────────────────┐
│ 3. Capa de Dominio & Datos                             │
│    - Esquemas Zod inmutables (`content.config.ts`)     │
│    - Tipos de TypeScript (`profile.ts`)                │
│    - Funciones de cálculo puras (`formatDate.ts`)      │
└────────────────────────────────────────────────────────┘
```

---

## 4. Patrón Contenedor-Presentacional (Container-Presentational)

Para mantener los componentes testeables y limpios de efectos colaterales:

1. **Componentes Presentacionales (Dumb Components):**
   - Viven en `src/components/ui/` o `src/components/blog/`.
   - No consultan bases de datos ni hacen llamadas HTTP.
   - Solo reciben `props` y emiten eventos o renderizan slots.
   - Son 100% deterministas: a mismas props, misma interfaz visual.

2. **Componentes Contenedores (Smart Pages/Layouts):**
   - Viven en `src/pages/` o `src/layouts/`.
   - Se encargan de consultar el Content Layer (`getCollection('blog')`), filtrar datos y ordenar colecciones.
   - Pasan datos limpios y tipados a los componentes presentacionales.

---

## 5. Lecciones para Estudiantes

1. **Mantén tus funciones de utilidad puras:** Si necesitas formatear fechas o calcular tiempos de lectura, hazlo en `src/utils/` sin acoplarlo a ningún framework de vista.
2. **El dominio manda:** Los esquemas de datos (como la validación Zod) son el contrato de tu aplicación. Si un dato no cumple el contrato, el build falla antes de llegar a producción.
3. **Desacopla el estilo:** Usa tokens semánticos de CSS (`var(--text-primary)`) en lugar de colores fijos. Esto permite que el sistema de temas mute sin tocar la lógica de negocio.
