const client = require('faktory-client').create();

const queue = {
    deps: {
        client
    },

    setup() {
        return client.connect();
    },
    next() {
        return client.fetch([ 'default', 'critical' ]);
    },
    done(jobId) {
        return client.ack(jobId);
    }
}

module.exports = queue;
