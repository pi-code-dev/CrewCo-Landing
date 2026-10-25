import { Logo } from "./logo";
import { REPO } from "./site-header";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-ink-soft">
        <span className="flex items-center gap-3">
          <Logo size={20} />
          CrewCo. MIT licensed.
        </span>
        <span className="flex gap-6">
          <a href="/docs" className="underline underline-offset-4 hover:text-ink">Docs</a>
          <a href={REPO} className="underline underline-offset-4 hover:text-ink">Source on GitHub</a>
        </span>
      </div>
    </footer>
  );
}
