const Orchestrator = require('./orchestrator');

Orchestrator.deps.Queue.next = function() {
    return Promise.resolve({
        args: ['id']
    });
};

Orchestrator.deps.steps.acquireBuild.deps.Messaging.actAsync = function() {
    return Promise.resolve({
        buildId: 'id',
        branch: 'master',
        repoUri: 'https://github.com/battila7/brocan-example'
    });
};

orc.performBuild();
