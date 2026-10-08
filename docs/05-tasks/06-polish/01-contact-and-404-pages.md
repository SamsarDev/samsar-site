# Tarea 01: Páginas de Contacto y Error 404

- **Fase:** 06 — Producción, SEO y Despliegue
- **Estimación:** 30 minutos
- **Documentos de referencia:** [`docs/01-product/screens/05-contact-and-utilities.md`](../../01-product/screens/05-contact-and-utilities.md) · [`DESIGN.md`](../../../DESIGN.md)

---

## 1. Objetivo Pedagógico

Aprender a diseñar e implementar páginas de utilidad críticas para la experiencia de usuario en Astro. Construirás una página de contacto clara y accesible orientada al MVP con canales de comunicación directos verificados, y una página de error 404 personalizada con identidad visual maya y mecanismos de recuperación de navegación para evitar el abandono de usuarios.

---

## 2. Criterios de Aceptación (DoD)

- [ ] Ruta `src/pages/contacto.astro` implementada con `BaseLayout.astro`.
- [ ] **Contacto (MVP):** encabezado explicativo y tarjetas directas (`Card.astro`) con enlaces funcionales a correo (`mailto:samsar.dev@gmail.com`), perfil de LinkedIn (`https://linkedin.com/in/samsar-dev`), cuenta de GitHub (`https://github.com/samsar-dev`) y zona horaria (Guatemala, UTC-6).
- [ ] Atributos de seguridad (`rel="noopener noreferrer"`) y etiquetas `aria-label` en enlaces externos.
- [ ] Ruta `src/pages/404.astro` implementada con `BaseLayout.astro`.
- [ ] **Error 404:** código 404 destacado, mensaje temático (*"Esta página se perdió en la selva"*), motivo gráfico maya y dos botones de rescate (*"Volver al inicio"* y *"Explorar el blog"*).
- [ ] Ambas pantallas cumplen WCAG AA en temas claro y oscuro.
- [ ] `bun run check` y `bun run build` pasan con 0 errores y 0 advertencias.

---

## 3. Paso a Paso Guiado

### Paso 1: Implementar `src/pages/contacto.astro`

Crea la página de contacto utilizando los componentes UI del proyecto:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Card from '../components/ui/Card.astro';
import Button from '../components/ui/Button.astro';
---

<BaseLayout
  title="Contacto | Samuel Sarmientos"
  description="Canal de comunicación directo con Samuel Sarmientos para consultas de arquitectura, proyectos de IA, mentoría y colaboraciones open source."
>
  <main class="py-16 sm:py-24 mx-auto max-w-4xl px-4 sm:px-6">
    <header class="text-center mb-16">
      <p class="font-mono text-xs uppercase tracking-wider text-[var(--accent-primary)] mb-2">
        Canal Directo
      </p>
      <h1 class="font-display text-4xl sm:text-5xl font-bold text-[var(--text-primary)] tracking-tight">
        Hablemos
      </h1>
      <p class="mt-4 text-base sm:text-lg text-[var(--text-secondary)] font-sans max-w-2xl mx-auto leading-relaxed">
        Espacio abierto para conversar sobre arquitectura de software, agentes con IA, iniciativas educativas o resolver desafíos de ingeniería.
      </p>
    </header>

    <div class="grid gap-6 sm:grid-cols-2">
      <!-- Tarjetas de correo, LinkedIn, GitHub y zona horaria -->
    </div>
  </main>
</BaseLayout>
```

### Paso 2: Implementar `src/pages/404.astro`

Crea la página de error personalizada integrando navegación de retorno:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Button from '../components/ui/Button.astro';
---

<BaseLayout
  title="Página no encontrada (404) | Samsar"
  description="La página solicitada no existe o ha sido movida a otro paraje."
>
  <main class="min-h-[60vh] flex items-center justify-center py-16 px-4 sm:px-6 text-center">
    <div class="max-w-md mx-auto">
      <p class="font-mono text-6xl font-bold text-[var(--accent-primary)] mb-4">
        404
      </p>
      <h1 class="font-display text-3xl font-bold text-[var(--text-primary)] mb-3">
        Esta página se perdió en la selva
      </h1>
      <p class="text-base text-[var(--text-secondary)] font-sans mb-8 leading-relaxed">
        El sendero que intentas recorrer no existe o fue movido. Puedes regresar a la plaza principal o explorar los artículos del cuaderno técnico.
      </p>
      <div class="flex flex-wrap items-center justify-center gap-4">
        <Button href="/" variant="primary">
          Volver al inicio &rarr;
        </Button>
        <Button href="/blog" variant="secondary">
          Explorar el blog
        </Button>
      </div>
    </div>
  </main>
</BaseLayout>
```

---

## 4. Comprobación y Verificación

1. Navega a `http://localhost:4321/contacto` y comprueba que los enlaces externos y el enlace `mailto:` abran las aplicaciones correspondientes.
2. Navega a `http://localhost:4321/ruta-inexistente` y verifica que se renderice la página 404 personalizada con sus botones de rescate.
3. Ejecuta la validación estática:
   ```bash
   bun run check
   bun run build
   ```
