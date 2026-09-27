import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

const schema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  studentName: z.string().min(1, "Student name is required").max(120),
  studentId: z.string().optional().nullable(),
  content: z.string().min(1, "Content is required").max(20000),
  kind: z.enum(["speech", "poem", "essay"]).optional(),
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
    select: { id: true, title: true, studentName: true, studentId: true, content: true, kind: true, createdAt: true },
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
  const { title, studentName, studentId, content, kind = "speech" } = parsed.data;
  const speech = await db.studentSpeech.create({
    data: {
      title,
      studentName,
      studentId: studentId || null,
      content,
      kind,
      authorId: user.id,
    },
  });
  return NextResponse.json({ ok: true, speech });
}
