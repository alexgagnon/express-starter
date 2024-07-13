import { getDebug } from "./debug.js";
const debug = getDebug(__filename);

if (process.env.NODE_ENV !== 'production') {
  throw new Error('Only run in production for consistency');
}

export type Options = {
  numbers: number[];
  entries: string[];
  output: string;
};

export function run(options: Options) {
  console.log('Running with options:', options);
  console.log(add(1, 2));
}

export function add(a: number, b: number) {
  return a + b
}

process.once('SIGINT', () => {
  debug('SIGINT received');
  process.exit(0);
});

process.once('SIGTERM', () => {
  debug('SIGTERM received');
  process.exit(0);
});