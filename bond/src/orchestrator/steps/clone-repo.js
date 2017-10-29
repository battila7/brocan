const Git = require('nodegit');

const cloneRepoStep = {
    deps: {
        Git
    },

    clone(repoUri, branch, cloneDir) {
        return Git.clone(repoUri, cloneDir, {
            checkoutBranch: branch,
        });
    }
};

module.exports = cloneRepoStep;
