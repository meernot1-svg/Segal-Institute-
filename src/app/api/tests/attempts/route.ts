import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth";
import { checkAnswer } from "@/lib/verbs";

const answerSchema = z.object({
  verbId: z.string(),
  questionType: z.string(),
  prompt: z.string(),
  userAnswer: z.string(),
  options: z.array(z.string()),
});

const schema = z.object({
  type: z.enum(["MCQ", "WRITTEN"]),
  category: z.string(),
  length: z.number().int().min(1).max(50),
  startedAt: z.string().optional(),
  timeSpentSec: z.number().int().min(0).default(0),
  answers: z.array(answerSchema),
});

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  const { type, category, length, timeSpentSec, answers } = parsed.data;

  // Resolve verbs for the answers in one query
  const verbIds = Array.from(new Set(answers.map((a) => a.verbId).filter(Boolean)));
  const verbs = await db.verb.findMany({
    where: { id: { in: verbIds } },
    select: { id: true, v1: true, v2: true, v3: true, meaning: true, v2Alts: true, v3Alts: true },
  });
  const verbMap = new Map(verbs.map((v) => [v.id, v]));

  // Grade each answer server-side (authoritative)
  const graded = answers.map((a) => {
    const verb = verbMap.get(a.verbId);
    let correctAnswer = "";
    let isCorrect = false;
    if (verb) {
      switch (a.questionType) {
        case "v1-to-v2":
          correctAnswer = verb.v2;
          isCorrect = checkAnswer(a.userAnswer, verb.v2, verb.v2Alts);
          break;
        case "v1-to-v3":
          correctAnswer = verb.v3;
          isCorrect = checkAnswer(a.userAnswer, verb.v3, verb.v3Alts);
          break;
        case "v2-to-v3":
          correctAnswer = verb.v3;
          isCorrect = checkAnswer(a.userAnswer, verb.v3, verb.v3Alts);
          break;
        case "meaning":
          correctAnswer = verb.meaning;
          isCorrect = checkAnswer(a.userAnswer, verb.meaning, null);
          break;
      }
    }
    return {
      verbId: a.verbId,
      questionType: a.questionType,
      prompt: a.prompt,
      userAnswer: a.userAnswer,
      correctAnswer,
      isCorrect,
      optionsJson: JSON.stringify(a.options),
    };
  });

  const correct = graded.filter((g) => g.isCorrect).length;
  const total = graded.length;
  const percentage = total > 0 ? Math.round((correct / total) * 1000) / 10 : 0;

  const attempt = await db.testAttempt.create({
    data: {
      profileId: user.id,
      type,
      category,
      length,
      correct,
      total,
      percentage,
      timeSpentSec,
      completedAt: new Date(),
      answers: {
        create: graded.map((g) => ({
          verbId: g.verbId || null,
          questionType: g.questionType,
          prompt: g.prompt,
          userAnswer: g.userAnswer,
          correctAnswer: g.correctAnswer,
          isCorrect: g.isCorrect,
          optionsJson: g.optionsJson,
        })),
      },
    },
    include: { answers: true },
  });

  return NextResponse.json({
    ok: true,
    attempt: {
      id: attempt.id,
      correct: attempt.correct,
      total: attempt.total,
      percentage: attempt.percentage,
    },
  });
}
