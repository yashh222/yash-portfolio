# Server — Express API

Handles the contact form and gated resume download. Kept deliberately
simple: JSON-file storage instead of a database, and the Resend email
call is stubbed out (commented) so the server runs with zero external
setup. Both are meant to be swapped in later without touching the route
logic much.

## Setup

```bash
cd server
npm install
cp .env.example .env
# add your resume:
cp /path/to/your/resume.pdf assets/resume.pdf
npm run dev
```

Runs at `http://localhost:4000`.

## Endpoints

- `POST /api/contact` — body `{ name, email, message }`. Validates with
  Zod, saves to `data/contacts.json`, returns `{ ok: true }`.
- `POST /api/resume` — body `{ email }`. Logs the request to
  `data/resume-downloads.json`, returns `{ url }` pointing at
  `/files/resume.pdf`.
- `GET /health` — simple uptime check.

## Turning on email

1. Create a free [Resend](https://resend.com) account, get an API key.
2. Add it to `.env` as `RESEND_API_KEY`.
3. In `routes/contact.js`, uncomment the block that sends the email.

## Moving from JSON files to a real database

`lib/storage.js` has two functions: `appendRecord` and `readRecords`.
When you're ready for Postgres:

1. `npm install prisma @prisma/client` and `npx prisma init`
2. Define `ContactSubmission` and `ResumeDownload` models in
   `prisma/schema.prisma`
3. Replace the `appendRecord(...)` calls in the route files with
   `prisma.contactSubmission.create({ data: ... })` etc.

Nothing else needs to change — the routes don't care how storage works
under the hood.

## Deploying

Railway or Render both work well for a small Express app like this.
Remember to set `CLIENT_ORIGIN` to your deployed frontend's real URL so
CORS doesn't block the contact form.
