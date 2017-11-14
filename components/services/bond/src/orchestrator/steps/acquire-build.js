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

        const id = job.args[0];

        const build = await this.deps.Messaging.actAsync({
            topic: 'build.queryBuildData',
            id
        });

        logger.info('Succesfully retrieved build data');

        build.jobId = job.jid;

        return build;
    }
};

module.exports = acquireBuild;
