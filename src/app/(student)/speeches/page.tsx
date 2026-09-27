import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mic2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SpeechesPage() {
  const user = (await getCurrentUser())!;
  const speeches = await db.studentSpeech.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    select: { id: true, title: true, studentName: true, content: true, kind: true, createdAt: true },
  });

  return (
    <div className="mx-auto max-w-4xl">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Student Speeches
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Speeches, poems, and essays shared by your teacher from fellow students at Segal Institute.
        </p>
      </div>

      {speeches.length === 0 ? (
        <div className="mt-10 rounded-xl border border-border bg-card p-12 text-center">
          <Mic2 className="mx-auto size-8 text-muted-foreground/40" />
          <p className="mt-3 font-medium text-foreground">No speeches published yet.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Your teacher will publish student speeches here. Check back soon.
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {speeches.map((s) => (
            <Card key={s.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <Badge variant="outline" className="capitalize">{s.kind}</Badge>
                    <h2 className="mt-2 font-display text-xl font-semibold tracking-tight text-foreground">
                      {s.title}
                    </h2>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      by {s.studentName} · {new Date(s.createdAt).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}
                    </p>
                    <p dir="auto" className="prose-reading mt-4 whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                      {s.content}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
