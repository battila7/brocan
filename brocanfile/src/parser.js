const hjson = require('hjson');

const { readFile } = require('fs');

const parser = {
    deps: {
        hjson, readFile
    },

    parseFile(filename) {
        return new Promise(function callback(resolve, reject) {
            return this.deps.readFile(filename, { encoding: 'utf8' }, function done(err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        }.bind(this))
        .then(function parse(data) {
            return this.deps.hjson.parse(data);
        }.bind(this));
    }
};

module.exports = parser;
