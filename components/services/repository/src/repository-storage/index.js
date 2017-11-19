const BUILD_COLLECTION = 'builds';

const RepositoryStorage = {
    RepositoryStorage(db) {
        this.db = db;
    },
    async getAllRepositories() {
        const builds = await this.db.collection(BUILD_COLLECTION);

        return builds.distinct('repository');
    },
    async getRepositoryByUri(uri) {
        const builds = await this.db.collection(BUILD_COLLECTION);

        return builds.findOne({ 'repository.uri': uri }, { '_id': 0, 'repository' : 1})
            .then(result => {
                if (result) {
                    return {
                        ...result.repository
                    };
                } else {
                    return result;
                }
            });
    },
    async getBuildsForRepository(uri) {
        const builds = await this.db.collection(BUILD_COLLECTION);

        return builds.aggregate([
            {
                $match: {
                    'repository.uri': uri
                }
            },
            {
                $project: {
                    '_id': 0,
                    'id': '$_id'
                }
            }
        ]).toArray();
    }
}

module.exports = RepositoryStorage;
