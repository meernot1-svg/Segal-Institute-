"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, Loader2, Sparkles, FileText } from "lucide-react";
import { monthKey } from "@/lib/format";

type Student = { id: string; name: string; email: string };
type Result = {
  id: string;
  periodKey: string;
  notes: string;
  generatedCard: string;
  createdAt: string;
  student: { id: string; name: string; email: string };
};

export function AdminResultsClient({ students }: { students: Student[] }) {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [studentId, setStudentId] = useState("");
  const [periodKey, setPeriodKey] = useState(monthKey());
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await fetch("/api/admin/results");
      const data = await res.json();
      if (cancelled) return;
      if (data.results) setResults(data.results);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function refresh() {
    const res = await fetch("/api/admin/results");
    const data = await res.json();
    if (data.results) setResults(data.results);
  }

  async function generate() {
    if (!studentId) {
      toast.error("Pick a student.");
      return;
    }
    if (!notes.trim()) {
      toast.error("Write some notes for the AI to turn into a result card.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, periodKey, notes: notes.trim(), generate: true }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      toast.success("Result card generated and saved.");
      setNotes("");
      await refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this result card?")) return;
    await fetch(`/api/admin/results/${id}`, { method: "DELETE" });
    setResults((r) => r.filter((x) => x.id !== id));
  }

  if (loading) {
    return <div className="flex justify-center py-16"><Loader2 className="size-8 animate-spin text-brand-emerald" /></div>;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Sparkles className="size-4" /> Write notes → AI makes the result card</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Student</Label>
              <Select value={studentId} onValueChange={setStudentId}>
                <SelectTrigger className="w-full"><SelectValue placeholder="Select a student" /></SelectTrigger>
                <SelectContent>
                  {students.length === 0 ? (
                    <SelectItem value="_none" disabled>No students registered yet</SelectItem>
                  ) : (
                    students.map((s) => (
                      <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="period">Month (YYYY-MM)</Label>
              <Input id="period" value={periodKey} onChange={(e) => setPeriodKey(e.target.value)} placeholder="2026-09" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="notes">Your notes about this student this month</Label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={10}
              placeholder={"Write your raw notes here, e.g.:\n- Attendance: 22 of 24 days\n- Strong in verb forms, scored 90% on MCQ tests\n- Needs to work on written tests\n- Helpful in class, asks good questions"}
              className="w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none"
            />
            <p className="text-xs text-muted-foreground">The AI will turn these notes into a polished, structured monthly result card.</p>
          </div>
          <Button onClick={generate} disabled={saving || students.length === 0}>
            {saving ? <><Loader2 className="size-4 animate-spin" /> Generating…</> : <><Sparkles className="size-4" /> Generate result card</>}
          </Button>
        </CardContent>
      </Card>

      <div>
        <h2 className="font-display text-lg font-semibold tracking-tight">Result cards ({results.length})</h2>
        {results.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">No result cards yet. Write notes on the left and let the AI build a card.</p>
        ) : (
          <div className="mt-3 space-y-3 max-h-[calc(100vh-16rem)] overflow-y-auto scroll-fine pr-1">
            {results.map((r) => (
              <Card key={r.id}>
                <CardContent className="pt-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <FileText className="size-4 text-brand-emerald-deep" />
                        <p className="font-medium text-foreground">{r.student.name}</p>
                        <span className="rounded bg-muted px-2 py-0.5 text-xs">{r.periodKey}</span>
                      </div>
                      <details className="mt-2">
                        <summary className="cursor-pointer text-xs text-muted-foreground">Show result card</summary>
                        <p dir="auto" className="mt-2 whitespace-pre-wrap rounded-md border border-border bg-muted/30 p-3 text-sm text-foreground">{r.generatedCard}</p>
                      </details>
                    </div>
                    <button onClick={() => remove(r.id)} className="rounded p-1.5 text-muted-foreground hover:bg-red-50 hover:text-red-600" aria-label="Delete">
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
