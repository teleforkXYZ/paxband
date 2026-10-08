import { Link } from "@tanstack/react-router";
import { CaBox } from "@/components/ca-box";
import { PaxosNote } from "@/components/paxos-note";
import { Shell } from "@/components/shell";
import { TapeBoard } from "@/components/tape";
import { FACTS, HOME_SPEC, TICKER } from "@/data/sheet";

export function BookScreen() {
  const loop = [...TICKER, ...TICKER];
  return (
    <Shell>
      <section className="mx-auto w-full max-w-6xl px-5 pt-6 sm:px-8 sm:pt-12">
        <p className="kicker">Token</p>
        <h1 className="display mt-4 max-w-4xl">
          You're early. <em>Act it.</em>
        </h1>
        <p className="lede">
          Paxband / USDG is printing. The CA is under this line. The tape will not wait for you to finish reading.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <Link to="/raise" className="action">
            Ride the tape
          </Link>
          <Link to="/method" className="text-link">
            Why it runs
          </Link>
        </div>
        <CaBox />
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <TapeBoard />
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
          <p className="kicker">Don't blink</p>
          <h2 className="display display-md mt-4 max-w-3xl">
            Miss it, <em>and it's a story.</em>
          </h2>
          <p className="band-copy">
            The prints are already on the chain. The CA is one tap. Late is just a later block.
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
        <PaxosNote />
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
          <p className="kicker">The move</p>
          <h2 className="display display-md mt-4">
            Copy it. <em>Then watch.</em>
          </h2>
          <p className="lede">
            The address is the ticket. The tape is the room. Everyone else is still explaining the name.
          </p>
          <Link to="/raise" className="action mt-8">
            Open the pair
          </Link>
        </div>
        <div className="split">
          <article>
            <p className="kicker">Later</p>
            <h3>The group chat</h3>
            <p>They will send the chart after the hour is already full. Screenshot energy. Zero fills.</p>
          </article>
          <article className="is-ours">
            <p className="kicker">Now</p>
            <h3>The band</h3>
            <p>CA in the wallet. Prints on the feed. Paxband / USDG, while the word is still small.</p>
          </article>
        </div>
      </section>
    </Shell>
  );
}
