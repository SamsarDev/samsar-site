# Tarea 03: Manual Pedagógico de Despliegue en Cloudflare Pages

- **Fase:** 06 — Producción, SEO y Despliegue
- **Estimación:** 35 minutos
- **Documentos de referencia:** [`docs/02-architecture/05-deployment.md`](../../02-architecture/05-deployment.md) · [`docs/08-learning/`](../../08-learning/)

---

## 1. Objetivo Pedagógico

Al ser este un proyecto formativo y colaborativo, documentarás con rigor didáctico la ruta completa para desplegar una aplicación web SSG moderna en **Cloudflare Pages**. Redactarás una guía exhaustiva para estudiantes en `docs/08-learning/02-cloudflare-pages-deployment-guide.md` explicando la arquitectura de red Anycast, la vinculación con GitHub, la configuración del pipeline de build con Bun y la gestión de dominios personalizados y certificados SSL.

---

## 2. Criterios de Aceptación (DoD)

- [ ] Manual didáctico `docs/08-learning/02-cloudflare-pages-deployment-guide.md` creado (< 300 líneas) con estructura clara:
  - Registro de cuenta gratuita en Cloudflare.
  - Conexión del repositorio de GitHub mediante la integración nativa de Cloudflare Pages.
  - Configuración del build: framework preset (`Astro`), comando (`bun run build`), directorio de salida (`dist`).
  - Configuración de variables de entorno (`NODE_VERSION=24.21.0`, `BUN_VERSION=latest`).
  - Funcionamiento de *Preview Deployments* automáticos en cada Pull Request.
  - Vinculación de dominio personalizado, servidores DNS y SSL Full (Strict).
  - Guía de resolución de problemas comunes (*Troubleshooting*).
- [ ] Índice `docs/08-learning/00-INDEX.md` y mapa `docs/08-learning/01-learning-path.md` hidratados y vinculados.
- [ ] `docs/00-INDEX.md` actualizado reflejando la sección `08-learning/` como Lista.
- [ ] `bun run check` y `bun run build` pasan con 0 errores y 0 advertencias.

---

## 3. Paso a Paso Guiado

### Paso 1: Redactar `docs/08-learning/02-cloudflare-pages-deployment-guide.md`

Escribe el manual en español con tono pedagógico, explicando el "por qué" de cada paso y acompañando con tablas y bloques de código claros:
1. **Introducción:** ¿Qué es Cloudflare Pages y por qué es ideal para arquitectura JAMstack/SSG?
2. **Creación de cuenta y permisos:** pasos en el dashboard de Cloudflare.
3. **Parámetros del pipeline:** tabla con framework preset, comando y directorio de salida.
4. **Variables de entorno:** importancia de fijar la versión de Node y Bun para evitar discrepancias entre local y CI.
5. **Preview Deployments:** cómo probar cambios antes de mergear a producción.
6. **Dominio personalizado:** configuración de registros CNAME y certificados SSL automáticos.
7. **Resolución de problemas:** errores frecuentes de paquetes o variables no declaradas.

### Paso 2: Hidratar `docs/08-learning/00-INDEX.md` y `01-learning-path.md`

Completa los archivos base de la carpeta `08-learning/`, organizando los módulos de aprendizaje desde la Fundación hasta el Despliegue en Producción.

### Paso 3: Actualizar los índices maestros

Actualiza `docs/00-INDEX.md` marcando `08-learning/` como **Listo**.

---

## 4. Comprobación y Verificación

1. Revisa que ningún archivo en `docs/08-learning/` supere las 300 líneas.
2. Comprueba que todos los enlaces relativos entre la carpeta de tareas y la carpeta de aprendizaje funcionen sin enlaces rotos.
3. Ejecuta la validación del proyecto:
   ```bash
   bun run check
   bun run build
   ```
