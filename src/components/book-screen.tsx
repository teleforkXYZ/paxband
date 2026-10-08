import { Link } from "@tanstack/react-router";
import { Rings, Shell } from "@/components/shell";

const PIECES = [
  {
    k: "Bar",
    title: "One ounce, theirs.",
    body: "Paxos says one PAXG is one fine troy ounce in LBMA vaults. That token is theirs. Paxband does not hold it, redeem it, or speak for them.",
  },
  {
    k: "Perp",
    title: "A contract, not the ounce.",
    body: "Lighter lists a PAXG perp, up to 25×. On 8 Oct 2026 that book did about $1M in a day. XAU, the gold perp beside it, did about $47M. We do not trade either, and we will not label one as the other.",
  },
  {
    k: "Band",
    title: "Shut.",
    body: "A note on this browser is not a share. 1× comes first, and only after that perp account can be read on chain without asking us. 5× and 7× wait.",
  },
] as const;

export function BookScreen() {
  return (
    <Shell>
      <Rings />
      <h1 className="mt-8 max-w-xl font-display text-6xl leading-none text-ink sm:text-7xl">
        The band is not the bar.
      </h1>
      <p className="mt-6 max-w-md text-lg">
        Three rings. Kept apart. Nothing here mints a fourth.
      </p>
      <div className="mt-8">
        <Link to="/raise" className="action">
          Write a note
        </Link>
      </div>
      <ol className="mt-16">
        {PIECES.map((piece) => (
          <li key={piece.k} className="piece">
            <p className="text-sm">{piece.k}</p>
            <h2 className="mt-2 font-display text-4xl leading-none">{piece.title}</h2>
            <p className="mt-4 max-w-lg">{piece.body}</p>
          </li>
        ))}
      </ol>
    </Shell>
  );
}
