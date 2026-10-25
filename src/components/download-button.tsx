"use client";

import { track } from "@vercel/analytics";
import { useEffect, useState } from "react";
import { DOWNLOADS, detectPlatform, type Platform } from "@/lib/downloads";

/** The hero's primary call to action. Server-renders as a generic link to
 * the download section, then becomes a direct download for the visitor's
 * OS once it's known (there's no reliable way to tell on the server). */
export function DownloadButton() {
  const [platform, setPlatform] = useState<Platform | null>(null);
  useEffect(() => setPlatform(detectPlatform()), []);

  // Fixed min width: the label changes once the OS is detected after
  // hydration, and a width change would nudge the link beside it.
  const base =
    "inline-flex min-w-[16.5rem] items-center justify-center gap-3 rounded-md bg-signal px-5 py-3 font-medium text-ink transition-colors hover:bg-tile";

  if (!platform) {
    return (
      <a href="#download" className={base}>
        <DownloadIcon />
        Download the app
      </a>
    );
  }

  const target = DOWNLOADS[platform];
  return (
    <a
      href={target.primary.href}
      className={base}
      onClick={() => track("Download", { platform, file: target.primary.file, from: "hero" })}
    >
      <DownloadIcon />
      Download for {target.name}
    </a>
  );
}

export function DownloadIcon() {
  return (
    <svg viewBox="0 0 20 20" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M10 3v10m0 0-4-4m4 4 4-4M4 16h12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
