import { Level } from 'pino';
import { version } from '../../package.json';

export function parseEnvVar<T>(name: string, defaultValue: T): T {
  const value = process.env[name]?.trim();

  if (value === undefined) {
    return defaultValue;
  }

  try {
    if (typeof defaultValue === 'number') {
      const parsedValue = parseFloat(value);

      if (isNaN(parsedValue)) {
        return defaultValue;
      }

      if (Number.isInteger(value)) {
        return parseInt(value) as unknown as T;
      }

      return parsedValue as unknown as T;
    }

    if (typeof defaultValue === 'boolean') {
      return (value.toLowerCase() === 'true' || value === '1') as unknown as T;
    }

    if (typeof defaultValue === 'object' && defaultValue !== null) {
      return JSON.parse(value) as T;
    }

    if (/^\/.*\/$/.test(value)) {
      return new RegExp(value.slice(1, -1)) as unknown as T;
    }

    return value as unknown as T;
  } catch {
    return defaultValue;
  }
}

// logging & telemetry
export const LOG_LEVEL: Level = parseEnvVar('LOG_LEVEL', 'info');
export const LOG_PRETTY = parseEnvVar('LOG_PRETTY', false);
export const DISABLE_TELEMETRY = parseEnvVar('DISABLE_TELEMETRY', false);
export const SAMPLER_PERCENTAGE = parseEnvVar('SAMPLER_PERCENTAGE', 0.1);

// fetching
export const RETRY = parseEnvVar('RETRY', true);
export const MAX_SOCKETS = parseEnvVar('MAX_SOCKETS', 32);
export const MAX_RETRIES = parseEnvVar('MAX_RETRIES', 3);
export const STATUSES_TO_RETRY = parseEnvVar(
  'STATUSES_TO_RETRY',
  [408, 500, 502, 503, 504]
);
export const RETRY_DELAY = parseEnvVar('RETRY_DELAY', 1000);
export const RETRY_BACKOFF = parseEnvVar('RETRY_BACKOFF', 1);

// server
export const PORT = parseEnvVar('PORT', 8080);
export const PUBLIC_DIRS = parseEnvVar('PUBLIC_DIRS', []);

// compression
export const USE_COMPRESSION = parseEnvVar('USE_COMPRESSION', true);

// routes
export const API_BASE_PATH = parseEnvVar(
  'API_BASE_PATH',
  `/api/v${version.split('.')[0]}`
);
export const HEALTH_ENDPOINT = parseEnvVar('HEALTH_ENDPOINT', '/healthcheck');
export const OPENAPI_SPEC_ENDPOINT = parseEnvVar(
  'OPENAPI_SPEC_ENDPOINT',
  '/api-docs'
);
export const LOGIN_ENDPOINT = parseEnvVar('LOGIN_ENDPOINT', '/login');
export const LOGIN_REDIRECT_ENDPOINT = parseEnvVar(
  'LOGIN_REDIRECT_ENDPOINT',
  '/login/redirect'
);
export const LOGOUT_ENDPOINT = parseEnvVar('LOGOUT_ENDPOINT', '/logout');
export const FILES_ENDPOINT = '/files';
export const USERS_ENDPOINT = '/users';

// security
export const CSP_POLICY = parseEnvVar('CSP_POLICY', {
  defaultSrc: ["'self'"],
  scriptSrc: ["'unsafe-inline'"]
});
export const RATE_LIMIT_WINDOW = parseEnvVar('RATE_LIMIT_WINDOW', 60000);
export const RATE_LIMIT_MAX = parseEnvVar('RATE_LIMIT_MAX', 100);

// cors
export const CORS_ORIGIN = parseEnvVar('CORS_ORIGIN', '*');
export const CORS_METHODS = parseEnvVar('CORS_METHODS', [
  'GET',
  'POST',
  'PUT',
  'PATCH',
  'DELETE'
]);
export const CORS_ALLOWED_HEADERS = parseEnvVar('CORS_ALLOWED_HEADERS', [
  'Content-Type',
  'Authorization'
]);
export const CORS_CREDENTIALS = parseEnvVar('CORS_CREDENTIALS', true);

// caching
export const CACHE_ENABLED = parseEnvVar('CACHE_ENABLED', true);
export const CACHE_MAX_AGE = parseEnvVar('CACHE_MAX_AGE', 60 * 60 * 24 * 365);
export const CACHE_ALLOWED_METHODS = parseEnvVar('CACHE_ALLOWED_METHODS', [
  'GET',
  'HEAD'
]);
export const CACHE_ALLOWED_STATUSES = parseEnvVar(
  'CACHE_ALLOWED_STATUSES',
  [200, 203, 300, 301, 302, 304, 307, 308]
);
export const CACHE_PATHS = parseEnvVar('CACHE_PATHS', []);
export const LRU_MAX_ITEMS = parseEnvVar('LRU_MAX', 1000);
export const LRU_MAX_SIZE = parseEnvVar('LRU_MAX_SIZE', 10000);
