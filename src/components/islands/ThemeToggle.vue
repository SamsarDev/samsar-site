<script setup lang="ts">
import { ref, onMounted } from 'vue';

const currentTheme = ref<'dark' | 'light'>('dark');

onMounted(() => {
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
    class="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border-base)] bg-[var(--bg-surface)] text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] cursor-pointer"
    :aria-label="currentTheme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'"
    @click="toggleTheme"
  >
    <!-- Icono Sol (se muestra en tema oscuro para invitar a pasar al tema claro) -->
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
      <path stroke-linecap="round" stroke-linejoin="round" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>

    <!-- Icono Luna (se muestra en tema claro para invitar a pasar al tema oscuro) -->
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
      <path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  </button>
</template>
