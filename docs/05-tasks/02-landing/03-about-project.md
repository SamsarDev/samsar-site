# Tarea 03: Implementación de la Sección "Sobre el Proyecto"

- **Fase:** 02 — Landing Page y Átomos de UI
- **Estimación:** 25 minutos
- **Documentos de referencia:** [`docs/01-product/screens/01-landing.md`](../../01-product/screens/01-landing.md) · [`docs/03-design/06-maya-motifs.md`](../../03-design/06-maya-motifs.md) · [`docs/01-product/01-vision.md`](../../01-product/01-vision.md)

---

## 1. Objetivo Pedagógico

Aprender a maquetar una **sección narrativa de propósito** que comunique la identidad y filosofía del proyecto sin recurrir a formatos comerciales o de currículum tradicional. Incorporarás texturas vectoriales de grecas en SVG con opacidades sutiles para enriquecer el diseño sin sobrecargar el DOM.

---

## 2. Criterios de Aceptación (DoD)

- [ ] Existe `src/components/maya/placeholders/GrecaBorder.astro` como patrón repetitivo decorativo con `aria-hidden="true"`.
- [ ] Existe `src/components/landing/AboutProject.astro` con encabezado H2, texto explicativo y grid de los 3 valores fundamentales (investigación técnica, educación abierta y preservación cultural).
- [ ] La sección respeta la regla de medida de línea de lectura (máximo `70ch` en bloques de prosa).
- [ ] Cero menciones a experiencia laboral comercial o tarifas (fiel a la filosofía del producto).
- [ ] `bun run check` y `bun run build` pasan sin errores.

---

## 3. Paso a Paso Guiado

### Paso 1: Crear `src/components/maya/placeholders/GrecaBorder.astro`
Patrón geométrico decorativo sutil:

```astro
---
interface Props {
  class?: string;
}

const { class: className = '' } = Astro.props;
---

<div class:list={['pointer-events-none select-none opacity-5 overflow-hidden', className]} aria-hidden="true">
  <svg width="100%" height="24" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="greca" width="48" height="24" patternUnits="userSpaceOnUse">
        <path
          d="M0 12 H12 V0 H24 V24 H36 V12 H48"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#greca)" class="text-[var(--text-primary)]" />
  </svg>
</div>
```

### Paso 2: Crear `src/components/landing/AboutProject.astro`
```astro
---
import Card from '../ui/Card.astro';
import GrecaBorder from '../maya/placeholders/GrecaBorder.astro';

const principles = [
  {
    title: 'Investigación & Rigor',
    description: 'Arquitectura limpia, tipos estrictos y rendimiento antes de cualquier moda tecnológica pasajera.',
  },
  {
    title: 'Didáctica Abierta',
    description: 'Desarrollado en público junto con estudiantes y agentes de IA para demostrar que se aprende construyendo.',
  },
  {
    title: 'Identidad & Memoria',
    description: 'Homenaje a la cosmovisión y el arte maya de Guatemala integrado con naturalidad en el software moderno.',
  },
];
---

<section class="relative py-20 bg-[var(--bg-surface)] border-t border-[var(--border-base)]">
  <GrecaBorder class="absolute top-0 left-0 w-full" />

  <div class="mx-auto max-w-4xl px-4 sm:px-6">
    <div class="text-center">
      <span class="font-['JetBrains_Mono'] text-xs uppercase tracking-widest text-[var(--accent-primary)] font-semibold">
        Propósito & Visión
      </span>
      <h2 class="mt-2 font-['Space_Grotesk'] text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
        Un espacio de código y exploración
      </h2>
      <p class="mx-auto mt-4 max-w-[70ch] text-base leading-relaxed text-[var(--text-secondary)] font-['Manrope']">
        Este sitio no es un currículum corporativo ni una tarjeta de presentación comercial. Es un cuaderno de campo vivo donde documento experimentos de ingeniería, reflexiono sobre el impacto de la inteligencia artificial y diseño experiencias interactivas con raíces culturales.
      </p>
    </div>

    <div class="mt-12 grid gap-6 sm:grid-cols-3">
      {
        principles.map((item) => (
          <Card class="bg-[var(--bg-primary)] border-[var(--border-base)]">
            <h3 class="font-['Space_Grotesk'] text-lg font-bold text-[var(--text-primary)]">
              {item.title}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
              {item.description}
            </p>
          </Card>
        ))
      }
    </div>
  </div>
</section>
```

---

## 4. Comprobación y Verificación

1. Ejecuta `bun run check`.
2. Verifica en vista móvil y desktop que el texto explicativo se mantenga centrado y legible.
3. Asegúrate de que el patrón SVG de `GrecaBorder` ocupe el ancho sin producir scroll horizontal accidental (`overflow-x: hidden`).
4. Revisa que el contraste de las 3 tarjetas sobre el fondo `--bg-surface` cumpla con WCAG AA (mínimo 4.5:1).

---

## 5. Pistas Didácticas y Errores Comunes

> 💡 **La regla de los 70ch:** En tipografía web, las líneas de texto que superan los 75-80 caracteres fatigan el ojo humano porque dificultan encontrar el inicio de la línea siguiente. Usar `max-w-[70ch]` garantiza una longitud de lectura cómoda en pantallas anchas.
