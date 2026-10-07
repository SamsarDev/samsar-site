export interface MockProject {
  title: string;
  description: string;
  stack: string[];
  status: 'active' | 'completed' | 'wip';
  href?: string;
  repoUrl?: string;
}

export const recentProjects: MockProject[] = [
  {
    title: 'SamsarSite',
    description: 'Sitio personal y pedagógico construido con Astro 6, Vue 3 y Tailwind v4.',
    stack: ['Astro', 'Vue 3', 'Tailwind v4', 'TypeScript'],
    status: 'active',
    repoUrl: 'https://github.com/SamsarDev/samsar-site',
  },
  {
    title: 'Agentic Workflow Engine',
    description: 'Orquestador de agentes de pair programming para estudiantes de ingeniería.',
    stack: ['TypeScript', 'Node.js', 'LLMs'],
    status: 'wip',
  },
  {
    title: 'Mayan Glyphs Generator',
    description: 'Herramienta de renderizado vectorial paramétrico de motivos culturales.',
    stack: ['SVG', 'Canvas', 'Vue 3'],
    status: 'completed',
  },
];
