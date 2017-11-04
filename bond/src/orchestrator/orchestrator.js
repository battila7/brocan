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
    async performBuild() {
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
    toSeq(array, context) {
        return array
            .map(func => func.bind(this, context))
            .reduce((prev, curr) => prev.then(curr), Promise.resolve());
    },
    buildPipeline(context) {
        return this.toSeq([
            this.getNextBuild,
            this.createDirectory,
            this.cloneRepository,
            this.readBaseImage,
            this.createContainer,
            this.runContainer
        ], context);
    },
    cleanUpPipeline(context) {
        return this.toSeq([
            this.removeDirectory,
            this.stopContainer,
            this.removeContainer,
        ], context);
    },
    reschedule() {
        logger.info('Rescheduling next build execution.');

        setTimeout(() => this.performBuild(), 10000);
    },

    async getNextBuild(context) {
        context.build = await this.deps.steps.acquireBuild.acquire();

        if (!context.build) {
            throw new Error('There is no build to execute.');
        }

        logger.info('Executing build with id "%s"', context.build.buildId);
        logger.debug(context.build);
    },
    createDirectory() {
        return this.deps.steps.createDirectory.create(cloneDirectory);
    },
    cloneRepository(context) {
        return this.deps.steps.cloneRepository.clone(context.build.repoUri, context.build.branch, cloneDirectory);
    },
    async readBaseImage(context) {
        const filename = path.join(cloneDirectory, 'brocan.hjson');

        context.base = await this.deps.steps.readBaseImage.getBaseImage(filename);
    },
    async createContainer(context) {
        context.container = await this.deps.steps.createContainer.create(context.base, context.buildId);
    },
    async runContainer(context) {
        await this.deps.steps.runContainer.run(context.container);

        context.stopped = true;
    },

    removeDirectory() {
        return this.deps.steps.removeDirectory.remove(cloneDirectory);
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

    getBuildId() {
      return buildId;  
    },
    updateBuildStatus() {
        
    }
};

module.exports = orchestrator;
