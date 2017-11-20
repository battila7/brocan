const brocanfile = require('@brocan/brocanfile');

const logger = require('../../logger').child({ component: 'readBrocanfile' });

const readBrocanfile = {
    deps: {
        brocanfile
    },

    async read(filename) {
        const contents = await brocanfile.read(filename);

        logger.info('Read brocanfile', contents);

        return contents;
    }
};

module.exports = readBrocanfile;
