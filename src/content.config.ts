import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().min(5).max(100),
    description: z.string().min(10).max(250),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum(['samsar-dev', 'samsar-ia', 'samsar-games']),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    series: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string().min(3).max(80),
    description: z.string().min(10).max(200),
    type: z.enum(['professional', 'open-source', 'game', 'ai-experiment']),
    stack: z.array(z.string()).min(1),
    status: z.enum(['active', 'completed', 'wip', 'archived']),
    repo: z.url().optional(),
    demo: z.url().optional(),
    postSlug: z.string().optional(),
    cover: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog, projects };
