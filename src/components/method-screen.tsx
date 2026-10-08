import { Shell } from "@/components/shell";

const STEPS = [
  {
    n: "01",
    title: "No token.",
    body: "The name PAXGx1L is not issued. A pool is not opened. The note stays on this browser.",
  },
  {
    n: "02",
    title: "A small hedge, ours.",
    body: "Our own money, off chain, 1× PAXG on Lighter. What gets published is a diary: price, funding, the account. Not a product.",
  },
  {
    n: "03",
    title: "Read it without us.",
    body: "If the account value cannot be read on chain without asking Paxband, mint is not written.",
  },
  {
    n: "04",
    title: "Then, and only then.",
    body: "Open, mint, redeem. USDG cannot leave the vault for another address. The first band is 1×. The cap is small. XAU is not renamed PAXG.",
  },
];

export function MethodScreen() {
  return (
    <Shell>
      <h1 className="max-w-xl font-display text-6xl leading-none sm:text-7xl">The long way is the safe way.</h1>
      <ol className="mt-14">
        {STEPS.map((step) => (
          <li key={step.n} className="piece">
            <p className="text-sm text-muted">{step.n}</p>
            <h2 className="mt-2 font-display text-4xl leading-none">{step.title}</h2>
            <p className="mt-4 max-w-lg text-muted">{step.body}</p>
          </li>
        ))}
      </ol>
    </Shell>
  );
}
