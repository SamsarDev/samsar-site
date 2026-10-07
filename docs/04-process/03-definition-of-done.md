# 03-definition-of-done: Definición de Terminado (DoD)

Criterios de calidad obligatorios que deben cumplirse antes de dar por finalizada cualquier tarea en **Samsar | Sitio web personal**.

---

## 1. Los 7 Criterios Inmutables

Una tarea o Pull Request solo se considera **terminada** cuando satisface los siguientes 7 requisitos:

| # | Criterio de Calidad | Cómo se Verifica |
|---|---|---|
| **1** | **Criterios de Aceptación** | Cumplir el 100% de los puntos especificados en el archivo de la tarea (`docs/05-tasks/...`). |
| **2** | **Compilación Limpia** | `bun run check` y `bun run build` pasan con código de salida 0, sin errores de TypeScript ni advertencias (*warnings*). |
| **3** | **Soporte Dual de Tema** | La interfaz se ve y lee correctamente en tema oscuro (*Obsidiana & Jade*) **y** en tema claro (*Cielo, Sol y Maíz*), sin roturas de contraste. |
| **4** | **Accesibilidad de Teclado** | Es posible navegar e interactuar usando únicamente `Tab`, `Enter` y `Space`. Todo control interactivo muestra foco visible (`:focus-visible`). |
| **5** | **Diseño Responsive** | Se adapta fluidamente desde pantallas móviles angostas (≥ 360 px) hasta monitores de escritorio (≥ 1440 px), sin desbordamientos horizontales. |
| **6** | **Presupuesto de JavaScript** | No añade dependencias de cliente innecesarias. Componentes sin estado reactivo permanecen en `.astro`. |
| **7** | **Resumen de Entrega** | El desarrollador o agente entrega el reporte final: qué cambió, por qué y cómo probarlo manualmente. |

---

## 2. Checklist Práctico de Verificación

Copia y valida este checklist antes de solicitar revisión o realizar el commit:

```markdown
- [ ] 1. ¿Cumple todos los requisitos funcionales de la tarea?
- [ ] 2. ¿Pasan `bun run check` y `bun run build` sin errores?
- [ ] 3. ¿Se probó en modo oscuro y claro con contraste legible?
- [ ] 4. ¿El foco es visible al navegar con el teclado (Tab)?
- [ ] 5. ¿Se probó en vista móvil de 360px sin scroll horizontal?
- [ ] 6. ¿Todo componente nuevo sin reactividad es un archivo `.astro`?
- [ ] 7. ¿El commit sigue el estándar de Conventional Commits en inglés?
```

---

## 3. Comandos de Validación Local

Ejecuta esta secuencia en la raíz del proyecto antes de cada commit:

```bash
# 1. Comprobación estricta de tipos Astro y TypeScript
bun run check

# 2. Compilación estática de producción
bun run build

# 3. Previsualización del artefacto generado en dist/
bun run preview
```
