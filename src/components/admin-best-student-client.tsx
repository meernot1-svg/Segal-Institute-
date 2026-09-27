"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Loader2, Trophy, Camera, Plus } from "lucide-react";
import { monthKey } from "@/lib/format";

type Best = {
  id: string;
  name: string;
  photo: string;
  month: string;
  blurb: string;
  active: boolean;
  createdAt: string;
};

export function AdminBestStudentClient() {
  const [all, setAll] = useState<Best[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [month, setMonth] = useState(monthKey());
  const [blurb, setBlurb] = useState("");
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await fetch("/api/admin/best-student");
      const data = await res.json();
      if (cancelled) return;
      if (data.bestStudents) setAll(data.bestStudents);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function refresh() {
    const res = await fetch("/api/admin/best-student");
    const data = await res.json();
    if (data.bestStudents) setAll(data.bestStudents);
  }

  async function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB.");
      return;
    }
    try {
      const dataUrl = await resizeImage(file, 320, 320, 0.85);
      setPhoto(dataUrl);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not load image");
    }
  }

  async function save() {
    if (!name.trim() || !photo || !blurb.trim()) {
      toast.error("Name, photo, and blurb are required.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/best-student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), photo, month, blurb: blurb.trim(), active: true }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      toast.success("Best student of the month published — students will see it on their dashboard.");
      setName("");
      setPhoto(null);
      setBlurb("");
      setMonth(monthKey());
      await refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Remove this best student?")) return;
    await fetch(`/api/admin/best-student/${id}`, { method: "DELETE" });
    setAll((a) => a.filter((x) => x.id !== id));
  }

  if (loading) {
    return <div className="flex justify-center py-16"><Loader2 className="size-8 animate-spin text-brand-emerald" /></div>;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Trophy className="size-4" /> Best Student of the Month</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label>Photo</Label>
            <div className="flex items-center gap-4">
              {photo ? (
                <img src={photo} alt="preview" className="size-24 rounded-xl border border-border object-cover" />
              ) : (
                <div className="flex size-24 items-center justify-center rounded-xl border border-dashed border-border bg-muted/40 text-muted-foreground">
                  <Camera className="size-6" />
                </div>
              )}
              <Button type="button" variant="outline" onClick={() => fileRef.current?.click()}>
                <Camera className="size-4" /> {photo ? "Change photo" : "Upload photo"}
              </Button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFile(f);
                  e.target.value = "";
                }}
              />
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="name">Student name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Ayesha Khan" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="month">Month (YYYY-MM)</Label>
              <Input id="month" value={month} onChange={(e) => setMonth(e.target.value)} placeholder="2026-09" />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="blurb">Why they're the best (short blurb)</Label>
            <textarea
              id="blurb"
              value={blurb}
              onChange={(e) => setBlurb(e.target.value)}
              rows={5}
              placeholder="e.g. Ayesha scored the highest in this month's tests, helped classmates, and never missed a day."
              className="w-full resize-none rounded-md border border-border bg-background px-3 py-2 text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none"
            />
          </div>
          <Button onClick={save} disabled={saving}>
            {saving ? <><Loader2 className="size-4 animate-spin" /> Publishing…</> : <><Plus className="size-4" /> Publish best student</>}
          </Button>
        </CardContent>
      </Card>

      <div>
        <h2 className="font-display text-lg font-semibold tracking-tight">Published ({all.length})</h2>
        {all.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">No best student published yet. The most recent active one shows on every student's dashboard.</p>
        ) : (
          <div className="mt-3 space-y-3">
            {all.map((b) => (
              <Card key={b.id}>
                <CardContent className="pt-5">
                  <div className="flex items-start gap-4">
                    <img src={b.photo} alt={b.name} className="size-16 shrink-0 rounded-lg border border-border object-cover" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground">{b.name}</p>
                        <span className="rounded bg-muted px-2 py-0.5 text-xs">{b.month}</span>
                        {b.active && <span className="rounded bg-accent px-2 py-0.5 text-xs text-brand-emerald-deep">Live</span>}
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">{b.blurb}</p>
                    </div>
                    <button onClick={() => remove(b.id)} className="rounded p-1.5 text-muted-foreground hover:bg-red-50 hover:text-red-600" aria-label="Delete">
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
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Canvas not supported"));
        const scale = Math.max(w / img.width, h / img.height);
        const sw = w / scale;
        const sh = h / scale;
        const sx = (img.width - sw) / 2;
        const sy = (img.height - sh) / 2;
        ctx.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.onerror = () => reject(new Error("Could not load image"));
      img.src = reader.result as string;
    };
    reader.onerror = () => reject(new Error("Could not read file"));
    reader.readAsDataURL(file);
  });
}
