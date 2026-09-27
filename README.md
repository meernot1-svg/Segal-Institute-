# English Academy

An English-learning platform centered on the **three forms of English verbs** (V1 / V2 / V3). Students browse, flashcard, and test themselves on verb forms and meanings, with progress tracking, AI help, streaks, and achievements.

Built as a real, production-shaped application — not a school project.

---

## Stack

- **Framework:** Next.js 16 (App Router) + TypeScript 5
- **Styling:** Tailwind CSS 4 + shadcn/ui (New York)
- **Database:** Prisma ORM (SQLite for local dev; **Postgres required for production** — see below)
- **Auth:** Custom scrypt + HMAC-signed session cookies (no external auth dep)
- **AI:** Provider-agnostic abstraction with a working mock mode (Phase 3)
- **Fonts:** Fraunces (display) + Hanken Grotesk (body)

## Quick start (local)

```bash
bun install
cp .env.example .env          # then edit AUTH_SECRET
bun run db:push                # create the SQLite schema
bun run prisma/seed.ts         # seed ~966 real verbs + achievements + demo users
bun run dev                    # http://localhost:3000
```

### Demo accounts (seeded)

- Student: `student@englishacademy.example` / `student123`
- Admin: `admin@englishacademy.example` / `admin123`

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `DATABASE_URL` | yes | Prisma datasource URL (`file:./db/custom.db` locally; `postgresql://...` in prod) |
| `AUTH_SECRET` | yes | Secret used to sign session tokens |
| `AI_API_KEY` | no | If set, real AI features use it; if empty, app runs in mock mode |
| `AI_BASE_URL` | no | Override the default AI provider base URL |
| `AI_MODEL` | no | Model name for the AI provider |
| `ENABLE_MOCK_AI` | no | `true` forces mock mode even if a key is present |

## Project structure

```
prisma/
  schema.prisma          # data model
  seed.ts                # seeds verbs + achievements + demo users
  data/verbs.ts          # curated real-verb dataset (V1/V2/V3 + alternates + meaning)
src/
  app/
    (student)/           # authenticated student routes (dashboard, verbs, learn, tests, results, profile)
    about/ login/ register/ forgot-password/
    api/                 # auth, verbs, progress, favorites, tests
  components/            # shadcn/ui + app components (logo, student-shell, mcq-test, flashcard-deck, …)
  lib/                   # db, auth, crypto, verbs, branding
  proxy.ts               # Next 16 route protection
```

## Roadmap status

- **Phase 1 — Core loop (done):** auth, verbs browser + detail, flashcards, MCQ tests, results, dashboard, profile. Browser-verified at desktop + mobile.
- **Phase 2 — Engagement (next):** practice mode, written tests, goals, streaks, achievements, editable profile.
- **Phase 3 — AI features:** chatbot, speech generator, poetry generator (mock + real).
- **Phase 4 — Admin panel & PDF importer:** verb management, Sindhi-meaning PDF import with review buckets.
- **Phase 5 — Hardening:** RLS-style authz pass, a11y pass, README + env example (this file), full smoke test.

## Deploying to Vercel — read this first

This app uses Prisma with a database. **Vercel's serverless filesystem is read-only except `/tmp`, so the default SQLite file won't persist.** To deploy a fully working app you must:

1. Provision a Postgres database (Vercel Postgres, Supabase, Neon, etc.).
2. Set `DATABASE_URL` to the Postgres connection string in your Vercel project env vars.
3. Set `AUTH_SECRET` to a long random string.
4. Run `prisma db push` against the Postgres DB (locally with the prod `DATABASE_URL`, or via a seed script).
5. Run the seed script to populate verbs, achievements, and demo users.

The code builds on Vercel out of the box (`postinstall` runs `prisma generate`); only the database needs to be pointed at a real Postgres for data features to work in production.

## Branding

All name, tagline, and brand colors live in `src/lib/branding.ts` and the CSS variables in `src/app/globals.css`. Change them in one place and the whole app updates.
