const logger = require('../../logger').child({ component: 'stopContainer' });

const stopContainer = {
    stop(container) {
        logger.info('Stopping container');

        return container.stop();
    }
};

module.exports = stopContainer;
