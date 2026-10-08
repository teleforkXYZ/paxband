import { Shell } from "@/components/shell";

const ROWS = [
  ["Pair", "Paxband / USDG"],
  ["Venue", "Long"],
  ["Contract", "Not set"],
  ["Market", "Not open"],
] as const;

export function RaiseScreen() {
  return (
    <Shell>
      <p className="text-sm">Pair</p>
      <h1 className="mt-2 max-w-xl font-display text-6xl leading-none">Paxband / USDG.</h1>
      <p className="mt-6 max-w-lg text-lg">
        This is the market. It is not live. There is no contract on this page, and nothing here can be bought.
      </p>
      <dl className="mt-12">
        {ROWS.map(([label, value]) => (
          <div key={label} className="piece grid grid-cols-[7rem_1fr] gap-4">
            <dt>{label}</dt>
            <dd className="font-display text-3xl leading-none">{value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-10 max-w-lg">
        When the contract exists, it is stamped here. A USDG pair on Long does not become a Lighter position, and it does not become PAXG.
      </p>
    </Shell>
  );
}
