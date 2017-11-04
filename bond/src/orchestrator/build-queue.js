const client = require('faktory-client').create();

const Queue = {
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

module.exports = Queue;
