# Pantallas 2 y 3: Perfil y Experiencia Profesional

Especificación de las pantallas de presentación personal (`/sobre-mi`) y trayectoria profesional (`/experiencia`).

---

## 👤 Pantalla 2: Sobre mí (`/sobre-mi`)

### 1. Propósito
Presentación personal, filosófica y humana. Espacio para comunicar motivaciones, intereses más allá del código y valores de ingeniería.

### 2. Estructura de Secciones

| # | Sección | Elementos y Contenido |
|---|---|---|
| **2.1** | **Hero Personal** | Avatar/foto con marco sobrio, nombre completo (*Samuel Sarmientos*), tagline (*"Ingeniero de Software, Arquitecto IA, educador y aprendiz eterno"*), ubicación geográfica (*Guatemala*). |
| **2.2** | **Biografía Narrativa** | 3 a 4 párrafos profundos sobre origen, evolución profesional, pasión por la arquitectura limpia y la enseñanza comunitaria. |
| **2.3** | **Áreas de Interés** | Cuadrícula de 6 bloques temáticos: Desarrollo de Software, Arquitectura de Sistemas, Inteligencia Artificial / Agentes, Videojuegos, Educación & Voluntariado, Cultura Maya. |
| **2.4** | **Valores y Filosofía** | Lista estructurada de 5 principios: Aprendizaje continuo, Open Source ético, Mentoría y docencia, Rigor técnico sin dogma, Equilibrio vital. |
| **2.5** | **Stack de Dominio** | Chips agrupados por categorías: Backend & APIs, Frontend & Web, Cloud & DevOps, IA & Integraciones. |
| **2.6** | **Fuera de la Terminal** | Párrafo breve sobre familia, tiempo con su hijo y proyectos personales creativos. |
| **2.7** | **CTA Contacto** | Bloque final con invitación a conversar (*"¿Tienes una idea o pregunta?"*) y botón hacia `/contacto`. |

---

## 💼 Pantalla 3: Experiencia / CV (`/experiencia`)

### 1. Propósito
Portafolio profesional estructurado para reclutadores, líderes técnicos y colaboradores. Incluye timeline detallado, logros cuantificables y descarga de currículum en PDF.

### 2. Estructura de Secciones

| # | Sección | Elementos y Contenido |
|---|---|---|
| **3.1** | **Encabezado y Descarga** | Título H1 (*"Experiencia Profesional"*), botón primario destacado: *"Descargar CV (PDF)"* con icono accesible. |
| **3.2** | **Resumen Ejecutivo** | Párrafo de síntesis sobre los años de trayectoria, especialización técnica (Vue, Astro, Python, Cloud, IA) e impacto en proyectos a gran escala. |
| **3.3** | **Filtros de Especialidad** | Chips para filtrar hitos del timeline: *Todos*, *Backend*, *Frontend*, *Cloud/DevOps*, *IA & Datos*, *Liderazgo*. |
| **3.4** | **Timeline Cronológico** | Lista de experiencias laborales generada a partir de `src/data/experience.ts`. Cada ítem incluye: Cargo, Empresa, Periodo (fechas), Ubicación/Modalidad, 3 a 5 viñetas de logros e impacto, chips de tecnologías empleadas. |
| **3.5** | **Habilidades Clave** | Matriz consolidada de competencias técnicas agrupadas. |
| **3.6** | **Educación y Certificaciones** | Lista de títulos académicos, certificaciones técnicas vigentes y estudios relevantes. |
| **3.7** | **Idiomas** | Español (nativo) e Inglés (profesional/técnico). |
| **3.8** | **CTA Profesional** | Bloque de contacto enfocado en oportunidades profesionales y consultorías. |

---

## 3. Consideraciones Técnicas

- Ambas páginas son estáticas (`.astro`).
- Los datos de `/experiencia` provienen del archivo fuertemente tipado `src/data/experience.ts`.
- Botón de descarga de CV apunta a un recurso estático en `public/cv-samuel-sarmientos.pdf`.
