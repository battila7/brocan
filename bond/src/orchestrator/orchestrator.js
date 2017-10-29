const queue = require('./build-queue');

const orchestrator = {
    deps: {
        queue
    },

    start() {
        return queue.setup();
    },
    getBuildId() {
        return 'abc';
    },
    validateBuildId(buildId) {
        return buildId == 'abc';
    },
    updateBuildStatus() {
        
    }
};

module.exports = orchestrator;
