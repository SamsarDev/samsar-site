# 01-foundation: Fase 1 — Fundación y Core UI

Secuencia de tareas para levantar el andamiaje técnico base de **Samsar | Sitio web personal**.

---

## 1. Secuencia de Tareas

Las tareas deben ejecutarse en orden estricto, ya que cada una construye sobre los cimientos de la anterior:

| # | Tarea | Qué se construye | Archivos Principales |
|---|---|---|---|
| **01** | [`01-init-astro.md`](01-init-astro.md) | Inicialización de Astro 7, TypeScript estricto e integración oficial de Vue 3. | `package.json`, `astro.config.mjs`, `tsconfig.json` |
| **02** | [`02-tailwind-tokens.md`](02-tailwind-tokens.md) | Integración de Tailwind v4 CSS-first, tokens en `theme.css` y fuentes WOFF2 locales. | `src/styles/theme.css`, `src/styles/global.css`, `public/fonts/` |
| **03** | [`03-base-layout.md`](03-base-layout.md) | Layout maestro con script anti-FOUC en `<head>`, metadatos SEO y slots. | `src/layouts/BaseLayout.astro`, `src/pages/index.astro` |
| **04** | [`04-theme-toggle.md`](04-theme-toggle.md) | Isla interactiva Vue para conmutar entre tema oscuro y claro con `localStorage`. | `src/components/islands/ThemeToggle.vue` |
| **05** | [`05-navigation.md`](05-navigation.md) | Cabecera fija, footer, navegación de escritorio y menú móvil accesible. | `src/components/layout/Header.astro`, `Footer.astro`, `MobileMenu.vue` |

---

## 2. Prerrequisitos de Entorno

Antes de comenzar la tarea 01, verifica que tu entorno local cuente con:
- **Node.js:** Versión 22.0.0 o superior (`node -v`).
- **Bun:** Instalado y accesible en terminal (`bun -v`). Si tu entorno no soporta Bun, puedes usar `npm` como alternativa.
- **Git:** Configurado localmente (`git status`).

---

## 3. Resultado Esperado al Finalizar la Fase 1

Al concluir las 5 tareas, tendrás un servidor de desarrollo (`bun dev`) que sirve una página con:
- Estilos de Tailwind v4 aplicando tokens semánticos de *Obsidiana & Jade* y *Cielo, Sol y Maíz*.
- Tipografías Space Grotesk y Manrope cargadas localmente en WOFF2 sin Google Fonts.
- Cero parpadeos visuales (FOUC) al recargar la página.
- Conmutador de tema funcional y persistente.
- Navegación responsive completa con menú hamburguesa accesible en móvil.
