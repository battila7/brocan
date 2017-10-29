const Git = require('nodegit');

const logger = require('../../logger').child({ component: 'cloneRepo' });

const cloneRepoStep = {
    deps: {
        Git
    },

    clone(repoUri, branch, cloneDir) {
        logger.info('Cloning git repository from %s branch %s to %s', repoUri, branch, cloneDir);

        return Git.Clone(repoUri, cloneDir, {
            checkoutBranch: branch,
        });
    }
};

module.exports = cloneRepoStep;
