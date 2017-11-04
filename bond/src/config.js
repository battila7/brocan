const path = require('path');
const convict = require('convict');
const logger = require('./logger').child({ component: 'config' });


const config = convict({
    env: {
        doc: 'The application environment.',
        format: ['production', 'development', 'test'],
        default: 'development',
        env: 'NODE_ENV'
    },
    collector: {
        port: {
            doc: 'The port, the build report collector will listen on.',
            format: 'port',
            default: '3000'
        }
    },
    clone: {
        directory: {
            doc: 'The directory where the repositories will be cloned into.',
            format: String,
            default: null
        }
    }
});


logger.debug('Loading configuration with schema');
logger.debug(config.getSchema());

const env = config.get('env');

config.loadFile(path.join('.', 'config', `${env}.json5`));

logger.info('Loaded configuration');
logger.debug(config.toString());

config.validate({ allowed: 'strict' });

module.exports = config;