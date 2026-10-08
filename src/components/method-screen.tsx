import { Shell } from "@/components/shell";

const STEPS = [
  {
    n: "01",
    title: "Long quotes in USDG.",
    body: "On Long, USDG is the quote. You deposit it, and a vault share comes out. The share is their token, for a market they already run.",
  },
  {
    n: "02",
    title: "Paxband is not that share.",
    body: "A pair named Paxband / USDG is a market in the token. It does not open a gold position, and it does not read a proof.",
  },
  {
    n: "03",
    title: "The pair waits.",
    body: "No contract is set. The market is not open. This site will not show a buy button for a pair that is not there.",
  },
] as const;

export function MethodScreen() {
  return (
    <Shell>
      <p className="text-sm text-teal">Long</p>
      <h1 className="mt-2 max-w-xl font-display text-6xl leading-none">The venue, not the ounce.</h1>
      <ol className="mt-12">
        {STEPS.map((step) => (
          <li key={step.n} className="piece">
            <p className="text-sm text-teal">{step.n}</p>
            <h2 className="mt-2 font-display text-4xl leading-none">{step.title}</h2>
            <p className="mt-4 max-w-lg">{step.body}</p>
          </li>
        ))}
      </ol>
    </Shell>
  );
}
