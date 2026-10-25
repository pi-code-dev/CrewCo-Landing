"use client";

import { useState } from "react";

export function CopyCommand({ command, tone = "light" }: { command: string; tone?: "light" | "dark" }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard can be blocked (insecure context, permissions); the command stays selectable.
    }
  }

  const base = "inline-flex items-center gap-4 rounded-md px-4 py-3 font-mono text-[15px] transition-colors";
  const palette =
    tone === "dark"
      ? "bg-tile text-ink hover:bg-white"
      : "bg-ink text-tile hover:bg-ink-soft";

  return (
    <button type="button" onClick={copy} className={`${base} ${palette}`} aria-label={`Copy command: ${command}`}>
      <span className="select-all">
        <span className="opacity-50">$ </span>
        {command}
      </span>
      <span className="min-w-[4.5ch] text-left font-sans text-sm opacity-70" aria-live="polite">
        {copied ? "Copied" : "Copy"}
      </span>
    </button>
  );
}
