import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";

// Public endpoint: returns ALL home content as a { key: value } map.
// No auth required — the homepage is public.
export async function GET() {
  const rows = await db.homeContent.findMany({
    select: { key: true, value: true, kind: true, label: true },
  });
  const map: Record<string, { value: string; kind: string; label: string | null }> = {};
  for (const r of rows) {
    map[r.key] = { value: r.value, kind: r.kind, label: r.label };
  }
  return NextResponse.json({ content: map });
}
