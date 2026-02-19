# CLAUDE.md

This file provides guidance to AI assistants (Claude and others) working with this repository.

## Repository Overview

**Name:** test-repo
**Owner:** kirils
**Purpose:** A demonstration/test website built with the Astro framework.
**License:** MIT

---

## Repository Structure

```
test-repo/
├── public/                   # Static assets (images, fonts, favicon)
├── src/
│   ├── components/           # Reusable .astro UI components (PascalCase)
│   ├── layouts/              # Page shell layouts
│   ├── pages/                # File-based routing (kebab-case filenames)
│   ├── content/              # Content Collections (Markdown/MDX blog posts)
│   │   └── config.ts         # Zod schema definitions — read before adding posts
│   └── styles/
│       └── global.css        # CSS custom properties + reset — read before adding styles
├── .claude/
│   └── commands/             # AI slash-command prompts (see below)
├── docs/
│   └── astro-website-plan.md # Project plan — read this first
├── astro.config.mjs          # Astro configuration
├── tsconfig.json             # TypeScript (strictest preset)
├── package.json
└── CLAUDE.md                 # This file
```

---

## AI Slash Commands

These prompts live in `.claude/commands/` and are invocable as `/command-name` inside Claude Code:

| Command             | Purpose                                          |
|---------------------|--------------------------------------------------|
| `/scaffold-astro`   | Bootstrap the entire project from the plan       |
| `/create-page`      | Add a new page to `src/pages/`                   |
| `/create-component` | Add a reusable component to `src/components/`    |
| `/create-blog-post` | Add a Markdown post to `src/content/blog/`       |
| `/add-styles`       | Add or update CSS for a component or page        |
| `/review-code`      | Review files against the project quality checklist|

**Always read the relevant command file before starting the task it describes.**

---

## Tech Stack

| Layer           | Technology                                  |
|-----------------|---------------------------------------------|
| Framework       | Astro 4.x (static output)                   |
| Styling         | CSS Modules + CSS custom properties         |
| Language        | TypeScript (strict mode — no implicit `any`)|
| Content         | Markdown/MDX via Content Collections + Zod  |
| Package manager | npm                                         |

---

## Development Conventions

### General Principles

- Read existing code before modifying it.
- Keep changes minimal and focused — avoid over-engineering.
- Prefer editing existing files over creating new ones.
- Delete unused code; do not comment it out or leave `_unused` markers.

### File Naming

| Type                    | Convention          | Example                        |
|-------------------------|---------------------|--------------------------------|
| Astro components        | PascalCase          | `Card.astro`, `BaseLayout.astro`|
| Pages                   | kebab-case          | `about.astro`, `blog/index.astro`|
| Blog posts (slugs)      | kebab-case          | `hello-world.md`               |
| Stylesheets             | kebab-case          | `global.css`                   |
| Documentation           | UPPERCASE           | `README.md`, `CLAUDE.md`       |
| Directories             | lowercase-hyphen    | `src/components/`              |

### Astro-Specific Rules

- **Always use `BaseLayout.astro`** — every page must pass `title` and `description` props.
- **Zero JS by default** — only add `client:*` directives when interactivity genuinely requires JavaScript. Prefer `client:idle` or `client:visible` over `client:load`.
- **Content Collections** — all blog posts go in `src/content/blog/`. Read `src/content/config.ts` before adding or modifying posts.
- **Scoped styles** — put component styles in the component's `<style>` block. Global styles go in `src/styles/global.css` only.
- **CSS custom properties** — use design tokens from `global.css` (colours, spacing, type scale). Never hard-code colour values in component files.
- **No framework dependencies** (React, Vue, etc.) unless explicitly approved by the project owner.

### TypeScript

- `tsconfig.json` extends `astro/tsconfigs/strictest` — do not weaken it.
- All component props must be typed via `interface Props`.
- No `any`, no `@ts-ignore`, no `as unknown as X` casts without a comment explaining why.

---

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:4321)
npm run check        # Type-check with @astrojs/check
npm run build        # Production build → dist/
npm run preview      # Serve the production build locally
```

---

## Git Workflow

### Branches

- `main` / `master` — stable production branch; never push directly
- `claude/<description>-<session-id>` — AI-assisted feature branches

### Development Flow

1. Develop on a feature branch, never on `main`/`master`.
2. Commit with clear, imperative messages: `"Add Card component"`, `"Fix heading hierarchy on blog page"`.
3. Keep subject lines under 72 characters.
4. Push with tracking: `git push -u origin <branch-name>`.
5. Open a pull request against `main`/`master` when work is complete.

### Git Configuration Notes

- Commits are GPG-signed via SSH key (`commit.gpgsign=true`).
- Do not skip signing with `--no-gpg-sign`.
- Do not force-push to `main`/`master`.
- Never amend a published commit — create a new one instead.

---

## Guardrails

These rules are **non-negotiable**. Violating them blocks the PR.

### Security

- **Never commit** secrets, API keys, credentials, `.env` files, or tokens.
- **Never use `set:html`** with user-controlled input — XSS risk.
- External links must include `rel="noopener noreferrer"`.
- No third-party scripts without explicit user approval.

### Accessibility (WCAG 2.1 AA minimum)

- Every page must have exactly one `<h1>`.
- All images need `alt` text — use `alt=""` only for decorative images.
- All interactive elements must be keyboard-reachable with visible focus styles.
- Color contrast: ≥ 4.5:1 for body text, ≥ 3:1 for large text (≥ 18 pt / 14 pt bold).
- No animations that flash more than 3 times per second (WCAG 2.3.1).
- Use semantic HTML: `<nav>`, `<main>`, `<article>`, `<section>`, `<header>`, `<footer>`.
- Every page must have a skip-to-main-content link.

### Performance

- No unnecessary `client:load` — evaluate `client:idle` or `client:visible` first.
- Images must have explicit `width` and `height` to prevent layout shift.
- Avoid importing large third-party libraries; check bundle impact first.

### Build & Type Safety

- `npm run check` must pass with zero errors before any commit.
- `npm run build` must succeed before opening a PR.
- Do not disable or weaken TypeScript strictness.

### Content

- Do not include real personal data (names, emails, phone numbers) in sample content.
- Blog posts in draft state must have `draft: true` in frontmatter.
- Meta descriptions must be ≤ 160 characters and unique per page.

---

## Before Making Changes

1. Read `docs/astro-website-plan.md` for project context.
2. Read the relevant source files before editing them.
3. Check `git log` to understand the history and intent of existing decisions.
4. Use the appropriate `/command` from `.claude/commands/` for common tasks.

---

## Updating This File

Update `CLAUDE.md` when:

- New tools, integrations, or frameworks are added.
- Build, test, or lint commands change.
- New conventions are agreed upon.
- The directory structure changes significantly.

Keep descriptions accurate to the **current** state of the repository, not aspirational future states.
