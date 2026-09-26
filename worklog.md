# English Academy — Build Worklog

Project: English Academy Learning Platform (Next.js 16 + Prisma/SQLite)
Phase: 1 (Core Loop / MVP)

## Design Plan (one-time, committed)
- **Type roles:** Fraunces (display/headings — characterful soft serif, editorial-premium feel) + Hanken Grotesk (body — clean, highly legible, not the default Inter/system pairing).
- **Color tokens (6):**
  1. Navy `#1E2A52` — primary
  2. Ink `#0B1220` — deep text / footer
  3. Emerald `#10B981` — accent / focus ring
  4. Cream `#F7F4EE` — warm section surfaces (instead of generic grey)
  5. Slate `#5B6478` — secondary text
  6. White `#FFFFFF` — surfaces
- **Layout concept:** "Editorial, calm, premium — warm cream section surfaces with deep-navy type and a single emerald accent; generous spacing; content-led pages with one bold visual moment per screen."
- **Avoids:** ALL-CAPS eyebrows over every heading, arrow-tacked links, identical rounded cards everywhere, purposeless gradients, fake "01/02/03" numbering.

## Architecture decisions
- Auth: custom (scrypt password hashing + HMAC-signed session cookie), no external auth dep. `role` on Profile (student|admin).
- Middleware guards protected routes (cookie presence); server components/API verify the signed token.
- Verb forms stored with accepted-answer arrays (JSON strings in SQLite) so multiple valid spellings score correctly.
- Seed: large curated set of real English verbs (irregular + regular with correct +ed/+d/double-consonant/y→ied rules). meaning_language defaults to `en` (Sindhi meanings arrive via Phase 4 PDF import).
- AI: Phase 3 only; mock-mode ready. Phase 1 has no AI features.

---
Task ID: 1
Agent: main (Z.ai Code)
Task: Explore project structure and plan Phase 1.

Work Log:
- Read package.json, prisma/schema.prisma, layout.tsx, globals.css, lib/db.ts, next.config.ts, tailwind.config.ts, tsconfig.json, components.json, button.tsx, card.tsx, page.tsx.
- Confirmed: Next.js 16, Tailwind 4 (oklch @theme inline), shadcn New York, Prisma SQLite, DATABASE_URL set, dev script writes to dev.log.

Stage Summary:
- Stack understood. Proceeding to design system (Task 2), schema (Task 3), seed (Task 4), auth (Task 5), shell (Task 6), pages (Task 7+).

---
Task ID: 2
Agent: main (Z.ai Code)
Task: Set up design system (globals.css + branding config) and fonts.

Work Log:
- Rewrote src/app/globals.css with brand tokens (navy/ink/emerald/cream/sand/slate/gold), Fraunces display + Hanken Grotesk body font roles, semantic shadcn mapping, custom scrollbar, prose-reading width clamp.
- Created src/lib/branding.ts (single-source name/tagline/colors config).

Stage Summary:
- Design tokens committed. Fonts will be wired in layout (Task 6).

---
Task ID: 3
Agent: main (Z.ai Code)
Task: Define Prisma schema and push DB.

Work Log:
- Wrote prisma/schema.prisma: Profile, Verb (v1/v2/v3 + v2Alts/v3Alts JSON + source/confidence/needsReview/difficulty), StudentVerbProgress, Favorite, Goal, Achievement, StudentAchievement, TestAttempt, TestAnswer, Question, ChatConversation, ChatMessage, GeneratedSpeech, GeneratedPoem, Announcement. Used String fields (SQLite enum workaround) + indexes + cascade deletes.
- Ran `bun run db:push` -> synced.

Stage Summary:
- Database schema live, Prisma client generated.

---
Task ID: 4
Agent: main (Z.ai Code)
Task: Generate verb seed dataset and seed DB.

Work Log:
- Wrote prisma/data/verbs.ts: 966 curated REAL English verbs (irregulars with alternates + regulars with explicit V2/V3). No invented words; alternates handle dreamed/dreamt etc.
- Wrote src/lib/crypto.ts: scrypt password hashing + HMAC-SHA256 signed tokens (no external deps, no Next dep so scripts can use it).
- Wrote prisma/seed.ts: bulk-insert verbs (chunked), seed 8 achievements, seed admin + demo student.
- Ran seed -> 966 verbs, 8 achievements, 2 demo users.

Stage Summary:
- DB populated at real scale. Demo logins: admin@englishacademy.example/admin123, student@englishacademy.example/student123.

---
Task ID: 5
Agent: main (Z.ai Code)
Task: Build auth system (register/login/logout/me), session cookies, route protection.

