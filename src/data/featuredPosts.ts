export interface MockPost {
  title: string;
  slug: string;
  description: string;
  category: 'dev' | 'ia' | 'games';
  readingTime: string;
  publishDate: string;
}

export const featuredPosts: MockPost[] = [
  {
    title: 'Clean Architecture en Frontend: Separando Dominio de UI',
    slug: 'clean-architecture-frontend',
    description: 'Cómo desacoplar reglas de negocio de los frameworks web sin sobreingeniería.',
    category: 'dev',
    readingTime: '6 min',
    publishDate: 'Oct 2026',
  },
  {
    title: 'Construyendo Agentes Autónomos con Memoria Persistente',
    slug: 'agentes-autonomos-memoria',
    description: 'Técnicas de orquestación, compresión de contexto y persistencia con Engram.',
    category: 'ia',
    readingTime: '8 min',
    publishDate: 'Oct 2026',
  },
  {
    title: 'Matemática Maya y Mecánicas de Videojuegos en 2D',
    slug: 'matematica-maya-juegos',
    description: 'Diseño lúdico inspirado en el sistema vigesimal y calendarios astronómicos.',
    category: 'games',
    readingTime: '5 min',
    publishDate: 'Sep 2026',
  },
];
