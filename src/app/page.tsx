import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  Volume2,
  ListChecks,
  Sparkles,
  Users,
  MessageCircle,
  Trophy,
  CalendarDays,
} from "lucide-react";
import { db } from "@/lib/db";
import { PublicHeader, PublicFooter } from "@/components/public-header";
import { SupervisionCredit } from "@/components/supervision-credit";
import { Button } from "@/components/ui/button";
import { getCurrentUser, type SessionUser } from "@/lib/auth";
import { branding } from "@/lib/branding";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: `${branding.name} — ${branding.tagline}`,
  description:
    "Segal Institute is an English academy in Pakistan where students learn to speak with confidence — daily community speaking, vocabulary, debates, and speech competitions. Under the supervision of Sir Sajid Murad, our students have won district declamation positions.",
  alternates: { canonical: "/" },
  openGraph: {
    title: `${branding.name} — ${branding.tagline}`,
    description:
      "An English academy in Pakistan — daily community speaking, vocabulary, debates, and speech competitions. Under the supervision of Sir Sajid Murad.",
    url: SITE_URL,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${branding.name} — ${branding.tagline}`,
    description: "An English academy in Pakistan. Daily speaking, debates, speech competitions, and district declamation wins.",
  },
};

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
              Segal Institute is an English academy where students learn to
              speak with confidence — through daily community speaking,
              vocabulary, real debates, and speech competitions. Under the
              supervision of Sir Sajid Murad, our students have brought pride to
              the academy at the district level. Built for students in Pakistan.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 text-base">
                <Link href={startHref}>
                  {startLabel}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
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
                  <li key={v.id} className="flex items-start gap-3 py-3.5 sm:grid sm:grid-cols-12 sm:gap-2">
                    <span className="hidden font-display text-2xl font-semibold text-brand-navy sm:col-span-1 sm:block">
                      {v.v1[0]?.toUpperCase()}
                    </span>
                    <div className="grid flex-1 grid-cols-2 items-baseline gap-2 sm:col-span-11 sm:grid-cols-4 sm:gap-1">
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
            More than an academy — a daily learning community.
          </h2>
          <p className="prose-reading mt-4 text-lg text-muted-foreground">
            At Segal Institute, students don't just memorize. They speak every
            day, build vocabulary, debate, and compete. Here's what our
            students do regularly.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Step
            icon={MessageCircle}
            title="Daily community speaking"
            body="Students practice speaking English aloud every single day — building confidence one sentence at a time, in a supportive community."
          />
          <Step
            icon={Users}
            title="Weekly debate"
            body="Structured weekly debates on real topics. Students learn to think, listen, and respond in English — the skill that exams and life both reward."
          />
          <Step
            icon={Trophy}
            title="Speech competitions"
            body="Regular speech competitions where students present original speeches, get feedback, and grow into confident public speakers."
          />
          <Step
            icon={ListChecks}
            title="Verb forms mastery"
            body={`Browse ${totalVerbs ? totalVerbs.toLocaleString() : "966"} curated verbs, flashcard them, and test yourself with timed MCQs across five categories.`}
          />
        </div>
      </section>

      {/* Academy achievements — District Declamation Competition */}
      <section className="bg-brand-navy text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-brand-emerald">
              <Trophy className="size-3.5" /> Academy achievements
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              District Declamation Competition — three positions brought home.
            </h2>
            <p className="prose-reading mt-4 text-lg text-white/70">
              Segal Institute students stood among the best in the district and
              brought pride to the academy — taking 1st, 2nd, and 3rd
              positions. That confidence on stage is built through the same
              daily speaking and debate practice you can join.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            <AwardCard
              position="1st Position"
              competition="District Declamation Competition"
              note="A powerful declamation on 'Youth and Future of Pakistan' earned the top spot from a panel of judges."
              accent="gold"
            />
            <AwardCard
              position="2nd Position"
              competition="District Declamation Competition"
              note="A measured, confident speech that secured second place at the district level."
              accent="silver"
            />
            <AwardCard
              position="3rd Position"
              competition="District Declamation Competition"
              note="A strong, articulate declamation took the third position for Segal Institute."
              accent="bronze"
            />
          </div>
          <p className="mt-10 text-sm text-white/50">
            <CalendarDays className="mr-1.5 inline size-4" />
            Competitions held at the district level — a proud moment for Segal Institute, its students, and Sir Sajid Murad.
          </p>
        </div>
      </section>

      {/* CTA band */}
      <section className="surface-cream">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Ready to join Segal Institute?
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Create a free student account and start speaking, debating, and
              competing with us. Your progress is saved automatically.
            </p>
          </div>
          <Button asChild size="lg" className="h-12 text-base">
            <Link href={startHref}>
              {startLabel}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Supervision credit — Sir Sajid Murad */}
      <SupervisionCredit />

      <PublicFooter />

      {/* Structured data for search engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            name: branding.name,
            description: branding.description,
            url: SITE_URL,
            logo: `${SITE_URL}/logo.svg`,
            sameAs: [SITE_URL],
            address: {
              "@type": "PostalAddress",
              addressCountry: "PK",
              addressRegion: "Punjab",
              addressLocality: "Lahore",
              streetAddress: branding.address,
            },
            knowsAbout: [
              "English verb forms",
              "English grammar",
              "V1 V2 V3 verbs",
              "English learning",
              "irregular verbs",
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: "English Verb Forms — V1, V2, V3 Mastery",
            description:
              "Learn the three forms of English verbs (base, past simple, past participle) with flashcards, MCQ tests, and an AI tutor.",
            provider: {
              "@type": "EducationalOrganization",
              name: branding.name,
              url: SITE_URL,
              sameAs: SITE_URL,
            },
            url: `${SITE_URL}/verbs`,
            inLanguage: "en",
            educationalLevel: "Beginner to Intermediate",
            teaches: "The three forms of English verbs (V1, V2, V3) and their meanings",
            hasCourseInstance: {
              "@type": "CourseInstance",
              courseMode: "Online",
              courseWorkload: "PT10H",
            },
          }),
        }}
      />
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

function AwardCard({
  position,
  competition,
  recipient,
  note,
  accent,
}: {
  position: string;
  competition: string;
  recipient?: string;
  note: string;
  accent: "gold" | "silver" | "bronze";
}) {
  const accents = {
    gold: {
      gradient: "from-amber-400/20 to-amber-600/5",
      ring: "ring-amber-400/30",
      border: "border-amber-400/30",
      medalBg: "bg-gradient-to-br from-amber-300 to-amber-500",
      medalText: "text-amber-950",
      positionColor: "text-amber-300",
      glow: "shadow-[0_0_30px_-8px_rgba(251,191,36,0.5)]",
      rank: "1",
    },
    silver: {
      gradient: "from-slate-200/20 to-slate-400/5",
      ring: "ring-slate-300/30",
      border: "border-slate-300/30",
      medalBg: "bg-gradient-to-br from-slate-200 to-slate-400",
      medalText: "text-slate-900",
      positionColor: "text-slate-200",
      glow: "shadow-[0_0_30px_-8px_rgba(203,213,225,0.4)]",
      rank: "2",
    },
    bronze: {
      gradient: "from-orange-400/20 to-orange-600/5",
      ring: "ring-orange-400/30",
      border: "border-orange-400/30",
      medalBg: "bg-gradient-to-br from-orange-300 to-orange-600",
      medalText: "text-orange-950",
      positionColor: "text-orange-300",
      glow: "shadow-[0_0_30px_-8px_rgba(251,146,60,0.4)]",
      rank: "3",
    },
  } as const;
  const a = accents[accent];
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border ${a.border} bg-gradient-to-b ${a.gradient} p-6 ring-1 ${a.ring} ${a.glow} transition-transform hover:-translate-y-1`}
    >
      {/* Large faint rank number in the corner */}
      <span
        className="pointer-events-none absolute -right-2 -top-4 font-display text-7xl font-bold text-white/5 sm:text-8xl"
        aria-hidden
      >
        {a.rank}
      </span>
      <div className="relative flex items-center gap-4">
        <span
          className={`inline-flex size-14 shrink-0 items-center justify-center rounded-full ${a.medalBg} ${a.medalText} shadow-lg`}
          aria-hidden
        >
          <span className="font-display text-2xl font-bold">{a.rank}</span>
        </span>
        <div>
          <p className={`font-display text-xl font-semibold ${a.positionColor}`}>{position}</p>
          <p className="text-xs text-white/50">{competition}</p>
        </div>
      </div>
      {recipient && <p className="relative mt-4 text-base font-medium text-white">{recipient}</p>}
      <p className="relative mt-2 text-sm leading-relaxed text-white/70">{note}</p>
    </div>
  );
}
