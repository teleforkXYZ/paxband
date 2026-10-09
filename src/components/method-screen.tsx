import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";

const STEPS = [
  {
    n: "01",
    title: "Deploy Bunker on Ethereum.",
    body: "Remix, compiler 0.8.24, chain Ethereum mainnet. Constructor takes nothing. One billion BUNKER lands on the deployer. There is no second mint and no fee function.",
  },
  {
    n: "02",
    title: "Use Uniswap v3.",
    body: "Position manager 0xC36442b4a4522E871399CD717aBDD847Ab11FE88. Fee tier 1% (10000). Create the pool if it does not exist, initialize the price, then mint a position. Approve both BUNKER and STRK to that manager first.",
  },
  {
    n: "03",
    title: "Sort the price.",
    body: "token0 is the smaller address. If BUNKER is token0, the price is STRK per BUNKER. If STRK is token0, the price is inverted. Get this wrong and the pool opens at a nonsense rate. v4 is the same two tokens and a harder initialize. It is not required.",
  },
] as const;

export function MethodScreen() {
  return (
    <Shell>
      <section className="mx-auto w-full max-w-6xl px-5 pt-6 sm:px-8 sm:pt-12">
        <p className="kicker">Open</p>
        <h1 className="display display-md mt-4 max-w-3xl">
          Real STRK. <em>Real BUNKER.</em>
        </h1>
        <p className="lede">
          Nothing is virtual in this pool. You put STRK in, and you put BUNKER in. There is no
          1.5% skim. A transfer tax would take a cut of the STRK swap and the position would fail.
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
          <a className="action" href="/Bunker.sol" download>
            Bunker.sol
          </a>
          <Link to="/raise" className="text-link">
            The pair
          </Link>
        </div>
      </section>
    </Shell>
  );
}
