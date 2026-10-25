"use client";

import { track } from "@vercel/analytics";
import { useEffect, useState } from "react";
import { DOWNLOADS, PLATFORMS, RELEASES, detectPlatform, type Platform } from "@/lib/downloads";
import { DownloadIcon } from "./download-button";

/** One card per OS, with the visitor's own OS (once detected) marked and
 * listed first. */
export function DownloadSection() {
  const [detected, setDetected] = useState<Platform | null>(null);
  useEffect(() => setDetected(detectPlatform()), []);

  const order = detected ? [detected, ...PLATFORMS.filter((p) => p !== detected)] : PLATFORMS;

  return (
    <div>
      <div className="grid gap-5 md:grid-cols-3">
        {order.map((p) => {
          const d = DOWNLOADS[p];
          const mine = p === detected;
          return (
            <div
              key={p}
              className={`flex flex-col rounded-lg border p-6 ${mine ? "border-ink bg-tile" : "border-ink/15 bg-white/50"}`}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-2xl font-semibold">{d.name}</h3>
                {mine && (
                  <span className="rounded-full bg-signal px-2.5 py-0.5 text-xs font-medium text-ink">Your system</span>
                )}
              </div>
              <a
                href={d.primary.href}
                onClick={() => track("Download", { platform: p, file: d.primary.file, from: "section" })}
                className={`mt-5 inline-flex items-center justify-center gap-2.5 rounded-md px-4 py-3 font-medium transition-colors ${
                  mine ? "bg-ink text-tile hover:bg-ink-soft" : "bg-ink/[0.08] text-ink hover:bg-ink/15"
                }`}
              >
                <DownloadIcon />
                {d.primary.label}
              </a>
              {d.others.length > 0 && (
                <ul className="mt-3 space-y-1.5 text-[15px]">
                  {d.others.map((o) => (
                    <li key={o.file}>
                      <a
                        href={o.href}
                        onClick={() => track("Download", { platform: p, file: o.file, from: "section" })}
                        className="text-ink-soft underline underline-offset-4 hover:text-ink"
                      >
                        {o.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
              <p className="mt-auto pt-5 text-sm leading-relaxed text-ink-soft">{d.firstOpen}</p>
            </div>
          );
        })}
      </div>
      <p className="mt-5 text-sm text-ink-soft">
        Free and open source. Every build, with release notes, is on{" "}
        <a href={RELEASES} className="underline underline-offset-4 hover:text-ink">
          GitHub Releases
        </a>
        .
      </p>
    </div>
  );
}
