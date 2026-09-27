import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

const schema = z.object({
  name: z.string().min(1, "Name is required").max(80).optional(),
  classGrade: z.string().max(40).nullable().optional(),
  // Base64 data URL avatar (resized client-side to ~256×256, JPEG) — kept small.
  // Max 256KB to avoid bloating the DB.
  avatar: z.string().max(256 * 1024 * 1.4).optional(),
});

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const profile = await db.profile.findUnique({
    where: { id: user.id },
    select: { id: true, name: true, email: true, role: true, classGrade: true, avatarUrl: true, createdAt: true },
  });
  if (!profile) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ profile });
}

export async function PATCH(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }
  const { name, classGrade, avatar } = parsed.data;

  const data: { name?: string; classGrade?: string | null; avatarUrl?: string } = {};
  if (name !== undefined) data.name = name;
  if (classGrade !== undefined) data.classGrade = classGrade;
  if (avatar !== undefined) {
    // Validate it's a real image data URL
    if (avatar === "" || avatar.startsWith("data:image/")) {
      data.avatarUrl = avatar || null;
    } else {
      return NextResponse.json({ error: "Invalid image" }, { status: 400 });
    }
  }

  const profile = await db.profile.update({
    where: { id: user.id },
    data,
    select: { id: true, name: true, email: true, role: true, classGrade: true, avatarUrl: true },
  });
  return NextResponse.json({ ok: true, profile });
}
