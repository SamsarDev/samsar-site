# Tarea 05: Implementación de Cabecera, Navegación y Menú Móvil

- **Fase:** 01 — Fundación y Core UI
- **Estimación:** 35 minutos
- **Documentos de referencia:** [`docs/02-architecture/02-project-structure.md`](../../02-architecture/02-project-structure.md) · [`docs/03-design/components/02-layout.md`](../../03-design/components/02-layout.md) · [`ADR-0004`](../../07-decisions/0004-vue-islands.md)

---

## 1. Objetivo Pedagógico

Aprender a estructurar el **andamiaje de navegación semántico y accesible** combinando componentes estáticos de Astro (`Header.astro`, `Nav.astro`, `Footer.astro`) con una isla interactiva Vue (`MobileMenu.vue`). Comprenderás cómo manejar estados de menú móvil (bloqueo de scroll, tecla Escape y foco accesible) sin inflar el bundle de JavaScript en escritorio.

---

## 2. Criterios de Aceptación (DoD)

- [ ] Existe `src/components/layout/Nav.astro` con enlaces semánticos y detección de ruta activa (`aria-current="page"`).
- [ ] Existe `src/components/islands/MobileMenu.vue` con `<script setup lang="ts">`, hidratado con `client:idle`.
- [ ] El menú móvil soporta cierre con tecla `Escape`, clic fuera del drawer y previene el scroll en `document.body` al abrirse.
- [ ] Existe `src/components/layout/Header.astro` fijo (`sticky top-0 z-40`) integrando logo, `Nav.astro`, `ThemeToggle.vue` y el botón hamburguesa / isla móvil.
- [ ] Existe `src/components/layout/Footer.astro` con enlaces de redes, copyright y leyenda de identidad.
- [ ] La barra superior es completamente navegable con teclado (`Tab` / `Shift+Tab`) en desktop y mobile.
- [ ] `BaseLayout.astro` incorpora `<Header />` y `<Footer />` envolviendo el `<slot />` principal.

---

## 3. Paso a Paso Guiado

### Paso 1: Crear `src/components/layout/Nav.astro`
Este componente renderiza los enlaces principales para pantallas medianas y grandes (≥ 768px):

```astro
---
interface Props {
  class?: string;
}

const { class: className = '' } = Astro.props;
const pathname = new URL(Astro.request.url).pathname;

const navItems = [
  { label: 'Inicio', href: '/' },
  { label: 'Sobre mí', href: '/sobre-mi' },
  { label: 'Proyectos', href: '/proyectos' },
  { label: 'Blog', href: '/blog' },
  { label: 'Experiencia', href: '/experiencia' },
  { label: 'Contacto', href: '/contacto' },
];
---

<nav aria-label="Navegación principal" class:list={['hidden md:flex items-center gap-6', className]}>
  {
    navItems.map((item) => {
      const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
      return (
        <a
          href={item.href}
          aria-current={isActive ? 'page' : undefined}
          class:list={[
            'text-sm font-medium transition-colors hover:text-[var(--accent-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] rounded px-1 py-0.5',
            isActive ? 'text-[var(--accent-primary)] font-semibold' : 'text-[var(--text-secondary)]',
          ]}
        >
          {item.label}
        </a>
      );
    })
  }
</nav>
```

### Paso 2: Crear la isla `src/components/islands/MobileMenu.vue`
La isla gestiona el botón disparador y el cajón desplegable (drawer) para pantallas pequeñas:

