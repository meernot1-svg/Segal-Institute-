import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { complete } from "@/lib/ai";
import { branding } from "@/lib/branding";

const schema = z.object({
  studentId: z.string().min(1),
  periodKey: z.string().regex(/^\d{4}-\d{2}$/),
  notes: z.string().min(1, "Notes are required").max(5000),
  // If true (default), generate the AI result card from notes
  generate: z.boolean().optional(),
});

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const results = await db.monthlyResult.findMany({
    orderBy: { createdAt: "desc" },
    take: 200,
    include: {
      student: { select: { id: true, name: true, email: true } },
    },
  });
  return NextResponse.json({ results });
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
  const { studentId, periodKey, notes, generate = true } = parsed.data;

  const student = await db.profile.findUnique({
    where: { id: studentId },
    select: { id: true, name: true, role: true },
  });
  if (!student) return NextResponse.json({ error: "Student not found" }, { status: 404 });
  if (student.role !== "student") {
    return NextResponse.json({ error: "Can only create results for students" }, { status: 400 });
  }

  let generatedCard = "";
  if (generate) {
    const systemPrompt = `You are an academic report writer at ${branding.name}. An admin has written raw notes about a student's monthly performance. Turn those notes into a polished, encouraging monthly result card in clear, well-structured text. Use sections: Student, Month, Attendance, Performance summary, Strengths, Areas to improve, Teacher's note. Keep it warm and specific to the notes. Do not invent grades or numbers not present in the notes. Write in clear prose (not markdown tables).`;
    const userPrompt = `Student name: ${student.name}\nMonth: ${periodKey}\nAdmin's notes:\n${notes}`;
    try {
      generatedCard = await complete(systemPrompt, userPrompt);
    } catch {
      generatedCard = notes; // fall back to raw notes if AI fails
    }
  } else {
    generatedCard = notes;
  }

  // Upsert: one result per student+period
  const result = await db.monthlyResult.upsert({
    where: { studentId_periodKey: { studentId, periodKey } },
    create: { studentId, periodKey, notes, generatedCard },
    update: { notes, generatedCard },
    include: { student: { select: { id: true, name: true, email: true } } },
  });

  return NextResponse.json({ ok: true, result });
}
