import * as FS from "./fs.ts";
import * as API from "./api.ts";
import * as Utils from "./utils.ts";

export class ExpeditionsContainer {
  private map: Map<string, FS.Expedition>;

  constructor(
    storedExpeditions: FS.Expedition[],
  ) {
    this.map = new Map<string, FS.Expedition>(
      storedExpeditions.map((exp) => [exp.expeditionCode, exp]),
    );
  }

  public addExpedition(expedition: API.Expedition): void {
    const id = expedition.expedition;
    const date = new Date(expedition.utc_date);
    const storedExpedition = this.map.get(id);

    if (storedExpedition) {
      // already exists, update timestamps if necessary
      if (date < storedExpedition.firstSamplingDate) {
        storedExpedition.firstSamplingDate = date;
      } else if (date > storedExpedition.lastSamplingDate) {
        storedExpedition.lastSamplingDate = date;
      }
    } else {
      this.map.set(id, Utils.castToFSExpedition(expedition));
    }
  }

  public getSortedValues(): FS.Expedition[] {
    const sortedExpeditions: FS.Expedition[] = [...this.map.values()].sort((
      a,
      b,
    ) => a.firstSamplingDate < b.firstSamplingDate ? 1 : -1);

    return sortedExpeditions;
  }

  public getValues(): FS.Expedition[] {
    return [...this.map.values()];
  }

  public get length() {
    return this.map.size;
  }
}
