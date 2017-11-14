const EventEmitter = require('events');

const fastify = require('fastify')();

const config = require('../config');

const logger = require('../logger').child({ component: 'server' });

const VALID_STAGES = ['command', 'step', 'build'];

const Collector = {
    deps: {
        fastify
    },

    setup() {
        fastify.decorate('emit', this.emit.bind(this));

        return new Promise(function callback(resolve, reject) {
            fastify.route({
                method: 'POST',
                url: '/:id/report/:stage',
            
                handler(req, resp) {
                    resp.send({});

                    if (VALID_STAGES.includes(req.params.stage)) {
                        fastify.emit('progress', req.params.id, req.params.stage, req.body);
                    } else {
                        logger.warn('Invalid stage received "%s"', req.params.stage);
                    }
                }
            });
    
            fastify.listen(config.get('collector.port'), function listenCallback(err) {
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

Object.setPrototypeOf(Collector, EventEmitter.prototype);

module.exports = Collector;
