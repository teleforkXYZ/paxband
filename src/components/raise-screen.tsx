import { Link } from "@tanstack/react-router";
import { CaBox } from "@/components/ca-box";
import { PaxosNote } from "@/components/paxos-note";
import { Shell } from "@/components/shell";
import { TapeBoard } from "@/components/tape";
import { CONTRACT, NOTS, PAIR_SPEC } from "@/data/sheet";

export function RaiseScreen() {
  const contract = CONTRACT.length > 0 ? CONTRACT : "Not set";
  return (
    <Shell>
      <section className="mx-auto w-full max-w-6xl px-5 pt-6 sm:px-8 sm:pt-12">
        <p className="kicker">Pair</p>
        <h1 className="display display-md mt-4 max-w-3xl">
          Paxband <em>/ USDG.</em>
        </h1>
        <p className="lede">
          {CONTRACT.length > 0
            ? "The address is on the card. The tape is under it. Paxband / USDG does not wait for a perfect entry."
            : "The pair is the story. The address lands here the moment it exists."}
        </p>
        <CaBox />
        <TapeBoard />

        <div className="sheet">
          <img className="sheet-mark" src="/symbol.jpg" alt="" />
          <dl className="spec spec-six">
            {PAIR_SPEC.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd className={label === "Contract" ? "ca-spec" : undefined}>
                  {label === "Contract" ? contract : value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <ul className="nots">
          {NOTS.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>

        <PaxosNote />

        <p className="lede">
          The CA is the ticket. The prints are the proof. Copy it before the timeline does.
        </p>
        <div className="mt-8">
          <Link to="/method" className="action">
            Why it runs
          </Link>
        </div>
      </section>
    </Shell>
  );
}
