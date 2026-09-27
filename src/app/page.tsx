import Link from "next/link";
import { ArrowRight, Volume2, Flame, ListChecks, Sparkles } from "lucide-react";
import { db } from "@/lib/db";
import { PublicHeader, PublicFooter } from "@/components/public-header";
import { Button } from "@/components/ui/button";
import { getCurrentUser, type SessionUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

const FEATURED = ["be", "go", "see", "write", "run", "take"];

// Static fallbacks (used if the DB is unreachable, e.g. before a Postgres
// is provisioned on a serverless host). These are real seeded values.
const STATIC_TOTAL = 966;
const STATIC_FEATURED = [
  { id: "be", v1: "be", v2: "was/were", v3: "been", meaning: "to exist" },
  { id: "go", v1: "go", v2: "went", v3: "gone", meaning: "to move" },
  { id: "see", v1: "see", v2: "saw", v3: "seen", meaning: "to perceive with eyes" },
  { id: "write", v1: "write", v2: "wrote", v3: "written", meaning: "to mark with letters" },
  { id: "run", v1: "run", v2: "ran", v3: "run", meaning: "to move fast on foot" },
  { id: "take", v1: "take", v2: "took", v3: "taken", meaning: "to grab" },
];

export default async function Home() {
  let user: SessionUser | null = null;
  try {
    user = await getCurrentUser();
  } catch {
    // DB unavailable — treat as logged out.
  }

  let totalVerbs = STATIC_TOTAL;
  let featured: { id: string; v1: string; v2: string; v3: string; meaning: string }[] = STATIC_FEATURED;
  try {
    totalVerbs = await db.verb.count();
    const fromDb = await db.verb.findMany({
      where: { v1: { in: FEATURED } },
      orderBy: { v1: "asc" },
      take: 6,
      select: { id: true, v1: true, v2: true, v3: true, meaning: true },
    });
    if (fromDb.length > 0) featured = fromDb;
  } catch {
    // DB unavailable (e.g. serverless without a configured Postgres) — use static fallbacks.
  }

  const startHref = user ? "/dashboard" : "/register";
  const startLabel = user ? "Go to dashboard" : "Start learning";

  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader isLoggedIn={!!user} />

      {/* Hero */}
      <section className="surface-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:py-24">
          <div className="lg:col-span-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="size-3.5 text-brand-emerald" />
              An English academy — verbs, AI tutor, speech & poetry
            </p>
            <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Learn English with confidence at Segal Institute.
            </h1>
            <p className="prose-reading mt-6 text-lg leading-relaxed text-muted-foreground">
              Master the three forms of English verbs with {totalVerbs.toLocaleString()} curated
              entries, get help from an AI tutor, generate speeches and poems, and
              follow a daily topic from your teacher — all in one place.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 text-base">
                <Link href={startHref}>
                  {startLabel}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 text-base">
                <Link href="/verbs">Explore verbs</Link>
              </Button>
            </div>
            <p className="mt-5 text-sm text-muted-foreground">
              Free to start. No credit card. Works on phone and desktop.
            </p>
          </div>

          {/* Featured verb forms card — the one bold visual moment */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-border bg-background p-5 shadow-sm sm:p-7">
              <div className="flex items-center justify-between">
                <p className="font-display text-sm font-medium text-muted-foreground">
                  Three forms, one card
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Volume2 className="size-3.5" /> Tap to hear
                </span>
              </div>
              <ul className="mt-4 divide-y divide-border">
                {featured.map((v) => (
                  <li key={v.id} className="grid grid-cols-12 items-center gap-2 py-3.5">
                    <span className="col-span-1 font-display text-2xl font-semibold text-brand-navy">
                      {v.v1[0]?.toUpperCase()}
                    </span>
                    <div className="col-span-11 grid grid-cols-4 items-baseline gap-1">
                      <Form label="V1" value={v.v1} highlight />
                      <Form label="V2" value={v.v2} />
                      <Form label="V3" value={v.v3} />
                      <Form label="Meaning" value={v.meaning} small />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            A simple loop that builds real recall.
          </h2>
          <p className="prose-reading mt-4 text-lg text-muted-foreground">
            Browse to understand, flashcard to memorize, test to confirm. The
            app keeps track of what you know and what still needs work.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Step
            icon={ListChecks}
            title="Browse & mark"
            body="Search {n} verbs, mark each as learned or difficult, favorite the tricky ones."
            n={totalVerbs}
          />
          <Step
            icon={Flame}
            title="Flashcard it"
            body="Flip cards to reveal V2, V3, and meaning. Tell the app whether you knew it."
          />
          <Step
            icon={Sparkles}
            title="Test & track"
            body="Take MCQ tests across categories, see your score, and watch your verbs-learned number climb."
          />
        </div>
      </section>

      {/* CTA band */}
      <section className="bg-brand-navy text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Ready to learn your verbs?
            </h2>
            <p className="mt-2 max-w-xl text-white/70">
              Create a free account and start with the verbs you find hardest.
              Your progress is saved automatically.
            </p>
          </div>
          <Button asChild size="lg" className="h-12 bg-white text-base text-brand-navy hover:bg-white/90">
            <Link href={startHref}>
              {startLabel}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}

function Form({
  label,
  value,
  highlight,
  small,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  small?: boolean;
}) {
  return (
    <div className="min-w-0">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
        {label}
      </p>
      <p
        className={
          highlight
            ? "truncate text-sm font-semibold text-foreground"
            : small
              ? "truncate text-xs text-muted-foreground"
              : "truncate text-sm text-muted-foreground"
        }
        title={value}
      >
        {value}
      </p>
    </div>
  );
}

function Step({
  icon: Icon,
  title,
  body,
  n,
}: {
  icon: React.ElementType;
  title: string;
  body: string;
  n?: number;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <span className="inline-flex size-11 items-center justify-center rounded-lg bg-accent text-brand-emerald-deep">
        <Icon className="size-5" />
      </span>
      <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {body.replace("{n}", n ? n.toLocaleString() : "")}
      </p>
    </div>
  );
}
