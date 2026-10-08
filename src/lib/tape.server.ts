import { request as httpsRequest } from "node:https";

const RPC = "https://rpc.mainnet.chain.robinhood.com";
const TOKEN = "0xd90eb4e7500612b4e7364d9135bfb519a2901e18";
const PAIR = "0x6cc774b1e49cae6133fad1cadf99840ae7238b900575334f81d39b61c877a0dd";
const TRANSFER = "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";
const ZERO = "0x" + "0".repeat(40);

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

export async function readTape(): Promise<Tape> {
  if (cache && Date.now() - cache.at < 8000) return cache.data;
  const data = { ...EMPTY, prints: [] as Print[] };
  try {
    const res = await fetch(`https://api.dexscreener.com/latest/dex/pairs/robinhood/${PAIR}`);
    const json = (await res.json()) as {
      pairs?: Array<{
        priceUsd?: string;
        priceChange?: { h1?: number };
        liquidity?: { usd?: number };
        volume?: { h1?: number };
        txns?: { h1?: { buys?: number; sells?: number } };
      }>;
    };
    const pair = json.pairs?.[0];
    if (pair) {
      data.price = Number(pair.priceUsd) || 0;
      data.change = pair.priceChange?.h1 ?? 0;
      data.liquidity = pair.liquidity?.usd ?? 0;
      data.volume = pair.volume?.h1 ?? 0;
      data.buys = pair.txns?.h1?.buys ?? 0;
      data.sells = pair.txns?.h1?.sells ?? 0;
    }
  } catch {
    /* the cards still render */
  }

  try {
    const head = (await rpc("eth_getBlockByNumber", ["latest", false])) as {
      number: string;
    };
    const headNum = Number.parseInt(head.number, 16);
    const logs = (await rpc("eth_getLogs", [
      {
        fromBlock: "0x" + (headNum - 6000).toString(16),
        toBlock: "latest",
        address: TOKEN,
        topics: [TRANSFER],
      },
    ])) as Array<{
      transactionHash: string;
      blockNumber: string;
      data: string;
      topics: string[];
    }>;

    const seen = new Map<string, number>();
    for (const log of logs) {
      for (const topic of log.topics.slice(1)) {
        const addr = "0x" + topic.slice(-40);
        seen.set(addr, (seen.get(addr) ?? 0) + 1);
      }
    }
    let pool = "";
    let best = 0;
    for (const [addr, n] of seen) {
      if (n > best) {
        pool = addr;
        best = n;
      }
    }

    const byTx = new Map<string, typeof logs>();
    for (const log of logs) {
      const rows = byTx.get(log.transactionHash) ?? [];
      rows.push(log);
      byTx.set(log.transactionHash, rows);
    }

    const prints: Print[] = [];
    for (const [hash, rows] of byTx) {
      const nets = new Map<string, number>();
      const block = Number.parseInt(rows[0].blockNumber, 16);
      for (const log of rows) {
        const from = "0x" + log.topics[1].slice(-40);
        const to = "0x" + log.topics[2].slice(-40);
        const amount = Number(BigInt(log.data)) / 1e18;
        nets.set(from, (nets.get(from) ?? 0) - amount);
        nets.set(to, (nets.get(to) ?? 0) + amount);
      }
      let wallet = "";
      let net = 0;
      for (const [addr, value] of nets) {
        if (addr === pool || addr === ZERO) continue;
        if (Math.abs(value) > Math.abs(net)) {
          wallet = addr;
          net = value;
        }
      }
      if (!wallet || net === 0) continue;
      const tokens = Math.abs(net);
      const usd = tokens * data.price;
      if (data.price > 0 && usd < 0.5) continue;
      prints.push({
        side: net > 0 ? "buy" : "sell",
        tokens,
        usd,
        wallet,
        hash,
        age: Math.max(0, Math.round((headNum - block) * 0.1)),
      });
    }
    prints.sort((a, b) => a.age - b.age);
    data.prints = prints.slice(0, 16);
  } catch {
    /* hour counts still stand */
  }

  cache = { at: Date.now(), data };
  return data;
}
