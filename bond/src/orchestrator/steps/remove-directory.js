const rimraf = require('rimraf');

const logger = require('../../logger').child({ component: 'removeDirectory' });

const removeDirectory = {
    deps: {
        rimraf,
    },

    remove(directory) {
        return new Promise((resolve, reject) => {
            logger.info('Removing directory "%s"', directory);

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

module.exports = removeDirectory;
