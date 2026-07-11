# Yash Barhate — Portfolio

Two separate projects, run independently:

```
client/   Astro frontend — the site itself
server/   Express API — contact form + gated resume download
```

## Quick start (run both, two terminals)

```bash
# Terminal 1
cd server
npm install
cp .env.example .env
npm run dev        # http://localhost:4000

# Terminal 2
cd client
npm install
cp .env.example .env
npm run dev         # http://localhost:4321
```

Open `http://localhost:4321` — the contact form and resume button talk to
the server on port 4000.

## Why separate directories

Keeps the frontend deployable as a static site (Vercel/Netlify, fast CDN,
cheap) independent of the backend, which can live on Render/Railway or
wherever. Also means you can redeploy one without touching the other, and
CORS is the only thing connecting them.

## What's deliberately left simple, for now

- **Storage**: contact submissions and resume downloads write to JSON
  files in `server/data/`, not a database yet. See `server/README.md` for
  the swap-to-Prisma path.
- **Email**: the Resend call is stubbed out in `server/routes/contact.js`
  until you add an API key.
- **Projects section**: still a hardcoded array in
  `client/src/components/Work.astro`, with a comment showing exactly where
  to point it at a future `/api/projects` endpoint.
- **No blog yet** — next thing to add once the DB is wired up.
- **No analytics yet** — add Vercel Analytics or Plausible once deployed.

Tell me which of these you want next and we'll build it.
