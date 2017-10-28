const { readFile } = require('fs');
const yaml = require('js-yaml');

const parser = {
    deps: {
        yaml, readFile
    },

    parseFile(filename) {
        return new Promise(function readPromise(resolve, reject) {
            this.deps.readFile(filename, {}, function callback(err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            })
        }.bind(this))
        .then(input => this.deps.yaml.safeLoad(input))
    }
};

Object.setPrototypeOf(parser, null);

module.exports = parser;
