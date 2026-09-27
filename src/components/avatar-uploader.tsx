"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import { Camera, Loader2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Image upload + client-side resize to a small JPEG data URL.
 * Used for student avatar uploads.
 */
export function AvatarUploader({
  initialAvatar,
  initialName,
  onSaved,
}: {
  initialAvatar: string | null;
  initialName: string;
  onSaved?: (avatar: string | null) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState<string | null>(initialAvatar);
  const [uploading, setUploading] = useState(false);

  async function handleFile(file: File) {
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB.");
      return;
    }
    setUploading(true);
    try {
      const dataUrl = await resizeImage(file, 256, 256, 0.85);
      // Save immediately to the profile
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ avatar: dataUrl }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setAvatar(data.profile.avatarUrl);
      onSaved?.(data.profile.avatarUrl);
      toast.success("Profile photo updated.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        {avatar ? (
          <img
            src={avatar}
            alt={initialName}
            className="size-20 rounded-full border border-border object-cover"
          />
        ) : (
          <div className="flex size-20 items-center justify-center rounded-full bg-brand-navy font-display text-2xl font-semibold uppercase text-white">
            {initialName.charAt(0) || "S"}
          </div>
        )}
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="absolute -bottom-1 -right-1 inline-flex size-8 items-center justify-center rounded-full border border-border bg-background shadow-sm transition-colors hover:bg-accent"
          aria-label="Upload profile photo"
        >
          {uploading ? <Loader2 className="size-4 animate-spin" /> : <Camera className="size-4" />}
        </button>
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
      <div className="text-sm text-muted-foreground">
        <p className="font-medium text-foreground">{initialName}</p>
        <p className="mt-1">Click the camera to upload a photo. Images are resized to 256×256.</p>
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
        // Cover-fit (center-crop)
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

export function ProfileEditor({
  initialName,
  initialClassGrade,
  onSaved,
}: {
  initialName: string;
  initialClassGrade: string | null;
  onSaved?: (name: string, classGrade: string | null) => void;
}) {
  const [name, setName] = useState(initialName);
  const [classGrade, setClassGrade] = useState(initialClassGrade || "");
  const [saving, setSaving] = useState(false);

  async function save() {
    if (!name.trim()) {
      toast.error("Name is required.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), classGrade: classGrade.trim() || null }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      onSaved?.(data.profile.name, data.profile.classGrade);
      toast.success("Profile updated.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">Full name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none"
          placeholder="Your name"
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">Class / grade</label>
        <input
          value={classGrade}
          onChange={(e) => setClassGrade(e.target.value)}
          className="h-9 w-full rounded-md border border-border bg-background px-3 text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] outline-none"
          placeholder="e.g. Grade 9"
        />
      </div>
      <button
        onClick={save}
        disabled={saving}
        className={cn(
          "inline-flex h-9 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
        )}
      >
        {saving ? <Loader2 className="size-4 animate-spin" /> : <Check className="size-4" />}
        Save changes
      </button>
    </div>
  );
}
