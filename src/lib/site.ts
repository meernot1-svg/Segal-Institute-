/** Site URL — single source of truth for SEO + sitemap + canonical URLs. */

/**
 * Canonical site URL with NO trailing slash.
 * Falls back to the Vercel deployment URL when NEXT_PUBLIC_SITE_URL isn't set
 * (so previews + production both work). Override with NEXT_PUBLIC_SITE_URL
 * to point at a custom domain (e.g. https://segalinstitute.com).
 */
export const SITE_URL: string = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
).replace(/\/$/, "");

/** Helper to build an absolute URL from a path (e.g. "/about" -> "https://…/about"). */
export function absoluteUrl(path: string): string {
  if (!path.startsWith("/")) path = `/${path}`;
  return `${SITE_URL}${path}`;
}
