const logger = require('../../logger').child({ component: 'runContainer' });

const runContainer = {
    run(container) {
        return new Promise(async (resolve, reject) => {
            const stream = await container.attach({
                stream: true,
                stdout: true,
                stderr: true,
                tty: true
            });

            container.modem.demuxStream(stream, process.stdout, process.stderr);

            logger.info('Attached to container output');

            logger.info('Running build container');

            await container.start();

            container.wait(err => {
                if (err) {
                    reject(err);
                } else {
                    logger.info('The container has exited.');

                    resolve();
                }
            })
        });
    }
};

module.exports = runContainer;
