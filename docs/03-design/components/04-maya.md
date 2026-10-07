# Componentes: Motivos Mayas (`src/components/maya/`)

Especificación de los 7 componentes visuales decorativos inspirados en la herencia cultural maya.

---

## 1. Principios de Implementación de Motivos Mayas

1. **Puramente decorativos:** Todos los componentes se renderizan como SVGs inline y portan obligatoriamente el atributo `aria-hidden="true"`.
2. **Opacidad estrictamente controlada:** En el tema oscuro, la opacidad de los patrones de fondo nunca supera el `10%` (`opacity: 0.1` o `0.08`), evitando competir con la lectura del texto.
3. **Identidad reservada:** De acuerdo con `src/components/maya/NOTICE.md` y la licencia del repositorio, estos componentes vectoriales constituyen identidad visual propia del autor.

---

## 2. Catálogo de Componentes

### 1. `<QuetzalSVG />` (`QuetzalSVG.astro`)
- **Propósito:** Silueta vectorial estilizada del quetzal en vuelo.
- **Uso:** Sección Hero de la portada. Interviene con un fade-in sutil acelerado por GPU.
- **Color:** Trazos tenues en Jade Imperial (`--color-jade-muted`) o Blanco Hueso con baja opacidad.

### 2. `<HummingbirdSVG />` (`HummingbirdSVG.astro`)
- **Propósito:** Silueta geométrica del colibrí (*tz'unun*).
- **Uso:** Decoración en cabeceras de artículos de IA, separadores y micro-detalles.
- **Color:** Resplandor sutil en Turquesa Colibrí (`--color-hummingbird`).

### 3. `<MayaPattern />` (`MayaPattern.astro`)
- **Propósito:** Patrón geométrico continuo de grecas escalonadas (*xicalcoliuhqui*).
- **Uso:** Textura de fondo sutil en secciones específicas (Hero, Footer, cabeceras de categorías).
- **Implementación:** SVG repetible vía máscara CSS o fondo vectorial con opacidad máxima del 6%.

### 4. `<GlyphIcon />` (`GlyphIcon.astro`)
- **Propósito:** Glifos calendáricos y astronómicos geométricos estilizados.
- **Uso:** Iconografía decorativa en cabeceras de categoría y divisores de sección. Nunca como botón de acción interactivo.

### 5. `<FeatherDivider />` (`FeatherDivider.astro`)
- **Propósito:** Separador horizontal elegante con motivo de plumas estilizadas.
- **Uso:** Transiciones entre secciones mayores en páginas de contenido largo.

### 6. `<CornSVG />` (`CornSVG.astro`)
- **Propósito:** Silueta de mazorca de maíz estilizada para el tema claro (*"El cielo, el sol y el maíz"*).
- **Uso:** Cabeceras y detalles visuales cuando `data-theme="light"` está activo.
- **Color:** Tonos cálidos suaves (`--color-corn-green` o ámbar tenue).

### 7. `<SunSVG />` (`SunSVG.astro`)
- **Propósito:** Motivo solar maya radiante para el tema claro.
- **Uso:** Fondo o detalles en el Hero y banners temáticos diurnos.
- **Color:** Trazos en Amarillo Sol (`--color-sun`) con baja saturación.
