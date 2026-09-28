import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

// Students: get their own attendance stats
export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const records = await db.attendance.findMany({
    where: { studentId: user.id },
    orderBy: { date: "desc" },
    take: 90,
    select: { id: true, date: true, present: true },
  });

  const total = records.length;
  const present = records.filter((r) => r.present).length;
  const absent = total - present;
  const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

  // Last 14 days for a mini view
  const recent = records.slice(0, 14).reverse();

  return NextResponse.json({
    stats: { total, present, absent, percentage },
    recent,
  });
}
