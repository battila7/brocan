const messaging = require('../../messaging');
const queue = require('../build-queue');

const acquireBuild = {
    deps: {
        messaging, queue
    },

    async acquire() {
        const job = await queue.next();

        if (!job) {
            return Promise.resolve(null);
        }

        const buildId = job.args[0];

        return this.deps.messaging.actAsync({
            topic: 'build',
            role: 'query',
            buildId
        });
    }
};

module.exports = acquireBuild;
