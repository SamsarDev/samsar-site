export interface InterestArea {
  id: string;
  title: string;
  description: string;
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
  email: string;
  linkedin: string;
  github: string;
  bioParagraphs: string[];
  interestAreas: InterestArea[];
  principles: Principle[];
  skillCategories: SkillCategory[];
  outsideTerminal: string;
}

export const profileData: ProfileData = {
  name: 'Samuel Sarmientos',
  tagline: 'AI Architect & Technical Lead | Senior Full-Stack Developer',
  location: 'Guatemala City, Guatemala',
  email: 'samsar.dev@gmail.com',
  linkedin: 'https://linkedin.com/in/samsar-dev',
  github: 'https://github.com/samsar-dev',
  bioParagraphs: [
    'Ingeniero de Software y Technical Lead con cerca de una década de experiencia en el ciclo completo de desarrollo full-stack, diseño de sistemas distribuidos y modernización de plataformas empresariales críticas en banca, retail masivo, logística y edtech.',
    'Desde 2023, enfoco mi práctica estratégica en la arquitectura e implementación de soluciones de Inteligencia Artificial agéntica (Agentic AI, Model Context Protocol y RAG), integrando modelos generativos de forma segura y gobernada en los flujos operativos centrales del negocio.',
    'Creo firmemente en los fundamentos por encima de las modas tecnológicas: Clean Architecture, Domain-Driven Design y DevSecOps automatizado para construir software resiliente, escalable y mantenible a largo plazo.',
    'Paralelamente, cultivo una profunda vocación docente y pedagógica, impartiendo mentoría a jóvenes profesionales y diseñando experiencias educativas que demuestran que la tecnología cobra su verdadero valor cuando empodera a las personas.'
  ],
  interestAreas: [
    {
      id: 'software-dev',
      title: 'Desarrollo de Software',
      description: 'Sistemas escalables y mantenibles en .NET Core, TypeScript y Vue.js con enfoque riguroso en Clean Architecture y DDD.'
    },
    {
      id: 'system-architecture',
      title: 'Arquitectura de Sistemas',
      description: 'Diseño de microservicios, arquitecturas reactivas orientadas a eventos con Apache Kafka y modernización de plataformas legacy.'
    },
    {
      id: 'ai-agents',
      title: 'IA Agéntica & Protocolos',
      description: 'Orquestación de flujos autónomos con LangGraph, integración de herramientas mediante Model Context Protocol (MCP) y RAG híbrido.'
    },
    {
      id: 'games-graphics',
      title: 'Videojuegos & Gráficos',
      description: 'Desarrollo de experiencias gamificadas 3D interactivas con Three.js y motores de videojuegos como puente de aprendizaje didáctico.'
    },
    {
      id: 'education-mentorship',
      title: 'Educación & Mentoría',
      description: 'Formación de talento en fundamentos algorítmicos, cultura de ingeniería colaborativa y pair programming asistido por agentes.'
    },
    {
      id: 'maya-culture',
      title: 'Cultura & Filosofía Maya',
      description: 'Exploración de la cosmovisión, matemáticas vigesimales y patrones visuales ancestrales reinterpretados en interfaces modernas.'
    }
  ],
  principles: [
    {
      number: '01',
      title: 'Fundamentos sobre inmediatez',
      description: 'La tecnología evoluciona a un ritmo vertiginoso, pero los principios de diseño de software perduran. Comprender el problema a fondo antes de escribir la primera línea es innegociable.'
    },
    {
      number: '02',
      title: 'Open Source ético y compartido',
      description: 'Compartir conocimiento, documentar decisiones arquitectónicas (ADRs) y devolver a la comunidad global más valor del que tomamos prestado.'
    },
    {
      number: '03',
      title: 'Mentoría y pedagogía activa',
      description: 'Explicar con claridad el porqué de cada decisión técnica. Un arquitecto o líder no se mide solo por sus sistemas, sino por el crecimiento de los equipos a los que guía.'
    },
    {
      number: '04',
      title: 'Rigor técnico sin dogmatismos',
      description: 'Clean Architecture, Hexagonal y patrones sólidos son herramientas pragmáticas al servicio del negocio, no dogmas que justifiquen complejidad accidental innecesaria.'
    },
    {
      number: '05',
      title: 'Equilibrio vital y curiosidad',
      description: 'El código cobra sentido pleno cuando convive en armonía con la familia, el juego, la crianza y las aficiones creativas que alimentan la mente fuera de la terminal.'
    }
  ],
  skillCategories: [
    {
      category: 'Arquitectura de IA / Agentes',
      skills: [
        'LangGraph',
        'Model Context Protocol (MCP)',
        'Arquitecturas Agénticas (Supervisor/HITL)',
        'Orquestación Tool Calling',
        'RAG Híbrido & Ingesta Vectorial',
        'Azure OpenAI Service'
      ]
    },
    {
      category: 'Desarrollo Full-Stack & APIs',
      skills: [
        'C# / .NET Core',
        'TypeScript',
        'Node.js',
        'Vue.js',
        'Angular',
        'FastEndpoints & Minimal APIs',
        'Microservicios',
        'Clean Architecture & DDD'
      ]
    },
    {
      category: 'Cloud, DevSecOps & Datos',
      skills: [
        'Microsoft Azure',
        'Docker',
        'Terraform (IaC)',
        'Pipelines CI/CD (SAST/DAST)',
        'Apache Kafka',
        'SQL Server / PostgreSQL (pgvector)',
        'Cosmos DB',
        'Redis'
      ]
    },
    {
      category: 'Gobierno de IA & Seguridad',
      skills: [
        'Validación de Esquemas (Zod/JSON Schema)',
        'Control de Tokens & Rate Limiting',
        'Observabilidad & Trazabilidad',
        'Políticas de Ejecución Segura',
        'OAuth 2.0'
      ]
    }
  ],
  outsideTerminal: 'Fuera de la terminal, disfruto pasar tiempo de calidad con mi familia, creando juegos y experimentos lúdicos con mi hijo, explorando la literatura sobre historia y filosofía mesoamericana, y dedicando tiempo a proyectos comunitarios que despiertan la curiosidad intelectual.'
};
