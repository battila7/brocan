const Messaging = require('../../messaging');
const Queue = require('../build-queue');

const acquireBuild = {
    deps: {
        Messaging, Queue
    },

    async acquire() {
        const job = await this.deps.Queue.next();

        if (!job) {
            return Promise.resolve(null);
        }

        const buildId = job.args[0];

        return this.deps.Messaging.actAsync({
            topic: 'build',
            role: 'query',
            buildId
        });
    }
};

module.exports = acquireBuild;
