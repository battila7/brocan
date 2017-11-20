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
    elasticsearch: {
        uri: {
            doc: 'The URI of the Elasticsearch instance which stores the build logs.',
            format: String,
            default: 'elasticsearch:9200',
            env: 'ELASTICSEARCH_URI'
        },
        index: {
            doc: 'The index that stores the build logs.',
            format: String,
            default: 'pino',
            env: 'ELASTICSEARCH_INDEX'
        }
    }
});


logger.debug('Loading configuration with schema');
logger.debug(config.getSchema());

config.validate({ allowed: 'strict' });

module.exports = config;
