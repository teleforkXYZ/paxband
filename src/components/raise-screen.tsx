import { useMemo, useState } from "react";
import { Shell } from "@/components/shell";
import {
  BANDS,
  CAPS,
  type Band,
  type Draft,
  loadDrafts,
  mentionsPaxg,
  saveDrafts,
  suggestSymbol,
} from "@/data/bands";

export function RaiseScreen() {
  const [name, setName] = useState("");
  const [underlying, setUnderlying] = useState("");
  const [band, setBand] = useState<Band>(1);
  const [symbol, setSymbol] = useState("");
  const [symbolTouched, setSymbolTouched] = useState(false);
  const [cap, setCap] = useState<number>(250_000);
  const [ticket, setTicket] = useState<Draft | null>(null);
  const [error, setError] = useState("");

  const suggested = useMemo(() => suggestSymbol(underlying, band), [underlying, band]);
  const shownSymbol = symbolTouched ? symbol : suggested;

  function fileDraft() {
    const cleanName = name.trim();
    const cleanSymbol = (symbolTouched ? symbol : suggested).trim().toUpperCase();
    const cleanUnderlying = underlying.trim();
    if (cleanName.length < 2) {
      setError("Name the market.");
      return;
    }
    if (!/^[A-Z0-9]{2,16}$/.test(cleanSymbol)) {
      setError("Symbol is letters and numbers, 2 to 16.");
      return;
    }
    if (cleanUnderlying.length < 2) {
      setError("Name the underlying.");
      return;
    }
    const row: Draft = {
      id: crypto.randomUUID(),
      name: cleanName,
      symbol: cleanSymbol,
      underlying: cleanUnderlying,
      band,
      cap,
      filedAt: Date.now(),
    };
    const next = [row, ...loadDrafts()].slice(0, 24);
    saveDrafts(next);
    setTicket(row);
    setError("");
  }

  const goldWarn = mentionsPaxg(`${underlying} ${name} ${shownSymbol}`);

  return (
    <Shell>
      <h1 className="mt-3 max-w-xl font-display text-6xl leading-none">Write a note. Do not mint it.</h1>
      <form
        className="mt-8 grid gap-6"
        onSubmit={(event) => {
          event.preventDefault();
          fileDraft();
        }}
      >
        <label className="grid gap-2">
          <span className="text-sm text-muted">Market name</span>
          <input className="field" value={name} maxLength={42} onChange={(event) => setName(event.target.value)} placeholder="Gold 3 band" />
        </label>
        <label className="grid gap-2">
          <span className="text-sm text-muted">Underlying</span>
          <input
            className="field"
            value={underlying}
            maxLength={32}
            onChange={(event) => setUnderlying(event.target.value)}
            placeholder="What the perp would track"
          />
        </label>
        <fieldset>
          <legend className="text-sm text-muted">Band</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {BANDS.map((item) => (
              <button
                key={item}
                type="button"
                className={item === band ? "chip is-on" : "chip"}
                aria-pressed={item === band}
                onClick={() => setBand(item)}
              >
                {item}×
              </button>
            ))}
          </div>
        </fieldset>
        <label className="grid gap-2">
          <span className="text-sm text-muted">Symbol</span>
          <input
            className="field"
            value={shownSymbol}
            maxLength={16}
            onChange={(event) => {
              setSymbolTouched(true);
              setSymbol(event.target.value.toUpperCase());
            }}
            placeholder="UNDERLYINGx3L"
          />
        </label>
        <fieldset>
          <legend className="text-sm text-muted">USDG cap</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {CAPS.map((item) => (
              <button
                key={item}
                type="button"
                className={item === cap ? "chip is-on" : "chip"}
                onClick={() => setCap(item)}
              >
                ${item / 1000}k
              </button>
            ))}
          </div>
        </fieldset>
        {goldWarn ? (
          <p className="card text-sm leading-relaxed">
            Spot gold on Robinhood Chain is a bridged PAXG balance of about half an ounce. A band does not hold that token. It would need a perp market on the execution venue. There isn’t one to point at.
          </p>
        ) : null}
        {error ? <p className="text-sm text-shut">{error}</p> : null}
        <button type="submit" className="action w-fit">
          File the draft
        </button>
      </form>
      {ticket ? (
        <article className="card mt-8">
          <p className="text-xs tracking-widest text-gold uppercase">Draft ticket</p>
          <h2 className="mt-2 font-display text-4xl leading-none">{ticket.symbol}</h2>
          <p className="mt-3 text-muted">
            {ticket.name}. {ticket.band}× against {ticket.underlying}. Cap ${ticket.cap.toLocaleString("en-US")} USDG.
          </p>
          <p className="mt-3 text-sm leading-relaxed">
            No contract. No pool. No Lighter account. The ticket is only on this browser.
          </p>
        </article>
      ) : null}
    </Shell>
  );
}
