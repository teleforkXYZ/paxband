import { createServerFn } from "@tanstack/react-start";
import type { Tape } from "./tape.server";

export type { Print, Tape } from "./tape.server";

export const getTape = createServerFn({ method: "GET" }).handler(async (): Promise<Tape> => {
  const { readTape } = await import("./tape.server");
  return readTape();
});
