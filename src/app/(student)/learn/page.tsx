import Link from "next/link";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { shuffle } from "@/lib/verbs";
import { tierRank } from "@/lib/tiers";
import { FlashcardDeck, type Flashcard } from "@/components/flashcard-deck";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

const DECK_SIZE = 20;

export default async function LearnPage() {
  const user = (await getCurrentUser())!;
  const userRank = tierRank(user.badge);

  // Flashcards are a Senior+ feature. For Basic and Junior users we simply
  // remove the feature (no lock screen, no "ask your teacher" wall) — we
  // redirect them to the Verbs page, which is the natural next thing to do
  // for those tiers. The Flashcards nav item is hidden for these tiers too
  // (see student-shell.tsx), so this redirect only fires if they type the
  // URL directly.
  if (userRank < tierRank("senior")) {
    redirect("/verbs");
  }

  // Flashcards: use only verbs the user can access (cumulative — their tier + below)
  const accessibleFilter = { minTier: { in: ["basic", "junior", "senior", "elite_senior"].filter((t) => tierRank(t) <= userRank) } };

  // Prioritize difficult verbs, then unlearned, then fillers.
  const [difficult, unlearned, totalVerbs] = await Promise.all([
    db.verb.findMany({
      where: { progress: { some: { profileId: user.id, status: "difficult" } }, ...accessibleFilter },
      take: 8,
      orderBy: { v1: "asc" },
      select: SELECT,
    }),
    db.verb.findMany({
      where: { NOT: { progress: { some: { profileId: user.id, status: "learned" } } }, ...accessibleFilter },
      take: 60,
      orderBy: { v1: "asc" },
      select: SELECT,
    }),
    db.verb.count({ where: accessibleFilter }),
  ]);

  const pick = shuffle(unlearned).slice(0, 12);
  const merged: Flashcard[] = [];
  const seen = new Set<string>();
  for (const v of [...shuffle(difficult), ...pick]) {
    if (!seen.has(v.id)) {
      seen.add(v.id);
      merged.push(v);
    }
  }
  if (merged.length < DECK_SIZE && totalVerbs > merged.length) {
    const fillers = await db.verb.findMany({
      where: { id: { notIn: [...seen] }, ...accessibleFilter },
      take: DECK_SIZE * 2,
      orderBy: { v1: "asc" },
      select: SELECT,
    });
    for (const v of shuffle(fillers)) {
      if (merged.length >= DECK_SIZE) break;
      merged.push(v);
    }
  }

  const deck = shuffle(merged).slice(0, DECK_SIZE);

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Flashcards
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            A {deck.length}-verb session. Recall, flip, then tell us how you did.
          </p>
        </div>
      </div>

      <div className="mt-8">
        {deck.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-12 text-center">
            <p className="font-medium text-foreground">No verbs available.</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try importing verbs (admin) or check back later.
            </p>
          </div>
        ) : (
          <FlashcardDeck deck={deck} />
        )}
      </div>

      <div className="mt-8 flex justify-center">
        <Button asChild variant="outline">
          <Link href="/verbs">Browse all verbs</Link>
        </Button>
      </div>
    </div>
  );
}

const SELECT = {
  id: true,
  v1: true,
  v2: true,
  v3: true,
  meaning: true,
  v2Alts: true,
  v3Alts: true,
} as const;
