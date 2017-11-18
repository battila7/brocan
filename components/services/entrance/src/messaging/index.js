const Hemera = require('nats-hemera');
const NATS = require('nats');

const Messaging = {
    register(server, options, next) {
        const nats = NATS.connect({
            url: options.nats
        });

        const hemera = new Hemera(nats);

        server.decorate('reply', 'messaging', hemera);

        next();
    }
};

Messaging.register.attributes = {
    name: 'entrance-messaging',
    version: '1.0.0'
};

module.exports = Messaging;
