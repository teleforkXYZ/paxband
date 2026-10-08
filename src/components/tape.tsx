import { useEffect, useState } from "react";
import { getTape, type Print, type Tape } from "@/lib/tape";

function money(n: number) {
  if (n >= 100) return `$${Math.round(n).toLocaleString("en-US")}`;
  if (n >= 1) return `$${n.toFixed(2)}`;
  if (n > 0) return `$${n.toFixed(4)}`;
  return "$0";
}

function price(n: number) {
  if (n <= 0) return "—";
  if (n >= 1) return `$${n.toFixed(2)}`;
  return `$${n.toPrecision(4)}`;
}

function size(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toFixed(0);
}

function ago(s: number) {
  if (s < 60) return `${s}s`;
  if (s < 3600) return `${Math.round(s / 60)}m`;
  return `${Math.round(s / 3600)}h`;
}

function short(wallet: string) {
  return `${wallet.slice(0, 6)}…${wallet.slice(-4)}`;
}

function Rows({ rows }: { rows: Print[] }) {
  if (rows.length === 0) {
    return <p className="side-empty">Quiet in this window.</p>;
  }
  return (
    <ul className="side-list">
      {rows.map((row) => (
        <li key={row.hash} className="side-row">
          <a
            href={`https://robinhoodchain.blockscout.com/tx/${row.hash}`}
            target="_blank"
            rel="noreferrer"
          >
            <span className="side-usd">{money(row.usd)}</span>
            <span className="side-meta">
              {size(row.tokens)} · {short(row.wallet)} · {ago(row.age)}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function TapeBoard() {
  const [tape, setTape] = useState<Tape | null>(null);

  useEffect(() => {
    let stop = false;
    async function pull() {
      try {
        const next = await getTape();
        if (!stop) setTape(next);
      } catch {
        /* keep the last board */
      }
    }
    void pull();
    const id = setInterval(() => void pull(), 10000);
    return () => {
      stop = true;
      clearInterval(id);
    };
  }, []);

  const buys = tape?.prints.filter((row) => row.side === "buy").slice(0, 5) ?? [];
  const sells = tape?.prints.filter((row) => row.side === "sell").slice(0, 5) ?? [];
  const change = tape?.change ?? 0;

  return (
    <section className="flow">
      <div className="flow-top">
        <p className="kicker">
          <span className="dot" aria-hidden="true" /> Robinhood pool
        </p>
        <h2 className="display display-md mt-4">
          Buys and <em>sells.</em>
        </h2>
        <p className="lede">
          The pool is live. Every row is a real print. Scroll is how you get late.
        </p>
      </div>

      <dl className="flow-stats">
        <div>
          <dt>Price</dt>
          <dd>{tape ? price(tape.price) : "—"}</dd>
        </div>
        <div>
          <dt>Hour</dt>
          <dd className={change < 0 ? "is-down" : "is-up"}>
            {tape ? `${change > 0 ? "+" : ""}${change.toFixed(1)}%` : "—"}
          </dd>
        </div>
        <div>
          <dt>Liquidity</dt>
          <dd>{tape ? money(tape.liquidity) : "—"}</dd>
        </div>
        <div>
          <dt>Volume</dt>
          <dd>{tape ? money(tape.volume) : "—"}</dd>
        </div>
      </dl>

      <div className="flow-grid">
        <article className="side-card is-buy">
          <p className="kicker">Buy</p>
          <p className="side-n">{tape ? tape.buys : "—"}</p>
          <p className="side-label">this hour</p>
          <Rows rows={buys} />
        </article>
        <article className="side-card is-sell">
          <p className="kicker">Sell</p>
          <p className="side-n">{tape ? tape.sells : "—"}</p>
          <p className="side-label">this hour</p>
          <Rows rows={sells} />
        </article>
      </div>

      {tape ? (
        <p className="flow-links">
          <a className="text-link" href={tape.gmgn} target="_blank" rel="noreferrer">
            The GMGN tape
          </a>
          <a className="text-link" href={tape.chart} target="_blank" rel="noreferrer">
            The chart
          </a>
        </p>
      ) : null}
    </section>
  );
}
