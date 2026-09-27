import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { complete, POETRY_SYSTEM_PROMPT, isMockMode } from "@/lib/ai";

const schema = z.object({
  topic: z.string().min(1, "Topic is required").max(200),
  language: z.string().max(40).optional(),
  style: z.string().max(40).optional(),
  length: z.string().max(40).optional(),
  mood: z.string().max(40).optional(),
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
  const { topic, language, style, length, mood, save } = parsed.data;

  const userPrompt = [
    `Write an original poem on the topic: "${topic}".`,
    language && `Language: ${language}.`,
    style && `Style: ${style}.`,
    length && `Length: ${length}.`,
    mood && `Mood: ${mood}.`,
    `Write fresh, original lines — never reproduce existing poems, song lyrics, or copyrighted verses.`,
  ]
    .filter(Boolean)
    .join("\n");

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
        language: language || "English",
        style: style || "",
        length: length || "",
        mood: mood || "",
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
