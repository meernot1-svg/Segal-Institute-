import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { completeWithVision, complete, isMockMode } from "@/lib/ai";
import { branding } from "@/lib/branding";

export const maxDuration = 300;

const schema = z.object({
  periodKey: z.string().regex(/^\d{4}-\d{2}$/),
  // Base64 data URL of the admin's uploaded result-card image
  imageDataUrl: z.string().min(1, "Image is required").max(8 * 1024 * 1024 * 1.4),
  // Optional extra instructions the admin can add (e.g. "all students improved this month")
  extraInstructions: z.string().max(2000).optional(),
});

const VISION_SYSTEM_PROMPT = `You are an OCR + academic-data extractor. The user will share an image of a student result card, grade sheet, or monthly report. Read ALL the text visible in the image — student names, subjects, marks, grades, attendance, teacher remarks, month, class — and return it as clear, structured plain text. If the image contains a table, reproduce it as plain text rows. If some parts are unreadable, mark them as [unclear]. Do not invent data that is not in the image. Output ONLY the extracted text, nothing else.`;

const PERSONALIZE_SYSTEM_PROMPT = `You are an academic report writer at ${branding.name}. The admin has provided the raw text extracted from a monthly result sheet. Your job is to write a warm, personalized monthly result card for ONE specific student named "{STUDENT}". Use the data from the extracted sheet that applies to this student (their name, subjects, marks, grades, attendance, remarks). If the sheet does not contain data for this specific student, write a general encouraging card using whatever aggregate/class info is in the sheet, and address it to the named student.

Format the card with these labeled sections (plain text, no markdown tables):
- Student: {name}
- Month: {period}
- Attendance:
- Subjects & performance:
- Strengths:
- Areas to improve:
- Teacher's note:

Keep it warm, specific, and encouraging. Do not invent specific numbers not present in the source text. Write in clear prose. The student will read this on their dashboard.`;

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
  const { periodKey, imageDataUrl, extraInstructions } = parsed.data;

  // 1. Read all text from the uploaded image using a vision model.
  let extractedText = "";
  try {
    extractedText = await completeWithVision(VISION_SYSTEM_PROMPT, "Extract all the text from this result card image. Return only the extracted text.", imageDataUrl);
  } catch (e) {
    return NextResponse.json(
      { error: `Could not read the image with AI: ${e instanceof Error ? e.message : "unknown error"}. Try a clearer image or use the text-notes mode instead.` },
      { status: 500 },
    );
  }

  if (!extractedText.trim() || extractedText.toLowerCase().includes("no_text")) {
    return NextResponse.json(
      { error: "The AI couldn't read any text from this image. Please upload a clearer photo of the result card, or use the text-notes mode." },
      { status: 422 },
    );
  }

  // 2. Get all students.
  const students = await db.profile.findMany({
    where: { role: "student" },
    orderBy: { name: "asc" },
    select: { id: true, name: true },
  });

  if (students.length === 0) {
    return NextResponse.json({ error: "No students registered yet." }, { status: 400 });
  }

  // 3. For each student, generate a personalized result card from the extracted text.
  //    Run them sequentially to avoid hitting rate limits on the free model.
  const generated: { studentId: string; studentName: string; ok: boolean }[] = [];
  const mock = isMockMode();
  for (const student of students) {
    const systemPrompt = PERSONALIZE_SYSTEM_PROMPT
      .replace("{STUDENT}", student.name)
      .replace("{period}", periodKey);
    const userPrompt = [
      `Extracted text from the admin's uploaded result sheet for ${periodKey}:`,
      `---`,
      extractedText,
      `---`,
      extraInstructions ? `Additional instructions from the admin: ${extraInstructions}` : "",
      `Now write the personalized monthly result card for the student named "${student.name}".`,
    ].filter(Boolean).join("\n\n");

    let card = "";
    try {
      card = mock
        ? `Student: ${student.name}\nMonth: ${periodKey}\nAttendance: (from sheet)\nSubjects & performance: (from sheet)\nStrengths: (from sheet)\nAreas to improve: (from sheet)\nTeacher's note: Keep up the good work!`
        : await complete(systemPrompt, userPrompt);
    } catch {
      card = `Student: ${student.name}\nMonth: ${periodKey}\n\nThe AI could not generate a personalized card for this student. Please try again.`;
    }

    // Upsert: one result per student + period. Store the image, extracted text,
    // and the personalized card.
    await db.monthlyResult.upsert({
      where: { studentId_periodKey: { studentId: student.id, periodKey } },
      create: {
        studentId: student.id,
        periodKey,
        notes: extraInstructions || "",
        imageUrl: imageDataUrl,
        extractedText,
        generatedCard: card,
      },
      update: {
        notes: extraInstructions || "",
        imageUrl: imageDataUrl,
        extractedText,
        generatedCard: card,
      },
    });
    generated.push({ studentId: student.id, studentName: student.name, ok: true });
  }

  return NextResponse.json({
    ok: true,
    extractedTextPreview: extractedText.slice(0, 300),
    studentCount: students.length,
    generated,
    mock,
  });
}
