import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";

const ROWS = [
  ["Pair", "BUNKER / ETH"],
  ["Virtual ETH", "1 ETH, not in the contract"],
  ["Virtual tokens", "1,000,000,000"],
  ["Opening price", "0.000000001 ETH"],
  ["After 1 real ETH in", "Price is 4×, before fees"],
  ["Both ways", "buy() and sell()"],
] as const;

export function RaiseScreen() {
  return (
    <Shell>
      <section className="mx-auto w-full max-w-6xl px-5 pt-6 sm:px-8 sm:pt-12">
        <p className="kicker">Curve</p>
        <h1 className="display display-md mt-4 max-w-3xl">
          BUNKER <em>/ ETH.</em>
        </h1>
        <p className="lede">
          The price starts as if the pool already held 1 ETH and a billion tokens. That ETH is
          virtual. Nobody deposited it, and nobody can withdraw it. Real ETH arrives only when
          someone calls buy, and sell pays it back, minus the fee.
        </p>

        <dl className="spec spec-six">
          {ROWS.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>

        <div className="split mt-12">
          <article>
            <p className="kicker">Buy</p>
            <h3>ETH in</h3>
            <p>1.5% goes to the treasury. The rest moves the curve and mints BUNKER to the buyer.</p>
          </article>
          <article className="is-ours">
            <p className="kicker">Sell</p>
            <h3>ETH out</h3>
            <p>The curve releases ETH, 1.5% of that release goes to the treasury, and the rest goes to the seller.</p>
          </article>
        </div>

        <p className="lede">
          There is no Uniswap pair in this step. The contract is the market. A plain transfer is not a buy.
        </p>
        <div className="mt-8">
          <Link to="/method" className="action">
            Where the fee sits
          </Link>
        </div>
      </section>
    </Shell>
  );
}
