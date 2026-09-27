import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { complete, POETRY_SYSTEM_PROMPT, isMockMode } from "@/lib/ai";

const schema = z.object({
  topic: z.string().min(1, "Topic is required").max(200),
  language: z.string().max(40).optional(),
  form: z.string().max(40).optional(),        // Ghazal, Nazm, Free verse, Haiku, Sonnet
  emotion: z.string().max(120).optional(),
  mood: z.string().max(40).optional(),
  qaafiya: z.string().max(120).optional(),     // قافیہ
  radif: z.string().max(120).optional(),       // ردیف
  meter: z.string().max(120).optional(),        // بحر
  numAshaar: z.string().max(20).optional(),    // number of ashaar
  vocabLevel: z.string().max(40).optional(),    // Simple / Moderate / Classical
  classicalModern: z.string().max(40).optional(), // Classical / Modern
  endingStyle: z.string().max(80).optional(),  // Open / Hopeful / Dark / Philosophical / Surprising
  // legacy compatibility (older UI used style/length)
  style: z.string().max(40).optional(),
  length: z.string().max(40).optional(),
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
    language = "Urdu",
    form,
    emotion,
    mood,
    qaafiya,
    radif,
    meter,
    numAshaar,
    vocabLevel,
    classicalModern,
    endingStyle,
    style,
    length,
    save,
  } = parsed.data;

  // Build the user prompt in the exact format the master prompt expects
  // (Section 12: User Controls — Topic, Emotion, Mood, Form, Qaafiya, Radif,
  //  Meter, Number of Ashaar, Vocabulary level, Classical / Modern, Ending style)
  const effectiveForm = form || style || "Ghazal";
  const lines: string[] = [];
  lines.push(`Topic: ${topic}`);
  if (emotion) lines.push(`Emotion: ${emotion}`);
  if (mood) lines.push(`Mood: ${mood}`);
  lines.push(`Form: ${effectiveForm}`);
  if (qaafiya && qaafiya.trim()) lines.push(`Qaafiya: ${qaafiya}`);
  if (radif && radif.trim()) lines.push(`Radif: ${radif}`);
  if (meter && meter.trim()) lines.push(`Meter: ${meter}`);
  if (numAshaar && numAshaar.trim()) lines.push(`Number of Ashaar: ${numAshaar}`);
  if (vocabLevel) lines.push(`Vocabulary level: ${vocabLevel}`);
  if (classicalModern) lines.push(`Classical / Modern: ${classicalModern}`);
  if (endingStyle) lines.push(`Ending style: ${endingStyle}`);
  // length (legacy) maps loosely to number of ashaar when not otherwise specified
  if (length && !numAshaar) {
    const map: Record<string, string> = {
      "Short (1 stanza)": "3",
      "Medium (2 stanzas)": "5",
      "Long (3 stanzas)": "7",
    };
    if (map[length]) lines.push(`Number of Ashaar: ${map[length]}`);
  }
  lines.push(`Language: ${language}`);
  lines.push(`Write completely original poetry. Never reproduce any existing poem, ghazal, song lyric, or copyrighted verse.`);
  const userPrompt = lines.join("\n");

  let poem = "";
  try {
    poem = await complete(POETRY_SYSTEM_PROMPT, userPrompt);
  } catch {
    poem = "Sorry — I had trouble generating that poem. Please try again.";
  }

  let savedId: string | null = null;
  if (save) {
    const row = await db.generatedPoem.create({
      data: {
        profileId: user.id,
        topic,
        language: language || "Urdu",
        style: effectiveForm,
        length: numAshaar || length || "",
        mood: mood || emotion || "",
        content: poem,
      },
    });
    savedId = row.id;
  }

  return NextResponse.json({ ok: true, poem, savedId, mock: isMockMode() });
}

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const poems = await db.generatedPoem.findMany({
    where: { profileId: user.id },
    orderBy: { createdAt: "desc" },
    take: 50,
    select: {
      id: true,
      topic: true,
      language: true,
      style: true,
      mood: true,
      createdAt: true,
      content: true,
    },
  });
  return NextResponse.json({ poems });
}
