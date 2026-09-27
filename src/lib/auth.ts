/**
 * Server-side session helpers (Next.js server components / route handlers).
 */
import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { SESSION_COOKIE, signToken, verifyToken, hashPassword, verifyPassword } from "@/lib/crypto";

export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  role: string;
};

export async function getSession(): Promise<SessionUser | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const payload = verifyToken(token);
  if (!payload) return null;
  return {
    id: payload.uid,
    email: payload.email,
    name: "", // filled below
    role: payload.role,
  };
}

/** Get the current user with a fresh DB lookup (verifies existence + name). */
export async function getCurrentUser(): Promise<SessionUser | null> {
  const session = await getSession();
  if (!session) return null;
  const profile = await db.profile.findUnique({
    where: { id: session.id },
    select: { id: true, email: true, name: true, role: true },
  });
  if (!profile) return null;
  return { id: profile.id, email: profile.email, name: profile.name, role: profile.role };
}

/** Require a logged-in user; returns the user or throws a redirect sentinel. */
export async function requireUser(): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) {
    // Trigger redirect in server components via the caller; here we throw.
    throw new AuthRedirect("/login");
  }
  return user;
}

export async function requireAdmin(): Promise<SessionUser> {
  const user = await requireUser();
  if (user.role !== "admin") throw new AuthRedirect("/");
  return user;
}

export class AuthRedirect {
  constructor(public destination: string) {}
}

export async function setSessionCookie(token: string) {
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function clearSessionCookie() {
  const store = await cookies();
  store.set(SESSION_COOKIE, "", { httpOnly: true, sameSite: "lax", path: "/", maxAge: 0 });
}

export { hashPassword, verifyPassword, signToken };
