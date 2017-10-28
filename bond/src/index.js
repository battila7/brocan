const env = require('@brocan/env').ensure([
    'PORT'
]);

const fastify = require('fastify')();

fastify.listen(env.get('PORT'), function listenCallback(err) {
    if (err) {
        throw err;
    }
});
