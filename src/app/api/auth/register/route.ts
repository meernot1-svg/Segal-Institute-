import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { hashPassword, signToken } from "@/lib/crypto";
import { setSessionCookie } from "@/lib/auth";

const schema = z.object({
  name: z.string().min(1, "Name is required").max(80),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirm: z.string(),
  classGrade: z.string().max(40).optional().nullable(),
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json({ error: first?.message ?? "Invalid input" }, { status: 400 });
  }
  const { name, email, password, confirm, classGrade } = parsed.data;

  if (password !== confirm) {
    return NextResponse.json({ error: "Passwords do not match" }, { status: 400 });
  }

  const existing = await db.profile.findUnique({ where: { email: email.toLowerCase() } });
  if (existing) {
    return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
  }

  const profile = await db.profile.create({
    data: {
      email: email.toLowerCase(),
      name,
      passwordHash: hashPassword(password),
      role: "student",
      classGrade: classGrade || null,
    },
  });

  const token = signToken({ uid: profile.id, email: profile.email, role: profile.role });
  await setSessionCookie(token);

  return NextResponse.json({
    ok: true,
    user: { id: profile.id, email: profile.email, name: profile.name, role: profile.role },
  });
}
