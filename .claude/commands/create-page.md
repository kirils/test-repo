# Create Astro Page

Create a new Astro page in `src/pages/` following the project conventions.

## Instructions

1. Read `docs/astro-website-plan.md` to understand the project structure.
2. Read an existing page in `src/pages/` (e.g. `index.astro`) to match the style.
3. Create the new page at the path the user specifies, e.g. `src/pages/contact.astro`.
4. Use `BaseLayout.astro` as the wrapping layout — pass a descriptive `title` and `description` prop.
5. Write semantic HTML inside the `<main>` element.
6. Do not add inline `<style>` blocks unless the styles are truly page-specific; prefer global CSS custom properties.
7. Do not include JavaScript (`<script>`) unless it is strictly required by the feature.
8. Verify the file has no TypeScript errors by checking types manually.

## Guardrails

- Never hard-code personal data, API keys, or secrets in page files.
- Every page MUST include a descriptive `<title>` and `<meta name="description">`.
- All interactive elements must be keyboard-accessible and have ARIA labels where the visual label is insufficient.
- Images must have descriptive `alt` text (use `alt=""` only for decorative images).

## Output

Return only the created/modified files. Briefly describe what the page does and how to navigate to it in the dev server.
