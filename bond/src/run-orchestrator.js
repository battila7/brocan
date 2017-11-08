const Orchestrator = require('./orchestrator');

Orchestrator.deps.Queue.next = function() {
    return Promise.resolve({
        args: ['id']
    });
};

Orchestrator.deps.steps.acquireBuild.deps.Messaging.actAsync = function() {
    return Promise.resolve({
        buildId: 'id',
        commitHash: 'f85e81e5742ca3a4159eff597d2fa6ed103453a8',
        repoUri: 'https://github.com/battila7/brocan-example'
    });
};

Orchestrator.performBuild();
