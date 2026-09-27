import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

const schema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  month: z.string().regex(/^\d{4}-\d{2}$/, "Month must be YYYY-MM"),
  // Base64 data URL of the uploaded image (max ~5MB after resize)
  imageUrl: z.string().min(1, "Image is required").max(5 * 1024 * 1024 * 1.4),
});

export async function GET() {
  // Admin: list all shared monthly result images
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const images = await db.monthlyResultImage.findMany({
    orderBy: { month: "desc" },
    take: 60,
    select: { id: true, title: true, month: true, imageUrl: true, createdAt: true },
  });
  return NextResponse.json({ images });
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
  const { title, month, imageUrl } = parsed.data;
  // Upsert: one image per month. If it already exists, replace it.
  const image = await db.monthlyResultImage.upsert({
    where: { month },
    create: { title, month, imageUrl },
    update: { title, imageUrl },
  });
  return NextResponse.json({ ok: true, image });
}
