import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

// Returns calendar events the signed-in student can see. We return the
// current month + the next 60 days so the dashboard calendar + upcoming list
// always has something to show.
export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const today = new Date();
  const todayISO = today.toISOString().slice(0, 10);
  const future = new Date(today);
  future.setDate(future.getDate() + 90);
  const futureISO = future.toISOString().slice(0, 10);

  const events = await db.calendarEvent.findMany({
    where: { date: { gte: todayISO, lte: futureISO } },
    orderBy: { date: "asc" },
    take: 200,
    select: {
      id: true,
      title: true,
      description: true,
      date: true,
      time: true,
      location: true,
      color: true,
    },
  });
  return NextResponse.json({ events });
}
