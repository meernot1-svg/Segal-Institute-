/**
 * Seed default HomeContent keys with the current static homepage copy.
 * Run with: bun run prisma/seed-home.ts
 *
 * This is idempotent — only inserts keys that don't already exist, so
 * admin edits are preserved.
 */
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const DEFAULTS: { key: string; value: string; kind: string; label: string }[] = [
  // Hero
  { key: "hero_eyebrow", kind: "text", label: "Hero — eyebrow (small tag above the title)", value: "An English academy — verbs, AI tutor, speech & poetry" },
  { key: "hero_title", kind: "text", label: "Hero — main title", value: "Learn English with confidence at Segal Institute." },
  {
    key: "hero_subtitle",
    kind: "text",
    label: "Hero — subtitle paragraph",
    value:
      "Segal Institute is an English academy in Jacobabad, Sindh, where students learn to speak with confidence — through daily community speaking, vocabulary, weekly debates, and speech competitions. Under the supervision of Sir Sajid Murad, our students have brought pride to the academy at the district level. Serving students in Jacobabad, Sindh.",
  },
  { key: "hero_cta_label", kind: "text", label: "Hero — button label (when logged out)", value: "Start learning" },
  { key: "hero_cta_label_logged_in", kind: "text", label: "Hero — button label (when logged in)", value: "Go to dashboard" },

  // "How it works" section
  { key: "how_title", kind: "text", label: "How it works — title", value: "More than an academy — a daily learning community." },
  {
    key: "how_subtitle",
    kind: "text",
    label: "How it works — subtitle",
    value: "At Segal Institute, students don't just memorize. They speak every day, build vocabulary, debate, and compete. Here's what our students do regularly.",
  },
  { key: "how_card1_title", kind: "text", label: "How it works — Card 1 title", value: "Daily community speaking" },
  { key: "how_card1_body", kind: "text", label: "How it works — Card 1 body", value: "Students practice speaking English aloud every single day — building confidence one sentence at a time, in a supportive community." },
  { key: "how_card2_title", kind: "text", label: "How it works — Card 2 title", value: "Weekly debate" },
  { key: "how_card2_body", kind: "text", label: "How it works — Card 2 body", value: "Structured weekly debates on real topics. Students learn to think, listen, and respond in English — the skill that exams and life both reward." },
  { key: "how_card3_title", kind: "text", label: "How it works — Card 3 title", value: "Speech competitions" },
  { key: "how_card3_body", kind: "text", label: "How it works — Card 3 body", value: "Regular speech competitions where students present original speeches, get feedback, and grow into confident public speakers." },
  { key: "how_card4_title", kind: "text", label: "How it works — Card 4 title", value: "Verb forms mastery" },
  { key: "how_card4_body", kind: "text", label: "How it works — Card 4 body", value: "Browse 966 curated verbs, learn their three forms (V1, V2, V3), and follow daily topics from your teacher." },

  // Achievements section
  { key: "ach_eyebrow", kind: "text", label: "Achievements — eyebrow", value: "Academy achievements" },
  { key: "ach_title", kind: "text", label: "Achievements — title", value: "District Declamation Competition — three positions brought home." },
  {
    key: "ach_subtitle",
    kind: "text",
    label: "Achievements — subtitle",
    value:
      "Segal Institute students stood among the best in the district and brought pride to the academy — taking 1st, 2nd, and 3rd positions. That confidence on stage is built through the same daily speaking and debate practice you can join.",
  },
  { key: "ach_card1_position", kind: "text", label: "Achievements — Card 1 position", value: "1st Position" },
  { key: "ach_card1_note", kind: "text", label: "Achievements — Card 1 note", value: "A powerful declamation on 'Youth and Future of Pakistan' earned the top spot from a panel of judges." },
  { key: "ach_card2_position", kind: "text", label: "Achievements — Card 2 position", value: "2nd Position" },
  { key: "ach_card2_note", kind: "text", label: "Achievements — Card 2 note", value: "A measured, confident speech that secured second place at the district level." },
  { key: "ach_card3_position", kind: "text", label: "Achievements — Card 3 position", value: "3rd Position" },
  { key: "ach_card3_note", kind: "text", label: "Achievements — Card 3 note", value: "A strong, articulate declamation took the third position for Segal Institute." },

  // CTA band
  { key: "cta_title", kind: "text", label: "CTA — title", value: "Ready to join Segal Institute?" },
  { key: "cta_body", kind: "text", label: "CTA — body", value: "Create a free student account and start speaking, debating, and competing with us. Your progress is saved automatically." },
];

async function main() {
  let inserted = 0;
  for (const d of DEFAULTS) {
    const existing = await db.homeContent.findUnique({ where: { key: d.key } });
    if (!existing) {
      await db.homeContent.create({ data: d });
      inserted++;
    }
  }
  console.log(`Inserted ${inserted} new HomeContent rows. (${DEFAULTS.length} total keys checked.)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
