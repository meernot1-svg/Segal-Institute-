"use client";

import { useEffect, useRef } from "react";

/**
 * Renders a video player for a student speech from ANY platform.
 *
 * Supports:
 *  - YouTube (watch / share / shorts / embed / youtu.be) → iframe embed
 *  - Vimeo → iframe embed
 *  - Dailymotion → iframe embed
 *  - Streamable → iframe embed
 *  - Google Drive (file/d/ID, open?id=ID, uc?id=ID) → iframe embed (preview)
 *  - TikTok → TikTok's official blockquote embed (loads their player)
 *  - Facebook / Instagram / Twitter (X) / non-embeddable platforms →
 *    a clean "Watch on <platform>" link card (opens in a new tab)
 *  - Direct video file URLs (mp4 / webm / mov / m3u8) → native <video>
 *  - base64 data URLs (uploaded files) → native <video>
 */

/* ----------------------------------------------------------- detection --- */

function detectYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/|youtube\.com\/live\/)([A-Za-z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

function detectVimeoId(url: string): string | null {
  // player.vimeo.com/video/123  OR  vimeo.com/123
  const m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return m ? m[1] : null;
}

function detectDailymotionId(url: string): string | null {
  // dailymotion.com/video/x123 OR dai.ly/x123
  const m = url.match(/(?:dailymotion\.com\/video\/|dai\.ly\/)([A-Za-z0-9]+)/);
  return m ? m[1] : null;
}

function detectStreamableId(url: string): string | null {
  // streamable.com/<id>
  const m = url.match(/streamable\.com\/([A-Za-z0-9]+)/);
  return m ? m[1] : null;
}

function detectGoogleDriveId(url: string): string | null {
  // drive.google.com/file/d/ID/view  OR  drive.google.com/open?id=ID  OR drive.google.com/uc?id=ID
  const m =
    url.match(/drive\.google\.com\/file\/d\/([A-Za-z0-9_-]+)/) ||
    url.match(/[?&]id=([A-Za-z0-9_-]+)/);
  return m ? m[1] : null;
}

function detectTikTok(url: string): { videoId: string; user: string } | null {
  // tiktok.com/@user/video/123 OR tiktok.com/@user
  const m = url.match(/tiktok\.com\/@([^/]+)\/video\/(\d+)/);
  if (m) return { user: m[1], videoId: m[2] };
  return null;
}

function isDirectVideoFile(url: string): boolean {
  // data URLs are direct video
  if (url.startsWith("data:")) return true;
  // Check the pathname extension (ignoring query string) for common video types
  try {
    const u = new URL(url);
    return /\.(mp4|webm|mov|m4v|ogv|m3u8|mpd)$/i.test(u.pathname);
  } catch {
    return false;
  }
}

function platformName(url: string): string {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    if (host.includes("youtube") || host === "youtu.be") return "YouTube";
    if (host.includes("vimeo")) return "Vimeo";
    if (host.includes("dailymotion") || host === "dai.ly") return "Dailymotion";
    if (host.includes("streamable")) return "Streamable";
    if (host.includes("drive.google")) return "Google Drive";
    if (host.includes("tiktok")) return "TikTok";
    if (host.includes("facebook") || host === "fb.watch") return "Facebook";
    if (host.includes("instagram")) return "Instagram";
    if (host.includes("twitter") || host === "x.com" || host.includes("t.co")) return "X (Twitter)";
    return host;
  } catch {
    return "the source";
  }
}

/* ----------------------------------------------------------- components --- */

function AspectFrame({ src, title, allow }: { src: string; title: string; allow?: string }) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-black">
      <iframe
        src={src}
        title={title}
        className="absolute inset-0 size-full"
        allow={allow || "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"}
        allowFullScreen
      />
    </div>
  );
}

