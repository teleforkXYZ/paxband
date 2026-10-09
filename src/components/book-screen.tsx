import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";

const THREAD = "https://x.com/EliBenSasson/status/2108110129572741426";

export function BookScreen() {
  return (
    <Shell>
      <section className="slide mx-auto w-full max-w-6xl px-5 sm:px-8">
        <p className="slide-kicker">Token2049 · 8 Oct 2026</p>
        <h1 className="display mt-5 max-w-5xl">This calls for bunker mode.</h1>
        <p className="lede">
          Eli Ben-Sasson asked whether Starknet should become an L1 for post-quantum agility.
          Two things, in his words: the quantum threat may be closer than people think, and AI is
          already breaking math that was treated as safe. A chain that wants to last needs the
          right cryptography, crypto agility, and the option to be an L1.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <a className="action" href={THREAD} target="_blank" rel="noreferrer">
            The thread
          </a>
          <Link to="/raise" className="text-link">
            BUNKER / ETH
          </Link>
        </div>
      </section>

      <section className="slide mx-auto w-full max-w-6xl px-5 sm:px-8">
        <p className="slide-kicker">The question</p>
        <h2 className="display display-md mt-4 max-w-4xl">Modern history of money</h2>
        <p className="lede">
          Gold, then digital gold, then private digital gold. The thread stops on a question mark
          and asks which quality comes next.
        </p>
        <ol className="rail">
          <li>
            <p className="stack"><span>Gold</span></p>
            <div className="station" aria-hidden="true">
              <span className="bars"><span /><span /><span /></span>
            </div>
          </li>
          <li>
            <p className="stack"><span>Digital</span><span>Gold</span></p>
            <div className="station"><span className="coin">B</span></div>
          </li>
          <li>
            <p className="stack"><span>Private</span><span>Digital</span><span>Gold</span></p>
            <div className="station"><span className="coin">Z</span></div>
          </li>
          <li>
            <p className="stack"><span>?</span><span>Private</span><span>Digital</span><span>Gold</span></p>
            <div className="station"><span className="coin">?</span></div>
          </li>
        </ol>
      </section>

      <section className="slide mx-auto w-full max-w-6xl px-5 sm:px-8">
        <p className="slide-kicker">The custody axiom</p>
        <p className="mt-4 text-2xl">The fine print of self-custody</p>
        <p className="axiom">Your keys, your coins*</p>
        <div className="rule" />
        <p className="fine">*Provided the math remains hard.</p>
      </section>

      <section className="slide mx-auto w-full max-w-6xl px-5 sm:px-8">
        <p className="slide-kicker">Put the quantum threat aside</p>
        <h2 className="display display-md mt-4">Post-quantum secure</h2>
        <p className="neq" aria-hidden="true">≠</p>
        <h2 className="display display-md">Post-AI secure</h2>
        <p className="lede">
          The thread points at the pace of mathematical results coming out of AI, and at work like
          ecdsa/fail, which it says can pull a quantum-style break closer. Quantum-ready is not the
          same claim as AI-ready. Both are the ask.
        </p>
      </section>

      <section className="slide mx-auto w-full max-w-6xl px-5 sm:px-8">
        <p className="slide-kicker">What it takes</p>
        <h2 className="display display-md mt-4">Staying future-proofed</h2>
        <div className="two">
          <div>
            <h3>Cryptography</h3>
            <ul>
              <li>Quantum-safe</li>
              <li>AI-safe</li>
            </ul>
          </div>
          <figure className="center-mark">
            <img src="/mark.png" alt="" />
          </figure>
          <div>
            <h3>Crypto agility</h3>
            <ul>
              <li>Smooth upgradability</li>
            </ul>
          </div>
        </div>
        <p className="lede">
          His two factors: the right cryptography, which he names as ZK-STARKs, and crypto agility
          so the scheme can move. He says Starknet has a migration roadmap to PQS, and still depends
          on Ethereum for as long as it is an L2.
        </p>
      </section>

      <section className="slide mx-auto w-full max-w-6xl px-5 sm:px-8">
        <p className="slide-kicker">The next column</p>
        <h2 className="display display-md mt-4 max-w-4xl">Agile, then the rest of the stack.</h2>
        <ol className="rail">
          <li>
            <p className="stack"><span>Gold</span></p>
            <div className="station" aria-hidden="true">
              <span className="bars"><span /><span /><span /></span>
            </div>
          </li>
          <li>
            <p className="stack"><span>Digital</span><span>Gold</span></p>
            <div className="station"><span className="coin">B</span></div>
          </li>
          <li>
            <p className="stack"><span>Private</span><span>Digital</span><span>Gold</span></p>
            <div className="station"><span className="coin">Z</span></div>
          </li>
          <li>
            <p className="stack">
              <span className="hot">Agile</span>
              <span>PSI</span>
              <span>PQS</span>
              <span>Private</span>
              <span>Digital</span>
              <span>Gold</span>
            </p>
            <div className="station">
              <img className="mark-sm" src="/mark.png" alt="Bunker Mode mark" />
            </div>
          </li>
        </ol>
      </section>

      <section className="slide mx-auto w-full max-w-6xl px-5 sm:px-8">
        <p className="slide-kicker">If the base layer is slow</p>
        <h2 className="display display-md mt-4 max-w-4xl">Ethereum too slow? An L1 is on the table.</h2>
        <p className="lede">
          Ethereum, he says, is targeting full L1 quantum resistance by the end of 2029. Bitcoin has
          made no such commitment. Starknet, in that talk, could get there by 2027, if it controls
          its own security migrations instead of waiting. That is a consideration, not a finished
          chain. Bunker Mode is not Starknet, and BUNKER is not STRK.
        </p>
        <dl className="spec">
          <div>
            <dt>Name</dt>
            <dd>Bunker Mode</dd>
          </div>
          <div>
            <dt>Ticker</dt>
            <dd>BUNKER</dd>
          </div>
          <div>
            <dt>Pair</dt>
            <dd>BUNKER / ETH</dd>
          </div>
          <div>
            <dt>Fee</dt>
            <dd>1.5% / 1.5%</dd>
          </div>
        </dl>
        <div className="mt-8 flex flex-wrap items-center gap-2">
          <Link to="/method" className="action">
            The fee
          </Link>
          <a className="text-link" href={THREAD} target="_blank" rel="noreferrer">
            Source
          </a>
        </div>
      </section>
    </Shell>
  );
}
