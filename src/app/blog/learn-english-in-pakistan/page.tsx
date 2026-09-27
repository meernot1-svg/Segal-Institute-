import type { Metadata } from "next";
import Link from "next/link";
import { ArticleLayout } from "@/components/article-layout";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Learn English in Pakistan — Free Verb Practice & AI Tutor",
  description:
    "How students in Lahore, Karachi, and across Pakistan can learn English verb forms for free with Segal Institute — an online English academy with Urdu support, an AI tutor, and daily teacher-led topics.",
  alternates: { canonical: "/blog/learn-english-in-pakistan" },
  openGraph: {
    title: "Learn English in Pakistan — Free Verb Practice & AI Tutor · Segal Institute",
    description:
      "Free English verb practice + AI tutor for students in Pakistan. Urdu support, daily topics, and a poetry generator.",
    url: `${SITE_URL}/blog/learn-english-in-pakistan`,
    type: "article",
    publishedTime: "2026-09-03",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn English in Pakistan — Free Verb Practice & AI Tutor",
    description: "Free English learning tools for students in Lahore, Karachi, and across Pakistan.",
  },
};

export default function Page() {
  return (
    <ArticleLayout
      title="Learn English in Pakistan — free verb practice and an AI tutor"
      description="How students in Lahore, Karachi, and across Pakistan can learn English verb forms for free — with Urdu support, an AI tutor, and daily teacher-led topics."
      publishedAt="2026-09-03"
    >
      <p>
        Learning English in Pakistan often means expensive tuition centers,
        outdated textbooks, and crowded classrooms. Segal Institute was built
        to fix that: a focused online English academy you can use from anywhere
        in Pakistan — Lahore, Karachi, Islamabad, Faisalabad, or a smaller town
        — with just a phone or laptop.
      </p>

      <h2 className="font-display text-xl font-semibold tracking-tight mt-10">Built for Urdu speakers</h2>
      <p>
        Segal Institute supports Urdu at every step. The{" "}
        <Link href="/poetry-generator" className="text-brand-emerald-deep underline-offset-4 hover:underline">
          poetry generator
        </Link>{" "}
        writes original Urdu ghazals and nazms — drawing on the tradition of
        shayari without copying it. The AI tutor explains English verbs in
        simple language. And the whole interface is designed to be calm and
        focused, not overwhelming.
      </p>

      <h2 className="font-display text-xl font-semibold tracking-tight mt-10">What you get — free</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>Verb library:</strong> hundreds of English verbs with V1, V2, V3 forms and meanings.</li>
        <li><strong>Flashcards:</strong> a daily-practice mode that prioritizes your difficult verbs.</li>
        <li><strong>MCQ tests:</strong> timed tests in five categories with full answer review.</li>
        <li><strong>AI tutor:</strong> ask any English grammar question, get a clear answer.</li>
        <li><strong>Speech generator:</strong> turn any topic into a structured original speech.</li>
        <li><strong>Poetry generator:</strong> generate original Urdu ghazals and nazms.</li>
        <li><strong>Daily topics:</strong> your teacher posts a new topic every day to keep you on track.</li>
      </ul>

      <h2 className="font-display text-xl font-semibold tracking-tight mt-10">Why focus on verbs?</h2>
      <p>
        Verbs are the engine of every English sentence. If you know the three
        forms (V1 base, V2 past simple, V3 past participle), you can build
        present, past, perfect, and future tenses correctly. Most spoken
        English mistakes are verb-form mistakes. That's why Segal Institute
        starts there — master verbs and the rest gets easier.
      </p>

      <h2 className="font-display text-xl font-semibold tracking-tight mt-10">Start today</h2>
      <p>
        It takes two minutes to{" "}
        <Link href="/register" className="text-brand-emerald-deep underline-offset-4 hover:underline">
          create a free account
        </Link>. The app tracks your progress automatically — verbs learned,
        test scores, streaks. Ten to fifteen minutes a day is enough. You
        don't need a tuition center. You need a habit.
      </p>
    </ArticleLayout>
  );
}
