const convict = require('convict');


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
            default: 'nats://localhost:4222',
            env: 'NATS_URI'
        }
    }
});


config.validate({ allowed: 'strict' });

module.exports = config;
