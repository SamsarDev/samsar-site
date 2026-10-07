# Tarea 05: CTA Final, Ensamblaje en index.astro y Verificación WCAG

- **Fase:** 02 — Landing Page y Átomos de UI
- **Estimación:** 30 minutos
- **Documentos de referencia:** [`docs/01-product/screens/01-landing.md`](../../01-product/screens/01-landing.md) · [`docs/03-design/07-accessibility.md`](../../03-design/07-accessibility.md) · [`docs/04-process/03-definition-of-done.md`](../../04-process/03-definition-of-done.md)

---

## 1. Objetivo Pedagógico

Aprender a orquestar y ensamblar todas las secciones desarrolladas en una **página principal cohesiva y accesible**. Comprenderás la importancia de auditar el árbol de encabezados (Heading Tree), asegurar la fluidez responsive en dispositivos móviles angostos (≥ 360px) y validar la ausencia de desbordamiento horizontal (*horizontal scroll*).

---

## 2. Criterios de Aceptación (DoD)

- [ ] Existe `src/components/landing/CtaSection.astro` con invitación de cierre y CTAs a `/blog` y `/contacto`.
- [ ] `src/pages/index.astro` integra ordenadamente: `Hero`, `Pillars`, `AboutProject`, `FeaturedPosts`, `RecentProjects` y `CtaSection`.
- [ ] La página cuenta con exactamente un `<h1>` y niveles jerárquicos ordenados (`<h2>` para cada sección principal, `<h3>` para tarjetas).
- [ ] La vista móvil (360px de ancho) no presenta scroll horizontal ni roturas visuales.
- [ ] Todo elemento interactivo (botones, enlaces, cards) es navegable con teclado con foco visible.
- [ ] `bun run check` y `bun run build` terminan con código 0 y sin advertencias.

---

## 3. Paso a Paso Guiado

### Paso 1: Crear `src/components/landing/CtaSection.astro`
```astro
---
import Button from '../ui/Button.astro';
---

<section class="py-20 bg-[var(--bg-primary)] border-t border-[var(--border-base)]">
  <div class="mx-auto max-w-4xl px-4 sm:px-6 text-center">
    <span class="font-['JetBrains_Mono'] text-xs font-semibold uppercase tracking-widest text-[var(--accent-primary)]">
      Seguir explorando
    </span>

    <h2 class="mt-3 font-['Space_Grotesk'] text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
      ¿Curioso por ver más reflexiones y código?
    </h2>

    <p class="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[var(--text-secondary)] font-['Manrope']">
      Podés sumergirte en los artículos del blog técnico o enviarme un mensaje para intercambiar ideas sobre ingeniería y cultura.
    </p>

    <div class="mt-8 flex flex-wrap justify-center gap-4">
      <Button href="/blog" variant="primary" size="lg">
        Leer el blog
      </Button>
      <Button href="/contacto" variant="secondary" size="lg">
        Escribirme un mensaje
      </Button>
    </div>
  </div>
</section>
```

### Paso 2: Ensamblar `src/pages/index.astro`
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/landing/Hero.astro';
import Pillars from '../components/landing/Pillars.astro';
import AboutProject from '../components/landing/AboutProject.astro';
import FeaturedPosts from '../components/landing/FeaturedPosts.astro';
import RecentProjects from '../components/landing/RecentProjects.astro';
import CtaSection from '../components/landing/CtaSection.astro';
---

<BaseLayout
  title="Samsar | Código, cultura y curiosidad"
  description="Cuaderno de campo, ingeniería de software, inteligencia artificial y proyectos interactivos con identidad maya."
>
  <Hero />
  <Pillars />
  <AboutProject />
  <FeaturedPosts />
  <RecentProjects />
  <CtaSection />
</BaseLayout>
```

---

## 4. Comprobación y Verificación

1. **Compilación y Tipos:**
   ```bash
   bun run check
   bun run build
   ```
2. **Prueba Responsiva:** Abre el navegador en DevTools, activa el modo responsivo y reduce el ancho a **360 px**:
   - Comprueba que ningún contenedor genere barra de desplazamiento horizontal.
   - Revisa que los grids colapsen limpiamente a una columna.
3. **Prueba de Modo Claro y Oscuro:**
   - Alterna el tema usando el toggle del header.
   - Verifica que el contraste en cada sección sea nítido y legible tanto en *Obsidiana & Jade* como en *Cielo, Sol y Maíz*.
4. **Navegación por Teclado:**
   - Presiona `Tab` sucesivamente desde el inicio de la página hasta el footer. Cada enlace o botón debe presentar un anillo de foco visible (`--border-focus`).

---

## 5. Pistas Didácticas y Errores Comunes

> 💡 **Cómo evitar el scroll horizontal accidental:**  
> En CSS moderno, elementos decorativos absolutos con `transform` o anchos mayores al 100% pueden desbordar el viewport si su contenedor padre carece de `overflow-hidden` o `relative`. Verifica siempre las secciones con motivos decorativos (`Hero`, `AboutProject`) en anchos angostos.
