# 01-overview: Visión General de la Arquitectura

Arquitectura técnica global, flujo de compilación y principios de ingeniería de **Samsar | Sitio web personal**.

---

## 1. Diagrama de Arquitectura del Sistema

```text
┌─────────────────────────────────────────────────────────────┐
│                    ARQUITECTURA GENERAL                     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. CONTENIDO & DATOS (Git)                                 │
│  ┌──────────────────────────────────────────┐               │
│  │ • Markdown / MDX en src/content/         │               │
│  │ • Content Layer API (src/content.config) │               │
│  │ • Datos tipados (src/data/experience.ts) │               │
│  └────────────────┬─────────────────────────┘               │
│                   │                                         │
│                   ▼                                         │
│  2. COMPILACIÓN (Astro 6 SSG + Vite)                        │
│  ┌──────────────────────────────────────────┐               │
│  │ • Renderizado estático a HTML/CSS        │               │
│  │ • Islas Vue 3 (@astrojs/vue)             │               │
│  │ • Tailwind CSS v4 (motor CSS-first)      │               │
│  │ • Esquemas y validación Zod en build     │               │
│  └────────────────┬─────────────────────────┘               │
│                   │                                         │
│                   ▼                                         │
│  3. DISTRIBUCIÓN EDGE (Cloudflare Pages)                    │
│  ┌──────────────────────────────────────────┐               │
│  │ • Red Anycast global (300+ ciudades)     │               │
│  │ • SSL automático y HTTP/3                │               │
│  │ • Ancho de banda ilimitado y gratis      │               │
│  │ • Salida 100% estática en dist/          │               │
│  └──────────────────────────────────────────┘               │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Capas del Sistema

### 2.1 Capa de Contenido y Datos
- **Fuente de verdad:** Todos los artículos y proyectos residen en archivos Markdown/MDX dentro del repositorio Git.
- **Tipado estricto:** Definido mediante el nuevo **Content Layer API de Astro 6** (`src/content.config.ts`) utilizando esquemas Zod con validación en tiempo de compilación.
- **Datos estructurados:** La trayectoria profesional se almacena en TypeScript nativo (`src/data/experience.ts`), desacoplada de la generación de páginas MDX individuales.

### 2.2 Capa de Compilación y Renderizado
- **Astro 6:** Generador principal configurado en modo estático puro (`output: 'static'`). Genera HTML prerenderizado para todas las rutas conocidas mediante `getStaticPaths()`.
- **Islas Vue 3:** Para interactividad del cliente (toggle de tema y menú móvil en MVP), utilizando Composition API con `<script setup lang="ts">`.
- **Tailwind CSS v4:** Motor de estilos integrado en Vite mediante `@tailwindcss/vite`, operando sin `tailwind.config.js` y resolviendo custom properties desde `src/styles/theme.css`.

### 2.3 Capa de Despliegue y Entrega
- **Cloudflare Pages:** Plataforma serverless de hosting para archivos estáticos. Detecta automáticamente los commits en la rama `main` y compila mediante `bun run build`.
- **Cero backend en runtime:** No existen servidores Node.js activos, funciones serverless permanentes ni bases de datos dinámicas.

---

## 3. Principios de Ingeniería

1. **Cero JavaScript por defecto:** Si una página solo muestra texto, imágenes y código, no debe enviar ningún script al navegador.
2. **Hidratación perezosa:** Toda isla interactiva debe justificar su directiva de hidratación (`client:idle` antes que `client:load`).
3. **Sostenibilidad económica:** Toda la arquitectura está diseñada para operar con costo mensual de **$0 USD**, eliminando cualquier riesgo de facturación imprevista por consumo de ancho de banda o cómputo.
4. **Resiliencia de contenido:** Si el motor de renderizado cambiara en el futuro, los artículos y proyectos en Markdown/MDX seguirán siendo completamente portables.
