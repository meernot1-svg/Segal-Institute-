import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { complete, SENTENCE_SYSTEM_PROMPT, isMockMode } from "@/lib/ai";

// Free AI models can be slow — give the function up to 300s to finish.
export const maxDuration = 300;

const schema = z.object({
  topic: z.string().max(200).optional(),         // free-text topic OR the lesson title
  lesson: z.string().max(200).optional(),        // optional lesson string like "Basic · 1. What are Verbs?"
  language: z.string().max(40).optional(),
  sentenceType: z.string().max(40).optional(), // Simple | Compound | Complex | Mixed | Question | Affirmative | Negative | Imperative
  level: z.string().max(40).optional(),        // Beginner | Intermediate | Advanced
  count: z.string().max(8).optional(),        // numeric string e.g. "10"
  tone: z.string().max(120).optional(),        // optional mood / style hint (free text)
  save: z.boolean().optional(),
});

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }
  const {
    topic,
    lesson,
    language = "English",
    sentenceType = "Mixed",
    level = "Intermediate",
    count = "10",
    tone,
    save,
  } = parsed.data;

  // Require either a topic OR a lesson. If only a lesson was picked, derive
  // the topic from the lesson title (strip the "Basic · " prefix).
  let effectiveTopic = (topic || "").trim();
  let effectiveLesson = (lesson || "").trim();
  if (!effectiveTopic && !effectiveLesson) {
    return NextResponse.json({ error: "Please enter a topic or pick a lesson." }, { status: 400 });
  }
  if (!effectiveTopic && effectiveLesson) {
    effectiveTopic = effectiveLesson.replace(/^\w+\s·\s/, "");
  }
  // Strip a leading "(no lesson…)" placeholder so it doesn't pollute the prompt.
  if (effectiveLesson.startsWith("(no lesson")) {
    effectiveLesson = "";
  }

  // Build the user prompt. If a lesson was picked, frame the request as
  // "practice sentences on this lesson's grammar concept" — the AI then
  // generates sentences that exercise the rule being taught.
  const lines: string[] = [];
  if (effectiveLesson) {
    lines.push(`Generate PRACTICE sentences that exercise the grammar concept taught in this lesson: "${effectiveTopic}".`);
    lines.push(`The sentences should help a student practice the rule from the lesson — use a variety of contexts, but keep the grammar pattern clear.`);
    lines.push(`Lesson tier: ${effectiveLesson.split(" · ")[0]}`);
  } else {
    lines.push(`Topic: ${effectiveTopic}`);
  }
  lines.push(`Language: ${language}`);
  lines.push(`Sentence type: ${sentenceType}`);
  lines.push(`Level: ${level}`);
  lines.push(`Count: ${count}`);
  if (tone && tone.trim()) lines.push(`Tone / style hint: ${tone}`);
  lines.push(`Write each sentence on its own line. Original sentences only — do not reproduce any quotation, lyric, or copyrighted text. Use the natural script of the requested language.`);
  const userPrompt = lines.join("\n");

  let content = "";
  try {
    content = await complete(SENTENCE_SYSTEM_PROMPT, userPrompt);
  } catch {
    content = "Sorry — I had trouble generating those sentences. Please try again.";
  }

  let savedId: string | null = null;
  if (save) {
    const row = await db.generatedSentence.create({
      data: {
        profileId: user.id,
        topic: effectiveTopic,
        language: language || "English",
        sentenceType: sentenceType || "Mixed",
        level: level || "Intermediate",
        count: count || "10",
        tone: tone || "",
        content,
      },
    });
    savedId = row.id;
  }

  return NextResponse.json({ ok: true, sentence: content, savedId, mock: isMockMode() });
}

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const sentences = await db.generatedSentence.findMany({
    where: { profileId: user.id },
    orderBy: { createdAt: "desc" },
    take: 50,
    select: {
      id: true,
      topic: true,
      language: true,
      sentenceType: true,
      level: true,
      count: true,
      tone: true,
      createdAt: true,
      content: true,
    },
  });
  return NextResponse.json({ sentences });
}
