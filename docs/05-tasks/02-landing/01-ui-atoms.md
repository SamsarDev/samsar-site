# Tarea 01: Componentes UI Atómicos (Button, Card, Chip, Badge)

- **Fase:** 02 — Landing Page y Átomos de UI
- **Estimación:** 30 minutos
- **Documentos de referencia:** [`docs/03-design/components/01-ui.md`](../../03-design/components/01-ui.md) · [`DESIGN.md`](../../../DESIGN.md) · [`docs/03-design/01-tokens.md`](../../03-design/01-tokens.md)

---

## 1. Objetivo Pedagógico

Aprender a implementar componentes puramente estáticos en Astro (`.astro`) aplicando los principios del **Diseño Atómico**. Construirás los bloques fundamentales de interfaz (`Button`, `Card`, `Chip`, `Badge`) garantizando polimorfismo accesible (`<button>` vs `<a>`), tipado estricto con TypeScript y consumo riguroso de tokens semánticos CSS sin escribir valores hexadecimales manuales.

---

## 2. Criterios de Aceptación (DoD)

- [ ] Existe `src/components/ui/Button.astro` con soporte para variantes (`primary`, `secondary`, `ghost`, `danger`), tamaños (`sm`, `md`, `lg`) y renderizado polimórfico (`<a>` si tiene `href`, `<button>` si no).
- [ ] Existe `src/components/ui/Card.astro` con soporte para variantes (`default`, `interactive`, `featured`) y elevación sutil en hover mediante CSS.
- [ ] Existe `src/components/ui/Chip.astro` para etiquetas tecnológicas o categorías en tipografía monoespaciada (`JetBrains Mono`).
- [ ] Existe `src/components/ui/Badge.astro` para indicadores de estado (`active`, `completed`, `wip`, `archived`).
- [ ] Todos los componentes tienen foco visible (`focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]`).
- [ ] `bun run check` y `bun run build` pasan sin errores ni advertencias de tipo.

---

## 3. Paso a Paso Guiado

### Paso 1: Crear `src/components/ui/Button.astro`
```astro
---
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  class?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  [key: string]: unknown;
}

const {
  variant = 'primary',
  size = 'md',
  href,
  class: className = '',
  disabled = false,
  type = 'button',
  ...rest
} = Astro.props;

const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

const sizeStyles = {
  sm: 'text-xs px-3 py-1.5 min-h-[36px]',
  md: 'text-sm px-4 py-2 min-h-[44px]',
  lg: 'text-base px-6 py-3 min-h-[48px]',
};

const variantStyles = {
  primary: 'bg-[var(--accent-primary)] text-[var(--text-on-accent)] font-semibold hover:bg-[var(--accent-primary-hover)] active:translate-y-0.5',
  secondary: 'border border-[var(--border-base)] bg-transparent text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] active:translate-y-0.5',
  ghost: 'bg-transparent text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]',
  danger: 'bg-[var(--color-blood)] text-[#FFFDF7] hover:opacity-90',
};

const combinedClasses = [baseStyles, sizeStyles[size], variantStyles[variant], className].join(' ');
---

{
  href ? (
    <a href={href} class={combinedClasses} {...rest}>
      <slot />
    </a>
  ) : (
    <button type={type} class={combinedClasses} disabled={disabled} {...rest}>
      <slot />
    </button>
  )
}
```

### Paso 2: Crear `src/components/ui/Card.astro`
```astro
---
interface Props {
  variant?: 'default' | 'interactive' | 'featured';
  class?: string;
}

const { variant = 'default', class: className = '' } = Astro.props;

const baseStyles = 'rounded-xl border border-[var(--border-base)] bg-[var(--bg-surface)] p-6 transition-all duration-200';

const variantStyles = {
  default: '',
  interactive: 'hover:border-[var(--accent-primary)] hover:-translate-y-1 hover:shadow-lg',
  featured: 'border-[var(--accent-primary)]/40 shadow-sm',
};

const combinedClasses = [baseStyles, variantStyles[variant], className].join(' ');
---

<div class={combinedClasses}>
  <slot />
</div>
```

### Paso 3: Crear `src/components/ui/Chip.astro`
```astro
---
interface Props {
  variant?: 'category' | 'tag' | 'stack';
  class?: string;
}

const { variant = 'tag', class: className = '' } = Astro.props;

const baseStyles = 'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-[\'JetBrains_Mono\'] text-xs font-medium tracking-tight';

const variantStyles = {
  category: 'bg-[var(--accent-primary)]/15 text-[var(--accent-primary)]',
  tag: 'bg-[var(--bg-subtle)] text-[var(--text-secondary)]',
  stack: 'border border-[var(--border-base)] bg-[var(--bg-surface)] text-[var(--text-primary)]',
};

const combinedClasses = [baseStyles, variantStyles[variant], className].join(' ');
---

<span class={combinedClasses}>
  <slot />
</span>
```

### Paso 4: Crear `src/components/ui/Badge.astro`
```astro
---
interface Props {
  status?: 'active' | 'completed' | 'wip' | 'archived';
  class?: string;
}

const { status = 'active', class: className = '' } = Astro.props;

const statusStyles = {
  active: 'border-[var(--color-jade)]/30 bg-[var(--color-jade)]/10 text-[var(--color-jade)]',
  completed: 'border-[var(--color-hummingbird)]/30 bg-[var(--color-hummingbird)]/10 text-[var(--color-hummingbird)]',
  wip: 'border-[var(--color-sun)]/30 bg-[var(--color-sun)]/10 text-[var(--color-sun)]',
  archived: 'border-[var(--text-secondary)]/30 bg-[var(--bg-subtle)] text-[var(--text-secondary)]',
};

const labels = {
  active: 'Activo',
  completed: 'Completado',
  wip: 'En desarrollo',
  archived: 'Archivado',
};
---

<span
  class:list={[
    'inline-flex items-center gap-1.5 rounded border px-2 py-0.5 font-[\'JetBrains_Mono\'] text-[0.7rem] font-semibold uppercase tracking-wider',
    statusStyles[status],
    className,
  ]}
>
  <span class="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
  <slot>{labels[status]}</slot>
</span>
```

---

## 4. Comprobación y Verificación

1. Verifica los tipos ejecutando `bun run check`.
2. Prueba las variantes en una página temporal o en `src/pages/index.astro`.
3. Valida la navegación con teclado (`Tab`):
   - El botón debe recibir foco visible con anillo `--border-focus`.
   - El tamaño táctil no debe ser inferior a 36px en `sm` ni a 44px en `md` y `lg`.
4. Ejecuta `bun run build` para asegurar cero advertencias de compilación.

---

## 5. Pistas Didácticas y Errores Comunes

> 💡 **Polimorfismo en Astro:** Al condicionar el renderizado entre `<a>` (cuando hay `href`) y `<button>` (cuando no hay `href`), evitamos el antipatrón de usar botones que se comportan como enlaces o enlaces con `javascript:void(0)`. Esto es fundamental para accesibilidad de lectores de pantalla y tecnología asistiva.
