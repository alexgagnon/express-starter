import { pino } from 'pino';
import { LOG_LEVEL, LOG_PRETTY } from './constants.js';

export const logger = pino({
  level: LOG_LEVEL,
  ...(LOG_PRETTY ? { transport: { target: 'pino-pretty' } } : {})
});
