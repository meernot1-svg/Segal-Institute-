import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, CalendarDays, GraduationCap, BookA, ListChecks, TrendingUp } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const user = (await getCurrentUser())!;

  const [learned, difficult, attempts, favorites] = await Promise.all([
    db.studentVerbProgress.count({ where: { profileId: user.id, status: "learned" } }),
    db.studentVerbProgress.count({ where: { profileId: user.id, status: "difficult" } }),
    db.testAttempt.findMany({ where: { profileId: user.id }, select: { percentage: true } }),
    db.favorite.count({ where: { profileId: user.id } }),
  ]);

  const tests = attempts.length;
  const avgScore = tests > 0 ? Math.round(attempts.reduce((s, a) => s + a.percentage, 0) / tests) : 0;
  const profile = await db.profile.findUnique({
    where: { id: user.id },
    select: { name: true, email: true, classGrade: true, createdAt: true, role: true },
  });

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        Profile
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Your account and learning summary.
      </p>

      {/* Identity card */}
      <Card className="mt-6">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <span className="flex size-16 items-center justify-center rounded-full bg-brand-navy font-display text-2xl font-semibold uppercase text-white">
              {user.name.charAt(0) || "S"}
            </span>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="font-display text-2xl font-semibold text-foreground">{user.name}</h2>
                <Badge variant="outline" className="capitalize">{user.role}</Badge>
              </div>
              <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                <p className="inline-flex items-center gap-2">
                  <Mail className="size-4" /> {user.email}
                </p>
                {profile?.classGrade && (
                  <p className="inline-flex items-center gap-2">
                    <GraduationCap className="size-4" /> {profile.classGrade}
                  </p>
                )}
                {profile && (
                  <p className="inline-flex items-center gap-2">
                    <CalendarDays className="size-4" /> Joined{" "}
                    {new Date(profile.createdAt).toLocaleDateString(undefined, {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                )}
              </div>
            </div>
          </div>
          <p className="mt-5 rounded-lg border border-border bg-muted/40 px-4 py-3 text-xs text-muted-foreground">
            Editing your name and class is part of a later phase. Your stats below
            update automatically as you learn.
          </p>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={BookA} label="Verbs learned" value={learned.toLocaleString()} />
        <Stat icon={ListChecks} label="Tests completed" value={tests.toLocaleString()} />
        <Stat icon={TrendingUp} label="Average score" value={`${avgScore}%`} />
        <Stat icon={GraduationCap} label="Favorites" value={favorites.toLocaleString()} />
      </div>

      {difficult > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Difficult verbs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              You've marked{" "}
              <span className="font-medium text-foreground">{difficult}</span> verb
              {difficult === 1 ? "" : "s"} as difficult. Review them with flashcards to
              strengthen your recall.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-10 items-center justify-center rounded-lg bg-accent text-brand-emerald-deep">
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
