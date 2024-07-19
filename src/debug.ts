import { isAbsolute, basename } from 'node:path';
import pkg from '../package.json' with { type: 'json' };
import Debug from 'debug';

export function getDebug(namespace: string) {
  return Debug(
    `${pkg.name}:${isAbsolute(namespace) ? basename(namespace) : namespace}`
  );
}
