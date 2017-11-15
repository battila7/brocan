const convict = require('convict');


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
    reporterUri: {
        doc: 'The URI Bolt will report to.',
        format: String,
        default: 'bond:3000',
        env: 'BOLT_RUNNER_REPORTER_HOST'
    }
});


config.validate({ allowed: 'strict' });

module.exports = config;
