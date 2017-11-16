const pino = require('pino');

const logger = pino({
  name: 'hound',
  safe: true
});

module.exports = logger;
