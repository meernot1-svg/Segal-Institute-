import type { Metadata } from "next";
import Link from "next/link";
import { PublicHeader, PublicFooter } from "@/components/public-header";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog — English Learning Tips from Segal Institute",
  description:
    "Short, practical articles on learning English verb forms, irregular verbs, and learning English in Pakistan. Written by Segal Institute.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — English Learning Tips · Segal Institute",
    description: "Practical articles on English verb forms, irregular verbs, and learning English in Pakistan.",
    url: `${SITE_URL}/blog`,
    type: "website",
  },
};

const ARTICLES = [
  {
    slug: "how-to-learn-english-verb-forms",
    title: "How to learn English verb forms (V1, V2, V3) fast",
    description:
      "A simple daily method to master the three forms of English verbs — browse, flashcard, test.",
    date: "2026-09-01",
  },
  {
    slug: "irregular-verbs-list-practice",
    title: "Irregular verbs list — practice and tips",
    description:
      "A focused list of the most useful English irregular verbs with all three forms, plus a free practice plan.",
    date: "2026-09-02",
  },
  {
    slug: "learn-english-in-pakistan",
    title: "Learn English in Pakistan — free verb practice and an AI tutor",
    description:
      "How students in Lahore, Karachi, and across Pakistan can learn English verb forms for free with Segal Institute.",
    date: "2026-09-03",
  },
];

export default function BlogIndex() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-16 sm:px-6 lg:py-24">
        <p className="text-sm font-medium text-brand-emerald-deep">Segal Institute · Blog</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          English learning tips
        </h1>
        <p className="prose-reading mt-6 text-lg leading-relaxed text-muted-foreground">
          Short, practical articles on mastering English verb forms, irregular
          verbs, and learning English in Pakistan.
        </p>

        <div className="mt-12 space-y-6">
          {ARTICLES.map((a) => (
            <Link
              key={a.slug}
              href={`/blog/${a.slug}`}
              className="block rounded-xl border border-border bg-card p-6 transition-colors hover:border-brand-emerald/40 hover:bg-accent"
            >
              <p className="text-xs text-muted-foreground">
                {new Date(a.date).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}
              </p>
              <h2 className="mt-1.5 font-display text-xl font-semibold tracking-tight text-foreground">
                {a.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.description}</p>
              <p className="mt-3 text-sm font-medium text-brand-emerald-deep">Read article →</p>
            </Link>
          ))}
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
