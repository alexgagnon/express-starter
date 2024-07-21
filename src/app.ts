import express from 'express';
import type { Express, Request, Response } from 'express';
import { isHttpError } from 'http-errors';
import type { HttpError } from 'http-errors';
import { pinoHttp } from 'pino-http';
import { logger } from './configs/logger.js';
import helmet from 'helmet';
import compression from 'compression';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
// import swaggerUi from 'swagger-ui-express';
// import { openapiSpecification } from './openapi.js';
import {
  API_BASE_PATH,
  CSP_POLICY,
  FILES_ENDPOINT,
  HEALTH_ENDPOINT,
  RATE_LIMIT_MAX,
  RATE_LIMIT_WINDOW,
  USE_COMPRESSION,
  USERS_ENDPOINT
} from './configs/constants.js';
import { handleNotFound } from './middleware/error.js';
import filesRouter from './features/files/FileRouter.js';
import usersRouter from './features/users/UserRouter.js';

if (process.env.NODE_ENV !== 'production') {
  throw new Error('NODE_ENV must be set to production');
}

export function run() {
  const app: Express = express();

  // setup middleware
  app.set('trust proxy', 1);
  app.use(
    rateLimit({
      windowMs: RATE_LIMIT_WINDOW,
      max: RATE_LIMIT_MAX
    })
  );
  app.use(
    pinoHttp({
      logger,
      autoLogging: {
        ignore: (req: Request) => req.url === HEALTH_ENDPOINT
      }
    })
  );
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: CSP_POLICY
      },
      crossOriginResourcePolicy: false,
      crossOriginEmbedderPolicy: { policy: 'credentialless' }
    })
  );
  app.use(HEALTH_ENDPOINT, (_: Request, res: Response) =>
    res.json({ status: 'ok' })
  );

  app.use(cors());

  if (USE_COMPRESSION) {
    app.use(compression());
  }

  app.use(express.static('public'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  // routes
  // app.use(OPENAPI_SPEC_ENDPOINT, swaggerUi.serve, swaggerUi.setup(openapiSpecification));
  app.use(`${API_BASE_PATH}${FILES_ENDPOINT}`, filesRouter);
  app.use(`${API_BASE_PATH}${USERS_ENDPOINT}`, usersRouter);

  // 404 handler
  app.all('*', handleNotFound);

  // error handler
  app.use((error: HttpError, req: Request, res: Response) => {
    req.log.error(error);
    if (error.status === 404) {
      handleNotFound(req, res);
    }
    const body = isHttpError(error) ? error.message : 'Internal Server Error';
    res.status(error.status ?? 500);
    if (req.headers.accept?.includes('application/json')) {
      res.json({ error: body });
    } else {
      res.type('text').send(body);
    }
  });
}
