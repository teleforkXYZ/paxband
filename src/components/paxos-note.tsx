const POST = "https://x.com/Paxos/status/2108232752835481988";

export function PaxosNote() {
  return (
    <section className="note">
      <div>
        <p className="kicker">On X</p>
        <h2 className="display display-md mt-4">
          Paxos, on <em>the bar.</em>
        </h2>
        <p className="lede">
          Their post. One hundred thousand dollars in USDG, over three months, for borrowing USDG against PAXG on Kamino. That collateral is PAXG. This page is Paxband.
        </p>
        <a className="text-link mt-4" href={POST} target="_blank" rel="noreferrer">
          Read it on X
        </a>
      </div>
      <a className="note-frame" href={POST} target="_blank" rel="noreferrer">
        <img
          src="/paxos-note.jpg"
          alt="Paxos graphic. PAXG market. One hundred thousand dollars in USDG rewards, over three months, on Kamino."
        />
      </a>
    </section>
  );
}
