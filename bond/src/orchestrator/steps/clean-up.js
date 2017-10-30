const rimraf = require('rimraf');

const logger = require('../../logger').child({ component: 'cleanUp' });

const cleanUpStep = {
    deps: {
        rimraf,
    },

    cleanUp(directory) {
        return new Promise((resolve, reject) => {
            logger.info('Cleaning up directory %s', directory);

            return this.deps.rimraf(directory, function callback(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
};

module.exports = cleanUpStep;
