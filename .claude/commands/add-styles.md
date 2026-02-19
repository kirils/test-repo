# Add Styles

Add or update CSS styles for a component or page, following the project's styling conventions.

## Styling Architecture

This project uses:
- **CSS custom properties** (in `src/styles/global.css`) for design tokens: colours, spacing, type scale
- **Scoped `<style>` blocks** inside `.astro` files for component-specific styles
- **No CSS frameworks** (e.g. no Tailwind, no Bootstrap) unless explicitly added

## Instructions

1. Read `src/styles/global.css` to understand existing custom properties before adding new ones.
2. Read the target component or page file before making any changes.
3. Prefer using existing CSS custom properties (`--color-primary`, `--space-md`, etc.) over hard-coded values.
4. Add new design tokens to `global.css` only if the value will be reused in more than one place.
5. Write styles inside the component's `<style>` block unless they are genuinely global.
6. Use `is:global` sparingly and only when scoped styles cannot work (e.g. styling Markdown content).
7. Keep specificity low — prefer class selectors over IDs or element chains.

## Guardrails

- Do not use `!important` unless overriding a third-party library.
- Do not hard-code colour values outside of `global.css` design tokens.
- Ensure sufficient contrast for all text: ≥ 4.5:1 for normal text, ≥ 3:1 for large text (WCAG AA).
- All layout changes must be tested at 320 px (mobile) and 1280 px (desktop) viewport widths.
- Do not add CSS animations that flash more than three times — risk of triggering seizures (WCAG 2.3.1).

## Output

Return only the modified files. Describe the design decisions made (e.g. which token was used and why).
