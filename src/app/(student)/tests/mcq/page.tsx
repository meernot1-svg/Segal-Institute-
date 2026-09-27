import { getCurrentUser } from "@/lib/auth";
import { canAccessTier, tierLabel } from "@/lib/tiers";
import { McqTest } from "@/components/mcq-test";
import { Lock } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function McqTestPage() {
  const user = (await getCurrentUser())!;

  if (!canAccessTier(user.badge, "senior")) {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-12 text-center">
          <Lock className="size-12 text-muted-foreground/40" />
          <div>
            <h1 className="font-display text-2xl font-semibold text-foreground">MCQ Tests are locked</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              MCQ tests use the verb library, which is available at the <strong>Senior</strong> tier and above.
              Your current badge is <strong>{tierLabel(user.badge)}</strong>.
              Ask your teacher to promote you to unlock tests.
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
