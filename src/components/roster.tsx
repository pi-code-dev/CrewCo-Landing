"use client";

import { useEffect, useRef, useState } from "react";

const CLIS = ["Claude Code", "Codex CLI", "Copilot CLI", "Antigravity"] as const;
type Cli = (typeof CLIS)[number];

type SeatId = "lead" | "designer" | "developer" | "tester" | "reviewer";

interface Seat {
  id: SeatId;
  title: string;
  job: string;
  required?: boolean;
  startsFilled: boolean;
  cli: Cli;
  // What this seat reports in the demo log when it finishes its turn.
  report: string;
}

// Order matters: this is the order work moves through the crew.
const SEATS: Seat[] = [
  {
    id: "lead",
    title: "Team Lead",
    job: "Scopes the task with you in chat, writes the acceptance criteria and picks the lineup.",
    required: true,
    startsFilled: true,
    cli: "Claude Code",
    report: "scoped the task, wrote the acceptance criteria",
  },
  {
    id: "designer",
    title: "UI/UX Designer",
    job: "Writes a design spec before any code exists. Opt-in per task.",
    startsFilled: false,
    cli: "Antigravity",
    report: "design spec ready",
  },
  {
    id: "developer",
    title: "Developer",
    job: "Implements the task in an isolated git worktree.",
    startsFilled: true,
    cli: "Codex CLI",
    report: "implemented in the worktree",
  },
  {
    id: "tester",
    title: "Tester",
    job: "Writes and runs tests against the acceptance criteria.",
    startsFilled: true,
    cli: "Claude Code",
    report: "tests pass",
  },
  {
    id: "reviewer",
    title: "Code Reviewer",
    job: "Reads the diff for correctness, style and security.",
    startsFilled: true,
    cli: "Copilot CLI",
    report: "approved",
  },
];

const STEP_MS = 1100;

export function Roster() {
  const [filled, setFilled] = useState<Record<SeatId, boolean>>(() =>
    Object.fromEntries(SEATS.map((s) => [s.id, s.startsFilled])) as Record<SeatId, boolean>,
  );
  const [clis, setClis] = useState<Record<SeatId, Cli>>(() =>
    Object.fromEntries(SEATS.map((s) => [s.id, s.cli])) as Record<SeatId, Cli>,
  );
  const [step, setStep] = useState<number | null>(null); // index into the active lineup
  const [log, setLog] = useState<string[]>([]);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const lineup = SEATS.filter((s) => filled[s.id]);
  const running = step !== null && step < lineup.length;
  const finished = step !== null && step >= lineup.length;

  function stop() {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  }
  useEffect(() => stop, []);

  // Advance one seat at a time while a run is in flight.
  useEffect(() => {
    if (step === null) return;
    if (step >= lineup.length) return;
    const seat = lineup[step]!;
    timer.current = setTimeout(() => {
      setLog((l) => [...l, `${seat.title.padEnd(14)} ${clis[seat.id].padEnd(12)} ${seat.report}`]);
      setStep(step + 1);
    }, STEP_MS);
    return stop;
    // lineup/clis are snapshotted per run via reset() below, so only step drives this.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  function reset() {
    stop();
    setStep(null);
    setLog([]);
  }

  function run() {
    reset();
    setStep(0);
  }

  function toggle(id: SeatId) {
    reset();
    setFilled((f) => ({ ...f, [id]: !f[id] }));
  }

  function pick(id: SeatId, cli: Cli) {
    reset();
    setClis((c) => ({ ...c, [id]: cli }));
  }

  const activeSeat = running ? lineup[step]!.id : null;
  const doneIds = new Set(lineup.slice(0, Math.min(step ?? 0, lineup.length)).map((s) => s.id));

  return (
    <section aria-labelledby="roster-heading" className="w-full">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 id="roster-heading" className="font-display text-2xl font-semibold tracking-tight">
            Your crew
          </h2>
          <p className="mt-1 max-w-[60ch] text-ink-soft">
            Fill or empty a seat, pick the CLI each one runs on, then send a task through. Seats here are a
            demo. The real lineup is confirmed per task.
          </p>
        </div>
        <button
          type="button"
          onClick={run}
          disabled={running}
          className="rounded-md bg-signal px-5 py-3 font-semibold text-ink transition-colors hover:bg-[#ff7048] disabled:cursor-wait disabled:opacity-60"
        >
          {running ? "Running…" : finished ? "Run again" : "Run a task"}
        </button>
      </div>

      <ol className="mt-6 grid gap-3 md:grid-cols-5">
        {SEATS.map((seat) => {
          const on = filled[seat.id];
          const active = activeSeat === seat.id;
          const done = doneIds.has(seat.id);
          return (
            <li
              key={seat.id}
              className={[
                "relative flex flex-col rounded-lg p-4 transition-colors",
                on ? "bg-tile text-ink" : "border-2 border-dashed border-ink/25 bg-transparent text-ink/55",
                active ? "seat-active ring-2 ring-signal" : "",
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-display text-lg font-semibold leading-tight">{seat.title}</h3>
                <button
                  type="button"
                  role="switch"
                  aria-checked={on}
                  aria-label={`${on ? "Remove" : "Add"} ${seat.title}`}
                  disabled={seat.required}
                  onClick={() => toggle(seat.id)}
                  className={[
                    "relative mt-0.5 h-6 w-10 shrink-0 rounded-full transition-colors",
                    on ? "bg-ink" : "bg-ink/25",
                    seat.required ? "cursor-not-allowed opacity-50" : "cursor-pointer",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "absolute top-1 h-4 w-4 rounded-full bg-tile transition-all",
                      on ? "left-5" : "left-1",
                    ].join(" ")}
                  />
                </button>
              </div>

              <p className="mt-2 flex-1 text-sm leading-relaxed">{on ? seat.job : "Vacant. Switch it on to add this seat."}</p>

              <label className="mt-4 block text-sm">
                <span className="sr-only">CLI for {seat.title}</span>
                <select
                  value={clis[seat.id]}
                  disabled={!on}
                  onChange={(e) => pick(seat.id, e.target.value as Cli)}
                  className="w-full rounded-md border border-ink/20 bg-fog px-2 py-2 text-ink disabled:opacity-50"
                >
                  {CLIS.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>

              <div className="mt-3 h-5 text-sm font-medium" aria-hidden={!active && !done}>
                {active && <span className="font-semibold text-signal-deep">Working…</span>}
                {done && !active && <span className="text-pass">Done</span>}
              </div>
            </li>
          );
        })}
      </ol>

      <div
        className="mt-3 min-h-[9.5rem] rounded-lg bg-ink p-5 font-mono text-[13px] leading-7 text-tile"
        role="log"
        aria-live="polite"
        aria-label="Run log"
      >
        {log.length === 0 && !running && <p className="text-tile/50">Waiting for a task. Run one to watch it move through the seats above.</p>}
        {log.map((line, i) => (
          <p key={i} className="whitespace-pre-wrap break-words">
            <span className="text-pass">✓ </span>
            {line}
          </p>
        ))}
        {running && (
          <p className="text-tile/60">
            <span className="text-signal">› </span>
            {lineup[step!]!.title} is working on {clis[lineup[step!]!.id]}
          </p>
        )}
        {finished && <p className="mt-1 text-tile/60">Task finished. In a real run, findings loop back to the Developer for up to three rounds.</p>}
      </div>
    </section>
  );
}
