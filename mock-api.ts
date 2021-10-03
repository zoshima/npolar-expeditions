import * as api from "./api.ts";

export async function getExpeditions(lim: string): Promise<api.Expedition[]> {
  const text = await Deno.readTextFile(`./.cache/${lim}.json`);

  return JSON.parse(text);
}
