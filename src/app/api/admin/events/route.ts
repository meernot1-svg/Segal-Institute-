import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

const schema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().max(2000).optional().default(""),
  // ISO date yyyy-mm-dd
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be YYYY-MM-DD"),
  time: z.string().max(20).optional(),
  location: z.string().max(200).optional(),
  color: z.enum(["emerald", "navy", "gold", "rose", "violet"]).optional().default("emerald"),
});

export async function GET() {
  // Admin: list ALL events
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const events = await db.calendarEvent.findMany({
    orderBy: { date: "asc" },
    take: 500,
    select: {
      id: true,
      title: true,
      description: true,
      date: true,
      time: true,
      location: true,
      color: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return NextResponse.json({ events });
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid input" },
      { status: 400 },
    );
  }
  const { title, description, date, time, location, color } = parsed.data;
  const event = await db.calendarEvent.create({
    data: {
      title,
      description,
      date,
      time: time || null,
      location: location || null,
      color,
      createdBy: user.id,
    },
  });
  return NextResponse.json({ ok: true, event });
}
