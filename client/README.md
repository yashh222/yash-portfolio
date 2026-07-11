# Client — Astro frontend

Static-first portfolio site. Ships zero JS by default; the only script on
the page is a tiny IntersectionObserver for scroll reveals and the fetch
calls in the contact form. No GSAP, no Three.js, no Lenis — this keeps the
Lighthouse score high and avoids the load cost of a full WebGL scene.

## Setup

```bash
cd client
npm install
cp .env.example .env
# edit .env if your server runs somewhere other than localhost:4000
npm run dev
```

Opens at `http://localhost:4321`.

## Build

```bash
npm run build   # outputs to dist/
npm run preview # serve the production build locally
```

## Structure

```
src/
  assets/yash.jpg       your photo — Astro optimizes this at build time
  components/           Nav, Hero, Pillars, Work, Contact, Footer
  layouts/Layout.astro  fonts, meta tags, global scroll-reveal script
  pages/index.astro     assembles the page
  styles/global.css     design tokens (colors, type, spacing)
public/
  favicon.svg
```

## Where to plug things in later

- **Dynamic projects**: `src/components/Work.astro` has a comment showing
  exactly where to swap the static array for a `fetch()` to your server's
  `/api/projects`.
- **Blog**: add `src/pages/blog/index.astro` and `src/pages/blog/[slug].astro`
  once the server has a `/api/posts` endpoint.
- **Deploy**: point this at Vercel or Netlify — both auto-detect Astro.
