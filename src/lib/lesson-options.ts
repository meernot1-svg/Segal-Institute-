/**
 * List of all available lesson titles, grouped by tier.
 * Used by the Sentence Generator's "Lesson" dropdown so students can pick
 * a lesson and get practice sentences on that lesson's grammar concept.
 *
 * IMPORTANT: this list must match the lesson titles in:
 *   src/lib/basic-lessons-data.ts
 *   src/lib/junior-lessons-data.ts
 *   src/lib/senior-lessons-data.ts
 * If you add or rename a lesson there, update it here too.
 */

import { BASIC_LESSONS } from "@/lib/basic-lessons-data";
import { JUNIOR_LESSONS } from "@/lib/junior-lessons-data";
import { SENIOR_LESSONS } from "@/lib/senior-lessons-data";

export type LessonOption = {
  /** Stable ID — used as the value sent to the API */
  id: string;
  /** Display title shown in the dropdown */
  title: string;
  /** Which tier this lesson belongs to */
  tier: "Basic" | "Junior" | "Senior";
  /** The subtitle / topic summary, used as a hint in the dropdown if needed */
  subtitle?: string;
};

export const BASIC_LESSON_OPTIONS: LessonOption[] = BASIC_LESSONS.map((l, i) => ({
  id: `basic-${i + 1}`,
  title: l.title,
  subtitle: l.subtitle,
  tier: "Basic",
}));

export const JUNIOR_LESSON_OPTIONS: LessonOption[] = JUNIOR_LESSONS.map((l, i) => ({
  id: `junior-${i + 1}`,
  title: l.title,
  subtitle: l.subtitle,
  tier: "Junior",
}));

export const SENIOR_LESSON_OPTIONS: LessonOption[] = SENIOR_LESSONS.map((l, i) => ({
  id: `senior-${i + 1}`,
  title: l.title,
  subtitle: l.subtitle,
  tier: "Senior",
}));

/**
 * Lookup a lesson option by ID. Returns undefined if not found.
 */
export function findLessonOption(id: string): LessonOption | undefined {
  return [...BASIC_LESSON_OPTIONS, ...JUNIOR_LESSON_OPTIONS, ...SENIOR_LESSON_OPTIONS].find((l) => l.id === id);
}

/**
 * The dropdown-friendly list: groups lessons by tier with a label that
 * includes the tier prefix. Use this for the page's `fields` options.
 *
 * Returns an array of strings like:
 *   "Basic · 1. What are Verbs?"
 *   "Basic · 2. Regular Verbs"
 *   "Junior · 1. Present Simple"
 *   "Senior · 1. Mind If"
 *
 * The API receives the selected string and uses the title to build the
 * practice-sentences prompt.
 */
export const LESSON_DROPDOWN_OPTIONS: string[] = [
  ...BASIC_LESSON_OPTIONS.map((l) => `Basic · ${l.title}`),
  ...JUNIOR_LESSON_OPTIONS.map((l) => `Junior · ${l.title}`),
  ...SENIOR_LESSON_OPTIONS.map((l) => `Senior · ${l.title}`),
];
