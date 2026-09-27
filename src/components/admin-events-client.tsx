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
import { Trash2, Loader2, Plus, CalendarDays, Pencil, Clock, MapPin } from "lucide-react";
import { todayISO } from "@/lib/format";
import { cn } from "@/lib/utils";

type EventItem = {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string | null;
  location: string | null;
  color: "emerald" | "navy" | "gold" | "rose" | "violet";
  updatedAt: string;
};

const COLORS: { value: EventItem["color"]; label: string; dot: string }[] = [
  { value: "emerald", label: "Emerald", dot: "bg-brand-emerald" },
  { value: "navy", label: "Navy", dot: "bg-brand-navy" },
  { value: "gold", label: "Gold", dot: "bg-amber-500" },
  { value: "rose", label: "Rose", dot: "bg-rose-500" },
  { value: "violet", label: "Violet", dot: "bg-violet-500" },
];

export function AdminEventsClient() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<EventItem | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(todayISO());
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [color, setColor] = useState<EventItem["color"]>("emerald");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await fetch("/api/admin/events");
      const data = await res.json();
      if (cancelled) return;
      if (data.events) setEvents(data.events);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function refresh() {
    setLoading(true);
    const res = await fetch("/api/admin/events");
    const data = await res.json();
    if (data.events) setEvents(data.events);
    setLoading(false);
  }

  function startNew() {
    setEditing(null);
    setTitle("");
    setDescription("");
    setDate(todayISO());
    setTime("");
    setLocation("");
    setColor("emerald");
  }

  function startEdit(e: EventItem) {
    setEditing(e);
    setTitle(e.title);
    setDescription(e.description);
    setDate(e.date);
    setTime(e.time || "");
    setLocation(e.location || "");
    setColor(e.color);
  }

  async function save() {
    if (!title.trim() || !date) {
      toast.error("Title and date are required.");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        title: title.trim(),
        description: description.trim(),
        date,
        time: time.trim() || undefined,
        location: location.trim() || undefined,
        color,
      };
      const res = editing
        ? await fetch(`/api/admin/events/${editing.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
        : await fetch("/api/admin/events", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      toast.success(editing ? "Event updated — students will see it on their calendar." : "Event created — students will see it on their dashboard calendar.");
      startNew();
      await refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this event?")) return;
    await fetch(`/api/admin/events/${id}`, { method: "DELETE" });
    setEvents((s) => s.filter((x) => x.id !== id));
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
            {editing ? "Edit event" : "New event"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="time">Time (optional)</Label>
              <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Annual Speech Competition" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="description">Description (optional)</Label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="What is this event? Where should students go? Any details."
              className="w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="location">Location (optional)</Label>
            <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Main hall, Segal Institute" />
          </div>
          <div className="space-y-1.5">
            <Label>Color tag (shown on the calendar)</Label>
            <div className="flex flex-wrap gap-2">
              {COLORS.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setColor(c.value)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
                    color === c.value
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-background hover:bg-accent",
                  )}
                >
                  <span className={cn("size-2.5 rounded-full", c.dot)} />
                  {c.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={save} disabled={saving}>
              {saving ? <><Loader2 className="size-4 animate-spin" /> Saving…</> : editing ? "Update event" : <><Plus className="size-4" /> Create event</>}
            </Button>
            {editing && (
              <Button variant="outline" onClick={startNew}>Cancel edit</Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* List */}
      <div>
        <h2 className="font-display text-lg font-semibold tracking-tight">All events ({events.length})</h2>
        {events.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">No events yet. Create your first one on the left.</p>
        ) : (
          <div className="mt-3 space-y-3 lg:max-h-[calc(100vh-16rem)] lg:overflow-y-auto scroll-fine pr-1">
            {events.map((e) => {
              const color = COLORS.find((c) => c.value === e.color);
              return (
                <Card key={e.id}>
                  <CardContent className="pt-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded bg-muted px-2 py-0.5 text-xs font-medium">{e.date}</span>
                          {e.time && (
                            <span className="inline-flex items-center gap-1 rounded bg-muted px-2 py-0.5 text-xs font-medium">
                              <Clock className="size-3" /> {e.time}
                            </span>
                          )}
                          {color && (
                            <span className="inline-flex items-center gap-1.5 rounded bg-background px-2 py-0.5 text-xs font-medium">
                              <span className={cn("size-2.5 rounded-full", color.dot)} />
                              {color.label}
                            </span>
                          )}
                        </div>
                        <p className="mt-2 font-medium text-foreground">{e.title}</p>
                        {e.description && (
                          <p className="mt-1 line-clamp-3 whitespace-pre-wrap text-sm text-muted-foreground">{e.description}</p>
                        )}
                        {e.location && (
                          <p className="mt-1.5 inline-flex items-center gap-1 text-xs text-muted-foreground">
                            <MapPin className="size-3" /> {e.location}
                          </p>
                        )}
                      </div>
                      <div className="flex shrink-0 flex-col gap-1">
                        <button onClick={() => startEdit(e)} className="rounded p-1.5 text-muted-foreground hover:bg-accent hover:text-foreground" aria-label="Edit">
                          <Pencil className="size-4" />
                        </button>
                        <button onClick={() => remove(e.id)} className="rounded p-1.5 text-muted-foreground hover:bg-red-50 hover:text-red-600" aria-label="Delete">
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
