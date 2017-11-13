const config = require('./config');

const logger = require('./logger').child({ component: 'main' });

const Hemera = require('nats-hemera');
const nats = require('nats').connect({
    url: config.get('nats.uri')
});

const Pusher = require('./pusher');

const hemera = new Hemera(nats);

hemera.ready(function hemeraReady() {
    hemera.add({
        topic: 'build.info',
        role: 'new',

        pubsub$: true
    }, async function newBuild(request) {
        logger.info('Pushing build with id "%s" to the build queue', request.buildRequest.buildId);

        logger.debug(request.buildRequest);

        Pusher.push(request.buildRequest)
            .then(() => logger.info('Build pushed to the queue: "%s".', request.buildRequest.buildId))
            .catch(err => logger.warn(err));
    });
});
