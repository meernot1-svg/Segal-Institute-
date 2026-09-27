import Link from "next/link";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { todayISO } from "@/lib/format";
import { TIER_LABELS, TIER_COLORS, TIER_DOT_COLORS, type BadgeTier } from "@/lib/tiers";
import { cn } from "@/lib/utils";
import {
  BookA,
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
  MessageSquare,
  Mic2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DashboardCalendar } from "@/components/dashboard-calendar";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = (await getCurrentUser())!;

  // MCQ tests + Flashcards have been removed. We no longer query testAttempts
  // for "Tests done" / "Average score" stats and no longer query recentAttempts
  // for a "Recent results" sidebar. The dashboard now centers on:
  //   - today's topic
  //   - best student of the month
  //   - verb + attendance stats
  //   - quick actions (lessons, verbs, generators, speeches, results, profile)
  //   - the animated calendar with upcoming events
  const [totalVerbs, learned, difficult, todaysTopic, bestStudent, attendanceRecords] = await Promise.all([
    db.verb.count(),
    db.studentVerbProgress.count({ where: { profileId: user.id, status: "learned" } }),
    db.studentVerbProgress.count({ where: { profileId: user.id, status: "difficult" } }),
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

  const attTotal = attendanceRecords.length;
  const attPresent = attendanceRecords.filter((r) => r.present).length;
  const attPct = attTotal > 0 ? Math.round((attPresent / attTotal) * 100) : 0;

  const firstName = user.name.split(" ")[0] || "there";

  return (
    <div className="space-y-6">
      {/* Greeting */}
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
        <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-foreground">
          Your verb progress
        </h1>
      </div>

      {/* Today's topic (from admin) */}
      {todaysTopic && (
        <Card className="overflow-hidden border-brand-emerald/30">
          <div className="surface-cream px-5 py-4">
            <div className="flex items-center gap-2">
              <CalendarDays className="size-4 text-brand-emerald-deep" />
              <p className="text-xs font-medium text-brand-emerald-deep">
                Today&apos;s topic · {todaysTopic.date}
              </p>
            </div>
            <p className="mt-1.5 font-display text-xl font-semibold tracking-tight text-foreground">
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
        <Card className="overflow-hidden border-amber-300/50">
          <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center">
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
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
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
          icon={ClipboardCheck}
          label="Attendance"
          value={attTotal > 0 ? `${attPct}%` : "—"}
          sub={attTotal > 0 ? `${attPresent}/${attTotal} days` : "not marked yet"}
          tone="emerald"
        />
      </div>

      {/* Quick actions */}
      <Card>
        <CardHeader>
          <CardTitle>Continue learning</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3">
          <QuickAction
            href="/lessons"
            icon={BookA}
            title="Lessons"
            body="Structured English lessons for your level — Basic, Junior, and Senior workbooks."
          />
          <QuickAction
            href="/verbs"
            icon={BookA}
            title="Browse verbs"
            body="Search, filter, favorite, and mark verbs learned or difficult."
          />
          <QuickAction
            href="/sentence-generator"
            icon={MessageSquare}
            title="Sentence Generator"
            body="Generate original sentences on any topic, in any language."
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
            body="Generate an original poem or ghazal from a topic and mood."
          />
          <QuickAction
            href="/speeches"
            icon={Mic2}
            title="Student Speeches"
            body="Read speeches, poems, and essays shared by your teacher."
          />
          <QuickAction
            href="/monthly-results"
            icon={Trophy}
            title="My Monthly Results"
            body="Read your monthly result cards from your teacher."
          />
          <QuickAction
            href="/profile"
            icon={Sparkles}
            title="Your profile"
            body="Upload a photo, set your class, and see your fees."
          />
        </CardContent>
      </Card>

      {/* Animated calendar with upcoming events */}
      <div>
        <div className="mb-3 flex items-center gap-2">
          <CalendarDays className="size-4 text-brand-emerald-deep" />
          <h2 className="font-display text-lg font-semibold text-foreground">Calendar &amp; upcoming events</h2>
        </div>
        <DashboardCalendar />
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
      <CardContent className="pt-4">
        <div className="flex items-center gap-3">
          <span className={`inline-flex size-10 items-center justify-center rounded-lg ${tones[tone]}`}>
            <Icon className="size-5" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-muted-foreground">{label}</p>
            <p className="font-display text-xl font-semibold text-foreground">{value}</p>
          </div>
        </div>
        <p className="mt-2 truncate text-xs text-muted-foreground">{sub}</p>
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
      className="group flex min-h-16 flex-col gap-1 rounded-lg border border-border bg-background p-4 transition-all hover:-translate-y-0.5 hover:border-brand-emerald/40 hover:bg-accent hover:shadow-sm"
    >
      <div className="flex items-center gap-3">
        <span className="inline-flex size-9 items-center justify-center rounded-md bg-accent text-brand-emerald-deep transition-transform group-hover:scale-110">
          <Icon className="size-4.5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-medium text-foreground">{title}</p>
          <p className="line-clamp-2 text-xs text-muted-foreground">{body}</p>
        </div>
        <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-brand-emerald-deep" />
      </div>
    </Link>
  );
}
