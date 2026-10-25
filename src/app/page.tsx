import { CliMarquee } from "@/components/cli-marquee";
import { CopyCommand } from "@/components/copy-command";
import { Delegation } from "@/components/delegation";
import { DownloadButton } from "@/components/download-button";
import { DownloadSection } from "@/components/download-section";
import { LiveRun } from "@/components/live-run";
import { Reveal } from "@/components/reveal";
import { Roster } from "@/components/roster";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const HEADLINE = [
  { t: "Staff" }, { t: "a" }, { t: "team" }, { t: "of" }, { t: "agents." },
  { t: "Hand" }, { t: "it" }, { t: "the", hot: true }, { t: "ticket.", hot: true },
];

const STEPS = [
  {
    title: "Scope it in chat",
    body: "Describe the task. The Team Lead asks what's missing and turns it into acceptance criteria.",
  },
  {
    title: "Confirm the lineup",
    body: "Choose which seats work on this task, and which CLI, model and reasoning effort each one runs on.",
  },
  {
    title: "Run the fix rounds",
    body: "The Developer builds, the Tester checks the criteria, the Reviewer reads the diff. Findings go back to the Developer for up to three rounds.",
  },
  {
    title: "Take the result",
    body: "Work happens in an isolated git worktree, so your checkout stays untouched until you merge.",
  },
];

