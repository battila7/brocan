const config = require('./config');

const MongoClient = require('mongodb').MongoClient;

const BuildStorage = require('./build-storage');
const BuildService = require('./build-service');

const Compose = {
    async bootstrap() {
        this.components = {};

        // const db = await MongoClient.connect(config.get('mongo.uri'));
        const db = null;
    
        this.components.buildStorage = Object.create(BuildStorage);
        this.components.buildStorage.BuildStorage(db);
    
        this.components.buildService = Object.create(BuildService);
        this.components.buildService.BuildService(this.components.buildStorage);
    
        return this.components;
    },
    get(name) {
        return this.components[name];
    }
};

module.exports = Compose;