Work Log:
- src/lib/crypto.ts: scrypt hashing + HMAC-SHA256 signed JWT-style tokens (no deps).
- src/lib/auth.ts: getSession/getCurrentUser/requireUser/requireAdmin, async setSessionCookie/clearSessionCookie.
- API routes: /api/auth/{register,login,logout,me} with zod validation.
- src/proxy.ts (Next 16 "proxy" convention replacing middleware): protects /dashboard,/verbs,/learn,/tests,/results,/profile + /admin; redirects auth pages when logged in.
- Fixed Next 16 async cookies() + $queryRaw tagged-template gotchas.

Stage Summary:
- Auth works: unauthed /dashboard → 307 to /login?next=. Login/register set HttpOnly signed cookie. Verified via curl.

---
Task ID: 6
Agent: main (Z.ai Code)
Task: Build app shell + design system fonts.

Work Log:
- src/app/layout.tsx: Fraunces (display) + Hanken Grotesk (body) via next/font; sonner Toaster; metadata from branding.
- src/components/logo.tsx, public-header.tsx (sticky header + mobile menu), student-shell.tsx (desktop navy sidebar + mobile bottom nav + logout).

Stage Summary:
- Shell ready. Student nav (Phase 1): Dashboard, Learn Verbs, Flashcards, MCQ Tests, Results, Profile.

---
Task ID: 7-14
Agent: main (Z.ai Code)
Task: Build home, about, auth pages, dashboard, verbs browser+detail, learn, MCQ tests, results, profile + APIs.

Work Log:
- Home (src/app/page.tsx): hero with 3-form preview card (one bold visual moment), how-it-works, CTA band, footer. Reads total verb count.
- Auth pages: /login, /register (split-screen branding + form), /forgot-password (honest "email not configured" notice + demo accounts).
- /about: real content with stats.
- /dashboard: verbs learned/difficult/tests/avg score stat cards, quick actions, recent results.
- /verbs: server-rendered with search, A-Z bar, status/difficulty filters, pagination (24/page), desktop table + mobile cards, learned/difficult/favorite actions (optimistic client components).
- /verbs/[id]: V1/V2/V3 + alternates + meaning, pronunciation (Web Speech), prev/next, actions.
- /learn: flashcard deck prioritizing difficult→unlearned→fillers, 20 cards, flip + I knew it/Need practice → /api/progress.
- /tests (redirect) + /tests/mcq: setup (category + length) → running (timer, progress, options) → review (score + per-question). Server-authoritative grading.
- /results: list (table/cards) + ?attempt= detail with full review.
- /profile: identity + stats (read-only for Phase 1).
- APIs: /api/progress, /api/favorites, /api/tests/mcq (RANDOM() pool), /api/tests/attempts (server grading, stores TestAttempt+TestAnswer).

Stage Summary:
- lint clean. All routes return 200. curl-verified: login, register, dashboard, verbs, detail, learn, MCQ gen+submit (100% grade), progress toggle, favorite toggle, results list+detail. Unauthed redirect works.

---
Task ID: 15-16
Agent: main (Z.ai Code)
Task: Run dev server, fix errors, Agent Browser self-verification at desktop + mobile.

Work Log:
- Fixed Next 16 async cookies() (setSessionCookie/clearSessionCookie async).
- Fixed $queryRaw tagged-template usage in MCQ generation.
- Migrated middleware.ts -> proxy.ts (Next 16 convention); removed runtime from config (proxy is Node.js implicitly).
- Fixed lint: setState-in-effect rule (closed mobile menu via onClick, removed pathname effect); removed unused vars. `bun run lint` -> clean.
- Agent Browser verification (desktop 1440x900 + mobile 390x844):
  - Home: renders, no console errors, featured verbs present, no overflow (both widths).
  - Login -> dashboard: works; persisted test result shows.
  - Verbs: search filters v1 OR meaning (q=go returns meaning matches too), A-Z bar, table desktop / cards mobile (24 cards), table display:none on mobile, mark-learned toggles via DOM click + POST /api/progress 200.
  - Verb detail: forms + meaning + alternates render, no overflow, mobile responsive.
  - MCQ test: setup -> run (timer, options) -> finish -> review with all 10 questions; grading correct (option-A-every-time scored 20%).
  - Results: list shows attempts with correct scores (Mixed 20%, Meaning 100%); detail review renders 10 questions.
  - Learn flashcard: "Show answer" flip reveals Meaning + "I knew it" buttons; no overflow.

Stage Summary:
- Phase 1 Definition of Done met: new student can register, browse & learn verbs, take an MCQ test, and see their score — on both phone-width and desktop-width, no console errors, no horizontal scroll, sticky footer pattern (root uses min-h-screen flex-col; footer/ bottom nav anchored). lint clean. Dev server running on :3000.
- Note: agent-browser `click @ref` had a click-target quirk on small buttons; verified equivalent actions via direct DOM .click() (app behavior is correct).
