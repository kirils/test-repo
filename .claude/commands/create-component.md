# Create Astro Component

Create a reusable UI component in `src/components/` following the project conventions.

## Instructions

1. Read `docs/astro-website-plan.md` for context on the project structure.
2. Read an existing component (e.g. `src/components/Card.astro`) to understand naming and style patterns.
3. Create the component at `src/components/<ComponentName>.astro` using PascalCase.
4. Define all props in a TypeScript `interface Props` block at the top of the frontmatter.
5. Keep components focused — a single responsibility per component.
6. Use scoped `<style>` blocks for component styles; prefer CSS custom properties for theming values.
7. Export nothing from the frontmatter unless required; Astro components are not JavaScript modules.

## Guardrails

- Never accept `innerHTML` or `dangerouslySetInnerHTML` style props — use slots instead.
- Never fetch data or call external APIs inside a component without explicit user approval.
- Never store state in module-level variables; Astro components are server-rendered per request.
- Props must be typed — no implicit `any`.

## Output

Return only the created/modified files. Include a brief usage example showing how to import and use the component in a page.
