import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      subtitle: z.string(),
      summary: z.string(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      icon: z.string().optional(),
      iconColor: z.string().optional(),
      gallery: z
        .array(
          z.object({
            src: image(),
            alt: z.string(),
            device: z.enum(['desktop', 'mobile']).optional(),
            initialZoom: z
              .union([
                z.literal(1),
                z.literal(1.25),
                z.literal(1.5),
                z.literal(1.75),
                z.literal(2),
                z.literal(2.25),
                z.literal(2.5),
                z.literal(3),
                z.literal(4),
                z.literal(5),
                z.literal(7.5),
                z.literal(10)
              ])
              .optional()
          })
        )
        .optional(),
      externalUrl: z.string().url().optional(),
      repoUrl: z.string().url().optional(),
      tech: z.array(z.string()),
      order: z.number(),
      featured: z.boolean().default(false),
      span: z.enum(['sm', 'md', 'lg', 'xl']).default('md'),
      accent: z.string().default('from-sky-500/20 to-indigo-500/10'),
      start: z.string(),
      end: z.string()
    })
});

export const collections = { projects };
