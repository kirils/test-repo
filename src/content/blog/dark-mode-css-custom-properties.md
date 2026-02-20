---
title: "Dark Mode Without JavaScript — Almost"
description: "How to implement a persistent dark mode toggle using CSS custom properties, a data-theme attribute, and a tiny inline script that runs before first paint."
pubDate: 2026-02-22
draft: false
tags: ["css", "dark-mode", "accessibility", "javascript"]
---

Dark mode is now a baseline user expectation. macOS, Windows, iOS, and Android all expose a system-level preference via the `prefers-color-scheme` media query — and your site should respect it. But respecting the system setting is only half the story: users also want a manual toggle that persists across visits.

This post covers the exact approach used on this site: CSS custom properties for theming, a `data-theme` attribute for overrides, and a single small `<script>` that prevents the dreaded flash of unstyled content (FOUC).

## CSS custom properties as design tokens

The foundation is a set of colour tokens defined on `:root`:

```css
:root {
  --color-bg:         #ffffff;
  --color-text:       #1a1a1a;
  --color-primary:    #2563eb;
  --color-surface:    #f8f8f8;
  --color-border:     #e2e2e2;
}
```

Every component references tokens by name — never hard-coded hex values. This means switching themes is a single operation: change the token values, and every component updates automatically.

## Two layers of dark mode

There are two ways a user might want dark mode:

1. **OS preference** — the browser reports `prefers-color-scheme: dark`
2. **Manual toggle** — the user clicks a button on the site

The CSS handles both:

```css
/* OS preference, unless the user has overridden manually */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --color-bg:      #07070f;
    --color-text:    #e8e8f4;
    --color-primary: #60a5fa;
    /* ... */
  }
}

/* Manual override — always wins */
:root[data-theme="dark"] {
  --color-bg:      #07070f;
  --color-text:    #e8e8f4;
  --color-primary: #60a5fa;
  /* ... */
}
```

The `:not([data-theme="light"])` guard is the key: it lets the OS preference apply by default, but backs off when the user has explicitly chosen light mode.

## The toggle button

The toggle button in the header swaps `data-theme` on `<html>` and writes the choice to `localStorage`:

```js
const btn = document.getElementById('theme-toggle');
btn?.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});
```

The button itself shows a sun icon in dark mode and a moon icon in light mode, toggled via CSS:

```css
.icon-sun  { display: none; }
.icon-moon { display: block; }

[data-theme="dark"] .icon-sun  { display: block; }
[data-theme="dark"] .icon-moon { display: none; }
```

## Preventing the flash of unstyled content

If you only set `data-theme` in a regular `<script>` tag that loads after the HTML, users will see a white flash before dark mode kicks in. The solution is a small inline script in `<head>` that runs synchronously, before the browser renders anything:

```html
<script>
  (function () {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored === 'dark' || stored === 'light'
      ? stored
      : (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
  })();
</script>
```

In Astro, you mark this with `is:inline` to prevent bundling:

```astro
<script is:inline>
  (function () { /* ... */ })();
</script>
```

The IIFE wrapping prevents variable leaks. The whole script is under 200 bytes — small enough that it doesn't meaningfully delay rendering.

## Smooth transitions

Adding a CSS transition to `body` makes the theme switch feel polished rather than jarring:

```css
body {
  transition: background-color 0.25s ease, color 0.25s ease,
              border-color 0.25s ease;
}
```

Note: do **not** add this transition to `html` or `:root` — it would make the initial load transition visible, which defeats the purpose of the inline script.

## Accessibility considerations

- The toggle button needs a clear `aria-label`: `"Toggle dark mode"`. Don't rely on the icon alone.
- Both themes must pass WCAG AA contrast ratios (≥ 4.5:1 for body text). Test both — it's easy to fix light mode and accidentally break dark mode.
- Respect `prefers-reduced-motion` if you animate the icon. The CSS transition on `body` is fine since it's a colour change, not movement.

## The "almost" caveat

The title says "almost no JavaScript" — but that's not quite accurate. We do use JavaScript for:

1. The inline script that sets `data-theme` before paint (~180 bytes)
2. The `click` handler on the toggle button

Both are necessary: the inline script prevents FOUC, and the toggle handler is genuine interactivity. What we've avoided is a full CSS-in-JS library, a large theme management package, or a framework runtime just to flip a class. The approach is JavaScript where it's genuinely needed, and CSS for everything else.

## Summary

- Define colours as CSS custom properties on `:root`
- Override tokens in `[data-theme="dark"]` and `@media (prefers-color-scheme: dark) :root:not([data-theme="light"])`
- Persist the user's choice with `localStorage`
- Prevent FOUC with a tiny `is:inline` script in `<head>`
- Keep the transition smooth with `body { transition: ... }`

The result is a system that respects the OS preference, allows manual override, persists across visits, and flashes nothing on load — all in under 50 lines of CSS and 20 lines of JavaScript.
