const config = require('../config');

const FaktoryClient = require('faktory-client');

const client = new FaktoryClient({
    host: config.get('faktory.host'),
    port: config.get('faktory.port')
});

const Queue = {
    deps: {
        client
    },

    async setup() {
        await this.deps.client.connect();
    },
    async next() {
        await this.deps.client.connect();

        return this.deps.client.fetch('default');
    },
    async done(jobId) {
        await this.deps.client.connect();

        return this.deps.client.ack(jobId)
    }
}

module.exports = Queue;
