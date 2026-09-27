import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mic2, FileText, Video } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SpeechesPage() {
  const user = (await getCurrentUser())!;
  const speeches = await db.studentSpeech.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    select: {
      id: true,
      title: true,
      description: true,
      studentName: true,
      content: true,
      videoUrl: true,
      videoData: true,
      kind: true,
      createdAt: true,
    },
  });

  return (
    <div className="mx-auto max-w-4xl">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Student Speeches
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Speeches, poems, essays, and videos shared by your teacher at Segal Institute.
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
        <div className="mt-8 space-y-6">
          {speeches.map((s) => (
            <Card key={s.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className="capitalize">
                        {s.kind === "video" ? <Video className="mr-1 size-3" /> : <FileText className="mr-1 size-3" />}
                        {s.kind}
                      </Badge>
                      {s.studentName && (
                        <span className="text-sm text-muted-foreground">by {s.studentName}</span>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {new Date(s.createdAt).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}
                      </span>
                    </div>
                    <h2 className="mt-2 font-display text-xl font-semibold tracking-tight text-foreground">
                      {s.title}
                    </h2>
                    {s.description && (
                      <p className="mt-1 text-sm text-muted-foreground">{s.description}</p>
                    )}
                  </div>
                </div>

                {/* Video or text body */}
                {s.kind === "video" ? (
                  <div className="mt-4">
                    {s.videoUrl || s.videoData ? (
                      <VideoRenderer src={s.videoUrl || s.videoData || ""} title={s.title} />
                    ) : (
                      <p className="text-sm text-muted-foreground italic">Video unavailable.</p>
                    )}
                  </div>
                ) : (
                  s.content && (
                    <p dir="auto" className="prose-reading mt-4 whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                      {s.content}
                    </p>
                  )
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// Server-side wrapper that lazy-loads the client VideoPlayer component
import { VideoPlayer } from "@/components/video-player";

function VideoRenderer({ src, title }: { src: string; title: string }) {
  return <VideoPlayer src={src} title={title} />;
}
