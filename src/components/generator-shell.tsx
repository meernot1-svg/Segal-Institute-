"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Sparkles, Copy, RotateCw, Save, Trash2, Download } from "lucide-react";
import { cn } from "@/lib/utils";

export type Field = {
  key: string;
  label: string;
  placeholder?: string;
  type?: "text" | "select";
  options?: string[];
  required?: boolean;
};

export type SavedItem = {
  id: string;
  topic: string;
  createdAt: string;
  content: string;
  meta?: string;
};

export function GeneratorShell({
  title,
  subtitle,
  endpoint,
  fields,
  renderSaved,
  showLibrary,
}: {
  title: string;
  subtitle: string;
  endpoint: string;
  fields: Field[];
  renderSaved?: (items: SavedItem[]) => React.ReactNode;
  // Server components can't pass a function to a client component, so we
  // also accept a plain boolean to enable the saved-library section.
  showLibrary?: boolean;
}) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState<SavedItem[]>([]);
  const [savedId, setSavedId] = useState<string | null>(null);

  function update(k: string, v: string) {
    setValues((s) => ({ ...s, [k]: v }));
  }

  async function generate(save = false) {
    const topic = values.topic?.trim();
    const lesson = values.lesson?.trim();
    // Allow a lesson to substitute for the topic — the sentence generator
    // accepts either a free-text topic OR a picked lesson (or both).
    if (!topic && !lesson) {
      toast.error("Please enter a topic or pick a lesson.");
      return;
    }
    // If only a lesson was picked (no topic), use the lesson title as the topic
    // so the user prompt has something concrete to work with. The lesson string
    // looks like "Basic · 1. What are Verbs?" — strip the tier prefix for the
    // display topic, but pass the full string too so the API can use it.
    const effectiveTopic = topic || lesson.replace(/^\w+\s·\s/, "");
    setLoading(true);
    setOutput(null);
    setSavedId(null);
    try {
      const payload = { ...values, topic: effectiveTopic, save };
      // If the lesson field is the "(no lesson…)" placeholder, don't send it.
      if (lesson && lesson.startsWith("(no lesson")) {
        delete (payload as Record<string, string | boolean>).lesson;
      }
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate");
      setOutput(data.speech || data.poem || data.sentence || "");
      if (data.savedId) {
        setSavedId(data.savedId);
        toast.success("Saved to your library.");
      }
      if (save) await refreshSaved();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Generation failed");
    } finally {
      setLoading(false);
    }
  }

  async function refreshSaved() {
    const res = await fetch(endpoint);
    const data = await res.json();
    if (data.speeches) setSaved(data.speeches.map((s: any) => ({ id: s.id, topic: s.topic, createdAt: s.createdAt, content: s.content, meta: [s.language, s.tone].filter(Boolean).join(" · ") })));
    if (data.poems) setSaved(data.poems.map((p: any) => ({ id: p.id, topic: p.topic, createdAt: p.createdAt, content: p.content, meta: [p.language, p.style, p.mood].filter(Boolean).join(" · ") })));
    if (data.sentences) setSaved(data.sentences.map((s: any) => ({ id: s.id, topic: s.topic, createdAt: s.createdAt, content: s.content, meta: [s.language, s.sentenceType, s.level, `${s.count} sentences`].filter(Boolean).join(" · ") })));
  }

  async function copyOutput() {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard.");
  }

  function downloadOutput() {
    if (!output) return;
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${values.topic || "output"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function printOutput() {
    if (!output) return;
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(`<pre style="font:16px/1.6 -apple-system,system-ui,sans-serif;padding:32px;max-width:720px;">${output.replace(/</g, "&lt;")}</pre>`);
    w.document.close();
    w.focus();
    w.print();
  }

  async function deleteSaved(id: string) {
    if (!confirm("Delete this saved item?")) return;
    await fetch(`${endpoint}/${id}`, { method: "DELETE" });
    setSaved((s) => s.filter((x) => x.id !== id));
  }

  // Load saved items on mount — shown when either `renderSaved` (function)
  // or `showLibrary` (boolean) is truthy. Server-component pages can only
  // pass the boolean; client-component pages can pass either.
  const libraryEnabled = Boolean(renderSaved || showLibrary);
  useEffect(() => {
    if (!libraryEnabled) return;
    let cancelled = false;
    (async () => {
      const res = await fetch(endpoint);
      const data = await res.json();
      if (cancelled) return;
      if (data.speeches) setSaved(data.speeches.map((s: any) => ({ id: s.id, topic: s.topic, createdAt: s.createdAt, content: s.content, meta: [s.language, s.tone].filter(Boolean).join(" · ") })));
      if (data.poems) setSaved(data.poems.map((p: any) => ({ id: p.id, topic: p.topic, createdAt: p.createdAt, content: p.content, meta: [p.language, p.style, p.mood].filter(Boolean).join(" · ") })));
      if (data.sentences) setSaved(data.sentences.map((s: any) => ({ id: s.id, topic: s.topic, createdAt: s.createdAt, content: s.content, meta: [s.language, s.sentenceType, s.level, `${s.count} sentences`].filter(Boolean).join(" · ") })));
    })();
    return () => {
      cancelled = true;
    };
  }, [endpoint, libraryEnabled]);

  return (
    <div className="mx-auto max-w-5xl">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Input */}
        <Card>
          <CardHeader>
            <CardTitle>Inputs</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {fields.map((f) => (
              <div key={f.key} className="space-y-1.5">
                <Label htmlFor={f.key}>{f.label}{f.required && <span className="text-destructive"> *</span>}</Label>
                {f.type === "select" && f.options ? (
                  <Select value={values[f.key] || ""} onValueChange={(v) => update(f.key, v)}>
                    <SelectTrigger id={f.key} className="w-full">
                      <SelectValue placeholder={f.placeholder || "Select…"} />
                    </SelectTrigger>
                    <SelectContent>
                      {f.options.map((o) => (
                        <SelectItem key={o} value={o}>{o}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id={f.key}
                    value={values[f.key] || ""}
                    onChange={(e) => update(f.key, e.target.value)}
                    placeholder={f.placeholder}
                  />
                )}
              </div>
            ))}
            <div className="flex gap-2 pt-2">
              <Button onClick={() => generate(true)} disabled={loading} className="flex-1">
                {loading ? <><Loader2 className="size-4 animate-spin" /> Generating…</> : <><Sparkles className="size-4" /> Generate & save</>}
              </Button>
              <Button onClick={() => generate(false)} disabled={loading} variant="outline">
                <RotateCw className="size-4" /> Regenerate
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Output */}
        <Card className="flex flex-col">
          <CardHeader className="flex-row flex-wrap items-center justify-between gap-2">
            <CardTitle>Output</CardTitle>
            {output && (
              <div className="flex items-center gap-1">
                <Button onClick={copyOutput} variant="ghost" size="sm"><Copy className="size-3.5" /> Copy</Button>
                <Button onClick={downloadOutput} variant="ghost" size="sm"><Download className="size-3.5" /> Download</Button>
                <Button onClick={printOutput} variant="ghost" size="sm">Print</Button>
              </div>
            )}
          </CardHeader>
          <CardContent className="flex-1">
            {!output && !loading && (
              <div className="flex h-full min-h-[280px] flex-col items-center justify-center gap-2 text-center text-muted-foreground">
                <Sparkles className="size-8 text-muted-foreground/40" />
                <p className="text-sm">Your generated text will appear here.</p>
              </div>
            )}
            {loading && (
              <div className="flex h-full min-h-[280px] flex-col items-center justify-center gap-2 text-muted-foreground">
                <Loader2 className="size-8 animate-spin text-brand-emerald" />
                <p className="text-sm">Generating…</p>
              </div>
            )}
            {output && (
              <div dir="auto" className="prose-reading whitespace-pre-wrap rounded-lg border border-border bg-muted/30 p-4 text-sm leading-relaxed">
                {output}
              </div>
            )}
            {savedId && (
              <p className="mt-3 text-xs text-brand-emerald-deep">Saved to your library.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Saved library */}
      {libraryEnabled && (
        <div className="mt-10">
          <h2 className="font-display text-xl font-semibold tracking-tight">Your library</h2>
          {saved.length === 0 ? (
            <p className="mt-2 text-sm text-muted-foreground">Nothing saved yet. Click “Generate & save” to build your library.</p>
          ) : (
            <div className="mt-4 space-y-3">
              {saved.map((s) => (
                <Card key={s.id}>
                  <CardContent className="pt-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-medium text-foreground">{s.topic}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(s.createdAt).toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                          {s.meta && ` · ${s.meta}`}
                        </p>
                      </div>
                      <Button onClick={() => deleteSaved(s.id)} variant="ghost" size="sm"><Trash2 className="size-3.5" /></Button>
                    </div>
                    <pre className="prose-reading mt-3 whitespace-pre-wrap text-sm text-muted-foreground">{s.content}</pre>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
