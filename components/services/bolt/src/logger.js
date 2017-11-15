const config = require('./config');

const pino = require('pino');

const map = Object.create(null);

const logger = pino({
  name: 'bolt',
  safe: true,
  base: {
    buildId: config.get('buildId')
  }
});

module.exports = logger;
