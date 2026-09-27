import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { todayISO } from "@/lib/format";

export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date") || todayISO();

  // Admins get the list of all topics; students get just today's
  if (user.role === "admin") {
    const topics = await db.dailyTopic.findMany({
      orderBy: { date: "desc" },
      take: 60,
      select: { id: true, title: true, body: true, date: true, createdAt: true, authorId: true },
    });
    return NextResponse.json({ topics, today: date });
  }

  const topic = await db.dailyTopic.findUnique({
    where: { date },
    select: { id: true, title: true, body: true, date: true },
  });
  return NextResponse.json({ topic, today: date });
}

const schema = z.object({
  title: z.string().min(1).max(200),
  body: z.string().min(1).max(8000),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }
  const { title, body: topicBody, date } = parsed.data;

  // Upsert: one topic per date
  const topic = await db.dailyTopic.upsert({
    where: { date },
    create: { title, body: topicBody, date, authorId: user.id },
    update: { title, body: topicBody, authorId: user.id },
  });

  return NextResponse.json({ ok: true, topic });
}

export async function DELETE(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  await db.dailyTopic.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
