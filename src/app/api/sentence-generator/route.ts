import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { complete, SENTENCE_SYSTEM_PROMPT, isMockMode } from "@/lib/ai";

// Free AI models can be slow — give the function up to 300s to finish.
export const maxDuration = 300;

const schema = z.object({
  topic: z.string().min(1, "Topic is required").max(200),
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
    language = "English",
    sentenceType = "Mixed",
    level = "Intermediate",
    count = "10",
    tone,
    save,
  } = parsed.data;

  // Build the user prompt in the format the master prompt expects.
  const lines: string[] = [];
  lines.push(`Topic: ${topic}`);
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
        topic,
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
