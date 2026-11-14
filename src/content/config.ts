import { defineCollection, z } from 'astro:content';

export const CLUSTERS = ['big-feelings', 'new-sibling', 'screen-free-play', 'early-learning', 'parent-life'] as const;

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    cluster: z.enum(CLUSTERS),
    tags: z.array(z.string()),
    heroImage: z.string(),
    heroAlt: z.string(),
    cta: z.enum(['newsletter', 'meltdown-scripts', 'colouring-pack', 'abc-book']),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    sources: z.array(z.object({ title: z.string(), url: z.string() })).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
