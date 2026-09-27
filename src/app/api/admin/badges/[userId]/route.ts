import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { TIER_ORDER, type BadgeTier } from "@/lib/tiers";

const changeSchema = z.object({
  newBadge: z.enum(["basic", "junior", "senior", "elite_senior"]),
});

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const { userId } = await params;

  const profile = await db.profile.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true, badge: true, status: true },
  });
  if (!profile) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const history = await db.badgeHistory.findMany({
    where: { userId },
    orderBy: { changedAt: "desc" },
    take: 50,
    select: {
      id: true,
      oldBadge: true,
      newBadge: true,
      changedAt: true,
      changedBy: true,
      admin: { select: { name: true } },
    },
  });

  return NextResponse.json({ profile, history });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const { userId } = await params;

  const body = await req.json().catch(() => null);
  const parsed = changeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }

  const { newBadge } = parsed.data;

  const target = await db.profile.findUnique({ where: { id: userId }, select: { id: true, role: true, badge: true, status: true } });
  if (!target) return NextResponse.json({ error: "User not found" }, { status: 404 });
  if (target.role === "admin") return NextResponse.json({ error: "Cannot change an admin's badge" }, { status: 400 });
  if (target.status !== "active") return NextResponse.json({ error: "User is not active" }, { status: 400 });

  const oldBadge = target.badge as BadgeTier;

  // Update the badge
  await db.profile.update({
    where: { id: userId },
    data: { badge: newBadge },
  });

  // Log the change
  await db.badgeHistory.create({
    data: { userId, oldBadge, newBadge, changedBy: user.id },
  });

  return NextResponse.json({ ok: true, oldBadge, newBadge });
}
