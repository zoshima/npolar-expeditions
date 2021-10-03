# Running the binaries

Clone the repository (or download one of the binaries), then invoke the binary
from command line:

```
./program_linux <NUM>
```

Where `<NUM>` is the number of expeditions to fetch. Defaults to `all`.

The resulting output can be found in the `out/output.ndjson` file.

# Developer commands

Deno (https://deno.land/#installation)

## Build and run

```
deno run --allow-all ./main.ts <NUM>
```

## Test

```
deno test --allow-all
```

## Compile

### Unix

```
deno compile --allow-net --allow-read --allow-write --output ./bin/program ./main.ts
```

### Windows

```
deno compile --allow-net --allow-read --allow-write --output .\bin\program.exe .\main.ts
```
