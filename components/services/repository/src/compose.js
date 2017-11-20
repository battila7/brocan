const config = require('./config');

const MongoClient = require('mongodb').MongoClient;

const RepositoryStorage = require('./repository-storage');
const RepositoryService = require('./repository-service');

const Compose = {
    async bootstrap() {
        this.components = {};

        const db = await MongoClient.connect(config.get('mongo.uri'));
    
        this.components.repositoryStorage = Object.create(RepositoryStorage);
        this.components.repositoryStorage.RepositoryStorage(db);
    
        this.components.repositoryService = Object.create(RepositoryService);
        this.components.repositoryService.RepositoryService(this.components.repositoryStorage);
    
        return this.components;
    },
    get(name) {
        return this.components[name];
    }
};

module.exports = Compose;
