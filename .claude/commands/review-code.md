# Code Review

Review the specified Astro file(s) or the current git diff for quality, correctness, and adherence to project conventions.

## Review Checklist

### Correctness
- [ ] No TypeScript errors or implicit `any` types
- [ ] Props interfaces are complete and accurate
- [ ] Content Collection schema changes are reflected in all consuming pages

### Performance
- [ ] No unnecessary client-side JavaScript (avoid `client:load` unless interaction requires it; prefer `client:idle` or `client:visible`)
- [ ] Images use the Astro `<Image />` component or have explicit `width`/`height` attributes
- [ ] No blocking render resources in `<head>`

### Accessibility
- [ ] Semantic HTML elements used (`<nav>`, `<main>`, `<article>`, `<section>`, etc.)
- [ ] All images have descriptive `alt` text
- [ ] Interactive elements are keyboard-reachable and have visible focus styles
- [ ] Color contrast meets WCAG AA (4.5:1 for body text)
- [ ] Page has a single `<h1>`

### Security
- [ ] No secrets, API keys, or credentials in any file
- [ ] No use of `set:html` with user-controlled content (XSS risk)
- [ ] External links use `rel="noopener noreferrer"`

### Style & Convention
- [ ] File names use PascalCase for components, kebab-case for pages and posts
- [ ] Scoped styles used in components; global styles only in `src/styles/global.css`
- [ ] No commented-out code left behind

## Instructions

1. Read the file(s) specified by the user (or run `git diff` if none specified).
2. Go through every item in the checklist above.
3. Report findings grouped by severity: **Blocker**, **Warning**, **Suggestion**.
4. For each blocker or warning, provide the exact fix.
5. Do not refactor code beyond the issues found.

## Output

Return a structured report. Fix blockers automatically only if the user explicitly asks.
