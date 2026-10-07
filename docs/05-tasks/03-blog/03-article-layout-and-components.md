# Tarea 03: Layout de Lectura, TOC, Callouts y Resaltado de Sintaxis Shiki

- **Fase:** 03 — Ecosistema del Blog
- **Estimación:** 40 minutos
- **Documentos de referencia:** [`docs/01-product/screens/04-blog.md`](../../01-product/screens/04-blog.md) · [`docs/03-design/02-typography.md`](../../03-design/02-typography.md) · [`docs/03-design/07-accessibility.md`](../../03-design/07-accessibility.md)

---

## 1. Objetivo Pedagógico

Aprender a construir una experiencia de lectura técnica de alto rendimiento y máxima ergonomía visual. Implementarás un layout dedicado (`BlogLayout.astro`) acotado a 70 caracteres de ancho (`max-w-[70ch]`) con tipografía Manrope y leading 1.7 sin justificado. Generarás una tabla de contenidos interactiva (`TOC.astro`) a partir de los encabezados H2/H3 proporcionados por Astro, crearás componentes enriquecidos `<Callout.astro>` para MDX con contraste WCAG AA, y configurarás Shiki con temas duales (claro/oscuro) junto a un script accesible y ligero para copiar código al portapapeles sin añadir peso de librerías en el cliente.

---

## 2. Criterios de Aceptación (DoD)

- [ ] Existe `src/layouts/BlogLayout.astro` envolviendo los artículos con metadatos OpenGraph, estructura de dos columnas (sidebar sticky para TOC en desktop, apilada en mobile) y ancho de prosa restringido a `max-w-[70ch]`.
- [ ] Existe `src/components/blog/Breadcrumbs.astro` con marcado semántico (`<nav aria-label="Migas de pan">`) reflejando `Inicio > Blog > [Categoría] > [Título]`.
- [ ] Existe `src/components/blog/TOC.astro` que procesa los encabezados `{ depth, slug, text }`, renderiza saltos a H2 y H3 y ofrece foco por teclado visible.
- [ ] Existe `src/components/ui/Callout.astro` reutilizable en MDX con variantes `note`, `tip`, `warning` y `danger`, borde lateral de 3px y soporte temático claro/oscuro.
- [ ] Shiki configurado en `astro.config.mjs` con soporte para temas duales claro y oscuro (`github-dark` y `github-light`).
- [ ] Bloques de código con script vanilla accesible que copia el snippet al portapapeles y notifica el estado mediante `aria-live` o cambio de texto temporal.
- [ ] `bun run check` y `bun run build` compilan sin errores.

---

## 3. Paso a Paso Guiado

### Paso 1: Configurar Shiki dual-theme en `astro.config.mjs`

Añade la configuración de markdown con temas claro y oscuro:
```javascript
export default defineConfig({
  site: 'https://samsar.dev',
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      wrap: true,
    },
  },
  integrations: [vue(), mdx()],
});
```

### Paso 2: Crear `src/components/ui/Callout.astro`

```astro
---
interface Props {
  type?: 'note' | 'tip' | 'warning' | 'danger';
  title?: string;
}

const { type = 'note', title } = Astro.props;

const styles = {
  note: {
    border: 'border-l-[var(--color-jade)]',
    bg: 'bg-[var(--color-jade)]/10',
    titleColor: 'text-[var(--color-jade)]',
    defaultTitle: 'Nota',
  },
  tip: {
    border: 'border-l-[var(--color-hummingbird)]',
    bg: 'bg-[var(--color-hummingbird)]/10',
    titleColor: 'text-[var(--color-hummingbird)]',
    defaultTitle: 'Consejo',
  },
  warning: {
    border: 'border-l-[var(--color-sun-gold)]',
    bg: 'bg-[var(--color-sun-gold)]/10',
    titleColor: 'text-[var(--color-sun-gold)]',
    defaultTitle: 'Atención',
  },
  danger: {
    border: 'border-l-[var(--color-blood)]',
    bg: 'bg-[var(--color-blood)]/10',
    titleColor: 'text-[var(--color-blood)]',
    defaultTitle: 'Peligro',
  },
}[type];
---

<aside class:list={['my-6 p-4 rounded-r-lg border-l-4 text-sm leading-relaxed', styles.border, styles.bg]} role="note">
  <div class:list={['font-display font-bold mb-1 flex items-center gap-2', styles.titleColor]}>
    <span>{title || styles.defaultTitle}</span>
  </div>
  <div class="text-[var(--text-primary)]">
    <slot />
  </div>
</aside>
```

### Paso 3: Crear `src/components/blog/Breadcrumbs.astro`

