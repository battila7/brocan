#!/usr/bin/env node
const argv = require('yargs').argv;

const parser = require('./parser');
const validator = require('./validator');
const Executor = require('./executor');

const brocanFilePath = (function acquireBrocanFilePath() {
    const defaultPath = 'brocan.yml';

    return argv._[0] || defaultPath;
})();

parser.parseFile(brocanFilePath)
    .then(function validateBrocanFile(brocanFile) {
        const errors = validator.validate(brocanFile);

        if (errors.length != 0) {
            throw errors;
        } else {
            return brocanFile;
        }
    })
    .then(function executeBrocanFile(brocanFile) {
        const executor = Object.create(Executor);
        executor.Executor(brocanFile);

        return executor.execute();
    })
    .catch(e => console.log(e));

