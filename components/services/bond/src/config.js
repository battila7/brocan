const path = require('path');
const convict = require('convict');
const logger = require('./logger').child({ component: 'config' });


const config = convict({
    env: {
        doc: 'The application environment.',
        format: ['production', 'development', 'test'],
        default: 'production',
        env: 'NODE_ENV'
    },
    network: {
        doc: 'The name of the network the containers run in.',
        format: String,
        default: 'network',
        env: 'BUILD_CONTAINER_NETWORK'
    },
    collector: {
        host: {
            doc: 'The host of the build report collector which will be passed to the build runner.',
            format: String,
            default: 'http://bond',
            env: 'COLLECTOR_HOST'
        },
        port: {
            doc: 'The port, the build report collector will listen on.',
            format: 'port',
            default: '4000',
            env: 'COLLECTOR_PORT'
        }
    },
    clone: {
        directory: {
            doc: 'The directory where the repositories will be cloned into.',
            format: String,
            default: '/tmp/brocan/clone',
            env: 'CLONE_DIRECTORY'
        }
    },
    faktory: {
        host: {
            doc: 'The host of the Faktory instance which serves as a build queue.',
            format: String,
            default: 'faktory',
            env: 'FAKTORY_HOST'
        },
        port: {
            doc: 'The port of the Faktory instance which serves as a build queue.',
            format: 'port',
            default: '7419',
            env: 'FAKTORY_PORT'
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

const env = config.get('env');

config.loadFile(path.join('.', 'config', `${env}.json5`));

logger.info('Loaded configuration');
logger.debug(config.toString());

config.validate({ allowed: 'strict' });

module.exports = config;
