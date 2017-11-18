const Boom = require('boom');

const register = function register(server, options, next) {
    server.route({
        method: 'GET',
        path: '/',
        handler: function(request, reply) {
            reply();
        }
    });

    server.route({
        method: 'GET',
        path: '/{id}',
        handler: function(request, reply) {
            reply();
        }
    })

    server.route({
        method: 'GET',
        path: '/{id}/logs',
        handler: function(request, reply) {
            reply();
        }
    })

    next();
};

register.attributes = {
    name: 'build-routes',
    version: '1.0.0'
};

module.exports = register;
