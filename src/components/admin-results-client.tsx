"use client";

import { useEffect, useRef, useState } from "react";
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
import { Trash2, Loader2, Sparkles, FileText, Image as ImageIcon } from "lucide-react";
import { monthKey } from "@/lib/format";

type Student = { id: string; name: string; email: string };
type Result = {
  id: string;
  periodKey: string;
  notes: string;
  generatedCard: string;
  imageUrl: string | null;
  createdAt: string;
  student: { id: string; name: string; email: string };
};

type Mode = "text" | "image";

export function AdminResultsClient({ students }: { students: Student[] }) {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<Mode>("image");
  const [studentId, setStudentId] = useState("");
  const [periodKey, setPeriodKey] = useState(monthKey());
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  // Image mode state
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [extraInstructions, setExtraInstructions] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

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

  async function handleImage(file: File) {
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB.");
      return;
    }
    setUploadingImage(true);
    try {
      const dataUrl = await resizeImage(file, 1280, 1600, 0.85);
      setImageDataUrl(dataUrl);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not load image");
    } finally {
      setUploadingImage(false);
    }
  }

  // Text mode: generate a single student's result card from notes
  async function generateFromNotes() {
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
      toast.success(`Result card generated for ${data.result?.student?.name || "student"}.`);
      setNotes("");
      await refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    } finally {
      setSaving(false);
    }
  }

  // Image mode: upload one image -> AI reads it -> generates a personalized
  // card for EVERY student and saves to each profile.
  async function generateFromImage() {
    if (!imageDataUrl) {
      toast.error("Upload a result-card image first.");
      return;
    }
    if (students.length === 0) {
      toast.error("No students registered yet.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/results/upload-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          periodKey,
          imageDataUrl,
          extraInstructions: extraInstructions.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      const n = data.studentCount || 0;
      toast.success(`AI read the image and generated personalized cards for ${n} student${n === 1 ? "" : "s"}.`);
      setImageDataUrl(null);
      setExtraInstructions("");
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
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="size-4" /> Monthly Results — AI-powered
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Mode switcher */}
          <div className="inline-flex rounded-lg border border-border p-1">
            <button
              type="button"
              onClick={() => setMode("image")}
              className={
                mode === "image"
                  ? "inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground"
                  : "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground"
              }
            >
              <ImageIcon className="size-3.5" /> Image (all students)
            </button>
            <button
              type="button"
              onClick={() => setMode("text")}
              className={
                mode === "text"
                  ? "inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground"
                  : "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground"
              }
            >
              <FileText className="size-3.5" /> Text notes (one student)
            </button>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="period">Month (YYYY-MM)</Label>
            <Input id="period" value={periodKey} onChange={(e) => setPeriodKey(e.target.value)} placeholder="2026-09" />
          </div>

          {mode === "image" ? (
            <>
              <div className="space-y-1.5">
                <Label>Result-card image</Label>
                <div className="flex items-center gap-3">
                  {imageDataUrl ? (
                    <img src={imageDataUrl} alt="Preview of the uploaded monthly result sheet" className="max-h-32 rounded-md border border-border object-contain" />
                  ) : (
                    <div className="flex size-20 items-center justify-center rounded-md border border-dashed border-border bg-muted/40 text-muted-foreground">
                      <ImageIcon className="size-6" />
                    </div>
                  )}
                  <div className="space-y-2">
                    <Button type="button" variant="outline" onClick={() => fileRef.current?.click()} disabled={uploadingImage || saving}>
                      {uploadingImage ? <><Loader2 className="size-4 animate-spin" /> Loading…</> : <><ImageIcon className="size-4" /> Upload image</>}
                    </Button>
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleImage(f);
                        e.target.value = "";
                      }}
                    />
                    {imageDataUrl && (
                      <button onClick={() => setImageDataUrl(null)} className="block text-xs text-muted-foreground hover:text-foreground">Remove</button>
                    )}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Upload ONE photo/screenshot of the result sheet. The AI reads it, then writes a <strong>personalized card for every student</strong> — each student sees their own on their dashboard.
                </p>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="extra">Extra instructions (optional)</Label>
                <Input id="extra" value={extraInstructions} onChange={(e) => setExtraInstructions(e.target.value)} placeholder="e.g. all students improved this month — be encouraging" />
              </div>
              <Button onClick={generateFromImage} disabled={saving || !imageDataUrl}>
                {saving ? <><Loader2 className="size-4 animate-spin" /> AI reading image + generating for all students…</> : <><Sparkles className="size-4" /> Generate for all {students.length} students</>}
              </Button>
            </>
          ) : (
            <>
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
                <Label htmlFor="notes">Your notes about this student this month</Label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={8}
                  placeholder={"e.g.:\n- Attendance: 22 of 24 days\n- Strong in verb forms, scored 90% on MCQ tests\n- Needs to work on written tests\n- Helpful in class, asks good questions"}
                  className="w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none"
                />
                <p className="text-xs text-muted-foreground">The AI will turn these notes into a polished result card for this one student.</p>
              </div>
              <Button onClick={generateFromNotes} disabled={saving || students.length === 0}>
                {saving ? <><Loader2 className="size-4 animate-spin" /> Generating…</> : <><Sparkles className="size-4" /> Generate result card</>}
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      {/* Results list */}
      <div>
        <h2 className="font-display text-lg font-semibold tracking-tight">Result cards ({results.length})</h2>
        {results.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">No result cards yet. Upload an image or write notes on the left.</p>
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
                        {r.imageUrl && <span className="rounded bg-accent px-2 py-0.5 text-xs text-brand-emerald-deep">from image</span>}
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

function resizeImage(file: File, w: number, h: number, quality: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        // Fit within w×h, preserving aspect ratio (don't crop)
        const scale = Math.min(w / img.width, h / img.height, 1);
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Canvas not supported"));
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = () => reject(new Error("Could not load image"));
      img.src = reader.result as string;
    };
    reader.onerror = () => reject(new Error("Could not read file"));
    reader.readAsDataURL(file);
  });
}
