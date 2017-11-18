const RepositoryService = {
    RepositoryService(storage) {
        this.storage = storage;
    },

    getAllRepositories() {
        return this.storage.getAllRepositories();
    },
    getRepository(uri) {
        return Promise.all(this.storage.getRepositoryByUri(uri), this.storage.getBuildsForRepository(uri))
            .then(results => this.mapGetRepositoryResults(results));
    },
    mapGetRepositoryResults([ repository, builds ]) {
        return {
            uri: repository.uri,
            name: repository.name,
            builds: builds.map(build => build.id)
        };
    }
};

module.exports = RepositoryService;
