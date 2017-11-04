const Messaging = require('../messaging');

const logger = require('../logger').child({ component: 'publisher' });

const Publisher = {
    deps: {
        Messaging
    },

    setup() {
        return Promise.resolve();
    },
    publish(info) {
        const pattern = Object.assign({}, info, {
            topic: 'build',
            role: 'progress',

            pubsub$: true
        });

        logger.debug('Publishing build status', pattern);

        this.deps.Messaging.act(pattern);
    }
};

module.exports = Publisher;
