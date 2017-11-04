const mkdirp = require('mkdirp');

const logger = require('../../logger').child({ component: 'createDirectory' });

const createDirectory = {
    deps: {
        mkdirp
    },

    create(directory) {
        return new Promise((resolve, reject) => {
            logger.info('Creating directory "%s"', directory);

            return this.deps.mkdirp(directory, function callback(err) {
                if (err) {
                    logger.warn('Could not create directory "%s"', directory, err);

                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
};

module.exports = createDirectory;
