const pino = require('pino');

const logger = pino({
  name: 'identity',
  safe: true
});

module.exports = logger;
