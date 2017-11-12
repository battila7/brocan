const Messaging = require('../../messaging');
const Queue = require('../build-queue');

const logger = require('../../logger').child({ component: 'acquireBuild' });

const acquireBuild = {
    deps: {
        Messaging, Queue
    },

    async acquire() {
        const job = await this.deps.Queue.next();

        if (!job) {
            return Promise.resolve(null);
        }

        logger.info('Received new job with id "%s"', job.jid);

        const buildId = job.args[0];

        const metadata = await this.deps.Messaging.actAsync({
            topic: 'build.queryBuildData',
            buildId
        });

        logger.info('Succesfully retrieved build metadata');

        metadata.jobId = job.jid;

        return metadata;
    }
};

module.exports = acquireBuild;
