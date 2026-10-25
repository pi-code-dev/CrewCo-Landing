import { Logo } from "./logo";

// Illustrative lineup: the same mix the roster demo starts with.
const AGENTS = [
  { role: "Team Lead", cli: "Claude Code" },
  { role: "UI/UX Designer", cli: "Antigravity" },
  { role: "Developer", cli: "Codex CLI" },
  { role: "Tester", cli: "Claude Code" },
  { role: "Code Reviewer", cli: "Copilot CLI" },
];

function Arrow() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 16"
      className="h-4 w-12 shrink-0 rotate-90 text-ink/40 md:rotate-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path className="flow-line" d="M0 8h40" />
      <path d="M38 2l6 6-6 6" />
    </svg>
  );
}

export function Delegation() {
  return (
    <figure
      className="mt-12 flex flex-col items-stretch gap-4 md:flex-row md:items-center md:gap-5"
      aria-label="One task goes into CrewCo, which delegates each role to an agent on a different CLI"
    >
      <div className="rounded-lg border-2 border-dashed border-ink/30 p-5 md:w-56 md:shrink-0">
        <p className="text-sm text-ink-soft">One task</p>
        <p className="mt-2 font-display text-xl font-semibold leading-snug">
          &ldquo;Add rate limiting to the upload endpoint&rdquo;
        </p>
      </div>

      <div className="flex justify-center">
        <Arrow />
      </div>

      <div className="rounded-lg bg-ink p-5 text-tile md:w-64 md:shrink-0">
        <div className="flex items-center gap-3">
          <Logo size={28} />
          <p className="font-display text-xl font-semibold">CrewCo</p>
        </div>
        <ul className="mt-4 space-y-1.5 text-sm text-tile/75">
          <li>Scopes and splits the work</li>
          <li>Assigns each role to a CLI</li>
          <li>Tracks every run on one board</li>
        </ul>
      </div>

      <div className="flex justify-center">
        <Arrow />
      </div>

      <ul className="flex-1 space-y-2">
        {AGENTS.map((a) => (
          <li key={a.role} className="flex items-center justify-between gap-4 rounded-lg bg-tile px-4 py-3 shadow-sm transition-transform duration-300 hover:translate-x-1">
            <span className="font-display font-semibold">{a.role}</span>
            <span className="font-mono text-[13px] text-ink-soft">{a.cli}</span>
          </li>
        ))}
      </ul>
    </figure>
  );
}
