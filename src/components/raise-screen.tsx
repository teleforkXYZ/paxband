import { Link } from "@tanstack/react-router";
import { CaBox } from "@/components/ca-box";
import { PaxosNote } from "@/components/paxos-note";
import { Shell } from "@/components/shell";
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
            ? "The address is stamped below, as written. The market is not open, and nothing here can be bought."
            : "This is the market. It is not live. There is no contract on this page, and nothing here can be bought."}
        </p>
        <CaBox />

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
          When the contract exists, it is stamped here. A USDG pair on Long does not become a Lighter position, and it does not become PAXG.
        </p>
        <div className="mt-8">
          <Link to="/method" className="action">
            How the venue fits
          </Link>
        </div>
      </section>
    </Shell>
  );
}
