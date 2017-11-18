const config = require('./config');

const Hapi = require('hapi');

const server = new Hapi.Server();

server.connection({
    port: config.get('port')
});

server.register([{
    register: require('hapi-pino')
}, {
    register: require('./messaging'),
    options: {
        nats: config.get('nats.uri')
    }
}], function registerCallback(err) {
    if (err) {
        throw err;
    }

    server.start(function startCallback(err) {
        if (err) {
            throw err;
        }
    });
});
