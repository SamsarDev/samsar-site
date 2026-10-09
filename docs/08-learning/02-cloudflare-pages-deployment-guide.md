# Guía Pedagógica: Despliegue Continuo en Cloudflare Pages

- **Módulo:** 08-learning / Despliegue en Producción
- **Nivel:** Intermedio / Avanzado
- **Requisitos previos:** Repositorio en GitHub, conocimiento básico de Git y terminal.

---

## 1. ¿Por qué Cloudflare Pages para sitios SSG?

En la arquitectura moderna de desarrollo web, separar la generación estática (SSG) del servicio de distribución ofrece ventajas arquitectónicas fundamentales:

1. **Rendimiento Edge sin servidor (Anycast):** El código HTML precompilado por Astro se distribuye y almacena en caché en más de 300 centros de datos globales de Cloudflare, entregando el primer byte (TTFB) en menos de 50 ms a nivel mundial.
2. **Cero costo de ancho de banda:** A diferencia de plataformas con costos impredecibles por gigabyte transferido, Cloudflare Pages no cobra por ancho de banda en su plan estándar.
3. **Flujo de trabajo colaborativo con Preview Deployments:** Cada Pull Request genera automáticamente una URL efímera e independiente para validar cambios visuales antes de fusionar a la rama principal (`main`).

---

## 2. Requisitos Previos

Antes de comenzar el despliegue, confirma que cuentas con:
- Tu código fuente sincronizado y pasando pruebas en un repositorio de **GitHub**.
- Una cuenta activa en **[Cloudflare](https://dash.cloudflare.com/sign-up)** (plan Free es suficiente).
- Tu archivo `package.json` configurado con los scripts de compilación:
  ```json
  "scripts": {
    "build": "astro build",
    "check": "astro check"
  }
  ```

---

## 3. Paso 1: Creación de la Cuenta en Cloudflare

1. Ingresa a **[dash.cloudflare.com/sign-up](https://dash.cloudflare.com/sign-up)**.
2. Regístrate con tu correo electrónico y define una contraseña segura.
3. Confirma el correo de verificación que recibirás en tu bandeja de entrada.
4. Una vez en el panel principal (*Dashboard*), ubica en la barra lateral izquierda la sección **Workers & Pages**.

---

## 4. Paso 2: Conectar el Repositorio de GitHub

1. En la sección **Workers & Pages**, haz clic en el botón **Create application**.
2. Selecciona la pestaña **Pages** (no Workers).
3. Haz clic en **Connect to Git**.
4. Selecciona tu cuenta o proveedor de **GitHub** y autoriza a Cloudflare para acceder a tus repositorios.
5. Elige el repositorio del proyecto: `samsardev/SamsarSite` (o el fork correspondiente).
6. Haz clic en **Begin setup**.

---

## 5. Paso 3: Configuración de Parámetros de Compilación

En la pantalla de configuración del proyecto (*Set up builds and deployments*), completa los siguientes campos:

| Parámetro | Valor a Configurar | Explicación Pedagógica |
|---|---|---|
| **Project name** | `samsar-site` (o nombre deseado) | Define el subdominio gratuito inicial: `samsar-site.pages.dev` |
| **Production branch** | `main` | Cada commit en esta rama disparará un despliegue a producción |
| **Framework preset** | `Astro` | Ajusta los valores iniciales recomendados |
| **Build command** | `bun run build` *(o `npm run build`)* | Ejecuta el compilador de Astro para emitir HTML estático |
| **Build output directory** | `dist` | Carpeta donde Astro emite las 30 páginas generadas |
| **Root directory** | `/` (dejar en blanco) | Raíz del proyecto |

---

## 6. Paso 4: Variables de Entorno del Constructor

Baja hasta la sección colapsable **Environment variables** y añade las siguientes variables clave para garantizar paridad entre tu entorno local y el servidor de Cloudflare:

| Variable | Valor | Razón Técnica |
|---|---|---|
| `NODE_VERSION` | `22.14.0` | Cumple el requisito estricto de Astro (`>=22.12.0`) y evita errores de runtime. |
| `BUN_VERSION` | `latest` | Habilita el runtime de Bun en el entorno de compilación de Cloudflare. |

---

## 7. Paso 5: Despliegue Inicial y Verificación

1. Haz clic en el botón **Save and Deploy**.
2. Cloudflare iniciará el contenedor de compilación y mostrará la terminal en tiempo real con los logs:
   - Clonado del repositorio.
   - Instalación de dependencias con Bun.
   - Generación de rutas estáticas con Astro.
3. Al finalizar con éxito, verás una pantalla de felicitación con un enlace similar a:
   `https://samsar-site.pages.dev`
4. Abre el enlace y navega entre Inicio, Sobre mí, Experiencia, Proyectos y Blog para comprobar que todo funcione de manera idéntica al entorno local.

---

## 8. Paso 6: Dominio Personalizado y Certificado SSL

Para asociar tu dominio propio (por ejemplo, `samsar.dev`). El sitio funciona hoy en el dominio temporal `https://samsar-site.pages.dev/`; este paso se hace cuando el dominio esté listo:

1. En el panel de tu proyecto en Pages, ve a la pestaña **Custom domains**.
2. Haz clic en **Set up a custom domain**.
3. Escribe tu dominio: `samsar.dev`.
4. Si tu dominio ya está gestionado en los DNS de Cloudflare, la plataforma creará automáticamente el registro CNAME necesario.
5. Cloudflare emitirá y renovará un certificado SSL/TLS de forma gratuita y automática.
6. En la configuración SSL de Cloudflare, asegúrate de activar el modo **Full (Strict)** para cifrado de extremo a extremo.

---

## 9. Flujo de Trabajo Continuo: Preview Deployments

A partir de este momento, el flujo de desarrollo queda 100% automatizado:

1. **Pull Requests (Ramas de trabajo):** Cuando un estudiante o agente abre un PR en GitHub, Cloudflare Pages compila la rama y publica un comentario en el PR con un enlace de previsualización único (`https://[hash].samsar-site.pages.dev`).
2. **Revisión y Aprobación:** El equipo prueba los cambios en vivo en la nube antes de fusionar.
3. **Merge a `main`:** Al fusionar el PR, Cloudflare Pages despliega automáticamente a producción en menos de 60 segundos.

---

## 10. Resolución de Problemas Frecuentes (Troubleshooting)

- **Error: `Command "bun" not found`:**
  - *Causa:* No se declaró `BUN_VERSION=latest` en las variables de entorno.
  - *Solución:* Añade la variable o cambia el comando de build a `npm run build`.
- **Error: `Node.js v22.0.0 is not supported by Astro! Please upgrade Node.js to a supported version: ">=22.12.0"`:**
  - *Causa:* Cloudflare Pages usó una versión menor de Node 22 previa al soporte de Astro.
  - *Solución:* Declara `NODE_VERSION=22.14.0` (o añade `.node-version` con `22.14.0` en la raíz).
- **Rutas 404 en subpáginas:**
  - *Causa:* Falta el archivo `dist/404.html`.
  - *Solución:* En Astro, `src/pages/404.astro` compila directamente como `404.html` en la raíz de `dist/`, lo cual Cloudflare Pages detecta de forma automática.
