const config = require('./config');

const Hapi = require('hapi');

const server = new Hapi.Server();

server.connection({
    port: config.get('port')
});

server.start(function startCallback(err) {
    if (err) {
        throw err;
    }

    console.log('Server started!');
});
