const pino = require('pino');

const logger = pino({
  name: 'repository',
  safe: true
});

module.exports = logger;
