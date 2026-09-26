"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MCQ_CATEGORIES, TEST_LENGTHS, type McqCategory } from "@/lib/verbs";
import { cn } from "@/lib/utils";
import {
  Clock,
  Check,
  X,
  ArrowRight,
  RotateCcw,
  Loader2,
  ListChecks,
  Trophy,
} from "lucide-react";

type Question = {
  id: string;
  verbId: string;
  type: string;
  prompt: string;
  options: string[];
  correctIndex: number;
};

type Phase = "setup" | "loading" | "running" | "submitting" | "review";

export function McqTest() {
  const [phase, setPhase] = useState<Phase>("setup");
  const [category, setCategory] = useState<McqCategory>("mixed");
  const [length, setLength] = useState<number>(10);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [current, setCurrent] = useState(0);
  const [picks, setPicks] = useState<(number | null)[]>([]);
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const [result, setResult] = useState<{
    id: string;
    correct: number;
    total: number;
    percentage: number;
  } | null>(null);

  useEffect(() => {
    if (phase === "running") {
      timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
    if (timerRef.current && phase !== "running") {
      clearInterval(timerRef.current);
    }
  }, [phase]);

  async function start() {
    setPhase("loading");
    setCurrent(0);
    setPicks([]);
    setSeconds(0);
    setResult(null);
    try {
      const res = await fetch(`/api/tests/mcq?category=${category}&length=${length}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load test");
      setQuestions(data.questions);
      setPicks(new Array(data.questions.length).fill(null));
      setPhase("running");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load test");
      setPhase("setup");
    }
  }

  function pick(index: number) {
    setPicks((p) => {
      const copy = [...p];
      copy[current] = index;
      return copy;
    });
  }

  function next() {
    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1);
    } else {
      finish();
    }
  }

  async function finish() {
    setPhase("submitting");
    const answers = questions.map((q, i) => ({
      verbId: q.verbId,
      questionType: q.type,
      prompt: q.prompt,
      userAnswer: picks[i] != null ? q.options[picks[i]!] : "",
      options: q.options,
    }));
    try {
      const res = await fetch("/api/tests/attempts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "MCQ",
          category,
          length: questions.length,
          timeSpentSec: seconds,
          answers,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit test");
      setResult(data.attempt);
      setPhase("review");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to submit test");
      setPhase("running");
    }
  }

  function retake() {
    setPhase("setup");
    setQuestions([]);
    setPicks([]);
    setResult(null);
    setCurrent(0);
    setSeconds(0);
  }

  // ---------- SETUP ----------
  if (phase === "setup") {
    return (
      <SetupScreen
        category={category}
        setCategory={setCategory}
        length={length}
        setLength={setLength}
        onStart={start}
      />
    );
  }

  // ---------- LOADING ----------
  if (phase === "loading") {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-3 py-24 text-center">
        <Loader2 className="size-8 animate-spin text-brand-emerald" />
        <p className="text-sm text-muted-foreground">Building your test…</p>
      </div>
    );
  }

  // ---------- REVIEW ----------
  if (phase === "review" && result) {
    return <ReviewScreen questions={questions} picks={picks} result={result} seconds={seconds} category={category} onRetake={retake} />;
  }

  // ---------- RUNNING / SUBMITTING ----------
  const q = questions[current];
  const selected = picks[current];
  const answered = selected != null;
  const isLast = current + 1 >= questions.length;

  return (
    <div className="mx-auto max-w-2xl">
      {/* Header: progress + timer */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Question <span className="font-medium text-foreground">{current + 1}</span> of {questions.length}
        </div>
        <div className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-sm font-medium tabular-nums">
          <Clock className="size-4 text-muted-foreground" />
          {fmt(seconds)}
        </div>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-brand-emerald transition-all"
          style={{ width: `${(current / questions.length) * 100}%` }}
        />
      </div>

      <Card className="mt-5">
        <CardHeader>
          <p className="text-xs font-medium text-brand-emerald-deep">
            {labelForType(q.type)}
          </p>
          <CardTitle className="text-xl sm:text-2xl">{q.prompt}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2.5">
            {q.options.map((opt, i) => {
              const active = selected === i;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => pick(i)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border px-4 py-3.5 text-left transition-colors",
                    active
                      ? "border-brand-emerald bg-accent text-foreground"
                      : "border-border bg-background text-foreground hover:border-brand-emerald/40 hover:bg-accent/50"
                  )}
                >
                  <span
                    className={cn(
                      "flex size-7 shrink-0 items-center justify-center rounded-full border text-sm font-semibold",
                      active ? "border-brand-emerald bg-brand-emerald text-white" : "border-border text-muted-foreground"
                    )}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="min-w-0 break-words text-sm sm:text-base">{opt}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-xs text-muted-foreground">
              {answered ? "Answer selected" : "Pick an option to continue"}
            </p>
            <Button onClick={next} disabled={!answered || phase === "submitting"}>
              {phase === "submitting" ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Submitting…
                </>
              ) : isLast ? (
                <>
                  Finish <Check className="size-4" />
                </>
              ) : (
                <>
                  Next <ArrowRight className="size-4" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function SetupScreen({
  category,
  setCategory,
  length,
  setLength,
  onStart,
}: {
  category: McqCategory;
  setCategory: (c: McqCategory) => void;
  length: number;
  setLength: (n: number) => void;
  onStart: () => void;
}) {
  const cat = MCQ_CATEGORIES.find((c) => c.value === category)!;
  return (
    <div className="mx-auto max-w-2xl">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          MCQ test
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Choose a category and length, then test your verb forms under the clock.
        </p>
      </div>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Set up your test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Category</p>
            <Select value={category} onValueChange={(v) => setCategory(v as McqCategory)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {MCQ_CATEGORIES.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">{cat.description}</p>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-foreground">Number of questions</p>
            <div className="grid grid-cols-4 gap-2">
              {TEST_LENGTHS.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setLength(n)}
                  className={cn(
                    "rounded-lg border py-3 text-sm font-semibold transition-colors",
                    length === n
                      ? "border-brand-emerald bg-accent text-brand-emerald-deep"
                      : "border-border text-muted-foreground hover:border-brand-emerald/40 hover:text-foreground"
                  )}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <Button size="lg" className="w-full" onClick={onStart}>
            <ListChecks className="size-4" /> Start test
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function ReviewScreen({
  questions,
  picks,
  result,
  seconds,
  category,
  onRetake,
}: {
  questions: Question[];
  picks: (number | null)[];
  result: { id: string; correct: number; total: number; percentage: number };
  seconds: number;
  category: string;
  onRetake: () => void;
}) {
  const pct = result.percentage;
  const tone =
    pct >= 80
      ? { ring: "bg-brand-emerald text-white", label: "Excellent", color: "text-brand-emerald-deep" }
      : pct >= 50
        ? { ring: "bg-amber-500 text-white", label: "Good start", color: "text-amber-700" }
        : { ring: "bg-red-500 text-white", label: "Keep practicing", color: "text-red-700" };

  const router = useRouter();

  return (
    <div className="mx-auto max-w-2xl">
      {/* Score summary */}
      <Card className="overflow-hidden">
        <div className="surface-cream px-6 py-8 text-center">
          <span className={cn("mx-auto inline-flex size-16 items-center justify-center rounded-full", tone.ring)}>
            <Trophy className="size-8" />
          </span>
          <p className="mt-4 text-sm text-muted-foreground">{tone.label}</p>
          <p className="mt-1 font-display text-5xl font-semibold tracking-tight text-foreground">
            {pct}%
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            {result.correct} of {result.total} correct · {fmt(seconds)} · {labelForCat(category)}
          </p>
        </div>
        <CardContent className="pt-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Button onClick={onRetake} variant="outline">
              <RotateCcw className="size-4" /> Retake
            </Button>
            <Button asChild variant="outline">
              <Link href={`/results?attempt=${result.id}`}>View in results</Link>
            </Button>
            <Button onClick={() => router.push("/dashboard")}>Back to dashboard</Button>
          </div>
        </CardContent>
      </Card>

      {/* Per-question review */}
      <h2 className="mt-8 font-display text-xl font-semibold tracking-tight">Review answers</h2>
      <div className="mt-4 space-y-3">
        {questions.map((q, i) => {
          const pick = picks[i];
          const correct = pick === q.correctIndex;
          return (
            <div
              key={q.id}
              className={cn(
                "rounded-xl border bg-card p-4",
                correct ? "border-brand-emerald/40" : "border-red-300/60"
              )}
            >
              <div className="flex items-start gap-3">
                <span
                  className={cn(
                    "mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full text-white",
                    correct ? "bg-brand-emerald" : "bg-red-500"
                  )}
                >
                  {correct ? <Check className="size-3.5" /> : <X className="size-3.5" />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-muted-foreground">
                    {labelForType(q.type)}
                  </p>
                  <p className="mt-0.5 font-medium text-foreground">{q.prompt}</p>
                  <div className="mt-2 grid gap-1.5 text-sm">
                    <p className={cn(correct ? "text-brand-emerald-deep" : "text-red-700")}>
                      <span className="text-muted-foreground">Your answer: </span>
                      {pick != null ? q.options[pick] : "—"}
                    </p>
                    {!correct && (
                      <p className="text-brand-emerald-deep">
                        <span className="text-muted-foreground">Correct: </span>
                        {q.options[q.correctIndex]}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function fmt(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

function labelForType(type: string): string {
  const map: Record<string, string> = {
    "v1-to-v2": "V1 → V2",
    "v1-to-v3": "V1 → V3",
    "v2-to-v3": "V2 → V3",
    meaning: "Meaning",
  };
  return map[type] || type;
}

function labelForCat(category: string): string {
  const map: Record<string, string> = {
    "v1-to-v2": "V1 → V2",
    "v1-to-v3": "V1 → V3",
    "v2-to-v3": "V2 → V3",
    meaning: "Meaning",
    mixed: "Mixed",
    random: "Random verbs",
  };
  return map[category] || category;
}
