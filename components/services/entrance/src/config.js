const convict = require('convict');


const config = convict({
    env: {
        doc: 'The application environment.',
        format: ['production', 'development', 'test'],
        default: 'production',
        env: 'NODE_ENV'
    },
    port: {
        doc: 'The port Bouncer will listen on.',
        format: 'port',
        default: '8090',
        env: 'PORT'
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
