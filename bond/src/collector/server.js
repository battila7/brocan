const fastify = require('fastify')();

const env = require('@brocan/env');

const listen = function listen() {
    return new Promise(function callback(resolve, reject) {
        fastify.register([
            require('./routes')
        ], {}, err => {
            if (err) {
                reject(err);
            }
        });

        fastify.listen(env.get('reportCollector.port'), function listenCallback(err) {
            if (err) {
                reject(err);
            }

            resolve();
        });
    }).then(function serverListening() {
        for (const route of fastify) {
            // Replace with proper logging
            console.log(route);
        }
    });
};

module.exports = {
    listen
};
