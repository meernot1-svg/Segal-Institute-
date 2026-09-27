import type { Metadata } from "next";
import { db } from "@/lib/db";
import { PublicHeader, PublicFooter } from "@/components/public-header";
import { SupervisionPhoto } from "@/components/supervision-photo";
import { branding } from "@/lib/branding";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Segal Institute — English Academy in Jacobabad, Sindh",
  description:
    "Segal Institute is an English academy in Jacobabad, Sindh, Pakistan. Students learn English verb forms with an AI tutor, sentence/speech/poetry generators, and daily teacher-led topics. Under the supervision of Sir Sajid Murad.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Segal Institute — English Academy in Jacobabad, Sindh",
    description:
      "An English academy in Jacobabad, Sindh. Learn verb forms with an AI tutor, sentence generator, and daily topics.",
    url: `${SITE_URL}/about`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Segal Institute — English Academy in Jacobabad, Sindh",
    description: "An English academy in Jacobabad, Sindh. Verb forms, AI tutor, speech & poetry generators.",
  },
};

export const dynamic = "force-dynamic";

const FAQS = [
  {
    q: "How do I learn English verb forms fast?",
    a: "The fastest way to learn English verb forms (V1, V2, V3) is short, daily practice. At Segal Institute, you browse curated verb lists, use the Sentence Generator to see verbs used in real sentences, and ask the AI Tutor to quiz you on the three forms. 10–15 minutes a day compounds quickly. Mark verbs as 'learned' or 'difficult' so the academy focuses your time on what you don't yet know.",
  },
  {
    q: "Is Segal Institute free?",
    a: "Yes — creating a student account is free. You get access to the verb library, the Sentence Generator, the AI Tutor, and the speech & poetry generators. Your teacher can assign a monthly fee through the admin panel, but learning the verb content itself is free.",
  },
  {
    q: "Can I learn English in Jacobabad with Segal Institute?",
    a: "Yes. Segal Institute is based in Jacobabad, Sindh — you can join from Jacobabad city, nearby villages, or anywhere in Sindh with an internet connection. The academy supports Urdu and Sindhi speakers with an AI tutor and an Urdu poetry generator.",
  },
  {
    q: "What are the three forms of English verbs?",
    a: "V1 is the base form (e.g. 'go'), V2 is the past simple (e.g. 'went'), and V3 is the past participle (e.g. 'gone'). Irregular verbs change form entirely; regular verbs add -ed (e.g. 'walk / walked / walked'). Mastering these three forms is essential for correct English speaking and writing.",
  },
  {
    q: "Does the academy help with irregular verbs?",
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
          {branding.name} is an English academy in Jacobabad, Sindh, Pakistan,
          helping students master the three forms of English verbs — V1 (base),
          V2 (past simple), and V3 (past participle). Most learners struggle not
          with vocabulary size, but with the irregular forms and the patterns
          behind them. Our focused, daily-practice approach fixes that.
        </p>

        {/* Local / topical content */}
        <p className="prose-reading mt-6 text-lg leading-relaxed text-muted-foreground">
          Based in Jacobabad, Sindh, Segal Institute serves students across the
          city and surrounding areas. The academy supports Urdu and Sindhi
          speakers with an AI tutor, an Urdu ghazal generator, and teacher-led
          daily topics. Whether you're in Jacobabad city, a nearby village, or
          anywhere in Sindh, you can learn English verb forms with the same
          structured practice — no expensive tuition center required. Serving
          students in Jacobabad, Sindh.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <Stat value={totalVerbs.toLocaleString()} label="Curated verbs" />
          <Stat value="V1·V2·V3" label="Every entry, three forms" />
          <Stat value="4" label="Generators (sentence, speech, poetry, AI tutor)" />
        </div>

        <h2 className="mt-16 font-display text-2xl font-semibold tracking-tight">
          What's inside
        </h2>
        <ul className="prose-reading mt-4 space-y-3 text-muted-foreground">
          <li>A searchable verb browser with filters for difficulty, learned, and difficult words.</li>
          <li>A Sentence Generator that writes original sentences on any topic, in any of 23+ languages, at any level.</li>
          <li>An AI Tutor that quizzes you on verb forms, explains grammar, and helps you practice.</li>
          <li>Progress tracking: verbs learned, difficult verbs, attendance, and daily topics from your teacher.</li>
          <li>A speech generator, a trained Urdu poetry generator (ghazal/nazm), and student speeches (video from any platform).</li>
          <li>Admin panel: edit the homepage, manage daily topics & calendar events, student speeches, monthly result cards, fees in PKR, and best-student-of-the-month.</li>
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

        {/* Supervision credit */}
        <div className="mt-12 flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-6 text-center sm:flex-row sm:text-left">
          <span className="inline-flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-white bg-brand-navy font-display text-xl font-semibold text-white shadow-sm">
            <SupervisionPhoto />
          </span>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-brand-emerald-deep">
              Under the supervision of
            </p>
            <p className="mt-1 font-display text-xl font-semibold text-foreground">Sir Sajid Murad</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Segal Institute is built and run under his guidance.
            </p>
          </div>
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
