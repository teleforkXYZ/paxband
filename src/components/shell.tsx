import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

const LINKS = [
  { to: "/", label: "Tape" },
  { to: "/raise", label: "Note" },
  { to: "/method", label: "Path" },
] as const;

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-5 py-6 sm:px-8">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <Link to="/" className="font-display text-3xl leading-none text-ink">
          Paxband
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
      <main className="flex-1 py-14">{children}</main>
      <footer className="py-8 text-sm text-muted">
        Paxband is not Paxos. The band is not the bar.
      </footer>
    </div>
  );
}
