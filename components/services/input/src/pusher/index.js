const config = require('../config');

const logger = require('../logger').child({ component: 'Pusher' });

const FaktoryClient = require('faktory-client');

const client = new FaktoryClient({
    host: config.get('faktory.host'),
    port: config.get('faktory.port')
});

const Pusher = {
    deps: {
        client
    },

    async push(buildRequest) {
        await this.deps.client.connect();

        return this.deps.client.push({
            jobtype: 'build',
            queue: 'default',
            args: [ buildRequest.id ]
        });
    }
};

module.exports = Pusher;
