const Boom = require('boom');

const JSON_TYPE = 'application/json';

const register = function register(server, options, next) {
    server.route({
        method: 'GET',
        path: '/',
        handler: function(request, reply) {
            reply.messaging.act({
                topic: 'build.query',
                entity: 'repository',
                target: '*'
            }, (err, response) => {
                if (err) {
                    reply(Boom.badImplementation('Could not process request', err));
                } else {
                    reply(response).type(JSON_TYPE);
                }
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/{repositoryUri}',
        handler: function(request, reply) {
            reply.messaging.act({
                topic: 'build.query',
                entity: 'repository',
                target: request.params.repositoryUri
            }, (err, response) => {
                if (err) {
                    reply(Boom.badImplementation('Could not process request', err));
                } else {
                    reply(response).type(JSON_TYPE);
                }
            });
        }
    });

    next();
};

register.attributes = {
    name: 'repository-routes',
    version: '1.0.0'
};

module.exports = register;
