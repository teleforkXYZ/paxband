import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

const LINKS = [
  { to: "/", label: "Token" },
  { to: "/raise", label: "Pair" },
  { to: "/method", label: "Long" },
] as const;

export function Rings() {
  const d =
    "M102 22C138 14 158 48 176 46C198 44 196 78 190 104C204 132 176 150 164 172C148 198 112 196 86 184C54 198 24 168 26 136C14 108 36 86 30 60C22 28 62 30 102 22Z";
  return (
    <svg className="mark-svg" viewBox="0 0 200 200" aria-hidden="true">
      <path className="blob blob-a" d={d} />
      <path className="blob blob-b" d={d} />
      <path className="blob blob-c" d={d} />
    </svg>
  );
}

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
      <main className="flex-1 py-12">{children}</main>
      <footer className="py-8 text-sm">
        Paxband is not Paxos. The pair is not open.
      </footer>
    </div>
  );
}
