import { LRUCache } from 'lru-cache';
import { LRU_MAX_ITEMS, LRU_MAX_SIZE } from './constants.js';

const options = {
  max: LRU_MAX_ITEMS, // store up to 500 entries (may be less if maxSize is exceeded)
  maxSize: LRU_MAX_SIZE // store entries until a "size" of 5000 is reached (may be less if max is exceeded)
};

export const cache = new LRUCache(options);
