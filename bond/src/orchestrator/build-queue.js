const config = require('../config');

const client = require('faktory-client').create({
    host: config.get('faktory.host'),
    port: config.get('faktory.port')
});

const Queue = {
    deps: {
        client
    },

    setup() {
        return client.connect();
    },
    next() {
        return client.fetch('default');
    },
    done(jobId) {
        return client.ack(jobId);
    }
}

module.exports = Queue;
