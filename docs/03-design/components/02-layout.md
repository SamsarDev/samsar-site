# Componentes: Layout y Navegación (`src/components/`)

Especificación de los 6 componentes de andamiaje estructural y navegación general del sitio. **Los seis están implementados**, pero no todos viven en la misma carpeta: `Header`, `Footer` y `Nav` están en `src/components/layout/`; `ThemeToggle` y `MobileMenu` son islas en `src/components/islands/`; y `Breadcrumbs` está en `src/components/blog/`. Cada ficha indica la ruta exacta.

---

## 1. `<Header />` (`Header.astro`)

- **Propósito:** Barra de navegación superior fija (`sticky`) persistente en todas las páginas.
- **Elementos:**
  - Logotipo textual *"Samsar"* en Space Grotesk 700 + símbolo provisional.
  - Enlaces de navegación de escritorio (`<Nav />`).
  - Isla `ThemeToggle.vue` (`client:idle`).
  - Botón de menú hamburguesa móvil que activa `<MobileMenu.vue>`.
- **Estilos:** Fondo `--bg-surface` con `backdrop-filter: blur(8px)` a 95% de opacidad, borde inferior de 1px `--border-base`, altura fija de 64px.
- **Estado:** Implementado — `src/components/layout/Header.astro`

---

## 2. `<Footer />` (`Footer.astro`)

- **Propósito:** Pie de página con enlaces institucionales, redes sociales y aviso de derechos.
- **Elementos:**
  - Enlaces secundarios a todas las secciones.
  - Iconos accesibles a GitHub, LinkedIn y correo directo.
  - Leyendas de licencias (MIT, CC BY-NC).
  - Frase conmemorativa: *"Hecho con cariño en Guatemala"*.
- **Estilos:** Fondo `--bg-surface`, borde superior `--border-base`, padding vertical `--space-7` (48px).
- **Estado:** Implementado — `src/components/layout/Footer.astro`

---

## 3. `<Nav />` (`Nav.astro`)

- **Propósito:** Lista semántica `<nav>` de enlaces principales para escritorio.
- **Rutas enlazadas:** Inicio (`/`), Sobre mí (`/sobre-mi`), Proyectos (`/proyectos`), Blog (`/blog`), Experiencia (`/experiencia`), Contacto (`/contacto`).
- **Estados:** Indicador visual para la ruta activa (`aria-current="page"`), hover en `--accent-primary`.
- **Estado:** Implementado — `src/components/layout/Nav.astro`

---

## 4. `<ThemeToggle />` (`ThemeToggle.vue`)

- **Propósito:** Isla interactiva Vue para conmutar entre tema oscuro y claro.
- **Hidratación:** `client:idle`.
- **Accesibilidad:** Botón con `aria-label` dinámico (*"Cambiar a tema claro"* cuando el tema activo es oscuro y al revés), foco visible con `--border-focus`, y un SVG propio: Sol mientras el tema es oscuro (invita a pasar al claro) y Luna mientras es claro.
- **Estado:** Implementado — `src/components/islands/ThemeToggle.vue` (isla Vue, no componente `.astro` de `layout/`)

---

## 5. `<MobileMenu />` (`MobileMenu.vue`)

- **Propósito:** Isla interactiva Vue para navegación en pantallas móviles (< 768px).
- **Hidratación:** `client:idle`.
- **Comportamiento:** Panel deslizante tipo drawer con bloqueo de scroll de fondo, soporte para tecla `Escape` para cerrar y foco atrapado mientras esté abierto.
- **Estado:** Implementado — `src/components/islands/MobileMenu.vue` (isla Vue)

---

## 6. `<Breadcrumbs />` (`Breadcrumbs.astro`)

- **Propósito:** Migas de pan semánticas para rutas jerárquicas (Post de blog y Detalle de proyecto).
- **Marcado:** Lista ordenada `<ol>` con microdatos accesibles `itemscope itemtype="https://schema.org/BreadcrumbList"`.
- **Estilos:** Texto en Manrope 14px, separadores tenues `/` o glifos mayas estilizados en `--text-secondary`.
- **Estado:** Implementado — `src/components/blog/Breadcrumbs.astro`
