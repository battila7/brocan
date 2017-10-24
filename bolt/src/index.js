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
        const results = validator.validate(brocanFile);

        if (results.length == 0) {
            throw results;
        } else {
            return brocanFile;
        }
    })
    .then(function executeBrocanFile(brocanFile) {
        executor.execute(brocanFile);
    })
    .catch(e => console.log(e));

