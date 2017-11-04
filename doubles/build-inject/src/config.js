const path = require('path');
const convict = require('convict');


const config = convict({
    env: {
        doc: 'The application environment.',
        format: ['production', 'development', 'test'],
        default: 'production',
        env: 'NODE_ENV'
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


config.validate({ allowed: 'strict' });

module.exports = config;
