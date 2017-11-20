const pino = require('pino');

const logger = pino({
  name: 'eternity',
  safe: true
});

module.exports = logger;
