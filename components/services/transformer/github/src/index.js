const config = require('./config');

const logger = require('./logger').child({ component: 'main' });

const Messaging = require('./messaging');

const Transformer = require('./transformer');

Messaging.ready(function messagingReady() {
    Messaging.add({
        topic: 'build.transform',
        origin: 'github',
    }, async function transform(request) {
        logger.info('Received a GitHub transformation request',);

        logger.debug(request.webhookRequest);

        Transformer.transform(request.webhookRequest)
            .then(buildRequest => publishNewBuild(request.webhookRequest, buildRequest))
            .catch(transformationFailure);

        return;
    });

    function publishNewBuild(webhookRequest, buildRequest) {
        return new Promise((resolve, reject) => {
            Messaging.act({
                topic: 'build.info',
                role: 'new',
                webhookRequest,
                buildRequest,

                pubsub$: true
            });
        });
    }

    function transformationFailure(err) {
        logger.warn('Could not transform build.');
        logger.warn(err);
    }
});
