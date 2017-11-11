const Joi = require('joi');

const GitHub = {
    register(server, options, next) {
        server.route({
            method: 'POST',
            path: '/',
            handler(request, reply) {
                request.logger.debug('Received GitHub build request', request.payload);

                reply.messaging.act({
                    topic: 'build',
                    role: 'transform',
                    origin: 'github',
                    payload: request.payload,
                    
                    pubsub$: true
                }, (err) => {
                    if (err) {
                        request.logger.warn(err);
                    }
                });

                return reply();
            },
            config: {
                validate: {
                    headers: Joi.object({
                        'x-github-delivery': Joi.string().required(),
                        'x-github-event': Joi.string().regex(/^push$/).required()
                    }).options({ allowUnknown: true }),

                    payload: Joi.object({
                        ref: Joi.string().required(),
                        commits: Joi.array().required(),
                        head_commit: Joi.object().required(),
                        repository: Joi.object().required(),
                        sender: Joi.object().required()
                    }).options({ allowUnknown: true })
                }
            }
        })

        next();
    }
}

GitHub.register.attributes = {
    name: 'github',
    dependencies: [ 'hapi-pino', 'bouncer-messaging' ]
};

module.exports = GitHub;
