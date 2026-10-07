# Tarea 02: Página de Perfil Personal (`/sobre-mi`)

- **Fase:** 05 — Perfil y Experiencia Profesional
- **Estimación:** 35 minutos
- **Documentos de referencia:** [`docs/01-product/screens/02-profile-and-experience.md`](../../01-product/screens/02-profile-and-experience.md) · [`DESIGN.md`](../../../DESIGN.md)

---

## 1. Objetivo Pedagógico

Construir una página de presentación personal y filosófica en Astro que combine composición visual elegante, tipografía legible y diseño atómico. Integrarás imágenes optimizadas con `astro:assets`, maquetarás secciones temáticas (áreas de interés, valores éticos y stack técnico) y aplicarás tokens semánticos respetando el contraste WCAG AA en temas claro y oscuro.

---

## 2. Criterios de Aceptación (DoD)

- [ ] Ruta `src/pages/sobre-mi.astro` implementada con `BaseLayout.astro`.
- [ ] **Hero Personal:** foto/avatar optimizado con `astro:assets` (`Image`), nombre completo, tagline y ubicación geográfica.
- [ ] **Biografía Narrativa:** 3 a 4 párrafos que relatan trayectoria, valores de ingeniería y pasión comunitaria.
- [ ] **Áreas de Interés:** cuadrícula responsive de 6 bloques temáticos utilizando componentes `Card.astro`.
- [ ] **Valores y Filosofía:** lista estructurada de 5 principios con numeración maya o monoespaciada legible.
- [ ] **Stack de Dominio:** competencias agrupadas por categoría con componentes `Chip.astro`.
- [ ] **Fuera de la Terminal:** bloque personal sobre paternidad, diseño lúdico y proyectos creativos.
- [ ] **CTA Contacto:** bloque final accesible con enlace a `/contacto`.
- [ ] `bun run check` y `bun run build` pasan con 0 errores y 0 advertencias.

---

## 3. Paso a Paso Guiado

### Paso 1: Crear la estructura de la página en `src/pages/sobre-mi.astro`

Importa los componentes necesarios y los datos de `src/data/profile.ts`:

```astro
---
import { Image } from 'astro:assets';
import BaseLayout from '../layouts/BaseLayout.astro';
import Card from '../components/ui/Card.astro';
import Chip from '../components/ui/Chip.astro';
import Button from '../components/ui/Button.astro';
import avatarImg from '../assets/avatar.png';
import { profileData } from '../data/profile';
---

<BaseLayout
  title="Sobre mí | Samuel Sarmientos"
  description="Presentación personal, valores de ingeniería de software, áreas de exploración y filosofía técnica de Samuel Sarmientos."
>
  {/* Secciones de la página */}
</BaseLayout>
```

### Paso 2: Hero y Biografía Narrativa

Maqueta el encabezado con dos columnas en pantallas grandes (avatar optimizado y datos principales), seguido de la prosa biográfica con espaciado generoso y tipografía `font-sans`:

```astro
<header class="py-16 sm:py-20 border-b border-[var(--border-base)]">
  <div class="mx-auto max-w-4xl px-4 sm:px-6 flex flex-col sm:flex-row items-center gap-8 sm:gap-12">
    <div class="relative shrink-0">
      <div class="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-2 border-[var(--accent-primary)]/40 shadow-lg">
        <Image src={avatarImg} alt="Samuel Sarmientos" class="w-full h-full object-cover" />
      </div>
    </div>
    <div class="text-center sm:text-left">
      <p class="font-mono text-xs uppercase tracking-wider text-[var(--accent-primary)] mb-2">
        {profileData.location}
      </p>
      <h1 class="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)]">
        {profileData.name}
      </h1>
      <p class="mt-3 text-lg text-[var(--text-secondary)] font-sans leading-relaxed">
        {profileData.tagline}
      </p>
    </div>
  </div>
</header>
```

### Paso 3: Áreas de Interés, Valores y Stack

1. **Áreas de Interés:** utiliza un grid de 1 columna en móvil, 2 en tablet y 3 en desktop (`grid sm:grid-cols-2 lg:grid-cols-3 gap-6`), renderizando cada una en un `Card`.
2. **Valores:** destaca cada principio con un número monoespaciado en color de acento (`var(--accent-primary)`).
3. **Stack:** agrupa las categorías en un contenedor limpio usando chips semánticos.

### Paso 4: Fuera de la Terminal y CTA

Cierra la página con una sección humana sobre el aprendizaje con su hijo y un bloque de llamada a la acción con `Button` hacia `/contacto`.

---

## 4. Comprobación y Verificación

1. Inicia el servidor de desarrollo:
   ```bash
   bun run dev
   ```
2. Navega a `http://localhost:4321/sobre-mi`.
3. Comprueba el renderizado del avatar, el contraste en modo claro y oscuro, y la responsividad en 360px, 768px y 1200px.
4. Ejecuta la verificación estática:
   ```bash
   bun run check
   bun run build
   ```
