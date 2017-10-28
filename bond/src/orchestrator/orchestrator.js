const orchestrator = {
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
