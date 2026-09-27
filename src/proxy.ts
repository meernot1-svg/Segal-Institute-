import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifyToken } from "@/lib/crypto";

const PROTECTED = [
  "/dashboard",
  "/verbs",
  "/learn",
  "/practice",
  "/tests",
  "/results",
  "/profile",
  "/goals",
  "/chat",
  "/speech-generator",
  "/poetry-generator",
];
const ADMIN = ["/admin"];
const AUTH_PAGES = ["/login", "/register", "/forgot-password"];

function isProtected(pathname: string) {
  return PROTECTED.some((p) => pathname === p || pathname.startsWith(p + "/"));
}
function isAdmin(pathname: string) {
  return ADMIN.some((p) => pathname === p || pathname.startsWith(p + "/"));
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const payload = token ? verifyToken(token) : null;

  if (isAdmin(pathname)) {
    if (!payload) {
      return NextResponse.redirect(new URL(`/login?next=${encodeURIComponent(pathname)}`, req.url));
    }
    if (payload.role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  if (isProtected(pathname)) {
    if (!payload) {
      return NextResponse.redirect(new URL(`/login?next=${encodeURIComponent(pathname)}`, req.url));
    }
    return NextResponse.next();
  }

  if (AUTH_PAGES.includes(pathname) && payload) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|logo.svg|robots.txt).*)"],
};
