import { defineConfig } from 'astro/config';

// SITE_BASE controls the deploy base path.
// - GitHub Pages (repo site): set SITE_BASE=test-repo in CI
// - Root deployment (Netlify, Vercel, custom domain): leave SITE_BASE unset
// The value is passed via the environment variable at build time.
const base = process.env.SITE_BASE ?? '';

export default defineConfig({
  output: 'static',
  site: 'https://kirils.github.io',
  base,
});
