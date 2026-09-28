/**
 * Badge tier helpers — rank comparison, labels, and content access logic.
 * Tiers are cumulative: a user at tier N can access content at tiers 1..N.
 */

export type BadgeTier = "basic" | "junior" | "senior" | "elite_senior";
export type AccountStatus = "pending" | "active" | "rejected";

export const TIER_RANKS: Record<BadgeTier, number> = {
  basic: 1,
  junior: 2,
  senior: 3,
  elite_senior: 4,
};

export const TIER_LABELS: Record<BadgeTier, string> = {
  basic: "Basic",
  junior: "Junior",
  senior: "Senior",
  elite_senior: "Elite Senior",
};

export const TIER_ORDER: BadgeTier[] = ["basic", "junior", "senior", "elite_senior"];

export const TIER_COLORS: Record<BadgeTier, string> = {
  basic: "bg-slate-100 text-slate-700 border-slate-300",
  junior: "bg-blue-50 text-blue-700 border-blue-300",
  senior: "bg-amber-50 text-amber-700 border-amber-300",
  elite_senior: "bg-purple-50 text-purple-700 border-purple-300",
};

export const TIER_DOT_COLORS: Record<BadgeTier, string> = {
  basic: "bg-slate-400",
  junior: "bg-blue-500",
  senior: "bg-amber-500",
  elite_senior: "bg-purple-500",
};

/** Get the numeric rank of a badge tier string (defaults to basic=1). */
export function tierRank(tier: string | null | undefined): number {
  if (!tier) return 1;
  return TIER_RANKS[tier as BadgeTier] ?? 1;
}

/** Can a user with `userTier` access content with `contentMinTier`? */
export function canAccessTier(userTier: string | null | undefined, contentMinTier: string): boolean {
  return tierRank(userTier) >= tierRank(contentMinTier);
}

/** Get a friendly label for a tier string. */
export function tierLabel(tier: string | null | undefined): string {
  if (!tier) return "Basic";
  return TIER_LABELS[tier as BadgeTier] ?? "Basic";
}

/** Get the next tier up from the current one (for promote buttons). */
export function nextTier(current: BadgeTier): BadgeTier | null {
  const idx = TIER_ORDER.indexOf(current);
  if (idx < 0 || idx >= TIER_ORDER.length - 1) return null;
  return TIER_ORDER[idx + 1];
}

/** Get the previous tier down from the current one (for demote buttons). */
export function prevTier(current: BadgeTier): BadgeTier | null {
  const idx = TIER_ORDER.indexOf(current);
  if (idx <= 0) return null;
  return TIER_ORDER[idx - 1];
}
