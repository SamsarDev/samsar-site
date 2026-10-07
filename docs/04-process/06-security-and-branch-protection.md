# 06-security-and-branch-protection: Seguridad, CI y Protección de Ramas

Guía técnica y manual de configuración para proteger el repositorio de cambios dañinos y garantizar un entorno seguro de colaboración didáctica en **Samsar | Sitio web personal**.

---

## 1. Modelo de Defensa en Capas

Para permitir que estudiantes y la comunidad abierta colaboren sin riesgo de romper producción ni introducir vulnerabilidades, aplicamos tres barreras de protección:

```
[ Colaborador / Estudiante ]
           │
           ▼ (Abre Issue -> Fork -> Rama -> Pull Request)
┌────────────────────────────────────────────────────────┐
│ 1. Capa de Gobernanza: Plantillas e Issues Obligatorios │
│    - ISSUE_TEMPLATE guiados (evita spam y dudas vagas) │
│    - PULL_REQUEST_TEMPLATE con checklist DoD obligatorio │
└────────────────────────────────────┬───────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────┐
│ 2. Capa Automatizada: CI y Escaneo de Seguridad        │
│    - Bun Typecheck (`astro check`)                     │
│    - Production Build (`astro build`)                  │
│    - TruffleHog (escaneo de fugas de credenciales)     │
│    - Semantic PR Title (Conventional Commits)          │
└────────────────────────────────────┬───────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────────────────────────┐
│ 3. Capa de Autoridad: GitHub Branch Protection Rules    │
│    - Prohibido push directo a `main`                   │
│    - 1 aprobación obligatoria de `@SamsarDev`          │
│    - Todos los checks de CI en verde obligatorios      │
└────────────────────────────────────────────────────────┘
```

---

## 2. Configuración Manual de Branch Protection en GitHub

Para activar la protección física en el repositorio remoto (`github.com/SamsarDev/samsar-site`), el mantenedor debe seguir estos pasos en la interfaz web de GitHub:

### Paso 1: Configurar Reglas de Protección para `main`
1. Ve a **Settings** &rarr; **Branches** &rarr; **Add branch protection rule** (o **Branch rulesets**).
2. En **Branch name pattern**, escribe: `main`.
3. Activa las siguientes casillas:
   - [x] **Require a pull request before merging:**
     - Require approvals: `1`
     - Dismiss stale pull request approvals when new commits are pushed: `Activado`
     - Require review from Code Owners: `Activado` (lee `.github/CODEOWNERS`)
   - [x] **Require status checks to pass before merging:**
     - Require branches to be up to date before merging: `Activado`
     - En la barra de búsqueda de checks, selecciona:
       - `Typecheck & Build` (de `ci.yml`)
       - `Secret Leak Detection` (de `security.yml`)
       - `Conventional Commits Check` (de `security.yml`)
   - [x] **Block force pushes:** `Activado` (evita `git push --force`).
   - [x] **Do not allow deletions:** `Activado` (impide borrar la rama `main`).

---

### Paso 2: Restricción de GitHub Actions para Forks (Crucial contra ataques)
Para evitar que un atacante envíe un PR malicioso que consuma minutos de cómputo o intente exfiltrar variables de entorno en el runner:

1. Ve a **Settings** &rarr; **Actions** &rarr; **General**.
2. En la sección **Fork pull request workflows**, selecciona:
   - **"Require approval for all outside collaborators"** (o *"Require approval for first-time contributors"*).
   - De esta manera, ningún workflow de GitHub Actions se ejecutará en un PR de un tercero hasta que el mantenedor lo autorice explícitamente en la interfaz.

---

## 3. Filosofía con Estudiantes: Corregir sin Rechazar

Cuando un estudiante envíe un PR que falle en el CI o incumpla una convención:

1. **No cierres el PR abruptamente:** El CI en rojo es una oportunidad didáctica.
2. **Explica el porqué técnico:** Indícale el log del error (por ejemplo, si falló `astro check` por un tipo no declarado).
3. **Guía hacia la corrección:** Explica cómo replicarlo localmente con `bun run check` y felicítalo cuando el pipeline pase a verde.
