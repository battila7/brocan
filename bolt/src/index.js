#!/usr/bin/env node
const argv = require('yargs').argv;

const parser = require('./parser');
const validator = require('./validator');
const executor = require('./executor');

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
        executor.execute(brocanFile);
    })
    .catch(e => console.log(e));

