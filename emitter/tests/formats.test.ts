import { formatCloudWatch, formatElastic, formatOtel } from '../src/formats';

describe('log formatters', () => {
  it('cloudwatch format includes timestamp and message', () => {
    const result = formatCloudWatch('hello');
    expect(result).toHaveProperty('timestamp');
    expect(result).toHaveProperty('message', 'hello');
  });

  it('elastic format includes @timestamp and message', () => {
    const result = formatElastic('hello');
    expect(result).toHaveProperty('@timestamp');
    expect(result).toHaveProperty('message', 'hello');
  });

  it('otel format includes timeUnixNano and body', () => {
    const result = formatOtel('hello');
    expect(result).toHaveProperty('timeUnixNano');
    expect(result).toHaveProperty('body', 'hello');
  });
});
