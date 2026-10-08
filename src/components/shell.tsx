import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

const LINKS = [
  { to: "/", label: "Launches" },
  { to: "/raise", label: "File" },
  { to: "/method", label: "Method" },
] as const;

export function Mark() {
  return (
    <svg className="mark" viewBox="0 0 32 32" aria-hidden="true">
      <rect x="4" y="13" width="24" height="6" rx="3" />
    </svg>
  );
}

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 py-5 sm:px-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3 text-ink">
          <Mark />
          <span className="font-display text-2xl leading-none tracking-tight">Paxband</span>
        </Link>
        <nav className="flex gap-1" aria-label="Sections">
          {LINKS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="nav-link"
              activeProps={{ className: "nav-link is-on" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>
      <p className="shut mt-5">Book shut. Nothing on this desk mints a token or opens a band.</p>
      <main className="flex-1 py-8">{children}</main>
      <footer className="border-t border-ink/15 py-4 text-sm text-muted">
        Paxband is not Paxos. Not Long. Not a perp venue. A draft is a piece of paper.
      </footer>
    </div>
  );
}
