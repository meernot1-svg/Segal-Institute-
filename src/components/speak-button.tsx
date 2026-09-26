"use client";

import { Volume2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function SpeakButton({
  text,
  className,
  label,
}: {
  text: string;
  className?: string;
  label?: string;
}) {
  const [speaking, setSpeaking] = useState(false);

  function speak() {
    if (typeof window === "undefined") return;
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    utter.rate = 0.92;
    utter.onstart = () => setSpeaking(true);
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(utter);
  }

  return (
    <button
      type="button"
      onClick={speak}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md text-sm font-medium transition-colors",
        "text-muted-foreground hover:text-brand-emerald-deep",
        speaking && "text-brand-emerald-deep",
        className
      )}
      aria-label={`Pronounce ${text}`}
      title="Hear pronunciation"
    >
      <Volume2 className={cn("size-4", speaking && "animate-pulse")} />
      {label && <span>{label}</span>}
    </button>
  );
}
