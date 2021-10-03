import {
  assertEquals,
  assertExists,
} from "https://deno.land/std@0.88.0/testing/asserts.ts";

import * as FS from "../fs.ts";

import { kOutputFolderPath, kStoredExpeditionsText } from "./constants.ts";

async function removeOutputFolder() {
  try {
    await Deno.remove(kOutputFolderPath, { recursive: true });
  } catch {
    // do nothing
  }
}

Deno.test("can parse expeditions", () => {
  const expeditions = FS.parseExpeditions(kStoredExpeditionsText);

  assertEquals(expeditions.length, 7);

  for (const expedition of expeditions) {
    assertExists(expedition.expeditionCode);
    assertExists(expedition.firstSamplingDate);
    assertExists(expedition.lastSamplingDate);
    assertExists(expedition.programs);
    assertExists(expedition.programs[0]);
    assertExists(expedition.vessel);
  }
});

Deno.test("returns empty array on file not found", async () => {
  await removeOutputFolder();

  const expeditions = await FS.getExpeditions();

  assertEquals(expeditions.length, 0);
});

Deno.test("can write expeditions to new file", async () => {
  await removeOutputFolder();

  let expeditions = FS.parseExpeditions(kStoredExpeditionsText);

  await FS.saveExpeditions(expeditions);

  expeditions = await FS.getExpeditions();

  assertEquals(expeditions.length, 7);
});

Deno.test("can write expeditions to an existing file", async () => {
  await removeOutputFolder();

  let expeditions = FS.parseExpeditions(kStoredExpeditionsText);

  await FS.saveExpeditions(expeditions);

  expeditions = await FS.getExpeditions();
  expeditions = expeditions.slice(0, 3);

  await FS.saveExpeditions(expeditions);

  expeditions = await FS.getExpeditions();

  assertEquals(expeditions.length, 3);
});
