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
        logger.info('Storing request for id "%s"', request.buildRequest.id);

        logger.debug(request.buildRequest);

        storage.store(request.buildRequest.id, request.webhookRequest)
            .catch(err => {
                logger.warn('Could not add id "%s" to origin storage', request.buildRequest.id);
                logger.warn(err);
            });

        return;
    });

    hemera.add({
        topic: 'build.retrieveOrigin',
    }, async function retrieve(request) {
        logger.info('Retrieving request for id "%s"', request.id);

        return await storage.retrieve(request.id);
    });
});
