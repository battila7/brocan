const mkdirp = require('mkdirp');

const logger = require('../../logger').child({ component: 'createDir' });

const createDirStep = {
    deps: {
        mkdirp
    },

    createDir(directory) {
        return new Promise((resolve, reject) => {
            logger.info('Creating directory %s', directory);

            return this.deps.mkdirp(directory, function callback(err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
};

module.exports = createDirStep;
