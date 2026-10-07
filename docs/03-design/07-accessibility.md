# 07-accessibility: Accesibilidad y Cumplimiento WCAG AA

Estándares de accesibilidad, contrastes matemáticos validados y lista de verificación para **Samsar | Sitio web personal**.

---

## 1. Compromiso de Accesibilidad

El sitio está diseñado para cumplir de manera estricta las pautas de accesibilidad para el contenido web **WCAG 2.1 nivel AA**. La accesibilidad no es un añadido estético opcional, sino una restricción de ingeniería que condiciona cada token y componente.

---

## 2. Matriz de Contrastes Validados

Calculada formalmente con la fórmula de luminancia relativa de WCAG. Mínimos requeridos: **4.5:1** para texto normal y **3:1** para elementos de interfaz y texto grande (> 24px).

### 2.1 Tema Oscuro (*Obsidiana & Jade*)

| Combinación de Colores | Ratio Calculado | Calificación | Estado de Uso |
|---|---|---|---|
| `text` (`#E8E6E1`) sobre `bg` (`#0A0E0C`) | `15.6:1` | **AAA** | Texto principal seguro |
| `text-muted` (`#9AA39E`) sobre `bg` | `7.5:1` | **AAA** | Texto secundario y metadata |
| `jade` (`#00A86B`) sobre `bg` | `6.3:1` | **AA** | Enlaces destacados e iconos |
| `hummingbird` (`#19C3B0`) sobre `bg` | `8.8:1` | **AAA** | Anillos de foco y acentos IA |
| `bg` sobre `jade` (botón primario) | `6.3:1` | **AA** | Texto sobre botón primario |
| `text` sobre `blood` (botón peligro) | `5.4:1` | **AA** | Botón de alerta |
| `blood-text` (`#EF6B63`) sobre `bg` | `6.4:1` | **AA** | Texto de error sobre fondo oscuro |
| `blood` (`#B22222`) sobre `bg` como texto | `2.9:1` | **Falla** | **Prohibido como texto** |

### 2.2 Tema Claro (*Cielo, Sol y Maíz*)

| Combinación de Colores | Ratio Calculado | Calificación | Estado de Uso |
|---|---|---|---|
| `text` (`#2B2B2B`) sobre `bg` (`#FFFDF7`) | `13.9:1` | **AAA** | Texto principal seguro |
| `text-muted` (`#5B6370`) sobre `bg` | `6.0:1` | **AA** | Texto secundario (ajustado de `#6B7280`) |
| `link` (`#0369A1`) sobre `bg` | `5.8:1` | **AA** | Enlaces y foco en tema claro |
| `text` sobre `sun` (`#F4A300`) | `6.8:1` | **AA** | Texto oscuro sobre botón amarillo |
| `sun-text` (`#8A5A00`) sobre `bg` | `5.8:1` | **AA** | Texto ámbar con contraste corregido |
| `sun` (`#F4A300`) sobre `bg` como texto | `2.1:1` | **Falla** | **Prohibido como texto** |
| `sky-deep` (`#87CEEB`) sobre `bg` | `1.7:1` | **Falla** | **Solo decorativo** |
| `corn-green` (`#7CB342`) sobre `bg` | `2.5:1` | **Falla** | **Solo decorativo** |

---

## 3. Checklist Obligatorio de Verificación

Antes de dar cualquier componente o pantalla por completada (Definición de Terminado):

- [ ] **Foco visible:** Todo elemento interactivo (botones, enlaces, inputs) exhibe un anillo de foco nítido mediante `:focus-visible` con token `--border-focus`.
- [ ] **Botones de solo icono:** Poseen obligatoriamente un atributo `aria-label` descriptivo en español (ej. `aria-label="Cambiar tema"`).
- [ ] **Navegación por teclado:** Es posible recorrer todo el sitio usando exclusivamente `Tab`, `Shift+Tab`, `Enter` y `Space`. Los menús y modales se cierran con `Escape`.
- [ ] **Estructura de encabezados:** Exactamente un `<h1>` por página, sin saltos anómalos de jerarquía (H1 -> H2 -> H3).
- [ ] **Objetivos táctiles:** Todo elemento interactivo en móvil mide al menos **44×44 px** con espaciado mínimo de 8px entre controles contiguos.
- [ ] **Imágenes con texto alternativo:** Toda imagen informativa porta un `alt` descriptivo. Las imágenes decorativas portan `alt=""` o `aria-hidden="true"`.
- [ ] **Independencia del color:** Los estados de error nunca se comunican únicamente cambiando el color del borde; van acompañados de un mensaje textual y un icono explicativo.
