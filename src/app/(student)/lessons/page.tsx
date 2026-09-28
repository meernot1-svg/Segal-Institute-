import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { tierRank, tierLabel, TIER_LABELS, TIER_DOT_COLORS, type BadgeTier } from "@/lib/tiers";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { BookA, CheckCircle2, Zap, Layers, BookOpen, Clock, Type, MapPin, Repeat, Settings, GitBranch, MessageSquare, BarChart3, List, Lock } from "lucide-react";
import { GeneratorShell } from "@/components/generator-shell";
import { LESSON_DROPDOWN_OPTIONS } from "@/lib/lesson-options";

export const dynamic = "force-dynamic";

type LessonSection = {
  heading: string;
  body: string;
  examples?: string[];
  /**
   * Parallel trilingual translations of `examples` — same length, same order.
   * Each entry has the English (en), Urdu (ur, RTL), and Sindhi (sd, RTL)
   * versions of the same example sentence so students see all three.
   */
  examplesTr?: { en: string; ur: string; sd: string }[];
  table?: { headers: string[]; rows: string[][] };
};

type Lesson = {
  title: string;
  subtitle: string;
  icon: string;
  sections: LessonSection[];
  /**
   * Key terms / words introduced in this lesson, each with its Urdu and
   * Sindhi translation. Rendered as a "Words in this lesson" card so students
   * see the trilingual meaning of every new term.
   */
  vocabulary?: { term: string; ur: string; sd: string }[];
};

