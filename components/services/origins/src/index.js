const config = require('./config');

const logger = require('./logger').child({ component: 'main' });

const Hemera = require('nats-hemera');
const nats = require('nats').connect({
    url: config.get('nats.uri')
});

const Storage = require('./storage');

const storage = Object.create(Storage);
storage.Storage(config.get('redis.uri'));

const hemera = new Hemera(nats);

hemera.ready(function hemeraReady() {
    hemera.add({
        topic: 'build.info',
        role: 'new',

        pubsub$: true
    }, async function store(request) {
        logger.info('Storing request for buildId "%s"', request.buildReqest.buildId);

        logger.debug(request.buildReqest);

        storage.store(request.buildReqest.buildId, request.webhookRequest)
            .catch(err => {
                logger.warn('Could not add buildId "%s" to origin storage', request.buildReqest.buildId);
                logger.warn(err);
            });

        return;
    });

    hemera.add({
        topic: 'build.retrieveOrigin',
    }, async function retrieve(request) {
        logger.info('Retrieving request for buildId "%s"', request.buildId);

        return await storage.retrieve(request.buildId);
    });
});
