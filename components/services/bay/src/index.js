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
        topic: 'build.addBaseImageTranslation',
    }, async function add(request) {
        logger.info('Adding new base image, translating "%s" to "%s"', request.from, request.to);

        logger.debug(request);

        storage.store(request.from, request.to)
            .catch(err => {
                logger.warn('Could not add new base image translation');
                logger.warn(err);
            });

        return;
    });

    hemera.add({
        topic: 'build.getBaseImageTranslation',
    }, async function get(request) {
        logger.info('Retrieving translation for base image "%s"', request.base);

        const image = await storage.retrieve(request.base);

        return {
            image
        }
    });
});
