import type { Logger } from 'pino';

// confusingly, this is where the type is actually declared
// so we need to extend it here
declare module 'express-serve-static-core' {
  interface Request {
    isAuthenticated: boolean;
    log: Logger;
  }
}
