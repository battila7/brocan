const logger = require('../../logger').child({ component: 'removeContainer' });

const removeContainer = {
    remove(container) {
        logger.info('Removing container');

        return container.remove();
    }
};

module.exports = removeContainer;
