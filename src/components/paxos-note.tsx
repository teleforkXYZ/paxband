const POST = "https://x.com/Paxos/status/2108232752835481988";

export function PaxosNote() {
  return (
    <section className="note">
      <div>
        <p className="kicker">On X</p>
        <h2 className="display display-md mt-4">
          Even the bar <em>is paying.</em>
        </h2>
        <p className="lede">
          Paxos put a hundred thousand in USDG on PAXG. The band is the name still early enough to say first.
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
