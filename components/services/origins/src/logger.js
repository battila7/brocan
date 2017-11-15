const pino = require('pino');

const logger = pino({
  name: 'origins',
  safe: true
});

module.exports = logger;
