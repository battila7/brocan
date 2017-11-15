const pino = require('pino');

const logger = pino({
  name: 'transformer-github',
  safe: true
});

module.exports = logger;