```astro
---
interface Item {
  label: string;
  href?: string;
}

interface Props {
  items: Item[];
}

const { items } = Astro.props;
---

<nav aria-label="Migas de pan" class="text-xs font-mono text-[var(--text-muted)] mb-6">
  <ol class="flex flex-wrap items-center gap-1.5">
    <li><a href="/" class="hover:text-[var(--text-primary)] transition-colors">Inicio</a></li>
    {items.map((item, idx) => (
      <li class="flex items-center gap-1.5">
        <span aria-hidden="true">/</span>
        {item.href && idx < items.length - 1 ? (
          <a href={item.href} class="hover:text-[var(--text-primary)] transition-colors">{item.label}</a>
        ) : (
          <span class="text-[var(--text-primary)] font-medium truncate max-w-[200px] sm:max-w-xs">{item.label}</span>
        )}
      </li>
    ))}
  </ol>
</nav>
```

### Paso 4: Crear `src/components/blog/TOC.astro`

```astro
---
interface Heading {
  depth: number;
  slug: string;
  text: string;
}

interface Props {
  headings: Heading[];
}

const { headings } = Astro.props;
const toc = headings.filter((h) => h.depth === 2 || h.depth === 3);
---

{toc.length > 0 && (
  <nav aria-label="Tabla de contenidos" class="p-4 rounded-xl border border-[var(--border-base)] bg-[var(--bg-surface)] text-xs">
    <p class="font-display font-bold text-[var(--text-primary)] uppercase tracking-wider mb-3">En este artículo</p>
    <ul class="space-y-2">
      {toc.map((item) => (
        <li class:list={[item.depth === 3 ? 'pl-3' : '']}>
          <a href={`#${item.slug}`} class="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors focus-visible:underline">
            {item.text}
          </a>
        </li>
      ))}
    </ul>
  </nav>
)}
```

### Paso 5: Implementar `src/layouts/BlogLayout.astro`

Crea el layout envolviendo el contenido en un grid responsivo con TOC en la barra lateral e incorporando un script vanilla no bloqueante para el botón de copiado de bloques `<pre>`:

```astro
---
import BaseLayout from './BaseLayout.astro';
import Breadcrumbs from '../components/blog/Breadcrumbs.astro';
import TOC from '../components/blog/TOC.astro';
import type { MarkdownHeading } from 'astro';

interface Props {
  title: string;
  description: string;
  headings: MarkdownHeading[];
  category: 'samsar-dev' | 'samsar-ia' | 'samsar-games';
  pubDate: Date;
}

const { title, description, headings, category, pubDate } = Astro.props;

const categoryLabels = {
  'samsar-dev': 'Samsar|Dev',
  'samsar-ia': 'Samsar|IA',
  'samsar-games': 'Samsar|Games',
};
---

<BaseLayout title={`${title} | ${categoryLabels[category]}`} description={description}>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 py-8">
    <Breadcrumbs items={[
      { label: 'Blog', href: '/blog' },
      { label: categoryLabels[category], href: `/blog/${category}` },
      { label: title },
    ]} />

    <div class="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-12 items-start">
      <article class="max-w-[70ch] mx-auto lg:mx-0 w-full prose-samsar">
        <slot />
      </article>

      <aside class="hidden lg:block sticky top-24">
        <TOC headings={headings} />
      </aside>
    </div>
  </div>

  <script is:inline>
    document.querySelectorAll('pre').forEach((pre) => {
      const button = document.createElement('button');
      button.className = 'copy-code-btn';
      button.innerText = 'Copiar';
      button.setAttribute('aria-label', 'Copiar código al portapapeles');
      button.onclick = async () => {
        const code = pre.querySelector('code')?.innerText || pre.innerText;
        await navigator.clipboard.writeText(code);
        button.innerText = '¡Copiado!';
        setTimeout(() => { button.innerText = 'Copiar'; }, 2000);
      };
      pre.style.position = 'relative';
      pre.appendChild(button);
    });
  </script>
</BaseLayout>
```

---

## 4. Comprobación y Verificación

1. Verifica que las clases del Callout cumplan con el contraste mínimo de 4.5:1.
2. Comprueba que el script de copiar código solo añada el botón en bloques `<pre>` y limpie el estado tras 2 segundos.
3. Ejecuta:
   ```bash
   bun run check && bun run build
   ```

---

## 5. Pistas Didácticas y Errores Comunes

- **Prose y justificación:** Nunca apliques `text-justify`. En pantallas web produce espacios irregulares ("ríos") que dañan la lectura y perjudican a lectores con dislexia.
- **`is:inline` en scripts de utilidad:** El script de copiado no requiere Vue ni React: con vanilla JS y `is:inline` Astro lo coloca directamente sin generar bundles adicionales de cliente.
