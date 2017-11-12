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
            topic: 'build.info',
            role: 'progress',
            pubsub$: true
        });

        logger.debug('Publishing build progress', pattern);

        this.deps.Messaging.act(pattern);
    }
};

module.exports = Publisher;
