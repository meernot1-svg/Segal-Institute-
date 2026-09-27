import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function MonthlyResultsPage() {
  const user = (await getCurrentUser())!;
  const results = await db.monthlyResult.findMany({
    where: { studentId: user.id },
    orderBy: { periodKey: "desc" },
    take: 24,
    select: { id: true, periodKey: true, generatedCard: true, imageUrl: true, createdAt: true },
  });

  return (
    <div className="mx-auto max-w-4xl">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          My Monthly Results
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Your monthly result cards, written by your teacher and polished by AI.
        </p>
      </div>

      {results.length === 0 ? (
        <div className="mt-10 rounded-xl border border-border bg-card p-12 text-center">
          <FileText className="mx-auto size-8 text-muted-foreground/40" />
          <p className="mt-3 font-medium text-foreground">No result cards yet.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            When your teacher writes your monthly result, it will appear here.
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {results.map((r) => (
            <Card key={r.id}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <FileText className="size-5 text-brand-emerald-deep" />
                  <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
                    Result card · {r.periodKey}
                  </h2>
                  <Badge variant="outline" className="ml-auto">
                    {new Date(r.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                  </Badge>
                </div>
                <p dir="auto" className="prose-reading mt-4 whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                  {r.generatedCard}
                </p>
                {r.imageUrl && (
                  <details className="mt-4">
                    <summary className="cursor-pointer text-xs text-muted-foreground">View original result sheet</summary>
                    <img src={r.imageUrl} alt={`Original result sheet for ${r.periodKey}`} className="mt-2 max-h-96 w-full rounded-lg border border-border object-contain" />
                  </details>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
