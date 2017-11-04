#!/usr/bin/env node
const config = require('./config');

const Sequ = require('@brocan/sequ');
const brocanfile = require('@brocan/brocanfile');

const logger = require('./logger');
const Reporter = require('./reporter');
const Executor = require('./executor');

const [ brocanFilePath, buildId, reporterHost ] = [
    'brocanFilePath',
    'buildId',
    'reporterHost'
].map(prop => config.get(prop));

const reporter = Object.create(Reporter);
reporter.Reporter(reporterHost, buildId, Sequ());

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
