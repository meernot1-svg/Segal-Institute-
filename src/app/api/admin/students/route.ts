import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { monthKey } from "@/lib/format";

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const students = await db.profile.findMany({
    where: { role: "student" },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      classGrade: true,
      avatarUrl: true,
      createdAt: true,
      _count: { select: { testAttempts: true, verbProgress: true } },
      fees: { select: { id: true, amount: true, periodKey: true, paid: true, kind: true, dueDate: true } },
    },
  });

  return NextResponse.json({
    students: students.map((s) => ({
      ...s,
      feesDue: s.fees.filter((f) => !f.paid).reduce((sum, f) => sum + f.amount, 0),
    })),
  });
}

export async function DELETE(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Student id required" }, { status: 400 });

  // Prevent admin from deleting themselves
  if (id === user.id) return NextResponse.json({ error: "You can't delete your own admin account" }, { status: 400 });

  const student = await db.profile.findUnique({ where: { id }, select: { id: true, role: true } });
  if (!student) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (student.role === "admin") return NextResponse.json({ error: "Cannot delete an admin account" }, { status: 400 });

  // Cascade: Prisma onDelete cascade handles related records
  await db.profile.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

const feeSchema = z.object({
  studentId: z.string().min(1),
  amount: z.number().min(0),
  kind: z.enum(["monthly", "quarterly", "one-time"]).optional(),
  periodKey: z.string().optional(), // "2026-09" for monthly; ISO date for one-time
  dueDate: z.string().optional(),
  note: z.string().max(200).optional(),
});

export async function POST(req: NextRequest) {
  // Assign a fee to a student
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json().catch(() => null);
  const parsed = feeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }
  const { studentId, amount, kind = "monthly", periodKey, dueDate, note } = parsed.data;

  const student = await db.profile.findUnique({ where: { id: studentId }, select: { id: true, role: true } });
  if (!student) return NextResponse.json({ error: "Student not found" }, { status: 404 });
  if (student.role !== "student") return NextResponse.json({ error: "Can only assign fees to students" }, { status: 400 });

  const pk = periodKey || monthKey();
  const due = dueDate ? new Date(dueDate) : new Date(Date.now() + 14 * 24 * 60 * 60 * 1000);

  // Upsert: one fee per student+period (unique constraint)
  const fee = await db.fee.upsert({
    where: { studentId_periodKey: { studentId, periodKey: pk } },
    create: { studentId, amount, kind, periodKey: pk, dueDate: due, note },
    update: { amount, kind, dueDate: due, note },
  });

  return NextResponse.json({ ok: true, fee });
}

export async function PATCH(req: NextRequest) {
  // Mark a fee as paid/unpaid
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { searchParams } = new URL(req.url);
  const feeId = searchParams.get("feeId");
  const paid = searchParams.get("paid") === "true";

  if (!feeId) return NextResponse.json({ error: "feeId required" }, { status: 400 });

  const fee = await db.fee.update({
    where: { id: feeId },
    data: { paid, paidAt: paid ? new Date() : null },
  });

  return NextResponse.json({ ok: true, fee });
}