const DELEGATION_POINTS = [
  {
    title: "Hand it off once",
    body: "Describe the task in chat. The Team Lead scopes it and assigns the work to the other roles.",
  },
  {
    title: "Mix CLIs freely",
    body: "Claude Code can lead, Codex can build, Copilot can review. Each role runs on the CLI, model and effort you choose.",
  },
  {
    title: "Run it from one place",
    body: "Watch every run live on a single task board, resume a task, and check each CLI's health, from the web UI or the terminal.",
  },
];

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main id="top">
        <section className="relative isolate overflow-hidden bg-ink text-tile">
          <div
            className="hero-glow absolute -right-32 -top-40 -z-10 h-[34rem] w-[34rem] rounded-full bg-signal/30 blur-[120px]"
            aria-hidden="true"
          />
          <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 pb-24 pt-16 md:pt-24 lg:grid-cols-[1.15fr_1fr]">
            <div>
              <h1 className="font-display text-5xl font-semibold leading-[0.98] tracking-[-0.03em] sm:text-6xl md:text-[5.25rem]">
                {HEADLINE.map((w, i) => (
                  <span key={i} className="word mr-[0.25em]">
                    <span className={w.hot ? "text-signal" : ""} style={{ "--d": `${i * 80}ms` } as React.CSSProperties}>
                      {w.t}
                    </span>
                  </span>
                ))}
              </h1>
              <p className="fade-up mt-7 max-w-[54ch] text-lg leading-relaxed text-tile/75" style={{ "--d": "650ms" } as React.CSSProperties}>
                CrewCo runs each task through a Team Lead, Developer, Tester and Code Reviewer, plus a UI/UX
                Designer when you want one. Every seat gets its own CLI, model and reasoning effort.
              </p>
              <div className="fade-up mt-9 flex flex-wrap items-center gap-4" style={{ "--d": "800ms" } as React.CSSProperties}>
                <span className="cta rounded-md">
                  <DownloadButton />
                </span>
                <a href="#how" className="group inline-flex items-center gap-2 px-2 py-3 font-medium text-tile">
                  See how a task moves
                  <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-y-1">↓</span>
                </a>
              </div>
              <p className="fade-up mt-5 text-sm text-tile/60" style={{ "--d": "900ms" } as React.CSSProperties}>
                For macOS, Windows and Linux. Prefer the terminal? Run{" "}
                <span className="font-mono text-tile/85">npx crewco ui</span>.
              </p>
            </div>
            <LiveRun />
          </div>
        </section>

        <CliMarquee />

        <section id="crew" className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
            <Roster />
          </Reveal>
        </section>

        <section id="how" className="border-t border-ink/10 bg-fog-deep/60">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-[1fr_1.4fr]">
            <Reveal className="md:sticky md:top-28 md:self-start">
              <h2 className="max-w-[14ch] font-display text-4xl font-semibold leading-tight tracking-tight">
                A task goes through a crew, not a single prompt.
              </h2>
              <p className="mt-4 max-w-[44ch] text-ink-soft">
                Splitting the work across roles means the code is written by one agent, tested by another and
                reviewed by a third, each with a narrow job.
              </p>
            </Reveal>
            <Reveal as="div" className="relative">
              <span className="rail absolute bottom-3 left-[1.15rem] top-3 w-px bg-ink/25" aria-hidden="true" />
              <ol className="space-y-10">
                {STEPS.map((s, i) => (
                  <Reveal as="li" key={s.title} delay={i * 120} className="grid grid-cols-[2.5rem_1fr] gap-4">
                    <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-ink font-display text-lg font-semibold text-tile">
                      {i + 1}
                    </span>
                    <div className="pt-1">
                      <h3 className="font-display text-xl font-semibold">{s.title}</h3>
                      <p className="mt-1 max-w-[52ch] text-ink-soft">{s.body}</p>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </Reveal>
          </div>
        </section>

        <section id="clis" className="mx-auto max-w-6xl px-6 py-24">
          <Reveal>
          <h2 className="max-w-[22ch] font-display text-4xl font-semibold leading-tight tracking-tight">
            Delegate to agents from every CLI, and manage them in one place.
          </h2>
          <p className="mt-4 max-w-[62ch] text-ink-soft">
            Claude Code, Codex CLI, GitHub Copilot CLI and Antigravity each have their own agents, sessions
            and logins. CrewCo sits above them: give it a task once, put each role on the CLI and model you
            want, and follow the whole job from one tool.
          </p>
          </Reveal>

          <Reveal delay={100}>
            <Delegation />
          </Reveal>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {DELEGATION_POINTS.map((p, i) => (
              <Reveal key={p.title} delay={i * 120} className="border-t-2 border-ink pt-4">
                <h3 className="font-display text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 max-w-[40ch] text-ink-soft">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="local" className="bg-ink text-tile">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-2">
            <Reveal className="min-w-0">
              <h2 className="max-w-[14ch] font-display text-4xl font-semibold leading-tight tracking-tight">
                It runs on your machine.
              </h2>
              <ul className="mt-6 max-w-[48ch] space-y-3 text-tile/80">
                <li>The app listens on 127.0.0.1, and nothing about your project leaves for a CrewCo server.</li>
                <li>Team settings, project notes and task history are plain files in <span className="font-mono text-tile">.crewco/</span> that you can commit.</li>
                <li>Every task works in its own git worktree by default.</li>
                <li>The desktop app, the web UI and the CLI share the same on-disk format, so you can start in one and continue in another.</li>
              </ul>
            </Reveal>
            <Reveal delay={150} className="min-w-0 self-start">
            <pre className="overflow-x-auto rounded-lg bg-black/40 p-6 font-mono text-[13px] leading-7 text-tile/90">
{`# open the web UI and the first-run wizard
crewco ui

# or skip the browser
crewco run "add rate limiting" --design

# check on it, pick it back up
crewco status
crewco resume

# check which CLIs are ready
crewco doctor

# start the app at login
crewco service install`}
            </pre>
            </Reveal>
          </div>
        </section>

        <section id="download" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-28">
          <Reveal>
            <h2 className="max-w-[18ch] font-display text-4xl font-semibold leading-tight tracking-tight">
              Install CrewCo and meet the crew.
            </h2>
            <p className="mt-4 max-w-[60ch] text-ink-soft">
              The desktop app needs nothing else installed. On first launch a short wizard checks which of the four
              CLIs are installed and logged in, adds your first project from a folder picker, and offers to install the
              plugin into any CLI it finds.
            </p>
          </Reveal>
          <Reveal delay={100} className="mt-10">
            <DownloadSection />
          </Reveal>
          <Reveal delay={150} className="mt-16 border-t-2 border-ink pt-6">
            <h3 className="font-display text-xl font-semibold">Or run it from the terminal</h3>
            <p className="mt-2 max-w-[60ch] text-ink-soft">
              The same app opens in your browser instead, and you also get the <span className="font-mono text-ink">crewco</span>{" "}
              CLI for headless runs. Needs Node.js 20 or newer.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <CopyCommand command="npx crewco ui" />
              <CopyCommand command="npm i -g crewco" />
            </div>
          </Reveal>
          <p className="mt-8 text-sm text-ink-soft">
            Either way, you need at least one of Claude Code, Codex CLI, GitHub Copilot CLI or Antigravity installed and
            logged in. CrewCo drives those CLIs; it never calls a model API itself.
          </p>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
