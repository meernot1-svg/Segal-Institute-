import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

// Students: list their own monthly results
export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const results = await db.monthlyResult.findMany({
    where: { studentId: user.id },
    orderBy: { periodKey: "desc" },
    take: 24,
    select: {
      id: true,
      periodKey: true,
      generatedCard: true,
      createdAt: true,
    },
  });
  return NextResponse.json({ results });
}
