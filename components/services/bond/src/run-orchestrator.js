const Orchestrator = require('./orchestrator');

Orchestrator.deps.Queue.next = function() {
    return Promise.resolve({
        jid: 'lol',
        args: ['id']
    });
};

Orchestrator.deps.steps.acquireBuild.deps.Messaging.actAsync = function() {
    return Promise.resolve({
        id: 'id',
        commit: {
            hash: 'f85e81e5742ca3a4159eff597d2fa6ed103453a8'
        },
        repository: {
            uri: 'https://github.com/battila7/brocan-example'
        }
    });
};

Orchestrator.performBuild();
