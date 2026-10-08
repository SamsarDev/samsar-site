# Playbook: Cómo Crear una Isla Interactiva (Vue 3)

Este playbook describe el procedimiento técnico para crear y utilizar islas interactivas de **Vue 3** en **Samsar | Sitio web personal**.

---

## 1. Contexto & Árbol de Decisión

Astro utiliza la arquitectura de **Islas de Componentes (Astro Islands)**: el sitio completo es HTML estático, salvo pequeños componentes interactivos aislados que se hidratan de forma independiente en el cliente.

### ¿Cuándo está justificado crear una isla Vue?
Responde a este árbol de decisión antes de crear un archivo `.vue`:

```text
¿Necesita interactividad?
  ├── NO ────────────────────────────────────────► Usa un componente `.astro`
  └── SÍ
       ├── ¿Es un enlace, formulario simple o acordeón nativo `<details>`?
       │    └── SÍ ──────────────────────────────► Usa HTML semántico en `.astro`
       └── ¿Requiere estado reactivo dinámico en cliente (ref/reactive),
            consumo de localStorage o filtrado instantáneo en DOM?
            └── SÍ ──────────────────────────────► ¡SÍ! Crea una isla Vue en `src/components/islands/`
```

---

## 2. Checklist Previo

- [ ] Confirmar que el componente requiere estado reactivo en cliente.
- [ ] Ubicar el archivo obligatoriamente en `src/components/islands/`.
- [ ] Nombrar el archivo en **PascalCase** y en **inglés** (ej: `ProjectFilter.vue`).
- [ ] Usar exclusivamente la **Composition API con `<script setup lang="ts">`** (prohibido Options API).
- [ ] Elegir la directiva de hidratación más perezosa que funcione (`client:visible` o `client:idle`). Justificar cualquier uso de `client:load`.

---

## 3. Procedimiento Paso a Paso

### Paso 1: Crear el componente Vue
Crea el archivo en `src/components/islands/<Nombre>.vue`. Por ejemplo: `src/components/islands/ReadingProgressBar.vue`.

### Paso 2: Implementar el componente con TypeScript y Composition API

```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// 1. Props estrictamente tipadas
interface Props {
  height?: string;
  ariaLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
  height: '3px',
  ariaLabel: 'Progreso de lectura del artículo',
});

// 2. Estado reactivo en cliente
const progress = ref(0);

const calculateProgress = () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progress.value = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
};

onMounted(() => {
  window.addEventListener('scroll', calculateProgress, { passive: true });
  calculateProgress();
});

onUnmounted(() => {
  window.removeEventListener('scroll', calculateProgress);
});
</script>

<template>
  <div 
    class="fixed top-0 left-0 w-full z-50 bg-transparent pointer-events-none"
    role="progressbar"
    :aria-valuenow="Math.round(progress)"
    aria-valuemin="0"
    aria-valuemax="100"
    :aria-label="props.ariaLabel"
  >
    <div 
      class="bg-[var(--accent-primary)] transition-[width] duration-150 ease-out"
      :style="{ width: `${progress}%`, height: props.height }"
    />
  </div>
</template>
```

### Paso 3: Consumir la isla en una plantilla Astro
Importa el componente `.vue` en tu página o layout de Astro y selecciona la directiva de hidratación adecuada:

```astro
---
import ReadingProgressBar from '../components/islands/ReadingProgressBar.vue';
---

<!-- client:idle: se hidrata cuando el navegador termina la carga inicial crítica -->
<ReadingProgressBar client:idle ariaLabel="Progreso de lectura" />
```

### Directivas de Hidratación Disponibles
| Directiva | Cuándo usarla | Costo de rendimiento |
|---|---|---|
| `client:visible` | **(Recomendada por defecto)** Para componentes que están más abajo en la página (se hidratan solo cuando entran en el viewport). | Mínimo |
| `client:idle` | Para componentes interactivos secundarios que no bloquean el primer pintado. | Bajo |
| `client:load` | Exclusivo para componentes críticos visibles inmediatamente en el viewport inicial (ej: `ThemeToggle.vue`). | Alto |

---

## 4. Verificación Obligatoria

Ejecuta en consola:

```bash
bun run check
bun run build
```

Ambos comandos deben completar con **0 errores y 0 warnings**.

Verificación manual:
1. Inspecciona la pestaña Red (Network) de las Developer Tools: comprueba que el bundle JS del componente solo se descarga cuando se cumple la directiva de hidratación.
2. Comprueba que el componente funciona con navegación por teclado y que respeta el tema claro y oscuro.

---

## 5. Errores Comunes y Soluciones

- **Hydration Mismatch / Error SSR:** Ocurre si accedes a APIs globales del navegador (`window`, `localStorage`, `document`) en el cuerpo raíz del script. **Solución:** Mueve todo acceso al DOM dentro de `onMounted()`.
- **Fuga de estado (Memory Leaks):** Olvidar remover event listeners añadidos a `window`. **Solución:** Limpia siempre los eventos en `onUnmounted()`.
- **Uso innecesario de `client:load`:** Cargar JS crítico en componentes que están al final de la página. **Solución:** Cambia a `client:visible`.
