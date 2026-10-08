# Tarea 04: Auditoría de Calidad y Cierre del MVP

- **Fase:** 06 — Producción, SEO y Despliegue
- **Estimación:** 30 minutos
- **Documentos de referencia:** [`docs/04-process/03-definition-of-done.md`](../../04-process/03-definition-of-done.md) · [`docs/02-architecture/04-performance.md`](../../02-architecture/04-performance.md)

---

## 1. Objetivo Pedagógico

Consolidar la disciplina de aseguramiento de calidad antes del lanzamiento a producción. Realizarás una auditoría integral de extremo a extremo que incluye verificación de enlaces entre todas las páginas, comprobación de contraste y accesibilidad con teclado (WCAG AA), validación de presupuestos de rendimiento Web Vitals y formalización de la finalización del MVP en los índices del proyecto.

---

## 2. Criterios de Aceptación (DoD)

- [ ] Las 15 pantallas y rutas del inventario maestro (`03-screens.md`) están implementadas y operativas sin errores 404 accidentales.
- [ ] Tema claro y oscuro funcionales en todas las pantallas con contraste adecuado en textos (≥ 4.5:1) y componentes de UI (≥ 3:1).
- [ ] Navegación completa utilizable con teclado con foco visible en todo elemento interactivo.
- [ ] Presupuestos de rendimiento verificados (Lighthouse > 95, JavaScript hidratado únicamente donde es estrictamente necesario).
- [ ] `docs/05-tasks/00-INDEX.md` y `docs/00-INDEX.md` actualizados reflejando todas las fases del MVP como Listas.
- [ ] `bun run check` y `bun run build` pasan con 0 errores y 0 advertencias.

---

## 3. Paso a Paso Guiado

### Paso 1: Auditoría de Navegación y Rutas

Inicia el servidor de vista previa de producción:

```bash
bun run build
bun run preview
```

Verifica manualmente la matriz de navegación completa:
1. **Portada (`/`):** Hero, Pilares, Sobre el proyecto, Artículos destacados, Proyectos recientes, CTA.
2. **Sobre mí (`/sobre-mi`):** Avatar WebP, biografía, áreas de interés, principios, stack y CTA.
3. **Experiencia (`/experiencia`):** Descarga de `cv-samuel-sarmientos.pdf`, timeline interactivo con filtros, educación, certificaciones e idiomas.
4. **Proyectos (`/proyectos`, `/proyectos/[type]`, `/proyectos/[slug]`):** Catálogo, filtros estáticos y fichas técnicas con enlaces a blog y repositorios.
5. **Blog (`/blog`, `/blog/[category]`, `/blog/[slug]`, `/blog/tags/[tag]`):** Índice con buscador, vistas por categoría, lectura de posts MDX con código dual-theme y tags.
6. **Contacto (`/contacto`):** Tarjetas con enlaces a email, LinkedIn y GitHub.
7. **Error 404 (`/404`):** Ilustración temática maya y botones de retorno.
8. **Rutas técnicas:** `/rss.xml`, `/sitemap-index.xml`, `robots.txt` y `_headers`.

### Paso 2: Verificación de Accesibilidad y Teclado

1. Recorre cada pantalla utilizando únicamente la tecla `Tab` y comprueba que el anillo de foco (`focus-visible:ring-2`) sea claramente visible.
2. Alterna entre el tema claro y oscuro con el botón de alternancia en el Header y verifica legibilidad en ambos estados.

### Paso 3: Cierre Formal en la Documentación

Actualiza `docs/05-tasks/00-INDEX.md` y `docs/00-INDEX.md` marcando la **Fase 6: Producción, SEO y Despliegue** como **Listo**.

---

## 4. Comprobación y Verificación

1. Ejecuta la suite de verificación obligatoria:
   ```bash
   bun run check
   bun run build
   ```
2. Confirma que la compilación genere todas las páginas estáticas sin advertencias de Vite ni de Astro.
