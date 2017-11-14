const { spawn } = require('child_process');
const EventEmitter = require('events');

const logger = require('./logger');

const Executor = {
    deps: {
        spawn
    },

    Executor(brocanFile) {
        this.brocanFile = brocanFile;
    },
    async execute() {
        this.emit('build.start');

        logger.info('Executing brocanfile...');

        for (const step of this.brocanFile.steps) {
            const success = await this.executeStep(step);

            if (!success) {
                this.emit('build.failure');

                logger.error('brocanfile execution failed');

                return;
            }
        }

        this.emit('build.success');

        logger.info('Brocanfile executed successfully.')
    },
    async executeStep(step) {
        this.emit('step.start', step.name);

        logger.info('"%s" step commencing', step.name);

        let commandIndex = 0;

        for (const command of step.commands) {
            const success = await this.executeCommand(command, commandIndex, step.name);

            this.emit('command.success', command, commandIndex, step.name);

            if (!success) {
                this.emit('step.failure', step.name);

                logger.error('"%s" step failed', step.name);

                return false;
            }

            commandIndex += 1;
        }

        this.emit('step.success', step.name);

        logger.info('"%s" step finished', step.name);

        return true;
    },
    executeCommand(command, commandIndex, stepName) {
        return new Promise(function commandPromise(resolve, reject) {
            this.emit('command.start', command, commandIndex, stepName);
            
            logger.info('Performing %d. command "%s"', commandIndex, command);

            const split = this.splitCommand(command);

            const process = this.deps.spawn(split.cmd, split.args, { stdio: 'inherit' });

            process.on('close', function closed() {
                logger.info('"%s" finished', command);

                resolve(true);
            });

            process.on('error', function error(err) {
                this.emit('command.failure', err, command, commandIndex, stepName);
    
                logger.error('"%s" failed', command);
                logger.error(err);

                resolve(false);
            });
        }.bind(this));
    },
    splitCommand(command) {
        const parts = command.split(' ', 2);

        const cmd = parts.shift();

        return {
            cmd,
            args: parts
        };
    }
};

Object.setPrototypeOf(Executor, EventEmitter.prototype);

module.exports = Executor;
