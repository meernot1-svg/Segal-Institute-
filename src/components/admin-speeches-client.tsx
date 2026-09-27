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
import { Trash2, Loader2, Plus, Mic2 } from "lucide-react";

type Speech = {
  id: string;
  title: string;
  studentName: string;
  content: string;
  kind: string;
  createdAt: string;
};

export function AdminSpeechesClient() {
  const [speeches, setSpeeches] = useState<Speech[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [studentName, setStudentName] = useState("");
  const [content, setContent] = useState("");
  const [kind, setKind] = useState("speech");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await fetch("/api/admin/speeches");
      const data = await res.json();
      if (cancelled) return;
      if (data.speeches) setSpeeches(data.speeches);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function refresh() {
    const res = await fetch("/api/admin/speeches");
    const data = await res.json();
    if (data.speeches) setSpeeches(data.speeches);
  }

  async function save() {
    if (!title.trim() || !studentName.trim() || !content.trim()) {
      toast.error("Title, student name, and content are required.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/speeches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), studentName: studentName.trim(), content: content.trim(), kind }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      toast.success("Speech published — students can now see it.");
      setTitle("");
      setStudentName("");
      setContent("");
      setKind("speech");
      await refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this speech?")) return;
    await fetch(`/api/admin/speeches/${id}`, { method: "DELETE" });
    setSpeeches((s) => s.filter((x) => x.id !== id));
  }

  if (loading) {
    return <div className="flex justify-center py-16"><Loader2 className="size-8 animate-spin text-brand-emerald" /></div>;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Mic2 className="size-4" /> Upload a student speech</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. My dream for Pakistan" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="studentName">Student name</Label>
              <Input id="studentName" value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="e.g. Ayesha Khan" />
            </div>
            <div className="space-y-1.5">
              <Label>Kind</Label>
              <Select value={kind} onValueChange={setKind}>
                <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="speech">Speech</SelectItem>
                  <SelectItem value="poem">Poem</SelectItem>
                  <SelectItem value="essay">Essay</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="content">Content</Label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              placeholder="Paste or write the student's speech here…"
              className="w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none"
            />
          </div>
          <Button onClick={save} disabled={saving}>
            {saving ? <><Loader2 className="size-4 animate-spin" /> Publishing…</> : <><Plus className="size-4" /> Publish speech</>}
          </Button>
        </CardContent>
      </Card>

      <div>
        <h2 className="font-display text-lg font-semibold tracking-tight">Published speeches ({speeches.length})</h2>
        {speeches.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">No speeches published yet. Students will see what you publish here.</p>
        ) : (
          <div className="mt-3 space-y-3 max-h-[calc(100vh-16rem)] overflow-y-auto scroll-fine pr-1">
            {speeches.map((s) => (
              <Card key={s.id}>
                <CardContent className="pt-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <span className="rounded bg-muted px-2 py-0.5 text-xs capitalize">{s.kind}</span>
                      <p className="mt-1.5 font-medium text-foreground">{s.title}</p>
                      <p className="text-xs text-muted-foreground">by {s.studentName} · {new Date(s.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</p>
                      <p dir="auto" className="mt-2 line-clamp-4 whitespace-pre-wrap text-sm text-muted-foreground">{s.content}</p>
                    </div>
                    <button onClick={() => remove(s.id)} className="rounded p-1.5 text-muted-foreground hover:bg-red-50 hover:text-red-600" aria-label="Delete">
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
