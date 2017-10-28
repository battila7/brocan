#!/usr/bin/env node

const env = require('@brocan/env').ensure([
    'BOLT_RUNNER_BROCANFILE_PATH',
    'BOLT_RUNNER_BUILD_ID',
    'BOLT_RUNNER_REPORTER_HOST'
]);

const Sequ = require('@brocan/sequ');

const logger = require('./logger');
const parser = require('./parser');
const validator = require('./validator');
const Reporter = require('./reporter');
const Executor = require('./executor');

const brocanFilePath = env.get('BOLT_RUNNER_BROCANFILE_PATH');
const buildId = env.get('BOLT_RUNNER_BUILD_ID');
const reporterHost = env.get('BOLT_RUNNER_REPORTER_HOST')

const reporter = Object.create(Reporter);
reporter.Reporter(reporterHost, buildId, Sequ());

parser.parseFile(brocanFilePath)
    .then(function validateBrocanFile(brocanFile) {
        const errors = validator.validate(brocanFile);

        if (errors.length != 0) {
            logger.error('Malformed brocanfile, exiting.');

            throw errors;
        } else {
            return brocanFile;
        }
    })
    .then(function executeBrocanFile(brocanFile) {
        const executor = Object.create(Executor);
        executor.Executor(brocanFile);

        reporter.initWithBuildEmitter(executor, brocanFile);

        return executor.execute();
    })
    .catch(err => {
        logger.error('Failure: %s', err);

        reporter.reportBuildFailure(err);
    });

