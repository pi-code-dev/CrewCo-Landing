import type { Metadata } from "next";
import { Callout, Code, H2, H3, Ic, P, Shot, Table } from "@/components/doc-parts";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { DOWNLOADS, PLATFORMS, RELEASES } from "@/lib/downloads";

export const metadata: Metadata = {
  title: "Docs — CrewCo",
  description:
    "How to install CrewCo and run tasks through a team of agents, from the web UI, the terminal, or inside Claude Code, Codex, Copilot CLI and Antigravity.",
};

const NAV = [
  { id: "overview", label: "Overview" },
  {
    id: "install",
    label: "Install",
    children: [
      { id: "desktop-app", label: "Desktop app" },
      { id: "npm", label: "From npm" },
    ],
  },
  { id: "first-run", label: "First run" },
  {
    id: "web-ui",
    label: "Use the web UI",
    children: [
      { id: "projects", label: "Projects" },
      { id: "board", label: "The board" },
      { id: "new-task", label: "Create a task" },
      { id: "scoping", label: "Scope with the lead" },
      { id: "lineup", label: "Confirm the lineup" },
      { id: "run", label: "Watch it run" },
      { id: "approve", label: "Approve the commit" },
      { id: "finished", label: "Finished tasks" },
      { id: "team", label: "Team defaults" },
      { id: "profile", label: "Project profile" },
      { id: "usage", label: "Usage" },
      { id: "health", label: "Health" },
      { id: "settings", label: "Settings" },
    ],
  },
  {
    id: "cli",
    label: "Use the CLI",
    children: [
      { id: "cli-run", label: "Run a task" },
      { id: "cli-flags", label: "Flags" },
      { id: "cli-manage", label: "Status and resume" },
      { id: "cli-team", label: "Team and profile" },
      { id: "cli-doctor", label: "Doctor" },
      { id: "cli-ui", label: "Start the UI" },
      { id: "cli-service", label: "Start at login" },
    ],
  },
  { id: "plugin", label: "Use the plugin" },
  { id: "files", label: "Project files" },
  { id: "troubleshooting", label: "Troubleshooting" },
];

