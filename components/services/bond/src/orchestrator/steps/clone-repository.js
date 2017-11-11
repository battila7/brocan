const { spawnSync } = require('child_process');

const logger = require('../../logger').child({ component: 'cloneRepository' });

const cloneRepository = {
    deps: {
        spawnSync
    },

    async clone(repoUri, commitHash, cloneDir) {
        logger.info('Cloning git repository from "%s" to "%s"', repoUri, cloneDir);

        await this.deps.spawnSync('git', ['clone', repoUri, cloneDir], {
            stdio: 'ignore'
        });

        logger.info('Checking out commit "%s"', commitHash);

        await this.deps.spawnSync('git', ['checkout', commitHash], {
            cwd: cloneDir,
            stdio: 'ignore'
        });
    }
};

module.exports = cloneRepository;
