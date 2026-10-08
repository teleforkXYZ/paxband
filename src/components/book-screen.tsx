import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Shell } from "@/components/shell";
import { type Draft, REFERENCE, loadDrafts, saveDrafts } from "@/data/bands";

const FILTERS = ["All", "Filed", "1×", "3×", "5×", "7×", "Elsewhere"] as const;
type Filter = (typeof FILTERS)[number];

export function BookScreen() {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [filter, setFilter] = useState<Filter>("All");

  useEffect(() => {
    setDrafts(loadDrafts());
  }, []);

  function remove(id: string) {
    const next = drafts.filter((row) => row.id !== id);
    setDrafts(next);
    saveDrafts(next);
  }

  const showFiled = filter === "All" || filter === "Filed" || filter.endsWith("×");
  const showForeign = filter === "All" || filter === "Elsewhere" || filter.endsWith("×");
  const band = filter.endsWith("×") ? Number(filter.replace("×", "")) : null;
  const filed = drafts.filter((row) => showFiled && (band === null || row.band === band));
  const foreign = REFERENCE.filter((row) => showForeign && (band === null || row.band === band));
  const empty = filed.length + foreign.length === 0;

  return (
    <Shell>
      <p className="text-sm font-semibold tracking-widest text-green uppercase">Launches</p>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
        <h1 className="max-w-xl font-display text-5xl leading-none text-ink">
          File a band. Do not mint it.
        </h1>
        <Link to="/raise" className="action">
          File a band
        </Link>
      </div>
      <p className="mt-4 max-w-2xl text-muted">
        A launch here is a draft. 1×, 3×, 5×, 7×. Quoted in USDG. Paxband is not Paxos, and a ticker is not a position.
      </p>

      <div className="mt-6 flex flex-wrap gap-2" role="toolbar" aria-label="Filter launches">
        {FILTERS.map((item) => (
          <button
            key={item}
            type="button"
            className={item === filter ? "chip is-on" : "chip"}
            aria-pressed={item === filter}
            onClick={() => setFilter(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <section className="board mt-4">
        {empty ? (
          <p className="p-4 text-muted">Nothing in this filter. File a band, or switch back to All.</p>
        ) : null}
        {filed.map((row) => (
          <article key={row.id} className="launch-row">
            <div className="min-w-0">
              <p className="truncate font-display text-xl leading-none">{row.symbol}</p>
              <p className="mt-1 truncate text-sm text-muted">
                {row.name} · {row.underlying} · cap ${row.cap.toLocaleString("en-US")}
              </p>
            </div>
            <p className="launch-meta text-sm">{row.band}×</p>
            <p>
              <span className="pill">Draft</span>
            </p>
            <button type="button" className="quiet" onClick={() => remove(row.id)}>
              Pull
            </button>
          </article>
        ))}
        {foreign.map((row) => (
          <article key={row.symbol} className="launch-row">
            <div className="min-w-0">
              <p className="truncate font-display text-xl leading-none">{row.symbol}</p>
              <p className="mt-1 truncate text-sm text-muted">
                {row.name} · {row.price} · {row.tvl}
              </p>
            </div>
            <p className="launch-meta text-sm">{row.band}×</p>
            <p>
              <span className="pill is-foreign">Not ours</span>
            </p>
            <p className="launch-meta text-right text-sm text-muted">{row.cap}</p>
          </article>
        ))}
      </section>
      {foreign.length > 0 ? (
        <p className="mt-3 text-sm text-muted">
          Not ours means live on LongX, public figures as of 8 Oct 2026. Those vaults sit on Lighter. Copying the row does not copy the position.
        </p>
      ) : null}
    </Shell>
  );
}