export default function DocsPage() {
  return (
    <>
      <SiteHeader />
      <div className="mx-auto grid max-w-6xl gap-12 px-6 pb-24 pt-8 lg:grid-cols-[14rem_1fr]">
        <nav aria-label="On this page" className="lg:sticky lg:top-6 lg:max-h-[calc(100vh-3rem)] lg:self-start lg:overflow-y-auto">
          <p className="mb-3 font-display font-semibold">On this page</p>
          <ul className="space-y-1.5 text-[15px]">
            {NAV.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="hover:underline">{s.label}</a>
                {s.children && (
                  <ul className="mb-2 mt-1.5 hidden space-y-1 border-l border-ink/15 pl-3 text-sm text-ink-soft lg:block">
                    {s.children.map((c) => (
                      <li key={c.id}>
                        <a href={`#${c.id}`} className="hover:text-ink hover:underline">{c.label}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <main className="min-w-0">
          <h1 className="font-display text-5xl font-semibold leading-[1.02] tracking-[-0.02em]">Docs</h1>
          <p className="mt-4 max-w-[60ch] text-lg leading-relaxed text-ink-soft">
            Everything you need to run tasks through a team of agents, from the browser, the terminal, or inside the CLI you
            already use.
          </p>

          {/* ---------------------------------------------------------------- overview */}
          <section className="mt-12">
            <H2 id="overview">Overview</H2>
            <P>
              CrewCo takes one task and hands it to a crew: a <strong>Team Lead</strong> that scopes the work with you, a{" "}
              <strong>Developer</strong>, a <strong>Tester</strong>, a <strong>Code Reviewer</strong>, and an opt-in{" "}
              <strong>UI/UX Designer</strong>. Each role runs on the CLI, model and reasoning effort you choose, across Claude
              Code, Codex CLI, GitHub Copilot CLI and Antigravity (<Ic>agy</Ic>).
            </P>
            <P>
              CrewCo drives the CLIs you already have installed and logged in. It never calls a model API itself and never needs
              a separate model account. Everything runs on your machine.
            </P>
            <P>There are three ways to use it, and they share the same files on disk, so you can switch between them:</P>
            <Table
              head={["Way", "Best for", "Start with"]}
              rows={[
                [<strong key="a">Web UI</strong>, "A task board, live progress, and clicking through scoping and approvals.", <Ic key="b">crewco ui</Ic>],
                [<strong key="c">Terminal</strong>, "Scripts, remote machines, and running a task without a browser.", <Ic key="d">crewco run &quot;…&quot;</Ic>],
                [<strong key="e">Plugin</strong>, "Staying inside Claude Code, Codex, Copilot CLI or Antigravity.", <Ic key="f">/crewco:new-task</Ic>],
              ]}
            />
            <H3 id="how-a-task-moves">How a task moves</H3>
            <ol className="mt-4 max-w-[70ch] list-decimal space-y-2 pl-6 leading-relaxed text-ink-soft marker:font-semibold marker:text-signal-deep">
              <li><strong className="text-ink">Scope.</strong> You describe the task. The Team Lead asks what is missing and writes acceptance criteria.</li>
              <li><strong className="text-ink">Confirm the lineup.</strong> You choose the CLI, model and effort for each role.</li>
              <li><strong className="text-ink">Fix rounds.</strong> The Developer builds, the Tester checks the criteria, the Reviewer reads the diff. Findings go back to the Developer, for up to three rounds by default.</li>
              <li><strong className="text-ink">Commit.</strong> You approve the commit. Work happens in an isolated git worktree by default, so your checkout stays untouched until you merge.</li>
            </ol>
          </section>

          {/* ---------------------------------------------------------------- install */}
          <section>
            <H2 id="install">Install</H2>
            <P>
              You need at least one of Claude Code, Codex CLI, Copilot CLI or Antigravity installed and logged in. Then
              install CrewCo as a desktop app, or run it from npm.
            </P>

            <H3 id="desktop-app">Desktop app</H3>
            <P>
              Download the installer for your system from the <a href="/#download" className="underline underline-offset-4 hover:text-ink">download section</a>{" "}
              or <a href={RELEASES} className="underline underline-offset-4 hover:text-ink">GitHub Releases</a>. It includes
              everything it needs, so you don&apos;t need Node.js.
            </P>
            <Table
              head={["System", "File", "First launch"]}
              rows={PLATFORMS.map((p) => [
                DOWNLOADS[p].name,
                <span key="f" className="flex flex-col gap-1">
                  {[DOWNLOADS[p].primary, ...DOWNLOADS[p].others].map((d) => (
                    <a key={d.file} href={d.href} className="underline underline-offset-4 hover:text-ink">{d.label}</a>
                  ))}
                </span>,
                DOWNLOADS[p].firstOpen,
              ])}
            />
            <Callout title="Why the warning on first launch?">
              The builds aren&apos;t code-signed yet, so macOS and Windows can&apos;t check who published them and ask you to
              confirm once. On macOS you can also clear the flag from a terminal:{" "}
              <Ic>xattr -dr com.apple.quarantine /Applications/CrewCo.app</Ic>.
            </Callout>
            <P>
              The app is the same web UI that <Ic>crewco ui</Ic> serves, in its own window. It shares <Ic>~/.crewco</Ic> and
              port 4287 with the CLI, so close the app before running <Ic>crewco ui</Ic> (or <Ic>crewco service</Ic>), and the
              other way round. To update, download the new version and install it over the old one.
            </P>

            <H3 id="npm">From npm</H3>
            <P>
              You need <strong>Node.js 20 or newer</strong>. This also gives you the <Ic>crewco</Ic> CLI for headless runs. Run
              CrewCo without installing anything:
            </P>
            <Code>{`npx crewco ui`}</Code>
            <P>or install it globally:</P>
            <Code>{`npm i -g crewco`}</Code>
            <Callout title="Upgrading">
              Installed copies do not update themselves. Run <Ic>npm i -g crewco@latest</Ic>, or use{" "}
              <Ic>npx crewco@latest ui</Ic>, since a plain <Ic>npx crewco</Ic> can reuse an older cached copy. After upgrading,
              restart any running <Ic>crewco ui</Ic> and hard-refresh the browser tab.
            </Callout>
          </section>

          {/* ---------------------------------------------------------------- first run */}
          <section>
            <H2 id="first-run">First run</H2>
            <P>
              Open the CrewCo desktop app, or run <Ic>crewco ui</Ic>, which opens a local page at{" "}
              <Ic>http://127.0.0.1:4287</Ic> (change the port with <Ic>--port</Ic>, or add <Ic>--no-open</Ic> to skip opening the
              browser). The first time, you land on a short setup wizard.
            </P>
            <Shot
              src="/docs/ui-wizard.png"
              alt="The CrewCo welcome wizard with three steps: check your CLIs, add your first project, install the plugin."
              caption={
                <>
                  <strong className="text-ink">Step 1</strong> checks which of the four CLIs are installed and logged in.{" "}
                  <strong className="text-ink">Step 2</strong> adds your first project with a folder picker, so there is no path to
                  type. <strong className="text-ink">Step 3</strong> is optional: it installs the CrewCo plugin into any CLI it
                  found, so you can also run <Ic>/crewco:new-task</Ic> from inside that CLI.
                </>
              }
              height={1000}
            />
            <P>
              A red cross next to a CLI means it is missing or not logged in. You only need one working CLI to start, and you
              can fix the others later from the Health page.
            </P>
          </section>

          {/* ---------------------------------------------------------------- web ui */}
          <section>
            <H2 id="web-ui">Use the web UI</H2>
            <P>
              The top bar links to everything: <strong>Board</strong>, <strong>Usage</strong>, <strong>Team</strong>,{" "}
              <strong>Profile</strong> (these four are per project), then <strong>Health</strong> and <strong>Settings</strong>.
              The bell shows anything that needs your decision, such as a commit approval.
            </P>

            <H3 id="projects">Projects</H3>
            <P>
              A project is a git repository. Add one with <strong>Add project</strong> and the folder picker. Each card shows
              the folder and how many tasks are active or recent. Click a card to open its board.
            </P>
            <Shot
              src="/docs/ui-projects.png"
              alt="The Projects page with two project cards, acme-api and billing-service."
              caption="Two projects. The counts show active and recent tasks for each."
            />

            <H3 id="board">The board</H3>
            <P>
              The board has one column per phase a task passes through, left to right: <strong>Scoping</strong>,{" "}
              <strong>Design</strong>, <strong>Implementing</strong>, <strong>Verifying</strong>, <strong>Fixing</strong>,{" "}
              <strong>Awaiting commit</strong> and <strong>Done</strong>. Each card shows the title, the current round and when
              it last changed. The chat icon reopens the scoping conversation, and the bin icon deletes the task, in any phase.
              <strong>Clean up old tasks</strong> opens a list of finished tasks older than 30 days by default, so you can delete them in bulk.
            </P>
            <Shot
              src="/docs/ui-board.png"
              alt="The task board with seven phase columns. Three tasks wait in Scoping and one is Done."
              caption="Three new tasks waiting in Scoping, and one finished task in Done. The page scrolls sideways on narrow screens."
              width={1900}
              height={560}
            />

            <H3 id="new-task">Create a task</H3>
            <P>
              Click <strong>New task</strong>, describe what needs to be done in plain language, and click{" "}
              <strong>Create &amp; scope</strong>. If the work comes from Jira, add the ticket key (for example{" "}
              <Ic>PROJ-123</Ic>) too. You do not need to be precise. The next step is a conversation that fills in the gaps.
            </P>
            <Shot
              src="/docs/ui-new-task.png"
              alt="The New task dialog with a description field and an optional Jira key field."
              caption="The New task dialog. Only the description is required."
            />

            <H3 id="scoping">Scope with the lead</H3>
            <P>
              Pick the CLI and model the <strong>Team Lead</strong> should use, then click <strong>Start scoping</strong>. The
              lead reads your task and asks what it needs to know.
            </P>
            <Shot
              src="/docs/ui-scoping-start.png"
              alt="The scoping page before it starts, with a Lead CLI selector, a Model field and a Start scoping button."
              caption="Choose the lead's CLI and model, then start."
            />
            <P>
              Answer in the chat box. Press <Ic>Enter</Ic> to send and <Ic>Shift+Enter</Ic> for a new line. The paperclip
              attaches images, such as a screenshot of a bug. While the lead works, its reply shows what it is doing right
              now, such as reading a file or searching the code. Open <strong>steps so far</strong> to see everything it has
              done this turn. Replies appear as readable text, never raw output.
            </P>
            <P>
              When the lead has enough, a <strong>Draft spec</strong> bar appears below the chat with the spec's title and
              how many acceptance criteria it has.
            </P>
            <Shot
              src="/docs/ui-scoping-chat.png"
              alt="A scoping conversation with a Draft spec bar below it showing the spec title and a Review spec button."
              caption="The draft spec bar sits below the chat. It updates whenever the lead revises the spec."
            />
            <P>
              Click <strong>Review spec</strong> to open it. The spec shows a title, description, acceptance criteria,
              affected areas and what is out of scope.
            </P>
            <Shot
              src="/docs/ui-scoping-spec.png"
              alt="The Draft spec dialog listing three acceptance criteria with a Confirm spec button."
              caption={
                <>
                  The draft spec is editable. Remove a criterion with its <strong className="text-ink">×</strong>, or add your own
                  at the bottom. Acceptance criteria matter most: the Tester checks the work against exactly these.
                </>
              }
            />
            <P>When the spec reads right, click <strong>Confirm spec</strong>.</P>

            <H3 id="lineup">Confirm the lineup</H3>
            <P>
              The lineup decides who does what. For each role you choose the <strong>CLI</strong>, the{" "}
              <strong>model</strong>, the reasoning <strong>effort</strong> and the <strong>permissions</strong>. Mixing CLIs is
              the point: put the Developer on Codex, the Reviewer on Copilot, and the Designer on Antigravity.
            </P>
            <Shot
              src="/docs/ui-lineup.png"
              alt="The lineup page with the Developer on codex, the Tester on claude, the Code reviewer on copilot and UI/UX on agy."
              caption="A mixed lineup. A green check means that role's CLI is ready. Tick “Save as this project's default team” to reuse these choices next time."
            />
            <Table
              head={["Setting", "What it does"]}
              rows={[
                [<Ic key="a">permissions: safe</Ic>, "The CLI runs sandboxed or with scoped tools."],
                [<Ic key="b">permissions: skip</Ic>, "The CLI skips its permission checks. The Developer defaults to this so it can edit files without stopping to ask. Use it only in projects you trust."],
                ["Code Reviewer", "Always read-only, whatever the permissions setting says."],
                ["UI/UX (opt-in)", "Only runs when you include it for the task, before any code is written."],
              ]}
            />
            <P>
              Click <strong>Confirm and start</strong> to begin. Defaults come from the project's team (see{" "}
              <a href="#team" className="underline underline-offset-4">Team defaults</a>), or from the machine-wide default
              lineup in Settings if the project has none yet.
            </P>

            <H3 id="run">Watch it run</H3>
            <P>
              The task page shows the phase badge, the current round, the branch and worktree, and a chip for every role in the
              lineup with its CLI, model, effort and permissions. While it runs you can <strong>Cancel</strong> it. If it was
              interrupted, <strong>Resume</strong> continues from where it stopped, and <strong>Copy resume command</strong>{" "}
              gives you the <Ic>crewco resume</Ic> line for the terminal.
            </P>
            <Shot
              src="/docs/ui-task-awaiting.png"
              alt="The task page in the awaiting_commit phase, showing the lineup chips and a round with gate ok, tester pass and reviewer approve."
              caption="Round 1 finished: the gate passed, the Tester passed and the Reviewer approved. Each agent has its own lane below with a live log."
            />
            <P>
              Below the header there are tabs: <strong>Rounds &amp; lanes</strong>, <strong>Issues</strong>,{" "}
              <strong>Failures</strong>, <strong>Diff</strong>, <strong>Spec</strong> and <strong>Screenshots</strong>. If a
              round finds problems, they show under Issues and Failures and go back to the Developer for the next round.
            </P>

            <H3 id="approve">Approve the commit</H3>
            <P>
              When the work is ready, the task moves to <strong>Awaiting commit</strong> and the bell shows a count. Open it to
              see the <strong>Needs you</strong> panel. Expand <strong>Full diff</strong> to read the change, edit the commit
              message if you want, then choose <strong>Commit</strong> or <strong>Don't commit</strong>.
            </P>
            <Shot
              src="/docs/ui-approvals.png"
              alt="The Needs you panel with a commit approval: full diff, an editable commit message, and Don't commit and Commit buttons."
              caption="Nothing is committed until you approve it here."
            />

            <H3 id="finished">Finished tasks</H3>
            <P>
              A finished task shows <strong>done</strong>. Every lane keeps a <strong>Retry</strong> button if you want to run
              one agent again. Open the <strong>Spec</strong> and <strong>Diff</strong> tabs to review what was agreed and what
              changed.
            </P>
            <Shot
              src="/docs/ui-task-done.png"
              alt="A finished task with the done badge and Retry buttons on each agent lane."
              caption="The finished task. The same page is reachable later from the board."
            />
            <Shot
              src="/docs/ui-task-tab-spec.png"
              alt="The Spec tab of a finished task showing the confirmed title, description and acceptance criteria."
              caption="The Spec tab keeps the acceptance criteria the work was checked against."
            />

            <H3 id="team">Team defaults</H3>
            <P>
              <strong>Team</strong> sets the default lineup for the project, saved to <Ic>.crewco/team.json</Ic> in the repo so
              the whole team shares it. New tasks start from it, and you can still change anything at the lineup step.
            </P>
            <Shot
              src="/docs/ui-team.png"
              alt="The Team page with one row per role and a Save team defaults button."
              caption="Nothing is saved until you click Save team defaults."
              height={1120}
            />

            <H3 id="profile">Project profile</H3>
            <P>
              The profile tells CrewCo how your project builds and tests: the package manager and the install, lint, typecheck,
              test, build and format commands. Agents use it for the automatic checks that run between rounds. Click{" "}
              <strong>Refresh</strong> to detect it from your repo, correct anything that is wrong, then{" "}
              <strong>Confirm and save</strong>. It is stored in <Ic>.crewco/project.json</Ic>.
            </P>
            <Shot
              src="/docs/ui-profile.png"
              alt="The Project profile page with detected commands such as npm run test and a Confirm and save button."
              caption="A detected profile, waiting to be confirmed. Empty fields are commands CrewCo could not find."
              height={760}
            />

            <H3 id="usage">Usage</H3>
            <P>
              <strong>Usage</strong> lists every agent run for the project: the task, the role, the CLI and model, how many
              runs, how long they took, and tokens and cost where the CLI reports them.
            </P>
            <Shot
              src="/docs/ui-usage.png"
              alt="The Usage table with one row per role for a task, showing runs and duration."
              caption="Per-role usage for a finished task."
              height={420}
            />

            <H3 id="health">Health</H3>
            <P>
              <strong>Health</strong> checks each CLI: whether it is installed, its version, whether its config folder is
              writable, whether the network is reachable, and whether you are logged in. Click <strong>Refresh</strong> after
              you fix something. A CLI that is not ready only affects whether you can use it in a lineup.
            </P>
            <Shot
              src="/docs/ui-health.png"
              alt="The Health page with a card for each of Claude, Codex, Agy and Copilot showing installed, version, config dir, network and logged in."
              caption="All four CLIs ready."
            />

            <H3 id="settings">Settings</H3>
            <P>
              <strong>Settings</strong> edits <Ic>~/.crewco/config.json</Ic>: the port (used the next time{" "}
              <Ic>crewco ui</Ic> starts), how many runs each CLI may have going at once (2 by default), and a machine-wide
              default lineup used when a project has no team of its own. Every field has a sensible default, so none are
              required.
            </P>
            <Shot
              src="/docs/ui-settings.png"
              alt="The Settings page with port, per-CLI concurrency limits and the default lineup."
              caption="The defaults are shown as placeholders."
              height={900}
            />
          </section>

          {/* ---------------------------------------------------------------- cli */}
          <section>
            <H2 id="cli">Use the CLI</H2>
            <P>
              Everything the web UI does is also available from the terminal, and the two read and write the same{" "}
              <Ic>.crewco/</Ic> files. Run commands from inside the project's git repository. Run <Ic>crewco --help</Ic> for
              the list.
            </P>
            <Code label="crewco --help">{`crewco -- run the crewco workflow headlessly

Usage:
  crewco run "<task description>" [--yes] [--design] [--in-place]
                [--rounds N] [--dev cli[:model]] [--review cli[:model]]
  crewco status [task-id]
  crewco resume [task-id]
  crewco doctor [--cli claude|codex|agy|copilot]
  crewco team [show]
  crewco profile [show|refresh]
  crewco ui [--port N] [--no-open]
  crewco service install|uninstall`}</Code>

            <H3 id="cli-run">Run a task</H3>
            <P>
              <Ic>crewco run</Ic> runs the whole workflow without a browser: scope, lineup, fix rounds, commit.
            </P>
            <Code>{`crewco run "add rate limiting to the upload endpoint" --design --rounds 2`}</Code>
            <P>When a task passes on its first round, the output looks like this:</P>
            <Code>{`Dispatching developer (round 1)...
  developer: done
Running gate (round 1)...
  gate: ok
Dispatching tester + code-reviewer (round 1)...
  tester: done
  code-reviewer: done
Committed f7402426.

Add rate limiting to the upload endpoint: done.`}</Code>

            <H3 id="cli-flags">Flags</H3>
            <Table
              head={["Flag", "What it does"]}
              rows={[
                [<Ic key="a">--yes</Ic>, "Skip the confirmation questions and use the saved or default lineup."],
                [<Ic key="b">--design</Ic>, "Include the UI/UX Designer for this task without asking."],
                [<Ic key="c">--in-place</Ic>, "Work directly in your checkout instead of an isolated git worktree. For this task only."],
                [<Ic key="d">--rounds N</Ic>, "Set the maximum number of fix rounds for this task (the default is 3)."],
                [<Ic key="e">--dev cli[:model]</Ic>, <>Run the Developer on this CLI and model, for example <Ic>--dev codex:gpt-5.6-sol</Ic>.</>],
                [<Ic key="f">--review cli[:model]</Ic>, <>Run the Code Reviewer on this CLI and model, for example <Ic>--review copilot</Ic>.</>],
              ]}
            />
            <P>
              The CLI names are <Ic>claude</Ic>, <Ic>codex</Ic>, <Ic>agy</Ic> and <Ic>copilot</Ic>. You can also pass a Jira key
              such as <Ic>PROJ-123</Ic> instead of a description.
            </P>

            <H3 id="cli-manage">Status and resume</H3>
            <P>
              <Ic>crewco status</Ic> lists your recent tasks. Give it a task id for the full picture: phase, lineup, rounds, which
              runs are going or finished, and the resume commands. <Ic>crewco resume</Ic> picks up an interrupted task from its
              saved state without asking for the lineup again.
            </P>
            <Code>{`crewco status
No tasks yet.

crewco status <task-id>
crewco resume <task-id>`}</Code>

            <H3 id="cli-team">Team and profile</H3>
            <P>
              <Ic>crewco team show</Ic> prints the lineup the project will use. <Ic>crewco profile show</Ic> prints the saved
              project profile, and <Ic>crewco profile refresh</Ic> detects it again from the repo.
            </P>
            <Code label="crewco team show (trimmed)">{`{
  "roles": {
    "developer": { "cli": "claude", "model": "sonnet", "effort": "medium", "permissions": "skip" },
    "tester":    { "cli": "claude", "model": "opus",   "effort": "medium", "permissions": "safe" },
    ...
  },
  "loop": { "maxRounds": 3, "fixThreshold": "major" }
}`}</Code>

            <H3 id="cli-doctor">Doctor</H3>
            <P>
              <Ic>crewco doctor</Ic> prints one block per CLI. Add <Ic>--cli codex</Ic> to check just one. It exits with an error
              if any CLI is not ready, which is normal when you only use some of the four.
            </P>
            <Code label="crewco doctor (first two CLIs)">{`claude: ok
  installed: true  version: 2.1.0 (Claude Code)
  config_dir: ~/.claude (writable: true)
  network: true (reached api.anthropic.com:443)
  logged_in: true (you@example.com)
codex: ok
  installed: true  version: codex-cli 0.162.1
  config_dir: ~/.codex (writable: true)
  network: true (reached api.openai.com:443)
  logged_in: true ()`}</Code>

            <H3 id="cli-ui">Start the UI</H3>
            <Code>{`crewco ui                 # http://127.0.0.1:4287
crewco ui --port 5000     # another port
crewco ui --no-open       # don't open the browser`}</Code>
            <P>
              The app only listens on <Ic>127.0.0.1</Ic>. The link <Ic>crewco ui</Ic> opens carries the sign-in for that
              tab and is never written to disk, so keep the tab open if you want to jump between tasks without signing in again.
            </P>

            <H3 id="cli-service">Start at login</H3>
            <Code>{`crewco service install     # start the app automatically at login
crewco service uninstall   # remove it`}</Code>
            <P>
              This registers the app with launchd on macOS, a systemd user unit on Linux, or Task Scheduler on Windows. Running{" "}
              <Ic>crewco ui</Ic> while it is already up is safe: it points you at the running one instead of starting a second.
            </P>
          </section>

          {/* ---------------------------------------------------------------- plugin */}
          <section>
            <H2 id="plugin">Use the plugin</H2>
            <P>
              The plugin adds CrewCo commands inside Claude Code, Codex CLI, Copilot CLI and Antigravity, so you can run a task
              without leaving the CLI. Install it from the setup wizard (step 3), or from the web UI later. The CLI you are
              typing in becomes the Team Lead.
            </P>
            <Table
              head={["Command", "What it does"]}
              rows={[
                [<Ic key="a">/crewco:new-task</Ic>, "Run a new task through the crew. Takes the same flags as crewco run."],
                [<Ic key="b">/crewco:design</Ic>, "Produce a UI/UX design spec only, without implementing it."],
                [<Ic key="c">/crewco:test</Ic>, "Have the Tester write and run tests for a scenario. Reports pass or fail, makes no code fixes."],
                [<Ic key="d">/crewco:review</Ic>, "Have the Code Reviewer review a git branch. Read-only."],
                [<Ic key="e">/crewco:status</Ic>, "Show recent tasks, or the full status of one."],
                [<Ic key="f">/crewco:resume</Ic>, "Resume an interrupted task without asking the lineup again."],
                [<Ic key="g">/crewco:team</Ic>, "Show or change the lineup, for example “reviewer on codex, high effort”."],
                [<Ic key="h">/crewco:profile</Ic>, "Show, refresh or edit the project profile."],
                [<Ic key="i">/crewco:doctor</Ic>, "Check that every CLI in the lineup is installed, reachable and logged in."],
                [<Ic key="j">/crewco:open</Ic>, "Open a task, or the app, in your browser if crewco ui is running."],
              ]}
            />

            <Callout title="Slash commands vs. the CLI">
              The plugin and the <Ic>crewco</Ic> command are two front ends to the same workflow. A task started in the plugin shows
              up on the web UI board, and the other way round.
            </Callout>
          </section>

          {/* ---------------------------------------------------------------- files */}
          <section>
            <H2 id="files">Project files</H2>
            <P>
              In each project, CrewCo keeps plain files in <Ic>.crewco/</Ic>. You can read them, diff them and commit the
              shared ones.
            </P>
            <Table
              head={["Path", "What it holds", "Commit it?"]}
              rows={[
                [<Ic key="a">.crewco/team.json</Ic>, "The team lineup: CLI, model, effort and permissions per role, the round limit, and workspace mode.", "Yes"],
                [<Ic key="b">.crewco/project.json</Ic>, "The project profile: package manager and commands.", "Yes"],
                [<Ic key="c">.crewco/project.md</Ic>, "Project notes handed to every role.", "Yes"],
                [<Ic key="d">.crewco/tasks/&lt;task-id&gt;/</Ic>, "One folder per task, with its state and a runs/ folder for each agent.", "No"],
                [<Ic key="e">.crewco/wt/&lt;task-id&gt;/</Ic>, "The task's git worktree, when worktree mode is on.", "No"],
              ]}
            />
            <P>
              Tasks use an isolated git worktree by default. To work directly in your checkout for every task, set{" "}
              <Ic>{`"workspace": { "mode": "in-place" }`}</Ic> in <Ic>team.json</Ic>, or pass <Ic>--in-place</Ic> for one task.
              Machine-wide settings live in <Ic>~/.crewco/config.json</Ic>.
            </P>
          </section>

          {/* ---------------------------------------------------------------- troubleshooting */}
          <section>
            <H2 id="troubleshooting">Troubleshooting</H2>
            <P>
              Start with <Ic>crewco doctor</Ic> or the Health page. It prints one line per problem, and none of them stop{" "}
              <Ic>crewco ui</Ic> from starting.
            </P>
            <Table
              head={["What you see", "What it means", "Fix"]}
              rows={[
                [<Ic key="a">&lt;cli&gt; is not installed or not on PATH</Ic>, "CrewCo looked for that CLI's binary on your PATH and did not find it.", "Install that CLI, or ignore it if you will not use it in a lineup."],
                [<Ic key="b">could not read &lt;cli&gt;'s version</Ic>, "The binary exists but its --version command failed or timed out.", <>Run <Ic>{"<cli> --version"}</Ic> yourself. Its error is the real cause.</>],
                [<Ic key="c">config dir isn't writable</Ic>, "CrewCo needs to read, and sometimes refresh, that CLI's login folder, but cannot.", "Fix the folder's permissions, or run that CLI once so it creates its own folder."],
                [<Ic key="d">host sandbox blocks network</Ic>, "A connection to that CLI's API was refused or timed out.", "In a container or restricted shell, allow outbound access to that host. Otherwise check your network, firewall or VPN."],
                [<Ic key="e">does not appear to be logged in</Ic>, "The CLI's own login check came back negative.", <>Run its login command (for example <Ic>claude auth login</Ic> or <Ic>codex login</Ic>) outside any sandbox, then run <Ic>crewco doctor</Ic> again.</>],
              ]}
            />
            <Callout title="The UI looks out of date after an upgrade">
              A running <Ic>crewco ui</Ic> keeps serving the version it started with. Stop it and start it again, restart the login
              service if you use one (<Ic>crewco service uninstall</Ic>, then <Ic>install</Ic>), and hard-refresh the tab.
            </Callout>
            <P>
              Still stuck? Open an issue on{" "}
              <a href="https://github.com/pi-code-dev/Crewco-app/issues" className="underline underline-offset-4">GitHub</a> and
              include the output of <Ic>crewco doctor</Ic>.
            </P>
          </section>
        </main>
      </div>
      <SiteFooter />
    </>
  );
}
