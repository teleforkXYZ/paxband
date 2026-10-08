import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";

const STEPS = [
  {
    n: "01",
    title: "The quote is USDG.",
    body: "Paxband trades against USDG. One side of the print is the band. The other side is the dollar. Both are already on the tape.",
  },
  {
    n: "02",
    title: "The name is the meme.",
    body: "Paxband. Short enough to yell, new enough that saying it still counts as early.",
  },
  {
    n: "03",
    title: "The pool is live.",
    body: "Robinhood. Uniswap. The CA is public. Buys and sells are landing while you read this.",
  },
] as const;

export function MethodScreen() {
  return (
    <Shell>
      <section className="mx-auto w-full max-w-6xl px-5 pt-6 sm:px-8 sm:pt-12">
        <p className="kicker">Long</p>
        <h1 className="display display-md mt-4 max-w-3xl">
          Still early. <em>Not for long.</em>
        </h1>
        <p className="lede">
          The pool is loud. The name is still small. That gap is the whole trade.
        </p>

        <div className="split mt-12">
          <article>
            <p className="kicker">Later</p>
            <h3>The recap</h3>
            <p>Someone will post the chart after the move and call it research. The blocks will already be old.</p>
          </article>
          <article className="is-ours">
            <p className="kicker">Now</p>
            <h3>The CA</h3>
            <p>One address. A live Paxband / USDG pool. Prints you can tap. That is the whole invite.</p>
          </article>
        </div>

        <ol className="steps">
          {STEPS.map((step) => (
            <li key={step.n} className="chapter">
              <p className="idx">{step.n}</p>
              <h2>{step.title}</h2>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>

        <p className="lede">
          The story is short on purpose. Copy the CA. Watch the tape. Let the timeline catch up.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <a className="action" href="/Paxband.sol" download>
            Draft contract
          </a>
          <Link to="/raise" className="text-link">
            Back to the pair
          </Link>
        </div>
      </section>
    </Shell>
  );
}
