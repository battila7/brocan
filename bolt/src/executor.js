const { execSync } = require('child_process');
const EventEmitter = require('events');

const logger = require('./logger');

const Executor = {
    deps: {
        execSync
    },

    Executor(brocanFile) {
        this.brocanFile = brocanFile;
    },
    execute() {
        this.emit('build.start');

        logger.info('Executing brocanfile...');

        for (const step of this.brocanFile.steps) {
            if (!this.executeStep(step)) {
                this.emit('build.failure');

                logger.error('brocanfile execution failed');

                return;
            }
        }

        this.emit('build.success');

        logger.info('Brocanfile executed successfully.')
    },
    executeStep(step) {
        this.emit('step.start', step.name);

        logger.info('"%s" step commencing', step.name);

        for (const command of step.commands) {
            if (!this.executeCommand(command, step.name)) {
                this.emit('step.failure', step.name);

                logger.error('"%s" step failed', step.name);

                return false;
            }
        }

        this.emit('step.success', step.name);

        logger.info('"%s" step finished', step.name);

        return true;
    },
    executeCommand(command, stepName) {
        this.emit('command.start', command, stepName);

        logger.info('Performing "%s" command', command);

        try {
            this.deps.execSync(command, { stdio: 'inherit' });

            this.emit('command.success', command, stepName);

            logger.info('"%s" finished', command);

            return true;
        } catch (err) {
            this.emit('command.failure', err, command, stepName);

            logger.error('"%s" failed', command);
            logger.error('Failure: %s', err);

            return false;
        }
    }
};

Object.setPrototypeOf(Executor, EventEmitter.prototype);

module.exports = Executor;
