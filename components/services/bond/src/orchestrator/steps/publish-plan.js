const Messaging = require('../../messaging');
const Queue = require('../build-queue');

const logger = require('../../logger').child({ component: 'publishPlan' });

const publishPlan = {
    deps: {
        Messaging, Queue
    },

    async publish(id, steps) {
        logger.info('Publishing build plan', id, steps);

        await this.deps.Messaging.actAsync({
            topic: 'build.info',
            role: 'plan',
            id,
            steps,

            pubsub$: true
        });

        logger.info('Succesfully published build plan');
    }
};

module.exports = publishPlan;
