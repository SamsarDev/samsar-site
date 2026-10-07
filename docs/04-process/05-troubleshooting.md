# 05-troubleshooting: Resolución de Problemas Frecuentes

Diagnóstico y solución paso a paso para los 5 fallos técnicos más comunes en el stack de **Samsar | Sitio web personal**.

---

## 1. `bun run check` Falla por Esquemas Zod o Tipos Astro

### Síntoma
El comando de verificación arroja errores como `Type 'string' is not assignable to type 'Date'` o `Property 'title' does not exist on type 'unknown'`.

### Causa
El frontmatter de un artículo no cumple con el esquema definido en `src/content.config.ts`, o una prop de un componente `.astro` no fue tipada en la interfaz `Props`.

### Solución
1. Verifica que las fechas en Markdown utilicen el formato estándar ISO `AAAA-MM-DD` y que el esquema Zod utilice `z.coerce.date()`.
2. Asegúrate de que las props opcionales tengan el operador `?` (ej. `updatedDate?: Date`).
3. Revisa que el componente exporte explícitamente:
   ```astro
   ---
   interface Props {
     title: string;
   }
   const { title } = Astro.props;
   ---
   ```

---

## 2. Tailwind v4 No Aplica Estilos o No Reconoce Clases

### Síntoma
Las utilidades de Tailwind o los tokens semánticos no se reflejan en el navegador o aparecen como texto sin formato.

### Causa
En Tailwind v4, la configuración es **CSS-first**; no existe `tailwind.config.js`. Si no se incluye `@import "tailwindcss";` en el orden correcto o se intenta usar `@apply` con clases inexistentes, el motor falla en silencio.

### Solución
1. Verifica que `src/styles/global.css` contenga al inicio:
   ```css
   @import "tailwindcss";
   @import "./theme.css";
   ```
2. Asegúrate de que `astro.config.mjs` incluya el plugin `@tailwindcss/vite`.
3. Para tokens personalizados, asegúrate de referenciarlos con `var(--nombre-token)` o registrarlos como directivas de tema en CSS.

---

## 3. Error de Hidratación en Islas Vue (`window is not defined`)

### Síntoma
La consola del navegador arroja `ReferenceError: window is not defined` o `localStorage is not available` al compilar el proyecto en `bun run build`.

### Causa
Astro prerenderiza todos los componentes Vue en el servidor antes de enviarlos. Si el código de un componente intenta acceder a APIs exclusivas del navegador (como `window`, `document` o `localStorage`) en el nivel raíz de `<script setup>`, el build fallará porque Node/Bun no tienen objeto `window`.

### Solución
Mueve el acceso a APIs del navegador dentro del hook de ciclo de vida `onMounted`:
```vue
<script setup lang="ts">
import { onMounted } from 'vue';

onMounted(() => {
  // Seguro: solo se ejecuta en el navegador del cliente
  const theme = localStorage.getItem('theme');
});
</script>
```

---

## 4. Parpadeo de Tema Visual (FOUC) al Recargar

### Síntoma
Al navegar con tema claro, la página parpadea en negro/oscuro por una fracción de segundo antes de aplicar los estilos correctos.

### Causa
La isla `ThemeToggle.vue` se hidrata tarde (`client:idle`) y el navegador ya pintó el fondo por defecto antes de evaluar `localStorage`.

### Solución
Asegúrate de que `src/layouts/BaseLayout.astro` incluya el micro-script bloqueante sincrónico en el `<head>` con la directiva `is:inline`:
```html
<script is:inline>
  const t = localStorage.getItem('theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', t);
</script>
```
*No uses librerías externas para esta lectura inicial; debe ser código JavaScript nativo puro.*

---

## 5. Fallo de Compilación en Cloudflare Pages

### Síntoma
El despliegue falla en la consola de Cloudflare con un error de dependencias o versión de Node incompatible.

### Causa
Cloudflare Pages utiliza por defecto una versión antigua de Node.js si no se especifica lo contrario en las variables de entorno.

### Solución
1. En el panel de Cloudflare Pages, dirígete a **Settings > Environment variables**.
2. Añade la variable `NODE_VERSION` con el valor `22.0.0` (o `BUN_VERSION` con `latest`).
3. Verifica que el comando de compilación sea `bun run build` (o `npm run build`) y que el directorio de salida sea exactamente `dist`.
