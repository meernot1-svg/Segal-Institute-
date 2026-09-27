import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

const schema = z.object({
  key: z.string().min(1).max(80),
  value: z.string().max(2 * 1024 * 1024), // up to 2MB for image data URLs
});

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const rows = await db.homeContent.findMany({
    orderBy: { key: "asc" },
    select: { id: true, key: true, value: true, kind: true, label: true, updatedAt: true },
  });
  return NextResponse.json({ content: rows });
}

// Upsert a single key/value
export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }
  const { key, value } = parsed.data;
  // Detect kind from value: data URLs are images, everything else is text
  const isImage = value.startsWith("data:image/");
  const kind = isImage ? "image" : "text";
  const row = await db.homeContent.upsert({
    where: { key },
    update: { value, kind },
    create: { key, value, kind },
  });
  return NextResponse.json({ ok: true, row });
}
