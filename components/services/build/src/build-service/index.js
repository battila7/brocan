const BuildService = {
    BuildService(storage) {
        this.storage = storage;
    },

    getAllBuilds() {
        return this.storage.getAllBuilds();
    },
    getBuild(id) {
        return this.storage.getBuildById(id);
    }
};

module.exports = BuildService;
