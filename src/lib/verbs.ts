/** Shared verb helpers — parsing alternates, scoring, and form selection. */

export function parseAlts(json: string | null | undefined): string[] {
  if (!json) return [];
  try {
    const v = JSON.parse(json);
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

/** All accepted spellings for a form (primary first). */
export function acceptedForms(primary: string, altsJson: string | null | undefined): string[] {
  const alts = parseAlts(altsJson);
  const out = [primary, ...alts.filter((a) => a && a !== primary)];
  return out;
}

/** Normalize a written answer for comparison. */
export function normalizeAnswer(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

/** Check a user answer against any accepted spelling. */
export function checkAnswer(userAnswer: string, primary: string, altsJson?: string | null): boolean {
  const norm = normalizeAnswer(userAnswer);
  if (!norm) return false;
  return acceptedForms(primary, altsJson).some((a) => normalizeAnswer(a) === norm);
}

export type FormKey = "v1" | "v2" | "v3";

export function getForm(v: { v1: string; v2: string; v3: string }, key: FormKey): string {
  return v[key];
}

export function getAltsJson(
  v: { v2Alts: string; v3Alts: string },
  key: FormKey,
): string | null {
  if (key === "v1") return null;
  return key === "v2" ? v.v2Alts : v.v3Alts;
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export type McqCategory =
  | "v1-to-v2"
  | "v1-to-v3"
  | "v2-to-v3"
  | "meaning"
  | "mixed"
  | "random";

export const MCQ_CATEGORIES: { value: McqCategory; label: string; description: string }[] = [
  { value: "v1-to-v2", label: "V1 → V2", description: "Given the base form, choose the past simple" },
  { value: "v1-to-v3", label: "V1 → V3", description: "Given the base form, choose the past participle" },
  { value: "v2-to-v3", label: "V2 → V3", description: "Given the past simple, choose the past participle" },
  { value: "meaning", label: "Meaning", description: "Given the verb, choose its meaning" },
  { value: "mixed", label: "Mixed", description: "A random mix of all question types" },
  { value: "random", label: "Random verbs", description: "Any category, surprise me" },
];

export const TEST_LENGTHS = [10, 20, 30, 50] as const;

/**
 * Determine if a verb is regular or irregular.
 * A regular verb forms V2 and V3 by adding -ed, -d, or -ied to V1.
 * Irregular verbs change in other ways (go→went→gone, be→was→been, etc.).
 * If V2 or V3 contains "/" it's almost certainly irregular (e.g. "was/were").
 */
export function isRegularVerb(v1: string, v2: string, v3: string): boolean {
  const base = v1.toLowerCase();
  const past = v2.toLowerCase();
  const participle = v3.toLowerCase();

  // Contains a slash = irregular (was/were, etc.)
  if (past.includes("/") || participle.includes("/")) return false;

  // Generate expected regular forms
  const expectedV2 = regularPast(base);
  const expectedV3 = regularPast(base); // regular verbs: V2 == V3

  return past === expectedV2 && participle === expectedV3;
}

/** Generate the regular past tense form from a base verb. */
function regularPast(base: string): string {
  // ends in 'e' → just add 'd'
  if (base.endsWith("e")) return base + "d";
  // ends in 'y' preceded by consonant → 'y' becomes 'ied'
  if (base.endsWith("y") && base.length > 1 && !isVowel(base[base.length - 2])) {
    return base.slice(0, -1) + "ied";
  }
  // ends in single consonant preceded by single vowel (CVC pattern) → double
  if (base.length >= 3 && isVowel(base[base.length - 2]) && !isVowel(base[base.length - 3]) && !isVowel(base[base.length - 1])) {
    // Don't double if ends in w, x, y
    const last = base[base.length - 1];
    if (!["w", "x", "y"].includes(last)) {
      return base + base[base.length - 1] + "ed";
    }
  }
  // default: add 'ed'
  return base + "ed";
}

function isVowel(ch: string): boolean {
  return ["a", "e", "i", "o", "u"].includes(ch);
}

export type VerbType = "Regular" | "Irregular";

export function getVerbType(v1: string, v2: string, v3: string): VerbType {
  return isRegularVerb(v1, v2, v3) ? "Regular" : "Irregular";
}
