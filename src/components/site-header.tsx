import { Logo } from "./logo";

export const REPO = "https://github.com/pi-code-dev/Crewco-app";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-ink/90 text-tile backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
      <a href="/" className="flex items-center gap-3 font-display text-xl font-semibold tracking-tight">
        <Logo size={26} />
        CrewCo
      </a>
      <nav aria-label="Main" className="flex items-center gap-6 text-[15px]">
        <a href="/#how" className="hidden text-tile/75 transition-colors hover:text-tile sm:inline">How it works</a>
        <a href="/#clis" className="hidden text-tile/75 transition-colors hover:text-tile sm:inline">CLIs</a>
        <a href="/docs" className="text-tile/75 transition-colors hover:text-tile">Docs</a>
        <a href="/#download" className="hidden text-tile/75 transition-colors hover:text-tile sm:inline">Download</a>
        <a href={REPO} className="rounded-md bg-tile px-3.5 py-2 font-medium text-ink transition-colors hover:bg-signal">GitHub</a>
      </nav>
      </div>
    </header>
  );
}
