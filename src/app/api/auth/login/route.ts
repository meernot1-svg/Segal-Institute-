import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { verifyPassword, signToken } from "@/lib/crypto";
import { setSessionCookie } from "@/lib/auth";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }
  const { email, password } = parsed.data;

  const profile = await db.profile.findUnique({ where: { email: email.toLowerCase() } });
  if (!profile || !verifyPassword(password, profile.passwordHash)) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const token = signToken({ uid: profile.id, email: profile.email, role: profile.role });
  await setSessionCookie(token);

  return NextResponse.json({
    ok: true,
    user: { id: profile.id, email: profile.email, name: profile.name, role: profile.role },
  });
}
