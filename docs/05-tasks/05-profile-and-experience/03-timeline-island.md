# Tarea 03: Isla Interactiva de Timeline Profesional en Vue 3

- **Fase:** 05 — Perfil y Experiencia Profesional
- **Estimación:** 30 minutos
- **Documentos de referencia:** [`docs/02-architecture/03-islands.md`](../../02-architecture/03-islands.md) · [`AGENTS.md`](../../../AGENTS.md)

---

## 1. Objetivo Pedagógico

Dominar el patrón de **Islas de Astro (Astro Islands)** construyendo un componente interactivo con **Vue 3 Composition API** (`<script setup lang="ts">`). Comprenderás cuándo y por qué delegar interactividad al cliente únicamente donde hay estado reactivo real (filtrado de hitos temporales por especialidad), manteniendo el resto de la aplicación 100% estática e hidratando solo bajo demanda con `client:visible`.

---

## 2. Criterios de Aceptación (DoD)

- [ ] Componente `src/components/islands/ExperienceTimeline.vue` implementado con Composition API (`<script setup lang="ts">`).
- [ ] Props tipadas con TypeScript que reciben `ExperienceItem[]`.
- [ ] Estado reactivo (`ref`) para la especialidad seleccionada (`'all' | 'backend' | 'frontend' | 'cloud' | 'ai' | 'leadership'`).
- [ ] Barra de botones/chips de filtro accesibles con `aria-pressed` que actualizan el timeline en el cliente sin recargar la página.
- [ ] Hitos cronológicos con diseño vertical de timeline: punto/nodo visual, cargo, empresa, fechas, insignias de área, viñetas de logros cuantificables y etiquetas de tecnologías.
- [ ] Accesible mediante teclado, foco visible y contraste WCAG AA en temas claro y oscuro.
- [ ] `bun run check` y `bun run build` pasan con 0 errores y 0 advertencias.

---

## 3. Paso a Paso Guiado

### Paso 1: Diseñar el componente en `src/components/islands/ExperienceTimeline.vue`

Estructura el componente con Composition API y define los tipos de props y áreas:

```vue
<script setup lang="ts">
import { ref, computed } from 'vue';
import type { ExperienceItem } from '../../data/experience';

const props = defineProps<{
  experiences: ExperienceItem[];
}>();

const filters = [
  { id: 'all', label: 'Todos' },
  { id: 'backend', label: 'Backend' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'cloud', label: 'Cloud & DevOps' },
  { id: 'ai', label: 'IA & Agentes' },
  { id: 'leadership', label: 'Liderazgo & Mentoría' },
] as const;

type FilterId = typeof filters[number]['id'];

const activeFilter = ref<FilterId>('all');

const filteredExperiences = computed(() => {
  if (activeFilter.value === 'all') return props.experiences;
  return props.experiences.filter((item) =>
    item.area.includes(activeFilter.value as any)
  );
});

function setFilter(id: FilterId) {
  activeFilter.value = id;
}
</script>
```

### Paso 2: Barra de filtros reactiva

Crea la interfaz de botones para alternar entre especialidades, aplicando clases dinámicas según `activeFilter`:

```vue
<template>
  <div class="space-y-8">
    <!-- Barra de filtros -->
    <div class="flex flex-wrap gap-2 items-center" role="group" aria-label="Filtrar experiencia por área">
      <button
        v-for="filter in filters"
        :key="filter.id"
        type="button"
        :aria-pressed="activeFilter === filter.id"
        @click="setFilter(filter.id)"
        :class="[
          'px-3.5 py-1.5 rounded-full text-xs font-mono transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-primary)]',
          activeFilter === filter.id
            ? 'bg-[var(--accent-primary)] text-[var(--text-inverse)] font-medium shadow-sm'
            : 'bg-[var(--bg-surface-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-base)]'
        ]"
      >
        {{ filter.label }}
      </button>
    </div>

    <!-- Timeline vertical -->
    <div class="relative border-l-2 border-[var(--border-base)] ml-4 sm:ml-6 space-y-12">
      <!-- Items de experiencia -->
    </div>
  </div>
</template>
```

### Paso 3: Tarjeta de hito temporal

Para cada experiencia filtrada:
- Coloca un nodo en la línea vertical (`absolute -left-[9px] w-4 h-4 rounded-full bg-[var(--accent-primary)]`).
- Muestra el cargo con tipografía `font-display`, la empresa y las fechas en monoespaciada `font-mono`.
- Lista los logros e impactos medibles con viñetas estilizadas.
- Renderiza chips de tecnologías utilizadas.

---

## 4. Comprobación y Verificación

1. Verifica el tipado con `bun run check`.
2. Prueba la isla montándola de forma aislada o directa en un archivo de prueba.
3. Comprueba que al hacer clic en cada chip, la lista de experiencias se filtre instantáneamente sin alterar el resto del DOM.
4. Asegúrate de que no haya dependencias externas ni directivas de hidratación prematuras (usarás `client:visible` en la tarea 04).
