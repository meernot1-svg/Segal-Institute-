"use client";

/**
 * Renders a video player for a speech.
 * Supports:
 *  - YouTube watch/share URLs → YouTube iframe embed
 *  - YouTube embed URLs (youtube.com/embed/...)
 *  - youtu.be short URLs
 *  - Vimeo URLs → Vimeo iframe embed
 *  - Direct video file URLs (mp4/webm) → <video>
 *  - base64 data URLs (uploaded files) → <video>
 */

function detectYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/)([A-Za-z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

function detectVimeoId(url: string): string | null {
  const m = url.match(/vimeo\.com\/(\d+)/);
  return m ? m[1] : null;
}

export function VideoPlayer({ src, title }: { src: string; title: string }) {
  if (!src) return null;

  const ytId = detectYouTubeId(src);
  if (ytId) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-black">
        <iframe
          src={`https://www.youtube.com/embed/${ytId}`}
          title={title}
          className="absolute inset-0 size-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  const vimeoId = detectVimeoId(src);
  if (vimeoId) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-black">
        <iframe
          src={`https://player.vimeo.com/video/${vimeoId}`}
          title={title}
          className="absolute inset-0 size-full"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  // Direct video file or data URL
  return (
    <div className="w-full overflow-hidden rounded-lg border border-border bg-black">
      <video
        src={src}
        title={title}
        controls
        className="mx-auto max-h-[480px] w-full"
        preload="metadata"
      />
    </div>
  );
}
