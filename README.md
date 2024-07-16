# Node Starter

Starter repo for Node.JS apps

- wireit - script manager
- typescript - static typing
- vite-node - running typescript files directly
- eslint & typescript-eslint - linting
- prettier & editorconfig - formatting
- vitest - unit testing using vite config
- husky & lint-staged - commit control
- pino & debug - logging
- opentelemetry - telemetry

NOTE: pm2 and the auto-instrumentation feature of OTel do not support ES modules. Also the require hooks for OTel don't work with modules. As such, this project is designed to import syntax from TypeScript, but to export as CommonJS so that everything work. If you really want to work with ES modules, you can safely change the type to `module` in `package.json`, but will need to manually instrument your dependencies, and not use pm2.