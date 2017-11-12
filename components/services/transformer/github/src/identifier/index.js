const Messaging = require('../messaging');

const logger = require('../logger').child({ component: 'Identifier' });

const Identifier = {
    deps: {
        Messaging
    },

    request(buildRequest) {
        logger.info('Requesting new buildId');

        return new Promise((resolve, reject) => {
            this.deps.Messaging.act({
                topic: 'build',
                role: 'identifier',
                buildRequest
            }, (err, response) => {
                if (err) {
                    reject(err);
                } else {
                    logger.info('Received new buildId "%s"', response);

                    resolve(response);
                }
            });
        });
    }
};
