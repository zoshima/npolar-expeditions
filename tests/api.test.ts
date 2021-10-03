import {
  assertEquals,
  assertExists,
} from "https://deno.land/std@0.88.0/testing/asserts.ts";

import * as API from "../api.ts";

Deno.test("can fetch and access through interface", async () => {
  const results = await API.getExpeditions("50");

  assertEquals(results.length, 50);

  for (const expedition of results) {
    assertExists(expedition.conveyance);
    assertExists(expedition.expedition);
    assertExists(expedition.programs);
    assertExists(expedition.programs[0]);
    assertExists(expedition.utc_date);
  }
});
