# ADR-0002: Despliegue en Cloudflare Pages sobre Vercel y Netlify

- **Estado:** Aceptado
- **Fecha:** 2026-10-06
- **Decisores:** Samuel Sarmientos / Samsar
- **Documento relacionado:** [`docs/02-architecture/05-deployment.md`](../02-architecture/05-deployment.md)

---

## 1. Contexto y Problema

Para cumplir el objetivo O7 del proyecto (costo mensual ≤ $1 USD / solo dominio), se requiere una plataforma de alojamiento y distribución para el build estático generado por Astro. La plataforma debe ofrecer despliegues continuos automáticos vinculados a GitHub, certificados SSL y red de distribución global (CDN/Edge) sin sorpresas de facturación por ancho de banda o visitas.

---

## 2. Factores de Decisión

- **Costo de infraestructura:** Plan gratuito sin vencimiento con costo $0 USD sostenido.
- **Límites de ancho de banda:** Riesgo de cobros adicionales o suspensiones si un post se viraliza.
- **Integración CI/CD:** Despliegue automático en `push` a `main` y entornos de vista previa (*preview deployments*) por Pull Request.
- **Rendimiento Edge:** Latencia mínima en la entrega de activos estáticos en América Latina y a nivel global.

---

## 3. Opciones Consideradas

### Opción 1: Cloudflare Pages (Seleccionada)
- **Ventajas:** **Ancho de banda ilimitado y gratuito**; 500 compilaciones mensuales en plan Free; red global Anycast en más de 300 ciudades; SSL automático; previsualizaciones por rama sin costo.
- **Desventajas:** La consola de administración de Cloudflare tiene mayor densidad técnica que plataformas orientadas exclusivamente a frontend.

### Opción 2: Vercel (Hobby Tier)
- **Ventajas:** Excelente experiencia de desarrollo y despliegue rápido.
- **Desventajas:** Límite estricto de 100 GB de ancho de banda mensual; términos de uso comercial restrictivos en plan gratuito; riesgo de sobrecostos o corte de servicio si hay picos de tráfico imprevistos.

### Opción 3: Netlify (Free Tier)
- **Ventajas:** Despliegues sencillos y buena integración con Git.
- **Desventajas:** Límite de 100 GB de ancho de banda y 300 minutos de compilación mensuales; políticas de cobro por exceso de cuota.

---

## 4. Decisión Adoptada

Se selecciona **Cloudflare Pages** como plataforma oficial de hosting y despliegue. La garantía de ancho de banda ilimitado elimina por completo cualquier riesgo financiero o de suspensión de servicio ante picos de tráfico, asegurando un costo operacional de exactamente **$0/mes** en infraestructura.

---

## 5. Consecuencias y Compromisos

- **Impacto positivo:** Costo operativo nulo; distribución hiper-rápida desde el edge más cercano al usuario; previsualizaciones automáticas por PR.
- **Compromisos asumidos:** La configuración de DNS del dominio personalizado debe apuntar a la zona de Cloudflare.
- **Regla de implementación:** Los comandos de build en Cloudflare Pages deben configurarse como `bun run build` (o `npm run build`), con directorio de salida `dist/`.
