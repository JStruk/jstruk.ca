import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    order: z.number(),
    liveUrl: z.string().url(),
    liveLabel: z.string(),
    repoUrl: z.string().url().optional(),
    stack: z.array(z.string()).default([]),
    highlights: z.array(z.string()),
  }),
});

export const collections = { projects };
