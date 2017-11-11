const Docker = require('dockerode');

const logger = require('../../logger').child({ component: 'createContainer' });

const config = require('../../config');

const collector = config.get('collector');

const createContainer = {
    deps: {
        Docker
    },

    async create(base, buildId, repoDir) {
        const docker = new Docker();

        logger.info('Creating container with base "%s"', base);

        const Env = [
            ['BOLT_RUNNER_BROCANFILE_PATH', 'brocan.hjson'],
            ['BOLT_RUNNER_BUILD_ID', buildId],
            ['BOLT_RUNNER_REPORTER_HOST', `${collector.host}:${collector.port}`]
        ].map(([key, value]) => `${key}=${value}`);

        const container = await docker.createContainer({
            Image: base,
            Cmd: ['sh', '-c', `git --version && node -v && npm i @brocan/bolt -g && cd ${repoDir} && ls -la && cat brocan.hjson && bolt`],
            Env,
            Volumes: {
                '/tmp/brocan': {}
            },
            HostConfig: {
                Binds: ['/tmp/brocan:/tmp/brocan']
            }
        });

        logger.info('Created container with id "%s"', container.id);

        const brocanNetwork = await docker.getNetwork(config.get('network'));

        logger.info('Connecting container to network "%s"', config.get('network'));

        await brocanNetwork.connect({ Container: container.id });

        logger.info('Successfully connected to network');

        return container;
    }
};

module.exports = createContainer;
