import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const speech = await db.generatedSpeech.findFirst({
    where: { id, profileId: user.id },
    select: { id: true },
  });
  if (!speech) return NextResponse.json({ error: "Not found" }, { status: 404 });
  await db.generatedSpeech.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
