"use client";

import { useState, useTransition } from "react";
import { Check, Star, AlertCircle, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Status = "new" | "learning" | "learned" | "difficult";

export function VerbActions({
  verbId,
  initialStatus,
  initialFavorited,
  size = "sm",
}: {
  verbId: string;
  initialStatus: Status;
  initialFavorited: boolean;
  size?: "sm" | "md";
}) {
  const [status, setStatus] = useState<Status>(initialStatus);
  const [favorited, setFavorited] = useState(initialFavorited);
  const [pending, startTransition] = useTransition();

  const learned = status === "learned";
  const difficult = status === "difficult";

  function setStatusSafe(next: Status) {
    if (pending) return;
    const prev = status;
    setStatus(next);
    startTransition(async () => {
      try {
        const res = await fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ verbId, status: next }),
        });
        if (!res.ok) throw new Error();
      } catch {
        setStatus(prev);
        toast.error("Could not update — try again");
      }
    });
  }

  function toggleFav() {
    if (pending) return;
    const prev = favorited;
    setFavorited((v) => !v);
    startTransition(async () => {
      try {
        const res = await fetch("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ verbId }),
        });
        if (!res.ok) throw new Error();
        const data = await res.json();
        setFavorited(!!data.favorited);
      } catch {
        setFavorited(prev);
        toast.error("Could not update favorite");
      }
    });
  }

  const btn = size === "md" ? "h-9 px-3" : "h-8 px-2.5";

  return (
    <div className="inline-flex items-center gap-1.5">
      <button
        type="button"
        onClick={() => setStatusSafe(learned ? "new" : "learned")}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-md border text-xs font-medium transition-colors",
          btn,
          learned
            ? "border-brand-emerald bg-accent text-brand-emerald-deep"
            : "border-border text-muted-foreground hover:border-brand-emerald/40 hover:text-foreground"
        )}
        title={learned ? "Marked learned — click to undo" : "Mark as learned"}
      >
        <Check className="size-3.5" />
        <span className="hidden sm:inline">Learned</span>
      </button>
      <button
        type="button"
        onClick={() => setStatusSafe(difficult ? "new" : "difficult")}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-md border text-xs font-medium transition-colors",
          btn,
          difficult
            ? "border-amber-400 bg-amber-50 text-amber-700"
            : "border-border text-muted-foreground hover:border-amber-400/50 hover:text-foreground"
        )}
        title={difficult ? "Marked difficult — click to undo" : "Mark as difficult"}
      >
        <AlertCircle className="size-3.5" />
        <span className="hidden sm:inline">Difficult</span>
      </button>
      <button
        type="button"
        onClick={toggleFav}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-md border text-xs font-medium transition-colors",
          btn,
          favorited
            ? "border-amber-400 bg-amber-50 text-amber-700"
            : "border-border text-muted-foreground hover:border-amber-400/50 hover:text-foreground"
        )}
        title={favorited ? "Remove from favorites" : "Add to favorites"}
        aria-pressed={favorited}
      >
        <Star className={cn("size-3.5", favorited && "fill-current")} />
      </button>
      {(learned || difficult) && (
        <button
          type="button"
          onClick={() => setStatusSafe("new")}
          className={cn(
            "inline-flex items-center gap-1 rounded-md text-xs font-medium text-muted-foreground transition-colors hover:text-foreground",
            btn
          )}
          title="Reset to new"
        >
          <RotateCcw className="size-3.5" />
        </button>
      )}
    </div>
  );
}
