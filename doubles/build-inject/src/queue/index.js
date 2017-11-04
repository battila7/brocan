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
    push(buildId) {
        return client.push({
            jobtype: 'build',
            queue: 'default',
            args: [buildId]
        });
    }
}

module.exports = Queue;
