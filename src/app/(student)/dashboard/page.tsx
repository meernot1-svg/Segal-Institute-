import Link from "next/link";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { todayISO } from "@/lib/format";
import { TIER_LABELS, TIER_COLORS, TIER_DOT_COLORS, type BadgeTier } from "@/lib/tiers";
import { cn } from "@/lib/utils";
import {
  BookA,
  GraduationCap,
  ListChecks,
  BarChart3,
  ArrowRight,
  Flame,
  Trophy,
  TrendingUp,
  CalendarDays,
  Sparkles,
  Bot,
  Mic,
  PenTool,
  ClipboardCheck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = (await getCurrentUser())!;

  const [totalVerbs, learned, difficult, attempts, recentAttempts, todaysTopic, bestStudent, attendanceRecords] = await Promise.all([
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
    db.dailyTopic.findUnique({
      where: { date: todayISO() },
      select: { id: true, title: true, body: true, date: true },
    }),
    db.bestStudent.findFirst({
      where: { active: true },
      orderBy: { month: "desc" },
      select: { id: true, name: true, photo: true, month: true, blurb: true },
    }),
    db.attendance.findMany({
      where: { studentId: user.id },
      orderBy: { date: "desc" },
      take: 90,
      select: { present: true },
    }),
  ]);

  const testsCompleted = attempts.length;
  const avgScore =
    testsCompleted > 0
      ? Math.round(attempts.reduce((s, a) => s + a.percentage, 0) / testsCompleted)
      : 0;

  const attTotal = attendanceRecords.length;
  const attPresent = attendanceRecords.filter((r) => r.present).length;
  const attPct = attTotal > 0 ? Math.round((attPresent / attTotal) * 100) : 0;

  const firstName = user.name.split(" ")[0] || "there";

  return (
    <div className="mx-auto max-w-6xl">
      {/* Greeting */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">Welcome back, {firstName}.</p>
            <span className={cn(
              "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
              TIER_COLORS[user.badge as BadgeTier] || TIER_COLORS.basic,
            )}>
              <span className={cn("size-1.5 rounded-full", TIER_DOT_COLORS[user.badge as BadgeTier] || TIER_DOT_COLORS.basic)} />
              {TIER_LABELS[user.badge as BadgeTier] || "Basic"}
            </span>
          </div>
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

      {/* Today's topic (from admin) */}
      {todaysTopic && (
        <Card className="mt-6 overflow-hidden border-brand-emerald/30">
          <div className="surface-cream px-5 py-4 sm:px-6">
            <div className="flex items-center gap-2">
              <CalendarDays className="size-4 text-brand-emerald-deep" />
              <p className="text-xs font-medium text-brand-emerald-deep">
                Today's topic · {todaysTopic.date}
              </p>
            </div>
            <p className="mt-1.5 font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
              {todaysTopic.title}
            </p>
          </div>
          <CardContent className="pt-4">
            <p dir="auto" className="prose-reading whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
              {todaysTopic.body}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Best Student of the Month (from admin) */}
      {bestStudent && (
        <Card className="mt-6 overflow-hidden border-amber-300/50">
          <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:p-6">
            <img
              src={bestStudent.photo}
              alt={`${bestStudent.name}, Best Student of the Month ${bestStudent.month}`}
              className="mx-auto size-20 shrink-0 rounded-full border-2 border-amber-300 object-cover sm:mx-0 sm:size-24"
            />
            <div className="flex-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-2">
                <Trophy className="size-4 text-amber-600" />
                <p className="text-xs font-medium text-amber-700">Best Student of the Month · {bestStudent.month}</p>
              </div>
              <p className="mt-1.5 font-display text-2xl font-semibold tracking-tight text-foreground">
                {bestStudent.name}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{bestStudent.blurb}</p>
            </div>
          </div>
        </Card>
      )}

      {/* Stat grid */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
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
          label="Tests done"
          value={testsCompleted.toLocaleString()}
          sub="all categories"
          tone="emerald"
        />
        <StatCard
          icon={TrendingUp}
          label="Average score"
          value={`${avgScore}%`}
          sub={testsCompleted ? `${testsCompleted} tests` : "no tests yet"}
          tone="emerald"
        />
        <StatCard
          icon={ClipboardCheck}
          label="Attendance"
          value={attTotal > 0 ? `${attPct}%` : "—"}
          sub={attTotal > 0 ? `${attPresent}/${attTotal} days` : "not marked yet"}
          tone="navy"
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
              <QuickAction
                href="/chat"
                icon={Bot}
                title="AI Tutor"
                body="Ask anything about verbs, grammar, or usage."
              />
              <QuickAction
                href="/speech-generator"
                icon={Mic}
                title="Speech Generator"
                body="Turn a topic into a structured original speech."
              />
              <QuickAction
                href="/poetry-generator"
                icon={PenTool}
                title="Poetry Generator"
                body="Generate an original poem from a topic and mood."
              />
              <QuickAction
                href="/profile"
                icon={Sparkles}
                title="Your profile"
                body="Upload a photo, set your class, and see your fees."
              />
              <QuickAction
                href="/speeches"
                icon={Mic}
                title="Student Speeches"
                body="Read speeches, poems, and essays shared by your teacher."
              />
              <QuickAction
                href="/monthly-results"
                icon={Trophy}
                title="My Monthly Results"
                body="Read your monthly result cards from your teacher."
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
