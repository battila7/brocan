const Boom = require('boom');

const Initiator = require('./initiator');

const register = function register(server, options, next) {
    server.route({
        method: 'POST',
        path: '/webhook',
        handler: function(request, reply) {
            const isDryRun = request.query.dry;

            const initiator = Object.create(Initiator);

            initiator.Initiator(request.headers, request.payload, reply.messaging);

            initiator.initiateBuild(isDryRun)
                .then(buildRequest => reply(buildRequest).type('application/json'))
                .catch(err => {
                    request.logger.warn('Failed to initiate build');
                    request.logger.warn(err);

                    reply(Boom.badRequest('Could not initiate build', err))
                });
        }
    });

    next();
};

register.attributes = {
    name: 'webhook-routes',
    version: '1.0.0'
};

module.exports = register;
