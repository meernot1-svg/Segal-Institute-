import type { Metadata } from "next";
import Link from "next/link";
import { ArticleLayout } from "@/components/article-layout";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Irregular Verbs List — Practice & Tips",
  description:
    "A focused list of the most useful English irregular verbs with their V1, V2, V3 forms and meanings, plus a free practice plan to memorize them fast.",
  alternates: { canonical: "/blog/irregular-verbs-list-practice" },
  openGraph: {
    title: "Irregular Verbs List — Practice & Tips · Segal Institute",
    description:
      "The most useful English irregular verbs with V1, V2, V3 forms, plus a free practice plan.",
    url: `${SITE_URL}/blog/irregular-verbs-list-practice`,
    type: "article",
    publishedTime: "2026-09-02",
  },
  twitter: {
    card: "summary_large_image",
    title: "Irregular Verbs List — Practice & Tips",
    description: "The most useful English irregular verbs with their three forms.",
  },
};

export default function Page() {
  return (
    <ArticleLayout
      title="Irregular verbs list — practice and tips"
      description="A focused list of the most useful English irregular verbs with all three forms, plus a free practice plan to memorize them."
      publishedAt="2026-09-02"
    >
      <p>
        English has roughly 200 irregular verbs in common use, but the truth is
        that about 70 of them cover almost everything you'll meet in daily
        conversation and exams. Focus your energy there first.
      </p>

      <h2 className="font-display text-xl font-semibold tracking-tight mt-10">Why irregular verbs matter</h2>
      <p>
        Regular verbs follow a simple rule (add <em>-ed</em> for V2/V3), so once
        you know the rule, you know thousands of verbs. Irregular verbs don't
        follow a rule — you have to memorize them. They also happen to be the
        most-used verbs in English: <em>be, have, do, go, see, come, take,
        know, get, find</em>. If you master the irregulars, your spoken and
        written English improves fast.
      </p>

      <h2 className="font-display text-xl font-semibold tracking-tight mt-10">The high-frequency 25</h2>
      <p>Start with these. They appear in almost every English sentence.</p>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>be</strong> — was/were — been</li>
        <li><strong>have</strong> — had — had</li>
        <li><strong>do</strong> — did — done</li>
        <li><strong>say</strong> — said — said</li>
        <li><strong>go</strong> — went — gone</li>
        <li><strong>get</strong> — got — got/gotten</li>
        <li><strong>make</strong> — made — made</li>
        <li><strong>know</strong> — knew — known</li>
        <li><strong>think</strong> — thought — thought</li>
        <li><strong>see</strong> — saw — seen</li>
        <li><strong>come</strong> — came — come</li>
        <li><strong>take</strong> — took — taken</li>
        <li><strong>give</strong> — gave — given</li>
        <li><strong>find</strong> — found — found</li>
        <li><strong>tell</strong> — told — told</li>
        <li><strong>become</strong> — became — become</li>
        <li><strong>leave</strong> — left — left</li>
        <li><strong>feel</strong> — felt — felt</li>
        <li><strong>bring</strong> — brought — brought</li>
        <li><strong>begin</strong> — began — begun</li>
        <li><strong>keep</strong> — kept — kept</li>
        <li><strong>hold</strong> — held — held</li>
        <li><strong>write</strong> — wrote — written</li>
        <li><strong>stand</strong> — stood — stood</li>
        <li><strong>hear</strong> — heard — heard</li>
      </ul>

      <h2 className="font-display text-xl font-semibold tracking-tight mt-10">Practice plan</h2>
      <p>
        Don't try to memorize the whole list at once. Group them into sets of 10
        and spend three days on each set:
      </p>
      <ul className="list-disc pl-6 space-y-1">
        <li><strong>Day 1:</strong> Browse the 10 verbs on the{" "}
          <Link href="/verbs" className="text-brand-emerald-deep underline-offset-4 hover:underline">verbs page</Link>{" "}
          and read each aloud. Use the pronunciation button to hear it.</li>
        <li><strong>Day 2:</strong> Use the{" "}
          <Link href="/lessons#practice" className="text-brand-emerald-deep underline-offset-4 hover:underline">Sentence Generator</Link>{" "}
          to write 5 example sentences with each verb. Mark any tricky verbs as <em>difficult</em>.</li>
        <li><strong>Day 3:</strong> Open the{" "}
          <Link href="/chat" className="text-brand-emerald-deep underline-offset-4 hover:underline">AI Tutor</Link>{" "}
          and ask it to quiz you on the three forms. Re-review only the difficult ones tomorrow.</li>
      </ul>

      <h2 className="font-display text-xl font-semibold tracking-tight mt-10">Tips that stick</h2>
      <p>
        <strong>Group by pattern.</strong> Many irregulars share a pattern —
        <em> think/thought/thought, bring/brought/brought, teach/taught/taught</em>.
        Learning one "key" verb unlocks a group.
      </p>
      <p>
        <strong>Use them in a sentence.</strong> Don't learn the three forms in
        isolation — write one short sentence per verb. "I went home. She has
        gone home." The context helps your brain recall the form later.
      </p>
      <p>
        <strong>Accept alternates.</strong> <em>dreamed/dreamt</em>,{" "}
        <em>learned/learnt</em>, <em>spelled/spelt</em> are all correct. Segal
        Institute accepts both in written tests.
      </p>

      <p>
        Ready to practice the full list?{" "}
        <Link href="/register" className="text-brand-emerald-deep underline-offset-4 hover:underline">
          Create a free account
        </Link>{" "}
        and the academy will track which ones you've mastered.
      </p>
    </ArticleLayout>
  );
}
