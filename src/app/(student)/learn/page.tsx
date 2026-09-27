import Link from "next/link";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { shuffle } from "@/lib/verbs";
import { canAccessTier, tierRank, tierLabel } from "@/lib/tiers";
import { FlashcardDeck, type Flashcard } from "@/components/flashcard-deck";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

export const dynamic = "force-dynamic";

const DECK_SIZE = 20;

export default async function LearnPage() {
  const user = (await getCurrentUser())!;
  const userRank = tierRank(user.badge);

  // Flashcards are only for Senior and Elite Senior badge holders
  if (userRank < tierRank("senior")) {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-12 text-center">
          <Lock className="size-12 text-muted-foreground/40" />
          <div>
            <h1 className="font-display text-2xl font-semibold text-foreground">Flashcards are locked</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Flashcards are available at the <strong>Senior</strong> tier and above.
              Your current badge is <strong>{tierLabel(user.badge)}</strong>.
              Ask your teacher to promote you to unlock flashcards.
            </p>
          </div>
        </div>
      </div>
    );
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
