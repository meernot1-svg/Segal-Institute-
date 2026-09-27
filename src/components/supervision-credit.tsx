"use client";

import { useState } from "react";

/**
 * "Under the supervision of Sir Sajid Murad" credit block.
 * Client component so we can gracefully fall back if the photo isn't uploaded.
 */
export function SupervisionCredit() {
  const [imgError, setImgError] = useState(false);

  return (
    <section className="surface-cream">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-14 text-center sm:px-6 md:flex-row md:items-center md:text-left">
        <span className="inline-flex size-28 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-brand-navy font-display text-2xl font-semibold text-white shadow-sm sm:size-32">
          {imgError ? (
            "SM"
          ) : (
            <img
              src="/sir.png"
              alt="Sir Sajid Murad, supervising teacher at Segal Institute"
              className="size-full object-cover"
              onError={() => setImgError(true)}
            />
          )}
        </span>
        <div className="max-w-xl">
          <p className="text-xs font-medium uppercase tracking-wider text-brand-emerald-deep">
            Under the supervision of
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Sir Sajid Murad
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
            Segal Institute was built and is run under the guidance of Sir Sajid
            Murad. Every lesson, every test, and every daily topic is designed
            with his students in mind — practical, focused, and built to last.
          </p>
        </div>
      </div>
    </section>
  );
}
