# ADR-0008: Enlaces Directos en MVP y Formulario Zero-Backend en Post-MVP

- **Estado:** Aceptado
- **Fecha:** 2026-10-07
- **Decisores:** Samuel Sarmientos / Samsar
- **Documento relacionado:** [`docs/01-product/02-features.md`](../01-product/02-features.md) · [`docs/01-product/screens/05-contact-and-utilities.md`](../01-product/screens/05-contact-and-utilities.md)

---

## 1. Contexto y Problema

La pantalla `/contacto` requiere un canal de interacción para que visitantes, reclutadores y colaboradores puedan comunicarse con el autor. Se evaluó si el MVP debía incluir un formulario web interactivo o si bastaba con canales directos (correo electrónico y redes profesionales), difiriendo la integración del formulario.

---

## 2. Factores de Decisión

- **Velocidad de entrega del MVP:** Reducir dependencias de servicios externos durante la primera etapa.
- **Pureza y simplicidad SSG:** Página 100% estática sin estados de envío ni dependencias de red.
- **Eficacia de contacto:** Para un perfil senior, los enlaces directos a LinkedIn, GitHub y `mailto:` ofrecen contacto inmediato y verificado.

---

## 3. Opciones Consideradas

### Opción 1: Enlaces directos en MVP y Formulario en Post-MVP (Seleccionada)
- **Ventajas:** El MVP de `/contacto` se implementa en minutos con HTML semántico puro; cero dependencias de servicios SaaS externos; contacto directo sin intermediarios. Cuando se agregue el formulario en Post-MVP, se empleará el patrón zero-backend con Formspree.
- **Desventajas:** Los usuarios sin cliente de correo configurado deben copiar manualmente la dirección de email.

### Opción 2: Formulario con Formspree obligatorio en MVP
- **Ventajas:** Envío directo desde el navegador desde el primer día.
- **Desventajas:** Requiere registrar endpoint, configurar redirecciones y gestionar estados de error/carga en el cliente en el lanzamiento inicial.

---

## 4. Decisión Adoptada

Se define una **estrategia en dos fases:**
1. **Fase MVP (F11):** La página `/contacto` ofrece enlaces directos verificados a correo electrónico (`mailto:`), perfil de LinkedIn y cuenta de GitHub con iconos accesibles y botón de copiar correo.
2. **Fase Post-MVP (F15):** Se incorporará el formulario interactivo utilizando un servicio zero-backend (Formspree) para preservar la naturaleza puramente estática del sitio sin Cloudflare Functions.

---

## 5. Consecuencias y Compromisos

- **Impacto positivo:** Entrega más rápida del MVP; cero configuración de terceros en la fase inicial; resiliencia total de la página de contacto.
- **Compromisos asumidos:** El formulario interactivo queda planificado para la siguiente versión.
- **Regla de implementación:** En el MVP, `/contacto.astro` solo renderiza tarjetas de enlace directo; la estructura HTML se prepara para alojar el formulario en la fase 2.
