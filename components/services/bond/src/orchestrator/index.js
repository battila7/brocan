const path = require('path');
const logger = require('../logger').child({ component: 'orchestrator' });
const steps = require('./steps/');
const config = require('../config');

const Collector = require('../collector');
const Publisher = require('../publisher');
const Queue = require('./build-queue');

const cloneDirectory = config.get('clone.directory');

const Orchestrator = {
    deps: {
        Collector, Publisher, Queue, steps
    },

    setup() {
        this.deps.Collector.on('progress', this.updateBuildStatus.bind(this));

        return this.deps.Queue.setup();
    },
    async performBuild() {
        logger.info('Starting next build process');

        const buildContext = Object.create(null);

        const buildPipelinePromise = this.buildPipeline(buildContext);

        const timeoutPromise = new Promise((resolve, reject) => {
            const callback = () => {
                buildContext.timeout = true;

                reject('The build has timed out!');
            };

            setTimeout(callback, 120000);
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
            this.publishFailure,
            this.removeFromQueue,
            this.removeDirectory,
            this.stopContainer,
            this.removeContainer,
            this.unsetBuildId
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

        this.buildId = context.build.buildId;

        logger.info('Executing build with id "%s"', context.build.buildId);
        logger.debug(context.build);
    },
    createDirectory() {
        return this.deps.steps.createDirectory.create(cloneDirectory);
    },
    cloneRepository(context) {
        return this.deps.steps.cloneRepository.clone(context.build.repoUri, context.build.commitHash, cloneDirectory);
    },
    async readBaseImage(context) {
        const filename = path.join(cloneDirectory, 'brocan.hjson');

        context.base = await this.deps.steps.readBaseImage.getBaseImage(filename);
    },
    async createContainer(context) {
        context.container = await this.deps.steps.createContainer.create(context.base, context.build.buildId, cloneDirectory);
    },
    async runContainer(context) {
        await this.deps.steps.runContainer.run(context.container);

        context.stopped = true;
    },

    publishFailure(context) {
        if (context.timeout) {
            logger.info('Publishing timeout update');
            
            this.updateBuildStatus(this.buildId, 'build', { status: 'failure', reason: 'timeout' });
        }
    },
    removeFromQueue(context) {
        if (context.build) {
            return this.deps.steps.removeFromQueue.remove(context.build.jobId);
        } else {
            return Promise.resolve();
        }
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
    unsetBuildId() {
        logger.info('Releasing build with id "%s"', this.buildId);

        this.buildId = undefined;
    },

    updateBuildStatus(buildId, stage, payload) {
        if (buildId != this.buildId) {
            logger.warn('Dropping build status update because build id "%s" does not match "%s"', buildId, this.buildId);

            return;
        }

        const message = Object.assign({}, payload, {
            buildId,
            stage
        });

        return this.deps.Publisher.publish(message);
    }
};

module.exports = Orchestrator;