// Import lesson data
import { BASIC_LESSONS } from "@/lib/basic-lessons-data";
import { JUNIOR_LESSONS } from "@/lib/junior-lessons-data";
import { SENIOR_LESSONS } from "@/lib/senior-lessons-data";

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
  const canAccessSenior = userRank >= tierRank("senior");

  return (
    <div className="mx-auto max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Lessons
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Structured English lessons for your level — explained in detail with example sentences in English, Urdu, and Sindhi. Each lesson ends with a "Words in this lesson" card showing key terms in all three languages.
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

      {/* Senior lessons section */}
      {canAccessSenior ? (
        <div className="mt-10">
          <div className="mb-4 flex items-center gap-2">
            <span className={cn("size-2.5 rounded-full", TIER_DOT_COLORS.senior)} />
            <h2 className="font-display text-lg font-semibold text-foreground">Senior Lessons</h2>
            <span className="text-xs text-muted-foreground">— 42 Advanced Grammar Lessons</span>
          </div>
          <div className="space-y-6">
            {SENIOR_LESSONS.map((lesson, idx) => (
              <LessonCard key={`senior-${idx}`} lesson={lesson} index={idx} />
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-10 rounded-xl border border-border bg-surface-cream p-6">
          <div className="flex items-center gap-3">
            <Lock className="size-5 text-muted-foreground" />
            <h3 className="font-display text-lg font-semibold text-foreground">Senior Grammar Workbook</h3>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            The Senior Grammar Workbook covers 42 advanced grammar lessons including: Mind If,
            What If, Unless, Either…Or, Neither…Nor, As Well As, Lest, As If/As Though,
            No Sooner…Than, Hardly/Scarcely/Barely, Not Only…But Also, In Spite Of, Despite,
            As Soon As, While, May/Might, Though/Although, Provided That, Having,
            Let/Let's, all five Conditionals (Zero through Mixed), Had Better,
            Exclamatory and Optative Sentences, and a master pattern review.
          </p>
          <p className="mt-2 text-xs text-muted-foreground">Ask your teacher to promote your badge to <strong>Senior</strong> to unlock these lessons.</p>
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

      {/* Sentence Generator — embedded in the Lessons page so students can
          practice the grammar concepts they just read about. The anchor
          #practice is what /lessons#practice scrolls to. */}
      <div id="practice" className="mt-12 scroll-mt-20">
        <div className="mb-4 flex items-center gap-2">
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-brand-navy text-white">
            <MessageSquare className="size-5" />
          </span>
          <div>
            <h2 className="font-display text-xl font-semibold tracking-tight text-foreground">Practice sentences</h2>
            <p className="text-xs text-muted-foreground">Pick a lesson above and get practice sentences on it — in Urdu, Sindhi, English, or any language.</p>
          </div>
        </div>
        <GeneratorShell
          title="Sentence Generator"
          subtitle="Pick a lesson below and get practice sentences on it — in Urdu, Sindhi, English, or any other language. You can also type your own topic instead."
          endpoint="/api/sentence-generator"
          fields={[
            {
              key: "lesson",
              label: "Lesson (optional — pick a lesson to get practice sentences on it)",
              type: "select",
              options: ["(no lesson — use my own topic)", ...LESSON_DROPDOWN_OPTIONS],
            },
            {
              key: "topic",
              label: "Topic (or leave blank if you picked a lesson above)",
              placeholder: "e.g. The importance of trees, کرنسی کی کمی, Friendship, Climate change…",
            },
            {
              key: "language",
              label: "Language",
              type: "select",
              options: [
                "Urdu",
                "Sindhi",
                "English",
                "Hindi",
                "Arabic",
                "Persian",
                "Pashto",
                "Punjabi",
                "Bengali",
                "Spanish",
                "French",
                "German",
                "Italian",
                "Portuguese",
                "Russian",
                "Turkish",
                "Chinese",
                "Japanese",
                "Korean",
                "Indonesian",
                "Malay",
                "Dutch",
                "Swedish",
              ],
            },
            {
              key: "count",
              label: "How many sentences",
              type: "select",
              options: ["3", "5", "8", "10", "15", "20"],
            },
            {
              key: "sentenceType",
              label: "Sentence type",
              type: "select",
              options: [
                "Mixed",
                "Simple",
                "Compound",
                "Complex",
                "Question",
                "Affirmative",
                "Negative",
                "Imperative",
              ],
            },
            {
              key: "level",
              label: "Level",
              type: "select",
              options: ["Beginner", "Intermediate", "Advanced"],
            },
            {
              key: "tone",
              label: "Tone / style hint (optional)",
              placeholder: "e.g. formal, conversational, poetic, funny…",
            },
          ]}
          showLibrary
        />
      </div>

      {/* Upsell for higher tiers */}
      {userRank < tierRank("elite_senior") && (
        <div className="mt-10 rounded-xl border border-border bg-surface-cream p-6">
          <h3 className="font-display text-lg font-semibold text-foreground">More lessons at higher badges</h3>
          <div className="mt-3 space-y-2 text-sm text-muted-foreground">
            {(["junior", "senior", "elite_senior"] as BadgeTier[]).map((t) => {
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

            {/* Examples — trilingual (English + Urdu + Sindhi) when examplesTr is present, otherwise English-only fallback */}
            {section.examplesTr && section.examplesTr.length > 0 ? (
              <div className="mt-3 space-y-2">
                {section.examplesTr.map((ex, eIdx) => (
                  <div key={eIdx} className="rounded-lg border border-border bg-muted/30 p-3">
                    {/* English */}
                    <div className="flex items-start gap-2">
                      <span className="mt-1 size-1.5 shrink-0 rounded-full bg-brand-emerald" />
                      <p className="text-sm text-foreground" dangerouslySetInnerHTML={{ __html: ex.en }} />
                    </div>
                    {/* Urdu */}
                    {ex.ur && (
                      <div className="mt-1.5 flex items-start gap-2 border-t border-border/60 pt-1.5" dir="auto">
                        <span className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">UR</span>
                        <p className="text-sm text-foreground" dir="auto" dangerouslySetInnerHTML={{ __html: ex.ur }} />
                      </div>
                    )}
                    {/* Sindhi */}
                    {ex.sd && (
                      <div className="mt-1.5 flex items-start gap-2 border-t border-border/60 pt-1.5" dir="auto">
                        <span className="mt-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">SD</span>
                        <p className="text-sm text-foreground" dir="auto" dangerouslySetInnerHTML={{ __html: ex.sd }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : section.examples && section.examples.length > 0 ? (
              <div className="mt-3 space-y-1.5">
                {section.examples.map((ex, eIdx) => (
                  <div key={eIdx} className="flex items-start gap-2 rounded-lg bg-muted/40 px-3 py-2">
                    <span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-brand-emerald" />
                    <p className="text-sm text-foreground" dangerouslySetInnerHTML={{ __html: ex }} />
                  </div>
                ))}
              </div>
            ) : null}

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

        {/* Vocabulary — trilingual key terms introduced in this lesson */}
        {lesson.vocabulary && lesson.vocabulary.length > 0 && (
          <div className="mt-2 rounded-xl border border-brand-emerald/20 bg-accent/20 p-4">
            <h3 className="font-display text-base font-semibold text-foreground flex items-center gap-2">
              <BookA className="size-4 text-brand-emerald-deep" />
              Words in this lesson
              <span className="text-xs font-normal text-muted-foreground">— English · اردو · سنڌي</span>
            </h3>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              {lesson.vocabulary.map((v, vIdx) => (
                <div key={vIdx} className="rounded-lg border border-border bg-card p-3">
                  <p className="text-sm font-medium text-foreground">{v.term}</p>
                  {v.ur && (
                    <p className="mt-1 text-sm text-foreground" dir="auto">
                      <span className="mr-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">UR</span>
                      {v.ur}
                    </p>
                  )}
                  {v.sd && (
                    <p className="mt-0.5 text-sm text-foreground" dir="auto">
                      <span className="mr-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">SD</span>
                      {v.sd}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
