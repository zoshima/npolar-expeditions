import * as FS from "./fs.ts";
import * as API from "./api.ts";

export function castToAPIExpedition(
  expedition: FS.Expedition,
): API.Expedition {
  return {
    expedition: expedition.expeditionCode,
    conveyance: expedition.vessel,
    utc_date: expedition.lastSamplingDate?.toISOString() ||
      expedition.firstSamplingDate?.toISOString(),
    programs: [...expedition.programs],
  } as API.Expedition;
}

export function castToFSExpedition(
  expedition: API.Expedition,
): FS.Expedition {
  const date = new Date(expedition.utc_date);

  return {
    expeditionCode: expedition.expedition,
    vessel: expedition.conveyance,
    firstSamplingDate: date,
    lastSamplingDate: date,
    programs: expedition.programs
      ? [
        ...expedition.programs,
      ]
      : [],
  } as FS.Expedition;
}
