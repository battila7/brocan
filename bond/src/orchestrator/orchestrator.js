const ASQ = require('asynquence');

const logger = require('../logger').child({ componenet: 'orchestrator' });

const queue = require('./build-queue');

const acquireBuildStep = require('./steps/acquire-build');
const cloneRepoStep = require('./steps/clone-repo');

const orchestrator = {
    deps: {
        queue, acquireBuildStep, cloneRepoStep
    },

    setup() {
        return queue.setup();
    },
    async start() {
        logger.info('Starting next build process');

        ASQ()
            .promise(this.getNextBuild.bind(this))
            .promise(this.cloneRepo.bind(this))
            .or(err => {
                logger.warn('Build execution failed', err);

                this.reschedule();
            });
    },
    reschedule() {
        logger.info('Rescduling next build execution.');

        setTimeout(() => this.start(), 10000);
    },
    async getNextBuild() {
        build = await this.deps.acquireBuildStep.acquire();

        if (!build) {
            throw new Error('There is no build to execute.');
        }

        logger.info('Executing build with id "%s"', build.buildId);

        return build;
    },
    cloneRepo(build) {
        return cloneRepoStep.clone(build.repoUri, build.branch, './tmp');
    },
    getBuildId() {
        return 'abc';
    },
    validateBuildId(buildId) {
        return buildId == 'abc';
    },
    updateBuildStatus() {
        
    }
};

module.exports = orchestrator;
