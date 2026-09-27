import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

const schema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().max(1000).optional().default(""),
  studentName: z.string().max(120).optional().default(""),
  studentId: z.string().optional().nullable(),
  // Text mode
  content: z.string().max(20000).optional().default(""),
  // Video mode: a YouTube/embed URL OR a direct video file URL
  videoUrl: z.string().max(500).optional(),
  // Video mode: uploaded video file as a base64 data URL (small files only)
  videoData: z.string().max(20 * 1024 * 1024 * 1.4).optional(), // ~20MB cap
  kind: z.enum(["speech", "poem", "essay", "video"]).optional(),
});

export async function GET() {
  // Admin: list all speeches
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const speeches = await db.studentSpeech.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
    select: {
      id: true,
      title: true,
      description: true,
      studentName: true,
      studentId: true,
      content: true,
      videoUrl: true,
      videoData: true,
      kind: true,
      createdAt: true,
    },
  });
  return NextResponse.json({ speeches });
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 },
    );
  }
  const { title, description, studentName, studentId, content, videoUrl, videoData, kind } = parsed.data;

  const hasVideo = !!videoUrl || !!videoData;
  const effectiveKind = kind || (hasVideo ? "video" : "speech");

  if (effectiveKind === "video" && !hasVideo) {
    return NextResponse.json({ error: "Video speeches need a video URL or uploaded file" }, { status: 400 });
  }
  if (effectiveKind !== "video" && !content.trim()) {
    return NextResponse.json({ error: "Text speeches need content" }, { status: 400 });
  }

  const speech = await db.studentSpeech.create({
    data: {
      title,
      description,
      studentName,
      studentId: studentId || null,
      content: content || "",
      videoUrl: videoUrl || null,
      videoData: videoData || null,
      kind: effectiveKind,
      authorId: user.id,
    },
  });
  return NextResponse.json({ ok: true, speech });
}
