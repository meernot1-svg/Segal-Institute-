import { getCurrentUser } from "@/lib/auth";
import { tierRank, tierLabel } from "@/lib/tiers";
import { McqTest } from "@/components/mcq-test";
import { Lock } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function McqTestPage() {
  const user = (await getCurrentUser())!;

  // Tests work for everyone — they use only verbs the user can access.
  // The MCQ API filters by minTier server-side.
  // (Basic users get basic-tier verbs, Junior users get basic+junior, etc.)
  // If the user has rank 0 (somehow), show the locked screen.
  if (tierRank(user.badge) < 1) {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-12 text-center">
          <Lock className="size-12 text-muted-foreground/40" />
          <div>
            <h1 className="font-display text-2xl font-semibold text-foreground">Tests are locked</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              No verbs are available at your current badge level (<strong>{tierLabel(user.badge)}</strong>).
              Ask your teacher to promote you.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl">
      <McqTest />
    </div>
  );
}
