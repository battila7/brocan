const path = require('path');
const env = require('@brocan/env');
const queue = require('./build-queue');
const logger = require('../logger').child({ component: 'orchestrator' });
const steps = require('./steps/steps');

const cloneDirectory = env.get('clone.directory');

const orchestrator = {
    deps: {
        queue, steps
    },

    setup() {
        return queue.setup();
    },
    async start() {
        logger.info('Starting next build process');

        const buildContext = {};

        const buildPipelinePromise = this.buildPipeline(buildContext);

        const timeoutPromise = new Promise((resolve, reject) => {
            setTimeout(() => reject('The build has timed out!'), 120000);
        });

        try {
            await Promise.race([buildPipelinePromise, timeoutPromise]);
        } catch (e) {
            logger.warn('Failed to execute build');
            logger.warn(e);
        } finally {
            await this.cleanUpPipeline(buildContext);

            this.reschedule();
        }
    },
    buildPipeline(context) {
        return [
            this.getNextBuild,
            this.createDirectory,
            this.cloneRepository,
            this.readBaseImage,
            this.createContainer,
            this.runContainer
        ].map(func => func.bind(this, context))
        .reduce((prev, curr) => prev.then(curr), Promise.resolve());
    },
    removeDirectory() {
        return this.deps.steps.removeDirectory.remove(cloneDirectory);
    },
    cleanUpPipeline(context) {
        return [
            this.removeDirectory,
            this.stopContainer,
            this.removeContainer,
        ].map(func => func.bind(this, context))
        .reduce((prev, curr) => prev.then(curr), Promise.resolve());
    },
    stopContainer(context) {
        if (context.container && !context.stopped) {
            return this.deps.steps.stopContainer.stop(context.container);
        } else {
            return Promise.resolve();
        }
    },
    removeContainer(context) {
        if (context.container) {
            return this.deps.steps.removeContainer.remove(context.container);
        } else {
            return Promise.resolve();
        }
    },
    async runContainer(context) {
        await this.deps.steps.runContainer.run(context.container);

        context.stopped = true;
    },
    async createContainer(context) {
        context.container = await this.deps.steps.createContainer.create(context.base, context.buildId);
    },
    createDirectory() {
        return this.deps.steps.createDirectory.create(cloneDirectory);
    },
    reschedule() {
        logger.info('Rescheduling next build execution.');

        setTimeout(() => this.start(), 10000);
    },
    async getNextBuild(context) {
        context.build = await this.deps.steps.acquireBuild.acquire();

        if (!context.build) {
            throw new Error('There is no build to execute.');
        }

        logger.info('Executing build with id "%s"', context.build.buildId);
        logger.debug(context.build);
    },
    cloneRepository(context) {
        return this.deps.steps.cloneRepository.clone(context.build.repoUri, context.build.branch, cloneDirectory);
    },
    runBuild(context) {
        return this.deps.steps.runBuild.run(context.base);
    },
    async readBaseImage(context) {
        const filename = path.join(cloneDirectory, 'brocan.hjson');

        context.base = await this.deps.steps.readBaseImage.getBaseImage(filename);
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
