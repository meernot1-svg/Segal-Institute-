import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { tierRank, tierLabel, TIER_LABELS, TIER_DOT_COLORS, type BadgeTier } from "@/lib/tiers";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { BookA, CheckCircle2, Zap, Layers, BookOpen, Clock, Type, MapPin, Repeat, Settings, GitBranch, MessageSquare, BarChart3, List, Lock } from "lucide-react";

export const dynamic = "force-dynamic";

type LessonSection = {
  heading: string;
  body: string;
  examples?: string[];
  table?: { headers: string[]; rows: string[][] };
};

type Lesson = {
  title: string;
  subtitle: string;
  icon: string;
  sections: LessonSection[];
};

// Import lesson data
import { BASIC_LESSONS } from "@/lib/basic-lessons-data";
import { JUNIOR_LESSONS } from "@/lib/junior-lessons-data";

const ICONS: Record<string, React.ElementType> = {
  BookA,
  CheckCircle2,
  Zap,
  Layers,
  BookOpen,
  Clock,
  Type,
  MapPin,
  Repeat,
  Settings,
  GitBranch,
  MessageSquare,
  BarChart3,
  List,
};

export default async function LessonsPage() {
  const user = (await getCurrentUser())!;
  const userRank = tierRank(user.badge);

  // Get ContentItem lessons from DB (admin-uploaded)
  const dbLessons = await db.contentItem.findMany({
    where: { type: "lesson", minTier: { in: ["basic", "junior", "senior", "elite_senior"].filter((t) => tierRank(t as BadgeTier) <= userRank) } },
    orderBy: { createdAt: "asc" },
    take: 50,
  });

  const canAccessJunior = userRank >= tierRank("junior");

  return (
    <div className="mx-auto max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Lessons
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Structured English lessons for your level.
          </p>
        </div>
        <span className={cn(
          "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
          "bg-accent text-brand-emerald-deep border-brand-emerald/30",
        )}>
          <span className={cn("size-1.5 rounded-full", TIER_DOT_COLORS[user.badge as BadgeTier] || TIER_DOT_COLORS.basic)} />
          {TIER_LABELS[user.badge as BadgeTier] || "Basic"}
        </span>
      </div>

      {/* Basic lessons section */}
      <div className="mt-8">
        <div className="mb-4 flex items-center gap-2">
          <span className={cn("size-2.5 rounded-full", TIER_DOT_COLORS.basic)} />
          <h2 className="font-display text-lg font-semibold text-foreground">Basic Lessons</h2>
          <span className="text-xs text-muted-foreground">— available to everyone</span>
        </div>
        <div className="space-y-6">
          {BASIC_LESSONS.map((lesson, idx) => (
            <LessonCard key={`basic-${idx}`} lesson={lesson} index={idx} />
          ))}
        </div>
      </div>

      {/* Junior lessons section */}
      {canAccessJunior ? (
        <div className="mt-10">
          <div className="mb-4 flex items-center gap-2">
            <span className={cn("size-2.5 rounded-full", TIER_DOT_COLORS.junior)} />
            <h2 className="font-display text-lg font-semibold text-foreground">Junior Lessons</h2>
            <span className="text-xs text-muted-foreground">— English Grammar Workbook</span>
          </div>
          <div className="space-y-6">
            {JUNIOR_LESSONS.map((lesson, idx) => (
              <LessonCard key={`junior-${idx}`} lesson={lesson} index={idx} />
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-10 rounded-xl border border-border bg-surface-cream p-6">
          <div className="flex items-center gap-3">
            <Lock className="size-5 text-muted-foreground" />
            <h3 className="font-display text-lg font-semibold text-foreground">Junior Grammar Workbook</h3>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            The Junior Grammar Workbook covers tenses, articles, prepositions, active/passive voice,
            modal verbs, conditionals, reported speech, degrees of comparison, and parts of speech.
            Unlock these lessons by getting promoted to the <strong>Junior</strong> badge.
          </p>
          <p className="mt-2 text-xs text-muted-foreground">Ask your teacher to promote your badge.</p>
        </div>
      )}

      {/* DB-stored lessons (admin-uploaded) */}
      {dbLessons.length > 0 && (
        <div className="mt-10">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">Additional Lessons</h2>
          <div className="mt-4 space-y-6">
            {dbLessons.map((item) => (
              <div key={item.id} className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-display text-xl font-semibold text-foreground">{item.word}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground" dangerouslySetInnerHTML={{ __html: item.meaning }} />
                {item.meaningUr && (
                  <p className="mt-1 text-sm text-muted-foreground" dir="auto">{item.meaningUr}</p>
                )}
                {item.example && (
                  <p className="mt-2 text-xs text-muted-foreground italic">{item.example}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upsell for higher tiers */}
      {userRank < tierRank("elite_senior") && (
        <div className="mt-10 rounded-xl border border-border bg-surface-cream p-6">
          <h3 className="font-display text-lg font-semibold text-foreground">More lessons at higher badges</h3>
          <div className="mt-3 space-y-2 text-sm text-muted-foreground">
            {(["senior", "elite_senior"] as BadgeTier[]).map((t) => {
              if (tierRank(t) <= userRank) return null;
              return (
                <div key={t} className="flex items-center gap-2">
                  <span className={cn("size-2 rounded-full", TIER_DOT_COLORS[t])} />
                  <span>
                    <strong>{TIER_LABELS[t]}</strong> badge unlocks more advanced lessons
                    {t === "elite_senior" && " (coming soon)"}
                  </span>
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Ask your teacher to promote your badge to unlock more lessons.
          </p>
        </div>
      )}
    </div>
  );
}

function LessonCard({ lesson, index }: { lesson: Lesson; index: number }) {
  const Icon = ICONS[lesson.icon] || BookOpen;
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      {/* Header */}
      <div className="surface-cream border-b border-border px-6 py-5">
        <div className="flex items-center gap-3">
          <span className="inline-flex size-11 items-center justify-center rounded-xl bg-brand-navy text-white">
            <Icon className="size-5" />
          </span>
          <div>
            <p className="text-xs font-medium text-brand-emerald-deep">Lesson {index + 1}</p>
            <h2 className="font-display text-xl font-semibold tracking-tight text-foreground">{lesson.title}</h2>
            <p className="text-sm text-muted-foreground">{lesson.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="px-6 py-5 space-y-6">
        {lesson.sections.map((section, sIdx) => (
          <div key={sIdx}>
            <h3 className="font-display text-lg font-semibold text-foreground">{section.heading}</h3>
            <p
              className="mt-2 text-sm leading-relaxed text-muted-foreground"
              dangerouslySetInnerHTML={{ __html: section.body }}
            />

            {/* Examples */}
            {section.examples && section.examples.length > 0 && (
              <div className="mt-3 space-y-1.5">
                {section.examples.map((ex, eIdx) => (
                  <div key={eIdx} className="flex items-start gap-2 rounded-lg bg-muted/40 px-3 py-2">
                    <span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-brand-emerald" />
                    <p className="text-sm text-foreground" dangerouslySetInnerHTML={{ __html: ex }} />
                  </div>
                ))}
              </div>
            )}

            {/* Table */}
            {section.table && section.table.rows.length > 0 && (
              <div className="mt-3 overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-sm">
                  <thead className="bg-muted/60">
                    <tr>
                      {section.table.headers.map((h, hIdx) => (
                        <th key={hIdx} className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-card">
                    {section.table.rows.map((row, rIdx) => (
                      <tr key={rIdx}>
                        {row.map((cell, cIdx) => (
                          <td key={cIdx} className={cn("px-4 py-2.5", cIdx === 0 ? "font-medium text-foreground" : "text-muted-foreground")}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
