import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

const LINKS = [
  { to: "/", label: "Bunker Mode" },
  { to: "/raise", label: "Pair" },
  { to: "/method", label: "Open" },
] as const;

const POST = "https://x.com/EliBenSasson/status/2108110129572741426";

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="topbar mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-5 gap-y-2 px-5 py-5 sm:px-8">
        <Link to="/" className="mr-auto flex items-center gap-3" aria-label="Bunker Mode home">
          <img className="nav-logo" src="/mark.png" alt="" />
          <span className="text-xl font-semibold tracking-tight">Bunker Mode</span>
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
          BUNKER
        </p>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="mx-auto w-full max-w-6xl px-5 pt-8 pb-12 sm:px-8">
        <img className="footer-logo" src="/mark.png" alt="" />
        <p className="mt-4 max-w-md text-muted">
          Bunker Mode, ticker BUNKER. The market is BUNKER / STRK on Ethereum. Not STRK, and not Starknet.{" "}
          <a className="text-link" href={POST} target="_blank" rel="noreferrer">
            The post this is about
          </a>
          .
        </p>
      </footer>
    </div>
  );
}
