# Running the binaries

Clone the repository (or download one of the binaries), then invoke a binary
from command line:

```
./program <NUM>
```

Where `<NUM>` is the number of expeditions to fetch. `all` is supported as an
argument.

# Developer prerequisites

Deno (https://deno.land/#installation)

## Build and run

```
deno run --allow-all .\main.ts
```

## Test

```
deno test --allow-all
```

## Compile

### Windows

```
deno compile --allow-net --allow-read --allow-write --output .\bin\program.exe .\main.ts
```
