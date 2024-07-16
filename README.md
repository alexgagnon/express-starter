# Node Starter

Starter repo for Node.JS apps.

- wireit - script manager
- typescript - static typing
- vite-node - running typescript files directly
- eslint & typescript-eslint - linting
- prettier & editorconfig - formatting
- vitest - unit testing using vite config
- husky & lint-staged - commit control
- pino & debug - logging
- opentelemetry - telemetry

NOTE: pm2 and the auto-instrumentation feature of OTel do not support ES modules. Also the require hooks for OTel don't work with modules. As such, this project is designed to use import syntax from TypeScript, but to export as CommonJS so that everything works. If you really want to work with ES modules, you can safely change the type to `module` in `package.json`, but will need to manually instrument your dependencies, and not use pm2.

## Usage

Scripts are controlled using Wireit, which includes features like script dependencies, automatic cleaning of output folders, caching, and a watch mode. If you make substantial changes to the project structure, you may need to update the `files` and/or `outputs` properties of the wireit tasks, otherwise the caching won't work as expected. See [the wireit docs](https://github.com/google/wireit/blob/main/README.md) for more details.

ESLint has been augmented with typescript-eslint with Type Information mode activated for extra linting powers.

When you commit, Husky runs Lint-Staged, which will run both ESLint and Prettier in "check" mode. If it fails, you need to correct the errors in the staged files either manually or with `npm run format -- --write` and/or `npm run lint -- --fix`.

When deploying, the only files that are needed are those in `dist`, `package.json`, and potentially `ecosystem.config.js` if using `pm2` for process management.
