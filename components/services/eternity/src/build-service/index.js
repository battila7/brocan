const BuildService = {
    BuildService(storage) {
        this.storage = storage;
    },
    storeNewBuild(buildRequest) {
        return this.storage.insertBuild(buildRequest);
    }
};

module.exports = BuildService;
