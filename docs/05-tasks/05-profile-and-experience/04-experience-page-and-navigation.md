# Tarea 04: Página de Experiencia Profesional e Integración de Navegación

- **Fase:** 05 — Perfil y Experiencia Profesional
- **Estimación:** 35 minutos
- **Documentos de referencia:** [`docs/01-product/screens/02-profile-and-experience.md`](../../01-product/screens/02-profile-and-experience.md) · [`docs/02-architecture/02-project-structure.md`](../../02-architecture/02-project-structure.md)

---

## 1. Objetivo Pedagógico

Ensamblar la página integral de trayectoria (`/experiencia`), combinando secciones estáticas generadas por Astro con la isla interactiva Vue (`ExperienceTimeline.vue`) hidratada con `client:visible`. Aprenderás a integrar descarga de archivos binarios estáticos, secciones complementarias de formación y certificaciones, y a auditar los enlaces de navegación global (`Nav.astro`) para garantizar navegación consistente en todo el sitio.

---

## 2. Criterios de Aceptación (DoD)

- [ ] Ruta `src/pages/experiencia.astro` implementada con `BaseLayout.astro`.
- [ ] **Encabezado y Descarga:** título H1, resumen ejecutivo y botón destacado para descargar `cv-samuel-sarmientos.pdf`.
- [ ] **Timeline Interactivo:** isla `ExperienceTimeline.vue` montada con directiva `client:visible` recibiendo los datos tipados de `src/data/experience.ts`.
- [ ] **Educación y Certificaciones:** listado estructurado de estudios superiores y credenciales profesionales.
- [ ] **Idiomas:** bloque con niveles de dominio lingüístico.
- [ ] **CTA Profesional:** bloque final enfocado en oportunidades de liderazgo técnico y consultoría con enlace a `/contacto`.
- [ ] Enlaces a `/sobre-mi` y `/experiencia` activos y funcionales en el menú de navegación (`Nav.astro`).
- [ ] `docs/05-tasks/00-INDEX.md` actualizado reflejando la Fase 5 como Lista.
- [ ] `bun run check` y `bun run build` compilan con 0 errores y 0 advertencias.

---

## 3. Paso a Paso Guiado

### Paso 1: Crear `src/pages/experiencia.astro`

Importa los componentes de interfaz, la isla reactiva y los datos:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import ExperienceTimeline from '../components/islands/ExperienceTimeline.vue';
import Button from '../components/ui/Button.astro';
import Card from '../components/ui/Card.astro';
import { experienceData } from '../data/experience';
---

<BaseLayout
  title="Experiencia Profesional | Samuel Sarmientos"
  description="Trayectoria profesional, arquitectura de software, liderazgo técnico, proyectos de IA y currículum descargable de Samuel Sarmientos."
>
  <header class="py-16 sm:py-20 border-b border-[var(--border-base)]">
    <div class="mx-auto max-w-4xl px-4 sm:px-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <p class="font-mono text-xs uppercase tracking-wider text-[var(--accent-primary)] mb-2">
            Trayectoria & Impacto
          </p>
          <h1 class="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)]">
            Experiencia Profesional
          </h1>
        </div>
        <a
          href="/cv-samuel-sarmientos.pdf"
          download="CV-Samuel-Sarmientos.pdf"
          class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[var(--accent-primary)] text-[var(--text-inverse)] font-medium text-sm hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Descargar CV (PDF)
        </a>
      </div>
      <p class="mt-6 text-lg text-[var(--text-secondary)] font-sans leading-relaxed">
        {experienceData.summary}
      </p>
    </div>
  </header>

  <main class="py-16 mx-auto max-w-4xl px-4 sm:px-6 space-y-20">
    <!-- Timeline Interactivo -->
    <section>
      <h2 class="font-display text-2xl font-bold text-[var(--text-primary)] mb-8">
        Línea de Tiempo
      </h2>
      <ExperienceTimeline client:visible experiences={experienceData.experiences} />
    </section>

    <!-- Educación y Certificaciones -->
    <!-- Idiomas y CTA Final -->
  </main>
</BaseLayout>
```

### Paso 2: Auditar enlaces en `src/components/layout/Nav.astro`

Verifica que el menú de navegación (`Nav.astro`) contenga los enlaces hacia `/sobre-mi` y `/experiencia` tanto en desktop como en mobile drawer.

### Paso 3: Actualizar el estado en `docs/05-tasks/00-INDEX.md`

Actualiza el índice general marcando la Fase 5 como Lista tras completar y verificar las tareas.

---

## 4. Comprobación y Verificación

1. Navega a `http://localhost:4321/experiencia`.
2. Haz clic en el botón *"Descargar CV (PDF)"* y verifica que el archivo se descargue correctamente.
3. Interactúa con los filtros del timeline y comprueba que funcionen fluidamente con `client:visible`.
4. Ejecuta las validaciones estáticas:
   ```bash
   bun run check
   bun run build
   ```
5. Realiza una prueba con `bun run preview` navegando entre Inicio, Sobre mí, Experiencia, Proyectos y Blog.
