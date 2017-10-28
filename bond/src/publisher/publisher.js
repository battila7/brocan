/*const Hemera = require('nats-hemera');
const nats = require('nats').connect();

const hemera = new Hemera(nats);*/

const orchestrator = require('../orchestrator/orchestrator');

const logger = require('../logger').child({ component: 'publisher' });

const publisher = {
    deps: {
        hemera: {
            act: () => null
        }
    },

    publish(info) {
        const pattern = Object.assign({}, info, {
            topic: 'build',
            role: 'progress',
            buildId: orchestrator.getBuildId(),

            pubsub$: true
        });

        logger.debug('Publishing build status', pattern);

        this.deps.hemera.act(pattern);
    }
};

module.exports = publisher;
