---
title: "Hello World — Welcome to AstroDemo"
description: "An introduction to this demo site built with Astro, exploring static site generation, Content Collections, and zero-JS by default."
pubDate: 2026-02-19
draft: false
tags: ["astro", "intro"]
---

Welcome to **AstroDemo** — a lightweight demonstration site built with [Astro](https://astro.build), the web framework for content-driven websites.

## What is Astro?

Astro is a modern static-site generator that ships zero JavaScript by default. Instead of a client-side component model, Astro renders everything to HTML at build time, resulting in pages that are fast, accessible, and easy to deploy anywhere.

When you *do* need interactivity, Astro's island architecture lets you opt individual components into the client — using `client:idle`, `client:visible`, or `client:load` — without hydrating the whole page.

## What's in this demo?

This site showcases several Astro features:

- **Content Collections** — type-safe Markdown posts validated with a Zod schema
- **File-based routing** — pages map directly to files in `src/pages/`
- **Static output** — the build produces plain HTML, CSS, and no runtime server
- **CSS custom properties** — a global design token system for consistent theming

## Getting started locally

Clone the repository and run:

```bash
npm install
npm run dev
```

The dev server starts at `http://localhost:4321`. Edit any file and the browser updates instantly.

## What's next?

Check out the other posts on this blog for deeper dives into Astro's features. If you'd like to build on this starter, read `CLAUDE.md` for conventions and use the built-in AI slash commands to scaffold new pages and components.
