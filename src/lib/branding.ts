/**
 * Branding config — single source of truth.
 * Change name, tagline, or colors here and the whole app updates.
 */

export const branding = {
  name: "English Academy",
  shortName: "Academy",
  tagline: "Master the three forms of English verbs",
  description:
    "Learn, practice, and test yourself on the three forms of English verbs (V1 / V2 / V3) — with AI help, streaks, and achievements.",
  // Primary contact / support
  supportEmail: "hello@englishacademy.example",
  // Color reference (mirrors globals.css brand tokens) — for non-CSS contexts
  colors: {
    navy: "#1e2a52",
    ink: "#0b1220",
    emerald: "#10b981",
    cream: "#f7f4ee",
    sand: "#efe9dd",
    slate: "#5b6478",
    gold: "#c9a227",
  },
} as const;

export type Branding = typeof branding;
