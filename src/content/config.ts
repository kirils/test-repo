import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title:        z.string(),
    description:  z.string().max(160),
    pubDate:      z.coerce.date(),
    updatedDate:  z.coerce.date().optional(),
    draft:        z.boolean().default(false),
    tags:         z.array(z.string()).default([]),
  }),
});

export const collections = { blog };
