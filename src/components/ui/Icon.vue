<script setup lang="ts">
import { computed } from 'vue';
import { icons, isCircleShape, isPathShape, type IconName } from './icons';

const props = withDefaults(defineProps<{ name: IconName; class?: string }>(), {
  class: 'h-5 w-5',
});

const icon = computed(() => icons[props.name]);
// Split here rather than inside the template so each list keeps its own type.
const pathShapes = computed(() => icon.value.shapes.filter(isPathShape));
const circleShapes = computed(() => icon.value.shapes.filter(isCircleShape));
</script>

<template>
  <!--
    Astro components cannot be rendered from inside a Vue component, so the
    islands use this renderer over the same vector definitions. See ADR-0010.
  -->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="icon.viewBox ?? '0 0 24 24'"
    :fill="icon.filled ? 'currentColor' : 'none'"
    :stroke="icon.filled ? undefined : 'currentColor'"
    :stroke-width="icon.filled ? undefined : (icon.strokeWidth ?? 2)"
    :class="props.class"
    aria-hidden="true"
  >
    <path
      v-for="(shape, index) in pathShapes"
      :key="`path-${index}`"
      :d="shape.d"
      :fill-rule="shape.evenodd ? 'evenodd' : undefined"
      :clip-rule="shape.evenodd ? 'evenodd' : undefined"
      :stroke-width="shape.strokeWidth"
      :stroke-linecap="shape.round ? 'round' : undefined"
      :stroke-linejoin="shape.round ? 'round' : undefined"
    />
    <circle
      v-for="(shape, index) in circleShapes"
      :key="`circle-${index}`"
      :cx="shape.cx"
      :cy="shape.cy"
      :r="shape.r"
      :fill="shape.filled ? 'currentColor' : undefined"
      :stroke-width="shape.strokeWidth"
      :stroke-dasharray="shape.dashed ? '4 4' : undefined"
    />
  </svg>
</template>
