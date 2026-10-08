# Playbook: Cómo Agregar una Nueva Página o Ruta

Este playbook describe el procedimiento para crear y configurar una nueva página estática en **Samsar | Sitio web personal**.

---

## 1. Contexto & Enrutamiento en Astro

Astro utiliza un sistema de **enrutamiento basado en archivos (File-based Routing)** dentro del directorio `src/pages/`. Cada archivo `.astro` o `.md` se convierte directamente en una URL pública:

| Archivo en `src/pages/` | URL generada |
|---|---|
| `src/pages/index.astro` | `/` (Portada) |
| `src/pages/contacto.astro` | `/contacto` |
| `src/pages/recursos/index.astro` | `/recursos` |
| `src/pages/proyectos/[slug].astro` | `/proyectos/<slug>` (Ruta dinámica SSG) |

---

## 2. Checklist Previo

- [ ] Definir el slug y la jerarquía de la URL en español y kebab-case (ej: `src/pages/mentoria.astro`).
- [ ] Redactar título y descripción específicos para la etiqueta `<title>` y metadatos OpenGraph (SEO).
- [ ] Elegir el layout adecuado (`BaseLayout.astro`, `BlogLayout.astro`, etc.).
- [ ] Verificar si la página debe aparecer en el menú principal (`src/components/layout/Nav.astro`) o en el footer (`src/components/layout/Footer.astro`).

---

## 3. Procedimiento Paso a Paso

### Paso 1: Crear el archivo en `src/pages/`
Crea el archivo `.astro`. Por ejemplo: `src/pages/mentoria.astro`.

### Paso 2: Implementar la estructura estándar de página

```astro
---
// src/pages/mentoria.astro
import BaseLayout from '../layouts/BaseLayout.astro';
import Button from '../components/ui/Button.astro';

// Metadatos SEO específicos de la página
const pageTitle = "Mentoría & Formación Técnica | Samsar";
const pageDescription = "Programa de acompañamiento y mentoría práctica en arquitectura de software, Clean Code y desarrollo web moderno para jóvenes profesionales.";
---

<BaseLayout title={pageTitle} description={pageDescription}>
  <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <!-- Encabezado de la página -->
    <header class="mb-10 text-center sm:text-left">
      <span class="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--accent-primary)] mb-2 block">
        Pedagogía & Talento
      </span>
      <h1 class="text-3xl sm:text-4xl font-heading font-bold text-[var(--text-primary)] tracking-tight">
        Mentoría & Formación Técnica
      </h1>
      <p class="mt-4 text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
        {pageDescription}
      </p>
    </header>

    <!-- Contenido estructurado -->
    <section class="space-y-8">
      <div class="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-8">
        <h2 class="text-xl font-heading font-semibold text-[var(--text-primary)] mb-3">
          Enfoque de Aprendizaje
        </h2>
        <p class="text-[var(--text-secondary)] leading-relaxed mb-4">
          Trabajamos sobre proyectos reales y repositorios con propósito formativo, aplicando fundamentos antes que atajos.
        </p>
        <Button href="/contacto" variant="primary">
          Solicitar Acompañamiento
        </Button>
      </div>
    </section>
  </main>
</BaseLayout>
```

### Paso 3: Reglas de Semántica y SEO
1. **Un único `<h1>` por página:** El título principal es el H1; los subtítulos de sección deben usar `<h2>` y nunca saltar niveles (de H2 a H4).
2. **Metadatos obligatorios:** Pasa siempre `title` y `description` a `BaseLayout` para que las etiquetas sociales (OpenGraph, Twitter) y motores de búsqueda indexen la página correctamente.
3. **Canonical y Sitemap:** La página se incluye automáticamente en `/sitemap-index.xml` durante el build gracias a `@astrojs/sitemap`.

---

## 4. Verificación Obligatoria

Ejecuta el chequeo estático y la compilación:

```bash
bun run check
bun run build
```

Ambos comandos deben reportar **0 errores y 0 warnings**.

Verificación manual:
1. Inicia el servidor (`bun run dev`) y visita la ruta en el navegador.
2. Abre la consola de desarrollo y comprueba que no existan errores de hydration o estilos rotos.
3. Valida en el inspector que las etiquetas `<title>` y `<meta name="description">` contengan la información configurada.

---

## 5. Errores Comunes y Soluciones

- **La página da error 404 al navegar:** Asegúrate de que el archivo esté dentro de `src/pages/` y que el nombre no contenga caracteres inválidos o mayúsculas inesperadas.
- **Jerarquía de títulos inconsistente:** Usar múltiples `<h1>` o empezar el contenido con `<h3>` daña la accesibilidad y el SEO.
- **Contenido pegado a los bordes:** Recuerda envolver el contenido en un contenedor semántico con padding responsivo (`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8`).
