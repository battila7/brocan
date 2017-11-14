const BUILD_COLLECTION = 'builds';

const BuildStorage = {
    BuildStorage(db) {
        this.db = db;
    },
    async insertBuild(buildRequest) {
        const builds = await this.db.collection(BUILD_COLLECTION);

        return builds.insert(this.convertId(buildRequest));
    },
    async getBuildWithId(buildId) {
        const builds = await this.db.collection(BUILD_COLLECTION);

        return builds.findOne({ '_id': buildId })
            .then(document => this.convertId(document));
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

module.exports = BuildStorage;
