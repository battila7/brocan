const Docker = require('dockerode');

const logger = require('../../logger').child({ component: 'pullBaseImage' });

const pullBaseImage = {
    deps: {
        Docker
    },

    async pull(image) {
        const docker = new Docker();

        logger.info('Pulling image "%s"', image);

        return new Promise((resolve, reject) => {
            docker.pull(image, (err, stream) => {
                if (err) {
                    reject(err);
                }

                docker.modem.followProgress(stream, err => {
                    if (err) {
                        reject(err);
                    } else {
                        logger.info('Pulled base image');

                        resolve();
                    }
                })
            });
        });
    }
};

module.exports = pullBaseImage;
