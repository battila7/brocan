const env = require('@brocan/env').ensure([
    'reportCollector.port'
]);

const logger = require('./logger').child({ component: 'main' });

const collectorServer = require('./collector/server');

collectorServer.listen()
    .then(function collectorStarted() {
        logger.info('Collector started.');
    });
