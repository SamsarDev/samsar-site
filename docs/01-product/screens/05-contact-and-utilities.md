# Pantallas 12 a 16: Contacto, Errores y Utilidades Técnicas

Especificación para la página de contacto (`/contacto`), vista de error (`/404`) y las rutas técnicas del sitio.

---

## 📬 Pantalla 12: Contacto (`/contacto`)

### 1. Propósito
Canal de comunicación directo y sencillo para colaboraciones open source, consultas técnicas o propuestas profesionales.

### 2. Estructura de Secciones

| # | Sección | Elementos y Contenido |
|---|---|---|
| **12.1** | **Encabezado** | Título H1 (*"Hablemos"*), texto explicativo clarificando los tipos de interacción bienvenidos (proyectos educativos, mentorías, colaboraciones). |
| **12.2** | **Enlaces Directos (MVP)** | Tarjetas con enlaces externos verificados con iconos accesibles: Correo electrónico directo (`mailto:`), perfil de LinkedIn y cuenta de GitHub. |
| **12.3** | **Formulario (Post-MVP)** | Formulario HTML accesible con campos de Nombre, Correo, Asunto y Mensaje, procesado vía Formspree zero-backend. Planificado para fase posterior. |

---

## 🚫 Pantalla 13: Error 404 (`/404`)

### 1. Propósito
Página de error amigable, con personalidad e identidad visual maya.

### 2. Elementos
- Ilustración o vector SVG temático (colibrí desorientado o estela incompleta).
- Mensaje: *"404 — Esta página se perdió en la selva"*.
- Subtítulo explicativo sugiriendo verificar la URL.
- 2 CTAs de recuperación: *"Volver al inicio"* (`/`) y *"Explorar el blog"* (`/blog`).

---

## 📡 Pantallas 14, 15 y 16: Rutas Técnicas

| Ruta | Formato | Generación | Propósito |
|---|---|---|---|
| `/rss.xml` | XML | `@astrojs/rss` | Feed de sindicación de artículos del blog con título, fecha, descripción y enlace canónico. |
| `/sitemap.xml` | XML | `@astrojs/sitemap` | Mapa del sitio generado automáticamente en build time para indexación de motores de búsqueda. |
| `/robots.txt` | Texto plano | Archivo estático en `public/` | Directivas para rastreadores web enlazando al sitemap. |
| `/admin` | SPA / HTML | Sveltia CMS (Post-MVP) | Panel de administración opcional basado en Git para redactar contenido desde el navegador. |
