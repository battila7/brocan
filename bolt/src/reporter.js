const got = require('got');

const logger = require('./logger');

const parentHost = 'localhost:8080';

const mappings = {
    buildReport: `${parentHost}/report/build`,
    stepReport: `${parentHost}/report/step`,
    commandReport: `${parentHost}/report/command`,
};

Object.freeze(mappings);

const status = {
    pending: 'pending',
    in_progess: 'in_progress',
    successful: 'successful',
    failed: 'failed'
};

Object.freeze(status);

const Reporter = {
    deps: {
        got
    },

    Reporter(executor, brocanFile) {
        this.executor = executor;

        this.setupListeners();

        this.steps = brocanFile.steps.map(function mapStep(step) {
            return {
                status: status.pending,
                commands: step.commands.map(function mapCommand(command) {
                    return {
                        status: status.pending,
                        cmd: command
                    };
                })
            }
        });
    },
    setupListeners() {
        const listenerMapping = [
            [ 'build.start', 'onBuildStart' ],
            [ 'build.failure', 'onBuildFailure' ],
            [ 'build.success', 'onBuildSuccess' ],
            [ 'step.start', 'onStepStart' ],
            [ 'step.failure', 'onStepFailure' ],
            [ 'step.success', 'onStepSuccess' ],
            [ 'command.start', 'onCommandStart' ],
            [ 'command.failure', 'onCommandFailure' ],
            [ 'command.success', 'onCommandSuccess' ]
        ];

        listenerMapping.forEach(mapping => {
            this.executor.on(mapping[0], this[mapping[1]].bind(this));
        });
    },
    onBuildStart() {
        this.postTo(mappings.buildReport, status.in_progess, { steps: this.steps });
    },
    onBuildFailure() {
        this.postTo(mappings.buildReport, status.failed );
    },
    onBuildSuccess() {
        this.postTo(mappings.buildReport, status.successful );
    },
    onStepStart(stepName) {
        this.postTo(mappings.stepReport, status.in_progess, { name: stepName });
    },
    onStepFailure(stepName) {
        this.postTo(mappings.stepReport, status.failed, { name: stepName });
    },
    onStepSuccess(stepName) {
        this.postTo(mappings.stepReport, status.successful, { name: stepName });
    },
    onCommandStart(command, stepName) {
        this.postTo(mappings.commandReport, status.in_progess, { command, step: stepName });
    },
    onCommandFailure(err, command, stepName) {
        this.postTo(mappings.commandReport, status.failed, { command, reason: err.toString(), step: stepName });
    },
    onCommandSuccess(command, stepName) {
        this.postTo(mappings.commandReport, status.successful, { command, step: stepName });
    },
    postTo(uri, status, body = {}) {
        logger.debug('Reporting to %s', uri);

        const opts = {
            body: Object.assign({ status }, body),
            method: 'POST',
            json: true
        };

        this.deps.got(uri, opts)
            .then(function success() {
                logger.debug('Successful report to %s', uri);
            })
            .catch(function failure(err) {
                logger.warn('Could not send report to %s', uri);
                logger.warn('Failure: %s', err);
            })
    }
};

module.exports = Reporter;
