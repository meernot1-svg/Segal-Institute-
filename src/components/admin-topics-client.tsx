"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, Loader2, Plus, CalendarDays, Pencil } from "lucide-react";
import { todayISO } from "@/lib/format";

type Topic = {
  id: string;
  title: string;
  body: string;
  date: string;
  createdAt: string;
};

export function AdminTopicsClient() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Topic | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [date, setDate] = useState(todayISO());
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await fetch("/api/admin/topics");
      const data = await res.json();
      if (cancelled) return;
      if (data.topics) setTopics(data.topics);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function refresh() {
    setLoading(true);
    const res = await fetch("/api/admin/topics");
    const data = await res.json();
    if (data.topics) setTopics(data.topics);
    setLoading(false);
  }

  function startNew() {
    setEditing(null);
    setTitle("");
    setBody("");
    setDate(todayISO());
  }

  function startEdit(t: Topic) {
    setEditing(t);
    setTitle(t.title);
    setBody(t.body);
    setDate(t.date);
  }

  async function save() {
    if (!title.trim() || !body.trim()) {
      toast.error("Title and body are required.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/topics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), body: body.trim(), date }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      toast.success(editing ? "Topic updated." : "Topic created — students will see it on the dashboard.");
      setEditing(null);
      setTitle("");
      setBody("");
      setDate(todayISO());
      await refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this topic?")) return;
    await fetch(`/api/admin/topics?id=${id}`, { method: "DELETE" });
    setTopics((t) => t.filter((x) => x.id !== id));
  }

  if (loading) {
    return <div className="flex justify-center py-16"><Loader2 className="size-8 animate-spin text-brand-emerald" /></div>;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Editor */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="size-4" />
            {editing ? "Edit topic" : "New daily topic"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="date">Date</Label>
            <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            <p className="text-xs text-muted-foreground">One topic per date. Today's date is selected by default.</p>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Today's topic: irregular verbs starting with 'b'" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="body">Body</Label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={8}
              placeholder="Write the topic content here. Students will see this on their dashboard."
              className="w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none"
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={save} disabled={saving}>
              {saving ? <><Loader2 className="size-4 animate-spin" /> Saving…</> : editing ? "Update topic" : <><Plus className="size-4" /> Create topic</>}
            </Button>
            {editing && (
              <Button variant="outline" onClick={startNew}>Cancel edit</Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* List */}
      <div>
        <h2 className="font-display text-lg font-semibold tracking-tight">All topics ({topics.length})</h2>
        {topics.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">No topics yet. Create your first one on the left.</p>
        ) : (
          <div className="mt-3 space-y-3 max-h-[calc(100vh-16rem)] overflow-y-auto scroll-fine pr-1">
            {topics.map((t) => (
              <Card key={t.id} className={t.date === todayISO() ? "border-brand-emerald/60" : undefined}>
                <CardContent className="pt-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-muted px-2 py-0.5 text-xs font-medium">{t.date}</span>
                        {t.date === todayISO() && (
                          <span className="rounded bg-accent px-2 py-0.5 text-xs font-medium text-brand-emerald-deep">Today</span>
                        )}
                      </div>
                      <p className="mt-2 font-medium text-foreground">{t.title}</p>
                      <p className="mt-1 line-clamp-3 whitespace-pre-wrap text-sm text-muted-foreground">{t.body}</p>
                    </div>
                    <div className="flex shrink-0 flex-col gap-1">
                      <button onClick={() => startEdit(t)} className="rounded p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground" aria-label="Edit">
                        <Pencil className="size-4" />
                      </button>
                      <button onClick={() => remove(t.id)} className="rounded p-1.5 text-muted-foreground hover:bg-red-50 hover:text-red-600" aria-label="Delete">
                        <Trash2 className="size-4" />
                      </button>
                    </div>
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
