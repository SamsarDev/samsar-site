# Tarea 01: Estructuras de Datos y Recursos de Perfil y Experiencia

- **Fase:** 05 — Perfil y Experiencia Profesional
- **Estimación:** 25 minutos
- **Documentos de referencia:** [`docs/01-product/screens/02-profile-and-experience.md`](../../01-product/screens/02-profile-and-experience.md) · [`docs/04-process/01-conventions.md`](../../04-process/01-conventions.md)

---

## 1. Objetivo Pedagógico

Aprender a diseñar modelos de datos inmutables y fuertemente tipados en TypeScript para páginas de perfil y currículum, asegurando separación de responsabilidades entre datos crudos y componentes de interfaz. Además, organizarás los recursos estáticos públicos descargables (CV en PDF) y las imágenes optimizadas para la presentación personal.

---

## 2. Criterios de Aceptación (DoD)

- [ ] Recurso `public/cv-samuel-sarmientos.pdf` disponible para descarga pública directa.
- [ ] Imagen de avatar personal copiada a `src/assets/avatar.png`.
- [ ] Archivo `src/data/profile.ts` creado con interfaces TypeScript (`ProfileData`, `InterestArea`, `Principle`, `SkillCategory`) y datos reales de Samuel Sarmientos.
- [ ] Archivo `src/data/experience.ts` creado con interfaces TypeScript (`ExperienceItem`, `EducationItem`, `CertificationItem`, `LanguageItem`) y trayectoria laboral real de Samuel.
- [ ] Ambos módulos exportan constantes fuertemente tipadas sin uso de `any`.
- [ ] `bun run check` y `bun run build` pasan con 0 errores y 0 advertencias.

---

## 3. Paso a Paso Guiado

### Paso 1: Ubicar los archivos estáticos en el proyecto

Copia el PDF del currículum al directorio `public/` para permitir su descarga directa sin pasar por el pipeline de Vite:
- `public/cv-samuel-sarmientos.pdf`

Copia el avatar a `src/assets/` para que Astro pueda optimizar su formato y dimensiones con la etiqueta `<Image />`:
- `src/assets/avatar.png`

### Paso 2: Crear el modelo y datos de perfil en `src/data/profile.ts`

Define las interfaces exportadas y el objeto de datos:

```typescript
export interface InterestArea {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Principle {
  number: string;
  title: string;
  description: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface ProfileData {
  name: string;
  tagline: string;
  location: string;
  bioParagraphs: string[];
  interestAreas: InterestArea[];
  principles: Principle[];
  skillCategories: SkillCategory[];
  outsideTerminal: string;
}

export const profileData: ProfileData = {
  name: 'Samuel Sarmientos',
  tagline: 'Ingeniero de Software, Arquitecto IA, educador y aprendiz eterno',
  location: 'Guatemala',
  bioParagraphs: [
    // Párrafos biográficos narrativos
  ],
  interestAreas: [
    // 6 áreas temáticas
  ],
  principles: [
    // 5 principios fundamentales
  ],
  skillCategories: [
    // Backend & APIs, Frontend & Web, Cloud & DevOps, IA & Integraciones
  ],
  outsideTerminal: '...',
};
```

### Paso 3: Crear el modelo y datos de experiencia en `src/data/experience.ts`

Define la trayectoria profesional, educación, certificaciones e idiomas:

```typescript
export type ExperienceArea = 'all' | 'backend' | 'frontend' | 'cloud' | 'ai' | 'leadership';

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  area: ('backend' | 'frontend' | 'cloud' | 'ai' | 'leadership')[];
  achievements: string[];
  stack: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  details?: string;
}

export interface CertificationItem {
  name: string;
  issuer: string;
  year: string;
  url?: string;
}

export interface LanguageItem {
  language: string;
  level: string;
}

export const experienceData: {
  summary: string;
  experiences: ExperienceItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  languages: LanguageItem[];
} = {
  // Datos reales estructurados
};
```

---

## 4. Comprobación y Verificación

1. Verifica que los archivos `public/cv-samuel-sarmientos.pdf` y `src/assets/avatar.png` existan en disco.
2. Ejecuta el verificador de tipos de TypeScript y Astro:
   ```bash
   bun run check
   ```
3. Ejecuta la compilación estática:
   ```bash
   bun run build
   ```
4. Comprueba que no existan errores de importación ni tipos implícitos.
