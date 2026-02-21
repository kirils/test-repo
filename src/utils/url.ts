/**
 * Build a site-relative URL by safely joining import.meta.env.BASE_URL
 * with the given path segment.
 *
 * Handles both BASE_URL forms that Astro may produce:
 *   /test-repo/   (trailing slash present)
 *   /test-repo    (no trailing slash)
 *
 * Usage:
 *   siteUrl('blog')           → /test-repo/blog
 *   siteUrl('blog/my-post')   → /test-repo/blog/my-post
 *   siteUrl('favicon.svg')    → /test-repo/favicon.svg
 *   siteUrl('')               → /test-repo/   (root / home)
 *
 * When SITE_BASE is empty (root deployment):
 *   siteUrl('blog')           → /blog
 *   siteUrl('')               → /
 */
export function siteUrl(path: string): string {
  const base = import.meta.env.BASE_URL;
  // Guarantee exactly one slash between base and path
  const b = base.endsWith('/') ? base : `${base}/`;
  const p = path.startsWith('/') ? path.slice(1) : path;
  return b + p;
}
