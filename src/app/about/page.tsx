import { db } from "@/lib/db";
import { PublicHeader, PublicFooter } from "@/components/public-header";
import { branding } from "@/lib/branding";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const totalVerbs = await db.verb.count();
  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      <main className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
        <p className="text-sm font-medium text-brand-emerald-deep">About</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {branding.name}
        </h1>
        <p className="prose-reading mt-6 text-lg leading-relaxed text-muted-foreground">
          {branding.name} is a focused English-learning platform built around the
          three forms of English verbs — V1 (base), V2 (past simple), and V3 (past
          participle). Most learners struggle not with vocabulary size, but with
          the irregular forms and the patterns behind them.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <Stat value={totalVerbs.toLocaleString()} label="Curated verbs" />
          <Stat value="V1·V2·V3" label="Every entry, three forms" />
          <Stat value="3" label="Practice modes (browse, flashcard, test)" />
        </div>

        <h2 className="mt-16 font-display text-2xl font-semibold tracking-tight">
          What's inside
        </h2>
        <ul className="prose-reading mt-4 space-y-3 text-muted-foreground">
          <li>A searchable verb browser with filters for difficulty, learned, and difficult words.</li>
          <li>A flashcard learning mode that tracks mastery per verb.</li>
          <li>MCQ tests across V1→V2, V1→V3, V2→V3, meaning, and mixed categories, with timed scoring and full review.</li>
          <li>Progress tracking: verbs learned, tests completed, average score, and results history.</li>
          <li>Coming phases: written tests, goals & streaks, achievements, an AI tutor, speech & poetry generators, and an admin panel with a PDF importer.</li>
        </ul>

        <div className="mt-12 rounded-xl border border-border bg-card p-6">
          <p className="font-medium text-foreground">A note on the verb data</p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            The seed dataset contains real English verbs (irregular forms with
            accepted alternate spellings like <em>dreamed/dreamt</em>, plus
            regular verbs with their correct <em>+ed/+d</em> forms). The full
            Sindhi-meaning source PDF will merge in via the admin importer once
            available. Meanings currently default to English so every feature
            works at real scale today.
          </p>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <p className="font-display text-3xl font-semibold text-brand-navy">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
