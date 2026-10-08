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
| `NODE_VERSION` | `22.14.0` | Cumple el requisito de Astro 6 (`>=22.12.0`) y APIs vigentes |
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

1. **Dominio principal:** El dominio personalizado `samsar.dev` se gestiona a través de los servidores de nombres (DNS) de Cloudflare.
2. **Cifrado SSL/TLS:** Configurado en modo **Full (Strict)**, con renovación automática de certificados SSL sin intervención manual.
3. **Redirecciones:** Forzar HTTPS de forma estricta y redirigir `www.samsar.dev` al dominio raíz `samsar.dev`.
