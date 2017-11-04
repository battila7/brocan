const config = require('../config');

const client = require('faktory-client').create({
    host: config.get('faktory.host'),
    port: config.get('faktory.port')
});

const RECONNECT_ATTEMPTS = 5;

const attempt = async function(action, recover) {
    let attempts = 0;

    while (true) {
        try {
            return await Promise.resolve(action());
        } catch (err) {
            ++attempts;

            if (attempts >= RECONNECT_ATTEMPTS) {
                throw err;
            } else {
                await Promise.resolve(recover());
            }
        }
    }
};

const Queue = {
    deps: {
        client
    },

    setup() {
        return client.connect();
    },
    next() {
        return attempt(
            () => this.deps.client.fetch('default'),
            () => this.deps.client.connect()
        );
    },
    done(jobId) {
        return attempt(
            () => this.deps.client.ack(jobId),
            () => this.deps.client.connect()
        );
    }
}

module.exports = Queue;
