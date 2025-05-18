import { Command } from 'commander';
import fetch from 'node-fetch';
import { formatCloudWatch, formatElastic, formatOtel, LogObject } from './formats';

const program = new Command();

program
  .requiredOption('-u, --url <url>', 'HTTP destination URL')
  .option('-f, --format <format>', 'log format: cloudwatch|elastic|otel', 'cloudwatch')
  .option('-i, --interval <ms>', 'interval between logs in ms', '1000')
  .option('-m, --message <msg>', 'log message', 'test log');

program.parse(process.argv);

const opts = program.opts();

function selectFormatter(fmt: string): (msg: string) => LogObject {
  switch (fmt) {
    case 'cloudwatch':
      return formatCloudWatch;
    case 'elastic':
      return formatElastic;
    case 'otel':
      return formatOtel;
    default:
      throw new Error(`unsupported format: ${fmt}`);
  }
}

const formatter = selectFormatter(opts.format);
const interval = parseInt(opts.interval, 10);

async function sendLog() {
  const payload = formatter(opts.message);
  try {
    const res = await fetch(opts.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      console.error(`failed to send log: ${res.status}`);
    } else {
      console.log(`sent log to ${opts.url}`);
    }
  } catch (err) {
    console.error('error sending log', err);
  }
}

setInterval(sendLog, interval);
console.log(`emitting ${opts.format} logs to ${opts.url} every ${interval}ms`);
