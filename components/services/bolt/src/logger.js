const { createLogger, format, transports } = require('winston');
const { combine, timestamp, prettyPrint, printf, splat } = format;

const customFormat = printf(info => {
  return `${info.timestamp} ${info.level}: ${info.message}`;
});

const logger = createLogger({
  format: combine(
    timestamp(),
    splat(),
    customFormat
  ),
  level: 'debug',
  transports: [new transports.Console()]
});

module.exports = logger;
