# Tarea 01: Inicialización de Astro 7 con TypeScript Estricto y Vue 3

- **Fase:** 01 — Fundación y Core UI
- **Estimación:** 20 minutos
- **Documentos de referencia:** [`docs/02-architecture/01-overview.md`](../../02-architecture/01-overview.md) · [`ADR-0001`](../../07-decisions/0001-astro-over-nuxt.md) · [`ADR-0004`](../../07-decisions/0004-vue-islands.md)

---

## 1. Objetivo Pedagógico

Aprender a inicializar un proyecto limpio con **Astro 7** en modo estático puro (SSG), configurando **TypeScript en modo estricto** (sin permitir `any`) e integrando el soporte oficial para componentes **Vue 3** (`@astrojs/vue`), que utilizaremos exclusivamente para islas interactivas.

---

## 2. Criterios de Aceptación (DoD)

- [ ] Existe un archivo `package.json` válido con scripts: `dev`, `build`, `preview`, `check` y `lint`.
- [ ] La integración `@astrojs/vue` está instalada y declarada en `astro.config.mjs`.
- [ ] `tsconfig.json` está configurado con `"extends": "astro/tsconfigs/strictest"`.
- [ ] Una página de prueba mínima en `src/pages/index.astro` compila sin errores.
- [ ] Los comandos `bun run check` y `bun run build` finalizan con código de salida 0 (sin warnings).

---

## 3. Paso a Paso Guiado

### Paso 1: Inicializar dependencias del proyecto
Crea el archivo `package.json` base o inicializa con tu gestor preferido (Bun recomendado):

```bash
bun add astro@^7.0.0 vue@^3.5.0 @astrojs/vue @astrojs/check typescript
```
*(Si usas npm: `npm install astro vue @astrojs/vue @astrojs/check typescript`)*

Asegúrate de que los scripts de `package.json` incluyan:
```json
{
  "name": "samsar-site",
  "type": "module",
  "version": "1.0.0",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check"
  }
}
```

### Paso 2: Configurar Astro (`astro.config.mjs`)
Crea `astro.config.mjs` en la raíz asegurando la salida estática pura y la integración de Vue:

```javascript
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';

export default defineConfig({
  output: 'static',
  integrations: [vue()],
});
```

### Paso 3: Configurar TypeScript Estricto (`tsconfig.json`)
Crea `tsconfig.json` en la raíz heredando la configuración más estricta de Astro:

```json
{
  "extends": "astro/tsconfigs/strictest",
  "compilerOptions": {
    "strictNullChecks": true,
    "allowJs": false,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### Paso 4: Crear la página mínima de verificación (`src/pages/index.astro`)
```astro
---
const title = "Samsar | Sitio web personal";
---

<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>{title}</title>
  </head>
  <body>
    <h1>{title}</h1>
    <p>Andamiaje base de Astro 7 inicializado con éxito.</p>
  </body>
</html>
```

---

## 4. Comprobación y Verificación

Ejecuta en tu terminal:
```bash
# 1. Comprobación estricta de tipos
bun run check

# 2. Compilación de producción
bun run build
```

Ambos comandos deben terminar en verde sin errores de tipo ni advertencias de compilación.

---

## 5. Pistas Didácticas y Errores Comunes

> 💡 **Pista:** Si `bun run check` advierte sobre módulos de Vue, asegúrate de que `@astrojs/vue` y `@astrojs/check` estén instalados en las dependencias.  
> ⚠️ **Cuidado con `any`:** Recuerda que la regla de oro del proyecto prohíbe el uso de `any`. Configurar `"strictest"` en TypeScript te ayudará a detectar variables no tipadas desde el primer instante.
