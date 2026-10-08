# 06-design-patterns-astro-vue: Patrones de Diseño en Arquitecturas SSG e Islas

Este módulo didáctico analiza los patrones de arquitectura y diseño aplicados en la combinación de **Astro 6** como generador de sitios estáticos (SSG) y **Vue 3** como motor de islas interactivas.

---

## 1. El Paradigma de las Islas de Componentes (Island Architecture)

En los frameworks tradicionales basados en Single Page Applications (SPAs como React SPA, Nuxt o Angular clásico), el navegador descarga y ejecuta JavaScript para hidratar la página completa, incluso en páginas donde el 95% del contenido es texto estático.

Astro invierte esta ecuación:

```text
┌─────────────────────────────────────────────────────────────┐
│ HTML Estático compilado en el servidor (Cero JS)            │
│ ┌───────────────┐                          ┌──────────────┐ │
│ │ Header estático│                          │ Texto y cards│ │
│ └───────────────┘                          └──────────────┘ │
│         ┌──────────────────────────────────────┐            │
│         │ Isla Reactiva Vue (JavaScript local) │            │
│         │ Hydration: client:visible            │            │
│         └──────────────────────────────────────┘            │
└─────────────────────────────────────────────────────────────┘
```

- **Ventaja de rendimiento:** Cero sobrecarga de hidratación para layouts, headers, párrafos e imágenes.
- **Ventaja de estabilidad:** Un fallo en el JavaScript de una isla no rompe el resto de la página.

---

## 2. Patrón Anti-FOUC (Flash of Unstyled Content / Theme)

Uno de los problemas más frecuentes al implementar temas claro y oscuro es el "parpadeo blanco" (FOUC) que ocurre cuando el JavaScript del cliente se ejecuta después de que el HTML ya se ha renderizado.

### La Solución Arquitectónica
En lugar de resolver el tema dentro de una isla de Vue o en un script asíncrono diferido, se inyecta un **script síncrono bloqueante ultraligero en el `<head>`** de `BaseLayout.astro`:

```html
<script is:inline>
  // Se ejecuta ANTES de pintar el primer píxel del DOM
  const theme = (() => {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme');
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  })();

  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
</script>
```

**Resultado:** Cero parpadeos. La clase `.dark` está presente en la etiqueta `<html>` desde el primer milisegundo de pintado.

---

## 3. Patrón Lazy Hydration (Hidratación Perezosa)

No todos los componentes interactivos tienen la misma prioridad en la experiencia del usuario.

En este sitio, componentes como la línea temporal de experiencia (`ExperienceTimeline.vue`) se ubican debajo del pliegue de la pantalla (below-the-fold). Si usáramos hidratación inmediata (`client:load`), el navegador competiría por recursos de CPU y red en el momento más crítico.

```astro
<!-- Hidratación diferida: el bundle de Vue no se ejecuta hasta que entra en el viewport -->
<ExperienceTimeline client:visible experiences={experiencesData} />
```

### Cómo funciona por dentro
Astro utiliza la API nativa de `IntersectionObserver` del navegador para vigilar la posición del elemento. Solo cuando el usuario hace scroll y el componente está próximo a aparecer en pantalla, se descarga y monta el bundle JS de Vue.

---

## 4. Patrón Static Collection Fetching con Fallbacks

En la compilación de rutas estáticas (`getStaticPaths`), es una buena práctica asegurar la inmutabilidad y el tipado de los datos:

```typescript
// src/pages/proyectos/[slug].astro
export async function getStaticPaths() {
  const projects = await getCollection('projects');
  
  return projects.map((project) => ({
    params: { slug: project.id },
    props: { project },
  }));
}

const { project } = Astro.props;
```

- **Rendimiento O(1) en runtime:** Al compilarse estáticamente, la consulta a la colección se ejecuta una sola vez durante el build (`bun run build`). En producción, la página es servida como HTML puro desde el Edge de Cloudflare con latencia inferior a 50 ms.
- **Seguridad en tipos:** `Astro.props` hereda el tipo inferido por el esquema Zod de la colección. Si el modelo de datos cambia, el compilador TypeScript detecta cualquier inconsistencia antes del despliegue.

---

## 5. Resumen de Patrones para Estudiantes

| Patrón | Problema que resuelve | Dónde se aplica en este sitio |
|---|---|---|
| **Islands Architecture** | Sobrecarga de JS y lentitud en TTI | Todo el sitio (`src/components/islands/`) |
| **Anti-FOUC Head Script** | Parpadeo de tema oscuro/claro al recargar | `src/layouts/BaseLayout.astro` |
| **Lazy Hydration** | Bloqueo de CPU en componentes no visibles | `client:visible` en islas interactivas |
| **Static Route Generation** | Cargas dinámicas lentas en runtime | Rutas `[slug].astro` con `getStaticPaths()` |
