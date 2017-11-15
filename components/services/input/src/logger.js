const pino = require('pino');

const logger = pino({
  name: 'input',
  safe: true
});

module.exports = logger;
