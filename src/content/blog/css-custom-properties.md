---
title: "Design Tokens with CSS Custom Properties"
description: "Why CSS custom properties make a better design token system than preprocessor variables, and how this site uses them for consistent theming."
pubDate: 2026-02-21
draft: false
tags: ["css", "design-system", "accessibility"]
---

Every site needs a set of agreed-upon values for colour, spacing, and typography — the raw material of a consistent UI. This site uses **CSS custom properties** (also called CSS variables) as its design token system, defined once in `src/styles/global.css` and reused everywhere.

## Custom properties vs preprocessor variables

Preprocessor variables (Sass `$var`, Less `@var`) exist only at compile time. By the time the browser loads the stylesheet, they've been replaced with literal values. You can't inspect them in DevTools, can't update them at runtime, and can't override them inside a media query or `:root` block.

CSS custom properties are different. They're live in the browser:

- They cascade and inherit like any other CSS property.
- You can override them on any element, including inside media queries.
- JavaScript can read and write them with `getComputedStyle` / `style.setProperty`.
- They're inspectable and editable in browser DevTools.

## The token structure used here

```css
:root {
  /* Colours */
  --color-primary: #2563eb;
  --color-text:    #1a1a1a;

  /* Spacing (4-point scale) */
  --space-4:  1rem;
  --space-8:  2rem;

  /* Type scale */
  --text-base: 1rem;
  --text-2xl:  1.5rem;
}
```

Components reference tokens by name, never by value:

```css
.card {
  padding: var(--space-6);
  color: var(--color-text);
  font-size: var(--text-base);
}
```

This means changing `--color-primary` in one place updates every button, link, and accent across the whole site.

## Accessibility benefit

Using named colour tokens makes WCAG contrast checking more tractable. You check the token pair (`--color-text` on `--color-bg`) once, rather than hunting down every hard-coded hex value. If you later adjust the palette, you update the token and re-verify the same pairs.

## Dark mode (future work)

Because all colours are tokens, adding a dark mode is a matter of overriding the token values inside a `prefers-color-scheme: dark` media query — no component changes needed.

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-bg:   #0f0f0f;
    --color-text: #e5e5e5;
  }
}
```

That's the token system this site is built on. Simple, browser-native, and ready to extend.
