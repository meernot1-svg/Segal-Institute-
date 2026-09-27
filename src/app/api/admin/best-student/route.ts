import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

const schema = z.object({
  name: z.string().min(1, "Name is required").max(120),
  photo: z.string().min(1, "Photo is required").max(512 * 1024 * 1.4),
  month: z.string().regex(/^\d{4}-\d{2}$/),
  blurb: z.string().min(1, "A short blurb is required").max(1000),
  active: z.boolean().optional(),
});

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const all = await db.bestStudent.findMany({
    orderBy: { month: "desc" },
    take: 50,
    select: { id: true, name: true, photo: true, month: true, blurb: true, active: true, createdAt: true },
  });
  return NextResponse.json({ bestStudents: all });
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
  const { name, photo, month, blurb, active = true } = parsed.data;
  // Upsert: one best student per month
  const best = await db.bestStudent.upsert({
    where: { month },
    create: { name, photo, month, blurb, active },
    update: { name, photo, blurb, active },
  });
  return NextResponse.json({ ok: true, best });
}
