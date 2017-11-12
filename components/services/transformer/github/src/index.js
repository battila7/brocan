const config = require('./config');

const logger = require('./logger').child({ component: 'main' });

const Messaging = require('./messaging');

const Transformer = require('./transformer');

Messaging.ready(function messagingReady() {
    Messaging.add({
        topic: 'build',
        role: 'transform',
        origin: 'github',
    }, async function transform(request) {
        logger.info('Received a GitHub transformation request',);

        logger.debug(request.payload);

        Transformer.transform(request.payload)
            .then(buildRequest => publishNewBuild(request.payload, buildRequest))
            .catch(transformationFailure);

        return;
    });

    function publishNewBuild(originalRequest, buildRequest) {
        return new Promise((resolve, reject) => {
            Messaging.act({
                topic: 'build',
                role: 'new',
                request: originalRequest,
                buildRequest,

                pubsub$: true
            }, err => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    function transformationFailure(err) {
        logger.warn('Could not transform build.');
        logger.warn(err);
    }
});
