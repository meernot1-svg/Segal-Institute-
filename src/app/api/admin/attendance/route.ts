import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { todayISO } from "@/lib/format";

const markSchema = z.object({
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  records: z.array(
    z.object({
      studentId: z.string(),
      present: z.boolean(),
    }),
  ),
});

export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date") || todayISO();

  // Get all students
  const students = await db.profile.findMany({
    where: { role: "student" },
    orderBy: { name: "asc" },
    select: { id: true, name: true, email: true, avatarUrl: true },
  });

  // Get attendance records for the requested date
  const records = await db.attendance.findMany({
    where: { date },
    select: { id: true, studentId: true, present: true },
  });

  const recordMap = new Map(records.map((r) => [r.studentId, r]));

  // Merge: student info + attendance status for this date
  const studentAttendance = students.map((s) => ({
    ...s,
    attendanceId: recordMap.get(s.id)?.id || null,
    present: recordMap.get(s.id)?.present ?? null, // null = not marked yet
  }));

  // Stats for this date
  const presentCount = studentAttendance.filter((s) => s.present === true).length;
  const absentCount = studentAttendance.filter((s) => s.present === false).length;
  const unmarkedCount = studentAttendance.filter((s) => s.present === null).length;

  // Recent dates that have attendance records (for the history sidebar)
  const recentDates = await db.attendance.findMany({
    distinct: ["date"],
    orderBy: { date: "desc" },
    take: 30,
    select: { date: true },
  });

  return NextResponse.json({
    date,
    students: studentAttendance,
    stats: { total: students.length, present: presentCount, absent: absentCount, unmarked: unmarkedCount },
    recentDates: recentDates.map((r) => r.date),
  });
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json().catch(() => null);
  const parsed = markSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 },
    );
  }

  const { date = todayISO(), records } = parsed.data;

  if (records.length === 0) {
    return NextResponse.json({ error: "No records to save" }, { status: 400 });
  }

  // Upsert each attendance record (one per student per date)
  const results = [];
  for (const rec of records) {
    const row = await db.attendance.upsert({
      where: { studentId_date: { studentId: rec.studentId, date } },
      create: { studentId: rec.studentId, date, present: rec.present, markedBy: user.id },
      update: { present: rec.present, markedBy: user.id },
    });
    results.push(row.id);
  }

  return NextResponse.json({ ok: true, saved: results.length, date });
}
