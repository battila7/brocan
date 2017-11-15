const pino = require('pino');

const map = Object.create(null);

const logger = pino({
  name: 'bond',
  safe: true,
  base: map
});

logger.map = map;

module.exports = logger;
