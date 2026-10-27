# 05-deployment: Despliegue e Infraestructura

Configuración de compilación continua, distribución en Cloudflare Pages y gestión de dominio para **Samsar | Sitio web personal**.

---

## 1. Plataforma de Alojamiento: Cloudflare Pages

El sitio se despliega en **Cloudflare Pages** utilizando la integración directa con el repositorio de GitHub. Esta configuración garantiza:
- Compilaciones automáticas en cada `push` a la rama `main`.
- Entornos de vista previa (*Preview Deployments*) únicos y aislados por cada Pull Request.
- Distribución global en el Edge Anycast de Cloudflare sin costo de ancho de banda.

---

## 2. Parámetros de Compilación en Cloudflare Pages

Al vincular el proyecto en el panel de Cloudflare Pages, se deben configurar los siguientes parámetros:

| Parámetro | Valor de Configuración | Notas |
|---|---|---|
| **Framework preset** | `Astro` | Configuración predeterminada de Astro |
| **Build command** | `bun run build` | Fallback si se usa Node: `npm run build` |
| **Build output directory** | `dist` | Carpeta de salida estática generada por Astro |
| **Root directory** | `/` (raíz) | Raíz del repositorio |

### Variables de Entorno del Entorno de Build

| Variable | Valor | Justificación |
|---|---|---|
| `NODE_VERSION` | `24.21.0` | Cumple el requisito de Astro 7 (`>=22.12.0`) y el del linter (`^24.16.0`), y es una versión soportada por Cloudflare Pages |
| `BUN_VERSION` | `latest` (o `1.1.x`) | Permite a Cloudflare ejecutar `bun` directamente durante la compilación |

---

## 3. Política de Caché y Cabeceras HTTP

Para aprovechar al máximo la red Edge de Cloudflare y optimizar las métricas Web Vitals, se define el archivo `public/_headers` con directivas de caché por tipo de recurso:

```text
# Activos inmutables con hash (JS de islas, CSS procesado, imágenes de build)
/_astro/*
  Cache-Control: public, max-age=31536000, immutable

# Fuentes WOFF2 autoalojadas
/fonts/*
  Cache-Control: public, max-age=31536000, immutable
  Access-Control-Allow-Origin: *

# Páginas HTML y feeds (revalidación inmediata)
/*.html
  Cache-Control: public, max-age=0, must-revalidate

/rss.xml
  Cache-Control: public, max-age=3600, must-revalidate
```

---

## 4. Dominio Personalizado y SSL

> ✅ **Estado actual: dominio propio activo.** El sitio se publica en `https://samsar.fyi/`. El subdominio de Cloudflare Pages (`samsar-site.pages.dev`) sigue existiendo, pero `astro.config.mjs` declara `samsar.fyi` como dominio canónico. La migración siguió la lista de la sección 5.

1. **Dominio principal:** El dominio personalizado `samsar.fyi` se gestiona a través de los servidores de nombres (DNS) de Cloudflare.
2. **Cifrado SSL/TLS:** Configurado en modo **Full (Strict)**, con renovación automática de certificados SSL sin intervención manual.
3. **Redirecciones:** Forzar HTTPS de forma estricta y redirigir `www.samsar.fyi` al dominio raíz `samsar.fyi`.

---

## 5. Lista de Verificación al Activar el Dominio Propio

Al cambiar el dominio, sustituye la URL anterior por la nueva **en estos lugares**. Es la lista completa; si añades otro archivo donde se declare el dominio, súmalo aquí.

| Archivo | Qué cambiar |
|---|---|
| `astro.config.mjs` | `site:` — es la fuente de verdad: de ahí salen las canónicas, el sitemap y el RSS |
| `public/robots.txt` | la directiva `Sitemap:` y su comentario de dominio temporal |
| `src/layouts/BaseLayout.astro` | el valor de respaldo de `canonicalURL` |
| `src/pages/rss.xml.ts` | el valor de respaldo de `site` |
| `src/content/projects/` | los campos `demo:` que apuntan al sitio |
| `docs/05-tasks/**` | las tareas que muestran `site:`, el respaldo de canónicas o `robots.txt` como ejemplo |
| `docs/02-architecture/05-deployment.md` y `docs/08-learning/02-cloudflare-pages-deployment-guide.md` | las referencias al dominio y esta misma nota de estado |

> **Correos del dominio:** `contact@samsar.fyi` (contacto público: `src/data/profile.ts`, `README.md`), `support@samsar.fyi` (`SECURITY.md`) y `me@samsar.fyi` (permisos de licencia: `LICENSE-CONTENT`, `LICENSE-DOCS`, `src/components/maya/NOTICE.md`). Son redirecciones de correo configuradas en Cloudflare.
>
> **No cambian al mover el dominio:** las URL de GitHub y LinkedIn, ni el aviso de licencia de `src/components/maya/NOTICE.md`, que delimita el alcance legal de los SVG y no la dirección del despliegue.
>
> `docs/99-reference/` conserva las referencias antiguas a propósito: es archivo histórico y no se edita.
