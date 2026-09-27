import type { Metadata } from "next";
import { db } from "@/lib/db";
import { PublicHeader, PublicFooter } from "@/components/public-header";
import { branding } from "@/lib/branding";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Segal Institute — English Academy in Pakistan",
  description:
    "Segal Institute is an English academy helping students in Pakistan master the three forms of English verbs with flashcards, MCQ tests, an AI tutor, speech & poetry generators, and daily teacher-led topics.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Segal Institute — English Academy in Pakistan",
    description:
      "Learn the three forms of English verbs with flashcards, tests, an AI tutor, and daily topics. Free to start.",
    url: `${SITE_URL}/about`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Segal Institute — English Academy in Pakistan",
    description: "Learn English verbs with flashcards, tests, an AI tutor, and daily topics.",
  },
};

export const dynamic = "force-dynamic";

const FAQS = [
  {
    q: "How do I learn English verb forms fast?",
    a: "The fastest way to learn English verb forms (V1, V2, V3) is short, daily practice. At Segal Institute, you browse curated verb lists, flip flashcards to recall the three forms, then take short MCQ tests to confirm. 10–15 minutes a day compounds quickly. Mark verbs as 'learned' or 'difficult' so the app focuses your time on what you don't yet know.",
  },
  {
    q: "Is Segal Institute free?",
    a: "Yes — creating a student account is free. You get access to the verb library, flashcards, MCQ tests, the AI tutor, and the speech & poetry generators. Your teacher can assign a monthly fee through the admin panel, but learning the verb content itself is free.",
  },
  {
    q: "Can I learn English in Pakistan with this app?",
    a: "Yes. Segal Institute is built for students in Pakistan — you can use it from Lahore, Karachi, Islamabad, or anywhere with an internet connection. The app supports Urdu poetry generation and is designed for students whose first language is Urdu or Sindhi.",
  },
  {
    q: "What are the three forms of English verbs?",
    a: "V1 is the base form (e.g. 'go'), V2 is the past simple (e.g. 'went'), and V3 is the past participle (e.g. 'gone'). Irregular verbs change form entirely; regular verbs add -ed (e.g. 'walk / walked / walked'). Mastering these three forms is essential for correct English speaking and writing.",
  },
  {
    q: "Does the app help with irregular verbs?",
    a: "Yes. The verb library includes every common irregular English verb with all three forms and accepted alternate spellings (e.g. dreamed/dreamt, learned/learnt). You can filter by difficulty and mark tricky irregulars as 'difficult' to review them more often.",
  },
];

export default async function AboutPage() {
  let totalVerbs = 966; // fallback if DB unreachable (e.g. serverless without Postgres)
  try {
    totalVerbs = await db.verb.count();
  } catch {
    // use fallback
  }
  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      <main className="mx-auto w-full max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
        <p className="text-sm font-medium text-brand-emerald-deep">About</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          {branding.name}
        </h1>
        <p className="prose-reading mt-6 text-lg leading-relaxed text-muted-foreground">
          {branding.name} is an English academy helping students in Pakistan
          master the three forms of English verbs — V1 (base), V2 (past simple),
          and V3 (past participle). Most learners struggle not with vocabulary
          size, but with the irregular forms and the patterns behind them. Our
          focused, daily-practice approach fixes that.
        </p>

        {/* Local / topical content */}
        <p className="prose-reading mt-6 text-lg leading-relaxed text-muted-foreground">
          Based in Lahore and built for students across Pakistan, Segal
          Institute supports Urdu speakers with an AI tutor, an Urdu ghazal
          generator, and teacher-led daily topics. Whether you're in Lahore,
          Karachi, Islamabad, or a smaller town, you can learn English verb
          forms with the same structured practice — no expensive tuition
          center required.
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
          <li>An AI tutor, a speech generator, and a trained Urdu poetry generator.</li>
          <li>Admin panel: daily topics, student speeches (video from any platform), monthly result cards, fees in PKR, and best-student-of-the-month.</li>
        </ul>

        {/* FAQ section */}
        <h2 className="mt-16 font-display text-2xl font-semibold tracking-tight">
          Frequently asked questions
        </h2>
        <div className="prose-reading mt-6 space-y-6">
          {FAQS.map((f) => (
            <div key={f.q}>
              <h3 className="font-medium text-foreground">{f.q}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </div>

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

      {/* FAQPage structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: f.a,
              },
            })),
          }),
        }}
      />
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
