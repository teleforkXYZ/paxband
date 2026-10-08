import { Link } from "@tanstack/react-router";
import { CaBox } from "@/components/ca-box";
import { Shell } from "@/components/shell";
import { FACTS, HOME_SPEC, TICKER } from "@/data/sheet";

export function BookScreen() {
  const loop = [...TICKER, ...TICKER];
  return (
    <Shell>
      <section className="mx-auto w-full max-w-6xl px-5 pt-6 sm:px-8 sm:pt-12">
        <p className="kicker">Token</p>
        <h1 className="display mt-4 max-w-4xl">
          The pair is <em>not open.</em>
        </h1>
        <p className="lede">
          Paxband is a token. Quoted in USDG, on Long. It is not PAXG, and it is not Paxos.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <Link to="/raise" className="action">
            See the pair
          </Link>
          <Link to="/method" className="text-link">
            Why it waits
          </Link>
        </div>
        <CaBox />
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 pt-10 sm:px-8 sm:pt-14">
        <figure className="portrait">
          <img
            src="/hero.jpg"
            alt="The Paxband mark: a gold and teal blossom around a navy ring, with a small lock."
          />
        </figure>
        <dl className="spec">
          {HOME_SPEC.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="band mt-14 sm:mt-20">
        <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
          <p className="kicker">Kept apart</p>
          <h2 className="display display-md mt-4 max-w-3xl">
            A quote is <em>not the bar.</em>
          </h2>
          <p className="band-copy">
            Opening Paxband / USDG does not create an ounce, a PAXG balance, or a Lighter position.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <ol>
          {FACTS.map((fact) => (
            <li key={fact.n} className="chapter">
              <p className="idx">{fact.n}</p>
              <h2>{fact.title}</h2>
              <p>{fact.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {loop.map((item, i) => (
            <span key={`${item}-${i}`}>{item}</span>
          ))}
        </div>
      </div>

      <section className="mx-auto grid w-full max-w-6xl items-start gap-10 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <p className="kicker">Contract</p>
          <h2 className="display display-md mt-4">
            We write it. <em>Long only quotes it.</em>
          </h2>
          <p className="lede">
            Long’s vault takes USDG and mints their share of a position they can prove. Paxband is not that share. Nothing here can be bought.
          </p>
          <Link to="/method" className="action mt-8">
            Read the split
          </Link>
        </div>
        <div className="split">
          <article>
            <p className="kicker">Not this</p>
            <h3>Long’s vault</h3>
            <p>USDG in. Their share out. A Lighter position behind it. Their proof, their market.</p>
          </article>
          <article className="is-ours">
            <p className="kicker">This</p>
            <h3>Paxband</h3>
            <p>Our token. No USDG in. No gold out. The pair opens only when the address and the market exist together.</p>
          </article>
        </div>
      </section>
    </Shell>
  );
}
