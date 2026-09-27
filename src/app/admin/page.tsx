import Link from "next/link";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { todayISO, monthKey } from "@/lib/format";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookA, ListChecks, TrendingUp, CalendarDays, ArrowRight, Receipt, Mic2, FileText, Trophy } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  await getCurrentUser(); // layout already guards role

  const [totalStudents, totalVerbs, totalTests, attempts, todaysTopic, unpaidFees, monthlyFees] = await Promise.all([
    db.profile.count({ where: { role: "student" } }),
    db.verb.count(),
    db.testAttempt.count(),
    db.testAttempt.findMany({ select: { percentage: true } }),
    db.dailyTopic.findUnique({ where: { date: todayISO() }, select: { id: true, title: true, body: true } }),
    db.fee.findMany({ where: { paid: false }, select: { amount: true } }),
    db.fee.findMany({ where: { periodKey: monthKey() }, select: { amount: true, paid: true } }),
  ]);

  const avgScore = attempts.length > 0 ? Math.round(attempts.reduce((s, a) => s + a.percentage, 0) / attempts.length) : 0;
  const totalDue = unpaidFees.reduce((s, f) => s + f.amount, 0);
  const monthlyCollected = monthlyFees.filter((f) => f.paid).reduce((s, f) => s + f.amount, 0);
  const monthlyOutstanding = monthlyFees.filter((f) => !f.paid).reduce((s, f) => s + f.amount, 0);

  return (
    <div className="mx-auto max-w-6xl">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Admin Dashboard
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">Segal Institute — overview of students, content, and fees.</p>
      </div>

      {/* Stat grid */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} label="Total students" value={totalStudents.toLocaleString()} />
        <StatCard icon={BookA} label="Verbs in library" value={totalVerbs.toLocaleString()} />
        <StatCard icon={ListChecks} label="Tests completed" value={totalTests.toLocaleString()} />
        <StatCard icon={TrendingUp} label="Avg score" value={`${avgScore}%`} />
      </div>

      {/* Today's topic */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="size-4" /> Today's topic
            <span className="ml-auto text-sm font-normal text-muted-foreground">{todayISO()}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {todaysTopic ? (
            <div>
              <p className="font-display text-xl font-semibold text-foreground">{todaysTopic.title}</p>
              <p className="prose-reading mt-2 whitespace-pre-wrap text-sm text-muted-foreground">{todaysTopic.body}</p>
            </div>
          ) : (
            <div className="flex flex-col items-start gap-3">
              <p className="text-sm text-muted-foreground">No topic set for today.</p>
              <Link href="/admin/topics" className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-emerald-deep hover:underline">
                Set today's topic <ArrowRight className="size-3.5" />
              </Link>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Fees summary */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="size-4" /> Fees — this month ({monthKey()})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-border p-4">
              <p className="text-xs text-muted-foreground">Collected</p>
              <p className="mt-1 font-display text-2xl font-semibold text-brand-emerald-deep">{fmt(monthlyCollected)}</p>
            </div>
            <div className="rounded-lg border border-border p-4">
              <p className="text-xs text-muted-foreground">Outstanding (this month)</p>
              <p className="mt-1 font-display text-2xl font-semibold text-amber-700">{fmt(monthlyOutstanding)}</p>
            </div>
            <div className="rounded-lg border border-border p-4">
              <p className="text-xs text-muted-foreground">Total outstanding (all)</p>
              <p className="mt-1 font-display text-2xl font-semibold text-foreground">{fmt(totalDue)}</p>
            </div>
          </div>
          <div className="mt-4">
            <Link href="/admin/fees" className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-emerald-deep hover:underline">
              Manage fees <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Quick links */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <QuickLink href="/admin/students" icon={Users} title="Students" body="View, delete, reset passwords, and assign fees." />
        <QuickLink href="/admin/topics" icon={CalendarDays} title="Daily topics" body="Set what students see each day." />
        <QuickLink href="/admin/speeches" icon={Mic2} title="Student Speeches" body="Publish speeches, poems & essays for students to read." />
        <QuickLink href="/admin/results" icon={FileText} title="Monthly Results" body="Write notes; AI generates polished result cards." />
        <QuickLink href="/admin/best-student" icon={Trophy} title="Best Student" body="Feature the best student of the month on every dashboard." />
        <QuickLink href="/admin/fees" icon={Receipt} title="Fees" body="Track who's paid and who hasn't." />
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-10 items-center justify-center rounded-lg bg-brand-navy text-white">
            <Icon className="size-5" />
          </span>
          <div>
            <p className="text-xs font-medium text-muted-foreground">{label}</p>
            <p className="font-display text-2xl font-semibold text-foreground">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function QuickLink({ href, icon: Icon, title, body }: { href: string; icon: React.ElementType; title: string; body: string }) {
  return (
    <Link href={href} className="group flex flex-col gap-2 rounded-xl border border-border bg-card p-5 transition-colors hover:border-brand-emerald/40 hover:bg-accent">
      <span className="inline-flex size-9 items-center justify-center rounded-md bg-accent text-brand-emerald-deep">
        <Icon className="size-4.5" />
      </span>
      <p className="font-medium text-foreground">{title}</p>
      <p className="text-sm text-muted-foreground">{body}</p>
    </Link>
  );
}

function fmt(n: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}
