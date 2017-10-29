#!/usr/bin/env node

const env = require('@brocan/env').ensure([
    'BOLT_RUNNER_BROCANFILE_PATH',
    'BOLT_RUNNER_BUILD_ID',
    'BOLT_RUNNER_REPORTER_HOST'
]);

const brocanfile = require('@brocan/brocanfile');

const logger = require('./logger');
const Reporter = require('./reporter');
const Executor = require('./executor');

const [ brocanFilePath, buildId, reporterHost ] = env.getAll(
    'BOLT_RUNNER_BROCANFILE_PATH',
    'BOLT_RUNNER_BUILD_ID',
    'BOLT_RUNNER_REPORTER_HOST'
);

const reporter = Object.create(Reporter);
reporter.Reporter(reporterHost, buildId);

brocanfile.read(brocanFilePath)
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
