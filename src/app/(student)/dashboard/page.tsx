import Link from "next/link";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import {
  BookA,
  GraduationCap,
  ListChecks,
  BarChart3,
  ArrowRight,
  Flame,
  Trophy,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = (await getCurrentUser())!;

  const [totalVerbs, learned, difficult, attempts, recentAttempts] = await Promise.all([
    db.verb.count(),
    db.studentVerbProgress.count({ where: { profileId: user.id, status: "learned" } }),
    db.studentVerbProgress.count({ where: { profileId: user.id, status: "difficult" } }),
    db.testAttempt.findMany({
      where: { profileId: user.id },
      select: { percentage: true },
    }),
    db.testAttempt.findMany({
      where: { profileId: user.id },
      orderBy: { completedAt: "desc" },
      take: 5,
      select: { id: true, type: true, category: true, percentage: true, correct: true, total: true, completedAt: true },
    }),
  ]);

  const testsCompleted = attempts.length;
  const avgScore =
    testsCompleted > 0
      ? Math.round(attempts.reduce((s, a) => s + a.percentage, 0) / testsCompleted)
      : 0;

  const firstName = user.name.split(" ")[0] || "there";

  return (
    <div className="mx-auto max-w-6xl">
      {/* Greeting */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Welcome back, {firstName}.</p>
          <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Your verb progress
          </h1>
        </div>
        <Button asChild>
          <Link href="/tests/mcq">
            Take a test <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>

      {/* Stat grid */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={BookA}
          label="Verbs learned"
          value={learned.toLocaleString()}
          sub={`of ${totalVerbs.toLocaleString()}`}
          tone="navy"
        />
        <StatCard
          icon={Flame}
          label="Difficult verbs"
          value={difficult.toLocaleString()}
          sub="marked for review"
          tone="gold"
        />
        <StatCard
          icon={ListChecks}
          label="Tests completed"
          value={testsCompleted.toLocaleString()}
          sub="across all categories"
          tone="emerald"
        />
        <StatCard
          icon={TrendingUp}
          label="Average score"
          value={`${avgScore}%`}
          sub={testsCompleted ? `${testsCompleted} tests` : "no tests yet"}
          tone="emerald"
        />
      </div>

      {/* Two-column: quick actions + recent results */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Continue learning</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <QuickAction
                href="/learn"
                icon={GraduationCap}
                title="Flashcards"
                body="Flip through verbs and tell us which you know."
              />
              <QuickAction
                href="/verbs"
                icon={BookA}
                title="Browse verbs"
                body="Search, filter, favorite, and mark verbs learned or difficult."
              />
              <QuickAction
                href="/tests/mcq"
                icon={ListChecks}
                title="MCQ test"
                body="Choose a category and length, then test yourself."
              />
              <QuickAction
                href="/results"
                icon={BarChart3}
                title="Your results"
                body="Review past tests and see where to improve."
              />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent results</CardTitle>
          </CardHeader>
          <CardContent>
            {recentAttempts.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
                <Trophy className="size-8 text-muted-foreground/40" />
                <p className="text-sm text-muted-foreground">
                  No tests yet. Take your first MCQ test to see results here.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link href="/tests/mcq">Start a test</Link>
                </Button>
              </div>
            ) : (
              <ul className="space-y-3">
                {recentAttempts.map((a) => (
                  <li key={a.id}>
                    <Link
                      href={`/results?attempt=${a.id}`}
                      className="flex items-center justify-between gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-accent"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">
                          {labelFor(a.category)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {a.correct}/{a.total} correct
                        </p>
                      </div>
                      <ScoreBadge pct={a.percentage} />
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  tone,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  sub: string;
  tone: "navy" | "emerald" | "gold";
}) {
  const tones = {
    navy: "bg-brand-navy text-white",
    emerald: "bg-accent text-brand-emerald-deep",
    gold: "bg-amber-50 text-amber-700",
  };
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-3">
          <span className={`inline-flex size-10 items-center justify-center rounded-lg ${tones[tone]}`}>
            <Icon className="size-5" />
          </span>
          <div>
            <p className="text-xs font-medium text-muted-foreground">{label}</p>
            <p className="font-display text-2xl font-semibold text-foreground">{value}</p>
          </div>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">{sub}</p>
      </CardContent>
    </Card>
  );
}

function QuickAction({
  href,
  icon: Icon,
  title,
  body,
}: {
  href: string;
  icon: React.ElementType;
  title: string;
  body: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-2 rounded-lg border border-border bg-background p-4 transition-colors hover:border-brand-emerald/40 hover:bg-accent"
    >
      <span className="inline-flex size-9 items-center justify-center rounded-md bg-accent text-brand-emerald-deep">
        <Icon className="size-4.5" />
      </span>
      <p className="font-medium text-foreground">{title}</p>
      <p className="text-sm text-muted-foreground">{body}</p>
    </Link>
  );
}

function ScoreBadge({ pct }: { pct: number }) {
  const tone =
    pct >= 80 ? "bg-accent text-brand-emerald-deep" : pct >= 50 ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-700";
  return <span className={`rounded-md px-2.5 py-1 text-sm font-semibold ${tone}`}>{Math.round(pct)}%</span>;
}

function labelFor(category: string): string {
  const map: Record<string, string> = {
    "v1-to-v2": "MCQ · V1 → V2",
    "v1-to-v3": "MCQ · V1 → V3",
    "v2-to-v3": "MCQ · V2 → V3",
    meaning: "MCQ · Meaning",
    mixed: "MCQ · Mixed",
    random: "MCQ · Random",
  };
  return map[category] || `MCQ · ${category}`;
}
