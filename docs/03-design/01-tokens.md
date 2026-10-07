# 01-tokens: Tokens de Diseño y Variables CSS

Definición exhaustiva de tokens primitivos, tokens semánticos, espaciados y radios para **Samsar | Sitio web personal**. La implementación física de estos valores reside en `src/styles/theme.css`.

---

## 1. Tokens Primitivos: Tema Oscuro ("Obsidiana & Jade")

Tema por defecto del sitio (`data-theme="dark"`). Calibrado para suprimir la fatiga visual nocturna mediante sustratos litográficos de baja reflectancia y acentos minerales.

| Token CSS | Valor Hex | Nombre Simbólico | Rol en el Sistema |
|---|---|---|---|
| `--color-bg` | `#0A0E0C` | Obsidiana Profunda | Canvas base no reflectante |
| `--color-bg-elevated` | `#131916` | Basalto Superficial | Cards, header, footer, modales |
| `--color-bg-highlight` | `#1C2420` | Basalto Elevado | Bordes sutiles de tarjetas, hover tenue |
| `--color-jade` | `#00A86B` | Jade Imperial | Acción interactiva primaria, foco |
| `--color-jade-light` | `#1FBF84` | Jade Claro | Estado hover de botón primario |
| `--color-jade-muted` | `#1F7A5C` | Jade Sombrío | Bordes estructurales, acentos secundarios |
| `--color-hummingbird` | `#19C3B0` | Colibrí Turquesa | Foco, procesos activos, acentos de IA |
| `--color-blood` | `#B22222` | Cinabrio Ceremonial | Fondos y bordes de peligro (no para texto) |
| `--color-blood-text` | `#EF6B63` | Cinabrio Claro | Texto de error accesible sobre fondo oscuro |
| `--color-text` | `#E8E6E1` | Blanco Hueso | Texto principal (alto contraste sin brillo) |
| `--color-text-muted` | `#9AA39E` | Ceniza Caliza | Metadata, comentarios, placeholders |
| `--color-text-subtle` | `#5C6660` | Basalto Apagado | Elementos deshabilitados y decorativos |

---

## 2. Tokens Primitivos: Tema Claro ("Cielo, Sol y Maíz")

Tema alternativo activable por el usuario (`data-theme="light"`). Representa fertilidad, conocimiento solar y vida cotidiana maya.

| Token CSS | Valor Hex | Nombre Simbólico | Rol en el Sistema |
|---|---|---|---|
| `--color-bg` | `#FFFDF7` | Blanco Maíz | Canvas base cálido |
| `--color-bg-elevated` | `#F5F0E8` | Beige Mazorca | Cards, header, footer |
| `--color-bg-highlight` | `#EAE3D5` | Beige Oscuro | Hover tenue en cards |
| `--color-sun` | `#F4A300` | Amarillo Sol | Fondo de CTAs principales (con texto oscuro) |
| `--color-sun-light` | `#FFB41F` | Sol Brillante | Hover de CTA principal |
| `--color-sun-text` | `#8A5A00` | Ámbar Solar | Texto de acento ámbar con contraste validado |
| `--color-link` | `#0369A1` | Azul Profundo | Enlaces de texto y anillos de foco |
| `--color-sky` | `#A7D8F0` | Celeste Cielo | Decorativo únicamente (no para texto) |
| `--color-sky-deep` | `#87CEEB` | Azul Cielo | Decorativo únicamente |
| `--color-corn` | `#F7C948` | Amarillo Maíz | Decorativo únicamente |
| `--color-corn-green` | `#7CB342` | Verde Milpa | Decorativo únicamente |
| `--color-text` | `#2B2B2B` | Carbón Suave | Texto principal |
| `--color-text-muted` | `#5B6370` | Gris Pizarra | Metadata y texto secundario (WCAG AA) |
| `--color-text-subtle` | `#9CA3AF` | Gris Piedra | Deshabilitados y bordes sutiles |

---

## 3. Tokens Semánticos (Uso Obligatorio en Componentes)

Los componentes **nunca** consumen tokens primitivos directos. Consumen variables semánticas que se resuelven automáticamente según el tema activo:

| Token Semántico | Resuelve en Oscuro | Resuelve en Claro | Propósito de Uso |
|---|---|---|---|
| `--bg-primary` | `--color-bg` | `--color-bg` | Fondo general de la página |
| `--bg-surface` | `--color-bg-elevated` | `--color-bg-elevated` | Superficie de cards, headers, paneles |
| `--bg-subtle` | `--color-bg-highlight` | `--color-bg-highlight` | Fondos secundarios, hovers de lista |
| `--text-primary` | `--color-text` | `--color-text` | Títulos, párrafos principales |
| `--text-secondary` | `--color-text-muted` | `--color-text-muted` | Fechas, tiempo de lectura, tags |
| `--text-danger` | `--color-blood-text` | `--color-blood` | Mensajes de error accesibles |
| `--text-link` | `--color-hummingbird` | `--color-link` | Enlaces dentro de párrafos |
| `--accent-primary` | `--color-jade` | `--color-sun` | Fondo de botón o CTA primario |
| `--accent-primary-hover`| `--color-jade-light` | `--color-sun-light` | Hover de acción primaria |
| `--text-on-accent` | `--color-bg` | `--color-text` | Texto legible sobre el botón primario |
| `--border-base` | `rgba(154, 163, 158, 0.12)`| `rgba(91, 99, 112, 0.15)` | Bordes sutiles de cards de 1px |
| `--border-focus` | `--color-hummingbird` | `--color-link` | Anillo de foco accesible `:focus-visible` |

---

## 4. Escala de Espaciado y Radios

- **Espaciados:** `--space-1` (4px), `--space-2` (8px), `--space-3` (12px), `--space-4` (16px), `--space-5` (24px), `--space-6` (32px), `--space-7` (48px), `--space-8` (64px), `--space-9` (96px).
- **Radios de Borde:**
  - `4px` (`--radius-sm`): Chips, badges de código, checkboxes.
  - `8px` (`--radius-md`): Botones, inputs, terminales.
  - `12px` (`--radius-lg`): Tarjetas de blog y proyectos.
  - `16px` (`--radius-xl`): Diálogos, modales, drawers.
  - `9999px` (`--radius-full`): Píldoras de categoría y avatares circulares.
