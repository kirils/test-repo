# Create Blog Post

Create a new blog post in the Content Collection at `src/content/blog/`.

## Instructions

1. Read `src/content/config.ts` to understand the required frontmatter schema.
2. Create the file at `src/content/blog/<slug>.md` where `<slug>` is kebab-case.
3. Fill in all required frontmatter fields. At minimum:
   - `title` (string)
   - `description` (string, ≤ 160 characters for SEO)
   - `pubDate` (ISO 8601 date, e.g. `2026-02-19`)
   - `draft` (boolean — set `true` while the post is unfinished)
4. Write the body in clean Markdown. Use headings (##, ###) to structure content.
5. Provide 2–3 realistic sample paragraphs unless the user supplies content.

## Guardrails

- Do not include real personal data (names, emails, addresses) in sample content.
- Do not embed `<script>` tags in Markdown unless the user explicitly requests MDX.
- Descriptions must be unique per post — never copy from another post.
- The `pubDate` must not be a future date unless the user explicitly sets it.

## Output

Return the created file path and a short summary of the post. Remind the user to set `draft: false` before publishing.
