import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { parseAlts } from "@/lib/verbs";
import { VerbActions } from "@/components/verb-actions";
import { SpeakButton } from "@/components/speak-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function VerbDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = (await getCurrentUser())!;
  const { id } = await params;

  const verb = await db.verb.findUnique({
    where: { id },
    include: {
      progress: { where: { profileId: user.id }, select: { status: true, timesReviewed: true } },
      favorites: { where: { profileId: user.id }, select: { id: true } },
    },
  });
  if (!verb) notFound();

  const [prev, next] = await Promise.all([
    db.verb.findFirst({
      where: { v1: { lt: verb.v1 } },
      orderBy: { v1: "desc" },
      select: { id: true, v1: true },
    }),
    db.verb.findFirst({
      where: { v1: { gt: verb.v1 } },
      orderBy: { v1: "asc" },
      select: { id: true, v1: true },
    }),
  ]);

  const st = (verb.progress[0]?.status || "new") as "new" | "learning" | "learned" | "difficult";
  const fav = verb.favorites.length > 0;
  const v2Alts = parseAlts(verb.v2Alts);
  const v3Alts = parseAlts(verb.v3Alts);

  const forms = [
    { key: "V1", value: verb.v1, alts: [] as string[] },
    { key: "V2", value: verb.v2, alts: v2Alts },
    { key: "V3", value: verb.v3, alts: v3Alts },
  ];

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/verbs"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Back to verbs
      </Link>

      {/* Hero card */}
      <Card className="mt-4 overflow-hidden">
        <div className="surface-cream border-b border-border px-4 py-8 sm:px-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-brand-emerald-deep">Verb</p>
              <h1 className="mt-1 font-display text-4xl font-semibold tracking-tight break-words text-foreground sm:text-5xl">
                {verb.v1}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <DiffBadge level={verb.difficulty} />
              <SpeakButton text={verb.v1} className="size-9 rounded-md border border-border bg-background px-2" label="Hear" />
            </div>
          </div>
        </div>
        <CardContent className="pt-6">
          <div className="grid gap-4 sm:grid-cols-3">
            {forms.map((f) => (
              <div key={f.key} className="rounded-xl border border-border bg-background p-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-muted-foreground">{f.key}</p>
                  <SpeakButton text={f.value} />
                </div>
                <p className="mt-2 font-display text-2xl font-semibold text-foreground">{f.value}</p>
                {f.alts.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {f.alts.map((a) => (
                      <span key={a} className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                        also: {a}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Meaning */}
          <div className="mt-6 rounded-xl border border-border bg-card p-5">
            <p className="text-xs font-semibold text-muted-foreground">Meaning</p>
            <p className="mt-1.5 text-lg text-foreground">{verb.meaning}</p>
          </div>

          {/* Meta */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Badge variant="outline" className="capitalize">{verb.source} source</Badge>
            <Badge variant="outline">{verb.confidence} confidence</Badge>
            {verb.progress[0]?.timesReviewed != null && (
              <Badge variant="outline">reviewed {verb.progress[0].timesReviewed}×</Badge>
            )}
          </div>

          {/* Actions */}
          <div className="mt-6 border-t border-border pt-6">
            <p className="text-sm font-medium text-foreground">Mark this verb</p>
            <div className="mt-3">
              <VerbActions verbId={verb.id} initialStatus={st} initialFavorited={fav} size="md" />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Use “Learned” for verbs you can recall instantly, “Difficult” for ones that trip you up.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Prev / next */}
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {prev ? (
          <Link
            href={`/verbs/${prev.id}`}
            className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-brand-emerald/40 hover:bg-accent"
          >
            <ChevronLeft className="size-4 text-muted-foreground group-hover:text-foreground" />
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Previous</p>
              <p className="truncate font-medium text-foreground">{prev.v1}</p>
            </div>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`/verbs/${next.id}`}
            className="group flex items-center justify-end gap-3 rounded-xl border border-border bg-card p-4 text-right transition-colors hover:border-brand-emerald/40 hover:bg-accent"
          >
            <div className="min-w-0">
              <p className="text-xs text-muted-foreground">Next</p>
              <p className="truncate font-medium text-foreground">{next.v1}</p>
            </div>
            <ChevronRight className="size-4 text-muted-foreground group-hover:text-foreground" />
          </Link>
        ) : (
          <span />
        )}
      </div>

      <div className="mt-6 flex justify-center">
        <Button asChild variant="outline">
          <Link href="/sentence-generator">Practice with the Sentence Generator</Link>
        </Button>
      </div>
    </div>
  );
}

function DiffBadge({ level }: { level: number }) {
  const map = {
    1: { label: "Easy", className: "bg-accent text-brand-emerald-deep" },
    2: { label: "Medium", className: "bg-amber-50 text-amber-700" },
    3: { label: "Hard", className: "bg-red-50 text-red-700" },
  } as const;
  const m = map[(level as 1 | 2 | 3) ?? 1] || map[1];
  return <Badge variant="outline" className={cn("border-transparent", m.className)}>{m.label}</Badge>;
}
