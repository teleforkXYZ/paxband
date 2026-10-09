import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";

const STRK = "0xCa14007Eff0dB1f8135f4C25B34De49AB0d42766";

const ROWS = [
  ["Pair", "BUNKER / STRK"],
  ["Chain", "Ethereum"],
  ["STRK", "The real contract, 18 decimals"],
  ["Pool", "Uniswap v3, fee 1%"],
  ["Supply", "1,000,000,000, minted once"],
  ["Tax", "None. A transfer tax breaks the pool"],
] as const;

export function RaiseScreen() {
  return (
    <Shell>
      <section className="mx-auto w-full max-w-6xl px-5 pt-6 sm:px-8 sm:pt-12">
        <p className="kicker">Pair</p>
        <h1 className="display display-md mt-4 max-w-3xl">
          BUNKER <em>/ STRK.</em>
        </h1>
        <p className="lede">
          The symbol is BUNKER. The market is BUNKER against the real STRK on Ethereum. v3, not the
          Robinhood curve. v4 can host the same two tokens, but STRK already trades on v3, and that
          is the pool wallets and charts read.
        </p>
        <dl className="spec spec-six">
          {ROWS.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <p className="lede">
          STRK is the contract at{" "}
          <a className="text-link" href={`https://etherscan.io/token/${STRK}`} target="_blank" rel="noreferrer">
            etherscan.io
          </a>
          . After Bunker is deployed, the lower address is token0. The starting price is STRK per
          BUNKER only after you sort them. The pool is empty until you deposit both.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <a className="action" href="/Bunker.sol" download>
            Bunker.sol
          </a>
          <Link to="/method" className="text-link">
            How the pool is opened
          </Link>
        </div>
      </section>
    </Shell>
  );
}
