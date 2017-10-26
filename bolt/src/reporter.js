const got = require('got');

const logger = require('./logger');

const parentHost = 'localhost:8080';

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

    Reporter(buildId) {
        this.mappings = this.assembleMappings(buildId);
    },
    assembleMappings(buildId) {
        return {
            buildReport: `${parentHost}/${buildId}/report/build`,
            stepReport: `${parentHost}/${buildId}/report/step`,
            commandReport: `${parentHost}/${buildId}/report/command`,
        }
    },
    initWithBuildEmitter(emitter, brocanFile) {
        this.emitter = emitter;

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
            [ 'build.start', 'reportBuildStart' ],
            [ 'build.failure', 'reportBuildFailure' ],
            [ 'build.success', 'reportBuildSuccess' ],
            [ 'step.start', 'reportStepStart' ],
            [ 'step.failure', 'reportStepFailure' ],
            [ 'step.success', 'reportStepSuccess' ],
            [ 'command.start', 'reportCommandStart' ],
            [ 'command.failure', 'reportCommandFailure' ],
            [ 'command.success', 'reportCommandSuccess' ]
        ];

        listenerMapping.forEach(mapping => {
            this.emitter.on(mapping[0], this[mapping[1]].bind(this));
        });
    },
    reportBuildStart() {
        this.postTo(this.mappings.buildReport, status.in_progess, { steps: this.steps });
    },
    reportBuildFailure(err) {
        this.postTo(this.mappings.buildReport, status.failed, { reason: err } );
    },
    reportBuildSuccess() {
        this.postTo(this.mappings.buildReport, status.successful );
    },
    reportStepStart(stepName) {
        this.postTo(this.mappings.stepReport, status.in_progess, { name: stepName });
    },
    reportStepFailure(stepName) {
        this.postTo(this.mappings.stepReport, status.failed, { name: stepName });
    },
    reportStepSuccess(stepName) {
        this.postTo(this.mappings.stepReport, status.successful, { name: stepName });
    },
    reportCommandStart(command, stepName) {
        this.postTo(this.mappings.commandReport, status.in_progess, { command, step: stepName });
    },
    reportCommandFailure(err, command, stepName) {
        this.postTo(this.mappings.commandReport, status.failed, { command, reason: err.toString(), step: stepName });
    },
    reportCommandSuccess(command, stepName) {
        this.postTo(this.mappings.commandReport, status.successful, { command, step: stepName });
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