function ExternalLinkCard({ url, name }: { url: string; name: string }) {
  // For platforms that don't allow raw iframe embedding (TikTok full-page,
  // Facebook, Instagram, X). Shows a clean "Watch on <platform>" button.
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-brand-emerald/40 hover:bg-accent"
    >
      <span className="inline-flex size-10 items-center justify-center rounded-md bg-brand-navy text-white">
        <PlayIcon />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-foreground">Watch on {name}</p>
        <p className="truncate text-xs text-muted-foreground">{url}</p>
      </div>
      <ExternalIcon />
    </a>
  );
}

function PlayIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

/* ----------------------------------------------------------- main ------ */

export function VideoPlayer({ src, title }: { src: string; title: string }) {
  if (!src) return null;

  // 1. YouTube
  const ytId = detectYouTubeId(src);
  if (ytId) {
    return <AspectFrame src={`https://www.youtube.com/embed/${ytId}`} title={title} />;
  }

  // 2. Vimeo
  const vimeoId = detectVimeoId(src);
  if (vimeoId) {
    return <AspectFrame src={`https://player.vimeo.com/video/${vimeoId}`} title={title} allow="autoplay; fullscreen; picture-in-picture" />;
  }

  // 3. Dailymotion
  const dmId = detectDailymotionId(src);
  if (dmId) {
    return <AspectFrame src={`https://www.dailymotion.com/embed/video/${dmId}`} title={title} allow="autoplay; fullscreen" />;
  }

  // 4. Streamable
  const stId = detectStreamableId(src);
  if (stId) {
    return <AspectFrame src={`https://streamable.com/e/${stId}`} title={title} allow="autoplay; fullscreen" />;
  }

  // 5. Google Drive
  const gdId = detectGoogleDriveId(src);
  if (gdId) {
    // preview embed — works for publicly-shared files
    return <AspectFrame src={`https://drive.google.com/file/d/${gdId}/preview`} title={title} allow="autoplay; fullscreen" />;
  }

  // 6. TikTok — official embed via blockquote + their script. We render the
  //    blockquote markup; the platform script turns it into a playable iframe.
  const tiktok = detectTikTok(src);
  if (tiktok) {
    return <TikTokEmbed url={src} user={tiktok.user} videoId={tiktok.videoId} />;
  }

  // 7. Direct video file (mp4/webm/mov/m3u8) or uploaded data URL → native <video>
  if (isDirectVideoFile(src)) {
    return (
      <div className="w-full overflow-hidden rounded-lg border border-border bg-black">
        <video src={src} title={title} controls className="mx-auto max-h-[480px] w-full" preload="metadata" />
      </div>
    );
  }

  // 8. Fallback: any other link (Facebook, Instagram, X, or unknown platform)
  //    → show a clean "Watch on <platform>" card that opens in a new tab.
  return <ExternalLinkCard url={src} name={platformName(src)} />;
}

/* ----------------------------------------------------------- TikTok ----- */

function TikTokEmbed({ url, user, videoId }: { url: string; user: string; videoId: string }) {
  const ref = useRef<HTMLQuoteElement>(null);

  useEffect(() => {
    // Load TikTok's official embed script once. It transforms
    // <blockquote class="tiktok-embed" data-video-id="..."> into an iframe.
    if (!(window as any).tiktokEmbedLoaded) {
      (window as any).tiktokEmbedLoaded = true;
      const s = document.createElement("script");
      s.src = "https://www.tiktok.com/embed.js";
      s.async = true;
      document.body.appendChild(s);
    } else if ((window as any).tiktok?.Embed) {
      // Script already loaded — re-run the loader on the new blockquote.
      (window as any).tiktok.Embed.lib.render();
    }
  }, [url]);

  return (
    <blockquote
      ref={ref}
      className="tiktok-embed"
      cite={url}
      data-video-id={videoId}
      style={{ maxWidth: "605px", minWidth: "325px" }}
    >
      <a href={url}>Watch on TikTok — @{user}</a>
    </blockquote>
  );
}
