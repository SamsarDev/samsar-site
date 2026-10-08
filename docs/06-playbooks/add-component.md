# Playbook: Cómo Crear un Componente Estático (.astro)

Este playbook describe el procedimiento para crear nuevos componentes estáticos reutilizables en **Samsar | Sitio web personal**.

---

## 1. Contexto & Cuándo Usarlo

En Astro, **por defecto, todo es `.astro`**. Un componente `.astro` se compila a HTML y CSS puros durante el build, generando **cero JavaScript** en el navegador del usuario.

Usa este playbook para:
- Átomos y moléculas de interfaz (botones, badges, chips, callouts, cards).
- Componentes estructurales de diseño (headers, navbars estáticos, footers, contenedores).
- Secciones de páginas (heros, listas de destacados, grillas de artículos).

> **Regla de oro:** Si el componente no necesita manejar eventos interactivos con estado en cliente (como abrir un modal con `useState`/`ref` o escuchar `localStorage`), **debe ser `.astro`**.

---

## 2. Checklist Previo

- [ ] Definir la ubicación correcta según la arquitectura:
  - `src/components/ui/`: Átomos desacoplados reutilizables (ej: `Callout.astro`, `Badge.astro`).
  - `src/components/layout/`: Elementos estructurales (ej: `Header.astro`, `Footer.astro`).
  - `src/components/blog/`: Específicos del blog (ej: `PostCard.astro`, `TOC.astro`).
  - `src/components/landing/`: Específicos de la portada (ej: `Hero.astro`, `Pillars.astro`).
- [ ] Nombrar el archivo en **PascalCase** y en **inglés** (ej: `SkillBadge.astro`).
- [ ] Tipar todas las props mediante `interface Props`.
- [ ] Usar exclusivamente tokens semánticos de CSS (`var(--bg-surface)`, `var(--text-primary)`) o utilidades de Tailwind v4.

---

## 3. Procedimiento Paso a Paso

### Paso 1: Crear el archivo `.astro`
Por ejemplo, creando un callout de aviso técnico: `src/components/ui/AlertCallout.astro`.

### Paso 2: Implementar la plantilla siguiendo el modelo estándar

```astro
---
// src/components/ui/AlertCallout.astro
export interface Props {
  variant?: 'info' | 'warning' | 'success';
  title?: string;
  class?: string;
}

const { variant = 'info', title, class: className = '' } = Astro.props;

// Mapeo semántico de estilos según el variant
const variantStyles = {
  info: 'border-[var(--color-slate-blue)] bg-[var(--color-midnight)]/30 text-[var(--text-primary)]',
  warning: 'border-[var(--color-terracotta)] bg-[var(--color-terracotta)]/10 text-[var(--text-primary)]',
  success: 'border-[var(--color-jade)] bg-[var(--color-jade)]/10 text-[var(--text-primary)]',
};
---

<aside 
  class={`rounded-lg border-l-4 p-4 my-6 ${variantStyles[variant]} ${className}`}
  role="note"
  aria-label={title ?? `Aviso de tipo ${variant}`}
>
  {title && (
    <h4 class="font-heading font-semibold text-base mb-1 text-[var(--text-primary)]">
      {title}
    </h4>
  )}
  <div class="text-sm font-sans text-[var(--text-secondary)] leading-relaxed">
    <slot />
  </div>
</aside>
```

### Paso 3: Reglas de Diseño y Accesibilidad
1. **Sin valores hexadecimales directos:** Nunca escribas `#0F172A` en clases o estilos inline. Usa `var(--bg-surface)` o tokens de Tailwind v4.
2. **Soporte de foco y teclado:** Si el componente es interactivo (ej: un botón o enlace), debe incluir `focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)] focus-visible:outline-none`.
3. **Contraste WCAG AA:** Todo texto debe tener contraste ≥ 4.5:1 con su fondo inmediato tanto en tema claro como en tema oscuro.

---

## 4. Verificación Obligatoria

Ejecuta el chequeo estático y la compilación:

```bash
bun run check
bun run build
```

Ambos comandos deben reportar **0 errores y 0 warnings**.

Prueba manual:
1. Importa el componente en una página de prueba.
2. Abre el inspector de elementos y comprueba que no haya inyección de scripts innecesarios.
3. Alterna entre tema claro y tema oscuro mediante el toggle para asegurar legibilidad en ambos modos.

---

## 5. Errores Comunes y Soluciones

- **Error de TypeScript al consumir props:** Asegúrate de exportar `interface Props` en el frontmatter del componente.
- **Texto invisible en tema claro:** Ocurre cuando se usa una clase fija oscura (ej: `text-white`) en lugar del token semántico `text-[var(--text-primary)]`.
- **Falta de `slot`:** Si el componente debe contener texto o elementos hijos arbitrarios, incluye siempre `<slot />`.
