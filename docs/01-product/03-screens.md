# 03-screens: Inventario de Pantallas y Navegación

Inventario maestro de rutas, mapa de navegación y catálogo estructural de **Samsar | Sitio web personal**.

---

## 1. Mapa de Navegación

```text
                              ┌──────────────┐
                              │   Landing    │
                              │      /       │
                              └──────┬───────┘
                                     │
        ┌────────────┬───────────────┼───────────────┬────────────┐
        │            │               │               │            │
        ▼            ▼               ▼               ▼            ▼
   ┌─────────┐  ┌──────────┐   ┌──────────┐   ┌──────────┐  ┌─────────┐
   │Sobre mí │  │Proyectos │   │   Blog   │   │Experiencia│ │Contacto │
   │/sobre-mi│  │/proyectos│   │  /blog   │   │/experiencia │/contacto│
   └─────────┘  └────┬─────┘   └────┬─────┘   └──────────┘  └─────────┘
                     │              │
                     ▼              ├──────────────┬─────────────┐
              ┌────────────┐        ▼              ▼             ▼
              │  Detalle   │   ┌────────┐    ┌────────┐    ┌────────┐
              │  Proyecto  │   │  Dev   │    │   IA   │    │ Games  │
              │   /[slug]  │   └───┬────┘    └───┬────┘    └───┬────┘
              └────────────┘       │             │             │
                                   ▼             ▼             ▼
                              ┌─────────┐   ┌─────────┐   ┌─────────┐
                              │  Post   │   │  Post   │   │  Post   │
                              │Detalle  │   │Detalle  │   │Detalle  │
                              │ /[slug] │   │ /[slug] │   │ /[slug] │
                              └─────────┘   └─────────┘   └─────────┘
```

---

## 2. Inventario Maestro (16 Pantallas)

| # | Ruta | Nombre | Tipo | Alcance | Detalle Exhaustivo |
|---|---|---|---|---|---|
| **01** | `/` | Landing Page | Estática (.astro) | MVP | [`screens/01-landing.md`](screens/01-landing.md) |
| **02** | `/sobre-mi` | Sobre mí | Estática (.astro) | MVP | [`screens/02-profile-and-experience.md`](screens/02-profile-and-experience.md) |
| **03** | `/experiencia` | Experiencia / CV | Estática (.astro + datos) | MVP | [`screens/02-profile-and-experience.md`](screens/02-profile-and-experience.md) |
| **04** | `/proyectos` | Catálogo de Proyectos | Dinámica (Collection) | MVP | [`screens/03-projects.md`](screens/03-projects.md) |
| **05** | `/proyectos/[slug]` | Detalle de Proyecto | Dinámica (Collection) | MVP | [`screens/03-projects.md`](screens/03-projects.md) |
| **06** | `/blog` | Índice del Blog | Dinámica (Collection + isla) | MVP | [`screens/04-blog.md`](screens/04-blog.md) |
| **07** | `/blog/samsar-dev` | Categoría Dev | Listado filtrado | MVP | [`screens/04-blog.md`](screens/04-blog.md) |
| **08** | `/blog/samsar-ia` | Categoría IA | Listado filtrado | MVP | [`screens/04-blog.md`](screens/04-blog.md) |
| **09** | `/blog/samsar-games` | Categoría Games | Listado filtrado | MVP | [`screens/04-blog.md`](screens/04-blog.md) |
| **10** | `/blog/[slug]` | Lectura de Post | Dinámica (MDX) | MVP | [`screens/04-blog.md`](screens/04-blog.md) |
| **11** | `/blog/tags/[tag]` | Artículos por etiqueta | Listado filtrado | MVP | [`screens/04-blog.md`](screens/04-blog.md) |
| **12** | `/contacto` | Formulario de Contacto | Estática + formulario | MVP | [`screens/05-contact-and-utilities.md`](screens/05-contact-and-utilities.md) |
| **13** | `/404` | Error 404 personalizado | Estática (.astro) | MVP | [`screens/05-contact-and-utilities.md`](screens/05-contact-and-utilities.md) |
| **14** | `/rss.xml` | Feed RSS | XML estático | MVP | [`screens/05-contact-and-utilities.md`](screens/05-contact-and-utilities.md) |
| **15** | `/sitemap.xml` | Mapa del sitio SEO | XML estático | MVP | [`screens/05-contact-and-utilities.md`](screens/05-contact-and-utilities.md) |
| **16** | `/admin` | Sveltia CMS | SPA externa (opcional) | Post-MVP | [`screens/05-contact-and-utilities.md`](screens/05-contact-and-utilities.md) |

---

## 3. Desglose Detallado por Módulos

Para consultar las especificaciones exactas sección por sección, jerarquía de encabezados, elementos individuales (~450 en total) y directivas de hidratación, revisa los documentos en la subcarpeta [`screens/`](screens/):

- **[`screens/01-landing.md`](screens/01-landing.md):** Hero, pilares, sobre el proyecto, destacados y CTA final.
- **[`screens/02-profile-and-experience.md`](screens/02-profile-and-experience.md):** Bio personal, valores, timeline de experiencia laboral y CV descargable.
- **[`screens/03-projects.md`](screens/03-projects.md):** Grid con filtros por tipo y plantilla de detalle de proyecto.
- **[`screens/04-blog.md`](screens/04-blog.md):** Índice con buscador interactivo, vistas de categorías y plantilla de lectura MDX con TOC y código.
- **[`screens/05-contact-and-utilities.md`](screens/05-contact-and-utilities.md):** Formulario de contacto, página 404, sitemap, RSS y CMS.
