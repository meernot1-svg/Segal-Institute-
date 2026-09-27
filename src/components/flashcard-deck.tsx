"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SpeakButton } from "@/components/speak-button";
import { parseAlts } from "@/lib/verbs";
import { cn } from "@/lib/utils";
import { Check, RefreshCw, X, Eye, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export type Flashcard = {
  id: string;
  v1: string;
  v2: string;
  v3: string;
  meaning: string;
  v2Alts: string;
  v3Alts: string;
};

export function FlashcardDeck({ deck }: { deck: Flashcard[] }) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(0);
  const [practice, setPractice] = useState(0);
  const [done, setDone] = useState(false);

  const card = deck[index];

  async function mark(status: "learned" | "learning") {
    try {
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verbId: card.id, status }),
      });
    } catch {
      /* non-blocking */
    }
  }

  function next() {
    if (index + 1 >= deck.length) {
      setDone(true);
      return;
    }
    setIndex((i) => i + 1);
    setFlipped(false);
  }

  function onKnow() {
    mark("learned");
    setKnown((n) => n + 1);
    next();
  }
  function onPractice() {
    mark("learning");
    setPractice((n) => n + 1);
    next();
  }

  if (done) {
    const pct = deck.length ? Math.round((known / deck.length) * 100) : 0;
    return (
      <div className="mx-auto max-w-md">
        <Card className="p-8 text-center">
          <span className="mx-auto inline-flex size-12 items-center justify-center rounded-full bg-accent text-brand-emerald-deep">
            <Sparkles className="size-6" />
          </span>
          <h2 className="mt-5 font-display text-2xl font-semibold text-foreground">
            Session complete
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            You went through {deck.length} verbs.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            <Stat label="Knew it" value={known} tone="emerald" />
            <Stat label="Need practice" value={practice} tone="amber" />
            <Stat label="Known" value={`${pct}%`} tone="navy" />
          </div>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Button asChild variant="outline">
              <Link href="/tests/mcq">
                Test yourself <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button onClick={() => window.location.reload()}>
              <RefreshCw className="size-4" /> New session
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progress */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          Card {index + 1} of {deck.length}
        </span>
        <span className="text-muted-foreground">
          <span className="font-medium text-brand-emerald-deep">{known}</span> known ·{" "}
          <span className="font-medium text-amber-700">{practice}</span> practice
        </span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-brand-emerald transition-all"
          style={{ width: `${((index) / deck.length) * 100}%` }}
        />
      </div>

      {/* Card */}
      <Card className="mt-5 overflow-hidden">
        <div className="surface-cream px-6 py-10 text-center sm:py-14">
          <p className="text-sm font-medium text-brand-emerald-deep">What are the three forms?</p>
          <div className="mt-3 flex items-center justify-center gap-2">
            <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight break-words text-foreground sm:text-5xl lg:text-6xl">
              {card.v1}
            </h2>
            <SpeakButton text={card.v1} />
          </div>
        </div>
        <div className="px-6 py-6">
          {!flipped ? (
            <div className="flex flex-col items-center gap-3">
              <Button size="lg" onClick={() => setFlipped(true)}>
                <Eye className="size-4" /> Show answer
              </Button>
              <p className="text-xs text-muted-foreground">
                Try to recall V2, V3, and the meaning before flipping.
              </p>
            </div>
          ) : (
            <div>
              <div className="grid gap-3 sm:grid-cols-3">
                <FormBox label="V1" value={card.v1} />
                <FormBox label="V2" value={card.v2} alts={parseAlts(card.v2Alts)} />
                <FormBox label="V3" value={card.v3} alts={parseAlts(card.v3Alts)} />
              </div>
              <div className="mt-4 rounded-lg border border-border bg-card p-4">
                <p className="text-xs font-semibold text-muted-foreground">Meaning</p>
                <p className="mt-1 text-foreground">{card.meaning}</p>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <Button size="lg" variant="outline" onClick={onPractice} className="border-amber-300 text-amber-700 hover:bg-amber-50">
                  <X className="size-4" /> Need practice
                </Button>
                <Button size="lg" onClick={onKnow} className="bg-brand-emerald text-white hover:bg-brand-emerald-deep">
                  <Check className="size-4" /> I knew it
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

function FormBox({
  label,
  value,
  alts = [],
}: {
  label: string;
  value: string;
  alts?: string[];
}) {
  return (
    <div className="rounded-xl border border-border bg-background p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-muted-foreground">{label}</p>
        <SpeakButton text={value} />
      </div>
      <p className="mt-2 font-display text-2xl font-semibold text-foreground">{value}</p>
      {alts.length > 0 && (
        <p className="mt-1 text-xs text-muted-foreground">also: {alts.join(", ")}</p>
      )}
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string | number;
  tone: "emerald" | "amber" | "navy";
}) {
  const tones = {
    emerald: "bg-accent text-brand-emerald-deep",
    amber: "bg-amber-50 text-amber-700",
    navy: "bg-brand-navy text-white",
  };
  return (
    <div className={cn("rounded-lg py-4", tones[tone])}>
      <p className="font-display text-2xl font-semibold">{value}</p>
      <p className="mt-0.5 text-xs opacity-80">{label}</p>
    </div>
  );
}
