const pino = require('pino');

const logger = pino({
  name: 'build',
  safe: true
});

module.exports = logger;
