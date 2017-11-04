const Queue = require('../build-queue');

const logger = require('../../logger').child({ component: 'removeFromQueue' });

const removeFromQueue = {
    deps: {
        Queue
    },

    remove(jobId) {
        logger.info('Removing job from queue with id "%s"', jobId);

        return this.deps.Queue.done(jobId);
    }
};

module.exports = removeFromQueue;
