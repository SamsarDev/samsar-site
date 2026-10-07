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
  description?: string;
}

export interface ExperienceData {
  summary: string;
  experiences: ExperienceItem[];
  education: EducationItem[];
  certifications: CertificationItem[];
  languages: LanguageItem[];
}

export const experienceData: ExperienceData = {
  summary:
    'Ingeniero de Software y Technical Lead con cerca de 10 años de experiencia consolidada en el ciclo completo de desarrollo Full-Stack, diseño de sistemas distribuidos y modernización de plataformas empresariales (Banca, Retail, Logística, EdTech). Desde 2023, enfocado estratégicamente en la arquitectura y despliegue de soluciones de Inteligencia Artificial (Agentic AI, MCP, RAG), integrando modelos generativos en operativas core de negocio sobre Microsoft Azure.',
  experiences: [
    {
      id: 'talkin-heads',
      role: "Jefe de Tecnología (AI Architect & Hands-on Tech Lead)",
      company: "Talkin'Heads",
      period: 'May 2026 – Presente',
      location: 'Guatemala (Presencial)',
      area: ['ai', 'leadership', 'backend', 'cloud'],
      achievements: [
        'Orquestación Agéntica con LangGraph: Diseñé e implementé la capa de orquestación para flujos autónomos utilizando nodos de Retrieval, Agent, Tool y Validator (Circuit Breaker), aplicando enrutamiento condicional y el patrón Supervisor/HITL.',
        'Protocolos de Contexto (MCP): Desarrollé servidores MCP en Node.js/TypeScript para exponer herramientas operativas de forma segura a modelos LLM, con transporte stdio y validación estricta de esquemas.',
        'Estandarización Full-Stack: Dirección del ciclo de desarrollo en .NET Core, Node.js y Vue.js, gobernando infraestructura como código mediante Docker y Terraform en Azure.'
      ],
      stack: ['LangGraph', 'MCP', 'Node.js', 'TypeScript', '.NET Core', 'Vue.js', 'Terraform', 'Docker', 'Azure OpenAI']
    },
    {
      id: 'digital-geko-promerica',
      role: 'Principal Cloud & AI Architect (Consultor)',
      company: 'Digital Geko — Banco Promerica / Cemaco',
      period: 'Dic 2021 – Abr 2026',
      location: 'Centroamérica (Remoto)',
      area: ['backend', 'cloud', 'ai'],
      achievements: [
        'Modernización Core Bancario (Banco Promerica): Migración de servicios SOAP legacy a microservicios .NET Core aplicando Strangler Fig, Minimal APIs y Clean Architecture, reduciendo la latencia transaccional en un 75% (de 20s a 5s).',
        'Pasarela de Transferencias: Diseño de arquitectura orientada a eventos en Azure con .NET Core, FastEndpoints y Apache Kafka para la integración asíncrona y resiliente con Mastercard/Neonet.',
        'Logística & IA (Cemaco): Plataforma logística Full-Stack (C#/Vue.js) integrada con Azure OpenAI y canalizaciones RAG para consultas de inventarios y aprobaciones en lenguaje natural.'
      ],
      stack: ['.NET Core', 'Minimal APIs', 'FastEndpoints', 'Apache Kafka', 'Azure', 'Vue.js', 'Clean Architecture', 'Azure OpenAI', 'SQL Server']
    },
    {
      id: 'walmart-cam',
      role: 'DevSecOps Maturity Lead',
      company: 'Walmart CAM (vía Consultoría Independiente)',
      period: 'Sep 2025 – Abr 2026',
      location: 'Centroamérica (Remoto)',
      area: ['cloud', 'leadership'],
      achievements: [
        'Seguridad & CI/CD: Diseño e implementación de arquitectura de pipelines de integración continua multi-repositorio, incorporando análisis estático SAST/DAST para mitigación de vulnerabilidades críticas.',
        'Modernización Legacy: Dirección en la refactorización profunda de componentes legacy para elevar los estándares de resiliencia y estabilidad del software.'
      ],
      stack: ['Azure DevOps', 'Pipelines CI/CD', 'SAST/DAST', 'Docker', 'Bash', 'Terraform', 'Security Governance']
    },
    {
      id: 'saul-e-mendez',
      role: 'Lead Solutions Architect / Senior Full Stack',
      company: 'Saúl E. Méndez',
      period: 'Feb 2023 – Jun 2025',
      location: 'Guatemala (Remoto)',
      area: ['frontend', 'backend', 'cloud'],
      achievements: [
        'Logística & Orquestación IA: Plataforma logística en TypeScript/Vue.js con documentación arquitectónica (ADRs), integración Azure y RAG para manuales operativos.',
        'Sistemas Financieros: SPA de presupuestos dinámicos en Vue.js bajo Arquitectura Hexagonal y Microsoft Graph API, reduciendo el ciclo de iteraciones corporativas en un 50%.',
        'Telemetría ERP: Integración Cloud (Azure SQL, Cosmos DB, Redis) conectada a SAP HANA para rastreo satelital de transportes en tiempo real.'
      ],
      stack: ['Vue.js', 'TypeScript', 'Hexagonal Architecture', 'Azure SQL', 'Cosmos DB', 'Redis', 'SAP HANA', 'Microsoft Graph']
    },
    {
      id: 'progrentis',
      role: 'Semi-Senior Full-Stack Developer',
      company: 'Progrentis (EdTech)',
      period: 'Feb 2020 – Dic 2021',
      location: 'Guatemala (Remoto)',
      area: ['frontend', 'backend'],
      achievements: [
        'Modernización Frontend: Desacoplamiento de plataformas administrativas backend .NET MVC hacia componentes modulares interactivos en Vue.js.',
        'Experiencias Gamificadas 3D: Diseño y desarrollo de entornos lúdicos interactivos en Three.js con enfoque Mobile-First para más de 50,000 estudiantes activos.'
      ],
      stack: ['Vue.js', '.NET MVC', 'Three.js', 'JavaScript', 'CSS3', 'Mobile-First UI']
    },
    {
      id: 'union-sa',
      role: '.NET Developer',
      company: 'Unión S.A.',
      period: 'Ago 2019 – Ene 2020',
      location: 'Guatemala (Presencial)',
      area: ['backend'],
      achievements: [
        'Integración ERP: Flujos de sincronización mediante APIs REST entre la tienda de comercio electrónico y Microsoft Dynamics NAV sin acoplamiento a base de datos legacy.',
        'API Logística & BI: Creación de API para orquestación de traslados y módulo de inteligencia de negocios para monitoreo en tiempo casi real de ventas e inventario.'
      ],
      stack: ['C#', 'ASP.NET Web Forms', 'REST APIs', 'Microsoft Dynamics NAV', 'SQL Server']
    },
    {
      id: 'bac-credomatic',
      role: 'Analista de Estrategia',
      company: 'BAC Credomatic',
      period: 'Feb 2018 – Jul 2019',
      location: 'Guatemala (Presencial)',
      area: ['backend', 'cloud'],
      achievements: [
        'Ingeniería de Datos y ETLs: Extracción, transformación y carga masiva de datos en entornos heterogéneos (SQL Server, Data Warehouses, AS400).',
        'Automatización de BI: Consolidación y orquestación de reportería gerencial en SAS, automatizando el 85% de reportes manuales con estricto SLA de entrega estratégica.'
      ],
      stack: ['SQL Server', 'ETL Pipelines', 'SAS Enterprise', 'Data Warehouses', 'AS400']
    },
    {
      id: 'galich-docencia',
      role: 'Profesor de Tecnología',
      company: 'Corporación Galich',
      period: 'Ene 2017 – Ene 2018',
      location: 'Guatemala (Presencial)',
      area: ['leadership'],
      achievements: [
        'Docencia Técnica: Diseño y facilitación de cursos formativos en fundamentos de programación, algoritmos, estructuras de datos y lógica computacional para nivel diversificado.'
      ],
      stack: ['Fundamentos de Programación', 'Algoritmos', 'Estructuras de Datos', 'Pedagogía']
    }
  ],
  education: [
    {
      degree: 'Ingeniería en Sistemas (Pensum cerrado / Incompleta)',
      institution: 'Universidad Galileo, Guatemala',
      period: '2017 – 2020',
      details: 'Énfasis en ciencias de la computación, estructuras de datos y arquitectura de software.'
    },
    {
      degree: 'Perito en Informática y Computación',
      institution: 'CTI Luis Cardoza y Aragón, Guatemala',
      period: '2012 – 2016'
    },
    {
      degree: 'Bachiller Industrial',
      institution: 'CTI Luis Cardoza y Aragón, Guatemala',
      period: '2012 – 2016'
    }
  ],
  certifications: [
    {
      name: 'Agentic AI & LangGraph Architect',
      issuer: 'Especialización en Sistemas Multi-Agente',
      year: '2024'
    },
    {
      name: 'DevSecOps & Cloud Architecture Specialist',
      issuer: 'Microsoft Azure Ecosystem',
      year: '2023'
    }
  ],
  languages: [
    {
      language: 'Español',
      level: 'Nativo',
      description: 'Lengua materna'
    },
    {
      language: 'Inglés',
      level: 'Competencia Profesional Técnica',
      description: 'Diseño, documentación técnica y negociación de arquitectura de software'
    }
  ]
};
