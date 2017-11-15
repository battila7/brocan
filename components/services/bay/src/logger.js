const pino = require('pino');

const logger = pino({
  name: 'bay',
  safe: true
});

module.exports = logger;
