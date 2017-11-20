const config = require('./config');

const logger = require('./logger').child({ component: 'main' });

const Messaging = require('./messaging');

const Transformer = require('./transformer');

Messaging.ready(function messagingReady() {
    Messaging.add({
        topic: 'build.transform',
        webhookRequest: {
            headers: {
                'x-github-delivery': /.*/,
                'x-github-event': /.*/
            }
        }
    }, async function transform(request) {
        logger.info('Received a GitHub transformation request',);

        logger.debug(request.webhookRequest);

        const buildRequest = Transformer.transform(request.webhookRequest.payload);

        logger.debug(buildRequest);

        return buildRequest;
    });
});
