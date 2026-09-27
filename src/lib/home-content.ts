/**
 * Schema for the admin-editable homepage content. Each field has:
 *   key  — the HomeContent.key (used in the DB and the GET /api/home-content map)
 *   label — shown in the admin editor
 *   type — "text" | "textarea" | "image" (drives the admin input control)
 *   group — for visual grouping in the admin editor
 *   default — fallback used by the homepage when the key is missing from the DB
 */

export type HomeField = {
  key: string;
  label: string;
  type: "text" | "textarea" | "image";
  group: string;
  default: string;
};

export const HOME_FIELDS: HomeField[] = [
  // Hero
  { key: "hero_eyebrow", label: "Eyebrow tag (small text above the title)", type: "text", group: "Hero section", default: "An English academy — verbs, AI tutor, speech & poetry" },
  { key: "hero_title", label: "Main title (large heading)", type: "text", group: "Hero section", default: "Learn English with confidence at Segal Institute." },
  { key: "hero_subtitle", label: "Subtitle paragraph", type: "textarea", group: "Hero section", default: "Segal Institute is an English academy in Jacobabad, Sindh, where students learn to speak with confidence — through daily community speaking, vocabulary, weekly debates, and speech competitions. Under the supervision of Sir Sajid Murad, our students have brought pride to the academy at the district level. Serving students in Jacobabad, Sindh." },
  { key: "hero_image", label: "Hero side image (optional — shown next to the hero text)", type: "image", group: "Hero section", default: "" },
  { key: "hero_cta_label", label: "Button label when logged out", type: "text", group: "Hero section", default: "Start learning" },
  { key: "hero_cta_label_logged_in", label: "Button label when logged in", type: "text", group: "Hero section", default: "Go to dashboard" },

  // "How it works"
  { key: "how_title", label: "Section title", type: "text", group: "How it works", default: "More than an academy — a daily learning community." },
  { key: "how_subtitle", label: "Section subtitle", type: "textarea", group: "How it works", default: "At Segal Institute, students don't just memorize. They speak every day, build vocabulary, debate, and compete. Here's what our students do regularly." },
  { key: "how_card1_title", label: "Card 1 — title", type: "text", group: "How it works", default: "Daily community speaking" },
  { key: "how_card1_body", label: "Card 1 — body", type: "textarea", group: "How it works", default: "Students practice speaking English aloud every single day — building confidence one sentence at a time, in a supportive community." },
  { key: "how_card2_title", label: "Card 2 — title", type: "text", group: "How it works", default: "Weekly debate" },
  { key: "how_card2_body", label: "Card 2 — body", type: "textarea", group: "How it works", default: "Structured weekly debates on real topics. Students learn to think, listen, and respond in English — the skill that exams and life both reward." },
  { key: "how_card3_title", label: "Card 3 — title", type: "text", group: "How it works", default: "Speech competitions" },
  { key: "how_card3_body", label: "Card 3 — body", type: "textarea", group: "How it works", default: "Regular speech competitions where students present original speeches, get feedback, and grow into confident public speakers." },
  { key: "how_card4_title", label: "Card 4 — title", type: "text", group: "How it works", default: "Verb forms mastery" },
  { key: "how_card4_body", label: "Card 4 — body", type: "textarea", group: "How it works", default: "Browse 966 curated verbs, learn their three forms (V1, V2, V3), and follow daily topics from your teacher." },

  // Achievements
  { key: "ach_eyebrow", label: "Eyebrow", type: "text", group: "Academy achievements", default: "Academy achievements" },
  { key: "ach_title", label: "Section title", type: "text", group: "Academy achievements", default: "District Declamation Competition — three positions brought home." },
  { key: "ach_subtitle", label: "Section subtitle", type: "textarea", group: "Academy achievements", default: "Segal Institute students stood among the best in the district and brought pride to the academy — taking 1st, 2nd, and 3rd positions. That confidence on stage is built through the same daily speaking and debate practice you can join." },
  { key: "ach_card1_position", label: "Card 1 — position", type: "text", group: "Academy achievements", default: "1st Position" },
  { key: "ach_card1_note", label: "Card 1 — note", type: "textarea", group: "Academy achievements", default: "A powerful declamation on 'Youth and Future of Pakistan' earned the top spot from a panel of judges." },
  { key: "ach_card2_position", label: "Card 2 — position", type: "text", group: "Academy achievements", default: "2nd Position" },
  { key: "ach_card2_note", label: "Card 2 — note", type: "textarea", group: "Academy achievements", default: "A measured, confident speech that secured second place at the district level." },
  { key: "ach_card3_position", label: "Card 3 — position", type: "text", group: "Academy achievements", default: "3rd Position" },
  { key: "ach_card3_note", label: "Card 3 — note", type: "textarea", group: "Academy achievements", default: "A strong, articulate declamation took the third position for Segal Institute." },

  // CTA
  { key: "cta_title", label: "CTA title", type: "text", group: "Call to action band", default: "Ready to join Segal Institute?" },
  { key: "cta_body", label: "CTA body", type: "textarea", group: "Call to action band", default: "Create a free student account and start speaking, debating, and competing with us. Your progress is saved automatically." },
];

/**
 * Get a value from the home content map, falling back to the field default.
 */
export function getField(
  content: Record<string, { value: string; kind: string; label: string | null } | undefined> | null | undefined,
  key: string,
): string {
  const fallback = HOME_FIELDS.find((f) => f.key === key)?.default ?? "";
  if (!content || !content[key]) return fallback;
  const v = content[key]?.value;
  return v && v.trim() ? v : fallback;
}
