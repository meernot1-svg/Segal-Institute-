"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search, X } from "lucide-react";
import { useTransition } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const LETTERS = "abcdefghijklmnopqrstuvwxyz".split("");

export function VerbsToolbar({
  q,
  status,
  difficulty,
  letter,
}: {
  q: string;
  status: string;
  difficulty: string;
  letter: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [, startTransition] = useTransition();

  function update(key: string, value: string) {
    const next = new URLSearchParams(params.toString());
    if (value && value !== "all") next.set(key, value);
    else next.delete(key);
    next.delete("page"); // reset pagination on filter change
    startTransition(() => router.push(`${pathname}?${next.toString()}`));
  }

  function onSearch(value: string) {
    const next = new URLSearchParams(params.toString());
    if (value) next.set("q", value);
    else next.delete("q");
    next.delete("page");
    startTransition(() => router.push(`${pathname}?${next.toString()}`));
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            defaultValue={q}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search verbs or meanings…"
            className="pl-9"
            aria-label="Search verbs"
          />
          {q && (
            <button
              onClick={() => onSearch("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 gap-3 sm:flex sm:w-auto">
          <Select value={status || "all"} onValueChange={(v) => update("status", v)}>
            <SelectTrigger className="w-full sm:w-[160px]" aria-label="Filter by status">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All verbs</SelectItem>
              <SelectItem value="learned">Learned</SelectItem>
              <SelectItem value="unlearned">Unlearned</SelectItem>
              <SelectItem value="difficult">Difficult</SelectItem>
              <SelectItem value="favorites">Favorites</SelectItem>
            </SelectContent>
          </Select>
          <Select value={difficulty || "all"} onValueChange={(v) => update("difficulty", v)}>
            <SelectTrigger className="w-full sm:w-[150px]" aria-label="Filter by difficulty">
              <SelectValue placeholder="Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any difficulty</SelectItem>
              <SelectItem value="1">Easy</SelectItem>
              <SelectItem value="2">Medium</SelectItem>
              <SelectItem value="3">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* A-Z letter bar */}
      <div className="flex flex-wrap items-center gap-1">
        <button
          onClick={() => update("letter", "")}
          className={cn(
            "rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
            !letter
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-accent hover:text-foreground"
          )}
        >
          All
        </button>
        {LETTERS.map((l) => (
          <button
            key={l}
            onClick={() => update("letter", l)}
            className={cn(
              "rounded-md px-2 py-1 text-xs font-medium uppercase transition-colors",
              letter === l
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-foreground"
            )}
          >
            {l}
          </button>
        ))}
      </div>
    </div>
  );
}
