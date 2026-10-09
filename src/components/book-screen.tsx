import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";

const POST = "https://x.com/Starknet/status/2108113391525204034";

const FACTS = [
  ["Name", "Bunker Mode"],
  ["Ticker", "BUNKER"],
  ["Pair", "BUNKER / ETH"],
  ["Fee", "1.5% / 1.5%"],
] as const;

export function BookScreen() {
  return (
    <Shell>
      <section className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 pt-6 sm:px-8 sm:pt-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="kicker">Robinhood Chain</p>
          <h1 className="display mt-4 max-w-3xl">
            Bunker <em>Mode.</em>
          </h1>
          <p className="lede">
            Starknet said they are considering an L1, so the network could be the first fully
            quantum-resistant chain. The target they named is 2027. BUNKER is a note on that
            sentence. It is not STRK, and it is not Starknet.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <a className="action" href={POST} target="_blank" rel="noreferrer">
              Read the post
            </a>
            <Link to="/raise" className="text-link">
              The curve
            </Link>
          </div>
        </div>
        <figure className="mark lg:justify-self-end">
          <img src="/mark.png" alt="Bunker Mode mark. A white wave and a star on navy, in a coral ring." />
        </figure>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 pt-12 sm:px-8">
        <dl className="spec">
          {FACTS.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="band mt-14 sm:mt-20">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <p className="kicker">2027</p>
          <h2 className="display display-md mt-4 max-w-3xl">
            An L1, <em>if they do it.</em>
          </h2>
          <p className="band-copy">
            The post is a consideration, not a finished chain. The curve does not become that
            network. The subject stays linked, in the contract, as subject.
          </p>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-3">
        <article>
          <p className="kicker">01</p>
          <h2 className="mt-3 text-2xl">The sentence</h2>
          <p className="mt-3 text-muted">
            Actively considering an L1. First fully quantum-resistant network. Target 2027.
          </p>
        </article>
        <article>
          <p className="kicker">02</p>
          <h2 className="mt-3 text-2xl">The pair</h2>
          <p className="mt-3 text-muted">
            BUNKER / ETH on the curve. One virtual ETH sets the opening price. It is not deposited.
          </p>
        </article>
        <article>
          <p className="kicker">03</p>
          <h2 className="mt-3 text-2xl">The fee</h2>
          <p className="mt-3 text-muted">
            1.5% of ETH in, 1.5% of ETH out. A treasury holds it. The rate cannot move. Sells stay open.
          </p>
        </article>
      </section>
    </Shell>
  );
}
