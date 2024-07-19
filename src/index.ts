import { run } from './app.js';
import { getDebug } from './debug.js';
const debug = getDebug(import.meta.filename);

debug('Running...');

run({
  numbers: [1, 2, 3],
  entries: [],
  output: 'output.txt'
});
