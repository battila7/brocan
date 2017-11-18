const RepositoryService = {
    RepositoryService(storage) {
        this.storage = storage;
    },

    getAllRepositories() {
        return this.storage.getAllRepositories();
    }    
};

module.exports = RepositoryService;
