import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const conversation = await db.chatConversation.findFirst({
    where: { id, profileId: user.id },
    select: {
      id: true,
      title: true,
      messages: { orderBy: { id: "asc" }, select: { id: true, role: true, content: true, createdAt: true } },
    },
  });
  if (!conversation) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ conversation });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const conversation = await db.chatConversation.findFirst({
    where: { id, profileId: user.id },
    select: { id: true },
  });
  if (!conversation) return NextResponse.json({ error: "Not found" }, { status: 404 });
  await db.chatConversation.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
