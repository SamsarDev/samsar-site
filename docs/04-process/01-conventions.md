# 01-conventions: Convenciones de Código y Flujo Git

Estándares de codificación, tipado, nomenclatura y control de versiones para **Samsar | Sitio web personal**.

---

## 1. Convenciones de Idioma

El proyecto mantiene una separación estricta entre el código técnico y el contenido humano:

| Ámbito | Idioma Requerido | Ejemplos |
|---|---|---|
| **Código fuente** (variables, funciones, componentes, props, tipos) | **Inglés** | `postSlug`, `formatDate()`, `initialTheme`, `type Props` |
| **Comentarios técnicos** dentro del código | **Inglés** | `// Hydrate only on client idle to avoid blocking LCP` |
| **Nombres de ramas y commits Git** | **Inglés** | `feat/theme-toggle`, `fix(ui): correct focus contrast` |
| **Nombres de archivos de código** | **Inglés** | `PostCard.astro`, `theme.css`, `readingTime.ts` |
| **Documentación técnica** (`docs/`, `README.md`) | **Español** | Guías didácticas, ADRs y especificaciones |
| **Contenido del sitio** (artículos, interfaces, SEO) | **Español** | Títulos de posts, labels de botones (`"Cambiar tema"`), slugs |

---

## 2. Convenciones de Nomenclatura

- **Componentes (`.astro`, `.vue`):** `PascalCase` (ej. `PostCard.astro`, `ThemeToggle.vue`).
- **Módulos TypeScript (`.ts`):** `camelCase` (ej. `formatDate.ts`, `experience.ts`).
- **Rutas de páginas y posts (`.md`, `.mdx`, `.astro` de ruta):** `kebab-case` en español (ej. `sobre-mi.astro`, `guia-clean-architecture.md`).
- **Tokens CSS:** `--kebab-case` (ej. `--color-jade`, `--text-primary`).

---

## 3. Estándares de TypeScript

1. **Prohibido el uso de `any`:** Si el tipo es dinámico o desconocido, se utiliza `unknown` acompañado de estrechamiento de tipos (*type narrowing* o *type guards*).
2. **Interfaces de Props explícitas:**
   - En Astro: `interface Props { ... }` y `const { ... } = Astro.props;`.
   - En Vue: `defineProps<Props>()` con interfaces fuertemente tipadas.
3. **Validación Zod:** Todo esquema de datos en `src/content.config.ts` debe tiparse exhaustivamente con Zod.

---

## 4. Estándares de Estilos (Tailwind v4)

- Configuración **CSS-first** en `src/styles/theme.css` e importada en `global.css`. Prohibido crear `tailwind.config.js`.
- Uso exclusivo de **tokens semánticos** (`--bg-surface`, `--text-primary`, `--accent-primary`).
- **Prohibido copiar valores hexadecimales en componentes.** Si falta un token, se documenta y se añade formalmente a `theme.css`.

---

## 5. Control de Versiones y Git

### 5.1 Nomenclatura de Ramas
Formato `tipo/descripcion-corta` en inglés y kebab-case:
- `feat/theme-toggle-island`
- `fix/card-focus-ring`
- `docs/hydrate-architecture`
- `chore/setup-tailwind-v4`

### 5.2 Conventional Commits
Mensajes en modo imperativo y en inglés:
- `feat: add theme toggle island with local storage persistence`
- `fix: improve contrast ratio on secondary button text`
- `docs: add adr-0009 for astro content layer api`

### 5.3 Flujo de Control Humano para Commits
- **Regla de oro:** Los agentes de IA tienen **prohibido hacer commit o push por iniciativa propia**.
- **Flujo:** El agente valida que la tarea compila (`bun run check` y `bun run build`), redacta la propuesta de Conventional Commit y sugiere el comando exacto (`git commit -m "..."`). El estudiante revisa el diff (`git diff`) y confirma o ejecuta el commit en su terminal.
