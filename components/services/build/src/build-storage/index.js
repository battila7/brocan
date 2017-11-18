const BUILD_COLLECTION = 'builds';

const BuildStorage = {
    BuildStorage(db) {
        this.db = db;
    },
    async insertBuild(buildRequest) {
        const builds = await this.db.collection(BUILD_COLLECTION);

        return builds.insert(this.convertId(buildRequest));
    },
    async getBuildById(id) {
        const builds = await this.db.collection(BUILD_COLLECTION);

        return builds.findOne({ '_id': id })
            .then(document => this.convertId(document));
    },
    async getExecutionById(id) {
        const builds = await this.db.collection(BUILD_COLLECTION);

        return builds.findOne({ '_id': id }, { execution: 1 })
            .then(document => this.convertId(document));
    },
    async updateExecution(id, execution) {
        const builds = await this.db.collection(BUILD_COLLECTION);

        return builds.updateOne({ '_id': id }, { '$set': { execution } });
    },
    async updateBuild(build) {
        const builds = await this.db.collection(BUILD_COLLECTION);

        const document = Object.assign({}, build);

        delete document.id;
        
        return builds.updateOne({ '_id': build.id }, { '$set': { ...document } });
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