```vue
<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';

interface NavItem {
  label: string;
  href: string;
}

const props = defineProps<{
  items: NavItem[];
  currentPath: string;
}>();

const isOpen = ref(false);

function toggleMenu() {
  isOpen.value = !isOpen.value;
}

function closeMenu() {
  isOpen.value = false;
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && isOpen.value) {
    closeMenu();
  }
}

watch(isOpen, (newVal) => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = newVal ? 'hidden' : '';
  }
});

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
  if (typeof document !== 'undefined') {
    document.body.style.overflow = '';
  }
});
</script>

<template>
  <div class="md:hidden">
    <!-- Botón hamburguesa -->
    <button
      type="button"
      class="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border-base)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]"
      :aria-expanded="isOpen"
      aria-label="Abrir menú de navegación"
      @click="toggleMenu"
    >
      <svg
        v-if="!isOpen"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
      <svg
        v-else
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>

    <!-- Overlay y Drawer -->
    <teleport to="body">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex"
        role="dialog"
        aria-modal="true"
        aria-label="Menú móvil"
      >
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" @click="closeMenu" />

        <!-- Panel deslizante -->
        <div class="relative ml-auto flex h-full w-3/4 max-w-xs flex-col border-l border-[var(--border-base)] bg-[var(--bg-surface)] p-6 shadow-xl">
          <div class="flex items-center justify-between pb-6 border-b border-[var(--border-base)]">
            <span class="font-['Space_Grotesk'] font-bold text-lg text-[var(--text-primary)]">Menú</span>
            <button
              type="button"
              class="rounded p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              aria-label="Cerrar menú"
              @click="closeMenu"
            >
              ✕
            </button>
          </div>

          <nav class="mt-6 flex flex-col gap-4">
            <a
              v-for="item in props.items"
              :key="item.href"
              :href="item.href"
              :class="[
                'text-base font-medium transition-colors hover:text-[var(--accent-primary)]',
                props.currentPath === item.href ? 'text-[var(--accent-primary)] font-semibold' : 'text-[var(--text-primary)]'
              ]"
              @click="closeMenu"
            >
              {{ item.label }}
            </a>
          </nav>
        </div>
      </div>
    </teleport>
  </div>
</template>
```

### Paso 3: Crear `src/components/layout/Header.astro`
```astro
---
import Nav from './Nav.astro';
import ThemeToggle from '../islands/ThemeToggle.vue';
import MobileMenu from '../islands/MobileMenu.vue';

const pathname = new URL(Astro.request.url).pathname;
const navItems = [
  { label: 'Inicio', href: '/' },
  { label: 'Sobre mí', href: '/sobre-mi' },
  { label: 'Proyectos', href: '/proyectos' },
  { label: 'Blog', href: '/blog' },
  { label: 'Experiencia', href: '/experiencia' },
  { label: 'Contacto', href: '/contacto' },
];
---

<header class="sticky top-0 z-40 w-full border-b border-[var(--border-base)] bg-[var(--bg-surface)]/95 backdrop-blur-md">
  <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
    <a href="/" class="font-['Space_Grotesk'] text-xl font-bold tracking-tight text-[var(--text-primary)]">
      Samsar<span class="text-[var(--accent-primary)]">.</span>
    </a>

    <div class="flex items-center gap-4">
      <Nav />
      <ThemeToggle client:idle />
      <MobileMenu client:idle items={navItems} currentPath={pathname} />
    </div>
  </div>
</header>
```

### Paso 4: Crear `src/components/layout/Footer.astro`
```astro
---
const currentYear = new Date().getFullYear();
---

<footer class="border-t border-[var(--border-base)] bg-[var(--bg-surface)] text-[var(--text-secondary)]">
  <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
    <p class="text-sm">
      &copy; {currentYear} Samuel Sarmientos. Hecho con cariño en Guatemala.
    </p>
    <div class="flex items-center gap-6 text-sm">
      <a href="https://github.com" target="_blank" rel="noopener noreferrer" class="hover:text-[var(--accent-primary)]">GitHub</a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="hover:text-[var(--accent-primary)]">LinkedIn</a>
      <a href="mailto:hola@samsar.dev" class="hover:text-[var(--accent-primary)]">Contacto</a>
    </div>
  </div>
</footer>
```

### Paso 5: Conectar en `src/layouts/BaseLayout.astro`
Importa e incluye `<Header />` y `<Footer />` envolviendo `<slot />` con `<main class="flex-1">`.

---

## 4. Comprobación y Verificación

1. Ejecuta `bun run dev`.
2. **Escritorio:** Verifica que `Nav.astro` sea visible y el botón móvil esté oculto.
3. **Móvil (< 768px):** Abre DevTools en vista responsiva, pulsa el botón hamburguesa:
   - Debe abrirse el cajón y bloquearse el scroll del fondo.
   - Presiona `Escape`: el menú debe cerrarse.
4. Ejecuta `bun run check` y `bun run build` para asegurar cero errores de tipos y empaquetado.

---

## 5. Pistas Didácticas y Errores Comunes

> 💡 **¿Por qué usar `<teleport to="body">` en el menú móvil?**  
> Cuando un menú se ubica dentro de un elemento con `overflow: hidden`, `backdrop-filter` o `position: sticky`, pueden surgir problemas de apilamiento (`z-index`) o recorte visual. Teleportar el drawer directamente al `<body>` garantiza que el modal ocupe toda la pantalla de forma predecible sin interferencias de sus contenedores padres.
