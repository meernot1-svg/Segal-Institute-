import Link from "next/link";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Check, X, Clock, ArrowLeft, ListChecks } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ attempt?: string }>;
}) {
  const user = (await getCurrentUser())!;
  const sp = await searchParams;
  const attemptId = sp.attempt;

  if (attemptId) {
    const attempt = await db.testAttempt.findFirst({
      where: { id: attemptId, profileId: user.id },
      include: { answers: { orderBy: { id: "asc" } } },
    });
    if (!attempt) {
      return (
        <div className="mx-auto max-w-2xl">
          <Card>
            <CardContent className="py-10 text-center">
              <p className="font-medium text-foreground">That result wasn't found.</p>
              <Button asChild variant="outline" className="mt-4">
                <Link href="/results">Back to results</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    return (
      <div className="mx-auto max-w-2xl">
        <Link
          href="/results"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" /> All results
        </Link>
        <Card className="mt-4 overflow-hidden">
          <div className="surface-cream px-6 py-8 text-center">
            <p className="font-display text-5xl font-semibold tracking-tight text-foreground">
              {attempt.percentage}%
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {attempt.correct} of {attempt.total} correct · {fmt(attempt.timeSpentSec)} · {labelForCat(attempt.category)}
            </p>
          </div>
          <CardContent className="pt-6">
            <p className="font-medium text-foreground">Review</p>
            <div className="mt-4 space-y-3">
              {attempt.answers.map((a) => (
                <div
                  key={a.id}
                  className={cn(
                    "rounded-xl border bg-card p-4",
                    a.isCorrect ? "border-brand-emerald/40" : "border-red-300/60"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={cn(
                        "mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full text-white",
                        a.isCorrect ? "bg-brand-emerald" : "bg-red-500"
                      )}
                    >
                      {a.isCorrect ? <Check className="size-3.5" /> : <X className="size-3.5" />}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-muted-foreground">
                        {labelForType(a.questionType)}
                      </p>
                      <p className="mt-0.5 font-medium text-foreground">{a.prompt}</p>
                      <div className="mt-2 grid gap-1 text-sm">
                        <p className={a.isCorrect ? "text-brand-emerald-deep" : "text-red-700"}>
                          <span className="text-muted-foreground">Your answer: </span>
                          {a.userAnswer || "—"}
                        </p>
                        {!a.isCorrect && (
                          <p className="text-brand-emerald-deep">
                            <span className="text-muted-foreground">Correct: </span>
                            {a.correctAnswer}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-center">
              <Button asChild variant="outline">
                <Link href="/tests/mcq">Take another test</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // List view
  const attempts = await db.testAttempt.findMany({
    where: { profileId: user.id },
    orderBy: { completedAt: "desc" },
    take: 100,
  });

  return (
    <div className="mx-auto max-w-5xl">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Results
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Your test history. Tap a result to review every answer.
          </p>
        </div>
        <Button asChild>
          <Link href="/tests/mcq">
            <ListChecks className="size-4" /> New test
          </Link>
        </Button>
      </div>

      {attempts.length === 0 ? (
        <div className="mt-8 rounded-xl border border-border bg-card p-12 text-center">
          <p className="font-medium text-foreground">No tests yet.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Take your first MCQ test to start building a history.
          </p>
          <Button asChild className="mt-4">
            <Link href="/tests/mcq">Start a test</Link>
          </Button>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="mt-6 hidden overflow-hidden rounded-xl border border-border md:block">
            <table className="w-full text-sm">
              <thead className="bg-muted/60 text-left">
                <tr className="text-xs text-muted-foreground">
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Score</th>
                  <th className="px-4 py-3 font-medium">Time</th>
                  <th className="px-4 py-3 text-right font-medium">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-card">
                {attempts.map((a) => (
                  <tr key={a.id} className="group">
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(a.completedAt).toLocaleString(undefined, {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline">{labelForCat(a.category)}</Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {a.correct}/{a.total}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="size-3.5" /> {fmt(a.timeSpentSec)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/results?attempt=${a.id}`}
                        className={cn(
                          "inline-flex min-w-14 justify-center rounded-md px-2.5 py-1 text-sm font-semibold",
                          a.percentage >= 80
                            ? "bg-accent text-brand-emerald-deep"
                            : a.percentage >= 50
                              ? "bg-amber-50 text-amber-700"
                              : "bg-red-50 text-red-700"
                        )}
                      >
                        {a.percentage}%
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="mt-6 grid gap-3 md:hidden">
            {attempts.map((a) => (
              <Link
                key={a.id}
                href={`/results?attempt=${a.id}`}
                className="flex items-center justify-between gap-3 rounded-xl border border-border bg-card p-4"
              >
                <div className="min-w-0">
                  <Badge variant="outline">{labelForCat(a.category)}</Badge>
                  <p className="mt-1.5 text-sm text-muted-foreground">
                    {new Date(a.completedAt).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                    {" · "}
                    {fmt(a.timeSpentSec)}
                  </p>
                  <p className="text-xs text-muted-foreground">{a.correct}/{a.total} correct</p>
                </div>
                <span
                  className={cn(
                    "inline-flex min-w-14 justify-center rounded-md px-2.5 py-1 text-sm font-semibold",
                    a.percentage >= 80
                      ? "bg-accent text-brand-emerald-deep"
                      : a.percentage >= 50
                        ? "bg-amber-50 text-amber-700"
                        : "bg-red-50 text-red-700"
                  )}
                >
                  {a.percentage}%
                </span>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function fmt(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function labelForType(type: string): string {
  const map: Record<string, string> = {
    "v1-to-v2": "V1 → V2",
    "v1-to-v3": "V1 → V3",
    "v2-to-v3": "V2 → V3",
    meaning: "Meaning",
  };
  return map[type] || type;
}

function labelForCat(category: string): string {
  const map: Record<string, string> = {
    "v1-to-v2": "V1 → V2",
    "v1-to-v3": "V1 → V3",
    "v2-to-v3": "V2 → V3",
    meaning: "Meaning",
    mixed: "Mixed",
    random: "Random verbs",
  };
  return map[category] || category;
}
