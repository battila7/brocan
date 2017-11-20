const pino = require('pino');

const logger = pino({
  name: 'bond',
  safe: true,
});

module.exports = logger;
