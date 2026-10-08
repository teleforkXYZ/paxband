import { useState } from "react";
import { CONTRACT } from "@/data/sheet";

export function CaBox() {
  const [copied, setCopied] = useState(false);
  const set = CONTRACT.length > 0;

  async function copy() {
    if (!set) return;
    await navigator.clipboard.writeText(CONTRACT);
    setCopied(true);
  }

  return (
    <div className="ca">
      <div className="ca-row">
        <p className="kicker ca-kicker">Contract</p>
        <button type="button" className="ca-copy" onClick={copy} disabled={!set}>
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <p className="ca-value">{set ? CONTRACT : "Not set"}</p>
      <p className="ca-note">
        {set
          ? "Copy it. The pool is already printing."
          : "Nothing is stamped yet. An address lands here exactly as sent."}
      </p>
    </div>
  );
}
