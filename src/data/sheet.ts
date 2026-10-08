export const FACTS = [
  {
    n: "01",
    k: "Token",
    title: "Paxband.",
    body: "The token name is Paxband. It is not PAXG, and it is not Paxos.",
  },
  {
    n: "02",
    k: "Quote",
    title: "USDG.",
    body: "The pair is Paxband / USDG. A USDG quote is the other side of a market. It is not an ounce of gold.",
  },
  {
    n: "03",
    k: "Venue",
    title: "Long.",
    body: "The venue is Long. Their markets are theirs. This pair is not one of them until the contract exists and the market is actually there.",
  },
] as const;

export const HOME_SPEC = [
  ["Token", "Paxband"],
  ["Quote", "USDG"],
  ["Venue", "Long"],
  ["Market", "Not open"],
] as const;

export const PAIR_SPEC = [
  ["Token", "Paxband"],
  ["Quote", "USDG"],
  ["Pair", "Paxband / USDG"],
  ["Venue", "Long"],
  ["Contract", "Not set"],
  ["Market", "Not open"],
] as const;

export const NOTS = [
  "Not an ounce of gold.",
  "Not a PAXG balance.",
  "Not a Lighter position.",
  "Not a vault share Long already runs.",
  "Not a price read from a proof.",
] as const;

export const TICKER = [
  "Paxband is a token",
  "Not PAXG",
  "Not Paxos",
  "Quote USDG",
  "Venue Long",
  "Contract 0xd90eb4e7500612b4e7364d9135bfb519a2901e18",
  "Market not open",
  "Not the bar",
] as const;

/** Contract address, stored exactly as pasted. Empty until one is sent. */
export const CONTRACT = "0xd90eb4e7500612b4e7364d9135bfb519a2901e18";
