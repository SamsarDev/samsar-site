# 06-maya-motifs: Identidad y Motivos Mayas

Directrices para la incorporación respetuosa, digna y técnica de motivos culturales mayas en **Samsar | Sitio web personal**.

---

## 1. Filosofía e Integridad Cultural

El diseño rinde homenaje a la riqueza astronómica, matemática y artística de la civilización maya. No se concibe como un disfraz folclórico ni como una caricatura visual, sino como una presencia sobria y monumental que dialoga orgánicamente con la ingeniería de software contemporánea.

---

## 2. Reglas de Implementación Técnica

1. **Uso exclusivamente decorativo:**
   - Todo motivo maya vive como SVG vectorial inline dentro de `src/components/maya/`.
   - Es obligatorio el atributo `aria-hidden="true"` en el elemento raíz para no interferir con tecnologías de asistencia o lectores de pantalla.
2. **Nunca como icono de acción:**
   - **Prohibido** utilizar glifos mayas para acciones de interfaz (ej. botones de cerrar, flechas de paginación o iconos de búsqueda).
   - Las acciones de usuario emplean exclusivamente iconografía técnica de línea estándar (Lucide / Phosphor).
3. **Control estricto de opacidad:**
   - En el tema oscuro (*Obsidiana & Jade*), los patrones de fondo (grecas, estelas) deben configurarse con una opacidad máxima de **`0.06` a `0.10`** (6% al 10%).
   - Nunca deben comprometer el contraste del texto ni generar ruido visual en la lectura.
4. **Respeto a la paleta temática:**
   - Tema Oscuro: Trazos sutiles en Verde Jade Sombrío (`--color-jade-muted`) o Blanco Hueso atenuado.
   - Tema Claro: Diseños inspirados en el ciclo del maíz y el sol, en tonos cálidos y verdes milpa suaves (`--color-corn-green`, `--color-sun`).

---

## 3. Reserva de Identidad y Marca

De conformidad con el archivo `src/components/maya/NOTICE.md` y las condiciones de la licencia del repositorio:

- Los motivos mayas decorativos, el logotipo y los símbolos vectoriales específicos del sitio son **identidad reservada del autor (Samuel Sarmientos)**.
- Quienes realicen forks o reutilicen la arquitectura del sitio para sus propios proyectos deben reemplazar los SVG de `src/components/maya/` por sus propios activos visuales o utilizar los marcadores de posición genéricos proporcionados en `src/components/maya/placeholders/`.
