import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

const schema = z.object({
  verbId: z.string().min(1),
  status: z.enum(["learned", "difficult", "new", "learning"]),
});

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const { verbId, status } = parsed.data;

  const verb = await db.verb.findUnique({ where: { id: verbId }, select: { id: true } });
  if (!verb) return NextResponse.json({ error: "Verb not found" }, { status: 404 });

  const existing = await db.studentVerbProgress.findUnique({
    where: { profileId_verbId: { profileId: user.id, verbId } },
  });

  if (status === "new" && !existing) {
    return NextResponse.json({ ok: true, status: "new" });
  }

  const record = await db.studentVerbProgress.upsert({
    where: { profileId_verbId: { profileId: user.id, verbId } },
    create: {
      profileId: user.id,
      verbId,
      status,
      timesReviewed: 1,
      lastReviewedAt: new Date(),
    },
    update: {
      status,
      lastReviewedAt: new Date(),
      timesReviewed: { increment: 1 },
    },
  });

  return NextResponse.json({ ok: true, status: record.status });
}
