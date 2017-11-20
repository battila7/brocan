const Messaging = require('../../messaging');

const logger = require('../../logger').child({ component: 'translateBaseImage' });

const translateBaseImage = {
    deps: {
        Messaging
    },

    async translate(brocanfileBase) {
        logger.info('Translating brocanfile base "%s"', brocanfileBase)

        const response = await this.deps.Messaging.actAsync({
            topic: 'build.getBaseImageTranslation',
            base: brocanfileBase
        });

        logger.info('Succesfully retrieved build base image "%s"', response.image);

        return response.image;
    }
};

module.exports = translateBaseImage;
