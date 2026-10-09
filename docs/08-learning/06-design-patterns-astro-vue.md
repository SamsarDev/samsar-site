# 06-design-patterns-astro-vue: Patrones de Diseño en Arquitecturas SSG e Islas

Este módulo didáctico analiza los patrones de arquitectura y diseño aplicados en la combinación de **Astro 7** como generador de sitios estáticos (SSG) y **Vue 3** como motor de islas interactivas.

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
  (function () {
    // Se ejecuta ANTES de pintar el primer píxel del DOM
    const storedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = storedTheme || (systemPrefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  })();
</script>
```

**Resultado:** Cero parpadeos. El atributo `data-theme="dark"` (o `"light"`) está en la etiqueta `<html>` desde el primer milisegundo de pintado, así que el CSS ya sabe qué tokens aplicar.

### Por qué un atributo `data-theme` y no una clase `.dark`

Este es el malentendido más común al llegar desde un tutorial de Tailwind. Cuando un proyecto usa la variante `dark:` de Tailwind, el tema se activa con una clase: `<html class="dark">` acompañado de `darkMode: 'class'`. **Aquí no funciona así**, y copiar ese ejemplo no cambia absolutamente nada en pantalla:

- El tema vive en **custom properties** resueltas por selectores de atributo en `src/styles/theme.css`: `:root, [data-theme='dark']` define los tokens por defecto (*Obsidiana & Jade*) y `[data-theme='light']` los sobreescribe (*Cielo, Sol y Maíz*).
- `document.documentElement.classList.add('dark')` **no tendría ningún efecto visual**: en este proyecto no existe ningún selector `.dark` que lo lea.
- Como los componentes usan solo **tokens semánticos** (`var(--bg-primary)`, `var(--text-primary)`) y nunca colores fijos, cambiar el atributo repinta el sitio entero sin tocar un solo componente.

La ventaja del atributo sobre la clase es que admite más de dos temas sin tocar el JavaScript (`data-theme="sepia"`) y deja el estado legible en el propio DOM. Además, `theme.css` declara los tokens oscuros en `:root`, así que si el script nunca llegara a ejecutarse el sitio **sigue siendo legible**: cae al tema por defecto en lugar de quedarse sin estilos.

**Quién más toca este mecanismo:** la isla `ThemeToggle.vue` no inventa nada por su cuenta — lee el atributo actual con `getAttribute('data-theme')` al montarse y, al hacer clic, escribe el nuevo valor con `setAttribute` y lo persiste en `localStorage`. Es decir, el script del `<head>` fija el tema inicial y la isla solo lo alterna.

> **Nota de mantenimiento:** si algún día cambia el mecanismo de tema, hay que actualizar los cuatro sitios que lo implementan o lo describen: [`src/layouts/BaseLayout.astro`](../../src/layouts/BaseLayout.astro) (script del `<head>`), [`src/components/islands/ThemeToggle.vue`](../../src/components/islands/ThemeToggle.vue) (alternancia), [`docs/02-architecture/03-islands.md`](../02-architecture/03-islands.md) §3 y este módulo.

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
