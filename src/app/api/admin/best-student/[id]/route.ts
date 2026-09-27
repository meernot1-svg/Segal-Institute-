import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const { id } = await params;
  const best = await db.bestStudent.findUnique({ where: { id }, select: { id: true } });
  if (!best) return NextResponse.json({ error: "Not found" }, { status: 404 });
  await db.bestStudent.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
