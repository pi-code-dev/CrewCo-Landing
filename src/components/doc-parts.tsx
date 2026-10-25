import type { ReactNode } from "react";

/** A real screenshot of the app, framed like a window. */
export function Shot({ src, alt, caption, width = 1280, height = 800 }: { src: string; alt: string; caption: ReactNode; width?: number; height?: number }) {
  return (
    <figure className="my-8">
      <div className="overflow-hidden rounded-lg border border-ink/15 bg-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} width={width} height={height} loading="lazy" className="h-auto w-full" />
      </div>
      <figcaption className="mt-3 max-w-[70ch] text-sm leading-relaxed text-ink-soft">{caption}</figcaption>
    </figure>
  );
}

/** Terminal output or a command. */
export function Code({ children, label }: { children: string; label?: string }) {
  return (
    <div className="my-6">
      {label && <p className="mb-2 text-sm text-ink-soft">{label}</p>}
      <pre className="overflow-x-auto rounded-lg bg-ink p-5 font-mono text-[13px] leading-7 text-tile/90">{children}</pre>
    </div>
  );
}

export function Callout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <aside className="my-6 rounded-lg border-l-4 border-signal bg-tile px-5 py-4">
      <p className="font-display font-semibold">{title}</p>
      <div className="mt-1 max-w-[70ch] text-[15px] leading-relaxed text-ink-soft">{children}</div>
    </aside>
  );
}

export function H2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2 id={id} className="mt-20 scroll-mt-8 border-t-2 border-ink pt-6 font-display text-3xl font-semibold tracking-tight first:mt-0">
      {children}
    </h2>
  );
}

export function H3({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h3 id={id} className="mt-12 scroll-mt-8 font-display text-xl font-semibold">
      {children}
    </h3>
  );
}

export function P({ children }: { children: ReactNode }) {
  return <p className="mt-4 max-w-[70ch] leading-relaxed text-ink-soft">{children}</p>;
}

export function Ic({ children }: { children: ReactNode }) {
  return <code className="rounded bg-ink/[0.07] px-1.5 py-0.5 font-mono text-[0.9em] text-ink">{children}</code>;
}

export function Table({ head, rows }: { head: string[]; rows: ReactNode[][] }) {
  return (
    <div className="my-6 overflow-x-auto">
      <table className="w-full min-w-[32rem] border-collapse text-left text-[15px]">
        <thead>
          <tr className="border-b-2 border-ink">
            {head.map((h) => (
              <th key={h} scope="col" className="py-2.5 pr-6 font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-b border-ink/15 align-top">
              {r.map((c, j) => (
                <td key={j} className="py-3 pr-6 leading-relaxed text-ink-soft first:min-w-[10.5rem] first:text-ink">{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
