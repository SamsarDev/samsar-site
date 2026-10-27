<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue';
import Icon from '../ui/Icon.vue';

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
      class="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border-base)] bg-[var(--bg-surface)] text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] cursor-pointer"
      :aria-expanded="isOpen"
      aria-label="Abrir menú de navegación"
      @click="toggleMenu"
    >
      <Icon v-if="!isOpen" name="menu" class="h-6 w-6" />
      <Icon v-else name="close" class="h-6 w-6" />
    </button>

    <!-- Overlay y Drawer -->
    <teleport to="body">
      <div v-if="isOpen" class="fixed inset-0 z-50 flex" role="dialog" aria-modal="true" aria-label="Menú móvil">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" @click="closeMenu" />

        <!-- Panel deslizante -->
        <div
          class="relative ml-auto flex h-full w-3/4 max-w-xs flex-col border-l border-[var(--border-base)] bg-[var(--bg-surface)] p-6 shadow-xl"
        >
          <div class="flex items-center justify-between pb-6 border-b border-[var(--border-base)]">
            <span class="font-display font-bold text-lg text-[var(--text-primary)]">Menú</span>
            <button
              type="button"
              class="rounded p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] cursor-pointer"
              aria-label="Cerrar menú"
              @click="closeMenu"
            >
              <Icon name="close" class="h-5 w-5" />
            </button>
          </div>

          <nav class="mt-6 flex flex-col gap-4">
            <a
              v-for="item in props.items"
              :key="item.href"
              :href="item.href"
              :class="[
                'text-base font-medium transition-colors hover:text-[var(--accent-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] rounded px-2 py-1',
                props.currentPath === item.href
                  ? 'text-[var(--accent-primary)] font-medium'
                  : 'text-[var(--text-primary)]',
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
