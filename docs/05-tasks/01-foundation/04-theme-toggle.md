# Tarea 04: Implementación de la Isla Interactiva ThemeToggle.vue

- **Fase:** 01 — Fundación y Core UI
- **Estimación:** 25 minutos
- **Documentos de referencia:** [`docs/02-architecture/03-islands.md`](../../02-architecture/03-islands.md) · [`ADR-0004`](../../07-decisions/0004-vue-islands.md) · [`docs/03-design/components/02-layout.md`](../../03-design/components/02-layout.md)

---

## 1. Objetivo Pedagógico

Aprender a construir una **isla interactiva en Vue 3 con Composition API** (`<script setup lang="ts">`), comprendiendo el concepto de hidratación parcial en Astro, manipulando el atributo `data-theme` en el DOM sin causar errores de SSR y asegurando accesibilidad completa para lectores de pantalla y navegación por teclado.

---

## 2. Criterios de Aceptación (DoD)

- [ ] Existe `src/components/islands/ThemeToggle.vue` utilizando estrictamente `<script setup lang="ts">`.
- [ ] El componente alterna reactivamente entre `'dark'` y `'light'`, actualizando el atributo `data-theme` en `document.documentElement` y guardando la preferencia en `localStorage.setItem('theme', ...)`.
- [ ] El botón incluye el atributo accesible `aria-label="Alternar tema visual"`.
- [ ] La isla se hidrata mediante la directiva `client:idle` (no `client:load`).
- [ ] El botón es usable con teclado (`Tab` y `Enter`/`Space`) y exhibe foco visible.
- [ ] Los iconos vectoriales (Sol y Luna) están incrustados directamente como SVGs inline (sin dependencias npm).

---

## 3. Paso a Paso Guiado

### Paso 1: Crear `src/components/islands/ThemeToggle.vue`
Crea el componente implementando la lógica en `onMounted` para evitar errores durante el prerenderizado SSR:

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue';

const currentTheme = ref<'dark' | 'light'>('dark');

onMounted(() => {
  // Leemos el tema ya aplicado por el script anti-FOUC en el <head>
  const activeTheme = document.documentElement.getAttribute('data-theme');
  if (activeTheme === 'light' || activeTheme === 'dark') {
    currentTheme.value = activeTheme;
  }
});

function toggleTheme() {
  const newTheme = currentTheme.value === 'dark' ? 'light' : 'dark';
  currentTheme.value = newTheme;
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}
</script>

<template>
  <button
    type="button"
    class="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border-base)] bg-[var(--bg-surface)] text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)]"
    :aria-label="currentTheme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'"
    @click="toggleTheme"
  >
    <!-- Icono Sol (se muestra en tema oscuro para sugerir cambio a claro) -->
    <svg
      v-if="currentTheme === 'dark'"
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5 text-[var(--color-sun)]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>

    <!-- Icono Luna (se muestra en tema claro) -->
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5 text-[var(--color-jade)]"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  </button>
</template>
```

### Paso 2: Integrar la isla en `src/pages/index.astro` para pruebas
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import ThemeToggle from '../components/islands/ThemeToggle.vue';
---

<BaseLayout title="Prueba de Toggle | Samsar">
  <div class="mx-auto max-w-4xl px-4 py-16 text-center">
    <h1 class="text-4xl font-bold font-['Space_Grotesk'] text-[var(--text-primary)]">
      Samsar | Código, cultura y curiosidad
    </h1>
    <div class="mt-8 flex justify-center">
      <!-- Directiva de hidratación client:idle -->
      <ThemeToggle client:idle />
    </div>
  </div>
</BaseLayout>
```

---

## 4. Comprobación y Verificación

1. Ejecuta `bun run dev` y abre la página en el navegador.
2. Haz clic en el botón de toggle:
   - Debe alternar suavemente entre el fondo oscuro y el fondo claro.
   - El icono debe cambiar entre Sol y Luna.
3. Navega con el teclado usando `Tab` hasta seleccionar el botón y pulsa `Enter` o `Espacio`.
   - El anillo de foco debe ser visible claramente.
4. Recarga la página: la preferencia seleccionada debe persistir sin parpadeos.
5. Ejecuta `bun run check` y `bun run build` para asegurar compilación limpia.

---

## 5. Pistas Didácticas y Errores Comunes

> 💡 **¿Por qué `client:idle` y no `client:load`?**  
> `client:load` obliga al navegador a descargar e hidratar el JavaScript de inmediato en la carga inicial, compitiendo con el renderizado del LCP. Como el tema visual ya se pintó gracias al script sincrónico del `<head>`, el usuario no necesita hacer clic en el botón en los primeros 100 milisegundos; `client:idle` hidrata la isla cuando el navegador tiene tiempo libre, ahorrando CPU inicial.
