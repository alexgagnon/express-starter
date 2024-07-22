import { describe, expect, it, vi } from 'vitest';
import type { Request } from 'express';
import { isConditionalRequest } from './caching.js';
import { logger } from '../configs/logger.js';

vi.mock('../configs/logger.js');

const defaults = {
  log: logger
};

describe('isConditionalRequest', () => {
  it('should return true if request is conditional', () => {
    const req = {
      method: 'GET',
      headers: {
        'if-none-match': '123'
      },
      ...defaults
    } as unknown as Request;
    expect(isConditionalRequest(req)).toBe(true);
  });

  it('should return false if request is not conditional', () => {
    const req = {
      method: 'GET',
      headers: {},
      ...defaults
    } as unknown as Request;
    expect(isConditionalRequest(req)).toBe(false);
  });
});
