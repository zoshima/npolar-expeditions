export interface Expedition {
  conveyance: string;
  expedition: string;
  programs: string[];
  // deno-lint-ignore camelcase
  utc_date: string;
}

export async function getExpeditions(lim: string): Promise<Expedition[]> {
  const url =
    `https://api.npolar.no/marine/biology/sample/?q=&fields=expedition,utc_date,programs,conveyance&limit=${lim}&format=json&variant=array`;

  const response = await fetch(url);
  const expeditions: Expedition[] = await response.json();

  return expeditions;
}
