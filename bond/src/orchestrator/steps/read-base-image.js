const brocanfile = require('@brocan/brocanfile');

const logger = require('../../logger').child({ component: 'readBaseImage' });

const readBaseImageStep = {
    deps: {
        brocanfile
    },

    async getBaseImage(filename) {
        const contents = await brocanfile.read(filename);

        logger.info('Extracted base image %s', contents.base);

        return contents.base;
    }
};

module.exports = readBaseImageStep;
