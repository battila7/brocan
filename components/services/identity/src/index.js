const config = require('./config');

const logger = require('./logger').child({ component: 'main' });

const Hemera = require('nats-hemera');
const nats = require('nats').connect({
    url: config.get('nats.uri')
});

const Generator = require('./generator');

const hemera = new Hemera(nats);

hemera.ready(function hemeraReady() {
    hemera.add({
        topic: 'build',
        role: 'identifier'
    }, async function identifierRequest(request) {
        logger.info('Generating new build identifier.');

        logger.debug(request.buildRequest);

        const identifier = Generator.generateFrom(request.buildRequest);

        logger.info('Generated new build identifier "%s".', identifier);

        return Promise.resolve(identifier);
    });
});
