import { request as httpsRequest } from "node:https";

const RPC = "https://rpc.mainnet.chain.robinhood.com";
const TOKEN = "0xd90eb4e7500612b4e7364d9135bfb519a2901e18";
const PAIR = "0x6cc774b1e49cae6133fad1cadf99840ae7238b900575334f81d39b61c877a0dd";
const MANAGER = "0x8366a39cc670b4001a1121b8f6a443a643e40951";
const SWAP = "0x40e9cecb9f5f1f1c5b9c97dec2917b7ee92e57ba5563708daca94dd84ad7112f";

export type Print = {
  side: "buy" | "sell";
  usd: number;
  tokens: number;
  wallet: string;
  hash: string;
  age: number;
};

export type Tape = {
  price: number;
  change: number;
  liquidity: number;
  volume: number;
  buys: number;
  sells: number;
  prints: Print[];
  gmgn: string;
  chart: string;
};

const EMPTY: Tape = {
  price: 0,
  change: 0,
  liquidity: 0,
  volume: 0,
  buys: 0,
  sells: 0,
  prints: [],
  gmgn: `https://gmgn.ai/robinhood/token/${TOKEN}`,
  chart: `https://dexscreener.com/robinhood/${PAIR}`,
};

let cache: { at: number; data: Tape } | null = null;

async function rpc(method: string, params: unknown[]) {
  const payload = JSON.stringify({ jsonrpc: "2.0", id: 1, method, params });
  const body = await new Promise<string>((resolve, reject) => {
    const req = httpsRequest(
      RPC,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "user-agent": "paxband",
          "content-length": Buffer.byteLength(payload),
        },
      },
      (res) => {
        const chunks: Buffer[] = [];
        res.on("data", (chunk) => chunks.push(chunk as Buffer));
        res.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
      },
    );
    req.on("error", reject);
    req.write(payload);
    req.end();
  });
  const parsed = JSON.parse(body) as { result?: unknown; error?: { message?: string } };
  if (parsed.error || parsed.result === undefined) throw new Error(parsed.error?.message || "rpc");
  return parsed.result;
}

function intWord(data: string, index: number) {
  const hex = data.slice(2 + index * 64, 2 + (index + 1) * 64);
  if (hex.length !== 64) return 0n;
  const value = BigInt(`0x${hex}`);
  return value >= 1n << 255n ? value - (1n << 256n) : value;
}

function human(value: bigint, decimals: number) {
  const abs = value < 0n ? -value : value;
  const scale = 1_000_000n;
  const base = 10n ** BigInt(decimals);
  return Number((abs * scale) / base) / 1_000_000;
}

type SwapLog = {
  transactionHash: string;
  blockNumber: string;
  logIndex?: string;
  data: string;
  topics: string[];
};

export async function readTape(): Promise<Tape> {
  if (cache && Date.now() - cache.at < 8000) return cache.data;
  const data = { ...EMPTY, prints: [] as Print[] };
  try {
    const res = await fetch(`https://api.dexscreener.com/latest/dex/pairs/robinhood/${PAIR}`);
    const json = (await res.json()) as {
      pairs?: Array<{
        priceUsd?: string;
        liquidity?: { usd?: number };
      }>;
    };
    const pair = json.pairs?.[0];
    if (pair) {
      data.price = Number(pair.priceUsd) || 0;
      data.liquidity = pair.liquidity?.usd ?? 0;
    }
  } catch {
    /* spot price can miss; the tape is the chain */
  }

  try {
    const head = (await rpc("eth_getBlockByNumber", ["latest", false])) as {
      number: string;
      timestamp: string;
    };
    const headNum = Number.parseInt(head.number, 16);
    const headTs = Number.parseInt(head.timestamp, 16);
    const prev = (await rpc("eth_getBlockByNumber", ["0x" + (headNum - 3000).toString(16), false])) as {
      timestamp: string;
    };
    const sec = Math.max(0.05, (headTs - Number.parseInt(prev.timestamp, 16)) / 3000);
    const fromBlock = headNum - Math.ceil(3600 / sec) - 8;
    const logs: SwapLog[] = [];
    for (let block = fromBlock; block <= headNum; ) {
      const end = Math.min(block + 4999, headNum);
      const part = (await rpc("eth_getLogs", [
        {
          fromBlock: "0x" + block.toString(16),
          toBlock: "0x" + end.toString(16),
          address: MANAGER,
          topics: [SWAP, PAIR],
        },
      ])) as SwapLog[];
      logs.push(...part);
      block = end + 1;
    }

    logs.sort((a, b) => {
      const byBlock = Number.parseInt(a.blockNumber, 16) - Number.parseInt(b.blockNumber, 16);
      if (byBlock !== 0) return byBlock;
      return Number.parseInt(a.logIndex ?? "0x0", 16) - Number.parseInt(b.logIndex ?? "0x0", 16);
    });

    const prints: Print[] = [];
    let firstPx = 0;
    let lastPx = 0;
    for (const log of logs) {
      const amount0 = intWord(log.data, 0);
      const amount1 = intWord(log.data, 1);
      if (amount1 === 0n) continue;
      const usd = human(amount0, 6);
      const tokens = human(amount1, 18);
      if (usd >= 1 && tokens > 0) {
        const px = usd / tokens;
        if (!firstPx) firstPx = px;
        lastPx = px;
      }
      const block = Number.parseInt(log.blockNumber, 16);
      prints.push({
        side: amount1 > 0n ? "buy" : "sell",
        usd,
        tokens,
        wallet: "0x" + log.topics[2].slice(-40),
        hash: log.transactionHash,
        age: Math.max(0, Math.round((headNum - block) * sec)),
      });
    }

    data.buys = prints.filter((row) => row.side === "buy").length;
    data.sells = prints.filter((row) => row.side === "sell").length;
    data.volume = prints.reduce((sum, row) => sum + row.usd, 0);
    if (firstPx > 0 && lastPx > 0) data.change = ((lastPx - firstPx) / firstPx) * 100;

    const shown = [
      ...prints.filter((row) => row.side === "buy" && row.usd >= 0.5).reverse().slice(0, 5),
      ...prints.filter((row) => row.side === "sell" && row.usd >= 0.5).reverse().slice(0, 5),
    ];
    for (const row of shown) {
      try {
        const tx = (await rpc("eth_getTransactionByHash", [row.hash])) as { from?: string };
        if (tx.from) row.wallet = tx.from;
      } catch {
        /* the router address still names the print */
      }
    }
    data.prints = shown;
  } catch {
    /* counts stay at zero rather than a stale hour */
  }

  cache = { at: Date.now(), data };
  return data;
}
