import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

// Students: list all shared monthly result images (the same images for every
// student — no AI, no per-student personalization).
export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const images = await db.monthlyResultImage.findMany({
    orderBy: { month: "desc" },
    take: 24,
    select: { id: true, title: true, month: true, imageUrl: true, createdAt: true },
  });
  return NextResponse.json({ images });
}
