const got = require('got');

const logger = require('./logger');

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

    Reporter(host, id, sequ) {
        this.mappings = this.assembleMappings(host, id);
        this.sequ = sequ;
    },
    assembleMappings(host, id) {
        return {
            buildReport: `${host}/${id}/report/build`,
            stepReport: `${host}/${id}/report/step`,
            commandReport: `${host}/${id}/report/command`,
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
            [ 'command.success', 'reportCommandSuccess' ],
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
    reportCommandStart(command, index, stepName) {
        this.postTo(this.mappings.commandReport, status.in_progess, { command, index, step: stepName });
    },
    reportCommandFailure(err, command, index, stepName) {
        const reason = err ? err.toString() : '';

        this.postTo(this.mappings.commandReport, status.failed, { command, index, reason, step: stepName });
    },
    reportCommandSuccess(command, index, stepName) {
        this.postTo(this.mappings.commandReport, status.successful, { command, index, step: stepName });
    },
    postTo(uri, status, body = {}) {
        logger.debug('Reporting to %s', uri);

        const opts = {
            body: Object.assign({}, body, { status }),
            method: 'POST',
            json: true
        };

        this.sequ.do(() => this.deps.got(uri, opts))
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
