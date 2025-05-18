# Log Emitter

This tool emits log events to a specified HTTP destination. It is intended for testing logging platforms.

## Usage

```
npm install
npm run build
node dist/index.js --url http://localhost:3000 --format cloudwatch --interval 1000
```

### Options

- `--url` (required): HTTP endpoint to post logs to.
- `--format`: `cloudwatch`, `elastic`, or `otel`. Default is `cloudwatch`.
- `--interval`: Interval between log events in milliseconds. Default is `1000`.
- `--message`: Message to include in each log. Default is `"test log"`.

The emitter currently supports one stream at a time but is structured to allow multiple streams in the future.
