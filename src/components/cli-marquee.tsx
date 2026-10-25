const CLIS = ["Claude Code", "Codex CLI", "GitHub Copilot CLI", "Antigravity", "Worktree isolation", "Deterministic gate", "Human-approved commits"];

export function CliMarquee() {
  const row = [...CLIS, ...CLIS];
  return (
    <div className="marquee overflow-hidden border-y border-ink/10 bg-tile py-4" aria-label="Works with Claude Code, Codex CLI, GitHub Copilot CLI and Antigravity">
      <div className="marquee-track flex w-max gap-12 pr-12" aria-hidden="true">
        {row.map((c, i) => (
          <span key={i} className="flex items-center gap-12 font-display text-2xl font-semibold tracking-tight text-ink/80">
            {c}
            <span className="h-2 w-2 rounded-full bg-signal" />
          </span>
        ))}
      </div>
    </div>
  );
}
