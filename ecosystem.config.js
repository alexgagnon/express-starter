const pkg = require('./package.json');

module.exports = {
  apps: [{
    name: pkg.name,
    script: pkg.main,
    instances: process.env.INSTANCES ?? '1',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
    },
    interpreter_args: '-r pino-debug -r ./dist/instrumentation.js'
  }]
};