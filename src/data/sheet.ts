export const FACTS = [
  {
    n: "01",
    k: "Name",
    title: "Paxband.",
    body: "Say it while it is still a small word. The tape already knows it.",
  },
  {
    n: "02",
    k: "Quote",
    title: "USDG.",
    body: "Every print has two sides. This one settles in USDG. That is the quote, and it is moving.",
  },
  {
    n: "03",
    k: "Pool",
    title: "Live.",
    body: "Robinhood. Uniswap. Buys and sells are on the chain. The group chat is late by definition.",
  },
] as const;

export const HOME_SPEC = [
  ["Token", "Paxband"],
  ["Quote", "USDG"],
  ["Pool", "Uniswap"],
  ["Market", "Live"],
] as const;

export const PAIR_SPEC = [
  ["Token", "Paxband"],
  ["Quote", "USDG"],
  ["Pair", "Paxband / USDG"],
  ["Chain", "Robinhood"],
  ["Contract", "Not set"],
  ["Market", "Live"],
] as const;

export const NOTS = [
  "The tape does not send a reminder.",
  "Early is a timestamp, not a mood.",
  "Copy the CA before you explain it.",
  "The chart will not wait for the group chat.",
  "Late is just a later block.",
] as const;

export const TICKER = [
  "You're still early",
  "Copy the CA",
  "The tape is live",
  "Paxband / USDG",
  "Don't blink",
  "Bids are already in",
  "The band doesn't rewind",
  "FOMO has a ticker",
] as const;

/** Contract address, stored exactly as pasted. Empty until one is sent. */
export const CONTRACT = "0xd90eb4e7500612b4e7364d9135bfb519a2901e18";