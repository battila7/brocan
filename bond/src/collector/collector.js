const EventEmitter = require('events');

const fastify = require('fastify')();

const env = require('@brocan/env');

const logger = require('../logger').child({ component: 'server' });

const VALID_STAGES = ['command', 'step', 'build'];

const collector = {
    deps: {
        fastify
    },

    setup() {
        fastify.decorate('emit', this.emit.bind(this));

        return new Promise(function callback(resolve, reject) {
            fastify.route({
                method: 'POST',
                url: '/:buildId/report/:stage',
            
                handler(req, resp) {
                    resp.send({});

                    if (VALID_STAGES.includes(req.params.stage)) {
                        fastify.emit('progress', req.params.buildId, req.params.stage, req.body);
                    } else {
                        logger.warn('Invalid stage received "%s"', req.params.stage);
                    }
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
