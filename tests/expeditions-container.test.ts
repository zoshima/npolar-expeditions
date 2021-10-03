import { assertEquals } from "https://deno.land/std@0.88.0/testing/asserts.ts";

import * as FS from "../fs.ts";
import * as Utils from "../utils.ts";
import { kStoredExpeditionsText } from "./constants.ts";
import { ExpeditionsContainer } from "../expeditions-container.ts";

Deno.test("can initialize with loaded data", () => {
  const loadedExpeditions = FS.parseExpeditions(kStoredExpeditionsText);
  const container = new ExpeditionsContainer(loadedExpeditions);

  assertEquals(container.length, loadedExpeditions.length);
});

Deno.test("duplicates on expeditionCode should update first/last dates", () => {
  const loadedExpeditions = FS.parseExpeditions(kStoredExpeditionsText);
  const container = new ExpeditionsContainer(loadedExpeditions);
  const newExpedition = Utils.castToAPIExpedition(loadedExpeditions[0]);

  const testDate = (date: Date, expectLast: boolean) => {
    newExpedition.utc_date = date.toISOString();

    container.addExpedition(newExpedition);

    assertEquals(container.length, loadedExpeditions.length);

    const values = container.getValues();

    assertEquals(
      expectLast ? values[0].lastSamplingDate : values[0].firstSamplingDate,
      date,
    );
  };

  testDate(new Date(), true); // today should become lastSamplingDate
  testDate(new Date(0), false); // 1970 should becomre firstSamplingDate
});

Deno.test("should return values sorted by firstSamplingDate (descending)", () => {
  const loadedExpeditions = FS.parseExpeditions(kStoredExpeditionsText);
  const container = new ExpeditionsContainer(loadedExpeditions);

  const testSorted = () => {
    const sortedValues = container.getSortedValues();

    for (let i = 1; i < sortedValues.length; ++i) {
      assertEquals(
        true,
        sortedValues[i - 1].firstSamplingDate >=
          sortedValues[i].firstSamplingDate,
      );
    }
  };

  testSorted();

  const newExpedition = Utils.castToAPIExpedition(loadedExpeditions[0]);
  newExpedition.expedition = "test";
  newExpedition.utc_date = (new Date()).toISOString(); // today, should appear at the top of the sorted list

  container.addExpedition(newExpedition);

  testSorted();
});
