<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Icon from '../ui/Icon.vue';

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
    <Icon v-if="currentTheme === 'dark'" name="sun" class="h-5 w-5 text-[var(--color-sun)]" />

    <!-- Icono Luna (se muestra en tema claro para invitar a pasar al tema oscuro) -->
    <Icon v-else name="moon" class="h-5 w-5 text-[var(--color-jade)]" />
  </button>
</template>
