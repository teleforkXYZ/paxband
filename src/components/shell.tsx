import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

const LINKS = [
  { to: "/", label: "Token" },
  { to: "/raise", label: "Pair" },
  { to: "/method", label: "Long" },
] as const;

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-5 gap-y-2 px-5 py-5 sm:px-8">
        <Link to="/" className="mr-auto" aria-label="Paxband home">
          <img className="nav-logo" src="/logo.png" alt="Paxband" />
        </Link>
        <nav className="flex items-center" aria-label="Sections">
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
        <p className="status">
          <span className="dot" aria-hidden="true" />
          Live
        </p>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="mx-auto w-full max-w-6xl px-5 pt-8 pb-12 sm:px-8">
        <img className="footer-logo" src="/logo.png" alt="" />
        <p className="mt-4 max-w-sm text-muted">Paxband / USDG. The tape is live. Copy the CA.</p>
      </footer>
    </div>
  );
}
