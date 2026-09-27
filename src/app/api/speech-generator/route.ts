import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { complete, SPEECH_SYSTEM_PROMPT, isMockMode } from "@/lib/ai";

const schema = z.object({
  topic: z.string().min(1, "Topic is required").max(200),
  duration: z.string().max(40).optional(),
  language: z.string().max(40).optional(),
  level: z.string().max(40).optional(),
  audience: z.string().max(120).optional(),
  style: z.string().max(40).optional(),
  tone: z.string().max(40).optional(),
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
  const { topic, duration, language, level, audience, style, tone, save } = parsed.data;

  const userPrompt = [
    `Write a speech on the topic: "${topic}".`,
    duration && `Duration: ${duration}.`,
    language && `Language: ${language}.`,
    level && `Level of the speaker: ${level}.`,
    audience && `Audience: ${audience}.`,
    style && `Style: ${style}.`,
    tone && `Tone: ${tone}.`,
    `Label the sections clearly: Opening, Introduction, Main points, Examples, Conclusion. Keep it original — do not reproduce any existing speech.`,
  ]
    .filter(Boolean)
    .join("\n");

  let speech = "";
  try {
    speech = await complete(SPEECH_SYSTEM_PROMPT, userPrompt);
  } catch {
    speech = "Sorry — I had trouble generating that speech. Please try again.";
  }

  let savedId: string | null = null;
  if (save) {
    const row = await db.generatedSpeech.create({
      data: {
        profileId: user.id,
        topic,
        language: language || "English",
        duration: duration || "",
        level: level || "",
        audience: audience || "",
        style: style || "",
        tone: tone || "",
        content: speech,
      },
    });
    savedId = row.id;
  }

  return NextResponse.json({ ok: true, speech, savedId, mock: isMockMode() });
}

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const speeches = await db.generatedSpeech.findMany({
    where: { profileId: user.id },
    orderBy: { createdAt: "desc" },
    take: 50,
    select: {
      id: true,
      topic: true,
      language: true,
      tone: true,
      createdAt: true,
      content: true,
    },
  });
  return NextResponse.json({ speeches });
}
