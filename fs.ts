export interface Expedition {
  expeditionCode: string;
  firstSamplingDate: Date;
  lastSamplingDate: Date;
  programs: string[];
  vessel: string;
}

const outputDir = `./out`;
const outputFilePath = `${outputDir}/output.ndjson`;

export function parseExpeditions(text: string): Expedition[] {
  const arr: Expedition[] = [];
  const lines = text.split("\n");

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (!trimmedLine) {
      continue;
    }

    const expedition: Expedition = JSON.parse(trimmedLine, (key, value) => {
      // parse date properties to Date objects
      switch (key) {
        case "firstSamplingDate":
        case "lastSamplingDate":
          return value ? new Date(value) : null;
        default:
          return value;
      }
    });

    arr.push(expedition);
  }

  return arr;
}

export async function getExpeditions(): Promise<Expedition[]> {
  let text: string;

  try {
    text = await Deno.readTextFile(outputFilePath);
  } catch (err) {
    if (err instanceof Deno.errors.NotFound) {
      return [];
    }

    throw err;
  }

  return parseExpeditions(text);
}

export async function saveExpeditions(arr: Expedition[]) {
  await ensureDirectory(outputDir);

  let text = "";

  for (const expedition of arr) {
    text += JSON.stringify(expedition) + "\n";
  }

  await Deno.writeTextFile(outputFilePath, text);
}

async function ensureDirectory(path: string): Promise<void> {
  await Deno.mkdir(path, { recursive: true });
}
