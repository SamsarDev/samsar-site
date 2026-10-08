# 03-versioning-tags-and-releases: Guía de Versionado, Tags y Releases en Git

Esta guía explica los fundamentos de ingeniería de software detrás del versionado de código, el etiquetado en Git (tags) y la publicación de releases en GitHub, tomando como caso práctico el lanzamiento de la versión **v1.0.0 (MVP)** de este repositorio.

---

## 1. ¿Por Qué Versionamos Software?

En desarrollo profesional, el código no es un flujo indiferenciado de commits. Una versión representa un **contrato de estabilidad y alcance**.

1. **Trazabilidad y reproducibilidad:** Un tag fija una "fotografía" exacta del repositorio en un commit determinado. Si surge un bug en producción meses después, podemos volver exactamente a ese estado sin conjeturas.
2. **Rollbacks predecibles:** En plataformas como Cloudflare Pages, Netlify o AWS, cada release permite regresar a un artefacto previo con un solo clic si una nueva versión falla.
3. **Comunicación clara:** Los usuarios y el equipo saben con certeza qué funcionalidades, correcciones o cambios de contrato incluye cada entrega.

---

## 2. Versionado Semántico (SemVer 2.0.0)

Adoptamos el estándar de la industria [SemVer 2.0.0](https://semver.org/lang/es/), expresado como:

$$\text{MAJOR} . \text{MINOR} . \text{PATCH}$$

Ejemplo: `v1.0.0`

| Segmento | Cuándo se incrementa | Ejemplo en este proyecto |
|---|---|---|
| **MAJOR** (1.x.x) | Cambios incompatibles con versiones anteriores (breaking changes) o hitos arquitectónicos completos (como el primer MVP estable). | Lanzamiento oficial del MVP `v1.0.0`. |
| **MINOR** (x.1.x) | Nuevas funcionalidades que no rompen retrocompatibilidad. | Incorporación futura del módulo de búsqueda interactiva o filtro avanzado. |
| **PATCH** (x.x.1) | Correcciones de errores (bug fixes) o parches de seguridad retrocompatibles. | Corrección de contraste en una card o ajuste en una regla de `_headers`. |

> **Nota:** El prefijo `v` (`v1.0.0`) es una convención estándar en sistemas de control de versiones para distinguir etiquetas de release de números planos.

---

## 3. Ramas vs. Git Tags vs. GitHub Releases

Es vital distinguir estos tres conceptos para no confundir el flujo de trabajo:

```text
       Ramas (branches)                 Git Tags                      GitHub Releases
┌─────────────────────────────┐  ┌─────────────────────────────┐  ┌─────────────────────────────┐
│ Punteros móviles a commits  │  │ Punteros INMUTABLES a un    │  │ Capa de producto y entrega  │
│ Van avanzando con cada      │  │ commit específico.          │  │ Asociada a un tag.          │
│ nuevo cambio (`main`, feat) │  │ No cambian en el tiempo.    │  │ Incluye notas y binarios.   │
└─────────────────────────────┘  └─────────────────────────────┘  └─────────────────────────────┘
```

- **Rama (`main`, `feat/...`):** Es un puntero móvil. Con cada nuevo commit, la rama se desplaza hacia adelante. Nunca debe usarse una rama para referenciar una versión congelada.
- **Git Tag (anotado):** Es una referencia inmutable en el historial de Git. Almacena autor, fecha, mensaje y firma del commit congelado.
- **GitHub Release:** Es una capa construida sobre un Git Tag que ofrece notas de lanzamiento formateadas en Markdown, historial de cambios (changelog) y archivos descargables para distribución.

---

## 4. Tipos de Tags en Git: Ligeros vs. Anotados

Git ofrece dos tipos de etiquetas:

- **Lightweight (ligero):** Es solo un puntero a un commit (`git tag v1.0.0`). No guarda autor, mensaje ni metadata. **Evítalos en releases.**
- **Annotated (anotado):** Se almacena como un objeto completo en la base de datos de Git, incluyendo quién lo creó, cuándo y con qué mensaje descriptivo (`git tag -a v1.0.0 -m "..."`). **Es el estándar para versiones de producción.**

---

## 5. Procedimiento Práctico: Creando el Release v1.0.0

A continuación se detalla el flujo de trabajo exacto ejecutado para publicar la versión oficial del proyecto:

### Paso 1: Asegurar que `main` contiene el código definitivo
Antes de etiquetar, todo el alcance planificado (código, pruebas, auditorías y documentación) debe estar mergeado en la rama principal.

```bash
# Cambiar a main y sincronizar el último estado remoto
git checkout main
git pull origin main
```

### Paso 2: Crear el tag anotado localmente
Utilizamos la bandera `-a` para crear una etiqueta anotada y `-m` para el mensaje de release:

```bash
git tag -a v1.0.0 -m "Release v1.0.0: MVP de Samsar | Sitio web personal"
```

Para verificar que el tag se creó con su metadata correspondiente:
```bash
git show v1.0.0
```

### Paso 3: Publicar el tag en el repositorio remoto
Por seguridad, `git push` ordinario no sube tags a GitHub. Se debe especificar el tag explícitamente:

```bash
git push origin v1.0.0
```

### Paso 4: Crear la Release en GitHub (CLI o Interfaz)
Utilizamos el GitHub CLI (`gh`) para generar la publicación oficial con notas estructuradas:

```bash
gh release create v1.0.0 \
  --title "v1.0.0 — MVP Oficial: Código, cultura y curiosidad" \
  --notes-file release_notes.md
```

---

## 6. Integración con CI/CD y Cloudflare Pages

1. **Deployments inmutables:** Cloudflare Pages compila automáticamente el commit asociado a `main`. Al asignar un tag a ese commit, queda registrada la versión exacta de la compilación desplegada globalmente.
2. **Promoción de versiones:** Si en el futuro se despliega una versión `v1.1.0` con problemas inesperados en navegadores antiguos, la consola de Cloudflare Pages permite hacer rollback al deployment vinculado al commit de `v1.0.0` en menos de 5 segundos.
3. **Flujo de trabajo repetible:** En proyectos más grandes, un evento `git push origin v*` puede disparar pipelines de CI/CD para compilar binarios, publicar paquetes en npm o generar imágenes de contenedor Docker de forma automatizada.
