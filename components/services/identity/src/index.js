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
        topic: 'build.generateIdentifier'
    }, async function identifierRequest(request) {
        logger.info('Generating new build identifier.');

        logger.debug(request.buildRequest);

        const buildId = Generator.generateFrom(request.buildRequest);

        logger.info('Generated new build identifier "%s".', buildId);

        return Promise.resolve({
            id
        });
    });
});
