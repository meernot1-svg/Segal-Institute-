import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { hashPassword } from "@/lib/crypto";

const schema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters").max(100),
});

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const { id } = await params;

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 },
    );
  }

  const student = await db.profile.findUnique({
    where: { id },
    select: { id: true, role: true },
  });
  if (!student) return NextResponse.json({ error: "Student not found" }, { status: 404 });
  if (student.role === "admin") {
    return NextResponse.json({ error: "Cannot reset an admin password here" }, { status: 400 });
  }

  await db.profile.update({
    where: { id },
    data: { passwordHash: hashPassword(parsed.data.password) },
  });

  return NextResponse.json({ ok: true });
}
