# Astro Website — Project Plan

**Created:** 2026-02-19
**Status:** Draft

---

## 1. Project Goal

Build a lightweight, fast, content-focused test website using the [Astro](https://astro.build) framework. The site demonstrates Astro's island architecture, content collections, and static-site generation capabilities.

---

## 2. Tech Stack

| Layer         | Technology                        |
|---------------|-----------------------------------|
| Framework     | Astro 4.x                         |
| Styling       | CSS Modules + CSS custom properties|
| Language      | TypeScript (strict mode)          |
| Content       | Markdown / MDX via Content Collections |
| Deployment    | Static export (SSG)               |
| Package manager | npm                             |

---

## 3. Project Structure

```
test-repo/
├── public/                   # Static assets (images, fonts, favicon)
│   └── favicon.svg
├── src/
│   ├── components/           # Reusable UI components (.astro or .tsx)
│   │   └── Header.astro
│   │   └── Footer.astro
│   │   └── Card.astro
│   ├── layouts/              # Page shell layouts
│   │   └── BaseLayout.astro
│   │   └── PostLayout.astro
│   ├── pages/                # File-based routing
│   │   ├── index.astro       # Home page
│   │   ├── about.astro       # About page
│   │   └── blog/
│   │       ├── index.astro   # Blog listing
│   │       └── [slug].astro  # Dynamic blog post route
│   ├── content/              # Content Collections
│   │   ├── config.ts         # Collection schema definitions
│   │   └── blog/             # Blog posts (Markdown/MDX)
│   │       └── hello-world.md
│   └── styles/               # Global styles
│       └── global.css
├── .claude/
│   └── commands/             # AI slash-command prompts
├── docs/
│   └── astro-website-plan.md # This file
├── astro.config.mjs          # Astro configuration
├── tsconfig.json             # TypeScript configuration
├── package.json
└── CLAUDE.md                 # AI assistant guidance + guardrails
```

---

## 4. Pages

| Route         | File                        | Description                    |
|---------------|-----------------------------|--------------------------------|
| `/`           | `src/pages/index.astro`     | Hero, feature highlights       |
| `/about`      | `src/pages/about.astro`     | About the project              |
| `/blog`       | `src/pages/blog/index.astro`| Blog post listing              |
| `/blog/:slug` | `src/pages/blog/[slug].astro`| Individual blog post          |

---

## 5. Key Features

- **Zero JS by default** — ship only the HTML/CSS needed; opt-in JavaScript per component
- **Content Collections** — type-safe Markdown/MDX blog posts with Zod schema validation
- **Responsive layout** — mobile-first CSS with custom properties for theming
- **Accessible markup** — semantic HTML, ARIA attributes, sufficient color contrast
- **Fast builds** — static output, no server runtime needed

---

## 6. Implementation Phases

### Phase 1 — Scaffolding
- [ ] Initialize `package.json` and install Astro + TypeScript
- [ ] Create `astro.config.mjs` and `tsconfig.json`
- [ ] Add `src/styles/global.css` with CSS custom properties

### Phase 2 — Layouts & Components
- [ ] Create `BaseLayout.astro` with `<head>` meta, global styles, skip-to-content link
- [ ] Create `Header.astro` and `Footer.astro`
- [ ] Create `Card.astro` for blog post previews

### Phase 3 — Pages
- [ ] Home page with hero section
- [ ] About page
- [ ] Blog listing page
- [ ] Dynamic blog post page using Content Collections

### Phase 4 — Content
- [ ] Define Content Collection schema in `src/content/config.ts`
- [ ] Add two or three sample blog posts in Markdown

### Phase 5 — Polish & Guardrails
- [ ] Validate all pages pass Lighthouse accessibility audit (score ≥ 90)
- [ ] Ensure no TypeScript errors (`npm run check`)
- [ ] Confirm build succeeds (`npm run build`)

---

## 7. Commands

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Type-check
npm run check

# Production build
npm run build

# Preview production build
npm run preview
```

---

## 8. Out of Scope (for this test site)

- Authentication / user accounts
- Database or server-side rendering (SSR mode)
- Third-party analytics scripts
- Paid integrations or APIs
