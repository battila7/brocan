const yaml = require('js-yaml');
const bluebird = require('bluebird');

const readFileAsync = bluebird.promisify(require('fs').readFile);

const parser = {
    deps: {
        yaml, readFileAsync
    },

    parseFile(filename) {
        return this.deps.readFileAsync(filename)
                .then(input => this.deps.yaml.safeLoad(input))
    }
};

Object.setPrototypeOf(parser, null);

module.exports = parser;
