/**
 * Branding config — single source of truth.
 * Change name, tagline, or colors here and the whole app updates.
 */

export const branding = {
  name: "Segal Institute",
  shortName: "Segal",
  tagline: "Learn English with confidence",
  description:
    "Segal Institute — an English academy where students master verb forms, build their skills with an AI tutor, generate speeches and poetry, and track their progress.",
  supportEmail: "hello@segalinstitute.example",
  address:
    "Segal Institute, First Family Line, at Royal College, beside Dr. Hashim Qureshi Eye Hospital (Ophthalmologist).",
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
