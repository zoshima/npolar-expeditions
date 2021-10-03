import * as FS from "./fs.ts";
import * as API from "./api.ts";

import { ExpeditionsContainer } from "./expeditions-container.ts";

const lim: string = Deno.args.length && !isNaN(+Deno.args[0])
  ? Deno.args[0]
  : "all";

const loadedExpeditions = await API.getExpeditions(lim);

const storedExpeditions = await FS.getExpeditions();

const expeditionsContainer = new ExpeditionsContainer(storedExpeditions);

for (const expedition of loadedExpeditions) {
  expeditionsContainer.addExpedition(expedition);
}

const sortedExpeditions = expeditionsContainer.getSortedValues();

await FS.saveExpeditions(sortedExpeditions);
