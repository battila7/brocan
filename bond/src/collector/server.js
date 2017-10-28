const fastify = require('fastify')();

const env = require('@brocan/env');

const logger = require('../logger').child({ component: 'server' });

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
            logger.info('Created route mapping for %s', Object.keys(route));
        }
    });
};

module.exports = {
    listen
};
