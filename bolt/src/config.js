const path = require('path');
const convict = require('convict');
const logger = require('./logger');


const config = convict({
    env: {
        doc: 'The application environment.',
        format: ['production', 'development', 'test'],
        default: 'production',
        env: 'NODE_ENV'
    },
    brocanFilePath: {
        doc: 'Relative path to the brocanfile to be executed.',
        format: String,
        default: 'brocan.hjson',
        env: 'BOLT_RUNNER_BROCANFILE_PATH'
    },
    buildId: {
        doc: 'An arbitrary identifier of the current build.',
        format: String,
        default: null,
        env: 'BOLT_RUNNER_BUILD_ID'
    },
    reporterHost: {
        doc: 'The host Bolt will report to.',
        format: String,
        default: 'localhost:3000',
        env: 'BOLT_RUNNER_REPORTER_HOST'
    }
});


logger.debug('Loading configuration with schema');
logger.debug(config.getSchema());

logger.info('Loaded configuration');
logger.debug(config.toString());

config.validate({ allowed: 'strict' });

module.exports = config;
