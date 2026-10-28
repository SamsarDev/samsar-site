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

// Derived from the private master profile (cv/perfil-maestro.md): keep roles, dates and figures identical to the CV.
export const experienceData: ExperienceData = {
  summary:
    'Technical Lead y arquitecto de software con cerca de 10 años de experiencia en el ciclo completo de desarrollo full-stack, el diseño de sistemas distribuidos y la modernización de plataformas empresariales para banca, retail, logística y edtech. Desde 2023 me enfoco en llevar la IA generativa y agéntica (RAG, Model Context Protocol, LangGraph) a las operaciones centrales del negocio de forma segura y gobernada sobre Microsoft Azure.',
  experiences: [
    {
      id: 'talkin-heads',
      role: 'Jefe de Tecnología',
      company: "Talkin'Heads",
      period: 'May 2026 – Presente',
      location: 'Guatemala (Presencial)',
      area: ['ai', 'leadership', 'backend', 'cloud'],
      achievements: [
        'Orquestación Agéntica con LangGraph: Diseñé e implementé la capa de orquestación para flujos autónomos con nodos de Retrieval, Agent, Tool y Validator (Circuit Breaker), aplicando enrutamiento condicional y el patrón Supervisor/HITL.',
        'Servidores MCP: Desarrollé servidores Model Context Protocol en Node.js/TypeScript para exponer herramientas operativas de forma segura a los modelos LLM, con transporte stdio y validación estricta de esquemas de entrada/salida.',
        'Estandarización Full-Stack: Dirijo el ciclo de desarrollo en .NET Core, Node.js y Vue.js, gobernando la infraestructura como código con Docker y Terraform en Azure.',
      ],
      stack: [
        'LangGraph',
        'MCP',
        'Node.js',
        'TypeScript',
        '.NET Core',
        'Vue.js',
        'Terraform',
        'Docker',
        'Azure OpenAI',
      ],
    },
    {
      id: 'walmart-cam',
      role: 'DevSecOps Maturity Lead',
      company: 'Walmart CAM',
      period: 'Sep 2025 – Abr 2026',
      location: 'Centroamérica (Remoto, contrato independiente)',
      area: ['cloud', 'leadership'],
      achievements: [
        'Seguridad & CI/CD: Diseñé la arquitectura de pipelines de integración continua estandarizados para múltiples repositorios, incorporando análisis SAST/DAST para bloquear vulnerabilidades críticas.',
        'Modernización Legacy: Dirigí la refactorización de componentes legacy para elevar su resiliencia y mitigar vulnerabilidades críticas.',
      ],
      stack: ['Azure DevOps', 'Pipelines CI/CD', 'SAST/DAST', 'Docker', 'Bash', 'Terraform'],
    },
    {
      id: 'saul-e-mendez',
      role: 'Senior Full-Stack Developer',
      company: 'Saúl E. Méndez',
      period: 'Feb 2023 – Jun 2025',
      location: 'Guatemala (Remoto, contrato independiente)',
      area: ['frontend', 'backend', 'cloud', 'ai'],
      achievements: [
        'Consulta de Manuales Operativos con IA: Desarrollé una plataforma logística en TypeScript/Vue.js; diseñé y documenté (ADRs) su integración con Azure y orquestación RAG para consultar manuales operativos en lenguaje natural.',
        'Presupuestos Dinámicos: Construí una SPA en Vue.js/TypeScript con Arquitectura Hexagonal y Microsoft Graph API, reduciendo el ciclo de iteraciones presupuestarias de 6 a 3 sesiones.',
        'Telemetría ERP: Coordiné la integración cloud (Azure SQL, Cosmos DB, Redis) conectada a SAP HANA para rastreo satelital de transportes en tiempo real.',
        'Onboarding Técnico: Construí un portal de autogestión sobre microservicios que redujo el tiempo de alta de 8 horas a 1 hora.',
      ],
      stack: [
        'Vue.js',
        'TypeScript',
        'Hexagonal Architecture',
        'Azure SQL',
        'Cosmos DB',
        'Redis',
        'SAP HANA',
        'Microsoft Graph',
      ],
    },
    {
      id: 'digital-geko',
      role: 'Socio Industrial (Arquitectura Cloud y Desarrollo de Software)',
      company: 'Digital Geko',
      period: 'Dic 2021 – Abr 2026',
      location: 'Centroamérica (Remoto)',
      area: ['backend', 'cloud', 'ai'],
      achievements: [
        'Modernización Core Bancario (Banco Promerica): Migré servicios SOAP legacy a microservicios .NET Core con el patrón Strangler Fig (transición inicial a monolito modular con Minimal APIs y Clean Architecture), reduciendo la latencia transaccional en un 75% (de 20s a 5s).',
        'Pasarela de Transferencias (Banco Promerica): Diseñé la arquitectura orientada a eventos en Azure con .NET Core, FastEndpoints y Apache Kafka para la integración asíncrona y resiliente con terceros (Mastercard/Neonet).',
        'Logística tipo WMS con IA (Cemaco): Construí una plataforma logística full-stack (C#/Vue.js) e integré Azure OpenAI con canalizaciones RAG para consultar inventarios, traslados de bodega y aprobaciones de compra en lenguaje natural.',
        'Desarrollo e Integración (Prosperus): Desarrollo full-stack e integración de sistemas core.',
      ],
      stack: [
        '.NET Core',
        'Minimal APIs',
        'FastEndpoints',
        'Apache Kafka',
        'Azure',
        'Vue.js',
        'Clean Architecture',
        'Azure OpenAI',
        'SQL Server',
        'Oracle',
      ],
    },
    {
      id: 'progrentis',
      role: 'Semi-Senior Full-Stack Developer',
      company: 'Progrentis (EdTech)',
      period: 'Feb 2020 – Dic 2021',
      location: 'Guatemala (Remoto)',
      area: ['frontend', 'backend'],
      achievements: [
        'Modernización Frontend: Guié la modernización de servicios backend .NET MVC hacia componentes modulares desacoplados con Vue.js.',
        'Experiencias Gamificadas 3D: Diseñé e implementé experiencias interactivas en Three.js con enfoque Mobile-First para más de 50,000 usuarios activos.',
      ],
      stack: ['Vue.js', '.NET MVC', 'Three.js', 'JavaScript', 'CSS3', 'Mobile-First UI'],
    },
    {
      id: 'union-sa',
      role: '.NET Developer',
      company: 'Unión S.A.',
      period: 'Ago 2019 – Ene 2020',
      location: 'Guatemala (Temporal)',
      area: ['backend'],
      achievements: [
        'Integración de Sistemas ERP: Diseñé la sincronización mediante APIs REST entre la tienda virtual y Microsoft Dynamics NAV, sin depender de una base de datos integrada en el aplicativo legacy ASP.NET Web Forms.',
        'API Logística y Reportería: Desarrollé una API para orquestar traslados de mercadería y un módulo de Business Intelligence para el monitoreo en tiempo casi real de KPIs operativos y de ventas.',
      ],
      stack: ['C#', 'ASP.NET Web Forms', 'REST APIs', 'Microsoft Dynamics NAV', 'SQL Server'],
    },
    {
      id: 'bac-credomatic',
      role: 'Analista de Estrategia',
      company: 'BAC Credomatic',
      period: 'Feb 2018 – Jul 2019',
      location: 'Guatemala',
      area: ['backend', 'cloud'],
      achievements: [
        'Ingeniería de Datos y ETLs: Fui responsable de los procesos ETL de datos masivos provenientes de fuentes fragmentadas (SQL Server, Data Warehouses, AS400).',
        'Automatización de Business Intelligence: Orquesté la reportería operativa y gerencial con SAS, automatizando el 85% de la reportería manual del área de Canales Comerciales.',
      ],
      stack: ['SQL Server', 'ETL Pipelines', 'SAS Enterprise', 'Data Warehouses', 'AS400'],
    },
    {
      id: 'agc-centroamerica',
      role: 'Asesor de Tecnología',
      company: 'AGC Centroamérica',
      period: 'Jun 2017 – Ene 2018',
      location: 'Guatemala (Tiempo parcial)',
      area: ['backend'],
      achievements: [
        'Automatización de Workflows ERP: Lideré la parametrización de módulos de Odoo para automatizar la firma digital de contratos y la gestión documental.',
        'Integración VoIP: Desarrollé flujos para el aprovisionamiento automático de clientes en telefonía PBX VoIP.',
      ],
      stack: ['Odoo', 'PBX VoIP', 'Firma Digital'],
    },
    {
      id: 'galich-docencia',
      role: 'Profesor de Tecnología',
      company: 'Corporación Galich',
      period: 'Ene 2017 – Ene 2018',
      location: 'Guatemala (Tiempo parcial)',
      area: ['leadership'],
      achievements: [
        'Docencia Técnica: Diseñé e impartí cursos de fundamentos de programación, estructuras de datos y lógica computacional para nivel diversificado.',
      ],
      stack: ['Fundamentos de Programación', 'Algoritmos', 'Estructuras de Datos', 'Pedagogía'],
    },
  ],
  education: [
    {
      degree: 'Ingeniería en Sistemas (Incompleta)',
      institution: 'Universidad Galileo, Guatemala',
      period: '2017 – 2020',
    },
    {
      degree: 'Perito en Informática y Computación',
      institution: 'CTI Luis Cardoza y Aragón, Guatemala',
      period: '2012 – 2016',
    },
    {
      degree: 'Bachiller Industrial',
      institution: 'CTI Luis Cardoza y Aragón, Guatemala',
      period: '2012 – 2016',
    },
  ],
  // Only verifiable credentials (real issuer and verification link) belong here.
  certifications: [],
  languages: [
    {
      language: 'Español',
      level: 'Nativo',
      description: 'Lengua materna',
    },
    {
      language: 'Inglés',
      level: 'Competencia Profesional Técnica',
      description: 'Diseño, documentación técnica y negociación de arquitectura de software',
    },
  ],
};
