import type { Metadata } from "next";
import Link from "next/link";
import { ArticleLayout } from "@/components/article-layout";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "How to Learn English Verb Forms (V1, V2, V3) Fast",
  description:
    "A simple, effective method to learn the three forms of English verbs — V1 (base), V2 (past simple), V3 (past participle). Includes a daily practice plan, common irregular verbs, and free tools.",
  alternates: { canonical: "/blog/how-to-learn-english-verb-forms" },
  openGraph: {
    title: "How to Learn English Verb Forms (V1, V2, V3) Fast · Segal Institute",
    description:
      "A simple method to learn the three forms of English verbs with a daily plan and free tools.",
    url: `${SITE_URL}/blog/how-to-learn-english-verb-forms`,
    type: "article",
    publishedTime: "2026-09-01",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Learn English Verb Forms (V1, V2, V3) Fast",
    description: "A simple daily-practice method for learning English verb forms.",
  },
};

export default function Page() {
  return (
    <ArticleLayout
      title="How to learn English verb forms (V1, V2, V3) fast"
      description="A simple, effective method to master the three forms of English verbs — and finally stop second-guessing 'go / went / gone'."
      publishedAt="2026-09-01"
    >
      <p>
        English verbs have three main forms: <strong>V1 (base)</strong>,
        <strong> V2 (past simple)</strong>, and <strong>V3 (past participle)</strong>.
        Regular verbs add <em>-ed</em> to form V2 and V3 (e.g. <em>walk / walked /
        walked</em>). Irregular verbs change completely (e.g. <em>go / went / gone</em>).
        Most learners don't struggle with regular verbs — they struggle with the
        ~200 irregular verbs in common use.
      </p>

      <h2 className="font-display text-xl font-semibold tracking-tight mt-10">The 3-step daily method</h2>
      <p>
        <strong>1. Browse &amp; mark (5 min).</strong> Open the{" "}
        <Link href="/verbs" className="text-brand-emerald-deep underline-offset-4 hover:underline">
          verb browser
        </Link>{" "}
        and scan verbs alphabetically. Mark each verb as <em>learned</em> (you can
        recall it instantly) or <em>difficult</em> (you hesitate). Don't try to
        learn them — just sort them.
      </p>
      <p>
        <strong>2. Flashcards (5 min).</strong> Open{" "}
        <Link href="/learn" className="text-brand-emerald-deep underline-offset-4 hover:underline">
          flashcards
        </Link>. The app prioritizes your difficult verbs. See V1, try to recall
        V2 and V3, then flip. Be honest — marking "I knew it" only when you did
        is what trains your memory.
      </p>
      <p>
        <strong>3. Quick test (5 min).</strong> Take a 10-question{" "}
        <Link href="/tests/mcq" className="text-brand-emerald-deep underline-offset-4 hover:underline">
          MCQ test
        </Link>{" "}
        in any category (V1→V2, V1→V3, V2→V3, meaning, or mixed). The timer adds
        a small amount of pressure that forces real recall. Review the wrong
        answers at the end — that's where the learning happens.
      </p>

      <h2 className="font-display text-xl font-semibold tracking-tight mt-10">Why this works</h2>
      <p>
        Spaced repetition + active recall is the most evidence-backed way to
        memorize. The three-step cycle above uses both: marking verbs creates
        the <em>space</em> between exposures, and flashcards + tests force
        <em>active recall</em> (pulling information out, not cramming it in).
        Ten to fifteen minutes a day beats two hours once a week.
      </p>

      <h2 className="font-display text-xl font-semibold tracking-tight mt-10">10 common irregular verbs to start with</h2>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>be</strong> — was/were — been</li>
        <li><strong>go</strong> — went — gone</li>
        <li><strong>see</strong> — saw — seen</li>
        <li><strong>take</strong> — took — taken</li>
        <li><strong>write</strong> — wrote — written</li>
        <li><strong>run</strong> — ran — run</li>
        <li><strong>come</strong> — came — come</li>
        <li><strong>know</strong> — knew — known</li>
        <li><strong>think</strong> — thought — thought</li>
        <li><strong>bring</strong> — brought — brought</li>
      </ul>

      <p>
        Many verbs have accepted alternate spellings too — <em>dreamed /
        dreamt</em>, <em>learned / learnt</em>, <em>burned / burnt</em>. Both
        are correct; Segal Institute accepts both in written tests.
      </p>

      <p>
        Ready to start? <Link href="/register" className="text-brand-emerald-deep underline-offset-4 hover:underline">Create a free account</Link>{" "}
        and the app will track your progress automatically.
      </p>
    </ArticleLayout>
  );
}
