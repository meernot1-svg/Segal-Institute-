"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Save, RotateCcw, Image as ImageIcon, X } from "lucide-react";
import { HOME_FIELDS, type HomeField } from "@/lib/home-content";
import { cn } from "@/lib/utils";

type ContentMap = Record<string, { value: string; kind: string; label: string | null } | undefined>;

function resizeImage(file: File, maxDim = 1280, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read file"));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Could not load image"));
      img.onload = () => {
        let { width, height } = img;
        if (width > height && width > maxDim) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else if (height > maxDim) {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("Canvas unavailable"));
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export function AdminHomeContentClient() {
  const [content, setContent] = useState<ContentMap | null>(null);
  const [loading, setLoading] = useState(true);
  const [savingKey, setSavingKey] = useState<string | null>(null);
  const [expandedGroup, setExpandedGroup] = useState<string | null>("Hero section");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/home-content");
        const data = await res.json();
        if (cancelled) return;
        if (data.content) setContent(data.content);
      } catch {
        // ignore — defaults will render
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  async function saveField(field: HomeField, value: string) {
    setSavingKey(field.key);
    try {
      const res = await fetch("/api/admin/home-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: field.key, value }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      // Update local state
      setContent((c) => ({
        ...(c || {}),
        [field.key]: { value, kind: field.type === "image" ? "image" : "text", label: field.label },
      }));
      toast.success(`Saved "${field.label}".`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSavingKey(null);
    }
  }

  async function resetField(field: HomeField) {
    if (!confirm(`Reset "${field.label}" to the default? This clears the saved value.`)) return;
    await saveField(field, "");
  }

  async function handleImageUpload(field: HomeField, file: File | undefined) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("Image too large. Please pick an image under 10MB.");
      return;
    }
    toast.info("Processing image…");
    try {
      const dataUrl = await resizeImage(file);
      await saveField(field, dataUrl);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Image upload failed");
    }
  }

  async function clearImage(field: HomeField) {
    if (!confirm("Remove this image?")) return;
    await saveField(field, "");
  }

  if (loading) {
    return <div className="flex justify-center py-16"><Loader2 className="size-8 animate-spin text-brand-emerald" /></div>;
  }

  // Group fields by their `group` property
  const groups: { group: string; fields: HomeField[] }[] = [];
  for (const f of HOME_FIELDS) {
    let g = groups.find((x) => x.group === f.group);
    if (!g) {
      g = { group: f.group, fields: [] };
      groups.push(g);
    }
    g.fields.push(f);
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        <p className="font-medium">How this works</p>
        <p className="mt-1">
          Edit any field below to change what appears on the public homepage. Text fields are saved as you click Save.
          Image fields accept a JPG/PNG upload — the image is resized to max 1280px and stored as a data URL.
          Empty fields fall back to the original default copy.
        </p>
      </div>

      {groups.map((g) => {
        const expanded = expandedGroup === g.group;
        return (
          <Card key={g.group}>
            <CardHeader>
              <button
                onClick={() => setExpandedGroup(expanded ? null : g.group)}
                className="flex w-full items-center justify-between gap-3 text-left"
              >
                <CardTitle className="text-base font-semibold">{g.group}</CardTitle>
                <span className="text-xs font-medium text-muted-foreground">{expanded ? "Collapse" : "Expand"}</span>
              </button>
            </CardHeader>
            {expanded && (
              <CardContent className="space-y-5">
                {g.fields.map((f) => (
                  <FieldEditor
                    key={f.key}
                    field={f}
                    value={content?.[f.key]?.value || ""}
                    saving={savingKey === f.key}
                    onSave={(v) => saveField(f, v)}
                    onReset={() => resetField(f)}
                    onImageUpload={(file) => handleImageUpload(f, file)}
                    onClearImage={() => clearImage(f)}
                  />
                ))}
              </CardContent>
            )}
          </Card>
        );
      })}
    </div>
  );
}

function FieldEditor({
  field,
  value,
  saving,
  onSave,
  onReset,
  onImageUpload,
  onClearImage,
}: {
  field: HomeField;
  value: string;
  saving: boolean;
  onSave: (v: string) => void;
  onReset: () => void;
  onImageUpload: (file: File | undefined) => void;
  onClearImage: () => void;
}) {
  const [draft, setDraft] = useState(value);

  // Sync draft when external value changes (e.g. after save)
  useEffect(() => {
    setDraft(value);
  }, [value]);

  const dirty = draft !== value;
  const isImage = field.type === "image";

  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between gap-2">
        <Label htmlFor={field.key} className="text-xs uppercase tracking-wider text-muted-foreground">
          {field.label}
        </Label>
        <span className="text-[10px] font-mono text-muted-foreground/70">{field.key}</span>
      </div>

      {isImage ? (
        <div className="space-y-2">
          {value && value.startsWith("data:image/") ? (
            <div className="relative inline-block">
              <img
                src={value}
                alt={field.label}
                className="max-h-44 rounded-md border border-border object-contain"
              />
              <button
                onClick={onClearImage}
                className="absolute -right-2 -top-2 inline-flex size-7 items-center justify-center rounded-full bg-red-500 text-white shadow hover:bg-red-600"
                aria-label="Remove image"
              >
                <X className="size-3.5" />
              </button>
            </div>
          ) : value ? (
            <a href={value} target="_blank" rel="noopener noreferrer" className="block max-w-xs truncate text-xs text-brand-emerald-deep underline">{value}</a>
          ) : (
            <div className="rounded-md border border-dashed border-border bg-muted/30 p-6 text-center">
              <ImageIcon className="mx-auto size-6 text-muted-foreground/50" />
              <p className="mt-1 text-xs text-muted-foreground">No image uploaded — homepage will skip this image slot.</p>
            </div>
          )}
          <div className="flex flex-wrap items-center gap-2">
            <label className={cn(
              "inline-flex h-10 cursor-pointer items-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-medium transition-colors hover:bg-accent",
              saving && "opacity-60 pointer-events-none",
            )}>
              {saving ? <Loader2 className="size-4 animate-spin" /> : <ImageIcon className="size-4" />}
              {value ? "Replace image" : "Upload image"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => onImageUpload(e.target.files?.[0])}
              />
            </label>
            {value && (
              <Button onClick={onClearImage} variant="outline" size="sm">
                Remove
              </Button>
            )}
          </div>
        </div>
      ) : field.type === "textarea" ? (
        <textarea
          id={field.key}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={4}
          className="w-full resize-y rounded-md border border-border bg-background px-3 py-2 text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none"
        />
      ) : (
        <Input
          id={field.key}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          className="bg-background"
        />
      )}

      {!isImage && (
        <div className="flex items-center gap-2 pt-1">
          <Button onClick={() => onSave(draft)} disabled={saving || !dirty} size="sm">
            {saving ? <><Loader2 className="size-3.5 animate-spin" /> Saving…</> : <><Save className="size-3.5" /> Save</>}
          </Button>
          {dirty && (
            <Button onClick={() => setDraft(value)} variant="ghost" size="sm" disabled={saving}>
              Revert
            </Button>
          )}
          {value && (
            <Button onClick={onReset} variant="ghost" size="sm" disabled={saving}>
              <RotateCcw className="size-3.5" /> Reset to default
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
