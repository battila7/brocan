const BUILD_COLLECTION = 'builds';

const RepositoryStorage = {
    RepositoryStorage(db) {
        this.db = db;
    },
    async getAllRepositories() {
        const builds = await this.db.collection(BUILD_COLLECTION);

        return builds.distinct('repository');
    },
    convertId(document) {
        const result = Object.assign({}, document);

        if (document['_id']) {
            result.id = document['_id'];
            delete result['_id'];
        } else {
            result['_id'] = document.id;
            delete result.id;
        }

        return result;
    }
}

module.exports = RepositoryStorage;
