# ADR-0005: División Modular de Especificación de Pantallas en Subdocumentos

- **Estado:** Aceptado
- **Fecha:** 2026-10-07
- **Decisores:** Samuel Sarmientos / Samsar
- **Documento relacionado:** [`docs/01-product/03-screens.md`](../01-product/03-screens.md) · [`docs/01-product/screens/`](../01-product/screens/)

---

## 1. Contexto y Problema

El inventario de pantallas heredado de la especificación original (`SPECIFICATION-v1.1.md`) describe exhaustivamente 16 pantallas con ~450 elementos individuales. Volcar todo este contenido en un único archivo (`03-screens.md`) generaría un documento de más de 450 líneas, violando directamente la regla fundamental de documentación establecida en `docs/00-INDEX.md` (*"Ningún documento de trabajo supera unas 300 líneas. Si lo supera, se divide"*).

Por otro lado, recortar o resumir drásticamente el inventario causaría la pérdida de detalle técnico esencial para la implementación de las vistas.

---

## 2. Factores de Decisión

- **Regla de límites de tamaño:** Respetar estrictamente el tope de 300 líneas por archivo para preservar la legibilidad humana y evitar el desbordamiento de contexto en agentes de IA.
- **Integridad del diseño:** No perder el detalle de los ~450 elementos de interfaz planificados.
- **Navegabilidad:** Facilitar que un estudiante o agente consulte únicamente la pantalla en la que está trabajando.

---

## 3. Opciones Consideradas

### Opción 1: Dividir en subcarpeta `docs/01-product/screens/` (Seleccionada)
- **Ventajas:** `03-screens.md` actúa como índice maestro y mapa de navegación conciso (70 líneas), mientras que 5 subdocumentos modulares en `screens/` contienen el desglose exhaustivo de cada grupo funcional (landing, perfil, proyectos, blog, contacto/utilidades) con menos de 70 líneas cada uno.
- **Desventajas:** Introduce una carpeta adicional en la jerarquía.

### Opción 2: Resumir agresivamente en un único archivo
- **Ventajas:** Mantiene un único archivo `03-screens.md`.
- **Desventajas:** Pierde especificaciones clave de secciones, componentes y estados de cada pantalla, forzando a consultar constantemente el archivo histórico `99-reference/`.

---

## 4. Decisión Adoptada

Se adopta la **creación de la subcarpeta `docs/01-product/screens/`** con 5 archivos temáticos:
1. `screens/01-landing.md`
2. `screens/02-profile-and-experience.md`
3. `screens/03-projects.md`
4. `screens/04-blog.md`
5. `screens/05-contact-and-utilities.md`

`03-screens.md` se conserva como mapa de navegación central y punto de enlace.

---

## 5. Consecuencias y Compromisos

- **Impacto positivo:** Cumplimiento total de la regla de < 300 líneas; lectura modular por tarea; contexto hiper-enfocado para agentes.
- **Compromisos asumidos:** Los enlaces internos en la documentación deben apuntar a la subcarpeta `screens/`.
- **Regla de implementación:** Toda modificación o detalle específico de una pantalla debe editarse en su archivo correspondiente dentro de `docs/01-product/screens/`, no en `03-screens.md`.
