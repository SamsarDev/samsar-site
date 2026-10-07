<script setup lang="ts">
import { ref, computed } from 'vue';
import type { ExperienceItem } from '../../data/experience';

const props = defineProps<{
  experiences: ExperienceItem[];
}>();

const filters = [
  { id: 'all', label: 'Todos' },
  { id: 'ai', label: 'IA & Agentes' },
  { id: 'backend', label: 'Backend' },
  { id: 'cloud', label: 'Cloud & DevOps' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'leadership', label: 'Liderazgo & Mentoría' },
] as const;

type FilterId = (typeof filters)[number]['id'];

const activeFilter = ref<FilterId>('all');

function getFilterCount(filterId: FilterId): number {
  if (filterId === 'all') return props.experiences.length;
  return props.experiences.filter((exp) => exp.area.includes(filterId as any)).length;
}

const filteredExperiences = computed(() => {
  if (activeFilter.value === 'all') {
    return props.experiences;
  }
  return props.experiences.filter((exp) =>
    exp.area.includes(activeFilter.value as any)
  );
});

function selectFilter(id: FilterId) {
  activeFilter.value = id;
}

const areaBadgeLabels: Record<string, string> = {
  ai: 'IA & Agentes',
  backend: 'Backend',
  cloud: 'Cloud',
  frontend: 'Frontend',
  leadership: 'Liderazgo',
};
</script>

<template>
  <div class="space-y-8">
    <!-- Barra de filtros reactiva -->
    <div
      class="flex flex-wrap items-center gap-2 p-2 rounded-xl border border-[var(--border-base)] bg-[var(--bg-surface)]"
      role="group"
      aria-label="Filtrar hitos profesionales por especialidad"
    >
      <button
        v-for="filter in filters"
        :key="filter.id"
        type="button"
        :aria-pressed="activeFilter === filter.id"
        @click="selectFilter(filter.id)"
        :class="[
          'px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--border-focus)] cursor-pointer flex items-center gap-1.5',
          activeFilter === filter.id
            ? 'bg-[var(--accent-primary)] text-[var(--text-on-accent)] shadow-sm'
            : 'bg-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)]'
        ]"
      >
        <span>{{ filter.label }}</span>
        <span
          :class="[
            'text-[10px] px-1.5 py-0.2 rounded-full font-mono',
            activeFilter === filter.id
              ? 'bg-black/20 text-[var(--text-on-accent)]'
              : 'bg-[var(--bg-subtle)] text-[var(--text-muted)]'
          ]"
        >
          {{ getFilterCount(filter.id) }}
        </span>
      </button>
    </div>

    <!-- Indicador de total filtrado -->
    <div class="flex items-center justify-between text-xs font-mono text-[var(--text-muted)] px-1">
      <span>
        Mostrando {{ filteredExperiences.length }} de {{ experiences.length }} experiencias
      </span>
      <span v-if="activeFilter !== 'all'">
        Filtro activo:
        <strong class="text-[var(--accent-primary)] font-semibold">
          {{ filters.find((f) => f.id === activeFilter)?.label }}
        </strong>
      </span>
    </div>

    <!-- Timeline vertical -->
    <div class="relative border-l-2 border-[var(--border-base)] ml-3.5 sm:ml-6 pl-6 sm:pl-8 space-y-10">
      <article
        v-for="item in filteredExperiences"
        :key="item.id"
        class="relative group"
      >
        <!-- Nodo del timeline -->
        <div
          class="absolute -left-[31px] sm:-left-[39px] top-5 w-3.5 h-3.5 rounded-full border-2 border-[var(--accent-primary)] bg-[var(--bg-surface)] ring-4 ring-[var(--bg-base)] group-hover:scale-125 group-hover:bg-[var(--accent-primary)] transition-all duration-200"
          aria-hidden="true"
        />

        <!-- Contenedor del hito laboral -->
        <div class="rounded-xl border border-[var(--border-base)] bg-[var(--bg-surface)] p-6 sm:p-7 shadow-sm transition-all duration-200 hover:border-[var(--accent-primary)]/40 hover:shadow-md">
          <!-- Cabecera del hito -->
          <div class="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
            <span class="font-mono text-xs font-semibold text-[var(--accent-primary)] tracking-wide">
              {{ item.period }}
            </span>
            <span class="font-mono text-xs text-[var(--text-muted)]">
              {{ item.location }}
            </span>
          </div>

          <h3 class="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)] tracking-tight">
            {{ item.role }}
          </h3>

          <p class="text-sm sm:text-base font-semibold text-[var(--text-secondary)] font-sans mt-0.5 mb-3">
            {{ item.company }}
          </p>

          <!-- Badges de áreas funcionales -->
          <div class="flex flex-wrap gap-1.5 mb-4">
            <span
              v-for="area in item.area"
              :key="area"
              class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[var(--accent-primary)]/10 text-[var(--accent-primary)] border border-[var(--accent-primary)]/20"
            >
              {{ areaBadgeLabels[area] || area }}
            </span>
          </div>

          <!-- Logros cuantificables -->
          <ul class="space-y-2 mt-4 text-sm text-[var(--text-secondary)] font-sans leading-relaxed">
            <li
              v-for="(achievement, idx) in item.achievements"
              :key="idx"
              class="flex items-start gap-2.5"
            >
              <span class="text-[var(--accent-primary)] font-bold select-none shrink-0 mt-0.5">
                ›
              </span>
              <span>{{ achievement }}</span>
            </li>
          </ul>

          <!-- Stack de tecnologías utilizadas -->
          <div class="mt-6 pt-4 border-t border-[var(--border-base)]/50">
            <div class="flex flex-wrap gap-1.5 items-center">
              <span class="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider mr-1">
                Stack:
              </span>
              <span
                v-for="tech in item.stack"
                :key="tech"
                class="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-mono bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] border border-[var(--border-base)]"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>
