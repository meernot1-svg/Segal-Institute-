import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

// Students: get the most recent active "Best Student of the Month"
export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const best = await db.bestStudent.findFirst({
    where: { active: true },
    orderBy: { month: "desc" },
    select: { id: true, name: true, photo: true, month: true, blurb: true },
  });
  return NextResponse.json({ best });
}
