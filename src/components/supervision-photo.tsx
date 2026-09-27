"use client";

import { useState } from "react";

/**
 * Renders Sir Sajid Murad's photo from /sir.png. Falls back to "SM"
 * initials on a navy circle if the photo isn't uploaded yet.
 */
export function SupervisionPhoto() {
  const [error, setError] = useState(false);
  if (error) return <>SM</>;
  return (
    <img
      src="/sir.png"
      alt="Sir Sajid Murad"
      className="size-full object-cover"
      onError={() => setError(true)}
    />
  );
}
