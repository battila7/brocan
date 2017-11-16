const redis = require('redis');
const bluebird = require('bluebird');

const logger = require('../logger').child({ component: 'Storage' });

bluebird.promisifyAll(redis.RedisClient.prototype);

const Storage = {
    deps: {
        redis
    },

    Storage(uri) {
        logger.info('Creating new Redis client with URI "%s"', uri);

        this.client = this.deps.redis.createClient(uri);

        this.client.on('ready', () => logger.info('Redis client is ready'));
    },
    store(from, to) {
        return this.client.setAsync(from, to);
    },
    retrieve(base) {
        return this.client.getAsync(base);
    }
};

module.exports = Storage;
