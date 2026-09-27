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
import { Trash2, Loader2, Plus, Mic2, Video, Link2, FileText } from "lucide-react";

type Speech = {
  id: string;
  title: string;
  description: string;
  studentName: string;
  content: string;
  videoUrl: string | null;
  videoData: string | null;
  kind: string;
  createdAt: string;
};

type Mode = "video" | "text";

export function AdminSpeechesClient() {
  const [speeches, setSpeeches] = useState<Speech[]>([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<Mode>("video");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [studentName, setStudentName] = useState("");
  const [content, setContent] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoData, setVideoData] = useState<string | null>(null);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

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

  async function handleVideoFile(file: File) {
    if (!file.type.startsWith("video/")) {
      toast.error("Please choose a video file.");
      return;
    }
    // Cap at ~15MB so the data URL fits in the request body (Vercel limit ~4.5MB
    // for the JSON body — but we allow up to 15MB to cover compressed mp4s).
    if (file.size > 15 * 1024 * 1024) {
      toast.error("Video must be under 15MB. For larger videos, paste a YouTube/Vimeo link instead.");
      return;
    }
    setUploadingVideo(true);
    try {
      const dataUrl = await readAsDataUrl(file);
      setVideoData(dataUrl);
      setVideoUrl(""); // clear URL since we're using the file
      toast.success(`Loaded "${file.name}" (${(file.size / 1024 / 1024).toFixed(1)} MB). Click publish to upload.`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not load video");
    } finally {
      setUploadingVideo(false);
    }
  }

  async function save() {
    if (!title.trim()) {
      toast.error("Title is required.");
      return;
    }
    if (mode === "text" && !content.trim()) {
      toast.error("Content is required for text speeches.");
      return;
    }
    if (mode === "video" && !videoUrl && !videoData) {
      toast.error("Provide a video URL or upload a video file.");
      return;
    }
    setSaving(true);
    try {
      const payload: Record<string, unknown> = {
        title: title.trim(),
        description: description.trim(),
        studentName: studentName.trim(),
        kind: mode === "video" ? "video" : "speech",
      };
      if (mode === "text") payload.content = content.trim();
      if (mode === "video") {
        if (videoUrl.trim()) payload.videoUrl = videoUrl.trim();
        if (videoData) payload.videoData = videoData;
      }
      const res = await fetch("/api/admin/speeches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      toast.success(mode === "video" ? "Video speech published — students can now watch it." : "Speech published — students can now read it.");
      setTitle("");
      setDescription("");
      setStudentName("");
      setContent("");
      setVideoUrl("");
      setVideoData(null);
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
      {/* Editor */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {mode === "video" ? <Video className="size-4" /> : <Mic2 className="size-4" />}
            {mode === "video" ? "Upload a student video speech" : "Write a student speech"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Mode switcher */}
          <div className="inline-flex rounded-lg border border-border p-1">
            <button
              type="button"
              onClick={() => setMode("video")}
              className={
                mode === "video"
                  ? "inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground"
                  : "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground"
              }
            >
              <Video className="size-3.5" /> Video
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
              <FileText className="size-3.5" /> Text
            </button>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="title">Title</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={mode === "video" ? "e.g. My dream for Pakistan" : "e.g. Welcome speech for Annual Day"} />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="desc">Description</Label>
            <Input id="desc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="A short description shown under the title" />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="studentName">Student name</Label>
            <Input id="studentName" value={studentName} onChange={(e) => setStudentName(e.target.value)} placeholder="e.g. Ayesha Khan (optional)" />
          </div>

          {mode === "video" ? (
            <>
              <div className="space-y-1.5">
                <Label htmlFor="videoUrl"><span className="inline-flex items-center gap-1.5"><Link2 className="size-3.5" /> Video URL (YouTube / Vimeo / direct MP4)</span></Label>
                <Input id="videoUrl" value={videoUrl} onChange={(e) => { setVideoUrl(e.target.value); if (e.target.value) setVideoData(null); }} placeholder="https://youtube.com/watch?v=…  or  https://example.com/video.mp4" />
              </div>
              <div className="space-y-1.5">
                <Label>Or upload a video file (under 15MB)</Label>
                <div className="flex items-center gap-3">
                  <Button type="button" variant="outline" onClick={() => fileRef.current?.click()} disabled={uploadingVideo}>
                    {uploadingVideo ? <><Loader2 className="size-4 animate-spin" /> Loading…</> : <><Video className="size-4" /> Choose video</>}
                  </Button>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) handleVideoFile(f);
                      e.target.value = "";
                    }}
                  />
                  {videoData && <span className="text-xs text-brand-emerald-deep">Video ready to publish ✓</span>}
                </div>
                <p className="text-xs text-muted-foreground">
                  For larger videos, upload to YouTube and paste the link instead — Vercel's request body limit is ~4.5MB.
                </p>
              </div>
            </>
          ) : (
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
          )}

          <Button onClick={save} disabled={saving}>
            {saving ? <><Loader2 className="size-4 animate-spin" /> Publishing…</> : <><Plus className="size-4" /> Publish {mode === "video" ? "video" : "speech"}</>}
          </Button>
        </CardContent>
      </Card>

      {/* List */}
      <div>
        <h2 className="font-display text-lg font-semibold tracking-tight">Published ({speeches.length})</h2>
        {speeches.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">No speeches published yet. Students will see what you publish here.</p>
        ) : (
          <div className="mt-3 space-y-3 max-h-[calc(100vh-16rem)] overflow-y-auto scroll-fine pr-1">
            {speeches.map((s) => (
              <Card key={s.id}>
                <CardContent className="pt-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-muted px-2 py-0.5 text-xs capitalize">{s.kind}</span>
                        {s.studentName && <span className="text-xs text-muted-foreground">by {s.studentName}</span>}
                      </div>
                      <p className="mt-1.5 font-medium text-foreground">{s.title}</p>
                      {s.description && <p className="mt-0.5 text-sm text-muted-foreground">{s.description}</p>}
                      {s.kind === "video" && (
                        <p className="mt-1 text-xs text-brand-emerald-deep">
                          {s.videoUrl ? "🔗 Video link" : "📹 Uploaded video file"}
                        </p>
                      )}
                      <p className="mt-1 text-xs text-muted-foreground">{new Date(s.createdAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}</p>
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

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Could not read file"));
    reader.readAsDataURL(file);
  });
}
