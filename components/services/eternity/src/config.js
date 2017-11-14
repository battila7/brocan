const convict = require('convict');
const logger = require('./logger').child({ component: 'config' });


const config = convict({
    env: {
        doc: 'The application environment.',
        format: ['production', 'development', 'test'],
        default: 'production',
        env: 'NODE_ENV'
    },
    mongo: {
        uri: {
            doc: 'The URI via MongoDB can be accessed.',
            format: String,
            default: 'mongodb://mongo:27017',
            env: 'MONGO_URI'
        }
    },
    nats: {
        uri: {
            doc: 'The URI of the NATS network.',
            format: String,
            default: 'nats://nats:4222',
            env: 'NATS_URI'
        }
    }
});


logger.debug('Loading configuration with schema');
logger.debug(config.getSchema());

config.validate({ allowed: 'strict' });

module.exports = config;
