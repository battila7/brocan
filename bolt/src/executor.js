const { spawn } = require('child_process');

const reporter = require('./reporter');

function serially(promiseFuncs, initialValue) {
    return promiseFuncs.reduce((prev, curr) => prev.then(curr), Promise.resolve(initialValue))
}

const CommandExecutor = {
    deps: {
        reporter, spawn
    },

    CommandExecutor(command) {
        this.command = command;
    },
    execute() {
        const { cmd, args } = this.splitCommand(this.command);

        const handle = this.deps.spawn(cmd, args, { stdio: 'inherit' });

        return new Promise(function callback(resolve, reject) {
            handle.on('close', function closeListener(code) {
                if (code == 0) {
                    resolve(code)
                } else {
                    reject(code);
                }
            });
            handle.on('error', function errorListener(err) {
                reject(err);
            });
        }.bind(this));
    },
    splitCommand(command) {
        const split = command.split(' ');

        const cmd = split.shift();

        return {
            cmd,
            args: split
        };
    }
};

const StepExecutor = {
    deps: {
        reporter
    },

    StepExecutor(step) {
        this.step = step;
    },
    execute() {
        return serially(this.step.commands.map(function commandToExecutor(command) {
            const exec = Object.create(CommandExecutor);
            exec.CommandExecutor(command);

            return exec.execute.bind(exec);
        }));
    }
};

const Executor = {
    deps: {
        reporter
    },

    Executor(brocanFile) {
        this.brocanFile = brocanFile;
    },
    execute() {
        return serially(this.brocanFile.steps.map(function createStepExecutor(step) {
            const exec = Object.create(StepExecutor);
            exec.StepExecutor(step);

            return exec.execute.bind(exec);
        }));
    }
};

module.exports = Executor;
