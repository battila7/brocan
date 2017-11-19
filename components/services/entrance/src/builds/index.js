const Boom = require('boom');

const register = function register(server, options, next) {
    server.route({
        method: 'GET',
        path: '/',
        handler: function(request, reply) {
            reply.messaging.act({
                topic: 'build.query',
                entity: 'build',
                target: '*'
            }, (err, response) => {
                request.logger.info(response);

                if (err) {
                    reply(Boom.badImplementation('Could not process request', err));
                } else {
                    reply(response);
                }
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/{id}',
        handler: function(request, reply) {
            reply.messaging.act({
                topic: 'build.query',
                entity: 'build',
                target: request.params.id
            }, (err, response) => {
                request.logger.info(response);

                if (err) {
                    reply(Boom.badImplementation('Could not process request', err));
                } else {
                    reply(response);
                }
            });
        }
    })

    server.route({
        method: 'GET',
        path: '/{id}/logs',
        handler: function(request, reply) {
            reply.messaging.act({
                topic: 'build.query',
                entity: 'log',
                target: request.params.id,
                from: request.query.from,
                to: request.query.to
            }, (err, response) => {
                request.logger.info(response);
                
                if (err) {
                    reply(Boom.badImplementation('Could not process request', err));
                } else {
                    reply(response);
                }
            });
        }
    })

    next();
};

register.attributes = {
    name: 'build-routes',
    version: '1.0.0'
};

module.exports = register;
