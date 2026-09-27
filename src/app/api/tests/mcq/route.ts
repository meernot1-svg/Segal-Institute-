import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { shuffle, type McqCategory, type FormKey } from "@/lib/verbs";

type QType = "v1-to-v2" | "v1-to-v3" | "v2-to-v3" | "meaning";

const BASE_TYPES: QType[] = ["v1-to-v2", "v1-to-v3", "v2-to-v3", "meaning"];

export async function GET(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const category = (searchParams.get("category") as McqCategory) || "mixed";
  let length = parseInt(searchParams.get("length") || "10", 10);
  if (isNaN(length) || length < 5) length = 5;
  if (length > 50) length = 50;

  // Random verbs across the whole dataset via SQLite RANDOM()
  const poolSize = length + 80;
  const rows = await db.$queryRaw<
    { id: string; v1: string; v2: string; v3: string; v2Alts: string; v3Alts: string; meaning: string; difficulty: number }[]
  >`SELECT id, v1, v2, v3, v2Alts, v3Alts, meaning, difficulty FROM Verb ORDER BY RANDOM() LIMIT ${poolSize}`;
  if (rows.length < 4) {
    return NextResponse.json({ error: "Not enough verbs to build a test" }, { status: 400 });
  }

  const pool = rows.map((r) => ({
    ...r,
    v2AltsArr: safeParse(r.v2Alts),
    v3AltsArr: safeParse(r.v3Alts),
  }));

  const questionVerbs = shuffle(pool).slice(0, Math.min(length, pool.length - 1));
  const distractorPool = pool;

  const questions = questionVerbs.map((verb, i) => {
    const types: QType[] =
      category === "mixed" || category === "random"
        ? [BASE_TYPES[i % BASE_TYPES.length]]
        : [category as QType];
    const type = types[Math.floor(Math.random() * types.length)] as QType;
    return buildQuestion(verb, type, distractorPool, i);
  });

  return NextResponse.json({ questions });
}

function buildQuestion(
  verb: { id: string; v1: string; v2: string; v3: string; meaning: string; v2AltsArr: string[]; v3AltsArr: string[] },
  type: QType,
  pool: { v1: string; v2: string; v3: string; meaning: string }[],
  idx: number,
) {
  let prompt = "";
  let answer = "";
  let distractorField: "v2" | "v3" | "meaning" = "v2";

  switch (type) {
    case "v1-to-v2":
      prompt = `What is the V2 (past simple) of "${verb.v1}"?`;
      answer = verb.v2;
      distractorField = "v2";
      break;
    case "v1-to-v3":
      prompt = `What is the V3 (past participle) of "${verb.v1}"?`;
      answer = verb.v3;
      distractorField = "v3";
      break;
    case "v2-to-v3":
      prompt = `What is the V3 (past participle) of "${verb.v2}"?`;
      answer = verb.v3;
      distractorField = "v3";
      break;
    case "meaning":
      prompt = `What does "${verb.v1}" mean?`;
      answer = verb.meaning;
      distractorField = "meaning";
      break;
  }

  // Distractors: distinct from the answer
  const answerNorm = answer.trim().toLowerCase();
  const distractors: string[] = [];
  for (const d of shuffle(pool)) {
    const cand = d[distractorField];
    if (!cand) continue;
    if (cand.trim().toLowerCase() === answerNorm) continue;
    if (distractors.some((x) => x.trim().toLowerCase() === cand.trim().toLowerCase())) continue;
    distractors.push(cand);
    if (distractors.length >= 3) break;
  }
  // Fallback if not enough distractors (rare)
  while (distractors.length < 3) {
    distractors.push(`— option ${distractors.length + 1} —`);
  }

  const options = shuffle([answer, ...distractors]);
  const correctIndex = options.findIndex((o) => o.trim().toLowerCase() === answerNorm);

  return {
    id: `q${idx}`,
    verbId: verb.id,
    type,
    prompt,
    options,
    correctIndex,
  };
}

function safeParse(s: string | null | undefined): string[] {
  if (!s) return [];
  try {
    const v = JSON.parse(s);
    return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}
