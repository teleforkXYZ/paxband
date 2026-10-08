import { Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";

const FACTS = [
  {
    k: "Token",
    title: "Paxband.",
    body: "The token name is Paxband. It is not PAXG, and it is not Paxos.",
  },
  {
    k: "Quote",
    title: "USDG.",
    body: "The pair you are opening is Paxband / USDG. A USDG quote is the other side of a market. It is not an ounce of gold.",
  },
  {
    k: "Venue",
    title: "Long.",
    body: "The venue is Long. Their markets are theirs. This pair is not one of them until the contract exists and the market is actually there.",
  },
] as const;

export function BookScreen() {
  return (
    <Shell>
      <h1 className="m-0">
        <img className="lockup" src="/logo.png" alt="Paxband" />
      </h1>
      <p className="mt-6 max-w-md text-lg">Quoted in USDG. On Long. The pair is not open.</p>
      <div className="mt-8">
        <Link to="/raise" className="action">
          See the pair
        </Link>
      </div>
      <ol className="mt-16">
        {FACTS.map((fact) => (
          <li key={fact.k} className="piece">
            <p className="text-sm text-teal">{fact.k}</p>
            <h2 className="mt-2 font-display text-4xl leading-none">{fact.title}</h2>
            <p className="mt-4 max-w-lg">{fact.body}</p>
          </li>
        ))}
      </ol>
    </Shell>
  );
}
