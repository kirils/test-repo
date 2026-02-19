---
title: "Type-Safe Content with Astro Content Collections"
description: "How Astro Content Collections and Zod schemas keep your Markdown frontmatter validated and your TypeScript compiler happy."
pubDate: 2026-02-20
draft: false
tags: ["astro", "typescript", "content"]
---

One of Astro's most practical features for content-heavy sites is **Content Collections** — a built-in system for organising, validating, and querying Markdown and MDX files.

## The problem Content Collections solve

Without a schema, Markdown frontmatter is just untyped YAML. A missed field or a date in the wrong format only surfaces as a runtime error — or a missing piece of UI that nobody notices until after launch.

Content Collections fix this by attaching a [Zod](https://zod.dev) schema to a folder of files. Astro validates every file at build time, so a broken frontmatter field becomes a build error rather than a silent bug.

## Defining a collection

Collections are defined in `src/content/config.ts`:

```ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title:       z.string(),
    description: z.string().max(160),
    pubDate:     z.coerce.date(),
    draft:       z.boolean().default(false),
    tags:        z.array(z.string()).default([]),
  }),
});

export const collections = { blog };
```

## Querying posts in a page

In any `.astro` file you can query the collection with `getCollection`:

```ts
import { getCollection } from 'astro:content';

const posts = await getCollection('blog', ({ data }) => !data.draft);
posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
```

The returned entries are fully typed — your editor will autocomplete `data.title`, `data.pubDate`, and all other schema fields.

## Dynamic routes

A single `src/pages/blog/[slug].astro` file handles every post:

```ts
export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.slug },
    props:  { post },
  }));
}
```

Astro calls `getStaticPaths` at build time and generates one HTML file per post — no server required.

## Summary

Content Collections turn your Markdown folder into a type-safe content layer. You get schema validation, autocompletion, and static generation all in one built-in feature.
