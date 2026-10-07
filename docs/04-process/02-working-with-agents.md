# 02-working-with-agents: Guía de Colaboración con Agentes de IA

Manual pedagógico para estudiantes y desarrolladores sobre cómo dirigir, supervisar y aprender trabajando junto a asistentes de IA.

---

## 1. Filosofía: El Humano Lidera

En este proyecto formativo, los agentes de IA (Claude Code, OpenCode, Codex, Antigravity) no son reemplazos del desarrollador, sino **compañeros de programación en pareja (*pair programmers*)**.

1. **La IA es una herramienta; tú eres el arquitecto:** Nunca aceptes una solución generada si no comprendes exactamente cómo funciona y por qué se diseñó de ese modo.
2. **Conceptos antes que código:** Antes de escribir una sola línea de implementación, comprende el patrón arquitectónico (ej. por qué usar un script anti-FOUC en `<head>` en vez de hidratar la isla en `client:load`).
3. **Pasos pequeños y revisables:** Divide las tareas grandes en hitos atómicos. Es mucho más fácil auditar un cambio de 30 líneas que un refactor masivo de 10 archivos.

---

## 2. El Ciclo de Trabajo en 5 Pasos

Cuando abordes una tarea de `docs/05-tasks/` junto a un agente de IA, sigue rigurosamente este ciclo:

```text
┌─────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│ 1. Alineación   │ ──> │ 2. Resumen       │ ──> │ 3. Implementación│
│ (Leer docs)     │     │ (Qué va a hacer) │     │ (Código atómico) │
└─────────────────┘     └──────────────────┘     └──────────────────┘
                                                           │
                                                           ▼
┌─────────────────┐     ┌──────────────────┐     ┌──────────────────┐
│ 5. Commit       │ <── │ Revisión Humana  │ <── │ 4. Verificación  │
│ (Aprobado)      │     │ (git diff)       │     │ (check & build)  │
└─────────────────┘     └──────────────────┘     └──────────────────┘
```

### Paso 1: Alineación
Indícale al agente qué tarea vas a realizar referenciando el archivo en `docs/05-tasks/`. Exígele que consulte los documentos pertinentes en `docs/01-product/`, `docs/02-architecture/` o `DESIGN.md` antes de proponer código.

### Paso 2: Resumen Previo Obligatorio
Antes de que el agente cree o modifique archivos, debe explicarte en **2 a 4 líneas** qué va a hacer y qué archivos específicos va a tocar. Si su plan contradice la documentación, corrígelo de inmediato.

### Paso 3: Implementación Atómica
El agente escribe el código respetando las convenciones: TypeScript estricto sin `any`, tokens semánticos de `theme.css` y componentes `.astro` por defecto.

### Paso 4: Verificación Automatizada
El agente (o tú en tu terminal) debe ejecutar obligatoriamente:
```bash
bun run check    # Verifica tipos TypeScript y sintaxis .astro
bun run build    # Asegura que el build de producción no genera advertencias
```

### Paso 5: Auditoría y Commit
Revisa el diff con `git diff`. Verifica que no haya código basura ni valores inventados. Si todo es correcto, ejecuta el comando de commit sugerido por el agente.

---

## 3. Señales de Alerta (Anti-Patrones a Detectar)

Intervén y pide corrección si notas que el agente:
- Usa `any` en una interfaz o prop en lugar de tipar correctamente.
- Escribe colores hexadecimales directos (`#1F7A5C`) en lugar de tokens (`var(--color-jade)` o utilidades temáticas).
- Crea un componente Vue para algo que no tiene interactividad cliente real.
- Intenta hacer commit o push por su propia cuenta.
- Instala dependencias npm sin justificar su necesidad técnica.
