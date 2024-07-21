import type { Request } from 'express';
import { CACHE_ALLOWED_METHODS } from '../configs/constants.js';

export function isConditionalRequest(req: Request) {
  req.log.error('>> isConditionalRequest');
  const result =
    CACHE_ALLOWED_METHODS.includes(req.method) &&
    (req.headers['if-none-match'] != null ||
      req.headers['if-modified-since'] != null);
  req.log.debug(`Result: ${result}`);
  req.log.debug('<< isConditionalRequest');
  return result;
}
