import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";

const STEPS = [
  {
    n: "01",
    title: "Long quotes in USDG.",
    body: "On Long, USDG is the quote. Deposit it and a vault share comes out. The share is their token, for a market they already run, against a Lighter position they can prove.",
  },
  {
    n: "02",
    title: "Paxband is not that share.",
    body: "We write our own token. It does not take USDG, it does not redeem gold, and it does not read a proof. The symbol is PAXBAND, never PAXG.",
  },
  {
    n: "03",
    title: "The pair waits.",
    body: "No contract is set. The market is not open. The address and the live Long market go on the sheet together, or not at all.",
  },
] as const;

export function MethodScreen() {
  return (
    <Shell>
      <section className="mx-auto w-full max-w-6xl px-5 pt-6 sm:px-8 sm:pt-12">
        <p className="kicker">Long</p>
        <h1 className="display display-md mt-4 max-w-3xl">
          The venue, <em>not the ounce.</em>
        </h1>
        <p className="lede">
          Long is where a Paxband / USDG quote can live later. It is not the issuer, and it is not the bar.
        </p>

        <div className="split mt-12">
          <article>
            <p className="kicker">Not this</p>
            <h3>Their vault</h3>
            <p>Minting through Long would sell their share. We do not have their proof, and we will not wear it.</p>
          </article>
          <article className="is-ours">
            <p className="kicker">This</p>
            <h3>Our token</h3>
            <p>A Paxband contract with supply at zero. Deposit reverts. Redeem reverts. Mint stays closed.</p>
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
          The draft cannot take a deposit. It is not deployed, and it is not a sale.
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
