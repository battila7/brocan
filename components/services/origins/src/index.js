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
        topic: 'build',
        role: 'new'
    }, async function store(request) {
        logger.info('Storing request for buildId "%s"', request.build.buildId);

        logger.debug(request.build);

        storage.store(request.build.buildId, request.request)
            .catch(err => {
                logger.warn('Could not add buildId "%s" to origin storage', request.build.buildId);
                logger.warn(err);
            });

        return;
    });

    hemera.add({
        topic: 'build',
        role: 'retrieve-origin'
    }, async function retrieve(request) {
        logger.info('Retrieving request for buildId "%s"', request.buildId);

        return await storage.retrieve(request.buildId);
    });
});
