export interface LogObject {
  [key: string]: any;
}

export function formatCloudWatch(message: string): LogObject {
  return {
    timestamp: Date.now(),
    message,
  };
}

export function formatElastic(message: string): LogObject {
  return {
    '@timestamp': new Date().toISOString(),
    message,
  };
}

export function formatOtel(message: string): LogObject {
  return {
    timeUnixNano: (Date.now() * 1_000_000).toString(),
    body: message,
  };
}
