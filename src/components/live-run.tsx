"use client";

import { useEffect, useState } from "react";

const SEATS = [
  { role: "Team Lead", cli: "Claude Code", out: "scoped task, 4 acceptance criteria" },
  { role: "Developer", cli: "Codex CLI", out: "implemented in worktree, +86 −12" },
  { role: "Tester", cli: "Claude Code", out: "14 tests pass" },
  { role: "Code Reviewer", cli: "Copilot CLI", out: "1 finding sent back to Developer" },
  { role: "Developer", cli: "Codex CLI", out: "round 2, finding fixed" },
  { role: "Gate", cli: "lint · types · tests", out: "green. Awaiting your commit" },
] as const;

const TICK = 1500;

export function LiveRun() {
  const [n, setN] = useState(0); // lines completed
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const r = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(r);
    if (r) {
      setN(SEATS.length);
      return;
    }
    const id = setInterval(() => setN((v) => (v >= SEATS.length + 2 ? 0 : v + 1)), TICK);
    return () => clearInterval(id);
  }, []);

  const shown = Math.min(n, SEATS.length);
  const working = !reduced && n < SEATS.length ? SEATS[n] : null;
  const done = n >= SEATS.length;

  return (
    <div
      className="fade-up relative rounded-xl border border-tile/15 bg-black/45 shadow-[0_32px_64px_-24px_rgb(0_0_0/0.8),0_8px_20px_-8px_rgb(0_0_0/0.5)] backdrop-blur-sm"
      style={{ "--d": "500ms" } as React.CSSProperties}
      role="img"
      aria-label="Illustration of a task moving through Team Lead, Developer, Tester and Code Reviewer, then a gate, ending in a human commit"
    >
      <div className="flex items-center gap-2 border-b border-tile/10 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-tile/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-tile/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-tile/20" />
        <span className="ml-3 font-mono text-xs text-tile/55">crewco run &ldquo;add rate limiting&rdquo;</span>
        <span className="ml-auto flex items-center gap-2 font-mono text-xs text-tile/60">
          <span className={`h-2 w-2 rounded-full ${done ? "bg-pass" : "live-dot bg-signal"}`} />
          {done ? "ready" : "live"}
        </span>
      </div>

      {/* Every line's slot is always rendered (invisible until reached), so
          the box is its final height from the first frame: growing it as
          lines arrived shifted the vertically centered hero beside it. */}
      <div className="space-y-2.5 p-5 font-mono text-[13px] leading-6 text-tile" aria-hidden="true">
        {SEATS.map((s, i) => {
          const state = i < shown ? "done" : working && i === n ? "working" : "pending";
          return (
            <p
              key={`${i}-${state}`}
              className={`grid grid-cols-[1.25rem_1fr] gap-x-1 ${state === "pending" ? "invisible" : "line-in"}`}
            >
              <span className={state === "done" ? "text-pass" : "text-signal"}>{state === "done" ? "✓" : "›"}</span>
              <span>
                <span className="font-semibold">{s.role}</span>
                <span className="text-tile/50"> on {s.cli}</span>
                {state === "working" && <span className="caret ml-1 inline-block h-3.5 w-1.5 translate-y-0.5 bg-signal" />}
                <br />
                <span className={state === "working" ? "invisible" : "text-tile/75"}>{s.out}</span>
              </span>
            </p>
          );
        })}
      </div>

      <div className="flex gap-1.5 border-t border-tile/10 px-5 py-3" aria-hidden="true">
        {SEATS.map((s, i) => (
          <span key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-tile/12">
            <span
              className="block h-full origin-left rounded-full bg-signal transition-transform duration-700 ease-out"
              style={{ transform: `scaleX(${i < shown ? 1 : i === n && !done ? 0.45 : 0})` }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
