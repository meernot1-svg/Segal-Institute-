import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import type { BadgeTier } from "@/lib/tiers";

const approveSchema = z.object({
  userId: z.string().min(1),
  badge: z.enum(["basic", "junior", "senior", "elite_senior"]).default("basic"),
  action: z.enum(["approve", "reject"]),
});

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const pending = await db.profile.findMany({
    where: { status: "pending", role: "student" },
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, email: true, classGrade: true, createdAt: true },
  });
  return NextResponse.json({ pending });
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await req.json().catch(() => null);
  const parsed = approveSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }

  const { userId, badge, action } = parsed.data;
  const target = await db.profile.findUnique({ where: { id: userId }, select: { id: true, role: true, status: true, badge: true } });
  if (!target) return NextResponse.json({ error: "User not found" }, { status: 404 });
  if (target.role === "admin") return NextResponse.json({ error: "Cannot approve/demote an admin" }, { status: 400 });

  if (action === "approve") {
    // Approve: set status to active and assign the badge
    await db.profile.update({
      where: { id: userId },
      data: { status: "active", badge, approvedBy: user.id, approvedAt: new Date() },
    });
    // Log the badge assignment (oldBadge is null for first assignment)
    await db.badgeHistory.create({
      data: { userId, oldBadge: null, newBadge: badge, changedBy: user.id },
    });
    return NextResponse.json({ ok: true, message: `Approved and assigned ${badge} badge` });
  } else {
    // Reject: set status to rejected
    await db.profile.update({
      where: { id: userId },
      data: { status: "rejected", approvedBy: user.id, approvedAt: new Date() },
    });
    return NextResponse.json({ ok: true, message: "Account rejected" });
  }
}
