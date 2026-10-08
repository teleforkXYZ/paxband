import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { NOTS, PAIR_SPEC } from "@/data/sheet";

export function RaiseScreen() {
  return (
    <Shell>
      <section className="mx-auto w-full max-w-6xl px-5 pt-6 sm:px-8 sm:pt-12">
        <p className="kicker">Pair</p>
        <h1 className="display display-md mt-4 max-w-3xl">
          Paxband <em>/ USDG.</em>
        </h1>
        <p className="lede">
          This is the market. It is not live. There is no contract on this page, and nothing here can be bought.
        </p>

        <div className="sheet">
          <img className="sheet-mark" src="/symbol.jpg" alt="" />
          <dl className="spec spec-six">
            {PAIR_SPEC.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <ul className="nots">
          {NOTS.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>

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
