import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

// Students: list all speeches (read-only)
export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const speeches = await db.studentSpeech.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    select: {
      id: true,
      title: true,
      studentName: true,
      content: true,
      kind: true,
      createdAt: true,
    },
  });
  return NextResponse.json({ speeches });
}
