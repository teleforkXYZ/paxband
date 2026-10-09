import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";

const STEPS = [
  {
    n: "01",
    title: "Two contracts.",
    body: "BunkerTreasury first. Its payee is one wallet, written at deploy, and never replaced. Then BunkerCurve, with that treasury address in the constructor.",
  },
  {
    n: "02",
    title: "The rate is a constant.",
    body: "150 basis points on the way in, 150 on the way out. No function raises it, pauses sells, or adds a wallet to a list.",
  },
  {
    n: "03",
    title: "The fee leaves the curve.",
    body: "It does not sit in the pool and it does not buy BUNKER. withdraw() on the treasury sends the balance to the payee. That is an operator fee, not a payment to Starknet.",
  },
] as const;

export function MethodScreen() {
  return (
    <Shell>
      <section className="mx-auto w-full max-w-6xl px-5 pt-6 sm:px-8 sm:pt-12">
        <p className="kicker">Fee</p>
        <h1 className="display display-md mt-4 max-w-3xl">
          1.5% in. <em>1.5% out.</em>
        </h1>
        <p className="lede">
          A round trip keeps about 97% of the ETH, before the curve’s own price move. The missing
          3% is the fee. Sells are not blocked.
        </p>

        <ol className="steps">
          {STEPS.map((step) => (
            <li key={step.n} className="chapter">
              <p className="idx">{step.n}</p>
              <h2>{step.title}</h2>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          <a className="action" href="/BunkerCurve.sol" download>
            Curve
          </a>
          <a className="action" href="/BunkerTreasury.sol" download>
            Treasury
          </a>
          <Link to="/" className="text-link">
            Back
          </Link>
        </div>
      </section>
    </Shell>
  );
}
