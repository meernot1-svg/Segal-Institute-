import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function MonthlyResultsPage() {
  // Auth check (route is protected, but this also lets us render the user's name)
  await getCurrentUser();

  // Shared monthly result images — same for every student
  const images = await db.monthlyResultImage.findMany({
    orderBy: { month: "desc" },
    take: 24,
    select: { id: true, title: true, month: true, imageUrl: true, createdAt: true },
  });

  return (
    <div className="mx-auto max-w-4xl">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          My Monthly Results
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Your monthly result sheets, uploaded by your teacher at Segal Institute.
        </p>
      </div>

      {images.length === 0 ? (
        <div className="mt-10 rounded-xl border border-border bg-card p-12 text-center">
          <FileText className="mx-auto size-8 text-muted-foreground/40" />
          <p className="mt-3 font-medium text-foreground">No result images yet.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            When your teacher uploads a monthly result image, it will appear here.
          </p>
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          {images.map((img) => (
            <Card key={img.id}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3">
                  <FileText className="size-5 text-brand-emerald-deep" />
                  <h2 className="min-w-0 flex-1 font-display text-lg font-semibold tracking-tight text-foreground break-words">
                    {img.title}
                  </h2>
                  <Badge variant="outline" className="ml-auto">{img.month}</Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {new Date(img.createdAt).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}
                </p>
                <img
                  src={img.imageUrl}
                  alt={`${img.title} — ${img.month}`}
                  className="mt-4 w-full rounded-lg border border-border"
                />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
