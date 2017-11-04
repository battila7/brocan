const EventEmitter = require('events');

const fastify = require('fastify')();

const env = require('@brocan/env');

const logger = require('../logger').child({ component: 'server' });

const collector = {
    deps: {
        fastify, routes
    },

    setup() {
        fastify.decorate('emit', this.emit.bind(this));

        return new Promise(function callback(resolve, reject) {
            fastify.route({
                method: 'POST',
                url: '/:buildId/report/:stage',
            
                handler(req, resp) {
                    resp.send({});
            
                    fastify.emit('progress', buildId, stage, req.body);
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
    }
};

Object.setPrototypeOf(collector, EventEmitter.prototype);

module.exports = collector;
