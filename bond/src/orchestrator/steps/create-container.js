const Docker = require('dockerode');

const logger = require('../../logger').child({ component: 'createContainer' });

const createContainer = {
    deps: {
        Docker
    },

    create(base, buildId, repoDir) {
        const docker = new Docker();

        logger.info('Creating container with base "%s"', base);

        return docker.createContainer({
            Image: base,
            Cmd: ['sh', '-c', `node -v && npm i @brocan/bolt -g && cd ${repoDir} && ls -la && bolt`],
            Env: ['BOLT_RUNNER_BROCANFILE_PATH=brocan.hjson', `BOLT_RUNNER_BUILD_ID=${buildId}`, 'BOLT_RUNNER_REPORTER_HOST=localhost:3000'],
            Volumes: {
                '/tmp/brocan': {}
            },
            HostConfig: {
                Binds: ['/tmp/brocan:/tmp/brocan']
            }
        });
    }
};

module.exports = createContainer;
