# Componentes: Motivos Mayas (`src/components/maya/`)

Especificación de los motivos mayas del sitio: **2 implementados** (los reemplazos con licencia MIT que están en uso en la portada) y **7 planificados** (los motivos de identidad reservados, todavía no entregados). La convención de estado está en [`03-components.md`](../03-components.md).

> **Por qué los siete motivos de identidad están planificados:** [`NOTICE.md`](../../../src/components/maya/NOTICE.md) reserva esos vectores a un acuerdo de un solo uso y **no están en el repositorio**. Mientras se entregan, `placeholders/` ofrece reemplazos que cualquier fork puede usar.

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
- **Estado:** Planificado — motivo de identidad reservado, pendiente de entrega (ver [`NOTICE.md`](../../../src/components/maya/NOTICE.md)).

### 2. `<HummingbirdSVG />` (`HummingbirdSVG.astro`)
- **Propósito:** Silueta geométrica del colibrí (*tz'unun*).
- **Uso:** Decoración en cabeceras de artículos de IA, separadores y micro-detalles.
- **Color:** Resplandor sutil en Turquesa Colibrí (`--color-hummingbird`).
- **Estado:** Planificado — motivo de identidad reservado, pendiente de entrega (ver [`NOTICE.md`](../../../src/components/maya/NOTICE.md)).

### 3. `<MayaPattern />` (`MayaPattern.astro`)
- **Propósito:** Patrón geométrico continuo de grecas escalonadas (*xicalcoliuhqui*).
- **Uso:** Textura de fondo sutil en secciones específicas (Hero, Footer, cabeceras de categorías).
- **Implementación:** SVG repetible vía máscara CSS o fondo vectorial con opacidad máxima del 6%.
- **Estado:** Planificado — motivo de identidad reservado, pendiente de entrega (ver [`NOTICE.md`](../../../src/components/maya/NOTICE.md)). Lo más parecido que existe hoy es la greca escalonada de `placeholders/GrecaBorder.astro`.

### 4. `<GlyphIcon />` (`GlyphIcon.astro`)
- **Propósito:** Glifos calendáricos y astronómicos geométricos estilizados.
- **Uso:** Iconografía decorativa en cabeceras de categoría y divisores de sección. Nunca como botón de acción interactivo.
- **Estado:** Planificado — motivo de identidad reservado, pendiente de entrega (ver [`NOTICE.md`](../../../src/components/maya/NOTICE.md)).

### 5. `<FeatherDivider />` (`FeatherDivider.astro`)
- **Propósito:** Separador horizontal elegante con motivo de plumas estilizadas.
- **Uso:** Transiciones entre secciones mayores en páginas de contenido largo.
- **Estado:** Planificado — motivo de identidad reservado, pendiente de entrega (ver [`NOTICE.md`](../../../src/components/maya/NOTICE.md)).

### 6. `<CornSVG />` (`CornSVG.astro`)
- **Propósito:** Silueta de mazorca de maíz estilizada para el tema claro (*"El cielo, el sol y el maíz"*).
- **Uso:** Cabeceras y detalles visuales cuando `data-theme="light"` está activo.
- **Color:** Tonos cálidos suaves (`--color-corn-green` o ámbar tenue).
- **Estado:** Planificado — motivo de identidad reservado, pendiente de entrega (ver [`NOTICE.md`](../../../src/components/maya/NOTICE.md)).

### 7. `<SunSVG />` (`SunSVG.astro`)
- **Propósito:** Motivo solar maya radiante para el tema claro.
- **Uso:** Fondo o detalles en el Hero y banners temáticos diurnos.
- **Color:** Trazos en Amarillo Sol (`--color-sun`) con baja saturación.
- **Estado:** Planificado — motivo de identidad reservado, pendiente de entrega (ver [`NOTICE.md`](../../../src/components/maya/NOTICE.md)).

---

## 3. Reemplazos Disponibles (`placeholders/`)

Estos dos componentes **sí existen y están en uso**. Son sustitutos con licencia MIT pensados para que el proyecto (y cualquier fork) tenga motivos decorativos seguros mientras no se entreguen los de identidad.

### 8. `<GrecaBorder />` (`placeholders/GrecaBorder.astro`)

- **Propósito:** Banda horizontal de grecas escalonadas construida con un `<pattern>` SVG de 48×24 px repetido a lo ancho disponible.
- **Props:** `class` (opcional).
- **Uso:** Borde superior de la sección *Sobre el proyecto* en la portada (`AboutProject.astro`).
- **Estado:** Implementado — `src/components/maya/placeholders/GrecaBorder.astro`. Opacidad 5 % y `aria-hidden="true"`.

### 9. `<QuetzalSilhouette />` (`placeholders/QuetzalSilhouette.astro`)

- **Propósito:** Silueta estilizada de ave en un `viewBox` de 200×200, pensada como sustituto del quetzal de identidad.
- **Props:** `class` (opcional).
- **Uso:** Decoración superior derecha del *hero* de la portada (`Hero.astro`).
- **Estado:** Implementado — `src/components/maya/placeholders/QuetzalSilhouette.astro`. Opacidad 10 % y `aria-hidden="true"`.
