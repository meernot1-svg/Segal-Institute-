import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { hashPassword } from "@/lib/crypto";

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

  // New registrations start as "pending" — admin must approve before login works.
  const profile = await db.profile.create({
    data: {
      email: email.toLowerCase(),
      name,
      passwordHash: hashPassword(password),
      role: "student",
      classGrade: classGrade || null,
      status: "pending",
      badge: "basic",
    },
  });

  // Do NOT set a session cookie — the user cannot log in until approved.
  return NextResponse.json({
    ok: true,
    pending: true,
    message:
      "Your account has been created and is awaiting admin approval. " +
      "You will be able to log in once an admin approves your account.",
  });
}
