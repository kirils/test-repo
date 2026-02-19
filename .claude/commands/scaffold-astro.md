# Scaffold Astro Project

Bootstrap the full Astro website from the project plan. Run this once when starting from an empty repository.

## Pre-flight Checks

Before creating any files:
1. Read `docs/astro-website-plan.md` — follow the structure defined there exactly.
2. Read `CLAUDE.md` — honour all guardrails and conventions.
3. Confirm the user wants to proceed before writing files (the scaffold creates many files at once).

## Steps

### 1 — package.json
Create `package.json` with:
- `astro` (latest 4.x), `typescript`, `@astrojs/check` as dev dependencies
- Scripts: `dev`, `build`, `preview`, `check`

### 2 — Configuration files
- `astro.config.mjs` — output: `'static'`, site URL placeholder
- `tsconfig.json` — extend `astro/tsconfigs/strictest`

### 3 — Global styles
- `src/styles/global.css` — CSS reset + custom properties for colour, spacing, and type scale

### 4 — Layouts
- `src/layouts/BaseLayout.astro` — accepts `title`, `description` props; includes skip-to-main link, `<Header />`, `<Footer />`
- `src/layouts/PostLayout.astro` — extends BaseLayout; renders blog post frontmatter

### 5 — Components
- `src/components/Header.astro` — site name + nav links
- `src/components/Footer.astro` — copyright, current year
- `src/components/Card.astro` — blog post preview card (props: `title`, `description`, `href`, `pubDate`)

### 6 — Content Collection
- `src/content/config.ts` — define `blog` collection with Zod schema
- `src/content/blog/hello-world.md` — sample post

### 7 — Pages
- `src/pages/index.astro` — hero + card grid of recent posts
- `src/pages/about.astro` — about section
- `src/pages/blog/index.astro` — full blog listing
- `src/pages/blog/[slug].astro` — dynamic post route

### 8 — Static assets
- `public/favicon.svg` — minimal SVG favicon

## Guardrails

- Install no packages beyond the plan's tech stack without user approval.
- Do not enable SSR (`output: 'server'`) — this is a static site.
- Do not commit `node_modules/`, `.astro/`, or `dist/` — ensure `.gitignore` excludes them.
- After scaffolding, run `npm run check` and report any TypeScript errors before finishing.

## Output

List every file created. Remind the user to run `npm install && npm run dev` to start the dev server.
