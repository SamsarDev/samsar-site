# Tarea 02: Implementación de Hero y Sección de Pilares

- **Fase:** 02 — Landing Page y Átomos de UI
- **Estimación:** 35 minutos
- **Documentos de referencia:** [`docs/01-product/screens/01-landing.md`](../../01-product/screens/01-landing.md) · [`docs/03-design/06-maya-motifs.md`](../../03-design/06-maya-motifs.md) · [`docs/03-design/05-motion.md`](../../03-design/05-motion.md)

---

## 1. Objetivo Pedagógico

Aprender a componer la zona de impacto inicial (**Hero**) y la sección de pilares temáticos (**Pillars**) combinando tipografía Display fluida, motivos decorativos SVG culturales con estricto control de accesibilidad (`aria-hidden="true"` y opacidades calibradas) y animaciones de entrada en CSS puro sin dependencias externas de JavaScript.

---

## 2. Criterios de Aceptación (DoD)

- [ ] Existe `src/components/maya/placeholders/QuetzalSilhouette.astro` como activo decorativo SVG seguro para forks y estudiantes (`aria-hidden="true"`).
- [ ] Existe `src/components/landing/Hero.astro` con el único `<h1>` de la landing page, descripción editorial, 2 botones de llamada a la acción (`Button.astro`) y silueta decorativa.
- [ ] Existe `src/components/landing/Pillars.astro` con un grid de 3 columnas para `Samsar|Dev`, `Samsar|IA` y `Samsar|Games`, utilizando `Card.astro` en variante `interactive`.
- [ ] Las animaciones de entrada se implementan mediante CSS puro (`@keyframes fadeIn`) con duración ≤ 400ms y respetan `@media (prefers-reduced-motion: reduce)`.
- [ ] `bun run check` y `bun run build` pasan sin errores ni advertencias.

---

## 3. Paso a Paso Guiado

### Paso 1: Crear `src/components/maya/placeholders/QuetzalSilhouette.astro`
Crea el motivo decorativo genérico con licencia libre para estudiantes:

```astro
---
interface Props {
  class?: string;
}

const { class: className = '' } = Astro.props;
---

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 200 200"
  fill="none"
  class:list={['pointer-events-none select-none text-[var(--accent-primary)] opacity-10', className]}
  aria-hidden="true"
>
  <path
    d="M100 20 C60 50 40 90 40 140 C60 120 80 110 100 110 C120 110 140 120 160 140 C160 90 140 50 100 20 Z"
    fill="currentColor"
  />
  <circle cx="100" cy="70" r="12" fill="var(--bg-primary)" />
</svg>
```

### Paso 2: Crear `src/components/landing/Hero.astro`
```astro
---
import Button from '../ui/Button.astro';
import QuetzalSilhouette from '../maya/placeholders/QuetzalSilhouette.astro';
---

<section class="relative overflow-hidden py-16 sm:py-24">
  <!-- Silueta decorativa de fondo -->
  <QuetzalSilhouette class="absolute -right-12 -top-12 h-80 w-80 sm:h-96 sm:w-96" />

  <div class="relative mx-auto max-w-4xl px-4 sm:px-6">
    <div class="max-w-2xl animate-[fadeIn_0.4s_ease-out]">
      <span class="inline-block rounded-full bg-[var(--accent-primary)]/10 px-3 py-1 font-['JetBrains_Mono'] text-xs font-semibold text-[var(--accent-primary)]">
        Cuaderno de campo & ingeniería
      </span>

      <h1 class="mt-4 font-['Space_Grotesk'] text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
        Samsar: código, cultura y curiosidad<span class="text-[var(--accent-primary)]">.</span>
      </h1>

      <p class="mt-6 text-lg leading-relaxed text-[var(--text-secondary)] font-['Manrope']">
        Exploraciones en arquitectura de software, inteligencia artificial y desarrollo de videojuegos con identidad guatemalteca y propósito didáctico.
      </p>

      <div class="mt-8 flex flex-wrap gap-4">
        <Button href="/blog" variant="primary" size="lg">
          Explorar blog
        </Button>
        <Button href="/proyectos" variant="secondary" size="lg">
          Ver proyectos
        </Button>
      </div>
    </div>
  </div>
</section>
```

### Paso 3: Crear `src/components/landing/Pillars.astro`
```astro
---
import Card from '../ui/Card.astro';

const pillars = [
  {
    category: 'Samsar|Dev',
    title: 'Arquitectura Limpia & Web',
    description: 'Patrones sólidos, Astro, Vue y frontend moderno guiado por principios de ingeniería sin atajos.',
    href: '/blog?categoria=dev',
    badge: 'Ingeniería',
  },
  {
    category: 'Samsar|IA',
    title: 'Modelos & Automatización',
    description: 'Agentes de IA autónomos, LLMs, flujos asistidos y herramientas que multiplican la capacidad humana.',
    href: '/blog?categoria=ia',
    badge: 'Inteligencia',
  },
  {
    category: 'Samsar|Games',
    title: 'Juegos & Cultura Maya',
    description: 'Desarrollo lúdico, mecánicas de juego didácticas y preservación visual de tradiciones ancestrales.',
    href: '/blog?categoria=games',
    badge: 'Lúdica',
  },
];
---

<section class="py-16 bg-[var(--bg-primary)] border-t border-[var(--border-base)]">
  <div class="mx-auto max-w-6xl px-4 sm:px-6">
    <div class="max-w-2xl">
      <h2 class="font-['Space_Grotesk'] text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
        Qué encontrarás aquí
      </h2>
      <p class="mt-2 text-base text-[var(--text-secondary)]">
        Tres caminos de aprendizaje continuo y desarrollo técnico.
      </p>
    </div>

    <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {
        pillars.map((item) => (
          <a href={item.href} class="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] rounded-xl">
            <Card variant="interactive" class="h-full flex flex-col justify-between">
              <div>
                <span class="font-['JetBrains_Mono'] text-xs font-semibold text-[var(--accent-primary)]">
                  {item.category}
                </span>
                <h3 class="mt-2 font-['Space_Grotesk'] text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                  {item.title}
                </h3>
                <p class="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {item.description}
                </p>
              </div>

              <div class="mt-6 flex items-center text-sm font-semibold text-[var(--accent-primary)]">
                <span>Explorar sección</span>
                <span class="ml-1 transition-transform group-hover:translate-x-1" aria-hidden="true">&rarr;</span>
              </div>
            </Card>
          </a>
        ))
      }
    </div>
  </div>
</section>
```

---

## 4. Comprobación y Verificación

1. Ejecuta `bun run check` para verificar que las props y tipos de Astro coincidan.
2. Comprueba en `bun run build` que la salida sea 100% estática.
3. Verifica que la silueta decorativa mantenga `aria-hidden="true"` y que su opacidad no dificulte la lectura del H1.
4. Navega con el teclado (`Tab`) entre los dos botones del Hero y las tres tarjetas de pilares: cada elemento debe exhibir anillo de foco visible.

---

## 5. Pistas Didácticas y Errores Comunes

> ⚠️ **Jerarquía de Encabezados:** Nota que el Hero contiene el único `<h1>` del documento, mientras que la sección de pilares introduce un `<h2>` y cada tarjeta un `<h3>`. Saltar de un H1 a un H3 directamente sin pasar por H2 es una falta de accesibilidad común que desorienta a los usuarios de lectores de pantalla.
