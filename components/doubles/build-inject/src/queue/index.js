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
    push(id) {
        return client.push({
            jobtype: 'build',
            queue: 'default',
            args: [id]
        });
    }
}

module.exports = Queue;
