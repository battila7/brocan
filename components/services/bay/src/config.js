const convict = require('convict');
const logger = require('./logger').child({ component: 'config' });


const config = convict({
    env: {
        doc: 'The application environment.',
        format: ['production', 'development', 'test'],
        default: 'production',
        env: 'NODE_ENV'
    },
    nats: {
        uri: {
            doc: 'The URI of the NATS network.',
            format: String,
            default: 'nats://nats:4222',
            env: 'NATS_URI'
        }
    },
    redis: {
        uri: {
            doc: 'The URI of the image name translator Redis instace.',
            format: String,
            default: 'redis://redis:6379',
            env: 'REDIS_URI'
        }
    }
});


logger.debug('Loading configuration with schema');
logger.debug(config.getSchema());

config.validate({ allowed: 'strict' });

module.exports = config;
