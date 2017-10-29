const path = require('path');

const ASQ = require('asynquence');
const env = require('@brocan/env');

const logger = require('../logger').child({ component: 'orchestrator' });

const queue = require('./build-queue');

const acquireBuildStep = require('./steps/acquire-build');
const cloneRepoStep = require('./steps/clone-repo');
const readBaseImageStep = require('./steps/read-base-image');

const cloneDirectory = env.get('clone.directory');

const orchestrator = {
    deps: {
        queue, acquireBuildStep, cloneRepoStep, readBaseImageStep
    },

    setup() {
        return queue.setup();
    },
    async start() {
        logger.info('Starting next build process');

        ASQ()
            .promise(this.getNextBuild.bind(this))
            .promise(this.cloneRepo.bind(this))
            .promise(this.readBaseImage.bind(this))
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
    async cloneRepo(build) {
        await this.deps.cloneRepoStep.clone(build.repoUri, build.branch, cloneDirectory);

        return build;
    },
    readBaseImage(build) {
        const filename = path.join(cloneDirectory, 'brocan.hjson');

        return this.deps.readBaseImageStep.getBaseImage(filename);
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
