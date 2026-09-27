"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, Loader2, Image as ImageIcon, Upload } from "lucide-react";
import { monthKey } from "@/lib/format";

type ResultImage = {
  id: string;
  title: string;
  month: string;
  imageUrl: string;
  createdAt: string;
};

export function AdminResultsClient() {
  const [images, setImages] = useState<ResultImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [month, setMonth] = useState(monthKey());
  const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const res = await fetch("/api/admin/result-images");
      const data = await res.json();
      if (cancelled) return;
      if (data.images) setImages(data.images);
      setLoading(false);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function refresh() {
    const res = await fetch("/api/admin/result-images");
    const data = await res.json();
    if (data.images) setImages(data.images);
  }

  async function handleImage(file: File) {
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file.");
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      toast.error("Image must be under 8MB.");
      return;
    }
    setUploadingImage(true);
    try {
      const dataUrl = await resizeImage(file, 1400, 1800, 0.85);
      setImageDataUrl(dataUrl);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not load image");
    } finally {
      setUploadingImage(false);
    }
  }

  async function save() {
    if (!title.trim()) {
      toast.error("Title is required.");
      return;
    }
    if (!imageDataUrl) {
      toast.error("Please upload an image.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/admin/result-images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), month, imageUrl: imageDataUrl }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      toast.success(`Result image for ${month} published — all students can now see it.`);
      setTitle("");
      setImageDataUrl(null);
      await refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this result image?")) return;
    await fetch(`/api/admin/result-images/${id}`, { method: "DELETE" });
    setImages((a) => a.filter((x) => x.id !== id));
  }

  if (loading) {
    return <div className="flex justify-center py-16"><Loader2 className="size-8 animate-spin text-brand-emerald" /></div>;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Upload form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ImageIcon className="size-4" /> Upload monthly result image</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. September 2026 Monthly Results" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="month">Month (YYYY-MM)</Label>
            <Input id="month" value={month} onChange={(e) => setMonth(e.target.value)} placeholder="2026-09" />
            <p className="text-xs text-muted-foreground">One image per month. Uploading for a month that already exists replaces the old image.</p>
          </div>
          <div className="space-y-1.5">
            <Label>Result image</Label>
            <div className="flex items-start gap-3">
              {imageDataUrl ? (
                <img src={imageDataUrl} alt="Preview of the monthly result image" className="max-h-40 rounded-md border border-border object-contain" />
              ) : (
                <div className="flex size-24 items-center justify-center rounded-md border border-dashed border-border bg-muted/40 text-muted-foreground">
                  <ImageIcon className="size-6" />
                </div>
              )}
              <div className="space-y-2">
                <Button type="button" variant="outline" onClick={() => fileRef.current?.click()} disabled={uploadingImage || saving}>
                  {uploadingImage ? <><Loader2 className="size-4 animate-spin" /> Loading…</> : <><Upload className="size-4" /> Choose image</>}
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
              Upload a photo or screenshot of the result sheet. <strong>All students see the same image</strong> on their My Monthly Results page.
            </p>
          </div>
          <Button onClick={save} disabled={saving || !imageDataUrl || !title.trim()}>
            {saving ? <><Loader2 className="size-4 animate-spin" /> Publishing…</> : <><Upload className="size-4" /> Publish to all students</>}
          </Button>
        </CardContent>
      </Card>

      {/* Published list */}
      <div>
        <h2 className="font-display text-lg font-semibold tracking-tight">Published images ({images.length})</h2>
        {images.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">No result images published yet. Upload one on the left.</p>
        ) : (
          <div className="mt-3 space-y-3 max-h-[calc(100vh-16rem)] overflow-y-auto scroll-fine pr-1">
            {images.map((img) => (
              <Card key={img.id}>
                <CardContent className="pt-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground">{img.title}</p>
                        <span className="rounded bg-muted px-2 py-0.5 text-xs">{img.month}</span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{new Date(img.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</p>
                      <img src={img.imageUrl} alt={`${img.title} — ${img.month}`} className="mt-3 max-h-32 rounded-md border border-border object-contain" />
                    </div>
                    <button onClick={() => remove(img.id)} className="rounded p-1.5 text-muted-foreground hover:bg-red-50 hover:text-red-600" aria-label="Delete">
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
