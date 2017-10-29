const orchestrator = require('../orchestrator/orchestrator');
const messaging = require('../messaging');

const logger = require('../logger').child({ component: 'publisher' });

const publisher = {
    deps: {
        messaging
    },

    setup() {
        return Promise.resolve();
    },
    publish(info) {
        const pattern = Object.assign({}, info, {
            topic: 'build',
            role: 'progress',
            buildId: orchestrator.getBuildId(),

            pubsub$: true
        });

        logger.debug('Publishing build status', pattern);

        this.deps.messaging.act(pattern);
    }
};

module.exports = publisher;
